import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

interface ConfigItemProps {
  label: string
  description?: string
  icon?: ReactNode
  control?: ReactNode
  children?: ReactNode
  className?: string
  destructive?: boolean
}

export function ConfigItem({ label, description, icon, control, children, className, destructive = false }: ConfigItemProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)}>
      {icon && (
        <div className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm',
          destructive ? 'bg-red-100 text-red-600' : 'bg-violet-100 text-violet-600'
        )}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className={cn(
          'text-sm font-medium leading-tight',
          destructive ? 'text-red-600' : 'text-[var(--color-heading)]'
        )}>
          {label}
        </div>
        {description && (
          <div className="text-xs leading-snug mt-0.5" style={{ color: 'var(--color-muted)' }}>
            {description}
          </div>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>
      {control && <div className="flex-shrink-0">{control}</div>}
    </div>
  )
}

interface ConfigSectionProps {
  title?: string
  footer?: string
  children: ReactNode
  className?: string
}

export function ConfigSection({ title, footer, children, className }: ConfigSectionProps) {
  return (
    <div
      className={cn('rounded-xl overflow-hidden', className)}
      style={{ border: '1px solid var(--color-border)' }}
    >
      {title && (
        <div
          className="px-4 pt-3 pb-1.5"
          style={{ background: 'var(--color-card-inner-bg)', borderBottom: '1px solid var(--color-border)' }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
            {title}
          </span>
        </div>
      )}
      <div
        className="divide-y px-4"
        style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
      >
        {children}
      </div>
      {footer && (
        <div
          className="px-4 py-2 text-xs"
          style={{ color: 'var(--color-muted)', borderTop: '1px solid var(--color-border)', background: 'var(--color-card-inner-bg)' }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
