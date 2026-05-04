import Image from 'next/image'
import PageSEO from '../components/PageSEO'
import PageBreadcrumb from '../components/PageBreadcrumb'

export default function EngWritingPage() {
    return (
        <>
            <PageSEO
              title="Free DSE English Writing Marking Service"
              description="Get personalized feedback on your DSE English Paper 2 writing from Louise, an experienced tutor. Free marking service with detailed comments on grammar, vocabulary, and structure."
              ogTitle="Free DSE English Writing Marking Service"
              ogDescription="Get personalized feedback on your DSE English Paper 2 writing from an experienced tutor. Completely free marking service."
              ogUrl="https://dse.best/eng-writing"
              robots={['noindex', 'nofollow']}
            />

            <PageBreadcrumb section="English" text="English Writing Marking" />

            <div className="card rounded-4" style={{ height: "auto" }}>
    <div className="card-body">
        <h1>免費 DSE 英文寫作批改服務</h1>
        <p className="lead">
            由經驗導師 Louise 為你提供個人化英文卷二（Writing）批改服務。
        </p>
        
        <hr />

        <h4>規則</h4>
        <ul>
            <li>只限 HKDSE English Paper 2 過往試題，日校、補習社題目恕不接受</li>
            <li>每人每次最多呈交一份 Paper 2，即 Part A 及 Part B 題目各一</li>
            <li>手寫/打字不拘。請盡量隔行書寫，打字行距請調整為 2</li>
            <li>學生作品經匿名處理後，或會作教材之用。傳送檔案即默認同意</li>
        </ul>

        <hr />

        <h4>提交方法</h4>
        <ol>
            <li>按照 DSE 格式完成卷二 Part A 或 Part B</li>
            <li>將作品儲存為 PDF 或清晰相片</li>
            <li>選擇以下其中一種方式提交：
                <ul>
                    <li>電郵至 <a href="mailto:louise@dse.best">louise@dse.best</a></li>
                    <li>或透過 Instagram DM <a 
                href="https://www.instagram.com/ohdipbortles/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontWeight: 600 }}
            >
                @ohdipbortles
            </a> 傳送（請先上傳 PDF 至 Google Drive 並開放權限）</li>
                </ul>
            </li>
            <li>註明你的姓名（或暱稱）及提交部分（Part A / Part B / 兩者）</li>
            <li>等候詳細批改意見，通常需時 3-5 日</li>
        </ol>

        <hr />

        <h5>你會收到</h5>
        <ul>
            <li>文法、用字及句式結構的評語</li>
            <li>內容及意念發展的意見</li>
            <li>組織及連貫性的建議</li>
            <li>實用貼士</li>
        </ul>

        <hr />

        <h5>須知</h5>
        <ul>
            <li>提交作品必須為本人原創</li>
            <li>繁忙時期（3-4月）可能需要最多 5 日處理</li>
            <li>此服務完全免費</li>
        </ul>

        <hr />

        <h5>關於 Louise</h5>
        <p>
            Louise 主修英文，擁有補習及學校教學經驗。
        </p>
        <p>
            於 Instagram 追蹤她獲取更多貼士：{' '}
            <a 
                href="https://www.instagram.com/ohdipbortles/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontWeight: 600 }}
            >
                @ohdipbortles
            </a>
        </p>

        <hr />



    </div>
</div>
        </>
    )
}
