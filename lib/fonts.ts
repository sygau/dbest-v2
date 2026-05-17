import { Noto_Sans_HK } from 'next/font/google'

export const notoSansHK = Noto_Sans_HK({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-noto-sans-hk',
})
