import { useState } from 'react'
import { LuCopy, LuCheck, LuKeyboard, LuType } from 'react-icons/lu'
import { TOKEN_KIND_COLOR, type Token } from '../../lib/programmes'
import tokenMap from '../../data/programme-tokens.json'

type TokenMapEntry = { keys: string; label: string }
const TOKENS = tokenMap as Record<string, TokenMapEntry>

function entryFor(text: string): TokenMapEntry | null {
  return TOKENS[text] ?? null
}

export default function TokenGrid({ tokens }: { tokens: Token[] }) {
  const [showKeys, setShowKeys] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const active = activeIndex !== null ? tokens[activeIndex] : null
  const activeEntry = active ? entryFor(active.text) : null

  function copyAll() {
    const text = tokens.map((t) => t.text).join(' ')
    navigator.clipboard?.writeText(text)
    setCopiedAll(true)
    window.setTimeout(() => setCopiedAll(false), 1400)
  }

  return (
    <div style={{ marginTop: '8px' }}>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
          {tokens.length} tokens — tap any cell to see its key sequence
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setShowKeys((v) => !v)}
            style={toolbarBtn}
          >
            {showKeys ? <LuType size={14} /> : <LuKeyboard size={14} />}
            {showKeys ? 'Show tokens' : 'Show entry keys'}
          </button>
          <button type="button" onClick={copyAll} style={toolbarBtn}>
            {copiedAll ? <LuCheck size={14} /> : <LuCopy size={14} />}
            {copiedAll ? 'Copied' : 'Copy all'}
          </button>
        </div>
      </div>

      <div className="token-grid">
        {tokens.map((token, i) => {
          const entry = entryFor(token.text)
          const isActive = activeIndex === i
          const display = showKeys ? entry?.keys ?? token.text : token.text
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(isActive ? null : i)}
              className="token-cell"
              style={{
                color: TOKEN_KIND_COLOR[token.kind],
                borderColor: isActive ? TOKEN_KIND_COLOR[token.kind] : 'var(--color-border)',
                boxShadow: isActive ? `0 0 0 2px ${TOKEN_KIND_COLOR[token.kind]}55` : 'none',
              }}
            >
              <span className="token-num">{i + 1}</span>
              <span className="token-text">{display}</span>
            </button>
          )
        })}
      </div>

      {active && (
        <div
          style={{
            marginTop: '14px',
            padding: '12px 14px',
            border: `1px solid ${TOKEN_KIND_COLOR[active.kind]}55`,
            borderLeft: `4px solid ${TOKEN_KIND_COLOR[active.kind]}`,
            background: 'var(--color-card-inner-bg)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.15rem', color: TOKEN_KIND_COLOR[active.kind] }}>
              {active.text}
            </span>
            {activeEntry ? (
              <>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                  Press:{' '}
                  <code style={{ color: 'var(--color-body)', fontWeight: 600 }}>{activeEntry.keys}</code>
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-body)' }}>{activeEntry.label}</span>
              </>
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                Type the character directly.
              </span>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .token-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 6px;
        }
        @media (min-width: 600px) {
          .token-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 7px; }
        }
        @media (min-width: 992px) {
          .token-grid { grid-template-columns: repeat(9, minmax(0, 1fr)); gap: 8px; }
        }
        .token-cell {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6px 4px 8px;
          min-height: 52px;
          background: var(--color-card-inner-bg);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          cursor: pointer;
          font-family: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
        }
        :global([data-theme="light"]) .token-cell { background: var(--color-card-bg); }
        .token-cell:hover { filter: brightness(0.97); }
        .token-num {
          position: absolute;
          top: 2px;
          left: 5px;
          font-size: 0.62rem;
          color: var(--color-muted);
          font-weight: 600;
          font-family: inherit;
        }
        .token-text {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.1;
          word-break: break-all;
          text-align: center;
          margin-top: 6px;
        }
      `}</style>
    </div>
  )
}

const toolbarBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 11px',
  fontSize: '0.8rem',
  fontWeight: 600,
  border: '1px solid var(--color-border)',
  background: 'var(--color-card-bg)',
  color: 'var(--color-body)',
  borderRadius: '6px',
  cursor: 'pointer',
}
