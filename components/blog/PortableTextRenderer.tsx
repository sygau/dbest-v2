import { useMemo, Fragment } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import dynamic from 'next/dynamic'

const BlogInArticleAd = dynamic(() => import('./BlogInArticleAd'), { ssr: false })

// Place ads BEFORE H2 or H3 headings. Rules:
// - Skip first 12% of blocks (warm-up)
// - Min 4 blocks between ads
// - Max 5 ads per post
// - Don't inject within last 2 blocks
// - Post must have at least 6 blocks total
// - Prefer H2 over H3 (H3 only used if no H2 available in range)
function computeAdBreaks(blocks: PortableTextBlock[]): number[] {
  const total = blocks.length
  if (total < 6) return []
  const warmupEnd = Math.ceil(total * 0.12)
  const MIN_GAP = 4
  const MAX_ADS = 3
  const breaks: number[] = []
  let lastIdx = -MIN_GAP
  let skippedFirstHeading = false

  for (let i = warmupEnd; i <= total - 3; i++) {
    if (breaks.length >= MAX_ADS) break
    const b = blocks[i] as any
    if (b._type !== 'block') continue
    if (b.style !== 'h2' && b.style !== 'h3') continue

    // never place an ad directly above the first heading in the post
    if (!skippedFirstHeading) {
      skippedFirstHeading = true
      continue
    }

    if (i - lastIdx < MIN_GAP) continue
    breaks.push(i)   // split BEFORE the heading — ad shows, THEN heading + its content
    lastIdx = i
  }
  return breaks
}
import katex from 'katex'
import { createHeadingIdGenerator } from '../../lib/tocUtils'
import { LuExternalLink, LuInfo, LuCircleCheck, LuTriangleAlert, LuCircleX } from 'react-icons/lu'
import { urlFor } from '../../lib/sanity'
import { Separator } from '../ui/Separator'
import { CodeBlock } from '../ui/CodeBlock'
import { ButtonAnchor } from '../ui/ButtonAnchor'
import { RichTableRenderer } from './RichTableRenderer'
import { Alert, AlertTitle, AlertDescription } from '../ui/Alert'

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0]
    if (u.hostname.includes('youtube.com')) {
      if (u.searchParams.get('v')) return u.searchParams.get('v')
      const m = u.pathname.match(/\/embed\/([^/?]+)/)
      if (m) return m[1]
    }
  } catch {}
  return null
}

const ALERT_META: Record<string, { icon: React.ReactNode; variant: any }> = {
  info:        { icon: <LuInfo size={15} style={{ color: '#0369a1' }} />,        variant: 'default'     },
  success:     { icon: <LuCircleCheck size={15} className="text-green-500" />,   variant: 'success'     },
  warning:     { icon: <LuTriangleAlert size={15} className="text-amber-600" />, variant: 'warning'     },
  destructive: { icon: <LuCircleX size={15} className="text-red-500" />,         variant: 'destructive' },
}

function renderLatex(body: string, displayMode: boolean) {
  return katex.renderToString(body || '', {
    displayMode,
    throwOnError: false,
    output: 'html',
    strict: 'ignore',
  })
}

function Latex({ value, isInline }: any) {
  if (isInline) {
    return (
      <span
        className="blog-math-inline"
        dangerouslySetInnerHTML={{ __html: renderLatex(value?.body ?? '', false) }}
      />
    )
  }
  return (
    <div
      className="blog-math-block"
      dangerouslySetInnerHTML={{ __html: renderLatex(value?.body ?? '', true) }}
    />
  )
}

function normalBlock({ value, children }: any) {
  const text = value.children?.map((c: any) => c.text ?? '').join('').trim()
  if (text === '---') return <hr />
  return <p>{children}</p>
}

