// Cutoff Slug SEO Configuration
// This file centralizes SEO title and description generation for all cutoff subject pages

export interface CutoffSEOConfig {
  seoTitle: string;
  seoDescription: string;
  pageTitle: string;
  pageDescriptionEng: string;
  pageDescriptionChi: string;
}

// Subject configurations for cutoff pages
const cutoffSubjectConfigs: Record<string, CutoffSEOConfig> = {
  english: {
    seoTitle: 'DSE 英文 English Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 英文 English Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知English Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 英文 English Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE English Language cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE English examination.',
    pageDescriptionChi: '瀏覽全面的DSE英文科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE英文考試制定實際目標。'
  },
  chinese: {
    seoTitle: 'DSE 中文 Chinese Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 中文 Chinese Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Chinese Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 中文 Chinese Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Chinese Language cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Chinese examination.',
    pageDescriptionChi: '瀏覽全面的DSE中文科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE中文考試制定實際目標。'
  },
  math: {
    seoTitle: 'DSE 數學 Mathematics Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 數學 Mathematics Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Math Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 數學 Mathematics Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Mathematics cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Mathematics examination.',
    pageDescriptionChi: '瀏覽全面的DSE數學科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE數學考試制定實際目標。'
  },
  physics: {
    seoTitle: 'DSE 物理 Physics Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 物理 Physics Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Physics Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 物理 Physics Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Physics cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Physics examination.',
    pageDescriptionChi: '瀏覽全面的DSE物理科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE物理考試制定實際目標。'
  },
  chemistry: {
    seoTitle: 'DSE 化學 Chemistry Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 化學 Chemistry Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Chemistry Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 化學 Chemistry Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Chemistry cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Chemistry examination.',
    pageDescriptionChi: '瀏覽全面的DSE化學科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE化學考試制定實際目標。'
  },
  biology: {
    seoTitle: 'DSE 生物 Biology Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 生物 Biology Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Biology Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 生物 Biology Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Biology cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Biology examination.',
    pageDescriptionChi: '瀏覽全面的DSE生物科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE生物考試制定實際目標。'
  },
  ict: {
    seoTitle: 'DSE 資訊及通訊科技 ICT Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 資訊及通訊科技 ICT Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知ICT Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 資訊及通訊科技 ICT Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Information and Communication Technology cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE ICT examination.',
    pageDescriptionChi: '瀏覽全面的DSE資訊及通訊科技科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE ICT考試制定實際目標。'
  },
  m1: {
    seoTitle: 'DSE 數學延伸部分 M1 Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 數學延伸部分 M1 Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知M1 Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 數學延伸部分 M1 Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Mathematics Extended Part Module 1 cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE M1 examination.',
    pageDescriptionChi: '瀏覽全面的DSE數學延伸部分單元一Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE M1考試制定實際目標。'
  },
  m2: {
    seoTitle: 'DSE 數學延伸部分 M2 Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 數學延伸部分 M2 Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知M2 Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 數學延伸部分 M2 Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Mathematics Extended Part Module 2 cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE M2 examination.',
    pageDescriptionChi: '瀏覽全面的DSE數學延伸部分單元二Cut-off分數及等級界線（2 012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE M2考試制定實際目標。'
  },
  geography: {
    seoTitle: 'DSE 地理 Geography Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 地理 Geography Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Geography Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 地理 Geography Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Geography cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Geography examination.',
    pageDescriptionChi: '瀏覽全面的DSE地理科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE地理考試制定實際目標。'
  },
  economics: {
    seoTitle: 'DSE 經濟 Economics Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 經濟 Economics Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Economics Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 經濟 Economics Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Economics cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Economics examination.',
    pageDescriptionChi: '瀏覽全面的DSE經濟科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE經濟考試制定實際目標。'
  },
  bafs: {
    seoTitle: 'DSE 企業、會計與財務概論 BAFS Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 企業、會計與財務概論 BAFS Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知BAFS Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 企業、會計與財務概論 BAFS Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Business, Accounting and Financial Studies cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE BAFS examination.',
    pageDescriptionChi: '瀏覽全面的DSE企業、會計與財務概論科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE BAFS考試制定實際目標。'
  },
  history: {
    seoTitle: 'DSE 歷史 History Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 歷史 History Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知History Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 歷史 History Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE History cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE History examination.',
    pageDescriptionChi: '瀏覽全面的DSE歷史科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE歷史考試制定實際目標。'
  },
  'chinese-history': {
    seoTitle: 'DSE 中國歷史 Chinese History Cut-off 分數 (2012-2025)',
    seoDescription: '【DSE 中國歷史 Chinese History Cut Off 分數】完整收錄2012–2025年全港等級分界線！想知Chinese History Level 5**、5*、5、4要幾多分？即睇歷年cut off數據，掌握高難度題目分界，穩奪延伸單元高分！',
    pageTitle: 'DSE 中國歷史 Chinese History Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Chinese History cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE Chinese History examination.',
    pageDescriptionChi: '瀏覽全面的DSE中國歷史科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE中國歷史考試制定實際目標。'
  },
  ths: {
    seoTitle: 'DSE 旅遊與款待 Tourism & Hospitality Cut-off 分數 (2012-2025)',
    seoDescription: 'Complete DSE Tourism and Hospitality Studies cut-off scores and grade boundaries from 2012-2025. Find score requirements for Level 5**, 5*, 5, 4, 3, 2, 1 across all years to understand DSE THS grading standards and plan your exam strategy effectively.',
    pageTitle: 'DSE 旅遊與款待 Tourism & Hospitality Cut-off Scores',
    pageDescriptionEng: 'Explore comprehensive DSE Tourism and Hospitality Studies cut-off scores and grade boundaries from 2012 to 2025. This page provides detailed score requirements for all grade levels (5**, 5*, 5, 4, 3, 2, 1) to help you understand the grading standards and set realistic targets for your DSE THS examination.',
    pageDescriptionChi: '瀏覽全面的DSE旅遊與款待科Cut-off分數及等級界線（2012-2025年）。本頁面提供所有等級（5**、5*、5、4、3、2、1）的詳細分數要求，助您了解評分標準並為DSE旅遊與款待考試制定實際目標。'
  }
};

