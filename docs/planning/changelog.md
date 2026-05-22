# dse.best v2 Changelog

## [2026-05-22] — Timetable official 2027 data update
What: Replaced estimated schedule with official HKEAA 2027 DSE timetable data; removed unofficial warning banner; added "官方時間表 PDF" button linking to HKEAA PDF; fixed all subject names, dates, and ordering; sessions now show "AM / PM" instead of estimated times.
Files: pages/timetable.tsx
Notes: Official PDF URL: https://www.hkeaa.edu.hk/DocLibrary/HKDSE/Exam_Timetable/2027_DSE_Timetable.pdf. May 3 is both exam day (Note 2 subjects) and reserve — merged into single exam entry.

## [2026-05-21] — LaTeX/KaTeX support in blog
What: Sanity `sanity-plugin-latex-input` registered in studio; `latex` type added to post body (inline child + standalone block). DualBodyInput MD parser now extracts `$$...$$` to standalone latex blocks and `$...$` to inline latex children. Frontend renders via SSR `katex.renderToString` in PortableTextRenderer; KaTeX CSS loaded conditionally via jsDelivr CDN only when post has math (`hasMath` GROQ flag).
Files: dsebest/sanity.config.ts, dsebest/schemaTypes/post.ts, dsebest/components/DualBodyInput.tsx, dsebest/package.json, lib/sanityQueries.ts, lib/blogTypes.ts, components/blog/PortableTextRenderer.tsx, pages/blog/[slug].tsx, styles/blog-post.css, docs/v2/blog-ai-guide.md, package.json
Notes: SSR avoids hydration shift / CLS. KaTeX CSS skipped on non-math posts. mhchem NOT enabled (add later if needed). `throwOnError: false` so broken LaTeX shows red `.katex-error` span instead of crashing render. Theme parity: glyph color follows `var(--color-body)` across light/dark/blue.

## [2026-05-21] — Blog MD shortcodes + AI writing guide
What: Added `::shortcode | pipe | separated` syntax to DualBodyInput MD converter. Supports `::alert`, `::button`, `::youtube`, `::separator`. Created AI blog guide at docs/v2/blog-ai-guide.md.
Files: dsebest/components/DualBodyInput.tsx, docs/v2/blog-ai-guide.md
Notes: Shortcodes must be their own paragraph (blank lines above/below). Alert title is optional via empty pipe `| |`. Guide doubles as prompt context for AI-written posts.

## [2026-05-21] — Calculator Programmes: entry guide section
What: Added Cantonese入機指引 section below programme cards on /calculator-programmes. Covers enter/run/edit/delete steps for fx-50FH II & fx-3650P II, plus DSE exam tips. Uses native kbd/details styling, no JS.
Files: pages/calculator-programmes/index.tsx
Notes: kbd styling scoped via styled-jsx; guide-grid goes 1→2 col at 600px breakpoint.

