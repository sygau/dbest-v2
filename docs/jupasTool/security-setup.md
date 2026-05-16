# JUPAS Endpoint — Anti-Abuse Setup

Two layers protect `POST /api/jupas/calculate` in production:

1. **Cloudflare Turnstile** — invisible CAPTCHA, blocks bots that don't run a real browser.
2. **Cloudflare Rate Limiting binding** — caps requests per IP.

Both are **bypassed automatically when `IS_PROD !== 'true'`** (preview env, `next dev`, `wrangler dev`). Local development needs zero setup.

---

## 0. Master toggles

`lib/jupas/scoring/config.ts` → `ANTI_ABUSE`:
```ts
export const ANTI_ABUSE = {
  turnstile: { enabled: false, headerName: 'cf-turnstile-token' },
  rateLimit: { enabled: true,  bindingName: 'RATE_LIMITER' },
};
```
- Default ships with **Turnstile OFF** so the endpoint works while the frontend widget is being built. Flip to `true` once the frontend sends the token header.
- `rateLimit.enabled = true` — cheap, leave on.

### Workers free-plan CPU budget
The 10 ms limit is **CPU time**, not wall time. Turnstile siteverify is a `fetch()` (I/O) — does not count against CPU. Rate-limit binding is native, near-zero CPU. Both are safe on the free plan.

---

## 1. Cloudflare Turnstile

### One-time dashboard setup
1. Cloudflare dashboard → **Turnstile** → **Add site**.
2. Domain: `dse.best` (add `localhost` too if you want to test prod build locally).
3. Widget mode: **Invisible** (recommended). **Managed** also fine.
4. Save the **Site Key** (public, goes in frontend) and **Secret Key** (server-only).

### Add the secret to the worker
```powershell
npx wrangler secret put TURNSTILE_SECRET
# paste the secret key when prompted
```

### Frontend (when calculator UI is built)
Embed the widget, get a token, send it as the `cf-turnstile-token` header:
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY" data-callback="onToken"></div>
```
```ts
let turnstileToken = '';
window.onToken = (t: string) => { turnstileToken = t; };

await fetch('/api/jupas/calculate', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'cf-turnstile-token': turnstileToken },
  body: JSON.stringify(profile),
});
```
Tokens are single-use and expire in 5 min. Refresh by calling `turnstile.reset()` between requests.

### Behaviour
| Env | What happens |
|---|---|
| `IS_PROD=true`, secret set, valid token | passes |
| `IS_PROD=true`, secret set, no/invalid token | `403 turnstile rejected` |
| `IS_PROD=true`, **secret NOT set** | `500 turnstile not configured` (fail-safe — refuse rather than allow) |
| `IS_PROD!='true'` (dev/preview) | skipped |

---

## 2. Rate Limiting

### Binding (already in `wrangler.jsonc`)
```jsonc
"unsafe": {
  "bindings": [
    { "name": "RATE_LIMITER", "type": "ratelimit", "namespace_id": "1001",
      "simple": { "limit": 30, "period": 60 } }
  ]
}
```
- `limit: 30` requests per `period: 60` seconds, per IP.
- Free quota is large; no extra Cloudflare config needed.
- Tune `limit` / `period` and redeploy.

### Behaviour
| Env | What happens |
|---|---|
| `IS_PROD=true` + binding present + under limit | passes |
| `IS_PROD=true` + binding present + over limit | `429 rate limit exceeded` |
| `IS_PROD=true` + binding **missing** | logged warning, request allowed (fail-open — won't break prod if config drifts) |
| `IS_PROD!='true'` (dev/preview) | skipped |

The IP is read from `cf-connecting-ip` (set by Cloudflare), falling back to `x-real-ip` / `x-forwarded-for`.

---

## 3. Verifying

After deploy:
```bash
# Should 403 (no token).
curl -X POST https://dse.best/api/jupas/calculate \
  -H 'content-type: application/json' \
  -d '{"subjects":[{"subject":"core:eng","level":5}]}'

# Hammer to trip rate limit.
for i in {1..40}; do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST https://dse.best/api/jupas/calculate \
    -H 'content-type: application/json' -d '{}';
done | sort | uniq -c
# Expect a mix of 400 (validation) → some 429 once over 30/min.
```

Local (no secret, no binding):
```bash
npm run dev
curl -X POST http://localhost:3000/api/jupas/calculate \
  -H 'content-type: application/json' \
  -d '{"subjects":[{"subject":"core:eng","level":5},{"subject":"core:csd","level":3}]}'
# Expect 200 — both checks bypassed.
```

---

## 4. Tuning

All knobs live in `lib/jupas/scoring/config.ts` → `ANTI_ABUSE`:
```ts
export const ANTI_ABUSE = {
  turnstile: { enabled: true, headerName: 'cf-turnstile-token' },
  rateLimit: { enabled: true, bindingName: 'RATE_LIMITER' },
};
```
Flip `enabled: false` to disable a layer in code without redeploying wrangler config.

Bucket size lives in `wrangler.jsonc`. Change `simple.limit` / `simple.period`, redeploy.

---

## 5. What this does NOT defend against

- A determined competitor renting residential IPs + headless browser farms — costs money but works.
- Mitigation strategy beyond this: per-session signed token, payload watermarking, Cloudflare Bot Management (paid). See `roadmap.md`.

Honest baseline: nothing online is safe (you can frame-by-frame screenshot Netflix). This combo raises the cost from `curl one-liner` to `pay for a scraping service`. That's the win.
