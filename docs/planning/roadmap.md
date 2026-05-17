# dse.best v2 Roadmap — Priority Stack
*Last updated: 2026-05-17*

## Constraints

- Cloudflare Pages, Next.js Pages Router (static export)
- No SPA — full page loads required for AdSense (NavigationLink enforces this)
- No hydration errors — AdSense-safe
- Performance-first — SEO + user retention

---

## P0 — Critical

### 1. Theme System Unification
**Status:** Steps 1-3 ✅ done (2026-05-06 → 2026-05-17), Steps 4-5 deferred  
**Done:**
- data-bs-theme removed → unified to data-theme only (light/dark/blue)
- Bootstrap package uninstalled
- Blocking theme script set data-theme via localStorage + fallback
- legacy-globals.css created as archive
- All inline style jsx blocks migrated: 12p/index, 12p/quiz, 12p/study, timer, pomodoro, individual-response, translator, redesign-4
- CSS files clean: blog-post.css, jupas/styles.tsx — no --bs-* refs

**Deferred (low priority):**
- Step 4: Chat.tsx full refactor (has --bs-* CSS vars, not blocking)
- Step 5: Remove --bs-* compat layer from tailwind.css + delete legacy-globals.css (final cleanup)

### 2. SEO / Structured Data Consolidation
**Status:** ✅ Phases 1-4 complete (2026-04-30 → 2026-05-17)  
**Done:**
- FAQ data extracted to `data/faqs/` (subjects.ts, pages.ts)
- JSON-LD extracted to `data/jsonld/` (helpers.ts, subjects.ts, pages.ts, year-slug.ts)
- PageSEO component updated with subjectKey/pageKey props
- 57+ pages migrated to PageSEO component
- Phase 4: `utils/structuredData.ts` removed (no active imports). Legacy data archived in `data/legacy/structured-data.ts` for reference

**Deferred:**
- PageHead component (low priority, not blocking)

---

---

## Recent Completions (off-roadmap)

### JUPAS Calculator System (May 2026)
- Full scoring engine (385 programmes, all gates/weights/formulas/special rules)
- API endpoint /api/jupas/calculate with Turnstile anti-abuse + CF rate limiting
- Frontend calculator page with localStorage persistence, sessionStorage caching, 5s cooldown
- JUPAS bookmarks feature (localStorage watchlist, hybrid cutoff display)
- Programme database (programmes-lite.json, 245 KB, runtime-loaded)

### Workers Migration (May 2026)
- Migrated from CF Pages + next-on-pages (deprecated) → @opennextjs/cloudflare
- All routes remain SSG/static, CSP cleaned, GitHub Actions auto-deploy wired

### ✅ Blog Sanity Integration (May 2026) — SHIPPED
- Sanity CMS wired live, custom Portable Text blocks (code, tables, YouTube, alerts)
- Smart blog sync (incremental diffs vs snapshot)
- Auto-deploy via webhook
- All pages live and working end-to-end

---

## P1 — High Priority

### 3. Inline Styles → CSS vars (part of Theme Unification)
**Problem:** ~9 pages still have large `style jsx` blocks using `--bs-*` vars (timer, individual-response, translator, 12p/*, chat, redesign-4)  
**Action:** Replace `--bs-*` with `--color-*` equivalents from tailwind.css  
**Done:**
> ✅ countdown.tsx → CSS module (2026-03-28)  
> ✅ Subject page cards → DownloadCard component, all 15 subjects done  
> ✅ 12p + Flashcard Bootstrap→Tailwind (2026-04-30)  
> ✅ Tool pages (timer, pomodoro, individual-response) → Tailwind (2026-04-30)

### 4. PageHead Component
**Problem:** Every page manually writes 15+ Head meta tags  
**Action:** `<PageHead metadata={...} />` component — single line per page  
**Blocked by:** SEO consolidation Phase 4

### 5. Blog System Migration
**Status:** ✅ Sanity integration complete, prototype pages built  
**Done:**
- Sanity CMS integration live (client + queries)
- Blog post mockup page (pages/blog/post.tsx, Sanity rebuild)
- Blog index mockup (pages/blog/index.tsx, Sanity rebuild)
- Custom Portable Text block types (separator, rich table, button, code block, YouTube embed, alerts)
- Edge-cache smart sync from Sanity (scripts/blog-smart-sync.js)
- Auto-deploy via Sanity webhook + GitHub Actions

**Next:** Replace Contentful API calls with Sanity in pages/blog/ template logic

### 6. Chat Page Refactor
**Status:** Deferred — not in use (dev only), most monolithic page on the site  
**Action:** Full rewrite when chat feature is actually needed

---

## P2 — Medium Priority

### 7. Script Loading Audit
- Keep blocking theme script in `_document.tsx` (FOUC prevention, must stay)
- Consider Cloudflare Zaraz for AdSense/Analytics

### 8. Image Optimization
- Cloudflare Pages has no Next.js Image API
- Use `unoptimized` + explicit `width`/`height` for CLS prevention

### 9. Error Boundaries
- Wrap page content in `<ErrorBoundary>` with friendly fallback

---

## P3 — Low Priority

### 10. CSS Convention Enforcement
Bootstrap utilities (`d-flex`, `mb-4`) still mixed with Tailwind on some pages. Prefer Tailwind for all new code.

### 11. Accessibility Audit
Theme switcher, sidebar toggle, quiz flashcards — missing ARIA roles.

### 12. globals.css Audit
~4400 lines, many rules for deleted pages. Audit after Bootstrap migration is complete.

---

## Execution Order (current)

```
NOW (P1 — Next Feature)
  → New feature: Past Paper Completion Tool (high value, 2-3h)

SOON (P2 — Maintenance)
  globals.css audit (~4400 lines, many obsolete rules)
  PageHead component (low priority)

LATER (P3 — deferred, not blocking)
  Chat.tsx full refactor (has --bs-* CSS, not critical)
  Remove --bs-* compat layer from tailwind.css
  Delete legacy-globals.css file
```

---

## User Feature Backlog

Features from feature list (not yet started):

    Prompt Hub

    Past paper MC answer check online

    Past Paper completion tool/indicator for students

    Music Player (color-noise/lofi?) integrated to site tools

    Link Aggregation Page (unis, important dse info) (Official name: external resource directory)

    Beta English/Chinese writing grading tool (builtin)

    Vocab Bank (eng-primary)

    Games (educational)

    Self created mock papers eg Speaking ListeningA Writing

    By subject exam topic trend analysis

    DSE Student Deals/Freebies/Offers/Partnerships

    Small Private tutor agency/dir

    Study Location Map

    Large, JUPAS Database (DONE, CONNECTED TO CALCULATOR)

    Calculator Program Library

    English Conversion data (b1<>b2) (DONE)

    Visualised Cut Off Database (DONE)

    User/Account Management

    DailyRP (reading passage every day requires a workflow)

    Padlet/Trello like wishing wall/target wall

    MYM Glossary (Textbook Digitalization)

    Advanced grade predictor (by subject) / Required calcula

    Study Rooms/Groups (similar to YPT)

    JUPAS Calculator (DONE)

    Leaderboard System (supp. YPT)

    Speaking IR Practice (DONE)
