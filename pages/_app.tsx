import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Noto_Sans_HK } from 'next/font/google'
import '../styles/tailwind.css'
import '../styles/blog-post.css'
import { ThemeProvider } from '../components/tw/ThemeProvider'
import Layout from '../components/tw/Layout'
import usePdfTracking from '../hooks/usePdfTracking'
import { useRouter } from 'next/router'

const notoSansHK = Noto_Sans_HK({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-hk',
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  usePdfTracking()
  const canonicalUrl = `https://dse.best${router.asPath}`

  // Also propagate the CSS variable to <html> for :root-level CSS access
  useEffect(() => {
    document.documentElement.classList.add(notoSansHK.variable)
  }, [])

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