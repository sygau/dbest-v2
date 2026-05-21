import { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import PageSEO from '../../components/PageSEO'
import NavigationLink from '../../components/NavigationLink'
import { Badge } from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import {
  LuShare2, LuCalendar, LuClock, LuEye, LuList,
} from 'react-icons/lu'
import { BiCalendar, BiUser } from 'react-icons/bi'
import { sanityClient, urlFor } from '../../lib/sanity'
import {
  POST_SLUGS_QUERY,
  POST_BY_SLUG_QUERY,
  RELATED_BY_CATEGORY_QUERY,
  RELATED_LATEST_QUERY,
} from '../../lib/sanityQueries'
import type { PostFull, RelatedPost } from '../../lib/blogTypes'
import PortableTextRenderer from '../../components/blog/PortableTextRenderer'
import AuthorCardBottom from '../../components/blog/AuthorCardBottom'
import { tagColor } from '../../lib/tagColor'
import { CatIcon } from '../../lib/catIcon'
import { useViewCount } from '../../hooks/useViewCount'
import { extractTocFromBody, type TocItem } from '../../lib/tocUtils'
import TableOfContents from '../../components/blog/TableOfContents'

interface BlogPostProps {
  post: PostFull
  related: RelatedPost[]
  tocItems: TocItem[]
}

function formatDate(d?: string) {
  if (!d) return ''
  const date = new Date(d)
  return date.toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatShortDate(d?: string) {
  if (!d) return ''
  const date = new Date(d)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yy = String(date.getFullYear()).slice(2)
  return `${dd}/${mm}/${yy}`
}

export default function BlogPost({ post, related, tocItems }: BlogPostProps) {
  const [copied, setCopied] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const slug = post.slug.current
  const { viewCount, isLoading: viewsLoading } = useViewCount(slug)

  const effectiveDate = post.publishedAt || post._createdAt
  const author = post.author
  const hasAuthor = author && author.mode !== 'disabled' && author.displayName

  const heroSrc = post.heroImage?.asset
    ? urlFor(post.heroImage).width(1200).format('webp').auto('format').url()
    : null

  const coverOgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).format('webp').url()
    : `https://dse.best/og/${slug}.png`

  const authorAvatarSm = author?.avatar?.asset
    ? urlFor(author.avatar).width(80).height(80).format('webp').url()
    : null
  const authorInitial = (hasAuthor && author?.displayName) ? author.displayName.slice(0, 1).toUpperCase() : '?'

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  // Active heading tracking for mobile ToC
  useEffect(() => {
    if (!tocItems.length) return
    let raf: number | null = null
    let last = ''
    const update = () => {
      let active = ''
      for (let i = tocItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(tocItems[i].id)
        if (el && el.getBoundingClientRect().top <= 200) { active = tocItems[i].id; break }
      }
      if (active !== last) { last = active; setActiveId(active) }
    }
    const onScroll = () => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [tocItems])

  // Click-outside to close mobile ToC panel
  useEffect(() => {
    if (!mobileTocOpen) return
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('.toc-mobile-panel') && !t.closest('.mobile-toc-toggle')) setMobileTocOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileTocOpen])

  const minTocLevel = tocItems.length > 0 ? Math.min(...tocItems.map((i) => i.level)) : 2

  const seoTitle = post.seoTitle || post.title
  const seoDesc = post.seoDescription || post.excerpt || ''
  const catColor = post.category?.color || '#549ee8'

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitle,
    description: seoDesc,
    image: coverOgSrc,
    datePublished: effectiveDate,
    dateModified: effectiveDate,
    author: hasAuthor
      ? { '@type': 'Person', name: author!.displayName }
      : { '@type': 'Organization', name: 'dse.best' },
    publisher: {
      '@type': 'Organization',
      name: 'dse.best',
      logo: { '@type': 'ImageObject', url: 'https://dse.best/assets/images/logo-icon.webp' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dse.best/blog/${slug}`,
    },
  }

  return (
    <>
      <PageSEO
        title={seoTitle}
        description={seoDesc}
        ogTitle={seoTitle}
        ogDescription={seoDesc}
        ogImage={coverOgSrc}
        ogUrl={`https://dse.best/blog/${slug}`}
        robots={post.noIndex ? ['noindex', 'nofollow'] : ['index', 'follow']}
        jsonLd={[blogPostingJsonLd]}
      />

      {post.noIndex && (
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
      )}

      {post.hasMath && (
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
            crossOrigin="anonymous"
          />
        </Head>
      )}

      <div className="blog-post-wrap">
        {/* Category + Tags + Share (desktop only) */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {post.category && (
            <Badge
              variant="default"
              className="text-[0.8rem] font-medium inline-flex items-center gap-1"
              style={{ background: catColor, color: '#fff', borderColor: catColor }}
            >
              <CatIcon name={post.category.lucideIcon} size={12} />
              {post.category.title}
            </Badge>
          )}
          {post.tags?.map((tag) => {
            const c = tagColor(catColor, tag)
            return (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[0.8rem] font-medium"
                style={{ background: c, color: '#fff', borderColor: c }}
              >
                {tag}
              </Badge>
            )
          })}
          <button
            className={`blog-share-btn ml-auto${copied ? ' blog-share-btn--success' : ''}`}
            onClick={handleShare}
            aria-label="分享文章"
          >
            <LuShare2 size={14} />
            <span className="blog-share-text">{copied ? '已複製' : '分享'}</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="blog-post-title">{post.title}</h1>

        {/* Author mini + post stats */}
        <div className="blog-author-mini">
          {hasAuthor && (
            authorAvatarSm ? (
              <img
                src={authorAvatarSm}
                alt={author!.displayName!}
                className="blog-avatar-sm"
                width={40}
                height={40}
              />
            ) : (
              <span style={{
                width: '40px', height: '40px', borderRadius: '9999px',
                background: 'rgba(139,92,246,0.15)', color: '#8b5cf6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: 700, flexShrink: 0,
                border: '1.5px solid var(--color-border)',
              }}>
                {authorInitial}
              </span>
            )
          )}
          {hasAuthor && (
            <div>
              <div className="blog-author-name">{author!.displayName}</div>
              {author!.tagline && (
                <div className="blog-author-tagline">{author!.tagline}</div>
              )}
            </div>
          )}
          <div className="blog-post-meta" style={{ marginTop: author?.tagline ? '0.7rem' : '0' }}>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <LuCalendar size={13} className="translate-y-[1.2px]" />
              <span>{formatDate(effectiveDate)}</span>
            </div>
            {post.readingTime && (
              <>
                <span className="blog-meta-sep">·</span>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <LuClock size={13} className="translate-y-[1.6px]" />
                  <span>{post.readingTime}min</span>
                </div>
              </>
            )}
            {post.showViews && (
              <>
                <span className="blog-meta-sep">·</span>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <LuEye size={13} className="translate-y-[1.5px]" />
                  <span>
                    {viewsLoading ? '…' : (viewCount ?? 0).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hero Image (only if heroImage set; no fallback to coverImage) */}
        {heroSrc && (
          <div className="blog-hero-wrap">
            {!heroLoaded && (
              <Skeleton className="absolute inset-0 rounded-none w-full h-full" />
            )}
            <img
              src={heroSrc}
              alt={post.heroImageAlt || post.title}
              className={`blog-hero-image${heroLoaded ? '' : ' blog-img-hidden'}`}
              width={1200}
              height={525}
              onLoad={() => setHeroLoaded(true)}
            />
          </div>
        )}

        {/* Desktop Table of Contents — after hero, before body */}
        {tocItems.length > 0 && (
          <div className="hidden lg:block print:!hidden">
            <TableOfContents items={tocItems} />
          </div>
        )}

        {/* Body */}
        <div className="blog-prose">
          {post.body ? (
            <PortableTextRenderer value={post.body} showToc={!!post.showToc} />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        {/* Bottom Author Card */}
        {hasAuthor && <AuthorCardBottom author={author!} />}

        {/* Mobile Share Button */}
        <button
          onClick={handleShare}
          className="hidden max-sm:flex print:!hidden items-center justify-center gap-2 rounded-xl font-bold transition-none cursor-pointer w-full h-11 px-8 text-sm mt-4 bg-violet-500 text-white border-2 border-violet-600 shadow-[0_4px_0_0] shadow-violet-700 active:translate-y-[2px] active:shadow-[0_2px_0_0]"
          aria-label="分享文章"
        >
          <LuShare2 size={16} />
          <span>{copied ? '已複製' : '分享文章'}</span>
        </button>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="blog-related-section" style={{ marginLeft: 'calc(-50vw + 50%)' , marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)' , paddingRight: 'calc(50vw - 50%)' }}>
            <h2 className="blog-related-title">相關文章</h2>
            <div className="blog-related-grid">
              {related.map((rp) => {
                const rpCover = rp.coverImage?.asset
                  ? urlFor(rp.coverImage).width(600).height(338).format('webp').url()
                  : null
                const rpOgSrc = `https://dse.best/og/${rp.slug.current}.png`
                const rpCat = rp.category?.title || '其他'
                const rpCatColor = rp.category?.color || '#549ee8'
                const rpDate = rp.publishedAt || rp._createdAt
                return (
                  <NavigationLink
                    key={rp._id}
                    href={`/blog/${rp.slug.current}`}
                    className="blog-related-card"
                  >
                    <div className="blog-related-img-wrap">
                      <img
                        src={rpCover || rpOgSrc}
                        alt={rp.title}
                        className="blog-related-img"
                        width={600}
                        height={338}
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-related-body">
                      <div className="blog-related-top">
                        <div
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border-transparent text-white text-[0.7rem] font-medium mb-1.5"
                          style={{ background: rpCatColor }}
                        >
                          <CatIcon name={rp.category?.lucideIcon} size={10} />
                          {rpCat}
                        </div>
                        <div className="blog-related-card-title">{rp.title}</div>
                        {rp.excerpt && (
                          <div className="blog-related-excerpt">{rp.excerpt}</div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3.5 mt-2 text-xs text-[var(--color-muted)]">
                          {rpDate && (
                            <div className="flex items-center gap-1.5">
                              <BiCalendar size={12} style={{ marginTop: '2.2px' }} />
                              <span>{formatShortDate(rpDate)}</span>
                            </div>
                          )}
                          {rp.readingTime && (
                            <div className="flex items-center gap-1.5">
                              <LuClock size={11} style={{ marginTop: '2.2px' }} />
                              <span>{rp.readingTime}m</span>
                            </div>
                          )}
                        </div>
                        {rp.author?.displayName && (
                          <>
                            <div style={{ height: '1px', background: 'var(--color-border)', margin: '6px 0 5px' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-muted)' }}>
                              {rp.author.avatarUrl ? (
                                <img
                                  src={rp.author.avatarUrl}
                                  width={16}
                                  height={16}
                                  style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                                  alt=""
                                />
                              ) : (
                                <BiUser size={13} style={{ flexShrink: 0, opacity: 0.7 }} />
                              )}
                              <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{rp.author.displayName}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </NavigationLink>
                )
              })}
            </div>
            <NavigationLink
              href="/blog"
              className="flex items-center justify-center gap-2 rounded-xl font-bold transition-none cursor-pointer w-full h-11 px-8 text-sm mt-4 no-underline bg-sky-500 text-white border-2  shadow-[0_4px_0_0] border-sky-600 shadow-sky-700 active:translate-y-[2px] active:shadow-[0_2px_0_0]"
            >
              查看所有文章
            </NavigationLink>
          </div>
        )}
      </div>

      {/* Mobile ToC — fixed floating button + panel, hidden on lg+ */}
      {tocItems.length > 0 && (
        <>
          <Head>
            <style>{`
              .mobile-toc-toggle {
                position: fixed;
                bottom: 22px;
                left: 22px;
                width: 45px;
                height: 45px;
                padding: 0;
                border-radius: 12px;
                font-size: 18px;
                box-shadow: 0 4px 12px rgba(0,0,0,.15);
                z-index: 999;
                transition: all 0.3s ease;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                color: var(--color-body, #fff);
                border: 1px solid rgba(255,255,255,0.2);
                align-items: center;
                justify-content: center;
                cursor: pointer;
                display: none;
              }
              .mobile-toc-toggle:hover { background: rgba(255,255,255,0.2); }
              @media (max-width: 991px) {
                .mobile-toc-toggle { display: flex !important; }
              }
              [data-theme="light"] .mobile-toc-toggle {
                background: rgba(0,0,0,0.1);
                border-color: rgba(0,0,0,0.2);
                color: #333333;
              }
              [data-theme="light"] .mobile-toc-toggle:hover { background: rgba(0,0,0,0.18); }
              [data-theme="blue"] .mobile-toc-toggle {
                background: rgba(255,255,255,0.15);
                border-color: rgba(255,255,255,0.3);
                color: #fff;
              }
              [data-theme="blue"] .mobile-toc-toggle:hover { background: rgba(255,255,255,0.25); }
            `}</style>
          </Head>

          {/* Floating toggle button */}
          <button
            className="mobile-toc-toggle"
            onClick={() => setMobileTocOpen((o) => !o)}
            aria-label="目錄 Table of Contents"
          >
            <LuList size={20} />
          </button>

          {/* Panel */}
          <div
            className="toc-mobile-panel fixed bottom-[76px] left-4 z-[1000] flex-col overflow-hidden rounded-2xl transition-opacity duration-200"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 'min(300px, calc(100vw - 32px))',
              maxHeight: '55vh',
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              opacity: mobileTocOpen ? 1 : 0,
              pointerEvents: mobileTocOpen ? 'auto' : 'none',
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center gap-2 px-3 py-2.5 shrink-0 font-bold text-[0.88rem]"
              style={{
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-card-inner-bg)',
                color: 'var(--color-heading, inherit)',
              }}
            >
              <LuList size={16} style={{ color: '#0ea5e9', flexShrink: 0, marginTop: '2px' }} />
              目錄
              <span className="font-normal text-xs" style={{ color: 'var(--color-muted, #6c757d)' }}>
              Table of Contents
              </span>
            </div>

            {/* Scrollable links */}
            <nav className="overflow-y-auto p-2 flex-1">
              {tocItems.map((item) => {
                const active = activeId === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                      setActiveId(item.id)
                      setMobileTocOpen(false)
                    }}
                    className="block rounded-md mb-[1px] no-underline transition-all duration-150"
                    style={{
                      paddingTop: '7px',
                      paddingBottom: '7px',
                      paddingLeft: `${8 + (item.level - minTocLevel) * 10}px`,
                      paddingRight: '8px',
                      fontSize: item.level <= 2 ? '0.85rem' : '0.79rem',
                      fontWeight: active ? 400 : 400,
                      color: active ? '#0ea5e9' : 'var(--color-body, inherit)',
                      background: active ? 'rgba(14,165,233,0.10)' : 'transparent',
                    }}
                  >
                    {item.text}
                  </a>
                )
              })}
            </nav>
          </div>
        </>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let slugs: string[] = []
  try {
    slugs = await sanityClient.fetch(POST_SLUGS_QUERY)
  } catch (err) {
    console.warn('[blog/[slug]] slugs fetch failed:', (err as Error).message)
  }

  return {
    paths: (slugs || []).filter(Boolean).map((s) => ({ params: { slug: s } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const slug = params?.slug as string

  let post: PostFull | null = null
  try {
    post = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug })
  } catch (err) {
    console.warn('[blog/[slug]] post fetch failed:', (err as Error).message)
  }

  if (!post) return { notFound: true }

  // Resolve related posts: manual array → same-cat fallback → latest fallback
  let related: RelatedPost[] =
    (post.relatedPosts || []).filter((r) => r && r._id !== post!._id)

  if (related.length === 0 && post.category?._id) {
    try {
      related = await sanityClient.fetch(RELATED_BY_CATEGORY_QUERY, {
        currentId: post._id,
        categoryId: post.category._id,
      })
    } catch {}
  }

  if (related.length === 0) {
    try {
      related = await sanityClient.fetch(RELATED_LATEST_QUERY, {
        currentId: post._id,
      })
    } catch {}
  }

  related = related.slice(0, 3)

  // Strip relatedPosts from main post object (already handled separately)
  const { relatedPosts: _stripped, ...cleanPost } = post

  const tocItems = (cleanPost.showToc && cleanPost.body)
    ? extractTocFromBody(cleanPost.body)
    : []

  return { props: { post: cleanPost, related, tocItems } }
}
