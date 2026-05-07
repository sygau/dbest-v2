# Build-Cache Smart Blog Sync

Custom incremental build system for Sanity blog posts on Cloudflare Pages.

## What it does

Instead of re-fetching all 100 posts from Sanity every build, `blog-smart-sync.js` computes a diff against a committed snapshot and only processes what changed.

## Phases

1. Manifest fetch — cheap GROQ query: slug + `_updatedAt` for all published posts
2. Diff against `data/blog-snapshot.json`:
   - **New** — slug exists in Sanity but not in snapshot
   - **Changed** — slug in both but `_updatedAt` differs
   - **Deleted** — slug in snapshot but gone from Sanity
3. Full data fetch for new/changed slugs only
4. Update `data/blog-index.json` and `data/blog-search-index.json` in-place
5. Delete removed posts from both JSON files + remove their `public/og/{slug}.png`
6. Re-sort by `publishedAt` (using snapshot dates for unchanged posts — no extra API call)
7. Write updated `data/blog-snapshot.json`

## Scripts

```
npm run blog:sync            # incremental (uses snapshot)
npm run blog:sync:force      # full re-sync, ignores snapshot
npm run build:smart          # blog:sync → og:generate → blog:sitemap → next build
npm run build:full           # legacy full rebuild (unchanged)
```

## Files

- `scripts/blog-smart-sync.js` — new sync script
- `.next/cache/blog-snapshot.json` — build-cache snapshot (slug → updatedAt + publishedAt). Lives in CF Pages build cache, never committed to git.
- `data/blog-index.json` — OG generator input (committed, updated incrementally)
- `data/blog-search-index.json` — client-side Fuse.js search index (committed, updated incrementally)

## OG Images

`generate-og-images.js` has content-hash caching (`.og-cache.json`). `public/og/` and `.og-cache.json` are both committed to git, so:
- Unchanged posts: sharp skipped (cache hit) ✅
- Changed/new posts: regenerated, then committed by dev locally
- On CF Pages: OG generator runs (`CF_PAGES` is auto-set), generates any missing images for that deploy. They're not committed back but included in CF Pages deployment output.

## Sanity webhook setup

1. In Sanity dashboard → API → Webhooks
2. Trigger: on publish/update/delete for `post` documents
3. Target URL: your CF Pages deploy hook URL
   - CF Pages dashboard → Settings → Builds & deployments → Deploy hooks

This gives you Sanity-triggered deploys that run `build:smart` instead of `build:full`.

## What still runs fully

- `next build` — Next.js static generation builds all page HTML every deploy. There is no way to do partial static page builds on CF Pages without a custom Worker + R2 architecture. The win here is pre-build time (fewer Sanity API calls, OG skips).

## Snapshot storage

Snapshot lives at `.next/cache/blog-snapshot.json`. CF Pages caches `.next/cache` between builds for the Next.js preset — so it persists across deploys without touching git.

First CF Pages build (no cache yet) → full sync fallback → snapshot written to `.next/cache/`. Subsequent builds → incremental mode.

Locally: `npm run blog:sync` writes snapshot to `.next/cache/blog-snapshot.json`. `.next/` is already gitignored.

## CF Pages build command

Set in CF Pages dashboard → Settings → Builds & deployments → Build command:

```
npm run build:smart
```

Framework preset: Next.js. `CF_PAGES=1` is auto-injected by CF Pages so the OG generator runs.
