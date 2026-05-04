// Legacy structured data - deprecated generate* functions removed in Phase 4
// This file contains the raw data objects and FAQ content that was previously dynamically generated
// New system uses data/jsonld/ and data/faqs/ with PageSEO component props instead

export interface SubjectData {
  name: string;
  englishName: string;
  description: string;
  englishDescription: string;
  category: 'core' | 'elective';
  url: string;
}

export const subjectData: Record<string, SubjectData> = {
  chinese: {
    name: '中文',
    englishName: 'Chinese Language',
    description: 'DSE 中文科歷屆試題及答案，涵蓋閱讀、寫作、聆聽、說話及校本評核 (SBA)。提供完整試卷下載，助您掌握中文科考試技巧及趨勢。',
    englishDescription: 'DSE Chinese Language past papers and answers, covering reading, writing, listening, speaking and SBA. Complete exam papers available for download to help master Chinese exam techniques and trends.',
    category: 'core',
    url: 'https://dse.best/chinese'
  },
  english: {
    name: '英文',
    englishName: 'English Language',
    description: 'DSE 英文科歷屆試題及答案，涵蓋閱讀、寫作、聆聽、說話及校本評核 (SBA)。提供完整試卷下載，助您提升英文科應試能力。',
    englishDescription: 'DSE English Language past papers and answers, covering reading, writing, listening, speaking and SBA. Complete exam papers available for download to enhance English exam performance.',
    category: 'core',
    url: 'https://dse.best/english'
  },
  math: {
    name: '數學',
    englishName: 'Mathematics',
    description: 'DSE 數學科歷屆試題及答案，涵蓋必修部分所有課題。提供完整試卷下載，助您掌握數學科考試重點及解題技巧。',
    englishDescription: 'DSE Mathematics past papers and answers, covering all compulsory topics. Complete exam papers available for download to master key exam points and problem-solving techniques.',
    category: 'core',
    url: 'https://dse.best/math'
  },
  physics: {
    name: '物理',
    englishName: 'Physics',
    description: 'DSE 物理科歷屆試題及答案，涵蓋力學、熱學、波動、電磁學等課題。提供完整試卷下載，助您掌握物理科考試重點。',
    englishDescription: 'DSE Physics past papers and answers, covering mechanics, heat, waves, electromagnetism and more. Complete exam papers available for download to master key exam points.',
    category: 'elective',
    url: 'https://dse.best/physics'
  },
  chemistry: {
    name: '化學',
    englishName: 'Chemistry',
    description: 'DSE 化學科歷屆試題及答案，涵蓋無機化學、有機化學、物理化學等課題。提供完整試卷下載，助您掌握化學科考試重點。',
    englishDescription: 'DSE Chemistry past papers and answers, covering inorganic, organic and physical chemistry. Complete exam papers available for download to master key exam points.',
    category: 'elective',
    url: 'https://dse.best/chemistry'
  },
  biology: {
    name: '生物',
    englishName: 'Biology',
    description: 'DSE 生物科歷屆試題及答案，涵蓋細胞與分子生物學、遺傳與進化、生物與環境等課題。提供完整試卷下載。',
    englishDescription: 'DSE Biology past papers and answers, covering cell and molecular biology, genetics and evolution, biology and environment. Complete exam papers available for download.',
    category: 'elective',
    url: 'https://dse.best/biology'
  },
  ict: {
    name: '資訊及通訊科技',
    englishName: 'Information and Communication Technology',
    description: 'DSE ICT 歷屆試題及答案，涵蓋資訊處理、程式編寫、數據庫、網絡等課題。提供完整試卷下載。',
    englishDescription: 'DSE ICT past papers and answers, covering information processing, programming, databases, networks and more. Complete exam papers available for download.',
    category: 'elective',
    url: 'https://dse.best/ict'
  },
  m1: {
    name: '數學延伸部分 M1',
    englishName: 'Mathematics Module 1',
    description: 'DSE 數學延伸部分 M1 (微積分與統計) 歷屆試題及答案。提供完整試卷下載，助您掌握微積分與統計學重點。',
    englishDescription: 'DSE Mathematics Module 1 (Calculus and Statistics) past papers and answers. Complete exam papers available for download to master calculus and statistics.',
    category: 'elective',
    url: 'https://dse.best/m1'
  },
  m2: {
    name: '數學延伸部分 M2',
    englishName: 'Mathematics Module 2',
    description: 'DSE 數學延伸部分 M2 (代數與微積分) 歷屆試題及答案。提供完整試卷下載，助您掌握代數與微積分重點。',
    englishDescription: 'DSE Mathematics Module 2 (Algebra and Calculus) past papers and answers. Complete exam papers available for download to master algebra and calculus.',
    category: 'elective',
    url: 'https://dse.best/m2'
  },
  geography: {
    name: '地理',
    englishName: 'Geography',
    description: 'DSE 地理科歷屆試題及答案，涵蓋自然環境、人文環境、全球相互依存等課題。提供完整試卷下載。',
    englishDescription: 'DSE Geography past papers and answers, covering natural environment, human environment, global interdependence and more. Complete exam papers available for download.',
    category: 'elective',
    url: 'https://dse.best/geography'
  },
  history: {
    name: '歷史',
    englishName: 'History',
    description: 'DSE 歷史科歷屆試題及答案，涵蓋現代世界、現代中國等課題。提供完整試卷下載，助您掌握歷史科考試重點。',
    englishDescription: 'DSE History past papers and answers, covering modern world and modern China. Complete exam papers available for download to master key exam points.',
    category: 'elective',
    url: 'https://dse.best/history'
  },
  'chinese-history': {
    name: '中國歷史',
    englishName: 'Chinese History',
    description: 'DSE 中國歷史科歷屆試題及答案，涵蓋古代史、近現代史等課題。提供完整試卷下載，助您掌握中國歷史科考試重點。',
    englishDescription: 'DSE Chinese History past papers and answers, covering ancient and modern history. Complete exam papers available for download to master key exam points.',
    category: 'elective',
    url: 'https://dse.best/chinese-history'
  },
  economics: {
    name: '經濟',
    englishName: 'Economics',
    description: 'DSE 經濟科歷屆試題及答案，涵蓋微觀經濟學、宏觀經濟學等課題。提供完整試卷下載，助您掌握經濟科考試重點。',
    englishDescription: 'DSE Economics past papers and answers, covering microeconomics and macroeconomics. Complete exam papers available for download to master key exam points.',
    category: 'elective',
    url: 'https://dse.best/economics'
  },
  bafs: {
    name: '企業、會計與財務概論',
    englishName: 'Business, Accounting and Financial Studies',
    description: 'DSE BAFS 歷屆試題及答案，涵蓋會計、商業管理、財務管理等課題。提供完整試卷下載，助您掌握商業科考試重點。',
    englishDescription: 'DSE BAFS past papers and answers, covering accounting, business management, financial management and more. Complete exam papers available for download.',
    category: 'elective',
    url: 'https://dse.best/bafs'
  },
  citizen: {
    name: '公民與社會發展',
    englishName: 'Citizenship and Social Development',
    description: 'DSE 公民與社會發展科歷屆試題及答案，涵蓋香港、國家、世界等課題。提供完整試卷下載。',
    englishDescription: 'DSE Citizenship and Social Development past papers and answers, covering Hong Kong, China and the world. Complete exam papers available for download.',
    category: 'core',
    url: 'https://dse.best/citizen'
  },
  'visual-arts': {
    name: '視覺藝術',
    englishName: 'Visual Arts',
    description: 'DSE 視覺藝術科歷屆試題及答案，涵蓋藝術創作、藝術評賞等課題。提供完整試卷下載，助您掌握視覺藝術科考試重點。',
    englishDescription: 'DSE Visual Arts past papers and answers, covering art creation and art appreciation. Complete exam papers available for download to master key exam points.',
    category: 'elective',
    url: 'https://dse.best/visual-arts'
  },
  ths: {
    name: '旅遊與款待',
    englishName: 'Tourism and Hospitality Studies',
    description: 'DSE 旅遊與款待科歷屆試題及答案，涵蓋旅遊業、款待業等課題。提供完整試卷下載，助您掌握旅遊與款待科考試重點。',
    englishDescription: 'DSE Tourism and Hospitality Studies past papers and answers, covering tourism and hospitality industries. Complete exam papers available for download to master key exam points.',
    category: 'elective',
    url: 'https://dse.best/ths'
  },
  cutoff: {
    name: '分數線',
    englishName: 'Cut-off Scores',
    description: 'HKDSE 各科目等級分數線查詢，包括中文、英文、數學、物理、化學、生物、ICT、M1、M2等科目的歷年分數線資料。了解各等級達標分數，助您制定備考策略。',
    englishDescription: 'HKDSE cut-off scores for all subjects including Chinese, English, Mathematics, Physics, Chemistry, Biology, ICT, M1, M2 and more. Historical grade boundaries to help you understand score requirements and plan your study strategy.',
    category: 'core',
    url: 'https://dse.best/cutoff'
  }
};

