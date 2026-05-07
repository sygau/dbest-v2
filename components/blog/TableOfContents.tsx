import { LuList } from 'react-icons/lu'
import type { TocItem } from '../../lib/tocUtils'

interface Props {
  items: TocItem[]
}

export default function TableOfContents({ items }: Props) {
  if (!items.length) return null

  const minLevel = Math.min(...items.map((i) => i.level))

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <nav
      className="rounded-xl mb-6 overflow-hidden"
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
      }}
      aria-label="Table of Contents"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 pt-3 pb-2"
        style={{ borderBottom: '2px solid var(--color-border)' }}
      >
        <LuList size={15} strokeWidth={2.5} style={{ color: 'var(--color-heading, inherit)', flexShrink: 0 }} />
        <span className="font-bold text-sm" style={{ color: 'var(--color-heading, inherit)' }}>
          目錄{' '}
          <span className="font-medium text-xs" style={{ color: 'var(--color-muted, #6c757d)' }}>
            Table of Contents
          </span>
        </span>
      </div>

      {/* Items */}
      <ol className="list-none p-0 m-0 px-2 py-2 space-y-0.5">
        {items.map((item) => {
          const paddingLeft = 20 + (item.level - minLevel) * 10
          const prefix = item.level >= 3 ? '— ' : ''
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.id)
                }}
                className="block py-1 no-underline transition-colors duration-150 hover:bg-sky-500/10 hover:text-sky-500"
                style={{
                  paddingLeft: `${paddingLeft}px`,
                  paddingRight: '8px',
                  fontSize: item.level <= 2 ? '0.875rem' : '0.82rem',
                  color: 'var(--color-body, inherit)',
                }}
              >
                {prefix}{item.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
