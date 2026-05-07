# Blog Implementation Checklist

## ENV Setup
Use `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_READ_TOKEN`.

## Phase 2 — Blog Index Page (`pages/blog/index.tsx`)

### UI / Display
- [ ] Render blog posts as cards from GROQ query
- [ ] Display: cover image, title, excerpt, date, category badge, author name (if exists)
- [ ] **Cover Image Handling (Critical):**
  - If `coverImage` exists: use it (add `?fm=webp` param)
  - If `coverImage` is empty/null: render `<DefaultThumb />` component instead (faster, no external load)
  - **Do NOT use OG fallback URL** (`/og/{slug}.png`) on index — only DefaultThumb or actual coverImage
- [ ] Category badge color: Use `category.color` from query (fallback: `#549ee8`)
- [ ] **Tag Badge Color Logic:** Use deterministic hashing (I mean i want to like have a random hex input then turn it into a "tag" badge background color like similar with the category badge background color for my blog post layout) based on category color to generate visual variants, use whatever safe method and theme-appropriate color transformations needed (e.g. light/dark variants) like im not technical on how this work but i want the best result
- [ ] Pinned posts appear first, rest sorted by `publishedAt desc`
- [ ] Filter: Show only `showInDirectory == true`
- [ ] Author card (indie row under excerpt if exists):
  - Show `displayName` + `tagline` (if author mode != "disabled")
  - Show avatar if available
  - If no author (mode == "disabled"), skip this row entirely
  - **No bottom author card needed on index** — just display name + tagline

### Category Selector/Dropdown (Mobile)
- [ ] Query all categories ordered by `displayOrder asc`
- [ ] "All Categories" option first
- [ ] Filter posts by selected category

### Cover Image Handling (Post Page)
- [ ] If `coverImage` exists: display it (add `?fm=webp` param)
- [ ] If `coverImage` is empty/null: use OG fallback: `<img src="https://dse.best/og/{slug}.png" />`
  - **Note:** This is just a simple fallback URL, no recreation needed. The OG generation script already exists.
- [ ] Add `?fm=webp` query param to Sanity CDN images (except og:image fallback URL)

### SEO
- [ ] Build blog sitemap from post slugs
- [ ] Add JSON-LD for blog listing (exists in `data/jsonld/pages.ts`)

---

## Phase 3 — Blog Post Page (`pages/blog/[slug].tsx`)

### Layout
- [ ] Title + date (published or created)
- [ ] Category badge (pre-title, above headline)
- [ ] View count (using `useViewCount` hook):
  - Import and use `useViewCount(slug)` hook — it handles fetch + increment logic
  - Hook will return `{ viewCount, isLoading }` (only use for post page, not index)
  - If `showViews == true`: display "X views", else hide
- [ ] Author card (if author mode != "disabled"):
  - Display Name
  - Tagline (from author doc)
  - Avatar
  - Bio (from author.bio)
  - Social links as buttons:
    - Instagram / X: `@{handle}` clickable
    - Website: clickable URL
  - Email: `<a href="mailto:{email}">{email}</a>`
- [ ] Hero image (if exists, full-width, after author card)
- [ ] Body (Portable Text rendering)
  - Inline images: render with captions + alt text
  - Add `?fm=webp` to Sanity image URLs
- [ ] Related Posts section:
  - **Build-time only** — Pre-fetch in getStaticProps, bake into HTML (no client-side API calls)
  - If `relatedPosts` array populated: use those
  - If empty: GROQ query fetches latest 3 from same category
  - If no same-category posts: GROQ query fetches latest 3 overall
  - Never include current post `_id`
  - Display with cover image, title, category badge

### Post Fields
- [ ] Display: title, excerpt (in meta), body
- [ ] Meta: `seoTitle` (fallback: title), `seoDescription` (fallback: excerpt)
- [ ] Date: `publishedAt` (if set, else `_createdAt`)
- [ ] Reading time: Show if `readingTime` fie

