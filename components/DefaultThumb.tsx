import React, { useMemo } from 'react'

type DefaultThumbProps = {
  title: string
  subtitle?: string
  color?: string
}

function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

function splitIntoLines(text: string, charsPerLine: number, maxLines: number) {
  const chars = Array.from(text || '')
  const lines: string[] = []

  for (let i = 0; i < chars.length && lines.length < maxLines; i += charsPerLine) {
    lines.push(chars.slice(i, i + charsPerLine).join(''))
  }

  const usedChars = lines.join('').length
  const hasMore = usedChars < chars.length

  if (hasMore && lines.length > 0) {
    const last = Array.from(lines[lines.length - 1])
    if (last.length > 0) {
      last[last.length - 1] = '…'
      lines[lines.length - 1] = last.join('')
    } else {
      lines[lines.length - 1] = '…'
    }
  }

  return lines
}

export default function DefaultThumb({ title, subtitle, color = '#5b5fc7' }: DefaultThumbProps) {
  const titleLines = useMemo(() => splitIntoLines(title, 16, 2), [title])
  const safeSubtitle = useMemo(() => (subtitle ? truncate(subtitle, 18) : ''), [subtitle])

  return (
    <svg
      viewBox="0 0 1200 750"
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
        </linearGradient>
      </defs>

      <rect width="1200" height="750" fill="url(#bg)" />
      <rect x="-150" y="0" width="450" height="750" fill="url(#shine)" transform="skewX(-12)" opacity="0.6" />

      <circle cx="1020" cy="140" r="220" fill="#ffffff" opacity="0.10" />
      <circle cx="1045" cy="160" r="150" fill="#ffffff" opacity="0.07" />

      <text
        x="72"
        y="150"
        fill="#ffffff"
        opacity="0.95"
        fontSize="44"
        fontWeight="700"
        fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
      >
        {safeSubtitle || 'DSE.BEST'}
      </text>

      <text
        x="72"
        y="250"
        fill="#ffffff"
        opacity="0.96"
        fontSize="64"
        fontWeight="800"
        letterSpacing="-0.5"
        fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
      >
        {(titleLines.length ? titleLines : ['']).map((line, i) => (
          <tspan key={i} x="72" dy={i === 0 ? 0 : 76}>
            {line}
          </tspan>
        ))}
      </text>

      <text
        x="72"
        y="330"
        fill="#ffffff"
        opacity="0.88"
        fontSize="32"
        fontWeight="500"
        fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
      >
        {'blog · dse.best'}
      </text>

      <rect x="72" y="390" width="160" height="10" rx="5" fill="#ffffff" opacity="0.85" />
    </svg>
  )
}
