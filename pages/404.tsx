import Link from 'next/link'
import NavigationLink from '../components/NavigationLink'
import { useRouter } from 'next/router'
import PageSEO from '../components/PageSEO'

export default function Custom404() {
  const router = useRouter()

  return (
        <>
            <PageSEO
              title="404 Not Found"
              description="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
              ogTitle="404 Not Found"
              ogDescription="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案。"
              ogUrl="https://dse.best/404"
              robots={['noindex', 'nofollow']}
            />

            {/* Minimal 404 page without layout elements */}
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-body-bg)',
              color: 'var(--color-body)',
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
