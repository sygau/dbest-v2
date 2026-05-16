# JUPAS Mechanism — System-Level Complexity

This document describes the JUPAS admissions scoring system at the conceptual level. It covers the institutional rules, edge cases, and policy nuances that a developer building the calculator needs to understand. For the structured JSON schema and API contract, see `JSON_SCHEMA.md`.

The central insight: JUPAS is NOT a single unified scoring engine. Each university — and sometimes each programme within a university — operates its own variant of the scoring system. The CSV data encodes these rules, but understanding *why* they exist and how they interact is essential for correct implementation.

---

## 1. The Fragmented Grade Conversion Landscape

There is no single, universal DSE-grade-to-numeric-score mapping across JUPAS. Two competing scales coexist:

| DSE Level | Standard Scale (5**=7) | Enhanced Scale (5**=8.5) |
|-----------|------------------------|---------------------------|
| 5** | 7 | 8.5 |
| 5* | 6 | 7 |
| 5 | 5 | 5.5 |
| 4 | 4 | 4 |
| 3 | 3 | 3 |
| 2 | 2 | 2 |
| 1 | 1 | 1 |
| U | 0 | 0 |

The enhanced scale was introduced to create greater differentiation among top-performing students. A student with five 5**s has a base score of 35 under the standard scale versus 42.5 under the enhanced scale — a difference large enough to move a candidate from "competitive" to "safe" depending on the programme.

**University assignments (as of 2025/2026 entry, confirmed):**

Enhanced scale (5**=8.5):
- HKU — full adoption, ALL programmes including Medicine & Dentistry (confirmed by 2026 admission guidelines)
- CUHK — university-wide default (except Medicine: JS4501, JS4502 use standard scale — confirmed by CUHK 2025/2026 JUPAS Admission Info and Programme-Specific Requirements documents)
- HKUST — full adoption, ALL programmes across all schools (confirmed by 2026 admission guidelines)
- CityU (2025 admission score formula)
- PolyU (enhanced scale effective from 2025 entry; pre-2025 cutoffs use standard scale)

Standard scale (5**=7):
- HKBU, EdUHK, Lingnan University (LU)
- HKMU
- CUHK Medicine only: JS4501 (MBChB), JS4502 (MBChB GPS) — the only CUHK programmes that retain the 7-point scale. Official CUHK documents explicitly list these two as exceptions. A "perfect" Medicine score under enhanced scale would be 51 (6×8.5), but the official CUHK Medicine maximum is 42 (6×7) — confirming the 7-point standard scale.

**Why this fragmentation exists:** The enhanced scale allows universities to spread out high-achieving candidates across a wider score band, making it easier to differentiate among them for competitive programmes. The standard scale is simpler and may be preferred by universities where score differentiation at the very top is less critical.

---

## 2. Scoring Formula Architectures

Each university has built a distinct scoring architecture. These are not minor variations — the underlying calculation logic is fundamentally different.

### HKU: Best 5 + Fractional Nth-Subject Bonus

HKU's system is effectively "Best (N-1) + fractional Nth subject" for most programmes. The core formula:

```
Score = Sum(Best (N-1) weighted subjects) + (Nth Best weighted subject × Multiplier)
```

Subject weights are applied BEFORE selecting which subject occupies the Nth slot. The Nth subject is the lowest-scoring among the selected Best N.

**Confirmed programme families (2025/2026 HKU Admissions Information):**

**Business School (sixth_mult = 0.2):**
- BBA / BEcon / BEcon&Fin / BBA(Acc&Fin) / BBA(BA) / BSc(MAT):
  Formula: 1.5×Eng + 1.5×Math + Best 3 + 0.2×6th Best Subject
- BBA(Law)&LLB / BFin(AMPB) / BBA(IBGM):
  Formula: 1.5×Eng + 1.5×Math + Best 4 + 0.2×7th Best Subject
- BSc(QFin):
  Also uses 0.2×7th Best Subject

