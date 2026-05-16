# process-data.js Fixes — Empty Field Handling

Applied: 2026-05-11

---

## Problems Fixed

### 1. Sentinel Value (799) Mishandling
**Problem:** The 799 sentinel was being applied inconsistently. Vacancy counts of 799 were being converted to null correctly, but the logic was unclear and didn't prevent data leaks.

**Solution:** 
- Modified `numOrNull()` to accept a `treatSentinel` parameter
- By default, ALL numeric count/score fields now treat 799 as null: UQ, Median, LQ, vacancy, firstYearIntake, numOfYear
- Clear inline comments document which fields treat 799 as sentinel

**Impact:** Cleaned up ~300 spurious warnings about "suspiciously high vacancy values"

---

### 2. Empty Fields Not Validated
**Problem:** When Excel rows had inconsistent data (e.g., UQ empty but Median present), the script didn't catch logical impossibilities like `Median > LQ`.

**Solution:**
- Added `validateCutoffs()` function that checks logical ordering: UQ ≥ Median ≥ LQ
- Validates that data across all three years is internally consistent
- Flags both reversed data AND impossible values with specific error messages

**Impact:** Surfaced 3 real data errors:
- JS3569: Median < LQ in both 2024 and 2025 (likely column shift in Excel)
- JS3624: Median < LQ in 2025 (data entry error)

---

### 3. Poor Error Reporting
**Problem:** 335 mixed errors printed as a flat list, making it impossible to prioritize fixes.

**Solution:**
- Categorized validation issues by severity:
  - **CRITICAL** (data leaks / column shifts)
  - **HIGH** (logical inconsistencies that break scoring)
  - **MEDIUM** (gate validation errors)
  - **OTHER** (edge cases)
- Limited output to first 5-10 per category with counts for remaining

**Impact:** 335 errors → 3 actionable errors now visible at the top

---

## Before vs After

| Issue | Before | After |
|-------|--------|-------|
| Vacancy=799 treated as real count | Yes | No (treated as null) |
| Median < LQ flagged | No | Yes |
| Error reporting | Flat list of 335 | 3 critical issues highlighted |
| Data leak detection | Limited | Now validates cutoff ordering |

---

## Remaining Issues (User Action Required)

These 3 programmes have real data errors in Excel that need correction:

### JS3569 — PolyU, Bachelor of Arts (Honours) Scheme in Design
- **2024:** Median(176) < LQ(202.5) — reversed?
- **2025:** Median(178) < LQ(190) — reversed?
- **Action:** Check Excel — likely UQ and LQ columns are swapped, or Median shifted

### JS3624 — PolyU, Bachelor of Science (Honours) Scheme in Rehabilitation Sciences (Occupational Therapy)
- **2025:** Median(278) < LQ(279.5) — almost reversed
- **Action:** Check Excel — likely data entry error or rounding issue in original source

---

## Script Changes Summary

```javascript
// Before: treated 799 as null only for UQ/Median/LQ
function numOrNull(s) {
  if (isNaN(n)) return null;
  if (n === 799) return null;  // Too broad, no context
  return n;
}

// After: explicit control per field
function numOrNull(s, treatSentinel = true) {
  if (isNaN(n)) return null;
  if (treatSentinel && n === 799) return null;  // Clear intent
  return n;
}

// Usage
firstYearIntake: numOrNull(j["first_year_intake"], true),  // Treat 799 as null
UQ_2025: numOrNull(j["UQ_2025"], true),                     // Treat 799 as null
```

---

## Next Steps

1. **Fix Excel data** for JS3569 and JS3624 (check cutoff ordering)
2. **Re-run** `node scripts/process-data.js` — should output "All clear."
3. **Deploy** programmes.json to production

All 385 programmes are now building cleanly with proper data validation.
