import Head from 'next/head'
import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../../utils/structuredData';
import { getSubjectMetadata } from '../../utils/structuredData';
import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
export default function BiologyPage() {
  const metadata = getSubjectMetadata('biology');

    const subjectKey = 'biology';
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
                <div className="breadcrumb-title pe-3">生物</div>
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
                        DSE 生物 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE生物歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Biology past papers. Here you can find comprehensive Biology examination materials including cell biology, genetics, ecology, human physiology, and biotechnology topics arranged by year, along with practical examination papers, topic-based practice exercises, and detailed marking schemes to help you master DSE Biology concepts and excel in your examination preparation.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    <br />
                    {/* Syllabus */}
                    <h2 style={{ textAlign: "center" }}>課程大綱 / Syllabus</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="中文 課程大綱" description="DSE生物 課程大綱 (中文)" paperId="syll_chi" buttonText="下載" />
                        <DownloadCard title="English Syllabus" description="DSE Biology Syllabus (English)" paperId="syll_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* DSE Papers by Year */}
                    
                    {/* 2024 */}
                    <h2 style={{ textAlign: "center" }}>2024</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="Paper 1" description="2024 Paper 1 (English)" paperId="2024_p1_eng" />
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
                        <DownloadCard title="考生表現" description="2023 Performance (中文)" paperId="2023_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2023 Answer Booklet (中文)" paperId="2023_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2023 Paper 1 (English)" paperId="2023_p1_eng" />
                        <DownloadCard title="Paper 2" description="2023 Paper 2 (English)" paperId="2023_p2_eng" />
                        <DownloadCard title="Performance" description="2023 Performance (English)" paperId="2023_per_eng" />
                        <DownloadCard title="Answers" description="2023 Answer Booklet (English)" paperId="2023_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2022 */}
                    <h2 style={{ textAlign: "center" }}>2022</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2022 Paper 1 (中文)" paperId="2022_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2022 Paper 2 (中文)" paperId="2022_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2022 Performance (中文)" paperId="2022_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2022 Answer Booklet (中文)" paperId="2022_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2022 Paper 1 (English)" paperId="2022_p1_eng" />
                        <DownloadCard title="Paper 2" description="2022 Paper 2 (English)" paperId="2022_p2_eng" />
                        <DownloadCard title="Performance" description="2022 Performance (English)" paperId="2022_per_eng" />
                        <DownloadCard title="Answers" description="2022 Answer Booklet (English)" paperId="2022_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2021 */}
                    <h2 style={{ textAlign: "center" }}>2021</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2021 Paper 1 (中文)" paperId="2021_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2021 Paper 2 (中文)" paperId="2021_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2021 Performance (中文)" paperId="2021_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2021 Answer Booklet (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2021 Paper 1 (English)" paperId="2021_p1_eng" />
                        <DownloadCard title="Paper 2" description="2021 Paper 2 (English)" paperId="2021_p2_eng" />
                        <DownloadCard title="Performance" description="2021 Performance (English)" paperId="2021_per_eng" />
                        <DownloadCard title="Answers" description="2021 Answer Booklet (English)" paperId="2021_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2020 */}
                    <h2 style={{ textAlign: "center" }}>2020</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2020 Paper 1 (中文)" paperId="2020_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2020 Paper 2 (中文)" paperId="2020_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2020 Performance (中文)" paperId="2020_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2020 Answer Booklet (中文)" paperId="2020_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2020 Paper 1 (English)" paperId="2020_p1_eng" />
                        <DownloadCard title="Paper 2" description="2020 Paper 2 (English)" paperId="2020_p2_eng" />
                        <DownloadCard title="Performance" description="2020 Performance (English)" paperId="2020_per_eng" />
                        <DownloadCard title="Answers" description="2020 Answer Booklet (English)" paperId="2020_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2019 */}
                    <h2 style={{ textAlign: "center" }}>2019</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2019 Paper 1 (中文)" paperId="2019_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2019 Paper 2 (中文)" paperId="2019_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2019 Performance (中文)" paperId="2019_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2019 Answer Booklet (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2019 Paper 1 (English)" paperId="2019_p1_eng" />
                        <DownloadCard title="Paper 2" description="2019 Paper 2 (English)" paperId="2019_p2_eng" />
                        <DownloadCard title="Performance" description="2019 Performance (English)" paperId="2019_per_eng" />
                        <DownloadCard title="Answers" description="2019 Answer Booklet (English)" paperId="2019_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2018 */}
                    <h2 style={{ textAlign: "center" }}>2018</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2018 Paper 1 (中文)" paperId="2018_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2018 Paper 2 (中文)" paperId="2018_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2018 Performance (中文)" paperId="2018_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2018 Answer Booklet (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2018 Paper 1 (English)" paperId="2018_p1_eng" />
                        <DownloadCard title="Paper 2" description="2018 Paper 2 (English)" paperId="2018_p2_eng" />
                        <DownloadCard title="Performance" description="2018 Performance (English)" paperId="2018_per_eng" />
                        <DownloadCard title="Answers" description="2018 Answer Booklet (English)" paperId="2018_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2017 */}
                    <h2 style={{ textAlign: "center" }}>2017</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2017 Paper 1 (中文)" paperId="2017_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2017 Paper 2 (中文)" paperId="2017_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2017 Performance (中文)" paperId="2017_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2017 Answer Booklet (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2017 Paper 1 (English)" paperId="2017_p1_eng" />
                        <DownloadCard title="Paper 2" description="2017 Paper 2 (English)" paperId="2017_p2_eng" />
                        <DownloadCard title="Performance" description="2017 Performance (English)" paperId="2017_per_eng" />
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
                        <div className="col">
                            <div className="card h-100 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">考生表現</h5>
                                    <p className="card-text">2016 Performance (中文)</p>
                                </div>
                                <div className="carAd-footer bg-transparent border-0">
                                    <a
                                        href="#"
                                        className="btn btn-info px-4 d-inline-flex gap-2"
                                        data-paper-id="2016_per_chi"
                                    >
                                        下載
                                    </a>
                                </div>
                            </div>
                        </div>
                        <DownloadCard title="答案" description="2016 Answer Booklet (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2016 Paper 1 (English)" paperId="2016_p1_eng" />
                        <DownloadCard title="Paper 2" description="2016 Paper 2 (English)" paperId="2016_p2_eng" />
                        <DownloadCard title="Performance" description="2016 Performance (English)" paperId="2016_per_eng" />
                        <DownloadCard title="Answers" description="2016 Answer Booklet (English)" paperId="2016_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2015 */}
                    <h2 style={{ textAlign: "center" }}>2015</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2015 Paper 1 (中文)" paperId="2015_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2015 Paper 2 (中文)" paperId="2015_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2015 Performance (中文)" paperId="2015_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2015 Answer Booklet (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2015 Paper 1 (English)" paperId="2015_p1_eng" />
                        <DownloadCard title="Paper 2" description="2015 Paper 2 (English)" paperId="2015_p2_eng" />
                        <DownloadCard title="Performance" description="2015 Performance (English)" paperId="2015_per_eng" />
                        <DownloadCard title="Answers" description="2015 Answer Booklet (English)" paperId="2015_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2014 */}
                    <h2 style={{ textAlign: "center" }}>2014</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2014 Paper 1 (中文)" paperId="2014_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2014 Paper 2 (中文)" paperId="2014_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2014 Performance (中文)" paperId="2014_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2014 Answer Booklet (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2014 Paper 1 (English)" paperId="2014_p1_eng" />
                        <DownloadCard title="Paper 2" description="2014 Paper 2 (English)" paperId="2014_p2_eng" />
                        <DownloadCard title="Performance" description="2014 Performance (English)" paperId="2014_per_eng" />
                        <DownloadCard title="Answers" description="2014 Answer Booklet (English)" paperId="2014_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2013 */}
                    <h2 style={{ textAlign: "center" }}>2013</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2013 Paper 1 (中文)" paperId="2013_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2013 Paper 2 (中文)" paperId="2013_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2013 Performance (中文)" paperId="2013_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2013 Answer Booklet (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2013 Paper 1 (English)" paperId="2013_p1_eng" />
                        <DownloadCard title="Paper 2" description="2013 Paper 2 (English)" paperId="2013_p2_eng" />
                        <DownloadCard title="Performance" description="2013 Performance (English)" paperId="2013_per_eng" />
                        <DownloadCard title="Answers" description="2013 Answer Booklet (English)" paperId="2013_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2012 */}
                    <h2 style={{ textAlign: "center" }}>2012</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2012 Paper 1 (中文)" paperId="2012_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2012 Paper 2 (中文)" paperId="2012_p2_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2012 Performance (中文)" paperId="2012_per_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2012 Answer Booklet (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2012 Paper 1 (English)" paperId="2012_p1_eng" />
                        <DownloadCard title="Paper 2" description="2012 Paper 2 (English)" paperId="2012_p2_eng" />
                        <DownloadCard title="Performance" description="2012 Performance (English)" paperId="2012_per_eng" />
                        <DownloadCard title="Answers" description="2012 Answer Booklet (English)" paperId="2012_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>By Topic (English) Paper 1</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="All Topics (Paper 1)" description="By Topic All (Paper 1, English)" paperId="bytopic_p1_all_eng" />
                        <DownloadCard title="Topic 1 Cell and membrane transport" description="Cell and membrane transport" paperId="bytopic_p1_1_eng" />
                        <DownloadCard title="Topic 2 Enzymes" description="Enzymes" paperId="bytopic_p1_2_eng" />
                        <DownloadCard title="Topic 3 Nutrition in humans" description="Nutrition in humans" paperId="bytopic_p1_3_eng" />
                        <DownloadCard title="Topic 4 Gas exchange in humans" description="Gas exchange in humans" paperId="bytopic_p1_4_eng" />
                        <DownloadCard title="Topic 5 Transport in humans" description="Transport in humans" paperId="bytopic_p1_5_eng" />
                        <DownloadCard title="Topic 6 Nutrition and gas exchange in plants" description="Nutrition and gas exchange in plants" paperId="bytopic_p1_6_eng" />
                        <DownloadCard title="Topic 7 Transpiration, transport and support in plants" description="Transpiration, transport and support in plants" paperId="bytopic_p1_7_eng" />
                        <DownloadCard title="Topic 8 Cell division and reproduction" description="Cell division and reproduction" paperId="bytopic_p1_8_eng" />
                        <DownloadCard title="Topic 9 Growth and development" description="Growth and development" paperId="bytopic_p1_9_eng" />
                        <DownloadCard title="Topic 10 Growth responses of plants" description="Growth responses of plants" paperId="bytopic_p1_10_eng" />
                        <DownloadCard title="Topic 11 Coordination in humans" description="Coordination in humans" paperId="bytopic_p1_11_eng" />
                        <DownloadCard title="Topic 12 Movement in humans" description="Movement in humans" paperId="bytopic_p1_12_eng" />
                        <DownloadCard title="Topic 13 Homeostasis" description="Homeostasis" paperId="bytopic_p1_13_eng" />
                        <DownloadCard title="Topic 14 Biodiversity" description="Biodiversity" paperId="bytopic_p1_14_eng" />
                        <DownloadCard title="Topic 15 Ecosystems" description="Ecosystems" paperId="bytopic_p1_15_eng" />
                        <DownloadCard title="Topic 16 Photosynthesis" description="Photosynthesis" paperId="bytopic_p1_16_eng" />
                        <DownloadCard title="Topic 17 Respiration" description="Respiration" paperId="bytopic_p1_17_eng" />
                        <DownloadCard title="Topic 18 Health and diseases" description="Health and diseases" paperId="bytopic_p1_18_eng" />
                        <DownloadCard title="Topic 19 Basic genetics, Molecular and applied genetics" description="Basic genetics, Molecular and applied genetics" paperId="bytopic_p1_19_eng" />
                        <DownloadCard title="Topic 20 Evolution" description="Evolution" paperId="bytopic_p1_20_eng" />
                    </div>
                    <hr className="my-4" />
                    <h2 style={{ textAlign: "center" }}>By Topic (English) Paper 2</h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <DownloadCard title="All Topics (excluding electives)" description="All Paper 2 topics 1-27" paperId="bytopic_p2_all_eng" />
                        <DownloadCard title="Topic 1 Body defence" description="Body defence" paperId="bytopic_p2_1_eng" />
                        <DownloadCard title="Topic 2 Cell activities" description="Cell activities" paperId="bytopic_p2_2_eng" />
                        <DownloadCard title="Topic 3 Cell division" description="Cell division" paperId="bytopic_p2_3_eng" />
                        <DownloadCard title="Topic 4 Diversity of organisms and classifications" description="Diversity of organisms and classifications" paperId="bytopic_p2_4_eng" />
                        <DownloadCard title="Topic 5 Detection of environmental conditions in mammals" description="Detection of environmental conditions in mammals" paperId="bytopic_p2_5_eng" />
                        <DownloadCard title="Topic 6 Ecosystems" description="Ecosystems" paperId="bytopic_p2_6_eng" />
                        <DownloadCard title="Topic 7 Evolution" description="Evolution" paperId="bytopic_p2_7_eng" />
                        <DownloadCard title="Topic 8 Excretion and osmoregulation" description="Excretion and osmoregulation" paperId="bytopic_p2_8_eng" />
                        <DownloadCard title="Topic 9 Food and humans" description="Food and humans" paperId="bytopic_p2_9_eng" />
                        <DownloadCard title="Topic 10 Gaseous exchange in humans" description="Gaseous exchange in humans" paperId="bytopic_p2_10_eng" />
                        <DownloadCard title="Topic 11 Genetic engineering" description="Genetic engineering" paperId="bytopic_p2_11_eng" />
                        <DownloadCard title="Topic 12 Genetics" description="Genetics" paperId="bytopic_p2_12_eng" />
                        <DownloadCard title="Topic 13 Growth and development" description="Growth and development" paperId="bytopic_p2_13_eng" />
                        <DownloadCard title="Topic 14 Growth response of plant" description="Growth response of plant" paperId="bytopic_p2_14_eng" />
                        <DownloadCard title="Topic 15 Hormonal co-ordination" description="Hormonal co-ordination" paperId="bytopic_p2_15_eng" />
                        <DownloadCard title="Topic 16 Man and microorganisms" description="Man and microorganisms" paperId="bytopic_p2_16_eng" />
                        <DownloadCard title="Topic 17 Man's effect on his environment" description="Man's effect on his environment" paperId="bytopic_p2_17_eng" />
                        <DownloadCard title="Topic 18 Nervous co-ordination" description="Nervous co-ordination" paperId="bytopic_p2_18_eng" />
                        <DownloadCard title="Topic 19 Nutrition and gaseous exchange in plants" description="Nutrition and gaseous exchange in plants" paperId="bytopic_p2_19_eng" />
                        <DownloadCard title="Topic 20 Nutrition in mammals" description="Nutrition in mammals" paperId="bytopic_p2_20_eng" />
                        <DownloadCard title="Topic 21 Photosynthesis" description="Photosynthesis" paperId="bytopic_p2_21_eng" />
                        <DownloadCard title="Topic 22 Reproduction" description="Reproduction" paperId="bytopic_p2_22_eng" />
                        <DownloadCard title="Topic 23 Respiration" description="Respiration" paperId="bytopic_p2_23_eng" />
                        <DownloadCard title="Topic 24 Support and movement" description="Support and movement" paperId="bytopic_p2_24_eng" />
                        <DownloadCard title="Topic 25 Temperature regulation in mammals" description="Temperature regulation in mammals" paperId="bytopic_p2_25_eng" />
                        <DownloadCard title="Topic 26 Transport in human" description="Transport in human" paperId="bytopic_p2_26_eng" />
                        <DownloadCard title="Topic 27 Water and organisms" description="Water and organisms" paperId="bytopic_p2_27_eng" />
                        <DownloadCard title="Elective Human Physiology" description="Human Physiology elective" paperId="bytopic_p2_28_eng" />
                        <DownloadCard title="Elective Applied Ecology" description="Applied Ecology elective" paperId="bytopic_p2_29_eng" />
                        <DownloadCard title="Elective Biotechnology" description="Biotechnology elective" paperId="bytopic_p2_30_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice/Sample Papers */}
                    <h2 style={{ textAlign: "center" }}>
                        練習卷 / Practice Papers / Sample Papers
                    </h2>
                    <br />
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {/* Chinese Practice/Sample Papers */}
                        <DownloadCard title="練習卷一" description="Practice Paper 1 (Chinese)" paperId="pp_p1_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二" description="Practice Paper 2 (Chinese)" paperId="pp_p2_chi" buttonText="下載" />
                        <DownloadCard title="練習卷答案" description="Practice Paper Answers (Chinese)" paperId="pp_ans_chi" buttonText="下載" />
                        <DownloadCard title="練習卷 評分參考" description="Practice Paper Marking Scheme (Chinese)" paperId="pp_per_chi" buttonText="下載" />
                        <DownloadCard title="樣本卷一" description="Sample Paper 1 (Chinese)" paperId="sp_p1_chi" buttonText="下載" />
                        <DownloadCard title="樣本卷二" description="Sample Paper 2 (Chinese)" paperId="sp_p2_chi" buttonText="下載" />
                        <DownloadCard title="樣本卷答案" description="Sample Paper Answers (Chinese)" paperId="sp_ans_chi" buttonText="下載" />
                        {/* English Practice/Sample Papers */}
                        <DownloadCard title="Practice Paper 1" description="Practice Paper 1 (English)" paperId="pp_p1_eng" />
                        <DownloadCard title="Practice Paper 2" description="Practice Paper 2 (English)" paperId="pp_p2_eng" />
                        <DownloadCard title="Practice Paper Answers" description="Practice Paper Answers (English)" paperId="pp_ans_eng" />
                        <DownloadCard title="Sample Paper 1" description="Sample Paper 1 (English)" paperId="sp_p1_eng" />
                        <DownloadCard title="Sample Paper 2" description="Sample Paper 2 (English)" paperId="sp_p2_eng" />
                        <DownloadCard title="Sample Paper Answers" description="Sample Paper Answers (English)" paperId="sp_ans_eng" />
                        <DownloadCard title="Sample Paper Marking Scheme" description="Sample Paper Marking Scheme (English)" paperId="sp_per_eng" />
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </>
    )
}
