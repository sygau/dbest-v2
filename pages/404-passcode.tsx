import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Custom404Passcode() {
  const router = useRouter()

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
        padding: 0
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
