# Adding a Calculator Programme — Guide for AI / Contributors

This guide describes exactly how to add a new programme to the library at `/programmes` **without needing access to the codebase**. You produce a JSON object that gets appended to `data/programmes.json`. Optionally you add new keystroke entries to `data/programme-tokens.json`.

## Files you touch

1. `data/programmes.json` — append one object to the top-level array
2. `data/programme-tokens.json` — only if your programme uses a special token not already listed

Nothing else. The UI auto-builds the new page from the JSON.

## The Programme object

```json
{
  "slug": "kebab-case-unique-id",
  "title": "English Title",
  "titleZh": "中文標題",
  "subjects": ["core" | "m1" | "m2" | "physics" | "chemistry" | "biology"],
  "models": ["fx-50FH" | "fx-50FH II" | "fx-3650P" | "fx-3650P II" | "fx-3950P"],
  "difficulty": "essential" | "common" | "advanced",
  "bytes": 0,
  "description": "1–2 sentences in English describing what the programme does.",
  "descriptionZh": "中文一兩句描述。",
  "formula": "Plain-text or LaTeX-ish formula reference. Optional.",
  "glyph": "{x,y}",
  "setup": { ... },
  "tokens": [ ... ],
  "inputs": [ ... ],
  "displays": [ ... ],
  "examples": [ ... ],
  "errors": [ ... ],
  "sources": [ ... ],
  "tags": ["..."],
  "dseRelevance": { ... }
}
```

### Field rules

| Field | Rule |
|---|---|
| `slug` | Lowercase, kebab-case, unique. Used in URL `/programmes/<slug>`. |
| `subjects` | At least one. Order matters — first subject = card colour theme. |
| `models` | Subset of the 5 supported Casio models. List ALL that work, not just one. |
| `difficulty` | `essential` = the headline DSE programmes (sim eq, quad, SD). `common` = useful, frequently shared. `advanced` = niche, large, or M2-only. |
| `bytes` | Integer. Read the byte count from the calculator after typing the programme (display shows `XXX bytes` when you exit edit mode). Be honest — `fx-3650P` has a 360-byte cap. |
| `glyph` | 1–4 character math glyph shown on the card. Examples: `{x,y}`, `x²`, `x³`, `○`, `σ`, `(r,θ)`, `log`, `Σ`, `∫`. Keep it short. |

### `setup` object

```json
{
  "enterPrgm": ["MODE", "MODE", "MODE", "2"],
  "slotInstruction": "Press 1, 2, 3, or 4 to choose an empty P1–P4 slot.",
  "requiredMode": "REG-LIN",
  "modeSetupKeys": ["MODE", "5", "1"],
  "notes": "Optional caveat — e.g. 'fx-3650P 360-byte limit — won't fit'."
}
```

- `enterPrgm` is the sequence to enter PRGM-edit mode. For all current Casio models supported, this is `["MODE", "MODE", "MODE", "2"]`.
- `requiredMode` + `modeSetupKeys` are needed ONLY when the programme must be invoked from a non-COMP mode (e.g. SD mode for stats, REG-LIN for regression, CMPLX for complex-number programmes). Omit both fields otherwise.
- Allowed `requiredMode` values: `"COMP" | "CMPLX" | "REG-LIN" | "REG-LOG" | "REG-EXP" | "SD" | "BASE-N" | "EQN"`.

### `tokens` array — the centrepiece

Each token = one cell in the on-screen TokenGrid. The student reads cell-by-cell and types the literal text. Tokenisation rule: **split at every keystroke boundary**.

Each entry: `{ "text": "...", "kind": "..." }`.

Allowed `kind` values and what goes there:

| Kind | Examples | Colour theme |
|---|---|---|
| `cmd` | `ClrMemory`, `ClrStat`, `FreqOn`, `Fix`, `If`, `Then`, `Else`, `IfEnd`, `Lbl`, `Goto`, `Norm`, `DT`, `M+`, `⇒` | blue |
| `op` | `+`, `−`, `×`, `÷`, `²`, `³`, `≠`, `=` | grey |
| `var` | `A`, `B`, `C`, `D`, `E`, `F`, `M`, `X`, `Y` | amber |
| `num` | `0`, `1`, `2`, `27`, `54` (literal digits — split into ONE token, e.g. `27` not `2`+`7`) | neutral |
| `paren` | `(`, `)` | grey |
| `prompt` | `?` (the input-prompt marker) | yellow |
| `arrow` | `→` (assign to variable) | orange |
| `disp` | `◢` (display-and-pause marker) | green |
| `sep` | `:` (statement separator), `,` | muted |
| `fn` | `Ans`, `√(`, `Pol(`, `Rec(`, `Rnd(`, `log(`, `sin(` | purple |

**Tokenisation tips:**

1. Whitespace in the source is irrelevant — only tokens matter.
2. `²` (square) and `³` (cube) are separate tokens after the variable: `B²` becomes `B`, `²`.
3. Numbers stay as one token (`27` not `2`, `7`).
4. The colon `:` separates statements — always its own token.
5. `→A` becomes two tokens: `→`, `A`.
6. Function-with-open-paren (e.g. `√(`, `Pol(`) is ONE token because that is one keystroke on Casio.
7. Closing `)` is its own token.

