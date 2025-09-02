import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigationLink from '../../components/NavigationLink'
import { BiUserCircle, BiCalendarEvent, BiTimeFive, BiShow, BiCategory, BiComment } from 'react-icons/bi'
import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'experimental-edge'

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

// Helper function to get category display name (from your original generateIndex.js)
function getCategoryDisplayName(category: string): string {
  if (!category) return 'Uncategorized';

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
  };

  return categoryMap[category] || category;
}

// Rich text renderer options
const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const rawUrl = node.data.target.fields.file.url
      const url = rawUrl.startsWith('http') ? rawUrl : 'https:' + rawUrl
      const alt = node.data.target.fields.title || ''
      const caption = node.data.target.fields.description || ''
      return `
        <div class="custom-image-block text-center my-3">
          <img src="${url}" alt="${alt}" class="img-fluid" />
          ${caption ? `<div class="image-caption small text-muted mt-1">${caption}</div>` : ''}
        </div>
      `
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      const entry = node.data.target.fields
      const contentType = node.data.target.sys.contentType.sys.id
      if (!entry) return '<div class="embedded-entry-block">[Embedded Entry: Data Missing]</div>'
      if (contentType === 'faq') {
        return `<div class="faq-block"><strong>Q: ${entry.question}</strong><div>A: ${entry.answer}</div></div>`
      }
      if (contentType === 'blogPost') {
        return `
          <div class="embedded-blog-post">
            <h4>${entry.title}</h4>
            <div>${entry.description || ''}</div>
          </div>
        `
      }
      return `
        <div class="embedded-entry-block">
          <strong>Embedded Entry (${contentType})</strong>
          <pre>${JSON.stringify(entry, null, 2)}</pre>
        </div>
      `
    },
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      const entry = node.data.target.fields
      if (entry && entry.title) {
        return `<span class="embedded-entry-inline">${entry.title}</span>`
      }
      return '<span class="embedded-entry-inline">[Inline Entry]</span>'
    }
  }
}

// Helper functions for content processing
function replaceYouTubeMarkers(content: string) {
  return content.replace(/\[youtube:([a-zA-Z0-9_-]{11})\]/g, (_match, videoId) => {
    return `
      <div class="youtube-embed-responsive" style="max-width: 700px; margin: 0 auto;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
          <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="https://www.youtube.com/embed/${videoId}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `
  })
}

function replaceButtonShortcodes(content: string) {
  return content.replace(/\[button;([a-zA-Z0-9_+-]+);([a-zA-Z-]+);([^;\]]+);([^\]]+)\]/g, (_match, type, style, label, url) => {
    if (url.includes('&lt;') || url.includes('&gt;') || url.includes('<a') || url.includes('</a>')) {
      const hrefMatch = url.match(/href=["']([^"']+)["']/)
      if (hrefMatch && hrefMatch[1]) {
        url = hrefMatch[1]
      } else {
        url = url.replace(/<[^>]*>/g, '')
      }
    }

    if ((type as string).startsWith('icon+')) {
      const iconName = (type as string).slice(5)
      const className = `btn btn-${style} px-4 raised me-2 mb-2`
      return `<a href="${url}" class="${className}"><i class="bi bi-${iconName}" style="vertical-align: middle; margin-right: 0.3em;"></i>${label}</a>`
    }

    type = (type || '').toLowerCase()
    style = (style || '').toLowerCase()
    const allowedTypes = ['gradient', 'color', 'raised', 'outline', 'inverse']
    const allowedStyles = [
      'primary', 'danger', 'success', 'info', 'warning', 'voilet', 'royal', 'branding', 'deep-blue',
      'dark', 'secondary', 'light'
    ]

    if (type === 'primary' || !allowedTypes.includes(type)) {
      return `<a href="${url}" class="btn btn-primary px-5 me-2 mb-2">${label}</a>`
    }

    if (!allowedStyles.includes(style)) {
      style = 'primary'
    }

    let className = ''
    switch (type) {
      case 'gradient':
        className = `btn btn-grd btn-grd-${style} px-5 me-2 mb-2`
        break
      case 'color':
        className = `btn btn-${style} px-5 me-2 mb-2`
        break
      case 'raised':
        className = `btn btn-${style} px-5 raised me-2 mb-2`
        break
      case 'outline':
        className = `btn btn-outline-${style} px-5 me-2 mb-2`
        break
      case 'inverse':
        className = `btn btn-inverse-${style} px-5 me-2 mb-2`
        break
      default:
        className = `btn btn-${style} px-5 me-2 mb-2`
    }

    return `<a href="${url}" class="${className}">${label}</a>`
  })
}

