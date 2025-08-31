# How to Add New Papers to DSE.BEST

This guide explains how to add new **DSE Year Papers** to DSE.BEST - the DSE past paper and resources website.

## When to Use This Guide

When users request:
- "please add <subject> <year> <paper> <language>" (e.g., "add physics 2025 paper 1 chinese")
- "please add the following files/pdfs" (followed by a list of PDF names)
- Any request to add new **DSE examination papers** (not topic-based or practice papers)

**Note:** Language specification is required for subjects with both Chinese and English papers. Some subjects have fixed languages:
- **Chinese History**: Always Chinese
- **Chinese Language**: Always Chinese  
- **English Language**: Always English
- ** M1/M2**: Always English
## Step-by-Step Process

### 1. Understand the Subject Structure

First, examine the subject's configuration file in `public/config/<subject>.json` to understand how papers are structured for that subject.

**Example subjects:**
- `public/config/math.json` - Mathematics papers
- `public/config/physics.json` - Physics papers  
- `public/config/chemistry.json` - Chemistry papers
- `public/config/ths.json` - Tourism and Hospitality Studies

### 2. Determine the File Naming Convention

Each subject follows a specific naming pattern. For example:

**Mathematics:**
- Papers: `pp_m0_eng_dse_<year>_p1.pdf`, `pp_m0_eng_dse_<year>_p2.pdf`
- Answers: `pp_m0_eng_dse_<year>_ans.pdf`

**Physics:**
- Papers: `pp_phy_chi_dse_<year>_p1a.pdf`, `pp_phy_chi_dse_<year>_p1b.pdf`, `pp_phy_chi_dse_<year>_p2.pdf`
- Answers: `pp_phy_chi_dse_<year>_ans.pdf`

### 3. Update the Configuration File

Add the new paper entry to the appropriate config file:

```json
{
  "2023_ans": "pp_m0_eng_dse_2023_ans.pdf",
  "2023_P1": "pp_m0_eng_dse_2023_p1.pdf",
  "2023_P2": "pp_m0_eng_dse_2023_p2.pdf"
}
```

**Key points:**
- Use the correct key format (e.g., `2023_ans`, `2023_P1`)
- Use the exact filename that will be uploaded to CDN
- Maintain alphabetical order if possible

### 4. Update the Main Subject Index Page

If the paper is for a specific year, update the main subject index page (`pages/<subject>/index.tsx`):

#### 4.1 Check if Year Section Exists

**If the year section doesn't exist, create it in the correct chronological order:**

**Year sections should be ordered from newest to oldest:**
- 2024 (first)
- 2023 (second)
- 2022 (third)
- etc.

#### 4.2 Year Section Structure

**Create the year section with this exact format:**

```tsx
{/* 2024 */}
<h2 style={{ textAlign: "center" }}>2024</h2>
<br />
<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {/* Download cards go here */}
</div>
<hr className="my-4" />
```

**Important formatting:**
- **Title**: `<h2 style={{ textAlign: "center" }}>YEAR</h2>`
- **Line break**: `<br />` after title
- **Divider**: `<hr className="my-4" />` after all download cards

#### 4.3 Download Card Structure

**For Mathematics (English papers):**
```tsx
<div className="col">
    <div className="card h-100 d-flex flex-column">
        <div className="card-body">
            <h5 className="card-title">Answers</h5>
            <p className="card-text">2023 Answer Booklet</p>
        </div>
        <div className="card-footer bg-transparent border-0">
            <a
                href="#"
                className="btn btn-info px-4 d-inline-flex gap-2"
                data-paper-id="2023_ans"
            >
                <BiDownload style={{ fontSize: 22 }} />
                Download
            </a>
        </div>
    </div>
</div>
```

**For Chinese papers (Physics, Chemistry, etc.):**
```tsx
<div className="col">
    <div className="card h-100 d-flex flex-column">
        <div className="card-body">
            <h5 className="card-title">試卷一</h5>
            <p className="card-text">2025 試卷一</p>
        </div>
        <div className="card-footer bg-transparent border-0">
            <a
                href="#"
                className="btn btn-info px-4 d-inline-flex gap-2"
                data-paper-id="2025_p1a_chi"
            >
                <BiDownload style={{ fontSize: 22 }} />
                下載
            </a>
        </div>
    </div>
</div>
```

