/**
 * process-data.js
 *
 * Drop CSVs into input/ → run this script → JSON appears in output/
 *
 * Usage:  node scripts/process-data.js
 *
 * Zero dependencies. Uses only Node.js built-in modules.
 * Handles quoted CSV fields, 799 sentinels, weight expression parsing,
 * and merges master_data + jupas_data on program_id.
 */

const fs = require("fs");
const path = require("path");

// ─── CONFIG ────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");
const INPUT_DIR = path.join(ROOT, "input");
const OUTPUT_DIR = path.join(ROOT, "output");

// Columns to KEEP from jupas_data (everything else gets stripped).
// Career columns + duplicates + empty artifacts intentionally excluded.
// Column names must match the CSV header EXACTLY (case-sensitive).
const JUPAS_KEEP_COLS = new Set([
  "program_id",
  "university",
  "programName_en",
  "programName_ch",
  "FacultyName",
  "isdoubledegree",
  "isPopular",
  "isGod",
  "isInterview",        // boolean: TRUE/FALSE — general flag
  "cat_ch",
  "cat",
  "type_ch",
  "type",
  "type2_ch",
  "type2",
  "first_year_intake",
  "isInterview_1",      // text: "Selective", "May require", "Not required", etc.
  "numOfYear",
  "vacancy_2025",
  "UQ_2025",
  "Median_2025",
  "LQ_2025",
  "vacancy_2024",
  "UQ_2024",
  "Median_2024",
  "LQ_2024",
  "UQ_2023",
  "Median_2023",
  "LQ_2023",
]);

// Recognised formula types → normalised output
const FORMULA_MAP = {
  // Best N variants
  "best 4":  { type: "bestN", n: 4 },
  "best4":   { type: "bestN", n: 4 },
  "best 5":  { type: "bestN", n: 5 },
  "best5":   { type: "bestN", n: 5 },
  "best 6":  { type: "bestN", n: 6 },
  "best6":   { type: "bestN", n: 6 },
  "best 7":  { type: "bestN", n: 7 },
  "best7":   { type: "bestN", n: 7 },
  // HKUST capped formula
  "best 5 + 6th subject bonus": { type: "hkust" },
  // Fixed-subject schemes
  "4 core + 2 electives": { type: "fixed", fixed: ["core:chi","core:eng","core:math","core:csd"], electives: 2 },
  "3 core + 2 electives": { type: "fixed", fixed: ["core:chi","core:eng","core:math"], electives: 2 },
  "3c2x": { type: "fixed", fixed: ["core:chi","core:eng","core:math"], electives: 2 },
};

// Known special-calculation IDs → need custom scoring logic
const SPECIAL_FORMULAS = new Set([
  "js6119_special_calculation",
  "js6688_special_calculation",
  "js6901_special_calculation",
]);

// ─── CSV PARSER ────────────────────────────────────────────

/**
 * Parse a CSV string into an array of objects keyed by header names.
 * Handles quoted fields (which may contain commas and newlines).
 */
function parseCSV(text) {
  const lines = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        current += '""';  // keep escaped double-quote intact for splitRow
        i++; // skip second quote
      } else if (ch === '"') {
        inQuotes = false;
        current += '"';   // keep closing quote so splitRow knows the field boundary
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        current += '"';   // keep opening quote so splitRow can track quoted fields
      } else if (ch === "\n" || (ch === "\r" && next === "\n")) {
        lines.push(current);
        current = "";
        if (ch === "\r") i++; // skip \n after \r
      } else if (ch === "\r") {
        lines.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  if (current.length > 0) lines.push(current);

  const headers = splitRow(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = splitRow(lines[i]);
    if (values.length === 0) continue;
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = idx < values.length ? values[idx] : "";
    });
    rows.push(obj);
  }
  return rows;
}

function splitRow(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const next = line[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current.trim());
  return fields;
}

// ─── HELPERS ───────────────────────────────────────────────

/**
 * Coerce a string to a number, or null if empty/invalid.
 * @param {string} s - Value to parse
 * @param {boolean} treatSentinel - If true, treat 799 as null (for cutoff/count fields).
 *                                 Use true for: UQ, Median, LQ, vacancy, intake, years.
 *                                 Use false for: weights (999 is unlikely but could be valid).
 */
