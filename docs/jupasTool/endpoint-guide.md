# JUPAS Calculator Endpoint — Frontend Guide

Endpoint: `POST /api/jupas/calculate`
Production URL: `https://dse.best/api/jupas/calculate`
Local dev: `http://localhost:3000/api/jupas/calculate`

CORS allowlist: `https://dse.best`, `https://www.dse.best`, `http://localhost:3000`.

**Production also requires:**
- Header `cf-turnstile-token: <token>` from a Cloudflare Turnstile widget.
- Per-IP rate limit: 30 requests / 60 s. Excess returns `429`.
- Both bypassed in dev (`IS_PROD !== 'true'`). Setup details: `docs/jupasTool/security-setup.md`.

## Request body

```jsonc
{
  "subjects": [
    { "subject": "core:chi",  "level": 4 },
    { "subject": "core:eng",  "level": 5 },
    { "subject": "core:math", "level": "5*" },
    { "subject": "core:csd",  "level": 3 },          // CSD: any level >= 1 means Attained
    { "subject": "elec:phys", "level": "5**" },
    { "subject": "elec:chem", "level": 5 },
    { "subject": "ext:M2",    "level": 4 },
    { "subject": "catB:digital_comic", "level": "dist1" },
    { "subject": "catC:japanese", "language": "japanese", "level": "N1" }
  ],
  "options": {
    "year": 2025,                  // optional, default 2025; allowed: 2023 | 2024 | 2025
    "includeIneligible": true,     // optional, default true
    "flex": true,                  // optional, default true
    "breakdown": false             // optional, default false (set true to receive per-subject trace)
  }
}
```

### Subject codes
| Prefix | Examples |
|--------|----------|
| `core:` | `core:chi`, `core:eng`, `core:math`, `core:csd` |
| `ext:`  | `ext:M1`, `ext:M2` |
| `elec:` | `elec:bio`, `elec:chem`, `elec:phys`, `elec:econ`, `elec:bafs`, `elec:ict`, `elec:hist`, `elec:chin_hist`, `elec:geog`, `elec:va`, `elec:music`, `elec:pe`, `elec:lit`, `elec:eng_lit`, `elec:chin_lit`, `elec:tech_living`, `elec:tourism`, `elec:dat`, `elec:hm_sc`, `elec:ethics_religion` |
| `catB:` | Applied Learning subject keys; level is `attained` / `dist1` / `dist2` |
| `catC:` | `catC:japanese`, `catC:korean`, `catC:french`, `catC:german`, `catC:spanish`, `catC:urdu` — also send `language` (same value as the suffix) and `level` (e.g. `N1`, `C2`, `5`, `A++`) |

### Levels (Cat A)
Allowed: `0`, `1`, `2`, `3`, `4`, `5`, `'5*'`, `'5**'`. CSD: send `1` (Attained) or `0` (Not Attained).

## Response

The response includes the **entire programme object** under `result.programme` for every result — eligible or not. This is intentional: the endpoint serves both "can I get in?" and "give me programme info" use cases. Even fields irrelevant to scoring (`isGod`, `isPopular`, `isInterview`, `interviewType`, `firstYearIntake`, `numOfYear`, `category`, `faculty`, `nameCh`, `weights`, `formula`, etc.) are passed through so the frontend can render cards / filters / detail panels off a single API call.

### Programme fields always returned (under `result.programme`)

| Field | Purpose |
|-------|---------|
| `id`, `uni` | identity / grouping |
| `nameEn`, `nameCh` | display |
| `faculty` | display, filter |
| `category`, `categoryCh`, `type`, `typeCh`, `type2`, `type2Ch` | filter chips, search |
| `isPopular`, `isGod` | UI badges, filter |
| `isInterview`, `interviewType` | UI badge + tooltip |
| `firstYearIntake`, `numOfYear` | info card |
| `isDoubleDegree` | badge |
| `formula` | scoring-method label (just `type` + `n`) |
| `cutoffs` | historical bars (UQ/Median/LQ across years) |

**Stripped from response** (server-only): `weights`, `gates`, `hku`, `hkust`, `excludeRules`, `special`, `maxWeightedElectives`. These are the scoring IP — never sent to clients. If a "requirements" panel needs them, add a separate per-programme detail endpoint with auth + rate limit.

