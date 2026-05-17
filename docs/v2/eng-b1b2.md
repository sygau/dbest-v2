# English B1/B2 Conversion Table Hub

Route: `/eng-b1b2`

## What it is

A static info page showing the DSE English B1→B2 mark conversion tables for
Paper 1 (Reading, Part 1B) and Paper 3 (Listening, Part 3B), one set per year
2012–2025. Above the tables sits a single trend chart showing how "worth" a
B1 mark is across years.

Display-only. No calculator, no score input, no level estimation.

## Background

DSE English Paper 1 and Paper 3 each split into Part B1 (easier) and Part B2
(harder); a candidate sits one part per paper. Because B1 is easier, raw B1
marks are discounted to a B2-equivalent scale before grading. Each year HKEAA
effectively publishes a B1 raw mark → B2-equivalent score mapping; the
conversion factor is `b2 / b1`.

Important: the numbers on this page are community estimates compiled by
10stardse, NOT official or public HKEAA figures. The page carries a warning
Callout stating this.

## Files

- `pages/eng-b1b2.tsx` — the page. SSG (no server props).
- `components/charts/B1WorthChart.tsx` — Recharts line chart, two lines
  (Paper 1 indigo `#6366f1`, Paper 3 amber `#f59e0b`), parity reference line
  at y=1. Loaded via `next/dynamic` with `ssr: false`.
- `data/eng-b1b2/conversions.json` — all data, keyed by year string.
- `data/eng-b1b2/types.ts` — `ConvRow`, `YearData`, `Conversions` types.
- `data/jsonld/pages.ts` — added `eng-b1b2` JSON-LD entry (used via
  `PageSEO pageKey="eng-b1b2"`).
- `components/tw/Sidebar.tsx` — new "資訊 Info" section linking the page.

## Data schema

`conversions.json`:

```json
{
  "2012": {
    "paper1": [ { "b1": 0, "b2": 0, "factor": 0.0 } ],
    "paper3": [ { "b1": 0, "b2": 0, "factor": 0.0 } ]
  }
}
```

Direction is always B1 → B2. All three columns are stored verbatim (factor is
not recomputed) so data can be transcribed straight from the source images
with no build script.

Status: only 2012 contains real transcribed data. 2013–2025 hold dummy rows
and must be replaced with real numbers.

## Chart

`B1WorthChart` plots the average conversion factor per year (mean of `factor`
over rows with `b1 > 0`). Higher = B1 marks hold value (deflation, favours the
student); lower = marks discounted harder (inflation). `ResponsiveContainer`
handles mobile/iPad reflow.

## Layout

`PageSEO` → `PageBreadcrumb` → a `card rounded-4` container (about.tsx style):
header + intro, warning Callout, credit Callout (`@10stardse` link), the trend
chart, a year jump-link nav, then per-year sections. Each year section shows
the Paper 1 and Paper 3 tables side by side on desktop (`lg:grid-cols-2`),
stacked on mobile. Tables use the `Table` component with a black header
(`--color-table-head-bg`/`-text` overridden inline).

## Verification

- `npm run build` — `/eng-b1b2` emits as `○` (static SSG), ~144 kB First Load.
- 2012 tables match the source image; chart renders two distinct lines plus
  the parity reference line.
- Year nav links jump to the correct anchored sections.
- Tables collapse to single column on mobile; chart reflows.

## Follow-ups

- Transcribe real 2013–2025 data into `conversions.json`.
- Per-year curve graphs (B1 vs B2) could be added later if wanted.