function numOrNull(s, treatSentinel = true) {
  if (s === "" || s === undefined || s === null) return null;
  const n = Number(s);
  if (isNaN(n)) return null;
  // 799 is the "no data" sentinel for COUNT and SCORE fields
  // (but only for fields that would be null if missing, not for weights)
  if (treatSentinel && n === 799) return null;
  return n;
}

/** Coerce a string to boolean. "YES"/"TRUE"/"A" → true, else false. */
function boolOrFalse(s) {
  if (!s) return false;
  const v = s.trim().toUpperCase();
  return v === "YES" || v === "TRUE" || v === "A"; // "A" = Attained for CSD
}

/**
 * Derive isInterview boolean from the text interview column.
 * "Not required" / "No" / empty → false. Everything else → true.
 */
function isInterviewBool(s) {
  if (!s || s.trim() === "") return false;
  const v = s.trim().toLowerCase();
  if (v === "not required" || v === "no") return false;
  return true;
}

/** Trim and normalise, return null for empty string. */
function strOrNull(s) {
  if (!s || s.trim() === "") return null;
  return s.trim();
}

// ─── WEIGHT EXPRESSION PARSERS ─────────────────────────────

/**
 * Parse weight_regular column.
 * "core:eng=2.0; core:math=2.0; elec:bio=1.5"
 * → { "core:eng": 2.0, "core:math": 2.0, "elec:bio": 1.5 }
 *
 * Returns null if the value is a special formula reference or empty.
 */
function parseWeights(raw) {
  if (!raw || raw.trim() === "") return {};
  // Check for special formula reference
  if (SPECIAL_FORMULAS.has(raw.trim())) return { _special: raw.trim() };

  const weights = {};
  const parts = raw.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eqIdx = trimmed.lastIndexOf("=");
    if (eqIdx === -1) continue;
    const subject = trimmed.slice(0, eqIdx).trim();
    const weight = Number(trimmed.slice(eqIdx + 1).trim());
    if (!isNaN(weight)) weights[subject] = weight;
  }
  return weights;
}

/**
 * Parse weight_best_of column.
 * "1x(elec:bio|elec:chem)@1.5; 1x(elec:phys|ext:M1|ext:M2)@2.0"
 * → [
 *     { pick: 1, pool: ["elec:bio", "elec:chem"], weight: 1.5 },
 *     { pick: 1, pool: ["elec:phys", "ext:M1", "ext:M2"], weight: 2.0 }
 *   ]
 */
function parseBestOf(raw) {
  if (!raw || raw.trim() === "") return [];
  const groups = [];
  const parts = raw.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    // Pattern: Nx(sub1|sub2|...)@multiplier
    const match = trimmed.match(/^(\d+)x\((.+)\)@([\d.]+)$/);
    if (!match) continue;
    const pick = parseInt(match[1], 10);
    const pool = match[2].split("|").map(s => s.trim());
    const weight = parseFloat(match[3]);
    groups.push({ pick, pool, weight });
  }
  return groups;
}

/**
 * Parse must_include column.
 * "core:eng|core:math"
 * → ["core:eng", "core:math"]
 */
function parseMustInclude(raw) {
  if (!raw || raw.trim() === "") return [];
  // Subject keys always contain ":" (e.g. "core:eng", "elec:bio", "ext:M1").
  // If the value has no ":", it's a raw description sentence (column-shift artifact) — reject it.
  if (!raw.includes(":")) return [];
  return raw.split("|").map(s => s.trim()).filter(s => s.includes(":"));
}

/**
 * Parse require_any column.
 * "1x(elec:bio|elec:chem)@>=3; 1x(elec:phys|elec:ict)@>=3"
 * → [
 *     { pick: 1, pool: ["elec:bio", "elec:chem"], minLevel: 3 },
 *     { pick: 1, pool: ["elec:phys", "elec:ict"], minLevel: 3 }
 *   ]
 */
