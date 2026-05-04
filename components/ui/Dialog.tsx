import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'
import { LuX } from 'react-icons/lu'

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Dialog({ open, onClose, title, description, children, footer, size = 'md', className }: DialogProps) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={cn(
          'relative w-full rounded-t-2xl sm:rounded-2xl border shadow-2xl',
          size === 'sm' && 'sm:max-w-sm',
          size === 'md' && 'sm:max-w-md',
          size === 'lg' && 'sm:max-w-lg',
          className
        )}
        style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
      >
        {/* Mobile handle bar */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-4 pb-0">
          <div className="flex-1">
            {title && (
              <h2
                id="dialog-title"
                className="font-semibold leading-snug"
                style={{ color: 'var(--color-heading)', fontSize: '16px' }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 leading-relaxed" style={{ color: 'var(--color-muted)', fontSize: '14px' }}>
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex-shrink-0 cursor-pointer opacity-40 hover:opacity-80 rounded-md p-1"
            style={{ color: 'var(--color-body)' }}
            aria-label="Close"
          >
            <LuX size={16} />
          </button>
        </div>

        {/* Body */}
        {children && (
          <div className="px-5 pt-4 pb-2" style={{ color: 'var(--color-body)', fontSize: '14px', lineHeight: 1.6 }}>
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div
            className="flex items-center justify-end gap-2 px-5 py-4"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
