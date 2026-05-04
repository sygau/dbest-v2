# JSON-LD & FAQ Refactor — Phase 4 Migration Guide
# (For Claude Haiku — mechanical page-by-page migration)

## Background

Phases 1-3 of this refactor built a new data layer and updated PageSEO to support it. Phase 4 is the mechanical part: updating every page file to use the new system. This guide tells you exactly what to do for each page type.

The old system called generate* functions from utils/structuredData.ts. The new system passes a subjectKey or pageKey prop to PageSEO, or passes jsonLd arrays directly. Phases 1-3 already created all the data, so your job is to swap out the old call sites.

---

## New Files Created in Phases 1-3

- data/faqs/subjects.ts — subject FAQ arrays (FAQEntry {q, a} format)
- data/faqs/pages.ts — page FAQ arrays
- data/seo/year-slug.ts — yearSlugConfigs + generateYearMeta function
- data/jsonld/helpers.ts — helper functions and WEBSITE_SCHEMA
- data/jsonld/subjects.ts — subjectJsonLd record (17 subjects)
- data/jsonld/pages.ts — pageJsonLd record + buildBlogJsonLd()
- data/jsonld/year-slug.ts — buildYearSlugJsonLd(subject, year)

utils/yearSlugSEO.ts now just re-exports from data/seo/year-slug.ts — all imports still work unchanged.

structuredData.ts is KEPT as reference during this migration. Do not delete it until all pages are migrated.

---

## PageSEO New Props

```tsx
<PageSEO
  title="..."
  description="..."
  subjectKey="chinese"   // auto-adds subject JSON-LD + FAQ
/>

<PageSEO
  title="..."
  description="..."
  pageKey="timer"        // auto-adds page JSON-LD + FAQ
/>

<PageSEO
  title="..."
  description="..."
  jsonLd={[buildYearSlugJsonLd('chinese', year)]}  // manual escape hatch
/>
```

