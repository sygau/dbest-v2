# Structured Data & FAQ Chaos Investigation

**Status**: Investigation Complete. Ready for refactor plan.  
**Date**: 2026-04-30  
**Scope**: 15+ distinct pages examined

---

## TL;DR - The Problems

1. **God File Problem**: `utils/structuredData.ts` is 1000+ lines with 15+ generate* functions, all FAQ data, all subject data baked in
2. **No Single Source of Truth**: Pages use different patterns (some use buildFAQSchema, some duplicate, some have no FAQ at all)
3. **FAQ Mess**: 
   - Subject FAQs (17 subjects) = ~600 lines of duplicate data hardcoded into structuredData.ts
   - Page FAQs (homepage, countdown, blog, etc.) = another ~400 lines
   - Some pages missing FAQs entirely (pomodoro, translator)
   - `faqSchema.ts` exists (clean, reusable) but hardly used
4. **Inconsistent Patterns Across Pages**: Subject pages, special pages, utility pages all follow different import/usage patterns

---

## Files Involved

### The Main Culprits

| File | Size | Problem | Usage |
|------|------|---------|-------|
| `utils/structuredData.ts` | 1000+ lines | God file—FAQs, subject data, 15+ generators all tangled | 32+ imports across pages |
| `utils/faqSchema.ts` | 12 lines | Clean & reusable but **mostly ignored** | Rarely used |
| `utils/12pStructuredData.ts` | ~150 lines | Alternative mini-version—shows a better approach | 2 imports (12p pages only) |

### What Should Exist But Doesn't
- Centralized FAQ file(s) with clear structure
- Reusable JSON-LD component system
- Consistent page metadata pattern

---

## Current Patterns (15+ Pages Analyzed)

### Pattern 1: Subject Pages (17 pages)
**Files**: chinese/, english/, math/, physics/, chemistry/, biology/, ict/, m1/, m2/, geography/, history/, chinese-history/, economics/, bafs/, citizen/, ths/, cutoff/

```typescript
// Pattern:
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData'

const structuredData = generateSubjectStructuredData(subjectKey)
const faqData = generateSubjectFAQStructuredData(subjectKey)

<PageSEO jsonLd={[structuredData, faqData].filter(Boolean) as object[]} />
```

**Problem**: FAQ data for ALL subjects lives in structuredData.ts. Changing one FAQ requires digging through 1000-line file.

---

### Pattern 2: Special Pages with Dynamic Data (6 pages)
**Files**: blog/, countdown/, timer/, chat/, etc.

```typescript
// Variant A (countdown):
const countdownJsonLd = generateCountdownStructuredData()
const countdownFaqJsonLd = generatePageFAQStructuredData('countdown')

<PageSEO jsonLd={countdownFaqJsonLd ? [countdownJsonLd, countdownFaqJsonLd] : [countdownJsonLd]} />

// Variant B (timer):
const timerJsonLd = useMemo(() => generateTimerStructuredData(), [])
const timerFaqJsonLd = useMemo(() => generatePageFAQStructuredData('timer'), [])

// Variant C (blog):
<PageSEO jsonLd={[generateBlogStructuredData(posts), generatePageFAQStructuredData('blog')].filter(Boolean)} />
```

**Problem**: 3 different ways of doing the same thing. No consistency.

---

### Pattern 3: Pages Without FAQ (3 pages)
**Files**: pomodoro.tsx, translator.tsx

```typescript
// pomodoro:
const pomodoroJsonLd = generatePomodoroStructuredData()
// ^^^ NO FAQ at all!

<PageSEO jsonLd={pomodoroJsonLd} />
```

**Problem**: Why do some pages have FAQ and others don't? Should be explicit.

---

### Pattern 4: Pages Without Any JSON-LD (4+ pages)
**Files**: about.tsx, contact.tsx, disclaimer.tsx, privacy-policy.tsx

```typescript
<PageSEO title="..." description="..." />
// NO jsonLd prop at all
```

**Problem**: Missing opportunity for structured data. No clear policy.

---

## FAQ Data Explosion

### In `structuredData.ts`:
- **Subject FAQs** (subjectFAQs object): 17 subjects × ~5 FAQs each = ~85 Q&A pairs (~600 lines)
- **Page FAQs** (pageFAQs object): 5 pages × ~4 FAQs each = ~20 Q&A pairs (~400 lines)
- **Total**: ~1000 lines of FAQ data just sitting there

### The `buildFAQSchema` Function
```typescript
// In faqSchema.ts (clean!)
export function buildFAQSchema(faqs: FAQEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({ ... }))
  }
}
```
- **Status**: Exists, clean, reusable
- **Used**: Almost never
- **Why**: People don't know about it or didn't adopt it

---

## Inconsistencies by Category

### JSON-LD Array Patterns
```typescript
// Pattern A (most pages):
jsonLd={[structuredData, faqData].filter(Boolean) as object[]}

// Pattern B (conditional):
jsonLd={countdownFaqJsonLd ? [countdownJsonLd, countdownFaqJsonLd] : [countdownJsonLd]}

// Pattern C (dynamic generation):
jsonLd={[generateBlogStructuredData(posts), generatePageFAQStructuredData('blog')]}
```

### Memoization
- Some pages use `useMemo()` (timer, translator, pomodoro)
- Most pages don't
- No clear rule

