import { useEffect, useRef, useState } from 'react'
import { BiCalendarEvent } from 'react-icons/bi'

const DSE_2027 = new Date('2027-04-07T09:00:00+08:00').getTime()
const DAY_MS = 86_400_000
const NAVY = 'rgba(181, 70, 255, 0.26)'
const PURPLE = '#8b5cf6'

function daysLeft() {
  return Math.max(0, Math.ceil((DSE_2027 - Date.now()) / DAY_MS))
}

/* one coherent motif — concentric rings, mirrored across two corners */
function Rings({ corner }: { corner: 'tr' | 'bl' }) {
  const tr = corner === 'tr'
  return (
    <svg
      className="absolute pointer-events-none scale-[0.55] sm:scale-100"
      style={{
        [tr ? 'top' : 'bottom']: -70,
        [tr ? 'right' : 'left']: -56,
        width: tr ? 230 : 170,
        height: tr ? 230 : 170,
        opacity: 0.2,
      }}
      viewBox="0 0 230 230"
      aria-hidden
    >
      <circle cx="115" cy="115" r="112" fill="none" stroke={PURPLE} strokeWidth="3" />
      <circle cx="115" cy="115" r="78" fill="none" stroke={PURPLE} strokeWidth="3" />
      <circle cx="115" cy="115" r="44" fill="none" stroke={PURPLE} strokeWidth="3" />
    </svg>
  )
}

export default function DseCountdown() {
  const [days, setDays] = useState<number | null>(null)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const target = daysLeft()
    const start = performance.now()
    const dur = 850
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 4)
      setDays(Math.round(eased * target))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const id = setInterval(() => setDays(daysLeft()), 60_000)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearInterval(id)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ background: NAVY }}>
      <Rings corner="tr" />
      <Rings corner="bl" />

      <div className="relative px-6 py-4 sm:py-6 text-center">
        <p
          className="m-0 inline-flex items-center  text-sm sm:text-lg font-semibold -translate-x-1"
          style={{ letterSpacing: '-0.01em', color: PURPLE }}
        >
          距離 2027 DSE 開考還有...
        </p>

        <div className="flex items-end justify-center gap-2.5 mt-1">
          <span
            className="font-bold tabular-nums leading-none"
            style={{ fontSize: 'clamp(4.6rem, 17vw, 7rem)', letterSpacing: '-0.05em', color: PURPLE }}
          >
            {days === null ? '—' : days.toLocaleString()}
          </span>
          <span className="font-bold pb-3" style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', color: PURPLE }}>
            天
          </span>
        </div>

        <div className="mt-4 flex justify-center">
          <span
            className="inline-block rounded-sm px-4 py-1.5 text-xs sm:text-sm font-bold"
            style={{ background: PURPLE, color: 'var(--color-body-bg)', letterSpacing: '-0.01em' }}
          >
            預計開考日 → 2027 年 4 月 7 日
          </span>
        </div>
      </div>
    </div>
  )
}
