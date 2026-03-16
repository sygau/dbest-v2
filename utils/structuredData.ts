// Import the centralized metadata
import { 
  PageMetadata, 
  subjectMetadata, 
  mainPagesMetadata,
  getPageMetadata, 
  getSubjectMetadata, 
  getMainPageMetadata 
} from './pageMetadata';

// Re-export for convenience
export type { PageMetadata };
export { 
  subjectMetadata, 
  mainPagesMetadata,
  getPageMetadata, 
  getSubjectMetadata, 
  getMainPageMetadata 
};



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

export function generateSubjectStructuredData(subjectKey: string) {
  const subject = subjectData[subjectKey];
  if (!subject) {
    console.warn(`No subject data found for: ${subjectKey}`);
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `DSE ${subject.name} ${subject.englishName} Past Papers 歷屆試題`,
    "description": subject.description,
    "url": subject.url,
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
    },
    "mainEntity": {
      "@type": "EducationalResource",
      "name": `DSE ${subject.name} ${subject.englishName} Past Papers`,
      "description": subject.description,
      "educationalLevel": "Secondary Education",
      "educationalUse": "Exam Preparation",
      "learningResourceType": "Past Papers",
      "subject": {
        "@type": "Subject",
        "name": subject.englishName,
        "alternateName": subject.name
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HKDSE Students"
      },
      "provider": {
        "@type": "Organization",
        "name": "dse.best",
        "url": "https://dse.best/"
      }
    }
  };

  return structuredData;
}

