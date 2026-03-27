import React, { useState } from 'react';
import { Question } from '../types/12p';

interface FlashcardProps {
  question: Question;
  passageTitle: string;
  isFlipped?: boolean;
  onFlip?: () => void;
} 
 
export default function Flashcard({ question, passageTitle, isFlipped: externalIsFlipped, onFlip }: FlashcardProps) {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);
  
  // Use external flip state if provided, otherwise use internal
  const isFlipped = externalIsFlipped !== undefined ? externalIsFlipped : internalIsFlipped;

  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    } else {
      setInternalIsFlipped(!internalIsFlipped);
    }
  };

  // Replace {{word}} with highlighted version
  const renderSentence = (sentence: string, target: string) => {
    const regex = /\{\{(.+?)\}\}/g;
    const parts = sentence.split(regex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <mark key={index} className="bg-warning px-2 py-1 rounded fw-bold">
            {part}
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Calculate dynamic font size based on text length
  const getQuestionFontSize = () => {
    const length = question.sentence.length;
    if (length < 30) return '2.25rem';
    if (length < 50) return '1.875rem';
    if (length < 80) return '1.5rem';
    return '1.25rem';
  };

  const getAnswerFontSize = () => {
    const length = question.meaning.length;
    if (length < 20) return '2rem';
    if (length < 40) return '1.625rem';
    if (length < 60) return '1.375rem';
    return '1.125rem';
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="flashcard-face flashcard-front">
          <div className="card shadow-lg h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
              <div className="flex-grow-1 d-flex align-items-center justify-content-center w-100">
                <p className="text-center mb-0" style={{ fontSize: getQuestionFontSize(), lineHeight: '1.8', fontWeight: 500 }}>
                  {renderSentence(question.sentence, question.target)}
                </p>
              </div>
              <div className="mt-3">
                <small className="text-muted">💡 點擊查看答案</small>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="flashcard-face flashcard-back">
          <div className="card shadow-lg h-100 bg-light">
            <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center w-100">
                <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                  <mark className="bg-warning rounded fw-bold text-dark px-3 py-2" style={{ fontSize: '2rem' }}>
                    {question.target}
                  </mark>
                  <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>=</span>
                  <p className="mb-0" style={{ fontSize: '1.625rem', lineHeight: '1.7', fontWeight: 500 }}>
                    {question.meaning}
                  </p>
                </div>
              </div>
              {question.notes && (
                <div className="alert alert-info mt-3 w-100">
                  <small>📌 {question.notes}</small>
                </div>
              )}
              <div className="mt-3">
                <small className="text-muted">🔄 點擊返回問題</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .flashcard-container {
          perspective: 1000px;
          cursor: pointer;
          min-height: 400px;
        }

        .flashcard {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 400px;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flashcard.flipped {
          transform: rotateY(180deg);
        }

        .flashcard-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flashcard-face :global(.card),
        .flashcard-face :global(.card-body) {
          height: 100%;
          min-height: 100%;
        }

        .flashcard-back {
          transform: rotateY(180deg);
        }

        .card {
          border: 2px solid var(--bs-border-color);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        [data-bs-theme=light] .card {
          border: 2px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        mark {
          font-size: 1.1em;
        }

        @media (max-width: 768px) {
          .flashcard-container {
            min-height: 280px;
          }
          
          .flashcard {
            min-height: 280px;
          }
          
          .card-body p {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
