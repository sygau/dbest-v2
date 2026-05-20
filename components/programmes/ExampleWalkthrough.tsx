import { useState } from 'react'
import type { Example } from '../../lib/programmes'

export default function ExampleWalkthrough({ examples }: { examples: Example[] }) {
  const [active, setActive] = useState(0)
  if (examples.length === 0) return null
  const ex = examples[active] ?? examples[0]

  return (
    <div>
      {examples.length > 1 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {examples.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              style={{
                padding: '6px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid var(--color-border)',
                borderRadius: '5px',
                background: i === active ? '#549ee8' : 'var(--color-card-bg)',
                color: i === active ? '#fff' : 'var(--color-body)',
                cursor: 'pointer',
              }}
            >
              例題 {i + 1}
            </button>
          ))}
        </div>
      )}

      <div
        className="ex-question-block"
        style={{
          padding: '14px 16px',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          marginBottom: '12px',
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--color-heading)', fontSize: '0.98rem', lineHeight: 1.5 }}>
          {ex.questionZh ?? ex.question}
        </div>
        {ex.questionZh && (
          <div style={{ marginTop: '4px', color: 'var(--color-muted)', fontSize: '0.88rem' }}>{ex.question}</div>
        )}
      </div>
      <style jsx>{`
        .ex-question-block { background: #ffffff; }
        :global([data-theme='dark']) .ex-question-block { background: var(--color-card-inner-bg); }
        :global([data-theme='blue']) .ex-question-block { background: var(--color-card-inner-bg); }
      `}</style>

      <div
        style={{
          overflowX: 'auto',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          background: 'var(--color-card-bg)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '480px' }}>
          <thead>
            <tr style={{ background: 'var(--color-card-inner-bg)' }}>
              <th style={thStyle}>按鍵 You press</th>
              <th style={thStyle}>顯示 Calculator shows</th>
              <th style={thStyle}>備註 Note</th>
            </tr>
          </thead>
          <tbody>
            {ex.steps.map((s, i) => (
              <tr key={i} style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, color: '#549ee8' }}>{s.press}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, color: '#10b981' }}>{s.display}</td>
                <td style={{ ...tdStyle, color: 'var(--color-muted)' }}>{s.note ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ex.finalNote && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 13px',
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderLeft: '3px solid #10b981',
            borderRadius: '4px',
            fontSize: '0.92rem',
            color: 'var(--color-body)',
            fontWeight: 600,
          }}
        >
          {ex.finalNote}
        </div>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 13px',
  fontSize: '0.78rem',
  fontWeight: 700,
  color: 'var(--color-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
}

const tdStyle: React.CSSProperties = {
  padding: '9px 13px',
  verticalAlign: 'top',
}
