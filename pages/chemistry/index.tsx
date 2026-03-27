import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import { getSubjectMetadata } from '../../utils/structuredData';
import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
export default function ChemistryPage() {
  const metadata = getSubjectMetadata('chemistry');

    const subjectKey = 'chemistry';
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
                <div className="breadcrumb-title pe-3">化學</div>
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
                        DSE 化學 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Chemistry 化學歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Chemistry past papers. Here you can find comprehensive Chemistry examination materials including organic chemistry, inorganic chemistry, physical chemistry, and analytical chemistry topics arranged by year, along with practical examination papers, topic-based practice exercises, and detailed solutions to help you understand DSE Chemistry concepts and prepare effectively for your examination.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    <br />
                    {/* Syllabus */}
                    <h2 style={{ textAlign: "center" }}>評核內容 / Syllabus</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="中文 評核內容" description="DSE化學 評核內容 (中文)" paperId="syllabus_chi" buttonText="下載" />
                        <DownloadCard title="English Syllabus" description="DSE Chemistry Syllabus (English)" paperId="syllabus_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2024 */}
                    <h2 style={{ textAlign: "center" }}>2024</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="Paper 1" description="2024 Paper 1 (English)" paperId="2024_p1_eng" />
                        <DownloadCard title="Answers" description="2024 Answer Booklet (English)" paperId="2024_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 style={{ textAlign: "center" }}>2023</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2023 Paper 1 (中文)" paperId="2023_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2023 Paper 2 (中文)" paperId="2023_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2023 參考答案 (中文)" paperId="2023_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2023 考生表現 (中文)" paperId="2023_per_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2023 Paper 1 (English)" paperId="2023_p1_eng" />
                        <DownloadCard title="Paper 2" description="2023 Paper 2 (English)" paperId="2023_p2_eng" />
                        <DownloadCard title="Answers" description="2023 Answer Booklet (English)" paperId="2023_ans_eng" />
                        <DownloadCard title="Performance" description="2023 Performance Descriptors (English)" paperId="2023_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 style={{ textAlign: "center" }}>2022</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2022 Paper 1 (中文)" paperId="2022_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2022 Paper 2 (中文)" paperId="2022_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2022 參考答案 (中文)" paperId="2022_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2022 考生表現 (中文)" paperId="2022_per_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2022 Paper 1 (English)" paperId="2022_p1_eng" />
                        <DownloadCard title="Paper 2" description="2022 Paper 2 (English)" paperId="2022_p2_eng" />
                        <DownloadCard title="Answers" description="2022 Answer Booklet (English)" paperId="2022_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2021 */}
                    <h2 style={{ textAlign: "center" }}>2021</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2021 Paper 1 (中文)" paperId="2021_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2021 Paper 2 (中文)" paperId="2021_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2021 參考答案 (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2021 Paper 1 (English)" paperId="2021_p1_eng" />
                        <DownloadCard title="Paper 2" description="2021 Paper 2 (English)" paperId="2021_p2_eng" />
                        <DownloadCard title="Answers" description="2021 Answer Booklet (English)" paperId="2021_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <h2 style={{ textAlign: "center" }}>2020</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2020 Paper 1 (中文)" paperId="2020_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2020 Paper 2 (中文)" paperId="2020_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2020 參考答案 (中文)(中文)" paperId="2020_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2020 Paper 1 (English)" paperId="2020_p1_eng" />
                        <DownloadCard title="Paper 2" description="2020 Paper 2 (English)" paperId="2020_p2_eng" />
                        <DownloadCard title="Answers" description="2020 Answer Booklet (English)" paperId="2020_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <h2 style={{ textAlign: "center" }}>2019</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2019 Paper 1 (中文)" paperId="2019_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2019 Paper 2 (中文)" paperId="2019_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2019 參考答案 (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2019 Paper 1 (English)" paperId="2019_p1_eng" />
                        <DownloadCard title="Paper 2" description="2019 Paper 2 (English)" paperId="2019_p2_eng" />
                        <DownloadCard title="Answers" description="2019 Answer Booklet (English)" paperId="2019_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <h2 style={{ textAlign: "center" }}>2018</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2018 Paper 1 (中文)" paperId="2018_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2018 Paper 2 (中文)" paperId="2018_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2018 參考答案 (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2018 Paper 1 (English)" paperId="2018_p1_eng" />
                        <DownloadCard title="Paper 2" description="2018 Paper 2 (English)" paperId="2018_p2_eng" />
                        <DownloadCard title="Answers" description="2018 Answer Booklet (English)" paperId="2018_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <h2 style={{ textAlign: "center" }}>2017</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2017 Paper 1 (中文)" paperId="2017_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2017 Paper 2 (中文)" paperId="2017_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2017 參考答案 (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2017 考生表現 (中文)" paperId="2017_per_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2017 Paper 1 (English)" paperId="2017_p1_eng" />
                        <DownloadCard title="Paper 2" description="2017 Paper 2 (English)" paperId="2017_p2_eng" />
                        <DownloadCard title="Answers" description="2017 Answer Booklet (English)" paperId="2017_ans_eng" />
                        <DownloadCard title="Performance" description="2017 Performance Descriptors (English)" paperId="2017_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <h2 style={{ textAlign: "center" }}>2016</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="卷一" description="2016 Paper 1 (中文)" paperId="2016_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2016 Paper 2 (中文)" paperId="2016_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2016 參考答案 (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2016 考生表現 (中文)" paperId="2016_per_chi" buttonText="下載" />
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
                        <DownloadCard title="卷一" description="2015 Paper 1 (中文)" paperId="2015_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2015 Paper 2 (中文)" paperId="2015_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2015 參考答案 (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2015 考生表現 (中文)" paperId="2015_per_chi" buttonText="下載" />
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
                        <DownloadCard title="卷一" description="2014 Paper 1 (中文)" paperId="2014_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2014 Paper 2 (中文)" paperId="2014_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2014 參考答案 (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2014 考生表現 (中文)" paperId="2014_per_chi" buttonText="下載" />
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
                        <DownloadCard title="卷一" description="2013 Paper 1 (中文)" paperId="2013_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2013 Paper 2 (中文)" paperId="2013_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2013 參考答案 (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2013 考生表現 (中文)" paperId="2013_per_chi" buttonText="下載" />
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
                        <DownloadCard title="卷一" description="2012 Paper 1 (中文)" paperId="2012_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2012 Paper 2 (中文)" paperId="2012_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2012 參考答案 (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2012 考生表現 (中文)" paperId="2012_per_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2012 Paper 1 (English)" paperId="2012_p1_eng" />
                        <DownloadCard title="Paper 2" description="2012 Paper 2 (English)" paperId="2012_p2_eng" />
                        <DownloadCard title="Answers" description="2012 Answer Booklet (English)" paperId="2012_ans_eng" />
                        <DownloadCard title="Performance" description="2012 Performance Descriptors (English)" paperId="2012_per_eng" />
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>主題練習（中文）</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="主題一 地球" description="地球" paperId="bytopic_1_chi" buttonText="下載" />
                        <DownloadCard title="主題二 微觀世界 I" description="微觀世界 I" paperId="bytopic_2_chi" buttonText="下載" />
                        <DownloadCard title="主題三 金屬" description="金屬" paperId="bytopic_3_chi" buttonText="下載" />
                        <DownloadCard title="主題四 酸和鹽" description="酸和鹽" paperId="bytopic_4_chi" buttonText="下載" />
                        <DownloadCard title="主題五 化石燃料" description="化石燃料和碳化合物" paperId="bytopic_5_chi" buttonText="下載" />
                        <DownloadCard title="主題六 微觀世界 II" description="微觀世界 II" paperId="bytopic_6_chi" buttonText="下載" />
                        <DownloadCard title="主題七 化學電池" description="化學電池" paperId="bytopic_7_chi" buttonText="下載" />
                        <DownloadCard title="主題八 化學反應與能量" description="化學反應與能量" paperId="bytopic_8_chi" buttonText="下載" />
                        <DownloadCard title="主題九 氧化還原反應" description="氧化還原反應" paperId="bytopic_9_chi" buttonText="下載" />
                        <DownloadCard title="主題十 電解" description="電解" paperId="bytopic_10_chi" buttonText="下載" />
                        <DownloadCard title="主題十一 反應速率" description="反應速率" paperId="bytopic_11_chi" buttonText="下載" />
                        <DownloadCard title="主題十二 氣體的摩爾數" description="氣體的摩爾數" paperId="bytopic_12_chi" buttonText="下載" />
                        <DownloadCard title="主題十三 平衡常數" description="平衡常數" paperId="bytopic_13_chi" buttonText="下載" />
                        <DownloadCard title="主題十四 同系列和同分異構" description="同系列和同分異構" paperId="bytopic_14_chi" buttonText="下載" />
                        <DownloadCard title="主題十五 碳化合物" description="碳化合物的化學" paperId="bytopic_15_chi" buttonText="下載" />
                        <DownloadCard title="主題十六 重要有機物質" description="重要有機物質" paperId="bytopic_16_chi" buttonText="下載" />
                        <DownloadCard title="主題十七 化學世界中的規律" description="化學世界中的規律" paperId="bytopic_17_chi" buttonText="下載" />
                        <DownloadCard title="MC Answers" description="MC Answers (中文)" paperId="bytopic_18_chi" buttonText="下載" />
                        <DownloadCard title="CE LQ Answers" description="CE LQ Answers (中文)" paperId="bytopic_19_chi" buttonText="下載" />
                        <DownloadCard title="DSE LQ Answers" description="DSE LQ Answers (中文)" paperId="bytopic_20_chi" buttonText="下載" />
                        <DownloadCard title="E1 工業化學" description="工業化學 (中文)" paperId="bytopic_21_chi" buttonText="下載" />
                        <DownloadCard title="E2 分析化學" description="分析化學 (中文)" paperId="bytopic_22_chi" buttonText="下載" />
                        <DownloadCard title="All (excluding E1, E2)" description="All (excluding E1, E2) (中文)" paperId="bytopic_all_chi" buttonText="下載" />
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>By Topic (English)</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="Topic 1 Laboratory Safety" description="Laboratory Safety and Precautions" paperId="bytopic_1_eng" />
                        <DownloadCard title="Topic 2 Planet Earth" description="Planet Earth" paperId="bytopic_2_eng" />
                        <DownloadCard title="Topic 3 Microscopic World" description="Microscopic World" paperId="bytopic_3_eng" />
                        <DownloadCard title="Topic 4 Metals" description="Metals" paperId="bytopic_4_eng" />
                        <DownloadCard title="Topic 5 Acid and Bases" description="Acid and Bases" paperId="bytopic_5_eng" />
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">Topic 6 Fossil fuels</h5>
                                    <p className="card-text">Fossil fuels and Carbon Compounds (file missing)</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id=""
                                    >
                                        
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <DownloadCard title="Topic 7 Microscopic World II" description="Microscopic World II" paperId="bytopic_6_eng" />
                        <DownloadCard title="Topic 8 Redox Reactions" description="Redox Reactions, Chemical Cells and Electrolysis" paperId="bytopic_7_eng" />
                        <DownloadCard title="Topic 9 Chemical Reactions" description="Chemical Reactions and Energy" paperId="bytopic_8_eng" />
                        <DownloadCard title="Topic 10 Rate of Reaction" description="Rate of Reaction" paperId="bytopic_9_eng" />
                        <DownloadCard title="Topic 11 Chemical Equilibrium" description="Chemical Equilibrium" paperId="bytopic_10_eng" />
                        <DownloadCard title="Topic 12 Carbon Compounds" description="Chemistry of Carbon Compounds" paperId="bytopic_11_eng" />
                        <DownloadCard title="Topic 13 Chemical World" description="Patterns in the Chemical World" paperId="bytopic_12_eng" />
                        <DownloadCard title="Elective 1 Industrial Chemistry" description="Industrial Chemistry" paperId="bytopic_14_eng" />
                        <DownloadCard title="Elective 2 Analytical Chemistry" description="Analytical Chemistry" paperId="bytopic_15_eng" />
                        <DownloadCard title="Book 1 Topic 1-6" description="By Topic Book 1 (English)" paperId="bytopic_bk1_eng" />
                        <DownloadCard title="Book 2 Topic 7-13" description="By Topic Book 2 (English)" paperId="bytopic_bk2_eng" />
                        <DownloadCard title="Book 3 E1+E2" description="By Topic Book 3 (English)" paperId="bytopic_bk3_eng" />
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>練習卷 / Practice Paper</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Practice Papers (Chinese) */}
                        <DownloadCard title="練習卷 答案" description="練習卷 Answers (中文)" paperId="pp_ans_chi" buttonText="下載" />
                        <DownloadCard title="練習卷 1" description="練習卷 1 (中文)" paperId="pp_p1_chi" buttonText="下載" />
                        <DownloadCard title="練習卷 2" description="練習卷 2 (中文)" paperId="pp_p2_chi" buttonText="下載" />
                        {/* Practice Papers (English) */}
                        <DownloadCard title="Practice Paper Answers" description="Practice Paper Answers (English)" paperId="pp_ans_eng" />
                        <DownloadCard title="Practice Paper 1" description="Practice Paper 1 (English)" paperId="pp_p1_eng" />
                        <DownloadCard title="Practice Paper 2" description="Practice Paper 2 (English)" paperId="pp_p2_eng" />
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>樣本卷 / Sample Paper</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Sample Papers (Chinese) */}
                        <DownloadCard title="樣本卷 1" description="樣本卷 1 (中文)" paperId="sp_p1_chi" buttonText="下載" />
                        <DownloadCard title="樣本卷 2" description="樣本卷 2 (中文)" paperId="sp_p2_chi" buttonText="下載" />
                        {/* Sample Papers (English) */}
                        <DownloadCard title="Sample Paper Answers" description="Sample Paper Answers (English)" paperId="sp_ans_eng" />
                        <DownloadCard title="Sample Paper 1" description="Sample Paper 1 (English)" paperId="sp_p1_eng" />
                        <DownloadCard title="Sample Paper 2" description="Sample Paper 2 (English)" paperId="sp_p2_eng" />
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
        </>
    )
}
