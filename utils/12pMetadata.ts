// Metadata for 12 Passages feature
export const passages12Metadata = {
  index: {
    title: 'DSE 中文 十二篇範文語譯溫習工具',
    description: 'DSE 中文科十二篇範文詞語意義練習平台。提供溫習模式及測驗模式，涵蓋《論語》、《孟子》、《莊子》等12篇指定篇章，助你掌握古文詞語解釋，提升閱讀理解能力。',
    ogTitle: 'DSE 中文 十二篇範文語譯溫習工具',
    ogDescription: 'DSE 中文科十二篇範文詞語意義練習平台。提供溫習模式及測驗模式，涵蓋12篇指定篇章，助你掌握古文詞語解釋。',
    ogImage: 'https://dse.best/assets/images/logo-icon.webp',
    ogUrl: 'https://dse.best/12p',
    ogType: 'website',
    robots: 'index, follow'
  },
  study: {
    title: '溫習 | DSE 十二篇範文語譯練習',
    description: '使用閃卡形式溫習DSE中文科十二篇範文詞語意義。互動式學習介面，輕鬆翻閱，加深記憶，掌握古文詞語解釋。',
    ogTitle: '溫習 | DSE 十二篇範文語譯練習',
    ogDescription: '使用閃卡形式溫習DSE中文科十二篇範文詞語意義。互動式學習介面，輕鬆翻閱，加深記憶。',
    ogImage: 'https://dse.best/assets/images/logo-icon.webp',
    ogUrl: 'https://dse.best/12p/study',
    ogType: 'website',
    robots: 'index, follow'
  },
  quiz: {
    title: '測驗 | DSE 十二篇範文語譯練習',
    description: 'DSE 中文科十二篇範文詞語意義測驗。自我測試詞語理解能力，即時評分，追蹤進度，檢視學習成果。',
    ogTitle: '測驗 | DSE 十二篇範文語譯練習',
    ogDescription: 'DSE 中文科十二篇範文詞語意義測驗。自我測試詞語理解能力，即時評分，追蹤進度。',
    ogImage: 'https://dse.best/assets/images/logo-icon.webp',
    ogUrl: 'https://dse.best/12p/quiz',
    ogType: 'website',
    robots: 'index, follow'
  }
}; 

export function get12pMetadata(page: 'index' | 'study' | 'quiz') {
  return passages12Metadata[page];
}
