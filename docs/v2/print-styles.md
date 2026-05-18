# Print Styles

Print / Save-as-PDF support. Triggered by browser Ctrl+P — no separate mode.

## How it works

`@media print` CSS. The browser applies these rules when printing or saving as
PDF. No server work, no new page.

## What changed

Layout chrome (`components/tw/Layout.tsx`)
- Sidebar, TopNavbar, ScrollProgress, Preferences, BackToTop, footer wrapped /
  tagged with `print:hidden` — gone on every printed page, site-wide.
- `main` strips its navbar/sidebar offsets on print (`print:!mt-0 print:!ml-0`)
  and inner padding (`print:!p-0`) so content fills the sheet.

Site-wide (`styles/tailwind.css`, `@media print` block)
- White bg + black text, overriding light/dark/blue themes.
- AdSense hidden — `ins.adsbygoogle`, aswift/google_ads iframes.
- Box/text shadows removed; sensible page breaks on headings/images/tables.
- `.card` shell flattened.
- Helpers: `.no-print` (hide on print), `.print-only` (hide on screen).

Blog post (`styles/blog-post.css`, `pages/blog/[slug].tsx`)
- Full-bleed content; share button, related-posts, mobile + desktop TOC hidden.
- Title/body forced to black ink at point sizes.
- External links underlined with the URL spelled out after the text.
- Hero image capped so it stays on one page.

No print button in the UI by design — print is the browser Ctrl+P only.

## Extending

To exclude an element from print: add `print:hidden` (Tailwind) or `.no-print`.
For a print-only element (e.g. a URL footer): `.print-only`.
