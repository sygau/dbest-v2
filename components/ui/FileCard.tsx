import type { JSX } from 'react'
import { cn } from '../../lib/cn'
import { LuDownload, LuClock, LuLock } from 'react-icons/lu'
import { Badge } from './Badge'
import { Button } from './Button'

type IconVariant = 'doc' | 'stacked' | 'ribbon'

// A: Classic document — page with folded top-right corner
function DocFileIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 1.5h9l5 5.5V22a.5.5 0 01-.5.5H3.5A.5.5 0 013 22V2a.5.5 0 01.5-.5z" />
      <polyline points="12,1.5 12,7.5 17,7.5" />
      <line x1="6" y1="11.5" x2="14" y2="11.5" />
      <line x1="6" y1="15" x2="14" y2="15" />
      <line x1="6" y1="18.5" x2="10.5" y2="18.5" />
    </svg>
  )
}

// B: Stacked pages — two offset rectangles
function StackedFileIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="14" height="18" rx="1.5" />
      <path d="M3 6v17a.5.5 0 00.5.5H17" />
    </svg>
  )
}

// C: Ribbon / bookmark sheet — page with a small ribbon notch at the bottom
function RibbonFileIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 20 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 1.5h13.5a.5.5 0 01.5.5v22.5l-7-3.5-7 3.5V2a.5.5 0 01.5-.5z" />
      <line x1="7" y1="9" x2="13" y2="9" />
      <line x1="7" y1="13" x2="13" y2="13" />
    </svg>
  )
}

const ICONS: Record<IconVariant, () => JSX.Element> = {
  doc: DocFileIcon,
  stacked: StackedFileIcon,
  ribbon: RibbonFileIcon,
}

interface FileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  subject: string
  paper: string
  year: number
  size?: string
  status?: 'available' | 'pending' | 'locked'
  iconVariant?: IconVariant
  onDownload?: () => void
}

export function FileCard({ subject, paper, year, size, status = 'available', iconVariant = 'stacked', onDownload, className, ...props }: FileCardProps) {
  const Icon = ICONS[iconVariant]
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border px-4 py-3',
        'bg-[var(--color-card-bg)] border-[var(--color-border)]',
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0 text-violet-500" style={{ marginTop: '4px' }}>
        <Icon />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[var(--color-heading)] truncate">{subject}</div>
        <div className="text-xs text-[var(--color-muted)]">{paper} · {year}{size ? ` · ${size}` : ''}</div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2">
        {status === 'pending' && (
          <Badge variant="outline" className="gap-1"><LuClock size={10} />Pending</Badge>
        )}
        {status === 'locked' && (
          <Badge variant="secondary" className="gap-1"><LuLock size={10} />Locked</Badge>
        )}
        {status === 'available' && (
          <Button variant="default" size="sm" onClick={onDownload}>
            <LuDownload size={13} /> Download
          </Button>
        )}
      </div>
    </div>
  )
}