function getFeaturedImageUrl(featuredImage: any) {
  if (featuredImage && featuredImage.fields && featuredImage.fields.file && featuredImage.fields.file.url) {
    const url: string = featuredImage.fields.file.url
    return url.startsWith('http') ? url : 'https:' + url
  }
  return null
}

function transformPost(post: any): BlogPost {
  const fields = post.fields
  return {
    id: post.sys.id,
    slug: fields.slug,
    title: fields.title || '',
    seoTitle: fields.seoTitle || fields.title || '',
    seoDescription: fields.seoDescription || '',
    author: fields.author || '',
    date: fields.date || '',
    readingTime: fields.readingTime || null,
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    category: fields.category || '',
    featuredImage: getFeaturedImageUrl(fields.media),
    content: fields.content ? replaceButtonShortcodes(replaceYouTubeMarkers(documentToHtmlString(fields.content, renderOptions))) : '',
    comments: fields.comments || false,
    index: fields.index !== false,
    excerpt: fields.excerpt || '',
    createdAt: post.sys.createdAt,
    updatedAt: post.sys.updatedAt,
    robots: fields.index === false ? 'noindex, nofollow' : 'index, follow'
  }
}

interface PreviewPageProps {
  post: BlogPost | null
  error?: string
}

export default function BlogPreviewPage({ post, error }: PreviewPageProps) {
  const router = useRouter()

  // Redirect if no post data
  useEffect(() => {
    if (!post && !error) {
      router.replace('/blog/')
    }
  }, [post, error, router])

  if (error) {
    return (
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  const categoryDisplayName = getCategoryDisplayName(post.category)
  const featuredImageUrl = post.featuredImage || 'https://dse.best/assets/images/logo-icon.webp'

  return (
    <>
      <Head>
        <title>{post.seoTitle} - Preview | DSEBest</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="robots" content="noindex, nofollow" />
        {post.featuredImage && (
          <meta property="og:image" content={post.featuredImage} />
        )}
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="container-xxl flex-grow-1 container-p-y">
        {/* Preview Banner */}
        <div className="alert alert-info alert-dismissible fade show mb-4" role="alert">
          <strong>🔍 Preview Mode:</strong> This is a preview of unpublished content.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        {/* Breadcrumb - EXACTLY like live page */}
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

        {/* Blog Post Content - EXACTLY like live page */}
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

              {/* Post Meta - EXACTLY like live page */}
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
                    <span>Preview Mode</span>
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

            {/* Featured Image - EXACTLY like live page */}
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

            {/* Post Footer - EXACTLY like live page */}
            <div style={{
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--bs-border-color, #e5e7eb)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <NavigationLink href="/blog/" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--bs-primary, #3b82f6)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  minWidth: 'fit-content',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
                }} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.background = 'var(--bs-primary-dark, #2563eb)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.background = 'var(--bs-primary, #3b82f6)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.2)';
                }}>
                  <span style={{ fontSize: '1.2em', marginRight: '8px' }}>←</span>
                  返回主頁
                </NavigationLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// SSR function to fetch Contentful data
export async function getServerSideProps(context: any) {
  const { slug, secret } = context.query

  // Validate secret
  if (secret !== process.env.PREVIEW_SECRET) {
    return {
      notFound: true
    }
  }

  if (!slug || typeof slug !== 'string') {
    return {
      props: {
        error: 'Missing slug parameter'
      }
    }
  }

  try {
    const space = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master'
    const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN

    if (!space || !previewToken) {
      return {
        props: {
          error: 'Contentful preview environment not configured'
        }
      }
    }

    const client = createClient({
      space,
      environment,
      accessToken: previewToken,
      host: 'preview.contentful.com'
    })

    const response = await client.getEntries({
      content_type: 'blogPost',
      limit: 1,
      include: 1,
      'fields.slug': slug
    })

    if (!response.items.length) {
      return {
        props: {
          error: 'Post not found'
        }
      }
    }

    const post = transformPost(response.items[0])

    return {
      props: {
        post
      }
    }
  } catch (error: any) {
    console.error('Preview error:', error)
    return {
      props: {
        error: error?.message || 'Failed to load preview content'
      }
    }
  }
} 