import type { ChGraderResult, EnGraderResult, ErrorExample, ParagraphFeedback, VocabUpgrade } from '../../lib/grader/types';

type Tier = 'good' | 'ok' | 'bad';

function tierFromScore(score: number, max: number): Tier {
  const pct = score / max;
  if (pct >= 0.75) return 'good';
  if (pct >= 0.5) return 'ok';
  return 'bad';
}

const CH_BAND_TIER: Record<string, Tier> = {
  '上上品': 'good', '上品': 'good', '上下品': 'good',
  '中上品': 'ok', '中品': 'ok',
  '中下品': 'bad', '下上品': 'bad', '下品': 'bad',
};

const EN_BAND_TIER: Record<string, Tier> = {
  'Excellent': 'good', 'Very Good': 'good',
  'Good': 'ok', 'Adequate': 'ok',
  'Marginal': 'bad', 'Poor': 'bad', 'Very Poor': 'bad',
};

const RATING_LABEL_EN: Record<string, string> = { strong: 'Strong', ok: 'OK', weak: 'Weak' };
const RATING_LABEL_CN: Record<string, string> = { strong: '佳', ok: '中', weak: '待改' };

function bandTier(label: string | undefined, score: number, max: number): Tier {
  if (!label) return tierFromScore(score, max);
  return CH_BAND_TIER[label] ?? EN_BAND_TIER[label] ?? tierFromScore(score, max);
}

