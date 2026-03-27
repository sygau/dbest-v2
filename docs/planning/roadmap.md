# dse.best v2 Roadmap — Priority Stack

## Constraints

- **Cloudflare Pages** with Next.js Pages Router (static export)
- **No SPA** — specialized full page loads required for AdSense revenue (see NavigationLink component, and LayoutPreserver component(more than one) for naviagation optmization)
- **No hydration errors** — AdSense-safe, minimal React complexity
- **Performance-first** — site speed is critical for SEO + user retention
- **Private mode removal** — planned, ignore for now

---

## P0 — Critical (Blocks Everything Else)

### 1. Theme System Unification
**Status:** Documented in `THEME_UNIFICATION.md`  
**Problem:** Triple-layer variables (`data-bs-theme`, `data-theme`, inline `--color-*`) cause sync bugs.  
**Action:** Single source of truth via `[data-theme]` only. Alias `--bs-*` to `--color-*`.  
**Risk:** High — touches every themed component. Feature branch required.

### 2. SEO/Structured Data Consolidation
**Problem:** JSON-LD fragmented across 3+ files (1400+ lines in `structuredData.ts` alone), hardcoded FAQ arrays, no centralized management.  
**Action:** See **Approaches** section below.  
**Impact:** Build performance, maintainability, remote editing capability.

---

## P1 — High Priority (Core Architecture)

### 3. Inline Styles → Design Tokens
**Problem:** Pages like `timer.tsx`, `individual-response.tsx` have massive inline styles. `SubjectCard.tsx` is 100% inline styles.  
**Action:** Extract to CSS modules or extend Tailwind theme. Create reusable component primitives.  
**Benefit:** Faster builds, cacheable CSS, easier theming.

> ✅ **Completed:** `countdown.tsx` refactored to CSS module (2026-03-28). See `styles/countdown.module.css`.

### 4. PageHead Component
**Problem:** Every page manually constructs 15+ `<Head>` meta tags.  
**Action:** Create `<PageHead metadata={...} />` component accepting typed metadata object.  
**Benefit:** Single line per page, prevents OG tag bugs, enables centralized SEO updates.

### 5. Monolithic Utils Cleanup
**Status:** Documented in `MONOLITHIC_CLEANUP.md`  
**Action:**
```
utils/seo/
  structured-data.ts   — generic JSON-LD builders
  metadata.ts          — PageHead factory
  faq-data.ts          — pure FAQ data (or external)
```

---

## P2 — Medium Priority (Performance + DX)

### 6. Script Loading Audit
**Problem:** `next/script` reportedly slowed the site. Current approach uses `dangerouslySetInnerHTML` blocking scripts.  
**Root Cause:** `next/script` with `strategy="afterInteractive"` waits for hydration, delaying critical scripts.  
**Action:**
- Keep blocking theme script in `_document.tsx` (FOUC prevention)
- Use `strategy="beforeInteractive"` for critical scripts
- Consider Cloudflare Zaraz for AdSense (moves to worker, reduces main-thread blocking)
- Audit which scripts truly need to block render

### 7. Image Optimization
**Problem:** Plain `<img>` tags everywhere. No responsive images, no lazy loading.  
**Constraint:** Cloudflare Pages doesn't support Next.js Image Optimization API.  
**Options:**
1. Cloudflare Image Resizing (paid)
2. `next/image` with `unoptimized` + manual `srcset`
3. Third-party image CDN (imgix, Cloudinary)
**Recommendation:** Start with `unoptimized` + explicit `width`/`height` for CLS prevention.

### 8. Error Boundaries
**Problem:** Component throws → entire page crashes.  
**Action:** Wrap page content in `<ErrorBoundary>` with friendly fallback UI.

---

## P3 — Low Priority (Polish)

### 9. CSS Convention Enforcement
**Problem:** Bootstrap utilities (`d-flex`, `mb-4`) mixed with Tailwind (`flex`, `mb-4`).  
**Action:** Pick one per component. Prefer Tailwind for new code. Document in `UI_refine.md`.

### 10. Form Validation
**Action:** Consider `zod` + `react-hook-form` for quiz/contact forms.

### 11. Accessibility Audit
**Problem:** Theme switcher, sidebar toggle, quiz flashcards lack ARIA.  
**Action:** axe-core audit, add `role`, `aria-label`, `tabIndex`.

### 12. Dead Code Removal
**Candidates:**
- `SubjectCardVariants.tsx` — superseded by `tw/SubjectCard.tsx`
- `LayoutPreserver.tsx` — uses old `.sidebar-wrapper` selectors
- ~4400 lines in `globals.css` — many rules for deleted pages

---

## SEO/Structured Data — Approaches

### Approach A: Airtable CMS

**How it works:**
1. Create Airtable base with tables: `Pages`, `FAQs`, `Subjects`, `StructuredData`
2. Use Airtable API in `getStaticProps` to fetch data at build time
3. Generate JSON-LD from Airtable records
4. Remote editing via Airtable UI (no code changes)

**Pros:**
- Non-technical team can edit SEO data
- Instant visibility of all pages/FAQs in one place
- Audit trail (Airtable history)
- Free tier sufficient for this scale

**Cons:**
- External dependency
- Build-time API calls (cache aggressively)
- Schema changes require code updates

