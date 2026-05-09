# JUPAS Data Workflow

How to edit, validate, build, and deploy the programme data.

---

## Quick start

```bash
# 1. Edit data (CSV or Excel — see below)
# 2. Copy only master_data.csv and jupas_data.csv into input/
cp master_data.csv jupas_data.csv input/

# 3. Run the build script
node scripts/process-data.js

# 4. Check the report
cat output/build-report.txt

# 5. If clean → output/ has your JSON → ready for deploy
```

---

## Directory map

```
JUPASTool/
│
├── master_data.csv          ← YOU EDIT: scoring rules, weights, gates
├── jupas_data.csv           ← YOU EDIT: names, categories, cutoffs
│
├── input/                   ← Drop CSVs here before building
│   ├── master_data.csv
│   └── jupas_data.csv
│
├── output/                  ← Build script writes JSON here
│   ├── programmes.json      → Merged, pre-digested scoring data
│   └── build-report.txt     → Summary + validation results
│
├── scripts/
│   ├── process-data.js      ← THE BUILD SCRIPT: CSV → JSON
│   └── convert-to-excel.py  ← Optional: CSV → formatted Excel for editing
│
├── data/
│   └── jupas_data.xlsx      ← Optional: Excel workbook (generated)
│
├── docs/
│   ├── JSON_SCHEMA.md       ← Output JSON field reference
│   └── workflow.md          ← This file
│
├── csv_decoder.md           ← Column-by-column CSV reference
└── data_update_queue.md     ← Known data issues to fix
```

---

## How to edit the data

### Option A: Edit CSVs directly (simple, always works)

Open the CSV in any text editor (VS Code, Notepad++, etc.).

**Best for:** quick one-line fixes, correcting a typo, updating a single cutoff value.

**Don't use Excel to edit CSVs directly** — Excel silently corrupts UTF-8 encoding, eats leading zeros, and auto-formats fields like `3,3` into dates. If you must use Excel, go through Option B.

### Option B: Edit in Excel, export to CSV (recommended for batch edits)

```
1. python3 scripts/convert-to-excel.py        # generates data/jupas_data.xlsx
2. Open data/jupas_data.xlsx in Excel
3. Make your edits across the sheets
4. File → Save As → CSV UTF-8 for each sheet:
     - master_data sheet  → save as input/master_data.csv
     - jupas_data sheet   → save as input/jupas_data.csv
5. node scripts/process-data.js               # build
```

**Best for:** reviewing many rows at once, filtering by university, adding multiple new programmes, data cleanup sprints.

**⚠️ After exporting from Excel, always run the build script immediately to catch any export corruption.**

### Which file to edit for what

| You want to... | Edit this file | Column(s) |
|----------------|---------------|-----------|
| Add/modify a weight | `master_data.csv` | `weight_regular`, `weight_best_of` |
| Change a formula type | `master_data.csv` | `formula` |
| Update minimum subject requirements | `master_data.csv` | `min_core_chi`, `min_core_eng`, `min_core_math`, `must_include`, `require_any` |
| Update HKU 6th-subject multiplier | `master_data.csv` | `HKU_6th_multiplier` |
| Update HKUST score cap | `master_data.csv` | `HKUST_HighestAttainableScore` |
| Fix a programme name | `jupas_data.csv` | `programName_en`, `programName_ch` |
| Change category/type | `jupas_data.csv` | `cat`, `type` |
| Update historical cutoffs | `jupas_data.csv` | `UQ_2025`, `Median_2025`, `LQ_2025`, etc. |
| Add/remove popular/god flag | `jupas_data.csv` | `isPopular`, `isGod` |
| Add an entirely new programme | BOTH — `master_data.csv` for scoring + `jupas_data.csv` for metadata |

---

## When to run the build script

