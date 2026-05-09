# Research Archive — JUPAS Calculator

Every research question we've investigated, with its resolution.
Active unknowns at the bottom.

---

## Resolved

| # | Question | Resolution | Source |
|---|----------|-----------|--------|
| 1 | Scale assignment per uni | HKU/HKUST: enhanced for ALL programmes. CUHK: enhanced default, except JS4501/JS4502 (standard 7pt). PolyU/CityU: enhanced from 2025 entry; pre-2025 standard. Others: standard. | Official admissions docs, 2026 entry |
| 2 | PolyU transition year | 2025 entry. 2023 & 2024 = standard; 2025+ = enhanced | PolyU 2025 admissions figures |
| 3 | CityU/HKUST transition years | CityU = 2025 entry; HKUST = 2022 entry (earliest adopter). HKUST 2023+ all enhanced | Official admissions docs |
| 4 | HKU 6th subject multiplier order | Weights applied BEFORE multiplier. Nth subject selected from weighted pool, not raw | HKU admissions info 2025/2026 |
| 5 | HKU multiplier confirmed values | 0.2: Business School + Architecture (confirmed). 0.5: JS6468/JS6418/JS6482 Nursing/Chinese Medicine (confirmed). JS6456/JS6626 Medicine: NO multiplier, pure Best 6 (confirmed 2026-05-09 via bigexam.hk) | HKU 2025/2026 admissions |
| 6 | HKUST 6th subject bonus | Percentage-based on cap: 5**=5.00%, 5*=4.12%, 5=3.24%, 4=2.35%, 3=1.76% | HKUST admissions formula, university-wide |
| 7 | require_any grade check | RAW DSE level (before weights, before score conversion) | JUPAS mechanism docs |
| 8 | Category B conversion | Universal JUPAS table: Distinction II=4, Distinction I=3, Attained=0 | JUPAS官方換算表 |
| 9 | Category C conversion | Universal table across all 9 unis. Stays on 7pt scale even for enhanced-scale unis | JUPAS官方換算表 |
| 10 | must_include pipe semantics | AND logic — all listed subjects must be present | Confirmed by testing against known programmes |
| 11 | Duplicate subject in weight columns | 0 exact duplicates found. 3 intentional overlapping cases (JS6119, JS6901, JS7225) | CSV audit |
| 12 | max_weighted_electives usage | Only 2 programmes: JS5102, JS5103 (both HKUST Science Group A/B) | CSV audit |
| 13 | Special formula programmes | 3 total (all HKU): JS6119, JS6688, JS6901. JS6119 and JS6901 share identical logic | CSV audit |
| 14 | Subject code inventory | 47 unique type:code combinations extracted from weight expressions. No separate subjects.csv needed — derived at build time | CSV audit |
| 15 | Non-standard formulas at small unis | Zero found. HKMU, HKSYU, CHC all use standard Best 5 | CSV audit |
| 16 | weight_regular conflicts flagged | All 5 flagged items were false positives: M1/M2 correctly in best_of groups; grade checks present in require_any | CSV audit |
| 17 | Historical cutoff scale compatibility | Fully mapped. PolyU/CityU pre-2025 cutoffs flagged for scale warning. HKUST safe across all years | csv_decoder.md |
| 18 | 5-subject student eligibility | NOT disqualified from Best 6/bonus formulas. Missing 6th subject simply not included; no bonus awarded. | JUPAS mechanism docs |
| 19 | Multiple Category C subjects | Only ONE Cat C subject in Best N selection (same rule as M1/M2). Highest-scoring one used. | JUPAS mechanism docs |
| 20 | CSD universal enforcement | CSD "Attained" required for ALL programmes regardless of `csd_required` CSV column. Column is redundant. | JUPAS minimum entrance requirements |
| 21 | M1/M2 as one elective | Confirmed: taking both M1 and M2 counts as ONE elective subject. Only the higher-scoring one counts. | JUPAS subject rules |
| 22 | Elective minimums: slot vs ranked | CONFIRMED as slot-position gates (NOT ranked by student performance). The competitor's e1/e2/e3/e4 notation has no official basis. | CUHK 2026 admissions docs |
| 23 | force_include column | NOT needed. must_include already serves as both eligibility gate AND Best N slot occupation marker. | Design decision |
| 24 | exclude_rules column | Partially done: JS1211 confirmed for `math_or_m1m2_only_one` (2026-05-09 via CityU official footnote). JS1201 ruled out. Remaining HKU/EdUHK/SSSDP need CSV audit of original_weight_text | Design decision + web verification |
| 25 | require_any count+level | Both dimensions confirmed: `Nx(pool)@>=L` syntax handles pick count and minimum level | CSV audit |
| 26 | max_weighted swap optimization | Author optimization, not required. Greedy top-N is sufficient for correct scoring. | Design decision |

---

## Remaining Active Items

### A. Data Quality: Empty Weight/Gate Rows [audit]

12 programmes (mostly HKMU, some new programmes) have no weighting data.
Fallback: treat as "Best 5, no weights" with `has_weighting_data = false` flag.

### B. Data Quality: Missing Cutoff Years [audit]

~15% of programmes lack 2025 cutoffs (new or restructured programmes).
UI should show "N/A" with tooltip — never silently omit.

### C. formula Column Audit [audit — DONE 2026-05-09]

Scan complete. All formula values recognized: Best 5, Best4, Best 6, Best 7, 3C2X, Best 5 + 6th Subject Bonus. No unrecognized formulas. Every programme has a formula value. ✅

### D. JS6119 and JS6901: Shared Logic [decision]

These two HKU programmes share identical special calculation logic
(science subjects ×1.5, others ×1.0). Implement as one function with two call sites.

---

## Methodology Tags

- **[search]** — required external verification (official JUPAS/university sources)
- **[audit]** — can be answered by scanning our own CSV data
- **[decision]** — implementation/design choice
