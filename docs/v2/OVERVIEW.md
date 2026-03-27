# dse.best v2 — Planning Overview

## Context

dse.best is a Next.js (Pages Router) site deployed on Cloudflare Pages, serving Hong Kong DSE students with past papers, tools (timer, 12P flashcards/quiz, pomodoro), a Contentful-powered blog, and educational resources.

**Key constraints:**
- No SPA behaviour — every route must be a full page load to maximise AdSense revenue
- Cloudflare Pages deployment (static export + edge functions)
- Hybrid CSS: Bootstrap 5 variables + Tailwind v4 + legacy `globals.css`
- Multi-theme support: light, dark, blue-theme, semi-dark

## v2 Goals

1. **Clean architecture** — eliminate monolithic utility files, dead code, and duplicated logic
2. **Pure Next.js patterns** — adopt idiomatic data fetching, validation, image optimisation, and metadata APIs
3. **Performance** — reduce CLS, improve LCP, optimise font loading, minimise JS bundle
4. **Theme system unification** — single source of truth for CSS variables instead of triple-layered overrides
5. **SEO hardening** — keep custom structured data but use Next.js `<Head>` best practices
6. **AdSense compliance** — traditional navigation, full page loads, no client-side routing for ad pages

## Documents in this folder

| File | Purpose |
|------|---------|
| `MONOLITHIC_CLEANUP.md` | Plan to break up `structuredData.ts`, metadata utils, and FAQ generators |
| `NEXTJS_MIGRATION.md` | Audit of anti-patterns and roadmap to idiomatic Next.js |
| `THEME_UNIFICATION.md` | Plan to merge Bootstrap vars, Tailwind vars, and globals.css into one system |
| `UI_DEBT.md` | Remaining UI/UX issues and polish items |

## Non-goals (for now)

- App Router migration (too risky for AdSense, wait for stable Pages Router support)
- Full SPA with `next/link` everywhere (kills ad impressions)
- Removing Bootstrap entirely (too many pages depend on its grid/utilities)
