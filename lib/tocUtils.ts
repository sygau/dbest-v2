import type { PortableTextBlock } from '@portabletext/types'

export interface TocItem {
  id: string
  text: string
  level: number
}

export function createHeadingIdGenerator() {
  const counts = new Map<string, number>()
  return function generate(text: string): string {
    const base =
      text
        .toLowerCase()
        .replace(/[^a-z0-9一-龥]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'heading'
    const n = counts.get(base) ?? 0
    counts.set(base, n + 1)
    return n === 0 ? base : `${base}-${n}`
  }
}

export function extractTocFromBody(body: PortableTextBlock[]): TocItem[] {
  const gen = createHeadingIdGenerator()
  const items: TocItem[] = []
  for (const block of body) {
    if (block._type !== 'block') continue
    const style = (block as any).style as string | undefined
    if (!style || !['h1', 'h2', 'h3', 'h4'].includes(style)) continue
    const text =
      ((block as any).children as any[] | undefined)
        ?.map((c) => c.text ?? '')
        .join('')
        .trim() ?? ''
    if (!text) continue
    items.push({ id: gen(text), text, level: parseInt(style[1]) })
  }
  return items
}
