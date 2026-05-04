interface ProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
}

export function Progress({ value, max = 100, className, barClassName }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={`w-full h-2.5 rounded-full bg-[var(--color-card-inner-bg)] overflow-hidden ${className || ''}`}>
      <div
        className={`h-full rounded-full bg-violet-500 ${barClassName || ''}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
