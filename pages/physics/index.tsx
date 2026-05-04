import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';

export default function PhysicsPage() {
    const lastUpdated = getSubjectIndexLastUpdated('physics');

    return (
        <>
            <PageSEO
                title="DSE 物理 Physics Past Paper | By Year + By Topic"
                description="DSE 物理科 Physics 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握Physics實驗技能及理論應用能力。"
                ogTitle="DSE 物理 Physics 歷屆試題 | By Year + By Topic"
                ogDescription="DSE 物理科 Physics 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握Physics實驗技能及理論應用能力。"
                ogUrl="https://dse.best/physics"
                robots={['index', 'follow']}
              subjectKey="physics"
            {/*breadcrumb*/}
            <PageBreadcrumb section="物理" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">
                        DSE 物理 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Physics 物理歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Physics past papers. Here you can find comprehensive Physics examination materials including mechanics, electricity, waves, and modern physics topics arranged by year, along with practical examination papers, topic-based practice exercises, and detailed marking schemes to help you master DSE Physics concepts and achieve excellent results in your examination.
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
                        <DownloadCard title="中文 評核內容" description="DSE物理 評核內容 (中文)" paperId="syllabus_chi" buttonText="下載" />
                        <DownloadCard title="English Syllabus" description="DSE Physics Syllabus (English)" paperId="syllabus_eng" />
                    </div>
                    <hr className="my-4" />
                    
                    {/* 2024 */}
                    <h2 className="text-center">2024</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* English */}
                        <DownloadCard title="Paper 1A" description="2024 Paper 1A (English)" paperId="2024_p1a_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 className="text-center">2023</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一甲 (中)" description="2023 Paper 1A (中文)" paperId="2023_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2023 Paper 1B (中文)" paperId="2023_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2023 Paper 2 (中文)" paperId="2023_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2023 參考答案 (中文)" paperId="2023_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2023 考生表現 (中文)" paperId="2023_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2023 Paper 1A (English)" paperId="2023_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2023 Paper 1B (English)" paperId="2023_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2023 Paper 2 (English)" paperId="2023_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2023 Answer Booklet (English)" paperId="2023_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2023 Performance Descriptors (English)" paperId="2023_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 className="text-center">2022</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2022 Paper 1A (中文)" paperId="2022_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2022 Paper 1B (中文)" paperId="2022_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2022 Paper 2 (中文)" paperId="2022_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2022 參考答案 (中文)" paperId="2022_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2022 考生表現 (中文)" paperId="2022_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2022 Paper 1A (English)" paperId="2022_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2022 Paper 1B (English)" paperId="2022_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2022 Paper 2 (English)" paperId="2022_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2022 Answer Booklet (English)" paperId="2022_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2022 Performance Descriptors (English)" paperId="2022_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <h2 className="text-center">2020</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一甲 (中)" description="2020 Paper 1A (中文)" paperId="2020_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2020 Paper 1B (中文)" paperId="2020_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2020 Paper 2 (中文)" paperId="2020_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2020 參考答案 (中文)" paperId="2020_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2020 考生表現 (中文)" paperId="2020_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2020 Paper 1A (English)" paperId="2020_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2020 Paper 1B (English)" paperId="2020_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2020 Paper 2 (English)" paperId="2020_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2020 Answer Booklet (English)" paperId="2020_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2020 Performance Descriptors (English)" paperId="2020_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2021 */}
                    <h2 className="text-center">2021</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2021 Paper 1A (中文)" paperId="2021_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2021 Paper 1B (中文)" paperId="2021_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2021 Paper 2 (中文)" paperId="2021_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2021 參考答案 (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2021 考生表現 (中文)" paperId="2021_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2021 Paper 1A (English)" paperId="2021_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2021 Paper 1B (English)" paperId="2021_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2021 Paper 2 (English)" paperId="2021_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2021 Answer Booklet (English)" paperId="2021_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2021 Performance Descriptors (English)" paperId="2021_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <h2 className="text-center">2019</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一甲 (中)" description="2019 Paper 1A (中文)" paperId="2019_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2019 Paper 1B (中文)" paperId="2019_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2019 Paper 2 (中文)" paperId="2019_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2019 參考答案 (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2019 考生表現 (中文)" paperId="2019_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2019 Paper 1A (English)" paperId="2019_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2019 Paper 1B (English)" paperId="2019_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2019 Paper 2 (English)" paperId="2019_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2019 Answer Booklet (English)" paperId="2019_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2019 Performance Descriptors (English)" paperId="2019_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <h2 className="text-center">2018</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一甲 (中)" description="2018 Paper 1A (中文)" paperId="2018_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2018 Paper 1B (中文)" paperId="2018_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2018 Paper 2 (中文)" paperId="2018_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2018 參考答案 (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2018 考生表現 (中文)" paperId="2018_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2018 Paper 1A (English)" paperId="2018_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2018 Paper 1B (English)" paperId="2018_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2018 Paper 2 (English)" paperId="2018_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2018 Answer Booklet (English)" paperId="2018_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2018 Performance Descriptors (English)" paperId="2018_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <h2 className="text-center">2017</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2017 Paper 1A (中文)" paperId="2017_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2017 Paper 1B (中文)" paperId="2017_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2017 Paper 2 (中文)" paperId="2017_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2017 參考答案 (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2017 考生表現 (中文)" paperId="2017_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2017 Paper 1A (English)" paperId="2017_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2017 Paper 1B (English)" paperId="2017_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2017 Paper 2 (English)" paperId="2017_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2017 Answer Booklet (English)" paperId="2017_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2017 Performance Descriptors (English)" paperId="2017_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <h2 className="text-center">2016</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2016 Paper 1A (中文)" paperId="2016_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2016 Paper 1B (中文)" paperId="2016_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2016 Paper 2 (中文)" paperId="2016_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2016 參考答案 (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2016 考生表現 (中文)" paperId="2016_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2016 Paper 1A (English)" paperId="2016_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2016 Paper 1B (English)" paperId="2016_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2016 Paper 2 (English)" paperId="2016_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2016 Answer Booklet (English)" paperId="2016_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2016 Performance Descriptors (English)" paperId="2016_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2015 */}
                    <h2 className="text-center">2015</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2015 Paper 1A (中文)" paperId="2015_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2015 Paper 1B (中文)" paperId="2015_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2015 Paper 2 (中文)" paperId="2015_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2015 參考答案 (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2015 考生表現 (中文)" paperId="2015_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2015 Paper 1A (English)" paperId="2015_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2015 Paper 1B (English)" paperId="2015_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2015 Paper 2 (English)" paperId="2015_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2015 Answer Booklet (English)" paperId="2015_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2015 Performance Descriptors (English)" paperId="2015_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2014 */}
                    <h2 className="text-center">2014</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2014 Paper 1A (中文)" paperId="2014_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2014 Paper 1B (中文)" paperId="2014_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2014 Paper 2 (中文)" paperId="2014_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2014 參考答案 (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2014 考生表現 (中文)" paperId="2014_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2014 Paper 1A (English)" paperId="2014_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2014 Paper 1B (English)" paperId="2014_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2014 Paper 2 (English)" paperId="2014_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2014 Answer Booklet (English)" paperId="2014_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2014 Performance Descriptors (English)" paperId="2014_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2013 */}
                    <h2 className="text-center">2013</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2013 Paper 1A (中文)" paperId="2013_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2013 Paper 1B (中文)" paperId="2013_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2013 Paper 2 (中文)" paperId="2013_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2013 參考答案 (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2013 考生表現 (中文)" paperId="2013_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2013 Paper 1A (English)" paperId="2013_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2013 Paper 1B (English)" paperId="2013_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2013 Paper 2 (English)" paperId="2013_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2013 Answer Booklet (English)" paperId="2013_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2013 Performance Descriptors (English)" paperId="2013_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2012 */}
                    <h2 className="text-center">2012</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="卷一甲 (中)" description="2012 Paper 1A (中文)" paperId="2012_p1a_chi" buttonText="下載" />
                        <DownloadCard title="卷一乙 (中)" description="2012 Paper 1B (中文)" paperId="2012_p1b_chi" buttonText="下載" />
                        <DownloadCard title="卷二 (中)" description="2012 Paper 2 (中文)" paperId="2012_p2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案 (中)" description="2012 參考答案 (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2012 考生表現 (中文)" paperId="2012_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1A (Eng)" description="2012 Paper 1A (English)" paperId="2012_p1a_eng" />
                        <DownloadCard title="Paper 1B (Eng)" description="2012 Paper 1B (English)" paperId="2012_p1b_eng" />
                        <DownloadCard title="Paper 2 (Eng)" description="2012 Paper 2 (English)" paperId="2012_p2_eng" />
                        <DownloadCard title="Answers (Eng)" description="2012 Answer Booklet (English)" paperId="2012_ans_eng" />
                        <DownloadCard title="Performance (Eng)" description="2012 Performance Descriptors (English)" paperId="2012_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic (中文) */}
                    <h2 className="text-center">主題練習（中文）</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="主題一 熱和氣體" description="By Topic 1 (中文)" paperId="bytopic_1_chi" buttonText="下載" />
                        <DownloadCard title="主題二 力和運動" description="By Topic 2 (中文)" paperId="bytopic_2_chi" buttonText="下載" />
                        <DownloadCard title="主題三 波動" description="By Topic 3 (中文)" paperId="bytopic_3_chi" buttonText="下載" />
                        <DownloadCard title="主題四 電和磁" description="By Topic 4 (中文)" paperId="bytopic_4_chi" buttonText="下載" />
                        <DownloadCard title="主題五 放射現象和核能" description="By Topic 5 (中文)" paperId="bytopic_5_chi" buttonText="下載" />
                        <DownloadCard title="主題六 天文學和航天科學" description="By Topic 6 (中文)" paperId="bytopic_6_chi" buttonText="下載" />
                        <DownloadCard title="主題七 原子世界" description="By Topic 7 (中文)" paperId="bytopic_7_chi" buttonText="下載" />
                        <DownloadCard title="主題八 能量和能源的使用" description="By Topic 8 (中文)" paperId="bytopic_8_chi" buttonText="下載" />
                        <DownloadCard title="主題九 醫學物理學" description="By Topic 9 (中文)" paperId="bytopic_9_chi" buttonText="下載" />
                        <DownloadCard title="MC 答案" description="MC 答案 (中文)" paperId="bytopic_10_chi" buttonText="下載" />
                        <DownloadCard title="CE 長題目答案" description="CE 長題目答案 (中文)" paperId="bytopic_11_chi" buttonText="下載" />
                        <DownloadCard title="DSE 答案" description="DSE 答案 (中文)" paperId="bytopic_12_chi" buttonText="下載" />
                        <DownloadCard title="2018-2021 By Topic" description="2018-2021 By Topic (中文)" paperId="bytopic_13_chi" buttonText="下載" />
                        <DownloadCard title="2018-2021 答案" description="2018-2021 答案 (中文)" paperId="bytopic_14_chi" buttonText="下載" />
                        <DownloadCard title="主題1-5 BK1" description="主題1-5 BK1 (中文)" paperId="bytopic_bk1_chi" buttonText="下載" />
                        <DownloadCard title="主題6-9 BK2" description="主題6-9 BK2 (中文)" paperId="bytopic_bk2_chi" buttonText="下載" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic (English) */}
                    <h2 className="text-center">By Topic (English)</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Topics 1–28 */}
                        <DownloadCard title="Topic 1 Temperature, Heat and Internal Energy" description="Temperature, Heat and Internal Energy" paperId="bytopic_1_eng" />
                        <DownloadCard title="Topic 2 Transfer Processes" description="Transfer Processes" paperId="bytopic_2_eng" />
                        <DownloadCard title="Topic 3 Change of State" description="Change of State" paperId="bytopic_3_eng" />
                        <DownloadCard title="Topic 4 General Gas Law" description="General Gas Law" paperId="bytopic_4_eng" />
                        <DownloadCard title="Topic 5 Kinetic Theory" description="Kinetic Theory" paperId="bytopic_5_eng" />
                        <DownloadCard title="Topic 6 Position and Movement" description="Position and Movement" paperId="bytopic_6_eng" />
                        <DownloadCard title="Topic 7 Newton's Laws" description="Newton's Laws" paperId="bytopic_7_eng" />
                        <DownloadCard title="Topic 8 Moment of Force" description="Moment of Force" paperId="bytopic_8_eng" />
                        <DownloadCard title="Topic 9 Work, Energy and Power" description="Work, Energy and Power" paperId="bytopic_9_eng" />
                        <DownloadCard title="Topic 10 Momentum" description="Momentum" paperId="bytopic_10_eng" />
                        <DownloadCard title="Topic 11 Projectile Motion" description="Projectile Motion" paperId="bytopic_11_eng" />
                        <DownloadCard title="Topic 12 Circular Motion" description="Circular Motion" paperId="bytopic_12_eng" />
                        <DownloadCard title="Topic 13 Gravitation" description="Gravitation" paperId="bytopic_13_eng" />
                        <DownloadCard title="Topic 14 Wave Propagation" description="Wave Propagation" paperId="bytopic_14_eng" />
                        <DownloadCard title="Topic 15 Wave Phenomena" description="Wave Phenomena" paperId="bytopic_15_eng" />
                        <DownloadCard title="Topic 16 Reflection and Refraction of Light" description="Reflection and Refraction of Light" paperId="bytopic_16_eng" />
                        <DownloadCard title="Topic 17 Lenses" description="Lenses" paperId="bytopic_17_eng" />
                        <DownloadCard title="Topic 18 Wave Nature of Light" description="Wave Nature of Light" paperId="bytopic_18_eng" />
                        <DownloadCard title="Topic 19 Sound" description="Sound" paperId="bytopic_19_eng" />
                        <DownloadCard title="Topic 20 Electrostatics" description="Electrostatics" paperId="bytopic_20_eng" />
                        <DownloadCard title="Topic 21 Electric Circuits" description="Electric Circuits" paperId="bytopic_21_eng" />
                        <DownloadCard title="Topic 22 Domestic Electricity" description="Domestic Electricity" paperId="bytopic_22_eng" />
                        <DownloadCard title="Topic 23 Magnetic Field" description="Magnetic Field" paperId="bytopic_23_eng" />
                        <DownloadCard title="Topic 24 Electromagnetic Induction" description="Electromagnetic Induction" paperId="bytopic_24_eng" />
                        <DownloadCard title="Topic 25 Alternating Current" description="Alternating Current" paperId="bytopic_25_eng" />
                        <DownloadCard title="Topic 26 Radiation and Radioactivity" description="Radiation and Radioactivity" paperId="bytopic_26_eng" />
                        <DownloadCard title="Topic 27 Atomic Model" description="Atomic Model" paperId="bytopic_27_eng" />
                        <DownloadCard title="Topic 28 Nuclear Energy" description="Nuclear Energy" paperId="bytopic_28_eng" />
                        {/* BK and E papers */}
                        <DownloadCard title="Book 1 Topic 1-5" description="Book 1 Topic 1-5" paperId="bytopic_bk1_eng" />
                        <DownloadCard title="Book 2 Topic 6-13" description="Book 2 Topic 6-13" paperId="bytopic_bk2_eng" />
                        <DownloadCard title="Book 3 Topic 14-19" description="Book 3 Topic 14-19" paperId="bytopic_bk3_eng" />
                        <DownloadCard title="Book 4 Topic 20-25" description="Book 4 Topic 20-25" paperId="bytopic_bk4_eng" />
                        <DownloadCard title="Book 5 Topic 26-28" description="Book 5 Topic 26-28" paperId="bytopic_bk5_eng" />
                        <DownloadCard title="E1" description="By Topic E1 (English)" paperId="bytopic_e1_eng" />
                        <DownloadCard title="E2" description="By Topic E2 (English)" paperId="bytopic_e2_eng" />
                        <DownloadCard title="E3" description="By Topic E3 (English)" paperId="bytopic_e3_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice/Sample/Special Papers */}
                    <h2 className="text-center">練習卷 / Practice Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="練習卷 1A (中)" description="練習卷 1A (中文)" paperId="pp_p1a_chi" buttonText="下載" />
                        <DownloadCard title="練習卷 1B (中)" description="練習卷 1B (中文)" paperId="pp_p1b_chi" buttonText="下載" />
                        <DownloadCard title="練習卷 1A (中)" description="練習卷 1A (中文)" paperId="sp_p1a_chi" buttonText="下載" />
                        <DownloadCard title="練習卷 1B (中)" description="練習卷 1B (中文)" paperId="sp_p1b_chi" buttonText="下載" />
                        <DownloadCard title="練習卷 2 (中)" description="練習卷 2 (中文)" paperId="sp_p2_chi" buttonText="下載" />
                        {/* English versions */}
                        <DownloadCard title="Practice Paper 1A (Eng)" description="Practice Paper 1A (English)" paperId="pp_p1a_eng" />
                        <DownloadCard title="Practice Paper Answers (Eng)" description="2023 Practice Paper Answer Booklet" paperId="pp_ans_eng" />

                        <DownloadCard title="Sample Paper 1A (Eng)" description="Sample Paper 1A (English)" paperId="sp_p1a_eng" />
                        <DownloadCard title="Sample Paper 1B (Eng)" description="Sample Paper 1B (English)" paperId="sp_p1b_eng" />
                        <DownloadCard title="Sample Paper 2 (Eng)" description="Sample Paper 2 (English)" paperId="sp_p2_eng" />
                    </div>
                </div>
                <hr className="my-4" />
            </div>
        </>
    )
}
