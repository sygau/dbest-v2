import { webPageBase, softwareApp, breadcrumbList, WEBSITE_SCHEMA } from './helpers'

export const pageJsonLd: Record<string, object> = {
  homepage: {
    ...webPageBase(
      'HKDSE Past Papers 歷屆試題 | 中文、英文、數學、Phy、Chem、Bio、M1/M2',
      'DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。',
      'https://dse.best/'
    ),
    breadcrumb: breadcrumbList([
      { name: '2027 DSE Countdown Timer 倒數計時器', url: 'https://dse.best/countdown' },
      { name: '中文 歷屆試題 Chinese Past Papers', url: 'https://dse.best/chinese' },
      { name: '英文 歷屆試題 English Past Papers', url: 'https://dse.best/english' },
      { name: '數學 歷屆試題 Mathematics Past Papers', url: 'https://dse.best/math' },
      { name: '物理 歷屆試題 Physics Past Papers', url: 'https://dse.best/physics' },
      { name: '化學 歷屆試題 Chemistry Past Papers', url: 'https://dse.best/chemistry' },
      { name: '生物 歷屆試題 Biology Past Papers', url: 'https://dse.best/biology' },
      { name: '資訊及通訊科技 ICT Past Papers', url: 'https://dse.best/ict' },
      { name: '數學延伸部分 M1 Past Papers', url: 'https://dse.best/m1' },
      { name: '數學延伸部分 M2 Past Papers', url: 'https://dse.best/m2' },
      { name: '地理 歷屆試題 Geography Past Papers', url: 'https://dse.best/geography' },
      { name: '歷史 歷屆試題 History Past Papers', url: 'https://dse.best/history' },
      { name: '中國歷史 歷屆試題 Chinese History Past Papers', url: 'https://dse.best/chinese-history' },
      { name: '經濟 歷屆試題 Economics Past Papers', url: 'https://dse.best/economics' },
      { name: '企業、會計與財務概論 BAFS Past Papers', url: 'https://dse.best/bafs' },
      { name: '公民與社會發展 Citizenship Past Papers', url: 'https://dse.best/citizen' },
      { name: 'DSE 番茄鐘 Pomodoro Timer', url: 'https://dse.best/pomodoro' },
    ]),
  },

  countdown: {
    ...webPageBase(
      'DSE 2027 Countdown 考試日期倒數',
      'DSE倒數計時器，幫助你準備文憑試。掌握DSE考試日期，合理安排溫習時間。',
      'https://dse.best/countdown'
    ),
    mainEntity: {
      '@type': 'Event',
      name: 'Hong Kong Diploma of Secondary Education Examination 2027',
      description: 'The 2027 Hong Kong Diploma of Secondary Education (HKDSE) examination',
      startDate: '2027-04-07',
      endDate: '2027-05-14',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: 'Hong Kong',
        address: { '@type': 'PostalAddress', addressCountry: 'HK' },
      },
      organizer: {
        '@type': 'Organization',
        name: 'Hong Kong Examinations and Assessment Authority',
        url: 'https://www.hkeaa.edu.hk',
      },
      audience: { '@type': 'Audience', audienceType: 'Secondary School Students' },
    },
  },

  countdown2028: {
    ...webPageBase(
      'DSE 2028 Countdown 考試日期倒數',
      'DSE 2028倒數計時器，幫助你準備文憑試。掌握DSE考試日期，合理安排溫習時間。',
      'https://dse.best/countdown/2028'
    ),
    mainEntity: {
      '@type': 'Event',
      name: 'Hong Kong Diploma of Secondary Education Examination 2028',
      description: 'The 2028 Hong Kong Diploma of Secondary Education (HKDSE) examination',
      startDate: '2028-04-05',
      endDate: '2028-05-12',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: 'Hong Kong',
        address: { '@type': 'PostalAddress', addressCountry: 'HK' },
      },
      organizer: {
        '@type': 'Organization',
        name: 'Hong Kong Examinations and Assessment Authority',
        url: 'https://www.hkeaa.edu.hk',
      },
      audience: { '@type': 'Audience', audienceType: 'Secondary School Students' },
    },
  },

  countdown2029: {
    ...webPageBase(
      'DSE 2029 Countdown 考試日期倒數',
      'DSE 2029倒數計時器，幫助你準備文憑試。掌握DSE考試日期，合理安排溫習時間。',
      'https://dse.best/countdown/2029'
    ),
    mainEntity: {
      '@type': 'Event',
      name: 'Hong Kong Diploma of Secondary Education Examination 2029',
      description: 'The 2029 Hong Kong Diploma of Secondary Education (HKDSE) examination',
      startDate: '2029-04-04',
      endDate: '2029-05-11',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: 'Hong Kong',
        address: { '@type': 'PostalAddress', addressCountry: 'HK' },
      },
      organizer: {
        '@type': 'Organization',
        name: 'Hong Kong Examinations and Assessment Authority',
        url: 'https://www.hkeaa.edu.hk',
      },
      audience: { '@type': 'Audience', audienceType: 'Secondary School Students' },
    },
  },

  chat: {
    ...webPageBase(
      'dse.best Chat 聊天室',
      '加入dse.best學習社群聊天室/DSE Chat Room，與其他同學即時討論DSE備考心得、學習技巧和考試經驗。支援實時對話、貼圖互動，打造友善的學習交流環境。',
      'https://dse.best/chat'
    ),
    mainEntity: softwareApp(
      'DSE Best Chat',
      '實時學習討論聊天室',
      'https://dse.best/chat',
      ['即時文字對話', '表情符號互動', '用戶名稱自定義', '24小時開放', 'DSE學習討論']
    ),
    breadcrumb: breadcrumbList([
      { name: 'dse.best 主頁', url: 'https://dse.best/' },
      { name: 'DSE Chat 聊天室', url: 'https://dse.best/chat' },
    ]),
  },

  timer: {
    ...webPageBase(
      'DSE 操卷計時器 | 官方考試時間預設 | 模擬考場倒數工具',
      '最強 DSE 操卷倒數工具。內置 DSE 各科官方考試時間，專為 Mock Exam 及練習 Past Paper 設計。助考生在家精準模擬真實考場節奏，提升答題速度，係 DSE 備戰必備工具。',
      'https://dse.best/timer'
    ),
    mainEntity: softwareApp(
      'DSE 操卷計時器',
      '模擬 HKDSE 官方考試時間的網上倒數工具，專為考生操練 Past Paper 及模擬試設計，助你精準掌握答題時間。',
      'https://dse.best/timer',
      [
        '內置 HKDSE 各科目官方卷別考試時限',
        '精準模擬真實考場計時節奏',
        '一鍵切換各科試卷時間設定',
        '專為 Past Paper 操練而設的倒數功能',
        '優化答題速度管理',
      ]
    ),
    breadcrumb: breadcrumbList([
      { name: 'DSE 番茄鐘 Pomodoro Timer', url: 'https://dse.best/pomodoro' },
      { name: 'DSE 倒數計時器 Countdown Timer', url: 'https://dse.best/countdown' },
    ]),
  },

  pomodoro: {
    ...webPageBase(
      '番茄鐘 Pomodoro Timer | DSE 學習工具',
      '番茄鐘 Pomodoro Timer DSE 學習工具，幫助DSE學生提高學習效率，合理安排學習和休息時間。採用番茄工作法，25分鐘專注學習，5分鐘休息，提升學習效果。',
      'https://dse.best/pomodoro'
    ),
    mainEntity: softwareApp(
      'DSE Pomodoro Timer',
      '專為DSE學生設計的番茄工作法計時器，幫助提高學習專注力和效率',
      'https://dse.best/pomodoro',
      ['25分鐘專注學習計時', '5分鐘短休息提醒', '15分鐘長休息功能', '學習進度追蹤', '可自訂時間設定', '聲音提醒功能']
    ),
    breadcrumb: breadcrumbList([
      { name: 'dse.best 主頁', url: 'https://dse.best/' },
      { name: '番茄鐘 Pomodoro Timer', url: 'https://dse.best/pomodoro' },
    ]),
  },

  resources: {
    ...webPageBase(
      'DSE 學習資源 Learning Resources',
      'DSE 學習資源中心，提供歷屆試題下載、學習工具、考試技巧、備考策略等全方位學習支援。',
      'https://dse.best/resources'
    ),
    mainEntity: {
      '@type': 'ItemList',
      name: 'DSE Learning Resources',
      description: 'Comprehensive collection of DSE learning resources including past papers, study tools, and exam preparation guides',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '歷屆試題 Past Papers', description: 'Complete collection of DSE past papers from 2012-2024' },
        { '@type': 'ListItem', position: 2, name: 'Cut-off分數查詢', description: 'Grade boundary scores for all subjects' },
        { '@type': 'ListItem', position: 3, name: '學習工具 Study Tools', description: 'DSE countdown timer, chatroom, and learning blog' },
        { '@type': 'ListItem', position: 4, name: '考試技巧 Exam Tips', description: 'Study strategies and exam preparation guides' },
      ],
    },
  },

  'individual-response': {
    ...webPageBase(
      'DSE English Oral Individual Response 練習 | 口試計時器',
      'DSE English Oral Practice Timer 專為 DSE 英文科口試 Individual Response 設計，提供 30+ 真題練習、語音朗讀、60秒計時功能，助你提升口試表現。模擬真實考試流程，自動播放題目、計時、提示完成。',
      'https://dse.best/individual-response'
    ),
    mainEntity: softwareApp(
      'DSE English Speaking Individual Response 練習計時器',
      '專為 DSE 英文科口試 Individual Response 設計的練習計時器，提供 30+ 真題、語音朗讀、60秒倒數功能，助你提升口試表現。',
      'https://dse.best/individual-response',
      [
        '30+ DSE Individual Response 真題',
        '語音朗讀題目 (Text-to-Speech)',
        '60秒倒數計時',
        '自動播放提示音效',
        '題目隨機抽取',
        '練習進度保存',
      ]
    ),
    breadcrumb: breadcrumbList([
      { name: 'dse.best 主頁', url: 'https://dse.best/' },
      { name: 'DSE English Oral Individual Response', url: 'https://dse.best/individual-response' },
    ]),
  },

  'eng-b1b2': {
    ...webPageBase(
      'DSE 英文 B1 B2 轉換表 2012-2025 (Paper 1B/3B) 閱讀+聆聽 | English B1 B2 Conversion Table',
      '歷年 DSE 英文 B1 轉 B2 分數對照表，涵蓋 Paper 1 閱讀 (1B) 及 Paper 3 聆聽 (3B)，2012 至 2025 年轉換系數一覽，附 B1 分數購買力趨勢圖表。數據由社群估算，非 HKEAA 官方資料。',
      'https://dse.best/eng-b1b2'
    ),
    breadcrumb: breadcrumbList([
      { name: 'dse.best 主頁', url: 'https://dse.best/' },
      { name: '英文 B1 B2 轉換表', url: 'https://dse.best/eng-b1b2' },
    ]),
  },

  translator: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '文言文翻譯機 Classical Chinese Translator | AI 古文翻譯工具',
    description: '免費 AI 文言文翻譯機，即時將古文翻譯成現代白話文。專為 DSE 中文科學生設計，支援《岳陽樓記》、《出師表》、《六國論》等常見文言文篇章翻譯。輕鬆理解古文意思，提升中文閱讀能力。',
    url: 'https://dse.best/translator',
    inLanguage: ['zh-HK', 'zh-CN'],
    isPartOf: WEBSITE_SCHEMA,
    mainEntity: softwareApp(
      '文言文翻譯機 Classical Chinese Translator',
      'AI 驅動的文言文翻譯工具，即時將古文翻譯成現代白話文，專為 DSE 中文科學生設計，助你理解文言文篇章。',
      'https://dse.best/translator',
      [
        'AI 即時翻譯文言文至白話文',
        '支援 DSE 常見文言文篇章',
        '簡潔易用的翻譯介面',
        '免費使用無限制',
        '提升中文閱讀理解能力',
      ]
    ),
    breadcrumb: breadcrumbList([
      { name: 'dse.best 主頁', url: 'https://dse.best/' },
      { name: '文言文翻譯機', url: 'https://dse.best/translator' },
    ]),
  },
}

export function buildBlogJsonLd(posts: any[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'dse.best Blog',
    description: 'DSE學習資源、考試技巧、科目指南和最新資訊',
    url: 'https://dse.best/blog/',
    inLanguage: ['zh-HK', 'en-HK'],
    isPartOf: WEBSITE_SCHEMA,
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.seoTitle,
      description: post.seoDescription,
      author: { '@type': 'Person', name: post.author },
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      url: `https://dse.best/blog/${post.slug}`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://dse.best/blog/${post.slug}` },
      publisher: {
        '@type': 'Organization',
        name: 'dse.best',
        logo: { '@type': 'ImageObject', url: 'https://dse.best/assets/images/logo-icon.webp' },
      },
    })),
  }
}
