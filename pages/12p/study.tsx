import React, { useState, useEffect } from 'react';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { GetStaticProps } from 'next';
import { BiCheck, BiExit } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import Flashcard from '../../components/Flashcard';
import { Button } from '../../components/ui/Button';
import { Question, PassageConfig } from '../../types/12p';
import { get12pMetadata } from '../../utils/12pMetadata';
import { generate12pBreadcrumbStructuredData } from '../../utils/12pStructuredData';

interface StudyProps {
  config: PassageConfig;
  allPassageData: Record<string, Question[]>;
}

export default function StudyMode({ config, allPassageData }: StudyProps) {
  const metadata = get12pMetadata('study');
  const breadcrumbData = generate12pBreadcrumbStructuredData('study');

  const [selectedPassages, setSelectedPassages] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [passageMap, setPassageMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    setSelectedPassages(config.passages.map(p => p.id));
  }, [config]);

  const handlePassageToggle = (passageId: string) => {
    setSelectedPassages(prev =>
      prev.includes(passageId) ? prev.filter(id => id !== passageId) : [...prev, passageId]
    );
  };

  const startStudy = () => {
    const allQuestions: Question[] = [];
    const map = new Map<string, string>();

    for (const passageId of selectedPassages) {
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

    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setPassageMap(map);
    setCurrentIndex(0);
    setIsStarted(true);
    setTimeout(() => window.scrollTo(0, 0), 50);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) { setCurrentIndex(currentIndex + 1); setIsFlipped(false); }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setIsFlipped(false); }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isStarted) return;
    if (e.key === 'ArrowRight') handleNext();
    else if (e.key === 'ArrowLeft') handlePrevious();
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); setIsFlipped(p => !p); }
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > 50) handleNext(); else if (d < -50) handlePrevious();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isStarted, currentIndex, questions.length]);

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

      {/* Breadcrumb */}
      <PageBreadcrumb section="工具" text="十二篇範文語譯 溫習模式 📚" />

      <div className="card rounded-4" style={{ fontFamily: 'var(--font-noto-sans-hk), -apple-system, sans-serif', height: 'auto' }}>
        <div className="card-body">

          {!isStarted ? (
            <>
              {/* Selection Screen */}
              <div className="text-center" style={{ paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h1 className="mb-3" style={{ color: '#d97706', fontWeight: 900 }}>十二篇範文 溫習模式 📚</h1>
                <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto' }}>選擇要溫習的篇章，然後開始使用閃卡學習。</p>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between items-center mb-4 sel-header">
                <h5 className="mb-0">選擇篇章 ({selectedPassages.length}/{config.passages.length})</h5>
                <div className="flex gap-2">
                  <button className="sel-btn sel-all" onClick={() => setSelectedPassages(config.passages.map(p => p.id))}>全選</button>
                  <button className="sel-btn sel-clear" onClick={() => setSelectedPassages([])}>清除</button>
                </div>
              </div>

              <div className="passages-grid mb-4">
                {config.passages.map(passage => {
                  const isSelected = selectedPassages.includes(passage.id);
                  return (
                    <div
                      key={passage.id}
                      className="passage-item"
                      style={{
                        background: isSelected ? 'var(--color-primary)' : 'var(--color-card-bg)',
                        border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      }}
                      onClick={() => handlePassageToggle(passage.id)}
                    >
                      <div className="passage-check">
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

              <div className="grid gap-2">
                <button
                  className="start-btn"
                  onClick={startStudy}
                  disabled={selectedPassages.length === 0}
                >
                  🚀 開始溫習 ({selectedPassages.length} 篇)
                </button>
                <NavigationLink href="/12p">
                  <button className="back-btn">返回</button>
                </NavigationLink>
              </div>

              {selectedPassages.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mt-3" role="alert">
                  請至少選擇一篇範文
                </div>
              )}
            </>
          ) : (
            <>
              {/* Flashcard Screen — Desktop Header */}
              <div className="hidden md:flex justify-between items-center mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setIsStarted(false); setCurrentIndex(0); }}
                >
                  <BiExit size={18} />
                  離開溫習
                </Button>
                <div className="progress-badge">
                  <strong>{currentIndex + 1}</strong> / {questions.length}
                </div>
              </div>

              <div className="text-center mb-3 hidden md:block">
                <h1 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                  {passageMap.get(questions[currentIndex].id) || ''}
                </h1>
              </div>

              {/* Mobile Header */}
              <div className="md:hidden mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setIsStarted(false); setCurrentIndex(0); }}
                  >
                    <BiExit size={18} />
                  </Button>
                  <div className="progress-badge">
                    <strong>{currentIndex + 1}</strong> / {questions.length}
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="mb-0" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                    {passageMap.get(questions[currentIndex].id) || ''}
                  </h1>
                </div>
              </div>

              <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <Flashcard
                  question={questions[currentIndex]}
                  passageTitle={passageMap.get(questions[currentIndex].id) || ''}
                  isFlipped={isFlipped}
                  onFlip={() => setIsFlipped(p => !p)}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-4">
                <button className="nav-btn" onClick={handlePrevious} disabled={currentIndex === 0}>← 上一題</button>
                <button className="nav-btn" onClick={handleNext} disabled={currentIndex === questions.length - 1}>下一題 →</button>
              </div>

              <div className="text-center mt-3">
                <small style={{ color: 'var(--color-muted)' }}>🔑 ← / → 切換題目　↑ / ↓ 翻轉卡片</small>
              </div>

              <div className="text-center mt-3">
                <NavigationLink href="/contact">
                  <a style={{ color: 'var(--color-muted)', textDecoration: 'none', opacity: 0.7, fontSize: '0.875rem' }}>
                    ⚠️ Report A Problem
                  </a>
                </NavigationLink>
              </div>

              {currentIndex === questions.length - 1 && (
                <div className="bg-green-50 border border-green-400 text-green-800 px-4 py-3 rounded mt-4" role="alert">
                  🎉 你已完成所有題目！可以返回重新開始或選擇其他篇章。
                </div>
              )}
            </>
          )}

        </div>
      </div>

      <style jsx>{`
        /* ── Passage grid ── */
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
          color: var(--color-primary);
        }

        [data-bs-theme=dark] .passage-check,
        [data-theme=dark] .passage-check {
          background: rgba(40, 40, 40, 0.9);
          border: 1.5px solid rgba(59, 130, 246, 0.3);
        }

        [data-bs-theme=blue-theme] .passage-check,
        [data-theme=blue] .passage-check {
          background: rgba(30, 40, 60, 0.9);
          border: 1.5px solid rgba(59, 130, 246, 0.3);
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

        /* ── Buttons ── */
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

        .start-btn {
          width: 100%;
          padding: 0.65rem 2rem;
          border-radius: 0.5rem;
          border: none;
          background: var(--color-primary);
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

        .nav-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
          background: var(--color-tertiary-bg);
          color: var(--color-body);
          font-weight: 600;
          cursor: pointer;
        }

        .nav-btn:not(:disabled):hover {
          color: var(--color-primary);
          background: var(--color-secondary-bg);
        }

        .nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .progress-badge {
          padding: 0.5rem 1rem;
          background: var(--color-primary);
          color: #ffffff;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 768px) {
          .passages-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .passage-item {
            padding: 0.6rem 0.75rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 0.6rem;
            text-align: left;
          }

          .passage-check {
            position: static;
            flex-shrink: 0;
          }

          .passage-emoji {
            font-size: 1.5rem;
            margin: 0;
            flex-shrink: 0;
          }

          .passage-title {
            font-size: 0.9rem;
            flex-grow: 1;
          }

          .sel-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .sel-header h5 {
            text-align: center;
          }

          .sel-header .flex {
            justify-content: center;
          }

          .sel-btn {
            flex: 1;
            white-space: nowrap;
          }
        }
      `}</style>
    </>
  );
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