**Implementation:**
```ts
// lib/airtable.ts
import Airtable from 'airtable';
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appXXX');

export async function getPageSEO(pageKey: string) {
  const records = await base('Pages').select({ filterByFormula: `{key} = '${pageKey}'` }).firstPage();
  return records[0]?.fields;
}

export async function getPageFAQs(pageKey: string) {
  const records = await base('FAQs').select({ filterByFormula: `{page} = '${pageKey}'` }).all();
  return records.map(r => ({ question: r.fields.question, answer: r.fields.answer }));
}
```

**Airtable Schema:**
```
Pages:
  - key (text, primary)
  - title (text)
  - description (long text)
  - ogImage (URL)
  - robots (text)

FAQs:
  - page (link to Pages)
  - question (text)
  - answer (long text)
  - order (number)

Subjects:
  - key (text)
  - nameZh (text)
  - nameEn (text)
  - description (long text)
  - category (single select: core/elective)
```

---

### Approach B: JSON Files in `/data`

**How it works:**
1. Move all metadata/FAQs to JSON files: `data/seo/pages.json`, `data/seo/faqs.json`
2. Import in `getStaticProps`
3. Edit JSON directly or via script

**Pros:**
- No external dependency
- Version controlled
- Works offline

**Cons:**
- Requires code commit for changes
- No UI for non-technical editors
- Harder to visualize relationships

**Implementation:**
```json
// data/seo/pages.json
{
  "homepage": {
    "title": "HKDSE Past Papers...",
    "description": "...",
    "ogImage": "..."
  }
}
```

```ts
// utils/seo/metadata.ts
import pagesData from '../../data/seo/pages.json';
export function getPageMetadata(key: string) {
  return pagesData[key];
}
```

---

### Approach C: Hybrid (Current + Airtable for FAQs Only)

**How it works:**
- Keep hardcoded page metadata (it changes rarely)
- Move FAQs to Airtable (they change more often, are more numerous)

**Pros:**
- Minimal migration effort
- FAQs are the main pain point (1000+ lines of hardcoded Q&As)
- Page metadata is compact enough to stay in code

**Recommendation:** Start with **Approach C**, migrate to **Approach A** if full CMS needed.

---

### Approach D: Contentful Extension

**How it works:**
- Already using Contentful for blog
- Add content types: `PageSEO`, `FAQ`, `SubjectInfo`
- Query via GraphQL in `getStaticProps`

**Pros:**
- Single CMS for all content
- Rich editor UI
- Already integrated

**Cons:**
- Contentful pricing at scale
- Overkill for simple key-value metadata
- Slower builds (more API calls)

---

## Cloudflare Pages Considerations

### What Works Well
- Static export → edge CDN serving
- `_headers` / `_redirects` for caching/routing
- Automatic Brotli compression
- Early Hints (103) for critical resources

### What to Watch
- No Next.js Image Optimization API (use `unoptimized`)
- No ISR (Incremental Static Regeneration) — full rebuild on content change
- No edge middleware (Pages Router only)
- `next/script` strategy timing differs from Vercel

### Optimization Opportunities
1. **Cache-Control: immutable** for hashed assets
2. **Cloudflare Zaraz** for AdSense/Analytics (worker-based, reduces main-thread blocking)
3. **Preload critical CSS** above-the-fold
4. **Purge cache on deploy** via Cloudflare API

---

## Migration Path (Bootstrap → Tailwind)

### Current State
- Bootstrap 5 for grid, utilities, components (buttons, cards, alerts)
- Tailwind v4 for new components (sidebar, layout, subject cards)
- `globals.css` (~4500 lines) contains Bootstrap overrides + legacy styles

### Strategy
1. **Don't remove Bootstrap yet** — too many pages depend on it
2. **New components: Tailwind only** — no new Bootstrap usage
3. **Refactor incrementally** — one page at a time, replace Bootstrap utilities with Tailwind
4. **Extract shared styles** — move repeated `<style jsx>` to Tailwind components
5. **Final cleanup** — when all pages migrated, audit and remove unused Bootstrap CSS

### Tailwind Equivalents Cheat Sheet
| Bootstrap | Tailwind |
|-----------|----------|
| `d-flex` | `flex` |
| `d-none d-md-block` | `hidden md:block` |
| `mb-4` | `mb-4` (same) |
| `col-6` | `w-1/2` or `grid-cols-2` |
| `text-muted` | `text-[var(--color-muted)]` |
| `btn btn-primary` | Custom button component |

---

## Non-Goals (Explicitly Out of Scope)

- **App Router migration** — Pages Router is stable, CF Pages compatible. App Router + static export has edge cases.
- **Full SPA with next/link** — Kills AdSense impressions.
- **Server components** — Not compatible with static export.
- **Blog system overhaul** — Explicitly deferred ("ignore blog mess for now").

---

## Execution Order

```
Week 1-2: Theme Unification (P0)
  └─ Feature branch, test all 4 themes × all pages

Week 3-4: SEO Consolidation (P0)
  └─ Decide Airtable vs JSON
  └─ Migrate FAQs first (biggest win)
  └─ Create PageHead component

Week 5-6: Inline Styles Extraction (P1)
  └─ ✅ countdown.tsx → CSS module (DONE)
  └─ ✅ Subject page cards → DownloadCard component + refactor script
      └─ english/index.tsx DONE (87% reduction)
      └─ All 15 subjects DONE (88% total reduction)
      └─ Created index_r.tsx files for review
  └─ timer.tsx, individual-response.tsx
  └─ SubjectCard design tokens

Week 7+: P2/P3 items in priority order
```
