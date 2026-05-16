# JUPAS Calculator Frontend (V1)

Live at `/jupas/calculator`. Talks to `POST /api/jupas/calculate` only — never imports from `lib/jupas/scoring/*`.

## Files

```
pages/jupas/calculator.tsx         page shell, state, fetch, cache, pagination
pages/jupas/design.tsx             prototype sandbox, now imports shared parts

components/jupas/
  styles.tsx                       <JupasStyles /> single source of CSS
  parts.tsx                        JupasCard, MechanismInfo, SortToggle, etc.
  SearchPanel.tsx                  form + filters + validation + localStorage
  constants.ts                     PROB_CONFIG, UNI_*, ALL_PROB_LEVELS, TIER_ORDER

lib/jupas/client/
  apiTypes.ts                      mirror of CalculateResponse (frontend-only)
  subjectMap.ts                    Chinese label ↔ API code, grade ↔ level
  payload.ts                       buildPayload, validateForm, hashForm
  turnstile.ts                     invisible widget helper, dev-bypass-friendly
  sampleResults.ts                 baked-in 40-item response for prefill
```

## Data flow

```
SearchPanel (FormState in localStorage)
   │ click 搜尋 → validateForm → buildPayload → hashForm
   ▼
calculator.tsx handleSearch
   │ sessionStorage hit?  → use cached
   │ else                 → fetch POST /api/jupas/calculate
   │                       (turnstile token if NEXT_PUBLIC_TURNSTILE_SITEKEY set)
   ▼
setResponse() → useMemo filter+sort → slice(0, visibleCount) → JupasCard[]
```

## Bot / bouncer protection

1. Initial render uses `SAMPLE_RESPONSE` from `sampleResults.ts`. Zero network requests until the user clicks 搜尋.
2. `lastSubmittedHash` blocks duplicate POSTs when the form has not changed.
3. 5-second cooldown disables the button after every successful (or failed) submit.
4. SessionStorage cache (24 h TTL) returns instantly for an identical profile.
5. Pre-flight rejection in `validateForm` (missing cores, U on any subject, <2 electives, best-5 floor < 10) — never sends a POST that would obviously fail.

## Validation rules

| Rule | Behaviour |
|------|-----------|
| Core (chi/eng/math) blank | block, error 「請填寫…成績」 |
| Any core OR elective grade = `U` | block, error 「<科> 評為 U」 |
| Fewer than 2 fully-filled electives | block |
| Duplicate elective subject | block |
| Estimated best-5 numeric sum < 10 | block, error 「未達基本入學門檻」 |

## Caching strategy

| Layer | Store | Key | TTL |
|-------|-------|-----|-----|
| In-memory | React `lastSubmittedHash` | `hashForm(form)` | session |
| Browser | `sessionStorage['jupas:result:v1:'+hash]` | profile hash | 24 h |
| Browser | `localStorage['jupas:form:v1']` | n/a | persist |
| Browser | `localStorage['jupas:filters:v1']` | n/a | persist |

Filters and sorts run client-side over the cached response. Toggling a filter never refetches.

## Sample bake (regen)

```
npm run dev          # localhost:3000 (or 3001 if 3000 is taken)

curl -sS -X POST http://localhost:3000/api/jupas/calculate \
  -H 'content-type: application/json' \
  -d '{"subjects":[
        {"subject":"core:chi","level":4},
        {"subject":"core:eng","level":4},
        {"subject":"core:math","level":4},
        {"subject":"core:csd","level":1},
        {"subject":"elec:bio","level":4},
        {"subject":"elec:chem","level":3},
        {"subject":"elec:phys","level":2}],
       "options":{"year":2025}}' > _raw.json
```

Then trim to ~40 across tiers (12 highchance + 8 comp + 5 bord + 10 low + 5 unmet) and overwrite `lib/jupas/client/sampleResults.ts`. The current file was generated this way; keep its top-of-file regen comment in sync.

## Turnstile

- Site key read from `NEXT_PUBLIC_TURNSTILE_SITEKEY` (public, no secret).
- If the env var is unset (default in dev), no script is loaded and `getTurnstileToken()` returns `''`. The worker bypasses verification when `IS_PROD !== 'true'`, so dev works without any Cloudflare config.
- To activate in prod: set `NEXT_PUBLIC_TURNSTILE_SITEKEY`, set `TURNSTILE_SECRET` worker secret, flip `ANTI_ABUSE.turnstile.enabled = true` in `lib/jupas/scoring/config.ts`.

## Pagination

- 20 cards per page; `<Button>顯示更多</Button>` adds 20.
- Resets to 20 whenever filters, sort, or response change.

## Error handling

| HTTP | Banner |
|------|--------|
| 400  | `輸入不正確：<engine error>` |
| 403  | `驗證失敗，請刷新頁面後再試` (turnstile) |
| 429  | `請求過於頻繁，請等候約 60 秒再試` + 60s lockout |
| 5xx  | `伺服器錯誤 (status)，請稍後再試` |
| network fail | `連線失敗，請檢查網絡` |

Existing results stay on screen; the banner appears in the SearchPanel.

## Verification done

- `npx tsc --noEmit` clean.
- `GET /jupas/calculator` returns 200 with prefilled cards rendered server-side (zero POST fired on first load).
- `GET /jupas/design` still 200 after refactor.
- `POST /api/jupas/calculate` round-trip works with the form-built payload (385 results, 5-tier classification).

## Known follow-ups

- Cat B (ApL) and Cat C (real `N1`/`C2`/etc. levels) — V1 omits both; SearchPanel only handles core + electives + M1/M2 + Cat C as DSE level.
- HKUST flex policy — engine returns `not standardized`; keep watching upstream.
- PolyU/CityU `flexThreshold` data ingestion — engine currently returns `eligible:false, reason:'threshold-data-pending'`.
- Programme detail panel (per-programme weights/gates) blocked behind authed endpoint.
- Real Vitest regression tests (server side).
