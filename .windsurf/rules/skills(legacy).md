---
description: Design guidance for building theme-compatible pages using Bootstrap in the dse.best multi-theme system
---

# Multi-Theme Bootstrap Design Guide

This project uses **4 themes** via `data-bs-theme` on `<html>`:
- `light` (default) - light background, dark text
- `dark` - dark gray background, light text
- `blue-theme` - deep blue gradient background, light text

Theme is stored in `localStorage('selectedTheme')` and applied via a blocking script in `_document.tsx`.

---

## Navigation (MPA Architecture)

This app uses **Multi-Page Application (MPA)** navigation via a custom `NavigationMode` system. 
**NEVER use** `next/link` `<Link>` or plain `<a>` for internal navigation.

```tsx
// WRONG
import Link from 'next/link';
<Link href="/pomodoro">Go</Link>
<a href="/pomodoro">Go</a>

// RIGHT - always use the project's NavigationLink component
import NavigationLink from '@/components/NavigationLink';
<NavigationLink href="/pomodoro">Go</NavigationLink>
```

`NavigationLink` handles the MPA navigation mode configured in the app.

---

## Core Rules
### 1. NEVER hardcode colors
```tsx
// BAD - breaks in dark/blue themes
<p style={{ color: '#333' }}>Text</p>
<div style={{ backgroundColor: '#fff' }}>Content</div>

// GOOD - uses Bootstrap CSS variables that adapt per theme
<p className="text-body">Text</p>
<div className="bg-body">Content</div>
```

### 2. Use Bootstrap CSS variables and utility classes
These automatically adapt across all themes:

| Purpose | Class / Variable | Notes |
|---------|-----------------|-------|
| Body text | `text-body` or `color: var(--bs-body-color)` | Primary text color |
| Secondary text | `text-body-secondary` or `text-secondary` | Muted/lighter text |
| Background | `bg-body` or `background: var(--bs-body-bg)` | Main page background |
| Card background | Use `.card` class | Auto-styled per theme |
| Borders | `border` class or `border-color: var(--bs-border-color)` | Adapts to theme |
| Headings | `text-body-emphasis` | Strongest contrast |
| Links | Default `<a>` or `text-primary` | Bootstrap handles it |
| Muted text | `text-muted` or `text-body-secondary` | |

### 3. Use Bootstrap contextual classes for status colors
```tsx
// These work across ALL themes automatically
<span className="text-success">Correct</span>
<span className="text-danger">Wrong</span>
<span className="text-warning">Warning</span>
<span className="text-info">Info</span>
<span className="badge bg-success">Pass</span>
<span className="badge bg-danger">Fail</span>
```

### 4. Cards are the primary content container
```tsx
// Cards auto-adapt: white in light, dark in dark, gradient in blue-theme
<div className="card">
  <div className="card-body">
    <h5 className="card-title">Title</h5>
    <p className="card-text">Content goes here</p>
  </div>
</div>
```

### 5. Buttons - use Bootstrap button classes
```tsx
// GOOD - theme-compatible
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-outline-secondary">Secondary</button>
<button className="btn btn-light">Light button</button> // auto-adapts in blue/dark

// BAD - hardcoded colors
<button style={{ backgroundColor: '#007bff', color: 'white' }}>Click</button>
```

### 6. Form controls
```tsx
// Bootstrap form controls auto-adapt
<input className="form-control" />
<select className="form-select" />
<textarea className="form-control" />

// For disabled state styling, the themes handle it via --bs-disabled-bg
```

### 7. Tables
```tsx
// Use Bootstrap table classes - they have theme-aware CSS variable overrides
<table className="table table-striped table-hover">
  <thead><tr><th>Header</th></tr></thead>
  <tbody><tr><td>Data</td></tr></tbody>
</table>
```

---

## Available CSS Variables (per theme)

All themes define these custom properties in `globals.css` (high-specificity `html[data-bs-theme=...]` blocks):

| Variable | Light | Dark | Blue-theme | Usage |
|----------|-------|------|------------|-------|
| `--bs-body-bg` | `#eff1f3` | `#212529` | `#0f1535` | Page background |
| `--bs-body-color` | `#5b6166` | `#dee2e6` | `#d3d7dc` | Default text |
| `--bs-heading-color` | `#474747` | `inherit` | `#e6ecf0` | Headings |
| `--bs-card-bg` | `#ffffff` | `#2b3035` | `#070c29` | Card backgrounds |
| `--bs-secondary-color` | *(Bootstrap default)* | `rgba(222,226,230,0.75)` | `rgba(211,215,220,0.75)` | Muted text |
| `--bs-emphasis-color` | *(Bootstrap default)* | `#fff` | `#fff` | Strong/bold text |
| `--bs-secondary-bg` | *(Bootstrap default)* | `#343a40` | `#1a2252` | Secondary surfaces |
| `--bs-tertiary-bg` | *(Bootstrap default)* | `#2b3035` | `#181f4a` | Tertiary surfaces |
| `--bs-border-color` | *(Bootstrap default)* | `#495057` | `rgba(255,255,255,0.15)` | Borders |

