# Issue: Inline Styles Bloat

## Summary
Multiple pages contain 500-900+ lines of `<style jsx>` blocks, making them hard to maintain, impossible to cache, and slowing builds.

## Affected Files

| File | Approx Lines of `<style jsx>` | Notes |
|------|-------------------------------|-------|
| ~~`pages/countdown.tsx`~~ | ~~700~~ | ✅ **FIXED** — Extracted to `styles/countdown.module.css` |
| ~~`pages/countdown2027.tsx`~~ | ~~700~~ | ✅ **FIXED** — Merged into folder structure |
| `pages/timer.tsx` | ~180 | Timer card, progress, tables |
| `pages/individual-response.tsx` | ~400 | IR practice tool |
| `pages/pomodoro.tsx` | ~200 | Similar to timer |
| `pages/12p/study.tsx` | ~150 | Flashcard styles |
| `pages/12p/quiz.tsx` | ~200 | Quiz interface |

## Root Cause

Pages were built incrementally with quick inline solutions. No established pattern for extracting shared styles.

## Impact

1. **Build performance** — styled-jsx compiles each page's styles at build time
2. **No caching** — styles are inlined in HTML, not external CSS files
3. **Duplication** — countdown and timer share similar card/button styles but duplicate them
4. **Theming fragility** — `var(--bs-*)` references scattered across inline styles, hard to audit

## Example: countdown.tsx

```tsx
<style jsx global>{`
  .countdown-page {
    --primary-gradient: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    --secondary-gradient: linear-gradient(135deg, #7209b7 0%, #f72585 100%);
    /* ... 700 more lines */
  }
`}</style>
```

## Suggested Fix

### Option A: CSS Modules
```
styles/
  countdown.module.css
  timer.module.css
```
- Scoped by default
- External CSS file (cacheable)
- Works with Cloudflare Pages

### Option B: Extend Tailwind Theme
```css
/* tailwind.css */
@layer components {
  .countdown-card {
    @apply bg-[var(--color-card-bg)] rounded-3xl border border-[var(--color-border)];
  }
}
```
- Composable via `className`
- Single source of truth
- Works with existing Tailwind setup

### Option C: Shared Component Primitives
```tsx
// components/ui/Card.tsx
export function Card({ children, className }) {
  return <div className={cn("rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)]", className)}>{children}</div>
}
```
- Reusable across pages
- Encapsulates styling decisions
- Aligns with UI refine goals

## Recommended Approach

1. **Extract tool page styles** (countdown, timer, pomodoro) into `styles/tools.module.css`
2. **Extract 12p styles** (study, quiz) into `styles/12p.module.css`
3. **Create shared primitives** (`Card`, `Button`, `ProgressBar`) for common patterns
4. **Gradually delete** `<style jsx>` blocks as styles are migrated

## Priority

**P1** — High impact on maintainability and build performance. Blocks design system work.

## Related

- `docs/v2/UI_refine.md` — design system approach
- `docs/v2/roadmap.md` — execution timeline
