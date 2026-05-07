import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Noto_Sans_HK } from 'next/font/google'
import '../styles/tailwind.css'
import '../styles/blog-post.css'
import { ThemeProvider } from '../components/tw/ThemeProvider'
import Layout from '../components/tw/Layout'
import { useRouter } from 'next/router'

const notoSansHK = Noto_Sans_HK({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'optional',
  preload: false,
  variable: '--font-noto-sans-hk',
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Also propagate the CSS variable to <html> for :root-level CSS access
  useEffect(() => {
    document.documentElement.classList.add(notoSansHK.variable)
  }, [])

  // Sanitize canonical URL by removing query params
  const canonicalUrl = `https://dse.best${router.asPath.split('?')[0]}`

  return (
    <div
      className={notoSansHK.variable}
      style={{ fontFamily: "var(--font-noto-sans-hk), 'Noto Sans HK Fallback', 'PingFang HK', 'Microsoft JhengHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <ThemeProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonicalUrl} />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </div>
  )
}