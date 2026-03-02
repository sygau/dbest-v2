import Head from 'next/head'
import { useEffect, useMemo, useRef, useState } from 'react'

import FAQSection from '../components/FAQSection'
import {
  generatePageFAQStructuredData,
  generateTimerStructuredData,
  getPageFAQs,
  getTimerPageMetadata
} from '../utils/structuredData'

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

  const metadata = useMemo(() => getTimerPageMetadata(), [])
  const structuredData = useMemo(() => generateTimerStructuredData(), [])
  const faqStructuredData = useMemo(() => generatePageFAQStructuredData('timer'), [])

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
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {metadata.robots && <meta name="robots" content={metadata.robots} />}
        {metadata.ogUrl && <link rel="canonical" href={metadata.ogUrl} />}
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta property="og:type" content={metadata.ogType} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData)}} />
        {faqStructuredData && (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData)}} />)}

        <style>{`
          .timer-wrapper { max-width: 700px; margin: 0 auto; }
          
          .timer-card-modern { 
            background: #ffffff; 
            border-radius: 32px; 
            border: 1px solid #f1f5f9; 
            padding: 24px; 
            box-shadow: 0 10px 40px rgba(0,0,0,0.03); 
            position: relative;
            overflow: hidden; 
            border-top: 5px solid #3a1c9dff;
            /* Smooth transition for fullscreen change */
            transition: all 0.3s ease-in-out;
          }
          
          @media (min-width: 768px) {
            .timer-card-modern { padding: 40px; }
          }
          
          .clock-face { 
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
            font-weight: 800; 
            font-size: clamp(3.5rem, 13vw, 7.5rem); 
            font-variant-numeric: tabular-nums;
            letter-spacing: -0.02em; 
            color: #1e293b; 
            margin: 15px 0; 
            line-height: 1; 
          }

          .modern-select { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 20px; font-weight: 500; appearance: none; cursor: pointer; }
          .progress-track { height: 12px; background: #f1f5f9; border-radius: 20px; overflow: hidden; margin-bottom: 35px; }
          .progress-bar-inner { background: #6366f1; transition: width 1s linear; border-radius: 20px; }
          
          .action-btn { border-radius: 16px; padding: 18px 36px; font-weight: 700; border: none; transition: background 0.2s; }
          .btn-start { background: #6366f1; color: white; }
          .btn-start:hover { background: #4f46e5; }
          .btn-start:disabled { background: #a5a6f6; cursor: not-allowed; }
          .btn-reset { background: #f1f5f9; color: #64748b; margin-left: 12px; }
          
          /* Top controls bar */
          .top-controls {
             position: absolute; top: 25px; right: 25px; display: flex; gap: 15px; z-index: 10;
          }

          .icon-btn { background: none; border: none; color: #cbd5e1; cursor: pointer; transition: color 0.2s; padding: 4px; }
          .icon-btn:hover { color: #6366f1; }
          .icon-btn.active { color: #6366f1; }

          .toast-notification {
            position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
            background: #1e293b; color: white; padding: 12px 24px; border-radius: 50px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2); font-weight: 600; z-index: 100;
            animation: slideDown 0.3s ease-out; white-space: nowrap; display: flex; align-items: center; gap: 10px;
          }
          .toast-warning { background: #f59e0b; color: #fff; }
          .toast-finish { background: #ef4444; color: #fff; }
          @keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 20px; opacity: 1; } }

          /* --- 3. Mobile Fullscreen Optimization --- */
          .timer-card-modern:fullscreen {
            width: 100vw; 
            /* Use dvh for mobile browsers to account for address bars */
            height: 100dvh; 
            background: #ffffff;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            border-radius: 0; border: none; padding: 0;
            /* Ensure it sits on top of everything on mobile */
            position: fixed; top: 0; left: 0; z-index: 9999;
          }

          /* Helper classes for fullscreen visibility */
          .timer-card-modern:fullscreen .hide-on-fs { display: none !important; }
          .show-on-fs { display: none; }
          .timer-card-modern:fullscreen .show-on-fs { display: block; }

          /* Adjustments for fullscreen elements */
          .timer-card-modern:fullscreen .clock-face { font-size: 18vw; margin: 20px 0; }
          .timer-card-modern:fullscreen .progress-track { width: 80%; margin-top: 30px; }

          /* 1. Fullscreen Exit Button style */
          .fs-exit-btn {
              position: absolute; top: 30px; right: 30px;
              background: rgba(241, 245, 249, 0.8);
              backdrop-filter: blur(5px);
              padding: 10px 20px; border-radius: 12px;
              font-weight: 600; color: #475569; border: none;
              display: flex; align-items: center; gap: 8px;
              transition: background 0.2s; cursor: pointer;
          }
          .fs-exit-btn:hover { background: #e2e8f0; color: #0f172a; }
          
          /* 2. Fullscreen Context Header style */
          .fs-context-header {
             position: absolute; top: 40px; left: 50%; transform: translateX(-50%);
             font-size: 1.2rem; color: #64748b; font-weight: 600;
             text-align: center; width: 80%;
          }

          .card-header-block { text-align: center; margin-bottom: 1.5rem; width: 100%; }

          .timer-card-modern .card-title {
            font-size: 2.6rem;
            font-weight: 800;
            color: #111827 !important;
            letter-spacing: -0.03em;
            line-height: 1.1;
            margin: 0;
          }

          .exam-durations-card {
            background: #ffffff;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 2px 12px rgba(0,0,0,0.04);
            border: 1px solid #f1f5f9;
          }

          .exam-durations-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #111827;
            margin: 0 0 0.75rem 0;
            letter-spacing: -0.02em;
          }

          .exam-durations-subtitle {
            font-size: 0.95rem;
            color: #4b5563;
            margin: 0 0 1.25rem 0;
            line-height: 1.6;
          }

          .table-responsive {
            overflow-x: auto;
          }

          .durations-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.92rem;
            min-width: 520px;
          }

          .durations-table th,
          .durations-table td {
            padding: 0.9rem 0.85rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: top;
          }

          .durations-table th {
            background: #f9fafb;
            font-weight: 700;
            color: #374151;
            position: sticky;
            top: 0;
          }

          .subject-cell {
            font-weight: 700;
            color: #111827;
            white-space: nowrap;
          }

          .paper-cell {
            color: #374151;
            font-weight: 600;
          }

          .duration-cell {
            color: #111827;
            font-variant-numeric: tabular-nums;
            white-space: nowrap;
          }
        `}</style>
      </Head>

      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-4 hide-on-fs">
        <div className="breadcrumb-title pe-3">工具</div>
        <div className="ps-3"><nav><ol className="breadcrumb mb-0 p-0"><li className="breadcrumb-item active">DSE 操卷計時器</li></ol></nav></div>
      </div>

      <div className="timer-wrapper">
        <div className="timer-card-modern text-center" ref={timerContainerRef}>
          
          {notification && (
            <div className={`toast-notification ${notification.type === 'finish' ? 'toast-finish' : 'toast-warning'}`}>
               {notification.message}
            </div>
          )}

          {/* --- Top Controls (Sound + Enter Fullscreen) --- */}
          <div className="top-controls hide-on-fs">
             {/* 4. Sound Toggle Button (ARIA compliant) */}
            <button 
                className={`icon-btn ${isMuted ? '' : 'active'}`} 
                onClick={() => setIsMuted(!isMuted)} 
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
                aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
                aria-pressed={isMuted}
            >
               {isMuted ? (
                  /* Muted Icon */
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
               ) : (
                  /* Sound On Icon */
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
               )}
            </button>

            <button className="icon-btn" onClick={toggleFullscreen} title="Enter Focus Mode" aria-label="Enter Fullscreen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
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

          <div className="row g-3 mb-5 hide-on-fs">
            {/* Select inputs remain the same... */}
            <div className="col-6 text-start">
              <label className="small fw-bold text-muted mb-2 d-block ms-1">科目</label>
              <select className="modern-select w-100" value={selectedSubjectId} onChange={e => { setSelectedSubjectId(e.target.value); setSelectedPaperId(''); }}>
                <option value="">Select Subject</option>
                {SUBJECT_PRESETS.map(s => <option key={s.id} value={s.id}>{s.nameZh}</option>)}
              </select>
            </div>
            <div className="col-6 text-start">
              <label className="small fw-bold text-muted mb-2 d-block ms-1">試卷</label>
              <select className="modern-select w-100" value={selectedPaperId} disabled={!selectedSubject} onChange={e => setSelectedPaperId(e.target.value)}>
                <option value="">Select Paper</option>
                {selectedSubject?.papers.map(p => <option key={p.id} value={p.id}>{p.nameZh}</option>)}
              </select>
            </div>
          </div>

          <div className="clock-face">
            {formatClock(timeLeft)}
          </div>

          <div className="progress-track">
            <div className="progress-bar-inner h-100" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="d-flex justify-content-center hide-on-fs">
             {/* Standardized Chinese button text */}
            <button className="action-btn btn-start flex-grow-1" disabled={!selectedPaper || timeLeft === 0} onClick={handleToggleStartPause}>
              {isActive ? '暫停 (Pause)' : isPaused ? '繼續 (Continue)' : '開始 (Start)'}
            </button>
            <button className="action-btn btn-reset" onClick={() => {
                const s = (selectedPaper?.durationMinutes || 0) * 60;
                setTimeLeft(s); setTotalTime(s); setIsActive(false); setIsPaused(false); notified15Min.current = false; setNotification(null);
              }}>重置 (Reset)</button>
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