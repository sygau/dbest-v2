# Issue: Script Loading Performance

## Summary
`next/script` was reported to slow down the site significantly. Current implementation uses blocking `dangerouslySetInnerHTML` scripts in `_document.tsx`.

## Current Implementation

### _document.tsx
```tsx
// Blocking theme script — prevents FOUC
<script dangerouslySetInnerHTML={{
  __html: `(function(){try{var t=localStorage.getItem('selectedTheme')...`
}} />

// AdSense injection (conditional)
<script dangerouslySetInnerHTML={{
  __html: `(function(){...var s=document.createElement('script');s.src="...adsbygoogle.js"...`
}} />

// Google Analytics
<script src="https://www.googletagmanager.com/gtag/js?id=G-XB60B3MXHH" defer></script>
<script defer dangerouslySetInnerHTML={{ __html: consolidatedScripts.analytics }} />

// appendLinks script (async, at body end)
<script src="/assets/js/appendLinks.min.js" async></script>
```

## Why `next/script` Slowed Down

### Likely Cause: Strategy Timing

| Strategy | When it loads | Issue |
|----------|--------------|-------|
| `beforeInteractive` | Before page hydration | Blocks rendering (correct for theme) |
| `afterInteractive` | After hydration | **Waits for React to mount first** |
| `lazyOnload` | On idle | Too late for critical scripts |

If AdSense or Analytics were moved to `next/script` with `afterInteractive`, they would:
1. Wait for HTML to load
2. Wait for React to hydrate
3. Only then execute
4. This adds ~100-300ms delay compared to raw `<script>` tags

### Cloudflare Pages Factor

On Cloudflare Pages (static export), Next.js hydration timing differs from Vercel:
- Static HTML served immediately from edge
- JS bundle fetched and executed
- Hydration happens after bundle parse
- `next/script` callbacks fire after hydration

This means `afterInteractive` scripts load **later** than raw `<script defer>` tags in `_document.tsx`.

## Impact

1. **Perceived slowness** — AdSense renders later, blank ad slots visible longer
2. **Analytics delays** — pageview events fire after hydration, not on DOMContentLoaded
3. **CLS from late ads** — ads inject after content settles, causing layout shifts

## Recommended Approach

### Keep in `_document.tsx` (Blocking)
- **Theme script** — MUST block to prevent FOUC
- Stays as `dangerouslySetInnerHTML` in `<Head>`

### Keep as Raw Script Tags (Defer/Async)
- **Google Analytics** — `defer` in `_document.tsx` is fine
- **appendLinks.js** — `async` at body end is correct
- **AdSense** — dynamic injection via inline script is correct

### Consider Cloudflare Zaraz
Zaraz moves third-party scripts to a Cloudflare Worker:
- Scripts execute in worker, not main thread
- Reduces TBT (Total Blocking Time)
- Improves LCP and ad viewability scores
- Free for Cloudflare users

**Implementation:**
1. Enable Zaraz in Cloudflare dashboard
2. Add AdSense via Zaraz tool configuration
3. Remove manual AdSense injection from `_document.tsx`
4. Analytics can also be migrated to Zaraz

### Do NOT Use `next/script` For
- Theme initialization (must block)
- AdSense (timing-sensitive for ad slots)
- Any script that needs to run before React hydration

### Safe to Use `next/script` For
- Non-critical third-party widgets
- Deferred analytics (if latency acceptable)
- Scripts that don't affect initial render

## Code Audit Checklist

- [ ] Theme script stays as blocking inline script in `_document.tsx`
- [ ] AdSense injection stays as inline script OR migrated to Zaraz
- [ ] Analytics stays as `defer` OR migrated to Zaraz
- [ ] No `next/script` used for critical path scripts
- [ ] Test on Cloudflare Pages (not local dev) for accurate timing

## Priority

**P2** — Important for performance but current implementation works. Zaraz migration is optional optimization.

## Related

- `docs/v2/ADSENSE_OPTIMIZATION.md` — ad loading details
- `docs/v2/roadmap.md` — Cloudflare optimizations section
