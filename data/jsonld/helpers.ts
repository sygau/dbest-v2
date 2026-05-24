export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://dse.best/#organization',
  name: 'dse.best',
  url: 'https://dse.best/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://dse.best/assets/images/logo-icon.webp',
    width: 512,
    height: 512,
  },
  description: 'Free Hong Kong DSE (HKDSE) educational platform providing past papers for all subjects (2012–2025), JUPAS admission calculator, grade cut-off scores, exam timetable, countdown timer, English vocabulary bank, UCAS Tariff Points converter, and study tools for secondary school students preparing for the Hong Kong Diploma of Secondary Education examination.',
  foundingDate: '2023',
  areaServed: {
    '@type': 'Country',
    name: 'Hong Kong',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Hong Kong Form 4–6 HKDSE Students',
  },
  sameAs: ['https://www.instagram.com/dse_best'],
  knowsAbout: [
    'Hong Kong Diploma of Secondary Education (HKDSE)',
    'DSE Past Papers',
    'JUPAS University Admission System',
    'DSE Grade Cut-off Scores',
    'UCAS Tariff Points for DSE',
    'Hong Kong Secondary School Examinations',
    'DSE Mathematics M1 M2',
    'DSE English Language',
    'DSE Chinese Language',
  ],
}

export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  name: 'dse.best',
  url: 'https://dse.best/',
  description: 'DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。',
}

export function webPageBase(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage: ['zh-HK', 'en-HK'],
    isPartOf: WEBSITE_SCHEMA,
  }
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function educationalResource(
  name: string,
  description: string,
  subjectEng: string,
  subjectChi: string
) {
  return {
    '@type': 'EducationalResource',
    name,
    description,
    educationalLevel: 'Secondary Education',
    educationalUse: 'Exam Preparation',
    learningResourceType: 'Past Papers',
    subject: {
      '@type': 'Subject',
      name: subjectEng,
      alternateName: subjectChi,
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'HKDSE Students',
    },
    provider: {
      '@type': 'Organization',
      name: 'dse.best',
      url: 'https://dse.best/',
    },
  }
}

export function softwareApp(
  name: string,
  description: string,
  url: string,
  features: string[]
) {
  return {
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'HKD' },
    audience: { '@type': 'Audience', audienceType: 'HKDSE Students' },
    featureList: features,
    provider: { '@type': 'Organization', name: 'dse.best', url: 'https://dse.best/' },
  }
}
