# dse.best v2 Changelog

## Changelog Format
```
[DATE] [SCOPE] — Summary (LOC change: +X/-Y)
  - Detail 1
  - Detail 2
```

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
