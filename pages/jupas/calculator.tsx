import { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';
import { LuBadgeInfo, LuTriangleAlert } from 'react-icons/lu';
import PageSEO from '../../components/PageSEO';
import { Button } from '../../components/ui/Button';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert';
import JupasStyles from '../../components/jupas/styles';
import {
  JupasCard, MechanismInfo, SortToggle, SearchLoading, NoResults, ProbLegend,
  type SortMode,
} from '../../components/jupas/parts';
import {
  TIER_ORDER, UNI_API_TO_DISPLAY,
  type ProbLevel, type UniDisplay,
} from '../../components/jupas/constants';
import SearchPanel, { DEFAULT_FILTERS, type FilterState } from '../../components/jupas/SearchPanel';
import { TierStatsGrid } from '../../components/jupas/TierStatsGrid';
import { ResultsFilter } from '../../components/jupas/ResultsFilter';
import type { BuiltProfile } from '../../lib/jupas/client/payload';
import type { CalculateResponse, CalculateError } from '../../lib/jupas/client/apiTypes';
import sampleResponse from '../../lib/jupas/client/sample-response.json';
import { ensureTurnstileWidget, getTurnstileToken, isTurnstileEnabled } from '../../lib/jupas/client/turnstile';
import { resultToCardProps } from '../../lib/jupas/client/cardProps';
import { writeLastResult } from '../../lib/jupas/client/lastResult';
import { useBookmarks } from '../../lib/jupas/client/bookmarks';
import { LuBookmark } from 'react-icons/lu';
import PageBreadcrumb from '@/components/PageBreadcrumb';

const PAGE_SIZE = 20;
const COOLDOWN_MS = 5000;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = 'jupas:result:v1:';

// ── Cache helpers ────────────────────────────────────────────────────────────

function readCache(hash: string): CalculateResponse | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + hash);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.t !== 'number' || Date.now() - parsed.t > CACHE_TTL_MS) return null;
    return parsed.data as CalculateResponse;
  } catch { return null; }
}

