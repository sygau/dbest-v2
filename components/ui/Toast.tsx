import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'
import { LuX, LuCircleCheck, LuCircleX, LuTriangleAlert, LuInfo } from 'react-icons/lu'

export interface ToastProps {
  variant?: 'default' | 'success' | 'error' | 'warning'
  title: string
  description?: string
  onClose?: () => void
  action?: { label: string; onClick: () => void }
  className?: string
}

const ICONS = {
  default: LuInfo,
  success: LuCircleCheck,
  error: LuCircleX,
  warning: LuTriangleAlert,
}

const ICON_COLORS: Record<string, string> = {
  default: '#8b5cf6',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
}
export function Toast({ variant = 'default', title, description, onClose, action, className }: ToastProps) {
  const Icon = ICONS[variant]
  const color = ICON_COLORS[variant]

  return (
    <div 
      className={cn('relative flex w-full rounded-2xl border shadow-xl overflow-hidden', className)}
      style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
    >
      {/* Icon Container: No more fixed strip background */}
      <div className="relative flex items-center justify-center w-14 shrink-0">
        {/* The "Grounded" Shape: Just a larger, faint version of the icon */}
        <div 
          className="absolute flex items-center justify-center"
          style={{ 
            transform: 'scale(1.2)', 
            color: color, 
            opacity: 0.25 
          }}
        >
          <Icon size={24} />
        </div>
        
        {/* The Actual Icon */}
        <div className="relative z-10" style={{ color: color }}>
          <Icon size={24} />
        </div>
      </div>

      {/* Content Zone */}
      <div className="flex-1 py-3.5 pr-3.5 pl-0 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold leading-snug" style={{ color: 'var(--color-heading)', fontSize: '16px' }}>
            {title}
          </div>
          {description && (
            <div className="leading-relaxed mt-0.5" style={{ color: 'var(--color-muted)', fontSize: '14px' }}>
              {description}
            </div>
          )}
          {action && (
            <button onClick={action.onClick} className="mt-1.5 font-semibold cursor-pointer text-violet-600 text-[13px]">
              {action.label}
            </button>
          )}
        </div>
        {onClose && (
          <button onClick={onClose} className="flex-shrink-0 opacity-40 hover:opacity-80" style={{ color: 'var(--color-body)' }}>
            <LuX size={15} />
          </button>
        )}
      </div>
    </div>
  )
}

export function ToastContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none sm:left-auto sm:right-4 sm:bottom-4 sm:w-96"
      aria-label="Notifications"
    >
      <div className="pointer-events-auto flex flex-col gap-2">
        {children}
      </div>
    </div>
  )
}
