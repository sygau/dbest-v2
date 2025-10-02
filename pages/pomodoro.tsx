import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { 
  generatePomodoroStructuredData,
  getMainPageMetadata 
} from '../utils/structuredData';
import { BiPlay, BiPause, BiRefresh, BiSkipNext, BiCog } from 'react-icons/bi';

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // Total time in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [timerMode, setTimerMode] = useState('work'); // 'work', 'break', 'longBreak'
  const [workDuration, setWorkDuration] = useState<number | string>(25);
  const [breakDuration, setBreakDuration] = useState<number | string>(5);
  const [longBreakDuration, setLongBreakDuration] = useState<number | string>(15);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const metadata = getMainPageMetadata('pomodoro');

  // Save timer state to localStorage
  const saveTimerState = () => {
    const state = {
      timeLeft,
      isActive,
      isBreak,
      sessions,
      totalTime,
      isPaused,
      timerMode,
      workDuration,
      breakDuration,
      longBreakDuration,
      startTime
    };
    localStorage.setItem('pomodoroState', JSON.stringify(state));
  };

  // Load timer state from localStorage
  const loadTimerState = () => {
    // Load settings first
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setWorkDuration(settings.workDuration || 25);
        setBreakDuration(settings.breakDuration || 5);
        setLongBreakDuration(settings.longBreakDuration || 15);
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }

    // Load timer state
    const saved = localStorage.getItem('pomodoroState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const savedTimeLeft = state.timeLeft || 25 * 60;
        const savedIsActive = state.isActive || false;
        const savedStartTime = state.startTime || null;
        
        // If timer was active, calculate elapsed time
        if (savedIsActive && savedStartTime) {
          const elapsed = Math.floor((Date.now() - savedStartTime) / 1000);
          const newTimeLeft = Math.max(0, savedTimeLeft - elapsed);
          
          if (newTimeLeft <= 0) {
            // Timer should have completed
            setTimeLeft(0);
            setIsActive(false);
            setIsPaused(false);
            setStartTime(null);
            // Trigger completion logic
            setTimeout(() => {
              handleTimerComplete();
            }, 100);
          } else {
            setTimeLeft(newTimeLeft);
            setIsActive(true);
            setStartTime(savedStartTime);
          }
        } else {
          setTimeLeft(savedTimeLeft);
          setIsActive(false);
          setStartTime(null);
        }
        
        setIsBreak(state.isBreak || false);
        setSessions(state.sessions || 0);
        setTotalTime(state.totalTime || 0);
        setIsPaused(state.isPaused || false);
        setTimerMode(state.timerMode || 'work');
      } catch (e) {
        console.error('Failed to load timer state:', e);
      }
    }
  };

  // Load state on mount
  useEffect(() => {
    loadTimerState();
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    saveTimerState();
  }, [timeLeft, isActive, isBreak, sessions, totalTime, isPaused, timerMode, workDuration, breakDuration, longBreakDuration, startTime]);

  // Save settings when they change
  useEffect(() => {
    const settings = {
      workDuration: typeof workDuration === 'number' ? workDuration : parseInt(workDuration) || 25,
      breakDuration: typeof breakDuration === 'number' ? breakDuration : parseInt(breakDuration) || 5,
      longBreakDuration: typeof longBreakDuration === 'number' ? longBreakDuration : parseInt(longBreakDuration) || 15
    };
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [workDuration, breakDuration, longBreakDuration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    playNotificationSound();
    
    const workTime = typeof workDuration === 'number' ? workDuration : parseInt(workDuration) || 25;
    const breakTime = typeof breakDuration === 'number' ? breakDuration : parseInt(breakDuration) || 5;
    
    if (!isBreak) {
      // Work session completed
      const newSessions = sessions + 1;
      setSessions(newSessions);
      setTotalTime(prev => prev + (workTime * 60));
      
      // Set break time
      setIsBreak(true);
      setTimeLeft(breakTime * 60);
    } else {
      // Break completed
      setIsBreak(false);
      setTimeLeft(workTime * 60);
    }
  };

  const playNotificationSound = () => {
    // Create a simple notification sound using Web Audio API
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
    setStartTime(Date.now());
  };

  const pauseTimer = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    const workTime = typeof workDuration === 'number' ? workDuration : parseInt(workDuration) || 25;
    const breakTime = typeof breakDuration === 'number' ? breakDuration : parseInt(breakDuration) || 5;
    setTimeLeft(isBreak ? breakTime * 60 : workTime * 60);
  };

  const skipSession = () => {
    handleTimerComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const workTime = typeof workDuration === 'number' ? workDuration : parseInt(workDuration) || 25;
    const breakTime = typeof breakDuration === 'number' ? breakDuration : parseInt(breakDuration) || 5;
    const totalTime = isBreak ? breakTime * 60 : workTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };



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

      {/* Main Content Card */}
      <div className="card rounded-4 pomodoro-page">
        <div className="card-body text-center">
          {/* Header */}
          <h1 className="fw-bold mb-4 pomodoro-title">
            番茄鐘 Pomodoro Timer
          </h1>


          {/* Timer Mode Selector */}
          <div className="timer-mode-selector mb-4">
            <div className="tab-switcher">
              <button 
                className={`tab ${timerMode === 'work' ? 'active' : ''}`}
                onClick={() => {
                  setTimerMode('work');
                  setIsBreak(false);
                  const workTime = typeof workDuration === 'number' ? workDuration : parseInt(workDuration) || 25;
                  setTimeLeft(workTime * 60);
                }}
              >
                <span className="desktop-text">工作 Work</span>
                <span className="mobile-text">Work</span>
              </button>
              
              <button 
                className={`tab ${timerMode === 'break' ? 'active' : ''}`}
                onClick={() => {
                  setTimerMode('break');
                  setIsBreak(true);
                  const breakTime = typeof breakDuration === 'number' ? breakDuration : parseInt(breakDuration) || 5;
                  setTimeLeft(breakTime * 60);
                }}
              >
                <span className="desktop-text">短休息 Break</span>
                <span className="mobile-text">Break</span>
              </button>
              
              <button 
                className={`tab ${timerMode === 'longBreak' ? 'active' : ''}`}
                onClick={() => {
                  setTimerMode('longBreak');
                  setIsBreak(true);
                  const longBreakTime = typeof longBreakDuration === 'number' ? longBreakDuration : parseInt(longBreakDuration) || 15;
                  setTimeLeft(longBreakTime * 60);
                }}
              >
                <span className="desktop-text">長休息 Long Break</span>
                <span className="mobile-text">Long</span>
              </button>
            </div>
          </div>

          {/* Timer Display */}
          <div className="timer-container mb-5">
            <div className="timer-wrapper">
              <div className="timer-circle-container">
                <div className={`timer-circle ${isBreak ? 'break' : 'work'}`}>
                  <div className="timer-inner">
                    <div className="timer-time">
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <svg className="timer-progress" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>


          {/* Control Buttons */}
          <div className="control-buttons mb-5">
            <div className="button-group">
              {!isActive ? (
                <button 
                  className="btn btn-primary btn-lg control-btn reactive-btn"
                  onClick={startTimer}
                >
                  <BiPlay />
                  {isPaused ? '繼續 Continue' : '開始 Start'}
                </button>
              ) : (
                <button 
                  className="btn btn-warning btn-lg control-btn reactive-btn"
                  onClick={pauseTimer}
                >
                  <BiPause />
                  暫停 Pause
                </button>
              )}
              
              <button 
                className="btn btn-secondary btn-lg control-btn reactive-btn"
                onClick={resetTimer}
              >
                <BiRefresh />
                重置 Reset
              </button>
              
              <button 
                className="btn btn-info btn-lg control-btn reactive-btn"
                onClick={skipSession}
              >
                <BiSkipNext />
                跳過 Skip
              </button>
              
            </div>
          </div>

          {/* Session Info */}
          <div className="session-info mb-5">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="stat-card">
                  <div className="stat-icon">🍅</div>
                  <div className="stat-content">
                    <h6 className="stat-title">已完成 Completed</h6>
                    <div className="stat-value">{sessions}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h6 className="stat-title">總計 Total</h6>
                    <div className="stat-value">{formatTotalTime(totalTime)}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card">
                  <div className="stat-icon">{isActive ? '▶️' : isPaused ? '⏸️' : '⏹️'}</div>
                  <div className="stat-content">
                    <h6 className="stat-title">狀態 Status</h6>
                    <div className="stat-value">{isActive ? '進行中 Active' : isPaused ? '已暫停 Paused' : '未開始 Ready'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="settings-section">
            <h4 className="mb-4 text-center d-flex align-items-center justify-content-center">
              <BiCog className="me-2" />
              設定 Settings
            </h4>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="workDuration" className="form-label">工作時間 Work Time (分鐘)</label>
                    <input 
                      type="number" 
                      className="form-control"
                      id="workDuration"
                      value={workDuration}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                          setWorkDuration('');
                        } else {
                          const numValue = parseInt(value);
                          if (!isNaN(numValue) && numValue >= 1 && numValue <= 60) {
                            setWorkDuration(numValue);
                          }
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '' || parseInt(e.target.value) < 1) {
                          setWorkDuration(25);
                        }
                      }}
                      min="1"
                      max="60"
                      placeholder="25"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="breakDuration" className="form-label">短休息 Short Break (分鐘)</label>
                    <input 
                      type="number" 
                      className="form-control"
                      id="breakDuration"
                      value={breakDuration}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                          setBreakDuration('');
                        } else {
                          const numValue = parseInt(value);
                          if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
                            setBreakDuration(numValue);
                          }
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '' || parseInt(e.target.value) < 1) {
                          setBreakDuration(5);
                        }
                      }}
                      min="1"
                      max="30"
                      placeholder="5"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="longBreakDuration" className="form-label">長休息 Long Break (分鐘)</label>
                    <input 
                      type="number" 
                      className="form-control"
                      id="longBreakDuration"
                      value={longBreakDuration}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                          setLongBreakDuration('');
                        } else {
                          const numValue = parseInt(value);
                          if (!isNaN(numValue) && numValue >= 1 && numValue <= 60) {
                            setLongBreakDuration(numValue);
                          }
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '' || parseInt(e.target.value) < 1) {
                          setLongBreakDuration(15);
                        }
                      }}
                      min="1"
                      max="60"
                      placeholder="15"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="instructions mt-5">
            <h4 className="mb-3">使用方法 How to Use</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="instruction-card">
                  <h5>🍅 番茄工作法 Pomodoro Technique</h5>
                  <ul className="text-start">
                    <li>專注工作 25 分鐘 | Focus for 25 minutes</li>
                    <li>短休息 5 分鐘 | Short break 5 minutes</li>
                    <li>每 4 個工作週期後長休息 15 分鐘 | Long break 15 minutes after 4 cycles</li>
                    <li>保持專注，避免分心 | Stay focused, avoid distractions</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="instruction-card">
                  <h5>📚 DSE 學習建議 Study Tips</h5>
                  <ul className="text-start">
                    <li>選擇一個科目專注學習 | Choose one subject to focus on</li>
                    <li>準備好學習材料和筆記 | Prepare study materials and notes</li>
                    <li>關閉手機通知 | Turn off phone notifications</li>
                    <li>休息時完全放鬆 | Completely relax during breaks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Timer Mode Switcher */
        .tab-switcher {
          display: flex;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 3px;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .tab {
          flex: 1;
          padding: 0.4rem 1.2rem;
          border: none;
          background: transparent;
          color: var(--bs-body-color, rgba(255, 255, 255, 0.7));
          opacity: 0.7;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
          white-space: nowrap;
          height: auto;
        }
        
        /* Show/hide text based on screen size */
        .desktop-text {
          display: inline;
        }
        
        .mobile-text {
          display: none;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .tab-switcher {
            max-width: 100%;
            margin: 0 1rem 1.5rem 1rem;
          }
          
          .tab {
            padding: 0.3rem 0.5rem;
            font-size: 0.8rem;
            min-width: 0;
          }
          
          .desktop-text {
            display: none;
          }
          
          .mobile-text {
            display: inline;
          }
        }
        
        @media (max-width: 480px) {
          .tab {
            padding: 0.2rem 0.3rem;
            font-size: 0.7rem;
          }
          
          .tab-switcher {
            margin: 0 1rem 1rem 1rem;
            padding: 2px;
          }
        }
        
        .tab:hover {
          color: var(--bs-body-color, white);
          background: var(--tab-hover-bg, rgba(255, 255, 255, 0.1));
          opacity: 1;
        }
        
        .tab.active {
          background: #667eea;
          color: white;
          opacity: 1;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }
        
        /* Timer Styles */
        .timer-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2rem 0;
        }
        
        .timer-circle-container {
          position: relative;
          width: 280px;
          height: 280px;
        }
        
        /* Mobile timer sizing */
        @media (max-width: 768px) {
          .timer-circle-container {
            width: 300px;
            height: 300px;
          }
        }
        
        @media (max-width: 480px) {
          .timer-circle-container {
            width: 280px;
            height: 280px;
          }
        }
        
        .timer-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background:rgb(106, 129, 230);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .timer-circle.work {
          background:rgb(55, 82, 203);
        }
        
        .timer-circle.break {
          background: #667eea;
        }
        
        .timer-inner {
          text-align: center;
          z-index: 2;
          position: relative;
        }
        
        .timer-time {
          font-size: 3.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .timer-label {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          font-weight: 500;
        }
        
        .timer-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        
        /* Stats Cards */
        .stat-card {
          background: var(--card-bg, rgba(255, 255, 255, 0.1));
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          border: 3px solid var(--card-border, rgba(255, 255, 255, 0.2));
          box-shadow: var(--card-shadow, 0 8px 25px rgba(0, 0, 0, 0.1));
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--card-shadow, 0 8px 25px rgba(0,0,0,0.1));
        }
        
        .stat-icon {
          font-size: 2rem;
          opacity: 0.8;
          color: var(--bs-body-color, white);
        }
        
        .stat-content {
          flex: 1;
        }
        
        .stat-title {
          font-size: 0.9rem;
          color: var(--bs-body-color, rgba(255,255,255,0.7));
          margin-bottom: 0.5rem;
          font-weight: 500;
          opacity: 0.8;
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--bs-body-color, white);
        }
        
        /* Control Buttons */
        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .control-btn {
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          min-width: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .control-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        
        .control-btn:hover {
          opacity: 0.9;
        }
        
        .control-btn:active {
          opacity: 0.8;
        }
        
        .control-btn.btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }
        
        .control-btn.btn-primary:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }
        
        .control-btn.btn-warning {
          background: linear-gradient(135deg, #ffc107 0%, #ff8c00 100%);
          border: none;
        }
        
        .control-btn.btn-warning:hover {
          background: linear-gradient(135deg, #e0a800 0%, #e67e00 100%);
        }
        
        .control-btn.btn-info {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
          border: none;
        }
        
        .control-btn.btn-info:hover {
          background: linear-gradient(135deg, #138496 0%, #117a8b 100%);
        }
        
        .control-btn.btn-danger {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          border: none;
        }
        
        .control-btn.btn-danger:hover {
          background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
        }
        
        .control-btn.btn-secondary {
          background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
          border: none;
        }
        
        .control-btn.btn-secondary:hover {
          background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
        }
        
        /* Settings Section */
        .settings-section {
          background: var(--section-bg, rgba(255, 255, 255, 0.05));
          border-radius: 16px;
          padding: 2rem;
          margin-top: 2rem;
          backdrop-filter: blur(10px);
          border: 3px solid var(--section-border, rgba(255, 255, 255, 0.1));
          box-shadow: var(--card-shadow, 0 12px 35px rgba(0, 0, 0, 0.1));
        }
        
        .settings-section h4 {
          color: var(--bs-heading-color, white);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .settings-section .form-label {
          color: var(--bs-body-color, rgba(255,255,255,0.8));
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .settings-section .form-control {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: var(--bs-body-color, white);
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 1rem;
          padding: 0.75rem;
        }
        
        .settings-section .form-control:focus {
          background: var(--input-focus-bg, rgba(255, 255, 255, 0.15));
          border-color: var(--primary-color, #667eea);
          box-shadow: 0 0 0 0.2rem var(--primary-shadow, rgba(102, 126, 234, 0.25));
          color: var(--bs-body-color, white);
        }
        
        .settings-section .form-floating > label {
          color: var(--bs-body-color, rgba(255,255,255,0.8));
        }
        
        .settings-section .form-floating > .form-control:focus ~ label,
        .settings-section .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: var(--bs-body-color, white);
          opacity: 0.8;
        }
        
        /* Instructions */
        .instructions {
          background: var(--section-bg, rgba(255, 255, 255, 0.05));
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          border: 3px solid var(--section-border, rgba(255, 255, 255, 0.1));
          box-shadow: var(--card-shadow, 0 12px 35px rgba(0, 0, 0, 0.1));
        }
        
        .instructions h4 {
          color: var(--bs-heading-color, white);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .instruction-card {
          background: var(--card-bg, rgba(255, 255, 255, 0.05));
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          border: 3px solid var(--card-border, rgba(255, 255, 255, 0.1));
          box-shadow: var(--card-shadow, 0 8px 25px rgba(0, 0, 0, 0.1));
          height: 100%;
        }
        
        .instruction-card h5 {
          color: var(--bs-heading-color, white);
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .instruction-card ul {
          color: var(--bs-body-color, rgba(255,255,255,0.8));
          padding-left: 1.2rem;
        }
        
        .instruction-card li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        
        /* Theme-specific overrides */
        [data-bs-theme="light"] .pomodoro-page {
          --card-bg: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          --card-border: rgba(0, 0, 0, 0.25);
          --card-shadow: 0 12px 35px rgba(0,0,0,0.15), 0 6px 16px rgba(0, 0, 0, 0.12);
          --section-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          --section-border: rgba(0, 0, 0, 0.25);
          --input-bg: #fff;
          --input-border: rgba(0, 0, 0, 0.3);
          --input-focus-bg: #fff;
          --primary-color: #667eea;
          --primary-shadow: rgba(102, 126, 234, 0.25);
          --tab-hover-bg: rgba(0, 0, 0, 0.05);
        }
        
        [data-bs-theme="dark"] .pomodoro-page {
          --card-bg: rgba(255, 255, 255, 0.1);
          --card-border: rgba(255, 255, 255, 0.2);
          --card-shadow: 0 8px 25px rgba(0,0,0,0.3);
          --section-bg: rgba(255, 255, 255, 0.05);
          --section-border: rgba(255, 255, 255, 0.1);
          --input-bg: rgba(255, 255, 255, 0.1);
          --input-border: rgba(255, 255, 255, 0.2);
          --input-focus-bg: rgba(255, 255, 255, 0.15);
          --primary-color: #667eea;
          --primary-shadow: rgba(102, 126, 234, 0.25);
          --tab-hover-bg: rgba(255, 255, 255, 0.1);
        }
        
        [data-bs-theme="blue-theme"] .pomodoro-page {
          --card-bg: rgba(255, 255, 255, 0.15);
          --card-border: rgba(255, 255, 255, 0.3);
          --card-shadow: 0 8px 25px rgba(0,0,0,0.2);
          --section-bg: rgba(255, 255, 255, 0.1);
          --section-border: rgba(255, 255, 255, 0.2);
          --input-bg: rgba(255, 255, 255, 0.15);
          --input-border: rgba(255, 255, 255, 0.3);
          --input-focus-bg: rgba(255, 255, 255, 0.2);
          --primary-color: #667eea;
          --primary-shadow: rgba(102, 126, 234, 0.25);
          --tab-hover-bg: rgba(255, 255, 255, 0.1);
        }
        
        /* iPad specific fixes */
        @media (min-width: 768px) and (max-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
          /* iPad specific styling to fix white instruction cards */
          .instruction-card {
            background: var(--card-bg, rgba(255, 255, 255, 0.1)) !important;
            border: 2px solid var(--card-border, rgba(255, 255, 255, 0.2)) !important;
            backdrop-filter: blur(15px) !important;
          }
          
          .stat-card {
            background: var(--card-bg, rgba(255, 255, 255, 0.1)) !important;
            border: 2px solid var(--card-border, rgba(255, 255, 255, 0.2)) !important;
            backdrop-filter: blur(15px) !important;
          }
          
          .settings-section {
            background: var(--section-bg, rgba(255, 255, 255, 0.05)) !important;
            border: 2px solid var(--section-border, rgba(255, 255, 255, 0.1)) !important;
            backdrop-filter: blur(15px) !important;
          }
          
          .instructions {
            background: var(--section-bg, rgba(255, 255, 255, 0.05)) !important;
            border: 2px solid var(--section-border, rgba(255, 255, 255, 0.1)) !important;
            backdrop-filter: blur(15px) !important;
          }
        }
        
        /* Light theme specific fixes for better visibility */
        [data-bs-theme=light] .tab-switcher {
          background: #ffffff !important;
          border: 4px solid #000000 !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 5px 12px rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: none !important;
        }
        
        [data-bs-theme="light"] .timer-circle {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
          border: 3px solid rgba(255, 255, 255, 0.8) !important;
        }
        
        [data-bs-theme="light"] .timer-circle.work {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        }
        
        [data-bs-theme="light"] .timer-circle.break {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
        }
        
        
        [data-bs-theme="light"] .stat-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 10px 25px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(0, 0, 0, 0.35) !important;
        }
        
        [data-bs-theme="light"] .instruction-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28), 0 8px 20px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(0, 0, 0, 0.35) !important;
        }
        
        
        /* Add strong background for light theme */
        [data-bs-theme=light] .card.rounded-4 {
          background: #ffffff !important;
          border: 5px solid #333333 !important;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25), 0 12px 35px rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: none !important;
        }
        
        /* Main title styling */
        .pomodoro-title {
          font-size: 2.5rem;
        }
        
        /* Theme-specific styling for all themes */
        
        /* Light theme styling - scoped properly like countdown.tsx */
        [data-bs-theme=light] .pomodoro-page .stat-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
          border: 2px solid rgba(0, 0, 0, 0.15) !important;
          color: #212529 !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          border-radius: 16px !important;
          padding: 1.5rem !important;
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
          transition: all 0.3s ease !important;
          height: 100% !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .instruction-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
          border: 2px solid rgba(0, 0, 0, 0.15) !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          border-radius: 12px !important;
          padding: 1.5rem !important;
          height: 100% !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .settings-section,
        [data-bs-theme=light] .pomodoro-page .instructions {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
          border: 2px solid rgba(0, 0, 0, 0.15) !important;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(0, 0, 0, 0.08) !important;
          border-radius: 16px !important;
          padding: 2rem !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .settings-section h4,
        [data-bs-theme=light] .pomodoro-page .instructions h4,
        [data-bs-theme=light] .pomodoro-page .instruction-card h5 {
          color: #212529 !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .instruction-card ul {
          color: #495057 !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .stat-title {
          color: #6c757d !important;
          font-size: 0.9rem !important;
          margin-bottom: 0.5rem !important;
          font-weight: 500 !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .stat-value {
          color: #212529 !important;
          font-size: 1.8rem !important;
          font-weight: 700 !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .form-label {
          color: #495057 !important;
          font-weight: 600 !important;
        }
        
        [data-bs-theme=light] .pomodoro-page input#workDuration,
        [data-bs-theme=light] .pomodoro-page input#breakDuration,
        [data-bs-theme=light] .pomodoro-page input#longBreakDuration {
          background: #ffffff !important;
          border: 2px solid #333333 !important;
          color: #212529 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          border-radius: 8px !important;
          padding: 0.75rem !important;
          font-size: 1rem !important;
        }
        
        [data-bs-theme=light] .pomodoro-page .settings-section .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.3rem rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          color: #212529 !important;
          background: #ffffff !important;
        }
        
        /* Title colors to match sidebar across all themes */
        [data-bs-theme=light] .pomodoro-page .pomodoro-title {
          color: #008cff !important;
        }
        
        [data-bs-theme=dark] .pomodoro-page .pomodoro-title,
        [data-bs-theme=blue-theme] .pomodoro-page .pomodoro-title {
          color: #ffffff !important;
        }
        
        /* Dark theme styling */
        [data-bs-theme=dark] .pomodoro-page .settings-section .form-control {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
          border-radius: 8px !important;
          padding: 0.75rem !important;
          font-size: 1rem !important;
        }
        
        [data-bs-theme=dark] .pomodoro-page .settings-section .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.3rem rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3) !important;
          color: white !important;
          background: rgba(255, 255, 255, 0.15) !important;
        }
        
        [data-bs-theme=dark] .stat-card {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        [data-bs-theme=dark] .instruction-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        [data-bs-theme=dark] .settings-section,
        [data-bs-theme=dark] .instructions {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        [data-bs-theme=dark] .form-control {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        [data-bs-theme=dark] .form-control:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          color: white;
        }
        
        /* Blue theme styling */
        [data-bs-theme=blue-theme] .pomodoro-page .settings-section .form-control {
          background: rgba(255, 255, 255, 0.15) !important;
          border: 2px solid rgba(255, 255, 255, 0.4) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          border-radius: 8px !important;
          padding: 0.75rem !important;
          font-size: 1rem !important;
        }
        
        [data-bs-theme=blue-theme] .pomodoro-page .settings-section .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.3rem rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          color: white !important;
          background: rgba(255, 255, 255, 0.2) !important;
        }
        
        [data-bs-theme=blue-theme] .stat-card {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        [data-bs-theme=blue-theme] .instruction-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        [data-bs-theme=blue-theme] .settings-section,
        [data-bs-theme=blue-theme] .instructions {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        [data-bs-theme=blue-theme] .form-control {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
        }
        
        [data-bs-theme=blue-theme] .form-control:focus {
          background: rgba(255, 255, 255, 0.2);
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          color: white;
        }
        
        /* Title colors for dark and blue themes */
        [data-bs-theme=dark] .pomodoro-title,
        [data-bs-theme=blue-theme] .pomodoro-title {
          color: #ffffff;
        }
        
        /* Add inner borders for extra definition */
        [data-bs-theme="light"] .stat-card::before {
          content: '';
          position: absolute;
          top: 1px;
          left: 1px;
          right: 1px;
          bottom: 1px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          pointer-events: none;
        }
        
        [data-bs-theme="light"] .instruction-card::before {
          content: '';
          position: absolute;
          top: 1px;
          left: 1px;
          right: 1px;
          bottom: 1px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          pointer-events: none;
        }
        
        /* Ensure cards have relative positioning for pseudo-elements */
        [data-bs-theme="light"] .stat-card,
        [data-bs-theme="light"] .instruction-card {
          position: relative !important;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .timer-circle-container {
            width: 240px;
            height: 240px;
          }
          
          .timer-time {
            font-size: 3.2rem;
          }
          
          .button-group {
            flex-direction: column;
            align-items: center;
          }
          
          .control-btn {
            width: 100%;
            max-width: 200px;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          
          .stat-card {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
          
          .stat-icon {
            font-size: 1.5rem;
          }
          
          .stat-value {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .timer-circle-container {
            width: 200px;
            height: 200px;
          }
          
          .timer-time {
            font-size: 2.8rem;
          }
          
          .timer-label {
            font-size: 0.9rem;
          }
          
          .control-btn {
            max-width: 250px;
            padding: 0.5rem 1.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}
