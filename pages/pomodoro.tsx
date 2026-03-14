import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import {
  generatePomodoroStructuredData,
  getMainPageMetadata
} from '../utils/structuredData';
import { BiReset, BiPlay, BiPause, BiCog, BiTime, BiCheckCircle, BiBulb, BiListCheck, BiTrophy } from 'react-icons/bi';

// 1. Types & Config
type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

// Static config for Colors and Labels
const MODE_CONFIG: Record<TimerMode, { label: string; color: string; lightColor: string }> = {
  pomodoro: { label: '專注模式', color: '#e55050', lightColor: '#ffe5e5' },
  shortBreak: { label: '短暫休息', color: '#38858a', lightColor: '#e0f5f6' },
  longBreak: { label: '長休息', color: '#397097', lightColor: '#e0edf6' },
};

export default function PomodoroPage() {
  // --- State ---
  const [mode, setMode] = useState<TimerMode>('pomodoro');

  // Custom durations (in minutes)
  const [durations, setDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  });

  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Statistics State (sessions + totalSeconds)
  const [stats, setStats] = useState({
    sessions: 0,
    totalSeconds: 0
  });

  // --- Refs ---
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeLeftRef = useRef<number>(timeLeft);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Metadata ---
  const metadata = getMainPageMetadata('pomodoro');
  const structuredData = generatePomodoroStructuredData ? generatePomodoroStructuredData() : {};

  // --- Effects ---

  // 1. Load Stats from LocalStorage on Mount
  useEffect(() => {
    const savedStats = localStorage.getItem('pomodoroStats');
    const savedDurations = localStorage.getItem('pomodoroDurations');

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    if (savedDurations) {
      setDurations(JSON.parse(savedDurations));
    }
  }, []);

  // 2. Save Stats & Durations whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('pomodoroDurations', JSON.stringify(durations));
  }, [durations]);

  // Cleanup Timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.title = "番茄鐘 Pomodoro";
    };
  }, []);

  // --- Logic ---

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    // Set time based on the custom duration
    const newTime = durations[newMode] * 60;
    setTimeLeft(newTime);

    document.title = "番茄鐘 Pomodoro";
  };

  const handleDurationChange = (key: TimerMode, value: string) => {
    const numVal = parseInt(value);
    if (!isNaN(numVal) && numVal > 0 && numVal <= 180) {
      setDurations(prev => ({ ...prev, [key]: numVal }));

      // Update timer immediately if we are editing the active mode and it's paused
      if (mode === key && !isActive) {
        setTimeLeft(numVal * 60);
      }
    }
  };

  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsActive(true);
      startTimeRef.current = Date.now();
      timeLeftRef.current = timeLeft;

      timerRef.current = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newTimeLeft = timeLeftRef.current - secondsPassed;

        if (newTimeLeft <= 0) {
          finishTimer();
        } else {
          setTimeLeft(newTimeLeft);
          document.title = `${formatTime(newTimeLeft)} - ${MODE_CONFIG[mode].label}`;
        }
      }, 100);
    }
  };
  const sendNotification = (title: string, body: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: 'https://dse.best/favicon.ico' });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };
  const finishTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(0);
    playAlarm();

    // Update Stats only if it was a Pomodoro session
    if (mode === 'pomodoro') {
      const sessionSeconds = durations.pomodoro * 60;
      setStats(prev => ({
        sessions: prev.sessions + 1,
        totalSeconds: prev.totalSeconds + sessionSeconds
      }));
    }
    sendNotification(
      mode === 'pomodoro' ? '專注時段結束！' : '休息時間完咗啦！',
      mode === 'pomodoro' ? '做得好！休息一下先啦。' : '準備好繼續努力未？'
    );
  };

  const resetTimer = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(durations[mode] * 60);
    document.title = "番茄鐘 Pomodoro";
  };

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  // Format MM:SS for the main timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Format HH:MM:SS for total stats
  const formatTotalTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    const hDisplay = h < 10 ? `0${h}` : h;
    const mDisplay = m < 10 ? `0${m}` : m;
    const sDisplay = s < 10 ? `0${s}` : s;

    return `${hDisplay}:${mDisplay}:${sDisplay}`;
  };

  const currentTheme = MODE_CONFIG[mode];

  return (
    <>
      <Head>
        <title>{metadata?.title || 'DSE 番茄鐘 Pomodoro Timer | 專注學習工具'}</title>
        <meta name="description" content={metadata?.description || 'DSE 番茄鐘 Pomodoro Timer 專注學習工具，幫助DSE學生提高學習效率，合理安排學習和休息時間。'} />
        <meta name="robots" content={metadata?.robots || 'index, follow'} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata?.ogTitle || 'DSE 番茄鐘 Pomodoro Timer | 專注學習工具'} />
        <meta property="og:description" content={metadata?.ogDescription || 'DSE 番茄鐘 Pomodoro Timer 專注學習工具，幫助DSE學生提高學習效率，合理安排學習和休息時間。'} />
        <meta property="og:image" content={metadata?.ogImage || 'https://dse.best/assets/images/logo-icon.png'} />
        <meta property="og:url" content={metadata?.ogUrl || 'https://dse.best/pomodoro'} />
        <meta property="og:type" content={metadata?.ogType || 'website'} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePomodoroStructuredData())
          }}
        />
      </Head>

      <div className="page-wrapper">

        {/* Breadcrumb */}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">工具</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item active" aria-current="page">番茄鐘 Pomodoro</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="layout-center">
          <audio ref={audioRef} src="/sounds/alarm.mp3" preload="auto" />

          <div className="content-stack">

            {/* --- 1. MAIN TIMER CARD --- */}
            <div className="timer-card">

              {/* Header Title (Bigger) */}
              <div className="card-header-block">
                <h1 className="card-title">番茄鐘 Pomodoro</h1>
              </div>

              {/* Mode Switcher */}
              <div className="mode-switcher">
                {(Object.keys(MODE_CONFIG) as TimerMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`mode-btn ${mode === m ? 'active' : ''}`}
                  >
                    {MODE_CONFIG[m].label}
                  </button>
                ))}
              </div>

              {/* Time Display */}
              <div className="time-display">
                {formatTime(timeLeft)}
              </div>

              {/* Action Area */}
              <div className="actions">
                <button
                  className={`primary-btn ${isActive ? 'active-state' : ''}`}
                  onClick={toggleTimer}
                >
                  {isActive ? <BiPause style={{ fontSize: '23px', marginRight: '-8px', marginTop: '2px' }} /> : <BiPlay style={{ fontSize: '23px', marginRight: '-8px', marginTop: '2px' }} />}
                  <span>{isActive ? '暫停 (PAUSE)' : '開始 (START)'}</span>
                </button>

                <button
                  className="reset-btn"
                  onClick={resetTimer}
                  aria-label="Reset Timer"
                >
                  <BiReset />
                </button>
              </div>

              {/* Settings Toggle */}
              <button
                className="settings-toggle-btn"
                onClick={() => setShowSettings(!showSettings)}
              >
                <BiCog style={{ marginTop: '3px' }} /> Settings
              </button>

              {/* Collapsible Settings Panel */}
              <div className={`settings-panel ${showSettings ? 'open' : ''}`}>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>專注 (分)</label>
                    <input
                      type="number"
                      value={durations.pomodoro}
                      onChange={(e) => handleDurationChange('pomodoro', e.target.value)}
                    />
                  </div>
                  <div className="setting-item">
                    <label>短休 (分)</label>
                    <input
                      type="number"
                      value={durations.shortBreak}
                      onChange={(e) => handleDurationChange('shortBreak', e.target.value)}
                    />
                  </div>
                  <div className="setting-item">
                    <label>長休 (分)</label>
                    <input
                      type="number"
                      value={durations.longBreak}
                      onChange={(e) => handleDurationChange('longBreak', e.target.value)}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* --- 2. STATISTICS CARDS (Moved Below) --- */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                  <BiTime />
                </div>
                <div className="stat-info">
                  <span className="stat-label">總專注時間 Total Focus Time</span>
                  <span className="stat-value">{formatTotalTime(stats.totalSeconds)}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
                  🍅
                </div>
                <div className="stat-info">
                  <span className="stat-label">完成次數 Total Sessions</span>
                  <span className="stat-value">{stats.sessions} 次</span>
                </div>
              </div>
            </div>

            <div className="info-card">

              <h3 className="info-title">
                <BiBulb className="title-icon" />
                使用指南 & DSE 備戰貼士
              </h3>

              <div className="info-section">
                <h4>🍅 如何使用番茄工作法？</h4>
                <p>番茄鐘 (Pomodoro) 係一個極高效率嘅時間管理方法，幫你喺溫書時保持專注：</p>
                <ul>
                  <li><strong>設定目標<br></br></strong> 揀好一科或者一個 Past Paper 課題。</li>
                  <li><strong>專注衝刺 (25分鐘)<br></br></strong> 全心投入溫習，謝絕手機干擾。</li>
                  <li><strong>短暫充電 (5分鐘)<br></br></strong> 響鬧後必須停手！飲啖水、閉目養神或伸展吓。</li>
                  <li><strong>長休息<br></br></strong> 每完成 4 個循環，獎勵自己一個 15-30 分鐘嘅長休息。</li>
                </ul>
              </div>

              <div className="divider"></div>

              <div className="info-section">
                <h4>🏆 對 DSE 同學有咩幫助？</h4>
                <p>
                  DSE 係一場持久戰，唔係鬥坐得耐，係鬥溫得入腦：
                </p>
                <ul>
                  <li><strong>擊退拖延症<br></br></strong> 覺得課題太難唔想開始？同自己講：「淨係專注 25 分鐘先」，心理壓力即刻減低。</li>
                  <li><strong>避免 Burnout<br></br></strong> 強制休息可以令大腦即使喺高壓下都能夠「回血」，加強記憶力同理解力。</li>
                  <li><strong>數據化進度<br></br></strong> 望住「完成次數」增加，會有一種實在嘅成功感，推動你繼續溫落去。</li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper {
            padding: 1rem;
            min-height: 80vh;
        }

        .layout-center {
          display: flex;
          justify-content: center;
          padding-bottom: 4rem;
        }

        .content-stack {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 20px; /* Spacing between Timer and Stats */
        }

        /* --- TIMER CARD --- */
        .timer-card {
          background: var(--bs-card-bg, #ffffff);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.05),
            0 4px 6px -2px rgba(0, 0, 0, 0.025);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          border: 1px solid var(--bs-border-color, transparent);
          border-top: 6px solid ${currentTheme.color}; 
          transition: border-color 0.3s ease;
          color: var(--bs-body-color, #5b6166);
        }

        .card-header-block {
          text-align: center;
          margin-bottom: 1.5rem;
          width: 100%;
        }

        .card-title {
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--bs-heading-color, #111827);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
        }

        /* Mode Switcher */
        .mode-switcher {
          display: flex;
          background: var(--bs-tertiary-bg, #f3f4f6);
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 2rem;
          width: 100%;
        }

        .mode-btn {
          flex: 1;
          border: none;
          background: transparent;
          padding: 8px 4px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--bs-secondary-color, #6b7280);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .mode-btn.active {
          background: var(--bs-secondary-bg, white);
          color: ${currentTheme.color};
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }

        /* Time Display */
        .time-display {
          font-size: 5rem;
          font-weight: 700;
          color: var(--bs-heading-color, #1f2937);
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          line-height: 1;
          margin-bottom: 2.5rem;
          letter-spacing: -2px;
        }

        /* Actions */
        .actions {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .primary-btn {
          flex: 1;
          height: 56px;
          border: none;
          background: ${currentTheme.color};
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.1s, opacity 0.2s, background-color 0.3s;
        }

        .primary-btn:hover {
          opacity: 0.95;
        }

        .primary-btn:active {
          transform: scale(0.98);
        }

        .primary-btn.active-state {
            background: var(--bs-tertiary-bg, #f3f4f6);
            color: var(--bs-body-color, #374151);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }

        .reset-btn {
          width: 56px;
          height: 56px;
          border: 2px solid var(--bs-border-color, #f3f4f6);
          background: transparent;
          border-radius: 16px;
          color: var(--bs-secondary-color, #6b7280);
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reset-btn:hover {
          border-color: var(--bs-border-color, #e5e7eb);
          background: var(--bs-tertiary-bg, #f9fafb);
          color: var(--bs-body-color, #374151);
        }

        /* Settings Area */
        .settings-toggle-btn {
          background: none;
          border: none;
          color: var(--bs-secondary-color, #9ca3af);
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px;
          border-radius: 6px;
        }
        
        .settings-toggle-btn:hover {
          color: var(--bs-body-color, #4b5563);
          background: var(--bs-tertiary-bg, #f9fafb);
        }

        .settings-panel {
          width: 100%;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out, margin-top 0.3s;
          background: var(--bs-tertiary-bg, #f8fafc);
          border-radius: 12px;
        }

        .settings-panel.open {
          max-height: 200px;
          margin-top: 1rem;
          padding: 1rem;
          border: 1px solid var(--bs-border-color, #e2e8f0);
        }

        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        .setting-item {
          display: flex;
          flex-direction: column;
        }

        .setting-item label {
          font-size: 0.75rem;
          color: var(--bs-secondary-color, #64748b);
          margin-bottom: 4px;
        }

        .setting-item input {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--bs-border-color, #cbd5e1);
          border-radius: 8px;
          font-size: 0.9rem;
          text-align: center;
          color: var(--bs-body-color, #374151);
          background-color: var(--bs-card-bg, #fff);
        }

        /* --- STATISTICS CARDS --- */
        .stats-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .stat-card {
          background: var(--bs-card-bg, white);
          border-radius: 16px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.03);
          border: 1px solid var(--bs-border-color, rgba(0,0,0,0.04));
          color: var(--bs-body-color, #5b6166);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--bs-secondary-color, #6b7280);
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--bs-heading-color, #1f2937);
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
        }
          .info-card {
    background: var(--bs-card-bg, white);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
    color: var(--bs-body-color, #4b5563);
    margin-top: 1rem;
    border: 1px solid var(--bs-border-color, transparent);
  }

  .info-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--bs-heading-color, #1f2937);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .title-icon {
    color: #f59e0b; /* Amber color for bulb */
    font-size: 1.5rem;
  }

  .info-section h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--bs-heading-color, #374151);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .info-section ul {
    padding-left: 1.2rem;
    margin-bottom: 0;
  }

  .info-section li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .info-section li:last-child {
    margin-bottom: 0;
  }

  .info-section strong {
    color: var(--bs-emphasis-color, #111827);
    font-weight: 600;
  }

  .divider {
    height: 1px;
    background: var(--bs-border-color, #e5e7eb);
    margin: 1.5rem 0;
  }

        @media (max-width: 480px) {
          .timer-card {
            padding: 1.5rem;
          }
          .time-display {
            font-size: 4rem;
          }
          .card-title {
            font-size: 1.9rem;
          }
        }
      `}</style>
    </>
  );
}