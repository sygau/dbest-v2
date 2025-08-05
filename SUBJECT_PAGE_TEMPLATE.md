# Subject Page Template Generator

This template can be used to create all the remaining subject pages. Just replace the placeholders with the appropriate values for each subject.

## Template Structure

```tsx
import Head from 'next/head'

export default function [SUBJECT_NAME]Page() {
  return (
    <>
      <Head>
        <title>DSE [SUBJECT_CHINESE] 歷屆試題 Past Papers | [SUBJECT_ENGLISH] - dse.best</title>
        <meta name="description" content="DSE [SUBJECT_CHINESE]歷屆試題，包括各卷試題及答案。提供模擬試卷、練習試卷及歷年真題下載，助你備戰DSE [SUBJECT_CHINESE]考試。" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="DSE [SUBJECT_CHINESE] 歷屆試題 Past Papers | [SUBJECT_ENGLISH] - dse.best" />
        <meta property="og:description" content="DSE [SUBJECT_CHINESE]歷屆試題，包括各卷試題及答案。提供模擬試卷、練習試卷及歷年真題下載。" />
        <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
        <meta property="og:url" content="https://dse.best/[ROUTE]" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">[SUBJECT_CHINESE]</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <a href="/">
                  <i className="bx bx-home-alt"></i>
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">DSE Past Paper</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="card rounded-4" style={{height: 'auto'}}>
        <div className="card-body">
          <h1 className="mb-4">DSE [SUBJECT_CHINESE] 歷屆試題 Past Papers</h1>
          <p className="mb-4">
            歡迎瀏覽DSE [SUBJECT_CHINESE]歷屆試題。 在此，您可以找到按年份排列的試題及答案，助您備考。
          </p>
          <div className="alert alert-border-primary alert-dismissible fade show">
            <div><b>最後更新: </b>1/7/2025</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <br />
          <hr className="my-4" />
          <br />

          {/* MAIN CONTENT AREA */}
          <div className="alert alert-info">
            <h4>📝 Content Area for [SUBJECT_CHINESE]</h4>
            <p>Copy your HTML content from the original [ROUTE].html file here and convert it to JSX.</p>
            <p>Use an online HTML to JSX converter for easy conversion.</p>
          </div>
          {/* END MAIN CONTENT AREA */}

        </div>
      </div>
    </>
  )
}
```

## Subject Data for Quick Reference

### Core Subjects
1. **English**: english.tsx
   - SUBJECT_NAME: English
   - SUBJECT_CHINESE: 英文
   - SUBJECT_ENGLISH: English Language
   - ROUTE: english

2. **Math**: math.tsx
   - SUBJECT_NAME: Math
   - SUBJECT_CHINESE: 數學
   - SUBJECT_ENGLISH: Mathematics
   - ROUTE: math

3. **Citizen**: citizen.tsx
   - SUBJECT_NAME: Citizen
   - SUBJECT_CHINESE: 公民與社會發展科
   - SUBJECT_ENGLISH: Citizenship and Social Development
   - ROUTE: citizen

### Elective Subjects
4. **Physics**: physics.tsx
   - SUBJECT_NAME: Physics
   - SUBJECT_CHINESE: 物理
   - SUBJECT_ENGLISH: Physics
   - ROUTE: physics

5. **Chemistry**: chemistry.tsx
   - SUBJECT_NAME: Chemistry
   - SUBJECT_CHINESE: 化學
   - SUBJECT_ENGLISH: Chemistry
   - ROUTE: chemistry

6. **Biology**: biology.tsx
   - SUBJECT_NAME: Biology
   - SUBJECT_CHINESE: 生物
   - SUBJECT_ENGLISH: Biology
   - ROUTE: biology

7. **ICT**: ict.tsx
   - SUBJECT_NAME: ICT
   - SUBJECT_CHINESE: 資訊及通訊技術
   - SUBJECT_ENGLISH: ICT
   - ROUTE: ict

8. **M1**: m1.tsx
   - SUBJECT_NAME: M1
   - SUBJECT_CHINESE: 數學延伸部分 (M1)
   - SUBJECT_ENGLISH: Mathematics Extended Part (M1)
   - ROUTE: m1

9. **M2**: m2.tsx
   - SUBJECT_NAME: M2
   - SUBJECT_CHINESE: 數學延伸部分 (M2)
   - SUBJECT_ENGLISH: Mathematics Extended Part (M2)
   - ROUTE: m2

10. **Geography**: geography.tsx
    - SUBJECT_NAME: Geography
    - SUBJECT_CHINESE: 地理
    - SUBJECT_ENGLISH: Geography
    - ROUTE: geography

11. **History**: history.tsx
    - SUBJECT_NAME: History
    - SUBJECT_CHINESE: 歷史
    - SUBJECT_ENGLISH: History
    - ROUTE: history

12. **Chinese History**: chinese-history.tsx
    - SUBJECT_NAME: ChineseHistory
    - SUBJECT_CHINESE: 中國歷史
    - SUBJECT_ENGLISH: Chinese History
    - ROUTE: chinese-history

13. **Economics**: economics.tsx
    - SUBJECT_NAME: Economics
    - SUBJECT_CHINESE: 經濟
    - SUBJECT_ENGLISH: Economics
    - ROUTE: economics

14. **BAFS**: bafs.tsx
    - SUBJECT_NAME: BAFS
    - SUBJECT_CHINESE: 企業、會計與財務概論
    - SUBJECT_ENGLISH: BAFS
    - ROUTE: bafs

15. **Visual Arts**: visual-arts.tsx (commented out)
    - SUBJECT_NAME: VisualArts
    - SUBJECT_CHINESE: 視覺藝術
    - SUBJECT_ENGLISH: Visual Arts
    - ROUTE: visual-arts

## How to Use This Template

1. Copy the template code above
2. Replace all the placeholders [SUBJECT_NAME], [SUBJECT_CHINESE], [SUBJECT_ENGLISH], [ROUTE] with the appropriate values
3. Save as `pages/[ROUTE].tsx`
4. Copy the HTML content from the corresponding original HTML file (e.g., english.html)
5. Use an online HTML to JSX converter (recommended: https://transform.tools/html-to-jsx)
6. Paste the converted JSX in the "MAIN CONTENT AREA" section
7. Test the page

## Example for English Page

```tsx
import Head from 'next/head'

export default function EnglishPage() {
  return (
    <>
      <Head>
        <title>DSE 英文 歷屆試題 Past Papers | English Language - dse.best</title>
        {/* ... rest of head content ... */}
      </Head>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">英文</div>
        {/* ... rest of breadcrumb ... */}
      </div>

      {/* Main Content Card */}
      <div className="card rounded-4" style={{height: 'auto'}}>
        <div className="card-body">
          <h1 className="mb-4">DSE 英文 歷屆試題 Past Papers</h1>
          {/* ... insert converted JSX content here ... */}
        </div>
      </div>
    </>
  )
}
```

This approach allows you to:
1. Use online HTML to JSX converters for efficiency
2. Keep the page structure consistent
3. Focus on just copying and converting the main content
4. Maintain proper SEO and meta tags for each subject
