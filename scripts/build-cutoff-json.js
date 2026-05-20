/**
 * Pre-bake cutoff CSV data into per-subject JSON files.
 *
 * Runs at build time. Output: data/cutoff/<subject>.json (CutoffTableData shape).
 * The page imports these JSONs statically so getStaticProps does not need
 * `fs` at runtime on Cloudflare Workers.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'public', 'config', 'cutoff-config.json');
const CSV_DIR = path.join(ROOT, 'public', 'data', 'cutoff');
const OUT_DIR = path.join(ROOT, 'data', 'cutoff');

function csvToRows(csv, subject) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== headers.length) continue;
    const row = {};
    headers.forEach((h, idx) => { row[h] = values[idx]; });
    const score = row.score && row.score !== '' && row.score !== '0' ? parseInt(row.score, 10) : null;
    const percentage = row.percentage && row.percentage !== '' && row.percentage !== '0' ? parseInt(row.percentage, 10) : null;
    if (row.year && row.level && (score !== null || percentage !== null)) {
      rows.push({
        subject,
        year: row.year,
        grade: row.level,
        score: score || 0,
        percentage: percentage || 0,
      });
    }
  }
  return rows;
}

function rowsToTable(rows) {
  const out = {};
  for (const r of rows) {
    const key = r.tableId;
    if (!key) continue;
    if (!out[key]) out[key] = {};
    if (!out[key][r.year]) out[key][r.year] = {};
    out[key][r.year][r.grade] = { score: r.score, percentage: r.percentage };
  }
  return out;
}

function main() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`[cutoff-json] config not found: ${CONFIG_PATH}`);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let total = 0;
  for (const subject of Object.keys(config)) {
    const subjectConfig = config[subject];
    if (!subjectConfig || !Array.isArray(subjectConfig.tables)) continue;

    const allRows = [];
    for (const t of subjectConfig.tables) {
      const csvPath = path.join(CSV_DIR, subject, t.file);
      if (!fs.existsSync(csvPath)) {
        console.warn(`[cutoff-json] missing CSV: ${csvPath}`);
        continue;
      }
      const csv = fs.readFileSync(csvPath, 'utf8');
      const rows = csvToRows(csv, subject);
      rows.forEach(r => { r.tableId = t.id; });
      allRows.push(...rows);
    }

    const table = rowsToTable(allRows);
    const outPath = path.join(OUT_DIR, `${subject}.json`);
    fs.writeFileSync(outPath, JSON.stringify(table));
    total++;
    console.log(`[cutoff-json] wrote ${subject}.json (${Object.keys(table).length} tables, ${allRows.length} rows)`);
  }
  console.log(`[cutoff-json] done — ${total} subjects`);
}

main();
