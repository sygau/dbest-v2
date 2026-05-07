import React, { useState, useEffect, useRef } from 'react';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { GetStaticProps } from 'next';
import { BiCheck, BiExit, BiSkipNext, BiShow } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import { Button } from '../../components/ui/Button';
import { Question, PassageConfig, QuizSettings, QuizResult } from '../../types/12p';
import { get12pMetadata } from '../../utils/12pMetadata';
import { generate12pBreadcrumbStructuredData } from '../../utils/12pStructuredData';

interface QuizProps {
  config: PassageConfig;
  allPassageData: Record<string, Question[]>;
}

type QuizState = 'setup' | 'quiz' | 'results';

export default function QuizMode({ config, allPassageData }: QuizProps) {
  const metadata = get12pMetadata('quiz');
  const breadcrumbData = generate12pBreadcrumbStructuredData('quiz');

  const [state, setState] = useState<QuizState>('setup');
  const [settings, setSettings] = useState<QuizSettings>({
    selectedPassages: [],
    questionCount: 10,
    timeLimited: false,
    timeLimit: 300,
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

  const incorrectMessages = [
    '❌ 唔啱喎，再試下？',
    '❌ 未夠準啦，再試！',
    '❌ 差少少，再試吓啦！',
    '❌ 已茂？',
    '❌ 💀',
  ];
  const [currentIncorrectMsg, setCurrentIncorrectMsg] = useState(incorrectMessages[0]);

  useEffect(() => {
    setSettings(prev => ({ ...prev, selectedPassages: config.passages.map(p => p.id) }));
  }, [config]);

  useEffect(() => {
    if (state === 'quiz' && settings.timeLimited && timerActive) {
      if (timeRemaining <= 0) {
        setTimerActive(false);
        const skipped: QuizResult[] = questions.slice(currentIndex).map(q => ({
          questionId: q.id, passage: passageMap.get(q.id) || '', correct: false, skipped: true, userAnswer: '',
        }));
        setResults(prev => [...prev, ...skipped]);
        alert('⏰ 時間到！測驗結束。');
        setState('results');
        return;
      }

      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimerActive(false);
            const skipped: QuizResult[] = questions.slice(currentIndex).map(q => ({
              questionId: q.id, passage: passageMap.get(q.id) || '', correct: false, skipped: true, userAnswer: '',
            }));
            setResults(prev => [...prev, ...skipped]);
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

  const loadQuestions = () => {
    const allQuestions: Question[] = [];
    const map = new Map<string, string>();

    for (const passageId of settings.selectedPassages) {
      const passage = config.passages.find(p => p.id === passageId);
      if (!passage || !allPassageData[passage.id]) continue;
      const data = allPassageData[passage.id];
      if (passage.subPassages?.length) {
        data.forEach(q => {
          const sp = passage.subPassages!.find(s => q.id.startsWith(s.id));
          map.set(q.id, sp ? `${passage.title} - ${sp.title}` : passage.title);
        });
      } else {
        data.forEach(q => map.set(q.id, passage.title));
      }
      allQuestions.push(...data);
    }

    if (allQuestions.length === 0) {
      alert('沒有可用的題目，請重新選擇篇章。');
      return;
    }

    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const requestedCount = settings.questionCount === -1 ? shuffled.length : settings.questionCount;
    const limited = shuffled.slice(0, Math.min(requestedCount, shuffled.length));

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
    setTimeout(() => { window.scrollTo(0, 0); inputRef.current?.focus(); }, 50);
  };

  const normalizeAnswer = (answer: string) => answer.trim().toLowerCase().replace(/\s+/g, '');

  const checkAnswer = (answer: string, question: Question) =>
    question.acptAns.some(a => normalizeAnswer(a) === normalizeAnswer(answer));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback === 'correct' || showAnswer) { handleNext(); return; }

    const currentQuestion = questions[currentIndex];
    const isCorrect = checkAnswer(userAnswer, currentQuestion);

    if (isCorrect) {
      setFeedback('correct');
      setResults(prev => [...prev, { questionId: currentQuestion.id, userAnswer, correct: true, skipped: false, passage: passageMap.get(currentQuestion.id) || '' }]);
      setTimeout(() => handleNext(), 800);
    } else {
      setFeedback('incorrect');
      setCurrentIncorrectMsg(incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]);
    }
  };

  const handleSkip = () => {
    const q = questions[currentIndex];
    setResults(prev => [...prev, { questionId: q.id, userAnswer: '', correct: false, skipped: true, passage: passageMap.get(q.id) || '' }]);
    if (window.innerHeight < 700) window.scrollTo({ top: 0, behavior: 'smooth' });
    handleNext();
  };

  const handleRevealAnswer = () => {
    const q = questions[currentIndex];
    setShowAnswer(true);
    setResults(prev => [...prev, { questionId: q.id, userAnswer, correct: false, skipped: false, passage: passageMap.get(q.id) || '' }]);
    if (window.innerHeight < 700) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setFeedback(null);
      const wasShowingAnswer = showAnswer;
      setShowAnswer(false);
      setCurrentIncorrectMsg(incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]);
      if (wasShowingAnswer && window.innerHeight < 700) window.scrollTo(0, 0);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTimerActive(false);
      setState('results');
    }
  };

  const renderSentence = (sentence: string) => {
    const parts = sentence.split(/\{\{(.+?)\}\}/g);
    return parts.map((part, index) =>
      index % 2 === 1
        ? <mark key={index} style={{ background: '#ffc107', color: '#212529', borderRadius: '0.25rem', fontWeight: 700, padding: '0.15rem 0.4rem', margin: '0 0.1rem' }}>{part}</mark>
        : <span key={index}>{part}</span>
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const Breadcrumb = ({ label }: { label: string }) => (
    <PageBreadcrumb section="工具" text={label} />
  );

  /* ────────── SETUP SCREEN ────────── */
  if (state === 'setup') {
    return (
      <>
        <PageSEO
          title={metadata.title}
          description={metadata.description}
          ogTitle={metadata.ogTitle}
          ogDescription={metadata.ogDescription}
          ogImage={metadata.ogImage}
          ogUrl={metadata.ogUrl}
          ogType={metadata.ogType}
          robots={metadata.robots}
          jsonLd={[breadcrumbData]}
        />

        <Breadcrumb label="十二篇範文語譯 測驗模式 ✍️" />

        <div className="card rounded-4" style={{ fontFamily: 'var(--font-noto-sans-hk), -apple-system, sans-serif', height: 'auto' }}>
          <div className="card-body">

            <div className="text-center" style={{ paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h1 className="mb-3" style={{ color: '#d97706', fontWeight: 900 }}>十二篇範文語譯 測驗模式 ✍️</h1>
              <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto' }}>選擇篇章及設定測驗參數，然後開始自我測試。</p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center mb-4 sel-header">
              <h5 className="mb-0">選擇篇章 ({settings.selectedPassages.length}/{config.passages.length})</h5>
              <div className="flex gap-2">
                <button className="sel-btn sel-all" onClick={() => setSettings(prev => ({ ...prev, selectedPassages: config.passages.map(p => p.id) }))}>全選</button>
                <button className="sel-btn sel-clear" onClick={() => setSettings(prev => ({ ...prev, selectedPassages: [] }))}>清除</button>
              </div>
            </div>

            <div className="passages-grid mb-4">
              {config.passages.map(passage => {
                const isSelected = settings.selectedPassages.includes(passage.id);
                return (
                  <div
                    key={passage.id}
                    className="passage-item"
                    style={{
                      background: isSelected ? '#22c55e' : 'var(--color-card-bg)',
                      border: `2px solid ${isSelected ? '#22c55e' : 'var(--color-border)'}`,
                    }}
                    onClick={() => handlePassageToggle(passage.id)}
                  >
                    <div className="passage-check" style={{ color: '#22c55e' }}>
                      {isSelected && <BiCheck size={20} />}
                    </div>
                    <div className="passage-emoji">{passage.emoji}</div>
                    <div className="passage-title" style={{ color: isSelected ? '#ffffff' : 'var(--color-heading)' }}>
                      {passage.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <hr className="my-4" />

            <h3 className="mb-4 text-center font-bold">測驗設定</h3>

            <div className="quiz-settings">
              {/* Question count */}
              <div className="quiz-setting-row">
                <label className="setting-label">📝 題目數量</label>
                <select
                  className="form-select"
                  value={settings.questionCount}
                  onChange={e => setSettings(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                  style={{ maxWidth: '300px', margin: '0 auto', padding: '0.6rem 2.25rem 0.6rem 0.75rem', fontSize: '1rem' }}
                >
                  <option value="5">5 題</option>
                  <option value="10">10 題</option>
                  <option value="20">20 題</option>
                  <option value="30">30 題</option>
                  <option value="50">50 題</option>
                  <option value="-1">全部題目</option>
                </select>
              </div>

              {/* Timer toggle */}
              <div className="quiz-setting-row">
                <label className="setting-label">⏱️ 限時模式</label>
                <button
                  type="button"
                  className={`timer-toggle ${settings.timeLimited ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, timeLimited: !prev.timeLimited }))}
                  role="switch"
                  aria-checked={settings.timeLimited}
                >
                  <span className="timer-track">
                    <span className="timer-thumb" />
                  </span>
                  <span className="timer-label">{settings.timeLimited ? '開啟' : '關閉'}</span>
                </button>
              </div>

              {/* Time limit slider */}
              {settings.timeLimited && (
                <div className="quiz-setting-row">
                  <label className="setting-label">⏰ 時間限制</label>
                  <div className="flex items-center gap-3" style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                    <input
                      type="range"
                      style={{ flexGrow: 1, accentColor: 'var(--color-primary)' }}
                      min="60"
                      max="1800"
                      step="30"
                      value={settings.timeLimit}
                      onChange={e => setSettings(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    />
                    <span style={{
                      background: 'var(--color-primary)',
                      color: '#fff',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '0.375rem',
                      fontWeight: 700,
                      fontSize: '1rem',
                      minWidth: '70px',
                      textAlign: 'center',
                    }}>
                      {formatTime(settings.timeLimit || 300)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <hr className="my-4" />

            <div className="grid gap-2">
              <button
                className="start-btn"
                onClick={loadQuestions}
                disabled={settings.selectedPassages.length === 0}
              >
                🚀 開始測驗 ({settings.selectedPassages.length} 篇)
              </button>
              <NavigationLink href="/12p">
                <button className="back-btn">返回</button>
              </NavigationLink>
            </div>

            {settings.selectedPassages.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mt-3" role="alert">
                請至少選擇一篇範文
              </div>
            )}

          </div>
        </div>

        <style jsx>{`
          .passages-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.75rem;
          }

          .passage-item {
            position: relative;
            padding: 1rem 0.6rem;
            border-radius: 0.75rem;
            cursor: pointer;
            user-select: none;
            text-align: center;
          }

          .passage-item:hover {
            border-color: #22c55e !important;
          }

          .passage-check {
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
          }

          [data-theme=dark] .passage-check {
            background: rgba(40, 40, 40, 0.9);
            border: 1.5px solid rgba(34, 197, 94, 0.3);
          }

          [data-theme=blue] .passage-check {
            background: rgba(30, 40, 60, 0.9);
            border: 1.5px solid rgba(34, 197, 94, 0.3);
          }

          .passage-emoji {
            font-size: 1.75rem;
            margin-bottom: 0.4rem;
          }

          .passage-title {
            font-weight: 600;
            font-size: 0.875rem;
            line-height: 1.3;
          }

          .sel-btn {
            padding: 0.5rem 1.25rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
            border: 2px solid;
          }

          .sel-all {
            background: #d97706;
            border-color: #d97706;
            color: #ffffff;
          }

          .sel-clear {
            background: var(--color-card-bg);
            border-color: var(--color-border);
            color: var(--color-body);
          }

          .quiz-settings {
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
            color: var(--color-heading);
            margin-bottom: 0;
          }

          .timer-toggle {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 1rem;
            border-radius: 0.75rem;
            border: 2px solid var(--color-border);
            background: var(--color-card-bg);
            cursor: pointer;
          }

          .timer-toggle.active {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.05);
          }

          .timer-track {
            position: relative;
            width: 44px;
            height: 24px;
            border-radius: 12px;
            background: var(--color-tertiary-bg);
            flex-shrink: 0;
          }

          .timer-toggle.active .timer-track {
            background: #22c55e;
          }

          .timer-thumb {
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

          .timer-toggle.active .timer-thumb {
            transform: translateX(20px);
          }

          .timer-label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-body);
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
          }

          .start-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .back-btn {
            width: 100%;
            padding: 0.65rem 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid var(--color-border);
            background: var(--color-tertiary-bg);
            color: var(--color-body);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @media (max-width: 992px) {
            .passages-grid { grid-template-columns: repeat(3, 1fr); }
          }

          @media (max-width: 768px) {
            .passages-grid { grid-template-columns: 1fr; gap: 0.5rem; }

            .passage-item {
              padding: 0.6rem 0.75rem;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              gap: 0.6rem;
              text-align: left;
            }

            .passage-check { position: static; flex-shrink: 0; }
            .passage-emoji { font-size: 1.5rem; margin: 0; flex-shrink: 0; }
            .passage-title { font-size: 0.9rem; flex-grow: 1; }

            .sel-header {
              flex-direction: column;
              align-items: stretch;
              gap: 1rem;
            }

            .sel-header h5 { text-align: center; }
            .sel-header .flex { justify-content: center; }
            .sel-btn { flex: 1; white-space: nowrap; }
          }
        `}</style>
      </>
    );
  }

  /* ────────── QUIZ SCREEN ────────── */
  if (state === 'quiz' && questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const passageTitle = passageMap.get(currentQuestion.id) || '';

    return (
      <>
        <PageSEO title={metadata.title} description={metadata.description} />
        <Breadcrumb label="十二篇範文語譯 測驗模式 ✍️" />

        <div className="card rounded-4" style={{ fontFamily: 'var(--font-noto-sans-hk), -apple-system, sans-serif', height: 'auto' }}>
          <div className="card-body">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setState('setup'); setTimerActive(false); }}
              >
                <BiExit size={18} />
                <span className="hidden sm:inline">離開測驗</span>
              </Button>

              <div className="flex items-center gap-3">
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

            {/* Passage title */}
            <div className="text-center mb-3">
              <h2 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{passageTitle}</h2>
            </div>

            {/* Question box */}
            <div className="question-box mb-4">
              <p className="text-center mb-0" style={{
                fontSize: currentQuestion.sentence.length < 50 ? '1.75rem' : '1.5rem',
                lineHeight: '1.8',
                fontWeight: 500,
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
                    className={`quiz-input ${feedback === 'correct' ? 'correct' : feedback === 'incorrect' ? 'incorrect' : ''}`}
                    placeholder="輸入答案..."
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    disabled={feedback === 'correct'}
                    autoComplete="off"
                    style={{ fontSize: '16px' }}
                  />
                )}

                {feedback === 'correct' && (
                  <div className="feedback-msg success">✅ 正確！</div>
                )}

                {feedback === 'incorrect' && !showAnswer && (
                  <div className="feedback-msg error">{currentIncorrectMsg}</div>
                )}

                {showAnswer && (
                  <div className="answer-reveal">
                    <div className="answer-title">答案</div>
                    <div className="answer-text">{currentQuestion.meaning}</div>
                    {currentQuestion.notes && (
                      <div className="answer-notes">📌 {currentQuestion.notes}</div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid gap-3">
                {!showAnswer && feedback !== 'correct' && (
                  <button type="submit" className="submit-btn">提交答案</button>
                )}

                {(feedback === 'correct' || showAnswer) && (
                  <button type="button" className="next-btn" onClick={handleNext}>繼續 →</button>
                )}

                {feedback === 'incorrect' && !showAnswer && (
                  <div className="action-btns">
                    <button type="button" className="skip-btn" onClick={handleSkip}>
                      <BiSkipNext size={20} style={{ marginRight: '0.4rem' }} />跳過
                    </button>
                    <button type="button" className="reveal-btn" onClick={handleRevealAnswer}>
                      <BiShow size={16} style={{ marginRight: '0.4rem' }} />答案
                    </button>
                  </div>
                )}
              </div>
            </form>

            <div className="text-center mt-3">
              <NavigationLink href="/contact">
                <a style={{ color: 'var(--color-muted)', textDecoration: 'none', opacity: 0.7, fontSize: '0.875rem' }}>
                  ⚠️ Report A Problem
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
            font-size: 0.875rem;
          }

          .question-box {
            padding: 2.5rem 1.5rem;
            background: var(--color-body-bg);
            border-radius: 1rem;
            border: 2px solid var(--color-border);
          }

          .quiz-input {
            width: 100%;
            padding: 1.25rem 1.5rem;
            border-radius: 0.75rem;
            border: 3px solid var(--color-border);
            background: var(--color-card-bg);
            color: var(--color-body);
            font-weight: 500;
            text-align: center;
            font-family: inherit;
          }

          .quiz-input:focus {
            outline: none;
            border-color: var(--color-primary);
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

          .feedback-msg {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 0.75rem;
            text-align: center;
            font-weight: 600;
            font-size: 1.125rem;
          }

          .feedback-msg.success {
            background: rgba(34, 197, 94, 0.1);
            color: #15803d;
          }

          .feedback-msg.error {
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
            color: var(--color-heading);
            margin-bottom: 0.75rem;
          }

          .answer-notes {
            font-size: 0.95rem;
            color: var(--color-body);
            opacity: 0.8;
            margin-top: 1rem;
          }

          .submit-btn {
            width: 100%;
            padding: 0.65rem 2rem;
            border-radius: 0.5rem;
            border: 3px solid #d97706;
            background: #d97706;
            color: #ffffff;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
          }

          .next-btn {
            width: 100%;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            border: 3px solid #22c55e;
            background: #22c55e;
            color: #ffffff;
            font-weight: 700;
            font-size: 1.125rem;
            cursor: pointer;
          }

          .action-btns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .skip-btn, .reveal-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            border: 2px solid var(--color-border);
            background: var(--color-card-bg);
            color: var(--color-body);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .skip-btn:hover { border-color: #f59e0b; color: #f59e0b; }
          .reveal-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

          @media (max-width: 768px) {
            .question-box { padding: 2rem 1rem; }
            .action-btns { grid-template-columns: 1fr; }
          }
        `}</style>
      </>
    );
  }

  /* ────────── RESULTS SCREEN ────────── */
  if (state === 'results') {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const correctCount = results.filter(r => r.correct).length;
    const incorrectCount = results.filter(r => !r.correct && !r.skipped).length;
    const skippedCount = results.filter(r => r.skipped).length;
    const score = results.length ? Math.round((correctCount / results.length) * 100) : 0;

    return (
      <>
        <PageSEO title={metadata.title} description={metadata.description} />
        <Breadcrumb label="測驗結果 🎉" />

        <div className="card rounded-4" style={{ fontFamily: 'var(--font-noto-sans-hk), -apple-system, sans-serif', height: 'auto' }}>
          <div className="card-body">

            <div className="text-center mb-4">
              <h2 className="mb-3" style={{ fontSize: '2rem', fontWeight: 700 }}>📊 測驗結果</h2>
            </div>

            {/* Stat cards */}
            <div className="stat-grid mb-4">
              {[
                { value: `${score}%`, label: '總分',   color: '#0d6efd' },
                { value: correctCount,  label: '正確',   color: '#02c27a' },
                { value: incorrectCount, label: '錯誤',  color: '#fc185a' },
                { value: skippedCount,  label: '跳過',   color: '#ffc107' },
              ].map(stat => (
                <div key={stat.label} className="card text-center" style={{ padding: '1.5rem 1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 600, color: stat.color, marginBottom: '0.25rem' }}>{stat.value}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center mb-3">
              <span style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '1rem',
              }}>
                ⏱️ 用時：{formatTime(totalTime)}
              </span>
            </div>

            <hr className="my-4" />

            <h5 className="mb-3 font-bold">📋 詳細結果</h5>
            <div className="mb-4">
              {results.map((result, index) => {
                const question = questions.find(q => q.id === result.questionId);
                if (!question) return null;

                const resultColor = result.correct ? '#22c55e' : result.skipped ? '#f59e0b' : '#ef4444';
                const resultBg = result.correct ? 'rgba(34,197,94,0.07)' : result.skipped ? 'rgba(245,158,11,0.07)' : 'rgba(239,68,68,0.07)';

                return (
                  <div
                    key={result.questionId}
                    style={{ background: resultBg, border: `1px solid ${resultColor}30`, borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '0.75rem' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong style={{ fontSize: '1.1rem' }}>#{index + 1}</strong>
                        <span style={{ background: 'var(--color-secondary-bg)', color: 'var(--color-muted)', padding: '0.25rem 0.6rem', borderRadius: '0.375rem', fontSize: '0.85rem', fontWeight: 600 }}>
                          {result.passage}
                        </span>
                      </div>
                      <span style={{ background: resultColor, color: '#fff', padding: '0.25rem 0.6rem', borderRadius: '0.375rem', fontSize: '0.85rem', fontWeight: 700 }}>
                        {result.correct ? '✓ 正確' : result.skipped ? '⊝ 跳過' : '✗ 錯誤'}
                      </span>
                    </div>
                    <p className="mb-3" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{renderSentence(question.sentence)}</p>
                    <div style={{ fontSize: '0.95rem' }}>
                      <div className="mb-2"><strong>正確答案：</strong>{question.meaning}</div>
                      {result.userAnswer && <div className="mb-2"><strong>你的答案：</strong>{result.userAnswer}</div>}
                      {question.notes && <div style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>📌 {question.notes}</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            <hr className="my-4" />

            {/* Action buttons */}
            <div className="flex gap-3 results-actions">
              <button
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.75rem 1.5rem', fontSize: '1rem' }}
                onClick={() => { setState('setup'); setResults([]); setCurrentIndex(0); }}
              >
                再測一次
              </button>
              <NavigationLink href="/12p" style={{ flex: 1 }}>
                <button
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)',
                    background: 'transparent',
                    color: 'var(--color-body)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  返回主頁
                </button>
              </NavigationLink>
            </div>

          </div>
        </div>

        <style jsx>{`
          .stat-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
          }

          @media (max-width: 576px) {
            .stat-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .results-actions {
              flex-direction: column;
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
  const config: PassageConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  const allPassageData: Record<string, Question[]> = {};
  for (const passage of config.passages) {
    try {
      const filePath = path.join(process.cwd(), 'public', '12p', passage.file);
      allPassageData[passage.id] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      allPassageData[passage.id] = [];
    }
  }

  return { props: { config, allPassageData } };
};
