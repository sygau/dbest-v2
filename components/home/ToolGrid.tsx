import NavigationLink from '../NavigationLink'
import { tools } from './toolsData'

/* translucent repeating pattern — one distinct motif per card */
function CardPattern({ index, accent }: { index: number; accent: string }) {
  const id = `tg-pat-${index}`
  let tile = null
  let size = 20
  let opacity = 0.12

  if (index === 0) {
    // dots
    size = 18
    tile = <circle cx="4" cy="4" r="2" fill={accent} />
  } else if (index === 1) {
    // horizontal lines — low density
    size = 26
    opacity = 0.07
    tile = <path d="M0 13 H26" stroke={accent} strokeWidth="2" />
  } else if (index === 2) {
    // grid
    size = 20
    tile = <path d={`M${size} 0 H0 V${size}`} fill="none" stroke={accent} strokeWidth="1.5" />
  } else if (index === 3) {
    // asterisks for the blog redirect card (more transparent)
    size = 22
    opacity = 0.06
    tile = (
      <path
        d="M11 4 V18 M5.5 7 L16.5 15 M16.5 7 L5.5 15"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
    )
  } else {
    // asterisks fallback for any extra tiles
    size = 22
    opacity = 0.13
    tile = (
      <path
        d="M11 4 V18 M5.5 7 L16.5 15 M16.5 7 L5.5 15"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
    )
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          {tile}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export default function ToolGrid() {
  return (
    <section>
      <div className="text-center mb-7">
        <h2
          className="font-bold m-0"
          style={{ color: 'var(--color-heading)', fontSize: 'clamp(2.2rem, 6.5vw, 3.1rem)' }}
        >
          學習工具
        </h2>
        <p className="text-base sm:text-lg mt-2 m-0" style={{ color: 'var(--color-secondary)' }}>
          由備戰到放榜，常用工具一鍵直達
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tools.map((t, i) => {
          const { Icon } = t
          return (
            <NavigationLink
              key={t.href}
              href={t.href}
              className="relative block overflow-hidden text-left rounded-2xl p-4 sm:p-5"
              style={{
                background: 'var(--color-card-bg)',
                border: `2px solid ${t.accent}3d`,
                boxShadow: `0 6px 0 0 ${t.accent}`,
                textDecoration: 'none',
                marginBottom: 6,
              }}
            >
              <CardPattern index={i} accent={t.accent} />

              <div className="relative">
                <Icon style={{ color: t.accent, fontSize: 38 }} />
                <h3
                  className="font-bold text-base mt-3.5 mb-1.5"
                  style={{ color: 'var(--color-heading)' }}
                >
                  {t.zh}
                </h3>
                <p
                  className="m-0"
                  style={{ color: 'var(--color-secondary)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}
                >
                  {t.blurb}
                </p>
              </div>
            </NavigationLink>
          )
        })}
      </div>
    </section>
  )
}
