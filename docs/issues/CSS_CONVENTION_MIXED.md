# Issue: Mixed CSS Conventions

## Summary
Bootstrap 5 utilities and Tailwind classes are used inconsistently across the codebase, sometimes within the same component. This creates confusion, increases bundle size, and makes maintenance difficult.

## Examples of Mixing

### Same element, both frameworks:
```tsx
// pages/index.tsx
<div className="hidden sm:flex items-center mb-3">  // Tailwind
  <div className="text-xl font-medium pr-3 border-r border-[var(--color-border)] text-[var(--color-heading)]">  // Tailwind
```

```tsx
// pages/countdown.tsx
<div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">  // Bootstrap
```

### Same purpose, different approaches:
```tsx
// Bootstrap approach
className="d-flex justify-content-center align-items-center"

// Tailwind approach  
className="flex justify-center items-center"
```

### Inline styles mixed with both:
```tsx
// pages/index.tsx
<a
  className="btn btn-lg d-inline-flex align-items-center gap-2"  // Bootstrap
  style={{
    background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,...)',  // Inline
    borderRadius: 25,
    padding: '12px 32px',
    // ...
  }}
>
```

## Affected Areas

| Area | Primary Convention | Issue |
|------|-------------------|-------|
| Layout (`tw/Layout.tsx`) | Tailwind | Clean |
| Sidebar (`tw/Sidebar.tsx`) | Tailwind | Clean |
| Pages (countdown, timer) | Bootstrap + inline | Heavy mixing |
| Blog pages | Bootstrap | Legacy |
| Subject pages | Bootstrap | Legacy |
| New components | Tailwind | Should stay Tailwind |

## Impact

1. **Bundle size** — both Bootstrap CSS and Tailwind CSS loaded
2. **Cognitive load** — developers must know both systems
3. **Specificity conflicts** — `!important` wars between frameworks
4. **Search difficulty** — "where is this style defined?"
5. **AI assistance** — hard to prompt consistently when patterns vary

## Current CSS Files

| File | Lines | Purpose |
|------|-------|---------|
| `styles/globals.css` | ~4500 | Bootstrap overrides, legacy styles, theme vars |
| `styles/tailwind.css` | ~724 | Tailwind v4 config, theme vars, base styles |

## Suggested Approach

### 1. Establish Convention
- **New code:** Tailwind only
- **Existing pages:** Don't refactor unless touching that file
- **Shared components:** Tailwind only

### 2. Document Equivalents
See `docs/v2/roadmap.md` for cheat sheet:
| Bootstrap | Tailwind |
|-----------|----------|
| `d-flex` | `flex` |
| `d-none d-md-block` | `hidden md:block` |
| `justify-content-center` | `justify-center` |
| `align-items-center` | `items-center` |
| `mb-4` | `mb-4` |
| `text-muted` | `text-[var(--color-muted)]` |

### 3. Gradual Migration
When touching a file:
1. Replace Bootstrap utilities with Tailwind equivalents
2. Extract inline styles to Tailwind classes or components
3. Remove unused Bootstrap classes

### 4. Lint Rule (Future)
Consider ESLint rule to warn on Bootstrap utility class usage in new files.

## Priority

**P3** — Low urgency but compounds over time. Address opportunistically.

## Related

- `docs/v2/UI_refine.md` — design system decisions
- `docs/v2/roadmap.md` — migration path section
