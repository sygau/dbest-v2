# Blog Rebuild Roadmap — Contentful → Sanity

## Status
- Old Contentful build scripts deleted (generate-blog-data.js, generate-blog-sitemap.js, lib/contentful.js)
- Old prebuild hooks removed from package.json
- Old blog pages (pages/blog/index.tsx, pages/blog/[slug].tsx) deleted
- Old blog frontend archived in blogRebuild/old/ for reference

---

## What to Add to This Folder

Before handing this off to an AI agent, add:

- `SanitySchema_ReadNReferenceOnly/` — your Sanity schemaTypes (post, author, category, etc.)
- `.env` values or a note like `env-example.md` listing: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`
- Any design notes or mockups for the new blog index and post layout
- A note on what fields exist in Sanity (title, slug, body, publishedAt, author, tags, coverImage, etc.)

---

## Phase 1 — Sanity Setup

Install Sanity client deps and configure the client.
Goal: the app can query Sanity and return post data in dev.

- Install `@sanity/client`, `next-sanity`, `@portabletext/react`, `@sanity/image-url`
- Create `lib/sanity.ts` — Sanity client config using env vars
- Confirm queries work before moving on

---

## Phase 2 — Blog Index Page

Recreate `pages/blog/index.tsx` fetching from Sanity instead of Contentful JSON.
Goal: listing page works, shows posts with title, date, tags, cover image.

- Fetch posts list via GROQ at build time (getStaticProps)
- Use the old `blogRebuild/old/blog-index.tsx` as a visual reference only — do not reuse its code
- Build new components with new CSS class names (avoid `.blog-card`, `.blog-meta-item` — those exist in globals.css)

---

## Phase 3 — Blog Post Page

Recreate `pages/blog/[slug].tsx` with Sanity Portable Text rendering.
Goal: individual post pages render correctly with all content types.

- Fetch single post by slug via GROQ (getStaticProps + getStaticPaths)
- Use `@portabletext/react` to render the body field
- Handle images via `@sanity/image-url`
- Reference `blogRebuild/old/blog-post-slug.tsx` for layout structure only

---

## Phase 4 — Sitemap

Update `scripts/generate-sitemaps.js` (blog sitemap call is currently stubbed out).
Goal: sitemap-blog.xml is regenerated from Sanity slugs.

- Write a new `scripts/generate-blog-sitemap.js` that queries Sanity for all post slugs
- Rewire the import in generate-sitemaps.js

---

## Phase 5 — Cleanup & Polish

- Write new CSS for blog in a scoped file (e.g. `styles/blog.module.css` or Tailwind classes)
- Remove the two legacy globals.css rules: `.blog-card` (line ~99) and `.blog-meta-item` (line ~622)
- Add blog JsonLD (buildBlogJsonLd in data/jsonld/pages.ts already exists, wire it up)
- Test all three themes (light, dark, blue)

---

## Notes

- This is a Next.js Pages Router app on Cloudflare Pages — no ISR, no revalidate, getStaticProps only
- No Next.js Image Optimization — use plain `<img>` or `unoptimized` prop
- No SPA navigation — every blog route must be a full page load (AdSense requirement)
- Old post JSON data in `data/` is stale and can be ignored or deleted once Sanity fetch is confirmed working