function DomainRow(props: {
  name: string;
  score: number;
  max: number;
  band?: string;
  strengths?: string[];
  improvements?: string[];
  errors?: ErrorExample[];
  vocab?: VocabUpgrade[];
  extra?: React.ReactNode;
}) {
  const { name, score, max, band, strengths, improvements, errors, vocab, extra } = props;
  const tier = bandTier(band, score, max);
  const pct = Math.max(0, Math.min(100, (score / max) * 100));

  return (
    <section className="gd-row">
      <header className="gd-row-hd">
        <h3 className="gd-row-name">{name}</h3>
        <div className={`gd-row-score gd-tier-${tier}`}>
          <span className="gd-row-num">{score}</span>
          <span className="gd-row-of">/{max}</span>
        </div>
      </header>
      <div className="gd-row-meta">
        <div className={`gd-bar gd-tier-${tier}`}>
          <div className="gd-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        {band && <span className={`gd-row-band gd-tier-${tier}`}>{band}</span>}
      </div>

      <div className="gd-row-body">
        {strengths && strengths.length > 0 && (
          <div>
            <div className="gd-sub-lbl">優點 Strengths</div>
            <ul className="gd-clean-list gd-list-good">{strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}
        {improvements && improvements.length > 0 && (
          <div>
            <div className="gd-sub-lbl">改善建議 Improvements</div>
            <ul className="gd-clean-list gd-list-bad">{improvements.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}
        {errors && errors.length > 0 && (
          <div>
            <div className="gd-sub-lbl">具體錯誤 Errors</div>
            <div className="gd-err-list">
              {errors.map((e, i) => (
                <div key={i} className="gd-err">
                  <div className="gd-err-line">
                    <span className="gd-err-orig">{e.original}</span>
                    <span className="gd-err-arrow">→</span>
                    <span className="gd-err-fix">{e.corrected}</span>
                    <span className="gd-err-type">{e.type}</span>
                  </div>
                  {e.explanation && <div className="gd-err-expl">{e.explanation}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vocab && vocab.length > 0 && (
          <div>
            <div className="gd-sub-lbl">詞彙升級 Vocabulary upgrades</div>
            <ul className="gd-clean-list">
              {vocab.map((v, i) => (
                <li key={i}>
                  <span className="gd-vocab-weak">{v.weak}</span>{' '}
                  <span className="gd-vocab-arrow">→</span>{' '}
                  <span className="gd-vocab-strong">{v.stronger.join(', ')}</span>
                  {v.context && <span className="gd-vocab-ctx"> · {v.context}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {extra}
      </div>
    </section>
  );
}

function ParagraphList({ items, lang }: { items: ParagraphFeedback[]; lang: 'cn' | 'en' }) {
  if (!items?.length) return null;
  const labels = lang === 'cn' ? RATING_LABEL_CN : RATING_LABEL_EN;
  return (
    <section className="gd-block-block">
      <h3 className="gd-block-h">{lang === 'cn' ? '段落點評 Paragraph feedback' : '段落點評 Paragraph feedback'}</h3>
      <ol className="gd-para-list">
        {items.map((p, i) => (
          <li key={i} className="gd-para">
            <span className="gd-para-idx">§{p.index}</span>
            <div className="gd-para-content">
              <span className="gd-para-role">{p.role}</span>
              <span className={`gd-para-rating gd-rating-${p.rating}`}>{labels[p.rating] ?? p.rating}</span>
              <p className="gd-para-body">{p.comment}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function TipList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="gd-block-block">
      <h3 className="gd-block-h">升呢建議 Level-up</h3>
      <ol className="gd-tip-list">
        {items.map((t, i) => <li key={i}><span className="gd-tip-n">{i + 1}</span><span>{t}</span></li>)}
      </ol>
    </section>
  );
}

export default function ResultCard({ result }: { result: EnGraderResult | ChGraderResult }) {
  const isEn = result.subject === 'english';
  const totalTier = tierFromScore(result.total_score, result.total_max);
  const grade_band = !isEn ? (result as ChGraderResult).grade_band : undefined;
  const ratingLang: 'cn' | 'en' = isEn ? (((result as EnGraderResult).response_lang ?? 'zh') === 'zh' ? 'cn' : 'en') : 'cn';

  return (
    <article className="gd-result">
      <h2 className="gd-report-h">批改報告 AI Grading Report</h2>

      <header className="gd-summary">
        <div className="gd-summary-cell">
          <span className="gd-summary-lbl">總分 Total Score</span>
          <div className={`gd-summary-score gd-tier-${totalTier}`}>
            <span className="gd-summary-num">{result.total_score}</span>
            <span className="gd-summary-of">/ {result.total_max}</span>
          </div>
        </div>
        <div className="gd-summary-sep" aria-hidden />
        <div className="gd-summary-cell">
          <span className="gd-summary-lbl">預估 DSE Level</span>
          <div className="gd-summary-score">
            <span className="gd-summary-lvl">{result.dse_level}</span>
          </div>
          {grade_band && <span className={`gd-summary-band gd-tier-${bandTier(grade_band, result.total_score, result.total_max)}`}>{grade_band}</span>}
        </div>
      </header>

      <div className="gd-rows">
        {isEn ? (
          <>
            <DomainRow
              name="內容 Content"
              score={(result as EnGraderResult).scores.content.score}
              max={7}
              band={(result as EnGraderResult).scores.content.band_label}
              strengths={(result as EnGraderResult).scores.content.strengths}
              improvements={(result as EnGraderResult).scores.content.improvements}
            />
            <DomainRow
              name="語言 Language"
              score={(result as EnGraderResult).scores.language.score}
              max={7}
              band={(result as EnGraderResult).scores.language.band_label}
              strengths={(result as EnGraderResult).scores.language.strengths}
              improvements={(result as EnGraderResult).scores.language.improvements}
              errors={(result as EnGraderResult).scores.language.error_examples}
              vocab={(result as EnGraderResult).scores.language.vocabulary_suggestions}
            />
            <DomainRow
              name="結構 Organisation"
              score={(result as EnGraderResult).scores.organisation.score}
              max={7}
              band={(result as EnGraderResult).scores.organisation.band_label}
              strengths={(result as EnGraderResult).scores.organisation.strengths}
              improvements={(result as EnGraderResult).scores.organisation.improvements}
            />
          </>
        ) : (
          <>
            <DomainRow
              name="內容 Content"
              score={(result as ChGraderResult).scores['內容'].score}
              max={40}
              band={(result as ChGraderResult).scores['內容'].band_label}
              strengths={(result as ChGraderResult).scores['內容'].strengths}
              improvements={(result as ChGraderResult).scores['內容'].improvements}
            />
            <DomainRow
              name="表達 Expression"
              score={(result as ChGraderResult).scores['表達'].score}
              max={30}
              band={(result as ChGraderResult).scores['表達'].band_label}
              strengths={(result as ChGraderResult).scores['表達'].strengths}
              improvements={(result as ChGraderResult).scores['表達'].improvements}
              errors={(result as ChGraderResult).scores['表達'].error_examples}
              vocab={(result as ChGraderResult).scores['表達'].vocabulary_suggestions}
              extra={
                (result as ChGraderResult).scores['表達']['修辭運用']?.length ? (
                  <div>
                    <div className="gd-sub-lbl">修辭運用 Rhetoric</div>
                    <ul className="gd-clean-list">
                      {(result as ChGraderResult).scores['表達']['修辭運用']!.map((r, i) => (
                        <li key={i}>
                          <strong>{r.device}</strong> <span className={r.effective ? 'gd-rhet-ok' : 'gd-rhet-weak'}>{r.effective ? '有效' : '不夠精準'}</span>：「{r.example}」
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              }
            />
            <DomainRow
              name="結構 Organisation"
              score={(result as ChGraderResult).scores['結構'].score}
              max={20}
              band={(result as ChGraderResult).scores['結構'].band_label}
              strengths={(result as ChGraderResult).scores['結構'].strengths}
              improvements={(result as ChGraderResult).scores['結構'].improvements}
            />
            <DomainRow
              name="標點 Punctuation"
              score={(result as ChGraderResult).scores['標點'].score}
              max={10}
              band={(result as ChGraderResult).scores['標點'].band_label}
              strengths={(result as ChGraderResult).scores['標點'].strengths}
              improvements={(result as ChGraderResult).scores['標點'].improvements}
            />
            <DomainRow
              name="錯別字 Wrong characters"
              score={(result as ChGraderResult).scores['錯別字'].score}
              max={3}
              band={`${(result as ChGraderResult).scores['錯別字'].count} 個錯字`}
              extra={
                (result as ChGraderResult).scores['錯別字'].examples?.length ? (
                  <div>
                    <div className="gd-sub-lbl">錯字列表</div>
                    <ul className="gd-clean-list">
                      {(result as ChGraderResult).scores['錯別字'].examples.map((e, i) => (
                        <li key={i}>
                          <span className="gd-err-orig">{e.wrong}</span>{' '}
                          <span className="gd-err-arrow">→</span>{' '}
                          <span className="gd-err-fix">{e.correct}</span>
                          {e.context && <span className="gd-vocab-ctx"> · {e.context}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              }
            />
          </>
        )}
      </div>

      <TipList items={result.level_up_tips} />
      <ParagraphList items={result.paragraph_feedback} lang={ratingLang} />

      <section className="gd-block-block">
        <h3 className="gd-block-h">總評 Overall</h3>
        <p className="gd-overall-prose">{result.overall_comment}</p>
      </section>

      <p className="gd-disclaimer">{result.disclaimer}</p>
    </article>
  );
}
