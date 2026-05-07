// Smart blog sync: incremental Sanity → data/*.json
// Fetches only new/changed posts instead of all posts every build.
// Falls back to full sync when snapshot is missing (first run).
require('dotenv').config({ path: '.env' })

const fs = require('fs-extra')
const path = require('path')
const { createClient } = require('@sanity/client')

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const FORCE = process.argv.includes('--force')

const OUT_INDEX    = path.join(__dirname, '..', 'data', 'blog-index.json')
const OUT_SEARCH   = path.join(__dirname, '..', 'data', 'blog-search-index.json')
// Stored in .next/cache so it persists between CF Pages builds without touching git
const OUT_SNAPSHOT = path.join(__dirname, '..', '.next', 'cache', 'blog-snapshot.json')
const OG_DIR       = path.join(__dirname, '..', 'public', 'og')
const OG_CACHE     = path.join(__dirname, '..', '.og-cache.json')

// Phase 1: cheap — just slug + _updatedAt, no body
const MANIFEST_QUERY = `
*[_type == "post" && showInDirectory == true
  && (!defined(author.mode) || author.mode != "team" || author.teamAuthor->isActive == true)]
{
  "slug": slug.current,
  _updatedAt
}
`

// Phase 2: full data for specific slugs only
const POSTS_BY_SLUGS_QUERY = `
*[_type == "post" && showInDirectory == true && slug.current in $slugs
  && (!defined(author.mode) || author.mode != "team" || author.teamAuthor->isActive == true)]
{
  "slug": slug.current,
  title,
  excerpt,
  tags,
  "category": category->title,
  "categoryColor": category->color,
  "categorySlug": category->slug.current,
  "coverImageUrl": coverImage.asset->url,
  publishedAt,
  _createdAt,
  _updatedAt
}
`

function toIndexEntry(p) {
  return { slug: p.slug, title: p.title, category: p.category || '', categoryColor: p.categoryColor || '' }
}

function toSearchEntry(p) {
  return { slug: p.slug, title: p.title, excerpt: p.excerpt || '', tags: p.tags || [], category: p.category || '' }
}

// Sort descending by publishedAt or _createdAt
function dateSortKey(isoStr) {
  return isoStr ? new Date(isoStr).getTime() : 0
}

async function fullSync(client) {
  console.log('📥 Full sync (no snapshot found)...')
  const FULL_QUERY = `
    *[_type == "post" && showInDirectory == true
      && (!defined(author.mode) || author.mode != "team" || author.teamAuthor->isActive == true)]
    | order(coalesce(publishedAt, _createdAt) desc) {
      "slug": slug.current,
      title, excerpt, tags,
      "category": category->title,
      "categoryColor": category->color,
      "categorySlug": category->slug.current,
      "coverImageUrl": coverImage.asset->url,
      publishedAt, _createdAt, _updatedAt
    }
  `
  const posts = await client.fetch(FULL_QUERY)

  const indexData   = posts.map(toIndexEntry)
  const searchData  = posts.map(toSearchEntry)
  const snapshotData = {
    generated: new Date().toISOString(),
    posts: Object.fromEntries(posts.map(p => [p.slug, {
      updatedAt: p._updatedAt,
      publishedAt: p.publishedAt || p._createdAt || '',
    }]))
  }

  await fs.ensureDir(path.dirname(OUT_SNAPSHOT))
  await fs.writeJSON(OUT_INDEX,    indexData,    { spaces: 2 })
  await fs.writeJSON(OUT_SEARCH,   searchData,   { spaces: 2 })
  await fs.writeJSON(OUT_SNAPSHOT, snapshotData, { spaces: 2 })

  console.log(`✅ Full sync: ${posts.length} posts written`)
  return posts.length
}

