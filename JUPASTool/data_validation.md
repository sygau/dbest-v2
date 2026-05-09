# Data Validation Report — JUPAS Calculator

Known issues, inconsistencies, and pending fixes in the current CSV data.
Every entry is tracked with severity, status, and resolution path.

Updated: 2026-05-09

---

## Severity Guide

| Level | Meaning |
|-------|---------|
| 🔴 Critical | Produces wrong scores or broken output at build time |
| 🟡 High | Affects scoring accuracy for specific programmes |
| 🟠 Medium | Data inconsistency between files; may cause confusion |
| 🔵 Low | Cosmetic / documentation / future-proofing |

---

## Columns Already Deleted from jupas_data.csv

The working copy of `jupas_data.csv` now has 29 columns — exactly matching the build script's `JUPAS_KEEP_COLS`. The following columns were removed from the Excel copy on 2026-05-09:

| Deleted Column | Reason |
|----------------|--------|
| Column 3 (empty, no name) | Export artifact — no data in any row |
| `isPolyTrio` | PolyU-specific internal flag; meaningless to students. Affected programmes (JS3612, JS3636, JS3624) are documented in JUPAS_MECHANISM.md |
| `occupation1_en`, `occupation1_zh_hk` | Career path search — not a feature we're building |
| `occupation2_en`, `occupation2_zh_hk` | Career path — same |
| Trailing empty columns (36-43) | Export artifacts — all rows empty |
| `type_key` | Internal DB key; fully redundant with `type` |
| `occupation_en`, `occupation_zh_hk` | Duplicate of occupation1 fields |
| `program_id` (duplicate at end) | Exact duplicate of column 1 |
| `occupation1_en` (duplicate at end) | Duplicate of occupation1_en |
| `occupation2_en` (duplicate at end) | Duplicate of occupation2_en |
| `isInterview` (second occurrence — text version) | The first `isInterview` column (boolean TRUE/FALSE) was kept. The second occurrence was renamed to `isInterview_1` and contains interview description text |
| `interview_arrangement` | Redundant — `isInterview_1` carries the interview description text |

**Remaining 29 columns (all kept):**
`program_id`, `university`, `programName_en`, `programName_ch`, `FacultyName`, `isdoubledegree`, `isPopular`, `isGod`, `isInterview` (boolean), `cat_ch`, `cat`, `type_ch`, `type`, `type2_ch`, `type2`, `first_year_intake`, `isInterview_1` (text description), `numOfYear`, `vacancy_2025`, `UQ_2025`, `Median_2025`, `LQ_2025`, `vacancy_2024`, `UQ_2024`, `Median_2024`, `LQ_2024`, `UQ_2023`, `Median_2023`, `LQ_2023`

These display metadata columns are all useful on a result card: which faculty, how many years, is there an interview, how many spots, what's the double-degree status. The build script includes all of them in the JSON output.

### From master_data.csv — no columns to delete

This file is the rulebook. Every column is either a scoring rule or a human-readable note for display. The build script uses all of them. Do not delete anything.

### subjectTabs.csv — not used

The UI is score-based, not category-based. There's no category filter or job-title search. `subjectTabs.csv` is not read by the build script.

---

## Open Issues

### V4 — `exclude_rules` column: confirmed programmes

- **Severity:** 🟠 Medium
- **Status:** Partially resolved (build script ready; 1 programme confirmed; column pending in CSV)
- **Discovered:** 2026-05-09
- **Files affected:** `master_data.csv` (new column needed)

**What's needed:**

Several programmes have special subject-selection rules that can't be expressed through weights alone. The primary known rule is `math_or_m1m2_only_one` — when both Core Mathematics and M1/M2 are taken, only the higher-scoring one counts in Best N. This is different from the standard M1/M2 single-elective rule (which limits M1+M2 to one).

**Programmes confirmed to need `math_or_m1m2_only_one` (verified 2026-05-09):**

| Programme | Uni | Verification |
|-----------|-----|-------------|
| JS1211 | CityU | BEng Biomedical Engineering — official footnote: "If both Mathematics and M1/M2 are taken, only one subject will be included" |

