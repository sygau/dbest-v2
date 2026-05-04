import { cn } from '../../lib/cn'
import { LuX } from 'react-icons/lu'
import type { ReactNode } from 'react'

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'active' | 'outline'
  onRemove?: () => void
  children: ReactNode
}

export function Chip({ className, variant = 'default', onRemove, children, ...props }: ChipProps) {
  const base = cn(
    'inline-flex items-center rounded-full border select-none text-xs font-medium',
    variant === 'default' && 'bg-[var(--color-secondary-bg)] text-[var(--color-body)] border-[var(--color-border)]',
    variant === 'active' && 'bg-violet-600 text-white border-violet-700',
    variant === 'outline' && 'bg-transparent text-violet-600 border-2 border-violet-500',
    className
  )

  if (onRemove) {
    return (
      <span className={cn(base, 'overflow-hidden')} {...props}>
        <span className="pl-3 pr-2.5 py-1">{children}</span>
        <span
          aria-hidden="true"
          className="self-stretch"
          style={{ width: '1px', background: 'currentColor', opacity: 0.22, margin: '4px 0' }}
        />
        <button
          type="button"
          onClick={onRemove}
          className="px-2.5 py-1 flex items-center opacity-60 hover:opacity-100 cursor-pointer"
          aria-label="Remove"
        >
          <LuX size={12} strokeWidth={2.5} />
        </button>
      </span>
    )
  }

  return (
    <span className={base} style={{ padding: '0.25rem 0.75rem' }} {...props}>
      {children}
    </span>
  )
}