async function smartSync(client) {
  // Load existing state
  const currentIndex  = await fs.readJSON(OUT_INDEX).catch(() => [])
  const currentSearch = await fs.readJSON(OUT_SEARCH).catch(() => [])
  const snapshot      = await fs.readJSON(OUT_SNAPSHOT)
  const snapshotPosts = snapshot.posts || {}

  // Build lookup maps
  const indexMap  = new Map(currentIndex.map(p => [p.slug, p]))
  const searchMap = new Map(currentSearch.map(p => [p.slug, p]))

  // 1. Fetch lightweight manifest
  console.log('📡 Fetching manifest...')
  const manifest = await client.fetch(MANIFEST_QUERY)
  const manifestMap = new Map(manifest.map(p => [p.slug, p._updatedAt]))

  // 2. Diff
  const toFetch  = []
  const toDelete = []

  for (const [slug, updatedAt] of manifestMap) {
    if (!snapshotPosts[slug] || snapshotPosts[slug].updatedAt !== updatedAt) {
      toFetch.push(slug)
    }
  }
  for (const slug of Object.keys(snapshotPosts)) {
    if (!manifestMap.has(slug)) toDelete.push(slug)
  }

  const unchanged = manifest.length - toFetch.length
  console.log(`📊 ${toFetch.length} new/changed  ${toDelete.length} deleted  ${unchanged} unchanged`)

  if (toFetch.length === 0 && toDelete.length === 0) {
    console.log('✅ Nothing to sync.')
    return { synced: 0, deleted: 0 }
  }

  // 3. Fetch full data for changed/new
  let fetchedPosts = []
  if (toFetch.length > 0) {
    console.log(`📥 Fetching ${toFetch.length} post(s)...`)
    fetchedPosts = await client.fetch(POSTS_BY_SLUGS_QUERY, { slugs: toFetch })
  }

  // 4. Apply updates
  for (const p of fetchedPosts) {
    indexMap.set(p.slug,  toIndexEntry(p))
    searchMap.set(p.slug, toSearchEntry(p))
    snapshotPosts[p.slug] = { updatedAt: p._updatedAt, publishedAt: p.publishedAt || p._createdAt || '' }
  }

  // 5. Apply deletions
  let ogCache = {}
  if (await fs.pathExists(OG_CACHE)) ogCache = await fs.readJSON(OG_CACHE)

  for (const slug of toDelete) {
    indexMap.delete(slug)
    searchMap.delete(slug)
    delete snapshotPosts[slug]
    delete ogCache[slug]

    const ogPath = path.join(OG_DIR, `${slug}.png`)
    if (await fs.pathExists(ogPath)) {
      await fs.remove(ogPath)
      console.log(`🗑️  OG removed: ${slug}.png`)
    }
  }

  if (toDelete.length > 0) {
    await fs.writeJSON(OG_CACHE, ogCache, { spaces: 2 })
  }

  // 6. Re-sort by publishedAt desc using snapshot dates for unchanged, actual dates for fetched
  const allSlugs = [...manifestMap.keys()]
  const sortedIndex  = allSlugs
    .filter(s => indexMap.has(s))
    .sort((a, b) => {
      const dateA = dateSortKey(snapshotPosts[a]?.publishedAt)
      const dateB = dateSortKey(snapshotPosts[b]?.publishedAt)
      return dateB - dateA
    })
    .map(s => indexMap.get(s))

  const sortedSearch = allSlugs
    .filter(s => searchMap.has(s))
    .sort((a, b) => {
      const dateA = dateSortKey(snapshotPosts[a]?.publishedAt)
      const dateB = dateSortKey(snapshotPosts[b]?.publishedAt)
      return dateB - dateA
    })
    .map(s => searchMap.get(s))

  // 7. Write output
  await fs.writeJSON(OUT_INDEX,  sortedIndex,  { spaces: 2 })
  await fs.writeJSON(OUT_SEARCH, sortedSearch, { spaces: 2 })

  const newSnapshot = {
    generated: new Date().toISOString(),
    posts: Object.fromEntries(Object.entries(snapshotPosts).filter(([s]) => manifestMap.has(s)))
  }
  await fs.writeJSON(OUT_SNAPSHOT, newSnapshot, { spaces: 2 })

  // 8. Summary
  if (toFetch.length > 0) {
    console.log('\n  Changed/new:')
    toFetch.forEach(s => console.log(`    + ${s}`))
  }
  if (toDelete.length > 0) {
    console.log('  Deleted:')
    toDelete.forEach(s => console.log(`    - ${s}`))
  }

  console.log(`\n✅ Sync complete: ${toFetch.length} updated  ${toDelete.length} deleted  ${unchanged} unchanged`)
  return { synced: toFetch.length, deleted: toDelete.length }
}

async function main() {
  if (!PROJECT_ID) {
    console.warn('⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID not set — skipping sync')
    return
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
    perspective: 'published',
  })

  await fs.ensureDir(path.dirname(OUT_INDEX))
  await fs.ensureDir(path.dirname(OUT_SNAPSHOT))

  const hasSnapshot = !FORCE && await fs.pathExists(OUT_SNAPSHOT)

  if (hasSnapshot) {
    await smartSync(client)
  } else {
    if (FORCE) console.log('⚡ --force: full re-sync')
    await fullSync(client)
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
