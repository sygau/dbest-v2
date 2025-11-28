// Structured Data for 12 Passages feature

export function generate12pStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DSE 中文 十二篇範文語譯溫習工具",
    "description": "DSE 中文科十二篇範文詞語意義練習平台，提供溫習模式及測驗模式",
    "url": "https://dse.best/12p",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "HKD"
    },
    "featureList": [
      "閃卡式溫習模式",
      "互動測驗模式",
      "涵蓋12篇指定篇章",
      "即時評分與反饋",
      "詞語意義訓練"
    ],
    "educationalLevel": "Secondary Education",
    "inLanguage": "zh-HK",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  };
}

export function generate12pFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "DSE 中文十二篇範文包括哪些篇章？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "香港中學文憑考試（DSE）中文科的十二篇指定篇章，一般包括《論語》、《孟子》、《莊子》、《荀子》、《廉頗藺相如列傳》、《出師表》、《師說》、《始得西山宴遊記》、《岳陽樓記》、《六國論》，以及詩三首（如王維〈山居秋暝〉、李白〈月下獨酌〉、杜甫〈登樓〉）和詞三首（如蘇軾〈念奴嬌·赤壁懷古〉、李清照〈聲聲慢〉、辛棄疾〈青玉案·元夕〉）。具體篇目以當年課程及考評局文件為準。"
        }
      },
      {
        "@type": "Question",
        "name": "如何有效溫習 DSE 十二篇範文的文言詞語？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "溫習 DSE 十二篇範文的文言詞語時，可先通讀原文，標記關鍵實詞、虛詞、通假字及一詞多義，再配合詞語表或筆記整理常見考點。每天分段溫習少量詞語，配合例句理解語境，並定期自測或默書，加深記憶，而不是只背死字義。"
        }
      },
      {
        "@type": "Question",
        "name": "準備 DSE 中文閱讀理解時，如何應付文言字詞題？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "文言字詞題常考字義、詞性、語法功能及語境推斷。備試時應熟悉十二篇範文中高頻字詞，特別是常見實詞（如“亡”、“疾”、“行”等）和虛詞（如“而”、“其”、“之”、“以”等）的不同用法。做題時要先看整句，再根據上下文推斷詞義，而非只靠死記。"
        }
      },
      {
        "@type": "Question",
        "name": "有什麼方法記熟十二篇範文的實詞、虛詞和通假字？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "可以按篇章或主題分類整理詞語，例如把表示心理活動的實詞、常見人稱代詞、時間空間虛詞、通假字、詞類活用等分組記憶。配合自製或現成的練習題重複練習，把“字形、字音、字義、例句”放在一起記，並在閱讀歷屆試題時留意同一字在不同篇章中的用法，建立聯想，有助長期記憶。"
        }
      }
    ]
  };
}

export function generate12pBreadcrumbStructuredData(page: 'index' | 'study' | 'quiz') {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "主頁",
        "item": "https://dse.best"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "十二篇範文練習",
        "item": "https://dse.best/12p"
      }
    ]
  };

  if (page === 'study') {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": "溫習模式",
      "item": "https://dse.best/12p/study"
    });
  } else if (page === 'quiz') {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": "測驗模式",
      "item": "https://dse.best/12p/quiz"
    });
  }

  return breadcrumbList;
}
