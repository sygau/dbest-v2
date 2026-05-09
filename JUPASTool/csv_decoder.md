# CSV Decoder — JUPAS Calculator Data

## File: `master_data.csv`

**Source:** Program-specific admission requirements scraped from JUPAS programme pages.

**Row count:** ~500 programmes across all JUPAS institutions.

---

### Column Reference

#### `program_id` (key)
JUPAS programme code, e.g., `JS7101`, `JS6004`. Links to `jupas_data.csv`.

#### `university`
University short code: `HKU`, `CUHK`, `HKUST`, `POLYU`, `CITYU`, `HKBU`, `EDUHK`, `LINGU` (LU), etc.

#### `name`
Programme name in English.

#### `formula`
The scoring formula identifier. Values observed:
- `Best 4` — sum of highest 4 weighted subjects
- `Best 5` — most common; sum of highest 5 weighted subjects
- `Best 6` — HKU, some CUHK; sum of highest 6 weighted subjects. Note: some HKU programmes listed as `Best 6` actually use a fractional multiplier on the 6th or 7th subject (×0.2), making the effective formula Best 5 + (6th × 0.2) or Best 6 + (7th × 0.2). See `HKU_6th_multiplier`.
- `Best 5 + 6th Subject Bonus` — HKUST; weighted best 5 + 6th subject bonus, capped by `HKUST_HighestAttainableScore`
- `4 Core + 2 Electives`, `3 Core + 2 Electives` — fixed-subject count models

**Note:** This is the *label* of the formula type, not the full calculation. The actual calculation also uses `weight_regular`, `weight_best_of`, `HKU_6th_multiplier`, and `HKUST_HighestAttainableScore`. Always check all related columns before implementing.

#### `exclude_category_b`
`YES` or empty. If `YES`, Category B (Applied Learning) subjects are not counted in this programme's score.

#### `exclude_category_c`
`YES` or empty. If `YES`, Category C (Other Languages) subjects are not counted.

#### `min_total`
⚠️ **DB lookup column — IGNORE.** Almost always empty. Minimum total score is not commonly used as a gate.

#### `min_core_chi`
Minimum level required in Chinese Language. E.g., `3` means the student must achieve at least Level 3. If empty, no minimum (default = 2? depends on the uni).

#### `min_core_eng`
Minimum level required in English Language.

#### `min_core_math`
Minimum level required in Mathematics (Compulsory Part).

#### `csd_required`
Citizenship and Social Development requirement. Values: `YES`, `A`, or empty.

**⚠️ This column is effectively redundant.** CSD "Attained" is a universal JUPAS entrance requirement (part of the "332A" minimum — Level 3 in Chinese and English, Level 2 in Math and Liberal Studies, Attained in CSD). ALL programmes require it regardless of whether this column is populated. If a student has "Not Attained" in CSD, they are ineligible for ALL JUPAS programmes.

CSD contributes **0 points** to any university's admission score — it is purely a pass/fail gate. Ignore this column's value and enforce CSD universally.

#### `min_elective1_grade`
Minimum level required for at least one elective subject. E.g., `3` means at least one elective must be ≥ Level 3. In official CUHK documentation, "1st elective" refers to the first requirement SLOT, not the student's highest-scoring elective.

#### `min_elective2_grade`
Minimum level required for at least two elective subjects. E.g., `2` means at least two electives must be ≥ Level 2. As with `min_elective1_grade`, this is a slot-position requirement checked against raw DSE levels.

**⚠️ Unresolved: e1/e2/e3/e4 ranked notation.** Some calculators extend this to ranked elective gates (`e1`, `e2`, `e3`, `e4` in `min_levels`) suggesting minimums for electives ranked by the student's actual performance (best elective = e1, 2nd-best = e2, etc.). No official CUHK or JUPAS documentation confirms this ranking interpretation. If your CSV data uses e1/e2/e3/e4 keys, verify their source before implementing performance-ranked gates. For 2026 entry, the safest approach: treat elective minimums as slot-position requirements checked against raw levels, not as ranked-performance thresholds.

