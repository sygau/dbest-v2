import NavigationLink from '../NavigationLink'
import { SUBJECT_META, DIFFICULTY_META, maxBytesForModels, type Programme } from '../../lib/programmes'

export default function ProgrammeCard({ p }: { p: Programme }) {
  const diff = DIFFICULTY_META[p.difficulty]
  const cap = maxBytesForModels(p.models)
  const pct = Math.min(100, Math.round((p.bytes / cap) * 100))
  const primarySubject = p.subjects[0]
  const subjColor = SUBJECT_META[primarySubject].color
  const desc = p.descriptionZh ?? p.description

  return (
    <NavigationLink
      href={`/calculator-programmes/${p.slug}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        height: '100%',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: diff.color,
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '3px',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          zIndex: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        }}
      >
        {diff.label}
      </span>

      <div
        style={{
          padding: '24px 18px',
          background: `linear-gradient(135deg, ${subjColor}26, ${subjColor}0d)`,
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '78px',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 800,
            fontSize: '1.8rem',
            color: subjColor,
          }}
        >
          {p.glyph ?? 'fx'}
        </span>
      </div>

      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
          }}
        >
          {p.subjects.map((s) => {
            const meta = SUBJECT_META[s]
            return (
              <span
                key={s}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: meta.color,
                  borderRadius: '3px',
                  padding: '2px 7px',
                }}
              >
                {meta.en}
              </span>
            )
          })}
        </div>

        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '1.05rem',
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'var(--color-heading)',
            }}
          >
            {p.titleZh ?? p.title}
          </h3>
          {p.titleZh && (
            <div style={{ color: 'var(--color-muted)', fontSize: '0.82rem', marginTop: '2px', lineHeight: 1.3 }}>
              {p.title}
            </div>
          )}
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '0.82rem',
            color: 'var(--color-body)',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc}
        </p>

        <div style={{ paddingTop: '10px', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--color-muted)',
              marginBottom: '4px',
            }}
          >
            <span>{p.bytes} / {cap} bytes</span>
            <span>{p.models.length} models</span>
          </div>
          <div
            style={{
              height: '5px',
              background: 'var(--color-border)',
              borderRadius: '99px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: '100%',
                background: pct > 80 ? '#dc2626' : pct > 50 ? '#f59e0b' : '#10b981',
              }}
            />
          </div>
        </div>
      </div>
    </NavigationLink>
  )
}