function parseRequireAny(raw) {
  if (!raw || raw.trim() === "") return [];
  const groups = [];
  const parts = raw.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    // Pattern: Nx(sub1|sub2|...)@>=level
    const match = trimmed.match(/^(\d+)x\((.+)\)@>=(\d+)$/);
    if (!match) continue;
    const pick = parseInt(match[1], 10);
    const pool = match[2].split("|").map(s => s.trim());
    const minLevel = parseInt(match[3], 10);
    groups.push({ pick, pool, minLevel });
  }
  return groups;
}

/**
 * Parse formula column into a normalised object.
 */
function parseFormula(raw, university) {
  let f;
  if (!raw || raw.trim() === "") {
    f = { type: "bestN", n: 5 }; // default
  } else {
    const key = raw.trim().toLowerCase();
    if (FORMULA_MAP[key]) {
      f = { ...FORMULA_MAP[key] };
    } else {
      // Try to parse "Best N" pattern (handles "Best6", "Best 7", etc.)
      const match = key.match(/^best\s*(\d+)/);
      f = match ? { type: "bestN", n: parseInt(match[1], 10) } : { type: "bestN", n: 5 };
    }
  }
  // PolyU's "Best 5" is really "Best 5 + 6th subject bonus" (PolyU 2025 admission
  // score method). The CSV formula text does not distinguish this — override here.
  // HKUST keeps its own "hkust" type (mapped explicitly via FORMULA_MAP).
  if ((university || "").toUpperCase() === "POLYU" && f.type === "bestN") {
    f = { type: "polyu" };
  }
  return f;
}

/**
 * Parse HKU_6th_multiplier. Can be 0.2, 0.5, "YES", or empty.
 * "YES" means the programme uses a 6th subject but the multiplier
 * is embedded in the weight_explanation text. We return null for
 * "YES" since it's not a computable number.
 */
function parseHKUMultiplier(raw) {
  if (!raw || raw.trim() === "") return null;
  const v = raw.trim().toUpperCase();
  if (v === "YES") return null; // embedded in description, not a fixed number
  const n = Number(raw);
  if (isNaN(n)) return null;
  // HKU 6th-subject multipliers are always fractions between 0 and 1 (e.g. 0.2, 0.5).
  // Reject integers ≥ 1 — these are almost certainly column-shift artifacts
  // (e.g. a Column1 sequential index bleeding in).
  if (n <= 0 || n >= 1) return null;
  return n;
}

// ─── MAIN PROCESSOR ────────────────────────────────────────

function processMasterData(rows) {
  return rows.map(row => {
    const weights = parseWeights(row["weight_regular"]);
    const isSpecial = weights._special ? weights._special : null;
    if (isSpecial) delete weights._special;

    // Some rows put per-subject elective weights in weight_best_of using key=value format
    // (e.g. "elec:bio=2.5; elec:chem=2.5; elec:geog=1.5") instead of Nx(...)@weight.
    // parseBestOf ignores these silently. Parse them as regular weights too and merge in.
    const bestOfRaw = row["weight_best_of"] || "";
    const bestOfAsRegular = parseWeights(bestOfRaw);
    if (!bestOfAsRegular._special) {
      Object.assign(weights, bestOfAsRegular);
    }

    return {
      id: row["program_id"],
      uni: row["university"],
      nameEn: row["name"] || "",
      formula: parseFormula(row["formula"], row["university"]),
      gates: {
        minChi: numOrNull(row["min_core_chi"]),
        minEng: numOrNull(row["min_core_eng"]),
        minMath: numOrNull(row["min_core_math"]),
        minElec1: numOrNull(row["min_elective1_grade"]),
        minElec2: numOrNull(row["min_elective2_grade"]),
        csdRequired: boolOrFalse(row["csd_required"]),
        excludeCatB: boolOrFalse(row["exclude_category_b"]),
        excludeCatC: boolOrFalse(row["exclude_category_c"]),
        mustInclude: parseMustInclude(row["must_include"]),
        requireAny: parseRequireAny(row["require_any"]),
      },
      weights: {
        regular: weights,
        bestOf: parseBestOf(bestOfRaw),
      },
      hku: {
        sixthMultiplier: parseHKUMultiplier(row["HKU_6th_multiplier"]),
      },
      hkust: {
        highestAttainableScore: numOrNull(row["HKUST_HighestAttainableScore"]),
      },
      maxWeightedElectives: numOrNull(row["max_weighted_electives"]),
      excludeRules: [], // populated by manual tagging later (math_or_m1m2_only_one, etc.)
      special: isSpecial,
    };
  });
}

