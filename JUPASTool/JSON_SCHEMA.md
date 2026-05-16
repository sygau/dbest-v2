# JUPAS Calculator — API Schema

**This document is the API contract for the JUPAS search/scoring endpoint.** It defines the JSON structure of `output/programmes.json` — the pre-digested programme data that the API worker loads at deploy time and uses to score student inputs. The worker does zero string parsing at request time; all weight expressions, formula strings, and gate logic are pre-parsed into structured objects by `scripts/process-data.js`.

This document replaces `csv_decoder.md` (deleted). The raw CSV column reference is no longer needed: the build script handles CSV→JSON conversion, and the worker interacts exclusively with this JSON schema. For conceptual explanation of *why* the scoring rules work the way they do, see `JUPAS_MECHANISM.md`.

---

## File: `output/programmes.json`

Array of programme objects, one per JUPAS programme (~385 entries across all 9 UGC-funded + SSSDP institutions).

### Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | JUPAS programme code, e.g. `"JS7101"` |
| `uni` | `string` | University short code: `HKU`, `CUHK`, `HKUST`, `POLYU`, `CITYU`, `HKBU`, `EDUHK`, `LINGU`, `HKMU`|
| `nameEn` | `string` | English programme name |
| `nameCh` | `string` | Chinese programme name |
| `faculty` | `string` | Faculty/school name |
| `isDoubleDegree` | `boolean` | Whether it's a double degree programme |
| `category` | `string` | Broad category, e.g. `"Healthcare"`, `"Business & Finance"`, `"Science"` |
| `categoryCh` | `string` | Chinese category name |
| `type` | `string` | Sub-type, e.g. `"nursing"`, `"accounting"`, `"biology"` |
| `typeCh` | `string` | Chinese sub-type |
| `type2` | `string` | Secondary sub-type (for cross-disciplinary programmes; empty string if none) |
| `type2Ch` | `string` | Chinese secondary sub-type (empty string if none) |
| `isPopular` | `boolean` | Popular programme flag (UI highlight) |
| `isGod` | `boolean` | "God-tier" flag (highly competitive, dse.best internal classification) |
| `isInterview` | `boolean` | Whether an interview is required or may be required |
| `interviewType` | `string\|null` | Interview description text, e.g. `"Selective"`, `"May require"`, `"Not required"`. `null` if no data. |
| `firstYearIntake` | `number\|null` | Number of first-year intake places |
| `numOfYear` | `number\|null` | Duration of programme (years) |
| `formula` | `object` | See [Formula](#formula) |
| `gates` | `object` | See [Gates](#gates) |
| `weights` | `object` | See [Weights](#weights) |
| `hku` | `object` | See [HKU](#hku) |
| `hkust` | `object` | See [HKUST](#hkust) |
| `maxWeightedElectives` | `number\|null` | Cap on how many best-of-group electives receive their weight boost. `null` = no limit. |
| `excludeRules` | `string[]` | Special subject-selection rules. Known values: `"math_or_m1m2_only_one"`. |
| `special` | `string\|null` | Named special scoring formula ID. `null` means standard formula applies. See [Special Calculations](#special-calculations). |
| `cutoffs` | `object` | See [Cutoffs](#cutoffs) |

**What's NOT in the JSON (stripped during build):** All display-only CSV columns are removed — `original_weight_text`, `weight_explanation` (Chinese weight description), `Remarks`, `Remarks_chi`, `notes`, `original_include_text`, `Explanation`. These are human-readable labels that the worker doesn't need. The `subjectTabs.csv` file is also not used — there is no separate category-mapping file; categories come directly from the `category`/`categoryCh` fields in each programme object. Many columns from the original `jupas_data.csv` were also deleted (career/occupation fields, `isPolyTrio`, trailing empty columns, duplicate columns, `type_key`). See `data_validation.md` for the full deleted-columns log.

---

### Formula

```json
{
  "type": "bestN",
  "n": 5
}
```

| `type` | Meaning | Extra Fields |
|--------|---------|-------------|
| `"bestN"` | Sum of highest N weighted subjects (most common) | `n` (integer, usually 4–7) |
| `"hkust"` | HKUST capped: Best 5 + 6th-subject bonus, capped at `hkust.highestAttainableScore` | — |
| `"polyu"` | PolyU: Best 5 + optional 6th-subject bonus with quality gate (6th subject must be ≥ Level 3) | — |
| `"fixed"` | Fixed subjects + N elective slots | `fixed` (string[] of mandatory subjects), `electives` (int) |

About 85% of programmes use `bestN` with `n=5`. The `hkust` type is exclusive to HKUST programmes. The `polyu` type is exclusive to PolyU programmes. The `fixed` type covers `3C2X` (3 core + 2 electives) and similar fixed-slot models at HKMU and some smaller institutions.

**Display note for HKU programmes:** When `hku.sixthMultiplier < 1.0`, the effective display should show N-1. For example, a programme with `formula.type = "bestN"`, `formula.n = 6`, and `hku.sixthMultiplier = 0.2` should display as "Best 5 + 6th×0.2" — not "Best 6" — since the 6th subject is not counted at full value.

---

### Gates

Eligibility checks that run **before** any score computation. If a student fails any gate, the programme is ineligible — no score is produced, no comparison against cutoffs is made.

```json
{
  "minChi": 3,
  "minEng": 3,
  "minMath": 2,
  "minElec1": 3,
  "minElec2": 3,
  "csdRequired": true,
  "excludeCatB": false,
  "excludeCatC": false,
  "mustInclude": ["core:eng", "core:math"],
  "requireAny": [
    {
      "pick": 1,
      "pool": ["elec:bio", "elec:chem"],
      "minLevel": 3
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `minChi` | `number\|null` | Minimum Chinese Language level. `null` = no minimum. |
| `minEng` | `number\|null` | Minimum English Language level. `null` = no minimum. |
| `minMath` | `number\|null` | Minimum Mathematics (Compulsory) level. `null` = no minimum. |
| `minElec1` | `number\|null` | Minimum level for at least 1 elective subject. Checked against raw DSE levels, not weighted scores. This is a slot-position requirement, not a performance ranking. |
| `minElec2` | `number\|null` | Minimum level for at least 2 elective subjects. Same slot-position semantics as `minElec1`. |
| `csdRequired` | `boolean` | **Always `true`.** CSD "Attained" is a universal JUPAS entrance requirement for ALL programmes. Even if the original CSV said otherwise, the build script enforces `true`. |
| `excludeCatB` | `boolean` | If `true`, Category B (Applied Learning) subjects are excluded from scoring. Most programmes set this to `false` (meaning Cat B IS allowed), but most competitive programmes exclude Cat B in practice. |
| `excludeCatC` | `boolean` | If `true`, Category C (Other Languages) subjects are excluded from scoring. Rarely set to `true`. |
| `mustInclude` | `string[]` | **AND logic.** Every subject code in this array must be present in the student's scores. Example: `["core:eng", "core:math"]` means the student MUST have taken both English and Math. If any listed subject is missing, the programme is ineligible. |
| `requireAny` | `object[]` | **OR within groups, AND across groups.** Each group says "pick N subjects from this pool at level ≥ minLevel." All groups must be satisfied. |

**Gate check order (implement in this sequence):**

1. CSD "Attained" — universal gate; fail = ineligible for ALL programmes
2. Core minimums: `minChi`, `minEng`, `minMath` — checked against raw DSE levels
3. `mustInclude` — all listed subjects must be present
4. `minElec1`, `minElec2` — slot-position requirements checked against raw DSE levels
5. `requireAny` — each group must have at least `pick` subjects at ≥ `minLevel` (RAW DSE level, not weighted score)
6. Category exclusions — if `excludeCatB` or `excludeCatC`, remove those subjects from the scoring pool

All numeric gate fields use `null` to mean "no minimum" (not 0). The original CSV sentinel `799` is converted to `null` by the build script.

**Important edge case — elective minimums interpretation:** Official CUHK documentation describes elective minimums as slot-position requirements ("1st elective" = the first requirement slot, not the student's best elective). Some third-party calculators use an e1/e2/e3/e4 notation implying performance-ranked minimums, but this has no official JUPAS basis. Treat all elective minimums as slot-position gates checked against raw DSE levels.

---

### Weights

```json
{
  "regular": {
    "core:eng": 2.0,
    "core:math": 2.0,
    "elec:bio": 1.5
  },
  "bestOf": [
    {
      "pick": 1,
      "pool": ["elec:phys", "ext:M1", "ext:M2"],
      "weight": 2.0
    },
    {
      "pick": 1,
      "pool": ["elec:bio", "elec:chem"],
      "weight": 1.5
    }
  ]
}
```

**`regular`** — simple 1:1 weight multipliers. Each key is a subject code, each value is the decimal multiplier. Subjects not listed default to ×1.0. When both `regular` and `bestOf` reference the same subject, `regular` takes precedence — a subject used in `regular` cannot also be selected in `bestOf`.

**`bestOf`** — conditional group weighting. Each group says: from the `pool` of eligible subjects, select the `pick` highest-scoring weighted subjects and apply the group's `weight`. Multiple groups are separated in the array and represent independent selections.

**Scoring algorithm for bestOf:**

1. Apply `regular` weights to all matching subjects. Lock those subjects — they cannot be reused.
2. For the remaining unlocked subjects, try all valid assignments to bestOf groups.
3. Select the combination that maximizes the weighted sum. Brute-force is fine: most programmes have 1–3 groups of 2–5 subjects each, so the search space is tiny.
4. A subject can only be used once across all regular and bestOf groups.
5. If `maxWeightedElectives` is set (typically `2`), only that many bestOf subjects receive their group weight; additional selected subjects default to ×1.0.

**Subject code format:** `prefix:code`

| Prefix | Meaning | Example codes |
|--------|---------|---------------|
| `core:` | Core subject | `chi`, `eng`, `math`, `csd` |
| `ext:` | Extended Mathematics | `M1`, `M2` |
| `elec:` | Category A elective | `bio`, `chem`, `phys`, `econ`, `ict`, `bafs`, `hist`, `chin_hist`, `geog`, `va`, `music`, `pe`, `lit`, `eng_lit`, `chin_lit`, `tech_living`, `tourism`, `dat`, `hm_sc` |
| `catB:` | Category B (Applied Learning) | various codes |
| `catC:` | Category C (Other Languages) | various codes |

**Subject counting constraints:**
- M1/M2 count as ONE elective subject together. A student who took both can only use one.
- Category C is also limited to ONE subject in Best N selection (same rule as M1/M2). Only the highest-scoring Cat C subject counts.
- CSD is always scored as 0 — it's a universal pass/fail gate only.
- When `excludeRules` contains `"math_or_m1m2_only_one"`: compare the weighted score of Core Math against the best weighted score among M1/M2, keep only the higher one. This is distinct from the M1/M2 single-elective rule; it prevents Core Math + M1/M2 from co-occupying Best N slots.

---

### HKU

```json
{
  "sixthMultiplier": null
}
```

| Value | Meaning |
|-------|---------|
| `null` | No fractional multiplier. Pure Best N, or not an HKU programme. |
| `0.2` | Standard HKU Business School and Faculty of Architecture 6th-subject bonus (also used for 7th-subject bonus in extended Business programmes). |
| `0.5` | HKU Nursing (JS6468), Chinese Medicine (JS6418), Biomedical Sciences (JS6482) 6th-subject bonus. |

When `sixthMultiplier` is non-null:

```
Score = Sum(Best (N-1) weighted subjects) + (Nth Best weighted subject × sixthMultiplier)
```

Weights are applied BEFORE selecting which subject occupies the Nth slot. The Nth subject is selected from the weighted score pool, not the raw scores.

**Confirmed programmes using 0.2 multiplier (6th subject):**
- HKU Business School: BBA, BEcon, BEcon&Fin, BBA(Acc&Fin), BBA(BA), BSc(MAT)
- Faculty of Architecture: BA(Urban Studies), BSc(Surveying)

**Confirmed programmes using 0.2 multiplier (7th subject — extended formula):**
- BBA(Law)&LLB, BFin(AMPB), BBA(IBGM), BSc(QFin)

**Unverified — the 0.5 multiplier claim for some Science programmes has NOT been confirmed in 2025/2026 official HKU documents.** If your data contains 0.5 values beyond the three confirmed Nursing/Chinese Medicine/Biomedical Sciences programmes, verify against the current HKU JUPAS Admissions Information PDF before relying on them.

**Programmes confirmed to use NO multiplier (pure Best N, sixthMultiplier = null):**
- JS6456 (MBBS Medicine), JS6626 (Distinguished MedScholar) — verified via bigexam.hk and official HKU admissions info. These use pure Best 6 with all subjects at full value.

**When sixthMultiplier < 1.0, the effective display should show N-1.** A programme with `formula.n = 6` and `sixthMultiplier = 0.2` should display as "Best 5 + 6th×0.2" — not "Best 6".

---

### HKUST

```json
{
  "highestAttainableScore": null
}
```

| Value | Meaning |
|-------|---------|
| `null` | Not an HKUST capped programme. |
| `42.5`, `59.5`, `63.75`, `72.25`, `76.5`, `85` | Programme-specific score cap. |

When `highestAttainableScore` is non-null (and `formula.type` is `"hkust"`):

```
Step 1: Bonus = highestAttainableScore × BonusPercentage
        (the bonus is a FIXED value per grade, independent of the student's Best 5)
Step 2: Raw Score = Weighted Best 5 + Bonus
Step 3: Final Score = min(Raw Score, highestAttainableScore)
```

The 6th subject must be at least Level 3 (Cat A) or Attained with Distinction (Cat B) to qualify for the bonus. It is the best remaining weighted subject after the Best 5. The bonus percentages are university-wide (same across all HKUST programmes):

| 6th Subject Grade | Numeric Score | Bonus (% of HAS) |
|-------------------|---------------|-------------------|
| Cat A: 5** | 8.5 | 5.00% |
| Cat A: 5* | 7 | 4.12% |
| Cat A: 5 | 5.5 | 3.24% |
| Cat A: 4 | 4 | 2.35% |
| Cat A: 3 | 3 | 1.76% |
| Cat B: Distinction II | 4 | 2.35% |
| Cat B: Distinction I | 3 | 1.76% |

Only Category A subjects require Level 3+; Category B requires Attained with Distinction. Category C subjects also qualify at equivalent levels. The percentages are rounded to 2 decimal places in publications but used at full precision for calculation.

**Important:** Historical cutoff scores (UQ/Median/LQ) for HKUST programmes in `jupas_data.csv` are reported **after** the cap is applied. When comparing a student's computed score against HKUST cutoffs, no further adjustment is needed — both are post-cap values.

The only two programmes using `maxWeightedElectives` (JS5102, JS5103 — both HKUST Science Group A/B) have it set to `2`. This caps how many bestOf electives receive their boosted weight.

**Cat C subjects as 6th subject:** Category C subjects qualify for the HKUST bonus at equivalent numeric levels. A Cat C subject's numeric score (from the universal Cat C table) determines its bonus percentage — the same percentage as a Cat A grade with the same numeric value. For example, Cat C Japanese N1 scores 7, which matches Cat A 5* (also 7), so it receives a 4.12% bonus.

---

### PolyU

PolyU programmes use `formula.type = "polyu"`. There is no separate `polyu` object in the JSON — the formula type alone triggers the PolyU-specific logic.

```
Score = Sum(Best 5 weighted subjects) + 6th Subject Bonus (if qualified)
```

The 6th subject is the best remaining weighted subject after the Best 5. The bonus is the **weighted score** of the 6th subject, added at full value (×1.0). The bonus is only awarded if the 6th subject meets a **quality gate: Level 3 or above** for Cat A subjects. Cat B subjects must be Attained with Distinction. Cat C subjects qualify at equivalent levels.

Unlike HKUST, PolyU has **no score cap** — the raw total is the final score. The bonus incentivizes breadth without rewarding weak additional subjects (a Level 2 or below 6th subject contributes nothing).

PolyU adopted the enhanced scale (5**=8.5) starting from 2025 entry. Pre-2025 cutoffs in the `cutoffs` object use the standard scale — flag these when displaying to users. See [Cutoffs](#cutoffs) for the scale-compatibility table.

---

### Cutoffs

Historical admission scores for benchmarking. Used to classify programmes as reach/target/safety relative to a student's computed score.

```json
{
  "2025": {
    "uq": 33.5,
    "median": 32,
    "lq": 30,
    "vacancy": 30
  },
  "2024": {
    "uq": 33.5,
    "median": 32,
    "lq": 30,
    "vacancy": 25
  },
  "2023": {
    "uq": 32,
    "median": 30,
    "lq": 28
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `uq` | `number\|null` | Upper Quartile — score at the 75th percentile of admitted students |
| `median` | `number\|null` | Median admission score |
| `lq` | `number\|null` | Lower Quartile — score at the 25th percentile of admitted students |
| `vacancy` | `number\|null` | Number of intake places (2024 and 2025 only; not available for 2023) |

The CSV sentinel value `799` (meaning "no data available") is converted to `null`. The UI should display `null` as "N/A" with a tooltip explaining no data exists, rather than silently omitting the value or showing a blank.

**Scale compatibility across years — CRITICAL for cross-year comparison:**

Three universities changed grade-conversion scales at different times:

| University | Enhanced Scale From | 2023 Scale | 2024 Scale | 2025 Scale |
|-----------|--------------------|------------|------------|------------|
| PolyU | 2025 entry | Standard (5**=7) | Standard (5**=7) | Enhanced (5**=8.5) |
| CityU | 2025 entry | Standard (5**=7) | Standard (5**=7) | Enhanced (5**=8.5) |
| HKUST | 2022 entry | Enhanced (5**=8.5) | Enhanced (5**=8.5) | Enhanced (5**=8.5) |

**Implications:**
- HKUST 2023/2024/2025 cutoffs are all on the same enhanced scale — directly comparable across all years
- PolyU and CityU 2023/2024 cutoffs are on the standard scale — NOT directly comparable to enhanced-scale calculator output
- Default comparison year is 2025 for all universities
- Flag PolyU and CityU pre-2025 cutoffs with "Different scoring scale" when displaying

---

## Grade Conversion Tables

These tables define how DSE grades/attainments are converted to numeric scores for computation. The conversion table to use depends on the university's scale. The scale is a property of the **university** (not the programme), with exactly two exceptions: CUHK JS4501 and JS4502 (see below).

### Category A (Core & Elective) — Two Scales

**Enhanced scale (5**=8.5) — confirmed for 2025/2026 entry:**

| Grade | 5** | 5* | 5 | 4 | 3 | 2 | 1 | U |
|-------|-----|----|---|---|---|---|---|---|
| Score | 8.5 | 7 | 5.5 | 4 | 3 | 2 | 1 | 0 |

Universities: HKU (all programmes), CUHK (all programmes EXCEPT JS4501/JS4502), HKUST (all programmes, since 2022 entry), CityU (from 2025 entry), PolyU (from 2025 entry).

**Standard scale (5**=7):**

| Grade | 5** | 5* | 5 | 4 | 3 | 2 | 1 | U |
|-------|-----|----|---|---|---|---|---|---|
| Score | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |

Universities: HKBU, EdUHK, Lingnan University (LU), HKMU. Also CUHK Medicine: JS4501 (MBChB) and JS4502 (MBChB GPS) — these two programmes are the ONLY CUHK programmes on the standard scale. Official CUHK documents explicitly list these as exceptions.

**Implementation rule:**

```
if uni in (HKU, CITYU, POLYU, HKUST):
  use_enhanced_scale()
elif uni == CUHK:
  if id in (JS4501, JS4502):
    use_standard_scale()
  else:
    use_enhanced_scale()
else:  # HKBU, EDUHK, LINGU, HKMU
  use_standard_scale()
```

**Known pitfall:** A widely-used third-party JUPAS calculator has no exception for CUHK Medicine — it applies the enhanced scale to JS4501/JS4502, producing inflated scores (a perfect 42-point profile displays as 51). The API worker MUST include the explicit programme-ID check for these two codes.

### Category B (Applied Learning) — Universal JUPAS Conversion

All 9 JUPAS institutions use the same Cat B table:

| ApL Attainment | Score |
|----------------|-------|
| Attained with Distinction (II) | 4 |
| Attained with Distinction (I) | 3 |
| Attained | 0 (not counted) |

Only applies when `gates.excludeCatB` is `false`. Most competitive programmes exclude Cat B entirely.

### Category C (Other Languages) — Universal JUPAS Conversion

All 9 JUPAS institutions use the same Cat C table. Even enhanced-scale universities keep Cat C on the standard 7-point ceiling — the 5**=8.5 enhancement applies to Category A subjects only.

| Language | Level | Score |
|----------|-------|-------|
| Japanese (JLPT) | N1 | 7 |
| | N2 | 5.5 |
| | N3 | 4 |
| Korean (TOPIK) | Grade 6 | 7 |
| | Grade 5 | 5.5 |
| | Grade 4 | 4 |
| | Grade 3 | 3 |
| French/German/Spanish (CEFR) | C2 | 7 |
| | C1 | 5.5 |
| | B2 | 4 |
| | B1 | 3 |
| | A2 | 3 |
| Urdu | A++/A+/A | 7 |
| | B++/B+ | 5.5 |
| | B | 4 |
| | C/D/E | 3 |

Only ONE Category C subject can count in the Best N selection — same rule as M1/M2. The highest-scoring Cat C subject is used. Some universities may consider a second Cat C subject as an "extra elective" for bonus purposes, but it does not count toward the primary Best N.

### 5-Subject Students

The JUPAS minimum is 4 cores + 2 electives, but CSD is unscored, so the effective scorable count is often 5 subjects. When a programme uses "Best 6" or a 6th-subject bonus and a student has only 5 scorable subjects:

- The student is NOT disqualified — they remain eligible if all gates pass
- For "Best 6" formulas: the missing 6th subject is simply not included (treated as absent, not as 0)
- For bonus-based formulas (HKU fractional Nth-subject, HKUST percentage bonus): no bonus is awarded
- This policy is consistent across HKU, CUHK, and PolyU

---

## Scoring Algorithm (Full Pseudocode)

This is the complete computation that the API worker runs for each student×programme pair.

```
Input:  studentScores = [{ subject: string, level: number }]
        programme     = programmes.json entry

Output: { score: number | null, eligible: boolean,
          breakdown: {}, ineligibilityReason?: string }

Algorithm:

1. GATE CHECK
   a. CSD must be "Attained" (level ≥ 1 in CSD, or a separate flag) — UNIVERSAL
   b. Check minChi, minEng, minMath against raw DSE levels (not weighted scores)
   c. Check mustInclude — all listed subjects must be present in studentScores
   d. Check minElec1, minElec2 — slot-position gates against raw levels
   e. Check requireAny groups — each group satisfied by at least pick subjects at ≥ minLevel
      (checked against RAW DSE levels, before grade→score conversion)
   f. If excludeCatB: remove all catB:* subjects from studentScores
   g. If excludeCatC: remove all catC:* subjects from studentScores
   → If any gate fails: return { eligible: false, reason: "..." }

2. SCORE CONVERSION
   Convert each student subject's DSE level to numeric score using the
   university's grade-conversion scale (see Grade Conversion Tables above).
   Cat B subjects use the universal ApL table.
   Cat C subjects use the universal Cat C table (always 7-point ceiling).

   Apply subject counting constraints:
   - M1/M2: keep only the higher-scoring one
   - Cat C: keep only the highest-scoring one
   - math_or_m1m2_only_one: compare core:math vs best of M1/M2, keep higher

3. WEIGHT APPLICATION
   a. Apply regular weights: for each subject in weights.regular, multiply its
      numeric score by the weight. Lock weighted subjects.
   b. For bestOf groups (in array order):
      - Generate all valid assignments of unlocked subjects to groups
      - For each assignment, calculate the weighted sum
      - Select the assignment with the MAXIMUM total
      - If maxWeightedElectives is set: only the top N bestOf subjects get their
        group weight; extras default to ×1.0
      - Lock all assigned subjects
   c. Unweighted subjects default to ×1.0

4. FORMULA EXECUTION
   switch (formula.type):
     case "bestN":
       - Sort weighted scores descending
       - Sum the top formula.n scores
       - If hku.sixthMultiplier: the Nth subject is multiplied by sixthMultiplier
         (weights already applied; Nth = lowest among Best N)
       - Score = sum

     case "hkust":
       - Best 5 weighted = sum of top 5 weighted scores
       - 6th subject = best remaining weighted subject (must be Level 3+ or Distinction)
       - If 6th subject qualifies: bonus = highestAttainableScore × bonusPercentage(grade)
         (Cat C subjects use their numeric score to look up the bonus percentage)
       - Raw = Best 5 + bonus
       - Score = min(Raw, highestAttainableScore)

     case "polyu":
       - Best 5 weighted = sum of top 5 weighted scores
       - 6th subject = best remaining weighted subject
       - If 6th subject ≥ Level 3 (Cat A), Distinction (Cat B), or equivalent (Cat C):
         Bonus = weighted score of the 6th subject
       - Else: Bonus = 0
       - Score = Best 5 + Bonus (no cap)

     case "fixed":
       - Fixed subjects must all be present
       - Remaining slots filled by best remaining weighted subjects
       - Score = sum of all selected

     If special is non-null:
       - Execute named special calculation (see Special Calculations below)

5. RETURN
   { score: number, eligible: true, maxScore: number, breakdown: subjectBreakdown[] }
```

---

## Special Calculations

Three programmes require custom scoring logic beyond the standard formula+weights system. They are tagged with the `special` field in the JSON.

| Programme | special Field | What's Different |
|-----------|--------------|-------------------|
| JS6119 (HKU BEd&BSc) | `"js6119_special_calculation"` | Conditional weights: science subjects from {Bio/Chem/Phys/M1/M2} get ×1.5; all other electives get ×1.0. Implement per-subject type checking. |
| JS6901 (HKU BSc) | `"js6901_special_calculation"` | Identical logic to JS6119 (shared implementation). Science subjects ×1.5, others ×1.0. |
| JS6688 (HKU Science Master Class) | `"js6688_special_calculation"` | Select best 3 from {Bio/Chem/Phys/M1/M2} at ×1.3 each. Chinese Language excluded from scoring entirely. Higher math minimum (Level 4). |

JS6119 and JS6901 share identical logic — implement once, use for both programme IDs.

---

## Exclude Rules

The `excludeRules` array contains special subject-selection rules that override the standard Best N selection.

| Rule | Effect |
|------|--------|
| `"math_or_m1m2_only_one"` | Before Best N selection, compare weighted score of `core:math` against the best weighted score among `ext:M1`/`ext:M2`. Keep only the higher one. This is distinct from the standard M1/M2 single-elective rule (which limits M1+M2 to one). |

**Confirmed programme:** JS1211 (CityU BEng Biomedical Engineering) — official footnote: "If both Mathematics and M1/M2 are taken, only one subject will be included."

See `data_validation.md` V4 for the audit status of additional programmes that may need this rule.

---

## Flexible Admissions (API Consideration)

While not part of the `programmes.json` schema, the API worker should support a flexible-admission mode. The rules vary by university but share a core principle: **fail exactly 1 subject requirement by exactly 1 grade level.**

**Per-university rules (for worker implementation):**

| University | Additional Conditions | Score Adjustment |
|-----------|----------------------|------------------|
| HKU | Failed subject cannot be Core Math. Failed subject must be ≥ Level 2. | 10% deduction on total admission score. |
| CUHK | Requires "outstanding overall performance" (qualitative criterion). Score ≥ programme UQ is a reasonable heuristic but NOT an official rule. | No standard deduction. |
| PolyU | Must exceed published Flexible Admission Threshold Score per programme (published annually). | No standard deduction. |
| CityU | Must exceed published Flexible Admission Threshold Score per programme (published annually). | No standard deduction. |
| HKBU, others | Failed subject must be ≥ Level 2. Often requires at least one 5* or 5** in another subject. | Varies. |

For the full flexible-admissions specification, see `JUPAS_MECHANISM.md` section 7.

---

## References

- **`JUPAS_MECHANISM.md`** — Conceptual explanation of JUPAS scoring: why the fragmented scale landscape exists, how each university's formula architecture works, edge cases like force-include and 5-subject students, and flexible admissions in detail. Read this to understand the *why* behind the schema.
- **`JUPAS-Calculator-Plan.md`** — Full implementation plan: phases, component tree, UI layout, key technical decisions.
- **`data_validation.md`** — Tracked CSV data issues with severity levels and resolution paths. Includes the log of all columns deleted from `jupas_data.csv`.
- **`search_pending.md`** — Research archive (26 items resolved, 4 active). All confirmed facts about the scoring system.
- **`docs/workflow.md`** — How to edit data, run the build script, and deploy.