// Subject-specific FAQ data
const subjectFAQs: Record<string, Array<{question: string, answer: string}>> = {
  chinese: [
    {
      question: "DSE 中文卷一 閱讀能力 有什麼題型？",
      answer: "DSE中文卷一包括多項選擇題和填充題，考核閱讀理解、字詞運用、篇章結構分析等能力。近年常見題型包括虛構文、非虛構文對讀，以及語體文與文言文比較。"
    },
    {
      question: "DSE 中文卷二 寫作能力 作文題目類型有哪些？",
      answer: "DSE中文卷二提供多個題目，通常包括議論文、記敘文、抒情文、實用文（如建議書、演講稿）等。考生需根據個人強項選擇合適題目，並在1小時45分鐘內完成。"
    },
    {
      question: "DSE 中文 SBA 評分標準 2025 是什麼？",
      answer: "2025 DSE中文SBA佔總分20%，評核項目包括閱讀報告、小組討論、個人口頭報告等。評分標準側重語言表達、內容組織、互動能力及學習反思。"
    },
    {
      question: "DSE 中文 文言文 常考篇目 有哪些？",
      answer: "歷年常考文言文包括《岳陽樓記》、《桃花源記》、《出師表》、《師說》、《六國論》等。建議熟讀課文、掌握字詞解釋、篇章主旨及寫作手法。"
    },
    {
      question: "DSE 中文 如何準備 聆聽及綜合能力？",
      answer: "卷三結合聆聽與寫作，需根據錄音內容和資料冊撰寫指定文體（如新聞稿、建議書）。建議多練習筆記技巧、信息整合和時間分配。"
    }
  ],
  english: [
    {
      question: "DSE English Paper 2 作文題目 有哪些？",
      answer: "DSE English Paper 2 提供8個題目，涵蓋議論文、報告、提案、信件、文章、演講、故事等。考生需選擇1題作答，注意目標讀者和語氣。"
    },
    {
      question: "DSE 英文 SBA 評分標準 2025 是什麼？",
      answer: "2025 DSE英文SBA佔總分20%，包括獨立專題研習（I-SBA）和小組互動。評核重點為語言流利度、邏輯組織、批判思考和互動技巧。"
    },
    {
      question: "DSE 英文 Listening 有什麼技巧？",
      answer: "Paper 3聆聽部分需同時處理錄音和資料冊。建議預先閱讀問題、善用筆記、注意關鍵字和語氣變化。多練習歷屆試題提升反應速度。"
    },
    {
      question: "DSE 英文 Speaking 如何準備？",
      answer: "Paper 4說話能力包括小組討論和個人陳述。建議練習表達意見、回應他人、使用連接詞，並保持自然語速和清晰發音。"
    },
    {
      question: "DSE 英文 Reading 有什麼答題技巧？",
      answer: "Paper 1閱讀理解需掌握主旨、推論、詞義等技巧。建議先看問題再閱讀，善用劃線和筆記，注意文章結構和作者立場。"
    }
  ],
  math: [
    {
      question: "DSE 數學 卷一 卷二 有什麼分別？",
      answer: "DSE數學卷一為長題目，佔65%；卷二為多項選擇題，佔35%。卷一考核解題過程，卷二考核計算速度和準確度。"
    },
    {
      question: "DSE 數學 必修部分 有哪些課題？",
      answer: "DSE數學必修部分包括數與代數、度量、圖形與空間、數據處理四大範疇，涵蓋指數、三角學、統計、概率、座標幾何等核心內容。"
    },
    {
      question: "DSE M1 M2 有什麼分別？哪個較難？",
      answer: "M1（微積分與統計）偏重應用，適合理科生；M2（代數與微積分）偏重理論，數學要求更高。一般認為M2較難，但取決於個人強項。"
    },
    {
      question: "DSE 數學 如何溫習 有效？",
      answer: "建議按課題系統溫習，多做歷屆試題掌握出題模式。重點練習計算技巧、解題方法和時間分配，並訂正錯題。"
    },
    {
      question: "DSE 數學 公式表 有什麼？",
      answer: "DSE數學提供公式表，包括三角學、數列、微積分、統計等常用公式。建議熟習公式表內容，並練習在考試中快速查找。"
    }
  ],
  physics: [
    {
      question: "DSE 物理 有什麼課題？",
      answer: "DSE物理涵蓋力學、熱學、波動、電磁學、放射現象與核能五大範疇，包括運動學、能量、聲波、光波、電路、磁場等核心內容。"
    },
    {
      question: "DSE 物理 SBA 實驗 有什麼？",
      answer: "DSE物理SBA佔20%，評核學生的實驗技能，包括實驗設計、數據收集、分析和評估。常見實驗如單擺、電阻測量、折射率測定等。"
    },
    {
      question: "DSE 物理 公式表 有什麼？",
      answer: "DSE物理提供公式表，涵蓋力學、熱學、波動、電磁學等公式。建議熟習公式用法，並練習單位轉換和數量級估算。"
    },
    {
      question: "DSE 物理 如何溫習 有效？",
      answer: "建議結合概念理解與計算練習，多做歷屆試題。重點掌握實驗題、圖表分析和解釋題的答題技巧。"
    }
  ],
  chemistry: [
    {
      question: "DSE 化學 有什麼課題？",
      answer: "DSE化學包括微觀世界、金屬、酸和鹽、化石燃料、化學電池、反應速率、平衡常數、有機化學等核心課題，涵蓋理論與實踐。"
    },
    {
      question: "DSE 化學 SBA 實驗 有什麼？",
      answer: "DSE化學SBA佔20%，評核學生的實驗技能，包括安全操作、數據記錄、結果分析等。需要展示對化學原理的理解和應用能力。"
    },
    {
      question: "DSE 化學 方程式 如何配平？",
      answer: "建議掌握質量守恆定律，從簡單反應開始練習。多練習酸鹼中和、氧化還原、燃燒反應等常見方程式。"
    },
    {
      question: "DSE 有機化學 有什麼重點？",
      answer: "重點掌握官能基性質、命名法則、反應機理。理解同分異構現象，並能預測和解釋有機反應。"
    }
  ],
  biology: [
    {
      question: "DSE 生物 有什麼課題？",
      answer: "DSE生物包括細胞、遺傳、進化、生態、人體生理、生物科技等範疇，涵蓋從分子到生態系統的生物學知識。"
    },
    {
      question: "DSE 生物 SBA 有什麼？",
      answer: "DSE生物SBA佔20%，包括實驗技能和專題研習。學生需完成科學探究，展示實驗設計、數據分析和科學思維能力。"
    },
    {
      question: "DSE 生物 如何溫習 有效？",
      answer: "建議建立概念圖連接知識點，理解因果關係。結合圖表、模型學習，注重理解而非死記。"
    },
    {
      question: "DSE 生物 實驗設計 有什麼要求？",
      answer: "需要掌握假設提出、變數控制、對照實驗設計等科學方法。能評估實驗可靠性和有效性。"
    }
  ],
  ict: [
    {
      question: "DSE ICT 有什麼課題？",
      answer: "DSE ICT涵蓋資訊處理、電腦系統、互聯網、程式編寫、電子學習等範疇，結合理論與實務應用。"
    },
    {
      question: "DSE ICT SBA 有什麼？",
      answer: "DSE ICT SBA佔20%，包括程式設計、系統開發或資訊科技應用項目，展示解決問題的能力。"
    },
    {
      question: "DSE ICT 程式編寫 有什麼要求？",
      answer: "需要掌握順序、選擇、循環等基本結構，理解演算法邏輯。雖不指定語言，但要能讀懂和編寫簡單程式。"
    },
    {
      question: "DSE ICT 資訊處理 有什麼技巧？",
      answer: "重點掌握資料庫、試算表操作和數據分析。熟悉常用軟件功能，理解資訊系統設計原理。"
    }
  ],
  m1: [
    {
      question: "DSE M1 有什麼內容？",
      answer: "DSE M1包括微積分（極限、導數、積分）和統計學（概率分布、假設檢定）兩大部分，適合理科學生。"
    },
    {
      question: "DSE M1 微積分 有什麼重點？",
      answer: "重點包括導數計算和應用（如極值問題）、積分基本概念和應用（如面積計算）。需掌握基本技巧。"
    },
    {
      question: "DSE M1 統計 有什麼？",
      answer: "M1統計涵蓋正態分布、二項分布、假設檢定、置信區間等進階概念，比必修部分更深入。"
    },
    {
      question: "DSE M1 難嗎？",
      answer: "M1有一定難度，需要良好代數基礎。建議數學必修部分有穩固基礎才修讀。"
    }
  ],
  m2: [
    {
      question: "DSE M2 有什麼內容？",
      answer: "DSE M2包括代數（矩陣、複數）和微積分（進階微分、積分、微分方程）兩大部分，數學要求較高。"
    },
    {
      question: "DSE M2 複數 有什麼重點？",
      answer: "重點包括複數運算、極坐標形式、棣莫弗定理應用。需理解幾何意義和在解方程中的應用。"
    },
    {
      question: "DSE M2 微分方程 有什麼？",
      answer: "從簡單一階微分方程開始，掌握變數分離法、齊次方程解法。理解在物理和工程中的應用。"
    },
    {
      question: "DSE M1 vs M2 如何選擇？",
      answer: "M1偏重應用，適合理科生；M2偏重理論，適合數學能力強的學生。考慮個人興趣、能力和升學需要。"
    }
  ],
  geography: [
    {
      question: "DSE 地理 有什麼課題？",
      answer: "DSE地理包括自然環境、人文環境、全球相互依存三大範疇，涵蓋氣候、地貌、城市化、經濟活動等內容。"
    },
    {
      question: "DSE 地理 SBA 實地考察 有什麼？",
      answer: "地理SBA佔20%，通常包括實地考察和專題研習。需進行地理調查、數據收集、分析和報告撰寫。"
    },
    {
      question: "DSE 地理 如何準備 實地考察？",
      answer: "掌握問卷設計、測量技術、數據記錄等方法。了解考察地點特徵，準備相關理論知識和分析框架。"
    },
    {
      question: "DSE 地理 地圖技巧 有什麼？",
      answer: "需熟練讀取地形圖、氣候圖、人口圖等。掌握等高線、比例尺、圖例運用，能從圖表提取資訊。"
    }
  ],
  history: [
    {
      question: "DSE 歷史 有什麼課題？",
      answer: "DSE歷史主要涵蓋20世紀世界歷史，包括兩次世界大戰、冷戰、非殖民化等重大事件及其政治、經濟、社會發展。"
    },
    {
      question: "DSE 歷史 SBA 專題研習 有什麼？",
      answer: "歷史SBA佔20%，通常包括獨立專題研習。需選擇課題進行深入研究，運用史料分析、歷史解釋等技能完成報告。"
    },
    {
      question: "DSE 歷史 史料分析 有什麼技巧？",
      answer: "需考慮史料性質、來源、目的、可靠性。學會從不同角度解讀，比較觀點，並結合歷史背景批判思考。"
    },
    {
      question: "DSE 歷史 論述題 如何作答？",
      answer: "建立清晰論點，用具體史實支持。分析因果關係、比較因素重要性，並多角度評估歷史事件影響。"
    }
  ],
  'chinese-history': [
    {
      question: "DSE 中史 有什麼朝代？",
      answer: "DSE中史涵蓋從古代至現代的中國歷史，包括秦漢、魏晋南北朝、隋唐、宋元明清，以及近現代中國發展。"
    },
    {
      question: "DSE 中史 史料題 如何準備？",
      answer: "熟悉古文閱讀，理解文言文內容和背景。掌握史料分析方法，能提取資訊並結合歷史知識解釋。"
    },
    {
      question: "DSE 中史 SBA 有什麼？",
      answer: "中史SBA佔20%，包括專題研習和日常評核。需選擇課題研究，運用史學方法分析問題，撰寫報告。"
    },
    {
      question: "DSE 中史 如何記憶 有效？",
      answer: "建立時間脈絡，理解朝代更替因果。結合地圖、圖表、史料學習，注重理解歷史發展邏輯。"
    }
  ],
  economics: [
    {
      question: "DSE 經濟 有什麼概念？",
      answer: "DSE經濟涵蓋微觀經濟（供求理論、市場結構）和宏觀經濟（國民收入、貨幣銀行、國際貿易）等核心概念。"
    },
    {
      question: "DSE 經濟 圖表分析 有什麼技巧？",
      answer: "掌握供求圖、成本收益圖、經濟循環圖的繪製和解讀。能用圖表分析經濟現象和政策效果。"
    },
    {
      question: "DSE 經濟 SBA 有什麼？",
      answer: "經濟SBA佔20%，通常包括經濟專題研習。需選擇現實經濟議題研究，運用理論分析，提出政策建議。"
    },
    {
      question: "DSE 經濟 如何應用理論？",
      answer: "學會將經濟概念與現實連結，如用供求理論解釋樓價變動。注重經濟邏輯運用和批判思考。"
    }
  ],
  bafs: [
    {
      question: "DSE BAFS 有什麼範疇？",
      answer: "BAFS包括會計（財務會計、成本會計）、商業管理（管理、市場學、人力資源）和個人理財三大範疇。"
    },
    {
      question: "DSE BAFS 會計 有什麼重點？",
      answer: "重點掌握複式記帳法、財務報表編製、成本計算等。理解會計原則和程序，能處理日常會計事務。"
    },
    {
      question: "DSE BAFS 商業管理 有什麼？",
      answer: "結合現實案例學習管理理論，理解企業組織、營運策略、市場推廣等概念。注重理論與實務結合。"
    },
    {
      question: "DSE BAFS SBA 有什麼？",
      answer: "BAFS SBA佔20%，包括商業個案研習或會計實務專題。需分析真實情況，提出解決方案和建議。"
    }
  ],
  citizen: [
    {
      question: "DSE 公民科 有什麼主題？",
      answer: "公民科包括「一國兩制」下的香港、改革開放以來的國家、互聯相依的當代世界三大主題。"
    },
    {
      question: "DSE 公民科 如何評核？",
      answer: "公民科採用「達標」與「不達標」等級制，不設分級。評核包括校本評核和公開考試。"
    },
    {
      question: "DSE 公民科 SBA 有什麼？",
      answer: "校本評核包括專題研習和國情考察。需深入了解國家發展、香港社會和國際議題。"
    },
    {
      question: "DSE 公民科 如何準備？",
      answer: "關注時事發展，運用多元資料分析社會議題。培養批判思考能力，平衡不同持份者利益。"
    }
  ],
  ths: [
    {
      question: "DSE 旅遊與款待 有什麼課題？",
      answer: "涵蓋旅遊業和款待業兩大範疇，包括旅遊目的地管理、旅遊產品開發、酒店管理、餐飲服務等。"
    },
    {
      question: "DSE 旅遊與款待 如何評核？",
      answer: "評核包括公開考試（80%）和校本評核（20%）。公開考試分卷一和卷二。"
    },
    {
      question: "DSE 旅遊與款待 SBA 有什麼？",
      answer: "校本評核包括專題研習，需選擇課題研究，運用專業知識分析行業問題，提出解決方案。"
    },
    {
      question: "DSE 旅遊與款待 如何準備？",
      answer: "關注行業最新發展趨勢，了解運作模式和顧客需求。結合理論和實務，培養解決實際問題能力。"
    }
  ],
  'visual-arts': [
    {
      question: "DSE 視覺藝術 有什麼範疇？",
      answer: "包括藝術創作和藝術評賞兩大範疇。創作涵蓋作品集和創作過程記錄；評賞包括作品分析、藝術史和理論。"
    },
    {
      question: "DSE 視覺藝術 SBA 有什麼？",
      answer: "SBA佔總分50%，包括藝術創作作品集和藝術評賞習作。需展示創作能力、評賞技巧和藝術史理解。"
    },
    {
      question: "DSE 視覺藝術 作品集 如何準備？",
      answer: "作品集應展示個人風格和創作過程，包括素描、繪畫、設計等媒介。注重多樣性和創意性。"
    },
    {
      question: "DSE 視覺藝術 評賞 有什麼要求？",
      answer: "需掌握藝術分析框架，能從形式、內容、背景等角度分析作品。熟悉藝術流派和術語。"
    }
  ]
};

