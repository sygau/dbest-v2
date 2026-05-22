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
  LuMegaphone,
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
    sessions: [{ start: 'AM', end: 'PM', zh: '視覺藝術（一）及（二）', en: 'Visual Arts 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-07',
    weekday: 'WED',
    sessions: [
      { start: 'AM', end: 'PM', zh: '中國文學（一）及（二）', en: 'Chinese Literature 1, 2' },
      { start: 'AM', end: 'PM', zh: '科技與生活（一）及（二）', en: 'Technology & Living 1, 2', note: 'Note 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-08',
    weekday: 'THU',
    sessions: [{ start: 'AM', end: 'PM', zh: '中國語文（一）及（二）', en: 'Chinese Language 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-09',
    weekday: 'FRI',
    sessions: [{ start: 'AM', end: 'PM', zh: '英國語文（一）及（二）', en: 'English Language 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-10',
    weekday: 'SAT',
    sessions: [{ start: 'AM', end: 'PM', zh: '英國語文（三）（聆聽及綜合能力考核）', en: 'English Language 3 (Listening and Integrated Skills)' }],
  },
  {
    kind: 'exam',
    date: '2027-04-12',
    weekday: 'MON',
    sessions: [{ start: 'AM', end: 'PM', zh: '數學必修部分（一）及（二）', en: 'Mathematics Compulsory Part 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-13',
    weekday: 'TUE',
    sessions: [{ start: 'AM', end: 'PM', zh: '公民與社會發展', en: 'Citizenship and Social Development' }],
  },
  {
    kind: 'exam',
    date: '2027-04-14',
    weekday: 'WED',
    sessions: [{ start: 'AM', end: 'PM', zh: '健康管理與社會關懷（一）及（二）', en: 'Health Management & Social Care 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-15',
    weekday: 'THU',
    sessions: [{ start: 'AM', end: 'PM', zh: '化學（一）及（二）', en: 'Chemistry 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-16',
    weekday: 'FRI',
    sessions: [{ start: 'AM', end: 'PM', zh: '地理（一）及（二）', en: 'Geography 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-17',
    weekday: 'SAT',
    sessions: [{ start: 'AM', end: 'PM', zh: '資訊及通訊科技（一）及（二）', en: 'Information & Communication Technology 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-19',
    weekday: 'MON',
    sessions: [{ start: 'AM', end: 'PM', zh: '生物（一）及（二）', en: 'Biology 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-20',
    weekday: 'TUE',
    sessions: [
      { start: 'AM', end: 'PM', zh: '設計與應用科技（一）及（二）', en: 'Design & Applied Technology 1, 2', note: 'Note 2' },
      { start: 'AM', end: 'PM', zh: '英語文學（一）及（二）', en: 'Literature in English 1, 2', note: 'Note 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-21',
    weekday: 'WED',
    sessions: [{ start: 'AM', end: 'PM', zh: '物理（一）及（二）', en: 'Physics 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-22',
    weekday: 'THU',
    sessions: [{ start: 'AM', end: 'PM', zh: '經濟（一）及（二）', en: 'Economics 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-23',
    weekday: 'FRI',
    sessions: [{ start: 'AM', end: 'PM', zh: '數學延伸部分單元（一）及（二）', en: 'Mathematics Extended Part Modules 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-24',
    weekday: 'SAT',
    sessions: [{ start: 'AM', end: 'PM', zh: '中國歷史（一）及（二）', en: 'Chinese History 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-26',
    weekday: 'MON',
    sessions: [{ start: 'AM', end: 'PM', zh: '企業、會計與財務概論（一）及（二）', en: 'Business, Accounting & Financial Studies 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-27',
    weekday: 'TUE',
    sessions: [{ start: 'AM', end: 'PM', zh: '歷史（一）及（二）', en: 'History 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-28',
    weekday: 'WED',
    sessions: [{ start: 'AM', end: 'PM', zh: '旅遊與款待（一）及（二）', en: 'Tourism & Hospitality Studies 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-04-29',
    weekday: 'THU',
    sessions: [
      { start: 'AM', end: 'PM', zh: '英語文學（一）及（二）', en: 'Literature in English 1, 2', note: 'Note 2' },
      { start: 'AM', end: 'PM', zh: '科技與生活（一）及（二）', en: 'Technology & Living 1, 2', note: 'Note 2' },
      { start: 'AM', end: 'PM', zh: '體育（一）及（二）', en: 'Physical Education 1, 2', note: 'Note 2' },
      { start: 'AM', end: 'PM', zh: '音樂 1A 及 1B', en: 'Music 1A & 1B', note: 'Note 2' },
    ],
  },
  {
    kind: 'exam',
    date: '2027-04-30',
    weekday: 'FRI',
    sessions: [{ start: 'AM', end: 'PM', zh: '倫理與宗教（一）及（二）', en: 'Ethics & Religious Studies 1, 2' }],
  },
  {
    kind: 'exam',
    date: '2027-05-03',
    weekday: 'MON',
    sessions: [
      { start: 'AM', end: 'PM', zh: '英語文學（一）及（二）', en: 'Literature in English 1, 2', note: 'Note 2' },
      { start: 'AM', end: 'PM', zh: '科技與生活（一）及（二）', en: 'Technology & Living 1, 2', note: 'Note 2' },
      { start: 'AM', end: 'PM', zh: '體育（一）及（二）', en: 'Physical Education 1, 2', note: 'Note 2' },
      { start: 'AM', end: 'PM', zh: '音樂 1A 及 1B / 後備', en: 'Music 1A & 1B / Reserve', note: 'Note 2' },
    ],
  },
  {
    kind: 'reserve',
    date: '2027-05-04',
    weekday: 'TUE',
    label: 'Reserve / 後備',
    zh: '後備',
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
        title="2027 DSE 時間表 Timetable | 香港中學文憑試時間表"
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
            2027 年 HKDSE 筆試完整時間表，按日列出科目及時段安排。
          </p>

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <Link href="/countdown">
              <Button variant="default" size="md">
                <LuTimer size={16} strokeWidth={3} />
                2027 DSE 倒數
              </Button>
            </Link>
            <a href="https://www.hkeaa.edu.hk/DocLibrary/HKDSE/Exam_Timetable/2027_DSE_Timetable.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md">
                <LuDownload size={16} />
                官方時間表 PDF
              </Button>
            </a>
          </div>
        </header>

        {/* Practical/Speaking alert */}
        <Alert variant="default" className="mb-3">
          <AlertTitle icon={<LuMegaphone size={16} />}>實習試／口試日期 Practical & Speaking Exam Period</AlertTitle>
          <AlertDescription>
            <div className="space-y-1 mt-0.5">
              <div><strong>體育（實習考試）</strong> Physical Education – Practical：2027 年 2 月下旬至 3 月下旬 / Late Feb – Late Mar 2027</div>
              <div><strong>音樂（實習考試）</strong> Music – Practical：2027 年 3 月上旬至 3 月中旬 / Early Mar – Mid-Mar 2027</div>
              <div><strong>英國語文（口試）</strong> English Language – Speaking：（一般試場）2027 年 3 月中旬至 3 月下旬（星期一至五）/ (Normal) Mid-Mar – Late Mar 2027, Mon–Fri；（特別試場）2027 年 3 月下旬 / (SEN) Late Mar 2027</div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Results release alert */}
        <Alert variant="default" className="mb-3">
          <AlertTitle icon={<LuInfo size={16} />}>放榜日期（暫定）Date of Release of Results (Tentative)</AlertTitle>
          <AlertDescription>
            約於 2027 年 7 月 14 日 / Around 14 July 2027
          </AlertDescription>
        </Alert>

        {/* Toolbar */}
        <div className="flex items-center justify-end gap-2 flex-wrap">


          <div
            className="mb-2 flex w-full md:w-auto md:inline-flex rounded-lg p-1 border"
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
            <div className="flex items-center gap-1.5 text-[13px] sm:text-sm font-mono text-[var(--color-body)] opacity-80 flex-shrink-0 sm:w-[100px] sm:whitespace-nowrap">
              <LuClock size={12} />
              <span>{s.start === 'AM' ? 'AM / PM' : `${s.start} – ${s.end}`}</span>
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
                    {s.start === 'AM' ? 'AM / PM' : `${s.start} – ${s.end}`}
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