function writeCache(hash: string, data: CalculateResponse) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_PREFIX + hash, JSON.stringify({ t: Date.now(), data }));
  } catch { /* quota */ }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function JupasCalculator() {
  const [response, setResponse] = useState<CalculateResponse>(sampleResponse as CalculateResponse);
  const [isSample, setIsSample] = useState(true);
  const { count: bookmarkCount } = useBookmarks();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortMode, setSortMode] = useState<SortMode>('prob');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | undefined>(undefined);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const cooldownTimer = useRef<number | null>(null);
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  // Render Turnstile widget once script + DOM ready.
  useEffect(() => {
    if (!isTurnstileEnabled()) return;
    const id = window.setInterval(() => {
      if (window.turnstile && turnstileRef.current) {
        ensureTurnstileWidget(turnstileRef.current);
        window.clearInterval(id);
      }
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  // Cooldown ticker.
  useEffect(() => {
    if (cooldownLeft <= 0) {
      if (cooldownTimer.current) { window.clearInterval(cooldownTimer.current); cooldownTimer.current = null; }
      return;
    }
    if (cooldownTimer.current) return;
    cooldownTimer.current = window.setInterval(() => {
      setCooldownLeft(s => Math.max(0, s - 1));
    }, 1000);
    return () => {
      if (cooldownTimer.current) { window.clearInterval(cooldownTimer.current); cooldownTimer.current = null; }
    };
  }, [cooldownLeft]);

  // Dynamic field-of-study options derived from cached response.
  const fieldOptions = useMemo(() => {
    const set = new Set<string>();
    for (const r of response.results) {
      if (r.programme.categoryCh) set.add(r.programme.categoryCh);
    }
    return Array.from(set).sort();
  }, [response]);

  // Filter + sort.
  const visibleResults = useMemo(() => {
    const filtered = response.results.filter(r => {
      const uni = UNI_API_TO_DISPLAY[r.programme.uni] as UniDisplay | undefined;
      if (filters.unis.size > 0 && uni && !filters.unis.has(uni)) return false;
      if (filters.probs.size > 0 && !filters.probs.has(r.tierKey as ProbLevel)) return false;
      if (filters.fields.size > 0 && !filters.fields.has(r.programme.categoryCh)) return false;
      return true;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (sortMode) {
        case 'prob': {
          const ta = TIER_ORDER[a.tierKey as ProbLevel] ?? 99;
          const tb = TIER_ORDER[b.tierKey as ProbLevel] ?? 99;
          if (ta !== tb) return ta - tb;
          return (b.score ?? -Infinity) - (a.score ?? -Infinity);
        }
        case 'uni':
          return (a.programme.uni || '').localeCompare(b.programme.uni || '') || a.programme.id.localeCompare(b.programme.id);
        case 'median': {
          const y = String(a.yearUsed) as '2023' | '2024' | '2025';
          const ma = a.programme.cutoffs[y]?.median ?? -Infinity;
          const mb = b.programme.cutoffs[y]?.median ?? -Infinity;
          return mb - ma;
        }
        case 'quota':
          return (b.programme.firstYearIntake ?? -1) - (a.programme.firstYearIntake ?? -1);
      }
    });
    return sorted;
  }, [response, filters, sortMode]);

  // Reset pagination when underlying data or filters change.
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [response, filters, sortMode]);

  const totalShown = Math.min(visibleCount, visibleResults.length);
  const hasMore = totalShown < visibleResults.length;

  // ── Submit handler ──

  const handleSearch = async (profile: BuiltProfile, formHash: string) => {
    setErrorBanner(undefined);

    // Cache hit?
    const cached = readCache(formHash);
    if (cached) {
      setResponse(cached);
      setIsSample(false);
      writeLastResult(cached);
      setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));
      return;
    }

    setLoading(true);
    setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));

    try {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      const token = await getTurnstileToken();
      if (token) headers['cf-turnstile-token'] = token;

      const res = await fetch('/api/jupas/calculate', {
        method: 'POST',
        headers,
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as CalculateError;
        if (res.status === 429) {
          setErrorBanner('請求過於頻繁，請等候約 60 秒再試');
          setCooldownLeft(60);
        } else if (res.status === 403) {
          setErrorBanner('驗證失敗，請刷新頁面後再試');
        } else if (res.status === 400) {
          setErrorBanner(`輸入不正確：${err.error || '請檢查表單'}`);
        } else {
          setErrorBanner(`伺服器錯誤 (${res.status})，請稍後再試`);
        }
        return;
      }

      const data = (await res.json()) as CalculateResponse;
      writeCache(formHash, data);
      writeLastResult(data);
      setResponse(data);
      setIsSample(false);
    } catch (e) {
      console.error('[jupas/calculate]', e);
      setErrorBanner('連線失敗，請檢查網絡');
    } finally {
      setLoading(false);
    }
  };

  const totalCount = isSample ? response.meta.total ?? response.count : response.count;
  const eligibleCount = response.eligibleCount;

  return (
    <>
      <PageSEO
        title="JUPAS 計算機 Calculator | DSE 成績即時計算全港大學入學機會"
        description="輸入2026 DSE 成績，即睇 380+ JUPAS 課程嘅收生分數同入學機會。自動套用港大、中大、科大、理大、城大各院校加權公式，對比歷年 LQ / Median / UQ，即時知自己係咪穩入、有得搏定危險? 唔使逐個課程逐間大學查!"
        canonical="https://dse.best/jupas/calculator"
      />

      {isTurnstileEnabled() && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      )}
      
      <PageBreadcrumb section="JUPAS" text="JUPAS Calculator" />
      <JupasStyles />

      <div className="jpd-wrap">
        <div className="jpd-page-hd">
          <h1 className="jpd-page-title">JUPAS 計算機</h1>
          <p className="jpd-page-sub">
            輸入你嘅 2026 DSE 成績，即時計算 381 JUPAS 課程嘅 2026/27 學年入學機會。本工具自動套用各院校計分公式, Subject weighting, 6th subject bonus、彈性收生(flexible admissions)等機制、以及 2023-2025 年嘅歷年Cut off分數。助你快速了解心儀課程嘅競爭程度，精準評估升學前景。<br />
          </p>
        </div>
        <Alert variant="warning" style={{ marginBottom: '14px' }}>
          <AlertTitle icon={<LuTriangleAlert size={15} style={{ marginBottom: '-2px' }} />}>JUPAS 資料僅供參考</AlertTitle>
          <AlertDescription>此計算機結果可能會有誤差。請務必到 <a href="https://www.jupas.edu.hk" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>JUPAS</a>
            /各院校官方網頁或計算機查證課程要求同最新計分公式(特別係理工大學)，切勿單依此工具作決定。<b>實際入學機會可能因多種因素而異。</b>
            </AlertDescription>
        </Alert>
        <Alert variant="default" style={{ marginBottom: '14px' }}>
          <AlertTitle> <LuBadgeInfo size={15} style={{ marginBottom: '2.5px', marginRight: '5px' }} />JUPAS 各院校官方計算機</AlertTitle>
          <AlertDescription>
            <b>HKU </b><a href="https://admissions.hku.hk/apply/jupas/score-calculator" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>admissions.hku.hk/apply/jupas/score-calculator</a>
              <br />
            <b>CUHK </b><a href="https://admission.cuhk.edu.hk/application/jupas/programme-specific-requirements-and-score-calculator/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>www.cuhk.edu.hk/admissions/jupas/score-calculator</a>
              <br />
            <b>HKUST </b><a href="https://join.hkust.edu.hk/admissions/jupas" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>join.ust.hk/admissions/jupas</a>
              <br />
            <b>PolyU </b><a href="https://www.polyu.edu.hk/study/ug/admissions/jupas/jupas-score-calculator" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>www.polyu.edu.hk/study/ug/admissions/jupas/jupas-score-calculator</a>
              <br />
            <b>CityU </b><a href="https://www.cityu.edu.hk/admo/admissions/jupas-admission" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>www.cityu.edu.hk/admo/admissions/jupas-admission</a>
              <br />
            <b>HKBU </b><a href="https://iss.hkbu.edu.hk/ams_jpscal/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>iss.hkbu.edu.hk/ams_jpscal</a>
              <br />
            <b>EdUHK </b><a href="https://pappl.eduhk.hk/score-calculator/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>pappl.eduhk.hk/score-calculator</a> 
            <br />
            <b>LingU </b><a href="https://www.ln.edu.hk/admissions/ug/page/detail/114" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>lingu.edu.hk/admissions/ug/page/detail/114</a>
              <br />
            <b>HKMU </b><a href="https://admissions.hkmu.edu.hk/ug/jupas/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>admissions.hkmu.edu.hk/ug/jupas/</a>
          </AlertDescription>
         </Alert>
        <SearchPanel
          fieldOptions={fieldOptions}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          isSubmitting={loading}
          cooldownLeft={cooldownLeft}
          errorBanner={errorBanner}
          showFilters={false}
        />

        {/* Invisible Turnstile container */}
        <div ref={turnstileRef} style={{ display: 'none' }} />

        <ResultsFilter filters={filters} fieldOptions={fieldOptions} onFiltersChange={setFilters} />

        <TierStatsGrid results={visibleResults} />

        <div className="jpd-results-row">
          <div>
            <div className="jpd-result-label" style={{ color: 'var(--color-emphasis)', fontWeight: 600 }}>
              {isSample ? '預載示範' : '搜尋結果'} ({visibleResults.length}/{totalCount})
            </div>
            {!isSample && (
              <div style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>達標: {eligibleCount}</div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <SortToggle mode={sortMode} onChange={setSortMode} />
            <a
              href="/jupas/bookmarks"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: 'var(--color-emphasis)', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              <LuBookmark size={13} fill={bookmarkCount > 0 ? 'currentColor' : 'none'} aria-hidden style={{ transform: 'translateY(1px)' }} />
              我的收藏{bookmarkCount > 0 ? ` (${bookmarkCount})` : ''}
            </a>
          </div>
        </div>

        {isSample && (
          <div className="jpd-sample-banner">
            <span className="jpd-sample-dot" />
            <span>呢啲係示範數據（基於樣本成績 4/4/4 + Bio 4 / Chem 3 / Phys 2）。按搜尋會以你嘅成績重新計算。</span>
          </div>
        )}

        {loading && <SearchLoading />}

        {!loading && visibleResults.length === 0 && <NoResults />}

        {!loading && visibleResults.slice(0, totalShown).map(r => (
          <JupasCard key={r.programme.id} {...resultToCardProps(r)} />
        ))}

        {hasMore && (
          <div className="jpd-show-more-wrap">
            <Button
              variant="default"
              size="lg"
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              className="w-full"
            >
              顯示更多 ({visibleResults.length - totalShown} 個剩餘)
            </Button>
          </div>
        )}

        

        <MechanismInfo />

        <ProbLegend />
      </div>
    </>
  );
}
