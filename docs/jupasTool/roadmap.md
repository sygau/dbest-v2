# JUPAS Calculator Endpoint — Roadmap

Engine version 0.1.0. Endpoint: `POST /api/jupas/calculate`.

## Done
- Types, grade conversion (Cat A enhanced/standard, Cat B, Cat C), CUHK Med exception
- Eligibility gates (CSD universal, core mins, mustInclude, requireAny, elective slots, Cat exclusions)
- Subject constraints (M1/M2 single, Cat C single, math_or_m1m2_only_one)
- Weight application + bestOf brute-force optimizer + maxWeightedElectives cap
- Formulas: bestN, hkust (cap + bonus %), polyu (Best 5 + qualified 6th), fixed
- Special calculations: JS6119 / JS6901 / JS6688
- Flexible admissions: HKU 10pct, CUHK ≥UQ heuristic, HKBU/EdUHK/LU/HKMU L2+star
- 5-tier classifier (穩入 / 博得過 / 邊緣 / 機率低 / 唔達標) with strict LQ-3 cliff
- Bundled JSON loader (385 programmes pre-frozen at module load)
- Endpoint with CORS allowlist for dse.best + localhost
- Smoke harness — warm path 3-5 ms p95 over 385 programmes (well under 10 ms budget)

## Open / Deferred

### Data
- [ ] Add `flex_threshold` column to `jupas_data.csv` for PolyU + CityU programmes (publish from official annual lists).
- [ ] Update `scripts/process-data.js` to map `flex_threshold` → `flexThreshold` field.
- [ ] Audit programmes with malformed weight strings (e.g., partial tokens like `1x(elec:bio` and prose strings like `English Language`) — caught by the build script as warnings but still in JSON. Engine ignores them. Track in `data_validation.md`.
- [ ] Add `force_include` column for CityU VetMed (JS1801) and similar slot-occupation programmes (JUPAS_MECHANISM §3 Force-Include). Currently scored as plain bestN — slightly inflates these students' scores when they lack a forced subject.

### Engine
- [ ] Pre-compute per-programme subject filter Sets at module load to skip non-relevant subjects in inner loop (micro-opt; already fast enough).
- [ ] Replace `Set<string>` allocations in bestOf brute-force with bitmasks on a 32-subject vocabulary for further speedup.
- [ ] Real test suite (Vitest) with hand-computed expected scores for ≥10 representative programmes covering all formula types.
- [ ] HKUST flex policy — currently returns `not standardized`; investigate official policy.

### Endpoint
- [x] Rate limiting — Cloudflare Rate Limiting binding (30/60s/IP). Configured in wrangler.jsonc, checked in lib/jupas/scoring/antiAbuse.ts.
- [x] Turnstile verify on /calculate. Setup: docs/jupasTool/security-setup.md.
- [x] Strip `weights`, `gates`, `hku`, `hkust`, `excludeRules`, `special`, `maxWeightedElectives`, `formula` from response. Replaced `formula` with computed `formulaLabel` string.
- [ ] Per-session signed token (HMAC) bound to IP+UA — bot has to maintain session pool.
- [ ] Watermark / honeypot field per session for leak attribution.
- [ ] Optional listing endpoint `/api/jupas/programmes` — paginated, filtered by uni/category, no scoring. Used for browsing/info pages.
- [ ] Optional caching — 24h CF cache keyed on hash(profile JSON); not critical since engine is fast.

### Frontend (out of scope here; remarks for handoff)
- Send POST body matching `StudentProfile` (see endpoint guide).
- Render tier using existing `safe/comp/bord/low/unmet` colour map in `pages/jupas/design.tsx`.
- Show `scaleNote` text inline on cutoff display.
- Show `flex.eligible=true` with `flex.rule` badge when student is flex-admitted.

## Files
```
lib/jupas/scoring/
  types.ts
  grades.ts
  gates.ts
  weights.ts
  formulas.ts
  special.ts
  flex.ts
  chance.ts
  chance.ts
  programmes.ts        ← bundles JUPASTool/output/programmes.json
  validate.ts
  engine.ts
  __smoke__.ts         ← npx tsx lib/jupas/scoring/__smoke__.ts
pages/api/jupas/calculate.ts
docs/jupasTool/
  roadmap.md           (this file)
  system-implementation.md
  endpoint-guide.md
```
