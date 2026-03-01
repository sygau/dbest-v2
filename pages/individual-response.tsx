import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  generateIndividualResponseStructuredData,
  getMainPageMetadata
} from '../utils/structuredData';

const DSE_QUESTIONS = [
  { id: 1, text: "Do you think students should be required to wear school uniforms? Why or why not?" },
  { id: 2, text: "Some people say that social media has a negative effect on teenagers. Do you agree? Why?" },
  { id: 3, text: "Should the government impose a tax on sugary drinks to improve public health? Explain your view." },
  { id: 4, text: "Do you think homework is beneficial for students? Why or why not?" },
  { id: 5, text: "Should schools teach coding and programming as a compulsory subject? Explain your opinion." },
  { id: 6, text: "Some people believe that artificial intelligence will replace many jobs. What is your opinion?" },
  { id: 7, text: "Do you think Hong Kong should have more car-free zones? Why or why not?" },
  { id: 8, text: "Should students be allowed to use smartphones in class? Explain your view." },
  { id: 9, text: "Many young people today suffer from stress. What do you think are the main causes?" },
  { id: 10, text: "Do you think learning a third language should be encouraged in Hong Kong schools? Why?" },
  { id: 11, text: "Some people say that online learning is as effective as face-to-face learning. Do you agree?" },
  { id: 12, text: "Should the legal voting age in Hong Kong be lowered? Explain your opinion." },
  { id: 13, text: "Do you think reality TV shows have a positive or negative influence on young people? Why?" },
  { id: 14, text: "Should fast food restaurants be required to display calorie information? Explain your view." },
  { id: 15, text: "Some people believe that university education is essential for career success. Do you agree?" },
  { id: 16, text: "Do you think Hong Kong should develop more renewable energy sources? Why or why not?" },
  { id: 17, text: "Should parents limit the amount of time children spend playing video games? Explain your view." },
  { id: 18, text: "Many people shop online nowadays. What are the advantages and disadvantages of this trend?" },
  { id: 19, text: "Do you think schools should organise more field trips and outdoor activities? Why?" },
  { id: 20, text: "Should the government provide more support for the elderly in Hong Kong? Explain your opinion." },
  { id: 21, text: "Some people say that money cannot buy happiness. Do you agree? Why or why not?" },
  { id: 22, text: "Do you think students should be required to participate in community service? Explain your view." },
  { id: 23, text: "Should Hong Kong promote itself more as a tourist destination? Why or why not?" },
  { id: 24, text: "Many young people dream of becoming famous influencers. What are your thoughts on this career choice?" },
  { id: 25, text: "Do you think physical education should be compulsory in secondary schools? Explain your opinion." },
  { id: 26, text: "Should the government do more to preserve historical buildings in Hong Kong? Why?" },
  { id: 27, text: "Some people believe that reading books is better than watching videos for learning. Do you agree?" },
  { id: 28, text: "Do you think single-use plastics should be banned in Hong Kong? Explain your view." },
  { id: 29, text: "Should students have a say in choosing what they learn at school? Why or why not?" },
  { id: 30, text: "Many people believe that teamwork is an important skill. Do you agree? Explain your opinion." }
];

