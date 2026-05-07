import Head from 'next/head'
import PageBreadcrumb from '../components/PageBreadcrumb';
import { useEffect, useMemo, useRef, useState } from 'react'

import FAQSection from '../components/FAQSection'
import PageSEO from '../components/PageSEO'

// --- Types ---
type PaperPreset = { id: string; nameZh: string; nameEn?: string; durationMinutes: number }
type SubjectPreset = { id: string; nameZh: string; nameEn?: string; papers: PaperPreset[] }

const SUBJECT_PRESETS: SubjectPreset[] = [
  {
    id: 'chinese',
    nameZh: '中文',
    nameEn: 'Chinese Language',
    papers: [
      { id: 'p1', nameZh: '卷一 閱讀', nameEn: 'Paper 1 Reading', durationMinutes: 90 },
      { id: 'p2', nameZh: '卷二 寫作', nameEn: 'Paper 2 Writing', durationMinutes: 135 }
    ]
  },
  {
    id: 'english',
    nameZh: '英文',
    nameEn: 'English Language',
    papers: [
      { id: 'p1', nameZh: '卷一 閱讀', nameEn: 'Paper 1 Reading', durationMinutes: 90 },
      { id: 'p2', nameZh: '卷二 寫作', nameEn: 'Paper 2 Writing', durationMinutes: 120 },
      { id: 'p3', nameZh: '卷三 聆聽及綜合', nameEn: 'Paper 3 Listening & Integrated', durationMinutes: 115 },
      { id: 'p4', nameZh: '卷四 說話', nameEn: 'Paper 4 Speaking', durationMinutes: 20 }
    ]
  },
  {
    id: 'math',
    nameZh: '數學 (必修)',
    nameEn: 'Mathematics',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 135 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2 MC', durationMinutes: 75 }
    ]
  },
  {
    id: 'm1',
    nameZh: '數學延伸 M1',
    nameEn: 'Mathematics Extended Part M1',
    papers: [{ id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 150 }]
  },
  {
    id: 'm2',
    nameZh: '數學延伸 M2',
    nameEn: 'Mathematics Extended Part M2',
    papers: [{ id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 150 }]
  },
  {
    id: 'physics',
    nameZh: '物理',
    nameEn: 'Physics',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 150 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 60 }
    ]
  },
  {
    id: 'chemistry',
    nameZh: '化學',
    nameEn: 'Chemistry',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 150 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 60 }
    ]
  },
  {
    id: 'biology',
    nameZh: '生物',
    nameEn: 'Biology',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 150 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 60 }
    ]
  },
  {
    id: 'ict',
    nameZh: 'ICT',
    nameEn: 'Information and Communication Technology',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 120 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 150 }
    ]
  },
  {
    id: 'economics',
    nameZh: '經濟',
    nameEn: 'Economics',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 120 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 90 }
    ]
  },
  {
    id: 'geography',
    nameZh: '地理',
    nameEn: 'Geography',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 120 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 90 }
    ]
  },
  {
    id: 'history',
    nameZh: '歷史',
    nameEn: 'History',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 120 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 90 }
    ]
  },
  {
    id: 'chinese-history',
    nameZh: '中國歷史',
    nameEn: 'Chinese History',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 120 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 90 }
    ]
  },
  {
    id: 'bafs',
    nameZh: 'BAFS',
    nameEn: 'Business, Accounting and Financial Studies',
    papers: [
      { id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 150 },
      { id: 'p2', nameZh: '卷二', nameEn: 'Paper 2', durationMinutes: 90 }
    ]
  },
  {
    id: 'citizen',
    nameZh: '公民與社會發展',
    nameEn: 'Citizenship and Social Development',
    papers: [{ id: 'p1', nameZh: '卷一', nameEn: 'Paper 1', durationMinutes: 120 }]
  }
]

