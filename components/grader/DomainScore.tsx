import type { ErrorExample, VocabUpgrade } from '../../lib/grader/types';

interface Props {
  name: string;
  score: number;
  max: number;
  bandLabel?: string;
  strengths?: string[];
  improvements?: string[];
  errors?: ErrorExample[];
  vocab?: VocabUpgrade[];
  extra?: React.ReactNode;
  span2?: boolean;
}

export default function DomainScore({ name, score, max, bandLabel, strengths, improvements, errors, vocab, extra, span2 }: Props) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  return (
    <div className="gd-domain" style={span2 ? { gridColumn: 'span 2' } : undefined}>
      <div className="gd-domain-hd">
        <div>
          <div className="gd-domain-name">{name}</div>
          {bandLabel && <span className="gd-band" style={{ marginTop: 4 }}>{bandLabel}</span>}
        </div>
        <div className="gd-domain-score">{score}<small>/{max}</small></div>
      </div>
      <div className="gd-bar"><div className="gd-bar-fill" style={{ width: `${pct}%` }} /></div>

      {strengths && strengths.length > 0 && (
        <div className="gd-section">
          <div className="gd-section-lbl">優點 Strengths</div>
          <ul className="gd-list strengths">{strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}

      {improvements && improvements.length > 0 && (
        <div className="gd-section">
          <div className="gd-section-lbl">改善建議 Improvements</div>
          <ul className="gd-list weak">{improvements.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}

      {errors && errors.length > 0 && (
        <div className="gd-section">
          <div className="gd-section-lbl">具體錯誤 Errors</div>
          <div className="gd-errors">
            {errors.map((e, i) => (
              <div key={i} className="gd-err-row">
                <div className="gd-err-type">{e.type}</div>
                <div>
                  <span className="gd-err-orig">{e.original}</span>
                  <span className="gd-err-arrow">→</span>
                  <span className="gd-err-fix">{e.corrected}</span>
                </div>
                {e.explanation && <div className="gd-err-expl">{e.explanation}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {vocab && vocab.length > 0 && (
        <div className="gd-section">
          <div className="gd-section-lbl">詞彙升級 Vocab Upgrades</div>
          <div className="gd-vocab">
            {vocab.map((v, i) => (
              <div key={i} className="gd-vocab-row">
                <span className="gd-vocab-weak">{v.weak}</span>
                <span className="gd-vocab-arrow">→</span>
                <span className="gd-vocab-strong">{v.stronger.join(' / ')}</span>
                {v.context && <span style={{ fontSize: 11, color: 'var(--color-muted)' }}>· {v.context}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {extra}
    </div>
  );
}
