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

  const isFlipped = externalIsFlipped !== undefined ? externalIsFlipped : internalIsFlipped;

  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    } else {
      setInternalIsFlipped(!internalIsFlipped);
    }
  };

  const renderSentence = (sentence: string) => {
    const regex = /\{\{(.+?)\}\}/g;
    const parts = sentence.split(regex);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <mark key={index} style={{ background: '#ffc107', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontWeight: 700 }}>
            {part}
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

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
          <div className="fc-card fc-shadow h-full">
            <div className="fc-body flex flex-col justify-center items-center p-4">
              <div className="grow flex items-center justify-center w-full">
                <p className="text-center mb-0" style={{ fontSize: getQuestionFontSize(), lineHeight: '1.8', fontWeight: 500 }}>
                  {renderSentence(question.sentence)}
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
          <div className="fc-card fc-card-back fc-shadow h-full">
            <div className="fc-body flex flex-col justify-center items-center p-4">
              <div className="grow flex flex-col items-center justify-center w-full">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <mark style={{ background: '#ffc107', borderRadius: '0.375rem', fontWeight: 700, color: '#212529', padding: '0.5rem 0.75rem', fontSize: '2rem' }}>
                    {question.target}
                  </mark>
                  <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>=</span>
                  <p className="mb-0" style={{ fontSize: getAnswerFontSize(), lineHeight: '1.7', fontWeight: 500 }}>
                    {question.meaning}
                  </p>
                </div>
              </div>
              {question.notes && (
                <div className="alert alert-info mt-3 w-full">
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
          will-change: transform;
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

        .flashcard-back {
          transform: rotateY(180deg);
        }

        .fc-card {
          background: var(--color-card-bg, var(--bs-card-bg));
          border: 2px solid var(--color-border, var(--bs-border-color));
          border-radius: 0.5rem;
        }

        .fc-card-back {
          background: var(--color-tertiary-bg, var(--bs-tertiary-bg));
        }

        .fc-shadow {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        [data-theme=light] .fc-card {
          border: 2px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .fc-body {
          height: 100%;
          min-height: 100%;
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
        }
      `}</style>
    </div>
  );
}
