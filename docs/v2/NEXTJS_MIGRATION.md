# Next.js Migration & Best Practices Audit

## Current Stack

- **Framework:** Next.js (Pages Router) with TypeScript
- **Deployment:** Cloudflare Pages (static export via `next export` + edge functions)
- **CSS:** Bootstrap 5 + Tailwind v4 + custom globals.css + per-page `<style jsx>`
- **CMS:** Contentful (blog posts)
- **Navigation:** `NavigationLink` component — uses `<a>` tags for full page loads (AdSense compliance)
- **Themes:** 4 themes via `data-bs-theme` + `data-theme` attributes on `<html>`

## Anti-Patterns to Address

### 1. Theme System — Triple-Layer Variables

**Issue:** Theme variables are defined in three places:
- `styles/globals.css` — `html[data-bs-theme=...]` sets `--bs-*` vars with `!important`
- `styles/tailwind.css` — `[data-theme=...]` sets `--color-*` vars
- Blocking `<script>` in `_document.tsx` — sets `data-bs-theme`, `data-theme`, and inline `--color-body-bg`

**Risk:** When switching themes, all three must be updated in sync. The `useThemeSwitcher` hook was only updating `data-bs-theme`, causing stale backgrounds (fixed in this session).

**Fix:** Unify into a single theme source. See `THEME_UNIFICATION.md`.

### 2. Inline Styles vs CSS Modules vs Style JSX

**Issue:** Pages use a mix of:
- Inline `style={{}}` props (hard to maintain, no media queries)
- `<style jsx>` blocks (component-scoped but hard to search/refactor)
- Bootstrap utility classes (`d-flex`, `mb-4`, `col-6`)
- Tailwind classes (`text-[var(--color-body)]`, `rounded-2xl`)

**Fix:** Establish a convention:
- **Tailwind** for layout, spacing, responsive
- **CSS variables** for theme colours
- **`<style jsx>`** only for complex component-specific styles (flashcard flip, etc.)
- **Eliminate inline styles** where Tailwind can do the job

### 3. Font Loading — CLS Issues

**Issue:** Noto Sans HK is loaded via Google Fonts `<link>` in `_document.tsx`. This causes CLS on slow connections.

**Current mitigation:** Added `@font-face` fallback with `size-adjust` in `tailwind.css`.

**Better approach:**
- Use `next/font` with `display: swap` and `adjustFontFallback: true`
- Self-host the subset actually used (reduce from 120+ weights to 400/500/700)
- Remove the Google Fonts `<link>` from `_document.tsx`

### 4. Image Optimisation

**Issue:** Most images use plain `<img>` tags. Next.js `<Image>` provides automatic:
- WebP/AVIF conversion
- Responsive `srcset`
- Lazy loading with blur placeholder
- Width/height for CLS prevention

**Caveat:** Cloudflare Pages doesn't support Next.js Image Optimization API natively. Options:
- Use Cloudflare Images or a CDN with image transforms
- Use `next/image` with `loader` prop pointing to Cloudflare Image Resizing
- Use `unoptimized` prop with manual responsive images

### 5. Metadata — Manual `<Head>` vs Next.js `getStaticProps` Metadata

**Issue:** Every page manually constructs `<Head>` with OG tags, title, description. This is repetitive.

**Fix:** Create a reusable `PageHead` component that accepts a metadata object and renders all standard tags. Reduces boilerplate from ~15 lines to 1 line per page.

### 6. Validation — No Form Validation Library

**Issue:** Forms (quiz answer input, contact page) use ad-hoc validation.

**Fix:** Consider `zod` for schema validation + `react-hook-form` for form state. Keep it lightweight.

### 7. Error Handling — No Error Boundaries

**Issue:** If a component throws, the entire page crashes with no recovery.

**Fix:** Add `ErrorBoundary` component wrapping page content. Show a friendly fallback UI.

### 8. Bundle Size — Unused Dependencies

**Issue:** Some imports pull in large libraries:
- `framer-motion` — used only for SubjectCard hover (now removed)
- `react-icons/bi` — tree-shakes well, but verify only used icons are imported

**Fix:** Audit `package.json` quarterly. Remove unused deps.

### 9. Speed Optimisation — Cloudflare Pages Specific

**Current wins:**
- Static export means pages are served from CDN edge
- No server-side rendering overhead
- Font preconnect to Google Fonts

**Additional opportunities:**
- Enable Cloudflare Early Hints (103 responses) for critical resources
- Use `Cache-Control: immutable` for hashed assets
- Preload critical CSS above-the-fold
- Compress with Brotli (Cloudflare does this automatically)
- Consider Cloudflare Zaraz for AdSense tag loading (reduces main-thread blocking)

### 10. Accessibility — Missing ARIA & Keyboard Navigation

**Issue:** Some interactive elements lack proper ARIA roles:
- Theme switcher buttons
- Mobile sidebar toggle
- Quiz flashcard (clickable div, not button)

**Fix:** Audit with axe-core or Lighthouse accessibility scan. Add `role`, `aria-label`, `tabIndex` where needed.

## Migration Priority (by impact)

| Priority | Item | Effort | User Impact |
|----------|------|--------|-------------|
| P0 | Theme unification | Medium | Fixes theme bugs |
| P1 | PageHead component | Low | Reduces code, prevents metadata bugs |
| P1 | Monolithic cleanup | Medium | Developer velocity |
| P2 | `next/font` migration | Low | Reduces CLS |
| P2 | Error boundaries | Low | Prevents blank screens |
| P3 | Image optimisation | High | Better LCP (needs CDN setup) |
| P3 | Form validation | Low | Better UX on quiz/contact |
| P4 | CSS convention enforcement | Ongoing | Code consistency |

## Non-Goals

- **App Router migration** — Pages Router is stable and works with CF Pages. App Router + static export has edge cases.
- **Full SPA** — kills AdSense revenue. `NavigationLink` correctly does full page loads.
- **Removing Bootstrap** — too many pages depend on grid/utilities. Incrementally replace with Tailwind.