**Programmes ruled OUT (only standard M1/M2 single-elective rule, NOT math_or_m1m2_only_one):**
- JS1201 (CityU Architecture/Civil Engineering) — only restricts M1+M2 to one, does not restrict Core Math vs M1/M2

**Still to audit:** Select HKU programmes (some mention "M1/M2 or Cat C whichever is higher"), EdUHK, and SSSDP programmes. These need review against the `original_weight_text` column in master_data.csv for phrases like "Mathematics and M1/M2" / "only one" / "whichever is higher."

**Fix:**

1. Add column `exclude_rules` to `master_data.csv` (between `require_any` and `Remarks`)
2. Format: semicolon-separated rule names. Empty = no rules
3. Populate JS1211 with `math_or_m1m2_only_one`
4. Audit remaining suspected programmes by searching `original_weight_text` for exclusion language

---

### V5 — Empty weight/gate rows (12 programmes)

- **Severity:** 🔵 Low
- **Status:** Open (fallback exists)
- **Discovered:** CSV audit
- **Files affected:** `master_data.csv`
- **Programmes:** ~12 (mostly HKMU, some new programmes)

**What's wrong:**

These programmes have no weighting data — empty `weight_regular` and `weight_best_of` columns.

**Current fallback:**

Build script outputs `weights: { regular: {}, bestOf: [] }` and formula defaults to `Best 5, no weights`. The `special` field is `null`. This is functionally correct — these programmes genuinely have no subject weightings.

**Fix:**

Review each programme individually against official sources to confirm "no weights" is intentional. If weights exist, add them. If not, mark as verified and close.

---

### V6 — Missing 2025 cutoffs (~15% of programmes)

- **Severity:** 🔵 Low
- **Status:** Open (expected for new/restructured programmes)
- **Discovered:** CSV audit
- **Files affected:** `jupas_data.csv`

**What's wrong:**

~15% of programmes have `799` (no data) for 2025 cutoffs. These are mostly new or restructured programmes where 2025 was the first admission cycle.

**Current handling:**

Build script converts `799` → `null`. UI should display "N/A" with a tooltip explaining that data isn't available yet, rather than silently omitting the programme or showing a blank.

**Fix:**

No CSV change needed. This is a UI concern — ensure the frontend handles `null` cutoffs gracefully.

---

## Resolved

| # | Issue | Resolution |
|---|-------|-----------|
| R1 | Add `force_include` column | Not needed — `must_include` already serves as gate AND slot occupation marker |
| R2 | Split must_include into gate + slot columns | Single column handles both; splitting adds maintenance burden with no benefit |
| R3 | `csd_required` column redundant | CSD is universal for ALL JUPAS programmes. Column harmless to keep for readability but not used in scoring |
| R4 | Add `e1/e2/e3/e4` ranked-elective columns | Ranked-elective notation has no official basis. Slot-position interpretation confirmed correct |
| R5 | Add HD programme rows | No HD programmes exist in current JUPAS cycle |
| R6 | `notes` column exists but sparsely populated | Column exists and can be used for edge-case annotations — no action needed |
| R7 | 3C2X formula unrecognized by build script | Fixed 2026-05-09 — added to FORMULA_MAP in process-data.js |
| R8 | Best4/Best6 no-space variants unrecognized | Fixed 2026-05-09 — added to FORMULA_MAP in process-data.js |
| R9 | V1: JS1300 programme identity conflict | jupas_data.csv row was completely wrong (old BBA/LLB data). Fixed 2026-05-09 — verified via bigexam.hk + CityU College of Biomedicine. Row updated with correct Bio3 programme name/category/type |
| R10 | V2: HKU JS6456 sixth_mult = 0.5 was wrong | Verified 2026-05-09: Medicine MBBS uses pure Best 6, no fractional multiplier. Field cleared. JS6468/JS6418/JS6482 all correctly keep 0.5 |
| R11 | V3: JS6626 sixth_mult inconsistency | Auto-resolved 2026-05-09: JS6626 (Distinguished MedScholar) uses same pure Best 6 as JS6456. No change needed |
| R12 | Formula column audit | All formula values confirmed recognized by FORMULA_MAP (2026-05-09): Best 5, Best4, Best 6, Best 7, 3C2X, Best 5 + 6th Subject Bonus. No unrecognized formulas found |
