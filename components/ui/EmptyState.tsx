import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
  iconVariant?: 'ring' | 'bare' | 'box'
}

export function EmptyState({ icon, title, description, action, className, iconVariant = 'ring' }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}>
      {icon && (
        <div className="mb-4">
          {iconVariant === 'ring' && (
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)]">
              {icon}
            </div>
          )}
          {iconVariant === 'bare' && (
            <div className="flex flex-col items-center gap-2 text-[var(--color-muted)] opacity-50">
              {icon}
              <span className="block w-8 h-0.5 rounded-full bg-current opacity-40" />
            </div>
          )}
          {iconVariant === 'box' && (
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-card-inner-bg)] flex items-center justify-center text-[var(--color-muted)]">
              {icon}
            </div>
          )}
        </div>
      )}
      <h3 className="text-sm font-semibold text-[var(--color-heading)] mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-[var(--color-muted)] max-w-xs leading-relaxed mb-4">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