// Available subjects with cutoff data (based on cutoff-config.json)
export const AVAILABLE_CUTOFF_SUBJECTS = [
  'english', 'chinese', 'math', 'physics', 'chemistry', 'biology', 
  'ict', 'm1', 'm2', 'geography', 'economics', 'bafs', 
  'history', 'chinese-history'
];

// Subject display names for navigation
export const CUTOFF_SUBJECT_NAMES: Record<string, string> = {
  'english': '英文 English',
  'chinese': '中文 Chinese',
  'math': '數學 Mathematics',
  'physics': '物理 Physics',
  'chemistry': '化學 Chemistry',
  'biology': '生物 Biology',
  'ict': '資訊及通訊科技 ICT',
  'm1': '數學延伸部分 M1',
  'm2': '數學延伸部分 M2',
  'geography': '地理 Geography',
  'economics': '經濟 Economics',
  'bafs': '企業、會計與財務概論 BAFS',
  'history': '歷史 History',
  'chinese-history': '中國歷史 Chinese History',
  'ths': '旅遊與款待 Tourism & Hospitality'
};

/**
 * Get SEO configuration for a cutoff subject
 */
export function getCutoffSEOConfig(subject: string): CutoffSEOConfig | null {
  return cutoffSubjectConfigs[subject] || null;
}

/**
 * Generate metadata for cutoff subject pages
 */
export function generateCutoffMetadata(subject: string) {
  const config = getCutoffSEOConfig(subject);
  if (!config) return null;

  const baseUrl = 'https://dse.best';
  
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    robots: 'index, follow',
    ogTitle: config.seoTitle,
    ogDescription: config.seoDescription,
    ogImage: `${baseUrl}/assets/images/logo-icon.png`,
    ogUrl: `${baseUrl}/cutoff/${subject}`,
    ogType: 'website'
  };
}

/**
 * Check if a subject has cutoff data available
 */
export function hasSubjectCutoffData(subject: string): boolean {
  return AVAILABLE_CUTOFF_SUBJECTS.includes(subject);
}
