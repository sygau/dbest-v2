import { useState, useMemo } from 'react'
import Head from 'next/head'
import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import FAQSection from '../../components/FAQSection'
import JupasStyles from '../../components/jupas/styles'
import { Button } from '../../components/ui/Button'
import { LuPlus, LuX, LuTriangleAlert } from 'react-icons/lu'
import {
  calcCategoryA, calcMathHalf,
  ELECTIVE_SUBJECTS, GRADE_OPTS, CAT_A_TABLE, MATH_TABLE,
  type Grade,
} from '../../lib/ucas/tariff'

interface ElectiveRow {
  id: string
  subject: string
  grade: Grade
}

let nextId = 1

function GradeSelectRow({ value, onChange, disabled }: { value: Grade; onChange: (v: Grade) => void; disabled?: boolean }) {
  return (
    <select
      className="jpd-select jpd-grade-sel"
      value={value}
      onChange={e => onChange(e.target.value as Grade)}
      disabled={disabled}
      style={disabled ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
    >
      <option value="">Lv.</option>
      {GRADE_OPTS.filter(g => g !== '').map(g => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
  )
}

function PtsBadge({ pts, active }: { pts: number; active: boolean }) {
  return (
    <span style={{
      fontSize: 13,
      fontWeight: 700,
      color: active && pts > 0 ? '#0ea5e9' : 'var(--color-muted)',
      minWidth: 34,
      textAlign: 'right',
      flexShrink: 0,
      fontVariantNumeric: 'tabular-nums',
    }}>
      {active ? pts : '—'}
    </span>
  )
}

export default function UcasCalculator() {
  const [chinese, setChinese] = useState<Grade>('')
  const [english, setEnglish] = useState<Grade>('')
  const [mathComp, setMathComp] = useState<Grade>('')
  const [m1Enabled, setM1Enabled] = useState(false)
  const [m1Grade, setM1Grade] = useState<Grade>('')
  const [m2Enabled, setM2Enabled] = useState(false)
  const [m2Grade, setM2Grade] = useState<Grade>('')
  const [electives, setElectives] = useState<ElectiveRow[]>([
    { id: 'e1', subject: '', grade: '' },
  ])

  const bothMathExt = m1Enabled && m2Enabled

  const breakdown = useMemo(() => {
    const rows: { label: string; pts: number }[] = []
    if (chinese)  rows.push({ label: '中文', pts: calcCategoryA(chinese) })
    if (english)  rows.push({ label: '英文', pts: calcCategoryA(english) })
    if (mathComp) rows.push({ label: '數學必修', pts: calcMathHalf(mathComp) })
    if (m1Enabled && m1Grade) rows.push({ label: 'M1', pts: calcMathHalf(m1Grade) })
    if (m2Enabled && m2Grade) rows.push({ label: 'M2', pts: calcMathHalf(m2Grade) })
    electives.forEach(e => {
      if (e.subject && e.grade) {
        rows.push({ label: e.subject.split(' ')[0], pts: calcCategoryA(e.grade) })
      }
    })
    return rows
  }, [chinese, english, mathComp, m1Enabled, m1Grade, m2Enabled, m2Grade, electives])

  const total = useMemo(() => breakdown.reduce((s, r) => s + r.pts, 0), [breakdown])

  function addElective() {
    if (electives.length >= 5) return
    setElectives(prev => [...prev, { id: `e${++nextId}`, subject: '', grade: '' }])
  }

  function removeElective(id: string) {
    setElectives(prev => prev.filter(e => e.id !== id))
  }

  function updateElective(id: string, field: 'subject' | 'grade', value: string) {
    setElectives(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  const ucasFaqs = [
    { id: 'f1', question: 'DSE 5** 等於幾多 UCAS 分？', answer: 'DSE 5**（甲類科目，非數學）等於 56 UCAS Tariff Points，相當於英國 GCE A-Level A* 等級。數學必修部分 5** 計 28 分，加上延伸 M1 或 M2 的 5** 另計 28 分，合共同樣係 56 分。' },
    { id: 'f2', question: 'DSE 4 等於幾多 UCAS 分？', answer: 'DSE 4 等於 32 UCAS Tariff Points，相當於英國 GCE A-Level C 等級。3 級等於 16 分（相當於 E 級）。2 級或以下不獲分配任何 UCAS 分數。' },
    { id: 'f3', question: 'DSE 同 A-Level 點對照？', answer: 'DSE 5** = A*（56分），5* = 介乎 A* 與 A 之間（52分），5 = A（48分），4 = C（32分），3 = E（16分）。此對照由 HKEAA 及 UCAS 官方研究釐定。' },
    { id: 'f4', question: '申請英國大學需要幾多 UCAS 分？', answer: '各院校及課程要求不一。一般要求 96 至 160 分不等，熱門頂尖課程可能要求 160 分甚至以上。但達到分數只係入場門票——大學同時審視個別科目等級、個人陳述等，並非純粹積分制。' },
    { id: 'f5', question: '數學 M1/M2 點計 UCAS 分？', answer: '數學必修部分（Compulsory Part）同延伸部分（M1 或 M2）各計半個甲類科目的 Tariff Points。以 5** 為例，必修部分得 28 分，延伸部分得 28 分，合計 56 分，同其他甲類科目上限相同。注意 M1 同 M2 加埋亦只計一個完整科目，UCAS 上限係 56 分，唔係 112 分。' },
    { id: 'f6', question: 'GCSE 同 DSE 係咪一樣？', answer: 'GCSE 係英國中學課程，相當於香港中三至中五程度；DSE 係香港高中課程，更接近英國 A-Level 程度。UCAS Tariff 只計算 A-Level 及同等資歷（包括 DSE），GCSE 不納入 UCAS Tariff 計算。' },
  ]

  return (
    <>
      <PageSEO
        title="DSE UCAS 分換算器 | DSE Tariff Points 計算 2025 — dse.best"
        description="免費 DSE UCAS 分換算器。輸入 DSE 成績，即時計算 UCAS Tariff Points，對照 A-Level 等級，助你申請英國大學。附官方 HKEAA 對照表，涵蓋中文、英文、數學 M1/M2 及選修科。"
        ogTitle="DSE UCAS Tariff Points 分換算器 | 即時計算"
        ogDescription="輸入 DSE 成績，即時計算 UCAS Tariff Points。附官方 A-Level 對照表，申請英國大學必備工具。"
        ogUrl="https://dse.best/ucas"
        robots={['index', 'follow']}
        pageKey="ucas-calculator"
      />
      <Head>
        <style>{`
          .ucas-score-footer {
            padding: 16px 13px;
            border-top: 2px solid var(--color-border, #e5e7eb);
            background: var(--color-secondary-bg, #f8fafc);
          }
          @media (min-width: 768px) { .ucas-score-footer { padding: 18px 16px; } }
          .ucas-score-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .ucas-score-label {
            font-size: 16px;
            font-weight: 700;
            color: var(--color-emphasis, #1e293b);
          }
          .ucas-score-label-sub {
            font-size: 12px;
            color: var(--color-muted, #94a3b8);
            margin-top: 3px;
          }
          .ucas-score-number {
            font-size: clamp(2.8rem, 10vw, 4rem);
            font-weight: 900;
            color: #0ea5e9;
            line-height: 1;
            letter-spacing: -0.04em;
            font-variant-numeric: tabular-nums;
          }
          .ucas-score-unit {
            font-size: 15px;
            font-weight: 600;
            color: var(--color-muted, #94a3b8);
            margin-left: 4px;
          }
          .ucas-breakdown {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
          .ucas-bd-chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 3px 8px;
            border: 1px solid var(--color-border, #e5e7eb);
            border-radius: 2px;
            background: var(--color-card-bg, #fff);
            color: var(--color-emphasis, #374151);
          }
          .ucas-bd-chip-pts { font-weight: 700; color: #0ea5e9; }

          .ucas-tbl-section-hd {
            padding: 7px 13px;
            background: var(--color-secondary-bg, #f8fafc);
            border-top: 1px solid var(--color-border, #e5e7eb);
            border-bottom: 1px solid var(--color-border, #e5e7eb);
            font-size: 13px;
            font-weight: 600;
            color: var(--color-body, #374151);
          }
          @media (min-width: 768px) { .ucas-tbl-section-hd { padding: 8px 16px; font-size: 13.5px; } }

          .ucas-info-card {
            background: var(--color-card-bg, #ffffff);
            border: 1px solid var(--color-border, #e5e7eb);
            box-shadow: 0 1px 4px rgba(0,0,0,0.09);
            margin-bottom: 10px;
          }
          [data-theme="dark"] .ucas-info-card { box-shadow: 0 1px 4px rgba(0,0,0,0.25); }
          [data-theme="blue"] .ucas-info-card { box-shadow: 0 1px 4px rgba(0,0,0,0.35); }

          .ucas-info-hd {
            padding: 7px 13px;
            background: var(--color-secondary-bg, #f8fafc);
            border-bottom: 1px solid var(--color-border, #e5e7eb);
            font-size: 16px;
            font-weight: 700;
            color: var(--color-emphasis, #1e293b);
          }
          @media (min-width: 768px) { .ucas-info-hd { padding: 9px 16px; font-size: 17px; } }

          .ucas-info-body {
            padding: 12px 13px;
            font-size: 13.5px;
            color: var(--color-body, #374151);
            line-height: 1.65;
          }
          @media (min-width: 768px) { .ucas-info-body { padding: 14px 16px; } }
          .ucas-info-body li { margin-bottom: 4px; }

          .ucas-tbl-wrap { overflow-x: auto; }
          .ucas-tbl {
            width: 100%;
            border-collapse: collapse;
            font-size: 13.5px;
            color: var(--color-body, #374151);
            min-width: 340px;
          }
          .ucas-tbl th, .ucas-tbl td {
            padding: 8px 13px;
            text-align: left;
            border-bottom: 1px solid var(--color-border, #e5e7eb);
          }
          @media (min-width: 768px) { .ucas-tbl th, .ucas-tbl td { padding: 9px 16px; font-size: 14px; } }
          .ucas-tbl th {
            background: var(--color-secondary-bg, #f8fafc);
            font-size: 11px;
            letter-spacing: .6px;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--color-emphasis, #374151);
          }
          @media (min-width: 768px) { .ucas-tbl th { font-size: 12px; } }
          [data-theme="dark"] .ucas-tbl th,
          [data-theme="blue"] .ucas-tbl th { color: var(--color-muted); }
          .ucas-tbl tbody tr:last-child td { border-bottom: none; }
          .ucas-tbl .pts-cell { font-weight: 700; color: #0ea5e9; }
          .ucas-tbl .lvl-cell { font-weight: 700; color: var(--color-emphasis, #1e293b); }

          .ucas-note {
            font-size: 11.5px;
            color: var(--color-muted, #94a3b8);
            padding: 6px 13px 10px;
          }
          @media (min-width: 768px) { .ucas-note { padding: 6px 16px 12px; } }

          .ucas-m1m2-check {
            accent-color: #0ea5e9;
            width: 15px;
            height: 15px;
            cursor: pointer;
            flex-shrink: 0;
          }

          .ucas-page-title {
            color: #0ea5e9 !important;
            filter: drop-shadow(4px 4px 1px rgba(14,165,233,.2)) !important;
          }
          [data-theme="dark"] .ucas-page-title,
          [data-theme="blue"] .ucas-page-title { color: #38bdf8 !important; }

          .ucas-warn {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 9px 13px;
            background: #fffbeb;
            border-top: 1px solid #fde68a;
            font-size: 12.5px;
            color: #92400e;
            line-height: 1.5;
          }
          [data-theme="dark"] .ucas-warn,
          [data-theme="blue"] .ucas-warn { background: #3a2e10; color: #f0c060; border-color: #6d4c00; }
          @media (min-width: 768px) { .ucas-warn { padding: 10px 16px; font-size: 13px; } }
        `}</style>
      </Head>

      <JupasStyles />
      <PageBreadcrumb section="工具" text="DSE UCAS 分換算器" />

      <div className="jpd-wrap">

        <div className="jpd-page-hd">
          <h1 className="jpd-page-title ucas-page-title">DSE UCAS 分換算器</h1>
          <p className="jpd-page-sub">
            輸入你嘅 DSE 成績，即時換算成 UCAS Tariff Points，用於申請英國大學。涵蓋核心科、數學必修／延伸部分，以及所有甲類選修科。附官方 HKEAA 對照表。
          </p>
        </div>

        {/* ── Calculator card ── */}
        <div className="jpd-card jpd-search-card">

          <div className="jpd-tbl-hd">
            <span>核心科目</span>
            <span className="jpd-tbl-hd-en">Core Subjects</span>
          </div>

          <div className="jpd-subj-row">
            <div className="jpd-subj-name">
              <span className="jpd-subj-name-ch">中國語文</span>
              <span className="jpd-subj-name-en">Chinese Language</span>
            </div>
            <GradeSelectRow value={chinese} onChange={setChinese} />
            <PtsBadge pts={calcCategoryA(chinese)} active={!!chinese} />
          </div>

          <div className="jpd-subj-row">
            <div className="jpd-subj-name">
              <span className="jpd-subj-name-ch">英國語文</span>
              <span className="jpd-subj-name-en">English Language</span>
            </div>
            <GradeSelectRow value={english} onChange={setEnglish} />
            <PtsBadge pts={calcCategoryA(english)} active={!!english} />
          </div>

          <div className="jpd-subj-row">
            <div className="jpd-subj-name">
              <span className="jpd-subj-name-ch">數學 必修部分</span>
              <span className="jpd-subj-name-en">Mathematics (Compulsory Part)</span>
            </div>
            <GradeSelectRow value={mathComp} onChange={setMathComp} />
            <PtsBadge pts={calcMathHalf(mathComp)} active={!!mathComp} />
          </div>

          <div className="jpd-tbl-hd">
            <span>數學延伸</span>
            <span className="jpd-tbl-hd-en">Extended Part (Optional)</span>
          </div>

          <div className="jpd-subj-row">
            <input
              type="checkbox"
              className="ucas-m1m2-check"
              checked={m1Enabled}
              onChange={e => { setM1Enabled(e.target.checked); if (!e.target.checked) setM1Grade('') }}
              id="m1-toggle"
            />
            <label htmlFor="m1-toggle" className="jpd-subj-name" style={{ cursor: 'pointer' }}>
              <span className="jpd-subj-name-ch">延伸單元一 (M1)</span>
              <span className="jpd-subj-name-en">Calculus &amp; Statistics</span>
            </label>
            <GradeSelectRow value={m1Grade} onChange={v => setM1Grade(v)} disabled={!m1Enabled} />
            <PtsBadge pts={calcMathHalf(m1Grade)} active={m1Enabled && !!m1Grade} />
          </div>

          <div className="jpd-subj-row">
            <input
              type="checkbox"
              className="ucas-m1m2-check"
              checked={m2Enabled}
              onChange={e => { setM2Enabled(e.target.checked); if (!e.target.checked) setM2Grade('') }}
              id="m2-toggle"
            />
            <label htmlFor="m2-toggle" className="jpd-subj-name" style={{ cursor: 'pointer' }}>
              <span className="jpd-subj-name-ch">延伸單元二 (M2)</span>
              <span className="jpd-subj-name-en">Algebra &amp; Calculus</span>
            </label>
            <GradeSelectRow value={m2Grade} onChange={v => setM2Grade(v)} disabled={!m2Enabled} />
            <PtsBadge pts={calcMathHalf(m2Grade)} active={m2Enabled && !!m2Grade} />
          </div>

          {bothMathExt && (
            <div className="ucas-warn">
              <LuTriangleAlert size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>M1 同 M2 合計只算一個完整科目（上限 56 分）。UCAS 唔會雙重計算兩個延伸單元，個別大學會自行決定點樣處理。</span>
            </div>
          )}

          <div className="jpd-tbl-hd">
            <span>選修科目</span>
            <span className="jpd-tbl-hd-en">Elective Subjects</span>
          </div>

          {electives.map(e => {
            const takenElsewhere = new Set(electives.filter(x => x.id !== e.id).map(x => x.subject).filter(Boolean))
            return (
              <div key={e.id} className="jpd-subj-row">
                <select
                  className="jpd-select jpd-subject-sel"
                  value={e.subject}
                  onChange={ev => updateElective(e.id, 'subject', ev.target.value)}
                >
                  <option value="">選擇科目</option>
                  {ELECTIVE_SUBJECTS.filter(s => !takenElsewhere.has(s)).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <GradeSelectRow value={e.grade} onChange={v => updateElective(e.id, 'grade', v)} />
                <PtsBadge pts={calcCategoryA(e.grade)} active={!!e.subject && !!e.grade} />
                <Button
                  variant="secondary"
                  size="sm"
                  style={{ paddingLeft: '0.3rem', paddingRight: '0.3rem', flexShrink: 0 }}
                  onClick={() => removeElective(e.id)}
                  aria-label="移除科目"
                >
                  <LuX size={14} strokeWidth={4} />
                </Button>
              </div>
            )
          })}

          {electives.length < 5 && (
            <div className="jpd-add-wrap">
              <Button variant="secondary" size="sm" onClick={addElective} style={{ width: '100%', justifyContent: 'center' }}>
                <LuPlus size={15} strokeWidth={4} style={{ transform: 'translateY(0.5px)' }} /> 加入選修科目
              </Button>
            </div>
          )}

          <div className="ucas-score-footer">
            <div className="ucas-score-row">
              <div>
                <div className="ucas-score-label">UCAS Tariff Points 總分</div>
                <div className="ucas-score-label-sub">即時計算，無需提交</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span className="ucas-score-number">{total}</span>
                <span className="ucas-score-unit">分</span>
              </div>
            </div>
            {breakdown.length > 0 && (
              <div className="ucas-breakdown">
                {breakdown.map((r, i) => (
                  <span key={i} className="ucas-bd-chip">
                    {r.label} <span className="ucas-bd-chip-pts">{r.pts}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Important notes ── */}
        <div className="ucas-info-card">
          <div className="ucas-info-hd">使用須知</div>
          <div className="ucas-info-body">
            <ul style={{ paddingLeft: '1.1rem', marginBottom: 0 }}>
              <li><strong>只有甲類科目計分</strong> — 應用學習（ApL）、其他語言科等乙丙類科目不納入 UCAS Tariff</li>
              <li><strong>公民與社會發展（CSD）不計分</strong> — 以達標／不達標評級，無 Tariff Points</li>
              <li><strong>M1 + M2 合計只算一個科目</strong> — UCAS 上限係 56 分，唔係 112 分</li>
              <li><strong>達到分數唔等於獲錄取</strong> — 大學同時審視個別科目等級、個人陳述、面試等，並非純粹積分制</li>
              <li><strong>部分大學設 Best N 限制</strong> — 只計最佳 5 科或 3 科，唔係你呈交嘅所有科目；以目標院校官方要求為準</li>
            </ul>
          </div>
        </div>

        {/* ── Guide card ── */}
        <div className="ucas-info-card">
          <div className="ucas-info-hd">UCAS Tariff Points 係咩？</div>
          <div className="ucas-info-body">
            <p style={{ marginBottom: '0.5rem' }}>UCAS Tariff 係英國大學及院校招生事務處（UCAS）用嚟量化不同國家及地區資歷嘅統一積分制度，方便英國大學比較來自全球不同地方嘅申請人。</p>
            <ul style={{ paddingLeft: '1.1rem', marginBottom: 0 }}>
              <li>香港中學文憑（HKDSE）甲類科目已納入 UCAS 分數對照制度</li>
              <li>DSE 3 級或以上才獲分配 Tariff Points；2 級或以下為 0 分</li>
              <li>數學必修部分同 M1/M2 各計半個科目分數，合計上限與全科相同（56分）</li>
              <li>各大學自行決定接受哪些 DSE 科目及成績要求，以目標院校官方為準</li>
            </ul>
          </div>
        </div>

        {/* ── Reference tables ── */}
        <div className="ucas-info-card">
          <div className="ucas-info-hd">DSE UCAS 分數對照表（官方）</div>

          <div className="ucas-tbl-section-hd">甲類科目（中文、英文、選修科 — 數學除外）</div>
          <div className="ucas-tbl-wrap">
            <table className="ucas-tbl">
              <thead>
                <tr>
                  <th>DSE 等級</th>
                  <th>UCAS 分數</th>
                  <th>相當 GCE A-Level</th>
                </tr>
              </thead>
              <tbody>
                {CAT_A_TABLE.map(row => (
                  <tr key={row.level}>
                    <td className="lvl-cell">{row.level}</td>
                    <td className="pts-cell">{row.ucas > 0 ? row.ucas : '0（不計分）'}</td>
                    <td>{row.aLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ucas-tbl-section-hd">數學科（必修 + M1/M2 各計半個科目）</div>
          <div className="ucas-tbl-wrap">
            <table className="ucas-tbl">
              <thead>
                <tr>
                  <th>DSE 等級</th>
                  <th>必修 Compulsory</th>
                  <th>延伸 M1/M2</th>
                  <th>合計上限</th>
                </tr>
              </thead>
              <tbody>
                {MATH_TABLE.map(row => (
                  <tr key={row.level}>
                    <td className="lvl-cell">{row.level}</td>
                    <td className="pts-cell">{row.compulsory}</td>
                    <td className="pts-cell">{row.extended}</td>
                    <td style={{ fontWeight: 600 }}>{row.combined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="ucas-note">資料來源：香港考試及評核局（HKEAA）及 UCAS 官方對照表。如有更新請以官方公佈為準。</p>
        </div>

        <FAQSection faqs={ucasFaqs} />
      </div>
    </>
  )
}