#### `HKU_6th_multiplier`
Used by some HKU programmes labelled `Best 6`. The multiplier is applied to the Nth-best subject (typically the 6th or 7th), while the first (N-1) subjects are summed at full value:

```
Score = Sum(Best (N-1) weighted subjects) + (Nth Best weighted subject × HKU_6th_multiplier)
```

**Confirmed: weights are applied BEFORE the multiplier.** The Nth subject is selected from the weighted score pool, not the raw scores.

**Confirmed values (2025/2026 HKU Admissions Information):**
- `0.2` — Standard fractional bonus for all HKU programmes that use this mechanism. Confirmed for:
  - HKU Business School: BBA, BEcon, BEcon&Fin, BBA(Acc&Fin), BBA(BA), BSc(MAT) — applied to 6th subject
  - HKU Business School (extended): BBA(Law)&LLB, BFin(AMPB), BBA(IBGM), BSc(QFin) — applied to 7th subject
  - Faculty of Architecture: BA(Urban Studies), BSc(Surveying) — applied to 6th subject
- Empty / `1.0` — The Nth subject counts at full value (pure Best N). Applies to Medicine (JS6456), Law, and other flagship programmes.

**⚠️ Verification needed:** Earlier references in our docs mention a `0.5` multiplier for "some Science programmes." This value has NOT been confirmed in 2025/2026 official HKU documents and may be outdated or incorrect. If your CSV data contains 0.5 values, verify them against the current HKU JUPAS Admissions Information PDF before relying on them.

**Implementation note:** When HKU_6th_multiplier < 1.0, the effective "Best N" display should reflect the reduced weight. For example, a programme with `formula = Best 6` and `HKU_6th_multiplier = 0.2` should show as "Best 5 + 6th×0.2" to avoid misleading users. The display column `best_n` should show N-1 (e.g., 5 instead of 6).

⚠️ Some non-HKU rows have unexpected values (e.g., `YES`) in this column. In those cases, interpret as "not applicable" — this column is only meaningful for HKU programmes.

#### `HKUST_HighestAttainableScore`
Used by HKUST programmes with `formula = Best 5 + 6th Subject Bonus`. This is a **hard cap** on the final admission score.

**How it works:**
1. Compute weighted Best 5 score
2. 6th subject bonus = `HighestAttainableScore × BonusPercentage` (NOT Best 5 score)
   — the bonus is a fixed value per grade, independent of the student's actual Best 5
3. Raw Score = Best 5 weighted + 6th subject bonus
4. Final Score = `min(Raw Score, HighestAttainableScore)`

**The bonus is percentage-based, not a flat addition.** The 6th subject must be at least Level 3 (Cat A) or Attained with Distinction (Cat B) to qualify. The bonus factor depends on the 6th subject's grade:

| 6th Subject Grade | Score | Bonus (% of HAS) |
|-------------------|-------|---------------------|
| Cat A: 5** | 8.5 | 5.00% |
| Cat A: 5* | 7 | 4.12% |
| Cat A: 5 | 5.5 | 3.24% |
| Cat A: 4 | 4 | 2.35% |
| Cat A: 3 | 3 | 1.76% |
| Cat B: Distinction II | 4 | 2.35% |
| Cat B: Distinction I | 3 | 1.76% |

"6th subject" means the best remaining subject after the Best 5 weighted selection (it is a weighted subject, not raw). The cap values observed: `42.5`, `59.5`, `63.75`, `72.25`, `76.5`, `85`.

**Important:** The historical cutoff scores (UQ/Median/LQ) in `jupas_data.csv` for HKUST programmes are reported **after** the cap is applied.

#### `[empty column]` (between HKUST_HighestAttainableScore and original_weight_text)
⚠️ **DB lookup column — IGNORE.** Empty in all rows.

#### `original_weight_text`
Human-readable description of weightings in English. E.g.:
```
"English Language (x2), Mathematics (x1.5)"
```
**Display only** — not used for computation, but useful for showing users how the formula works. Use `weight_regular` for actual calculation.

