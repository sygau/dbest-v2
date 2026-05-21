import type { AppProps } from 'next/app'
import Head from 'next/head'
import { notoSansHK, notoSerifHK } from '../lib/fonts'
import '../styles/tailwind.css'
import '../styles/blog-post.css'
import '../styles/vocab.css'
import { ThemeProvider } from '../components/tw/ThemeProvider'
import Layout from '../components/tw/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${notoSansHK.variable} ${notoSerifHK.variable}`}
      style={{ fontFamily: "var(--font-noto-sans-hk), 'Noto Sans HK Fallback', 'PingFang HK', 'Microsoft JhengHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <ThemeProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </div>
  )
}