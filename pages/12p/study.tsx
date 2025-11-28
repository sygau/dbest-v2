import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { BiCheck, BiX, BiExit, BiArrowBack } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import Flashcard from '../../components/Flashcard';
import { Question, Passage, PassageConfig } from '../../types/12p';
import { get12pMetadata } from '../../utils/12pMetadata';
import { generate12pBreadcrumbStructuredData } from '../../utils/12pStructuredData';

interface StudyProps {
  config: PassageConfig;
}

export default function StudyMode({ config }: StudyProps) {
  const metadata = get12pMetadata('study');
  const breadcrumbData = generate12pBreadcrumbStructuredData('study');
  
  const [selectedPassages, setSelectedPassages] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [passageMap, setPassageMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    // Default: select all passages
    setSelectedPassages(config.passages.map(p => p.id));
  }, [config]);

  const handlePassageToggle = (passageId: string) => {
    setSelectedPassages(prev => {
      if (prev.includes(passageId)) {
        return prev.filter(id => id !== passageId);
      } else {
        return [...prev, passageId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedPassages(config.passages.map(p => p.id));
  };

  const handleDeselectAll = () => {
    setSelectedPassages([]);
  };

  const loadQuestions = async () => {
    const allQuestions: Question[] = [];
    const map = new Map<string, string>();

    for (const passageId of selectedPassages) {
      const passage = config.passages.find(p => p.id === passageId);
      if (passage) {
        try {
          const response = await fetch(`/12p/${passage.file}`);
          const data: Question[] = await response.json();
          
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
        }
      }
    }

    // Shuffle questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setPassageMap(map);
    setCurrentIndex(0);
    setIsStarted(true);
    
    // Scroll to top when starting - force to absolute top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isStarted) return;
    
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsFlipped(prev => !prev);
    }
  };

  // Touch swipe support for iOS/iPad
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isStarted, currentIndex, questions.length]);

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
                十二篇範文語譯 溫習模式 📚
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card rounded-4 page-12p" style={{ height: "auto" }}>
        <div className="card-body">
          {!isStarted ? (
            <>
              {/* Selection Screen */}
              <div className="mb-4 text-center">
                <h1 className="mb-3" style={{ color: '#d97706', fontWeight: 900, marginTop: '1.5rem' }}>十二篇範文 溫習模式 📚</h1>
                <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto' }}>選擇要溫習的篇章，然後開始使用閃卡學習。</p>
              </div>

              <hr className="my-4" />

              <div className="passage-selection-header mb-4">
                <h5 className="mb-0">選擇篇章 ({selectedPassages.length}/{config.passages.length})</h5>
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
                  const isSelected = selectedPassages.includes(passage.id);
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

              <div className="d-grid gap-2">
                <button
                  className="start-btn"
                  onClick={loadQuestions}
                  disabled={selectedPassages.length === 0}
                >
                  🚀 開始溫習 ({selectedPassages.length} 篇)
                </button>
                <NavigationLink href="/12p">
                  <button className="back-btn">
                    返回
                  </button>
                </NavigationLink>
              </div>

              {selectedPassages.length === 0 && (
                <div className="alert alert-warning mt-3" role="alert">
                  <i className="bx bx-info-circle me-2"></i>
                  請至少選擇一篇範文
                </div>
              )}
            </>
          ) : questions.length === 0 ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">載入中...</span>
              </div>
              <p className="mt-3 text-muted">正在載入題目...</p>
            </div>
          ) : (
            <>
              {/* Flashcard Screen */}
              {/* Desktop Header */}
              <div className="d-none d-md-flex justify-content-between align-items-center mb-4">
                <button
                  className="end-btn"
                  onClick={() => {
                    setIsStarted(false);
                    setCurrentIndex(0);
                  }}
                >
                  <BiExit size={18} />
                  <span className="end-btn-text">離開溫習</span>
                </button>
                
                <div className="d-flex align-items-center gap-3">
                  <div className="progress-badge">
                    <strong>{currentIndex + 1}</strong> / {questions.length}
                  </div>
                </div>
              </div>

              <div className="text-center mb-3 d-none d-md-block">
                <h1 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                  {passageMap.get(questions[currentIndex].id) || ''}
                </h1>
              </div>

              {/* Mobile Header */}
              <div className="d-md-none study-header-mobile">
                <div className="study-header-top">
                  <button
                    className="end-btn"
                    onClick={() => {
                      setIsStarted(false);
                      setCurrentIndex(0);
                    }}
                  >
                    <BiExit size={18} />
                  </button>
                  
                  <div className="progress-badge">
                    <strong>{currentIndex + 1}</strong> / {questions.length}
                  </div>
                </div>
                <div className="study-header-title">
                  <h1 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                    {passageMap.get(questions[currentIndex].id) || ''}
                  </h1>
                </div>
              </div>

              <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <Flashcard
                  question={questions[currentIndex]}
                  passageTitle={passageMap.get(questions[currentIndex].id) || ''}
                  isFlipped={isFlipped}
                  onFlip={() => setIsFlipped(prev => !prev)}
                />
              </div>

              {/* Navigation */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button 
                  className="nav-btn"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  ← 上一題
                </button>
                <button 
                  className="nav-btn"
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                >
                  下一題 →
                </button>
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  🔑 ← / → 切換題目　↑ / ↓ 翻轉卡片
                </small>
              </div>

              {/* Report A Problem Link */}
              <div className="text-center mt-3">
                <NavigationLink href="/contact">
                  <a className="report-problem-link">
                    <small>⚠️ Report A Problem</small>
                  </a>
                </NavigationLink>
              </div>

              {currentIndex === questions.length - 1 && (
                <div className="alert alert-success mt-4" role="alert">
                  <i className="bx bx-check-circle me-2"></i>
                  🎉 你已完成所有題目！可以返回重新開始或選擇其他篇章。
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        :global(.page-12p) {
          font-family: 'Noto Sans HK', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

        .passage-grid-item.selected {
          background: var(--bs-primary);
          border-color: var(--bs-primary);
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
          color: var(--bs-primary);
        }

        [data-bs-theme=dark] .passage-check-icon {
          background: rgba(40, 40, 40, 0.9);
          border: 1.5px solid rgba(59, 130, 246, 0.3);
        }

        [data-bs-theme=blue] .passage-check-icon {
          background: rgba(30, 40, 60, 0.9);
          border: 1.5px solid rgba(59, 130, 246, 0.3);
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
          border: 2px solid var(--bs-primary);
          background: var(--bs-primary);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .select-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
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

        .start-btn {
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          border: none;
          background: var(--bs-primary);
          color: #ffffff;
          font-weight: 700;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .start-btn:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(13, 110, 253, 0.4);
        }

        .start-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .back-btn {
          width: 100%;
          padding: 0.65rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          background: var(--bs-card-bg);
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
          opacity: 0.8;
        }

        .nav-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          background: var(--bs-card-bg);
          color: var(--bs-body-color);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-btn:hover:not(:disabled) {
          color: var(--bs-primary);
        }

        .nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
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
        }

        .progress-badge {
          padding: 0.5rem 1rem;
          background: var(--bs-primary);
          color: #ffffff;
          border-radius: 0.5rem;
          font-weight: 400;
          font-size: 0.875rem;
        }

        .progress-badge strong {
          font-weight: 700;
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

          .end-btn-text {
            display: none;
          }

          .end-btn {
            padding: 0.5rem;
            gap: 0;
          }

          .study-header-mobile {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .study-header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .study-header-title {
            text-align: center;
          }

          .study-header-title h1 {
            font-size: 1.4rem !important;
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
  const configData = fs.readFileSync(configPath, 'utf8');
  const config: PassageConfig = JSON.parse(configData);

  return {
    props: {
      config,
    },
  };
};
