import { useState, useCallback } from 'react'
import { Highlight, themes, type Language } from 'prism-react-renderer'
import { LuCopy } from 'react-icons/lu'

interface CodeBlockProps {
  code: string
  language?: Language
  filename?: string
  className?: string
}

export function CodeBlock({ code, language = 'tsx', filename, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  return (
    <div
      className={`rounded-lg overflow-hidden w-full ${className}`}
      style={{
        background: '#1e1e2e',
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          background: '#161622',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          minHeight: '2.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41', display: 'inline-block' }} />
          {filename && (
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
              {filename}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {language && (
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: '0.375rem',
              border: copied ? '1px solid rgba(74,222,128,0.4)' : '1px solid rgba(255,255,255,0.1)',
              background: copied ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)',
              color: copied ? '#4ade80' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s, border-color 0.15s, transform 0.06s ease',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'translateY(2px) scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = '')}
            onMouseLeave={e => (e.currentTarget.style.transform = '')}
          >
            <LuCopy size={12} />
          </button>
        </div>
      </div>

      {/* Code */}
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cls}
            style={{
              ...style,
              margin: 0,
              padding: '1rem 1.25rem',
              background: 'transparent',
              fontSize: '0.8125rem',
              lineHeight: 1.7,
              overflowX: 'auto',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} style={{ display: 'table-row' }}>
                <span
                  style={{
                    display: 'table-cell',
                    paddingRight: '1.5rem',
                    userSelect: 'none',
                    color: 'rgba(255,255,255,0.2)',
                    fontSize: '0.75rem',
                    textAlign: 'right',
                    minWidth: '2rem',
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ display: 'table-cell' }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