**Important:** 
- **Button text**: Use `下載` instead of `Download`
- **Card title**: Use Chinese title (e.g., "試卷一", "答案")
- **Card description**: Use Chinese description (e.g., "2025 試卷一")
- **Follow existing format**: Check other Chinese cards in the same subject for exact title/description format

#### 4.4 Subject-Specific Layout Considerations

**Different subjects may have different paper ordering:**

**Mathematics (English only):**
- Paper 1, Paper 2, Answers

**Physics/Chemistry (Chinese papers first):**
- Chinese Paper 1A, Chinese Paper 1B, Chinese Paper 2, Chinese Answers
- English Paper 1A, English Paper 1B, English Paper 2, English Answers

**Tourism and Hospitality Studies (Chinese papers first):**
- Chinese Paper 1, Chinese Paper 2, Chinese Answers, Chinese Performance
- English Paper 1, English Paper 2, English Answers, English Performance

**Always check the existing layout of the subject to maintain consistency.**

#### 4.5 Language-Specific Requirements

**Chinese Papers:**
- **Button text**: Use `下載` instead of `Download`
- **Card titles**: Use Chinese titles (e.g., "試卷一", "答案")
- **Card descriptions**: Use Chinese descriptions (e.g., "2025 試卷一")
- **Format consistency**: Follow existing Chinese cards in the same subject for exact title/description format

**English Papers:**
- **Button text**: Use `Download`
- **Card titles**: Use English titles (e.g., "Paper 1", "Answers")
- **Card descriptions**: Use English descriptions (e.g., "2025 Paper 1")
- **Format consistency**: Follow existing English cards in the same subject for exact title/description format

**Fixed Language Subjects:**
- **Chinese History**: Always Chinese (use `下載`)
- **Chinese Language**: Always Chinese (use `下載`)
- **English Language**: Always English (use `Download`)

**⚠️ CRITICAL:** Always check existing cards in the same subject to match the exact title and description format used for that language and paper type.

### 5. Update Last Updated Information

Update `data/lastUpdated.json` to reflect the new content:

```json
{
  "subjects": {
    "math": {
      "index": "12/8/2025",
      "yearSlug": "12/8/2025"
    }
  }
}
```

### 6. Check and Update Year Slug Pages

**IMPORTANT:** Check if the year exists in the year slug pages. For subjects with year-specific pages (like `/math/2023`), verify the year is included in the `getStaticPaths` function.

**Check the file:** `pages/<subject>/[year].tsx`

**Look for this section:**
```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  // ... rest of function
};
```

**If the year is missing, add it to the array:**
```tsx
const years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
```

**⚠️ CRITICAL NOTIFICATION:** If you add a new year (especially 2022, 2023, 2024, 2025), you MUST notify the user:
> "**NEW YEAR ADDED:** I've added [YEAR] to the [SUBJECT] year slug pages. The year [YEAR] will now be accessible at `/[subject]/[YEAR]` (e.g., `/math/2025`)."

### 7. Provide Upload Instructions

Tell the user the exact filename to upload to their CDN:

**Example:**
> "Upload the 2023 Math answers PDF to your CDN with filename: `pp_m0_eng_dse_2023_ans.pdf`"

## Common Paper Types by Subject

### Mathematics
- **Paper 1**: Multiple choice questions
- **Paper 2**: Long questions  
- **Answers**: Marking scheme and solutions

### Physics
- **Paper 1A**: Multiple choice (Part A)
- **Paper 1B**: Multiple choice (Part B)
- **Paper 2**: Structured questions
- **Answers**: Marking scheme

### Chemistry
- **Paper 1A**: Multiple choice (Part A)
- **Paper 1B**: Multiple choice (Part B)
- **Paper 2**: Structured questions
- **Answers**: Marking scheme

### Tourism and Hospitality Studies (THS)
- **Paper 1**: Multiple choice
- **Paper 2**: Structured questions
- **Answers**: Marking scheme
- **Performance**: Performance descriptors