```
              ┌─────────────────────────┐
              │ You made a data change  │
              └───────────┬─────────────┘
                          │
              ┌───────────▼─────────────┐
              │ Did you change scoring  │
              │ logic? (weights, gates, │
              │ formula, cutoffs)       │
              └───────────┬─────────────┘
                    │           │
                   YES         NO (just display text)
                    │           │
                    ▼           ▼
           ┌──────────────┐  ┌──────────────────┐
           │ Run the      │  │ Build is optional │
           │ build script │  │ (but recommended  │
           │ NOW          │  │ to keep JSON in   │
           └──────────────┘  │ sync with source) │
                             └──────────────────┘
```

**Rule of thumb:** run it after every edit session. The script takes under a second on 500 rows. There's no reason not to.

**Before deploying:** always run the build script. The worker loads `programmes.json` — if it's stale, your production scores are wrong.

---

## The build script: what it actually does

```
┌─────────────────────────────────────────────────────────────┐
│                    node scripts/process-data.js              │
│                                                             │
│  1. READ                                                     │
│     ├─ input/master_data.csv   → 385 rows                   │
│     └─ input/jupas_data.csv    → 386 rows                   │
│                                                             │
│  2. PARSE (every weight expression, formula, gate)           │
│     "core:eng=2.0; core:math=2.0"  →  { "core:eng": 2.0 }  │
│     "1x(elec:bio|elec:chem)@1.5"   →  [{ pick:1, ... }]    │
│     "Best 5 + 6th Subject Bonus"   →  { type: "hkust" }     │
│                                                             │
│  3. STRIP (clean jupas_data)                                │
│     Keeps 29 columns (metadata + cutoffs)                    │
│     Converts: 799 → null, "YES" → true                      │
│                                                             │
│  4. MERGE (match master_data + jupas_data by program_id)    │
│                                                             │
│  5. VALIDATE                                                 │
│     Checks: missing required fields, out-of-range values,   │
│             unparseable weights, unrecognized formulas      │
│                                                             │
│  6. WRITE                                                    │
│     ├─ output/programmes.json    (merged, pre-digested)     │
│     └─ output/build-report.txt   (summary)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Common workflows

### Adding a new programme

1. Open `master_data.csv`. Append a new row with the programme's scoring rules.
   - `program_id`: e.g. `JS9999`
   - `university`: e.g. `HKU`
   - `formula`: e.g. `Best 5`
   - Fill in gates, weights, must_include as needed.
2. Open `jupas_data.csv`. Append a new row with the programme's metadata.
   - `program_id`: must match exactly
   - `programName_en`, `programName_ch`
   - `cat`, `type`
   - Cutoff scores if available (use `799` for missing)
3. Run `node scripts/process-data.js`
4. Check `output/build-report.txt` — verify the count increased by 1
5. If validation errors appear, fix and re-run

### Fixing a weight that's wrong

1. Open `master_data.csv`
2. Find the programme by `program_id`
3. Edit the `weight_regular` column
   - Format: `type:code=multiplier; type:code=multiplier`
   - Example: `core:eng=2.0; core:math=1.5; elec:bio=1.5`
4. Run `node scripts/process-data.js`
5. Verify the output JSON has the correct weights for that programme

### Updating historical cutoffs (annual task)

1. Open `jupas_data.csv`
2. Find each programme
3. Update `UQ_2025`, `Median_2025`, `LQ_2025`, `vacancy_2025` with new data
4. Shift old 2025 data to 2024 columns, 2024 to 2023, drop 2023
5. (Or add new columns for 2026 and update the build script's `JUPAS_KEEP_COLS`)
6. Run `node scripts/process-data.js`

### Reviewing all programmes for a university

1. Run `python3 scripts/convert-to-excel.py`
2. Open `data/jupas_data.xlsx`
3. On the `master_data` sheet, use the auto-filter on the `university` column
4. Select e.g. `HKU` — now you see only HKU programmes
5. Scroll through, spot-check weights and gates
6. Make edits directly in Excel
7. Export each sheet as CSV to `input/`
8. Run `node scripts/process-data.js`

---

## JS1300 data inconsistency — how to fix

The validation found that JS1300 has conflicting data across the two CSVs:

| Field | master_data.csv | jupas_data.csv |
|-------|----------------|----------------|
| Name | Integrative Bioscience & Bioengineering Programme (Bio3) | BBA and LLB (Double Degree) (JS1805, JS1806, JS1807 combined intake) |
| Category | (no category — in master) | Business & Finance |
| Type | (no type — in master) | law, Business Administration |
| Formula | 3C2X (3 core + 2 electives) | (no formula — in jupas) |
| Weights | bio ×2, chem ×2, eng ×2, math ×1.5 | (no weights — in jupas) |

The jupas_data row is clearly wrong — it describes a business/law double degree with references to biomedical programme codes (JS1805-1807). The master_data row (bioscience programme with biology/chemistry weights) is the correct one for CityU JS1300.

**To fix:**

1. Visit the official JUPAS page for JS1300 to confirm: `https://www.jupas.edu.hk/en/programme/cityuhk/JS1300`
2. In `jupas_data.csv`, find the line starting with `JS1300,CITYU` (line 2 of the file)
3. Update these fields with the correct values from the official page:
   - `programName_en` → should be the bioscience programme name
   - `programName_ch` → corresponding Chinese name
   - `cat_ch` → should be a science category, not 商業與金融
   - `cat` → should be e.g. "Science", not "Business & Finance"
   - `type_ch` → should be bioscience-related, not 法律
   - `type` → should be bioscience-related, not "law"
   - `type2_ch`, `type2` → update accordingly