### Image Dimensions (Sanity CDN params)
- [ ] Blog index card thumb: `?w=600&h=400&fm=webp` (desktop: 600px, mobile: full-width 320px)
- [ ] Blog post hero/full-width: `?w=1000&fm=webp` (responsive, maintain aspect ratio)
- [ ] og:image: `?w=1200&h=630&fm=webp` (standard OG ratio)
- [ ] Fallback OG (`/og/{slug}.png`): use as-is, no paramsld is populated
- [ ] View count: Show if `showViews == true`

### SEO / Meta
- [ ] `<title>{seoTitle ?? title}</title>`
- [ ] `<meta name="description" content={seoDescription ?? excerpt} />`
- [ ] `<meta name="robots" content="noindex" />` if `noIndex == true`
- [ ] `og:image` = coverImage (if exists, add `?fm=webp&w=1200&h=750`), else use `/og/{slug}.png`
- [ ] Add JSON-LD for blog post (article schema)

### Ads
- [ ] Only render Google AdSense if `loadAds == true`
- [ ] **Critical:** No layout shift on ad load (AdSense requirement for auto-ads)

### No Author Scenario
- [ ] If author mode == "disabled":
  - Don't render author card at all
  - Don't show author display name or tagline in post header
  - Don't show avatar
  - **Blog index:** Don't show indie author row

### Image Handling
- [ ] CoverImage: `?fm=webp` added
- [ ] HeroImage: `?fm=webp` added
- [ ] Body inline images: `?fm=webp` added
- [ ] **Exception:** og:image fallback (`/og/{slug}.png`) — NO query params

### View Counting

**Blog Index (Batch Fetching):**
- [ ] **Batch Fetch on Mount:** Fetch view counts for first ~27 posts (depending on how the blog index is sorted) (Please note that the sort by popularity should be treated differently since it cant just sort from just 27 posts)
- [ ] **API Format:** `https://api-v2.dse.best/view-count?slugs=slug1,slug2,slug3,...` (comma-separated slugs)
- [ ] **Response Format:** API returns `{ counts: { slug1: 123, slug2: 456, ... } }`
- [ ] **Chunking:** Split slugs into chunks of 80 per API call (max ~2 calls for 100 posts)
- [ ] **Caching:** Cache result in `sessionStorage` for 1 hour (`blogViewCounts`, `blogViewCountsTime`)
- [ ] **Display:** Show view count for each post card (if `showViews == true`)
- [ ] **Loading State:** Show skeleton loader while counts are loading

