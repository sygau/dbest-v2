import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

export interface DropdownItem {
  label?: string
  icon?: ReactNode
  onClick?: () => void
  variant?: 'default' | 'destructive'
  disabled?: boolean
  separator?: boolean
  shortcut?: string
}

interface DropdownMenuProps {
  open: boolean
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export function DropdownMenu({ open, items, align = 'left', className }: DropdownMenuProps) {
  if (!open) return null
  return (
    <div
      className={cn(
        'absolute top-full mt-1.5 z-50 min-w-48 rounded-xl border shadow-xl overflow-hidden py-1',
        align === 'right' ? 'right-0' : 'left-0',
        className
      )}
      style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
      role="menu"
    >
      {items.map((item, i) => {
        if (item.separator) {
          return <div key={i} className="my-1 h-px" style={{ background: 'var(--color-border)' }} />
        }
        return (
          <button
            key={i}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={item.onClick}
            className={cn(
              'w-full text-left flex items-center gap-2.5 px-3 py-2 cursor-pointer',
              'hover:bg-[var(--color-card-inner-bg)] transition-colors',
              item.variant === 'destructive' ? 'text-red-500' : 'text-[var(--color-body)]',
              item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
            )}
            style={{ fontSize: '14px' }}
          >
            {item.icon && (
              <span className="flex-shrink-0 opacity-60" style={{ width: '16px', display: 'flex' }}>
                {item.icon}
              </span>
            )}
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="text-xs opacity-35 ml-3 flex-shrink-0">{item.shortcut}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
