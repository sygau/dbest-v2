import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

interface CalloutProps {
  variant?: 'tip' | 'info' | 'warning' | 'note'
  title?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  ghost?: boolean
}

const colors = {
  tip:     { border: '#8b5cf6', bg: 'rgba(139,92,246,0.07)' },
  info:    { border: '#0ea5e9', bg: 'rgba(14,165,233,0.07)' },
  warning: { border: '#f59e0b', bg: 'rgba(245,158,11,0.07)' },
  note:    { border: 'var(--color-border)', bg: 'var(--color-card-inner-bg)' },
}

export function Callout({ variant = 'note', title, icon, children, className, ghost = false }: CalloutProps) {
  const c = colors[variant]
  return (
    <div
      className={cn('rounded-lg text-sm', ghost && 'relative overflow-hidden', className)}
      style={{
        border: `1px solid var(--color-border)`,
        borderLeftWidth: '4px',
        borderLeftColor: c.border,
        backgroundColor: c.bg,
        padding: ghost ? '12px 16px 12px 2.75rem' : '12px 16px',
      }}
    >
      {ghost && icon && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%) scale(4)',
            transformOrigin: 'left center',
            opacity: 0.15,
            pointerEvents: 'none',
            color: c.border,
            display: 'flex',
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
      )}
      {(icon || title) && (
        <div className="flex items-center gap-2 font-semibold mb-1.5 text-[var(--color-heading)]">
          {!ghost && icon}
          {title && <span>{title}</span>}
        </div>
      )}
      <div className="text-[var(--color-body)] leading-relaxed">{children}</div>
    </div>
  )
}
