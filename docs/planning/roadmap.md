# dse.best v2 Roadmap — Priority Stack
*Last updated: 2026-05-01*

## Constraints

- Cloudflare Pages, Next.js Pages Router (static export)
- No SPA — full page loads required for AdSense (NavigationLink enforces this)
- No hydration errors — AdSense-safe
- Performance-first — SEO + user retention

---

## P0 — Critical

### 1. Theme System Unification
**Status:** In progress — dual system working but needs cleanup  
**Problem:** Two parallel theme attributes (`data-bs-theme` + `data-theme`) always set in sync by blocking script. Works correctly but is redundant and will cause drift.  
**Correct order:**
- Step 1: Swap `--bs-*` vars for `--color-*` in inline `style jsx` blocks (pages already partially migrated: timer, pomodoro, individual-response, 12p/*)
- Step 2: Migrate safe pages off Bootstrap utilities → Tailwind (404, index, about, contact, cutoff/*, translator)
- Step 3: Subject pages — verify themes work (Bootstrap utility classes covered by tailwind.css compat layer, may not need touching)
- Step 4: Blog and chat — blocked by bigger refactors, do last
- Step 5 (final): Collapse globals.css theme blocks, remove `data-bs-theme` from blocking script and `applyThemeToDocument()`, remove `--bs-*` aliases from tailwind.css

**Do NOT touch globals.css theme sections or blocking script until all pages are off `--bs-*` vars.**

### 2. SEO / Structured Data Consolidation
**Status:** ✅ Phases 1-3 complete (2026-04-30) — FAQ data extracted to `data/faqs/`, JSON-LD to `data/jsonld/`, `PageSEO` component updated  
**Remaining:** Phase 4 — clean up `structuredData.ts` reference file, finalize `PageHead` component

---

## P1 — High Priority

### 3. Inline Styles → CSS vars
**Problem:** `timer.tsx`, `individual-response.tsx`, `translator.tsx` still have large `style jsx` blocks using `--bs-*` vars  
**Action:** Replace `--bs-*` with `--color-*` equivalents, extract repeated patterns to tailwind.css utility classes  
> ✅ countdown.tsx → CSS module (2026-03-28)  
> ✅ Subject page cards → DownloadCard component, all 15 subjects done

### 4. PageHead Component
**Problem:** Every page manually writes 15+ Head meta tags  
**Action:** `<PageHead metadata={...} />` component — single line per page  
**Blocked by:** SEO consolidation Phase 4

### 5. Blog System Migration
**Status:** Deferred — migrating from Contentful JSON-dump approach to Sanity CMS  
**Current approach:** Fetch Contentful → write to JSON → build reads JSON (fragile)  
**Target:** Sanity with proper content lake queries  
**Do not refactor blog pages until CMS migration is decided**

### 6. Chat Page Refactor
**Status:** Deferred — not in use (dev only), most monolithic page on the site  
**Action:** Full rewrite when chat feature is actually needed

---

## P2 — Medium Priority

### 7. Script Loading Audit
- Keep blocking theme script in `_document.tsx` (FOUC prevention, must stay)
- Consider Cloudflare Zaraz for AdSense/Analytics

### 8. Image Optimization
- Cloudflare Pages has no Next.js Image API
- Use `unoptimized` + explicit `width`/`height` for CLS prevention

### 9. Error Boundaries
- Wrap page content in `<ErrorBoundary>` with friendly fallback

---

## P3 — Low Priority

### 10. CSS Convention Enforcement
Bootstrap utilities (`d-flex`, `mb-4`) still mixed with Tailwind on some pages. Prefer Tailwind for all new code.

### 11. Accessibility Audit
Theme switcher, sidebar toggle, quiz flashcards — missing ARIA roles.

### 12. globals.css Audit
~4400 lines, many rules for deleted pages. Audit after Bootstrap migration is complete.

---

## Execution Order (current)

```
NOW
  Fix --bs-* → --color-* in style jsx on partial pages (timer, pomodoro, individual-response, 12p/*)
  Migrate 404, index, about, contact to Tailwind
  Migrate cutoff/*, translator

SOON
  Subject pages — verify theme coverage, migrate if needed
  PageHead component (after SEO Phase 4)

LATER
  Blog — after Sanity migration decision
  Chat — after feature is scoped

LAST
  Collapse dual theme system (globals.css cleanup, remove data-bs-theme)
```