**Faculty of Architecture (sixth_mult = 0.2):**
- BA(Urban Studies) / BSc(Surveying):
  Formula: Best 5 + 0.2×6th Best Subject

**Other programmes (sixth_mult = 1.0 — pure Best N):**
- Medicine (JS6456), Law, and other flagship programmes count the Nth subject at full value.

**Important:** The value 0.2 (20%) is the only fractional multiplier confirmed in official 2025/2026 HKU documentation. Earlier informal references to a 0.5 multiplier (50%) for some Science programmes have NOT been verified in current-year documents — this may have been a pre-2025 policy that has since been standardized to 0.2, or it may have been an incorrect assumption. Verify 0.5 claims against the current HKU Admissions Information PDF before implementing.

**Implementation note:** The effective Best N display should show N-1 when the multiplier < 1.0. For example, JS6755 (BBA, best_n=6, multiplier=0.2) should display as "Best 5 + 6th×0.2" — not "Best 6" — to avoid misleading students into thinking all 6 subjects count equally.

### HKUST: Capped and Bonused

HKUST uses the most mathematically complex system:

```
Step 1: Bonus = HighestAttainableScore × BonusPercentage
        — the bonus is a fixed value per grade, NOT scaled by the student's Best 5
Step 2: Raw Score = Weighted Best 5 + Bonus
Step 3: Final Score = min(Raw Score, HighestAttainableScore)
```

The 6th subject bonus is a **fixed amount** determined by the programme's HAS cap and the 6th subject's grade. The 6th subject must be Level 3+ (Cat A) or Attained with Distinction (Cat B) to qualify. It is the best remaining weighted subject after the Best 5.

**Example (JS5200 Engineering, HAS=76.5):** A Level 5 6th subject = 76.5 × 3.24% = 2.4786 bonus points, added regardless of whether Best 5 = 40 or 70.

**Bonus percentage by 6th subject grade (confirmed official HKUST 2025/2026 values — university-wide, all programmes):**

| 6th Subject Grade | Score | Bonus (% of HAS) |
|-------------------|-------|---------------------|
| Cat A: 5** | 8.5 | 5.00% |
| Cat A: 5* | 7 | 4.12% |
| Cat A: 5 | 5.5 | 3.24% |
| Cat A: 4 | 4 | 2.35% |
| Cat A: 3 | 3 | 1.76% |
| Cat B: Distinction II | 4 | 2.35% |
| Cat B: Distinction I | 3 | 1.76% |

These values are rounded to 2 decimal places in official publications but are used exactly as stated for admissions calculations. Only Category A subjects require Level 3+; Category B requires Attained with Distinction. Category C (Other Languages) subjects also qualify at equivalent levels. The percentages are constant across all HKUST programmes — only the HAS (Highest Attainable Score) varies per programme depending on its specific subject weightings.

The hard cap (programme-specific, values like 42.5, 59.5, 63.75, 72.25, 76.5, 85) is the maximum possible score after bonus. The bonus is applied *before* the cap. Historical median scores are reported "with the 6th subject extra marks."

### PolyU: Best 5 + 6th Subject Bonus (with Quality Gate)

```
Score = Sum(Best 5 Subject Points × Subject Weightings) + Bonus Score
```

The bonus for the 6th subject is only awarded if that subject meets a minimum standard (typically Level 3 or above). This incentivizes breadth without rewarding weak additional subjects. PolyU's system is straightforward compared to HKUST's but adds a quality threshold that pure "Best N" models lack.

PolyU adopted the enhanced scale (5**=8.5) starting from 2025 entry, which may cause discontinuity when comparing 2024-vs-2025 cutoff scores for PolyU programmes.

**PolyU Trio Programmes (JS3612, JS3636, JS3624):** These three programmes share a combined-intake structure. Students apply to a single JUPAS code but are subsequently streamed into different specializations after admission. The trio consists of:

