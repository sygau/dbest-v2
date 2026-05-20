import { useState } from 'react'
import { LuCopy, LuCheck } from 'react-icons/lu'
import { tokensToInline, type Token } from '../../lib/programmes'

export default function InlineCode({ tokens, bytes }: { tokens: Token[]; bytes: number }) {
  const text = tokensToInline(tokens)
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        background: 'var(--color-card-inner-bg)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-card-bg)',
          fontSize: '0.85rem',
        }}
      >
        <span style={{ fontWeight: 700, color: 'var(--color-heading)' }}>程式 ({bytes} bytes)</span>
        <button
          type="button"
          onClick={copy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: '1px solid var(--color-border)',
            background: 'var(--color-card-bg)',
            color: 'var(--color-body)',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {copied ? <LuCheck size={13} /> : <LuCopy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '14px 16px',
          fontFamily: '\'JetBrains Mono\', \'SF Mono\', Menlo, Consolas, monospace',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--color-body)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {text}
      </pre>
    </div>
  )
}
