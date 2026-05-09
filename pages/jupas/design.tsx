import Head from 'next/head'
import { useState } from 'react'
import PageSEO from '../../components/PageSEO'
import { Button } from '../../components/ui/Button'
import { LuX, LuSearch, LuPlus } from 'react-icons/lu'

// ── Types ──────────────────────────────────────────────────────────────────

type ProbLevel = 'safe' | 'comp' | 'bord' | 'low' | 'unmet'
type UniKey = 'HKU' | 'CUHK' | 'PolyU' | string

interface YearData {
  year: number
  lq: number
  median: number
  uq: number
}

interface ProgramInfo {
  duration?: string
  quota?: number
  faculty?: string
  facultyEn?: string
  category?: string
  categoryEn?: string
  dualDegree?: 'yes' | 'no' | 'maybe'
  interview?: 'yes' | 'no' | 'maybe'
  interviewType?: string
  formula?: string
}

interface JupasCardProps {
  code: string
  uni: UniKey
  nameCh: string
  nameEn: string
  lq: number
  median: number
  uq: number
  prob: ProbLevel
  isGod?: boolean
  isPopular?: boolean
  defaultOpen?: boolean
  years?: YearData[]
  info?: ProgramInfo
}

// ── Prob config ────────────────────────────────────────────────────────────

const PROB_CONFIG: Record<ProbLevel, { label: string; en: string; className: string; medianColor: string }> = {
  safe:  { label: '穩入',  en: 'Safe',        className: 'jpd-p-safe',  medianColor: '#00703c' },
  comp:  { label: '博得過', en: 'Competitive', className: 'jpd-p-comp',  medianColor: '#005eb8' },
  bord:  { label: '邊緣',  en: 'Borderline',  className: 'jpd-p-bord',  medianColor: '#8a6200' },
  low:   { label: '機率低', en: 'Low Chance',  className: 'jpd-p-low',   medianColor: '#c24100' },
  unmet: { label: '唔達標', en: 'Unmet',       className: 'jpd-p-unmet', medianColor: '#d5281b' },
}

// ── Uni logo colors ────────────────────────────────────────────────────────

const UNI_COLORS: Record<string, string> = {
  HKU:   '#003B70',
  CUHK:  '#6e1c3a',
  PolyU: '#9d1e2f',
}

// ── Pill component ──────────────────────────────────────────────────────────

// ── Search constants ────────────────────────────────────────────────────────

const GRADES = ['U', '1', '2', '3', '4', '5', '5*', '5**']

const ELECTIVE_SUBJECTS = [
  '生物', '化學', '物理', '經濟', '地理', '歷史', '中國歷史',
  '中國文學', '英國文學', '視覺藝術', '音樂', '體育',
  '資訊及通訊科技', '旅遊與款待', '企業、會計及財務概論',
  '設計與應用科技', '健康管理與社會關懷', '倫理與宗教', '科技與生活',
  '數學延伸部分（微積分與統計）', '數學延伸部分（代數與微積分）',
]

interface ElectiveSlot { id: string; subject: string; grade: string }

function GradeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className="jpd-select jpd-grade-sel" value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Lv.</option>
      {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  )
}

