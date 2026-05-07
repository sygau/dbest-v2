import React, { useMemo } from 'react'

// ─── TWEAK THESE ──────────────────────────────────────────────────
const FONT_SIZE = 60          // title font size (was 64)
const LINE_HEIGHT = 68        // px between title lines
const CHARS_PER_LINE = 18     // CJK-width units per line before wrap
const MAX_LINES = 4          // max title lines
const SUBTITLE_MAX_CHARS = 35 // chars before subtitle truncates
// ──────────────────────────────────────────────────────────────────

type __DefaultThumbProps__ = {
  title: string
  subtitle?: string
  color?: string
  id?: string
}

function getCharWidth(ch: string): number {
  if (/[\u1100-\u115f\u2e80-\u9fff\ua960-\ua97f\uac00-\ud7ff\uf900-\ufaff\ufe10-\ufe1f\ufe30-\ufe6f\uff01-\uff60\uffe0-\uffe6]/.test(ch)) {
    return 1.0
  }
  return 0.55
}

function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

function splitIntoLines(text: string, maxWidth: number, maxLines: number): string[] {
  if (!text) return []

  const tokens: string[] = []
  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (getCharWidth(ch) === 1.0) {
      tokens.push(ch)
      i++
    } else {
      let j = i
      while (j < text.length && getCharWidth(text[j]) < 1.0) j++
      const segment = text.slice(i, j)
      segment.split(/(?<=\s)|(?=\s)/).forEach(t => { if (t) tokens.push(t) })
      i = j
    }
  }

  const lines: string[] = []
  let currentLine = ''
  let currentWidth = 0

  for (const token of tokens) {
    if (lines.length >= maxLines) break
    const tokenWidth = Array.from(token).reduce((sum, ch) => sum + getCharWidth(ch), 0)
    if (currentLine === '' || currentWidth + tokenWidth <= maxWidth) {
      currentLine += token
      currentWidth += tokenWidth
    } else {
      lines.push(currentLine.trim())
      const trimmed = token.trimStart()
      currentLine = trimmed
      currentWidth = Array.from(trimmed).reduce((sum, ch) => sum + getCharWidth(ch), 0)
    }
  }

  if (currentLine.trim() && lines.length < maxLines) {
    lines.push(currentLine.trim())
  }

  const consumed = lines.reduce((n, l) => n + Array.from(l).length, 0)
  const hasMore = consumed < Array.from(text).length
  if (hasMore && lines.length > 0) {
    const last = Array.from(lines[lines.length - 1])
    last[last.length - 1] = '…'
    lines[lines.length - 1] = last.join('')
  }

  return lines
}

export default function DefaultThumb({ title, subtitle, color = '#549ee8', id = 'thumb' }: __DefaultThumbProps__) {
  const titleLines = useMemo(() => splitIntoLines(title, CHARS_PER_LINE, MAX_LINES), [title])
  const safeSubtitle = useMemo(() => (subtitle ? truncate(subtitle, SUBTITLE_MAX_CHARS) : ''), [subtitle])
  const bgId = `bg-${id}`
  const shineId = `shine-${id}`

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
        <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <rect width="1200" height="750" fill={`url(#${bgId})`} />
      <rect x="-150" y="0" width="450" height="750" fill={`url(#${shineId})`} transform="skewX(-12)" opacity="0.6" />
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
      </text>
      <text
        x="72"
        y="270"
        fill="#ffffff"
        opacity="0.96"
        fontSize={FONT_SIZE}
        fontWeight="800"
        letterSpacing="-0.5"
        fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
      >
        {(titleLines.length ? titleLines : ['']).map((line, i) => (
          <tspan key={i} x="72" dy={i === 0 ? 0 : LINE_HEIGHT}>
            {line}
          </tspan>
        ))}
      </text>
      <text
        x="72"
        y="600"
        fill="#ffffff"
        opacity="1"
        fontSize="45"
        fontWeight="500"
        fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
      >
        {'dse.best/blog'}
      </text>
    </svg>
  )
}