### FAQ Lookup
```typescript
// generatePageFAQStructuredData looks up key in pageFAQs:
const pageFAQs: Record<string, Array<{question: string, answer: string}>> = {
  homepage: [...],
  countdown: [...],
  countdown2027: [...],
  blog: [...],
  // ... etc
}

// BUT what if you query a key that doesn't exist? Silently returns undefined/null
```

---

## Subject Pages in Detail

### Subject-Specific JSON-LD Structure
All 17 subject pages (chinese, english, math, etc.) follow identical pattern:

```typescript
// generateSubjectStructuredData('chinese') returns:
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "DSE Chinese Language Past Papers 歷屆試題",
  "description": "...",
  "url": "https://dse.best/chinese",
  "inLanguage": ["zh-HK", "en-HK"],
  "isPartOf": { ... },
  "mainEntity": { 
    "@type": "EducationalResource",
    "name": "...",
    "description": "...",
    // ... NESTED structure
  }
}

// generateSubjectFAQStructuredData('chinese') returns:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { ... } },
    // ... 5 questions for each subject
  ]
}
```

**Issue**: The main entity structure is **nested deep**. If you want to change how subjects display JSON-LD, edit 1000-line file.

---

## The 12p Alternative (Shows Better Pattern)

**File**: `utils/12pStructuredData.ts` (~150 lines)

```typescript
export function generate12pStructuredData() { ... }
export function generate12pFAQStructuredData() { ... }
export function generate12pBreadcrumbStructuredData(page: 'index' | 'study' | 'quiz') { ... }
```

- **Pros**: Separate file, clear purpose, easier to maintain
- **Cons**: Still using same generator pattern; wasn't applied to other pages

---

## What's Missing (Your Vision)

Based on your requirements, here's what a refactored system should have:

### A. JSON-LD Component-Based System
```typescript
// Instead of:
const structuredData = generateSubjectStructuredData('chinese')
<PageSEO jsonLd={structuredData} />

// Do:
<PageSEO jsonLd={{
  type: 'WebPage',
  title: 'DSE Chinese Language Past Papers',
  description: '...',
  url: 'https://dse.best/chinese',
  mainEntity: {
    type: 'EducationalResource',
    // ... params only
  }
}} />
```

### B. Centralized FAQ System
Option 1: One `faqs.json` or `faqs.ts` file with all FAQs
```typescript
export const faqs = {
  subjects: {
    chinese: [{ q: '...', a: '...' }, ...],
    english: [{ q: '...', a: '...' }, ...],
    // ...
  },
  pages: {
    homepage: [...],
    countdown: [...],
    // ...
  }
}
```

Option 2: Per-subject FAQ files
```
data/faqs/
  ├── chinese.json
  ├── english.json
  ├── math.json
  └── ... (subject-specific)
```

### C. Clear Policy
- Which pages get FAQs? (Define it)
- Which pages get JSON-LD? (Define it)
- Standard structure for all JSON-LD objects

---

## Impact Summary

| Metric | Current | After Refactor |
|--------|---------|-----------------|
| Files managing JSON-LD | 3 (structuredData, 12pStructuredData, faqSchema) | 1 (component-based + FAQ data) |
| Lines in structuredData.ts | 1000+ | ~200 (just logic, no data) |
| FAQ data in code | Inline in structuredData.ts | Separate JSON/TS files |
| Pattern consistency | 4 different patterns | 1 pattern across all pages |
| Time to add new FAQ | 10 mins (find right spot in 1000-line file) | 1 min (add to JSON) |

---

## Pages Breakdown

### ✅ Subject Pages (17)
```
chinese/, english/, math/, physics/, chemistry/, biology/,
ict/, m1/, m2/, geography/, history/, chinese-history/,
economics/, bafs/, citizen/, ths/, cutoff/
```
- All use: generateSubjectStructuredData() + generateSubjectFAQStructuredData()
- All follow same pattern
- **Refactor needed**: Move FAQ data out, keep function light

### 🔄 Special Pages (6)
```
blog/, countdown/, countdown/2027/, timer/, chat/
```
- Blog: Dynamic post data
- Countdown: Time-based
- Timer: Similar to countdown
- Chat: App-like
- **Refactor needed**: Standardize pattern (some use useMemo, some don't)

### ❌ Missing FAQ (3)
```
pomodoro/, translator/
```
- Should they have FAQs? (User decision)
- If yes: add to FAQ data file

### ❌ No JSON-LD (4+)
```
about/, contact/, disclaimer/, privacy-policy/,
individual-response/
```
- Should they have structured data? (User decision)

### 🟡 Separate System (2)
```
12p/index/, 12p/quiz/, 12p/study/
```
- Use own 12pStructuredData.ts
- **Refactor needed**: Could adopt main system if main system is good

---

## Next Steps (Ready for Planning Phase)

1. **Decision 1**: All FAQs in one file vs. per-subject?
   - Pro (one file): Easier to find, central management
   - Pro (per-subject): Lazy-load, smaller initial file

2. **Decision 2**: Component API for JSON-LD or keep functions?
   - Component: More flexible, easier to pass params
   - Functions: Current approach, but messy

3. **Decision 3**: Which pages MUST have FAQs?
   - All subject pages? (Yes, probably)
   - Special pages like pomodoro? (Optional, decide per page)
   - Utility pages like about? (Probably not)

4. **Decision 4**: Merge 12pStructuredData into main system?
   - Recommended: Yes, reduce fragmentation

---

## Confidence Level
**HIGH** - Reviewed import statements, function calls, and FAQ data in 32+ usages across 15+ distinct pages.
