import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';

export default function IctPage() {
    const lastUpdated = getSubjectIndexLastUpdated('ict');

    return (
        <>
            <PageSEO
                title="DSE 資訊及通訊科技 ICT Past Paper | 歷屆試題及答案"
                description="DSE 資訊及通訊科技科 ICT 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握ICT應用技能及解難能力。"
                ogTitle="DSE 資訊及通訊科技 ICT 歷屆試題 Past Papers | 資訊及通訊科技試卷及答案"
                ogDescription="DSE 資訊及通訊科技科 ICT 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握ICT應用技能及解難能力。"
                ogUrl="https://dse.best/ict"
                robots={['index', 'follow']}
                subjectKey="ict"
            />
            {/*breadcrumb*/}
            <PageBreadcrumb section="資訊及通訊科技" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">
                        DSE 資訊及通訊科技 ICT 歷屆試題 Past Papers (By year + Practice Papers +
                        Sample Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE 資訊及通訊科技 ICT
                        歷屆試題。在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Information and Communication Technology (ICT) past papers. Here you can find comprehensive ICT examination materials including database management, programming, networking, multimedia, and information processing topics arranged by year, along with practical examination papers, topic-based practice exercises, and detailed marking schemes to help you master DSE ICT concepts and prepare effectively for your examination.
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
                        <DownloadCard title="中文 評核內容" description="DSE資訊及通訊科技 評核內容 (中文)" paperId="syll_chi" buttonText="下載" />
                        <DownloadCard title="English Syllabus" description="DSE ICT Syllabus (English)" paperId="syll_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 className="text-center">2023</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="考試報告" description="2023 考試報告 (中文)" paperId="2023_exam_chi" buttonText="下載" />
                        <DownloadCard title="卷一" description="2023 Paper 1 (中文)" paperId="2023_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2023 Paper 2A 數據庫 (中文)" paperId="2023_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2023 Paper 2B 數據通訊及建網 (中文)" paperId="2023_p2b_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2023 參考答案 (中文)" paperId="2023_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2023 考生表現 (中文)" paperId="2023_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Exam Report" description="2023 Exam Report (English)" paperId="2023_exam_eng" />
                        <DownloadCard title="Paper 1" description="2023 Paper 1 (English)" paperId="2023_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2023 Paper 2A Database (English)" paperId="2023_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2023 Paper 2B Data Communications &amp; Networking (English)" paperId="2023_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2023 Paper 2C Web Authoring (English)" paperId="2023_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2023 Paper 2D Software Development (English)" paperId="2023_p2d_eng" />
                        <DownloadCard title="Answers" description="2023 Answer Booklet (English)" paperId="2023_ans_eng" />
                        <DownloadCard title="Performance" description="2023 Performance Descriptors (English)" paperId="2023_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 className="text-center">2022</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="卷一" description="2022 Paper 1 (中文)" paperId="2022_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二甲" description="2022 Paper 2A 數據庫 (中文)" paperId="2022_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2022 Paper 2B 數據通訊及建網 (中文)" paperId="2022_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2022 Paper 2C 網頁編寫 (中文)" paperId="2022_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2022 Paper 2D 軟件開發 (中文)" paperId="2022_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2022 參考答案 (中文)" paperId="2022_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2022 考生表現 (中文)" paperId="2022_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2022 Paper 1 (English)" paperId="2022_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2022 Paper 2A Database (English)" paperId="2022_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2022 Paper 2B Data Communications &amp; Networking (English)" paperId="2022_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2022 Paper 2C Web Authoring (English)" paperId="2022_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2022 Paper 2D Software Development (English)" paperId="2022_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2021 Paper 2A 數據庫 (中文)" paperId="2021_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2021 Paper 2B 數據通訊及建網 (中文)" paperId="2021_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2021 Paper 2C 網頁編寫 (中文)" paperId="2021_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2021 Paper 2D 軟件開發 (中文)" paperId="2021_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2021 參考答案 (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2021 考生表現 (中文)" paperId="2021_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2021 Paper 1 (English)" paperId="2021_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2021 Paper 2A Database (English)" paperId="2021_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2021 Paper 2B Data Communications &amp; Networking (English)" paperId="2021_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2021 Paper 2C Web Authoring (English)" paperId="2021_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2021 Paper 2D Software Development (English)" paperId="2021_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2020 Paper 2A 數據庫 (中文)" paperId="2020_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2020 Paper 2B 數據通訊及建網 (中文)" paperId="2020_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2020 Paper 2C 網頁編寫 (中文)" paperId="2020_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2020 Paper 2D 軟件開發 (中文)" paperId="2020_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2020 參考答案 (中文)" paperId="2020_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2020 考生表現 (中文)" paperId="2020_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2020 Paper 1 (English)" paperId="2020_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2020 Paper 2A Database (English)" paperId="2020_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2020 Paper 2B Data Communications &amp; Networking (English)" paperId="2020_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2020 Paper 2C Web Authoring (English)" paperId="2020_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2020 Paper 2D Software Development (English)" paperId="2020_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2019 Paper 2A 數據庫 (中文)" paperId="2019_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2019 Paper 2B 數據通訊及建網 (中文)" paperId="2019_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2019 Paper 2C 網頁編寫 (中文)" paperId="2019_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2019 Paper 2D 軟件開發 (中文)" paperId="2019_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2019 參考答案 (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2019 考生表現 (中文)" paperId="2019_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2019 Paper 1 (English)" paperId="2019_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2019 Paper 2A Database (English)" paperId="2019_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2019 Paper 2B Data Communications &amp; Networking (English)" paperId="2019_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2019 Paper 2C Web Authoring (English)" paperId="2019_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2019 Paper 2D Software Development (English)" paperId="2019_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2018 Paper 2A 數據庫 (中文)" paperId="2018_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2018 Paper 2B 數據通訊及建網 (中文)" paperId="2018_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2018 Paper 2C 網頁編寫 (中文)" paperId="2018_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2018 Paper 2D 軟件開發 (中文)" paperId="2018_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2018 參考答案 (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2018 考生表現 (中文)" paperId="2018_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2018 Paper 1 (English)" paperId="2018_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2018 Paper 2A Database (English)" paperId="2018_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2018 Paper 2B Data Communications &amp; Networking (English)" paperId="2018_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2018 Paper 2C Web Authoring (English)" paperId="2018_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2018 Paper 2D Software Development (English)" paperId="2018_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2017 Paper 2A 數據庫 (中文)" paperId="2017_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2017 Paper 2B 數據通訊及建網 (中文)" paperId="2017_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2017 Paper 2C 網頁編寫 (中文)" paperId="2017_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2017 Paper 2D 軟件開發 (中文)" paperId="2017_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2017 參考答案 (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2017 考生表現 (中文)" paperId="2017_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2017 Paper 1 (English)" paperId="2017_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2017 Paper 2A Database (English)" paperId="2017_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2017 Paper 2B Data Communications &amp; Networking (English)" paperId="2017_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2017 Paper 2C Web Authoring (English)" paperId="2017_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2017 Paper 2D ftware Development (English)" paperId="2017_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2016 Paper 2A 數據庫 (中文)" paperId="2016_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2016 Paper 2B 數據通訊及建網 (中文)" paperId="2016_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2016 Paper 2C 網頁編寫 (中文)" paperId="2016_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2016 Paper 2D 軟件開發 (中文)" paperId="2016_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2016 參考答案 (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2016 考生表現 (中文)" paperId="2016_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2016 Paper 1 (English)" paperId="2016_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2016 Paper 2A Database (English)" paperId="2016_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2016 Paper 2B Data Communications &amp; Networking (English)" paperId="2016_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2016 Paper 2C Web Authoring (English)" paperId="2016_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2016 Paper 2D Software Development (English)" paperId="2016_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2015 Paper 2A 數據庫 (中文)" paperId="2015_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2015 Paper 2B 數據通訊及建網 (中文)" paperId="2015_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2015 Paper 2C 網頁編寫 (中文)" paperId="2015_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2015 Paper 2D 軟件開發 (中文)" paperId="2015_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2015 參考答案 (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2015 考生表現 (中文)" paperId="2015_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2015 Paper 1 (English)" paperId="2015_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2015 Paper 2A Database (English)" paperId="2015_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2015 Paper 2B Data Communications &amp; Networking (English)" paperId="2015_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2015 Paper 2C Web Authoring (English)" paperId="2015_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2015 Paper 2D Software Development (English)" paperId="2015_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2014 Paper 2A 數據庫 (中文)" paperId="2014_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2014 Paper 2B 數據通訊及建網 (中文)" paperId="2014_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2014 Paper 2C 網頁編寫 (中文)" paperId="2014_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2014 Paper 2D 軟件開發 (中文)" paperId="2014_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2014 參考答案 (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2014 考生表現 (中文)" paperId="2014_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2014 Paper 1 (English)" paperId="2014_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2014 Paper 2A Database (English)" paperId="2014_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2014 Paper 2B Data Communications &amp; Networking (English)" paperId="2014_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2014 Paper 2C Web Authoring (English)" paperId="2014_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2014 Paper 2D Software Development (English)" paperId="2014_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2013 Paper 2A 數據庫 (中文)" paperId="2013_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2013 Paper 2B 數據通訊及建網 (中文)" paperId="2013_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2013 Paper 2C 網頁編寫 (中文)" paperId="2013_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2013 Paper 2D 軟件開發 (中文)" paperId="2013_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2013 參考答案 (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2013 考生表現 (中文)" paperId="2013_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2013 Paper 1 (English)" paperId="2013_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2013 Paper 2A Database (English)" paperId="2013_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2013 Paper 2B Data Communications &amp; Networking (English)" paperId="2013_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2013 Paper 2C Web Authoring (English)" paperId="2013_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2013 Paper 2D Software Development (English)" paperId="2013_p2d_eng" />
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
                        <DownloadCard title="卷二甲" description="2012 Paper 2A 數據庫 (中文)" paperId="2012_p2a_chi" buttonText="下載" />
                        <DownloadCard title="卷二乙" description="2012 Paper 2B 數據通訊及建網 (中文)" paperId="2012_p2b_chi" buttonText="下載" />
                        <DownloadCard title="卷二丙" description="2012 Paper 2C 網頁編寫 (中文)" paperId="2012_p2c_chi" buttonText="下載" />
                        <DownloadCard title="卷二丁" description="2012 Paper 2D 軟件開發 (中文)" paperId="2012_p2d_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2012 參考答案 (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        <DownloadCard title="考生表現" description="2012 考生表現 (中文)" paperId="2012_per_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Paper 1" description="2012 Paper 1 (English)" paperId="2012_p1_eng" />
                        <DownloadCard title="Paper 2A" description="2012 Paper 2A Database (English)" paperId="2012_p2a_eng" />
                        <DownloadCard title="Paper 2B" description="2012 Paper 2B Data Communications &amp; Networking (English)" paperId="2012_p2b_eng" />
                        <DownloadCard title="Paper 2C" description="2012 Paper 2C Web Authoring (English)" paperId="2012_p2c_eng" />
                        <DownloadCard title="Paper 2D" description="2012 Paper 2D Software Development (English)" paperId="2012_p2d_eng" />
                        <DownloadCard title="Answers" description="2012 Answer Booklet (English)" paperId="2012_ans_eng" />
                        <DownloadCard title="Performance" description="2012 Performance Descriptors (English)" paperId="2012_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice Papers */}
                    <h2 className="text-center">練習卷 / Practice Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="練習卷一" description="練習卷 Paper 1 (中文)" paperId="pp_p1_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二甲" description="練習卷 Paper 2A 數據庫 (中文)" paperId="pp_p2a_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二乙" description="練習卷 Paper 2B 數據通訊及建網 (中文)" paperId="pp_p2b_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二丙" description="練習卷 Paper 2C 網頁編寫 (中文)" paperId="pp_p2c_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二丁" description="練習卷 Paper 2D 軟件開發 (中文)" paperId="pp_p2d_chi" buttonText="下載" />
                        <DownloadCard title="練習卷參考答案" description="練習卷參考答案 (中文)" paperId="pp_ans_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Practice Paper 1" description="Practice Paper 1 (English)" paperId="pp_p1_eng" />
                        <DownloadCard title="Practice Paper 2A" description="Practice Paper 2A Database (English)" paperId="pp_p2a_eng" />
                        <DownloadCard title="Practice Paper 2B" description="Practice Paper 2B Data Communications &amp; Networking (English)" paperId="pp_p2b_eng" />
                        <DownloadCard title="Practice Paper 2C" description="Practice Paper 2C Web Authoring (English)" paperId="pp_p2c_eng" />
                        <DownloadCard title="Practice Paper 2D" description="Practice Paper 2D Software Development (English)" paperId="pp_p2d_eng" />
                        <DownloadCard title="Practice Paper Answers" description="Practice Paper Answer Booklet (English)" paperId="pp_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers */}
                    <h2 className="text-center">樣本試卷 / Sample Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese */}
                        <DownloadCard title="樣本試卷一" description="樣本試卷 Paper 1 (中文)" paperId="sp_p1_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二甲" description="樣本試卷 Paper 2A 數據庫 (中文)" paperId="sp_p2a_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二乙" description="樣本試卷 Paper 2B 數據通訊及建網 (中文)" paperId="sp_p2b_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二丙" description="樣本試卷 Paper 2C 網頁編寫 (中文)" paperId="sp_p2c_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二丁" description="樣本試卷 Paper 2D 軟件開發 (中文)" paperId="sp_p2d_chi" buttonText="下載" />
                        {/* English */}
                        <DownloadCard title="Sample Paper 1" description="Sample Paper 1 (English)" paperId="sp_p1_eng" />
                        <DownloadCard title="Sample Paper 2A" description="Sample Paper 2A Database (English)" paperId="sp_p2a_eng" />
                        <DownloadCard title="Sample Paper 2B" description="Sample Paper 2B Data Communications &amp; Networking (English)" paperId="sp_p2b_eng" />
                        <DownloadCard title="Sample Paper 2C" description="Sample Paper 2C Web Authoring (English)" paperId="sp_p2c_eng" />
                        <DownloadCard title="Sample Paper 2D" description="Sample Paper 2D Software Development (English)" paperId="sp_p2d_eng" />
                        <DownloadCard title="Sample Paper Answers" description="Sample Paper Answer Booklet (English)" paperId="sp_ans_eng" />
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
        </>
    )
}
