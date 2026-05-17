import { Noto_Sans_HK } from 'next/font/google'

export const notoSansHK = Noto_Sans_HK({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'optional',
  preload: false,
  variable: '--font-noto-sans-hk',
})
