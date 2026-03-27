# AdSense Optimization Report — dse.best

## Current Ad Setup

- **Ad type:** Auto Ads (anchor, vignette, in-article)
- **Publisher ID:** `ca-pub-9807119599898921`
- **Script injection:** Dynamic via `_document.tsx` — only loads if `noAds` flag is not set
- **No manual ad units** — entirely relying on Auto Ads placement algorithm

## Current Revenue Drivers

| Ad Format | Performance | Notes |
|-----------|------------|-------|
| Anchor (bottom sticky) | High | Works on all pages, no CSS issues |
| Vignette (interstitial) | High | Triggered on navigation, works well with full page loads |
| In-article | **Very Low** | Blocked by CSS containment — see ADSENSE_INVESTIGATION.md |

## Why Ads Only Appear Outside/Below Page Containers

### CSS Blockers (Now Fixed)

1. **`contain: layout`** on `.card.rounded-4` and `.card-body` — prevented AdSense from measuring interior space
2. **`isolation: isolate`** on blog card and global `.card` — created stacking contexts that clip injected iframes
3. **`min-height: 800px !important`** — may cause AdSense to see the card as "already filled" on short-content pages

### Font Loading Impact

Noto Sans HK's `display: swap` causes a ~80ms layout reflow. AdSense measures during the initial render with fallback fonts, then the measurements become stale after font swap. This causes:
- Ads placed at wrong vertical offsets
- Ads that "disappear" on scroll (they're at the wrong position)
- Ads only visible when zooming out (placed outside visible viewport)

## Optimization Recommendations

### Session 1 — CSS Fixes

1. ✅ Removed `contain: layout` from `.card.rounded-4` and `.card-body`
2. ✅ Removed `isolation: isolate` from blog post card
3. ✅ Removed global `isolation: isolate` from `.card` rule in globals.css
4. ✅ Reduced Noto Sans HK weight variants (5→3) for faster load
5. ✅ Added inline `@font-face` for CJK range to start font download immediately
6. ✅ Added `fetchPriority="high"` on font preload

### Session 2 — Semantic HTML + Font Migration

7. ✅ **Added `<article>` semantic wrapper** around blog post content (`pages/blog/[slug].tsx`). AdSense's in-article crawler uses semantic HTML landmarks to identify content boundaries. This should increase in-article ad placement confidence.

8. ✅ **Migrated to `next/font/google`** for Noto Sans HK self-hosting (`pages/_app.tsx`). This eliminates:
   - 2 external DNS lookups (fonts.googleapis.com + fonts.gstatic.com)
   - External CSS download for @font-face declarations
   - The race condition between inline @font-face and Google Fonts CSS
   - The "wrong slice" problem (Latin text waiting for CJK CSS to parse)
   
   Font files are now served from the same origin (Vercel edge CDN), and `adjustFontFallback` generates pre-calculated fallback metrics to minimize layout shift during font swap.

9. ✅ **Removed Google Fonts CDN links** from `_document.tsx` — no longer needed with self-hosted fonts.

### Short-term (Next deployment cycle)

10. **Verify AdSense dashboard configuration:**
    - Go to **Ads** → **By site** → **dse.best** → **Edit**
    - Confirm **In-article ads** is toggled ON under "In-page ad formats"
    - Check "Page exclusions" — ensure `/blog/*` is not excluded
    - This is the most common non-technical cause of missing in-article ads

11. **Add explicit ad anchor points** in long blog posts. Instead of relying purely on Auto Ads, add manual `<ins>` elements at strategic points in the Contentful rich text renderer:
    ```html
    <!-- After every 3rd heading in blog post content -->
    <ins class="adsbygoogle" data-ad-format="fluid" data-ad-layout-key="..." data-ad-client="ca-pub-..." data-ad-slot="..."></ins>
    ```
    This gives AdSense explicit permission to render at those locations.

12. **Test with AdSense Preview tool** — In the AdSense console, use "Ad review center" and the preview URL feature to see exactly where ads would be placed before/after CSS changes.

13. **Monitor `all: revert` on `<ins>` elements** — The rule `.post-content ins { all: revert; }` prevents blog styles from bleeding into ad containers. If ads render but appear visually broken, replace with targeted resets (see ADSENSE_INVESTIGATION.md §9).

### Medium-term

14. **Consider Cloudflare Zaraz for ad loading** — Zaraz moves third-party scripts (including AdSense) to a worker, reducing main-thread blocking. This improves:
    - LCP (Largest Contentful Paint)
    - TBT (Total Blocking Time)
    - Ad viewability scores (faster ad render = higher revenue)

15. **Implement lazy ad loading for below-fold content** — Don't load ads until the user scrolls near them. This improves initial page load speed and Core Web Vitals, which in turn improves ad auction quality.

16. **Add `data-full-width-responsive="true"`** to any manual ad units. This allows ads to expand to full container width on mobile, improving fill rate.

### Long-term

17. **Consider Google Ad Manager (GAM)** instead of pure Auto Ads. GAM gives you:
    - Explicit control over ad placements
    - Header bidding support (higher CPMs)
    - Better reporting on which placements perform
    - No dependency on Auto Ads' CSS-sensitive crawling

18. **A/B test ad density** — Too many in-article ads hurt user engagement and bounce rate. Optimal density for educational content is typically 1 ad per 3-4 screen-heights of content.

## Page-Specific Analysis

### Blog Posts (`/blog/[slug]`)
- **Content length:** Typically 1000-3000 words — ideal for in-article ads
- **Issue:** CSS containment blocked injection (now fixed)
- **Expected improvement:** 2-4 in-article ads per long post after fix

### Main Index (`/`)
- **Content:** Subject cards grid — short, not ideal for in-article
- **Best ad format:** Anchor + vignette (already working)

### Tool Pages (`/timer`, `/pomodoro`, `/individual-response`)
- **Individual Response:** Already gets in-article ads (long FAQ section)
- **Timer/Pomodoro:** Short pages — anchor/vignette only, in-article unlikely

### Past Paper Pages (`/chinese`, `/english`, etc.)
- **Content:** Link lists — in-article ads could inject between year sections
- **Opportunity:** These are high-traffic pages; even one in-article ad per page would significantly boost revenue

### Cutoff Pages (`/cutoff/[subject]`)
- **Content:** Data tables — good for in-article between sections
- **Currently:** Likely blocked by same CSS containment issues

## Monitoring

After deploying fixes:
1. Check AdSense → Performance → Ad units → filter by "In-article" — should see increase within 48-72 hours
2. Monitor Core Web Vitals in Search Console — CLS may increase slightly without `contain: layout` (acceptable tradeoff)
3. Track RPM (Revenue Per Mille) weekly — in-article ads typically have 2-3x higher RPM than anchor ads