export function generateSubjectFAQStructuredData(subjectKey: string) {
  const subject = subjectData[subjectKey];
  const faqs = subjectFAQs[subjectKey];
  
  if (!subject || !faqs) return null;

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return faqData;
}

// Page-specific structured data configurations
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

// Website structured data
export function generateWebsiteStructuredData() {
  // ... rest of the code remains the same ...
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "dse.best",
    "description": "dse.best 提供全面的香港中學文憑試 (DSE) 各科歷屆試題及答案，涵蓋中文、英文、數學、物理、化學等主要及選修科目。助您掌握考試趨勢，輕鬆備戰 DSE 考試。",
    "url": "https://dse.best/",
    "inLanguage": ["zh-HK", "en-HK"]
  };
}

// Homepage structured data
export function generateHomepageStructuredData() {
  const page = pageData.homepage;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "description": page.description,
    "url": page.url,
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "2026 DSE Countdown Timer 倒數計時器",
          "item": "https://dse.best/countdown"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "中文 歷屆試題 Chinese Past Papers",
          "item": "https://dse.best/chinese"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "英文 歷屆試題 English Past Papers",
          "item": "https://dse.best/english"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "數學 歷屆試題 Mathematics Past Papers",
          "item": "https://dse.best/math"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "物理 歷屆試題 Physics Past Papers",
          "item": "https://dse.best/physics"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "化學 歷屆試題 Chemistry Past Papers",
          "item": "https://dse.best/chemistry"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "生物 歷屆試題 Biology Past Papers",
          "item": "https://dse.best/biology"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "資訊及通訊科技 ICT Past Papers",
          "item": "https://dse.best/ict"
        },
        {
          "@type": "ListItem",
          "position": 9,
          "name": "數學延伸部分 M1 Past Papers",
          "item": "https://dse.best/m1"
        },
        {
          "@type": "ListItem",
          "position": 10,
          "name": "數學延伸部分 M2 Past Papers",
          "item": "https://dse.best/m2"
        },
        {
          "@type": "ListItem",
          "position": 11,
          "name": "地理 歷屆試題 Geography Past Papers",
          "item": "https://dse.best/geography"
        },
        {
          "@type": "ListItem",
          "position": 12,
          "name": "歷史 歷屆試題 History Past Papers",
          "item": "https://dse.best/history"
        },
        {
          "@type": "ListItem",
          "position": 13,
          "name": "中國歷史 歷屆試題 Chinese History Past Papers",
          "item": "https://dse.best/chinese-history"
        },
        {
          "@type": "ListItem",
          "position": 14,
          "name": "經濟 歷屆試題 Economics Past Papers",
          "item": "https://dse.best/economics"
        },
        {
          "@type": "ListItem",
          "position": 15,
          "name": "企業、會計與財務概論 BAFS Past Papers",
          "item": "https://dse.best/bafs"
        },
        {
          "@type": "ListItem",
          "position": 16,
          "name": "公民與社會發展 Citizenship Past Papers",
          "item": "https://dse.best/citizen"
        },
        {
          "@type": "ListItem",
          "position": 17,
          "name": "DSE 番茄鐘 Pomodoro Timer",
          "item": "https://dse.best/pomodoro"
        }
      ]
    }
  };
}

