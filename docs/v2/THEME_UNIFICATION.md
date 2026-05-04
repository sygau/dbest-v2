# Theme System Unification Plan

## Current Problem — Three Layers of Theme Variables

The theme system is defined in three separate locations that must stay in sync:

### Layer 1: `styles/globals.css` (Bootstrap overrides)
```css
html[data-bs-theme=blue-theme] {
  --bs-body-bg: #0f1535 !important;
  --bs-card-bg: #070c29 !important;
  /* ... */
}
```

### Layer 2: `styles/tailwind.css` (Tailwind/custom vars)
```css
[data-theme="blue"] {
  --color-body-bg: #0f1535;
  --color-card-bg: #070c29;
  /* ... */
}
```

### Layer 3: Blocking `<script>` in `_document.tsx`
```js
document.documentElement.setAttribute('data-bs-theme', theme);
document.documentElement.setAttribute('data-theme', mappedTheme);
document.documentElement.style.setProperty('--color-body-bg', bg);
```

### Layer 4: `useThemeSwitcher.ts` hook (runtime switching)
Must replicate the exact same mapping as the blocking script.

## Root Cause

The site was migrated from a jQuery + Bootstrap SCSS setup to Next.js + Tailwind in stages:
1. Bootstrap SCSS defined `data-bs-theme` vars
2. Tailwind migration added `data-theme` vars
3. The blocking script prevents FOUC by applying both before React hydrates
4. The hook must do the same at runtime

## Proposed Solution

### Single Source of Truth: `data-theme` only

1. **Remove `data-bs-theme`** attribute entirely
2. **Define all vars under `[data-theme="..."]`** in one file (`styles/theme-vars.css`)
3. **Alias Bootstrap vars** to the custom vars (or vice versa) so both naming conventions work:
   ```css
   [data-theme="blue"] {
     --color-body-bg: #0f1535;
     --bs-body-bg: var(--color-body-bg);
     /* one definition, two names */
   }
   ```
4. **Update blocking script** to only set `data-theme`
5. **Update `useThemeSwitcher`** to only set `data-theme`
6. **Search-and-replace** any `data-bs-theme` references in JSX/CSS

### Migration Steps

1. Create `styles/theme-vars.css` with unified definitions
2. Import it in `_app.tsx` (before `globals.css` and `tailwind.css`)
3. Remove duplicate definitions from `globals.css` and `tailwind.css`
4. Update `_document.tsx` blocking script
5. Update `useThemeSwitcher.ts`
6. Update all `[data-bs-theme=...]` CSS selectors to `[data-theme=...]`
7. Test all 4 themes × all pages

### Risk Assessment

- **High risk** — touches every themed component
- **Mitigated by:** doing it in a feature branch, diffing computed styles before/after
- **Rollback:** git revert the branch

### Theme Mapping Reference

| Display Name | `data-theme` | `--color-body-bg` | `--color-card-bg` |
|-------------|-------------|-------------------|-------------------|
| Light | `light` | `#eff1f3` | `#ffffff` |
| Dark | `dark` | `#212529` | `#2b3035` |
| Blue | `blue` | `#0f1535` | `#070c29` |

Semi-dark uses light content area with dark sidebar — handled via sidebar-specific overrides.

## Priority

P0 — this is the root cause of multiple theme-related bugs (stale backgrounds, inconsistent switching).