Both subjectKey and pageKey cannot be used together. pageKey takes precedence if both are set (but don't set both).

---

## Migration Type A — Subject Index Pages

Pages: /chinese, /english, /math, /physics, /chemistry, /biology, /ict, /m1, /m2, /geography, /history, /chinese-history, /economics, /bafs, /citizen, /visual-arts, /ths

File pattern: pages/[subject]/index.tsx

### What the old code looks like:

```tsx
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData'

const structuredData = generateSubjectStructuredData('chinese')
const faqStructuredData = generateSubjectFAQStructuredData('chinese')

<PageSEO
  title="..."
  description="..."
  jsonLd={[structuredData, faqStructuredData].filter(Boolean)}
/>
```

### What the new code looks like:

```tsx
// Remove: import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData'
// Remove: const structuredData = ...
// Remove: const faqStructuredData = ...

<PageSEO
  title="..."
  description="..."
  subjectKey="chinese"
/>
```

The subjectKey value must match the key in data/jsonld/subjects.ts. Valid keys:
chinese, english, math, physics, chemistry, biology, ict, m1, m2, geography, history, chinese-history, economics, bafs, citizen, visual-arts, ths

If the old code had ogUrl and other props, keep those. Only swap out the jsonLd prop for subjectKey.

---

## Migration Type B — Year Slug Pages

Pages: /chinese/[year], /english/[year], /math/[year], etc. (one file per subject)

File pattern: pages/[subject]/[year].tsx

### Old code — these pages had NO JSON-LD at all. No imports to remove.

### New code — add buildYearSlugJsonLd:

```tsx
import { buildYearSlugJsonLd } from '../../data/jsonld/year-slug'
// generateYearMeta import stays the same (still from utils/yearSlugSEO)

// In the component (year comes from router/getStaticProps as a string):
<PageSEO
  title={meta.seoTitle}
  description={meta.seoDescription}
  ogUrl={`https://dse.best/${subject}/${year}`}
  jsonLd={[buildYearSlugJsonLd(subject, year)]}
/>
```

Where subject is the slug string ('chinese', 'math', etc.) and year is the year string ('2024', '2023', etc.).

Do NOT add pageKey or subjectKey here. Only jsonLd.

---

## Migration Type C — Special/Tool Pages

Pages: countdown, countdown2027, chat, timer, pomodoro, resources, individual-response, translator

File pattern: pages/countdown.tsx, pages/timer.tsx, etc.

### What the old code looks like:

```tsx
import { generateCountdownStructuredData, generatePageFAQStructuredData } from '../utils/structuredData'

const structuredData = generateCountdownStructuredData()
const faqData = generatePageFAQStructuredData('countdown')

<PageSEO
  title="..."
  description="..."
  jsonLd={[structuredData, faqData].filter(Boolean)}
/>
```

### What the new code looks like:

```tsx
// Remove: import { generateCountdownStructuredData, generatePageFAQStructuredData } from '../utils/structuredData'
// Remove: const structuredData = ...
// Remove: const faqData = ...

<PageSEO
  title="..."
  description="..."
  pageKey="countdown"
/>
```

Valid pageKey values: homepage, countdown, countdown2027, chat, timer, pomodoro, resources, individual-response, translator

Note: blog page uses buildBlogJsonLd which takes dynamic posts. See Type D below.

---

## Migration Type D — Blog Index Page

File: pages/blog/index.tsx

The blog JSON-LD is dynamic (it includes post data). Use the escape hatch:

```tsx
import { buildBlogJsonLd } from '../../data/jsonld/pages'
// Remove: import { generateBlogStructuredData, generatePageFAQStructuredData } from '../../utils/structuredData'

<PageSEO
  title="..."
  description="..."
  pageKey="blog"
  jsonLd={[buildBlogJsonLd(posts)]}
/>
```

This combines the blog FAQ (via pageKey="blog") with the dynamic blog post list (via jsonLd prop). Both get added to the page.

---

## Migration Type E — Homepage

File: pages/index.tsx

Old:
```tsx
import { generateHomepageStructuredData, generateWebsiteStructuredData, generatePageFAQStructuredData } from '../utils/structuredData'
```

New:
```tsx
<PageSEO
  title="..."
  description="..."
  pageKey="homepage"
/>
```

---

## Migration Type F — 12p Pages

The 12p pages use utils/12pStructuredData.ts which is separate from the main structuredData.ts. Leave these alone for now — they can be handled in a follow-up. Do not touch pages/12p/*.tsx.

---

## Import Cleanup Rules

After migrating each page, check for leftover imports from structuredData.ts. Remove any unused imports. The generate* functions are deprecated but structuredData.ts itself stays until all pages are migrated.

Functions being retired (remove imports as you migrate each page):
- generateSubjectStructuredData
- generateSubjectFAQStructuredData
- generateCountdownStructuredData
- generateCountdown2027StructuredData
- generateChatStructuredData
- generateBlogStructuredData
- generateHomepageStructuredData
- generateWebsiteStructuredData
- generatePageFAQStructuredData
- generateResourcesStructuredData
- generateTimerStructuredData
- generatePomodoroStructuredData
- generateIndividualResponseStructuredData
- generateTranslatorStructuredData
- getPageFAQs (used in UI FAQSection components — check before removing)

The subjectData export from structuredData.ts is still used in other parts of the codebase. Do NOT remove that.

---

## Verification Checklist Per Page

After migrating each page, verify:
1. Page renders without TypeScript errors
2. View source and check for application/ld+json script tags
3. For subject pages: two script tags (WebPage schema + FAQPage schema)
4. For year slug pages: one script tag (CollectionPage schema)
5. For tool pages: two script tags (WebPage/SoftwareApplication + FAQPage)
6. Run: npx next build (or next dev) — no compilation errors

---

## Order of Migration (Recommended)

1. Homepage (pages/index.tsx) — simplest, verify pageKey works
2. One subject page (e.g. pages/chinese/index.tsx) — verify subjectKey works
3. One year slug page (e.g. pages/chinese/[year].tsx) — verify buildYearSlugJsonLd
4. Remaining subject pages (16 more)
5. Remaining year slug pages
6. Tool pages (countdown, timer, pomodoro, chat, resources, individual-response, translator)
7. Blog index
8. After all pages done: delete generate* functions from structuredData.ts, keep subjectData
