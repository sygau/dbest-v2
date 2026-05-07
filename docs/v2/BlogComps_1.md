# BlogComps_1 — Custom Portable Text Block Types

4 custom block types added to the Sanity blog (PortableTextRenderer + post schema).

---

## What was built

### 1. Separator
Schema: `{ type: 'separator' }` in `body.of[]`. Zero-config object type.
Renderer: calls `<Separator className="my-6" />` from `components/ui/Separator.tsx`.
Studio: requires a `separator` schema type registered in the Studio (see below).

### 2. Rich Table
Plugin: `sanity-plugin-rich-table` (chosen over `@sanity/table` for rich PT cells, row/col menus, TS types).
Schema: `{ type: 'richTableBlock' }` in `body.of[]`. Type provided by the plugin.
Renderer: `components/blog/RichTableRenderer.tsx` — splits rows by `isHeader`, maps to `Table/TableHeader/TableBody/TableRow/TableHead/TableCell` from `components/ui/Table.tsx`. Cell content renders via nested `<PortableText>` with a minimal link-only components map.

### 3. Blog Button
Schema: inline `blogButton` object in `body.of[]`. Fields: `label` (string), `href` (url), `variant` (dropdown: default/secondary/outline/success/warning/info/danger/linkout).
Renderer: calls `<ButtonAnchor>` from `components/ui/ButtonAnchor.tsx`. `linkout` variant resolves to `info` color + `<LuExternalLink>` icon on right.
New component `ButtonAnchor` — mirrors `Button.tsx` but renders `<a>` tag. `default` variant is sky blue (independent from Button.tsx's violet default).

### 4. Code Block
Plugin: `@sanity/code-input`. Fields: code + language dropdown + optional filename.
Schema: `{ type: 'code', options: { withFilename: true, languageAlternatives: [...] } }` — 10 languages (tsx, js, ts, html, css, json, bash, python, go, sql).
Renderer: calls `<CodeBlock code language filename />` from `components/ui/CodeBlock.tsx` (prism-react-renderer, nightOwl theme). Replaces old `<pre><code>` fallback.

---

## Files changed

- `components/blog/PortableTextRenderer.tsx` — added 4 type handlers
- `components/ui/ButtonAnchor.tsx` — new, `<a>` version of Button
- `components/blog/RichTableRenderer.tsx` — new, rich table renderer
- `blogRebuild/SanitySchema_ReadNReferenceOnly/post.ts` — added 4 types to `body.of[]`
- `pages/redesign-4.tsx` — added ButtonAnchor demo section

---

## Sanity Studio setup required (separate Studio project)

```bash
npm install @sanity/code-input sanity-plugin-rich-table
```

In `sanity.config.ts`:
```ts
import { codeInput } from '@sanity/code-input'
import { richTablePlugin } from 'sanity-plugin-rich-table'
plugins: [codeInput(), richTablePlugin({})]
```

Register `separator` schema type:
```ts
defineType({ name: 'separator', title: 'Separator', type: 'object', fields: [],
  preview: { prepare: () => ({ title: '— Separator —' }) } })
```

Copy updated `body.of[]` from `blogRebuild/SanitySchema_ReadNReferenceOnly/post.ts` into the Studio's `post.ts`.

---

## Notes / gotchas

- `RichTableRenderer` assumes `row.isHeader` boolean from `sanity-plugin-rich-table`. Verify against plugin's TS types (`RichTableRowType`) after Studio install — adjust if field name differs.
- `ButtonAnchor` adds `no-underline` base class — blog prose CSS may apply `a { text-decoration: underline }` globally. If specificity overrides, use `!no-underline`.
- `code` type name collision: `@sanity/code-input` registers its type as `code`. The old renderer already had a `types.code` handler — it's been replaced. No schema conflict.
