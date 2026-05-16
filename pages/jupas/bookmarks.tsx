import { useEffect, useMemo, useState } from 'react';
import { LuBookmark } from 'react-icons/lu';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import JupasStyles from '../../components/jupas/styles';
import { JupasCard } from '../../components/jupas/parts';
import { useBookmarks } from '../../lib/jupas/client/bookmarks';
import { readLastResult } from '../../lib/jupas/client/lastResult';
import { programmeToCardProps, type LiteProgramme } from '../../lib/jupas/client/cardProps';
import type { CalculateResponse } from '../../lib/jupas/client/apiTypes';

export default function JupasBookmarks() {
  const { starred } = useBookmarks();
  const [catalogue, setCatalogue] = useState<LiteProgramme[] | null>(null);
  const [lastResult, setLastResult] = useState<CalculateResponse | null>(null);
  const [loadError, setLoadError] = useState(false);

  // Static catalogue (cutoff data for any programme) + the user's last
  // calculation (to overlay score/tier where available — hybrid mode).
  useEffect(() => {
    setLastResult(readLastResult());
    fetch('/jupas/programmes-lite.json')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('fetch failed'))))
      .then((d: LiteProgramme[]) => setCatalogue(d))
      .catch(() => setLoadError(true));
  }, []);

  const cards = useMemo(() => {
    if (!catalogue) return [];
    const byId = new Map(catalogue.map(p => [p.id, p]));
    const resultById = new Map((lastResult?.results ?? []).map(r => [r.programme.id, r]));
    return Array.from(starred)
      .map(code => byId.get(code))
      .filter((p): p is LiteProgramme => !!p)
      .map(p => programmeToCardProps(p, resultById.get(p.id)));
  }, [catalogue, lastResult, starred]);

  const empty = starred.size === 0;
  const loading = !catalogue && !loadError;

  return (
    <>
      <PageSEO
        title="我的 JUPAS 收藏 | dse.best"
        description="你收藏嘅 JUPAS 課程一覽，附歷年收生分數同入學機會。"
        robots={['noindex', 'nofollow']}
      />
      <PageBreadcrumb section="JUPAS" text="我的收藏" />
      <JupasStyles />

      <div className="jpd-wrap">
        <div className="jpd-page-hd">
          <h1 className="jpd-page-title">
            <LuBookmark size={22} style={{ marginBottom: -3, marginRight: 6 }} aria-hidden />
            我的 JUPAS 收藏
          </h1>
          <p className="jpd-page-sub">
            你喺 <a href="/jupas/calculator" style={{ textDecoration: 'underline' }}>JUPAS 計算機</a> 收藏嘅課程。
            收藏係按課程代碼儲存，唔會因為你改成績而消失。重新搜尋一次，就會見到最新嘅入學機會。
          </p>
        </div>

        {empty && (
          <div className="jpd-sample-banner">
            <span className="jpd-sample-dot" />
            <span>仲未有收藏。喺課程卡左上角撳書籤圖示即可加入收藏。</span>
          </div>
        )}

        {!empty && !lastResult && (
          <div className="jpd-sample-banner">
            <span className="jpd-sample-dot" />
            <span>以下只顯示歷年收生分數。去 <a href="/jupas/calculator" style={{ textDecoration: 'underline' }}>計算機</a> 搜尋一次，就會顯示你嘅入學機會。</span>
          </div>
        )}

        {loadError && (
          <div className="jpd-scale-note" style={{ background: '#fde8e8', color: '#721c24' }}>
            載入課程資料失敗，請刷新頁面再試。
          </div>
        )}

        {loading && !empty && (
          <p style={{ color: 'var(--color-muted)', fontSize: 13, padding: '12px 2px' }}>載入中…</p>
        )}

        {!empty && cards.map(c => <JupasCard key={c.code} {...c} />)}
      </div>
    </>
  );
}
