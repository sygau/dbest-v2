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
import { CH_LIMITS, COOLDOWN_MS, TASK_MAX_CHARS } from '../../lib/grader/constants';
import { countCharsCh } from '../../lib/grader/wordCount';
import type { ChGraderResult, GraderApiError } from '../../lib/grader/types';
import type { ChineseState } from '../../lib/grader/client/persist';

type WritingPart = 'A' | 'B';
type EssayType = 'auto' | '記敘文' | '議論文' | '抒情文' | '描寫文' | '混合' | '書信' | '建議書' | '演講辭' | '新聞報導' | '短評';

const TYPES_PART_A: EssayType[] = ['書信', '建議書', '演講辭', '新聞報導', '短評'];
const TYPES_PART_B: EssayType[] = ['auto', '記敘文', '議論文', '抒情文', '描寫文'];

const FAQS = [
  // Tool-focused (3)
  { id: 'free-grader', question: '有免費嘅 DSE 中文寫作 AI 評分工具嗎？', answer: '有。dse.best 提供完全免費嘅 AI 中文作文批改工具，適用於 HKDSE 中文卷二。提交你嘅作文，即時獲得按官方準則嘅詳細評分、逐段批註、病句修正同升級建議。毋須登入，無廣告。' },
  { id: 'how-scoring', question: 'AI 批改中文作文嘅評分係點計嘅？', answer: 'AI 根據香港考評局官方準則評分：內容 /40、表達 /30、結構 /20、標點 /10、錯別字 /3。提供逐段點評、病句分析、用詞不當指正、修辭評估，並按影響力排序升級建議。評分結果亦會顯示預計等級（5** 至 1）。' },
  { id: 'rules', question: '免費中文評分工具有咩規則？', answer: '只接受 HKDSE 中文卷二官方過往試題作文。作文送批改後即時刪除，唔會儲存內容、評分或身份資料，只記錄 IP 批改次數。每位用戶每日免費 2 次批改，UTC 0:00（香港時間早上 8 點）重置。' },
  // SEO-focused (8)
  { id: 'marking-criteria', question: 'DSE 中文卷二係點評分嘅？', answer: 'DSE 中文卷二（寫作）滿分 100 分，分為五個評分項目：內容 /40（切題、構思、展開）、表達 /30（文法、詞彙、句式多樣性）、結構 /20（段落組織、邏輯連貫）、標點 /10、錯別字 /3。得分轉換成 5**、5*、5、4、3、2、1 等級。' },
  { id: 'paper2-marks', question: 'DSE 中文卷二值幾多分？', answer: 'DSE 中文卷二滿分 100 分，佔總成績 25%。其餘 75% 由卷一閱讀（30%）、聆聽及綜合能力卷三（20%）、口試卷四（15%）同校本評核（10%）組成。在卷二取得高分對整體中文成績至關重要。' },
  { id: 'improve-writing', question: '如何提升 DSE 中文寫作分數？', answer: '重點改善：(1) 內容 — 切題、構思周密、展開充分；(2) 表達 — 用詞恰當、句式多樣、避免病句；(3) 結構 — 段落清晰、邏輯連貫、開首結尾有力。定期做過往試題，請老師或使用 AI 工具批改，持續練習。' },
  { id: 'topics', question: 'DSE 中文卷二常見題目有咩？', answer: 'DSE 中文卷二題目類型包括：議論文（評論社會現象）、記敘文（講述故事經歷）、抒情文（表達情感）、實用文（建議書、演講稿、新聞稿）、混合文體。建議研究歷年試題，掌握各文體嘅評分重點同答題技巧。' },
  { id: 'wordcount', question: 'DSE 中文卷二要寫幾多字？', answer: 'DSE 中文卷二官方要求最少 650 字。字數不足會直接扣內容分，影響整體成績。優秀範文通常 800–1000 字。建議計時練習，確保喺 105 分鐘內完成 700 字以上嘅高質量作文。' },
  { id: 'common-mistakes', question: '點樣避免 DSE 中文寫作嘅常見錯誤？', answer: '常見錯誤包括：病句（主語殘缺、搭配不當）、錯別字、標點符號誤用、用詞不當、句式單調、段落邏輯混亂。定期檢查、反覆修改、多讀範文、請老師批改係防止呢啲錯誤嘅有效方法。' },
  { id: 'time-management', question: 'DSE 中文卷二點樣做好時間管理？', answer: '建議分配：15 分鐘擬稿（列大綱、審題）、80 分鐘寫作、10 分鐘檢查修正。唔好臨急抱佛腳重寫，應喺完成初稿後只進行微調。定期用計時方式操卷，訓練速度同準確度。' },
  { id: 'classical-chinese', question: '寫 DSE 中文卷二可以用文言文嗎？', answer: '可以，但需謹慎。DSE 評分準則以現代漢語為主，除非題目特別要求（如古典文體）。如無把握寫文言文，建議用現代白話文，確保表達清晰、無誤。古文用得唔好反而會扣分。' },
];