export interface PageData {
  name: string;
  description: string;
  url: string;
  type: 'homepage' | 'countdown' | 'blog' | 'subject';
}

export const pageData: Record<string, PageData> = {
  homepage: {
    name: 'HKDSE Past Papers 歷屆試題 | 中文、英文、數學、Phy、Chem、Bio、M1/M2',
    description: 'DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。',
    url: 'https://dse.best/',
    type: 'homepage'
  },
  countdown: {
    name: 'DSE 2026 Countdown 考試日期倒數',
    description: 'DSE倒數計時器，幫助你準備文憑試。掌握DSE考試日期，合理安排溫習時間。',
    url: 'https://dse.best/countdown',
    type: 'countdown'
  },
  countdown2027: {
    name: 'DSE 2027 Countdown 考試日期倒數',
    description: 'DSE 2027倒數計時器，幫助你準備文憑試。掌握DSE考試日期，合理安排溫習時間。',
    url: 'https://dse.best/countdown2027',
    type: 'countdown'
  },
  blog: {
    name: 'dse.best Blog',
    description: 'DSE學習資源、考試技巧、科目指南和最新資訊',
    url: 'https://dse.best/blog/',
    type: 'blog'
  }
};

// Note: FAQ data moved to data/faqs/ in Phase 3
// Preserved here for reference during transition period