function SearchPanel() {
  const [chinese, setChinese] = useState('')
  const [english, setEnglish] = useState('')
  const [maths, setMaths] = useState('')
  const [electives, setElectives] = useState<ElectiveSlot[]>([
    { id: '1', subject: '', grade: '' },
    { id: '2', subject: '', grade: '' },
  ])

  const addElective = () =>
    setElectives(prev => [...prev, { id: Date.now().toString(), subject: '', grade: '' }])
  const removeElective = (id: string) =>
    setElectives(prev => prev.filter(e => e.id !== id))
  const updateElective = (id: string, field: 'subject' | 'grade', value: string) =>
    setElectives(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))

  const coreRows = [
    { key: 'chinese', ch: '中國語文', en: 'Chinese Language',  value: chinese, set: setChinese },
    { key: 'english', ch: '英國語文', en: 'English Language',  value: english, set: setEnglish },
    { key: 'maths',   ch: '數學',     en: 'Mathematics',       value: maths,   set: setMaths },
  ]

  return (
    <div className="jpd-card jpd-search-card">
      {/* Core subjects */}
      <div className="jpd-tbl-hd">
        <span>核心科目</span>
        <span className="jpd-tbl-hd-en">Core Subjects</span>
      </div>
      <div>
        {coreRows.map(({ key, ch, en, value, set }) => (
          <div key={key} className="jpd-subj-row">
            <div className="jpd-subj-name">
              <span className="jpd-subj-name-ch">{ch}</span>
              <span className="jpd-subj-name-en">{en}</span>
            </div>
            <GradeSelect value={value} onChange={set} />
          </div>
        ))}
      </div>

      {/* Elective subjects */}
      <div className="jpd-tbl-hd">
        <span>選修科目</span>
        <span className="jpd-tbl-hd-en">Elective Subjects</span>
      </div>
      <div>
        {electives.map(e => (
          <div key={e.id} className="jpd-subj-row">
            <select
              className="jpd-select jpd-subject-sel"
              value={e.subject}
              onChange={ev => updateElective(e.id, 'subject', ev.target.value)}
            >
              <option value="">選擇科目</option>
              {ELECTIVE_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <GradeSelect value={e.grade} onChange={v => updateElective(e.id, 'grade', v)} />
            <Button variant="secondary" size="sm" style={{paddingLeft: '0.3rem',
  paddingRight: '0.3rem'}} onClick={() => removeElective(e.id)} aria-label="移除科目">
              <LuX size={14} strokeWidth={4} />
            </Button>
          </div>
        ))}
        <div className="jpd-add-wrap">
          <Button variant="secondary" size="sm" onClick={addElective} style={{ width: '100%', justifyContent: 'center' }}>
            <LuPlus size={15} strokeWidth={4} style={{transform: `translateY(0.5px)` }} /> 加入選修科目
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="jpd-search-foot">
        <Button variant="default" size="md" style={{ width: '100%', justifyContent: 'center' }}>
          <LuSearch size={14} strokeWidth={3} style={{ marginLeft: '0.2rem', marginTop: '0.1rem' }}   /> 搜尋課程
        </Button>
      </div>
    </div>
  )
}

// ── Pill component ──────────────────────────────────────────────────────────

function Pill({ value }: { value: 'yes' | 'no' | 'maybe' }) {
  const map = {
    yes:   { label: '是',     cls: 'jpd-pill-y' },
    no:    { label: '否',     cls: 'jpd-pill-n' },
    maybe: { label: '可能需要', cls: 'jpd-pill-maybe' },
  }
  const { label, cls } = map[value]
  return <span className={`jpd-pill ${cls}`}>{label}</span>
}

// ── InfoSection ─────────────────────────────────────────────────────────────

