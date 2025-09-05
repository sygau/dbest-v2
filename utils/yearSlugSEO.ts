// Year Slug SEO Configuration
// This file centralizes SEO title and description generation for all year slug pages

export interface SubjectSEOConfig {
  seoTitle: string;
  seoDescription: string;
  isDualLang: boolean;
  pageTitle: string;
  pageDescriptionEng: string;
  pageDescriptionChi: string;
}

// Subject configurations extracted from actual year slug pages
const subjectConfigs: Record<string, SubjectSEOConfig> = {
  math: {
    seoTitle: 'DSE 數學 Mathematics {year} Past Papers | Paper 1, Paper 2, Answers/Marking Scheme',
    seoDescription: 'Download DSE 數學 Mathematics {year} past papers (PP), including Paper 1, Paper 2, MC answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Mathematics exam preparation and revision, covering core topics such as algebra, geometry, trigonometry, calculus, and statistics to help you master DSE Mathematics concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 數學 Mathematics {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Mathematics {year} past papers, including Paper 1, Paper 2, MC answers, detailed marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Mathematics exam preparation and revision, covering core topics such as algebra, geometry, trigonometry, calculus, and statistics to help you master DSE Mathematics concepts and achieve excellent results in your examination.',
    pageDescriptionChi: '瀏覽我們完整的DSE 數學 {year} 數學歷屆試題合集，包括Paper 1、Paper 2、MC答案、詳細評分準則及表現報告PDF格式。這套完整的試題集合是香港中學文憑試數學科考試準備及溫習的重要資源，涵蓋代數、幾何、三角學、微積分及統計學等核心課題，助您掌握DSE數學概念並在考試中取得優異成績。'
  },
  english: {
    seoTitle: 'DSE 英文 English Language {year} Past Papers | Reading, Writing, Listening, Speaking, Answers/Marking Scheme',
    seoDescription: 'Download DSE 英文 English Language {year} past papers (PP), including Paper 1, Paper 2, Paper 3, Paper 4, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE English Language exam preparation and revision, covering core topics such as reading, writing, listening, and speaking to help you master DSE English Language concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 英文 English Language {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE English Language {year} past papers, including Paper 1 Reading, Paper 2 Writing, Paper 3 Listening & Integrated Skills, Paper 4 Speaking, marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE English Language exam preparation and revision, covering reading comprehension, writing tasks, listening exercises, and speaking assessments to help you master DSE English Language concepts and achieve excellent results in your examination.',
    pageDescriptionChi: '瀏覽我們完整的DSE 英文 {year} 歷屆試題合集，包括卷一閱讀、卷二寫作、卷三聆聽及綜合技能、卷四說話、評分準則及表現報告PDF格式。這套完整的試題集合是香港中學文憑試英文科考試準備及溫習的重要資源，涵蓋閱讀理解、寫作任務、聆聽練習及說話評估等核心技能，助您掌握DSE英文概念並在考試中取得優異成績。'
  },
  physics: {
    seoTitle: 'DSE 物理 Physics {year} Past Papers | Paper 1, Paper 2, Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 物理 Physics {year} past papers (PP), including Paper 1, Paper 2, MC answers, detailed marking schemes, and performance report in PDF format. Essential resources for Hong Kong DSE Physics exam preparation and revision.',
    isDualLang: true,
    pageTitle: 'DSE 物理 Physics {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Physics {year} past papers, including Paper 1A, Paper 1B, Paper 2, MC answers, detailed marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Physics exam preparation and revision, covering core topics such as mechanics, electricity, waves, and modern physics to help you master DSE Physics concepts and achieve excellent results in your examination.',
    pageDescriptionChi: '瀏覽我們完整的DSE 物理 {year} 物理歷屆試題合集，包括卷一甲、卷一乙、卷二、MC答案、詳細評分準則及表現報告PDF格式。這套完整的試題集合是香港中學文憑試物理科考試準備及溫習的重要資源，涵蓋力學、電學、波動及現代物理等核心課題，助您掌握DSE物理概念並在考試中取得優異成績。'
  },
  biology: {
    seoTitle: 'DSE 生物 Biology {year} Past Papers | Paper 1, Paper 2, Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 生物 Biology {year} past papers (PP), including Paper 1, Paper 2, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Biology exam preparation and revision, covering core topics such as cell biology, genetics, ecology, human physiology, and biotechnology to help you master DSE Biology concepts and achieve excellent results in your examination.',
    isDualLang: true,
    pageTitle: 'DSE 生物 Biology {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Biology {year} past papers, including Paper 1 (MCQs), Paper 2 (Structured Questions and Essay Questions), marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Biology exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 生物 {year} 生物歷屆試題合集，包括卷一（多項選擇題）、卷二（結構題及論文題）、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試生物科考試準備及溫習的重要資源，涵蓋細胞與分子生物學、遺傳與進化、生物與環境、健康與疾病、人體生理學、生物科技及應用等核心課題。'
  },
  chemistry: {
    seoTitle: 'DSE 化學 Chemistry {year} Past Papers | Paper 1, Paper 2, Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 化學 Chemistry {year} past papers (PP), including Paper 1, Paper 2, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Chemistry exam preparation and revision, covering core topics such as inorganic chemistry, organic chemistry, physical chemistry, and analytical chemistry to help you master DSE Chemistry concepts and achieve excellent results in your examination.',
    isDualLang: true,
    pageTitle: 'DSE 化學 Chemistry {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Chemistry {year} past papers, including Paper 1 (Multiple Choice Questions), Paper 2 (Structured Questions and Essay Questions), marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Chemistry exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 化學 {year} 化學歷屆試題合集，包括卷一（多項選擇題）、卷二（結構題及論文題）、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試化學科考試準備及溫習的重要資源，涵蓋無機化學、有機化學、物理化學、分析化學等核心課題。'
  },
  chinese: {
    seoTitle: 'DSE 中文 Chinese {year} Past Papers | 閱讀, 寫作, 聆聽 參考答案',
    seoDescription: 'Download DSE 中文 Chinese {year} past papers (PP), including Paper 1 Reading, Paper 2 Writing, Paper 3 Listening & Integrated Skills, Paper 4 Speaking, marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Chinese Language exam preparation and revision, covering reading comprehension, writing skills, listening exercises, and speaking assessments to help you master DSE Chinese concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 中文 Chinese Language {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Chinese Language {year} past papers, including Paper 1 (Reading), Paper 2 (Writing), Paper 3 (Listening & Integrated Skills), Paper 4 (Speaking), marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Chinese Language exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 中文 {year} 中文歷屆試題合集，包括卷一（閱讀）、卷二（寫作）、卷三（聆聽及綜合能力）、卷四（說話）、卷五（校本評核）、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試中文科考試準備及溫習的重要資源，涵蓋閱讀理解、寫作技巧、聆聽練習、說話評估等核心技能。'
  },
  bafs: {
    seoTitle: 'DSE 企財 BAFS {year} Past Papers | Paper 1, Paper 2 (A/B), Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 企業、會計與財務概論 Business, Accounting and Financial Studies {year} past papers (PP), including Paper 1, Paper 2A, Paper 2B, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Business, Accounting and Financial Studies exam preparation and revision, covering core topics such as business management, accounting principles, and financial analysis to help you master DSE BAFS concepts and achieve excellent results in your examination.',
    isDualLang: true,
    pageTitle: 'DSE 企業、會計與財務概論 BAFS {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE BAFS {year} past papers, including Paper 1 (Multiple Choice Questions), Paper 2A (Accounting Module), Paper 2B (Business Management Module), marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Business, Accounting and Financial Studies exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 企業、會計與財務概論 {year} 企業、會計與財務概論歷屆試題合集，包括卷一（多項選擇題）、卷二甲（會計單元）、卷二乙（商業管理單元）、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試企業、會計與財務概論科考試準備及溫習的重要資源，涵蓋商業管理、會計原理、財務分析等核心課題。'
  },
  'chinese-history': {
    seoTitle: 'DSE 中史 Chinese History {year} Past Papers | 卷一資料回應題, 卷二論文題, 參考答案',
    seoDescription: 'Download DSE 中國歷史 Chinese History {year} past papers (PP), including Paper 1 Data-based Questions, Paper 2 Essay Questions, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Chinese History exam preparation and revision, covering core topics such as Chinese history, historical analysis, and essay writing skills to help you master DSE Chinese History concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 中國歷史 Chinese History {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Chinese History {year} past papers, including Paper 1 (Data-based Questions), Paper 2 (Essay Questions), marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Chinese History exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 中國歷史 {year} 中國歷史歷屆試題合集，包括卷一（資料回應題）、卷二（論文題）、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試中國歷史科考試準備及溫習的重要資源，涵蓋中國歷史、歷史分析、論文寫作技巧等核心課題。'
  },
  economics: {
    seoTitle: 'DSE 經濟 Economics {year} Past Papers | Paper 1, Paper 2, Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 經濟 Economics {year} past papers (PP), including Paper 1, Paper 2, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Economics exam preparation and revision, covering core topics such as microeconomics, macroeconomics, economic analysis, and economic theory to help you master DSE Economics concepts and achieve excellent results in your examination.',
    isDualLang: true,
    pageTitle: 'DSE 經濟 Economics {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Economics {year} past papers, including Paper 1 (Multiple Choice Questions), Paper 2 (Structured Questions and Essay Questions), marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Economics exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 經濟 {year} 經濟歷屆試題合集，包括卷一（多項選擇題）、卷二（結構題及論文題）、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試經濟科考試準備及溫習的重要資源，涵蓋微觀經濟學、宏觀經濟學、經濟分析、經濟理論等核心課題。'
  },
  history: {
    seoTitle: 'DSE 歷史 History {year} Past Papers | Paper 1, Paper 2, Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 歷史 History {year} past papers (PP), including Paper 1, Paper 2, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE History exam preparation and revision, covering core topics such as world history, historical analysis, and essay writing skills to help you master DSE History concepts and achieve excellent results in your examination.',
    isDualLang: true,
    pageTitle: 'DSE 歷史 History {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE History {year} past papers, including Paper 1 (Data-based Questions), Paper 2 (Essay Questions), marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE History exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 歷史 {year} 歷屆試題合集，包括卷一（資料回應題）、卷二（論文題）、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試歷史科考試準備及溫習的重要資源，涵蓋世界歷史、歷史分析、論文寫作技巧等核心課題。'
  },
  geography: {
    seoTitle: 'DSE 地理 Geography {year} Past Papers | Paper 1 DBQ, Paper 2, Map, Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 地理 Geography {year} past papers (PP), including Paper 1 DBQ (Data-backed Questions), Paper 2, Map, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Geography exam preparation and revision, covering core topics such as physical geography, human geography, environmental issues, and geographical skills to help you master DSE Geography concepts and achieve excellent results in your examination.',
    isDualLang: true,
    pageTitle: 'DSE 地理 Geography {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Geography {year} past papers, including Paper 1 DBQ (Data-based Questions), Paper 2, Map, marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Geography exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 地理 {year} 地理歷屆試題合集，包括卷一（資料回應題 DBQ）、卷二（論文題）、地圖、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試地理科考試準備及溫習的重要資源，涵蓋自然地理、人文地理、環境議題、地理技能等核心課題。'
  },
  m1: {
    seoTitle: 'DSE 數學延伸單元一 M1 {year} Past Papers | Calculus and Statistics',
    seoDescription: 'Download DSE 數學延伸單元一 Mathematics Module 1 (M1) {year} past papers, including calculus and statistics questions, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE M1 exam preparation and revision, covering differentiation, integration, probability, and statistical analysis to help you master M1 concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 數學延伸單元一 M1 {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Mathematics Module 1 (M1) {year} past papers, including calculus and statistics questions, detailed marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE M1 exam preparation and revision, covering differentiation, integration, probability, and statistical analysis.',
    pageDescriptionChi: '瀏覽我們完整的DSE 數學延伸單元一 {year} 數學延伸單元一歷屆試題合集，包括微積分及統計學題目、詳細評分準則及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試M1考試準備及溫習的重要資源，涵蓋微分、積分、概率及統計分析等核心課題。'
  },
  m2: {
    seoTitle: 'DSE 數學延伸單元二 M2 {year} Past Papers | Algebra and Calculus',
    seoDescription: 'Download DSE 數學延伸單元二 Mathematics Module 2 (M2) {year} past papers, including algebra and calculus questions, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE M2 exam preparation and revision, covering matrices, vectors, complex numbers, and advanced calculus to help you master M2 concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 數學延伸單元二 M2 {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Mathematics Module 2 (M2) {year} past papers, including algebra and calculus questions, detailed marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE M2 exam preparation and revision, covering matrices, vectors, complex numbers, and advanced calculus.',
    pageDescriptionChi: '瀏覽我們完整的DSE 數學延伸單元二 {year} 數學延伸單元二歷屆試題合集，包括代數及微積分題目、詳細評分準則及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試M2考試準備及溫習的重要資源，涵蓋矩陣、向量、複數及進階微積分等核心課題。'
  },
  ict: {
    seoTitle: 'DSE 資通 ICT {year} Past Papers | Paper 1, Paper 2A/B/C/D, Answers/Marking Scheme (中/英)',
    seoDescription: 'Download DSE 資訊及通訊科技 Information and Communication Technology {year} past papers, including Paper 1, Paper 2A/B/C/D, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE ICT exam preparation and revision, covering database management, programming, networking, and multimedia to help you master ICT concepts and achieve excellent results in your examination.',
    isDualLang: true,
    pageTitle: 'DSE 資訊及通訊科技 ICT {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE ICT Information and Communication Technology {year} past papers, including Paper 1, Paper 2A/B/C/D, marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE ICT exam preparation and revision.',
    pageDescriptionChi: '瀏覽我們完整的DSE 資訊及通訊科技 {year} 資訊及通訊科技歷屆試題合集，包括卷一、卷二A/B/C/D、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試資訊及通訊科技科考試準備及溫習的重要資源，涵蓋數據庫管理、程式編寫、網絡技術及多媒體等核心課題。'
  },
  ths: {
    seoTitle: 'DSE 旅遊與款待 Tourism and Hospitality Studies {year} Past Papers | Paper 1, Paper 2, Answers/Marking Scheme',
    seoDescription: 'Download DSE 旅遊與款待 Tourism and Hospitality Studies {year} past papers, including Paper 1, Paper 2, answers, detailed marking schemes, and performance reports in PDF format. Essential resources for Hong Kong DSE Tourism and Hospitality Studies exam preparation and revision, covering tourism industry, hospitality management, and related topics to help you master DSE Tourism and Hospitality Studies concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 旅遊與款待 Tourism and Hospitality Studies {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Tourism and Hospitality Studies {year} past papers, including Paper 1, Paper 2, marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Tourism and Hospitality Studies exam preparation and revision, covering tourism industry, hospitality management, and related topics.',
    pageDescriptionChi: '瀏覽我們完整的DSE 旅遊與款待 {year} 旅遊與款待歷屆試題合集，包括卷一、卷二、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試旅遊與款待科考試準備及溫習的重要資源，涵蓋旅遊業、款待業管理等核心課題。'
  },
  citizen: {
    seoTitle: 'DSE 公民與社會發展 Citizenship and Social Development {year} Past Papers | Paper 1, Paper 2, Answers',
    seoDescription: 'Download DSE 公民與社會發展 Citizenship and Social Development {year} past papers, including Paper 1, Paper 2, answers, and marking schemes in PDF format. Essential resources for Hong Kong DSE Citizenship and Social Development exam preparation and revision, covering Hong Kong under "One Country, Two Systems", China since reform and opening-up, and the interconnected world to help you master DSE Citizenship concepts and achieve excellent results in your examination.',
    isDualLang: false,
    pageTitle: 'DSE 公民與社會發展 Citizenship and Social Development {year} Past Papers 歷屆試題',
    pageDescriptionEng: 'Browse our complete collection of DSE Citizenship and Social Development {year} past papers, including Paper 1, Paper 2, marking schemes, and performance reports in PDF format. This comprehensive collection serves as essential resources for Hong Kong DSE Citizenship and Social Development exam preparation and revision, covering Hong Kong under "One Country, Two Systems", China since reform and opening-up, and the interconnected world.',
    pageDescriptionChi: '瀏覽我們完整的DSE 公民與社會發展 {year} 公民與社會發展歷屆試題合集，包括卷一、卷二、參考答案及考生表現報告等PDF格式文件。這套完整的試題集合是香港中學文憑試公民與社會發展科考試準備及溫習的重要資源，涵蓋「一國兩制」下的香港、改革開放以來的國家、互聯相依的當代世界等核心課題。'
  }
};

// Main function to generate all year slug metadata
export function generateYearMeta(subject: string, year: string) {
  const config = subjectConfigs[subject];
  if (!config) {
    // Fallback for unknown subjects
    return {
      seoTitle: `DSE ${subject.toUpperCase()} ${year} Past Papers`,
      seoDescription: `Download DSE ${subject.toUpperCase()} ${year} past papers in PDF format. Essential resources for Hong Kong DSE exam preparation and revision.`,
      pageTitle: `DSE ${subject.toUpperCase()} ${year} Past Papers`,
      pageDescriptionEng: `Welcome to our collection of DSE ${subject.toUpperCase()} ${year} past papers.`,
      pageDescriptionChi: `歡迎瀏覽DSE ${subject.toUpperCase()} ${year} 歷屆試題合集。`,
      isDualLang: false
    };
  }

  return {
    seoTitle: config.seoTitle.replace('{year}', year),
    seoDescription: config.seoDescription.replace('{year}', year),
    pageTitle: config.pageTitle.replace('{year}', year),
    pageDescriptionEng: config.pageDescriptionEng.replace('{year}', year),
    pageDescriptionChi: config.pageDescriptionChi.replace('{year}', year),
    isDualLang: config.isDualLang
  };
}

 