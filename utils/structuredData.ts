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
    englishName: 'Mathematics Extended Part M1',
    description: 'DSE 數學延伸部分 M1 (微積分與統計) 歷屆試題及答案。提供完整試卷下載，助您掌握微積分與統計學重點。',
    englishDescription: 'DSE Mathematics Extended Part M1 (Calculus and Statistics) past papers and answers. Complete exam papers available for download to master calculus and statistics.',
    category: 'elective',
    url: 'https://dse.best/m1'
  },
  m2: {
    name: '數學延伸部分 M2',
    englishName: 'Mathematics Extended Part M2',
    description: 'DSE 數學延伸部分 M2 (代數與微積分) 歷屆試題及答案。提供完整試卷下載，助您掌握代數與微積分重點。',
    englishDescription: 'DSE Mathematics Extended Part M2 (Algebra and Calculus) past papers and answers. Complete exam papers available for download to master algebra and calculus.',
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
    "name": `DSE ${subject.name} ${subject.englishName} Past Papers`,
    "description": subject.description,
    "url": subject.url,
    "inLanguage": ["zh-HK", "en-HK"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "DSEBest",
      "url": "https://dse.best/",
      "description": "DSE.BEST 提供全面的香港中學文憑試 (DSE) 各科歷屆試題及答案"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dse.best/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": subject.category === 'core' ? 'Core Subjects' : 'Elective Subjects',
          "item": `https://dse.best/#${subject.category === 'core' ? 'core' : 'electives'}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${subject.name} ${subject.englishName}`,
          "item": subject.url
        }
      ]
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
        "name": "DSEBest",
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
      question: "DSE中文科包括哪些卷別？",
      answer: "DSE中文科包括卷一閱讀能力、卷二寫作能力、卷三聆聽及綜合能力、卷四說話能力，以及校本評核(SBA)。每卷佔分比重不同，其中卷一和卷二各佔24%。"
    },
    {
      question: "中文科校本評核(SBA)包括什麼內容？",
      answer: "中文科SBA包括閱讀活動、日常課業表現等，佔總分20%。學生需要完成指定的閱讀報告、專題研習等任務，並由任課老師評核。"
    },
    {
      question: "如何有效準備中文科寫作卷？",
      answer: "建議多閱讀不同文體的範文，掌握議論文、記敘文、實用文等寫作技巧。練習時要注意文章結構、論證方法和語言表達，並熟悉考試時間分配。"
    },
    {
      question: "中文科聆聽及綜合能力卷有什麼特點？",
      answer: "卷三結合聆聽理解和綜合寫作，學生需要根據聆聽材料和閱讀材料，綜合分析並撰寫指定文體的文章，考驗理解、分析和表達能力。"
    }
  ],
  english: [
    {
      question: "What are the components of DSE English Language?",
      answer: "DSE English includes Paper 1 Reading, Paper 2 Writing, Paper 3 Listening and Integrated Skills, Paper 4 Speaking, and School-based Assessment (SBA). Papers 1-4 each contribute different weightings to the final grade."
    },
    {
      question: "How is DSE English SBA assessed?",
      answer: "English SBA accounts for 20% of the total score and includes coursework like independent reading, group interaction, and individual presentation. Students are assessed on language proficiency, critical thinking, and communication skills."
    },
    {
      question: "What types of writing are tested in DSE English Paper 2?",
      answer: "Paper 2 tests various text types including argumentative essays, reports, proposals, letters, articles, speeches, and stories. Students choose from 8 questions covering different formats and audiences."
    },
    {
      question: "How should I prepare for English Listening and Integrated Skills?",
      answer: "Paper 3 combines listening comprehension with data file reading and writing tasks. Practice active listening, note-taking skills, and integrating information from multiple sources into coherent written responses."
    }
  ],
  math: [
    {
      question: "DSE數學科分為哪些部分？",
      answer: "DSE數學必修部分分為卷一（多項選擇題）和卷二（長題目），涵蓋數與代數、度量、幾何與三角學、統計與概率四大學習範疇。"
    },
    {
      question: "數學科有哪些主要課題？",
      answer: "主要課題包括：數與代數（如指數函數、對數函數）、幾何與三角學（如圓的性質、三角恆等式）、統計與概率、以及度量等核心內容。"
    },
    {
      question: "如何有效溫習數學科？",
      answer: "建議系統性地溫習各個課題，多做歷屆試題掌握出題模式，重點練習計算技巧和解題方法，並注意時間分配策略。"
    },
    {
      question: "數學延伸部分M1和M2有什麼分別？",
      answer: "M1主要涵蓋微積分與統計，適合理科學生；M2涵蓋代數與微積分，數學要求較高。兩者均為選修科目，可與數學必修部分一同報考。"
    }
  ],
  physics: [
    {
      question: "DSE物理科包括哪些主要範疇？",
      answer: "DSE物理涵蓋四大主要範疇：力學（運動學、動力學）、熱物理學（溫度、熱量）、波動（機械波、聲波、光波）、電磁學（電學、磁學）。"
    },
    {
      question: "物理科校本評核(SBA)如何進行？",
      answer: "物理SBA佔總分20%，包括實驗技能評核。學生需完成指定實驗，展示實驗設計、數據收集、分析及評估能力，並撰寫實驗報告。"
    },
    {
      question: "如何準備物理科實驗部分？",
      answer: "重點掌握基本實驗技能，包括正確使用儀器、準確測量、數據處理、誤差分析等。熟悉常見實驗如單擺、電阻測量、折射率測定等。"
    },
    {
      question: "物理科數學計算有什麼要求？",
      answer: "物理科需要運用數學工具解決問題，包括代數運算、三角函數、對數、微積分初步概念等。建議加強數學基礎，熟練使用計算機。"
    }
  ],
  chemistry: [
    {
      question: "DSE化學科有哪些主要課題？",
      answer: "DSE化學包括原子結構、化學鍵、化學反應、物質狀態、化學平衡、酸鹼、氧化還原、有機化學、金屬、非金屬等核心課題。"
    },
    {
      question: "化學科實驗部分如何評核？",
      answer: "化學SBA佔20%，評核學生的實驗技能，包括實驗設計、安全操作、數據記錄、結果分析等。需要展示對化學原理的理解和應用能力。"
    },
    {
      question: "如何掌握化學方程式？",
      answer: "建議從基本反應類型開始，掌握配平技巧，理解反應機理。多練習常見反應如酸鹼中和、氧化還原、有機反應等，並注意反應條件。"
    },
    {
      question: "有機化學部分有什麼學習重點？",
      answer: "重點掌握官能基的性質和反應，如醇、醛、酮、羧酸等。理解同分異構現象，熟悉命名法則，並能預測和解釋有機反應機理。"
    }
  ],
  biology: [
    {
      question: "DSE生物科涵蓋哪些主要範疇？",
      answer: "DSE生物包括細胞與分子生物學、遺傳與進化、生物與環境、人體生理學四大範疇，涵蓋從分子到生態系統各個層次的生物學知識。"
    },
    {
      question: "生物科校本評核包括什麼內容？",
      answer: "生物SBA佔20%，包括實驗技能和生物科技應用評核。學生需要完成實驗設計、數據分析、科學探究等任務，展示科學思維和實踐能力。"
    },
    {
      question: "如何有效學習生物科概念？",
      answer: "建議建立概念圖連接不同知識點，理解生物現象的因果關係。結合圖表、模型和實例學習，注重理解而非死記硬背。"
    },
    {
      question: "生物科實驗設計有什麼要求？",
      answer: "需要掌握科學方法，包括假設提出、變數控制、對照實驗設計、數據收集與分析等。理解實驗原理，能夠評估實驗的可靠性和有效性。"
    }
  ],
  ict: [
    {
      question: "DSE ICT科包括哪些主要範疇？",
      answer: "DSE ICT涵蓋資訊處理、電腦系統基礎、互聯網及其應用、基本程式編寫概念、電子學習與社會等範疇，結合理論與實踐應用。"
    },
    {
      question: "ICT科校本評核如何進行？",
      answer: "ICT SBA佔總分20%，包括專題研習和實作評核。學生需要完成程式設計、系統開發或資訊科技應用項目，展示解決問題的能力。"
    },
    {
      question: "程式編寫部分有什麼要求？",
      answer: "需要掌握基本程式概念如順序、選擇、循環結構，理解演算法邏輯。雖然不要求特定程式語言，但要能讀懂和編寫簡單程式。"
    },
    {
      question: "如何準備ICT科的資訊處理題目？",
      answer: "重點掌握資料庫操作、試算表應用、數據分析等技能。熟悉常用軟件功能，理解資訊系統的設計原理和應用場景。"
    }
  ],
  m1: [
    {
      question: "數學延伸部分M1涵蓋哪些內容？",
      answer: "M1主要包括微積分（極限、導數、積分）和統計學（概率分布、假設檢定、回歸分析）兩大部分，適合修讀理科的學生。"
    },
    {
      question: "M1的微積分部分有什麼重點？",
      answer: "重點包括函數極限、導數的計算和應用（如切線、極值問題）、積分的基本概念和應用（如面積計算）。需要掌握基本的微積分技巧。"
    },
    {
      question: "M1統計部分與必修部分有什麼分別？",
      answer: "M1統計更深入，涵蓋正態分布、二項分布、假設檢定、置信區間等進階概念。比必修部分的描述統計更注重推論統計的應用。"
    },
    {
      question: "修讀M1需要什麼數學基礎？",
      answer: "需要良好的代數和函數基礎，特別是指數、對數函數的概念。建議數學必修部分有穩固基礎才修讀M1，以確保能應付較高的數學要求。"
    }
  ],
  m2: [
    {
      question: "數學延伸部分M2涵蓋哪些內容？",
      answer: "M2包括代數（矩陣、複數）和微積分（進階微分、積分、微分方程）兩大部分，數學要求較M1更高，適合數學能力較強的學生。"
    },
    {
      question: "M2的複數部分有什麼重點？",
      answer: "重點包括複數的基本運算、極坐標形式、棣莫弗定理的應用。需要理解複數的幾何意義，掌握複數在解方程和三角學中的應用。"
    },
    {
      question: "M2的微分方程如何學習？",
      answer: "從簡單的一階微分方程開始，掌握變數分離法、齊次方程的解法。理解微分方程在物理和工程中的應用，如增長模型、振動問題等。"
    },
    {
      question: "M1和M2應該如何選擇？",
      answer: "M1偏重實際應用，適合理科學生；M2偏重理論推導，適合數學能力強且有興趣深入學習數學的學生。考慮個人興趣、能力和升學需要。"
    }
  ],
  geography: [
    {
      question: "DSE地理科包括哪些主要範疇？",
      answer: "DSE地理包括自然環境、人文環境、全球相互依存關係三大範疇，涵蓋自然地理（如氣候、地貌）和人文地理（如城市化、經濟活動）等內容。"
    },
    {
      question: "地理科校本評核如何進行？",
      answer: "地理SBA佔20%，通常包括實地考察和專題研習。學生需要進行地理調查、數據收集、分析和報告撰寫，展示地理研究技能。"
    },
    {
      question: "如何準備地理科的實地考察？",
      answer: "需要掌握基本的地理調查方法，如問卷設計、測量技術、數據記錄等。了解考察地點的地理特徵，準備相關的理論知識和分析框架。"
    },
    {
      question: "地理科如何有效運用地圖和圖表？",
      answer: "熟練讀取地形圖、氣候圖、人口圖等各類地理圖表。掌握等高線、比例尺、圖例的運用，能夠從圖表中提取和分析地理資訊。"
    }
  ],
  history: [
    {
      question: "DSE歷史科涵蓋哪個時期？",
      answer: "DSE歷史主要涵蓋20世紀的世界歷史，包括兩次世界大戰、冷戰、非殖民化等重大事件，以及相關的政治、經濟、社會發展。"
    },
    {
      question: "歷史科校本評核包括什麼？",
      answer: "歷史SBA佔20%，通常包括獨立專題研習。學生需要選擇歷史課題進行深入研究，運用史料分析、歷史解釋等技能完成研習報告。"
    },
    {
      question: "如何分析歷史史料？",
      answer: "需要考慮史料的性質、來源、目的、可靠性等因素。學會從不同角度解讀史料，比較不同史料的觀點，並結合歷史背景進行批判性思考。"
    },
    {
      question: "歷史科論述題如何作答？",
      answer: "建立清晰的論點，運用具體史實支持論證。注意分析因果關係、比較不同因素的重要性，並能夠從多角度評估歷史事件的影響。"
    }
  ],
  'chinese-history': [
    {
      question: "DSE中國歷史科涵蓋哪些朝代？",
      answer: "DSE中史涵蓋從古代至現代的中國歷史，包括秦漢、魏晋南北朝、隋唐、宋元明清，以及近現代中國的政治、經濟、社會文化發展。"
    },
    {
      question: "中國歷史科如何準備史料題？",
      answer: "熟悉古文閱讀，理解文言文史料的內容和背景。掌握史料分析方法，能夠從史料中提取有用資訊，並結合歷史知識進行解釋和評論。"
    },
    {
      question: "中史科校本評核有什麼要求？",
      answer: "中史SBA佔20%，包括專題研習和日常評核。學生需要選擇中國歷史課題進行研究，運用史學方法分析歷史問題，撰寫研習報告。"
    },
    {
      question: "如何有效記憶中國歷史知識？",
      answer: "建立時間脈絡，理解朝代更替的因果關係。結合地圖、圖表、史料等多元資源學習，注重理解歷史發展的邏輯，而非純粹背誦。"
    }
  ],
  economics: [
    {
      question: "DSE經濟科包括哪些主要概念？",
      answer: "DSE經濟涵蓋微觀經濟（供求理論、市場結構、消費者和生產者理論）和宏觀經濟（國民收入、貨幣銀行、國際貿易、經濟增長）等核心概念。"
    },
    {
      question: "經濟科如何分析圖表？",
      answer: "掌握供求圖、成本收益圖、經濟循環圖等的繪製和解讀。能夠運用圖表分析經濟現象，解釋價格變動、市場均衡、政策效果等經濟問題。"
    },
    {
      question: "經濟科校本評核如何進行？",
      answer: "經濟SBA佔20%，通常包括經濟專題研習。學生需要選擇現實經濟議題進行研究，運用經濟理論分析問題，提出合理的政策建議。"
    },
    {
      question: "如何應用經濟理論解釋現實問題？",
      answer: "學會將抽象的經濟概念與現實情況聯繫，如用供求理論解釋樓價變動、用貨幣理論分析通脹等。注重經濟邏輯的運用和批判思考。"
    }
  ],
  bafs: [
    {
      question: "DSE BAFS科包括哪些主要範疇？",
      answer: "BAFS包括會計（財務會計、成本會計）、商業管理（管理概念、市場學、人力資源）和個人理財三大範疇，涵蓋理論知識和實務應用。"
    },
    {
      question: "BAFS會計部分有什麼重點？",
      answer: "重點掌握複式記帳法、財務報表編製、成本計算等基本概念。理解會計原則和程序，能夠處理日常會計事務和分析財務資訊。"
    },
    {
      question: "BAFS商業管理部分如何學習？",
      answer: "結合現實商業案例學習管理理論，理解企業的組織結構、營運策略、市場推廣等概念。注重理論與實務的結合應用。"
    },
    {
      question: "BAFS校本評核包括什麼內容？",
      answer: "BAFS SBA佔20%，包括商業個案研習或會計實務專題。學生需要分析真實商業情況，運用BAFS知識提出解決方案和建議。"
    }
  ],
  citizen: [
    {
      question: "DSE公民與社會發展科涵蓋哪些範疇？",
      answer: "公民科包括「一國兩制」下的香港、改革開放以來的國家、互聯相依的當代世界三大主題，培養學生的國家觀念、香港情懷和國際視野。"
    },
    {
      question: "公民科如何進行評核？",
      answer: "公民科採用「達標」與「不達標」的等級制，不設分級。評核包括校本評核和公開考試，重視學生的批判思考和價值判斷能力。"
    },
    {
      question: "公民科校本評核有什麼要求？",
      answer: "校本評核包括專題研習和國情考察等活動。學生需要深入了解國家發展、香港社會和國際議題，培養多角度思考和解決問題的能力。"
    },
    {
      question: "如何準備公民科的議題分析？",
      answer: "關注時事發展，運用多元資料和不同觀點分析社會議題。培養批判思考能力，能夠平衡不同持份者的利益和關注點，提出合理建議。"
    }
  ],
  'visual-arts': [
    {
      question: "DSE視覺藝術科包括哪些主要範疇？",
      answer: "DSE視覺藝術包括藝術創作和藝術評賞兩大範疇。藝術創作涵蓋個人作品集、藝術創作過程記錄；藝術評賞包括藝術作品分析、藝術史知識和藝術理論。"
    },
    {
      question: "視覺藝術科校本評核如何進行？",
      answer: "視覺藝術SBA佔總分50%，包括藝術創作作品集和藝術評賞習作。學生需要展示藝術創作能力、藝術評賞技巧和對藝術史的理解。"
    },
    {
      question: "如何準備視覺藝術科作品集？",
      answer: "作品集應展示個人藝術風格和創作過程，包括素描、繪畫、設計等不同媒介的作品。注重作品的多樣性和創意性，並附上創作理念和過程記錄。"
    },
    {
      question: "視覺藝術科藝術評賞有什麼要求？",
      answer: "需要掌握藝術分析框架，能夠從形式、內容、背景等角度分析藝術作品。熟悉不同藝術流派和藝術家的風格特點，並能運用藝術術語進行評賞。"
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
    name: 'HKDSE Past Papers 歷屆試題 | DSE.BEST',
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
  blog: {
    name: 'DSE.BEST Blog',
    description: 'DSE學習資源、考試技巧、科目指南和最新資訊',
    url: 'https://dse.best/blog/',
    type: 'blog'
  }
};

// Website structured data
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DSEBest",
    "description": "DSE.BEST 提供全面的香港中學文憑試 (DSE) 各科歷屆試題及答案，涵蓋中文、英文、數學、物理、化學等主要及選修科目。助您掌握考試趨勢，輕鬆備戰 DSE 考試。",
    "url": "https://dse.best/",
    "inLanguage": ["zh-HK", "en-HK"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dse.best/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
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
      "name": "DSEBest",
      "url": "https://dse.best/",
      "description": "DSE.BEST 提供全面的香港中學文憑試 (DSE) 各科歷屆試題及答案"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "DSE Subject Categories",
      "description": "Complete list of DSE subjects with past papers",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Core Subjects",
          "item": {
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Chinese Language", "url": "https://dse.best/chinese" },
              { "@type": "ListItem", "position": 2, "name": "English Language", "url": "https://dse.best/english" },
              { "@type": "ListItem", "position": 3, "name": "Mathematics", "url": "https://dse.best/math" }
            ]
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Elective Subjects",
          "item": {
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Physics", "url": "https://dse.best/physics" },
              { "@type": "ListItem", "position": 2, "name": "Chemistry", "url": "https://dse.best/chemistry" },
              { "@type": "ListItem", "position": 3, "name": "Biology", "url": "https://dse.best/biology" },
              { "@type": "ListItem", "position": 4, "name": "ICT", "url": "https://dse.best/ict" },
              { "@type": "ListItem", "position": 5, "name": "M1", "url": "https://dse.best/m1" },
              { "@type": "ListItem", "position": 6, "name": "M2", "url": "https://dse.best/m2" },
              { "@type": "ListItem", "position": 7, "name": "Geography", "url": "https://dse.best/geography" },
              { "@type": "ListItem", "position": 8, "name": "History", "url": "https://dse.best/history" },
              { "@type": "ListItem", "position": 9, "name": "Chinese History", "url": "https://dse.best/chinese-history" },
              { "@type": "ListItem", "position": 10, "name": "Economics", "url": "https://dse.best/economics" },
              { "@type": "ListItem", "position": 11, "name": "BAFS", "url": "https://dse.best/bafs" },
              { "@type": "ListItem", "position": 12, "name": "Visual Arts", "url": "https://dse.best/visual-arts" }
            ]
          }
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
      "name": "DSEBest",
      "url": "https://dse.best/",
      "description": "DSE.BEST 提供全面的香港中學文憑試 (DSE) 各科歷屆試題及答案"
    },
    "mainEntity": {
      "@type": "Event",
      "name": "Hong Kong Diploma of Secondary Education Examination 2026",
      "description": "The 2026 Hong Kong Diploma of Secondary Education (HKDSE) examination",
      "startDate": "2026-04-15",
      "endDate": "2026-05-15",
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
      "name": "DSEBest",
      "url": "https://dse.best/",
      "description": "DSE.BEST 提供全面的香港中學文憑試 (DSE) 各科歷屆試題及答案"
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
        "name": "DSEBest",
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
      question: "DSE.BEST提供哪些科目的歷屆試題？",
      answer: "DSE.BEST提供全面的DSE歷屆試題，包括核心科目（中文、英文、數學）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS等），涵蓋2012年至今的完整試題及答案。"
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
      question: "DSE.BEST與其他網站有什麼不同？",
      answer: "DSE.BEST提供最完整的DSE歷屆試題資源，按科目和年份清晰分類，支援快速搜尋。網站採用現代化設計，支援手機瀏覽，並提供豐富的學習資源和考試資訊。"
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
  blog: [
    {
      question: "DSE.BEST Blog提供什麼內容？",
      answer: "DSE.BEST Blog提供最新的DSE考試資訊、學習資源、溫習心得、考生經驗分享、科目指南等內容，幫助學生掌握DSE動向和提升學習效果。"
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
  ]
};

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