function InfoSection({ info, prob }: { info: ProgramInfo; prob: ProbLevel }) {
  return (
    <div className="jpd-info-sec">
      <div className="jpd-info-grid">
        {info.duration && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">修業年期</div>
            <div className="jpd-i-val">{info.duration}</div>
          </div>
        )}
        {info.quota !== undefined && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">收生名額</div>
            <div className="jpd-i-val">{info.quota}</div>
          </div>
        )}
        {info.faculty && (
          <div className="jpd-info-cell jpd-full">
            <div className="jpd-i-lbl">學院</div>
            <div className="jpd-i-val">
              {info.faculty}
              {info.facultyEn && <div className="jpd-i-sub">{info.facultyEn}</div>}
            </div>
          </div>
        )}
        {info.category && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">類別</div>
            <div className="jpd-i-val">
              {info.category}
              {info.categoryEn && <div className="jpd-i-sub">{info.categoryEn}</div>}
            </div>
          </div>
        )}
        {info.dualDegree !== undefined && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">雙學位課程</div>
            <div className="jpd-i-val"><Pill value={info.dualDegree} /></div>
          </div>
        )}
        {info.interview !== undefined && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">面試要求</div>
            <div className="jpd-i-val"><Pill value={info.interview} /></div>
          </div>
        )}
        {info.interviewType && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">面試類型</div>
            <div className="jpd-i-val jpd-i-val-lt">{info.interviewType}</div>
          </div>
        )}
        {info.formula && (
          <div className="jpd-info-cell jpd-full">
            <div className="jpd-i-lbl">計分公式</div>
            <div className="jpd-formula-box">{info.formula}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── JupasCard ───────────────────────────────────────────────────────────────

function JupasCard({
  code, uni, nameCh, nameEn,
  lq, median, uq, prob,
  isGod, isPopular,
  defaultOpen = false,
  years, info,
}: JupasCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const cfg = PROB_CONFIG[prob]
  const logoColor = UNI_COLORS[uni] ?? '#555'
  const hasDetail = !!(years || info)
  const delta = years && years.length >= 2 ? years[0].median - years[1].median : null

  return (
    <div className="jpd-card">
      {/* Header */}
      <div className="jpd-hd">
        <div className="jpd-hd-body">
          <div className="jpd-logo" style={{ background: logoColor }}>{uni}</div>
          <div className="jpd-names">
            <div className="jpd-codes-row">
              <span className="jpd-code-id">{code}</span>
              <span style={{ opacity: .35, fontSize: 10 }}>|</span>
              <span>{uni}</span>
            </div>
            <div className="jpd-name-ch">{nameCh}</div>
            <div className="jpd-name-en">{nameEn}</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="jpd-stats">
        <div className="jpd-stats-nums">
          <div className="jpd-stat">
            <div className="jpd-s-lbl">LQ</div>
            <div className="jpd-s-val">{lq}</div>
          </div>
          <div className="jpd-stat">
            <div className="jpd-s-lbl">Median</div>
            <div className="jpd-s-val jpd-s-md" style={{ color: cfg.medianColor }}>{median}</div>
          </div>
          <div className="jpd-stat">
            <div className="jpd-s-lbl">UQ</div>
            <div className="jpd-s-val">{uq}</div>
          </div>
        </div>
        <div className="jpd-badge-col">
          <div className="jpd-b-icons">
            {isGod && <i className="ti ti-trophy jpd-ico-god" title="神科" />}
            {isPopular && <i className="ti ti-flame jpd-ico-pop" title="熱門" />}
          </div>
          <div className={`jpd-prob ${cfg.className}`}>{cfg.label}</div>
          <div className="jpd-prob-en">{cfg.en}</div>
        </div>
      </div>

      {delta !== null && (
        <div className="jpd-stats-delta" style={{ color: delta > 0 ? '#00703c' : delta < 0 ? '#d5281b' : 'var(--color-muted)' }}>
          {delta > 0 ? '▲' : delta < 0 ? '▼' : '–'} {delta !== 0 ? `${Math.abs(delta)} pts` : '持平'} vs 去年中位數
        </div>
      )}

      {/* Toggle */}
      {hasDetail && (
        <button className="jpd-tog" onClick={() => setOpen(v => !v)}>
          <span>{open ? '收起詳情' : '查看詳情 / 歷年數據'}</span>
          <span style={{ fontSize: 11, lineHeight: 1 }} aria-hidden>{open ? '▲' : '▼'}</span>
        </button>
      )}

      {/* Expanded body */}
      {open && hasDetail && (
        <div className="jpd-body">
          {years && (
            <table className="jpd-yr-tbl">
              <thead>
                <tr>
                  <th>年份</th><th>LQ</th><th>中位數</th><th>UQ</th>
                </tr>
              </thead>
              <tbody>
                {years.map(y => (
                  <tr key={y.year}>
                    <td>{y.year}</td>
                    <td>{y.lq}</td>
                    <td className="jpd-mc">{y.median}</td>
                    <td>{y.uq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {info && <InfoSection info={info} prob={prob} />}
        </div>
      )}
    </div>
  )
}

// ── Legend ──────────────────────────────────────────────────────────────────

function ProbLegend() {
  return (
    <div className="jpd-legend">
      <p className="jpd-legend-title">評估等級</p>
      <div className="jpd-legend-row">
        {(Object.entries(PROB_CONFIG) as [ProbLevel, typeof PROB_CONFIG[ProbLevel]][]).map(([k, v]) => (
          <span key={k} className={`jpd-prob ${v.className}`}>{v.label}</span>
        ))}
      </div>
    </div>
  )
}

// ── Demo data ────────────────────────────────────────────────────────────────

const DEMO_CARDS: JupasCardProps[] = [
  {
    code: 'JS4411', uni: 'HKU',
    nameCh: '醫學士（內外全科）',
    nameEn: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
    lq: 27, median: 28, uq: 29,
    prob: 'low', isGod: true, isPopular: true,
  },
  {
    code: 'JS1234', uni: 'CUHK',
    nameCh: '工商管理學士（環球商業）',
    nameEn: 'Bachelor of Business Administration (Global Business)',
    lq: 22, median: 24, uq: 26,
    prob: 'comp', isPopular: true,
    defaultOpen: true,
    years: [
      { year: 2024, lq: 22, median: 24, uq: 26 },
      { year: 2023, lq: 21, median: 23, uq: 25 },
      { year: 2022, lq: 20, median: 22, uq: 24 },
      { year: 2021, lq: 19, median: 21, uq: 23 },
    ],
    info: {
      duration: '4 年', quota: 120,
      faculty: '工商管理學院', facultyEn: 'Faculty of Business Administration',
      category: '商業及金融', categoryEn: 'Business & Finance',
      dualDegree: 'no', interview: 'maybe', interviewType: 'May require',
      formula: '中文×2 + 英文×2 + 數學×2 + 最佳3科×1',
    },
  },
  {
    code: 'JS3322', uni: 'PolyU',
    nameCh: '護理學（普通科）學士',
    nameEn: 'Bachelor of Science (Honours) in Nursing',
    lq: 14, median: 16, uq: 18,
    prob: 'safe',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function JupasDesign() {
  return (
    <>
      <PageSEO
        title="JUPAS 計算結果 — 設計稿"
        description="JUPAS calculator result card components — design iteration page"
        robots={['noindex', 'nofollow']}
      />

      <Head>
        <style>{`
          /* ── JUPAS design tokens ── */
          .jpd-wrap {
            max-width: 430px;
            margin: 0 auto;
            padding: 14px;
          }

          .jpd-result-label {
            font-size: 14px;
            color: var(--color-muted);
            margin-bottom: 10px;
            letter-spacing: .3px;
          }

          /* Card */
          .jpd-card {
            background: var(--color-card-bg);
            border: 1px solid var(--color-border);
            box-shadow: 0 1px 4px rgba(0,0,0,0.09);
            margin-bottom: 10px;
          }
          [data-theme="dark"] .jpd-card { box-shadow: 0 1px 4px rgba(0,0,0,0.25); }
          [data-theme="blue"] .jpd-card { box-shadow: 0 1px 4px rgba(0,0,0,0.35); }

          /* Header */
          .jpd-hd { padding: 11px 13px 10px; }
          .jpd-codes-row {
            font-size: 11px; font-weight: 500;
            color: var(--color-muted);
            letter-spacing: .3px; margin-bottom: 5px;
            text-align: left;
            display: flex; align-items: center; gap: 4px;
          }
          .jpd-code-id {
            font-size: 11.5px; font-weight: 700;
            color: var(--color-heading); letter-spacing: .4px;
          }
          .jpd-hd-body { display: flex; align-items: flex-start; gap: 10px; }
          .jpd-logo {
            width: 44px; height: 44px; flex-shrink: 0;
            border: 1px solid var(--color-border);
            display: flex; align-items: center; justify-content: center;
            border-radius: 2px;
            font-size: 10px; font-weight: 800; letter-spacing: .5px; color: #fff;
          }
          .jpd-names { flex: 1; min-width: 0; }
          .jpd-name-ch {
            font-size: 15.5px; font-weight: 700;
            color: var(--color-emphasis);
            line-height: 1.35; word-break: break-all;
          }
          .jpd-name-en {
            font-size: 11px; color: var(--color-muted);
            margin-top: 3px; line-height: 1.4;
          }

          /* Stats row */
          .jpd-stats {
            border-top: 1px solid var(--color-border);
            padding: 3px 13px 3px 5px;
            display: flex; align-items: center;
          }
          .jpd-stats-nums { flex: 1; display: flex; align-items: center; }
          .jpd-stat { flex: 1; text-align: center; padding: 0 2px; }
          .jpd-stat + .jpd-stat { border-left: 1px solid var(--color-border); }
          .jpd-s-lbl {
            font-size: 8.5px; letter-spacing: .9px;
            text-transform: uppercase;
            color: var(--color-emphasis); margin-bottom: 3px;
          }
          [data-theme="dark"] .jpd-s-lbl { color: var(--color-muted); }
          [data-theme="blue"] .jpd-s-lbl { color: var(--color-muted); }
          .jpd-s-val {
            font-size: 14px; font-weight: 600;
            color: var(--color-emphasis); line-height: 1;
          }
          .jpd-s-md { font-size: 19px; font-weight: 800; }

          /* Badge col */
          .jpd-badge-col {
            padding-left: 10px;
            border-left: 1px solid var(--color-border);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            min-width: 64px; gap: 3px;
            transform: translate(-2px, -2px);
          }
          .jpd-b-icons { display: flex; gap: 4px; align-items: center; min-height: 16px; }
          .jpd-ico-god { color: #e8930a; font-size: 15px; }
          .jpd-ico-pop { color: #d0310a; font-size: 15px; }

          /* Prob badges — colors preserved exactly */
          .jpd-prob {
            font-size: 14px; font-weight: 500;
            padding: 3px 6px; text-align: center;
            line-height: 1.3; white-space: nowrap;
          }
          .jpd-p-safe  { background: #00703c; color: #fff; }
          .jpd-p-comp  { background: #005eb8; color: #fff; }
          .jpd-p-bord  { background: #ffb81c; color: #1a1200; }
          .jpd-p-low   { background: #e8510c; color: #fff; }
          .jpd-p-unmet { background: #d5281b; color: #fff; }
          .jpd-prob-en { font-size: 8.5px; color: var(--color-muted); text-align: center; }

          /* Score delta */
          .jpd-delta {
            font-size: 9.5px; font-weight: 700;
            line-height: 1; margin-top: 3px;
            letter-spacing: .2px;
          }

          /* Toggle */
          .jpd-tog {
            display: flex; width: 100%;
            background: var(--color-secondary-bg);
            border: none; border-top: 1px solid var(--color-border);
            padding: 7px 13px; cursor: pointer;
            align-items: center; justify-content: space-between;
            font-size: 12px; color: #005eb8; font-weight: 500;
            font-family: inherit; letter-spacing: .2px;
          }
          [data-theme="dark"] .jpd-tog,
          [data-theme="blue"] .jpd-tog { color: #6fa8dc; }

          /* Expanded body */
          .jpd-body { display: block; }

          /* Years table */
          .jpd-yr-tbl { width: 100%; border-collapse: collapse; }
          .jpd-yr-tbl thead th {
            background: var(--color-secondary-bg);
            padding: 6px 12px;
            font-size: 9px; letter-spacing: .9px; text-transform: uppercase;
            color: var(--color-emphasis); font-weight: 700; text-align: center;
            border-bottom: 1.5px solid var(--color-border);
          }
          [data-theme="dark"] .jpd-yr-tbl thead th { color: var(--color-muted); }
          [data-theme="blue"] .jpd-yr-tbl thead th { color: var(--color-muted); }
          .jpd-yr-tbl thead th:first-child { text-align: left; }
          .jpd-yr-tbl tbody td {
            padding: 8px 12px; font-size: 13px;
            text-align: center; color: var(--color-emphasis);
            border-bottom: 1px solid var(--color-border);
            background: var(--color-card-bg);
          }
          .jpd-yr-tbl tbody td:first-child {
            text-align: left; font-weight: 600;
            font-size: 12px; color: var(--color-muted);
          }
          .jpd-mc { font-weight: 800; }
          .jpd-yr-tbl tbody tr:last-child td { border-bottom: none; }

          /* Info section */
          .jpd-info-sec { border-top: 3px solid var(--color-emphasis); }
          .jpd-info-grid {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 1px; background: var(--color-border);
            border: 1px solid var(--color-border); border-top: none;
          }
          .jpd-info-cell { padding: 9px 12px; background: var(--color-card-bg); }
          .jpd-full { grid-column: 1 / -1; }
          .jpd-i-lbl {
            font-size: 11px; letter-spacing: .7px; text-transform: uppercase;
            color: var(--color-emphasis); margin-bottom: 3px;
          }
          [data-theme="dark"] .jpd-i-lbl { color: var(--color-muted); }
          [data-theme="blue"] .jpd-i-lbl { color: var(--color-muted); }
          .jpd-i-val {
            font-size: 13px; font-weight: 600;
            color: var(--color-emphasis); line-height: 1.45;
          }
          .jpd-i-val-lt { font-weight: 400; font-size: 12px; }
          .jpd-i-sub {
            font-size: 10.5px; font-weight: 400;
            color: var(--color-muted); margin-top: 1px;
          }

          /* Pills */
          .jpd-pill {
            display: inline-block; padding: 2px 6px;
            font-size: 11px; font-weight: 600; border-radius: 1px;
          }
          .jpd-pill-y    { background: #d4edda; color: #0a3d20; }
          .jpd-pill-n    { background: #fde8e8; color: #721c24; }
          .jpd-pill-maybe { background: #fff4cc; color: #6d4c00; }

          /* Formula box */
          .jpd-formula-box {
            font-family: "Courier New", Courier, monospace;
            font-size: 11.5px;
            background: var(--color-secondary-bg);
            border: 1px solid var(--color-border);
            padding: 6px 9px; margin-top: 5px;
            word-break: break-all; color: var(--color-emphasis);
          }

          /* Legend */
          .jpd-legend {
            padding: 10px 12px;
            background: var(--color-card-bg);
            border: 1.5px solid var(--color-border);
          }
          .jpd-legend-title {
            font-size: 9.5px; letter-spacing: .6px;
            text-transform: uppercase; color: var(--color-muted);
            margin-bottom: 7px;
          }
          .jpd-legend-row { display: flex; flex-wrap: wrap; gap: 5px; }

          /* Page header */
          .jpd-page-hd {
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--color-border);
          }
          .jpd-page-tag {
            font-size: 9px; font-weight: 700; letter-spacing: .1em;
            text-transform: uppercase; color: var(--color-muted);
            margin-bottom: 4px;
          }
          .jpd-page-title {
            font-size: 18px; font-weight: 700;
            color: var(--color-heading); margin: 0 0 2px;
          }
          .jpd-page-sub {
            font-size: 12px; color: var(--color-muted);
          }

          /* Stats delta row */
          .jpd-stats-delta {
            padding: 3px 0 6px;
            text-align: center;
            font-size: 9.5px; font-weight: 700;
            letter-spacing: .2px;
            border-top: 1px solid var(--color-border);
          }

          /* Search panel */
          .jpd-search-card { margin-bottom: 16px; }
          .jpd-tbl-hd {
            padding: 6px 13px;
            background: var(--color-secondary-bg);
            border-top: 1px solid var(--color-border);
            font-size: 16px; letter-spacing: .9px; text-transform: uppercase;
            color: var(--color-emphasis); font-weight: 600;
            display: flex; align-items: baseline; gap: 7px;
          }
          .jpd-tbl-hd:first-child { border-top: none; }
          .jpd-tbl-hd-en {
            font-size: 14px; font-weight: 400;
            text-transform: none; letter-spacing: .3px;
            color: var(--color-muted);
          }
          [data-theme="dark"] .jpd-tbl-hd { color: var(--color-muted); font-weight: 600; }
          [data-theme="blue"] .jpd-tbl-hd { color: var(--color-muted); font-weight: 600; }

          .jpd-subj-row {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 13px;
            border-bottom: 1px solid var(--color-border);
          }
          .jpd-subj-row:last-child { border-bottom: none; }
          .jpd-subj-name { flex: 1; min-width: 0; }
          .jpd-subj-name-ch {
            display: block; font-size: 15px; font-weight: 500;
            color: var(--color-emphasis); line-height: 1.3;
          }
          .jpd-subj-name-en {
            display: block; font-size: 13px; font-weight: 400;
            color: var(--color-muted); margin-top: 1px;
          }

          .jpd-select {
            padding: 5px 7px; font-size: 15px; font-weight: 500;
            background: var(--color-input-bg); color: var(--color-body);
            border: 1px solid var(--color-border);
            border-radius: 2px; font-family: inherit; cursor: pointer;
            -webkit-appearance: auto;
          }
          .jpd-grade-sel { width: 66px; flex-shrink: 0; }
          .jpd-subject-sel { flex: 1; min-width: 0; }

          .jpd-add-wrap {
            padding: 8px 13px;
            border-top: 1px solid var(--color-border);
          }
          .jpd-search-foot {
            padding: 10px 13px;
            border-top: 1px solid var(--color-border);
          }
        `}</style>
      </Head>

      {/* Breadcrumb-style header */}
      <div className="hidden sm:flex items-center mb-3">
        <div className="text-xl font-medium pr-3 border-r border-[var(--color-border)] text-[var(--color-heading)]">開發</div>
        <div className="pl-3">
          <nav aria-label="breadcrumb">
            <ol className="list-none flex p-0 m-0">
              <li className="text-base text-[var(--color-body)]" aria-current="page">JUPAS 結果卡 — 設計稿</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content — no card wrapper */}
      <div className="jpd-wrap">

        {/* Page header */}
        <div className="jpd-page-hd">
          <div className="jpd-page-tag">Design Iteration · Component Sandbox</div>
          <h1 className="jpd-page-title">JUPAS 計算結果卡</h1>
          <p className="jpd-page-sub">Result card components for JUPAS calculator feature</p>
        </div>

        {/* Result list */}
        <SearchPanel />

        <p className="jpd-result-label">搜尋結果 · {DEMO_CARDS.length} 個課程</p>

        {DEMO_CARDS.map(card => (
          <JupasCard key={card.code} {...card} />
        ))}

        {/* Legend */}
        <ProbLegend />

      </div>
    </>
  )
}
