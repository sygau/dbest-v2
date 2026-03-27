# AdSense In-Article Ad Investigation Report

## Problem Statement

AdSense Auto Ads are NOT injecting in-article ads inside the blog post `.card.rounded-4` container. Instead:
- Ads only appear **below** the card, outside the page container
- Ads sometimes load below the visible viewport (only visible when zooming out)
- Ads disappear when scrolling down
- The Speaking IR / individual-response page **does** get in-article ads inside its card

## Root Causes Identified

### 1. `contain: layout` on `.card.rounded-4` (PRIMARY BLOCKER)

**File:** `styles/globals.css` line 90-94

```css
.card.rounded-4 {
  min-height: 800px !important;
  contain: layout;    /* ← THIS BLOCKS ADSENSE */
  height: auto !important;
}
```

**Why it blocks ads:** CSS `contain: layout` tells the browser that the element's internal layout is independent of the rest of the page. AdSense's auto-placement algorithm uses DOM geometry queries (`getBoundingClientRect`, `offsetHeight`, etc.) to find available space between content blocks. When `contain: layout` is set, the browser may report incorrect or zero dimensions for child elements, causing AdSense to skip the container entirely.

**Fix applied:** Removed `contain: layout` from `.card.rounded-4`.

### 2. `contain: layout` on `.card-body` (SECONDARY BLOCKER)

**File:** `styles/globals.css` line 197-199

```css
.card-body {
  contain: layout;
}
```

**Same issue** as above but on the inner content wrapper.

**Fix applied:** Removed `contain: layout` from `.card-body`.

### 3. `isolation: isolate` on blog post card (STACKING CONTEXT BLOCKER)

**File:** `pages/blog/[slug].tsx` line 515

```tsx
<div className="card rounded-4" style={{ isolation: 'isolate' }}>
```

**Why it blocks ads:** `isolation: isolate` creates a new stacking context. AdSense auto ads inject `<ins>` elements and absolutely-positioned `<iframe>` elements. A new stacking context can prevent these from being positioned correctly relative to the page viewport, causing them to be clipped or hidden.

**Fix applied:** Removed `isolation: isolate` from the blog post card.

### 4. `overflow: visible !important` conflict

**File:** `styles/globals.css` line 4456-4460

```css
.card {
  overflow: visible !important;
  isolation: isolate;
}
```

This rule was added as a workaround but still sets `isolation: isolate` on ALL cards globally, which creates stacking contexts that interfere with ad placement.

**Fix needed:** Remove `isolation: isolate` from the global `.card` rule.

### 5. Font loading FOUT causing ad slot miscalculation

**Issue:** Noto Sans HK loads with `display: swap`, causing a ~80ms flash of unstyled text. During this time, AdSense measures the page layout with the fallback font metrics. When Noto Sans HK loads and text reflows, the measured ad slots become invalid. AdSense may:
- Skip slots that appeared too small with fallback font
- Place ads at wrong positions
- Remove ads that no longer fit after reflow

**Mitigation applied:**
- Reduced font weights from 5 (400/500/600/700/900) to 3 (400/500/700) — faster download
- Added inline `@font-face` declaration for the CJK Unicode range — browser starts downloading the font file immediately without waiting for the Google Fonts CSS to parse
- Added `fetchPriority="high"` on the preload link
- Size-adjusted fallback font already exists in `tailwind.css`

## Why Individual Response Page Works

The individual-response page (`pages/individual-response.tsx`) gets in-article ads because:

1. It does NOT use `.card.rounded-4` as its main wrapper — it uses a custom `.ir-wrapper` div
2. Its card elements don't inherit the `contain: layout` from the global `.card.rounded-4` rule (they use `.card` without `.rounded-4`)
3. It has long-form content with natural paragraph breaks — AdSense's algorithm detects these as ideal in-article insertion points
4. No `isolation: isolate` on the page container

## Verification Steps

After deploying these fixes:

1. **Clear browser cache** completely (or use incognito)
2. **Wait 24-48 hours** — AdSense auto ads algorithm takes time to recrawl and re-evaluate ad slots
3. **Check AdSense Console** → Sites → dse.best → Ad units → Auto ads → see if "In-article" placements increase
4. **Use Chrome DevTools** → Elements → search for `<ins class="adsbygoogle"` → verify they appear INSIDE the `.card.rounded-4` container, not just below it
5. **Test on mobile** — in-article ads are more aggressively placed on mobile viewports