const timerFaqs = [
  { 
    id: 'f1', 
    question: '呢個 DSE 計時器有點樣嘅提醒功能？', 
    answer: '計時器設有「15分鐘預算提醒」同「完結聲效」。當考試時間剩返最後 15 分鐘，系統會彈出提示框並發出聲響，幫你模擬真實考場嘅倒數壓力。' 
  },
  { 
    id: 'f2', 
    question: '「全螢幕模式」對操卷有咩幫助？', 
    answer: '全螢幕模式可以隱藏瀏覽器標籤頁同工具列，減少手機或電腦嘅干擾（Distractions），等你可以 100% 投入「Focus Mode」進入應試狀態。' 
  },
  { 
    id: 'f3', 
    question: 'DSE 操卷時間應該點分配先最有效？', 
    answer: '建議同學根據 DSE 各科官方時間進行「限時操練」。例如中文科卷一閱讀建議留 90 分鐘，操卷時應預留 5-10 分鐘檢查答案。使用我哋嘅預設時間功能，即可一鍵設定各科考試時限。' 
  },
  { 
    id: 'f4', 
    question: '應付 2026 DSE 有咩必備嘅操卷工具？', 
    answer: '除了 Past Paper 同範文集，一個準確嘅 DSE Online Timer 非常重要。透過倒數計時，你可以訓練體感時間，避免喺考場因為過度緊張而導致「寫唔完」或者「做漏題目」嘅情況。' 
  },
  { 
    id: 'f5', 
    question: '點樣提升 DSE 溫習效率同專注力？', 
    answer: '研究顯示，採用「番茄鐘（Pomodoro）」配合 DSE 模擬考試（Mock Exam）環境，能有效提升大腦記憶力。操完一份卷後，建議休息 15 分鐘再檢討錯題，咁樣溫書先會事半功倍。' 
  }
];
function formatClock(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

const ALERT_SOUND_URL = "https://actions.google.com/sounds/v1/alarms/beep_short.ogg";

export default function PaperTimerPage() {

  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedPaperId, setSelectedPaperId] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const [totalTime, setTotalTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // New state for sound toggle
  const [isMuted, setIsMuted] = useState(false);
  // New state to track fullscreen status for rendering UI elements
  const [isFullscreen, setIsFullscreen] = useState(false);


  const [notification, setNotification] = useState<{message: string, type: 'warning' | 'finish'} | null>(null);

  const timerContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const notified15Min = useRef(false);

  const selectedSubject = useMemo(() => SUBJECT_PRESETS.find(s => s.id === selectedSubjectId), [selectedSubjectId]);
  const selectedPaper = useMemo(() => selectedSubject?.papers.find(p => p.id === selectedPaperId), [selectedSubject, selectedPaperId]);
  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  // --- Logic ---

  const playSound = () => {
    // 4. Accessibility: Don't play if muted
    if (isMuted) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(ALERT_SOUND_URL);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log("Audio play failed (user interactions needed first):", e));
  };

  const showInAppNotification = (message: string, type: 'warning' | 'finish') => {
    setNotification({ message, type });
    playSound();
    setTimeout(() => setNotification(null), 5000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      timerContainerRef.current?.requestFullscreen().catch(e => console.error(e));
    } else {
      document.exitFullscreen();
    }
  };

  // Listener to update state when fullscreen changes (e.g., user presses ESC)
  useEffect(() => {
    const handleFsChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    // cleanup
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);


  useEffect(() => {
    if (selectedPaper) {
      const secs = selectedPaper.durationMinutes * 60;
      setTotalTime(secs);
      setTimeLeft(secs);
      setIsActive(false);
      setIsPaused(false);
      notified15Min.current = false;
      setNotification(null);
    }
  }, [selectedPaper]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          const next = t - 1;

          if (next === 900 && !notified15Min.current) {
            showInAppNotification("⚠️ 剩餘 15 分鐘！", "warning");
            notified15Min.current = true;
          }
          if (next <= 0) {
            showInAppNotification("⏰ 考試結束！", "finish");
            setIsActive(false);
            setIsPaused(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, timeLeft, selectedPaper]);

  const handleToggleStartPause = () => {
    if (!selectedPaper || timeLeft === 0) return;
    if (isActive) {
      setIsActive(false);
      setIsPaused(true);
      return;
    }
    setIsActive(true);
    setIsPaused(false);
  };

  return (
    <>
      <PageSEO
        title="DSE 操卷計時器 Timer | 模擬DSE考試計時工具"
        description="最強 DSE 一鍵操卷計時神器。內置 DSE 各科官方考試時間，專為 Mock Exam 及練習 Past Paper 設計。助考生在家精準模擬真實考場節奏，提升答題速度，係 DSE 備戰必備工具。"
        ogTitle="DSE 操卷計時器 Timer | 模擬DSE考試計時工具"
        ogDescription="一鍵即選 DSE 各科官方考試時間。專為模擬試及操卷設計，助你精準掌控答題節奏，喺屋企完美模擬考場體驗，DSE 考生練卷必備。"
        ogUrl="https://dse.best/timer"
        robots={['index', 'follow']}
        pageKey="timer"
      />
      <Head>
        <style>{`
          .timer-wrapper { max-width: 700px; margin: 0 auto; }

          .timer-card-modern {
            background: var(--color-card-bg, #ffffff);
            border-radius: 32px;
            border: 1px solid var(--color-border-color, #f1f5f9);
            padding: 24px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.03);
            position: relative;
            overflow: hidden;
            border-top: 5px solid var(--color-primary, #3a1c9dff);
            transition: all 0.3s ease-in-out;
            color: var(--color-body, #5b6166);
          }

          @media (min-width: 768px) {
            .timer-card-modern { padding: 40px 40px 28px; }
            .sound-toggle-pill { display: none !important; }
            .clock-face { margin: 28px 0; }
          }

          .clock-face {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
            font-weight: 800;
            font-size: clamp(3rem, 11vw, 6rem);
            font-variant-numeric: tabular-nums;
            letter-spacing: -0.03em;
            color: var(--color-heading-color, #1e293b);
            margin: 16px 0;
            line-height: 1;
          }

          .modern-select { background: var(--color-tertiary-bg, #f8fafc); border: 1px solid var(--color-border-color, #e2e8f0); border-radius: 8px; padding: 5px 8px; font-size: 0.78rem; font-weight: 500; appearance: none; cursor: pointer; color: var(--color-body, #374151); }
          .progress-track { height: 10px; background: var(--color-tertiary-bg, #f1f5f9); border-radius: 20px; overflow: hidden; margin-bottom: 20px; }
          .progress-bar-inner { background: var(--color-primary, #6366f1); transition: width 1s linear; border-radius: 20px; }

          .action-btn { border-radius: 12px; padding: 10px 24px; font-size: 0.9rem; font-weight: 700; border: none; white-space: nowrap; transition: background 0.2s; }
          .btn-start { background: var(--color-primary, #6366f1); color: white; }
          .btn-start:hover { background: #4f46e5; }
          .btn-start:disabled { background: var(--color-tertiary-bg, #e2e8f0); cursor: not-allowed; color: var(--color-secondary-color, #94a3b8); }
          .btn-reset { background: var(--color-tertiary-bg, #f1f5f9); color: var(--color-secondary-color, #64748b); margin-left: 8px; white-space: nowrap; }

          .top-controls {
             position: absolute; top: 20px; right: 20px; display: flex; gap: 10px; z-index: 10;
          }

          .icon-btn { background: none; border: none; color: var(--color-secondary-color, #cbd5e1); cursor: pointer; transition: color 0.2s; padding: 4px; }
          .icon-btn:hover { color: var(--color-primary, #6366f1); }
          .icon-btn.active { color: var(--color-primary, #6366f1); }

          @media (max-width: 767px) {
            .icon-btn-fs { display: none !important; }
            .icon-btn-sound { display: none !important; }
          }

          .sound-toggle { display: flex; align-items: center; gap: 5px; border: 1.5px solid var(--color-border-color, #e5e7eb); background: var(--color-tertiary-bg, #f9fafb); color: var(--color-secondary-color, #9ca3af); border-radius: 99px; padding: 4px 12px 4px 10px; font-size: 0.72rem; font-weight: 600; cursor: pointer; }
          .sound-toggle.sound-on { border-color: var(--color-primary, #6366f1); background: #eff6ff; color: var(--color-primary, #6366f1); }
          .timer-settings-row { display: flex; justify-content: center; gap: 10px; margin-top: 0.75rem; width: 100%; }

          .toast-notification {
            position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
            background: var(--color-body-bg, #1e293b); color: white; padding: 12px 24px; border-radius: 50px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2); font-weight: 600; z-index: 100;
            animation: slideDown 0.3s ease-out; white-space: nowrap; display: flex; align-items: center; gap: 10px;
          }
          .toast-warning { background: #f59e0b; color: #fff; }
          .toast-finish { background: #ef4444; color: #fff; }
          @keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 20px; opacity: 1; } }

          .timer-card-modern:fullscreen {
            width: 100vw;
            height: 100dvh;
            background: var(--color-card-bg, #ffffff);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            border-radius: 0; border: none; padding: 0;
            position: fixed; top: 0; left: 0; z-index: 9999;
          }

          .timer-card-modern:fullscreen .hide-on-fs { display: none !important; }
          .show-on-fs { display: none; }
          .timer-card-modern:fullscreen .show-on-fs { display: block; }

          .timer-card-modern:fullscreen .clock-face { font-size: 18vw; margin: 20px 0; }
          .timer-card-modern:fullscreen .progress-track { width: 80%; margin-top: 30px; }

          .fs-exit-btn {
              position: absolute; top: 30px; right: 30px;
              background: var(--color-secondary-bg, rgba(241, 245, 249, 0.8));
              backdrop-filter: blur(5px);
              padding: 10px 20px; border-radius: 12px;
              font-weight: 600; color: var(--color-body, #475569); border: 1px solid var(--color-border-color, transparent);
              display: flex; align-items: center; gap: 8px;
              transition: background 0.2s; cursor: pointer;
          }
          .fs-exit-btn:hover { background: var(--color-tertiary-bg, #e2e8f0); color: var(--color-heading-color, #0f172a); }

          .fs-context-header {
             position: absolute; top: 40px; left: 50%; transform: translateX(-50%);
             font-size: 1.2rem; color: var(--color-secondary-color, #64748b); font-weight: 600;
             text-align: center; width: 80%;
          }

          .card-header-block { text-align: center; margin-bottom: 0.75rem; width: 100%; }

          .timer-card-modern .card-title {
            font-size: 2rem;
            font-weight: 800;
            color: var(--color-heading-color, #111827) !important;
            letter-spacing: -0.03em;
            line-height: 1.1;
            margin: 0;
          }

          @media (max-width: 480px) {
            .timer-card-modern .card-title { font-size: 1.85rem; }
          }

          .exam-durations-card {
            background: var(--color-card-bg, #ffffff);
            border-radius: 16px;
            padding: 1.25rem;
            box-shadow: 0 2px 12px rgba(0,0,0,0.04);
            border: 1px solid var(--color-border-color, #f1f5f9);
            color: var(--color-body, #5b6166);
          }

          .exam-durations-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--color-heading-color, #111827);
            margin: 0 0 0.5rem 0;
            letter-spacing: -0.01em;
          }

          .exam-durations-subtitle {
            font-size: 0.85rem;
            color: var(--color-secondary-color, #4b5563);
            margin: 0 0 1rem 0;
            line-height: 1.5;
          }

          .table-responsive {
            overflow-x: auto;
          }

          .durations-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
            min-width: 480px;
            color: var(--color-body, #374151);
          }

          .durations-table th,
          .durations-table td {
            padding: 0.65rem 0.75rem;
            text-align: left;
            border-bottom: 1px solid var(--color-border-color, #e5e7eb);
            vertical-align: top;
          }

          .durations-table th {
            background: var(--color-tertiary-bg, #f9fafb);
            font-weight: 700;
            color: var(--color-heading-color, #374151);
            position: sticky;
            top: 0;
          }

          .subject-cell {
            font-weight: 700;
            color: var(--color-heading-color, #111827);
            white-space: nowrap;
          }

          .paper-cell {
            color: var(--color-body, #374151);
            font-weight: 600;
          }

          .duration-cell {
            color: var(--color-heading-color, #111827);
            font-variant-numeric: tabular-nums;
            white-space: nowrap;
          }
        `}</style>
      </Head>

      <PageBreadcrumb section="工具" text="DSE 操卷計時器" />

      <div className="timer-wrapper">
        <div className="timer-card-modern text-center" ref={timerContainerRef}>
          
          {notification && (
            <div className={`toast-notification ${notification.type === 'finish' ? 'toast-finish' : 'toast-warning'}`}>
               {notification.message}
            </div>
          )}

          {/* --- Top Controls (desktop: sound icon + fullscreen) --- */}
          <div className="top-controls hide-on-fs">
            <button
              className={`icon-btn icon-btn-sound${isMuted ? '' : ' active'}`}
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
              aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
              aria-pressed={isMuted}
            >
              {isMuted
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              }
            </button>
            <button className="icon-btn icon-btn-fs" onClick={toggleFullscreen} title="Enter Focus Mode" aria-label="Enter Fullscreen">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </button>
          </div>

          {/* --- 1. Fullscreen Exit Button (Render only if isFullscreen is true) --- */}
          {isFullscreen && (
            <button className="fs-exit-btn" onClick={toggleFullscreen} aria-label="Exit Fullscreen">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                Exit Focus Mode
            </button>
          )}

          {/* --- 2. Fullscreen Context Header (Render only if isFullscreen is true) --- */}
          {isFullscreen && (
            <div className="fs-context-header" role="status">
                {selectedSubject?.nameZh} {selectedPaper ? `- ${selectedPaper.nameZh}` : ''}
            </div>
          )}

          <div className="card-header-block hide-on-fs">
            <h1 className="card-title">DSE 操卷計時器</h1>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4 hide-on-fs">
            <div className="text-left">
              <label className="text-xs font-bold text-[color:var(--bs-secondary-color,#6b7280)] mb-1 block ml-1">科目</label>
              <select className="modern-select w-full" value={selectedSubjectId} onChange={e => { setSelectedSubjectId(e.target.value); setSelectedPaperId(''); }}>
                <option value="">Select Subject</option>
                {SUBJECT_PRESETS.map(s => <option key={s.id} value={s.id}>{s.nameZh}</option>)}
              </select>
            </div>
            <div className="text-left">
              <label className="text-xs font-bold text-[color:var(--bs-secondary-color,#6b7280)] mb-1 block ml-1">試卷</label>
              <select className="modern-select w-full" value={selectedPaperId} disabled={!selectedSubject} onChange={e => setSelectedPaperId(e.target.value)}>
                <option value="">Select Paper</option>
                {selectedSubject?.papers.map(p => <option key={p.id} value={p.id}>{p.nameZh}</option>)}
              </select>
            </div>
          </div>

          <div className="clock-face">
            {formatClock(timeLeft)}
          </div>

          <div className="progress-track">
            <div className="progress-bar-inner h-full" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="flex justify-center hide-on-fs">
            <button className="action-btn btn-start flex-grow" disabled={!selectedPaper || timeLeft === 0} onClick={handleToggleStartPause}>
              {isActive ? '暫停 (Pause)' : isPaused ? '繼續 (Continue)' : '開始 (Start)'}
            </button>
            <button className="action-btn btn-reset" onClick={() => {
                const s = (selectedPaper?.durationMinutes || 0) * 60;
                setTimeLeft(s); setTotalTime(s); setIsActive(false); setIsPaused(false); notified15Min.current = false; setNotification(null);
              }}>重置 (Reset)</button>
          </div>

          <div className="timer-settings-row sound-toggle-pill hide-on-fs">
            <button
              className={`sound-toggle${isMuted ? '' : ' sound-on'}`}
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
              aria-pressed={isMuted}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {isMuted
                  ? <><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></>
                  : <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></>
                }
              </svg>
              {isMuted ? '聲效 OFF' : '聲效 ON'}
            </button>
          </div>
        </div>

        <div className="mt-4 hide-on-fs">
          <div className="exam-durations-card">
            <h3 className="exam-durations-title">DSE 各科考核時間一覽</h3>
            <p className="exam-durations-subtitle">以下時間來自官方指引，用作快速參考與規劃操卷時間。</p>

            <div className="table-responsive">
              <table className="durations-table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>科目</th>
                    <th>試卷</th>
                    <th style={{ width: '18%' }}>時間</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBJECT_PRESETS.flatMap(subject =>
                    subject.papers.map(paper => (
                      <tr key={`${subject.id}-${paper.id}`}>
                        <td className="subject-cell">{subject.nameZh}</td>
                        <td className="paper-cell">{paper.nameZh}</td>
                        <td className="duration-cell">{paper.durationMinutes} 分鐘</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-5 hide-on-fs">
          <FAQSection faqs={timerFaqs} />
        </div>
      </div>
    </>
  );
}