**Blog Post Page:**
- [ Search Implementation

**Build-time Lightweight Approach:**
- [ ] Create `data/blog-search-index.json` at build time with: `{ slug, title, excerpt, tags, category }`
- [ ] Bundle with app (lightweight, ~50KB for 1000 posts)
- [ ] Use Fuse.js for client-side fuzzy search
- [ ] **Note:** Opus should add Fuse.js to package.json if not present
- [ ] Search hits on: title, excerpt, tags, category
- [ ] No backend API call needed

### Filtering (GROQ)

All GROQ queries will be written/handled by Claude Opus. Key filters:
- [ ] Blog index: only `showInDirectory == true`
- [ ] **Author Logic:**
  - `author.mode == "disabled"` → Skip author display (anonymous post)
  - `author.mode == "team" && author.teamAuthor->isActive == false` → Skip entire post (author inactive)
  - `author.mode == "team" && author.teamAuthor->isActive == true` → Show author + post
  - `author.mode == "custom"` → Show inline author (customDisplayName, customAvatar, customBio)
- [ ] Related posts: never include current post `_id`

All GROQ queries will be written/handled by Claude Opus. Key filters:
- [ ] Blog index: only `showInDirectory == true`
- [ ] Exclude inactive authors (mode: "team" + isActive: false)
- [ ] Related posts: never include current post
- [ ] Search (for now): title + excerpt only (no body search yet)
---

## Phase 4 — Sitemap (`scripts/generate-blog-sitemap.js`)

- [ ] Query Sanity for all posts with `showInDirectory == true`
- [ ] Extract slugs, dates (`publishedAt` or `_createdAt`)
- [ ] Generate `sitemap-blog.xml` (standard XML format)
- [ ] Output to `public/sitemap-blog.xml`

---

## CSS / Styling

### Class Names (Avoid Legacy Conflicts)
- [ ] DO NOT use `.blog-card`, `.blog-meta-item` (legacy globals.css — delete after migration)
- [ ] Use Tailwind or scoped CSS module (`styles/blog.module.css`)
- [ ] Keep styles: educational, minimal, no excessive animations
- [ ] **Reference:** Old bootstrap blog design in `blogRebuild/old/` is OUTDATED — do NOT reuse code

### Themes
- [ ] Test all three themes: **light**, **dark**, **blue**
- [ ] Category badge color: respects theme contrast
- [ ] Fallback color `#549ee8` works in all themes

### Mobile / iPad Responsive
- [ ] Blog index: responsive card grid
- [ ] Category selector: mobile-friendly dropdown
- [ ] Post page: readable line length, scaled images
- [ ] Author card: compact on mobile

---

## Tag Badge Color Strategy (Deterministic Hashing)

**Goal:** Generate visual badge color variants from base category color, prevent uniformity.

**Approach:**
- Hash the category slug or ID (simple approach: use `slug.charCodeAt()` sum)
- Transform base color (category.color) by adjusting HSL:
  - Hue: shift by hash % 30°
  - Saturation: vary by ±10% based on hash
  - Lightness: adjust for contrast (keep readable)
- Result: consistent but visually distinct badges

**Example (pseudo-code):**
```
baseColor = category.color (hex or rgb)
hash = hashSlug(category.slug) % 100
hsl = rgbToHsl(baseColor)
hsl.hue += (hash % 30) - 15
hsl.saturation += ((hash % 20) - 10) / 100
return hslToRgb(hsl)
```

**Alternative (simpler):**
- Use TailwindCSS: map category to specific color: `bg-blue-200`, `bg-green-200`, etc.
- Store mapping in data layer or query result

---

## Component Imports (Utilities)

**For Blog Index:**
```tsx
import DefaultThumb from '@/components/DefaultThumb'
// Renders SVG thumbnail if coverImage is missing
// Props: title, subtitle, color (from category.color, fallback: #549ee8)
```

**For Blog Post:**
```tsx
import { useViewCount } from '@/hooks/useViewCount'
// Returns { viewCount, isLoading }
// Handles fetch + auto-increment (once per session)

import { PortableText } from '@portabletext/react'
// Render body array from Sanity

import imageUGeneration:** `scripts/generate-og-images.js` runs before Next.js build (via `npm run build:full` which calls `og:generate`). Outputs to `public/og/{slug}.png` for static serving.
- **Build Pipeline:** `build:full` script: `og:generate` → `next build`. Always run `build:full` for production.
// Transform Sanity image URLs + add ?fm=webp
```

---

## Notes for Implementation

- **AdSense First:** Every route must be a full page load (no SPA), no layout shift
- **Cloudflare Pages:** Use `unoptimized` for Next.js Image or plain `<img>` with dimensions
- **No ISR:** getStaticProps + getStaticPaths only, no revalidate
- **Slug Fallback:** If post is empty/missing, 404 handled by Next.js automatically
- **Social Link Icons:** Use react-icons (already in package.json) for Instagram, X, Globe icons
- **OG Image Fallback:** Script `scripts/generate-og-images.js` already creates `/og/{slug}.png` at build time — just `src` the URL, no recreation needed
- **DefaultThumb:** Pre-renders SVG on the fly (no external load) — preferred for missing blog index coverImages
- **Do NOT reference:** `blogRebuild/old/` folder contains outdated Bootstrap design — it's for reference only, code is not reusable

