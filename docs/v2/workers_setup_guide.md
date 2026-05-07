# CF Workers — Setup & Deployment Guide

How to develop, build, and deploy `dse.best` on Cloudflare Workers via `@opennextjs/cloudflare`.

## Prerequisites

- Node 20.x
- Cloudflare account with Workers enabled
- Wrangler logged in (`npx wrangler login`) for manual deploys, OR GitHub repo with `CF_API_TOKEN` and `CF_ACCOUNT_ID` secrets for CI deploys

## Local development

| Command | What it does | When to use |
|---|---|---|
| `npm run dev` | `next dev` — vanilla Next.js dev server on `localhost:3000` | 99% of feature work. Hot reload, no CF runtime |
| `npm run preview` | Builds the worker and runs `wrangler dev` on `localhost:8787` | Verify production-like behavior: middleware, redirects, headers, asset binding |
| `npm run build` | `next build` only | Sanity-check Next compiles |
| `npm run build:worker` | `opennextjs-cloudflare build` (calls `next build` internally + bundles worker) | Verify the full deployable artifact builds |

Use `next dev` by default. Reach for `wrangler dev` only when something behaves differently in production (often middleware or CSP).

## Build pipeline

```
build:prep    →  blog:sync  +  og:generate  +  blog:sitemap   (data prep)
build         →  next build                                   (Next.js build)
build:full    →  build:prep && build                          (full local build)
build:worker  →  opennextjs-cloudflare build                  (worker bundle)
deploy        →  build:worker && wrangler deploy              (production)
deploy:preview→  build:worker && wrangler deploy --env preview
```

`build:prep` is idempotent — `blog:sync` is a smart sync that only re-pulls Contentful entries that changed. Use `build:prep:force` to force a full re-sync.

## Environment variables

There are three places env vars live. Use the right one for the value.

### 1. `wrangler.jsonc` `vars` block — non-secret runtime vars

Currently:
```jsonc
"vars": { "IS_PROD": "true" },
"env": {
  "preview": { "vars": { "IS_PROD": "false" } }
}
```

Add non-secret values that the worker reads at runtime here.

### 2. CF dashboard "Secrets" — secret runtime vars

For values you'd never commit (API keys consumed at request time). Use:
```bash
npx wrangler secret put MY_KEY
npx wrangler secret put MY_KEY --env preview
```

The worker reads them as `process.env.MY_KEY`.

### 3. GitHub Actions secrets — values needed during CI build

These are NOT runtime vars. They're consumed by the build process (e.g., Contentful API to generate blog data).

- `CF_API_TOKEN` — required, scoped to "Edit Cloudflare Workers" for this account
- `CF_ACCOUNT_ID` — required, found in CF dashboard right sidebar
- `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` — required if `build:prep` needs to pull from Contentful in CI

Add via GitHub repo → Settings → Secrets and variables → Actions.

## Deployment

### CI/CD (default)

- Push to `main` → GitHub Actions runs `build:prep` → `build:worker` → `wrangler deploy` → production live on `dse.best` (and `dbest-v1.<acct>.workers.dev`)
- Push to `devTW1` → same chain but with `wrangler deploy --env preview` → preview lives on `dbest-v1-preview.<acct>.workers.dev`

The workflow file: `.github/workflows/deploy.yml`.

### Manual deploy

```bash
npx wrangler login
npm run deploy            # production
npm run deploy:preview    # preview
```

## DNS / custom domain

The custom domain `dse.best` should be bound to the production worker via the CF dashboard (Workers & Pages → dbest-v1 → Settings → Domains & Routes → Add custom domain). This is a one-time setup unrelated to deploys.

## Adding a new env var

1. **Non-secret, runtime** → edit `wrangler.jsonc` `vars` block, commit, redeploy.
2. **Secret, runtime** → `npx wrangler secret put NAME` (and `--env preview` if needed).
3. **Build-time only (CI)** → add to GitHub Actions secrets, then add an `env:` line to the `build:prep` step in `.github/workflows/deploy.yml`.

## Troubleshooting

### GH Action fails on `wrangler deploy`
- Token invalid: regenerate `CF_API_TOKEN` with the "Edit Cloudflare Workers" template, paste into repo secrets.
- Account ID mismatch: confirm `CF_ACCOUNT_ID` matches the account that owns the worker.
- Wrangler version skew: pin `wrangler` in `package.json` if a breaking change in CLI lands.

### `next dev` works, `wrangler dev` doesn't
- Check that `npm run build:worker` succeeds first — `wrangler dev` runs the built artifact.
- If middleware behaves differently, remember the Workers runtime is V8 isolates, not Node — anything that touched Node-only globals will fail there but pass in `next dev`.

### Build warns about old `compatibility_date`
- Bump `compatibility_date` in `wrangler.jsonc` to a recent date (within ~6 months) and rebuild.

### `noindex` not appearing on preview
- Middleware sets `X-Robots-Tag` only on hosts containing `.pages.dev` or `.workers.dev`. If you bind a custom subdomain to the preview env (e.g., `staging.dse.best`), add it to `PREVIEW_HOST_FRAGMENTS` in `middleware.ts`.

## Wrangler quick reference

```bash
npx wrangler login                  # auth
npx wrangler whoami                 # confirm auth
npx wrangler deploy                 # deploy production
npx wrangler deploy --env preview   # deploy preview
npx wrangler dev                    # local worker dev (run npm run build:worker first)
npx wrangler tail                   # stream production logs
npx wrangler secret put NAME        # set a secret
npx wrangler secret list            # list secrets
```

## File map

| File | Purpose |
|---|---|
| `wrangler.jsonc` | Worker config. Bindings, env vars, compat flags |
| `open-next.config.ts` | OpenNext build options |
| `next.config.js` | Next.js config + redirects/headers + opennext dev wrapper |
| `middleware.ts` | Per-request edge logic: host canon + noindex + `?na` cookie |
| `.github/workflows/deploy.yml` | CI/CD |
| `.open-next/` | Build output (gitignored) |
