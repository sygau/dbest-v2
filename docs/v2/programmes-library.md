# Calculator Programme Library

Public-domain Casio programme directory for HKDSE Maths Core/M1/M2.

## Routes

- `/programmes` — filterable hub
- `/programmes/[slug]` — detail per programme

## Data

- `data/programmes.json` — programme records (8 seed entries)
- `data/programme-tokens.json` — token → key sequence map (`→` = `SHIFT RCL`, `?` = `SHIFT 3 1`, etc.)
- `lib/programmes.ts` — types, metadata, helpers

## Components

| File | Role |
|---|---|
| `ProgrammeCard` | Hub grid card (glyph, badges, byte meter) |
| `ProgrammeFilters` | Subject / model / difficulty / max bytes |
| `TokenGrid` | Numbered per-token cells, key-sequence reveal on tap, copy-all, "show entry keys" toggle |
| `InlineCode` | Compact monospace block w/ byte count + copy |
| `SetupBlock` | Enter-PRGM keys, slot pick, required mode (CMPLX/REG/SD) |
| `DisplayOrder` | Numbered list of ◢ output screens |
| `ExampleWalkthrough` | Press/Display/Note table, tab per example |

## Adding a programme

Append to `data/programmes.json`. Required fields per `Programme` type in `lib/programmes.ts`. Tokenise the code by splitting on every separator (`:`, operator, paren, variable). Each token = one cell in TokenGrid.

For special tokens not in `data/programme-tokens.json`, add entry there: `{ "keys": "SHIFT X", "label": "what it does" }`.

## Constraints

- Local JSON only — no Sanity, no auth, no live eval.
- Step-by-step verification (`displays` + `examples`) — no JS formula runner.
- Sources credited per programme. Public-domain formulas only.
- Full page loads between hub ↔ detail (AdSense).

## Tested

- `npx tsc --noEmit` clean.
- Light/dark/blue themes via `--color-*` CSS vars.
- iPad/mobile: TokenGrid wraps 4/6/9 cols.
