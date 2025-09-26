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

  // For x.dse.best, show the passcode-specific 404 with no layout
  if (isXdse) {
    return (
      <html>
        <head>
          <title>x.dse.best</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style={{ margin: 0, padding: 0 }}>
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0b0e1f',
            color: '#e5e7eb'
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
        </body>
      </html>
    )
  }

  // Normal mode - show your original 404 design
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

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">錯誤</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item active" aria-current="page">
                                404
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto", padding: 20 }}>
                <div className="card-body text-center">
                    <h1
                        className="fw-bold mb-4"
                        style={{ marginTop: 50, fontSize: "3.0rem" }}
                    >
                        <span
                            style={{
                                background: "linear-gradient(to right, #663399, #007bff)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            404 Not Found
                        </span>
                    </h1>
                    <p className="mb-4" style={{ marginTop: 40, fontSize: "1.4rem" }}>
                        抱歉，找不到您要訪問的頁面。
                    </p>
                    <NavigationLink href="/" className="btn btn-primary">
                        返回主頁
                    </NavigationLink>
                    <br />
                    <hr className="my-4" />
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}
