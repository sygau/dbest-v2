import { breadcrumbList, WEBSITE_SCHEMA } from './helpers'
import { yearSlugConfigs } from '../seo/year-slug'

export function buildYearSlugJsonLd(subject: string, year: string): object {
  const config = yearSlugConfigs[subject]
  if (!config) return {}

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: config.pageTitle.replace('{year}', year),
    description: config.seoDescription.replace('{year}', year),
    url: `https://dse.best/${subject}/${year}`,
    inLanguage: config.isDualLang ? ['zh-HK', 'en-HK'] : ['zh-HK'],
    isPartOf: WEBSITE_SCHEMA,
    about: {
      '@type': 'EducationalResource',
      name: config.pageTitle.replace('{year}', year),
      educationalLevel: 'Secondary Education',
      learningResourceType: 'Past Papers',
      datePublished: `${year}-01-01`,
      audience: { '@type': 'Audience', audienceType: 'HKDSE Students' },
    },
    breadcrumb: breadcrumbList([
      { name: 'dse.best 主頁', url: 'https://dse.best/' },
      { name: config.subjectLabel, url: `https://dse.best/${subject}` },
      { name: `${year} Past Papers`, url: `https://dse.best/${subject}/${year}` },
    ]),
  }
}