// Countdown page structured data
export function generateCountdownStructuredData() {
  const page = pageData.countdown;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "description": page.description,
    "url": page.url,
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
    },
    "mainEntity": {
      "@type": "Event",
      "name": "Hong Kong Diploma of Secondary Education Examination 2026",
      "description": "The 2026 Hong Kong Diploma of Secondary Education (HKDSE) examination",
      "startDate": "2026-04-15",
      "endDate": "2026-05-15",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Hong Kong",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "HK"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Hong Kong Examinations and Assessment Authority",
        "url": "https://www.hkeaa.edu.hk"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Secondary School Students"
      }
    }
  };
}

// Countdown 2027 page structured data
export function generateCountdown2027StructuredData() {
  const page = pageData.countdown2027;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "description": page.description,
    "url": page.url,
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026、2027 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
    },
    "mainEntity": {
      "@type": "Event",
      "name": "Hong Kong Diploma of Secondary Education Examination 2027",
      "description": "The 2027 Hong Kong Diploma of Secondary Education (HKDSE) examination",
      "startDate": "2027-04-15",
      "endDate": "2027-05-15",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Hong Kong",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "HK"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Hong Kong Examinations and Assessment Authority",
        "url": "https://www.hkeaa.edu.hk"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Secondary School Students"
      }
    }
  };
}