#### `weight_explanation`
Human-readable description of weightings in Chinese. E.g.:
```
"英文 × 2.0；數學 × 1.5"
```
**Display only.** Same info as `original_weight_text` but in Chinese.

#### `weight_regular`
**Core column for computation.** Semi-colon-separated list of weight expressions.

**Syntax:**
```
type:subject_code=multiplier
```

**Types:**
| Prefix | Meaning |
|--------|---------|
| `core:` | Core subject (Chi, Eng, Math) |
| `ext:` | Extended Math (M1, M2) |
| `elec:` | Category A elective |
| `catB:` | Category B (Applied Learning) |
| `catC:` | Category C (Other Languages) |

**Subject codes** (non-exhaustive):
- `chi` — Chinese Language
- `eng` — English Language
- `math` — Mathematics (Compulsory)
- `M1` — Extended Math M1
- `M2` — Extended Math M2
- `bio` — Biology
- `chem` — Chemistry
- `phys` — Physics
- `econ` — Economics
- `ict` — Information & Communication Technology
- `bafs` — Business, Accounting & Financial Studies
- `hist` — History
- `chin_hist` — Chinese History
- `geog` — Geography
- `va` — Visual Arts
- `music` — Music
- `pe` — Physical Education
- `lit` / `eng_lit` — Literature in English
- `chin_lit` — Chinese Literature
- `tech_living` — Technology & Living
- `tourism` — Tourism & Hospitality Studies
- `dat` — Design & Applied Technology
- `hm_sc` — Health Management & Social Care

**Multiplier:** Decimal value (e.g., `1.5`, `2.0`, `2.5`, `1.25`).

**Examples:**
```
core:eng=2.0; core:math=2.0             → English x2, Math x2
core:chi=1.5; core:eng=1.5              → Chinese x1.5, English x1.5
core:eng=2.0; core:math=2.0; elec:bio=1.5 → English x2, Math x2, Bio x1.5
```

**Special values:** Some rows have a named reference like `js6119_special_calculation` instead of inline weights. These refer to custom formulas defined in the scoring engine.

#### `weight_best_of`
**Core column for computation.** Defines groups where the programme picks the "best N" subjects from a pool and applies a weight.

**Syntax:**
```
Nx(subject1|subject2|...)@multiplier
```

Where:
- `N` = number of subjects to select from the pool
- Pipe `|` = OR (pool of eligible subjects)
- `@multiplier` = weight applied to selected subjects

**Examples:**
```
1x(elec:bio|elec:chem|elec:phys|ext:M1|ext:M2)@1.5
→ Pick the best 1 from {Bio, Chem, Phys, M1, M2} and apply ×1.5
```

```
2x(elec:bio|elec:chem)@1.5
→ Pick the best 2 from {Bio, Chem} and apply ×1.5
```

Multiple groups can be separated by `;`:
```
1x(elec:phys|ext:M1|ext:M2)@2.0; 1x(elec:bio|elec:chem)@1.5
→ Pick best 1 from {Phys, M1, M2} at ×2.0
→ Pick best 1 from {Bio, Chem} at ×1.5
```

**Rules:**
- A subject can only be used once. If used in `weight_regular`, it cannot also be used in `weight_best_of`.
- The engine should try all combinations to maximize the total score.
- `max_weighted_electives` may cap how many subjects from best_of groups actually receive the weight.

#### `original_include_text`
⚠️ **DB lookup column — IGNORE.** Duplicates info in `must_include` / `require_any` in human-readable format. For display only.

#### `Explanation`
⚠️ **DB lookup column — IGNORE.** Chinese version of must_include explanation. Display only.

#### `original_include_text`
⚠️ **Duplicate of must_include in human-readable format — IGNORE for computation.** Display only.

#### `Explanation`
⚠️ **Duplicate of must_include in Chinese — IGNORE for computation.** Display only.

