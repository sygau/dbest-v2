import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LuList,
  LuCalendar,
  LuClock,
  LuDownload,
  LuInfo,
  LuX,
  LuRefreshCw,
  LuTimer,
} from 'react-icons/lu'
import PageSEO from '../components/PageSEO'
import PageBreadcrumb from '../components/PageBreadcrumb'
import { Alert, AlertTitle, AlertDescription } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'

type Session = {
  start: string
  end: string
  zh: string
  en: string
  note?: string
}

type ExamDay =
  | {
      kind: 'exam'
      date: string
      weekday: string
      sessions: Session[]
    }
  | {
      kind: 'holiday' | 'reserve'
      date: string
      weekday: string
      label: string
      zh: string
    }

const SCHEDULE: ExamDay[] = [
  {
    kind: 'exam',
    date: '2027-04-06',
    weekday: 'TUE',
    sessions: [{ start: '08:30', end: '12:30', zh: '視覺藝術（一）及（二）', en: 'Visual Arts 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-07',
    weekday: 'WED',
    sessions: [
      { start: '08:30', end: '10:00', zh: '中國語文（一）', en: 'Chinese Language 1' },
      { start: '10:45', end: '13:00', zh: '中國語文（二）', en: 'Chinese Language 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-08',
    weekday: 'THU',
    sessions: [
      { start: '08:30', end: '10:00', zh: '英國語文（一）', en: 'English Language 1' },
      { start: '11:00', end: '13:00', zh: '英國語文（二）', en: 'English Language 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-10',
    weekday: 'SAT',
    sessions: [
      {
        start: '09:15',
        end: '12:10',
        zh: '英國語文（三）聆聽',
        en: 'English Language 3 (Listening)',
        note: '到場時間：電台/IR 試場 8:30am，PA 系統試場 8:45am',
      },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-12',
    weekday: 'MON',
    sessions: [
      { start: '08:30', end: '10:45', zh: '數學（必修部分）卷一', en: 'Mathematics Compulsory Part 1' },
      { start: '11:30', end: '12:45', zh: '數學（必修部分）卷二', en: 'Mathematics Compulsory Part 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-13',
    weekday: 'TUE',
    sessions: [{ start: '08:30', end: '10:30', zh: '公民與社會發展', en: 'Citizenship & Social Development' }],
  },
  {
    kind: 'exam',
    date: '2027-04-14',
    weekday: 'WED',
    sessions: [{ start: '08:30', end: '10:15', zh: '倫理與宗教（一）及（二）', en: 'Ethics & Religious Studies 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-15',
    weekday: 'THU',
    sessions: [{ start: '08:30', end: '11:00', zh: '化學（一）及（二）', en: 'Chemistry 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-16',
    weekday: 'FRI',
    sessions: [
      { start: '08:30', end: '10:30', zh: '健康管理與社會關懷（一）及（二）', en: 'Health Management & Social Care 1 & 2' },
      { start: '08:30', end: '11:30', zh: '英語文學（一）及（二）', en: 'Literature in English 1 & 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-17',
    weekday: 'SAT',
    sessions: [{ start: '08:30', end: '10:30', zh: '資訊及通訊科技（一）及（二）', en: 'Information & Communication Technology 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-19',
    weekday: 'MON',
    sessions: [{ start: '08:30', end: '11:00', zh: '生物（一）及（二）', en: 'Biology 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-20',
    weekday: 'TUE',
    sessions: [
      { start: '08:30', end: '10:30', zh: '中國文學（一）及（二）', en: 'Chinese Literature 1 & 2' },
      { start: '08:30', end: '12:45', zh: '科技與生活（一）及（二）', en: 'Technology & Living 1 & 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-21',
    weekday: 'WED',
    sessions: [{ start: '08:30', end: '11:00', zh: '物理(一)及(二)', en: 'Physics 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-22',
    weekday: 'THU',
    sessions: [{ start: '08:30', end: '11:15', zh: '地理(一)及(二)', en: 'Geography 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-23',
    weekday: 'FRI',
    sessions: [{ start: '08:30', end: '10:30', zh: '歷史(一)及(二)', en: 'History 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-24',
    weekday: 'SAT',
    sessions: [{ start: '08:30', end: '10:30', zh: '設計與應用科技(一)及(二)', en: 'Design & Applied Technology 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-26',
    weekday: 'MON',
    sessions: [
      { start: '08:30', end: '11:00', zh: '數學延伸部分 M1', en: 'Mathematics Extended Part M1' },
      { start: '08:30', end: '11:00', zh: '數學延伸部分 M2', en: 'Mathematics Extended Part M2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-27',
    weekday: 'TUE',
    sessions: [{ start: '08:30', end: '10:45', zh: '中國歷史(一)及(二)', en: 'Chinese History 1 & 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-28',
    weekday: 'WED',
    sessions: [
      { start: '08:30', end: '10:45', zh: '體育(一)及(二)', en: 'Physical Education 1 & 2' },
      { start: '08:30', end: '12:15', zh: '音樂 1A 及 1B', en: 'Music 1A & 1B' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-29',
    weekday: 'THU',
    sessions: [
      { start: '08:30', end: '09:30', zh: '企業、會計與財務概論(一)', en: 'Business, Accounting & Financial Studies 1' },
      { start: '10:15', end: '12:45', zh: '企業、會計與財務概論(二)', en: 'Business, Accounting & Financial Studies 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-30',
    weekday: 'FRI',
    sessions: [
      { start: '08:30', end: '09:30', zh: '經濟(一)', en: 'Economics 1' },
      { start: '10:15', end: '12:45', zh: '經濟(二)', en: 'Economics 2' },
    ],
  },
  {
    kind: 'holiday',
    date: '2027-05-01',
    weekday: 'SAT',
    label: 'Labour Day — No exams',
    zh: '勞動節 — 無考試',
  },
  {
    kind: 'exam',
    date: '2027-05-03',
    weekday: 'MON',
    sessions: [{ start: '08:30', end: '10:00', zh: '旅遊與款待(一)及(二)', en: 'Tourism & Hospitality Studies 1 & 2' }],
  },
  {
    kind: 'reserve',
    date: '2027-05-04',
    weekday: 'TUE',
    label: 'Reserve Date (if needed)',
    zh: '後備考試日（如有需要）',
  },
  {
    kind: 'reserve',
    date: '2027-05-05',
    weekday: 'WED',
    label: 'Reserve Date (if needed)',
    zh: '後備考試日（如有需要）',
  },
]

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAY_HEADER = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function parseISO(d: string) {
  const [y, m, day] = d.split('-').map(Number)
  return { y, m, day }
}

function groupByMonth(days: ExamDay[]) {
  const groups: Record<string, ExamDay[]> = {}
  for (const d of days) {
    const { y, m } = parseISO(d.date)
    const key = `${y}-${m}`
    ;(groups[key] ||= []).push(d)
  }
  return Object.entries(groups).map(([key, items]) => {
    const [y, m] = key.split('-').map(Number)
    return { y, m, label: `${MONTH_NAMES[m - 1]} ${y}`, items }
  })
}

export default function TimetablePage() {
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [selected, setSelected] = useState<ExamDay | null>(null)
  const monthGroups = useMemo(() => groupByMonth(SCHEDULE), [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <>
      <PageSEO
        title="2027 DSE Examination Timetable 香港中學文憑試時間表 | dse.best"
        description="2027 HKDSE 考試時間表，列出各科筆試日期、時間及聆聽考試安排。提供 List 及 Calendar 兩種檢視模式，方便考生規劃溫習進度。"
        canonical="https://dse.best/timetable"
        pageKey="timetable"
      />

      <PageBreadcrumb section="資源" text="考試時間表 Timetable" />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Hero */}
        <header className="mb-3 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-heading)] leading-tight">
            2027 香港中學文憑考試時間表
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--color-body)] opacity-90 leading-relaxed">
            2027 年 HKDSE 筆試完整時間表，按日列出科目、時段及聆聽考試安排。官方時間表 PDF 將於 HKEAA 公佈後提供。
          </p>

          <div className="mt-3">
            <Link href="/countdown">
              <Button variant="default" size="md">
                <LuTimer size={16} strokeWidth={3} />
                2027 DSE 倒數
              </Button>
            </Link>
          </div>
        </header>

        {/* Estimated notice */}
        <div
          className="mb-4 rounded-lg border-2 px-3 py-2.5 text-sm flex gap-2"
          style={{
            background: '#fef3c7',
            borderColor: '#fcd34d',
            color: '#78350f',
          }}
        >
          <LuInfo size={16} className="flex-shrink-0 translate-y-1" />
          <span className="leading-relaxed">
            <strong>注意：</strong>2027 DSE 時間表尚未由 HKEAA 正式公佈，以下日期及科目順序屬估算性質，僅供參考。
            <span className="block opacity-80 mt-0.5">Dates and order are estimated — 2027 timetable not yet officially announced.</span>
          </span>
        </div>

        {/* Practical/Oral alert */}
        <Alert variant="default" className="mb-3">
          <AlertTitle icon={<LuInfo size={16} />}>實習試 / 口試 Practical & Oral Exams</AlertTitle>
          <AlertDescription>
            體育、音樂及英文口試等實習/口試將於 2027 年 2 月至 3 月舉行 — 請查閱個人准考證（Admission Form）以獲取確實日期。
            <span className="block opacity-80">Practical/Oral exams (PE, Music, English Speaking) are held February–March 2027 — check your Admission Form for exact dates.</span>
          </AlertDescription>
        </Alert>

        {/* Toolbar */}
        <div className="mb-4 flex items-center justify-end gap-2 flex-wrap">


          <div
            className="flex w-full md:w-auto md:inline-flex rounded-lg p-1 border"
            style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
          >
            <button
              type="button"
              onClick={() => setView('list')}
              aria-pressed={view === 'list'}
              className={
                'flex flex-1 md:flex-none md:inline-flex items-center justify-center md:justify-start gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ' +
                (view === 'list'
                  ? 'text-[var(--color-heading)] shadow-sm'
                  : 'text-[var(--color-body)] opacity-70')
              }
              style={view === 'list' ? { background: 'var(--color-body-bg)' } : undefined}
            >
              <LuList size={15} /> List
            </button>
            <button
              type="button"
              onClick={() => setView('calendar')}
              aria-pressed={view === 'calendar'}
              className={
                'flex flex-1 md:flex-none md:inline-flex items-center justify-center md:justify-start gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ' +
                (view === 'calendar'
                  ? 'text-[var(--color-heading)] shadow-sm'
                  : 'text-[var(--color-body)] opacity-70')
              }
              style={view === 'calendar' ? { background: 'var(--color-body-bg)' } : undefined}
            >
              <LuCalendar size={15} /> Calendar
            </button>
          </div>
        </div>

        {/* Views */}
        {view === 'list' ? (
          <ListView groups={monthGroups} />
        ) : (
          <CalendarView groups={monthGroups} onSelect={setSelected} />
        )}
      </div>

      {selected && <DayDetailModal day={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

/* ───────── List View ───────── */

function ListView({ groups }: { groups: ReturnType<typeof groupByMonth> }) {
  return (
    <div className="space-y-6">
      {groups.map(group => (
        <section key={`${group.y}-${group.m}`}>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-heading)] mb-3 pb-2 border-b border-[var(--color-border)]">
            {group.label}
          </h2>
          <div className="space-y-2.5">
            {group.items.map(day => (
              <DayRow key={day.date} day={day} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function DayRow({ day }: { day: ExamDay }) {
  const { day: dayNum } = parseISO(day.date)
  const cardStyle = {
    background: 'var(--color-card-bg)',
    borderColor: 'var(--color-border)',
  }

  if (day.kind !== 'exam') {
    const Icon = day.kind === 'holiday' ? LuX : LuRefreshCw
    return (
      <div className="rounded-xl border overflow-hidden flex shadow-sm" style={cardStyle}>
        <div
          className="w-16 sm:w-20 flex-shrink-0 flex flex-col items-center justify-center py-4 border-r opacity-60"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="text-2xl sm:text-3xl font-bold text-[var(--color-heading)] leading-none">{dayNum}</div>
          <div className="text-[11px] sm:text-xs text-[var(--color-body)] opacity-70 mt-1">{day.weekday}</div>
        </div>
        <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 py-3 text-sm text-[var(--color-body)] opacity-75">
          <Icon size={15} className="flex-shrink-0" />
          <div>
            <div className="font-medium">{day.zh}</div>
            <div className="text-xs opacity-70">{day.label}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border overflow-hidden flex shadow-sm" style={cardStyle}>
      <div
        className="w-16 sm:w-20 flex-shrink-0 flex flex-col items-center justify-center py-4 border-r"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="text-2xl sm:text-3xl font-bold text-[var(--color-heading)] leading-none">{dayNum}</div>
        <div className="text-[11px] sm:text-xs text-[var(--color-body)] opacity-70 mt-1">{day.weekday}</div>
      </div>
      <div className="flex-1 divide-y" style={{ borderColor: 'var(--color-border)' } as any}>
        {day.sessions.map((s, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 px-4 sm:px-5 py-3.5 sm:py-4 border-t first:border-t-0"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-1.5 text-[13px] sm:text-sm font-mono text-[var(--color-body)] opacity-80 flex-shrink-0 sm:w-[118px] sm:whitespace-nowrap">
              <LuClock size={12} />
              <span>{s.start}<span className=""> – </span>{s.end}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-lg font-semibold text-[var(--color-heading)] leading-snug">{s.zh}</div>
              <div className="text-sm sm:text-base font-medium text-[var(--color-body)] opacity-75 leading-snug">{s.en}</div>
              {s.note && (
                <div className="mt-1.5 text-xs text-[var(--color-body)] opacity-60 italic">* {s.note}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Calendar View ───────── */

function CalendarView({
  groups,
  onSelect,
}: {
  groups: ReturnType<typeof groupByMonth>
  onSelect: (day: ExamDay) => void
}) {
  return (
    <div className="space-y-6">
      {groups.map(group => (
        <section key={`${group.y}-${group.m}`}>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-heading)] mb-3">{group.label}</h2>
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="px-3 sm:px-0 min-w-[720px]">
              <MonthGrid year={group.y} month={group.m} items={group.items} onSelect={onSelect} />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

function MonthGrid({
  year,
  month,
  items,
  onSelect,
}: {
  year: number
  month: number
  items: ExamDay[]
  onSelect: (day: ExamDay) => void
}) {
  const firstDow = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const byDay: Record<number, ExamDay> = {}
  for (const d of items) byDay[parseISO(d.date).day] = d

  const cells: Array<{ day?: number; entry?: ExamDay }> = []
  for (let i = 0; i < firstDow; i++) cells.push({})
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, entry: byDay[d] })
  while (cells.length % 7 !== 0) cells.push({})

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
    >
      <div className="grid grid-cols-7">
        {WEEKDAY_HEADER.map(w => (
          <div
            key={w}
            className="text-[11px] tracking-wider text-[var(--color-body)] opacity-60 text-center py-2 border-b font-medium"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((c, i) => (
          <CalendarCell key={i} cell={c} index={i} total={cells.length} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

function CalendarCell({
  cell,
  index,
  total,
  onSelect,
}: {
  cell: { day?: number; entry?: ExamDay }
  index: number
  total: number
  onSelect: (day: ExamDay) => void
}) {
  const col = index % 7
  const lastCol = col === 6
  const lastRow = index >= total - 7
  const borderStyle: React.CSSProperties = {
    borderColor: 'var(--color-border)',
    borderRightWidth: lastCol ? 0 : 1,
    borderBottomWidth: lastRow ? 0 : 1,
    borderStyle: 'solid',
  }

  if (!cell.day) {
    return (
      <div
        className="min-h-[80px] sm:min-h-[110px]"
        style={{ ...borderStyle, background: 'var(--color-card-inner-bg, transparent)', opacity: 0.5 }}
      />
    )
  }

  const entry = cell.entry
  const hasExam = entry?.kind === 'exam'
  const isHoliday = entry?.kind === 'holiday'
  const isReserve = entry?.kind === 'reserve'
  const filled = hasExam || isHoliday || isReserve
  const clickable = !!entry

  return (
    <div
      className={
        'min-h-[80px] sm:min-h-[110px] p-1.5 sm:p-2 flex flex-col gap-1 ' +
        (clickable ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5' : '')
      }
      style={borderStyle}
      onClick={clickable ? () => onSelect(entry!) : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : -1}
      onKeyDown={
        clickable
          ? e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(entry!)
              }
            }
          : undefined
      }
    >
      <div
        className={
          'inline-flex items-center justify-center text-[11px] sm:text-xs font-semibold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ' +
          (filled ? 'text-white' : 'text-[var(--color-body)] opacity-60')
        }
        style={filled ? { background: '#1a1a1a' } : undefined}
      >
        {cell.day}
      </div>

      {hasExam &&
        entry!.kind === 'exam' &&
        entry!.sessions.map((s, i) => (
          <div
            key={i}
            className="text-[10px] sm:text-[11px] leading-tight px-1.5 py-1 rounded border text-[var(--color-heading)] truncate"
            style={{ background: 'var(--color-body-bg)', borderColor: 'var(--color-border)' }}
            title={`${s.start}-${s.end} ${s.zh} / ${s.en}`}
          >
            {s.zh}
          </div>
        ))}

      {(isHoliday || isReserve) && entry && (
        <div className="text-[10px] sm:text-[11px] leading-tight text-[var(--color-body)] opacity-70 italic">
          {(entry as Extract<ExamDay, { kind: 'holiday' | 'reserve' }>).zh}
        </div>
      )}
    </div>
  )
}

/* ───────── Day Detail Modal ───────── */

function DayDetailModal({ day, onClose }: { day: ExamDay; onClose: () => void }) {
  const { y, m, day: dayNum } = parseISO(day.date)
  const dateLabel = `${MONTH_NAMES[m - 1]} ${dayNum}, ${y} (${day.weekday})`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border-2 shadow-xl overflow-hidden"
        style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <div className="text-xs text-[var(--color-body)] opacity-60 uppercase tracking-wider">{dateLabel}</div>
            <div className="text-base font-bold text-[var(--color-heading)] mt-0.5">
              {day.kind === 'exam' ? '考試場次 Exam Sessions' : day.kind === 'holiday' ? '假期 Holiday' : '後備日 Reserve Date'}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-[var(--color-body)]"
          >
            <LuX size={18} />
          </button>
        </div>

        <div className="p-4">
          {day.kind === 'exam' ? (
            <div className="space-y-3">
              {day.sessions.map((s, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3"
                  style={{ background: 'var(--color-body-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-body)] opacity-80">
                    <LuClock size={13} />
                    {s.start} – {s.end}
                  </div>
                  <div className="mt-1.5 text-base font-semibold text-[var(--color-heading)] leading-snug">{s.zh}</div>
                  <div className="text-sm text-[var(--color-body)] opacity-70 leading-snug">{s.en}</div>
                  {s.note && (
                    <div className="mt-2 text-[11px] text-[var(--color-body)] opacity-70 italic border-t pt-2" style={{ borderColor: 'var(--color-border)' }}>
                      * {s.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-[var(--color-body)]">
              <div className="font-medium text-[var(--color-heading)]">{day.zh}</div>
              <div className="opacity-70 mt-1">{day.label}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
