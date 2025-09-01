import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigationLink from '../../components/NavigationLink'
import { BiUserCircle, BiCalendarEvent, BiTimeFive, BiShow, BiCategory, BiComment } from 'react-icons/bi'

interface BlogPost {
  id: string
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  author: string
  date: string
  readingTime: number | null
  tags: string[]
  category: string
  featuredImage: string | null
  content: string
  comments: boolean
  index: boolean
  excerpt: string
  createdAt: string
  updatedAt: string
  robots: string
}

function getCategoryDisplayName(category: string): string {
  if (!category) return 'Uncategorized'
  const categoryMap: Record<string, string> = {
    'Chinese': '中文 Chinese',
    'English': '英文 English',
    'Maths': '數學 Maths',
    'CSD': '公民 CSD',
    'Physics': '物理 Physics',
    'Chemistry': '化學 Chemistry',
    'Biology': '生物 Biology',
    'ICT': '資訊 ICT',
    'M1': 'M1',
    'M2': 'M2',
    'Geography': '地理 Geography',
    'History': '歷史 History',
    'Chinese History': '中國歷史 Chinese History',
    'Economics': '經濟 Economics',
    'BAFS': '企會財 BAFS',
    'Visual Arts': '視藝 Visual Arts',
    'DSE News': 'DSE News',
    'Testing': 'Testing'
  }
  return categoryMap[category] || category
}

export default function BlogPreviewPage() {
  const router = useRouter()
  const { slug, secret } = router.query as { slug?: string; secret?: string }
  const [post, setPost] = useState<BlogPost | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [viewCount] = useState<number>(0)

  useEffect(() => {
    if (!slug || !secret) return
    const controller = new AbortController()
    fetch(`/api/blog-preview?slug=${encodeURIComponent(slug)}&secret=${encodeURIComponent(secret)}`, {
      signal: controller.signal
    })
      .then(async (res) => {
        if (!res.ok) {
          const j = await res.json().catch(() => ({} as any))
          throw new Error(j.error || `Failed to load preview (${res.status})`)
        }
        return res.json()
      })
      .then((data) => {
        setPost(data.post)
      })
      .catch((e) => setError(e.message || 'Failed to load preview'))
    return () => controller.abort()
  }, [slug, secret])

  useEffect(() => {
    if (!slug || !secret) {
      router.replace('/blog')
    }
  }, [slug, secret, router])

  if (!slug || !secret) {
    return null
  }

  const categoryDisplayName = post ? getCategoryDisplayName(post.category) : ''
  const featuredImageUrl = post?.featuredImage || 'https://dse.best/assets/images/logo-icon.webp'

  return (
    <>
      <Head>
        <title>{post?.seoTitle || 'Preview'}</title>
        <meta name="description" content={post?.seoDescription || 'Preview'} />
        <meta name="robots" content="noindex, nofollow" />
        {post && (
          <>
            <meta property="og:title" content={post.seoTitle} />
            <meta property="og:description" content={post.seoDescription} />
            <meta property="og:image" content={featuredImageUrl} />
            <meta property="og:url" content={`https://dse.best/blog/${post.slug}`} />
            <meta property="og:type" content="article" />
            <meta name="theme-color" content="#0f1535" />
          </>
        )}
      </Head>

      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="alert alert-info d-flex align-items-center" role="alert" style={{ borderRadius: 12 }}>
          <span style={{ fontWeight: 700 }}>Preview Mode</span>
          <span className="ms-2">This page shows draft content from Contentful Preview API.</span>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert" style={{ borderRadius: 12 }}>{error}</div>
        )}

        {!post && !error && (
          <div className="text-center py-5">Loading preview…</div>
        )}

        {post && (
          <>
            {/* Breadcrumb (outside card like live page) */}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
              <div className="breadcrumb-title pe-3">Blog</div>
              <div className="ps-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <BiCategory style={{ verticalAlign: 'text-bottom', fontSize: '1.2em', marginRight: '0.25em' }} /> {categoryDisplayName}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* Card matches live page */}
            <div className="card rounded-4">
              <div className="card-body">
                {/* Post Header */}
                <div className="post-header mb-4">
                  <h1 className="display-6" style={{
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    lineHeight: '1.2',
                    marginBottom: '1.5rem',
                    color: 'var(--bs-body-color, #374151)'
                  }}>
                    {post.title}
                  </h1>

                  {/* Post Meta */}
                  <div className="post-meta d-flex flex-wrap align-items-center gap-3 justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center">
                        <BiUserCircle style={{
                          verticalAlign: 'text-bottom',
                          fontSize: '2em',
                          marginRight: '0.25em',
                          color: '#0d6efd',
                          background: 'rgba(13,110,253,0.12)',
                          borderRadius: '50%',
                          padding: '0.18em',
                          boxShadow: '0 1px 4px rgba(13,110,253,0.10)'
                        }} />
                        <span>{post.author}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <BiCalendarEvent style={{
                          verticalAlign: 'text-bottom',
                          fontSize: '2em',
                          marginRight: '0.25em',
                          color: '#198754',
                          background: 'rgba(25,135,84,0.12)',
                          borderRadius: '50%',
                          padding: '0.18em',
                          boxShadow: '0 1px 4px rgba(25,135,84,0.10)'
                        }} />
                        <span>{post.date}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <BiTimeFive style={{
                          verticalAlign: 'text-bottom',
                          fontSize: '2em',
                          marginRight: '0.25em',
                          color: '#0dcaf0',
                          background: 'rgba(13,202,240,0.12)',
                          borderRadius: '50%',
                          padding: '0.18em',
                          boxShadow: '0 1px 4px rgba(13,202,240,0.10)'
                        }} />
                        <span>{post.readingTime ? `${post.readingTime}min read` : ''}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <BiShow style={{
                          verticalAlign: 'text-bottom',
                          fontSize: '2em',
                          marginRight: '0.25em',
                          color: '#ffc107',
                          background: 'rgba(255,193,7,0.12)',
                          borderRadius: '50%',
                          padding: '0.18em',
                          boxShadow: '0 1px 4px rgba(255,193,7,0.10)'
                        }} />
                        <span>{viewCount}</span>
                      </div>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="post-tags d-flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              background: 'linear-gradient(90deg, #0d6efd 60%, #0dcaf0 100%)',
                              color: '#fff',
                              borderRadius: '999px',
                              padding: '0.35em 1em',
                              fontWeight: 500,
                              fontSize: '1em',
                              letterSpacing: '0.03em',
                              boxShadow: '0 1px 6px rgba(13,110,253,0.10)',
                              border: 'none',
                              transition: 'background 0.2s',
                              cursor: 'default',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="text-center mb-4">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* No comments in preview */}

                {/* Post Footer */}
                <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--bs-border-color, #e5e7eb)' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <NavigationLink href="/blog/" style={{
                      display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: '8px', border: 'none',
                      background: 'var(--bs-primary, #3b82f6)', color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: '600',
                      transition: 'all 0.2s ease', cursor: 'pointer', minWidth: 'fit-content', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
                    }} onMouseEnter={(e: any) => {
                      e.currentTarget.style.background = 'var(--bs-primary-dark, #2563eb)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)'
                    }} onMouseLeave={(e: any) => {
                      e.currentTarget.style.background = 'var(--bs-primary, #3b82f6)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.2)'
                    }}>
                      <span style={{ fontSize: '1.2em', marginRight: '8px' }}>←</span>
                      返回主頁
                    </NavigationLink>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
} 