**Example tokenisation of `?→A:?→B:(A+B)÷2→X◢`:**

```json
[
  { "text": "?",  "kind": "prompt" },
  { "text": "→",  "kind": "arrow" },
  { "text": "A",  "kind": "var" },
  { "text": ":",  "kind": "sep" },
  { "text": "?",  "kind": "prompt" },
  { "text": "→",  "kind": "arrow" },
  { "text": "B",  "kind": "var" },
  { "text": ":",  "kind": "sep" },
  { "text": "(",  "kind": "paren" },
  { "text": "A",  "kind": "var" },
  { "text": "+",  "kind": "op" },
  { "text": "B",  "kind": "var" },
  { "text": ")",  "kind": "paren" },
  { "text": "÷",  "kind": "op" },
  { "text": "2",  "kind": "num" },
  { "text": "→",  "kind": "arrow" },
  { "text": "X",  "kind": "var" },
  { "text": "◢",  "kind": "disp" }
]
```

If your programme uses a token not listed in `data/programme-tokens.json`, add an entry there:

```json
"YOUR_TOKEN": { "keys": "SHIFT 7", "label": "what it does" }
```

The TokenGrid tooltip uses this map to teach students how to type each special token.

### `inputs` array

Lists what the student types after pressing `EXE` at each `?` prompt, in order.

```json
{ "label": "A", "labelZh": "甲", "description": "Coefficient of x²", "example": "1" }
```

One entry per `?` in the programme. `labelZh` is optional.

### `displays` array

Each `◢` in the programme corresponds to one display step. List them in the order the student will see them.

```json
{ "order": 1, "label": "Vertex x-coordinate", "labelZh": "頂點 x", "meaning": "First press of ◢ shows −B/2A." }
```

`order` is 1-indexed. `meaning` should explain what to interpret, not how to compute.

### `examples` array

Real worked examples — at least one, ideally two. Each:

```json
{
  "question": "Solve x² + 6x + 3 = 0.",
  "questionZh": "解 x²+6x+3=0。",
  "steps": [
    { "press": "1 EXE", "display": "B?" },
    { "press": "6 EXE", "display": "C?" },
    { "press": "3 EXE", "display": "−3", "note": "vertex x" }
  ],
  "finalNote": "Vertex (−3, −6). Roots: −3 ± √6."
}
```

Each row = one EXE/◢ press. `press` is the literal key sequence; `display` is what the calculator shows; `note` is optional explanation.

**Critical:** Examples should be VERIFIED against a real fx-50FH (or accurate emulator). Wrong example output destroys student trust. If you cannot verify, mark the programme as `unverified` in `tags`.

### `errors` array (optional)

```json
{ "trigger": "Math ERROR", "meaning": "Determinant is 0 — equations are parallel or identical." }
```

Common ones: `Math ERROR`, `Syntax ERROR`, `Stack ERROR`, `Memory ERROR`.

### `sources` array

```json
{ "label": "GJ Mathematics Program 06", "url": "https://gjmaths.hk/..." }
```

Credit the public sources you adapted from. Programmes themselves are not copyrightable, but attribution is the right thing to do and helps students cross-reference.

### `dseRelevance` object (RECOMMENDED)

This is what makes the page useful, not just a code dump. Tell the student WHEN to use the programme in an exam.

```json
{
  "paperHints": [
    "Paper 1 Section A: vertex + axis of symmetry questions.",
    "Paper 2 MC: 'roots are p ± q√r, find p+q+r' — surd display gives p and q directly."
  ],
  "topics": ["Quadratic functions", "Discriminant", "Surds"],
  "notes": "Δ < 0 will produce a Math ERROR — that itself is the answer."
}
```

- `paperHints`: 2–4 bullet points tied to real DSE question patterns (Core Paper 1 Sec A/B, Paper 2 MC, M1 Paper 2 stats, M2 Paper 1 etc.).
- `topics`: short list, used to render tag chips. Use the topic names students see in textbook chapters.
- `notes`: optional gotcha or interpretation tip.

## Checklist before submitting

- [ ] Programme typed onto a real calculator at least once — byte count read directly from the device.
- [ ] Examples verified — every `display` value matches the real calculator output.
- [ ] Slug is unique; no collision with existing entries.
- [ ] `subjects[0]` is the primary subject (drives card colour).
- [ ] All special tokens used appear in `data/programme-tokens.json`.
- [ ] `models` list excludes any model where the programme exceeds the byte cap (360 for fx-3650P, 300 for fx-3950P, 680 for fx-50FH series).
- [ ] At least one entry in `sources`.

## Submitting

Submit a PR adding your object to `data/programmes.json`. The hub page sorts essential → common → advanced, then by ascending bytes — order in the JSON file does not affect display, but keeping related programmes near each other helps reviewers.