// Chat page structured data
export function generateChatStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "dse.best Chat 聊天室",
    "description": "加入dse.best學習社群聊天室/DSE Chat Room，與其他同學即時討論DSE備考心得、學習技巧和考試經驗。支援實時對話、貼圖互動，打造友善的學習交流環境。",
    "url": "https://dse.best/chat",
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "DSE Best Chat",
      "description": "實時學習討論聊天室",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "url": "https://dse.best/chat",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "HKD"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "DSE Students"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "dse.best 主頁",
          "item": "https://dse.best/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "DSE Chat 聊天室",
          "item": "https://dse.best/chat"
        }
      ]
    }
  };
}

// Blog index structured data
export function generateBlogStructuredData(posts: any[] = []) {
  const page = pageData.blog;
  
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": page.name,
    "description": page.description,
    "url": page.url,
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
    },
    "blogPost": posts.map((post, index) => ({
      "@type": "BlogPosting",
      "headline": post.seoTitle,
      "description": post.seoDescription,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.createdAt,
      "dateModified": post.updatedAt,
      "url": `https://dse.best/blog/${post.slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://dse.best/blog/${post.slug}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "dse.best",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dse.best/assets/images/logo-icon.webp"
        }
      }
    }))
  };
}

// Page-specific FAQ data
const pageFAQs: Record<string, Array<{question: string, answer: string}>> = {
  homepage: [
    {
      question: "dse.best提供哪些科目的歷屆試題？",
      answer: "dse.best提供全面的DSE歷屆試題，包括核心科目（中文、英文、數學）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS等），涵蓋2012年至今的完整試題及答案。"
    },
    {
      question: "如何下載DSE歷屆試題？",
      answer: "進入相應科目頁面，按年份選擇試題，點擊「Download」按鈕即可下載PDF格式的試題及答案。所有試題均為免費提供，無需註冊即可下載。"
    },
    {
      question: "這些試題是最新的嗎？",
      answer: "我們會定期更新歷屆試題，包括最新的考試年份。目前提供至2024年的試題，2025年試題將在考試完成後更新。請查看各科目頁面的更新日期。"
    },
    {
      question: "dse.best與其他網站有什麼不同？",
      answer: "dse.best提供最完整的DSE歷屆試題資源，按科目和年份清晰分類，支援快速搜尋。網站採用現代化設計，支援手機瀏覽，並提供豐富的學習資源和考試資訊。"
    }
  ],
  countdown: [
    {
      question: "DSE 2026考試日期是什麼時候？",
      answer: "DSE 2026考試預計於2026年4月至5月舉行，具體日期將由香港考試及評核局(HKEAA)公佈。考生應密切關注官方公佈的考試時間表。"
    },
    {
      question: "如何有效利用倒數時間準備DSE？",
      answer: "建議制定詳細的溫習計劃，按科目和課題分配時間。多做歷屆試題，掌握出題模式。保持規律作息，適當休息，確保身心健康。"
    },
    {
      question: "DSE考試包括哪些科目？",
      answer: "DSE包括核心科目（中文、英文、數學、公民與社會發展）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS等）。"
    },
    {
      question: "如何查詢DSE考試成績？",
      answer: "DSE成績通常在7月公佈，考生可通過香港考試及評核局網站或手機應用程式查詢成績。學校考生會收到成績通知書，自修生則需自行查詢。"
    }
  ],
  countdown2027: [
    {
      question: "DSE 2027考試日期是什麼時候？",
      answer: "DSE 2027考試日期尚未由香港考試及評核局(HKEAA)正式公佈。根據2026年考試日期推算，預計於2027年4月至5月舉行。考生應密切關注官方公佈的考試時間表。"
    },
    {
      question: "2027年DSE考試日期確定了嗎？",
      answer: "目前2027年DSE考試日期尚未正式公佈。此倒數計時器基於2026年考試日期推算，實際日期可能有所不同。請以香港考試及評核局官方公佈為準。"
    },
    {
      question: "如何有效利用倒數時間準備DSE？",
      answer: "建議制定詳細的溫習計劃，按科目和課題分配時間。多做歷屆試題，掌握出題模式。保持規律作息，適當休息，確保身心健康。"
    },
    {
      question: "DSE考試包括哪些科目？",
      answer: "DSE包括核心科目（中文、英文、數學、公民與社會發展）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS等）。"
    }
  ],
  blog: [
    {
      question: "dse.best Blog提供什麼內容？",
      answer: "dse.best Blog提供最新的DSE考試資訊、學習資源、溫習心得、考生經驗分享、科目指南等內容，幫助學生掌握DSE動向和提升學習效果。"
    },
    {
      question: "如何找到特定科目的文章？",
      answer: "可以使用頁面頂部的分類按鈕篩選文章，或使用搜尋功能查找特定主題。文章按科目分類，包括中文、英文、數學、物理、化學等各科內容。"
    },
    {
      question: "Blog文章多久更新一次？",
      answer: "我們會定期更新Blog內容，包括考試資訊、學習技巧、歷屆試題分析等。建議定期查看最新文章，掌握DSE考試動態。"
    },
    {
      question: "可以分享或轉載Blog文章嗎？",
      answer: "歡迎分享文章連結，但請尊重版權，不要直接複製內容。如需轉載，請聯繫我們獲得授權，並註明來源。"
    }
  ],
  chat: [
    {
      question: "DSE學習交流聊天室有什麼功能？",
      answer: "dse.best DSE學習交流聊天室提供香港中學文憑試學生即時討論平台，支援實時文字對話、表情符號、用戶名稱自定義等功能。學生可以討論DSE各科備考心得、分享歷屆試題解答技巧、交流考試經驗和溫習方法。"
    },
    {
      question: "DSE Chat Room如何幫助備考？",
      answer: "透過DSE聊天室，學生可以與其他應屆考生即時討論中文、英文、數學、物理、化學、生物等科目的學習難點，分享有效的溫習策略、解題技巧和時間管理方法。互相鼓勵支持，減輕DSE考試壓力。"
    },
    {
      question: "香港DSE學生聊天室討論什麼科目？",
      answer: "DSE聊天室歡迎討論所有香港中學文憑試科目，包括核心科目（中文、英文、數學、公民科）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS、視覺藝術等）的學習心得和考試技巧。"
    },
    {
      question: "DSE 2025考生可以在聊天室討論什麼？",
      answer: "DSE 2025考生可以討論最新考試安排、各科溫習進度、歷屆試題分析、選科建議、升學規劃、JUPAS選科策略、Cut-off分數預測等。也可以分享有效的學習資源和備考心得。"
    },
    {
      question: "如何在DSE聊天室獲得學習支援？",
      answer: "在DSE聊天室中，你可以向其他同學請教學習問題、尋求科目建議、分享溫習困難。其他經驗豐富的同學會分享有用的學習方法、推薦優質資源，提供情緒支持和鼓勵。"
    },
    {
      question: "DSE聊天室的使用時間和規則是什麼？",
      answer: "DSE聊天室24小時開放，方便不同時間學習的同學交流。請保持友善尊重的態度，專注DSE學習相關討論。禁止發送廣告、不當內容或垃圾訊息，共同維護積極正面的DSE學習交流環境。"
    }
  ],
  cutoff: [
    {
      question: "What are HKDSE cut-off scores?",
      answer: "HKDSE cut-off scores are the minimum marks students need to achieve to obtain specific grades (5**, 5*, 5, 4, 3, 2). These grade boundaries are adjusted annually based on exam difficulty and overall student performance, published by the Hong Kong Examinations and Assessment Authority (HKEAA)."
    },
    {
      question: "How do I find cut-off scores for a specific subject?",
      answer: "Select the subject and year on this page to view the grade boundaries. You can also use the search function to quickly find specific grades or score ranges. The data is organized by subject and year for easy navigation."
    },
    {
      question: "What does the percentage in cut-off scores mean?",
      answer: "The percentage shows the proportion of students who achieved that grade. For example, if the 5** grade has 84%, it means approximately 84% of students reached the 5** cut-off score. This helps understand the competitiveness of each grade level."
    },
    {
      question: "Do cut-off scores change every year?",
      answer: "Yes, cut-off scores are adjusted annually based on exam difficulty and student performance. More difficult exams typically have lower cut-off scores, while easier exams have higher boundaries. It's recommended to analyze multi-year data to understand trends."
    },
    {
      question: "How can I use cut-off scores to plan my study strategy?",
      answer: "Understanding target grade cut-off scores helps set clear learning goals. Analyze multi-year data to understand score trends and develop targeted study plans based on your strengths and weaknesses. This data-driven approach improves exam preparation effectiveness."
    },
    {
      question: "What's the difference between cut-off scores and raw marks?",
      answer: "Cut-off scores are the minimum marks required for each grade, while raw marks are the actual scores students receive. Cut-off scores help you understand what you need to achieve for your target grade, making them essential for goal setting and study planning."
    },
    {
      question: "How accurate are the cut-off scores on this website?",
      answer: "Our cut-off scores are sourced from official HKEAA publications and updated annually. We strive to provide the most accurate and up-to-date information to help students make informed decisions about their exam preparation and grade targets."
    }
  ],
  resources: [
    {
      question: "dse.best 提供哪些學習資源？",
      answer: "dse.best 提供全面的DSE學習資源，包括歷屆試題下載、Cut-off分數查詢、DSE倒數計時器、學習交流室、學習博客、考試技巧、備考策略等。涵蓋中文、英文、數學、物理、化學、生物等全科資源。"
    },
    {
      question: "如何有效利用這些學習資源？",
      answer: "建議按以下順序使用：1) 先了解各科目資源，2) 制定個人學習計劃，3) 定期練習歷屆試題，4) 使用學習工具如倒數計時器，5) 參與學習交流討論，6) 閱讀學習博客獲取最新資訊。"
    },
    {
      question: "學習資源多久更新一次？",
      answer: "我們會定期更新學習資源，包括最新歷屆試題、考試資訊、學習技巧、備考策略等。一般每月都會有新內容加入，確保學生獲得最新最準確的學習資料。"
    },
    {
      question: "這些學習資源都是免費的嗎？",
      answer: "是的，dse.best 提供的所有學習資源都是完全免費的，包括歷屆試題下載、學習工具使用、學習博客閱讀等。我們致力於為香港DSE學生提供免費優質的學習支援。"
    },
    {
      question: "如何找到特定科目的學習資源？",
      answer: "您可以通過導航菜單選擇特定科目，或直接訪問對應的科目頁面。每個科目頁面都包含該科目的歷屆試題、學習資源和相關資訊。"
    }
  ],
  timer: [
    {
      question: "DSE 操卷計時器提供哪些提醒功能？",
      answer: "計時器會在剩餘 15 分鐘時顯示提示並播放聲效，時間歸零時亦會自動響鈴及顯示完成通知，協助你模擬真實考場節奏。"
    },
    {
      question: "全螢幕專注模式有甚麼作用？",
      answer: "啟動全螢幕後，瀏覽器標籤與工具列會隱藏，減少分心，讓你在家操卷時亦能維持考場級專注。"
    },
    {
      question: "如何善用官方考試時限預設？",
      answer: "選擇科目及卷別後，計時器會自動套用香港考試及評核局公布的正式考試時數。建議預留最後 5 至 10 分鐘檢查答案，透過多次限時練習建立時間感。"
    },
    {
      question: "操卷時可以同時記錄多科進度嗎？",
      answer: "可以。系統支援快速切換科目與卷別，你可按需要重設倒數或重新啟動，方便管理不同科目的操卷練習。"
    },
    {
      question: "如何提升操卷效率與專注力？",
      answer: "建議配合番茄鐘節奏使用：完成一份限時試卷後休息約 15 分鐘，再檢討錯題與整理重點，有助提升專注力與記憶效果。"
    }
  ]
};

export function getPageFAQs(pageKey: string) {
  const faqs = pageFAQs[pageKey];
  if (!faqs) return [] as Array<{ id: string; question: string; answer: string }>;

  return faqs.map((faq, index) => ({
    id: `${pageKey}-faq-${index + 1}`,
    ...faq
  }));
}

// Generate FAQ structured data for pages
export function generatePageFAQStructuredData(pageKey: string) {
  const faqs = pageFAQs[pageKey];
  
  if (!faqs) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
export function getTimerPageMetadata(): PageMetadata {
  return (
    getMainPageMetadata('timer') ?? {
      title: 'DSE 操卷計時器 Timer | 模擬考試倒數工具',
      description:
        'DSE 操卷計時器提供官方考試時限預設、15 分鐘剩餘提醒、完結提示音及全螢幕專注模式，協助考生在家模擬真實考場節奏。',
      robots: 'index, follow',
      ogTitle: 'DSE 操卷計時器 Timer | 模擬考試倒數工具',
      ogDescription:
        '一鍵選擇科目與卷別，自動套用 香港考試及評核局 HKDSE 官方考試時間，提供 15 分鐘預警和完成提示音，支援全螢幕專注模式及多科快速切換。',
      ogImage: 'https://dse.best/assets/images/logo-icon.png',
      ogUrl: 'https://dse.best/timer',
      ogType: 'website'
    }
  );
}
// Generate Resources page structured data
export function generateResourcesStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DSE 學習資源 Learning Resources",
    "description": "DSE 學習資源中心，提供歷屆試題下載、學習工具、考試技巧、備考策略等全方位學習支援。",
    "url": "https://dse.best/resources",
    "mainEntity": {
      "@type": "ItemList",
      "name": "DSE Learning Resources",
      "description": "Comprehensive collection of DSE learning resources including past papers, study tools, and exam preparation guides",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "歷屆試題 Past Papers",
          "description": "Complete collection of DSE past papers from 2012-2024"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cut-off分數查詢",
          "description": "Grade boundary scores for all subjects"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "學習工具 Study Tools",
          "description": "DSE countdown timer, chatroom, and learning blog"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "考試技巧 Exam Tips",
          "description": "Study strategies and exam preparation guides"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "dse.best",
      "url": "https://dse.best"
    }
  };
}

export function generateTimerStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DSE 操卷計時器 | 官方考試時間預設 | 模擬考場倒數工具",
    "description": "最強 DSE 操卷倒數工具。內置 DSE 各科官方考試時間，專為 Mock Exam 及練習 Past Paper 設計。助考生在家精準模擬真實考場節奏，提升答題速度，係 DSE 備戰必備工具。",
    "url": "https://dse.best/timer",
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋全科歷屆試題及答案，助你掌握 DSE 考試趨勢。"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "DSE 操卷計時器",
      "description": "模擬 HKDSE 官方考試時間的網上倒數工具，專為考生操練 Past Paper 及模擬試設計，助你精準掌握答題時間。",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "url": "https://dse.best/timer",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "HKD"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HKDSE Students"
      },
      "featureList": [
        "內置 HKDSE 各科目官方卷別考試時限",
        "精準模擬真實考場計時節奏",
        "一鍵切換各科試卷時間設定",
        "專為 Past Paper 操練而設的倒數功能",
        "優化答題速度管理"
      ],
      "provider": {
        "@type": "Organization",
        "name": "dse.best",
        "url": "https://dse.best/"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "DSE 番茄鐘 Pomodoro Timer",
          "item": "https://dse.best/pomodoro"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "DSE 倒數計時器 Countdown Timer",
          "item": "https://dse.best/countdown"
        }
      ]
    }
  };
}

// Generate Pomodoro page structured data
export function generatePomodoroStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "番茄鐘 Pomodoro Timer | DSE 學習工具",
    "description": "番茄鐘 Pomodoro Timer DSE 學習工具，幫助DSE學生提高學習效率，合理安排學習和休息時間。採用番茄工作法，25分鐘專注學習，5分鐘休息，提升學習效果。",
    "url": "https://dse.best/pomodoro",
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "DSE Pomodoro Timer",
      "description": "專為DSE學生設計的番茄工作法計時器，幫助提高學習專注力和效率",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "url": "https://dse.best/pomodoro",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "HKD"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "DSE Students"
      },
      "featureList": [
        "25分鐘專注學習計時",
        "5分鐘短休息提醒",
        "15分鐘長休息功能",
        "學習進度追蹤",
        "可自訂時間設定",
        "聲音提醒功能"
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "dse.best 主頁",
          "item": "https://dse.best/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "番茄鐘 Pomodoro Timer",
          "item": "https://dse.best/pomodoro"
        }
      ]
    }
  };
}

// Generate Individual Response page structured data
export function generateIndividualResponseStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DSE English Oral Individual Response 練習 | 口試計時器",
    "description": "DSE English Oral Practice Timer 專為 DSE 英文科口試 Individual Response 設計，提供 30+ 真題練習、語音朗讀、60秒計時功能，助你提升口試表現。模擬真實考試流程，自動播放題目、計時、提示完成。",
    "url": "https://dse.best/individual-response",
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "DSE English Speaking Individual Response 練習計時器",
      "description": "專為 DSE 英文科口試 Individual Response 設計的練習計時器，提供 30+ 真題、語音朗讀、60秒倒數功能，助你提升口試表現。",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "url": "https://dse.best/individual-response",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "HKD"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HKDSE Students"
      },
      "featureList": [
        "30+ DSE Individual Response 真題",
        "語音朗讀題目 (Text-to-Speech)",
        "60秒倒數計時",
        "自動播放提示音效",
        "題目隨機抽取",
        "練習進度保存"
      ],
      "provider": {
        "@type": "Organization",
        "name": "dse.best",
        "url": "https://dse.best/"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "dse.best 主頁",
          "item": "https://dse.best/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "DSE English Oral Individual Response",
          "item": "https://dse.best/individual-response"
        }
      ]
    }
  };
}

// Generate Translator page structured data
export function generateTranslatorStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "文言文翻譯機 Classical Chinese Translator | AI 古文翻譯工具",
    "description": "免費 AI 文言文翻譯機，即時將古文翻譯成現代白話文。專為 DSE 中文科學生設計，支援《岳陽樓記》、《出師表》、《六國論》等常見文言文篇章翻譯。輕鬆理解古文意思，提升中文閱讀能力。",
    "url": "https://dse.best/translator",
    "inLanguage": ["zh-HK", "zh-CN"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "dse.best",
      "url": "https://dse.best/",
      "description": "DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "文言文翻譯機 Classical Chinese Translator",
      "description": "AI 驅動的文言文翻譯工具，即時將古文翻譯成現代白話文，專為 DSE 中文科學生設計，助你理解文言文篇章。",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "url": "https://dse.best/translator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "HKD"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HKDSE Students"
      },
      "featureList": [
        "AI 即時翻譯文言文至白話文",
        "支援 DSE 常見文言文篇章",
        "簡潔易用的翻譯介面",
        "免費使用無限制",
        "提升中文閱讀理解能力"
      ],
      "provider": {
        "@type": "Organization",
        "name": "dse.best",
        "url": "https://dse.best/"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "dse.best 主頁",
          "item": "https://dse.best/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "文言文翻譯機",
          "item": "https://dse.best/translator"
        }
      ]
    }
  };
}