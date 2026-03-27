# Monolithic Function Cleanup Plan

## Problem

Several utility files have grown into monolithic megafiles that are hard to maintain, test, and tree-shake. They were built to maximise SEO coverage but the implementation couples unrelated concerns and uses repetitive patterns.

## Target Files

### 1. `utils/structuredData.ts`

**Current state:** Single file containing:
- `generateWebsiteStructuredData()` — JSON-LD for the site
- `generateHomepageStructuredData()` — JSON-LD for homepage
- `generateTimerStructuredData()` — JSON-LD for timer tool
- `generatePageFAQStructuredData(page)` — FAQ schema for multiple pages
- `getMainPageMetadata(page)` — `<Head>` metadata for main pages
- `getTimerPageMetadata()` — metadata for the timer page
- `getPageFAQs(page)` — raw FAQ data for multiple pages

**Problems:**
- Mixes structured data generation, metadata generation, and raw FAQ content
- Every page that imports one function bundles the entire file
- FAQ content is hardcoded alongside schema generators
- No type safety on page keys (uses loose strings)

**Proposed refactor:**
```
utils/seo/
  structured-data.ts    — generic JSON-LD helpers (WebSite, WebPage, FAQPage, BreadcrumbList)
  metadata.ts           — per-page <Head> metadata factory
  faq-data.ts           — raw FAQ content, typed by page key
  index.ts              — barrel export
```

### 2. `utils/12pStructuredData.ts`

**Current state:** Generates 12P-specific JSON-LD (course, FAQ, breadcrumb).

**Proposed refactor:** Merge generic helpers into `utils/seo/structured-data.ts`, keep 12P-specific content in `utils/12p/structured-data.ts`.

### 3. `utils/12pMetadata.ts`

**Current state:** Returns `<Head>` metadata for 12P pages (index, study, quiz).

**Proposed refactor:** Move into `utils/seo/metadata.ts` as part of the unified metadata system, or keep as `utils/12p/metadata.ts` if 12P-specific logic is complex enough.

### 4. `utils/changelogData.ts`

**Current state:** Hardcoded changelog entries.

**Proposed refactor:** Move to a JSON file in `public/data/changelog.json` or a CMS entry. Import statically via `getStaticProps`.

## Execution Plan

1. **Create `utils/seo/` folder** with typed interfaces
2. **Extract FAQ content** into `faq-data.ts` — pure data, no schema logic
3. **Extract generic JSON-LD builders** — `buildFAQSchema()`, `buildBreadcrumbSchema()`, `buildWebPageSchema()`
4. **Extract metadata factory** — `getPageMetadata(pageKey)` with a typed lookup map
5. **Update imports** in all pages (index, timer, pomodoro, 12p/*, blog/*, etc.)
6. **Verify** structured data output is identical (diff JSON-LD in `<script>` tags before/after)
7. **Delete** old monolithic files once all imports are migrated

## Priority

Medium — no user-facing impact, but significantly improves maintainability for future feature work.
