# JUPAS Calculator — Implementation Plan

**For the JUPAS scoring system (formulas, weights, gates, grade conversion, edge cases), see `JUPAS_MECHANISM.md` — that is the authoritative reference. For the JSON data schema and API contract, see `JSON_SCHEMA.md`. This plan covers project structure, architecture, phases, and UI only.**

---

## 1. Technical Architecture

### 1.1 Data Pipeline ✅ BUILT

```
CSV/Excel (edit) → input/ → build script → output/ JSON → Worker API → Frontend
```

**What exists:**
- `scripts/process-data.js` — zero-dependency Node.js build script. Reads 2 CSVs from `input/` (`master_data.csv`, `jupas_data.csv`), parses all weight expressions and gates into structured objects, strips junk columns, merges master + jupas by program_id, validates, and outputs pre-digested JSON to `output/`
- `scripts/convert-to-excel.py` — optional: generates a formatted Excel workbook for easier editing
- `JSON_SCHEMA.md` — complete output JSON field reference and scoring algorithm pseudocode
- `docs/workflow.md` — editing workflow, common tasks, fix procedures
- `data_validation.md` — tracked issues in current CSV data with severity and resolution paths
- `search_pending.md` — research archive (26 items resolved, 4 active)
- `JUPAS_MECHANISM.md` — conceptual explanation of all JUPAS scoring rules, edge cases, university policies

**Output files:**
- `output/programmes.json` — merged programme data with pre-parsed scoring objects (no string parsing at request time)
- `output/categories.json` — type→category mapping for UI filters
- `output/build-report.txt` — summary + validation results

**Key design decisions baked into the pipeline:**
- Career/occupation columns stripped from jupas_data (not needed for scoring)
- `subjectTabs.csv` is NOT used — categories come directly from programme objects
- No `subjects.csv` needed — subject taxonomy derived from weight expressions at build time
- Weight/gate/formula parsing happens once at build time, never at request time
- 799 sentinel → null; empty strings → null for numeric fields
- JSON is NOT in `public/` — deployed with the worker, never exposed to browsers

### 1.2 Scoring Engine (Core Logic — TO BUILD)

A standalone TypeScript module for the CF Worker that implements the full scoring algorithm documented in `JSON_SCHEMA.md`. The algorithm pseudocode in that file is the implementation spec — follow it exactly.

The engine must handle all five formula types: `bestN`, `hkust`, `polyu`, `fixed`, and the three `special` programmes (JS6119/JS6901 shared, JS6688 separate). See `JSON_SCHEMA.md` for the complete algorithm and `JUPAS_MECHANISM.md` for the conceptual reasoning behind each formula.

### 1.3 Component Tree

```
/pages/jupas/index.tsx                 # Hub page
/pages/jupas/calculator.tsx            # Main calculator

components/jupas/
(decided later)
```

### 1.4 Key Technical Decisions

**State management:** React `useState` + `useMemo` — the calculator is a pure computation from user inputs. No need for context/store.

**Data loading:** Programme JSON loaded client-side via fetch from the Worker API. Given the volume (~385 programmes), a single fetch is fine.

**Scoring computation:** Pure functions with no side effects. Use `useMemo` to avoid recalculation on every render.

**Deployment:** CF Worker for the API (10ms CPU budget is plenty — algorithm is ~0.5ms per request). JSON is bundled with the worker, not served from `public/`.

---

## 2. UI / UX Design
should be already handled

---

## 3. Implementation Phases

### Phase 1: Data Processing ✅ DONE

1. ~~Write `scripts/process-jupas-data.ts`~~ → `scripts/process-data.js` (Node.js, zero deps)
2. ~~Parse weight expressions into structured format~~ → all patterns handled (regular, bestOf, mustInclude, requireAny, special formulas)
3. ~~Parse must_include / require_any into predicates~~ → parsed into arrays + group objects
4. ~~Identify all "special calculation" programs and plan exceptions~~ → 3 identified (JS6119, JS6688, JS6901); tagged in JSON as `special` field
5. ~~Validate all ~385 programmes~~ → validation pass with error reporting
6. ~~Output clean JSON~~ → `output/programmes.json`

**Also done:**
- Excel converter (`scripts/convert-to-excel.py`)
- JSON schema documented (`JSON_SCHEMA.md`)
- Editing workflow documented (`docs/workflow.md`)
- Research archive consolidated (`search_pending.md`)
- Validation issue tracker created (`data_validation.md`)

**Remaining Phase 1 cleanup:**
- Add `exclude_rules` column to CSV for math_or_m1m2_only_one (see data_validation.md V4)

### Phase 2: Scoring Engine (Estimated: 2–3 sessions) ← NEXT

1. Create the CF Worker scoring module
2. Implement eligibility gate checks (see `JSON_SCHEMA.md` for gate order)
3. Implement grade-to-score conversion with scale detection (enhanced vs standard, including CUHK JS4501/JS4502 exception)
4. Implement basic Best N scoring with weights
5. Implement "best of group" combinatorial selection (brute-force is fine — groups are tiny)
6. Implement HKU 6th-subject fractional multiplier
7. Implement HKUST capped scoring with percentage-based bonus
8. Implement PolyU Best 5 + 6th-subject bonus with quality gate
9. Implement special formulas (JS6119/JS6901 shared, JS6688)
10. Write unit tests with known expected scores

### Phase 3: Calculator UI (Estimated: 2–3 sessions)

1. Create `/pages/jupas/calculator.tsx`
2. Build `SubjectScoreSelector` component
3. Build `ProgrammeResultCard` component
4. Build filtering (university, faculty, search)
5. Build eligibility indicators
6. Build historical comparison (LQ/Median/UQ bars)
7. Add what-if auto-recalculation

### Phase 4: Hub Page + Polish (Estimated: 1 session)

1. Create `/pages/jupas/index.tsx` (hub page with description + link to calculator)
2. Add changelog entry
3. Add FAQ section to calculator
4. Final testing across themes (light/dark/blue)

---

## 4. Key Implementation Decisions (all resolved ✅)

| # | Question | Decision |
|---|----------|----------|
| 1 | How deep should "best of group" combinatorial logic go? | Full brute-force optimization (search space is tiny: 2-5 subjects × 1-3 groups) |
| 2 | JSON in public/ directory? | NO — deployed with worker bundle. Zero programme data exposed to browsers |
| 3 | Worker vs Render for API? | Workers (10ms CPU budget is plenty — algorithm is ~0.5ms per request) |
| 4 | Client-side vs server-side scoring? | Server-side (Worker). Frontend sends scores, Worker returns results. No scoring logic in the browser. |

---

## 5. Data Volume Summary

| Stat | Count |
|------|-------|
| Total programmes | ~385 |
| Universities covered | HKU, CUHK, HKUST, HKBU, CITYU, POLYU, EDUHK, LINGU, HKMU |
| Years of score data | 2023–2025 |
| Subjects (unique short codes) | ~50 |
| Formula types | 5 (bestN, hkust, polyu, fixed, special) |
| Special formula programmes | 3 (JS6119, JS6688, JS6901) |
