import { Noto_Sans_HK, Noto_Serif_HK } from 'next/font/google'

export const notoSansHK = Noto_Sans_HK({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-noto-sans-hk',
})

export const notoSerifHK = Noto_Serif_HK({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-noto-serif-hk',
})
