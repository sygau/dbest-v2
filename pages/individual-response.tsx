import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  generateIndividualResponseStructuredData,
  getMainPageMetadata
} from '../utils/structuredData';
import IR_DATA from '../data/ir-questions.json';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FlatQuestion {
  id: string;           // e.g. "sample_paper__1.1__q3"
  paperKey: string;     // e.g. "sample_paper"
  paperLabel: string;   // e.g. "Sample Paper"
  setKey: string;       // e.g. "1.1"
  topic: string;        // e.g. "Media & Privacy"
  qNum: number;         // 1–10
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

type TimerState = 'idle' | 'running' | 'paused' | 'finished';
type Difficulty = 'Any' | 'Easy' | 'Medium' | 'Hard';
interface StoredState { queue: string[]; doneIds: string[]; }

// ─── Derive difficulty from question number ───────────────────────────────
// q1–3 → Easy, q4–6 → Medium, q7–10 → Hard

function diffFromNum(n: number): 'Easy' | 'Medium' | 'Hard' {
  if (n <= 3) return 'Easy';
  if (n <= 6) return 'Medium';
  return 'Hard';
}

// ─── Flatten user's JSON into a single question array ────────────────────────

const ALL_QUESTIONS: FlatQuestion[] = [];

for (const [paperKey, paper] of Object.entries(IR_DATA.papers) as any) {
  for (const [setKey, set] of Object.entries(paper.sets) as any) {
    for (const [qKey, text] of Object.entries(set.questions) as any) {
      const qNum = parseInt(qKey.replace('q', ''), 10);
      ALL_QUESTIONS.push({
        id: `${paperKey}__${setKey}__${qKey}`,
        paperKey,
        paperLabel: paper.label,
        setKey,
        topic: set.topic,
        qNum,
        text: text as string,
        difficulty: diffFromNum(qNum),
      });
    }
  }
}

// ─── Build source dropdown groups from papers ────────────────────────────────

interface SourceOpt { value: string; label: string; }
interface SourceGroup { group: string; options: SourceOpt[]; }


// ─── Static helpers ───────────────────────────────────────────────────────────

const FAQS = [
  { id: 'f1', question: 'DSE 英文口試 Individual Response 係點考法？', answer: '考生會獨立回答考官提問，唔需要同其他同學討論。考官會就某個社會議題或日常話題發問，考生需要即場表達個人意見並作出解釋，時間大約係 1 分鐘左右。' },
  { id: 'f2', question: 'Individual Response 評分係睇咩？', answer: 'DSE 英文口試主要評核四個範疇：pronunciation & delivery（發音流暢度）、communication strategies（溝通技巧）、vocabulary & language patterns（詞彙運用）、ideas & organisation（內容組織）。流暢同清晰比講得複雜更重要。' },
  { id: 'f3', question: '唔識答某條題目點算？', answer: '唔好直接話「I don\'t know」然後停低。可以先講「That\'s an interesting question」爭取一兩秒思考，再從一個你識講嘅角度切入。即使答案唔完整，保持流暢同自信係最緊要。' },
  { id: 'f4', question: '練習 Individual Response 最有效嘅方法係咩？', answer: '最有效係計時練習——每次限 1 分鐘，模擬真實考試壓力。題目最好隨機抽，唔好每次都準備固定答案，因為考試當日題目係即場發問。練完之後可以錄音重聽，留意自己嘅停頓同語速。' },
  { id: 'f5', question: 'Individual Response 同 Group Discussion 有咩分別？', answer: 'Individual Response 係你一個人回答考官問題，唔需要理會其他考生。Group Discussion 就係幾個考生一齊討論，需要學識 agree / disagree、接話、引導討論等技巧。兩者評分側重點有所不同。' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 1:00 base + small buffer (max 5s)
function readingBufferSeconds(text: string): number {
  const wordCount = text.trim().split(/\s+/).length;
  // approx 3 words per second for breathing space, capped at 5 seconds extra
  const buffer = Math.min(Math.ceil(wordCount / 3), 5);
  return 60 + buffer;
}

const STORAGE_KEY = 'dse-ir-state';
const TTS_STORAGE_KEY = 'dse-ir-tts';
const HIDE_Q_STORAGE_KEY = 'dse-ir-hide-q';

// ─── Component ───────────────────────────────────────────────────────────────

export default function IndividualResponsePage() {
  const metadata = useMemo(() => getMainPageMetadata('individual-response'), []);
  const structuredData = useMemo(() => generateIndividualResponseStructuredData(), []);
  const SOURCE_OPTIONS = useMemo(() => {
    const options: { value: string; label: string; isComment?: boolean }[] = [];

    // Add default
    options.push({ value: 'all', label: 'All (Random)', isComment: false });

    // Generate from JSON
    Object.entries(IR_DATA.papers).forEach(([paperKey, paper]: [string, any]) => {
      if (paper.comments) {
        options.push({
          value: `note_${paperKey}`,
          label: `${paper.comments}`,
          isComment: true
        });
      }
      options.push({ value: paperKey, label: paper.label, isComment: false });
    });

    return options;
  }, []);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [initialTime, setInitialTime] = useState(60);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [queue, setQueue] = useState<string[]>([]);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [hideQuestion, setHideQuestion] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [manualRevealed, setManualRevealed] = useState(false);
  // "all" or "paperKey__setKey"
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Any');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Voices
  useEffect(() => {
    const load = () => { const v = speechSynthesis.getVoices(); if (v.length) voicesRef.current = v; };
    load(); speechSynthesis.onvoiceschanged = load;
    return () => { speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Restore persisted state
  useEffect(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) { const p: StoredState = JSON.parse(s); if (p.queue?.length) setQueue(p.queue); if (p.doneIds) setDoneIds(new Set(p.doneIds)); } } catch (e) { }
    try { const t = localStorage.getItem(TTS_STORAGE_KEY); if (t === '1') setTtsEnabled(true); else if (t === '0') setTtsEnabled(false); } catch (e) { }
    try { const h = localStorage.getItem(HIDE_Q_STORAGE_KEY); if (h === '1') setHideQuestion(true); else if (h === '0') setHideQuestion(false); } catch (e) { }
  }, []);

  useEffect(() => { try { localStorage.setItem(TTS_STORAGE_KEY, ttsEnabled ? '1' : '0'); } catch (e) { } }, [ttsEnabled]);
  useEffect(() => { try { localStorage.setItem(HIDE_Q_STORAGE_KEY, hideQuestion ? '1' : '0'); } catch (e) { } }, [hideQuestion]);
  useEffect(() => { if (queue.length > 0) try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ queue, doneIds: Array.from(doneIds) })); } catch (e) { } }, [queue, doneIds]);

  // ── Filtered pool ─────────────────────────────────────────────────────────

  const pool = useMemo(() => {
    let p = ALL_QUESTIONS;
    if (selectedSource !== 'all') {
      p = p.filter(q => q.paperKey === selectedSource);
    }
    if (selectedDifficulty !== 'Any') p = p.filter(q => q.difficulty === selectedDifficulty);
    return p;
  }, [selectedSource, selectedDifficulty]);

  // Reset when filters change
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    try { speechSynthesis.cancel(); } catch (e) { }
    setCurrentId(null); setTimerState('idle'); setTimeLeft(60); setInitialTime(60); setQueue([]); setDoneIds(new Set());
  }, [selectedSource, selectedDifficulty]);

  // Seed queue
  useEffect(() => {
    if (queue.length === 0 && pool.length > 0) setQueue(shuffleArray(pool).map(q => q.id));
  }, [queue.length, pool]);

  // ── Countdown ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (timerState === 'running' && timeLeft > 0) {
      // Blur logic for hide question
      if (hideQuestion && !manualRevealed) {
        // Blur ONLY after the buffer period (when timeLeft <= 60)
        if (timeLeft <= 60) {
          setIsBlurred(true);
        } else {
          setIsBlurred(false);
        }
      }

      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { 
            clearInterval(timerRef.current!); 
            setTimerState('finished'); 
            setIsBlurred(false);
            playBell(); 
            markDone(); 
            return 0; 
          }
          // Non-TTS mode: check if it's time to blur
          if (hideQuestion && !ttsEnabled && !manualRevealed && t - 1 === 60) {
            setIsBlurred(true);
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hideQuestion, timerState, timeLeft]);

  // ── Derived ───────────────────────────────────────────────────────────────

  const currentQ = useMemo(() => ALL_QUESTIONS.find(q => q.id === currentId) ?? null, [currentId]);
  const progress = timerState === 'idle' ? 0 : Math.min(((initialTime - timeLeft) / initialTime) * 100, 100);

  const diffColour = currentQ?.difficulty === 'Easy' ? '#16a34a'
    : currentQ?.difficulty === 'Medium' ? '#d97706' : '#dc2626';

  // ── Audio ─────────────────────────────────────────────────────────────────

  const getCtx = () => {
    if (!audioRef.current) audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return audioRef.current;
  };

  const playBeep = () => {
    try {
      const c = getCtx(); const o = c.createOscillator(); const g = c.createGain();
      o.connect(g); g.connect(c.destination); o.frequency.value = 880; o.type = 'sine';
      g.gain.setValueAtTime(0.3, c.currentTime); g.gain.exponentialRampToValueAtTime(0.01, c.currentTime + 0.2);
      o.start(c.currentTime); o.stop(c.currentTime + 0.2);
    } catch (e) { }
  };

  const playBell = () => {
    try {
      const c = getCtx();
      [523.25, 392, 261.63].forEach((freq, i) => {
        const o = c.createOscillator(); const g = c.createGain();
        o.connect(g); g.connect(c.destination); o.frequency.value = freq; o.type = 'sine';
        const t = c.currentTime + i * 0.25;
        g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
        o.start(t); o.stop(t + 0.4);
      });
    } catch (e) { }
  };

  const trySpeak = (text: string, onEnd?: () => void) => {
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (onEnd) u.onend = onEnd;
      const pick = voicesRef.current.find(v =>
        v.lang.startsWith('en') && (
          v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') ||
          v.name.toLowerCase().includes('daniel') || v.name.includes('Google UK English Male')
        )
      ) || voicesRef.current.find(v => v.lang.startsWith('en')) || null;
      if (pick) u.voice = pick;
      u.lang = 'en-US'; u.rate = 0.85;
      speechSynthesis.speak(u);
    } catch (e) { }
  };

  // ── Actions ───────────────────────────────────────────────────────────────

  const markDone = () => { if (currentId) setDoneIds(prev => new Set(prev).add(currentId)); };

  const drawNext = (done: Set<string>): { id: string; newQueue: string[] } => {
    const poolIdSet = new Set(pool.map(q => q.id));
    const rem = queue.filter(id => !done.has(id) && poolIdSet.has(id));
    if (rem.length === 0) {
      const s = shuffleArray(pool).map(q => q.id);
      return { id: s[0], newQueue: s.slice(1) };
    }
    return { id: rem[0], newQueue: rem.slice(1) };
  };

  const handleStart = () => {
    const newDone = currentId ? new Set(doneIds).add(currentId) : new Set(doneIds);
    const { id, newQueue } = drawNext(newDone);
    setCurrentId(id); setQueue(newQueue);
    if (currentId) setDoneIds(newDone);
    const text = ALL_QUESTIONS.find(q => q.id === id)?.text ?? '';
    
    setManualRevealed(false);
    
    setIsBlurred(false); 

    playBeep();

    if (ttsEnabled) {
      setTimerState('paused'); 
      setTimeLeft(60); 
      setInitialTime(60);
      setIsBlurred(true); // Blur immediately when TTS starts speaking
      trySpeak(text, () => {
        setInitialTime(60);
        setTimeLeft(60);
        setTimerState('running');
      });
    } else {
      const bufferTime = readingBufferSeconds(text);
      setTimeLeft(bufferTime);
      setInitialTime(bufferTime);
      setIsBlurred(false); // Start visible for breathing space
      setTimerState('running');
    }
  };

  const handlePause = () => { if (timerRef.current) clearInterval(timerRef.current); setTimerState('paused'); };
  const handleContinue = () => setTimerState('running');
  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    try { speechSynthesis.cancel(); } catch (e) { }
    markDone(); setCurrentId(null); setTimerState('idle'); setTimeLeft(60); setInitialTime(60);
    setIsBlurred(false);
    setManualRevealed(false);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const isIdle = timerState === 'idle';
  const isPaused = timerState === 'paused';
  const isFinished = timerState === 'finished';

  const mainLabel = isIdle ? 'START' : timerState === 'running' ? 'PAUSE' : isPaused ? 'CONTINUE' : 'NEXT';
  const mainAction = () => {
    if (isIdle || isFinished) return handleStart();
    if (timerState === 'running') return handlePause();
    if (isPaused) return handleContinue();
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>{metadata?.title || 'DSE English Oral Individual Response 練習工具 | dse.best'}</title>
        <meta name="description" content={metadata?.description || 'DSE 英文口試 Individual Response 免費練習工具，隨機抽題、語音朗讀、計時，模擬真實考試環境。'} />
        <meta name="robots" content={metadata?.robots || 'index, follow'} />
        <meta property="og:title" content={metadata?.ogTitle || 'DSE Individual Response 練習工具'} />
        <meta property="og:description" content={metadata?.ogDescription || ''} />
        <meta property="og:image" content={metadata?.ogImage || 'https://dse.best/assets/images/logo-icon.png'} />
        <meta property="og:url" content={metadata?.ogUrl || 'https://dse.best/individual-response'} />
        <meta property="og:type" content={metadata?.ogType || 'website'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className="page-wrapper">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">工具</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item active" aria-current="page">DSE Speaking Individual Response 練習工具</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="layout-center">
          <div className="content-stack">

            <div className="timer-card">

              <div className="card-header-block">
                <h1 className="card-title">Individual Response 練習工具</h1>
              </div>

              {/* ── Filter row ── */}
              <div className="filter-row">
                <div className="filter-group">
                  <label className="filter-label">Source</label>
                  <select
                    className="filter-select"
                    value={selectedSource}
                    onChange={e => setSelectedSource(e.target.value)}
                    disabled={timerState === 'running'}
                  >
                    {SOURCE_OPTIONS.map(o => (
                      <option
                        key={o.value}
                        value={o.value}
                        disabled={o.isComment}
                        style={{
                          fontWeight: o.isComment ? 'bold' : 'normal',
                          color: o.isComment ? '#9ca3af' : '#111827',
                          backgroundColor: o.isComment ? '#f3f4f6' : '#fff',
                          textAlign: o.isComment ? 'center' : 'left'
                        }}
                      >
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Difficulty</label>
                  <select
                    className="filter-select"
                    value={selectedDifficulty}
                    onChange={e => setSelectedDifficulty(e.target.value as Difficulty)}
                    disabled={timerState === 'running'}
                  >
                    <option value="Any">Any</option>
                    <option value="Easy">Easy (q1–3)</option>
                    <option value="Medium">Medium (q4–6)</option>
                    <option value="Hard">Hard (q7–10)</option>
                  </select>
                </div>
              </div>

              {/* ── Question box ── */}
              <div className={`question-container${isIdle ? ' question-idle' : ''}`}>
                {isIdle ? (
                  <div className="question-idle-text">按 Start 隨機抽一條題目開始練習</div>
                ) : (
                  <>
                    <div className="question-meta">
                      <span className="question-source">{currentQ?.paperLabel} {currentQ?.setKey}</span>
                      <span className="question-topic">{currentQ?.topic}</span>
                      <span className="question-diff" style={{ color: diffColour, borderColor: diffColour }}>
                        {currentQ?.difficulty} · q{currentQ?.qNum}
                      </span>
                    </div>
                    <div 
                      className="question-text-wrapper" 
                      onClick={() => { 
                        setIsBlurred(false); 
                        setManualRevealed(true); 
                      }}
                    >
                      <div className={`question-text${isBlurred ? ' question-blurred' : ''}`}>{currentQ?.text}</div>
                      {isBlurred && (
                        <div className="blur-overlay">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                          <span>點擊顯示題目</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* ── Timer ── */}
              <div className={`time-display${isFinished ? ' time-done' : ''}`}>
                {fmt(timeLeft)}
              </div>

              <div className="progress-track">
                <div className="progress-bar-inner" style={{ width: `${progress}%` }} />
              </div>

              {/* ── Controls ── */}
              <div className="controls">
                <button
                  className={`primary-btn${timerState === 'running' ? ' btn-pause' : ''}${isPaused ? ' btn-continue' : ''}`}
                  onClick={mainAction}
                >
                  {mainLabel}
                </button>

                {(timerState === 'running' || isPaused) && (
                  <button className="icon-btn" onClick={handleSkip} title="跳過此題" aria-label="Skip question">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />
                    </svg>
                  </button>
                )}
              </div>

              {/* ── Settings toggles ── */}
              <div className="settings-row">
                <button
                  className={`settings-toggle tts-toggle${ttsEnabled ? ' tts-on' : ''}`}
                  onClick={() => setTtsEnabled(v => !v)}
                  aria-label="Toggle read aloud" aria-pressed={ttsEnabled}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    {ttsEnabled
                      ? <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      : <><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>}
                  </svg>
                  {ttsEnabled ? '朗讀 ON' : '朗讀 OFF'}
                </button>

                <button
                  className={`settings-toggle hide-q-toggle${hideQuestion ? ' hide-on' : ''}`}
                  onClick={() => setHideQuestion(v => !v)}
                  aria-label="Toggle hide question" aria-pressed={hideQuestion}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {hideQuestion ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                  {hideQuestion ? '隱藏題目 ON' : '隱藏題目 OFF'}
                </button>
              </div>

            </div>{/* /timer-card */}

            <p className="audio-footnote">
              * 朗讀功能依賴瀏覽器內置語音合成，部分裝置（尤其 Safari / iOS）效果可能有所不同，但唔會影響計時。
            </p>

            {/* ── Guide ── */}
            <div className="guide-container">
              <div className="guide-header">
                <h2>📘 DSE Speaking | Individual Response 攻略</h2>
                <p>想喺 DSE 英文 Speaking IR 攞高分？Individual Response 唔止考你英文底好唔好，仲挑戰你嘅臨場反應同組織能力。以下係為大家整理嘅秘笈：</p>
              </div>

              <div className="guide-section">
                <h3>1. 萬用答題結構：PREP 框架</h3>
                <p>好多同學一緊張就會「斷片」，或者講兩句就完。記住呢個結構，保證你講足 1 分鐘：</p>
                <div className="prep-grid">
                  <div className="prep-card point"><div className="prep-badge">P</div><h4>Point/Thesis Statement (立場)</h4><p>直接回答問題，表達你的個人立場 (Yes/No/Agree/Disagree)</p></div>
                  <div className="prep-card reason"><div className="prep-badge">R</div><h4>Reason (原因)</h4><p>解釋點解你有呢個想法，提出一個強而有力嘅論點</p></div>
                  <div className="prep-card example"><div className="prep-badge">E</div><h4>Example (例子)</h4><p>舉出具體例子、個人經歷，或者詳細描述一個社會情景作補充</p></div>
                  <div className="prep-card point-end"><div className="prep-badge">P</div><h4>Point (總結)</h4><p>簡單用幾句重申立場作結 + conclude (optional)</p></div>
                </div>
              </div>

              <div className="guide-section">
                <h3>2. 不同程度回答示範 (Sample Responses)</h3>
                <p>一個理想嘅 Individual Response 應該維持喺 50–60 秒左右。</p>
                <div className="example-box">
                  <div className="example-header"><span className="level-badge easy">Easy</span><span className="example-q">"Do you like people taking photographs of you?"</span></div>
                  <div className="example-body">
                    <span className="highlight point-hl">To be honest, I actually really enjoy it when people take photographs of me.</span>{' '}
                    <span className="highlight reason-hl">Taking photos is one of the most effective ways to capture fleeting moments and preserve precious memories with friends and family.</span>{' '}
                    <span className="highlight example-hl">For instance, during my recent graduation, my friends and I took tons of pictures. Whenever I feel stressed, looking back at these shots instantly brings a smile to my face.</span>{' '}
                    <span className="highlight point-hl">So all in all, I usually feel quite happy and flattered when someone wants to take a photo of me.</span>
                  </div>
                </div>
                <div className="example-box">
                  <div className="example-header"><span className="level-badge hard">Hard</span><span className="example-q">"Do you think social media makes people feel more lonely?"</span></div>
                  <div className="example-body">
                    <span className="highlight point-hl">From my perspective, I strongly agree that social media makes people feel more lonely.</span>{' '}
                    <span className="highlight reason-hl">Platforms like Instagram give us the illusion of being 'connected', but these digital interactions are often superficial and lack the warmth of face-to-face communication.</span>{' '}
                    <span className="highlight example-hl">A prime example is how many teenagers spend hours scrolling through influencers' curated feeds. Seeing others post about glamorous holidays triggers a toxic cycle of social comparison — the so-called FOMO — which makes young people feel isolated despite having thousands of followers.</span>{' '}
                    <span className="highlight point-hl">Therefore, while social media connects us technologically, it ironically widens the emotional gap between people in reality.</span>
                  </div>
                </div>
              </div>

              <div className="guide-section">
                <h3>3. 加分詞彙表 (Essential Vocabulary)</h3>
                <div className="table-responsive">
                  <table className="vocab-table">
                    <thead><tr><th>用途</th><th>推薦詞彙</th></tr></thead>
                    <tbody>
                      <tr><td><strong>表達立場</strong></td><td>Personally, I believe... / From my perspective... / I tend to agree that...</td></tr>
                      <tr><td><strong>遞進/補充</strong></td><td>Furthermore, / Moreover, / On top of that, / In addition...</td></tr>
                      <tr><td><strong>對比/轉折</strong></td><td>On the other hand, / However, / Nevertheless, / Conversely...</td></tr>
                      <tr><td><strong>舉例說明</strong></td><td>For instance, / A prime example is... / To illustrate this...</td></tr>
                      <tr><td><strong>總結立場</strong></td><td>All in all, / Therefore, / To sum up, / In a nutshell...</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="guide-section two-col-layout">
                <div className="col">
                  <h3>4. 遇到唔識聽/答點算？</h3>
                  <ul className="action-list">
                    <li><strong>爭取時間思考</strong><span>"That's a very interesting question. Let me think for a second..."</span></li>
                    <li><strong>轉移視角</strong><span>"I've never really thought about it that way, but I guess..."</span></li>
                    <li><strong>要求重覆</strong><span>"Could you please rephrase the question for me?"</span></li>
                  </ul>
                </div>
                <div className="col">
                  <h3>5. 點樣練最有效？</h3>
                  <ol className="action-list numbered">
                    <li><strong>隨機抽題</strong> 模擬真實考試，唔好只揀識答嘅題目。</li>
                    <li><strong>聽錄音</strong> 留意有無太多 "er...er..."，注意語速。</li>
                    <li><strong>觀察時鐘</strong> 練到大約 55–60s 講完，唔好被考官截斷。</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* ── FAQ ── */}
            <div className="faq-container">
              <p className="faq-label">DSE Speaking 常見問題</p>
              {FAQS.map(faq => (
                <div key={faq.id} className="faq-item">
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} aria-expanded={openFaq === faq.id}>
                    <span>{faq.question}</span>
                    <svg className={`faq-chevron${openFaq === faq.id ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openFaq === faq.id && <div className="faq-answer">{faq.answer}</div>}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper { padding: 1rem; min-height: 80vh; }
        .layout-center { display: flex; justify-content: center; padding-top: 1rem; padding-bottom: 4rem; }
        .content-stack { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 12px; }

        .timer-card { background: #ffffff; border-radius: 24px; padding: 2.25rem 2.5rem 1.25rem; box-shadow: 0 4px 24px rgba(0,0,0,0.07); display: flex; flex-direction: column; align-items: center; border-top: 5px solid #25D366; }
        .card-header-block { text-align: center; margin-bottom: 1.25rem; width: 100%; }
        .card-title { font-size: 2.4rem; font-weight: 800; color: #111827; margin: 0; letter-spacing: -0.03em; line-height: 1.1; }

        .filter-row { display: flex; gap: 12px; width: 100%; margin-bottom: 1.25rem; }
        .filter-group { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
        .filter-label { font-size: 0.7rem; font-weight: 700; color: #6b7280; letter-spacing: 0.06em; text-transform: uppercase; }
        .filter-select { width: 100%; padding: 7px 10px; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 0.85rem; font-weight: 500; color: #111827; background: #f9fafb; cursor: pointer; transition: border-color 0.15s; }
        .filter-select:focus { outline: none; border-color: #25D366; background: #fff; }
        .filter-select:disabled { opacity: 0.5; cursor: not-allowed; }

        .question-container { background: #dcfce7; border-left: 4px solid #25D366; border-radius: 0 12px 12px 0; padding: 1.1rem 1.4rem; width: 100%; margin-bottom: 1.5rem; min-height: 90px; display: flex; flex-direction: column; justify-content: center; }
        .question-container.question-idle { background: #f9fafb; border-left-color: #d1d5db; }
        .question-idle-text { font-size: 1rem; color: #9ca3af; font-weight: 500; text-align: center; }
        .question-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem; flex-wrap: wrap; }
        .question-source { font-size: 1rem; color: #128C7E; font-weight: 700; letter-spacing: 0.04em; }
        .question-topic  { font-size: 0.9rem; color: #6b7280; }
        .question-diff   { font-size: 0.65rem; font-weight: 700; padding: 1px 6px; border-radius: 99px; border: 1.5px solid; text-transform: uppercase; letter-spacing: 0.04em; margin-left: auto; }
        .question-text   { font-size: 1.12rem; color: #0f1724; line-height: 1.65; font-weight: 600; transition: filter 0.3s ease; }
        .question-blurred { filter: blur(20px); pointer-events: none; user-select: none; }
        .question-text-wrapper { position: relative; cursor: pointer; }
        .blur-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #128C7E; font-weight: 700; font-size: 0.9rem; }

        .time-display { font-size: 5.5rem; font-weight: 800; color: #111827; font-variant-numeric: tabular-nums; letter-spacing: -3px; line-height: 1; margin-bottom: 1rem; transition: color 0.3s; }
        .time-done   { color: #25D366; }
        .progress-track { width: 100%; height: 14px; background: #f3f4f6; border-radius: 99px; overflow: hidden; margin-bottom: 1.75rem; }
        .progress-bar-inner { height: 100%; background: linear-gradient(90deg, #25D366, #128C7E); transition: width 1s linear; border-radius: 99px; }

        .controls { display: flex; align-items: center; gap: 10px; width: 100%; }
        .primary-btn { flex: 1; height: 52px; border: none; background: #25D366; color: #fff; font-size: 1rem; font-weight: 700; border-radius: 14px; cursor: pointer; letter-spacing: 0.04em; transition: background 0.15s; }
        .primary-btn:hover { background: #128C7E; }
        .primary-btn.btn-pause    { background: #f59e0b; } .primary-btn.btn-pause:hover    { background: #d97706; }
        .primary-btn.btn-continue { background: #3b82f6; } .primary-btn.btn-continue:hover { background: #2563eb; }
        .icon-btn { width: 52px; height: 52px; border: 1.5px solid #e5e7eb; background: #fff; border-radius: 14px; color: #6b7280; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: border-color 0.15s, color 0.15s; }
        .icon-btn:hover { border-color: #25D366; color: #128C7E; }

        .settings-row { display: flex; justify-content: center; gap: 10px; margin-top: 0.85rem; width: 100%; }
        .settings-toggle { display: flex; align-items: center; gap: 5px; border: 1.5px solid #e5e7eb; background: #f9fafb; color: #9ca3af; border-radius: 99px; padding: 4px 12px 4px 10px; font-size: 0.72rem; font-weight: 600; cursor: pointer; transition: all 0.15s; letter-spacing: 0.02em; }
        .settings-toggle.tts-on, .settings-toggle.hide-on { border-color: #25D366; background: #f0fdf4; color: #128C7E; }
        .settings-toggle:hover  { border-color: #25D366; color: #128C7E; }

        .audio-footnote { font-size: 0.75rem; color: #9ca3af; text-align: center; margin: 0; padding: 0 0.5rem; line-height: 1.5; }

        .guide-container { background: #fff; border-radius: 20px; padding: 2.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); margin-bottom: 1rem; }
        .guide-header h2 { font-size: 1.5rem; font-weight: 800; color: #111827; margin-bottom: 0.75rem; }
        .guide-header p  { color: #4b5563; font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem; }
        .guide-section { margin-bottom: 2.5rem; } .guide-section:last-child { margin-bottom: 0; }
        .guide-section h3 { font-size: 1.2rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem; }
        .guide-section p  { color: #4b5563; font-size: 0.95rem; margin-bottom: 1.25rem; }
        .prep-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
        .prep-card { padding: 1.25rem; border-radius: 12px; }
        .prep-badge { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.75rem; }
        .prep-card h4 { margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 700; }
        .prep-card p  { margin: 0; font-size: 0.85rem; line-height: 1.5; color: #4b5563; }
        .prep-card.point     { background: #eff6ff; border: 1px solid #bfdbfe; } .prep-card.point     .prep-badge { background: #3b82f6; color: #fff; } .prep-card.point     h4 { color: #1d4ed8; }
        .prep-card.reason    { background: #f0fdf4; border: 1px solid #bbf7d0; } .prep-card.reason    .prep-badge { background: #22c55e; color: #fff; } .prep-card.reason    h4 { color: #15803d; }
        .prep-card.example   { background: #fffbeb; border: 1px solid #fde68a; } .prep-card.example   .prep-badge { background: #f59e0b; color: #fff; } .prep-card.example   h4 { color: #b45309; }
        .prep-card.point-end { background: #faf5ff; border: 1px solid #e9d5ff; } .prep-card.point-end .prep-badge { background: #a855f7; color: #fff; } .prep-card.point-end h4 { color: #7e22ce; }
        .highlight { border-radius: 4px; padding: 0.1rem 0.25rem; }
        .point-hl  { background: #eff6ff; color: #1d4ed8; } .reason-hl { background: #f0fdf4; color: #15803d; } .example-hl { background: #fffbeb; color: #b45309; }
        .example-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
        .example-header { display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e5e7eb; flex-wrap: wrap; }
        .level-badge { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 99px; text-transform: uppercase; }
        .level-badge.easy { background: #dcfce7; color: #166534; } .level-badge.hard { background: #fee2e2; color: #991b1b; }
        .example-q { font-weight: 600; font-size: 0.95rem; color: #111827; }
        .example-body { font-size: 0.95rem; line-height: 1.8; color: #374151; }
        .table-responsive { overflow-x: auto; }
        .vocab-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
        .vocab-table th, .vocab-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .vocab-table th { background: #f9fafb; font-weight: 600; color: #374151; }
        .vocab-table td { color: #4b5563; line-height: 1.5; }
        .vocab-table tbody tr:hover { background: #f9fafb; }
        .two-col-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .action-list { padding-left: 0; margin: 0; list-style: none; }
        .action-list li { margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.5; color: #4b5563; }
        .action-list:not(.numbered) li { padding-left: 1.5rem; position: relative; }
        .action-list:not(.numbered) li::before { content: '💡'; position: absolute; left: 0; }
        .action-list strong { color: #111827; display: block; margin-bottom: 0.2rem; }
        .action-list span { font-style: italic; color: #128C7E; background: #f0fdf4; padding: 2px 6px; border-radius: 4px; display: inline-block; }
        .numbered { counter-reset: wiki-counter; }
        .numbered li { position: relative; padding-left: 1.75rem; }
        .numbered li::before { counter-increment: wiki-counter; content: counter(wiki-counter); position: absolute; left: 0; background: #111827; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; }

        .faq-container { background: #fff; border-radius: 20px; padding: 1.5rem 1.75rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
        .faq-label { font-size: 1.2rem; font-weight: 700; color: #111827; text-align: center; margin-bottom: 0.75rem; }
        .faq-item { border-bottom: 1px solid #f3f4f6; } .faq-item:last-child { border-bottom: none; }
        .faq-question { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; background: none; border: none; padding: 1rem 0; text-align: left; font-size: 0.95rem; font-weight: 600; color: #111827; cursor: pointer; line-height: 1.5; }
        .faq-question:hover { color: #128C7E; }
        .faq-chevron { flex-shrink: 0; color: #9ca3af; transition: transform 0.2s; } .faq-chevron.open { transform: rotate(180deg); color: #25D366; }
        .faq-answer { font-size: 0.88rem; color: #4b5563; line-height: 1.7; padding-bottom: 1rem; }

        @media (max-width: 480px) {
          .timer-card { padding: 1.5rem 1.25rem 1rem; }
          .time-display { font-size: 4.5rem; }
          .card-title { font-size: 1.9rem; }
          .guide-container { padding: 1.5rem; }
          .two-col-layout { grid-template-columns: 1fr; gap: 1.5rem; }
        }
      `}</style>
    </>
  );
}