export default function ChineseGrader() {
  const [part, setPart] = useState<WritingPart>('B');
  const [task, setTask] = useState('');
  const [essay, setEssay] = useState('');
  const [essayType, setEssayType] = useState<EssayType>('auto');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChGraderResult | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [remaining, setRemaining] = useState<number>(2);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const cooldownTimer = useRef<number | null>(null);

  // Reset essayType when switching parts
  useEffect(() => {
    const types = part === 'A' ? TYPES_PART_A : TYPES_PART_B;
    setEssayType(types[0]);
  }, [part]);

  useEffect(() => {
    setRemaining(quotaLeft('chinese'));
    const s = loadState<ChineseState>('chinese');
    if (s) {
      setPart((s.part ?? 'B') as WritingPart);
      setTask(s.task ?? '');
      setEssay(s.essay ?? '');
      setEssayType((s.essayType ?? 'auto') as EssayType);
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

  useBeforeUnload(loading);

  const charCount = useMemo(() => countCharsCh(essay), [essay]);
  const canSubmit = !loading && cooldownLeft === 0 && remaining > 0;

  const handleSubmit = async () => {
    if (loading || cooldownLeft > 0) return;
    if (remaining <= 0) { setErrorBanner('今日批改次數已用完'); return; }
    if (!task.trim()) { setErrorBanner('請先輸入題目，AI 先可以判斷切題程度'); return; }
    if (charCount < CH_LIMITS.min) { setErrorBanner(`作文最少 ${CH_LIMITS.min} 字（現 ${charCount}）`); return; }
    if (charCount > CH_LIMITS.max) { setErrorBanner(`作文上限 ${CH_LIMITS.max} 字（現 ${charCount}）`); return; }

    setErrorBanner(null);
    setLoading(true);
    setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));

    try {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      const token = await getTurnstileToken();
      if (token) headers['cf-turnstile-token'] = token;

      const r = await fetch('/api/grader/chinese', {
        method: 'POST',
        headers,
        body: JSON.stringify({ essay, task, essayType, part }),
      });

      if (!r.ok) {
        const err = (await r.json().catch(() => ({}))) as GraderApiError;
        if (r.status === 429 && err.code === 'quota') {
          setRemaining(0);
          syncLocalQuotaFromServer('chinese', 0);
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

      const data = (await r.json()) as ChGraderResult & { _quota_remaining?: number };
      bumpLocalQuota('chinese');
      if (typeof data._quota_remaining === 'number') {
        syncLocalQuotaFromServer('chinese', data._quota_remaining);
        setRemaining(data._quota_remaining);
      } else {
        setRemaining(quotaLeft('chinese'));
      }
      setResult(data);
      saveState<ChineseState>('chinese', { task, essay, part, essayType, result: data });
      setTimeout(() => document.getElementById('gd-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (e) {
      console.error('[grader/chinese] fetch', e);
      setErrorBanner('連線失敗，請檢查網絡');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageSEO
        title="DSE 中文卷二寫作 AI 評分改文工具"
        description="免費 DSE 中文卷二 AI 評分工具，按考評局五大準則（內容40＋表達30＋結構20＋標點10＋錯別字3）即時批改記敘文、議論文、抒情文、描寫文。提供段落點評、病句修正、修辭分析、詞彙升級建議及升呢行動，即時推算 5/5*/5** 水平。"
        canonical="https://dse.best/grader/chinese"
        pageKey="grader-chinese"
      />

      {isTurnstileEnabled() && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      )}

      <PageBreadcrumb section="工具" text="中文寫作 AI 評分" />
      <GraderStyles />

      <div
        className="gd-wrap"
        style={{
          ['--gd-accent' as string]: '#1a8b76',
          ['--gd-accent-soft' as string]: 'rgba(26,139,118,.12)',
          ['--gd-accent-fill' as string]: 'rgba(26,139,118,.95)',
        } as React.CSSProperties}
      >
        <div className="gd-page-hd">
          <h1 className="gd-page-title">中文寫作 AI 評分</h1>
          <p className="gd-page-sub">
            貼上 DSE 中文卷二題目同你嘅作文，AI 即時按官方準則（內容 / 表達 / 結構 / 標點 / 錯別字）批改，提供逐段點評、病句修正、修辭運用分析、用詞升級同 2–3 個具體升呢行動建議。
          </p>
        </div>

        <Alert variant="warning" style={{ marginBottom: 12 }}>
          <AlertTitle icon={<LuTriangleAlert size={15} style={{ marginBottom: '-2px' }} />}>僅供參考</AlertTitle>
          <AlertDescription>AI 批改結果作為第二意見，並非真實 DSE 閱卷員判斷。建議配合老師批改使用。</AlertDescription>
        </Alert>

        <QuotaBanner remaining={remaining} subject="chinese" />

        <GuideCard subject="chinese" />

        <div className="gd-card">
          <div className="gd-editor-controls">
            <div className="gd-toggle-group">
              <button
                className={`gd-toggle-btn ${part === 'A' ? 'active' : ''}`}
                onClick={() => setPart('A')}
              >
                實用文
              </button>
              <button
                className={`gd-toggle-btn ${part === 'B' ? 'active' : ''}`}
                onClick={() => setPart('B')}
              >
                命題寫作
              </button>
            </div>
            <select className="gd-select" value={essayType} onChange={e => setEssayType(e.target.value as EssayType)} aria-label="文體">
              {(part === 'A' ? TYPES_PART_A : TYPES_PART_B).map(t => (
                <option key={t} value={t}>{t === 'auto' ? '自動判斷文體' : t}</option>
              ))}
            </select>
            <div className="spacer" />
          </div>

          <div className="gd-block">
            <label className="gd-field-label">題目 / Task</label>
            <textarea
              className="gd-task-textarea"
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder={`貼上 DSE 中文卷二題目，例如：\n\n試以「論教育的核心價值」為題，寫作一篇文章。`}
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
              placeholder={`貼上你嘅 DSE 中文卷二作文…\n\n字數要求：${CH_LIMITS.min}–${CH_LIMITS.max} 字\nDSE 官方要求最少 650 字，5** 範文平均約 900 字。`}
              count={charCount}
              min={CH_LIMITS.min}
              max={CH_LIMITS.max}
              countLabel="字"
              disabled={loading}
            />
          </div>

          <div ref={turnstileRef} style={{ display: 'none' }} />

          <div className="gd-submit-row">
            <Button variant="default" size="lg" onClick={handleSubmit} disabled={!canSubmit}>
              {loading ? '批改中…'
                : cooldownLeft > 0 ? `請等 ${cooldownLeft}s`
                : remaining === 0 ? '今日次數已用完'
                : '批改我嘅作文'}
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
