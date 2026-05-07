# CF Workers Migration — Report

Migration from CF Pages + `@cloudflare/next-on-pages` to CF Workers + `@opennextjs/cloudflare`.

Executed 2026-05-07.

## Why

`@cloudflare/next-on-pages` deprecated. `@opennextjs/cloudflare` is the supported path.

## Site shape (verified before touching anything)

- Pages Router, Next.js 15.5.16
- Zero `getServerSideProps`, zero API routes
- Every dynamic route uses `getStaticPaths` with `fallback: false`
- Build output is fully prerendered (○ static / ● SSG in build log)
- Middleware: hostname canonicalization + `?na` cookie

So the site is effectively static. We still chose OpenNext (not pure `next export`) because middleware needs an edge runtime and `redirects()`/`headers()` from `next.config.js` only work when there's a server.

## Changes by file

### Added

- `open-next.config.ts` — OpenNext config. No incremental cache (no ISR). Uses `defineCloudflareConfig({})`.
- `wrangler.jsonc` — replaces `wrangler.toml`. Workers mode, `main = ".open-next/worker.js"`, `assets = ".open-next/assets"`, prod/preview environments.
- `.github/workflows/deploy.yml` — auto-deploy on push to `main` (production) or `devTW1` (preview). Runs `build:prep` → `build:worker` → `wrangler deploy` (or `--env preview`).

### Modified

- `next.config.js`
  - Wrapped with `initOpenNextCloudflareForDev()` so `next dev` sees CF bindings.
  - Migrated all entries from `public/_redirects` into `redirects()`.
  - Migrated CSP from `public/_headers` into `headers()`. Dropped `vercel.com` and `cdn.ably.com` (neither used). Added `*.workers.dev` to script-src for preview hosts.
  - Removed legacy `pages.dev` X-Robots header rule (now in middleware so it covers `.workers.dev` too).
  - Removed Vercel-mentioning comment.
- `middleware.ts`
  - Preview-host detection covers both `.pages.dev` and `.workers.dev`.
  - When `IS_PROD=true`, any preview host 301s to `https://dse.best`.
  - When the host is a preview host (regardless of env), set `X-Robots-Tag: noindex,…` so preview deploys never get indexed.
  - Matcher no longer excludes `_vercel` (we don't run on Vercel).
- `package.json` scripts (refactored — old monolith broken into composable pieces)
  - `build:prep` — `blog:sync && og:generate && blog:sitemap` (replaces the implicit chain inside `build:smart`).
  - `build:prep:force` — same, but with forced blog re-sync.
  - `build:full` — `build:prep && build`.
  - `build:worker` — `opennextjs-cloudflare build`.
  - `preview` — `build:worker && wrangler dev`.
  - `deploy` — `build:worker && wrangler deploy`.
  - `deploy:preview` — `build:worker && wrangler deploy --env preview`.
  - Dropped: `build:smart` (folded into `build:prep` + `build`), `start` (Workers has no `next start`), `export` (we don't use `next export`).
- `tsconfig.json` — excluded `blogRebuild/` (Sanity migration scratchpad with broken imports) and `.open-next/` from type-checking.
- `docs/site_info.md` — corrected stale Vercel deployment lines.
- `docs/v2/ADSENSE_OPTIMIZATION.md` — corrected one stale "Vercel edge CDN" line.
- `types/globals.d.ts` — removed Vercel Analytics globals.

### Deleted

- `wrangler.toml` — replaced by `wrangler.jsonc`.
- `public/_redirects` — CF Pages-only file. Contents migrated to `next.config.js` redirects().
- `public/_headers` — CF Pages-only file. Contents migrated to `next.config.js` headers().

## Dependencies

Added:
- `@opennextjs/cloudflare` (runtime, v1.19.7)
- `wrangler` (devDep, v4.x)

No removals (redis/ably/framer-motion already removed in earlier branch work per migration plan).

## Build verification

`npx opennextjs-cloudflare build` ran clean from a fresh state.

- All pages rendered as `○` (static) or `●` (SSG). No SSR routes.
- Middleware bundled at 34.4 kB.
- Worker emitted at `.open-next/worker.js`.

There is an OpenNext warning that Windows is not officially supported — building on Windows worked but CI runs on Ubuntu (per `.github/workflows/deploy.yml`) which is the supported environment.

## Gotchas encountered

1. **TS check failure inside `blogRebuild/`**. The first `next build` failed because `blogRebuild/SanitySchema_ReadNReferenceOnly/post.ts` imports a non-existent module. That directory is staging for a future Sanity cutover, not part of the runtime build. Excluded it from `tsconfig.json` rather than pulling fixes into this migration.
2. **Middleware needs to handle preview no-index**. Previously the `X-Robots-Tag` block-indexing rule was in `next.config.js` headers() keyed on host pattern `.*\.pages\.dev$`. After the move to Workers, the preview host becomes `*.workers.dev` (and `dbest-v1-preview.<acct>.workers.dev`). Cleaner to set this in middleware (one place, both hosts covered) than to maintain two host-matched header rules.
3. **`compatibility_date`**. OpenNext build warned the original `2024-09-23` was old. Bumped to `2025-09-01`. Added `global_fetch_strictly_public` flag per OpenNext recommendation.
4. **No `start` script**. CF Workers does not run `next start`. Removed from `package.json`. Local production-like preview is `npm run preview` (= `wrangler dev` on the built worker).

## Redirects migrated from `public/_redirects`

| Source | Destination | Status |
|---|---|---|
| `/:page.html` | `/:page` | 301 (was already in next.config.js) |
| `/blog/:slug.html` | `/blog/:slug` | 301 (was already in next.config.js) |
| `/hkpl_link` | `https://sls.hkpl.gov.hk/...` | 301 |
| `/countdown2027` | `/countdown/2027` | 301 |
| `/jable` | `https://jable.tv/` | 302 (`permanent: false`) |
| `/pornhub` | `https://pornhub.com/` | 302 (`permanent: false`) |

## SSG status

100% of routes are statically rendered or SSG-prerendered at build time. No SSR. Middleware runs at edge per request for the redirect/cookie logic only.

This was already the case before migration — verified via grep: zero `getServerSideProps`, all `fallback: false`.

## Known follow-ups (not part of this migration)

- `blogRebuild/` directory should either be cleaned up or fixed and folded into the main blog flow.
- v1 docs (`docs/v1/*.md`) still describe the old Pages + Vercel dual-deployment story. Left as historical archive — flag for triage or move to `docs/archive/`.
- CSP `frame-src` still allows `pages.dev` / Disqus etc.; revisit once Disqus state is finalized.
