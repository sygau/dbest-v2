# Guide: Adding New Past Papers to DSE Best

This guide provides step-by-step instructions for adding new past papers to the DSE Best application. Follow this guide carefully to avoid common mistakes.

## 📋 Prerequisites

Before starting, ensure you have:
- The new PDF files ready
- The correct paper IDs and filenames
- Access to modify JSON configuration files and TSX components

## 🔧 Step 1: Update JSON Configuration Files

### File Location
All configuration files are located in `public/config/` directory.

### Files to Update
- `math.json` - Mathematics papers
- `chinese.json` - Chinese Language papers  
- `english.json` - English Language papers
- `chemistry.json` - Chemistry papers
- `biology.json` - Biology papers
- `physics.json` - Physics papers
- `history.json` - History papers
- `geography.json` - Geography papers
- `economics.json` - Economics papers
- `ict.json` - ICT papers
- `bafs.json` - BAFS papers
- `m1.json` - M1 papers
- `m2.json` - M2 papers
- `ths.json` - Tourism and Hospitality Studies papers

### JSON Format
```json
{
  "2024_P1": "dse_2024_eng_p1.pdf",
  "2024_P2": "dse_2024_eng_p2.pdf",
  "2024_ans": "dse_2024_eng_ans.pdf"
}
```

### Important Notes
- **Paper IDs must be unique** within each subject
- **Filenames must match exactly** the actual PDF files
- **Follow existing naming conventions** for consistency
- **For bilingual subjects** (Chemistry, Biology), use `_eng` or `_chi` suffixes

## 🎨 Step 2: Update Year Pages (`[year].tsx`)

### Files to Update
- `pages/math/[year].tsx`
- `pages/chinese/[year].tsx`
- `pages/english/[year].tsx`
- `pages/chemistry/[year].tsx`
- `pages/biology/[year].tsx`
- `pages/physics/[year].tsx`
- `pages/history/[year].tsx`
- `pages/geography/[year].tsx`
- `pages/economics/[year].tsx`
- `pages/ict/[year].tsx`
- `pages/bafs/[year].tsx`
- `pages/m1/[year].tsx`
- `pages/m2/[year].tsx`
- `pages/ths/[year].tsx`

### Required Changes

#### 1. Update `getStaticPaths`
```typescript
export async function getStaticPaths() {
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'];
  // Add new year to the beginning of the array
}
```

#### 2. Update Year Navigation Array
```typescript
const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'];
// Add new year to the beginning of the array
```

#### 3. Update CTA Text
```typescript
// Change from "2012-2023" to "2012-2024"
<p className="text-center mb-4">
  <strong>Available Years: 2012-2024</strong>
</p>
```

## 📄 Step 3: Update Index Pages (`index.tsx`)

### Files to Update
- `pages/math/index.tsx`
- `pages/chinese/index.tsx`
- `pages/english/index.tsx`
- `pages/chemistry/index.tsx`
- `pages/biology/index.tsx`
- `pages/physics/index.tsx`
- `pages/history/index.tsx`
- `pages/geography/index.tsx`
- `pages/economics/index.tsx`
- `pages/ict/index.tsx`
- `pages/ths/index.tsx`
- `pages/bafs/index.tsx`
- `pages/m1/index.tsx`
- `pages/m2/index.tsx`

### Required Changes

#### 1. Add New Year Section
**CRITICAL: Add the new year section BEFORE the previous year**

```tsx
{/* 2024 */}
<h2 style={{ textAlign: "center" }}>2024</h2>
<br />
<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    <div className="col">
        <div className="card h-100 d-flex flex-column">
            <div className="card-body">
                <h5 className="card-title">Paper 1</h5>
                <p className="card-text">2024 Paper 1</p>
            </div>
            <div className="card-footer bg-transparent border-0">
                <a
                    href="#"
                    className="btn btn-info px-4 d-inline-flex gap-2"
                    data-paper-id="2024_P1"
                >
                    <BiDownload style={{ fontSize: 22 }} />
                    Download
                </a>
            </div>
        </div>
    </div>
</div>
<hr className="my-4" />

{/* 2023 */}
<h2 style={{ textAlign: "center" }}>2023</h2>
```