## Additional Findings (Session 2)

### 6. Missing `<article>` Semantic HTML Wrapper

**Issue:** The blog post content was wrapped in `<div class="card rounded-4">` — a generic container. AdSense's in-article ad crawler relies on semantic HTML landmarks (`<article>`, `<section>`) to identify the content boundary for ad insertion. Without `<article>`, AdSense treats the page as a generic layout, reducing in-article placement confidence.

**Fix applied:** Changed the blog post card from `<div>` to `<article>` element:
```tsx
<article className="card rounded-4">
  <div className="card-body">
    <div className="post-content" dangerouslySetInnerHTML={{ __html: processedContent }} />
  </div>
</article>
```

**Source:** Google AdSense documentation recommends semantic HTML for optimal ad placement. Community reports confirm that adding `<article>` tags increases in-article ad injection rates.

### 7. Next.js Hydration Timing vs AdSense Script

**Issue:** The AdSense script (`adsbygoogle.js`) is injected in `_document.tsx` via a blocking `<script>`. On Next.js pages, React hydration happens after initial HTML render. If AdSense measures the DOM during or before hydration completes, it may see:
- Incomplete DOM tree (server-rendered HTML without client-side state)
- Elements at wrong positions (pre-hydration layout)
- Missing dynamic content (loaded after hydration)

**Current mitigation:** The AdSense script uses `async` attribute, so it loads in parallel with hydration. However, the exact timing is non-deterministic. If AdSense runs its placement algorithm before hydration settles, it may skip valid slots.

**Recommendation:** Monitor whether in-article ads appear more reliably after the semantic HTML fix. If not, consider deferring AdSense initialization until after `useEffect` fires (post-hydration) using a custom hook.

### 8. AdSense Dashboard Configuration

**Important check:** In the AdSense console (adsen.se/dashboard):
1. Go to **Ads** → **By site** → **dse.best** → **Edit** (pencil icon)
2. Verify **In-article ads** is toggled ON under "In-page ad formats"
3. Check that "Auto ads" is enabled with "Optimize existing ad units" turned on
4. Review "Page exclusions" — ensure `/blog/*` pages are not excluded

**Note:** Even if the code is technically correct, disabled dashboard settings will prevent in-article ads from appearing. This is a common oversight.

### 9. `all: revert` CSS Rule on `<ins>` Elements

**File:** `pages/blog/[slug].tsx` — styled JSX

```css
.post-content ins { all: revert; }
```

**Purpose:** Prevents blog post typography styles (font-size, line-height, margins) from bleeding into AdSense-injected `<ins>` elements. Without this, ad containers may inherit unwanted styles that break ad rendering.

**Risk:** `all: revert` is aggressive — it reverts ALL inherited CSS properties to browser defaults. This could potentially interfere with AdSense's own styling if the `<ins>` element relies on inherited properties. However, AdSense typically uses inline styles and shadow DOM, so this is low risk.

**Monitor:** If ads render but appear visually broken (wrong size, clipped), try replacing `all: revert` with more targeted resets:
```css
.post-content ins {
  font-size: initial;
  line-height: initial;
  margin: 0;
  padding: 0;
}
```

### 10. "No Ads" Persistence via localStorage

**File:** `pages/_document.tsx` — ad-free logic script

The site stores a `noAds=1` flag in localStorage (set via `?na` URL parameter or cookie). This flag persists across sessions and prevents AdSense from loading entirely. This is by design for ad-free users, but:

**Risk scenarios:**
- A user accidentally visits a `?na` link → ads permanently disabled for that browser
- Testing with `?na` and forgetting to clear → no ads in that browser
- localStorage survives incognito mode resets in some browsers

**Recommendation:** When debugging "no ads" issues, always check `localStorage.getItem('noAds')` in the browser console first.

## Remaining Risk: `min-height: 800px !important`

The `min-height: 800px` on `.card.rounded-4` may still cause AdSense to miscalculate available space on short pages. However, removing it would reintroduce CLS (Cumulative Layout Shift). This is a tradeoff — keep it for now and monitor.