function processJupasData(rows) {
  return rows.map(row => {
    // Only keep specified columns
    const cleaned = {};
    for (const key of JUPAS_KEEP_COLS) {
      cleaned[key] = row[key] || "";
    }
    return cleaned;
  });
}

function processSubjectTabs(rows) {
  return rows.map(row => ({
    type: row["type_en"] || "",
    categoryEn: row["category_en"] || "",
    categoryCh: row["category_zh_hk"] || "",
  }));
}

/**
 * Merge master_data scoring info with jupas_data metadata.
 * Returns the final programmes array for the API.
 */
function merge(masterRows, jupasRows) {
  // Index jupas rows by program_id
  const jupasById = {};
  for (const j of jupasRows) {
    jupasById[j["program_id"]] = j;
  }

  const programmes = [];
  const seen = new Set();

  for (const m of masterRows) {
    if (!m.id || seen.has(m.id)) continue;
    seen.add(m.id);

    const j = jupasById[m.id] || {};

    programmes.push({
      id: m.id,
      uni: m.uni || j["university"] || "",
      nameEn: j["programName_en"] || m.nameEn || "",
      nameCh: j["programName_ch"] || "",
      faculty: j["FacultyName"] || "",
      isDoubleDegree: boolOrFalse(j["isdoubledegree"]),
      category: j["cat"] || "",
      categoryCh: j["cat_ch"] || "",
      type: j["type"] || "",
      typeCh: j["type_ch"] || "",
      type2: j["type2"] || "",
      type2Ch: j["type2_ch"] || "",
      isPopular: boolOrFalse(j["isPopular"]),
      isGod: boolOrFalse(j["isGod"]),
      isInterview: isInterviewBool(j["isInterview_1"]),
      interviewType: strOrNull(j["isInterview_1"]),
      firstYearIntake: numOrNull(j["first_year_intake"], true), // treat 799 as null
      numOfYear: numOrNull(j["numOfYear"], true), // treat 799 as null
      formula: m.formula,
      gates: m.gates,
      weights: m.weights,
      hku: m.hku,
      hkust: m.hkust,
      maxWeightedElectives: m.maxWeightedElectives,
      excludeRules: m.excludeRules,
      special: m.special,
      cutoffs: {
        "2025": {
          uq: numOrNull(j["UQ_2025"], true), // treat 799 as null
          median: numOrNull(j["Median_2025"], true), // treat 799 as null
          lq: numOrNull(j["LQ_2025"], true), // treat 799 as null
          vacancy: numOrNull(j["vacancy_2025"], true), // treat 799 as null
        },
        "2024": {
          uq: numOrNull(j["UQ_2024"], true), // treat 799 as null
          median: numOrNull(j["Median_2024"], true), // treat 799 as null
          lq: numOrNull(j["LQ_2024"], true), // treat 799 as null
          vacancy: numOrNull(j["vacancy_2024"], true), // treat 799 as null
        },
        "2023": {
          uq: numOrNull(j["UQ_2023"], true), // treat 799 as null
          median: numOrNull(j["Median_2023"], true), // treat 799 as null
          lq: numOrNull(j["LQ_2023"], true), // treat 799 as null
        },
      },
    });
  }

  return programmes;
}

// ─── VALIDATION ────────────────────────────────────────────

/**
 * Validate that cutoff values are logically consistent.
 * Returns a summary of issues found.
 */
function validateCutoffs(p, year) {
  const issues = [];
  const c = p.cutoffs[year];
  if (!c) return issues;

  const { uq, median, lq } = c;

  // Logical consistency: UQ >= Median >= LQ when all are present
  // Note: we don't validate vacancy here since it's a count, not comparable to scores
  if (uq !== null && median !== null && uq < median) {
    issues.push(`Year ${year}: UQ(${uq}) < Median(${median}) — reversed or column-shifted`);
  }
  if (median !== null && lq !== null && median < lq) {
    issues.push(`Year ${year}: Median(${median}) < LQ(${lq}) — reversed or column-shifted`);
  }
  if (uq !== null && lq !== null && uq < lq) {
    issues.push(`Year ${year}: UQ(${uq}) < LQ(${lq}) — data error`);
  }

  return issues;
}

