# Blog Post AI Writing Guide

Guide for AI to write blog posts that paste directly into the Sanity Studio Markdown tab and convert cleanly to Portable Text blocks.

---

## Output format

Write raw Markdown. No frontmatter. No YAML. No code fences wrapping the whole post.

Paste into Sanity Studio → Body field → "Markdown" tab → Convert to Blocks.

---

## Standard Markdown (supported natively)

```
# H1 heading
## H2 heading
### H3 heading
#### H4 heading

Normal paragraph text. **Bold**, *italic*, `inline code`, ~~strikethrough~~.

[Link text](https://example.com)

- Bullet list item
- Another item

1. Ordered list item
2. Another item

> Blockquote text here.

---  ← horizontal rule

| Col A | Col B | Col C |
|-------|-------|-------|
| Row 1 | val   | val   |
```

Code blocks with language tag:

````
```bash
npm install
```

```python
print("hello")
```
````

Supported languages: `tsx`, `javascript`, `typescript`, `html`, `css`, `json`, `bash`, `python`, `go`, `sql`

---

## Custom Shortcodes

For elements that can't be expressed in standard Markdown, use `::shortcode | pipe | separated` syntax on its own line (blank line above and below).

### Alert

```
::alert | variant | title | description
```

- `variant`: `info` / `success` / `warning` / `destructive`
- `title`: optional — leave empty with `| |` to skip
- `description`: required — use `\n` for line breaks within description

Examples:

```
::alert | info | Note | This is an informational note.

::alert | warning | Watch out | This approach only works in DSE 2019 onwards.

::alert | success | | You passed! No title needed.

::alert | destructive | Error | Do not mix these two formulas.
```

### Button

```
::button | Label Text | /url-or-full-url | variant
```

- `variant`: `default` / `secondary` / `outline` / `success` / `warning` / `info` / `danger` / `linkout`

Examples:

```
::button | Download Paper | /pastpaper/math-2023 | default

::button | Official HKEAA Site | https://www.hkeaa.edu.hk | linkout

::button | Try the Calculator | /tools/calculator | secondary
```

### YouTube Embed

```
::youtube | url | optional caption
```

Examples:

```
::youtube | https://youtu.be/dQw4w9WgXcQ

::youtube | https://www.youtube.com/watch?v=abc123 | How to solve Paper 1 Q7
```

### Image placeholder

```
::image | alt text | optional caption
```

Creates an image block in the editor with alt/caption pre-filled but no asset — editor must upload the actual image. Renders nothing on the live blog until an image is uploaded.

### Separator

```
::separator
```

Inserts a visual divider block.

### Math (LaTeX)

Use standard LaTeX delimiters. Rendered server-side via KaTeX. Posts without math don't load KaTeX CSS.

Inline (mid-sentence):

```
The mass-energy relation is $E = mc^2$ and it changed physics.
Solve $ax^2 + bx + c = 0$ using the quadratic formula.
```

Block (own line, equation centered):

```
$$
\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
$$
```

Use for math, physics formulas, and chemistry notation. Anything KaTeX supports works (fractions, integrals, matrices, Greek letters, etc).

Rules:
- Inline math must stay on one line (no line breaks between `$` and `$`).
- Block math `$$...$$` can span multiple lines and must have blank lines above and below.
- Escape a literal dollar sign with `\$`.
- Don't put `$...$` inside code blocks — it won't be parsed.

In Studio (Rich Editor tab): use the ∑ icon in the toolbar to insert inline or block math.

---

## Full example post

```markdown
## Why DSE Math Paper 1 is Harder Than You Think

Many students underestimate the reasoning required in Paper 1. This post breaks down three common mistakes.

::alert | warning | Exam scope | This applies to the 2019–2025 syllabus only. Check HKEAA for updates.

### Mistake 1 — Skipping the "show that" steps

In "show that" questions, you must write every step. Partial marks are given per line of working.

> Examiners award marks for correct method, not just the final answer.

### Mistake 2 — Wrong unit conversion

Always check whether the question uses cm, m, or km.

::alert | destructive | Common error | Mixing units costs roughly 2–3 marks per question on average.

### Formula sheet reference

```

| Formula | When to use |
|---------|-------------|
| A = πr² | Area of circle |
| V = lwh | Volume of cuboid |

```

### Video walkthrough

::youtube | https://youtu.be/abc123 | Full Paper 1 Q12 worked solution

### Practice paper

::button | Download 2023 Paper 1 | /pastpaper/math-2023 | default

::separator

*Good luck on your DSE. You've got this.*
```

---

## What NOT to do

- Don't wrap the whole post in a code fence
- Don't use `---` frontmatter / YAML blocks
- Do not add --- (separator) BEFORE a heading, since our current styling already has a separator line above each H2 heading. Only add `---` if you want an extra separator line between sections.
- Don't use `![image](url)` — images must be uploaded directly in the Studio, not linked by URL
- Don't use HTML tags — they won't convert
- Shortcodes must be on their own paragraph (blank line above and below), otherwise they parse as plain text

---

## Sanity field reference (for context only)

| Field | Required | Notes |
|-------|----------|-------|
| title | yes | shown in card and `<title>` |
| slug | yes | auto-generated from title, can edit |
| excerpt | no | shown in directory card preview |
| body | yes | paste MD here |
| coverImage | no | used for og:image and card thumbnail |
| heroImage | no | shown at top of post only |
| category | no | pick from shared list |
| tags | no | free-form string tags |
| publishedAt | no | leave empty = use creation date |
| readingTime | no | minutes, integer |
| showToc | no | generates ToC from H1–H4 headings |
| seoTitle | no | falls back to title |
| seoDescription | no | falls back to excerpt |
| noIndex | no | hides from Google |
| loadAds | no | default true, set false for ad-free posts |
