import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { BiCheck, BiExit, BiSkipNext, BiShow, BiArrowBack } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import { Question, Passage, PassageConfig, QuizSettings, QuizResult } from '../../types/12p';
import { get12pMetadata } from '../../utils/12pMetadata';
import { generate12pBreadcrumbStructuredData } from '../../utils/12pStructuredData';

interface QuizProps {
  config: PassageConfig;
}

type QuizState = 'setup' | 'quiz' | 'results';

export default function QuizMode({ config }: QuizProps) {
  const metadata = get12pMetadata('quiz');
  const breadcrumbData = generate12pBreadcrumbStructuredData('quiz');
  
  const [state, setState] = useState<QuizState>('setup');
  const [settings, setSettings] = useState<QuizSettings>({
    selectedPassages: [],
    questionCount: 10,
    timeLimited: false,
    timeLimit: 300, // 5 minutes default
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState<QuizResult[]>([]);
  const [passageMap, setPassageMap] = useState<Map<string, string>>(new Map());
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const [startTime, setStartTime] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Random incorrect feedback messages
  const incorrectMessages = [
    '❌ 唔啱喎，再試下？',
    '❌ 未夠準啦，再試！',
    '❌ 差少少，再試吓啦！',
    '❌ 已茂？',
    '❌ 💀'
  ];
  const [currentIncorrectMsg, setCurrentIncorrectMsg] = useState(incorrectMessages[0]);

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      selectedPassages: config.passages.map(p => p.id),
    }));
  }, [config]);

  // Timer effect with time up logic
  useEffect(() => {
    if (state === 'quiz' && settings.timeLimited && timerActive) {
      if (timeRemaining <= 0) {
        setTimerActive(false);
        // Auto-submit remaining questions as skipped
        const remainingQuestions = questions.slice(currentIndex);
        const skippedResults: QuizResult[] = remainingQuestions.map(q => ({
          questionId: q.id,
          passage: passageMap.get(q.id) || '',
          correct: false,
          skipped: true,
          userAnswer: '',
        }));
        setResults(prev => [...prev, ...skippedResults]);
        alert('⏰ 時間到！測驗結束。');
        setState('results');
        return;
      }

      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimerActive(false);
            // Auto-submit remaining questions as skipped
            const remainingQuestions = questions.slice(currentIndex);
            const skippedResults: QuizResult[] = remainingQuestions.map(q => ({
              questionId: q.id,
              passage: passageMap.get(q.id) || '',
              correct: false,
              skipped: true,
              userAnswer: '',
            }));
            setResults(prev => [...prev, ...skippedResults]);
            alert('⏰ 時間到！測驗結束。');
            setState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state, settings.timeLimited, timerActive, timeRemaining, currentIndex, questions, passageMap]);

  const handlePassageToggle = (passageId: string) => {
    setSettings(prev => ({
      ...prev,
      selectedPassages: prev.selectedPassages.includes(passageId)
        ? prev.selectedPassages.filter(id => id !== passageId)
        : [...prev.selectedPassages, passageId],
    }));
  };

  const handleSelectAll = () => {
    setSettings(prev => ({
      ...prev,
      selectedPassages: config.passages.map(p => p.id),
    }));
  };

  const handleDeselectAll = () => {
    setSettings(prev => ({
      ...prev,
      selectedPassages: [],
    }));
  };

  const loadQuestions = async () => {
    const allQuestions: Question[] = [];
    const map = new Map<string, string>();
    const failedPassages: string[] = [];

    for (const passageId of settings.selectedPassages) {
      const passage = config.passages.find(p => p.id === passageId);
      if (passage) {
        try {
          const response = await fetch(`/12p/${passage.file}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data: Question[] = await response.json();
          
          // Validate JSON structure
          if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Invalid data format or empty file');
          }
          
          // Validate each question has required fields
          const isValid = data.every(q => 
            q.id && q.sentence && q.target && q.meaning && q.acptAns
          );
          
          if (!isValid) {
            throw new Error('Missing required fields in questions');
          }
          
          // For passages with sub-passages (詩三首, 詞三首), map questions to their specific poems
          if (passage.subPassages && passage.subPassages.length > 0) {
            data.forEach(q => {
              // Try to match question to sub-passage by ID prefix
              const subPassage = passage.subPassages!.find(sp => q.id.startsWith(sp.id));
              if (subPassage) {
                map.set(q.id, `${passage.title} - ${subPassage.title}`);
              } else {
                map.set(q.id, passage.title);
              }
            });
          } else {
            data.forEach(q => {
              map.set(q.id, passage.title);
            });
          }
          
          allQuestions.push(...data);
        } catch (error) {
          console.error(`Error loading ${passage.file}:`, error);
          failedPassages.push(passage.title);
        }
      }
    }

    // Show error if some passages failed to load
    if (failedPassages.length > 0) {
      alert(`無法載入以下篇章：\n${failedPassages.join('\n')}\n\n將繼續使用其他篇章。`);
    }

    // Check if we have any questions at all
    if (allQuestions.length === 0) {
      alert('沒有可用的題目，請重新選擇篇章。');
      return;
    }

    // Shuffle and limit
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const requestedCount = settings.questionCount === -1 ? shuffled.length : settings.questionCount;
    const limited = shuffled.slice(0, Math.min(requestedCount, shuffled.length));
    
    // Warn if we have fewer questions than requested
    if (limited.length < requestedCount && settings.questionCount !== -1) {
      alert(`只有 ${limited.length} 條題目可用，少於設定的 ${requestedCount} 條。`);
    }
    
    setQuestions(limited);
    setPassageMap(map);
    setCurrentIndex(0);
    setResults([]);
    setStartTime(Date.now());
    
    if (settings.timeLimited && settings.timeLimit) {
      setTimeRemaining(settings.timeLimit);
      setTimerActive(true);
    }
    
    setState('quiz');
    
    // Scroll to top when quiz starts - force to absolute top
    setTimeout(() => {
      window.scrollTo(0, 0);
      inputRef.current?.focus();
    }, 50);
  };

  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase().replace(/\s+/g, '');
  };

  const checkAnswer = (answer: string, question: Question): boolean => {
    const normalized = normalizeAnswer(answer);
    
    // Check against all acceptable answers
    return question.acptAns.some(acceptableAns => 
      normalizeAnswer(acceptableAns) === normalized
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedback === 'correct') {
      // Already correct, move to next
      handleNext();
      return;
    }
    
    if (showAnswer) {
      // Answer was revealed, move to next
      handleNext();
      return;
    }
    
    const currentQuestion = questions[currentIndex];
    const isCorrect = checkAnswer(userAnswer, currentQuestion);
    
    if (isCorrect) {
      setFeedback('correct');
      setResults(prev => [...prev, {
        questionId: currentQuestion.id,
        userAnswer: userAnswer,
        correct: true,
        skipped: false,
        passage: passageMap.get(currentQuestion.id) || '',
      }]);
      
      // Auto advance after short delay
      setTimeout(() => {
        handleNext();
      }, 800);
    } else {
      setFeedback('incorrect');
      // Randomize incorrect message
      setCurrentIncorrectMsg(incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]);
    }
  };

  const handleSkip = () => {
    const currentQuestion = questions[currentIndex];
    setResults(prev => [...prev, {
      questionId: currentQuestion.id,
      userAnswer: '',
      correct: false,
      skipped: true,
      passage: passageMap.get(currentQuestion.id) || '',
    }]);
    // Scroll to top on mobile
    if (window.innerHeight < 700) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    handleNext();
  };

  const handleRevealAnswer = () => {
    const currentQuestion = questions[currentIndex];
    setShowAnswer(true);
    setResults(prev => [...prev, {
      questionId: currentQuestion.id,
      userAnswer: userAnswer,
      correct: false,
      skipped: false,
      passage: passageMap.get(currentQuestion.id) || '',
    }]);
    // Scroll to top on mobile
    if (window.innerHeight < 700) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setFeedback(null);
      const wasShowingAnswer = showAnswer;
      setShowAnswer(false);
      // Reset to random incorrect message for next question
      setCurrentIncorrectMsg(incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]);
      
      // Scroll to top if we were showing answer (continue button)
      if (wasShowingAnswer && window.innerHeight < 700) {
        window.scrollTo(0, 0);
      }
      
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setTimerActive(false);
    setState('results');
  };

  const renderSentence = (sentence: string) => {
    const regex = /\{\{(.+?)\}\}/g;
    const parts = sentence.split(regex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <mark key={index} className="bg-warning rounded fw-bold text-dark highlight-word">
            {part}
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Setup Screen
  if (state === 'setup') {
    return (
      <>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="robots" content={metadata.robots} />
          
          <meta property="og:title" content={metadata.ogTitle} />
          <meta property="og:description" content={metadata.ogDescription} />
          <meta property="og:image" content={metadata.ogImage} />
          <meta property="og:url" content={metadata.ogUrl} />
          <meta property="og:type" content={metadata.ogType} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
          />
        </Head>

        {/* Breadcrumb */}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">工具</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item active" aria-current="page">
                  十二篇範文語譯 測驗模式 ✍️
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="card rounded-4 page-12p" style={{ height: "auto" }}>
          <div className="card-body">
            <div className="mb-4 text-center">
              <h1 className="mb-3" style={{ color: '#d97706', fontWeight: 900, marginTop: '1.5rem' }}>十二篇範文語譯 測驗模式 ✍️</h1>
              <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto' }}>選擇篇章及設定測驗參數，然後開始自我測試。</p>
            </div>

            <hr className="my-4" />

            <div className="passage-selection-header mb-4">
              <h5 className="mb-0">選擇篇章 ({settings.selectedPassages.length}/{config.passages.length})</h5>
              <div className="d-flex gap-2">
                <button 
                  className="select-btn select-all-btn"
                  onClick={handleSelectAll}
                >
                  全選
                </button>
                <button 
                  className="select-btn clear-btn"
                  onClick={handleDeselectAll}
                >
                  清除
                </button>
              </div>
            </div>

            <div className="passages-grid mb-4">
              {config.passages.map((passage) => {
                const isSelected = settings.selectedPassages.includes(passage.id);
                return (
                  <div 
                    key={passage.id}
                    className={`passage-grid-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handlePassageToggle(passage.id)}
                  >
                    <div className="passage-check-icon">
                      {isSelected && <BiCheck size={20} />}
                    </div>
                    <div className="passage-emoji-small">{passage.emoji}</div>
                    <div className="passage-title-small">{passage.title}</div>
                  </div>
                );
              })}
            </div>

            <hr className="my-4" />

            {/* Quiz Settings */}
            <h3 className="mb-4 text-center fw-bold">測驗設定</h3>
            <div className="quiz-settings-container">
              <div className="quiz-setting-row">
                <label htmlFor="questionCount" className="setting-label">
                  📝 題目數量
                </label>
                <select
                  id="questionCount"
                  className="form-select form-select-lg"
                  value={settings.questionCount}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    questionCount: parseInt(e.target.value),
                  }))}
                  style={{ maxWidth: '300px', margin: '0 auto' }}
                >
                  <option value="5">5 題</option>
                  <option value="10">10 題</option>
                  <option value="20">20 題</option>
                  <option value="30">30 題</option>
                  <option value="50">50 題</option>
                  <option value="-1">全部題目</option>
                </select>
              </div>

              <div className="quiz-setting-row">
                <label className="setting-label">⏱️ 限時模式</label>
                <button
                  type="button"
                  className={`timer-toggle ${settings.timeLimited ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, timeLimited: !prev.timeLimited }))}
                  role="switch"
                  aria-checked={settings.timeLimited}
                >
                  <span className="timer-toggle-track">
                    <span className="timer-toggle-thumb" />
                  </span>
                  <span className="timer-toggle-label">{settings.timeLimited ? '開啟' : '關閉'}</span>
                </button>
              </div>

              {settings.timeLimited && (
                <div className="quiz-setting-row">
                  <label htmlFor="timeLimit" className="setting-label">
                    ⏰ 時間限制
                  </label>
                  <div className="d-flex align-items-center gap-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <input
                      type="range"
                      className="form-range flex-grow-1"
                      id="timeLimit"
                      min="60"
                      max="1800"
                      step="30"
                      value={settings.timeLimit}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        timeLimit: parseInt(e.target.value),
                      }))}
                    />
                    <span className="badge bg-primary" style={{ minWidth: '80px', fontSize: '1rem', padding: '0.5rem 1rem' }}>
                      {formatTime(settings.timeLimit || 300)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <hr className="my-4" />

            <div className="d-grid gap-2">
              <button
                className="start-btn"
                onClick={loadQuestions}
                disabled={settings.selectedPassages.length === 0}
              >
                🚀 開始測驗 ({settings.selectedPassages.length} 篇)
              </button>
              <NavigationLink href="/12p">
                <button className="back-btn">
                  返回
                </button>
              </NavigationLink>
            </div>

            {settings.selectedPassages.length === 0 && (
              <div className="alert alert-warning mt-3" role="alert">
                <i className="bx bx-info-circle me-2"></i>
                請至少選擇一篇範文
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          :global(.page-12p) {
            font-family: var(--font-noto-sans-hk), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }

          .passages-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.75rem;
          }

          .passage-grid-item {
            position: relative;
            padding: 1rem 0.6rem;
            border-radius: 0.75rem;
            background: var(--bs-card-bg);
            border: 2px solid var(--bs-border-color);
            cursor: pointer;
            user-select: none;
            text-align: center;
            transition: all 0.15s ease;
          }

          .passage-grid-item:hover {
            border-color: #22c55e;
          }

          .passage-grid-item.selected {
            background: #22c55e;
            border-color: #22c55e;
          }

          .passage-grid-item.selected .passage-title-small {
            color: #ffffff;
          }

          .passage-check-icon {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #22c55e;
          }

          [data-bs-theme=dark] .passage-check-icon {
            background: rgba(40, 40, 40, 0.9);
            border: 1.5px solid rgba(34, 197, 94, 0.3);
          }

          [data-bs-theme=blue] .passage-check-icon {
            background: rgba(30, 40, 60, 0.9);
            border: 1.5px solid rgba(34, 197, 94, 0.3);
          }

          .highlight-word {
            padding: 0.15rem 0.4rem;
            margin: 0 0.1rem;
          }

          .passage-emoji-small {
            font-size: 1.75rem;
            margin-bottom: 0.4rem;
          }

          .passage-title-small {
            font-weight: 600;
            font-size: 0.875rem;
            color: var(--bs-heading-color);
            line-height: 1.3;
          }

          .passage-selection-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .select-btn {
            padding: 0.5rem 1.25rem;
            border-radius: 0.5rem;
            border: 2px solid #22c55e;
            background: #22c55e;
            color: #ffffff;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .select-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          }

          .select-all-btn {
            border-color: #d97706;
            background: #d97706;
          }

          .select-all-btn:hover {
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }

          .select-btn.clear-btn {
            background: var(--bs-card-bg);
            color: var(--bs-body-color);
            border-color: var(--bs-border-color);
          }

          .select-btn.clear-btn:hover {
            background: var(--bs-body-bg);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .quiz-settings-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .quiz-setting-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .setting-label {
            font-size: 1.15rem;
            font-weight: 600;
            color: var(--bs-heading-color);
            margin-bottom: 0;
          }

          .timer-toggle {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 1rem;
            border-radius: 0.75rem;
            border: 2px solid var(--bs-border-color);
            background: var(--bs-card-bg);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .timer-toggle:hover {
            border-color: var(--bs-primary);
          }

          .timer-toggle.active {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.05);
          }

          .timer-toggle-track {
            position: relative;
            width: 44px;
            height: 24px;
            border-radius: 12px;
            background: var(--bs-tertiary-bg);
            transition: background 0.2s;
            flex-shrink: 0;
          }

          .timer-toggle.active .timer-toggle-track {
            background: #22c55e;
          }

          .timer-toggle-thumb {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            transition: transform 0.2s;
          }

          .timer-toggle.active .timer-toggle-thumb {
            transform: translateX(20px);
          }

          .timer-toggle-label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--bs-body-color);
          }

          .start-btn {
            width: 100%;
            padding: 0.65rem 2rem;
            border-radius: 0.5rem;
            border: 3px solid #22c55e;
            background: #22c55e;
            color: #ffffff;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
          }

          .start-btn:hover:not(:disabled) {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4);
            border-color: #16a34a;
          }

          .start-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .back-btn {
            width: 100%;
            padding: 0.65rem 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid var(--bs-border-color);
            background: var(--bs-tertiary-bg);
            color: var(--bs-body-color);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }

          .back-btn:hover {
            background: var(--bs-secondary-bg);
          }

          @media (max-width: 992px) {
            .passages-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (max-width: 768px) {
            .passages-grid {
              grid-template-columns: 1fr;
              gap: 0.5rem;
            }

            .passage-grid-item {
              padding: 0.6rem 0.75rem;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              gap: 0.6rem;
              min-height: auto;
            }

            .passage-check-icon {
              position: static;
              width: 24px;
              height: 24px;
              flex-shrink: 0;
            }

            .passage-emoji-small {
              font-size: 1.5rem;
              margin: 0;
              flex-shrink: 0;
            }

            .passage-title-small {
              font-size: 0.9rem;
              text-align: left;
              flex-grow: 1;
            }

            .passage-selection-header {
              flex-direction: column;
              align-items: stretch;
              gap: 1rem;
              margin-bottom: 0.75rem !important;
            }

            .passage-selection-header h5 {
              text-align: center;
            }

            .passage-selection-header .d-flex {
              justify-content: center;
            }

            .select-btn {
              padding: 0.5rem 1rem;
              font-size: 0.85rem;
              white-space: nowrap;
              flex: 1;
            }

            .select-all-btn {
              background: #d97706;
              border-color: #d97706;
            }

            .back-btn {
              border: none;
              box-shadow: none;
            }
          }
        `}</style>
      </>
    );
  }

  // Quiz Screen
  if (state === 'quiz' && questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const passageTitle = passageMap.get(currentQuestion.id) || '';
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
      <>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>

        {/* Breadcrumb */}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">工具</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item active" aria-current="page">
                  十二篇範文語譯 測驗模式 ✍️
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="card rounded-4 page-12p" style={{ height: "auto" }}>
          <div className="card-body">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                className="end-btn"
                onClick={() => {
                  setState('setup');
                  setTimerActive(false);
                }}
              >
                <BiExit size={18} />
                <span className="end-btn-text">離開測驗</span>
              </button>
              
              <div className="d-flex align-items-center gap-3">
                {settings.timeLimited && (
                  <div className={`timer-badge ${timeRemaining < 60 ? 'danger' : ''}`}>
                    ⏱️ {formatTime(timeRemaining)}
                  </div>
                )}
                
                <div className="progress-badge">
                  <strong>{currentIndex + 1}</strong> / {questions.length}
                </div>
              </div>
            </div>

            {/* Passage Title */}
            <div className="text-center mb-3">
              <h2 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {passageTitle}
              </h2>
            </div>

            {/* Question */}
            <div className="quiz-question-box mb-4">
              <p className="text-center mb-0" style={{ 
                fontSize: currentQuestion.sentence.length < 50 ? '1.75rem' : '1.5rem', 
                lineHeight: '1.8',
                fontWeight: 500 
              }}>
                {renderSentence(currentQuestion.sentence)}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {!showAnswer && (
                  <input
                    ref={inputRef}
                    type="text"
                    className={`quiz-input ${
                      feedback === 'correct' ? 'correct' : 
                      feedback === 'incorrect' ? 'incorrect' : ''
                    }`}
                    placeholder="輸入答案..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={feedback === 'correct'}
                    autoComplete="off"
                  />
                )}
                
                {feedback === 'correct' && (
                  <div className="feedback-message success">
                    ✅ 正確！
                  </div>
                )}
                
                {feedback === 'incorrect' && !showAnswer && (
                  <div className="feedback-message error">
                    {currentIncorrectMsg}
                  </div>
                )}
                
                {showAnswer && (
                  <div className="answer-reveal">
                    <div className="answer-title">答案</div>
                    <div className="answer-text">
                      {currentQuestion.meaning}
                    </div>
                    {currentQuestion.notes && (
                      <div className="answer-notes">
                        📌 {currentQuestion.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="d-grid gap-3">
                {!showAnswer && feedback !== 'correct' && (
                  <button type="submit" className="quiz-submit-btn">
                    提交答案
                  </button>
                )}
                
                {feedback === 'correct' && (
                  <button type="button" className="quiz-next-btn" onClick={handleNext}>
                    下一題 →
                  </button>
                )}
                
                {showAnswer && (
                  <button type="button" className="quiz-next-btn" onClick={handleNext}>
                    繼續 →
                  </button>
                )}
                
                {feedback === 'incorrect' && !showAnswer && (
                  <div className="action-buttons-container">
                    <button type="button" className="quiz-skip-btn" onClick={handleSkip}>
                      <BiSkipNext size={20} className="btn-icon" />
                      跳過
                    </button>
                    <button type="button" className="quiz-reveal-btn" onClick={handleRevealAnswer}>
                      <BiShow size={16} className="btn-icon" style={{ marginRight: '0.1rem', marginTop: '0.1rem' }}/>
                      答案
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Report A Problem Link */}
            <div className="text-center mt-3">
              <NavigationLink href="/contact">
                <a className="report-problem-link">
                  <small>⚠️ Report A Problem</small>
                </a>
              </NavigationLink>
            </div>
          </div>
        </div>

        <style jsx>{`
          .timer-badge {
            padding: 0.5rem 1rem;
            background: #d97706;
            color: #ffffff;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.875rem;
          }

          .timer-badge.danger {
            background: #dc3545;
            animation: pulse 1s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }

          .progress-badge {
            padding: 0.5rem 1rem;
            background: #d97706;
            color: #ffffff;
            border-radius: 0.5rem;
            font-weight: 400;
            font-size: 0.875rem;
          }

          .progress-badge strong {
            font-weight: 700;
          }

          .quiz-question-box {
            padding: 2.5rem 1.5rem;
            background: var(--bs-body-bg);
            border-radius: 1rem;
            border: 2px solid var(--bs-border-color);
          }

          .quiz-input {
            width: 100%;
            padding: 1.25rem 1.5rem;
            border-radius: 0.75rem;
            font-size: 16px;
            border: 3px solid var(--bs-border-color);
            background: var(--bs-card-bg);
            color: var(--bs-body-color);
            font-size: 1.25rem;
            font-weight: 500;
            text-align: center;
            transition: all 0.2s ease;
          }

          .quiz-input:focus {
            outline: none;
            border-color: var(--bs-primary);
            box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
          }

          .quiz-input.correct {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.05);
          }

          .quiz-input.incorrect {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.05);
          }

          .feedback-message {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 0.75rem;
            text-align: center;
            font-weight: 600;
            font-size: 1.125rem;
          }

          .feedback-message.success {
            background: rgba(34, 197, 94, 0.1);
            color: #15803d;
          }

          .feedback-message.error {
            background: rgba(239, 68, 68, 0.1);
            color: #991b1b;
          }

          .answer-reveal {
            margin-top: 1rem;
            padding: 2rem 1.5rem;
            border-radius: 0.75rem;
            background: rgba(34, 197, 94, 0.1);
            border: 2px solid rgba(34, 197, 94, 0.3);
            text-align: center;
          }

          .answer-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #16a34a;
            margin-bottom: 1rem;
          }

          .answer-text {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--bs-heading-color);
            margin-bottom: 0.75rem;
          }

          .answer-notes {
            font-size: 0.95rem;
            color: var(--bs-body-color);
            opacity: 0.8;
            margin-top: 1rem;
          }

          .quiz-submit-btn {
            width: 100%;
            padding: 0.65rem 2rem;
            border-radius: 0.5rem;
            border: 3px solid #d97706;
            background: #d97706;
            color: #ffffff;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .quiz-submit-btn:hover {
            box-shadow: 0 0 12px rgba(217, 119, 6, 0.4), 0 0 24px rgba(217, 119, 6, 0.2);
            border-color: #b45309;
          }

          .quiz-next-btn {
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            border: 3px solid #22c55e;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #ffffff;
            font-weight: 700;
            font-size: 1.125rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .quiz-next-btn:hover {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4);
            border-color: #16a34a;
          }

          .action-buttons-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .quiz-skip-btn, .quiz-reveal-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            border: 2px solid var(--bs-border-color);
            background: var(--bs-card-bg);
            color: var(--bs-body-color);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .btn-icon {
            margin-right: 0.6rem;
            flex-shrink: 0;
          }

          .quiz-skip-btn:hover {
            border-color: #f59e0b;
            color: #f59e0b;
            transform: translateY(-1px);
          }

          .quiz-reveal-btn:hover {
            border-color: var(--bs-primary);
            color: var(--bs-primary);
            transform: translateY(-1px);
          }

          .end-btn {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: 2px solid #dc3545;
            background: var(--bs-card-bg);
            color: #dc3545;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
          }

          .end-btn:hover {
            background: #dc3545;
            color: #ffffff;
            transform: translateY(-1px);
          }

          .report-problem-link {
            color: var(--bs-secondary);
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.2s ease;
          }

          .report-problem-link:hover {
            opacity: 1;
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            .end-btn-text {
              display: none;
            }

            .end-btn {
              padding: 0.5rem;
              gap: 0;
            }

            .action-buttons-container {
              grid-template-columns: 1fr;
              gap: 0.5rem;
            }
          }

          @media (max-width: 768px) {
            .quiz-question-box {
              padding: 2rem 1rem;
            }

            .quiz-input {
              font-size: 1.125rem;
              padding: 1rem 1.25rem;
            }
          }
        `}</style>
      </>
    );
  }

  // Results Screen
  if (state === 'results') {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const correctCount = results.filter(r => r.correct).length;
    const incorrectCount = results.filter(r => !r.correct && !r.skipped).length;
    const skippedCount = results.filter(r => r.skipped).length;
    const score = Math.round((correctCount / results.length) * 100);

    return (
      <>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        </Head>

        {/* Breadcrumb */}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">工具</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item active" aria-current="page">
                  測驗結果 🎉
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="card rounded-4 page-12p" style={{ height: "auto" }}>
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="mb-3" style={{ fontSize: '2rem', fontWeight: 700 }}>📊 測驗結果</h2>
            </div>

            {/* Statistics */}
            <div className="row g-4 mb-4">
            <div className="col-md-3 col-6">
              <div className="card text-center shadow-sm stat-card">
                <div className="card-body py-4">
                  <h3 className="display-5 text-primary mb-1 fw-semibold">{score}%</h3>
                  <div className="stat-label">總分</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center shadow-sm stat-card">
                <div className="card-body py-4">
                  <h3 className="display-5 text-success mb-1 fw-semibold">{correctCount}</h3>
                  <div className="stat-label">正確</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center shadow-sm stat-card">
                <div className="card-body py-4">
                  <h3 className="display-5 text-danger mb-1 fw-semibold">{incorrectCount}</h3>
                  <div className="stat-label">錯誤</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center shadow-sm stat-card">
                <div className="card-body py-4">
                  <h3 className="display-5 text-warning mb-1 fw-semibold">{skippedCount}</h3>
                  <div className="stat-label">跳過</div>
                </div>
              </div>
            </div>
          </div>

            <div className="text-center mb-3">
              <div className="time-bubble">
                ⏱️ 用時：{formatTime(totalTime)}
              </div>
            </div>

            <hr className="my-4" />

            {/* Detailed Results */}
            <h5 className="mb-3 fw-bold">📋 詳細結果</h5>
            <div className="mb-4">
              <div className="list-group">
                {results.map((result, index) => {
                  const question = questions.find(q => q.id === result.questionId);
                  if (!question) return null;

                  return (
                    <div
                      key={result.questionId}
                      className={`list-group-item result-item ${
                        result.correct ? 'list-group-item-success' :
                        result.skipped ? 'list-group-item-warning' :
                        'list-group-item-danger'
                      }`}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <strong style={{ fontSize: '1.1rem' }}>#{index + 1}</strong>
                          <span className="ms-2 badge bg-secondary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}>{result.passage}</span>
                        </div>
                        <div>
                          {result.correct && <span className="badge bg-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}>✓ 正確</span>}
                          {!result.correct && !result.skipped && <span className="badge bg-danger" style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}>✗ 錯誤</span>}
                          {result.skipped && <span className="badge bg-warning" style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}>⊝ 跳過</span>}
                        </div>
                      </div>
                      <p className="mb-3" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{renderSentence(question.sentence)}</p>
                      <div style={{ fontSize: '0.95rem' }}>
                        <div className="mb-2"><strong>正確答案：</strong>{question.meaning}</div>
                        {result.userAnswer && (
                          <div className="mb-2"><strong>你的答案：</strong>{result.userAnswer}</div>
                        )}
                        {question.notes && (
                          <div className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>📌 {question.notes}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="my-4" />

            {/* Actions */}
            <div className="row g-3">
              <div className="col-md-6">
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={() => {
                    setState('setup');
                    setResults([]);
                    setCurrentIndex(0);
                  }}
                >
                  再測一次
                </button>
              </div>
              <div className="col-md-6">
                <NavigationLink href="/12p" className="btn btn-outline-secondary btn-lg w-100">
                  返回主頁
                </NavigationLink>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .stat-card {
            transition: all 0.2s ease;
          }

          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12) !important;
          }

          .stat-label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--bs-body-color);
            opacity: 0.7;
          }

          .time-bubble {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: var(--bs-primary);
            color: #ffffff;
            border-radius: 999px;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
          }

          .result-item {
            padding: 1.5rem !important;
            margin-bottom: 0.75rem;
            border-radius: 0.75rem !important;
            transition: all 0.2s ease;
          }

          .result-item:hover {
            transform: translateX(4px);
          }

          @media (max-width: 768px) {
            .stat-label {
              font-size: 0.9rem;
            }

            .time-bubble {
              font-size: 0.9rem;
              padding: 0.6rem 1.25rem;
            }

            .result-item {
              padding: 1.25rem !important;
            }
          }
        `}</style>
      </>
    );
  }

  return null;
}

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');
  
  const configPath = path.join(process.cwd(), 'public', '12p', 'config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  const config: PassageConfig = JSON.parse(configData);

  return {
    props: {
      config,
    },
  };
};
