# CF Workers Migration Plan
# @opennextjs/cloudflare — full migration from CF Pages + next-on-pages

## Why

CF Pages auto-injected `@cloudflare/next-on-pages` is deprecated. No timeline on when CF drops it.
Moving to `@opennextjs/cloudflare` on CF Workers is the supported path forward.
This is not optional — do it now before CF breaks the current deploy.

---

## Current State Summary

- Deployed: CF Pages, next-on-pages auto-injected by CF build pipeline
- wrangler.toml: `pages_build_output_dir = ".vercel/output/static"` (next-on-pages format)
- middleware.ts: hostname redirect (.pages.dev → dse.best) + noAds cookie logic
- public/_redirects: CF Pages native redirect file
- next.config.js: security headers, redirects (.html → clean URLs), images unoptimized

---

## Target State

- Deployed: CF Workers via @opennextjs/cloudflare
- Build output: `.open-next/` (nothing vercel-named)
- wrangler.toml: Workers mode, points to `.open-next/worker.js`
- All existing redirects + headers preserved
- Local dev: `next dev` unchanged
- No ISR, no image optimization — just get it deploying cleanly first

---

## Phase 1 — Dependency + Config Setup

### Install

```
npm install --save-dev @opennextjs/cloudflare wrangler
```

Check latest wrangler version — do NOT pin to old one.

### next.config.js

Wrap config with `@opennextjs/cloudflare` adapter. Check their docs for the exact import/wrapper pattern — it changes between minor versions. Do NOT add ISR or image optimization at this stage.

Remove this comment that references Vercel:
```
// Security headers only - let Vercel/Cloudflare handle caching
```

### wrangler.toml — full rewrite

Replace entirely. Key changes:
- Remove `pages_build_output_dir` (Pages-specific, gone)
- Add `main = ".open-next/worker.js"` (check exact filename in @opennextjs/cloudflare output)
- Add assets binding pointing to `.open-next/assets`
- Keep `compatibility_date` — bump to current date
- Keep `nodejs_compat` flag
- Keep existing `[vars]` block, add `IS_PROD = "true"` for production environment
- For preview/staging: set `IS_PROD = "false"` via wrangler environment override

Example structure (Opus: verify exact keys against current @opennextjs/cloudflare docs):
```toml
name = "dbest-v1"
main = ".open-next/worker.js"
compatibility_date = "2025-05-07"
compatibility_flags = ["nodejs_compat"]

assets = { directory = ".open-next/assets", binding = "ASSETS" }

[vars]
IS_PROD = "true"

[env.preview]
[env.preview.vars]
IS_PROD = "false"
```

---

## Phase 2 — Redirects + Headers Migration

### Problem

`public/_redirects` is a CF Pages feature. It does NOT work in CF Workers.
All redirects must move to `next.config.js` redirects() or wrangler.toml rules.

### What to migrate from public/_redirects

Current entries to preserve:
- `/:page.html → /:page` (301) — already in next.config.js, confirm it stays
- `/blog/:slug.html → /blog/:slug` (301) — already in next.config.js, confirm it stays
- `/hkpl_link → https://sls.hkpl.gov.hk/...` (301) — move to next.config.js redirects()
- `/countdown2027 → /countdown/2027` (301) — move to next.config.js redirects()
- `/jable → https://jable.tv/` (302) — move to next.config.js redirects()
- `/pornhub → https://pornhub.com/` (302) — move to next.config.js redirects()

After all are in next.config.js, delete `public/_redirects`.

### Security headers

Already in next.config.js headers() — these carry over automatically with opennext. No action needed.

---

## Phase 3 — Middleware Audit

Read middleware.ts carefully before touching it. It does two things:

1. **Hostname redirect** — if `IS_PROD=true` and host includes `.pages.dev`, redirect to `dse.best`
   - After migration, preview URLs will be `.workers.dev` not `.pages.dev`
   - Update the check: redirect if host includes `.pages.dev` OR `.workers.dev` (when IS_PROD=true)
   - Keep the 301 redirect to `https://dse.best`

2. **noAds cookie** — if `?na` in URL, set `noAds=1` cookie for 7 days