const components: PortableTextComponents = {
  block: {
    normal: normalBlock,
  },
  types: {
    latex: Latex,

    image: ({ value }: any) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(1000).format('webp').auto('format').url()
      return (
        <figure>
          <div className="blog-figure-wrap">
            <img
              src={src}
              alt={value.alt || ''}
              loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },

    code: ({ value }: any) => (
      <CodeBlock
        code={value?.code ?? ''}
        language={value?.language}
        filename={value?.filename}
      />
    ),

    separator: () => <Separator className="my-6" />,

    table: ({ value }: any) => <RichTableRenderer value={value} />,

    blogButton: ({ value }: any) => {
      if (!value?.href || !value?.label) return null
      const isLinkout = value.variant === 'linkout'
      const resolvedVariant = isLinkout ? 'info' : (value.variant || 'default')
      const isExternal =
        isLinkout ||
        (/^https?:\/\//.test(value.href) && !value.href.includes('dse.best'))
      return (
        <ButtonAnchor
          href={value.href}
          variant={resolvedVariant}
          size="md"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {value.label}
          {isLinkout && <LuExternalLink size={14} />}
        </ButtonAnchor>
      )
    },

    youtubeEmbed: ({ value }: any) => {
      const id = value?.url ? extractYouTubeId(value.url) : null
      if (!id) return null
      return (
        <div className="blog-yt-wrap">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={value.caption || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="blog-yt-iframe"
          />
          {value.caption && (
            <p className="blog-yt-caption">{value.caption}</p>
          )}
        </div>
      )
    },

    blogAlert: ({ value }: any) => {
      if (!value?.description && !value?.title) return null
      const meta = ALERT_META[value.variant] ?? ALERT_META.info
      return (
        <Alert variant={meta.variant} className="blog-alert my-5">
          {value.title && (
            <AlertTitle icon={meta.icon}>{value.title}</AlertTitle>
          )}
          {value.description && (
            <AlertDescription>{value.description}</AlertDescription>
          )}
        </Alert>
      )
    },
  },

  marks: {
    'strike-through': ({ children }: any) => <s>{children}</s>,
    link: ({ value, children }: any) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//.test(href) && !href.includes('dse.best')
      return (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

function makeHeadingComp(Tag: 'h1' | 'h2' | 'h3' | 'h4', keyToId: Map<string, string>) {
  return ({ children, value }: any) => {
    const id = keyToId.get(value?._key)
    return (
      <Tag id={id} style={{ scrollMarginTop: '110px' }}>
        {children}
      </Tag>
    )
  }
}

export default function PortableTextRenderer({
  value,
  showToc = false,
  loadAds = false,
}: {
  value: PortableTextBlock[]
  showToc?: boolean
  loadAds?: boolean
}) {
  const keyToId = useMemo(() => {
    const gen = createHeadingIdGenerator()
    const map = new Map<string, string>()
    for (const block of value) {
      if ((block as any)._type !== 'block') continue
      const style = (block as any).style as string | undefined
      if (!style || !['h1', 'h2', 'h3', 'h4'].includes(style)) continue
      const text = ((block as any).children as any[] | undefined)
        ?.map((c) => c.text ?? '').join('').trim() ?? ''
      if (text) map.set((block as any)._key, gen(text))
    }
    return map
  }, [value])

  if (!value?.length) return null

  const activeComponents: PortableTextComponents = showToc
    ? {
        ...components,
        block: {
          normal: normalBlock,
          h1: makeHeadingComp('h1', keyToId),
          h2: makeHeadingComp('h2', keyToId),
          h3: makeHeadingComp('h3', keyToId),
          h4: makeHeadingComp('h4', keyToId),
        },
      }
    : components

  const adBreaks = loadAds ? computeAdBreaks(value) : []

  if (adBreaks.length === 0) {
    return <PortableText value={value} components={activeComponents} />
  }

  // Split blocks into segments around break points, inject ads between
  const segments: PortableTextBlock[][] = []
  let prev = 0
  for (const breakIdx of adBreaks) {
    segments.push(value.slice(prev, breakIdx))
    prev = breakIdx
  }
  segments.push(value.slice(prev))

  return (
    <>
      {segments.map((seg, i) => (
        <Fragment key={i}>
          {seg.length > 0 && <PortableText value={seg} components={activeComponents} />}
          {i < segments.length - 1 && <BlogInArticleAd />}
        </Fragment>
      ))}
    </>
  )
}