function validate(programmes) {
  const errors = [];

  // Track recognized formulas to flag unknowns
  const recognizedFormulas = new Set(Object.keys(FORMULA_MAP));
  recognizedFormulas.add(""); // empty falls through to default

  for (const p of programmes) {
    // Required fields
    if (!p.id) errors.push(`Missing program_id`);
    if (!p.uni) errors.push(`${p.id}: missing university`);
    if (!p.formula || !p.formula.type) errors.push(`${p.id}: invalid formula`);

    // Referential: check jupas_data has this programme
    if (!p.nameEn && !p.nameCh) {
      errors.push(`${p.id}: no name found in jupas_data — programme may be missing`);
    }

    // Gate consistency
    if (p.gates.minChi !== null && (p.gates.minChi < 1 || p.gates.minChi > 5)) {
      errors.push(`${p.id}: minChi ${p.gates.minChi} out of range 1-5`);
    }
    if (p.gates.minEng !== null && (p.gates.minEng < 1 || p.gates.minEng > 5)) {
      errors.push(`${p.id}: minEng ${p.gates.minEng} out of range 1-5`);
    }

    // Weight parsing: check for malformed best_of
    for (const g of p.weights.bestOf) {
      if (!g.pool || g.pool.length === 0) {
        errors.push(`${p.id}: best_of group has empty pool`);
      }
      if (g.pick > g.pool.length) {
        errors.push(`${p.id}: best_of picks ${g.pick} from pool of ${g.pool.length}`);
      }
    }

    // Special formula without special field
    if (p.formula.type === "bestN" && p.formula.n > 5 && !p.special && !p.hku.sixthMultiplier) {
      // Best 6+ without HKU multiplier or special formula is unusual — flag it
      // (not an error, but worth noting)
    }

    // Cutoff validation: check for data leaks and logical inconsistencies
    for (const year of ["2023", "2024", "2025"]) {
      const cutoffIssues = validateCutoffs(p, year);
      for (const issue of cutoffIssues) {
        errors.push(`${p.id}: ${issue}`);
      }
    }
  }

  return errors;
}

// ─── ENTRY POINT ───────────────────────────────────────────

