import { cn } from '../../lib/cn'
import type { ReactNode, HTMLAttributes } from 'react'

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

export function Alert({ className, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'ui-alert w-full',
        variant === 'default' && 'ui-alert-info',
        variant === 'success' && 'ui-alert-success',
        variant === 'warning' && 'ui-alert-warning',
        variant === 'destructive' && 'ui-alert-destructive',
        className
      )}
      {...props}
    />
  )
}

// Kept for backward compat; prefer icon prop on AlertTitle
export function AlertIcon({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn('inline-flex flex-shrink-0 items-center', className)}>{children}</span>
}

export function AlertTitle({
  className,
  icon,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { icon?: ReactNode }) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 font-semibold text-sm leading-tight text-[var(--color-heading)]',
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0 inline-flex">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}

export function AlertDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm leading-relaxed mt-1 text-[var(--color-body)] opacity-90 mb-0', className)}
      style={{ marginBottom: '-2px', ...((props.style as any) || {}) }}
      {...props}
    />
  )
}
