// Build-time fetch of Sanity blog posts → data/blog-index.json (for OG generator) + data/blog-search-index.json
require('dotenv').config({ path: '.env' })

const fs = require('fs-extra')
const path = require('path')
const { createClient } = require('@sanity/client')

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.NEXT_PUBLIC_SANITY_READ_TOKEN

const OUT_INDEX = path.join(__dirname, '..', 'data', 'blog-index.json')
const OUT_SEARCH = path.join(__dirname, '..', 'data', 'blog-search-index.json')

const QUERY = `
*[_type == "post" && showInDirectory == true
  && (!defined(author.mode) || author.mode != "team" || author.teamAuthor->isActive == true)]
| order(coalesce(publishedAt, _createdAt) desc) {
  "slug": slug.current,
  title,
  excerpt,
  tags,
  "category": category->title,
  "categoryColor": category->color,
  "categorySlug": category->slug.current,
  "coverImageUrl": coverImage.asset->url,
  publishedAt,
  _createdAt
}
`

async function main() {
  if (!PROJECT_ID) {
    console.warn('⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID not set — writing empty blog data')
    await fs.ensureDir(path.dirname(OUT_INDEX))
    await fs.writeJSON(OUT_INDEX, [], { spaces: 2 })
    await fs.writeJSON(OUT_SEARCH, [], { spaces: 2 })
    return
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
    perspective: 'published',
    // intentionally omit token: public dataset reads work without auth and
    // tokens scoped to a different host return "Session does not match project host"
  })

  console.log(`📡 Fetching blog posts from Sanity (${PROJECT_ID}/${DATASET})...`)
  let posts = []
  try {
    posts = await client.fetch(QUERY)
  } catch (err) {
    console.error('❌ Sanity fetch failed:', err.message)
    posts = []
  }

  await fs.ensureDir(path.dirname(OUT_INDEX))

  // OG generator format: { slug, title, category, categoryColor }
  const ogData = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category || '',
    categoryColor: p.categoryColor || '',
  }))

  // Search index format
  const searchData = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || '',
    tags: p.tags || [],
    category: p.category || '',
  }))

  await fs.writeJSON(OUT_INDEX, ogData, { spaces: 2 })
  await fs.writeJSON(OUT_SEARCH, searchData, { spaces: 2 })

  console.log(`✅ Wrote ${posts.length} posts → blog-index.json + blog-search-index.json`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
