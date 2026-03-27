# Issue: SEO & Structured Data Fragmentation

## Summary
JSON-LD structured data and SEO metadata are scattered across multiple files with hardcoded content, making updates tedious and error-prone.

## Affected Files

| File | Lines | Contents |
|------|-------|----------|
| `utils/structuredData.ts` | 1449 | Subject data, FAQs (500+ Q&As), JSON-LD generators |
| `utils/12pStructuredData.ts` | 112 | 12P-specific JSON-LD |
| `utils/12pMetadata.ts` | 38 | 12P page metadata |
| `utils/pageMetadata.ts` | 372 | All page metadata (auto-generated) |

## Problems

### 1. Hardcoded FAQ Arrays
```ts
// utils/structuredData.ts lines 227-546
const subjectFAQs: Record<string, Array<{question: string, answer: string}>> = {
  chinese: [
    { question: "DSE 中文卷一...", answer: "..." },
    // 5 questions per subject × 17 subjects = 85+ FAQs
  ],
  // ...
};
```
- No remote editing capability
- Changes require code deployment
- No visibility into total FAQ inventory

### 2. Duplicated Subject Data
Subject info exists in multiple places:
- `subjectData` in `structuredData.ts` (names, descriptions, URLs)
- `subjectMetadata` in `pageMetadata.ts` (titles, OG tags)
- Individual page components (icons, accent colors)

### 3. Page-Specific FAQs Scattered
```ts
// pages/timer.tsx
const timerFaqs = [{ id: 'f1', question: '...', answer: '...' }];

// pages/individual-response.tsx
const FAQS = [{ id: 'f1', question: '...', answer: '...' }];

// pages/index.tsx
const homepageFAQs = [{ id: 'faq1', question: '...', answer: '...' }];
```
- No centralized registry
- Inconsistent ID formats
- Hard to audit for duplicates/gaps

### 4. Repetitive `<Head>` Blocks
Every page manually constructs 10-15 meta tags:
```tsx
<Head>
  <title>{metadata?.title}</title>
  <meta name="description" content={metadata?.description} />
  <meta name="robots" content={metadata?.robots} />
  <meta property="og:title" content={metadata?.ogTitle} />
  <meta property="og:description" content={metadata?.ogDescription} />
  <meta property="og:image" content={metadata?.ogImage} />
  <meta property="og:url" content={metadata?.ogUrl} />
  <meta property="og:type" content={metadata?.ogType} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHomepageStructuredData()) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageFAQStructuredData('homepage')) }} />
</Head>
```

## Impact

1. **Maintenance overhead** — changing one FAQ requires finding the right file, rebuilding, deploying
2. **Build size** — all FAQ data bundled into page JS even if not displayed
3. **No remote editing** — non-technical team cannot update SEO content
4. **Audit difficulty** — no way to see all pages' SEO status at a glance
5. **Inconsistency** — easy to miss updating one metadata field across files

## Suggested Fix

### Step 1: Create PageHead Component
```tsx
// components/PageHead.tsx
interface PageHeadProps {
  metadata: PageMetadata;
  structuredData?: object[];
}

export function PageHead({ metadata, structuredData = [] }: PageHeadProps) {
  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {/* ... all meta tags */}
      {structuredData.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
    </Head>
  );
}
```

### Step 2: Centralize FAQs
Option A — JSON file:
```json
// data/seo/faqs.json
{
  "chinese": [
    { "q": "DSE 中文卷一...", "a": "..." }
  ]
}
```

Option B — Airtable (see `roadmap.md` for details):
- FAQs table with page reference
- Fetch at build time via `getStaticProps`

### Step 3: Typed JSON-LD Builders
```ts
// utils/seo/structured-data.ts
export function buildFAQSchema(faqs: FAQ[]): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };
}
```

### Step 4: Single Metadata Source
```ts
// utils/seo/metadata.ts
export function getPageMetadata(pageKey: string): PageMetadata {
  // Merge subject + main page metadata
  return { ...subjectMetadata[pageKey], ...mainPagesMetadata[pageKey] };
}
```

## Migration Path

1. Create `components/PageHead.tsx`
2. Refactor one page (e.g., homepage) to use it
3. Move FAQs to JSON or Airtable
4. Update remaining pages incrementally
5. Delete old fragmented exports

## Priority

**P0** — Blocks remote content management and creates ongoing maintenance burden.

## Related

- `docs/v2/MONOLITHIC_CLEANUP.md` — utils refactor plan
- `docs/v2/roadmap.md` — Airtable vs JSON decision
