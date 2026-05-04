import { webPageBase, educationalResource, breadcrumbList } from './helpers'

type SubjectInfo = {
  name: string
  engName: string
  description: string
  url: string
}

const subjects: Record<string, SubjectInfo> = {
  chinese: {
    name: '中文',
    engName: 'Chinese Language',
    description: 'DSE 中文科歷屆試題及答案，涵蓋閱讀、寫作、聆聽、說話及校本評核 (SBA)。提供完整試卷下載，助您掌握中文科考試技巧及趨勢。',
    url: 'https://dse.best/chinese',
  },
  english: {
    name: '英文',
    engName: 'English Language',
    description: 'DSE 英文科歷屆試題及答案，涵蓋閱讀、寫作、聆聽、說話及校本評核 (SBA)。提供完整試卷下載，助您提升英文科應試能力。',
    url: 'https://dse.best/english',
  },
  math: {
    name: '數學',
    engName: 'Mathematics',
    description: 'DSE 數學科歷屆試題及答案，涵蓋必修部分所有課題。提供完整試卷下載，助您掌握數學科考試重點及解題技巧。',
    url: 'https://dse.best/math',
  },
  physics: {
    name: '物理',
    engName: 'Physics',
    description: 'DSE 物理科歷屆試題及答案，涵蓋力學、熱學、波動、電磁學等課題。提供完整試卷下載，助您掌握物理科考試重點。',
    url: 'https://dse.best/physics',
  },
  chemistry: {
    name: '化學',
    engName: 'Chemistry',
    description: 'DSE 化學科歷屆試題及答案，涵蓋無機化學、有機化學、物理化學等課題。提供完整試卷下載，助您掌握化學科考試重點。',
    url: 'https://dse.best/chemistry',
  },
  biology: {
    name: '生物',
    engName: 'Biology',
    description: 'DSE 生物科歷屆試題及答案，涵蓋細胞與分子生物學、遺傳與進化、生物與環境等課題。提供完整試卷下載。',
    url: 'https://dse.best/biology',
  },
  ict: {
    name: '資訊及通訊科技',
    engName: 'Information and Communication Technology',
    description: 'DSE ICT 歷屆試題及答案，涵蓋資訊處理、程式編寫、數據庫、網絡等課題。提供完整試卷下載。',
    url: 'https://dse.best/ict',
  },
  m1: {
    name: '數學延伸部分 M1',
    engName: 'Mathematics Module 1',
    description: 'DSE 數學延伸部分 M1 (微積分與統計) 歷屆試題及答案。提供完整試卷下載，助您掌握微積分與統計學重點。',
    url: 'https://dse.best/m1',
  },
  m2: {
    name: '數學延伸部分 M2',
    engName: 'Mathematics Module 2',
    description: 'DSE 數學延伸部分 M2 (代數與微積分) 歷屆試題及答案。提供完整試卷下載，助您掌握代數與微積分重點。',
    url: 'https://dse.best/m2',
  },
  geography: {
    name: '地理',
    engName: 'Geography',
    description: 'DSE 地理科歷屆試題及答案，涵蓋自然環境、人文環境、全球相互依存等課題。提供完整試卷下載。',
    url: 'https://dse.best/geography',
  },
  history: {
    name: '歷史',
    engName: 'History',
    description: 'DSE 歷史科歷屆試題及答案，涵蓋現代世界、現代中國等課題。提供完整試卷下載，助您掌握歷史科考試重點。',
    url: 'https://dse.best/history',
  },
  'chinese-history': {
    name: '中國歷史',
    engName: 'Chinese History',
    description: 'DSE 中國歷史科歷屆試題及答案，涵蓋古代史、近現代史等課題。提供完整試卷下載，助您掌握中國歷史科考試重點。',
    url: 'https://dse.best/chinese-history',
  },
  economics: {
    name: '經濟',
    engName: 'Economics',
    description: 'DSE 經濟科歷屆試題及答案，涵蓋微觀經濟學、宏觀經濟學等課題。提供完整試卷下載，助您掌握經濟科考試重點。',
    url: 'https://dse.best/economics',
  },
  bafs: {
    name: '企業、會計與財務概論',
    engName: 'Business, Accounting and Financial Studies',
    description: 'DSE BAFS 歷屆試題及答案，涵蓋會計、商業管理、財務管理等課題。提供完整試卷下載，助您掌握商業科考試重點。',
    url: 'https://dse.best/bafs',
  },
  citizen: {
    name: '公民與社會發展',
    engName: 'Citizenship and Social Development',
    description: 'DSE 公民與社會發展科歷屆試題及答案，涵蓋香港、國家、世界等課題。提供完整試卷下載。',
    url: 'https://dse.best/citizen',
  },
  'visual-arts': {
    name: '視覺藝術',
    engName: 'Visual Arts',
    description: 'DSE 視覺藝術科歷屆試題及答案，涵蓋藝術創作、藝術評賞等課題。提供完整試卷下載，助您掌握視覺藝術科考試重點。',
    url: 'https://dse.best/visual-arts',
  },
  ths: {
    name: '旅遊與款待',
    engName: 'Tourism and Hospitality Studies',
    description: 'DSE 旅遊與款待科歷屆試題及答案，涵蓋旅遊業、款待業等課題。提供完整試卷下載，助您掌握旅遊與款待科考試重點。',
    url: 'https://dse.best/ths',
  },
}

function buildSubjectJsonLd(key: string) {
  const s = subjects[key]
  return {
    ...webPageBase(
      `DSE ${s.name} ${s.engName} Past Papers 歷屆試題`,
      s.description,
      s.url
    ),
    mainEntity: educationalResource(
      `DSE ${s.name} ${s.engName} Past Papers`,
      s.description,
      s.engName,
      s.name
    ),
    breadcrumb: breadcrumbList([
      { name: 'dse.best 主頁', url: 'https://dse.best/' },
      { name: `DSE ${s.name} ${s.engName} 歷屆試題`, url: s.url },
    ]),
  }
}

export const subjectJsonLd: Record<string, object> = Object.fromEntries(
  Object.keys(subjects).map(key => [key, buildSubjectJsonLd(key)])
)
