import Head from 'next/head'
import Link from 'next/link'
import NavigationLink from '../components/NavigationLink'
import { getMainPageMetadata } from '../utils/structuredData';
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()
  
  // Normal mode - show minimal 404 design without layout elements
  const metadata = getMainPageMetadata('404');

  return (
        <>
            <Head>
                <title>{metadata?.title}</title>
                <meta name="description" content={metadata?.description} />
                <meta name="robots" content={metadata?.robots} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={metadata?.ogTitle} />
                <meta property="og:description" content={metadata?.ogDescription} />
                <meta property="og:image" content={metadata?.ogImage} />
                <meta property="og:url" content={metadata?.ogUrl} />
                <meta property="og:type" content={metadata?.ogType} />
            </Head>

            {/* Minimal 404 page without layout elements */}
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bs-body-bg, #f8f9fa)',
              color: 'var(--bs-body-color, #333)',
              margin: 0,
              padding: 20
            }}>
              <div style={{ 
                textAlign: 'center',
                maxWidth: 600,
                width: '100%'
              }}>
                <h1
                  style={{ 
                    fontSize: "4rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    background: "linear-gradient(to right, #663399, #007bff)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  404 Not Found
                </h1>
                <p style={{ 
                  fontSize: "1.2rem", 
                  marginBottom: "2rem",
                  color: "#6c757d"
                }}>
                  抱歉，找不到您要訪問的頁面。
                </p>
                <button
                  onClick={() => router.push('/')}
                  style={{
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#007bff',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}

                >
                  返回主頁
                </button>
              </div>
            </div>
        </>
    )
}
