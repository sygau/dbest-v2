# JUPAS Calculator — System Implementation Report

Reference companion to `JUPASTool/JUPAS_MECHANISM.md` (rules) and `JUPASTool/JSON_SCHEMA.md` (data contract). This file documents the actual code shipped in `lib/jupas/scoring/`.

## Goals
1. Single Cloudflare Workers endpoint that, given a student's DSE profile, returns a tier-classified result for every JUPAS programme (eligible + ineligible).
2. Stay under 10 ms CPU per request.
3. Keep all gate, scoring, and edge-case logic on the server side to resist reverse engineering.

## Architecture

```
POST /api/jupas/calculate
  ▼
pages/api/jupas/calculate.ts        CORS, validate body, hand to engine
  ▼
lib/jupas/scoring/validate.ts       hand-rolled JSON validator
  ▼
lib/jupas/scoring/engine.ts         scoreAll → loop 385 programmes → scoreOne
       │
       ├─ checkGates           gates.ts
       ├─ if fail: checkFlex   flex.ts
       ├─ convertSubjects      grades.ts (per-uni scale; CUHK Med exception)
       ├─ if special: runSpecial    special.ts (JS6119/6901/6688)
       ├─ else: applyWeights        weights.ts (regular + bestOf + cap)
       │       runBestN/Hkust/Polyu/Fixed   formulas.ts
       └─ classify             chance.ts (UQ/Median/LQ/LQ-3 thresholds)
       ▼
sorted ProgrammeResult[]  → JSON response
```

## Module summary

| File | Lines | Role |
|------|------:|------|
| `types.ts`        | ~120 | All shared types: `StudentProfile`, `Programme`, `ProgrammeResult`, `ScaleTier`, etc. |
| `grades.ts`       | ~75  | Cat A enhanced/standard tables, Cat B, Cat C; `convertSubjects` per programme |
| `gates.ts`        | ~95  | 5 gate categories enforced in order; CSD always required |
| `weights.ts`      | ~210 | Subject constraints (M1/M2, Cat C, math_or_m1m2_only_one), regular weights, bestOf brute-force optimizer with maxWeightedElectives |
| `formulas.ts`     | ~150 | bestN (with HKU sixth-multiplier), hkust (cap + bonus%), polyu (Best 5 + qualified 6th), fixed |
| `special.ts`      | ~80  | JS6119/JS6901 (science×1.5), JS6688 (3 sciences×1.3 + Chinese excluded) |
| `flex.ts`         | ~110 | Per-uni flex admission rules; data-pending fallbacks for PolyU/CityU |
| `chance.ts`       | ~70  | 5-tier classifier with year fallback + scale-mismatch note |
| `programmes.ts`   | ~40  | Bundles `JUPASTool/output/programmes.json` via static import; pre-computes max-score cache |
| `validate.ts`     | ~70  | Strict body validation, no external deps |
| `engine.ts`       | ~110 | Orchestrator: `scoreOne` + `scoreAll` |

## Performance budget

- 385 programmes × per-programme work ≈ 3-5 ms warm path (measured via `__smoke__.ts` running `npx tsx`, which adds overhead). Workers V8 isolate is generally faster.
- Cold-start cost: one-time `JSON.parse` of 421 KB at module load. Cloudflare Workers keeps the isolate hot for many requests, so subsequent calls do not pay this cost.
- Inner loops use `for` with index, avoid `Array.map`/`filter` in hot paths, and reuse `Set` instances inside `weights.applyWeights` only.

## Algorithmic details

### Grade conversion
Two Cat A scales (`ENHANCED 5**=8.5` / `STANDARD 5**=7`) selected by university. The only exception inside CUHK is JS4501 / JS4502 (MBChB) which use the standard scale per official policy. Cat B uses the universal ApL table; Cat C uses the universal language table (always 7-point ceiling regardless of uni).

### Gates
Six checks in order:
1. CSD `Attained` (universal). Failure ⇒ ineligible for ALL programmes.
2. Core minimums (`minChi`, `minEng`, `minMath`).
3. `mustInclude` (AND across array).
4. `minElec1`/`minElec2` interpreted as slot-position requirements (best 1st, best 2nd electives ≥ minLevel).
5. `requireAny` (each group must have ≥`pick` subjects at ≥`minLevel`).
6. Category exclusions strip Cat B/C from scoring pool.