## File Naming Patterns

| Subject | Paper Type | Pattern |
|---------|------------|---------|
| Math | Papers | `pp_m0_eng_dse_<year>_p1.pdf`, `pp_m0_eng_dse_<year>_p2.pdf` |
| Math | Answers | `pp_m0_eng_dse_<year>_ans.pdf` |
| Physics | Papers | `pp_phy_chi_dse_<year>_p1a.pdf`, `pp_phy_chi_dse_<year>_p1b.pdf`, `pp_phy_chi_dse_<year>_p2.pdf` |
| Physics | Answers | `pp_phy_chi_dse_<year>_ans.pdf` |
| Chemistry | Papers | `pp_che_chi_dse_<year>_p1a.pdf`, `pp_che_chi_dse_<year>_p1b.pdf`, `pp_che_chi_dse_<year>_p2.pdf` |
| Chemistry | Answers | `pp_che_chi_dse_<year>_ans.pdf` |
| THS | Papers | `pp_ths_chi_dse_<year>_p1.pdf`, `pp_ths_chi_dse_<year>_p2.pdf` |
| THS | Answers | `pp_ths_chi_dse_<year>_ans.pdf` |

## Configuration Key Patterns

| Paper Type | Key Pattern | Example |
|------------|-------------|---------|
| Paper 1 | `<year>_P1` | `2023_P1` |
| Paper 2 | `<year>_P2` | `2023_P2` |
| Answers | `<year>_ans` | `2023_ans` |
| Physics P1A | `<year>_p1a_chi` | `2023_p1a_chi` |
| Physics P1B | `<year>_p1b_chi` | `2023_p1b_chi` |
| THS Performance | `<year>_per_chi` | `2023_per_chi` |

## Testing

After making changes:
1. **Build the project** to ensure no errors
2. **Check the year page** (e.g., `/math/2023`) to see if the new paper appears
3. **Check the main subject page** (e.g., `/math`) to see if the new paper appears
4. **Verify the download links** work correctly

## Notes

- **PDFs are hosted on CDN** - you don't need to worry about file storage
- **Static generation** - pages are pre-built, so changes require a rebuild
- **SEO friendly** - all pages are properly indexed and have structured data
- **Responsive design** - works on all devices

## Important: Long Tasks and AI Limits

### ⚠️ Runtime/AI Limit Handling

If the task is taking too long or the AI is approaching its runtime limit:

1. **Stop immediately** and inform the user:
   > "⚠️ **TASK INCOMPLETE:** I'm approaching my runtime limit. The paper adding process is incomplete. Please ask me to continue with the remaining steps."

2. **List what has been completed** and what remains:
   > "**Completed:** [List completed steps]
   > **Remaining:** [List remaining steps]"

3. **Provide specific next steps** for the user to request:
   > "Please ask me to: [specific remaining tasks]"

### 📋 Task Completion Checklist

Always verify these steps are completed:
- [ ] Configuration file updated (`public/config/<subject>.json`)
- [ ] Main index page updated (`pages/<subject>/index.tsx`)
  - [ ] Year section exists (create if missing)
  - [ ] Year sections in correct chronological order (newest first)
  - [ ] Proper formatting: centered title, line break, divider
  - [ ] Subject-specific paper ordering maintained
  - [ ] Language-specific requirements met (Chinese: `下載`, English: `Download`)
  - [ ] Card titles and descriptions match existing format for that language/paper type
  - [ ] Format consistency verified against other cards in the same subject
- [ ] Last updated info updated (`data/lastUpdated.json`)
- [ ] Year slug pages checked and updated (`pages/<subject>/[year].tsx`)
- [ ] Upload instructions provided to user
- [ ] New year notification sent (if applicable)
- [ ] Update the new pages/year slug pages (if any) to sitemap.xml with today's date.

### 🔄 Continuation Protocol

If the task is split across multiple sessions:
1. **Start with:** "Continuing from previous session..."
2. **Reference:** What was already completed
3. **Complete:** Remaining steps from the checklist above
4. **Verify:** All steps are finished before marking as complete 