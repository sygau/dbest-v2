import { cn } from '../../lib/cn'
import { useState } from 'react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-left',
          'text-sm font-semibold text-[var(--color-heading)]',
          'hover:bg-[var(--color-overlay-bg)] transition-none'
        )}
      >
        {title}
        <svg
          className={cn('w-4 h-4 text-[var(--color-muted)] flex-shrink-0 transition-none', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pt-2 pb-4 text-sm text-[var(--color-body)] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

export function Accordion({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-lg border border-[var(--color-border)] overflow-hidden bg-[var(--color-card-bg)]', className)}>
      {children}
    </div>
  )
}
