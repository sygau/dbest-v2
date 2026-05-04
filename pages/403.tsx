import NavigationLink from '../components/NavigationLink'
import PageSEO from '../components/PageSEO'
import PageBreadcrumb from '../components/PageBreadcrumb'

export default function Custom403() {
    return (
        <>
            <PageSEO
              title="403 Forbidden"
              description="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及公民與社會全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。"
              ogTitle="403 Forbidden"
              ogDescription="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及公民與社會等全科歷屆試題及答案。"
              ogUrl="https://dse.best/403"
              robots={['noindex', 'nofollow']}
            />


            <PageBreadcrumb section="錯誤" text="403" />
            <div className="card rounded-4" style={{ height: "auto", padding: 20 }}>
                <div className="card-body text-center">
                    <h1
                        className="font-bold mb-4"
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
                            403 Forbidden
                        </span>
                    </h1>
                    <p className="mb-4" style={{ marginTop: 40, fontSize: "1.4rem" }}>
                        很抱歉，您沒有權限存取此頁面。
                    </p>
                    <NavigationLink href="/">返回主頁</NavigationLink>
                    <br />
                    <hr className="my-4" />
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}