4. Run `node scripts/process-data.js`
5. The validation flag for JS1300 should clear

---

## Validation errors: what they mean and what to do

```
JS6456: minChi 9 out of range 1-5
```
→ Someone typed 9 instead of 3. Fix the value in master_data.csv.

```
JS1234: best_of picks 3 from pool of 2
```
→ The weight_best_of says "pick 3 subjects" but only lists 2 in the pool. Either reduce the pick count or add more subjects to the pool.

```
JS1234: no name found in jupas_data
```
→ This programme exists in master_data but not in jupas_data (or the IDs don't match). Add the row to jupas_data.

```
JS9999: invalid formula
```
→ The formula column has a value not in FORMULA_MAP. Check for typos. If it's a legitimate new formula type, add it to FORMULA_MAP in `scripts/process-data.js`.

---

## The full pipeline (edit → build → deploy)

```
 ┌──────────┐    ┌───────────┐    ┌───────────┐    ┌──────────┐
 │  Edit    │    │  Build    │    │  Test     │    │  Deploy  │
 │  data    │───▶│  JSON     │───▶│  locally  │───▶│  worker  │
 └──────────┘    └───────────┘    └───────────┘    └──────────┘

   You do:        node script     npm run dev     git push
   Edit CSVs      does this       check scores    worker picks
   in editor      automatically   look right      up new JSON

   Time: varies   Time: <1s       Time: 1-2min    Time: CI/CD
```

**You never edit the JSON files directly.** They are generated artifacts. Any manual edit to `output/programmes.json` will be overwritten next time you run the build script.

**You never deploy without running the build script first.** The worker loads `programmes.json` at deploy time. If you forgot to rebuild, production runs on stale data.

---

## One more thing

The `excludeRules` array and the `special` formulas (JS6119, JS6688, JS6901) require custom scoring logic in the worker that isn't implemented yet. The build script correctly tags these programmes but the actual scoring code needs to be written separately. When you build the worker, handle:

- `special: "js6119_special_calculation"` → conditional weighting on science subjects
- `special: "js6688_special_calculation"` → best 3 from science pool at ×1.3
- `special: "js6901_special_calculation"` → conditional ×1.5 on best 2 if from science pool
- `excludeRules: ["math_or_m1m2_only_one"]` → pick higher of core:math vs best of M1/M2