```jsonc
{
  "count": 385,
  "eligibleCount": 291,
  "yearUsed": 2025,
  "results": [
    {
      "programme": {
        // ALL programmes.json fields pass through unchanged — use these directly for cards/filters.
        "id": "JS6456",
        "uni": "HKU",
        "nameEn": "Bachelor of Medicine and Bachelor of Surgery",
        "nameCh": "內外全科醫學士",
        "faculty": "Li Ka Shing Faculty of Medicine",
        "isDoubleDegree": false,
        "category": "Healthcare",
        "categoryCh": "醫療衛生",
        "type": "medicine",
        "typeCh": "醫學",
        "type2": "",
        "type2Ch": "",
        "isPopular": true,
        "isGod": true,
        "isInterview": true,
        "interviewType": "Required",
        "firstYearIntake": 295,
        "numOfYear": 6,
        "formula": { "type": "bestN", "n": 6 },
        // Stripped server-side (NOT in response): weights, gates, hku, hkust,
        // excludeRules, special, maxWeightedElectives. They encode scoring rules
        // and stay on the server. Client gets the computed result instead.
        "cutoffs": {
          "2023": { "uq": 49, "median": 47.5, "lq": 46 },
          "2024": { "uq": 49, "median": 47, "lq": 46, "vacancy": null },
          "2025": { "uq": 49, "median": 47, "lq": 46, "vacancy": 295 }
        }
      },
      "eligible": true,
      "score": 38.5,
      "maxScore": 51,
      "scoreDelta": -8.5,             // score − cutoffs.2025.median; null if no 2025 median data
      "tier": "唔達標",               // 大機會 | 博得過 | 邊緣 | 機率低 | 唔達標
      "tierKey": "highchance",        // highchance | comp | bord | low | unmet  (use this for CSS class)
      "yearUsed": 2025,
      "scaleNote": "PolyU 2024 cutoff uses standard scale; computed score is enhanced — comparison approximate", // optional
      "flex": {                       // present when gate failed and flex was attempted
        "eligible": true,
        "adjustedScore": 34.65,
        "rule": "hku-10pct",
        "failedSubject": "core:chi"
      },
      "breakdown": {                  // only when options.breakdown=true
        "weightedScores": [
          { "subject": "core:eng", "numeric": 5.5, "weight": 1.5, "weighted": 8.25, "usedAs": "best" }
        ],
        "formulaSteps": ["Best 5 + 6th × 0.2"]
      }
    }
  ],
  "meta": { "runtimeMs": 3.7, "version": "0.1.0" }
}
```

### Sorting
`results` are sorted by tier (highchance → comp → bord → low → unmet), then score descending. Re-sort client-side if you need a different order.

### Tier mapping
Use `tierKey` (ASCII) for CSS classes — these match the existing colours in `pages/jupas/design.tsx`:

| tierKey | tier  | colour          |
|---------|-------|-----------------|
| `highchance`  | 大機會  | green `#00703c` |
| `comp`  | 博得過 | blue `#005eb8` |
| `bord`  | 邊緣  | amber `#8a6200` |
| `low`   | 機率低 | orange `#c24100` |
| `unmet` | 唔達標 | red `#d5281b`   |

### Flex rules
- `hku-10pct` — HKU; score adjusted to ×0.9.
- `cuhk-uq` — CUHK; heuristic, score ≥ programme UQ. Mark this clearly on the UI as an estimate, not an official guarantee.
- `polyu-threshold` / `cityu-threshold` — Requires programme-level threshold (data not yet ingested → currently returns `eligible: false, reason: 'threshold-data-pending'`).
- `hkbu-l2` — HKBU/EdUHK/LU/HKMU; failed subject ≥ L2 + has 5*/5**.

### Errors
| Status | Body |
|--------|------|
| `400`  | `{ "error": "subjects must be an array" }` etc. — fix the request and retry. |
| `403`  | `{ "error": "turnstile rejected" }` or `"missing turnstile token"` — refresh and retry. |
| `405`  | `{ "error": "POST only" }` — use POST. |
| `429`  | `{ "error": "rate limit exceeded" }` — back off; wait ~60 s. |
| `500`  | `{ "error": "engine failure" }` or `"turnstile not configured"` — check Workers logs. |

## Examples

### Curl (local)
```bash
curl -X POST http://localhost:3000/api/jupas/calculate \
  -H 'content-type: application/json' \
  -d '{
    "subjects": [
      {"subject":"core:chi","level":4},
      {"subject":"core:eng","level":5},
      {"subject":"core:math","level":"5*"},
      {"subject":"core:csd","level":3},
      {"subject":"elec:phys","level":"5**"},
      {"subject":"elec:chem","level":5},
      {"subject":"ext:M2","level":4}
    ],
    "options": {"year": 2025}
  }'
```

### Frontend fetch (TypeScript)
```ts
const res = await fetch('/api/jupas/calculate', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ subjects, options: { year: 2025 } }),
});
const data = await res.json();
const highChance = data.results.filter((r: any) => r.tierKey === 'highchance');
```

## Performance
Engine warm-path is ~3-5 ms per request for all 385 programmes. No need to debounce on the client; you can re-call on every input change.

## Notes for frontend
- Default to `options.includeIneligible: true` so the user sees why programmes were filtered out (great for "why?" tooltips on the unmet tier).
- Set `options.breakdown: true` only on a "show details" toggle — it can roughly double response size.
- The `programme` object is the full programme record; reuse the fields directly for filters (uni, faculty, category, isPopular, isGod, interviewType, firstYearIntake).
- `scaleNote` only appears for PolyU/CityU programmes when the year used is pre-2025. Show this inline on the cutoff display.
- Pure POST requests are not browser-cached. If you want to cache identical computations across reloads, store the result in `sessionStorage` keyed on `JSON.stringify(profile)`.
