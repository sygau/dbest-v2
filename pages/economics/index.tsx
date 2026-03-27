import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import { getSubjectMetadata } from '../../utils/structuredData';
import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';

export default function EconomicsPage() {
  const metadata = getSubjectMetadata('economics');

    const subjectKey = 'economics';
    const structuredData = generateSubjectStructuredData(subjectKey);
    const faqData = generateSubjectFAQStructuredData(subjectKey);
    const lastUpdated = getSubjectIndexLastUpdated(subjectKey);

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
                <div className="breadcrumb-title pe-3">經濟</div>
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
                        DSE 經濟 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Economics 經濟歷屆試題。
                        在此，您可以找到按年份排列的經濟科試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Economics past papers. Here you can find comprehensive Economics examination materials including microeconomics, macroeconomics, international trade, and economic development topics arranged by year, along with data response questions, essay questions, and detailed marking schemes to help you master DSE Economics concepts and achieve excellent results in your examination.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    {/* Syllabus */}
                    <h2 style={{ textAlign: "center" }}>課程及評估指引 / Syllabus</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="課程及評估指引" description="DSE Economics Syllabus (中文)" paperId="syll_chi" buttonText="下載" />
                        <DownloadCard title="English Syllabus" description="DSE Economics Syllabus (English)" paperId="syll_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic (Chinese) */}
                    <h2 style={{ textAlign: "center" }}>分類練習 / By Topic (中文)</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* BK1 BK2 first */}
                        <DownloadCard title="主題1-7" description="主題1-7 (中文)" paperId="bytopic_bk1_chi" buttonText="下載" />
                        <DownloadCard title="主題8-14" description="主題8-14 (中文)" paperId="bytopic_bk2_chi" buttonText="下載" />
                        {/* Numbered topics */}
                        <DownloadCard title="主題1 基本經濟概念" description="主題1 基本經濟概念 (中文)" paperId="bytopic_1_chi" buttonText="下載" />
                        <DownloadCard title="主題2 需求及供應" description="主題2 需求及供應 (中文)" paperId="bytopic_2_chi" buttonText="下載" />
                        <DownloadCard title="主題3 效率與公平" description="主題3 效率與公平 (中文)" paperId="bytopic_3_chi" buttonText="下載" />
                        <DownloadCard title="主題4 生產要素和生產級別" description="主題4 生產要素和生產級別 (中文)" paperId="bytopic_4_chi" buttonText="下載" />
                        <DownloadCard title="主題5 短期與長期生產及成本" description="主題5 短期與長期生產及成本 (中文)" paperId="bytopic_5_chi" buttonText="下載" />
                        <DownloadCard title="主題6 廠商擁有權、握張及結合" description="主題6 廠商擁有權、握張及結合 (中文)" paperId="bytopic_6_chi" buttonText="下載" />
                        <DownloadCard title="主題7 競爭與市場結構" description="主題7 競爭與市場結構 (中文)" paperId="bytopic_7_chi" buttonText="下載" />
                        <DownloadCard title="主題8 國民收入會計" description="主題8 國民收入會計 (中文)" paperId="bytopic_8_chi" buttonText="下載" />
                        <DownloadCard title="主題9 失業及就業不足" description="主題9 失業及就業不足 (中文)" paperId="bytopic_9_chi" buttonText="下載" />
                        <DownloadCard title="主題10 總需求及總供應" description="主題10 總需求及總供應 (中文)" paperId="bytopic_10_chi" buttonText="下載" />
                        <DownloadCard title="主題11 公共財政" description="主題11 公共財政 (中文)" paperId="bytopic_11_chi" buttonText="下載" />
                        <DownloadCard title="主題12 貨幣與銀行" description="主題12 貨幣與銀行 (中文)" paperId="bytopic_12_chi" buttonText="下載" />
                        <DownloadCard title="主題13 匯率與國際收支平衡表" description="主題13 匯率與國際收支平衡表 (中文)" paperId="bytopic_13_chi" buttonText="下載" />
                        <DownloadCard title="主題14 國際貿易" description="主題14 國際貿易 (中文)" paperId="bytopic_14_chi" buttonText="下載" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic (English) */}
                    <h2 style={{ textAlign: "center" }}>分類練習 / By Topic (English)</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* BK1 BK2 first */}
                        <DownloadCard title="Topic 1-9" description="Topic 1-9 BK1 (English)" paperId="bytopic_bk1_eng" />
                        <DownloadCard title="Topic 10-17" description="Topic 10-17 BK2 (English)" paperId="bytopic_bk2_eng" />
                        {/* Numbered topics 1-18 */}
                        <DownloadCard title="Topic 1 Basic Concept" description="Basic Concept" paperId="bytopic_1_eng" />
                        <DownloadCard title="Topic 2 Production" description="Production" paperId="bytopic_2_eng" />
                        <DownloadCard title="Topic 3 Input-Output Relationship" description="Input-Output Relationship" paperId="bytopic_3_eng" />
                        <DownloadCard title="Topic 4 Ownership And Expansion Of Firms" description="Ownership And Expansion Of Firms" paperId="bytopic_4_eng" />
                        <DownloadCard title="Topic 5 Market Structure" description="Market Structure" paperId="bytopic_5_eng" />
                        <DownloadCard title="Topic 6 Demand And Supply I" description="Demand And Supply I" paperId="bytopic_6_eng" />
                        <DownloadCard title="Topic 7 Demand And Supply II" description="Demand And Supply II" paperId="bytopic_7_eng" />
                        <DownloadCard title="Topic 8 Market Intervention" description="Market Intervention" paperId="bytopic_8_eng" />
                        <DownloadCard title="Topic 9 Roles Of Government" description="Roles Of Government" paperId="bytopic_9_eng" />
                        <DownloadCard title="Topic 10 National Income" description="National Income" paperId="bytopic_10_eng" />
                        <DownloadCard title="Topic 11 Macroeconomics Problems" description="Macroeconomics Problems" paperId="bytopic_11_eng" />
                        <DownloadCard title="Topic 12 The Budget And Fiscal Policy" description="The Budget And Fiscal Policy" paperId="bytopic_12_eng" />
                        <DownloadCard title="Topic 13 Money And Banking I" description="Money And Banking I" paperId="bytopic_13_eng" />
                        <DownloadCard title="Topic 14 Money And Banking II" description="Money And Banking II" paperId="bytopic_14_eng" />
                        <DownloadCard title="Topic 15 Aggregate Demand And Aggregate Supply" description="Aggregate Demand And Aggregate Supply" paperId="bytopic_15_eng" />
                        <DownloadCard title="Topic 16 International Trade" description="International Trade" paperId="bytopic_16_eng" />
                        <DownloadCard title="Topic 17 International Finance" description="International Finance" paperId="bytopic_17_eng" />
                        <DownloadCard title="Elective 2 Extension of Trade Theory and Economic Development" description="Extension of Trade Theory and Economic Development" paperId="bytopic_18_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* DSE Papers by Year */}
                    
                    {/* 2024 */}
                    <h2 style={{ textAlign: "center" }}>2024</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* English */}
                        <DownloadCard title="Paper 2" description="2024 Paper 2 (English)" paperId="2024_p2_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 style={{ textAlign: "center" }}>2023</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2023 Paper 1 (中文)" paperId="2023_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2023 Paper 2 (中文)" paperId="2023_p2_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2023 Paper 1 (English)" paperId="2023_p1_eng" />
                        <DownloadCard title="Paper 2" description="2023 Paper 2 (English)" paperId="2023_p2_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 style={{ textAlign: "center" }}>2022</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* English only for 2022 */}
                        <DownloadCard title="Paper 1" description="2022 Paper 1 (English)" paperId="2022_p1_eng" />
                        <DownloadCard title="Paper 2" description="2022 Paper 2 (English)" paperId="2022_p2_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2021 */}
                    <h2 style={{ textAlign: "center" }}>2021</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2021 Paper 1 (中文)" paperId="2021_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2021 Paper 2 (中文)" paperId="2021_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2021 參考答案 (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2021 考生表現 (中文)" paperId="2021_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2021 Paper 1 (English)" paperId="2021_p1_eng" />
                        <DownloadCard title="Paper 2" description="2021 Paper 2 (English)" paperId="2021_p2_eng" />
                        <DownloadCard title="Answers" description="2021 Answer Booklet (English)" paperId="2021_ans_eng" />
                        <DownloadCard title="Performance" description="2021 Performance Descriptors (English)" paperId="2021_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <h2 style={{ textAlign: "center" }}>2020</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2020 Paper 1 (中文)" paperId="2020_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2020 Paper 2 (中文)" paperId="2020_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2020 參考答案 (中文)" paperId="2020_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2020 考生表現 (中文)" paperId="2020_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2020 Paper 1 (English)" paperId="2020_p1_eng" />
                        <DownloadCard title="Paper 2" description="2020 Paper 2 (English)" paperId="2020_p2_eng" />
                        <DownloadCard title="Answers" description="2020 Answer Booklet (English)" paperId="2020_ans_eng" />
                        <DownloadCard title="Performance" description="2020 Performance Descriptors (English)" paperId="2020_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <h2 style={{ textAlign: "center" }}>2019</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2019 Paper 1 (中文)" paperId="2019_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2019 Paper 2 (中文)" paperId="2019_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2019 參考答案 (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2019 考生表現 (中文)" paperId="2019_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2019 Paper 1 (English)" paperId="2019_p1_eng" />
                        <DownloadCard title="Paper 2" description="2019 Paper 2 (English)" paperId="2019_p2_eng" />
                        <DownloadCard title="Answers" description="2019 Answer Booklet (English)" paperId="2019_ans_eng" />
                        <DownloadCard title="Performance" description="2019 Performance Descriptors (English)" paperId="2019_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <h2 style={{ textAlign: "center" }}>2018</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2018 Paper 1 (中文)" paperId="2018_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2018 Paper 2 (中文)" paperId="2018_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2018 參考答案 (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2018 考生表現 (中文)" paperId="2018_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2018 Paper 1 (English)" paperId="2018_p1_eng" />
                        <DownloadCard title="Paper 2" description="2018 Paper 2 (English)" paperId="2018_p2_eng" />
                        <DownloadCard title="Answers" description="2018 Answer Booklet (English)" paperId="2018_ans_eng" />
                        <DownloadCard title="Performance" description="2018 Performance Descriptors (English)" paperId="2018_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <h2 style={{ textAlign: "center" }}>2017</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2017 Paper 1 (中文)" paperId="2017_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2017 Paper 2 (中文)" paperId="2017_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2017 參考答案 (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2017 考生表現 (中文)" paperId="2017_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2017 Paper 1 (English)" paperId="2017_p1_eng" />
                        <DownloadCard title="Paper 2" description="2017 Paper 2 (English)" paperId="2017_p2_eng" />
                        <DownloadCard title="Answers" description="2017 Answer Booklet (English)" paperId="2017_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <h2 style={{ textAlign: "center" }}>2016</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2016 Paper 1 (中文)" paperId="2016_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2016 Paper 2 (中文)" paperId="2016_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2016 參考答案 (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2016 考生表現 (中文)" paperId="2016_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2016 Paper 1 (English)" paperId="2016_p1_eng" />
                        <DownloadCard title="Paper 2" description="2016 Paper 2 (English)" paperId="2016_p2_eng" />
                        <DownloadCard title="Answers" description="2016 Answer Booklet (English)" paperId="2016_ans_eng" />
                        <DownloadCard title="Performance" description="2016 Performance Descriptors (English)" paperId="2016_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2015 */}
                    <h2 style={{ textAlign: "center" }}>2015</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2015 Paper 1 (中文)" paperId="2015_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2015 Paper 2 (中文)" paperId="2015_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2015 參考答案 (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2015 考生表現 (中文)" paperId="2015_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2015 Paper 1 (English)" paperId="2015_p1_eng" />
                        <DownloadCard title="Paper 2" description="2015 Paper 2 (English)" paperId="2015_p2_eng" />
                        <DownloadCard title="Answers" description="2015 Answer Booklet (English)" paperId="2015_ans_eng" />
                        <DownloadCard title="Performance" description="2015 Performance Descriptors (English)" paperId="2015_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2014 */}
                    <h2 style={{ textAlign: "center" }}>2014</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2014 Paper 1 (中文)" paperId="2014_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2014 Paper 2 (中文)" paperId="2014_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2014 參考答案 (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2014 考生表現 (中文)" paperId="2014_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2014 Paper 1 (English)" paperId="2014_p1_eng" />
                        <DownloadCard title="Paper 2" description="2014 Paper 2 (English)" paperId="2014_p2_eng" />
                        <DownloadCard title="Answers" description="2014 Answer Booklet (English)" paperId="2014_ans_eng" />
                        <DownloadCard title="Performance" description="2014 Performance Descriptors (English)" paperId="2014_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2013 */}
                    <h2 style={{ textAlign: "center" }}>2013</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2013 Paper 1 (中文)" paperId="2013_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2013 Paper 2 (中文)" paperId="2013_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2013 參考答案 (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2013 考生表現 (中文)" paperId="2013_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2013 Paper 1 (English)" paperId="2013_p1_eng" />
                        <DownloadCard title="Paper 2" description="2013 Paper 2 (English)" paperId="2013_p2_eng" />
                        <DownloadCard title="Answers" description="2013 Answer Booklet (English)" paperId="2013_ans_eng" />
                        <DownloadCard title="Performance" description="2013 Performance Descriptors (English)" paperId="2013_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2012 */}
                    <h2 style={{ textAlign: "center" }}>2012</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2012 Paper 1 (中文)" paperId="2012_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2012 Paper 2 (中文)" paperId="2012_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2012 參考答案 (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2012 考生表現 (中文)" paperId="2012_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2012 Paper 1 (English)" paperId="2012_p1_eng" />
                        <DownloadCard title="Paper 2" description="2012 Paper 2 (English)" paperId="2012_p2_eng" />
                        <DownloadCard title="Answers" description="2012 Answer Booklet (English)" paperId="2012_ans_eng" />
                        <DownloadCard title="Performance" description="2012 Performance Descriptors (English)" paperId="2012_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice Papers */}
                    <h2 style={{ textAlign: "center" }}>練習卷 / Practice Papers</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese Practice Papers */}
                        <DownloadCard title="練習卷一" description="Practice Paper 1 (中文)" paperId="pp_p1_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二" description="Practice Paper 2 (中文)" paperId="pp_p2_chi" buttonText="下載" />
                        <DownloadCard title="練習卷答案" description="Practice Paper Answer (中文)" paperId="pp_ans_chi" buttonText="下載" />
                        {/* English Practice Papers */}
                        <DownloadCard title="Practice Paper 1" description="Practice Paper 1 (English)" paperId="pp_p1_eng" />
                        <DownloadCard title="Practice Paper 2" description="Practice Paper 2 (English)" paperId="pp_p2_eng" />
                        <DownloadCard title="Practice Paper Answers" description="Practice Paper Answer Booklet (English)" paperId="pp_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers */}
                    <h2 style={{ textAlign: "center" }}>樣本試卷 / Sample Papers</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese Sample Papers */}
                        <DownloadCard title="樣本試卷一" description="Sample Paper 1 (中文)" paperId="sp_p1_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二" description="Sample Paper 2 (中文)" paperId="sp_p2_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷答案" description="Sample Paper Answer (中文)" paperId="sp_ans_chi" buttonText="下載" />
                        {/* English Sample Papers */}
                        <DownloadCard title="Sample Paper 1" description="Sample Paper 1 (English)" paperId="sp_p1_eng" />
                        <DownloadCard title="Sample Paper 2" description="Sample Paper 2 (English)" paperId="sp_p2_eng" />
                        <DownloadCard title="Sample Paper Answers" description="Sample Paper Answer Booklet (English)" paperId="sp_ans_eng" />
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
        </>
    )
}