**CRITICAL**: All variables above are defined with `!important` at `html` level in `globals.css` for all 3 main themes. If you use `var(--bs-secondary-color)` in a `<style jsx>` block, it WILL resolve correctly in dark and blue themes because of these definitions.

### Using in inline styles (when necessary)
```tsx
// If you must use inline styles, use CSS variables
<div style={{ 
  color: 'var(--bs-body-color)', 
  backgroundColor: 'var(--bs-body-bg)',
  borderColor: 'var(--bs-border-color)'
}}>
  Theme-compatible inline styles
</div>
```

---

## Layout Pattern for New Pages

Every page in this project follows this structure (handled by `_app.tsx`):

```
<html data-bs-theme="...">
  <body>
    <div className="main-wrapper">
      <div className="main-content">
        <div className="page-breadcrumb"> ... </div>
        <div className="page-content"> 
          <!-- YOUR PAGE CONTENT HERE -->
        </div>
      </div>
    </div>
  </body>
</html>
```

### Standard page template
```tsx
export default function MyPage() {
  return (
    <>
      <Head><title>Page Title - dse.best</title></Head>
      
      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">Page Title</div>
      </div>

      {/* Content */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Section Title</h5>
          <p className="card-text text-body-secondary">Description text</p>
          {/* Page content */}
        </div>
      </div>
    </>
  );
}
```

---

## Common Mistakes to Avoid

### Text visibility
```tsx
// WRONG - invisible in dark/blue themes
<span style={{ color: 'black' }}>Important text</span>
<p className="text-dark">This is too dark-specific</p>

// RIGHT
<span className="text-body">Important text</span>
<p>Default text inherits theme color</p>
```

### Background contrast
```tsx
// WRONG - white box on white (light) or invisible borders
<div style={{ backgroundColor: 'white', border: '1px solid #ddd' }}>

// RIGHT
<div className="card"> or <div className="bg-body border">
```

### Form elements in `<style jsx>` (CRITICAL)
```css
/* WRONG - <input>, <select>, <button> do NOT inherit color from parent */
.my-input { border: 1px solid var(--bs-border-color); }
/* Text inside will default to browser black - unreadable in dark/blue! */

/* RIGHT - always set BOTH color AND background on form elements */
.my-input {
  border: 1px solid var(--bs-border-color);
  color: var(--bs-body-color);
  background-color: var(--bs-card-bg);
}
```

### Card containers need `color` AND `border` for dark themes
```css
/* WRONG - card has bg but no explicit text color or border */
.my-card { background: var(--bs-card-bg); border-radius: 24px; }

/* RIGHT - set color for text inheritance, border for distinction */
.my-card {
  background: var(--bs-card-bg);
  border: 1px solid var(--bs-border-color, transparent);
  color: var(--bs-body-color);
  border-radius: 24px;
}
/* In light theme, border is transparent (card stands out naturally) */
/* In dark/blue theme, border provides visual distinction from body bg */
```

### The `.card.rounded-4` page container
```
This is the main page wrapper used on almost every page.
Dark and blue themes have border + card-bg applied globally in globals.css.
Do NOT add white backgrounds to it - the theme system handles it.
```

### Conditional theme styling (rare, use sparingly)
```tsx
// If you absolutely need theme-specific logic:
// Use CSS only - never JS-based theme detection for styling
// The globals.css already handles [data-bs-theme=blue-theme] .your-class { }
```

---

## Icons

This project uses **React Icons** (primarily `react-icons/bi` for BoxIcons and `react-icons/md` for Material Icons).

```tsx
import { BiHome, BiSearch } from 'react-icons/bi';
import { MdOutlineTimer } from 'react-icons/md';

// Icons inherit text color automatically - no need for color props
<BiHome style={{ fontSize: 20 }} />
```

---

## Quick Reference: Safe Classes

**Text:** `text-body`, `text-body-secondary`, `text-body-emphasis`, `text-muted`, `text-primary`, `text-success`, `text-danger`, `text-warning`, `text-info`

**Backgrounds:** `bg-body`, `bg-body-secondary`, `bg-body-tertiary`, `bg-primary`, `bg-success`, `bg-danger`, `bg-warning`, `bg-info`, `bg-light` (themed), `bg-dark` (themed)

**Borders:** `border`, `border-primary`, `border-secondary`, `border-success`, `border-danger`

**Components:** `.card`, `.btn`, `.badge`, `.alert`, `.table`, `.form-control`, `.form-select`, `.list-group`, `.modal`, `.offcanvas`, `.dropdown-menu`

All of these are theme-aware and will work correctly across light, dark, blue-theme, and semi-dark.