| Code | Programme |
|------|-----------|
| JS3612 | BEng (Hons) Scheme in Aviation, Maritime, Supply Chain, and Systems Engineering |
| JS3636 | BSc (Hons) Scheme in Computing and AI |
| JS3624 | BSc (Hons) Scheme in Applied Mathematics, Financial Technology, and Data Science |

These programmes were flagged with `isPolyTrio=TRUE` in the source data (a PolyU-specific internal tag). Students applying to any of these three codes are competing for a combined pool of places that is later divided across multiple degree streams. The admission score is the same across all streams within a trio — the streaming happens after admission, not during it. This makes the historical cutoff data for these programmes particularly useful for benchmarking, as the larger intake pool tends to produce more stable year-over-year cutoffs.

### CityU: Weighted Best 5

CityU focuses on subject relevance through weighting rather than subject count. The emphasis is on which subjects a student took, not just how many. Core subjects like English and Mathematics often receive higher weights, reflecting their importance to the degree programme. CityU provides a public score calculator that lets applicants experiment with different subject combinations.

### Other Universities (HKBU, EdUHK, LU, HKMU)

These typically use simpler Best 5 or Best 4 models with the standard grade conversion scale. Subject weighting is still applied but the formula architecture is less layered than the four research universities above.

---

## 3. Subject Weighting and "Best of Group" Logic

The syntax used in `weight_regular` and `weight_best_of` (documented in full in `JSON_SCHEMA.md`) implements a system of conditional subject substitution. Conceptually, this lets a programme express: "We value Biology, but if you're stronger in Chemistry, we'll take that instead."