#### `must_include`
Subjects that the student MUST have taken (and achieved at the programme's minimum level, e.g., Level 3) for the programme to consider them. Think of this as a **required subject list**.

**Syntax:** Pipe `|` separated subject codes, meaning **ALL** must be present (AND logic):
```
core:eng|core:math
```
Means: English AND Math must both be taken at ≥ minimum level. If the student didn't take Math, they're ineligible.

```
core:eng
```
Means: English must be included.

#### `require_any`
Similar to `weight_best_of` but for **eligibility gates** rather than scoring. Uses the same group syntax with `@>=N` for the minimum grade:

```
1x(elec:bio|elec:chem)@>=3
```
Means: at least one of {Biology, Chemistry} must be at Level 3 or above. If student has Bio Level 2 and Chem Level 4, they pass (Chem ≥3).

```
1x(core:math|ext:M1|ext:M2)@>=3; 1x(elec:phys|elec:chem|elec:bio)@>=3
```
Means: at least one of {Math, M1, M2} at ≥3 AND at least one of {Physics, Chemistry, Biology} at ≥3. Both groups must be satisfied.

#### `Remarks`
English admission remarks/notes. E.g.:
```
"Candidates with level 4 in English Language, if admitted, will be required to take 6 additional credits..."
```
**Display only** — does not affect scoring.

#### `Remarks_chi`
Chinese admission remarks. **Display only.**

#### `notes`
Additional notes. **Display only.**

#### `max_weighted_electives`
Limits how many subjects from the `weight_best_of` pool actually receive the weight multiplier.

- Value = `2` means: only the 2 best weighted electives count at the boosted weight; any additional electives are scored at ×1.0.
- Empty = no limit (all eligible subjects get their weight).

**Technical note:** A simple "sort by weighted score, pick top N" approach is sufficient for correct scoring under max_weighted constraints. Some calculators implement an iterative swap to find the absolute mathematical maximum in edge cases, but this is an optimization refinement, not a JUPAS requirement.

#### `force_include` (⚠️ may not exist in current CSV — needs column addition if required)

Subjects that MUST ALWAYS occupy slots in the Best N calculation, even if the student did not take them (score = 0). Distinct from `must_include` (eligibility gate — fails if missing) and `weight_regular` (weighting rule — only applies if taken).

**Primary known case — CityU VetMed (JS1801):** Best 5 MUST include English, Mathematics, Biology, and Chemistry (4 of 5 slots). Without Chemistry, the student gets Eng + Math + Bio + 0 + next best subject — penalized through scoring, not disqualified.

**Other suspected cases:** HKU Dental Surgery (JS6107), certain CityU "Best N including X, Y" programmes.

If this column does not exist in the current CSV, force-include programmes must be identified by formula pattern matching or manual tagging.

#### `exclude_rules` (⚠️ may not exist in current CSV — needs column addition if required)

Special subject-selection rules beyond basic weighting. Known values:

- `math_or_m1m2_only_one` — Compares weighted score of Core Math against the best of M1/M2; keeps only the higher one. Prevents both Math and M1/M2 from co-occupying Best N slots. Confirmed for: CityU JS1211 (BEng Biomedical Engineering), JS1201 (Architecture/Civil Engineering), HKU programmes with "M1/M2 or Cat C whichever higher" clauses, EdUHK and some SSSDP programmes.

If this column does not exist, the rule should be triggered by explicit formula text matching or programme-code lists.

---

## File: `jupas_data.csv`

**Source:** Programme metadata, historical cutoff scores, and career info.

---

### Column Reference

#### `program_id` (key)
JUPAS programme code. Matches `master_data.csv`.

#### `university`
University short code.

#### `[empty column]`
⚠️ **DB lookup column — IGNORE.** Empty.

#### `programName_en`
Full English programme name.

#### `programName_ch`
Full Chinese programme name.

#### `FacultyName`
Faculty/school offering the programme.

#### `isdoubledegree`
`TRUE` / `FALSE`. Whether it's a double degree programme.

#### `isPopular`
`TRUE` / `FALSE`. Whether the programme is considered popular (for display/highlight purposes).

#### `isGod`
`TRUE` / `FALSE`. Whether this is a "god programme" (top-tier, very competitive). This is a dse.best internal classification — used for tagging/display only.

#### `isPolyTrio`
`TRUE` / `FALSE`. PolyU-specific classification.

#### `isInterview`
Legacy column? Values: `Not required`, `Selective`, `May require`. Indicates whether an interview is needed.

#### `cat_ch`
Chinese category name (e.g., `商業與金融`).

#### `cat`
English category name (e.g., `Business & Finance`). Used for categorizing programmes by subject area.

#### `type_ch`
Chinese type/sub-type.

#### `type`
English type/sub-type.

#### `type2_ch`
Secondary Chinese type.

#### `type2`
Secondary English type.

#### `occupation1_en`
Primary career path in English.

#### `occupation1_zh_hk`
Primary career path in Chinese.

#### `occupation2_en`
Secondary career path in English.

#### `occupation2_zh_hk`
Secondary career path in Chinese.

#### `first_year_intake`
Number of first-year intake places.

#### `isInterview` (duplicate)
Same as above. Ignore one.

#### `numOfYear`
Duration of programme in years.

#### `interview_arrangement`
Interview requirements description.

#### `vacancy_2025`
Number of vacancies for 2025 entry.

#### `UQ_2025`
Upper Quartile admission score for 2025 entry. Value `799` = no data available.

#### `Median_2025`
Median admission score for 2025 entry. Value `799` = no data available.

#### `LQ_2025`
Lower Quartile admission score for 2025 entry. Value `799` = no data available.

#### `vacancy_2024`, `UQ_2024`, `Median_2024`, `LQ_2024`
Same as above, for 2024 entry.

#### `UQ_2023`, `Median_2023`, `LQ_2023`
Same as above, for 2023 entry. Note: no `vacancy_2023` column exists.

#### `[empty columns]` (several empty columns near the end)
⚠️ **DB lookup columns — IGNORE.**

#### `type_key`
Internal classification key. **Use only if needed for categorization.**

#### `occupation_en`
Career path (English) — may duplicate `occupation1_en`.

#### `occupation_zh_hk`
Career path (Chinese) — may duplicate `occupation1_zh_hk`.

#### `program_id` (duplicate)
Same as first column. Ignore.

#### `occupation1_en` (duplicate)
Same as first `occupation1_en`. Ignore.

#### `occupation2_en` (duplicate)
Same as first `occupation2_en`. Ignore.

---

## File: `subjectTabs.csv`

**Source:** Programme type → category mapping. This is NOT about DSE subjects.

**Purpose:** Each programme in `jupas_data.csv` has a `type` column (e.g., "architecture", "biology", "nursing"). This file maps those programme types to display categories like "Architecture & Construction" or "Healthcare". Used for the programme filter UI, not for scoring.

**Columns:**
| Column | Description |
|--------|-------------|
| `type_en` | Programme type keyword (e.g., `architecture`, `biology`, `nursing`) |
| `category_en` | Parent category in English (e.g., `Architecture & Construction`, `Science`, `Healthcare`) |
| `category_zh_hk` | Parent category in Chinese (e.g., `建築與建造`, `科學`, `醫療保健`) |

**Example:** A programme with `type = "nursing"` maps to `category = "Healthcare"`, so it shows up when the user filters by "Healthcare".

---

## Missing File — `subjects.csv`

This file does NOT exist yet and needs to be created. It's a DSE subject code → full name mapping extracted from the weight expressions in `master_data.csv`.

**Purpose:** The calculator UI needs to show students a list of DSE subjects to input their scores. The codes embedded in weight expressions (like `elec:bio`, `ext:M2`, `catB:ai_robotics`) need full Chinese/English names.

**To create:** Run a script that extracts all unique `type:code` combinations from `weight_regular`, `weight_best_of`, `must_include`, and `require_any` columns across all programmes. Each code then needs a human-readable name assigned.

---

## Data Processing Rules Summary

### Computing a Student's Score for a Programme

```
Input: StudentScore[] = [{ subject, level }]
       Programme = master_data.csv row + jupas_data.csv row

Algorithm:
1. GATE CHECK — Eligibility
   a. Verify CSD "Attained" — UNIVERSAL for ALL programmes (ignore csd_required column)
   b. Verify min_core_chi, min_core_eng, min_core_math
   c. Verify min_elective1_grade, min_elective2_grade
   d. Verify must_include — all listed subjects must be present
   e. Verify require_any — group-based minimum grade check at RAW level
   f. If Category B excluded, filter out catB subjects
   g. If Category C excluded, filter out catC subjects

2. SCORE CONVERSION
   Convert each DSE grade/attainment to points:

   **Category A (Core & Elective) — by university scale:**
   - Enhanced scale (HKU, CUHK*, HKUST, CityU, PolyU):
     5**=8.5, 5*=7, 5=5.5, 4=4, 3=3, 2=2, 1=1, U=0
     * Except CUHK JS4501, JS4502 which use standard scale
   - Standard scale (HKBU, EdUHK, LU, HKMU, HKSYU, CHC):
     5**=7, 5*=6, 5=5, 4=4, 3=3, 2=2, 1=1, U=0

   **Category B (Applied Learning) — universal JUPAS conversion:**
   | ApL Attainment | Score |
   |----------------|-------|
   | Attained with Distinction (II) | 4 |
   | Attained with Distinction (I) | 3 |
   | Attained | 0 (not counted) |

   Only applies when exclude_category_b is NOT YES. Most programmes exclude Cat B.

   **Category C (Other Languages) — universal JUPAS 2025 conversion:**
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

   All 9 JUPAS institutions use the same Cat C table. Even enhanced-scale universities
   (PolyU, HKU, etc.) keep Cat C on the standard 7-point scale — the 5**=8.5 enhancement
   applies to Category A subjects only.

   **Single-subject limit:** Like M1/M2, only ONE Category C subject can count toward
   the Best N selection. If a student took both Japanese and Korean, only the higher-scoring
   one is included. (Some universities may consider a second Cat C subject as an "extra
   elective" for bonus purposes, but it does not count in the primary Best N.)

   **Important edge cases:**
   - M1/M2 (Mathematics Extended Parts): Counted as ONE elective subject together.
     A student who takes both M1 and M2 can only use one of them in the score.
   - Category C (Other Languages): Also limited to ONE subject in Best N selection
     (same rule as M1/M2). Only the highest-scoring Cat C subject counts.
   - CSD: Always scored as 0; it is a universal pass/fail gate for ALL programmes.
   - U (Unclassified): Always scored as 0.

   **5-subject students:** Some students have only 5 scorable subjects (4 cores minus
   CSD + 2 electives = effectively 5 since CSD is unscored). When a programme uses
   "Best 6" or a 6th-subject bonus, the student is NOT disqualified — they are
   evaluated on the 5 subjects they have. For Best 6: the missing 6th subject is simply
   not included (treated as absent, not as 0). For bonus-based formulas (HKU, HKUST):
   no bonus is awarded. The student remains eligible as long as they meet all gate checks.

3. WEIGHT APPLICATION
   a. Apply weight_regular to mandatory subjects
   b. Apply weight_best_of — for each group, select best N subjects
      respecting max_weighted_electives if set
   c. A subject can only be used once across all groups

4. FORMULA EXECUTION
   - Best N: sum of highest N weighted subject scores
   - Best N + bonus: sum of highest N + (N+1th × multiplier)
   - HKUST: apply cap (score cannot exceed HighestAttainableScore)
   - Special formulas: execute named logic

5. COMPARE with historical cutoffs
   Show which programmes are reach/match/safety based on LQ/Median/UQ.

   ⚠️ CRITICAL — Scale compatibility across years:
   Historical cutoff scores reflect the scale used AT THE TIME of admission.
   Three universities changed scales at different times:

   | University | Enhanced Scale From | 2023 Scale | 2024 Scale | 2025 Scale |
   |-----------|--------------------|------------|------------|------------|
   | PolyU | 2025 entry | Standard (5**=7) | Standard (5**=7) | Enhanced (5**=8.5) |
   | CityU | 2025 entry | Standard (5**=7) | Standard (5**=7) | Enhanced (5**=8.5) |
   | HKUST | 2022 entry | Enhanced (5**=8.5) | Enhanced (5**=8.5) | Enhanced (5**=8.5) |

   Result:
   - HKUST 2023/2024 cutoffs ARE directly comparable (same enhanced scale throughout)
   - PolyU and CityU pre-2025 cutoffs are on STANDARD scale — NOT comparable
     to enhanced-scale calculator output without warning

   Implementation:
   - Flag PolyU and CityU 2023/2024 cutoffs with "⚠️ Different scoring scale"
   - Default comparison year is 2025 for all universities
   - HKUST cutoffs are safe for direct comparison across all years

   Value `799` in any cutoff column = no data available for that year.
   This is a sentinel value, not a real score. Do not display it to users.
```

### Scale Detection Rule

⚠️ **IMPORTANT — The grade-to-score mapping is NOT universal across JUPAS universities.** Two competing scales coexist.

**Enhanced scale (5**=8.5) — confirmed for 2025/2026 entry:**
```
5**=8.5, 5*=7, 5=5.5, 4=4, 3=3, 2=2, 1=1, U=0
```
- **HKU** — full adoption, ALL programmes including Medicine & Dentistry
- **CUHK** — university-wide default (with exceptions below)
- **HKUST** — enhanced scale from 2022 entry (earliest adopter). All 2023+ cutoffs are on enhanced scale — directly comparable across all years in our data.
- **CityU** — enhanced scale effective from 2025 entry. 2023/2024 cutoffs use standard scale.
- **PolyU** — enhanced scale effective from 2025 entry (confirmed by official PolyU admissions figures). 2023/2024 cutoffs use standard scale — flag when comparing.

**Standard scale (5**=7) — confirmed:**
```
5**=7, 5*=6, 5=5, 4=4, 3=3, 2=2, 1=1, U=0
```
- **HKBU**, **EdUHK**, **LU** (Lingnan), **HKMU**, **HKSYU**, **CHC** — standard scale for all programmes
- **CUHK Medicine exceptions only:** JS4501 (MBChB), JS4502 (MBChB GPS) — these two programmes retain the standard scale (official max score: 42 out of 6×7)

**⚠️ Implementation pitfall observed in existing calculators:** A widely-used JUPAS calculator (jupascalculator.com) has NO code-level exception for CUHK Medicine — all programmes with `cuhk_weighted` score_type receive the 8.5-point scale. This produces inflated scores for JS4501/JS4502 (e.g., a perfect 42-point profile would display as 51). The destination calculator MUST include a hardcoded exception for these two programme codes to avoid the same bug. Do not rely on the score_type field alone — add an explicit programme-ID check.

**Implementation rule:**
```
if university in (HKU, CITYU, POLYU, HKUST):
  use_enhanced_scale()       # 5**=8.5 — confirmed for ALL programmes
  
elif university == CUHK:
  if program_id in (JS4501, JS4502):  # CUHK Medicine
    use_standard_scale()     # 5**=7 — confirmed exception
  else:
    use_enhanced_scale()     # 5**=8.5 — confirmed default

else:  # HKBU, EDUHK, LINGU, HKMU, HKSYU, CHC
  use_standard_scale()       # 5**=7
```

Note: HKU programmes may also award a weighted bonus (typically ×0.2) for a 6th or even 7th best subject — check `HKU_6th_multiplier` and programme descriptions. HKUST adds a percentage bonus (up to ~5% of the Best 5 score) for the 6th subject rather than a flat addition — see `HKUST_HighestAttainableScore` for the cap.

**Why this matters:** A student with five 5**s has a base score of 35 under the standard scale but 42.5 under the enhanced scale. The historical cutoff scores in `jupas_data.csv` were calculated on the scale used by each programme at the time — so raw score comparison across universities is not apples-to-apples without knowing each programme's scale.
