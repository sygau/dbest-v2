import { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';
import { LuTriangleAlert } from 'react-icons/lu';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import FAQSection from '../../components/FAQSection';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import GraderStyles from '../../components/grader/styles';
import EssayInput from '../../components/grader/EssayInput';
import GuideCard from '../../components/grader/GuideCard';
import QuotaBanner from '../../components/grader/QuotaBanner';
import GraderLoading from '../../components/grader/GraderLoading';
import ResultCard from '../../components/grader/ResultCard';
import { ensureTurnstileWidget, getTurnstileToken, isTurnstileEnabled } from '../../lib/jupas/client/turnstile';
import { bumpLocalQuota, quotaLeft, syncLocalQuotaFromServer } from '../../lib/grader/client/quota';
import { useBeforeUnload } from '../../lib/grader/client/leaveGuard';
import { loadState, saveState } from '../../lib/grader/client/persist';
import { COOLDOWN_MS, EN_LIMITS, TASK_MAX_CHARS } from '../../lib/grader/constants';
import { countWordsEn } from '../../lib/grader/wordCount';
import type { EnGraderResult, GraderApiError } from '../../lib/grader/types';
import type { EnglishState } from '../../lib/grader/client/persist';

type Part = 'A' | 'B' | 'unspecified';
type EssayType = 'auto' | 'argumentative' | 'narrative' | 'letter' | 'article' | 'speech' | 'email' | 'report';
type Lang = 'en' | 'zh';

const ESSAY_TYPES: { v: EssayType; label: string }[] = [
  { v: 'auto', label: '自動判斷' },
  { v: 'argumentative', label: 'Argumentative' },
  { v: 'narrative', label: 'Narrative' },
  { v: 'letter', label: 'Letter' },
  { v: 'article', label: 'Article' },
  { v: 'speech', label: 'Speech' },
  { v: 'email', label: 'Email' },
  { v: 'report', label: 'Report' },
];

const FAQS = [
  // Tool-focused (3)
  { id: 'free-grader', question: '有免費嘅 DSE English Writing AI 評分工具嗎？', answer: '有。dse.best 提供完全免費嘅 AI 英文作文批改工具，適用於 HKDSE English Paper 2。提交你嘅 Part A 或 Part B，即時獲得 Content、Language、Organisation 三個範疇嘅詳細評分、文法修正同詞彙升級建議。毋須登入，無廣告。' },
  { id: 'how-scoring', question: 'AI 批改 DSE English Paper 2 嘅評分係點計嘅？', answer: 'AI 根據香港考評局官方準則評分：Content (0–7)、Language (0–7)、Organisation (0–7)。提供逐段點評、文法同詞彙錯誤指正、按優先級排序嘅升級建議。評分結果亦會顯示預計等級。中英文評語均可選擇。' },
  { id: 'rules', question: '免費英文評分工具有咩規則？', answer: '只接受 HKDSE English Paper 2 官方過往試題。Part A 同 Part B 可逐個提交。作文送批改後即時刪除，唔會儲存內容、評分或身份資料，只記錄 IP 批改次數。每位用戶每日免費 2 次批改，UTC 0:00（香港時間早上 8 點）重置。' },
  // SEO-focused (8)
  { id: 'marking-criteria', question: 'DSE English Paper 2 嘅評分準則係咩？', answer: 'DSE English Paper 2（寫作）滿分 21 分，分為三個評分項目：Content (0–7，評估切題程度同想法發展）、Language (0–7，評估詞彙準確度同多樣性）、Organisation (0–7，評估段落組織同邏輯連貫性）。高分卷通常三個範疇都達 6–7 分。' },
  { id: 'paper2-marks', question: 'DSE English Paper 2 值幾多分？', answer: 'DSE English Paper 2 值 21 分，佔英文科總成績 25%。其餘 75% 由卷一閱讀（30%）、卷三聆聽（25%）、卷四口試（20%）同校本評核（10%）組成。Paper 2 係寫作能力嘅核心評估。' },
  { id: 'clo-explained', question: '咩係 DSE English 嘅 Content Language Organisation？', answer: 'CLO 就係 DSE English Paper 2 嘅三個評分範疇：Content（主題相關性同想法展開）、Language（詞彙準確度、文法、句式多樣性）、Organisation（段落組織、邏輯流暢度、開首結尾力度）。每個範疇 0–7 分。' },
  { id: 'improve-writing', question: '點樣提升 DSE English Paper 2 寫作分數？', answer: '重點改善：(1) Task Achievement — 確保文章切題、針對指定對象同格式；(2) Language Range — 使用多樣句式同進階詞彙；(3) Organisation — 寫前規劃、段落清晰、邏輯連貫。定期做過往試題，請老師或用 AI 工具批改。' },
  { id: 'topics', question: 'DSE English Paper 2 常出咩題目？', answer: 'DSE English Paper 2 常見主題：環境、科技、社交媒體、教育、健康、時事、職場溝通。Part A 考實用文（email、letter、article、speech）。Part B 提供 8 道題選 1（Sports、Workplace Communication、Short Stories）。研究過往試題識別常見題型。' },
  { id: 'length', question: 'DSE English Paper 2 要寫幾多字？', answer: 'Part A 約 200 字，Part B 約 400 字。字數太少或太多都會影響分數。建議時間分配：15 分鐘計劃、70 分鐘寫作、5 分鐘檢查。定期做限時操卷訓練。' },
  { id: 'vocab-grammar', question: 'DSE English Paper 2 要用咩程度嘅詞彙同文法？', answer: '使用正式、進階嘅詞彙，適合指定對象。句式需多樣：簡單句、複合句、複雜句並用。常見錯誤要避免：主謂不一致、動詞時態錯、修飾詞位置錯。多做詞彙練習同歷年試題分析。' },
  { id: 'time-limit', question: 'DSE English Paper 2 有幾多時間？', answer: 'DSE English Paper 2（寫作）共 90 分鐘。建議分配：15 分鐘擬稿同筆記、70 分鐘寫作、5 分鐘檢查修正。時間管理係關鍵 — 定期用計時方式做過往試題。' },
];

export default function EnglishGrader() {
  const [task, setTask] = useState('');
  const [essay, setEssay] = useState('');
  const [part, setPart] = useState<Part>('A');
  const [essayType, setEssayType] = useState<EssayType>('auto');
  const [responseLang, setResponseLang] = useState<Lang>('zh');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EnGraderResult | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [remaining, setRemaining] = useState<number>(2);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const cooldownTimer = useRef<number | null>(null);

  // Restore session
  useEffect(() => {
    setRemaining(quotaLeft('english'));
    const s = loadState<EnglishState>('english');
    if (s) {
      setTask(s.task ?? '');
      setEssay(s.essay ?? '');
      setPart(s.part ?? 'unspecified');
      setEssayType((s.essayType ?? 'auto') as EssayType);
      setResponseLang(s.responseLang ?? 'zh');
      setResult(s.result);
    }
  }, []);

  useEffect(() => {
    if (!isTurnstileEnabled()) return;
    const id = window.setInterval(() => {
      if ((window as unknown as { turnstile?: unknown }).turnstile && turnstileRef.current) {
        ensureTurnstileWidget(turnstileRef.current);
        window.clearInterval(id);
      }
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (cooldownLeft <= 0) {
      if (cooldownTimer.current) { window.clearInterval(cooldownTimer.current); cooldownTimer.current = null; }
      return;
    }
    if (cooldownTimer.current) return;
    cooldownTimer.current = window.setInterval(() => setCooldownLeft(s => Math.max(0, s - 1)), 1000);
    return () => {
      if (cooldownTimer.current) { window.clearInterval(cooldownTimer.current); cooldownTimer.current = null; }
    };
  }, [cooldownLeft]);

  useBeforeUnload(loading, 'AI 正在批改，離開會浪費今日次數，確定離開？');

  const wordCount = useMemo(() => countWordsEn(essay), [essay]);
  const limit = part === 'A' ? EN_LIMITS.partA : part === 'B' ? EN_LIMITS.partB : EN_LIMITS.any;
  const canSubmit = !loading && cooldownLeft === 0 && remaining > 0;

  const handleSubmit = async () => {
    if (loading || cooldownLeft > 0) return;
    if (remaining <= 0) { setErrorBanner('今日批改次數已用完'); return; }
    if (!task.trim()) { setErrorBanner('請先輸入 DSE 題目，AI 先可以判斷切題程度'); return; }
    if (wordCount < limit.min) { setErrorBanner(`作文最少 ${limit.min} 個字（現 ${wordCount}）`); return; }
    if (wordCount > limit.max) { setErrorBanner(`作文上限 ${limit.max} 個字（現 ${wordCount}）`); return; }

    setErrorBanner(null);
    setLoading(true);
    setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));

    try {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      const token = await getTurnstileToken();
      if (token) headers['cf-turnstile-token'] = token;

      const r = await fetch('/api/grader/english', {
        method: 'POST',
        headers,
        body: JSON.stringify({ essay, task, part, essayType, responseLang }),
      });

      if (!r.ok) {
        const err = (await r.json().catch(() => ({}))) as GraderApiError;
        if (r.status === 429 && err.code === 'quota') {
          setRemaining(0);
          syncLocalQuotaFromServer('english', 0);
          setErrorBanner(err.error || '今日批改次數已用完');
        } else if (r.status === 429) {
          setErrorBanner('請求過於頻繁，請等 60 秒');
          setCooldownLeft(60);
        } else if (r.status === 403) {
          setErrorBanner('驗證失敗，請刷新頁面後再試');
        } else {
          setErrorBanner(err.error || `伺服器錯誤 (${r.status})，請稍後再試`);
        }
        return;
      }

      const data = (await r.json()) as EnGraderResult & { _quota_remaining?: number };
      bumpLocalQuota('english');
      if (typeof data._quota_remaining === 'number') {
        syncLocalQuotaFromServer('english', data._quota_remaining);
        setRemaining(data._quota_remaining);
      } else {
        setRemaining(quotaLeft('english'));
      }
      setResult(data);
      saveState<EnglishState>('english', { task, essay, part, essayType, responseLang, result: data });
      setTimeout(() => document.getElementById('gd-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (e) {
      console.error('[grader/english] fetch', e);
      setErrorBanner('連線失敗，請檢查網絡');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageSEO
        title="DSE 英文 Writing (Paper 2) AI 改文評分工具"
        description="免費 DSE 英文 Paper 2 Writing AI 評分工具。貼題貼文即按 Content/Language/Organisation 逐項評分 (U-5**)，並估算整體 DSE 等級。提供詳細反饋：逐句點評、文法錯誤標記、詞彙升級建議、具體升Level步驟。"
        canonical="https://dse.best/grader/english"
        pageKey="grader-english"
      />

      {isTurnstileEnabled() && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      )}

      <PageBreadcrumb section="工具" text="英文寫作 AI 評分" />
      <GraderStyles />

      <div
        className="gd-wrap"
        style={{
          ['--gd-accent' as string]: '#d4a017',
          ['--gd-accent-soft' as string]: 'rgba(212,160,23,.14)',
          ['--gd-accent-fill' as string]: 'rgba(212,160,23,.95)',
        } as React.CSSProperties}
      >
        <div className="gd-page-hd">
          <h1 className="gd-page-title">DSE 英文作文 AI 改文評分工具</h1>
          <p className="gd-page-sub">
           免費 DSE 英文 Paper 2 Writing AI 評分工具。貼題貼文即按 Content/Language/Organisation 逐項評分 (U-5**)，並估算整體 DSE 等級。提供詳細反饋：逐句點評、文法錯誤標記、詞彙升級建議、具體升Level步驟。
          </p>
        </div>

        <Alert variant="warning" style={{ marginBottom: 12 }}>
          <AlertTitle icon={<LuTriangleAlert size={15} style={{ marginBottom: '-2px' }} />}>僅供參考</AlertTitle>
          <AlertDescription>AI 批改結果作為第二意見，並非真實 HKDSE 閱卷員判斷。建議配合老師批改使用。</AlertDescription>
        </Alert>

        <QuotaBanner remaining={remaining} subject="english" />

        <GuideCard subject="english" />

        <div className="gd-card">
          <div className="gd-editor-controls">
            <div className="gd-toggle-group" role="group" aria-label="Part">
              {(['A', 'B'] as Part[]).map(p => (
                <button key={p} className={`gd-toggle-btn ${part === p ? 'active' : ''}`} onClick={() => setPart(p)}>
                  {`Part ${p}`}
                </button>
              ))}
            </div>
            <select className="gd-select" value={essayType} onChange={e => setEssayType(e.target.value as EssayType)} aria-label="文體 Type">
              {ESSAY_TYPES.map(t => <option key={t.v} value={t.v}>{t.label}</option>)}
            </select>
            <div className="spacer" />
            <div className="feedback-group">
              <span className="feedback-lbl">反饋語言</span>
              <div className="gd-toggle-group" role="group" aria-label="反饋語言">
                <button className={`gd-toggle-btn ${responseLang === 'zh' ? 'active' : ''}`} onClick={() => setResponseLang('zh')}>中文</button>
                <button className={`gd-toggle-btn ${responseLang === 'en' ? 'active' : ''}`} onClick={() => setResponseLang('en')}>English</button>
              </div>
            </div>
          </div>

          <div className="gd-block">
            <label className="gd-field-label">題目 / Task</label>
            <textarea
              className="gd-task-textarea"
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder={`貼上 DSE 題目，例如：\n\nQ3 Learning English through Workplace Communication\nYou write an advice column for Jobs Online magazine. A reader submitted the following question…\nWrite a reply to Kam Chai offering your advice.`}
              maxLength={TASK_MAX_CHARS}
              disabled={loading}
            />
            <span className="gd-task-count">{task.length}/{TASK_MAX_CHARS}</span>
          </div>

          <div className="gd-block">
            <label className="gd-field-label">你嘅作文 / Your Essay</label>
            <EssayInput
              value={essay}
              onChange={setEssay}
              placeholder={`貼上你嘅 HKDSE Paper 2 作文…\n\nPart A ≈ 200 字 · Part B ≈ 400 字\n建議寫好分段，AI 會逐段點評。`}
              count={wordCount}
              min={limit.min}
              max={limit.max}
              countLabel="words"
              disabled={loading}
            />
          </div>

          <div ref={turnstileRef} style={{ display: 'none' }} />

          <div className="gd-submit-row">
            <Button variant="default" size="lg" onClick={handleSubmit} disabled={!canSubmit}>
              {loading ? '批改中…'
                : cooldownLeft > 0 ? `請等 ${cooldownLeft}s`
                : remaining === 0 ? '今日次數已用完'
                : '批改我嘅作文 Grade my essay'}
            </Button>
          </div>
        </div>

        {errorBanner && (
          <Alert variant="warning" style={{ marginBottom: 12 }}>
            <AlertDescription>{errorBanner}</AlertDescription>
          </Alert>
        )}

        <div id="gd-result">
          {loading && <GraderLoading />}
          {!loading && result && <ResultCard result={result} />}
        </div>

        <FAQSection title="常見問題 FAQ" faqs={FAQS} />
      </div>
    </>
  );
}
