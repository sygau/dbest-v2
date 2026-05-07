# Sanity Schema Notes for Blog Frontend

## Critical Constraints

**ORDERINGS, PREVIEW, GROUPS are CMS-only** — they do NOT affect frontend rendering. Ignore them when building queries/pages.

Some fields **require GROQ logic** in queries (noted below).

---

## Image Fallback Strategy (Important)

### Blog Index / Directory
- **If `coverImage` exists:** Use it (add `?fm=webp` param)
- **If `coverImage` is missing/null:** Render `<DefaultThumb />` component (SVG rendered on-the-fly, fast, no external load)
  - Props: `title`, `subtitle` (category name), `color` (category.color, fallback: #549ee8)
  - **NOT the OG fallback URL** — DefaultThumb is preferred for performance

### Blog Post Page
- **If `coverImage` exists:** Display it (add `?fm=webp` param)
- **If `coverImage` is missing:** Use OG fallback: `<img src="https://dse.best/og/{slug}.png" />`
  - **Note:** Script `scripts/generate-og-images.js` already generates these PNGs at build time
  - **Simple approach:** Just `src` the URL, no need to recreate or fetch from Sharp

---

## author.ts

### displayName
- **Frontend:** Universal author name displayed everywhere
- **Required for:** Author card in post, blog dir indie author row

### isActive
- **Frontend:** GROQ filter needed
- **Logic:** If `isActive == false`, skip/exclude ALL posts published by that author from results
- **If true:** Publish as normal

### Bio
- **Frontend:** Shown ONLY in bottom author card (post page)
- **Not shown:** Blog directory

### Email
- **Frontend:** Render as `<a href="mailto:{email}">{email}</a>` button in author card
- **Required for:** Bottom author card only

### Social Links (array)
- **Frontend:** Generate icon buttons based on platform (Instagram, X, Website)
- **Logic needed:**
  - Instagram / X: render as `@{handle}` link
  - Website: render as clickable link to URL
- **Required for:** Bottom author card

### Avatar
- **Frontend:** Profile picture in author card (bottom of post)
- **Optional** — if missing, skip image, show name + bio only

### authorType (BACKEND ONLY)
- **Ignore completely for frontend** — not needed in blog

### Slug
- **Frontend:** Not typically needed (displayName is primary)
- **Backend use only**

---

## category.ts

### Title
- **Frontend:** Used in filters, tags, labels
- **Required**

### Slug
- **Frontend:** Skip for now (future implementation)
- **Note:** Will be used for category landing pages later

### Description
- **Frontend:** Skip for now (future implementation)
- **Note:** Will be used on category pages

### CoverImage
- **Frontend:** Skip for now (future implementation)
- **Note:** Will be used on category pages

### Color
- **Frontend:** CRITICAL — Used for category badge/tag appearance
- **Where:** Blog index cards, blog post pre-title category badge, related post badges
- **Value format:** Hex code (e.g. `#3b82f6`) or Tailwind token
- **Fallback:** `#549ee8` (use this if NOT set)
- **Implementation note:** May need deterministic hashing logic (see BlogImplementation.md)

### Emoji
- **Frontend:** Skip — not used yet
- **Note:** Reserved for future

### DisplayOrder
- **Frontend:** Controls sort order in category selector/dropdown
- **Where:** Blog index mobile dropdown, category filter
- **Logic:** Lower number = appears first

---

## post.ts

### Title & Slug
- **Frontend:** Post URL is `/blog/[slug]`, title displayed as post heading
- **Required**

### Excerpt
- **Frontend:** Shown in blog directory/index cards
- **Required for card preview**

### Body
- **Frontend:** Main post content, render with Portable Text
- **Note:** Includes inline images with alt text and captions
- **Required**

### CoverImage
- **Frontend:** 
  1. Blog index: If exists, display it (add `?fm=webp`). If missing, use `<DefaultThumb />` instead.
  2. Blog post: If exists, display it (add `?fm=webp`). If missing, fallback to `https://dse.best/og/{slug}.png`
  3. OG meta tag: Use coverImage if available, else `/og/{slug}.png` (generated at build time)
- **Fallback strategy:** See "Image Fallback Strategy" section above
- **Optional but recommended**

### HeroImage
- **Frontend:** ONLY displayed full-width in post, directly after author card, BEFORE body
- **NOT used:** Blog index, og:image, or anywhere else
- **Optional**

### Category
- **Frontend:** Reference to category document
- **Required for:** Badge color, related posts filtering

### Tags
- **Frontend:** Array of strings, displayed as tag badges
- **Optional**

### RelatedPosts
- **Frontend:** 
  - If array is populated: Show those posts
  - If empty: Fallback to latest 3 posts in same category
  - If no same-category posts exist: Show latest 3 posts across all categories
  - Self-reference check: Never show the current post in related section
- **Max 5** in Sanity UI (enforced)

### Author
- **Frontend:** Conditional rendering based on author.mode
  - `disabled` → No author info shown anywhere (anonymous post)
  - `team` → Reference to shared Author document, show author card (if author.isActive == true)
  - `custom` → Inline author info (customDisplayName, customAvatar, customBio)
- **Author.isActive Logic:**
  - If `false`: Skip entire post from listing/results (author is "dead", posts unpublished)
  - If `true`: Publish post normally with author info
  - **Distinction:** `mode` = identity (masked vs named), `isActive` = visibility (alive vs dead)
- **Empty handling:** If mode is `disabled`, skip author card entirely (both post page and blog dir)

### PublishedAt
- **Frontend:** Post date, always display
- **Logic:** 
  - If set: Use this date
  - If empty: Fallback to Sanity's built-in `_createdAt`
- **Required for:** Sorting, date display, SEO lastModified

### ReadingTime
- **Frontend:** Optional estimate in minutes
- **Display:** If set, show "X min read" on post

### ShowInDirectory
- **Frontend:** If `false`, exclude from blog index/listing
- **GROQ:** Add filter `showInDirectory == true`

### ShowViews
- **Frontend:** If `false`, don't display view count
- **Display:** Only relevant if view tracking is implemented

### Pinned
- **Frontend:** If `true`, sort to top of blog directory
- **GROQ:** Sort pinned posts first, then by date descending

### NoIndex
- **Frontend:** If `true`, add `<meta name="robots" content="noindex" />`
- **SEO:** Prevent search engine indexing

### LoadAds
- **Frontend:** If `false`, don't render Google AdSense ads
- **AdSense:** Critical for revenue — skip ads only when intentional

### SEO Fields (seoTitle, seoDescription)
- **Frontend:** 
  - `seoTitle` → `<title>` tag (fallback: title)
  - `seoDescription` → `<meta name="description">` (fallback: excerpt)
- **Optional but recommended for SEO**

---


# Blog Features Checklist

## OG Image Generation

**What:** Pre-generate blog post Open Graph images as PNG at build time.

**How it works:**
- Script reads `data/blog-index.json` for all blog posts
- Generates SVG using post title + category color from `DefaultThumb.tsx`
- Converts SVG → PNG (1200×750) using Sharp (lightweight, no headless browser)
- Caches generated images using `.og-cache.json` (hash of title + category)
- Skips re-generating if cache matches - only regenerates changed posts
- Outputs to `public/og/{slug}.png` for static serving

**Performance:**
- 5000 posts: ~30-60 seconds first build (Sharp is fast)
- Subsequent builds: ~2-5 seconds (most cached)
- Each image: ~50-80 KB (PNG optimized)

**Usage:**
```bash
npm run og:generate        # Generate missing/changed OG images
npm run build:full         # Full build: generates OG → lints → builds Next.js
```

**References in code:**
- Generator: `scripts/generate-og-images.js`
- Output: `public/og/` (in .gitignore)
- Cache: `.og-cache.json` (auto-generated)
