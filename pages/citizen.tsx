import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../utils/structuredData'
import { BiDownload, BiWrench } from 'react-icons/bi';
import { getSubjectMetadata } from '../utils/structuredData';
import { getOtherPageLastUpdated } from '../utils/lastUpdated';
import LastUpdatedAlert from '../components/LastUpdatedAlert';

export default function CitizenPage() {
  const metadata = getSubjectMetadata('citizen');

    const subjectKey = 'citizen';
    const structuredData = generateSubjectStructuredData(subjectKey);
    const faqData = generateSubjectFAQStructuredData(subjectKey);
    const lastUpdated = getOtherPageLastUpdated('citizen');

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
                    <h1 className="mb-4">
                        DSE 公民與社會發展科 Citizenship and Social Development 歷屆試題 Past
                        Papers
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE 公民與社會發展科 Citizenship and Social Development
                        歷屆試題。本科目於2024年首次開考，試卷資源將陸續添加。
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    <br />
                    {/* Coming Soon / Work in Progress Section */}
                    <div
                        className="alert alert-warning d-flex align-items-center mb-4"
                        role="alert"
                    >
                        <BiWrench className="me-3" style={{ fontSize: "2rem", color: '#ffc107', background: 'rgba(255,193,7,0.12)', borderRadius: '50%', padding: '0.18em', boxShadow: '0 1px 4px rgba(255,193,7,0.10)' }} />
                        <div>
                            <h5 className="alert-heading mb-2">頁面建設中 Work in Progress</h5>
                            <p className="mb-1">
                                公民與社會發展科試卷頁面正在準備中，敬請期待！我們正在整理相關試卷資源。
                            </p>
                            <p className="mb-0">
                                The Citizenship and Social Development page is under construction.
                                We are organizing relevant past papers and resources.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