Failures short-circuit early. The structured `reason` is surfaced to the client.

### Subject constraints
Applied before weighting:
- M1/M2 collapse to higher-scoring entry.
- Cat C collapse to single highest-scoring entry.
- `math_or_m1m2_only_one` (e.g., JS1211): keep higher of Core Math vs best M1/M2.

### Weights
Two-stage:
1. `regular` map applies exact-match weights and locks those subjects.
2. `bestOf` groups optimised by brute-force enumeration of all valid (no-overlap) combinations to maximise the weighted total. Each group respects `pick` (and allows under-fill per JUPAS_MECHANISM §3). `maxWeightedElectives` caps how many bestOf subjects keep their boosted weight; extras default to ×1.0.

Search space is tiny (≤ a few hundred combinations for typical 1-3 groups of 2-5 subjects), so brute force is fast and obviously correct.

### Formulas
- `bestN` — sort weighted scores desc, sum top N. If `hku.sixthMultiplier < 1` and N subjects available, multiply the Nth slot.
- `hkust` — Best 5 weighted + bonus (HAS × percentage from grade table); cap at `highestAttainableScore`.
- `polyu` — Best 5 weighted + 6th subject's weighted score if it meets quality gate (numeric ≥ 3).
- `fixed` — sum mandatory subjects (zero if absent) + best `electives` from remainder.

### Special
- `js6119_special_calculation` / `js6901_special_calculation`: weight ×1.5 to subjects in {Bio, Chem, Phys, M1, M2}, ×1.0 otherwise; then Best N.
- `js6688_special_calculation`: drop Chinese, pick best 3 from sciences ×1.3, others ×1.0; then Best N.

### Flexible admissions
Universal gate first: exactly one subject failure by exactly 1 grade level, failed subject ≥ Level 2. Then per-uni:
- HKU: failed subject ≠ Math, score ×0.9.
- CUHK: heuristic — score ≥ programme UQ for that year. Marked `cuhk-uq` rule.
- PolyU/CityU: requires programme-level `flexThreshold` field (NOT yet in JSON; engine returns `eligible: false, reason: 'threshold-data-pending'` until populated).
- HKBU/EdUHK/LU/HKMU: failed ≥ L2 + at least one 5* / 5** subject.

### 5-tier classifier
Strict thresholds:
```
gates fail OR no score      → 唔達標 (unmet)
score ≥ UQ                  → 大機會   (highchance)  --- renamed from 'safe'
score ≥ Median              → 博得過 (comp)
score ≥ LQ                  → 邊緣   (bord)
score ≥ LQ - 3              → 機率低 (low)
score < LQ - 3              → 唔達標 (unmet)
```
- Year fallback: if requested year's cutoffs are all null, fall through 2025 → 2024 → 2023.
- If `(uni == POLYU || CITYU)` and the year used is < 2025, sets `scaleNote` warning client about scale mismatch (PolyU/CityU enhanced scale only since 2025).

## Data shape (response)

See `endpoint-guide.md`. The full programme object is included in every result so the frontend has all info fields (intake numbers, faculty, interview type, etc.) without a separate fetch.

## Reverse-engineering protection
- All grade tables, weights, gate rules, and flex logic live server-side.
- Frontend receives only the result fields plus the original programme JSON (which is publicly known data anyway).
- The `breakdown` field is opt-in (`options.breakdown=true`); production should leave it off to reduce response size and hide formula traces.

## Testing
`npx tsx lib/jupas/scoring/__smoke__.ts` — exercises a representative profile, prints timing and a tier histogram, plus spot checks for known-special programmes. Replace with proper Vitest suite when adding regression coverage (see roadmap).

## Known data caveats
- 5-tier ranking trusts the cutoff data as published. If `uq` is null but `median` is present, the safe threshold falls back to median (intentional — better than no signal).
- A non-trivial number of programme weight expressions in the JSON contain partial tokens or human prose (build script warnings). The engine ignores unmatched subject codes, so these programmes simply score using only what they can parse — generally the answer is still close. Track in `data_validation.md`.
