require('dotenv').config({ path: '.env' })

const fs = require('fs-extra')
const path = require('path')
const { createClient } = require('@sanity/client')

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.NEXT_PUBLIC_SANITY_READ_TOKEN

const OUT = path.join(__dirname, '..', 'public', 'sitemap-blog.xml')
const BASE = 'https://dse.best'

const QUERY = `
*[_type == "post" && showInDirectory == true && noIndex != true
  && (!defined(author.mode) || author.mode != "team" || author.teamAuthor->isActive == true)] {
  "slug": slug.current,
  publishedAt,
  _updatedAt,
  _createdAt
}
`

async function generateBlogSitemap() {
  let posts = []

  if (PROJECT_ID) {
    try {
      const client = createClient({
        projectId: PROJECT_ID,
        dataset: DATASET,
        token: TOKEN,
        apiVersion: '2024-01-01',
        useCdn: false,
        perspective: 'published',
      })
      posts = await client.fetch(QUERY)
    } catch (err) {
      console.warn('⚠️  Sanity fetch failed for sitemap:', err.message)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const urls = [
    `<url><loc>${BASE}/blog</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    ...posts.map((p) => {
      const lastmod = (p._updatedAt || p.publishedAt || p._createdAt || '').split('T')[0] || today
      return `<url><loc>${BASE}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    }),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  await fs.ensureDir(path.dirname(OUT))
  await fs.writeFile(OUT, xml)
  console.log(`✅ Wrote ${posts.length + 1} entries → sitemap-blog.xml`)
}

if (require.main === module) {
  generateBlogSitemap().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}

module.exports = { generateBlogSitemap }
