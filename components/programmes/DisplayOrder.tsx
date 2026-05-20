import type { DisplaySpec } from '../../lib/programmes'

export default function DisplayOrder({ displays }: { displays: DisplaySpec[] }) {
  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
      {displays.map((d) => (
        <li
          key={d.order}
          style={{
            display: 'grid',
            gridTemplateColumns: '36px 1fr',
            gap: '12px',
            alignItems: 'flex-start',
            padding: '12px 14px',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            background: 'var(--color-card-bg)',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#34d39922',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            ◢{d.order}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-heading)', fontSize: '0.98rem' }}>
              {d.labelZh ?? d.label}
              {d.labelZh && (
                <span style={{ marginLeft: '8px', color: 'var(--color-muted)', fontWeight: 500, fontSize: '0.85rem' }}>
                  ({d.label})
                </span>
              )}
            </div>
            <div style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--color-body)', lineHeight: 1.55 }}>
              {d.meaningZh ?? d.meaning}
            </div>
            {d.meaningZh && (
              <div style={{ marginTop: '2px', fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                {d.meaning}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