function main() {
  console.log("JUPAS Data Processor\n");

  // Ensure directories exist
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`ERROR: input/ directory not found at: ${INPUT_DIR}`);
    console.error("Create an 'input/' folder and drop your CSVs there.");
    process.exit(1);
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Read CSVs
  const files = ["master_data.csv", "jupas_data.csv"];
  const data = {};

  for (const f of files) {
    const filepath = path.join(INPUT_DIR, f);
    if (!fs.existsSync(filepath)) {
      console.error(`ERROR: ${f} not found in input/`);
      process.exit(1);
    }
    const text = fs.readFileSync(filepath, "utf-8");
    data[f] = parseCSV(text);
    console.log(`  Read ${f}: ${data[f].length} rows`);
  }

  // Process each dataset
  console.log("\nProcessing...");
  const master = processMasterData(data["master_data.csv"]);
  const jupas = processJupasData(data["jupas_data.csv"]);

  // Merge
  const programmes = merge(master, jupas);

  // Validate
  console.log("\nValidating...");
  const errors = validate(programmes);
  if (errors.length > 0) {
    console.log(`  ${errors.length} validation issues found:`);
    
    // Group errors by type for better readability
    const errorsByType = {};
    for (const e of errors) {
      const type = e.includes("suspicious high") ? "DATA_LEAK" :
                   e.includes("reversed or column-shifted") ? "LOGIC_ERROR" :
                   e.includes("out of range") ? "GATE_ERROR" :
                   "OTHER";
      if (!errorsByType[type]) errorsByType[type] = [];
      errorsByType[type].push(e);
    }
    
    // Print by category
    if (errorsByType.DATA_LEAK) {
      console.log(`\n  ⚠ CRITICAL (Possible data leaks / column shifts):`);
      for (const e of errorsByType.DATA_LEAK.slice(0, 10)) {
        console.log(`    ${e}`);
      }
      if (errorsByType.DATA_LEAK.length > 10) {
        console.log(`    ... and ${errorsByType.DATA_LEAK.length - 10} more`);
      }
    }
    
    if (errorsByType.LOGIC_ERROR) {
      console.log(`\n  ⚠ HIGH (Logical inconsistencies):`);
      for (const e of errorsByType.LOGIC_ERROR.slice(0, 10)) {
        console.log(`    ${e}`);
      }
      if (errorsByType.LOGIC_ERROR.length > 10) {
        console.log(`    ... and ${errorsByType.LOGIC_ERROR.length - 10} more`);
      }
    }
    
    if (errorsByType.GATE_ERROR) {
      console.log(`\n  ⚠ MEDIUM (Gate validation errors):`);
      for (const e of errorsByType.GATE_ERROR.slice(0, 5)) {
        console.log(`    ${e}`);
      }
      if (errorsByType.GATE_ERROR.length > 5) {
        console.log(`    ... and ${errorsByType.GATE_ERROR.length - 5} more`);
      }
    }
    
    if (errorsByType.OTHER) {
      console.log(`\n  ⚠ Other issues:`);
      for (const e of errorsByType.OTHER.slice(0, 5)) {
        console.log(`    ${e}`);
      }
      if (errorsByType.OTHER.length > 5) {
        console.log(`    ... and ${errorsByType.OTHER.length - 5} more`);
      }
    }
  } else {
    console.log("  All clear.");
  }

  // Write JSON output
  console.log("\nWriting JSON...");

  const programmesPath = path.join(OUTPUT_DIR, "programmes.json");
  fs.writeFileSync(programmesPath, JSON.stringify(programmes));
  console.log(`  programmes.json  → ${programmes.length} programmes (${(fs.statSync(programmesPath).size / 1024).toFixed(0)} KB)`);

  // Lite catalogue — public fields only, served as a static asset to the
  // frontend (e.g. the bookmarks page) so it can render programme cards
  // without re-running the engine. Scoring internals are intentionally dropped.
  const STRIP_KEYS = ["formula", "gates", "weights", "hku", "hkust", "maxWeightedElectives", "excludeRules", "special"];
  const lite = programmes.map(p => {
    const o = { ...p };
    for (const k of STRIP_KEYS) delete o[k];
    return o;
  });
  const liteDir = path.join(ROOT, "..", "public", "jupas");
  fs.mkdirSync(liteDir, { recursive: true });
  const litePath = path.join(liteDir, "programmes-lite.json");
  fs.writeFileSync(litePath, JSON.stringify(lite));
  console.log(`  programmes-lite.json → ${lite.length} programmes (${(fs.statSync(litePath).size / 1024).toFixed(0)} KB)`);

  // Write a summary report
  const unis = [...new Set(programmes.map(p => p.uni))].sort();
  const withWeights = programmes.filter(p => Object.keys(p.weights.regular).length > 0).length;
  const withBestOf = programmes.filter(p => p.weights.bestOf.length > 0).length;
  const withHkuMult = programmes.filter(p => p.hku.sixthMultiplier !== null).length;
  const withHkustCap = programmes.filter(p => p.hkust.highestAttainableScore !== null).length;
  const withSpecial = programmes.filter(p => p.special !== null).length;

  const report = [
    "JUPAS Data Build Report",
    "========================",
    `Built: ${new Date().toISOString()}`,
    "",
    `Programmes: ${programmes.length}`,
    `Universities: ${unis.join(", ")}`,
    "",
    "Scoring features:",
    `  With regular weights:  ${withWeights}`,
    `  With best-of groups:   ${withBestOf}`,
    `  With HKU 6th mult:     ${withHkuMult}`,
    `  With HKUST capped:     ${withHkustCap}`,
    `  With special formulas: ${withSpecial}`,
    "",
    `Validation: ${errors.length > 0 ? errors.length + " issues (see above)" : "passed"}`,
    "",
  ].join("\n");

  const reportPath = path.join(OUTPUT_DIR, "build-report.txt");
  fs.writeFileSync(reportPath, report);
  console.log(`  build-report.txt`);

  console.log("\nDone.");
  if (errors.length > 0) {
    console.log(`\n⚠  Review the ${errors.length} validation issues above.`);
  }
}

main();