3. **Matcher** — currently excludes `_vercel` in the pattern
   - Remove `_vercel` from the matcher exclusion list (we don't use Vercel)
   - Keep exclusions: `_next`, `assets`, `favicon.ico`, `robots.txt`, `manifest.json`

Verify the middleware compiles and runs correctly under Workers edge runtime after changes.
Do a quick local test with `wrangler dev` to confirm both redirect + cookie logic fire correctly.

---

## Phase 4 — Cleanup (remove all Vercel artifacts)

Search and remove/update these:

- `wrangler.toml`: `pages_build_output_dir = ".vercel/output/static"` — replaced in Phase 1
- `middleware.ts` matcher: `_vercel` exclusion — remove
- `next.config.js`: comment mentioning Vercel — remove
- Any script in `package.json` referencing vercel or next-on-pages — remove
- `.vercel/` directory if it exists in repo root — delete
- `vercel.json` if it exists in repo root — delete (the one in the worktree is not in main repo, ignore)
- any potentential references in docs or comments to Vercel — update to CF Workers or remove
Grep for `vercel` case-insensitive across the whole repo (excluding node_modules) and handle each hit.

---

## Phase 5 — Build Scripts

### Update package.json scripts

Add:
```json
"build:worker": "opennextjs-cloudflare build",
"deploy": "opennextjs-cloudflare build && wrangler deploy",
"preview": "opennextjs-cloudflare build && wrangler dev"
```

Keep `"dev": "next dev"` unchanged — local Next.js dev still works normally.

The old `build:smart` / `build:full` scripts that call `next build` directly still work for local testing. The `build:worker` is for CF deployment only.

### CF Dashboard build command

In CF Workers dashboard, set build command to:
```
npm run build:worker
```
Or whatever triggers `opennextjs-cloudflare build`.

---

## Phase 6 — Dependency Risk Check

~~**RESOLVED pre-migration** — redis, ably, framer-motion, cloudflared were all confirmed dead code (zero imports in any page/API route) and have been uninstalled. SubjectCardVariants.tsx (only framer-motion consumer) was also deleted as it was imported nowhere.~~

Remaining deps to verify at runtime:
- **sharp** (`^0.33.0`) — build scripts only (OG image generation), NOT at request time. Safe.
- All other deps are client-side or Next.js internals.

No action needed for this phase.

---

## Phase 6b — nodejs_compat Flag Check

`wrangler.toml` currently uses `nodejs_compat`. Check @opennextjs/cloudflare docs to confirm whether the project needs `nodejs_compat_v2` instead. The v2 flag enables a broader set of Node.js APIs and is required by some packages. Wrong flag = silent runtime errors that only appear in production.

Check: https://developers.cloudflare.com/workers/runtime-apis/nodejs/

---

## Phase 7 — Local Testing

1. `npm run dev` — confirm still works (Next.js dev server, unchanged)
2. `npm run build` — confirm Next.js build succeeds
3. `npm run build:worker` — confirm opennext build succeeds, output in `.open-next/`
4. `wrangler dev` — run Workers locally, hit http://localhost:8787
   - Test homepage
   - Test blog page
   - Test `?na` cookie sets correctly
   - Test a redirect (e.g. `/jable`)
   - Test that headers are present (check DevTools)
5. Check for hydration errors in browser console — fix any that appear

---

## Phase 7b — CI/CD: Auto-Deploy on Push (REQUIRED — do not skip)

CF Pages auto-built on git push. CF Workers does NOT. After migration, nothing deploys automatically unless you wire it up. Set up GitHub Actions now before switching traffic.

### GitHub Actions setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm run build:worker

      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
```

### Secrets to add in GitHub repo settings (Settings → Secrets → Actions)

- `CF_API_TOKEN` — create at dash.cloudflare.com/profile/api-tokens
  - Use "Edit Cloudflare Workers" template, scope to the dbest-v1 worker
- `CF_ACCOUNT_ID` — found in CF dashboard right sidebar (any zone page)

### Preview deploys (optional but recommended)

To deploy preview on non-main branch pushes, add a second job or modify the trigger:

```yaml
on:
  push:
    branches:
      - main        # → production
      - devTW1      # → preview (add your dev branch here)
```

For preview, pass `environment: preview` to the wrangler-action so it picks up `[env.preview]` vars from wrangler.toml.

### What this replaces

Previously CF Pages triggered a build automatically on every push to main. Now the GitHub Action is that trigger. The behavior is identical from the developer's perspective — push to main, it deploys.

---

## Phase 8 — Deploy

1. Push to a preview branch first
2. Confirm GitHub Action fires and completes (check Actions tab)
3. Test same checklist as Phase 7 on live preview URL (`.workers.dev`)
4. Monitor for 24 hours — check for any JS errors, broken pages, AdSense loading
5. If clean, merge to main → Action auto-deploys to production
6. Monitor production for 48 hours

---

## Post-Migration Deliverables

After migration is complete and working, Opus must produce two files:

### 1. Post-Migration Report
File: `docs/v2/workers_migration_report.md`

Must include:
- What was changed and why (file-by-file summary)
- What was removed (all Vercel/next-on-pages artifacts)
- What the redis/ably situation was and how it was handled
- Any gotchas or unexpected issues encountered
- Middleware changes made
- Redirects migrated from _redirects
- Current wrangler.toml structure explained

### 2. Workers Setup Guide
File: `docs/v2/workers_setup_guide.md`

Must include:
- How to deploy from scratch (new machine or new dev)
- Required env vars and where to set them (CF dashboard vs wrangler.toml vs GitHub secrets)
- Local dev workflow (next dev vs wrangler dev — when to use which)
- How to deploy to preview vs production
- How to add new env vars (wrangler.toml for non-secret, CF dashboard secrets for sensitive)
- GitHub Actions secrets required (CF_API_TOKEN, CF_ACCOUNT_ID) — where to get them, how to scope the API token
- CI/CD flow: push to main → Action → wrangler deploy → Workers live
- Wrangler commands reference for this project
- What to do if the Action fails (check wrangler version, check token scopes)

---

## Constraints to Respect Throughout

- No ISR, no image optimization — scope is "just deploy cleanly"
- `npm run dev` must continue to work unchanged
- AdSense: avoid anything that could cause layout shift or delayed hydration
  - Do not add streaming, do not add suspense boundaries to ad-adjacent components
  - Keep pages as static as possible
- No Vercel references anywhere in final state
- Redirects from _redirects must ALL be preserved in next.config.js before deleting the file
- Do not add new features during migration — this is a pure infra swap

---

## Files Opus Will Touch

- `wrangler.toml` — full rewrite
- `next.config.js` — add opennext adapter wrapper, remove Vercel comment
- `middleware.ts` — update .pages.dev check, remove _vercel from matcher
- `package.json` — add build:worker script, possibly remove vercel-related scripts
- `public/_redirects` — delete after migrating all entries to next.config.js
- Any `.vercel/` or `vercel.json` at repo root — delete
- `docs/v2/workers_migration_report.md` — create post-migration
- `docs/v2/workers_setup_guide.md` — create post-migration
- `.github/workflows/deploy.yml` — create for auto-deploy on push to main
- No redis/ably/framer-motion changes needed — already removed pre-migration
