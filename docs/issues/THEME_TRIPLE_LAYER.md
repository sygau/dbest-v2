# Issue: Theme System Triple-Layer Variables

## Summary
Theme variables are defined in three separate locations that must stay in sync, causing bugs when one layer is updated without the others.

## The Three Layers

### Layer 1: globals.css (Bootstrap overrides)
```css
html[data-bs-theme=blue-theme] {
  --bs-body-bg: #0f1535 !important;
  --bs-card-bg: #070c29 !important;
  --bs-secondary-color: rgba(211, 215, 220, 0.75) !important;
  /* ... */
}
```
**Lines:** 25-72 in `styles/globals.css`

### Layer 2: tailwind.css (Tailwind/custom vars)
```css
[data-theme="blue"] {
  --color-body-bg: #0f1535;
  --color-card-bg: #070c29;
  --color-secondary: rgba(211, 215, 220, 0.75);
  /* ... */
}
```
**Lines:** 117-151 in `styles/tailwind.css`

### Layer 3: Blocking script in _document.tsx
```js
var m = {'blue-theme':'blue','dark':'dark','semi-dark':'light','light':'light'};
var theme = m[t] || t;
document.documentElement.setAttribute('data-theme', theme);
document.documentElement.setAttribute('data-bs-theme', t);
document.documentElement.style.setProperty('--color-body-bg', 
  theme === 'dark' ? '#212529' : theme === 'blue' ? '#0f1535' : '#eff1f3');
```

### Layer 4: useThemeSwitcher.ts (runtime switching)
Must replicate the exact same mapping and variable assignments.

## The Sync Problem

When switching themes:
1. `localStorage.selectedTheme` stores Bootstrap name (e.g., `blue-theme`)
2. Blocking script maps to Tailwind name (e.g., `blue`)
3. Sets both `data-bs-theme` and `data-theme` attributes
4. Sets inline `--color-body-bg` for immediate FOUC prevention
5. React hydrates, `useThemeSwitcher` takes over
6. Hook must do the same thing or themes desync

**Bugs that occurred:**
- Hook only updated `data-bs-theme` → Tailwind vars stayed stale → wrong sidebar colors
- Inline `--color-body-bg` not updated → body background didn't change
- Missing `--bs-secondary-color` for blue theme → black text on blue background

## Current Workarounds

In `globals.css`, variables are defined with `!important` at `html[data-bs-theme=...]` level to force override. This works but:
- Requires `!important` everywhere
- Hard to trace which layer "wins"
- Duplicated hex values across files

## Suggested Fix

### Single Source of Truth: `data-theme` Only

1. **Remove `data-bs-theme`** attribute entirely
2. **Define ALL vars under `[data-theme="..."]`** in one file
3. **Alias Bootstrap vars** to custom vars:
```css
[data-theme="blue"] {
  --color-body-bg: #0f1535;
  --bs-body-bg: var(--color-body-bg);  /* Bootstrap alias */
  
  --color-card-bg: #070c29;
  --bs-card-bg: var(--color-card-bg);
  /* etc */
}
```
4. **Update blocking script** to only set `data-theme`
5. **Update `useThemeSwitcher`** to only set `data-theme`
6. **Search-and-replace** `data-bs-theme` → `data-theme` in CSS selectors

### Migration Files

**Create:** `styles/theme-vars.css`
```css
/* Single source of truth for all theme variables */
[data-theme="light"] { /* ... */ }
[data-theme="dark"] { /* ... */ }
[data-theme="blue"] { /* ... */ }
```

**Import order in `_app.tsx`:**
```tsx
import '../styles/theme-vars.css'  // First — defines vars
import '../styles/tailwind.css'    // Uses vars
import '../styles/globals.css'     // Uses vars (legacy)
```

**Update `_document.tsx` blocking script:**
```js
var t = localStorage.getItem('selectedTheme') || 'light';
var map = { 'blue-theme': 'blue', 'semi-dark': 'light' };
var theme = map[t] || t;
document.documentElement.setAttribute('data-theme', theme);
// Remove: data-bs-theme
// Remove: inline --color-body-bg (now in CSS)
```

## Risk Assessment

- **High risk** — touches every themed component
- **Mitigated by:** 
  - Feature branch
  - Diff computed styles before/after
  - Test all 4 themes × high-traffic pages
- **Rollback:** `git revert` the branch

## Theme Mapping Reference

| User Selection | `data-theme` | Body Background |
|---------------|-------------|-----------------|
| Light | `light` | `#eff1f3` |
| Dark | `dark` | `#212529` |
| Blue Theme | `blue` | `#0f1535` |
| Semi-Dark | `light`* | `#eff1f3` |

*Semi-dark uses light content with dark sidebar — handled via sidebar-specific CSS.

## Priority

**P0** — Root cause of multiple theme bugs. Must fix before any other UI work.

## Related

- `docs/v2/THEME_UNIFICATION.md` — original plan (expand with this detail)
- `docs/v2/roadmap.md` — Week 1-2 execution
