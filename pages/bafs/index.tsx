import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import SubjectSectionAd from '../../components/SubjectSectionAd';

export default function BafsPage() {
    const lastUpdated = getSubjectIndexLastUpdated('bafs');

    return (
        <>
            <PageSEO
                title="DSE BAFS 歷屆試題 Past Papers | 企業、會計與財務概論歷屆試題答案"
                description="DSE 企業、會計與財務概論 Business, Accounting and Financial Studies 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 評分參考、考生表現報告。提供完整試卷下載，助您全面掌握BAFS考試趨勢及重點。"
                ogTitle="DSE BAFS 歷屆試題 Past Papers | 企業、會計與財務概論歷屆試題答案"
                ogDescription="DSE 企業、會計與財務概論 Business, Accounting and Financial Studies 歷屆試題下載 (2012-2025)，包含Paper 1A 1B, Paper 2卷一卷二、Answers/Marking Scheme 答案、考生表現報告。提供完整試卷下載，助您全面掌握BAFS考試趨勢及重點。"
                ogUrl="https://dse.best/bafs"
                robots={['index', 'follow']}
                subjectKey="bafs"
            />
            {/*breadcrumb*/}
            <PageBreadcrumb section="企業、會計與財務概課" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">
                        DSE 企業、會計與財務概論 BAFS 歷屆試題 Past Papers (By year + By Topic +
                        Practice Papers + Sample Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE 企業、會計與財務概論 BAFS
                        歷屆試題。在此，您可以找到按年份排列的試題、按主題分類的練習、練習卷及樣本試卷，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Business, Accounting and Financial Studies (BAFS) past papers. Here you can find comprehensive BAFS examination materials including business management, accounting principles, financial analysis, and business ethics topics arranged by year, along with topic-based practice exercises, sample papers, and detailed marking schemes to help you master DSE BAFS concepts and prepare effectively for your examination.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    <br />
                    {/* Year-wise Past Paper Listing */}
                    {/* Syllabus */}
                    <h2 className="text-center">評核內容 / Syllabus</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="中文 評核內容" description="DSE企業、會計與財務概論 評核內容 (中文)" paperId="syll_chi" buttonText="下載" />
                        <DownloadCard title="English Syllabus" description="DSE BAFS Syllabus" paperId="syll_eng" />
                        <DownloadCard title="會計報告" description="會計報告 (中文)" paperId="2025_acct_chi" buttonText="下載" />
                        <DownloadCard title="企業管理報告" description="企業管理報告 (中文)" paperId="2025_bm_chi" buttonText="下載" />
                        <DownloadCard title="Accounting Report" description="Accounting Report (English)" paperId="2025_acct_eng" />
                        <DownloadCard title="Business Management Report" description="Business Management Report (English)" paperId="2025_bm_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2025 */}
                    <h2 className="text-center">2025</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一甲" description="2025 Paper 1A (中文)" paperId="2025_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙" description="2025 Paper 1B (中文)" paperId="2025_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2025 Paper 2A (中文)" paperId="2025_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2025 Paper 2B 企業管理 (中文)" paperId="2025_p2b_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2025 Paper 1A (English)" paperId="2025_p1a_eng" />
                        <DownloadCard title="Paper 1B" description="2025 Paper 1B (English)" paperId="2025_p1b_eng" />
                        <DownloadCard title="Paper 2A" description="2025 Paper 2A counting (English)" paperId="2025_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2025 Paper 2B Business Management (English)" paperId="2025_p2b_eng" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 className="text-center">2023</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="考試報告" description="2023 考試報告 (中文)" paperId="2023_exam_chi" buttonText="下載" />
                        <DownloadCard title="卷一" description="2023 Paper 1 (中文)" paperId="2023_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2023 Paper 2A 會計 (中文)" paperId="2023_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2023 Paper 2B 企業管理 (中文)" paperId="2023_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2023 參考答案 (中文)" paperId="2023_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2023 考生表現 (中文)" paperId="2023_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Exam Report" description="2023 Exam Report (English)" paperId="2023_exam_eng" />
                        <DownloadCard title="Paper 1" description="2023 Paper 1 (English)" paperId="2023_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2023 Paper 2A Accounting (English)" paperId="2023_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2023 Paper 2B Business Management (English)" paperId="2023_p2b_eng" />
                        <DownloadCard title="Answers" description="2023 Answer Booklet (English)" paperId="2023_ans_eng" />
                        <DownloadCard title="Performance" description="2023 Performance Descriptors (English)" paperId="2023_per_eng" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 className="text-center">2022</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2022 Paper 1 (中文)" paperId="2022_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2022 Paper 2A 會計 (中文)" paperId="2022_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2022 Paper 2B 企業管理 (中文)" paperId="2022_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2022 參考答案 (中文)" paperId="2022_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2022 考生表現 (中文)" paperId="2022_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2022 Paper 1 (English)" paperId="2022_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2022 Paper 2A Accounting (English)" paperId="2022_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2022 Paper 2B Business Management (English)" paperId="2022_p2b_eng" />
                        <DownloadCard title="Answers" description="2022 Answer Booklet (English)" paperId="2022_ans_eng" />
                        <DownloadCard title="Performance" description="2022 Performance Descriptors (English)" paperId="2022_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2021 */}
                    <h2 className="text-center">2021</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2021 Paper 1 (中文)" paperId="2021_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2021 Paper 2A 會計 (中文)" paperId="2021_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2021 Paper 2B 中文)" paperId="2021_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2021 參考答案 (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2021 考生表現 (中文)" paperId="2021_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2021 Paper 1 (English)" paperId="2021_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2021 Paper 2A counting (English)" paperId="2021_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2021 Paper 2B Business Management (English)" paperId="2021_p2b_eng" />
                        <DownloadCard title="Answers" description="2021 Answer Booklet (English)" paperId="2021_ans_eng" />
                        <DownloadCard title="Performance" description="2021 Performance Descriptors (English)" paperId="2021_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <h2 className="text-center">2020</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2020 Paper 1 (中文)" paperId="2020_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2020 Paper 2A )" paperId="2020_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2020 Paper 2B" paperId="2020_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2020 參考答案 (中文)" paperId="2020_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2020 考生表現 (中文)" paperId="2020_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2020 Paper 1 (English)" paperId="2020_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2020 Paper 2A ng (English)" paperId="2020_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2020 Paper 2B siness Management (English)" paperId="2020_p2b_eng" />
                        <DownloadCard title="Answers" description="2020 Answer Booklet (English)" paperId="2020_ans_eng" />
                        <DownloadCard title="Performance" description="2020 Performance Descriptors (English)" paperId="2020_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <h2 className="text-center">2019</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2019 Paper 1 (中文)" paperId="2019_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2019 Paper 2A 會計 (中文)" paperId="2019_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2019 Paper 2B 企業管理 (中文)" paperId="2019_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2019 參考答案 (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2019 考生表現 (中文)" paperId="2019_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2019 Paper 1 (English)" paperId="2019_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2019 Paper 2A Accounting (English)" paperId="2019_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2019 Paper 2B Business Management (English)" paperId="2019_p2b_eng" />
                        <DownloadCard title="Answers" description="2019 Answer Booklet (English)" paperId="2019_ans_eng" />
                        <DownloadCard title="Performance" description="2019 Performance Descriptors (English)" paperId="2019_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <h2 className="text-center">2018</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2018 Paper 1 (中文)" paperId="2018_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2018 Paper 2A 會計 (中文)" paperId="2018_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2018 Paper 2B 企業管理 (中文)" paperId="2018_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2018 參考答案 (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2018 考生表現 (中文)" paperId="2018_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2018 Paper 1 (English)" paperId="2018_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2018 Paper 2A Accounting (English)" paperId="2018_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2018 Paper 2B Business Management (English)" paperId="2018_p2b_eng" />
                        <DownloadCard title="Answers" description="2018 Answer Booklet (English)" paperId="2018_ans_eng" />
                        <DownloadCard title="Performance" description="2018 Performance Descriptors (English)" paperId="2018_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <h2 className="text-center">2017</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2017 Paper 1 (中文)" paperId="2017_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2017 Paper 2A 會計 (中文)" paperId="2017_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2017 Paper 2B 企業管理 (中文)" paperId="2017_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2017 參考答案 (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2017 考生表現 (中文)" paperId="2017_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2017 Paper 1 (English)" paperId="2017_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2017 Paper 2A Accounting (English)" paperId="2017_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2017 Paper 2B Business Management (English)" paperId="2017_p2b_eng" />
                        <DownloadCard title="Answers" description="2017 Answer Booklet (English)" paperId="2017_ans_eng" />
                        <DownloadCard title="Performance" description="2017 Performance Descriptors (English)" paperId="2017_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <h2 className="text-center">2016</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2016 Paper 1 (中文)" paperId="2016_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2016 Paper 2A 會計 (中文)" paperId="2016_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2016 Paper 2B 企業管理 (中文)" paperId="2016_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2016 參考答案 (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2016 考生表現 (中文)" paperId="2016_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2016 Paper 1 (English)" paperId="2016_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2016 Paper 2A Accounting (English)" paperId="2016_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2016 Paper 2B Business Management (English)" paperId="2016_p2b_eng" />
                        <DownloadCard title="Answers" description="2016 Answer Booklet (English)" paperId="2016_ans_eng" />
                        <DownloadCard title="Performance" description="2016 Performance Descriptors (English)" paperId="2016_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2015 */}
                    <h2 className="text-center">2015</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2015 Paper 1 (中文)" paperId="2015_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2015 Paper 2A 會計 (中文)" paperId="2015_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2015 Paper 2B 企業管理 (中文)" paperId="2015_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2015 參考答案 (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2015 考生表現 (中文)" paperId="2015_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2015 Paper 1 (English)" paperId="2015_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2015 Paper 2A Accounting (English)" paperId="2015_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2015 Paper 2B Business Management (English)" paperId="2015_p2b_eng" />
                        <DownloadCard title="Answers" description="2015 Answer Booklet (English)" paperId="2015_ans_eng" />
                        <DownloadCard title="Performance" description="2015 Performance Descriptors (English)" paperId="2015_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2014 */}
                    <h2 className="text-center">2014</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2014 Paper 1 (中文)" paperId="2014_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2014 Paper 2A 會計 (中文)" paperId="2014_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2014 Paper 2B 企業管理 (中文)" paperId="2014_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2014 參考答案 (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2014 Paper 1 (English)" paperId="2014_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2014 Paper 2A Accounting (English)" paperId="2014_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2014 Paper 2B Business Management (English)" paperId="2014_p2b_eng" />
                        <DownloadCard title="Answers" description="2014 Answer Booklet (English)" paperId="2014_ans_eng" />
                        <DownloadCard title="Performance" description="2014 Performance Descriptors (English)" paperId="2014_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2013 */}
                    <h2 className="text-center">2013</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2013 Paper 1 (中文)" paperId="2013_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2013 Paper 2A 會計 (中文)" paperId="2013_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2013 Paper 2B 企業管理 (中文)" paperId="2013_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2013 參考答案 (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2013 考生表現 (中文)" paperId="2013_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2013 Paper 1 (English)" paperId="2013_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2013 Paper 2A counting (English)" paperId="2013_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2013 Paper 2B Business Management (English)" paperId="2013_p2b_eng" />
                        <DownloadCard title="Answers" description="2013 Answer Booklet (English)" paperId="2013_ans_eng" />
                        <DownloadCard title="Performance" description="2013 Performance Descriptors (English)" paperId="2013_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2012 */}
                    <h2 className="text-center">2012</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2012 Paper 1 (中文)" paperId="2012_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2012 Paper 2A (中文)" paperId="2012_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2012 Paper 2B 企業管理 (中文)" paperId="2012_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2012 參考答案 (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2012 考生表現 (中文)" paperId="2012_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2012 Paper 1 (English)" paperId="2012_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2012 Paper 2A Accounting (English)" paperId="2012_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2012 Paper 2B Business Management (English)" paperId="2012_p2b_eng" />
                        <DownloadCard title="Answers" description="2012 Answer Booklet (English)" paperId="2012_ans_eng" />
                        <DownloadCard title="Performance" description="2012 Performance Descriptors (English)" paperId="2012_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic - Paper 1 */}
                    <h2 className="text-center">
                        按主題分類 卷一 / By Topic Paper 1
                    </h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="主題1" description="卷一 主題1 (中文)" paperId="bytopic_p1_1_chi" buttonText="下載" />
                        <DownloadCard title="主題2" description="卷一 主題2 (中文)" paperId="bytopic_p1_2_chi" buttonText="下載" />
                        <DownloadCard title="主題3" description="卷一 主題3 (中文)" paperId="bytopic_p1_3_chi" buttonText="下載" />
                        <DownloadCard title="主題4" description="卷一 主題4 (中文)" paperId="bytopic_p1_4_chi" buttonText="下載" />
                        <DownloadCard title="卷一合集" description="卷一 全部主題合集 (中文)" paperId="bytopic_p1_all_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Topic 1" description="Paper 1 Topic 1 (English)" paperId="bytopic_p1_1_eng" />
                        <DownloadCard title="Topic 2" description="Paper 1 Topic 2 (English)" paperId="bytopic_p1_2_eng" />
                        <DownloadCard title="Topic 3" description="Paper 1 Topic 3 (English)" paperId="bytopic_p1_3_eng" />
                        <DownloadCard title="Topic 4" description="Paper 1 Topic 4 (English)" paperId="bytopic_p1_4_eng" />
                        <DownloadCard title="Topic 5" description="Paper 1 Topic 5 (English)" paperId="bytopic_p1_5_eng" />
                        <DownloadCard title="Topic 6" description="Paper 1 Topic 6 (English)" paperId="bytopic_p1_6_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic Paper 2A (Accounting) */}
                    <h2 className="text-center">
                        按主題分類 卷二甲 (會計) / By Topic Paper 2A (Accounting)
                    </h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="主題1" description="卷二甲 主題1 (中文)" paperId="bytopic_p2_1_chi" buttonText="下載" />
                        <DownloadCard title="主題2" description="卷二甲 主題2 (中文)" paperId="bytopic_p2_2_chi" buttonText="下載" />
                        <DownloadCard title="主題3" description="卷二甲 主題3 (中文)" paperId="bytopic_p2_3_chi" buttonText="下載" />
                        <DownloadCard title="主題4" description="卷二甲 主題4 (中文)" paperId="bytopic_p2_4_chi" buttonText="下載" />
                        <DownloadCard title="主題5" description="卷二甲 主題5 (中文)" paperId="bytopic_p2_5_chi" buttonText="下載" />
                        <DownloadCard title="主題6" description="卷二甲 主題6 (中文)" paperId="bytopic_p2_6_chi" buttonText="下載" />
                        <DownloadCard title="主題7" description="卷二甲 主題7 (中文)" paperId="bytopic_p2_7_chi" buttonText="下載" />
                        <DownloadCard title="主題8" description="卷二甲 主題8 (中文)" paperId="bytopic_p2_8_chi" buttonText="下載" />
                        <DownloadCard title="主題9" description="卷二甲 主題9 (中文)" paperId="bytopic_p2_9_chi" buttonText="下載" />
                        <DownloadCard title="主題10" description="卷二甲 主題10 (中文)" paperId="bytopic_p2_10_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲合集" description="卷二甲 全部主題合集 (中文)" paperId="bytopic_p2_all_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Topic 1" description="Paper 2A Topic 1 Accounting (English)" paperId="bytopic_p2a_1_eng" />
                        <DownloadCard title="Topic 2" description="Paper 2A Topic 2 Accounting (English)" paperId="bytopic_p2a_2_eng" />
                        <DownloadCard title="Topic 3" description="Paper 2A Topic 3 Accounting (English)" paperId="bytopic_p2a_3_eng" />
                        <DownloadCard title="Topic 4" description="Paper 2A Topic 4 Accounting (English)" paperId="bytopic_p2a_4_eng" />
                        <DownloadCard title="Topic 5" description="Paper 2A Topic 5 Accounting (English)" paperId="bytopic_p2a_5_eng" />
                        <DownloadCard title="Topic 6" description="Paper 2A Topic 6 Accounting (English)" paperId="bytopic_p2a_6_eng" />
                        <DownloadCard title="Topic 7" description="Paper 2A Topic 7 Accounting (English)" paperId="bytopic_p2a_7_eng" />
                        <DownloadCard title="Topic 8" description="Paper 2A Topic 8 Accounting (English)" paperId="bytopic_p2a_8_eng" />
                        <DownloadCard title="Topic 9" description="Paper 2A Topic 9 Accounting (English)" paperId="bytopic_p2a_9_eng" />
                        <DownloadCard title="Topic 10" description="Paper 2A Topic 10 Accounting (English)" paperId="bytopic_p2a_10_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic - Paper 2B (Business Management) */}
                    <h2 className="text-center">
                        按主題分類 卷二乙 (企業管理) / By Topic Paper 2B (Business Management)
                    </h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* English only has files for Paper 2B */}
                        <DownloadCard title="Business Management" description="Paper 2B Business Management (English)" paperId="bytopic_p2b_all_eng" />
                        <DownloadCard title="Case Studies" description="Paper 2B se Studies (English)" paperId="bytopic_p2b_case_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice Papers */}
                    <h2 className="text-center">練習卷 / Practice Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="練習卷一" description="練習卷 Paper 1 (中文)" paperId="pp_p1_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二甲" description="練習卷 Paper 2A 會計 (中文)" paperId="pp_p2a_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二乙" description="練習卷 Paper 2B 企業管理 (中文)" paperId="pp_p2b_chi" buttonText="下載" />
                        <DownloadCard title="練習卷參考答案" description="練習卷參考答案 (中文)" paperId="pp_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Practice Paper 1" description="Practice Paper 1 (English)" paperId="pp_p1_eng" />
                        <DownloadCard title="Practice Paper 2A" description="Practice Paper 2A Accounting (English)" paperId="pp_p2a_eng" />
                        <DownloadCard title="Practice Paper 2B" description="Practice Paper 2B Business Management (English)" paperId="pp_p2b_eng" />
                        <DownloadCard title="Practice Paper Answers" description="Practice Paper Answer Booklet (English)" paperId="pp_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers */}
                    <h2 className="text-center">樣本試卷 / Sample Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="樣本試卷一" description="樣本試卷 Paper 1 (中文)" paperId="sp_p1_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二甲" description="樣本試卷 Paper 2A 會計 (中文)" paperId="sp_p2a_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二乙" description="樣本試卷 Paper 2B 企業管理 (中文)" paperId="sp_p2b_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷參考答案" description="樣本試卷參考答案 (中文)" paperId="sp_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Sample Paper 1" description="Sample Paper 1 (English)" paperId="sp_p1_eng" />
                        <DownloadCard title="Sample Paper 2A" description="Sample Paper 2A Accounting (English)" paperId="sp_p2a_eng" />
                        <DownloadCard title="Sample Paper 2B" description="Sample Paper 2B Business Management (English)" paperId="sp_p2b_eng" />
                        <div className="col">
                            <div className="card h-100 flex flex-col">
                                <div className="card-body">
                                    <h5 className="card-title">Sample Paper Answers</h5>
                                </div>
                                {/* English */}
                                <DownloadCard title="Sample Paper 1 (Eng)" description="Sample Paper 1 (English)" paperId="sp_p1_eng" />
                                <DownloadCard title="Sample Paper 2A (Eng)" description="Sample Paper 2A Accounting (English)" paperId="sp_p2a_eng" />
                                <DownloadCard title="Sample Paper 2B (Eng)" description="Sample Paper 2B Business Management (English)" paperId="sp_p2b_eng" />
                                <DownloadCard title="Sample Paper Answers (Eng)" description="Sample Paper Answer Booklet (English)" paperId="sp_ans_eng" />
                            </div>
                            <hr className="my-4" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