#### 2. Paper Card Structure
```tsx
<div className="col">
    <div className="card h-100 d-flex flex-column">
        <div className="card-body">
            <h5 className="card-title">[Paper Title]</h5>
            <p className="card-text">[Year] [Paper Description]</p>
        </div>
        <div className="card-footer bg-transparent border-0">
            <a
                href="#"
                className="btn btn-info px-4 d-inline-flex gap-2"
                data-paper-id="[PAPER_ID]"
            >
                <BiDownload style={{ fontSize: 22 }} />
                [Download Text]
            </a>
        </div>
    </div>
</div>
```

## ⚠️ Common Mistakes to Avoid

### 1. **Wrong Chronological Order**
- ❌ **NEVER** add new year after previous year
- ✅ **ALWAYS** add new year before previous year
- Example: 2024 should come before 2023, not after

### 2. **Incorrect Paper IDs**
- ❌ **NEVER** use paper IDs that don't match JSON config
- ✅ **ALWAYS** ensure `data-paper-id` matches JSON keys exactly

### 3. **Missing Year Updates**
- ❌ **NEVER** forget to update `getStaticPaths` and year arrays
- ✅ **ALWAYS** update both `getStaticPaths` and year navigation arrays

### 4. **Inconsistent Naming**
- ❌ **NEVER** use inconsistent naming conventions
- ✅ **ALWAYS** follow existing patterns in the subject

### 5. **Missing CTA Updates**
- ❌ **NEVER** forget to update "Available Years" text
- ✅ **ALWAYS** update from "2012-2023" to "2012-2024"

## 📝 Subject-Specific Guidelines

### Mathematics
- **English-only papers**
- Paper IDs: `2024_P1`, `2024_P2`
- No language suffixes needed

### Chinese Language
- **Chinese papers only**
- Paper IDs: `2024_P1`, `2024_P2`
- Use Chinese titles: "卷一 閱讀", "卷二 寫作"

### English Language
- **English papers only**
- Paper IDs: `2024_P1`, `2024_P2`, `2024_P3`, `2024_ans`
- Use descriptive titles: "Paper 1 Reading", "Paper 2 Writing"

### Chemistry & Biology
- **Bilingual papers** (Chinese and English)
- Paper IDs: `2024_p1_eng`, `2024_p2_eng`, `2024_ans_eng`
- Include both Chinese and English sections

## 🔍 Verification Checklist

After making changes, verify:

- [ ] JSON configuration files updated with correct paper IDs
- [ ] Year pages (`[year].tsx`) updated with new year in `getStaticPaths`
- [ ] Year navigation arrays include new year
- [ ] CTA text updated to show new year range
- [ ] Index pages (`index.tsx`) have new year section **BEFORE** previous year
- [ ] All `data-paper-id` attributes match JSON configuration
- [ ] Paper titles and descriptions are appropriate for the subject
- [ ] Download buttons have correct text (English/Chinese as appropriate)

## 📁 File Structure

```
public/
├── config/
│   ├── math.json (updated)
│   ├── chinese.json (updated)
│   ├── english.json (updated)
│   ├── chemistry.json (updated)
│   ├── biology.json (updated)
│   └── [other subjects].json (updated)
└── [PDF files in appropriate subject folders]

pages/
├── math/
│   ├── [year].tsx (updated)
│   └── index.tsx (updated)
├── chinese/
│   ├── [year].tsx (updated)
│   └── index.tsx (updated)
├── english/
│   ├── [year].tsx (updated)
│   └── index.tsx (updated)
├── chemistry/
│   ├── [year].tsx (updated)
│   └── index.tsx (updated)
├── biology/
│   ├── [year].tsx (updated)
│   └── index.tsx (updated)
└── [other subjects]/
    ├── [year].tsx (updated)
    └── index.tsx (updated)
```

## 🚀 Quick Reference

### For New Year 2025:
1. Add `"2025_P1": "dse_2025_eng_p1.pdf"` to JSON files
2. Add `'2025'` to beginning of years arrays in `[year].tsx`
3. Add 2025 section **BEFORE** 2024 section in `index.tsx`
4. Update CTA text to "2012-2025"

### For New Papers in Existing Year:
1. Add paper ID to JSON configuration
2. Add paper card to existing year section in `index.tsx`
3. Ensure `data-paper-id` matches JSON key exactly

---

**Remember: Always test the changes and verify that all download links work correctly before completing the task.** 