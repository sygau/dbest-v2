import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Toggle({ pressed = false, onPressedChange, size = 'md', children, className, onClick, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={(e) => { onPressedChange?.(!pressed); onClick?.(e) }}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 font-medium border transition-colors cursor-pointer select-none',
        'rounded-md',
        size === 'sm' && 'h-7 px-2.5 text-xs',
        size === 'md' && 'h-9 px-3 text-sm',
        size === 'lg' && 'h-10 px-4 text-sm',
        pressed
          ? 'bg-violet-600 text-white border-violet-600'
          : 'bg-transparent border-[var(--color-border)] text-[var(--color-body)] hover:bg-[var(--color-card-bg)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
