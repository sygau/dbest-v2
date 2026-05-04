# dse.best v2 Changelog

## [2026-05-04] — Blog Post Style Fixes (9-issue pass)
What: Breadcrumb → PageBreadcrumb; badges → Badge component (sharp, 0.8rem/500); skeleton loading for hero + figure + related images with shadow/glow; link highlight style matching r4-link; blockquote non-italic; light-mode contrast fixes for blockquote/pre/table/share-btn/hr; blue-theme table header dark blue + zebra fix; related posts h3
Files: pages/blog/post.tsx, styles/blog-post.css
Notes: Light page bg (#eff1f3) vs card-inner-bg (#f3f4f6) near-identical — explicit hex values used for blockquote (#e1e4e8), pre (#d8dce3), zebra (#e5e8ec); blue theme thead overridden to #0d1d55, even rows to #1a2a68; Skeleton uses absolute inset-0 rounded-none pattern; no transitions per design rules

## [2026-05-04] — Blog Post Mockup (Sanity rebuild prototype)
What: Prototype blog post page with Medium-style centered layout, no card wrapper, full rich-text elements, Cantonese dummy content
Files: pages/blog/post.tsx (new), styles/blog-post.css (new), pages/_app.tsx
Notes: No .card.rounded-4 — content sits on body-bg directly; max-width 760px centered; blog-post.css is standalone (no globals pollution); all three themes compatible via CSS vars; rich-text includes table, code block, blockquote, figure, lists, HR; end author card + related posts grid

## [2026-05-01] — Phase 1: Blog CSS Extraction from globals.css
What: Extracted all blog-specific CSS (~550 lines) from globals.css into dedicated styles/blog-content.css; imported globally in _app.tsx; removed duplicate blog styles from globals.css
Files: styles/blog-content.css (new), pages/_app.tsx, styles/globals.css, pages/blog/[slug].tsx
Notes: .post-content typography, .blog-container/sidebar layout, image handling, table styling, and dark theme variants now consolidated in single CSS file. globals.css reduced by ~650 lines. Phase 2 target: extract chat CSS next.

## [2026-04-30] — JSON-LD & FAQ Refactor Phases 1-3
What: Extracted all FAQ and JSON-LD data out of utils/structuredData.ts into typed data files; added subjectKey/pageKey props to PageSEO; added year-slug JSON-LD (previously missing); slimmed yearSlugSEO.ts to a re-export
Files: data/faqs/subjects.ts, data/faqs/pages.ts, data/seo/year-slug.ts, data/jsonld/helpers.ts, data/jsonld/subjects.ts, data/jsonld/pages.ts, data/jsonld/year-slug.ts, components/PageSEO.tsx, utils/yearSlugSEO.ts
Notes: structuredData.ts kept as reference for phase 4 migration; year-slug pages now get CollectionPage schema for the first time; pageFaqs/subjectFaqs use {q,a} format matching faqSchema.ts

## [2026-04-30] — 12p + Flashcard Bootstrap→Tailwind, shared PageBreadcrumb
What: Migrated 12p/index.tsx and Flashcard.tsx off Bootstrap; created PageBreadcrumb component; applied to individual-response.tsx and 12p/index.tsx
Files: pages/12p/index.tsx, components/Flashcard.tsx, components/PageBreadcrumb.tsx, pages/individual-response.tsx
Notes: PageBreadcrumb uses page-breadcrumb/breadcrumb-title/breadcrumb CSS already in tailwind.css; showHome prop adds the bx-home-alt link; Flashcard replaced card/card-body Bootstrap classes with fc-card/fc-body style jsx classes

## Changelog Format
```
[DATE] [SCOPE] — Summary (LOC change: +X/-Y)
  - Detail 1
  - Detail 2
```

---

## [2026-04-30] — 12p Study & Quiz: Bootstrap → Tailwind migration
What: Rewrote study.tsx and quiz.tsx from Bootstrap to Tailwind + CSS vars; pre-load all JSON data at build time via getStaticProps; outline button for exit; quiz input locked to 16px
Files: pages/12p/study.tsx, pages/12p/quiz.tsx, styles/tailwind.css
Notes: allPassageData now bundled at build time — no runtime fetch on Start; both pages share same getStaticProps pattern; alert-success added to tailwind.css compat layer; results screen redesigned without Bootstrap list-group-item-* variants; Button outline (violet) replaces the red end-btn for 離開 actions

---

## [2026-04-30] — Bootstrap → Tailwind: Tool pages migration
What: Replaced all Bootstrap utility classes in timer, pomodoro, individual-response with Tailwind equivalents; `style jsx` blocks and `--bs-*` var references untouched
Files: pages/timer.tsx, pages/pomodoro.tsx, pages/individual-response.tsx
Notes: `--bs-*` vars in style blocks left as-is (Bootstrap still installed; theme unification is a separate P0 task). Breadcrumb component classes (breadcrumb, breadcrumb-item) kept since they're a site-wide pattern. Bootstrap spacing conversions: mb-3→mb-4, mb-4→mb-6, mb-5→mb-12, pe/ps-3→pr/pl-4, g-3→gap-4

---

## [2026-04-29] — Design System v4: Refinements + 5 New Components + Page Reorganization
What: Fixed bg inversion (Card now uses --color-card-inner-bg); added Toggle, ConfigItem/ConfigSection, Toast/ToastContainer, Dialog, DropdownMenu; Badge removes soft shape, dot gets translateY(3px) fix; Callout ghost text moved left + opacity raised to 0.15; FileCard default changed to stacked; redesign-4 page reorganized into 8 tiers (Foundation→Content)
Files: components/ui/Card.tsx, components/ui/Badge.tsx, components/ui/Callout.tsx, components/ui/FileCard.tsx, components/ui/Toggle.tsx, components/ui/ConfigItem.tsx, components/ui/Toast.tsx, components/ui/Dialog.tsx, components/ui/DropdownMenu.tsx, pages/redesign-4.tsx
Notes: Dialog uses position:fixed so it breaks out of the card container correctly; DropdownMenu uses relative positioning — keep trigger wrapper as relative; Switch onChange→onCheckedChange API

---

## [2026-04-29] — Design System v4: Full Rebuild + 5 New Components
What: Complete redesign-4 rewrite merging all r5 improvements; card.rounded-4 gets theme-specific container bg; 5 new components (Chip, EmptyState, Callout, RadioGroup, FileCard); black-header table; stronger skeleton shimmer; Chinese text rendering comparison; form margin-top fixes; global iOS 16px input font-size; --color-table-head-bg CSS vars
Files: pages/redesign-4.tsx, components/ui/Chip.tsx, components/ui/EmptyState.tsx, components/ui/Callout.tsx, components/ui/RadioGroup.tsx, components/ui/FileCard.tsx, components/ui/Button.tsx, components/ui/Badge.tsx, components/ui/Input.tsx, components/ui/Table.tsx, styles/tailwind.css
Notes: card.rounded-4 bg: #f2f2f2 light / #1e1e1e dark / #18204a blue. tc-sharp class = antialiased + optimizeLegibility for Retina CJK. RadioGroup live demo with useState. FileCard is DSE-specific download row.

---

## [2026-04-28] — Redesign-4 Component Refinements + TC Clones
What: Fixed icon alignment in alerts (icon now inline with title via `icon` prop), added theme-aware alert colors for dark/blue, fixed focus ring on inputs (ring instead of border-width change), added accordion content top padding, added skeleton shimmer animation, fixed icon card layout (rounded container, outline CTA), expanded forms (password/select/date/textarea), added Traditional Chinese clone for every section
Files: components/ui/Alert.tsx, components/ui/Accordion.tsx, components/ui/Skeleton.tsx, components/ui/Input.tsx, pages/redesign-4.tsx, styles/tailwind.css
Notes: Alert variants expanded to info/success/warning/destructive with CSS classes in tailwind.css that have dark/blue-theme overrides. `AlertIcon` export kept for compat. Skeleton now uses `skeleton-shimmer` class with a soft travelling highlight. Search button uses `!h-9 !w-9 !px-0` override to match input height without touching Button.tsx.

---

## [2026-04-28] — Tech Debt Day 3: Structural Cleanup
What: Deleted dead deployment config, nav experiment components/hooks, script artifacts; fixed broken module import; simplified NavigationLink
Files: vercel.json, .vercelignore, wrangler.toml, scripts/*, data/view-count-*.json, components/Traditional*.tsx, components/PageTransition.tsx, hooks/useNavigationMode.ts + 5 dead hooks, public/sass_legacy/, utils/pageMetadata.legacy.ts→pageMetadata.ts, utils/structuredData.ts, components/NavigationLink.tsx, pages/_app.tsx, package.json, .gitignore
Notes: pageMetadata.legacy.ts broke module resolution (double-dot). NavigationLink is now a pure anchor, always MPA. PageTransition was a no-op in traditional mode. Dead hook chain had no callers in pages or components.

---

## 2026-04-26 SEO — PageSEO component migration across all pages

What: Replaced all raw `<Head>` SEO blocks with the `PageSEO` component across 57+ pages
Files: `components/PageSEO.tsx`, all `pages/**/[year].tsx` (16 files), `pages/12p/study.tsx`, `pages/12p/quiz.tsx`, `pages/blog/[slug].tsx`, `pages/cutoff/[subject].tsx`
Notes: PageSEO now supports `string` robots (not just tuple), `canonical` prop. THS injects faqData via `jsonLd` spread. Blog/cutoff keep a minimal `<Head>` for twitter/theme-color tags not covered by PageSEO. timer.tsx retains Head only for inline CSS.

---

## 2026-03-28 COMPONENTS — DownloadCard component + refactoring script (+320/-3300)

**Files changed:**
- **NEW:** `components/DownloadCard.tsx` (DownloadCard + PaperSection components)
- **NEW:** `scripts/refactor-subject-cards.js` (automated refactoring script)
- `pages/english/index.tsx` refactored (1782 → 236 lines, 87% reduction)
- **NEW:** 15 `index_r.tsx` files created for review
- **RENAMED:** `docs/issues/CMPT_SUBJECT_PAGE_CARD_BLOAT.md`

**Changes:**
- Created reusable `DownloadCard` and `PaperSection` components
- Created automated Node.js refactoring script with regex transformations
- Script supports single subject or `--all` flag for batch processing
- Outputs to `index_r.tsx` for safe review before replacing original

**Batch Results:**
```
✅ english:      1782 → 236 lines (87% reduction)
✅ chinese:      1766 → 241 lines (86% reduction)
✅ math:         2494 → 294 lines (88% reduction)
✅ physics:      3487 → 394 lines (89% reduction)
✅ chemistry:    2707 → 352 lines (87% reduction)
✅ biology:      3200 → 411 lines (87% reduction)
✅ bafs:         3619 → 437 lines (88% reduction)
✅ economics:    2639 → 362 lines (86% reduction)
✅ geography:    2561 → 343 lines (87% reduction)
✅ history:      2321 → 323 lines (86% reduction)
✅ ict:          3672 → 398 lines (89% reduction)
✅ m1:           1850 → 306 lines (83% reduction)
✅ m2:           3699 → 393 lines (89% reduction)
✅ chinese-history: 837 → 197 lines (76% reduction)
✅ citizen:       169 → 101 lines (40% reduction)
✅ ths:           962 → 210 lines (78% reduction)
```

**Total:** 36,067 → 4,195 lines (88% reduction)

**Visual:** No changes — identical to original

**Next:** Replace `index.tsx` with `index_r.tsx` after verification

---

## 2026-03-28 COUNTDOWN — Refactored to folder structure (+420/-1868)

**Files changed:**
- `pages/countdown.tsx` → `pages/countdown/index.tsx` (DSE 2026)
- `pages/countdown2027.tsx` → `pages/countdown/2027.tsx` (DSE 2027)
- **NEW:** `styles/countdown.module.css` (shared CSS module)

**Changes:**
- Extracted ~700 lines of duplicated `<style jsx>` to CSS module
- Reduced per-page code from ~925 lines to ~170 lines each
- Folder structure enables easy addition of future years (2028.tsx, etc.)
- CSS now uses theme variables from tailwind.css/globals.css
- Removed unused CSS variables and redundant rules
- Removed unused keyframe animations (slideInUp, shimmer, pulse)

**Theme consistency:**
- Uses `var(--bs-body-color)`, `var(--bs-card-bg)`, `var(--bs-border-color)`
- Purple accent (#8b5cf6 dark, rgb(117,76,241) light) preserved via CSS module

**Visual:** No changes — pixel-identical to original

**To add DSE 2028:**
1. Copy `pages/countdown/2027.tsx` → `pages/countdown/2028.tsx`
2. Update: targetDate, metadata key, structured data function, title/description
3. Add metadata in `utils/structuredData.ts`

---

## Changelog Conventions

- **SCOPE**: COUNTDOWN, THEME, SEO, PERF, DOCS, FIX
- **LOC change**: Approximate lines added/removed
- Keep entries under 20 lines
- Link to issue docs when relevant

## [2026-04-29] [DESIGN] — Redesign-4 component refinements
What: amend redesign-4 component system per design-review feedback
Files: components/ui/{FileCard,EmptyState,Callout,Chip,Badge,Avatar,Table}.tsx, styles/tailwind.css, pages/redesign-4.tsx
Notes:
  - FileCard: dropped squircle icon, replaced with 3 line-art variants (doc/stacked/ribbon) via iconVariant prop. Icon shifted +4px vertically.
  - EmptyState: added 3 iconVariant styles (ring/bare/box) so I can pick a non-AI-slop frame.
  - Callout: new `ghost` prop renders the icon as a translucent watermark on the left of the bubble.
  - Chip removable: split design — pill divided by hairline rule; X is thicker (strokeWidth 2.5) and larger (12px).
  - Chip outline: border-2 instead of border-1 to render cleanly on low-DPI screens.
  - Badge: corners sharpened (default rounded-sm), added `shape` prop (sharp|square|soft) and `dot` prop. Page now offers 4 designs to choose from.
  - Avatar: CJK detection via Unicode range, larger 16px font for Chinese initials.
  - Table: zebra striping moved to .ui-table-row class; blue theme even rows now use --color-card-bg instead of overlay-bg (was clashing with page bg).
  - tailwind.css: light-theme warning alert deepened (border-color rgba(180,83,9,0.32), bg rgba(217,119,6,0.12)). Added :lang(zh) global rule for antialiased + palt + letter-spacing on CJK.
  - redesign-4 page: shadow-fade alert variant replaced with proper ghost-watermark variant; warning icons use theme-aware .r4-warn-icon (amber-700 light / amber-400 dark / amber-300 blue); card heading icons shifted to marginTop 5px.

## [2026-04-29] �X Remove Announcement Bar
What: Completely removed the legacy AnnouncementBar component, configuration, and associated CSS.
Files: components/AnnouncementBar.tsx, config/announcement.ts, styles/globals.css, docs/site_info.md
Notes: Cleaned up unused variables and elements related to the announcement UI system.
