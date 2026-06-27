import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import SubjectSectionAd from '../../components/SubjectSectionAd';

export default function CitizenPage() {
    const lastUpdated = getSubjectIndexLastUpdated('citizen');

    return (
        <>
            <PageSEO
                title="DSE 公民與社會發展 Citizenship and Social Development Past Paper | 歷屆試題及答案"
                description="DSE 公民與社會發展科 Citizenship and Social Development 歷屆試題下載 (2024-2025)。包含Question Book, Answer Book, Answers 試題簿、及答題簿及答案。提供完整試卷下載，全面掌握公民科考試要點。"
                ogTitle="DSE 公民與社會發展 歷屆試題 Past Papers | 公民科試卷及答案"
                ogDescription="DSE 公民與社會發展科 Citizenship and Social Development 歷屆試題下載 (2024-2025)。包含Question Book, Answer Book, 試題簿、答題簿及答案。提供完整試卷下載，全面掌握公民科考試要點。"
                ogUrl="https://dse.best/citizen"
                robots={['index', 'follow']}
                subjectKey="citizen"
            />
            {/*breadcrumb*/}
            <PageBreadcrumb section="公民與社會發展科" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">DSE 公民與社會發展科 歷屆試題 Past Papers</h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE 公民與社會發展科 (Citizenship and Social Development) 歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Citizenship and Social Development past papers. Here you can find Citizenship and Social Development examination papers, answers, and marking schemes arranged by year, covering Hong Kong development, contemporary China, and the interconnected world to help you prepare for the DSE Citizenship and Social Development examination effectively.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    
                    {/* Year-wise Past Paper Listing will be added here */}
                    {/* Sample Papers Section */}
                    <h2 className="text-center">模擬試卷</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="問題簿" description="Sample Question Book" paperId="sp_question" buttonText="下載" />
                        <DownloadCard title="答題簿" description="Sample Answering Book" paperId="sp_answer" buttonText="下載" />
                    </div>
                    <hr className="my-4" />
                    {/* 2025 */}
                    <h2 className="text-center">2025</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="問題簿" description="2025 問題簿" paperId="2025_question" buttonText="下載" />
                        <DownloadCard title="答題簿" description="2025 答題簿" paperId="2025_answer" buttonText="下載" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    {/* 2024 */}
                    <h2 className="text-center">2024</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="問題簿" description="2024 問題簿" paperId="2024_question" buttonText="下載" />
                        <DownloadCard title="答題簿" description="2024 答題簿" paperId="2024_answer" buttonText="下載" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    
                    {/* 2023 */}
                    <h2 className="text-center">2023</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="問題簿" description="2023 問題簿" paperId="2023_question" buttonText="下載" />
                        <DownloadCard title="答題簿" description="2023 答題簿" paperId="2023_answer" buttonText="下載" />
                    </div>
                </div>
            </div>
        </>
    )
}
