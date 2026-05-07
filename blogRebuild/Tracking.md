# Blog Rebuild Tracking

## Phase 1 — Setup ✅
- Installed fuse.js
- Created lib/sanity.ts (client + urlFor + imageUrl helper)
- Created lib/sanityQueries.ts (INDEX_POSTS, CATEGORIES, POST_SLUGS, POST_BY_SLUG, RELATED_BY_CATEGORY, RELATED_LATEST, BUILD_INDEX)
- Created lib/blogTypes.ts (Post, PostFull, Author, Category, RelatedPost, SocialLink, SanityImage)
- Created lib/tagColor.ts (HSL hash-shift derivation from category color)

## Phase 2 — Components & Scripts ✅
- Created components/blog/PortableTextRenderer.tsx (image, code, link blocks)
- Created components/blog/AuthorCardBottom.tsx (avatar, bio, email, socials)
- Created scripts/generate-blog-data.js → data/blog-index.json + blog-search-index.json
- Created scripts/generate-blog-sitemap.js → public/sitemap-blog.xml
- Modified scripts/generate-sitemaps.js (rewired blog stub)
- Modified package.json: added blog:data + blog:sitemap scripts; build:full = blog:data → og:generate → blog:sitemap → next build

## Phase 3 — Pages ✅
- Rewrote pages/blog/index.tsx
  - Replaced dummy getStaticProps with Sanity GROQ (INDEX_POSTS_QUERY + CATEGORIES_QUERY)
  - coverImage projected as full image object; urlFor() at render
  - Lazy-loaded Fuse.js on first non-empty search keystroke (substring fallback while loading)
  - View-count batch fetch unchanged (5 min sessionStorage cache, 80-slug chunks)
  - Empty-state safe: failure or 0 posts → renders 暫無文章, build never throws
- Created pages/blog/[slug].tsx
  - getStaticPaths from POST_SLUGS_QUERY (filters showInDirectory + isActive author)
  - getStaticProps fetches post; resolves related posts (manual → same-cat → latest fallback)
  - PortableTextRenderer for body
  - useViewCount(slug) for live view + increment
  - Tag badge colors via tagColor() HSL shift
  - JSON-LD BlogPosting injected
  - noIndex respected via PageSEO robots + extra Head meta
- Deleted pages/blog/post.tsx

## Phase 4 — Verification
- TypeScript: blog files compile clean (only pre-existing errors elsewhere in repo)
- Sanity connectivity: project 8fbafbyw reachable 
  - Both runtime and build paths gracefully fall back to empty list — no crashes

## Outstanding (user action)
- Verify Sanity dataset name (or create "production") so getStaticProps + build scripts return real posts
- Once dataset populated: run `npm run build:full` to generate OG images + sitemap
- Optional: write docs/v2/blog-rebuild-report.md after first real-data smoke test
- Optional: clean up pre-existing FileCard.tsx JSX error so production build passes
