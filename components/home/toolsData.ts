import { IconType } from 'react-icons'
import { BiCalculator, BiBookContent, BiTrendingUp, BiNews, BiWorld } from 'react-icons/bi'

export interface ToolItem {
  title: string
  zh: string
  href: string
  accent: string
  blurb: string
  Icon: IconType
}

export const tools: ToolItem[] = [
  {
    title: 'JUPAS Calculator',
    zh: 'JUPAS 計算機',
    href: '/jupas',
    accent: '#6366f1',
    blurb: '輸入 DSE 成績，計出 381 個大學課程嘅入學機會。',
    Icon: BiCalculator,
  },
  {
    title: '12 篇範文練習',
    zh: '12 篇範文',
    href: '/12p',
    accent: '#ec4899',
    blurb: '《論語》《孟子》等 12 篇指定文言文，詞義測驗 + 溫習模式。',
    Icon: BiBookContent,
  },
  {
    title: 'Cut Off 數據',
    zh: 'Cut Off 數據',
    href: '/cutoff',
    accent: '#f59e0b',
    blurb: '2012–2025 歷年各科 5** / 5* / 5 等級分界線。',
    Icon: BiTrendingUp,
  },
  {
    title: '教育博客',
    zh: '教育博客',
    href: '/blog',
    accent: '#10b981',
    blurb: '溫習技巧、選科攻略、DSE 最新資訊文章。',
    Icon: BiNews,
  },
]
