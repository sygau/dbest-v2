import Head from 'next/head'
import Link from 'next/link'
import NavigationLink from '../components/NavigationLink'
import { getMainPageMetadata } from '../utils/structuredData';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Custom404() {
  const router = useRouter()
  const [isXdse, setIsXdse] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsXdse(window.location.hostname === 'x.dse.best')
    }
  }, [])

  // For x.dse.best, show the passcode-specific 404 with minimal layout
  if (isXdse) {
    return (
      <>
        <Head>
          <title>x.dse.best</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0e1f',
          color: '#e5e7eb',
          margin: 0,
          padding: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999
        }}>
          <div style={{ width: '100%', maxWidth: 360, padding: 20 }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <h1 style={{ fontSize: 18, margin: 0, fontWeight: 600 }}>404</h1>
              <p style={{ fontSize: 13, marginTop: 6, color: '#9ca3af' }}>Page not found</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => router.push('/')}
                style={{
                  height: 42,
                  padding: '0 14px',
                  borderRadius: 10,
                  border: '1px solid #4f46e5',
                  background: '#4f46e5',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Go to Main Page
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

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
              padding: 20,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999
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
                  color: "var(--bs-secondary-color, #6c757d)"
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
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#0056b3';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#007bff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  返回主頁
                </button>
              </div>
            </div>
        </>
    )
}
