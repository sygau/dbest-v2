import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

// Required for Cloudflare Pages
export const runtime = 'edge'

// Helpers copied to match site rendering
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

function transformPost(post: any) {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug, secret } = req.query as { slug?: string; secret?: string }

    if (!slug || !secret) {
      return res.status(400).json({ error: 'Missing slug or secret' })
    }

    if (secret !== process.env.PREVIEW_SECRET) {
      return res.status(401).json({ error: 'Invalid secret' })
    }

    const space = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master'
    const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN

    if (!space || !previewToken) {
      return res.status(500).json({ error: 'Contentful preview env not configured' })
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
      return res.status(404).json({ error: 'Post not found' })
    }

    const post = transformPost(response.items[0])
    return res.status(200).json({ post })
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Unexpected error' })
  }
} 