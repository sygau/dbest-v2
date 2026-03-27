# Issue: Subject Page Download Card Bloat

## Status: COMPLETED

## Problem

Subject index pages (e.g., `english/index.tsx`, `chinese/index.tsx`, `math/index.tsx`) contain highly repetitive download card markup. Each card follows an identical structure:

```tsx
<div className="col">
  <div className="card h-100 d-flex flex-column">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
    </div>
    <div className="card-footer bg-transparent border-0">
      <a href="#" className="btn btn-info px-4 d-inline-flex gap-2" data-paper-id="{id}">
        <BiDownload style={{ fontSize: 22 }} />
        {buttonText}
      </a>
    </div>
  </div>
</div>
```

This pattern is repeated **dozens of times per page** across **21+ subject pages**, resulting in:
- ~1500-3500 lines per subject page
- Difficult maintenance when styling or functionality changes
- High risk of inconsistency across pages
- Unnecessary code duplication

## Analysis

Sampled pages:
- `pages/english/index.tsx` - ~200 lines, multiple year sections
- `pages/chinese/index.tsx` - ~1766 lines
- `pages/math/index.tsx` - ~2494 lines
- `pages/physics/index.tsx` - ~3487 lines

**Common pattern variables:**
| Variable | Description |
|----------|-------------|
| `title` | Card title (h5) |
| `description` | Card description |
| `paperId` | `data-paper-id` attribute for JS handling |
| `buttonText` | "Download" or "下載" |

**Section pattern:**
- Optional anchor `<div id="..."></div>`
- Centered `<h2>` title
- `<br />` spacing
- Card grid container
- `<hr className="my-4" />` divider

## Solution

Created reusable components in `components/DownloadCard.tsx`:

### `DownloadCard` Component
```tsx
<DownloadCard
  title="Paper 1 Reading"
  description="2024 Paper 1: Reading"
  paperId="2024_P1"
  buttonText="Download"
/>
```

### `PaperSection` Component
```tsx
<PaperSection id="year-2024" title="2024">
  <DownloadCard ... />
  <DownloadCard ... />
</PaperSection>
```

## Benefits
- **Reduced LOC**: Each card reduced from ~15 lines to 1 line
- **Consistency**: Guaranteed identical styling across all pages
- **Maintainability**: Style changes in one place affect all cards
- **Type safety**: Props interface ensures correct usage

## Migration Plan
1. ✅ Create `DownloadCard` and `PaperSection` components
2. ✅ Apply to `english/index.tsx` (1782 → 236 lines, 87% reduction)
3. ✅ Create automated refactoring script: `scripts/refactor-subject-cards.js`
4. ✅ Test on `chinese/index.tsx` (1766 → 241 lines, 86% reduction)
5. ✅ Run script on all 15 subject pages
6. ✅ Fix formatting issues (missing semicolons, indentation)
7. ✅ Verify visual parity with original design
8. ⬜ Replace `index.tsx` with `index_r.tsx` after verification

## Automated Refactoring Script

**Location:** `scripts/refactor-subject-cards.js`

**Usage:**
```bash
# Single subject
node scripts/refactor-subject-cards.js chinese

# All subjects at once
node scripts/refactor-subject-cards.js --all
```

**What it does:**
1. Copies `index.tsx` → `index_r.tsx` (safety backup)
2. Removes `BiDownload` import
3. Adds `DownloadCard, { PaperSection }` import
4. Transforms card blocks to `<DownloadCard ... />` components
5. Transforms section structure to `<PaperSection>...</PaperSection>`
6. Preserves all other page content unchanged

**Subjects to process:**
- bafs, biology, chemistry, chinese-history, citizen, economics
- geography, history, ict, m1, m2, math, physics, ths

## Related
- [INLINE_STYLES_BLOAT.md](./INLINE_STYLES_BLOAT.md) - Similar refactoring for countdown pages