## [2026-05-21] — Cutoff pages: fix prod "No data available"
What: Replaced runtime `fs.readFileSync` of CSVs in `pages/cutoff/[subject].tsx` getStaticProps with a static JSON import. New build script `scripts/build-cutoff-json.js` pre-bakes `public/data/cutoff/<subject>/*.csv` into `data/cutoff/<subject>.json` (CutoffTableData shape) and is wired into `build:prep`, `deploy`, `deploy:preview`, `preview`.
Files: scripts/build-cutoff-json.js, pages/cutoff/[subject].tsx, package.json, data/cutoff/*.json
Notes: Root cause — opennext-cloudflare bundles getStaticProps into the worker where Node `fs` is unavailable; the prior `await import('fs')` workaround crashed silently and dropped data. JSON import is bundled as webpack chunks at build, removing fs entirely. Re-run `npm run cutoff:json` whenever CSVs change.

## [2024-12-20] — Vocab Bank: All Sets Complete (300+ Entries)
What: Completed all remaining DSE English Writing vocabulary sets. Filled 5 empty categories with 300+ entries total: sentence-patterns/concession (25 concession structures), text-types/argumentative (25 thesis/evidence/rebuttal templates), text-types/complaint-letter (25 complaint letter structures), text-types/report (25 report writing templates), text-types/speech (25 speech/oral patterns). All entries follow established schema: meaningZh (Traditional Chinese HK), difficulty 1-3, DSE-appropriate examples, 3-4 synonyms per entry. Total vocab bank now: 6 categories × 22 sets = 300+ entries, all properly indexed and formatted.
Files: data/vocab/sentence-patterns/concession.json, data/vocab/text-types/argumentative.json, data/vocab/text-types/complaint-letter.json, data/vocab/text-types/report.json, data/vocab/text-types/speech.json, docs/v2/vocab-bank-completion.md
Notes: No schema changes. Index files already reference new sets (concession added to sentence-patterns/index.json, text-types all four files already in text-types/index.json). All entries verified for non-niche vocabulary, HK context where appropriate, proper difficulty distribution.

## [2026-05-21] — Calculator Programmes: Chinese-first internationalization
What: Updated all 8 calculator programme entries (simultaneous equations 2/3-var, quadratic, cubic, circle, variance, polar-rect, log-linear) to Chinese-first content format. Each input now has `labelZh` (Chinese label) + description with English in brackets. All displays have `labelZh` + meanings. dseRelevance sections now feature Chinese paperHints/topics/notes with English translations in brackets. Errors sections updated with `meaningZh` fields. Aligned with HKDSE student expectations (tutors teaching in Cantonese prefer Chinese-native UI with English reference).
Files: data/programmes.json
Notes: Breaking schema change for frontend — ensure ProgrammeCard, programme detail pages handle labelZh fallback gracefully (if missing, default to label). No changes to tokens array. Backwards-compatible: English `label` and `meaning` fields still present.

## [2026-05-21] — Vocab Bank `/vocab`
What: New 3-level DSE English Writing resource bank. Home `/vocab` Steam-library shelves of 6 sections + per-section preview shelves + recent. Section page `/vocab/[section]` hero + set grid. Set page `/vocab/[section]/[set]` flip cards (Quizizz-style reveal) or styled table (`#table` hash), per-entry TTS (Web Speech API), Cambridge dictionary auto-link, per-set + per-entry localStorage bookmarks, `/vocab/bookmarks` noindex page. Flexible schema (vocab / idiom / sentence-pattern / opening / template). 6 sections, 22 sets scaffolded; `social-issues/cashless` seeded with 6 real cards.
Files: lib/vocab.ts, data/vocab/**, components/vocab/**, pages/vocab/**, docs/v2/vocab-bank.md, public/vocab/.gitkeep
Notes: Sidebar entry intentionally NOT added (content scaffolded, real entries pending). Sharp corners on capsules + backdrop blur on heros per Steam aesthetic. iPad-first responsive (2-col tablet, 3-col desktop, 1-col phone). Bookmark IDs are stable — renaming entry `id` breaks user bookmarks. Empty `entries: []` sets render with a "add entries" placeholder pointing to the JSON path.

## [2026-05-20] — Calculator Programme Library polish
What: Renamed route `/programmes` → `/calculator-programmes`. Card redesign: subject badges moved above title; description clamp 3→2 lines, smaller. Filter card: advanced toggle now full-width header row (JUPAS calculator style) instead of inline button. Results count moved out of filter card to row above card grid. Slug page: source out-links now `rel="nofollow noopener noreferrer"`; added full-width default Button after related cards linking back to library.
Files: pages/calculator-programmes/ (renamed from pages/programmes/), components/programmes/ProgrammeCard.tsx, components/programmes/ProgrammeFilters.tsx, components/tw/Sidebar.tsx
Notes: Library files (lib/programmes.ts, components/programmes/*) kept under "programmes" name — only URL path changed. Button placed inside `<div>` with `router.push` onClick (avoids invalid <button> inside <a>).

## [2026-05-20] — Calculator Programme Library
What: New `/programmes` hub + `/programmes/[slug]` detail pages. Public-domain Casio fx-50FH / fx-3650P programme directory for HKDSE Maths Core/M1/M2. 8 seed programmes (simultaneous eq, quadratic, cubic, circle, variance, polar/rect, log linear, sim 3-var). Token-per-cell TokenGrid with key-sequence reveal, inline code view, setup block (MODE/SD/REG/CMPLX), display order list, EXE-by-EXE example walkthrough.
Files: pages/programmes/index.tsx, pages/programmes/[slug].tsx, lib/programmes.ts, data/programmes.json, data/programme-tokens.json, components/programmes/*, docs/v2/programmes-library.md
Notes: Local JSON only — no Sanity, no live JS formula eval. Step-by-step display verification per competitor convention (gjmaths.hk, hoksiresources.com, ccckws.edu.hk PDF). Tokens are reference data — formulas public-domain, not copyrightable.

## [2026-05-19] — Study Spots: FAQ, deep link, near-me, clustering
What: Added FAQSection (6 canto Q&A, FAQPage JSON-LD for rich results) below the directory. Show-more now uses ui/Button (outline). `?spot=<id>` deep link opens overlay on load; overlay gained a Share Location button. New "near me" filter checkbox sorts by distance + shows `(~Nkm)` after card names. New `setting` field (indoor/outdoor/mixed). Map markers now clustered (leaflet.markercluster via CDN). Overlay panel radius restored to 16px.
Files: pages/study-spots.tsx, components/study-spots/*, lib/studySpots.ts, data/study-spots.json, docs/v2/study-spots-data-guide.md
Notes: Geolocation (near-me + map "my location") needs a secure context — works on localhost/https but NOT the `http://<LAN-IP>:3000` dev URL. Test via localhost or deployed https.

## [2026-05-19] — Study Spots polish pass
What: Fixed map showing 0 markers (marker effect ran before async Leaflet init — added `ready` gate). Switched to CARTO light basemap (removes ferry routes/borders clutter). Added "my location" button, `public-space` type, Show-more pagination, card image lazy fade-in. Overlay: type badge moved under title as pill row (type/open/region/district), 3px radii, region colours hard-coded in REGION_META, open/close animation, removed weekday clock icon. Added data-entry guide for AI.
Files: components/study-spots/*, lib/studySpots.ts, pages/study-spots.tsx, docs/v2/study-spots-data-guide.md

## [2026-05-19] — Study Spots / Library Map feature
What: New `/study-spots` page — JSON-backed directory of HK study spots (libraries, cafes, study spaces) with card grid, Leaflet map view, expandable filters (type/region/amenities), and a full-screen detail overlay. Seeded with 20 HKPL libraries.
Files: pages/study-spots.tsx, data/study-spots.json, lib/studySpots.ts, components/study-spots/*, data/jsonld/pages.ts, components/tw/Sidebar.tsx, docs/v2/study-spots.md
Notes: Leaflet loads from unpkg CDN (no npm dep, no _app change), map not theme-adaptive by design. Sample data incomplete — photos/tags/notes empty, power_outlets is a placeholder guess. `status:false` hides a spot.

## [2026-05-19] — Blog separator: replace custom block with "---" text detection
What: Removed the broken Sanity custom separator block (popped empty menu on insert); frontend now detects a paragraph containing only "---" and renders an `<hr>` instead. Old separator blocks in existing posts still render via backward-compat handler.
Files: components/blog/PortableTextRenderer.tsx, blogRebuild/SanitySchema_ReadNReferenceOnly/post.ts, blogRebuild/SanitySchema_ReadNReferenceOnly/index.ts
Notes: Sanity Studio schema must also be updated (remove separator type + body array entry) and redeployed separately — the blogRebuild files are reference copies only.

## [2026-05-18] — Chat counter removed, mod length bypass
What: Removed the visible 0/150 counter under the chat input and let moderators bypass the client-side and worker-side message length limit.
Files: components/chat/ChatInput.tsx, hooks/useChatRoom.ts, lib/chat/validation.ts, chatRebuild/worker/src/moderation.ts
Notes: Moderator input now has no client maxLength cap, but XSS stripping still applies. Non-mod users keep the existing 150 character limit.

## [2026-05-18] — Cutoff chart fixes + Chinese paper split
What: Fixed percentage Y-axis (was raw score, broke across pre/post 2021 scale change), moved charts to below each table, one chart per table. Split Chinese cutoff into Paper 1 閱讀 (existing data) and Paper 2 寫作 (empty CSV, ready to fill).
Files: components/charts/CutoffTrendChart.tsx, components/CutoffTable.tsx, pages/cutoff/[subject].tsx, public/config/cutoff-config.json, public/data/cutoff/chinese/paper2.csv (new)
Notes: Chinese paper2.csv is empty headers only — needs data. Chart skips rendering if table has ≤1 year of data. percentage field is consistent across DSE scoring eras; raw score is not.

## [2026-05-17] — Cutoff score trend chart
What: Line chart showing all 6 grade boundary trends over years added to every /cutoff/[subject] page, above the existing tables.
Files: components/charts/CutoffTrendChart.tsx (new), pages/cutoff/[subject].tsx
Notes: Chart uses first table only (overall) — English has 5 tables so only overall is charted. Dynamic import (ssr: false) matches B1WorthChart pattern. Data pivoted from CutoffTableData nested structure via useMemo. Chart conditionally rendered — skipped if cutoffData is empty.

## [2026-05-17] — JUPAS bookmarks, homepage, sidebar link
What: Star JUPAS programmes (localStorage watchlist), a dedicated /jupas/bookmarks tab (noindex), a calculator-centric /jupas homepage, and a sidebar link to the calculator.
Files: lib/jupas/client/{bookmarks,lastResult,cardProps}.ts, pages/jupas/{index,bookmarks}.tsx, components/jupas/{parts,styles}.tsx, pages/jupas/calculator.tsx, components/tw/Sidebar.tsx, JUPASTool/scripts/process-data.js, public/jupas/programmes-lite.json, docs/v2/jupas-bookmarks.md
Notes: Bookmarks store JS codes (not scored results) so they survive grade changes. Bookmark tab is hybrid — static cutoff data from public/jupas/programmes-lite.json (generated by process-data.js, 245 KB, fetched at runtime) plus the last calculation overlaid for score/tier. JupasCard `prob` is now optional (un-scored cards show 未計算). useBookmarks hook syncs same-tab via CustomEvent + cross-tab via storage event.

## [2026-05-16] — JUPAS Calculator: PolyU 6th-subject bonus fix
What: PolyU programmes were scored as plain Best 5 (no 6th-subject bonus); now use the polyu formula type and add the 6th subject at its unweighted raw points.
Files: JUPASTool/scripts/process-data.js, lib/jupas/scoring/formulas.ts, JUPASTool/output/programmes.json (rebuilt)
Notes: Root cause — CSV formula col is "Best 5" for all 46 PolyU rows, so parseFormula emitted bestN n=5; engine had runPolyu but it was never reached. Two fixes: (1) parseFormula now takes university and overrides POLYU bestN→polyu; (2) runPolyu 6th bonus = sixth.numeric ×1.0 (was sixth.weighted). Verified JS3290 all-Level-5 = 280.5, matches official PolyU calculator. CSV 2025 PolyU cutoffs confirmed enhanced-scale — no data change needed. Open: JS3569/JS3624 have Median<LQ in CSV (column-shift, build flagged).

## [2026-05-10] — JUPAS Calculator Frontend V1
What: New /jupas/calculator page wired to POST /api/jupas/calculate. Pre-fills with a baked-in 40-result sample (zero POST until the user clicks 搜尋), saves form + filters to localStorage, caches per-profile responses in sessionStorage (24h), enforces a 5s submit cooldown, blocks duplicate submissions by hash, and pre-flight-rejects obviously bad forms (U on any subject, <2 electives, best-5 floor < 10). Filters/sorting/pagination (20 per page "顯示更多") all run client-side over the cached response. Shared parts extracted from design.tsx into components/jupas/* so prototype + production share one source.
Files: pages/jupas/calculator.tsx, pages/jupas/design.tsx, components/jupas/{styles,parts,SearchPanel,constants}.{tsx,ts}, lib/jupas/client/{apiTypes,subjectMap,payload,turnstile,sampleResults}.ts, docs/jupasTool/calculator-frontend.md
Notes: Calculator never imports from lib/jupas/scoring/* — all scoring goes through the API. Turnstile script wired but inactive until NEXT_PUBLIC_TURNSTILE_SITEKEY is set; worker bypasses verification when IS_PROD!='true' so dev needs no Cloudflare config. Cat B + real Cat C levels deferred to V2.

## [2026-05-10] — JUPAS Endpoint Anti-Abuse + IP Strip
What: /api/jupas/calculate now requires Cloudflare Turnstile token (`cf-turnstile-token` header) and is rate-limited to 30/60s per IP via Cloudflare Rate Limiting binding. Both bypassed in dev (IS_PROD!='true'). Also stripped `weights`, `gates`, `hku`, `hkust`, `excludeRules`, `special`, `maxWeightedElectives`, `formula` from `result.programme` to avoid leaking the scoring engine; `formula` replaced with display-only `formulaLabel` string.
Files: lib/jupas/scoring/{antiAbuse.ts,config.ts,engine.ts,types.ts}, pages/api/jupas/calculate.ts, wrangler.jsonc, docs/jupasTool/{security-setup.md,endpoint-guide.md,roadmap.md}
Notes: Setup guide in docs/jupasTool/security-setup.md. Need `wrangler secret put TURNSTILE_SECRET` before first prod deploy. Bucket size editable in wrangler.jsonc → unsafe.bindings → simple.{limit,period}. Toggle layers via lib/jupas/scoring/config.ts → ANTI_ABUSE.

## [2026-05-10] — JUPAS Calculator Endpoint (Phase 2 Scoring Engine)
What: New POST /api/jupas/calculate endpoint runs full JUPAS scoring across all 385 programmes, returning a 5-tier classification (大機會/博得過/邊緣/機率低/唔達標) plus full programme info for each. All gates, weights, formulas (bestN/hkust/polyu/fixed), special calculations (JS6119/6901/6688), Cat A/B/C grade conversion (with CUHK Med exception), and per-uni flexible-admission rules implemented server-side. Warm path ≈ 3-5 ms p95 over 385 programmes (well under the 10 ms Workers budget).
Files: lib/jupas/scoring/{types,grades,gates,weights,formulas,special,flex,chance,programmes,validate,engine}.ts, lib/jupas/scoring/__smoke__.ts, pages/api/jupas/calculate.ts, docs/jupasTool/{roadmap,system-implementation,endpoint-guide}.md
Notes: programmes.json bundled via static import (421 KB, parsed once per isolate). PolyU/CityU full-flex requires per-programme `flexThreshold` data not yet in the JSON — those rules return `eligible:false, reason:'threshold-data-pending'` until populated. Rate limiting deferred to roadmap. Frontend integration spec in docs/jupasTool/endpoint-guide.md; reuse existing safe/comp/bord/low/unmet colour map from pages/jupas/design.tsx.

## [2026-05-08] — Sanity Blog Auto-Deploy via Webhook + GH Actions Cache
What: Publish in Sanity → webhook hits /api/trigger-deploy → GitHub Actions workflow_dispatch → full deploy runs automatically (~2-4 min). Added GH Actions build cache for .next/cache + data + public/og so smart-sync and OG caching work between runs.
Files: .github/workflows/deploy.yml, pages/api/trigger-deploy.ts
Notes: ISR+KV rejected — moves pages from free ASSETS CDN to metered Worker invocations (regression on free tier). Requires 3 wrangler secrets: SANITY_WEBHOOK_SECRET, GH_DEPLOY_TOKEN, GITHUB_REPO. GitHub PAT needs repo + actions:write scopes.

## [2026-05-07] — 12p CF Workers compatibility fix
What: Replaced `fs.readFileSync` in `getStaticProps` with static JSON imports so the 12p pages work in CF Workers runtime (unenv has no fs impl).
Files: pages/12p/index.tsx, pages/12p/quiz.tsx, pages/12p/study.tsx
Notes: JSON files stay in public/12p/ (still served as static assets). Webpack bundles them at build time via import. passageFileMap in quiz/study maps passage.id → imported data since id ≠ filename in some cases (e.g. yuwosuoyuye → mengzi.json).

## [2026-05-07] — Blog: YouTube embed + Alert block types
What: Added youtubeEmbed (responsive 16:9 iframe, youtube-nocookie.com, optional caption) and blogAlert (info/success/warning/destructive, title + description) as Sanity body block types. Blog info alert overridden to sky-700 (#0369a1) instead of violet.
Files: components/blog/PortableTextRenderer.tsx, blogRebuild/SanitySchema_ReadNReferenceOnly/post.ts, styles/blog-post.css
Notes: No new Sanity plugin needed — both are inline objects. Copy updated post.ts body.of[] to Studio. YouTube accepts youtu.be or youtube.com/watch?v= URLs; ID extraction happens client-side.

## [2026-05-07] — Blog custom Portable Text block types
What: Added 4 custom block types to the Sanity blog: separator (HR line), rich table (sanity-plugin-rich-table), blog button (ButtonAnchor with 8 variants incl. linkout), code block (@sanity/code-input with filename + 10 languages). New components: ButtonAnchor (anchor tag mirror of Button, sky-blue default), RichTableRenderer.
Files: components/blog/PortableTextRenderer.tsx, components/ui/ButtonAnchor.tsx, components/blog/RichTableRenderer.tsx, blogRebuild/SanitySchema_ReadNReferenceOnly/post.ts, pages/redesign-4.tsx, docs/v2/BlogComps_1.md
Notes: Sanity Studio requires separate setup — install @sanity/code-input + sanity-plugin-rich-table, register separator schema type, copy updated post.ts body.of[]. ButtonAnchor default = sky (not violet like Button.tsx — intentional blog-only blue).

## [2026-05-07] — Chat page: Bootstrap extraction & bubble fix
What: Extracted Bootstrap utility classes chat.js depends on into page-scoped `<style jsx global>` block — chat page no longer depends on global Bootstrap compatibility layer. Fixed message bubble styles: removed all gradients (flat colors), added `width: fit-content` to prevent stretched messages/stickers.
Files: pages/chat.tsx
Notes: `<style jsx global>` approach used because Next.js Pages Router blocks global CSS imports outside _app.tsx — same effect (only rendered on chat page, code-split automatically).

## [2026-05-06] — data-bs-theme → data-theme Migration
What: Removed all `data-bs-theme` attribute usage across the entire active codebase. Unified to `data-theme` only (values: light/dark/blue). Removed `ThemePreference` type and `getBootstrapTheme` dead code. Renamed `globals.css` → `legacy-globals.css` (dead file, kept for safety). Uninstalled unused `bootstrap` npm package.
Files: styles/globals.css→legacy-globals.css, styles/tailwind.css, styles/countdown.module.css, pages/_document.tsx, utils/theme.ts, hooks/useThemeSwitcher.ts, components/tw/TopNavbar.tsx, components/ui/Button.tsx, components/Flashcard.tsx, components/CutoffTable.tsx, pages/12p/study.tsx, pages/12p/quiz.tsx
Notes: Bootstrap Compatibility Layer in tailwind.css (hand-written `--bs-*` var aliases) left in place — harmless and used by some inline styles. `public/assets/css/bootstrap*.css` files are legacy static assets, not imported by Next.js. Build passes clean.

## [2026-05-05] — Category Lucide Icon Support
What: Added optional `lucideIcon` field to category schema; renders icon in blog card badge, filter bar buttons, post category badge, and related posts badge
Files: blogRebuild/SanitySchema_ReadNReferenceOnly/category.ts, lib/blogTypes.ts, lib/sanityQueries.ts, lib/catIcon.tsx (new), pages/blog/index.tsx, pages/blog/[slug].tsx
Notes: Field is optional — no icon set = no change to existing display; icon name must match react-icons/lu export (e.g. LuBookOpen); `import * as LuIcons` skips tree-shaking so bundle grows slightly

## [2026-05-05] — Edge-Cache Smart Blog Sync
What: Incremental Sanity sync — diffs slug+_updatedAt against committed snapshot, fetches full data only for new/changed posts, removes deleted entries from both JSONs + OG files
Files: scripts/blog-smart-sync.js (new), data/blog-snapshot.json (new), package.json, docs/v2/edge-cache-smart-blog-sync.md
Notes: OG generator already had content-hash caching so it's untouched; CF Pages limitation: public/og/ is gitignored so OG still regenerates each deploy (R2 needed to fix); blog:sync --force for full re-sync; build:smart replaces build:full for normal use

## [2026-05-05] — Blog Index Mockup (Sanity rebuild)
What: New pages/blog/index.tsx — blog directory page rebuilt for Sanity, cloning old Contentful design in Tailwind/inline CSS vars with schema-correct dummy data
Files: pages/blog/index.tsx (new)
Notes: No card-rounded-4 wrapper; no card-inner-bg — post cards and filter bar use --color-card-bg (white in light, dark in dark/blue); author row added to card bottom with avatar/icon; pagination fixed for all three themes using --color-primary/--color-body/--color-muted (old hardcoded #374151/#9ca3af broke dark+blue); categories dynamic from props not hardcoded; client-side search on title/excerpt/tags/category; pinned posts always float to top; <img> not next/image (Cloudflare Pages); 8 dummy posts + 17 dummy categories matching Sanity schema shape

## [2026-05-04] — Blog Post Style Fixes (9-issue pass)
What: Breadcrumb → PageBreadcrumb; badges → Badge component (sharp, 0.8rem/500); skeleton loading for hero + figure + related images with shadow/glow; link highlight style matching r4-link; blockquote non-italic; light-mode contrast fixes for blockquote/pre/table/share-btn/hr; blue-theme table header dark blue + zebra fix; related posts h3
Files: pages/blog/post.tsx, styles/blog-post.css
Notes: Light page bg (#eff1f3) vs card-inner-bg (#f3f4f6) near-identical — explicit hex values used for blockquote (#e1e4e8), pre (#d8dce3), zebra (#e5e8ec); blue theme thead overridden to #0d1d55, even rows to #1a2a68; Skeleton uses absolute inset-0 rounded-none pattern; no transitions per design rules

## [2026-05-04] — Blog Post Mockup (Sanity rebuild prototype)
What: Prototype blog post page with Medium-style centered layout, no card wrapper, full rich-text elements, Cantonese dummy content
Files: pages/blog/post.tsx (new), styles/blog-post.css (new), pages/_app.tsx
Notes: No .card.rounded-4 — content sits on body-bg directly; max-width 760px centered; blog-post.css is standalone (no globals pollution); all three themes compatible via CSS vars; rich-text includes table, code block, blockquote, figure, lists, HR; end author card + related posts grid

## [2026-05-01] — Phase 1: Blog CSS Extraction from globals.css
What: Extracted all blog-specific CSS (~550 lines) from globals.css into dedicated styles/blog-content.css; imported globally in _app.tsx; removed duplicate blog styles from globals.css
Files: styles/blog-content.css (new), pages/_app.tsx, styles/globals.css, pages/blog/[slug].tsx
Notes: .post-content typography, .blog-container/sidebar layout, image handling, table styling, and dark theme variants now consolidated in single CSS file. globals.css reduced by ~650 lines. Phase 2 target: extract chat CSS next.

## [2026-04-30] — JSON-LD & FAQ Refactor Phases 1-3
What: Extracted all FAQ and JSON-LD data out of utils/structuredData.ts into typed data files; added subjectKey/pageKey props to PageSEO; added year-slug JSON-LD (previously missing); slimmed yearSlugSEO.ts to a re-export
Files: data/faqs/subjects.ts, data/faqs/pages.ts, data/seo/year-slug.ts, data/jsonld/helpers.ts, data/jsonld/subjects.ts, data/jsonld/pages.ts, data/jsonld/year-slug.ts, components/PageSEO.tsx, utils/yearSlugSEO.ts
Notes: structuredData.ts kept as reference for phase 4 migration; year-slug pages now get CollectionPage schema for the first time; pageFaqs/subjectFaqs use {q,a} format matching faqSchema.ts

## [2026-04-30] — 12p + Flashcard Bootstrap→Tailwind, shared PageBreadcrumb
What: Migrated 12p/index.tsx and Flashcard.tsx off Bootstrap; created PageBreadcrumb component; applied to individual-response.tsx and 12p/index.tsx
Files: pages/12p/index.tsx, components/Flashcard.tsx, components/PageBreadcrumb.tsx, pages/individual-response.tsx
Notes: PageBreadcrumb uses page-breadcrumb/breadcrumb-title/breadcrumb CSS already in tailwind.css; showHome prop adds the bx-home-alt link; Flashcard replaced card/card-body Bootstrap classes with fc-card/fc-body style jsx classes

## Changelog Format
```
[DATE] [SCOPE] — Summary (LOC change: +X/-Y)
  - Detail 1
  - Detail 2
```

---

## [2026-04-30] — 12p Study & Quiz: Bootstrap → Tailwind migration
What: Rewrote study.tsx and quiz.tsx from Bootstrap to Tailwind + CSS vars; pre-load all JSON data at build time via getStaticProps; outline button for exit; quiz input locked to 16px
Files: pages/12p/study.tsx, pages/12p/quiz.tsx, styles/tailwind.css
Notes: allPassageData now bundled at build time — no runtime fetch on Start; both pages share same getStaticProps pattern; alert-success added to tailwind.css compat layer; results screen redesigned without Bootstrap list-group-item-* variants; Button outline (violet) replaces the red end-btn for 離開 actions

---

## [2026-04-30] — Bootstrap → Tailwind: Tool pages migration
What: Replaced all Bootstrap utility classes in timer, pomodoro, individual-response with Tailwind equivalents; `style jsx` blocks and `--bs-*` var references untouched
Files: pages/timer.tsx, pages/pomodoro.tsx, pages/individual-response.tsx
Notes: `--bs-*` vars in style blocks left as-is (Bootstrap still installed; theme unification is a separate P0 task). Breadcrumb component classes (breadcrumb, breadcrumb-item) kept since they're a site-wide pattern. Bootstrap spacing conversions: mb-3→mb-4, mb-4→mb-6, mb-5→mb-12, pe/ps-3→pr/pl-4, g-3→gap-4

---

## [2026-04-29] — Design System v4: Refinements + 5 New Components + Page Reorganization
What: Fixed bg inversion (Card now uses --color-card-inner-bg); added Toggle, ConfigItem/ConfigSection, Toast/ToastContainer, Dialog, DropdownMenu; Badge removes soft shape, dot gets translateY(3px) fix; Callout ghost text moved left + opacity raised to 0.15; FileCard default changed to stacked; redesign-4 page reorganized into 8 tiers (Foundation→Content)
Files: components/ui/Card.tsx, components/ui/Badge.tsx, components/ui/Callout.tsx, components/ui/FileCard.tsx, components/ui/Toggle.tsx, components/ui/ConfigItem.tsx, components/ui/Toast.tsx, components/ui/Dialog.tsx, components/ui/DropdownMenu.tsx, pages/redesign-4.tsx
Notes: Dialog uses position:fixed so it breaks out of the card container correctly; DropdownMenu uses relative positioning — keep trigger wrapper as relative; Switch onChange→onCheckedChange API

---

## [2026-04-29] — Design System v4: Full Rebuild + 5 New Components
What: Complete redesign-4 rewrite merging all r5 improvements; card.rounded-4 gets theme-specific container bg; 5 new components (Chip, EmptyState, Callout, RadioGroup, FileCard); black-header table; stronger skeleton shimmer; Chinese text rendering comparison; form margin-top fixes; global iOS 16px input font-size; --color-table-head-bg CSS vars
Files: pages/redesign-4.tsx, components/ui/Chip.tsx, components/ui/EmptyState.tsx, components/ui/Callout.tsx, components/ui/RadioGroup.tsx, components/ui/FileCard.tsx, components/ui/Button.tsx, components/ui/Badge.tsx, components/ui/Input.tsx, components/ui/Table.tsx, styles/tailwind.css
Notes: card.rounded-4 bg: #f2f2f2 light / #1e1e1e dark / #18204a blue. tc-sharp class = antialiased + optimizeLegibility for Retina CJK. RadioGroup live demo with useState. FileCard is DSE-specific download row.

---

## [2026-04-28] — Redesign-4 Component Refinements + TC Clones
What: Fixed icon alignment in alerts (icon now inline with title via `icon` prop), added theme-aware alert colors for dark/blue, fixed focus ring on inputs (ring instead of border-width change), added accordion content top padding, added skeleton shimmer animation, fixed icon card layout (rounded container, outline CTA), expanded forms (password/select/date/textarea), added Traditional Chinese clone for every section
Files: components/ui/Alert.tsx, components/ui/Accordion.tsx, components/ui/Skeleton.tsx, components/ui/Input.tsx, pages/redesign-4.tsx, styles/tailwind.css
Notes: Alert variants expanded to info/success/warning/destructive with CSS classes in tailwind.css that have dark/blue-theme overrides. `AlertIcon` export kept for compat. Skeleton now uses `skeleton-shimmer` class with a soft travelling highlight. Search button uses `!h-9 !w-9 !px-0` override to match input height without touching Button.tsx.

---

## [2026-04-28] — Tech Debt Day 3: Structural Cleanup
What: Deleted dead deployment config, nav experiment components/hooks, script artifacts; fixed broken module import; simplified NavigationLink
Files: vercel.json, .vercelignore, wrangler.toml, scripts/*, data/view-count-*.json, components/Traditional*.tsx, components/PageTransition.tsx, hooks/useNavigationMode.ts + 5 dead hooks, public/sass_legacy/, utils/pageMetadata.legacy.ts→pageMetadata.ts, utils/structuredData.ts, components/NavigationLink.tsx, pages/_app.tsx, package.json, .gitignore
Notes: pageMetadata.legacy.ts broke module resolution (double-dot). NavigationLink is now a pure anchor, always MPA. PageTransition was a no-op in traditional mode. Dead hook chain had no callers in pages or components.

---

## 2026-04-26 SEO — PageSEO component migration across all pages

What: Replaced all raw `<Head>` SEO blocks with the `PageSEO` component across 57+ pages
Files: `components/PageSEO.tsx`, all `pages/**/[year].tsx` (16 files), `pages/12p/study.tsx`, `pages/12p/quiz.tsx`, `pages/blog/[slug].tsx`, `pages/cutoff/[subject].tsx`
Notes: PageSEO now supports `string` robots (not just tuple), `canonical` prop. THS injects faqData via `jsonLd` spread. Blog/cutoff keep a minimal `<Head>` for twitter/theme-color tags not covered by PageSEO. timer.tsx retains Head only for inline CSS.

---

## 2026-03-28 COMPONENTS — DownloadCard component + refactoring script (+320/-3300)

**Files changed:**
- **NEW:** `components/DownloadCard.tsx` (DownloadCard + PaperSection components)
- **NEW:** `scripts/refactor-subject-cards.js` (automated refactoring script)
- `pages/english/index.tsx` refactored (1782 → 236 lines, 87% reduction)
- **NEW:** 15 `index_r.tsx` files created for review
- **RENAMED:** `docs/issues/CMPT_SUBJECT_PAGE_CARD_BLOAT.md`

**Changes:**
- Created reusable `DownloadCard` and `PaperSection` components
- Created automated Node.js refactoring script with regex transformations
- Script supports single subject or `--all` flag for batch processing
- Outputs to `index_r.tsx` for safe review before replacing original

**Batch Results:**
```
✅ english:      1782 → 236 lines (87% reduction)
✅ chinese:      1766 → 241 lines (86% reduction)
✅ math:         2494 → 294 lines (88% reduction)
✅ physics:      3487 → 394 lines (89% reduction)
✅ chemistry:    2707 → 352 lines (87% reduction)
✅ biology:      3200 → 411 lines (87% reduction)
✅ bafs:         3619 → 437 lines (88% reduction)
✅ economics:    2639 → 362 lines (86% reduction)
✅ geography:    2561 → 343 lines (87% reduction)
✅ history:      2321 → 323 lines (86% reduction)
✅ ict:          3672 → 398 lines (89% reduction)
✅ m1:           1850 → 306 lines (83% reduction)
✅ m2:           3699 → 393 lines (89% reduction)
✅ chinese-history: 837 → 197 lines (76% reduction)
✅ citizen:       169 → 101 lines (40% reduction)
✅ ths:           962 → 210 lines (78% reduction)
```

**Total:** 36,067 → 4,195 lines (88% reduction)

**Visual:** No changes — identical to original

**Next:** Replace `index.tsx` with `index_r.tsx` after verification

---

## 2026-03-28 COUNTDOWN — Refactored to folder structure (+420/-1868)

**Files changed:**
- `pages/countdown.tsx` → `pages/countdown/index.tsx` (DSE 2026)
- `pages/countdown2027.tsx` → `pages/countdown/2027.tsx` (DSE 2027)
- **NEW:** `styles/countdown.module.css` (shared CSS module)

**Changes:**
- Extracted ~700 lines of duplicated `<style jsx>` to CSS module
- Reduced per-page code from ~925 lines to ~170 lines each
- Folder structure enables easy addition of future years (2028.tsx, etc.)
- CSS now uses theme variables from tailwind.css/globals.css
- Removed unused CSS variables and redundant rules
- Removed unused keyframe animations (slideInUp, shimmer, pulse)

**Theme consistency:**
- Uses `var(--bs-body-color)`, `var(--bs-card-bg)`, `var(--bs-border-color)`
- Purple accent (#8b5cf6 dark, rgb(117,76,241) light) preserved via CSS module

**Visual:** No changes — pixel-identical to original

**To add DSE 2028:**
1. Copy `pages/countdown/2027.tsx` → `pages/countdown/2028.tsx`
2. Update: targetDate, metadata key, structured data function, title/description
3. Add metadata in `utils/structuredData.ts`

---

## Changelog Conventions

- **SCOPE**: COUNTDOWN, THEME, SEO, PERF, DOCS, FIX
- **LOC change**: Approximate lines added/removed
- Keep entries under 20 lines
- Link to issue docs when relevant

## [2026-04-29] [DESIGN] — Redesign-4 component refinements
What: amend redesign-4 component system per design-review feedback
Files: components/ui/{FileCard,EmptyState,Callout,Chip,Badge,Avatar,Table}.tsx, styles/tailwind.css, pages/redesign-4.tsx
Notes:
  - FileCard: dropped squircle icon, replaced with 3 line-art variants (doc/stacked/ribbon) via iconVariant prop. Icon shifted +4px vertically.
  - EmptyState: added 3 iconVariant styles (ring/bare/box) so I can pick a non-AI-slop frame.
  - Callout: new `ghost` prop renders the icon as a translucent watermark on the left of the bubble.
  - Chip removable: split design — pill divided by hairline rule; X is thicker (strokeWidth 2.5) and larger (12px).
  - Chip outline: border-2 instead of border-1 to render cleanly on low-DPI screens.
  - Badge: corners sharpened (default rounded-sm), added `shape` prop (sharp|square|soft) and `dot` prop. Page now offers 4 designs to choose from.
  - Avatar: CJK detection via Unicode range, larger 16px font for Chinese initials.
  - Table: zebra striping moved to .ui-table-row class; blue theme even rows now use --color-card-bg instead of overlay-bg (was clashing with page bg).
  - tailwind.css: light-theme warning alert deepened (border-color rgba(180,83,9,0.32), bg rgba(217,119,6,0.12)). Added :lang(zh) global rule for antialiased + palt + letter-spacing on CJK.
  - redesign-4 page: shadow-fade alert variant replaced with proper ghost-watermark variant; warning icons use theme-aware .r4-warn-icon (amber-700 light / amber-400 dark / amber-300 blue); card heading icons shifted to marginTop 5px.

## [2026-04-29] �X Remove Announcement Bar
What: Completely removed the legacy AnnouncementBar component, configuration, and associated CSS.
Files: components/AnnouncementBar.tsx, config/announcement.ts, styles/globals.css, docs/site_info.md
Notes: Cleaned up unused variables and elements related to the announcement UI system.

## [2026-05-07] — CF Workers Migration (next-on-pages → @opennextjs/cloudflare)
What: Full migration from CF Pages + next-on-pages (deprecated) to CF Workers via @opennextjs/cloudflare. All routes remain SSG/static; middleware preserved.
Files: wrangler.toml→wrangler.jsonc, open-next.config.ts (new), next.config.js, middleware.ts, package.json, tsconfig.json, .gitignore, types/globals.d.ts, public/_redirects (deleted), public/_headers (deleted), .github/workflows/deploy.yml (new), docs/v2/workers_migration_report.md (new), docs/v2/workers_setup_guide.md (new), docs/site_info.md, docs/v2/ADSENSE_OPTIMIZATION.md
Notes: All redirects/headers from CF Pages files folded into next.config.js. Middleware now also covers .workers.dev hosts and sets noindex on previews. Build pipeline broken into composable scripts (build:prep, build, build:worker, deploy, deploy:preview). GitHub Actions wires auto-deploy on push to main/devTW1. CI requires CF_API_TOKEN, CF_ACCOUNT_ID, plus Contentful secrets for build:prep. CSP cleaned of vercel.com/cdn.ably.com.

## [2026-05-17] — English B1/B2 Conversion Table Hub (/eng-b1b2)
What: New static info page displaying DSE English Paper 1B/3B B1→B2 conversion tables by year (2012–2025) with a B1 mark "purchasing power" trend chart.
Files: pages/eng-b1b2.tsx, components/charts/B1WorthChart.tsx, data/eng-b1b2/conversions.json, data/eng-b1b2/types.ts, data/jsonld/pages.ts, components/tw/Sidebar.tsx, package.json (recharts), docs/v2/eng-b1b2.md
Notes: Display-only hub — no calculator, no level estimation. Recharts loaded via next/dynamic ssr:false so page stays SSG. Two distinct chart lines (Paper 1 indigo / Paper 3 amber). Only 2012 holds real data; 2013–2025 are dummy rows pending transcription. Numbers are community estimates (10stardse), NOT official HKEAA — flagged with a warning Callout. New "資訊 Info" sidebar section added.

## [2026-05-18] — Homepage Rebrand (resource-hub framing)
What: Reframed homepage from past-paper archive to DSE resource hub: new hero (small dse.best wordmark + 你的 DSE 備戰拍檔 + resource-hub description), a DSE 2027 countdown banner, and a 4-tool grid.
Files: pages/index.tsx, components/home/{toolsData.ts,DseCountdown.tsx,ToolGrid.tsx}, lib/fonts.ts, pages/_app.tsx, pages/_document.tsx, tailwind.config.js, docs/v2/homepage_rebrand.md
Notes: DseCountdown is a flat solid-indigo banner (no gradient), one big day count to 2027-04-07, one-shot count-up on mount. ToolGrid = 4 Duolingo-style buttons (JUPAS/12P/Cut Off/Blog) with a colored bottom edge for depth. First attempt was scrapped (gradient/glass/clip-path slop). Noto Serif HK still wired in lib/fonts.ts but currently unused. 歷屆試題 / ChangelogSection / FAQSection untouched.

## [2026-05-18] — Chat migration to Cloudflare Durable Objects
What: Replaced Ably + Redis + serverless chat-auth with one Cloudflare Worker + ChatRoom Durable Object (WebSocket hibernation); full React rewrite of the client (chat.js deleted); removed the AI bot; added reply, typing indicator, message action menu, mod live-sessions panel, mod image embeds, and per-message baked-in geo.
Files: chatRebuild/worker/src/*, chatRebuild/*.md, lib/chat/*, hooks/useChatRoom.ts, components/chat/*, pages/chat.tsx; deleted public/assets/js/chat.js
Notes: Chat Worker deploys separately (chatRebuild/worker, own wrangler.toml) — needs MOD_SECRET_KEY secret + NEXT_PUBLIC_CHAT_WS_URL on the app. Geo from request.cf (country+ASN only; city/region/timezone are paid). Moderation kept basic on purpose (10ms CPU budget, false positives). Not yet deployed/tested — see chatRebuild/SETUP-GUIDE.md verification steps.

## [2026-05-18] — Print stylesheet (blog posts + site-wide)
What: print/Save-as-PDF support — hides nav/sidebar/footer/ads/TOC, forces white bg + black ink. No UI button — Ctrl+P only.
Files: components/tw/Layout.tsx, styles/tailwind.css, styles/blog-post.css, pages/blog/[slug].tsx, docs/v2/print-styles.md
Notes: Hybrid approach — print:hidden on layout chrome (covers all pages), @media print blocks for bg/text/page-breaks. AdSense ins.adsbygoogle force-hidden in print. Blog posts get spelled-out external link URLs. .no-print / .print-only helper classes added.


## [2026-05-21] — 2027 DSE Examination Timetable Page
What: New /timetable page with List + Calendar views, estimated-notice banner, disabled .ics + PDF buttons, countdown link, practical/oral alert.
Files: pages/timetable.tsx, data/jsonld/pages.ts, data/faqs/pages.ts
Notes: Chinese-first labels per design. Dates estimated (HKEAA hasn't published 2027). M1/M2 split into separate rows. Weekday labels verified vs 2027 calendar. ICS button disabled, no generator logic yet. JSON-LD + FAQ wired via pageKey="timetable".