Key conceptual rules:
- A subject can only be used **once** across all weight groups and the main score calculation. If M1 is selected in a best-of-group at ×2.0, it cannot also appear as a regular weighted subject.
- Groups separated by semicolons are independent selections — the engine must try all valid combinations to find the one that maximizes the student's score.
- If a group asks for 2 subjects but the student only has 1 matching subject, that 1 can still be selected (at the group's weight). The group's count is a maximum, not a requirement for that weight slot.
- The `max_weighted_electives` column (only present in a few rows, value typically 2) caps how many elective subjects can receive their boosted weight — additional electives default to ×1.0.

**Technical note on max_weighted optimization:** When max_weighted limits the number of boosted subjects, a simple "sort by weighted score, pick top N" approach is sufficient for correct scoring. Some calculators implement a more sophisticated iterative-swap algorithm that checks whether demoting one capped subject allows a currently-unchosen boosted subject to enter the selection — this finds the absolute mathematical maximum in edge cases. The simpler greedy approach is adequate for normal use; the swap is a refinement for completeness, not a JUPAS requirement.

The combinatorial optimization problem (try all subject-to-group assignments to maximize the weighted total) is computationally small in practice: most programmes have 1-3 groups of 2-5 subjects each, so brute force is fast.

### Force-Include: Mandatory Slot Occupation

A small number of highly specialized programmes require specific subjects to ALWAYS occupy slots in the Best N calculation, even if the student did not take the subject (score = 0). This is distinct from both `must_include` (an eligibility gate — fail if missing) and `weight_regular` (a weighting rule — only applies if taken).

**How it works:** Force-included subjects are counted as mandatory entries in the Best N selection. If a student took the subject, its weighted score fills the slot. If the student did NOT take it, the slot is filled with a 0-score placeholder, effectively penalizing the student by reducing their Best N pool.

**Primary example — CityU VetMed (JS1801):**
- Formula: Best 5 MUST include English, Mathematics, Biology, and Chemistry
- These four subjects occupy 4 of the 5 available Best 5 slots
- A student without Chemistry gets: Eng + Math + Bio + 0 (Chemistry placeholder) + 1 next best subject
- The student is NOT disqualified for missing Chemistry — they are penalized through scoring

**Other likely cases:**
- HKU Dental Surgery (JS6107): "Best of Biology or Chemistry (×3) + Best 5" — the specified science subject is effectively forced
- CityU programmes with "Best 5 including English and Mathematics" formulas may implicitly force-include these

**Implementation:** The CSV data may need a dedicated `force_include` column for programmes where certain subjects must always occupy Best N slots regardless of availability. Without this column present in the data, these programmes would need to be identified by formula pattern matching or manual tagging.

---

## 4. Eligibility Gates

Before any score is calculated, the student must pass a series of eligibility gates. These are hard filters — failure at any gate means automatic ineligibility, regardless of score.

**Gate 1: Core subject minimums** (`min_core_chi`, `min_core_eng`, `min_core_math`)
The general university entrance requirement is "3322" (Level 3 in Chinese and English, Level 2 in Math and Liberal Studies), but individual programmes can raise these. A competitive programme might require Level 4 in English and Level 3 in Math.

**Gate 2: CSD pass** (universal)
Citizenship and Social Development must be "Attained" for ALL JUPAS programmes — it is part of the universal "332A" entrance requirement. The `csd_required` column in the CSV is redundant; enforce CSD universally regardless of its value. CSD contributes zero points to any score formula. A "Not Attained" result disqualifies the student from ALL programmes.

**Gate 3: Must-include subjects** (`must_include`)
Specifies subjects the student must have taken. The pipe syntax (`core:eng|core:math`) means ALL listed subjects are required (AND logic). If a student didn't take both English and Math, they are ineligible.

**Gate 4: Require-any with grade minimum** (`require_any`)
Specifies groups where at least one subject must meet a minimum grade. For example, `1x(elec:bio|elec:chem)@>=3` means "at least one of Biology or Chemistry must be at Level 3 or above." The grade check is against the raw DSE level, not the weighted score.

**Gate 5: Elective minimums** (`min_elective1_grade`, `min_elective2_grade`)
General minimum levels for electives. The standard CUHK baseline is at least two electives at Level 3 each. Some programmes raise these. In official CUHK documentation, "1st elective" and "2nd elective" refer to requirement SLOT POSITIONS (which subjects fill which requirement), NOT to performance ranking (not "best elective ≥ Level X, 2nd-best elective ≥ Level Y"). The minimums are checked against raw DSE levels, not weighted scores.

**⚠️ Unresolved: e1/e2/e3/e4 ranked-minimum notation.** Some calculators use an extended notation (`e1`, `e2`, `e3`, `e4`) suggesting minimums for electives ranked by the student's actual performance (best = e1, 2nd-best = e2, etc.). No official CUHK or JUPAS documentation confirms this interpretation. CUHK's published materials consistently describe minimums in terms of requirement slots, not performance ranking. If your CSV data contains e1/e2/e3/e4 keys, verify against the original source before implementing ranked-elective logic. For 2026 entry, the safest approach is to treat elective minimums as slot-position requirements checked against raw levels.

**Gate 6: Category exclusions** (`exclude_category_b`, `exclude_category_c`)
If a programme excludes Applied Learning or Other Language subjects, those subjects are removed from consideration entirely — they cannot contribute to the score and may not count toward elective requirements.

**Order of operations:** Gates are checked first. Only if all gates pass is the score calculated. Some gates are university-wide (3322 minimums), others are programme-specific.

---

## 5. Category B (Applied Learning) and Category C (Other Languages)

These two subject categories are treated very differently by JUPAS universities.

### Category B: Applied Learning (ApL)

ApL subjects are **generally excluded** from scoring at most universities. The `exclude_category_b = YES` flag in the CSV flags this. When excluded, an ApL subject can fulfill the elective count requirement but contributes nothing to the admission score.

When a programme does NOT exclude Category B, a **universal JUPAS conversion table** applies (standardized across all 9 institutions):

| ApL Attainment | Score |
|----------------|-------|
| Attained with Distinction (II) | 4 |
| Attained with Distinction (I) | 3 |
| Attained | 0 (not counted) |

In practice, most competitive programmes exclude ApL, so students should not rely on ApL subjects for score calculation unless targeting specific programmes that accept them (e.g., some CityU creative media programmes).

### Category C: Other Languages

Category C subjects are **actively scored** at all JUPAS universities using a standardized conversion table. All 9 institutions use the same table:

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

**Important:** Even enhanced-scale universities (PolyU, HKU, etc.) keep Category C on the standard 7-point scale. The 5**=8.5 enhancement applies to Category A subjects only. Also, like M1/M2, only ONE Category C subject can count in the Best N selection — the highest-scoring one is used.

Category C is a reliable way to add points to a JUPAS application, unlike Category B.

---

## 6. Subject Counting Rules and Edge Cases

### M1/M2: Single Elective Limit

Mathematics Extended Parts (M1: Calculus & Statistics, M2: Algebra & Calculus) count as **one elective subject together**. A student who takes both M1 and M2 can only use one in their score. The engine treats `ext:M1` and `ext:M2` as mutually exclusive — only the higher-scoring one is included.

### Math vs M1/M2: Mutual Exclusion Rule

A separate rule from the M1/M2 single-elective limit: some programmes prohibit counting BOTH Core Mathematics AND M1/M2 in the Best N selection. Only the higher-weighted of the two survives.

**Where this applies (confirmed):**
- CityU: JS1211 (BEng Biomedical Engineering), JS1201 (Architecture/Civil Engineering) — explicit footnote: "If both Mathematics and M1/M2 are taken, only one subject will be included"
- HKU: Some Best 5/6 formulas include "M1/M2 or Category C subject whichever is higher," preventing both from occupying separate elective slots
- EdUHK and some SSSDP institutions: similar restrictions on Math + M1/M2 co-counting

**How it works:** Before computing Best N, compare the weighted score of Core Mathematics against the best weighted score among M1/M2. Keep only the higher one. This is different from the M1/M2 single-elective rule (which limits M1+M2 to one): this rule limits Math+M1/M2 to one, potentially with the other being M1 or M2.

**Implementation:** This can be handled as an exclusion rule (`math_or_m1m2_only_one`) applied during subject selection, before the Best N computation. It is an official university policy, not a calculator heuristic.

### Category C: Single Subject Limit

Category C (Other Languages) follows the same rule as M1/M2: **only the single highest-scoring Cat C subject** can count toward the Best N selection. If a student took both Japanese (N1 = 7pts) and Korean (Grade 5 = 5.5pts), only the Japanese score is used. Some universities may consider a second Cat C subject as an "extra elective" for bonus purposes, but it does not count in the primary Best N.

### 5-Subject Students

The JUPAS minimum is 4 cores + 2 electives, but since CSD is unscored, the effective scorable count is often 5 subjects. When a programme uses "Best 6" or a 6th-subject bonus and a student has only 5 scorable subjects:

- The student is **NOT disqualified** — they remain eligible if all gates pass
- For "Best 6" formulas: the missing 6th subject is simply not included (not treated as 0)
- For bonus-based formulas (HKU ×0.2 fractional Nth-subject, HKUST percentage bonus): no bonus is awarded
- The student's score is calculated on the 5 subjects they have

This policy is consistent across HKU, CUHK, and PolyU.

---

## 7. Flexible Admissions and Non-Score Factors

Not all admissions decisions are purely score-based. Several mechanisms exist outside the formula.

### Flexible Admissions (彈性收生)

Most major universities offer flexible admission arrangements where students who narrowly miss one entrance requirement can still be considered. The core rule is consistent across institutions: **fail exactly 1 subject by exactly 1 grade.** However, each university adds its own conditions and penalties.

**General eligibility (all universities):**
- Student must miss exactly ONE subject requirement by exactly ONE grade level
- All other entrance requirements must be fully met
- The failed subject must not render the student completely unqualified

**HKU Flexible Admission (confirmed, 2025/2026):**
- Math is EXCLUDED from flexible consideration — the failed subject cannot be Core Mathematics
- The failed subject must be at least Level 2 (cannot flex on a Level 1 or U)
- **10% score deduction:** HKU applies a 10% penalty to the applicant's total admission score when admitted through flexible arrangements. This is an official policy and should be factored into the flex-adjusted score display

**CUHK Flexible Admission (confirmed, 2025/2026):**
- Requires "outstanding overall performance" — this is a holistic criterion, NOT a published numerical threshold
- Some calculators approximate "outstanding performance" as the student's score being ≥ the programme's Upper Quartile. This is a reasonable heuristic but is NOT an official CUHK rule — it is an interpretation based on retrospective cutoff data
- CUHK's own flexible admission document uses qualitative language, not numerical cutoffs

**PolyU Flexible Admission:**
- Uses officially published **Flexible Admission Threshold Scores** per programme — these are specific numerical scores the student must exceed
- Example: JS3003 (Business Administration) has a published threshold of 20.5 for Best 5 subjects
- These thresholds are published annually alongside admission figures and change per programme

**CityU Flexible Admission:**
- Uses officially published **Flexible Admission Threshold Scores** (with weighting) per programme
- Students must exceed these specific programme-level numerical cutoffs

**HKBU and Other Universities:**
- Typically require the failed subject to be at least Level 2 (except CSD)
- Often require at least one "star" (5* or 5**) in another subject to demonstrate outstanding performance

**Implementation approach:**
1. Check core eligibility: exactly 1 subject failed by exactly 1 grade, all other requirements met
2. Apply university-specific exclusions (e.g., HKU: Math cannot be the flex subject)
3. Apply university-specific performance requirements:
   - For PolyU/CityU: compare against published threshold scores (preferred — these are official)
   - For CUHK: the score ≥ UQ heuristic is a reasonable default in the absence of official thresholds, but should be marked as an estimate
   - For HKU: check Level ≥ 2 on the failed subject, then apply 10% deduction to computed score
4. Display flex-adjusted score separately from the raw computed score, with clear labeling

### Non-Score Factors

**Interviews and aptitude tests:** Programmes may require or optionally conduct interviews (source column: `isInterview_1` in CSV → `interviewType` in JSON output). The `isInterview` boolean flag is derived from this text — "Not required" / "No" / empty → false, everything else → true. Competitive programmes (Medicine, Law, some Business programmes) use interviews as a significant factor. These cannot be quantified in the calculator but are tagged for the student's awareness.

**Additional selection criteria:** Some elite programmes consider personal statements, learning portfolios, aptitude test results, and extracurricular achievements. These sit outside the scoring formula. The `Remarks` and `Remarks_chi` columns may contain relevant information.

**Subject bonus for specific combinations:** Some universities award additional bonus points for particular subject combinations. This bonus is sometimes embedded in the weight expressions, sometimes mentioned only in the programme description.

---

## 8. Historical Cutoff Scores and Their Interpretation

The `jupas_data.csv` contains Upper Quartile (UQ), Median, and Lower Quartile (LQ) admission scores for 2023, 2024, and 2025. These represent the score distribution of admitted students, not minimum entry requirements.

Key interpretive notes:

**Scale compatibility — university transition years (confirmed):**

| University | Enhanced Scale From | 2023 Scale | 2024 Scale | 2025 Scale |
|-----------|--------------------|------------|------------|------------|
| PolyU | 2025 entry | Standard | Standard | Enhanced |
| CityU | 2025 entry | Standard | Standard | Enhanced |
| HKUST | 2022 entry | Enhanced | Enhanced | Enhanced |

**Result:**
- HKUST 2023/2024 cutoffs are directly comparable (same enhanced scale throughout)
- PolyU and CityU 2023/2024 cutoffs are on standard scale — NOT comparable to enhanced-scale calculator output

A student's calculator-computed enhanced-scale score should not be silently compared against PolyU or CityU pre-2025 cutoffs.

**Recommended handling:** Flag PolyU and CityU pre-2025 cutoffs with "Different scoring scale." Default comparison year is 2025. HKUST cutoffs are safe for direct comparison across all years in our data.

**799 sentinel value:** The value 799 in any cutoff column means "no data available for that year." This is a placeholder — never display 799 to users or use it in calculations. Common reasons: the programme is new, the data was not published, or the programme did not run that year.

**Score interpretation across universities:** Even within the same scale, a score of 30 at HKU does not mean the same thing as a score of 30 at PolyU, because the underlying formula architectures differ. HKUST's capped scores, in particular, cannot be directly compared to scores from other universities.

**Missing years:** Some programmes have 2023/2024 data but not 2025, or vice versa. This can happen when programmes are restructured, renamed, or when data collection is incomplete.

---

## 9. Special Calculation Programmes

A small number of programmes cannot be scored with the standard formula + weights system. Their weight expressions contain named references instead of inline weights:

| Programme | Named Reference | What's Different |
|-----------|----------------|-------------------|
| JS6119 (HKU BEd&BSc) | `js6119_special_calculation` | Conditional weights: science subjects from {Bio/Chem/Phys/M1/M2} get ×1.5, other electives get ×1.0. Requires implementing per-subject type checking. |
| JS6688 (HKU Science Master Class) | `js6688_special_calculation` | Specific subject selection from {Bio/Chem/M1/M2/Phys} with ×1.3 each; Chinese Language is excluded from scoring. Higher min_core_math requirement (Level 4). |
| JS6901 (HKU BSc) | `js6901_special_calculation` | Same conditional weighting logic as JS6119. Science subjects get ×1.5, others get ×1.0. |

These special calculations have their logic described in `original_weight_text` and `weight_explanation` columns, but the actual computation requires implementing named functions in the scoring engine. They cannot be parsed generically from the weight syntax.

If more special calculations exist in the data, they will appear as non-standard references in the `weight_best_of` column. The build script should flag these for manual review.

---

## 10. Open Questions — Currently None

All previously tracked open questions from this document's section 10 are now resolved:

| # | Question | Resolution |
|---|----------|-----------|
| 1 | HKU/CUHK scale assignment | HKU: enhanced for ALL. CUHK: enhanced except JS4501/JS4502 |
| 2 | HKUST cap application + conditional | Cap after bonus. Level 3+ threshold for the 6th subject |
| 3 | PolyU transition year | 2025 entry. 2023/2024 = standard, 2025+ = enhanced |
| 4 | max_weighted_electives scope | Only 2 programmes (JS5102, JS5103). Caps weight_best_of electives |
| 5 | require_any grade check | RAW DSE level |
| 6 | Category B conversion | Universal JUPAS table (Dist II=4, Dist I=3) |
| 7 | must_include pipe semantics | AND — all listed subjects are mandatory |
| 8 | 799 sentinel | "No data" across all JUPAS datasets |
| 9 | Additional special calculation programmes | Only 3 (JS6119, JS6688, JS6901). JS6119 and JS6901 share logic |
| 10 | CUHK Medicine exceptions | Only JS4501 and JS4502. No other CUHK programmes use standard scale |

Additional items resolved in later passes:

| Item | Resolution |
|------|-----------|
| HKUST bonus denominator | Percentage of **HighestAttainableScore** (the cap), NOT Best 5 score. Bonus is a fixed value per grade. |
| PolyU historical scores | Raw standard-scale cutoffs, NOT simulated. Flag all pre-2025 PolyU data as different scale. |
| CityU/HKUST transition years | CityU: 2025 entry. HKUST: 2022 entry (2023+ all enhanced). |
| CSD universal enforcement | CSD required for ALL programmes regardless of CSV column. |
| Category C single-subject limit | Only one Cat C subject in Best N (like M1/M2). |
| 5-subject students | Eligible for Best 6/bonus formulas; missing 6th simply not included. |

**Status:** The scoring mechanism is now fully mapped. Remaining work is implementation, not research. See `search_pending.md` for data-quality audit items (empty rows, missing cutoffs, formula column scan).
