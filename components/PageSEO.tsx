import Head from 'next/head'
import { subjectJsonLd } from '../data/jsonld/subjects'
import { pageJsonLd } from '../data/jsonld/pages'
import { subjectFaqs } from '../data/faqs/subjects'
import { pageFaqs } from '../data/faqs/pages'
import { buildFAQSchema } from '../utils/faqSchema'

export interface PageSEOProps {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  robots?: string | [string, string]
  canonical?: string
  /** Subject index pages — auto-loads subject JSON-LD + FAQ */
  subjectKey?: string
  /** Special pages (countdown, timer, etc.) — auto-loads page JSON-LD + FAQ */
  pageKey?: string
  /** Escape hatch for dynamic schemas (blog posts, year-slug pages, etc.) */
  jsonLd?: object[]
}

const SITE_LOGO = 'https://dse.best/assets/images/logo-icon.png'
const SITE_NAME = 'dse.best'

export default function PageSEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = SITE_LOGO,
  ogUrl,
  ogType = 'website',
  robots = ['index', 'follow'],
  canonical,
  subjectKey,
  pageKey,
  jsonLd = [],
}: PageSEOProps) {
  const robotsContent = Array.isArray(robots) ? robots.join(', ') : robots

  const schemas: object[] = []

  if (subjectKey) {
    const ld = subjectJsonLd[subjectKey]
    const faqs = subjectFaqs[subjectKey]
    if (ld) schemas.push(ld)
    if (faqs?.length) schemas.push(buildFAQSchema(faqs))
  } else if (pageKey) {
    const ld = pageJsonLd[pageKey]
    const faqs = pageFaqs[pageKey]
    if (ld) schemas.push(ld)
    if (faqs?.length) schemas.push(buildFAQSchema(faqs))
  }

  schemas.push(...jsonLd)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:description" content={ogDescription ?? description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />

      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  )
}
