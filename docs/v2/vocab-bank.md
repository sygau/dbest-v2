# Vocab Bank (`/vocab`)

DSE English Writing resource bank. 3 levels: home → section → set. Steam-library style, JSON-driven, flexible schema (vocab / idiom / sentence-pattern / opening / template).

## Routes

- `/vocab` — shelves of all sections + per-section preview shelves + recent
- `/vocab/[section]` — section hero + grid of sets
- `/vocab/[section]/[set]` — set hero + flip cards OR styled table (`#table` hash)
- `/vocab/bookmarks` — bookmarked sets + entries, `noindex`

## File layout

```
data/vocab/
  sections.json                  registry: { sections: [slug, ...] }
  <section-slug>/
    index.json                   SectionMeta
    <set-slug>.json              SetFile
```

Code: `lib/vocab.ts` (types + loaders), `components/vocab/*`, `pages/vocab/*`.

## Add a new section

1. Create folder `data/vocab/<slug>/`.
2. Add `index.json`:
```json
{
  "slug": "my-section",
  "nameZh": "中文名",
  "nameEn": "English Name",
  "tagline": "短描述 shelf 副標題",
  "description": "section page 嘅 intro。",
  "icon": "LuNewspaper",
  "accent": "#549ee8",
  "capsule": "/vocab/my-section/_capsule.jpg",
  "hero": "/vocab/my-section/_hero.jpg",
  "defaultContentKind": "vocab",
  "sets": ["set-one", "set-two"]
}
```
3. Append `"my-section"` to `data/vocab/sections.json` → `sections` array (order = home shelf order).
4. Create each set file listed in `sets`.

`icon` = any `react-icons/lu` export name (e.g. `LuNewspaper`, `LuType`, `LuQuote`, `LuTrendingUp`, `LuFileText`, `LuMoveHorizontal`). Fallback: `LuBookOpen`.

`accent` = hex used for capsule glow, hero gradient, fallback art.

`capsule` / `hero` images optional. Drop into `public/vocab/<section>/` and reference with leading `/vocab/...`.

## Add a new set

Create `data/vocab/<section>/<set-slug>.json`:

```json
{
  "slug": "my-set",
  "nameZh": "中文名",
  "nameEn": "English Name",
  "description": "short description shown in set hero.",
  "difficulty": "easy|medium|hard",
  "contentKind": "vocab",
  "thumbnail": "/vocab/<section>/<set>.jpg",
  "backdrop": "/vocab/<section>/<set>-backdrop.jpg",
  "tags": ["topic1", "topic2"],
  "entries": []
}
```

Then add the set's slug to the parent section's `index.json` → `sets` array (order matters; first appears first).

Empty `entries: []` is fine — page renders with helpful "未有內容" placeholder.

## Add entries (vocab)

Inside a set file's `entries`:

```json
{
  "id": "my-set-001",
  "kind": "vocab",
  "term": "financial inclusion",
  "pos": "noun phrase",
  "meaningZh": "金融普及",
  "difficulty": 2,
  "example": "Cashless apps can advance financial inclusion for the unbanked.",
  "synonyms": ["economic inclusion", "banking access", "financial access"],
  "audio": { "lang": "en-US" },
  "dictionary": { "provider": "cambridge" }
}
```

Required: `id`, `kind`, `term`, `pos`, `meaningZh`. Everything else optional.

`id` must be unique site-wide (used as bookmark key). Convention: `<setslug>-001`.

`pos` (vocab only): one of `noun phrase | verb | adjective | idiom | phrase | noun | adverb`.

`difficulty`: `1 | 2 | 3` → dots shown bottom-right of card.

`audio.lang`: `'en-US'` (default) or `'en-GB'`. `audio.word` overrides the TTS string if different from `term` (e.g. strip the `to` from `to marginalise`).

`dictionary.provider`: `'cambridge'` (default) | `'oxford'` | `'merriam-webster'` | `'collins'` | `'custom'`. With `'custom'`, provide `dictionary.url` directly.

## Add entries (other kinds)

Schema is flexible. Same set can mix kinds if you want — each entry declares its own `kind`.

### Idiom
```json
{
  "id": "idioms-001",
  "kind": "idiom",
  "idiom": "a blessing in disguise",
  "meaningZh": "因禍得福",
  "example": "Losing that job turned out to be a blessing in disguise.",
  "literalZh": "偽裝嘅祝福",
  "origin": "18th-century English proverb."
}
```

### Sentence pattern
```json
{
  "id": "emphasis-001",
  "kind": "sentence-pattern",
  "pattern": "It is ... that ...",
  "slots": ["emphasised element", "rest of clause"],
  "meaningZh": "強調某個句子成分",
  "example": "It is the government that should take responsibility."
}
```

### Opening / closing / transition snippet
```json
{
  "id": "openings-001",
  "kind": "opening",
  "snippet": "In an era marked by ...",
  "meaningZh": "「喺一個 ... 嘅時代」— 開場式",
  "bestFor": ["argumentative", "speech"],
  "example": "In an era marked by rapid technological change, ..."
}
```

### Template (longer block)
```json
{
  "id": "complaint-letter-001",
  "kind": "template",
  "title": "Complaint letter opening",
  "meaningZh": "投訴信開頭模板",
  "body": "I am writing to express my dissatisfaction with ... which I purchased on ..."
}
```

## Artwork

Drop images in `public/vocab/<section>/`. Suggested:
- `_capsule.jpg` — square-ish 220×280, for section home capsule
- `_hero.jpg` — wide 1600×500, for section hero
- `<set-slug>.jpg` — 16:9 (e.g. 640×360), for set capsule
- `<set-slug>-backdrop.jpg` — wider for set hero

Use plain `<img>` / `background-image`. Site is on Cloudflare Workers via OpenNext — no Next.js Image Optimization. Compress before commit.

## Conventions

- URL slugs: English, kebab-case (`youth-mental-health`).
- Names: `nameZh` primary (Traditional Chinese), `nameEn` secondary.
- Entry IDs: stable. Renaming breaks user bookmarks.
- Empty arrays OK — page handles gracefully.
- No need to restart dev server when editing JSON (Next picks it up on save, though hard refresh may be needed for `getStaticProps` data).

## How it renders

- Front of flip card: headword + speaker (TTS) + example sentence (italic) + kind/POS badge + difficulty dots + bookmark
- Back: Chinese meaning + example + collocation pills + dictionary link + notes
- Table: custom styled grid, click row → inline expand
- Bookmark state: `localStorage` keys `vocab-bookmarks-sets` + `vocab-bookmarks-entries`
- Recent: `vocab-recent`, last 8 viewed sets

## Adding `/vocab` to the sidebar (later)

When ready, edit `components/tw/Sidebar.tsx` → add a `NavItem` under the Resources section pointing to `/vocab` with a `Lu*` icon.