const FAQS = [
  {
    id: 'f1',
    question: 'DSE 英文口試 Individual Response 係點考法？',
    answer: '考生會獨立回答考官提問，唔需要同其他同學討論。考官會就某個社會議題或日常話題發問，考生需要即場表達個人意見並作出解釋，時間大約係 1 分鐘左右。'
  },
  {
    id: 'f2',
    question: 'Individual Response 評分係睇咩？',
    answer: 'DSE 英文口試主要評核四個範疇：pronunciation & delivery（發音流暢度）、communication strategies（溝通技巧）、vocabulary & language patterns（詞彙運用）、ideas & organisation（內容組織）。流暢同清晰比講得複雜更重要。'
  },
  {
    id: 'f3',
    question: '唔識答某條題目點算？',
    answer: '唔好直接話「I don\'t know」然後停低。可以先講「That\'s an interesting question」爭取一兩秒思考，再從一個你識講嘅角度切入。即使答案唔完整，保持流暢同自信係最緊要。'
  },
  {
    id: 'f4',
    question: '練習 Individual Response 最有效嘅方法係咩？',
    answer: '最有效係計時練習——每次限 1 分鐘，模擬真實考試壓力。題目最好隨機抽，唔好每次都準備固定答案，因為考試當日題目係即場發問。練完之後可以錄音重聽，留意自己嘅停頓同語速。'
  },
  {
    id: 'f5',
    question: 'Individual Response 同 Group Discussion 有咩分別？',
    answer: 'Individual Response 係你一個人回答考官問題，唔需要理會其他考生。Group Discussion 就係幾個考生一齊討論，需要學識 agree / disagree、接話、引導討論等技巧。兩者評分側重點有所不同。'
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const STORAGE_KEY = 'dse-ir-state';
type TimerState = 'idle' | 'reading' | 'running' | 'finished';
interface StoredState { queue: number[]; doneIds: number[]; }

export default function IndividualResponsePage() {
  const metadata = useMemo(() => getMainPageMetadata('individual-response'), []);
  const structuredData = useMemo(() => generateIndividualResponseStructuredData(), []);

  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  // null until user presses START — question is hidden on idle
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [queue, setQueue] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) voicesRef.current = voices;
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    return () => { speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Load queue from localStorage — but NOT currentQuestionId (stays blank until START)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredState = JSON.parse(stored);
        if (parsed.queue?.length > 0) setQueue(parsed.queue);
        if (parsed.doneIds) setDoneIds(new Set(parsed.doneIds));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (queue.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ queue, doneIds: Array.from(doneIds) }));
    }
  }, [queue, doneIds]);

  // Build initial queue if empty
  useEffect(() => {
    if (queue.length === 0) {
      setQueue(shuffleArray(DSE_QUESTIONS).map(q => q.id));
    }
  }, [queue.length]);

  useEffect(() => {
    if (timerState === 'running' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimerState('finished');
            playBellSound();
            markCurrentDone();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerState]);

  const currentQuestion = useMemo(() => {
    if (currentQuestionId === null) return null;
    return DSE_QUESTIONS.find(q => q.id === currentQuestionId) || null;
  }, [currentQuestionId]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playBeep = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880; osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };

  const playBellSound = () => {
    try {
      const ctx = getAudioContext();
      [523.25, 392, 261.63].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = freq; osc.type = 'sine';
        const t = ctx.currentTime + i * 0.25;
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
        osc.start(t); osc.stop(t + 0.4);
      });
    } catch (e) {}
  };

  const markCurrentDone = () => {
    if (currentQuestionId !== null) {
      setDoneIds(prev => new Set(prev).add(currentQuestionId));
    }
  };

  // Pick next question from queue
  const drawNextQuestion = (doneSoFar: Set<number>): { id: number; newQueue: number[] } => {
    const remaining = queue.filter(id => !doneSoFar.has(id));
    if (remaining.length === 0) {
      const newShuffled = shuffleArray(DSE_QUESTIONS).map(q => q.id);
      return { id: newShuffled[0], newQueue: newShuffled.slice(1) };
    }
    return { id: remaining[0], newQueue: remaining.slice(1) };
  };

  const speakQuestion = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      try {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = voicesRef.current;
        const maleVoice = voices.find(v =>
          v.lang.startsWith('en') && (
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('daniel') ||
            v.name.includes('Google UK English Male')
          )
        ) || voices.find(v => v.lang.startsWith('en')) || null;
        if (maleVoice) utterance.voice = maleVoice;
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        speechSynthesis.speak(utterance);
      } catch (e) { resolve(); }
    });
  };

  // START / NEXT: draw a question NOW, reveal it, speak it, start timer
  const handleStart = async () => {
    const newDone = currentQuestionId !== null ? new Set(doneIds).add(currentQuestionId) : new Set(doneIds);
    const { id, newQueue } = drawNextQuestion(newDone);

    setCurrentQuestionId(id);
    setQueue(newQueue);
    if (currentQuestionId !== null) setDoneIds(newDone);

    setTimerState('reading');
    const questionText = DSE_QUESTIONS.find(q => q.id === id)?.text ?? '';
    try {
      await speakQuestion(questionText);
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
    playBeep();
    setTimeLeft(60);
    setTimerState('running');
  };

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    speechSynthesis.cancel();
    setTimerState('finished');
    markCurrentDone();
  };

  // Skip/next icon: go back to blank idle state
  const handleNextQuestion = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    speechSynthesis.cancel();
    markCurrentDone();
    setCurrentQuestionId(null);
    setTimerState('idle');
    setTimeLeft(60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = ((60 - timeLeft) / 60) * 100;
  const isIdle = timerState === 'idle';
  const isReading = timerState === 'reading';

  const mainBtnLabel = () => {
    if (isIdle) return 'START';
    if (isReading) return '讀緊題目…';
    if (timerState === 'running') return 'STOP';
    return 'NEXT';
  };

  const mainBtnAction = () => {
    if (isIdle || timerState === 'finished') return handleStart();
    if (timerState === 'running') return handleStop();
  };

  return (
    <>
      <Head>
        <title>{metadata?.title || 'DSE English Oral Individual Response 練習工具 | dse.best'}</title>
        <meta name="description" content={metadata?.description || 'DSE 英文口試 Individual Response 免費練習工具，隨機抽題、語音朗讀、60秒計時，模擬真實考試環境。'} />
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

              {/* Question — blank placeholder on idle */}
              <div className={`question-container${isIdle ? ' question-idle' : ''}`}>
                {isIdle ? (
                  <div className="question-idle-text">按 Start 隨機抽一條題目開始練習</div>
                ) : (
                  <>
                    <div className="question-id">#{currentQuestion?.id}</div>
                    <div className="question-text">{currentQuestion?.text}</div>
                  </>
                )}
              </div>

              <div className={`time-display${isReading ? ' time-reading' : ''}${timerState === 'finished' ? ' time-done' : ''}`}>
                {isReading ? '—' : formatTime(timeLeft)}
              </div>

              <div className="progress-track">
                <div className="progress-bar-inner" style={{ width: `${isIdle ? 0 : progressPercent}%` }} />
              </div>

              <div className="controls">
                <button
                  className={`primary-btn${timerState === 'running' ? ' btn-stop' : ''}${isReading ? ' btn-reading' : ''}`}
                  onClick={mainBtnAction}
                  disabled={isReading}
                >
                  {mainBtnLabel()}
                </button>

                {(timerState === 'running' || timerState === 'finished') && (
                  <button className="icon-btn" onClick={handleNextQuestion} title="下一題" aria-label="Skip to next question">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 4 15 12 5 20 5 4"/>
                      <line x1="19" y1="5" x2="19" y2="19"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* FAQ */}
            <div className="faq-container">
              <p className="faq-label">DSE Speaking 常見問題</p>
              {FAQS.map(faq => (
                <div key={faq.id} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    aria-expanded={openFaq === faq.id}
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`faq-chevron${openFaq === faq.id ? ' open' : ''}`}
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {openFaq === faq.id && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper { padding: 1rem; min-height: 80vh; }

        .layout-center { display: flex; justify-content: center; padding-top: 1rem; padding-bottom: 4rem; }

        .content-stack { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 16px; }

        .timer-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 2.25rem 2.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          border-top: 5px solid #25D366;
        }

        .card-header-block { text-align: center; margin-bottom: 1.5rem; width: 100%; }

        .card-title {
          font-size: 2.6rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
        }

        .question-container {
          background: #dcfce7;
          border-left: 4px solid #25D366;
          border-radius: 0 12px 12px 0;
          padding: 1.35rem 1.6rem;
          width: 100%;
          margin-bottom: 1.5rem;
          min-height: 96px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .question-container.question-idle {
          background: #f9fafb;
          border-left-color: #d1d5db;
        }

        .question-idle-text { font-size: 1rem; color: #9ca3af; font-weight: 500; text-align: center; }

        .question-id { font-size: 0.8rem; color: #128C7E; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: 0.05em; }

        .question-text { font-size: 1.15rem; color: #0f1724; line-height: 1.65; font-weight: 600; }

        .time-display {
          font-size: 5.5rem;
          font-weight: 800;
          color: #111827;
          font-variant-numeric: tabular-nums;
          letter-spacing: -3px;
          line-height: 1;
          margin-bottom: 1rem;
          transition: color 0.3s;
        }

        .time-reading { color: #d1d5db; letter-spacing: 0; font-size: 4rem; }
        .time-done { color: #25D366; }

        .progress-track { width: 100%; height: 14px; background: #f3f4f6; border-radius: 99px; overflow: hidden; margin-bottom: 1.75rem; }

        .progress-bar-inner { height: 100%; background: linear-gradient(90deg, #25D366, #128C7E); transition: width 1s linear; border-radius: 99px; }

        .controls { display: flex; align-items: center; gap: 10px; width: 100%; }

        .primary-btn {
          flex: 1;
          height: 52px;
          border: none;
          background: #25D366;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: background 0.15s;
        }

        .primary-btn:hover:not(:disabled) { background: #128C7E; }
        .primary-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .primary-btn.btn-stop { background: #ef4444; color: #ffffff; }
        .primary-btn.btn-stop:hover:not(:disabled) { background: #dc2626; }
        .primary-btn.btn-reading { background: #9ca3af; color: #ffffff; cursor: not-allowed; }

        .icon-btn {
          width: 52px;
          height: 52px;
          border: 1.5px solid #e5e7eb;
          background: #ffffff;
          border-radius: 14px;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.15s, color 0.15s;
        }

        .icon-btn:hover:not(:disabled) { border-color: #25D366; color: #128C7E; }
        .icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* FAQ */
        .faq-container { background: #ffffff; border-radius: 20px; padding: 1.5rem 1.75rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }

        .faq-label { font-size: 1.2rem; font-weight: 700; color: #111827; text-align: center; margin-bottom: 0.75rem; }

        .faq-item { border-bottom: 1px solid #f3f4f6; }
        .faq-item:last-child { border-bottom: none; }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          padding: 1rem 0;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 600;
          color: #111827;
          cursor: pointer;
          line-height: 1.5;
        }

        .faq-question:hover { color: #128C7E; }

        .faq-chevron { flex-shrink: 0; color: #9ca3af; transition: transform 0.2s; }
        .faq-chevron.open { transform: rotate(180deg); color: #25D366; }

        .faq-answer { font-size: 0.88rem; color: #4b5563; line-height: 1.7; padding-bottom: 1rem; }

        @media (max-width: 480px) {
          .timer-card { padding: 1.5rem; }
          .time-display { font-size: 4.5rem; }
          .card-title { font-size: 1.9rem; }
        }
      `}</style>
    </>
  );
}