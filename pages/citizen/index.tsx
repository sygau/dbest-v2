import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import { getSubjectMetadata } from '../../utils/structuredData';
import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';

export default function CitizenPage() {
  const metadata = getSubjectMetadata('citizen');

    const subjectKey = 'citizen';
    const structuredData = generateSubjectStructuredData(subjectKey);
    const faqData = generateSubjectFAQStructuredData(subjectKey);
    const lastUpdated = getSubjectIndexLastUpdated(subjectKey);

    return (
        <>
            <Head>
                <title>{metadata?.title}</title>
                <meta name="description" content={metadata?.description} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={metadata?.ogTitle} />
                <meta property="og:description" content={metadata?.ogDescription} />
                <meta property="og:image" content={metadata?.ogImage} />
                <meta property="og:url" content={metadata?.ogUrl} />
                <meta property="og:type" content={metadata?.ogType} />

                {/* Structured Data */}
                {structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(structuredData)
                        }}
                    />
                )}
                {faqData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(faqData)
                        }}
                    />
                )}
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">公民與社會發展科</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item active" aria-current="page">
                                DSE Past Paper
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
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
                    <h2 style={{ textAlign: "center" }}>模擬試卷</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="問題簿" description="Sample Question Book" paperId="sp_question" buttonText="下載" />
                        <DownloadCard title="答題簿" description="Sample Answering Book" paperId="sp_answer" buttonText="下載" />
                    </div>
                    <hr className="my-4" />

                    {/* 2024 */}
                    <h2 style={{ textAlign: "center" }}>2024</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="問題簿" description="2024 問題簿" paperId="2024_question" buttonText="下載" />
                        <DownloadCard title="答題簿" description="2024 答題簿" paperId="2024_answer" buttonText="下載" />
                    </div>
                    <hr className="my-4" />
                    
                </div>
            </div>
        </>
    )
}
