import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';

export default function MathPage() {
    const lastUpdated = getSubjectIndexLastUpdated('math');

    return (
        <>
            <PageSEO
                title="DSE 數學 Mathematics Past Paper | Paper 1, Paper 2, Answers/Marking Scheme"
                description="DSE 數學科 Mathematics 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握Mathematics基礎概念及解題技巧。"
                ogTitle="DSE 數學 Mathematics 歷屆試題 Past Papers | 數學試卷及答案"
                ogDescription="DSE 數學科 Mathematics 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握Mathematics基礎概念及解題技巧。"
                ogUrl="https://dse.best/math"
                robots={['index', 'follow']}
                subjectKey="math"
            />

            {/*breadcrumb*/}
            <PageBreadcrumb section="數學" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">
                        DSE 數學 歷屆試題 Past Papers (By year + By topic + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Mathematics 數學歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Mathematics past papers. Here you can find comprehensive Mathematics examination papers including Paper 1 (Multiple Choice) and Paper 2 (Long Questions) arranged by year, along with topic-based practice materials covering algebra, geometry, trigonometry, calculus, and statistics to help you master DSE Mathematics concepts and improve your exam performance.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    
                    {/* Navigation Section */}
                    <div className="text-center mb-4">
                        {/* All Years Row */}
                        <div className="mb-2 flex flex-wrap justify-center items-center">
                            <a href="#year-2025" className="no-underline text-info font-bold nav-link-year">2025</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2024" className="no-underline text-info font-bold nav-link-year">2024</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2023" className="no-underline text-info font-bold nav-link-year">2023</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2022" className="no-underline text-info font-bold nav-link-year">2022</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2021" className="no-underline text-info font-bold nav-link-year">2021</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2020" className="no-underline text-info font-bold nav-link-year">2020</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2019" className="no-underline text-info font-bold nav-link-year">2019</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2018" className="no-underline text-info font-bold nav-link-year">2018</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2017" className="no-underline text-info font-bold nav-link-year">2017</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2016" className="no-underline text-info font-bold nav-link-year">2016</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2015" className="no-underline text-info font-bold nav-link-year">2015</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2014" className="no-underline text-info font-bold nav-link-year">2014</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2013" className="no-underline text-info font-bold nav-link-year">2013</a>
                            <span className="nav-separator">|</span>
                            <a href="#year-2012" className="no-underline text-info font-bold nav-link-year">2012</a>
                        </div>
                        {/* Sections Row */}
                        <div className="flex flex-wrap justify-center items-center">
                            <a href="#by-topic" className="no-underline text-info font-bold nav-link-section">按主題 By Topic</a>
                            <span className="nav-separator">|</span>
                            <a href="#practice-papers" className="no-underline text-info font-bold nav-link-section">練習卷 Practice Papers</a>
                            <span className="nav-separator">|</span>
                            <a href="#sample-papers" className="no-underline text-info font-bold nav-link-section">模擬試卷 Sample Papers</a>
                        </div>
                    </div>
                    
                    <hr className="my-4" />
                    {/* By Year Section */}
                    <div id="by-year"></div>
                    <PaperSection id="year-2025" title="2025" showAd>
                        <DownloadCard title="Paper 1" description="2025 Paper 1" paperId="2025_P1" />
                        <DownloadCard title="Paper 2" description="2025 Paper 2" paperId="2025_P2" />
                        <DownloadCard title="Answers" description="2025 Answer Booklet (English)" paperId="2025_ans" />
                    </PaperSection>
                    <PaperSection id="year-2024" title="2024" showAd>
                        <DownloadCard title="Paper 1" description="2024 Paper 1" paperId="2024_P1" />
                        <DownloadCard title="Paper 2" description="2024 Paper 2" paperId="2024_P2" />
                        <DownloadCard title="Answers" description="2024 Answer Booklet (English)" paperId="2024_ans" />
                    </PaperSection>
                    <PaperSection id="year-2023" title="2023">
                        <DownloadCard title="卷一" description="2023 Paper 1 (中文)" paperId="2023_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2023 Paper 2 (中文)" paperId="2023_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2023 參考答案 (中文)" paperId="2023_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2023 Paper 1 (English)" paperId="2023_P1" />
                        <DownloadCard title="Paper 2" description="2023 Paper 2 (English)" paperId="2023_P2" />
                        <DownloadCard title="Answers" description="2023 Answer Booklet (English)" paperId="2023_ans" />
                    </PaperSection>
                    <PaperSection id="year-2022" title="2022">
                        <DownloadCard title="卷一" description="2022 Paper 1 (中文)" paperId="2022_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2022 Paper 2 (中文)" paperId="2022_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2022 參考答案 (中文)" paperId="2022_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2022 Paper 1 (English)" paperId="2022_P1" />
                        <DownloadCard title="Paper 2" description="2022 Paper 2 (English)" paperId="2022_P2" />
                        <DownloadCard title="Answers" description="2022 Answer Booklet (English)" paperId="2022_ans" />
                    </PaperSection>
                    <PaperSection id="year-2021" title="2021">
                        <DownloadCard title="卷一" description="2021 Paper 1 (中文)" paperId="2021_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2021 Paper 2 (中文)" paperId="2021_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2021 參考答案 (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2021 Paper 1 (English)" paperId="2021_P1" />
                        <DownloadCard title="Paper 2" description="2021 Paper 2 (English)" paperId="2021_P2" />
                        <DownloadCard title="Answers" description="2021 Answer Booklet (English)" paperId="2021_ans" />
                    </PaperSection>
                    <PaperSection id="year-2020" title="2020">
                        <DownloadCard title="卷一" description="2020 Paper 1 (中文)" paperId="2020_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2020 Paper 2 (中文)" paperId="2020_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2020 參考答案 (中文)" paperId="2020_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2020 Paper 1 (English)" paperId="2020_P1" />
                        <DownloadCard title="Paper 2" description="2020 Paper 2 (English)" paperId="2020_P2" />
                        <DownloadCard title="Answers" description="2020 Answer Booklet (English)" paperId="2020_ans" />
                    </PaperSection>
                    <PaperSection id="year-2019" title="2019">
                        <DownloadCard title="卷一" description="2019 Paper 1 (中文)" paperId="2019_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2019 Paper 2 (中文)" paperId="2019_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2019 參考答案 (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2019 Paper 1 (English)" paperId="2019_P1" />
                        <DownloadCard title="Paper 2" description="2019 Paper 2 (English)" paperId="2019_P2" />
                        <DownloadCard title="Answers" description="2019 Answer Booklet (English)" paperId="2019_ans" />
                    </PaperSection>
                    <PaperSection id="year-2018" title="2018">
                        <DownloadCard title="卷一" description="2018 Paper 1 (中文)" paperId="2018_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2018 Paper 2 (中文)" paperId="2018_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2018 參考答案 (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2018 Paper 1 (English)" paperId="2018_P1" />
                        <DownloadCard title="Paper 2" description="2018 Paper 2 (English)" paperId="2018_P2" />
                        <DownloadCard title="Answers" description="2018 Answer Booklet (English)" paperId="2018_ans" />
                    </PaperSection>
                    <PaperSection id="year-2017" title="2017">
                        <DownloadCard title="卷一" description="2017 Paper 1 (中文)" paperId="2017_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2017 Paper 2 (中文)" paperId="2017_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2017 參考答案 (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2017 Paper 1 (English)" paperId="2017_P1" />
                        <DownloadCard title="Paper 2" description="2017 Paper 2 (English)" paperId="2017_P2" />
                        <DownloadCard title="Answers" description="2017 Answer Booklet (English)" paperId="2017_ans" />
                    </PaperSection>
                    <PaperSection id="year-2016" title="2016">
                        <DownloadCard title="卷一" description="2016 Paper 1 (中文)" paperId="2016_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2016 Paper 2 (中文)" paperId="2016_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2016 參考答案 (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2016 Paper 1 (English)" paperId="2016_P1" />
                        <DownloadCard title="Paper 2" description="2016 Paper 2 (English)" paperId="2016_P2" />
                        <DownloadCard title="Answers" description="2016 Answer Booklet (English)" paperId="2016_ans" />
                    </PaperSection>
                    <PaperSection id="year-2015" title="2015">
                        <DownloadCard title="卷一" description="2015 Paper 1 (中文)" paperId="2015_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2015 Paper 2 (中文)" paperId="2015_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2015 參考答案 (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2015 Paper 1 (English)" paperId="2015_P1" />
                        <DownloadCard title="Paper 2" description="2015 Paper 2 (English)" paperId="2015_P2" />
                        <DownloadCard title="Answers" description="2015 Answer Booklet (English)" paperId="2015_ans" />
                    </PaperSection>
                    <PaperSection id="year-2014" title="2014">
                        <DownloadCard title="卷一" description="2014 Paper 1 (中文)" paperId="2014_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2014 Paper 2 (中文)" paperId="2014_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2014 參考答案 (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2014 Paper 1 (English)" paperId="2014_P1" />
                        <DownloadCard title="Paper 2" description="2014 Paper 2 (English)" paperId="2014_P2" />
                        <DownloadCard title="Answers" description="2014 Answer Booklet (English)" paperId="2014_ans" />
                    </PaperSection>
                    <PaperSection id="year-2013" title="2013">
                        <DownloadCard title="卷一" description="2013 Paper 1 (中文)" paperId="2013_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2013 Paper 2 (中文)" paperId="2013_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2013 參考答案 (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2013 Paper 1 (English)" paperId="2013_P1" />
                        <DownloadCard title="Paper 2" description="2013 Paper 2 (English)" paperId="2013_P2" />
                        <DownloadCard title="Answers" description="2013 Answer Booklet (English)" paperId="2013_ans" />
                    </PaperSection>
                    <PaperSection id="year-2012" title="2012">
                        <DownloadCard title="卷一" description="2012 Paper 1 (中文)" paperId="2012_P1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2012 Paper 2 (中文)" paperId="2012_P2_chi" buttonText="下載" />
                        <DownloadCard title="參考答案" description="2012 參考答案 (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        <DownloadCard title="Paper 1" description="2012 Paper 1 (English)" paperId="2012_P1" />
                        <DownloadCard title="Paper 2" description="2012 Paper 2 (English)" paperId="2012_P2" />
                        <DownloadCard title="Answers" description="2012 Answer Booklet (English)" paperId="2012_ans" />
                    </PaperSection>
                    <PaperSection id="by-topic" title="By Topic (Paper 1)">
                        <DownloadCard title="Topic 1 Estimation" description="Paper 1 Topic 1" paperId="topic_p1_1" />
                        <DownloadCard title="Topic 2 Percentages" description="Paper 1 Topic 2" paperId="topic_p1_2" />
                        <DownloadCard title="Topic 3 Indices and Logarithms" description="Paper 1 Topic 3" paperId="topic_p1_3" />
                        <DownloadCard title="Topic 4 Polynomials" description="Paper 1 Topic 4" paperId="topic_p1_4" />
                        <DownloadCard title="Topic 5 Formulas" description="Paper 1 Topic 5" paperId="topic_p1_5" />
                        <DownloadCard title="Topic 6 Identities, Equations and the Number System" description="Paper 1 Topic 6" paperId="topic_p1_6" />
                        <DownloadCard title="Topic 7 Functions and Graphs" description="Paper 1 Topic 7" paperId="topic_p1_7" />
                        <DownloadCard title="Topic 8 Rate, Ratio and Variation" description="Paper 1 Topic 8" paperId="topic_p1_8" />
                        <DownloadCard title="Topic 9 Arithmetic and Geometric Sequences" description="Paper 1 Topic 9" paperId="topic_p1_9" />
                        <DownloadCard title="Topic 10 Inequalities and Linear Programming" description="Paper 1 Topic 10" paperId="topic_p1_10" />
                        <DownloadCard title="Topic 11 Geometry of Rectilinear Figure" description="Paper 1 Topic 11" paperId="topic_p1_11" />
                        <DownloadCard title="Topic 12 Geometry of Circles" description="Paper 1 Topic 12" paperId="topic_p1_12" />
                        <DownloadCard title="Topic 13 Basic Trigonometry" description="Paper 1 Topic 13" paperId="topic_p1_13" />
                        <DownloadCard title="Topic 14 Applications of Trigonometry" description="Paper 1 Topic 14" paperId="topic_p1_14" />
                        <DownloadCard title="Topic 15 Mensuration" description="Paper 1 Topic 15" paperId="topic_p1_15" />
                        <DownloadCard title="Topic 16 Coordinate Geometry" description="Paper 1 Topic 16" paperId="topic_p1_16" />
                        <DownloadCard title="Topic 17 Counting Principles and Probability" description="Paper 1 Topic 17" paperId="topic_p1_17" />
                        <DownloadCard title="Topic 18 Statistics" description="Paper 1 Topic 18" paperId="topic_p1_18" />
                        <DownloadCard title="Topic 1-18" description="Paper 1 Topic 1-18" paperId="topic_p1_book1" />
                    </PaperSection>
                    <h2 className="text-center">By Topic (Paper 2)</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Topic 0 Number System" description="Paper 2 Topic 0" paperId="topic_p2_0" />
                        <DownloadCard title="Topic 1 Percentages" description="Paper 2 Topic 1" paperId="topic_p2_1" />
                        <DownloadCard title="Topic 2 Functions and Graphs" description="Paper 2 Topic 2" paperId="topic_p2_2" />
                        <DownloadCard title="Topic 3 Exponential and Logarithmic Functions" description="Paper 2 Topic 3" paperId="topic_p2_3" />
                        <DownloadCard title="Topic 4 More about Polynomials" description="Paper 2 Topic 4" paperId="topic_p2_4" />
                        <DownloadCard title="Topic 5 More about Equations" description="Paper 2 Topic 5" paperId="topic_p2_5" />
                        <DownloadCard title="Topic 6 Rate, Ratio and Variations" description="Paper 2 Topic 6" paperId="topic_p2_6" />
                        <DownloadCard title="Topic 7 Sequences" description="Paper 2 Topic 7" paperId="topic_p2_7" />
                        <DownloadCard title="Topic 8 Inequalities and Linear Programming" description="Paper 2 Topic 8" paperId="topic_p2_8" />
                        <DownloadCard title="Topic 9 Mensuration" description="Paper 2 Topic 9" paperId="topic_p2_9" />
                        <DownloadCard title="Topic 10 Plane Geometry" description="Paper 2 Topic 10" paperId="topic_p2_10" />
                        <DownloadCard title="Topic 11 Locus" description="Paper 2 Topic 11" paperId="topic_p2_11" />
                        <DownloadCard title="Topic 12 Coordinates Geometry" description="Paper 2 Topic 12" paperId="topic_p2_12" />
                        <DownloadCard title="Topic 13 Trigonometry" description="Paper 2 Topic 13" paperId="topic_p2_13" />
                        <DownloadCard title="Topic 14 Permutation and Combination" description="Paper 2 Topic 14" paperId="topic_p2_14" />
                        <DownloadCard title="Topic 15 More about Probability" description="Paper 2 Topic 15" paperId="topic_p2_15" />
                        <DownloadCard title="Topic 16 Measures of Dispersion" description="Paper 2 Topic 16" paperId="topic_p2_16" />
                        <DownloadCard title="Topic 0-16 All Answers" description="Paper 2 Topic 1-16" paperId="topic_p2_book1" />
                    </div>
                    <hr className="my-4" />
                    <PaperSection id="practice-papers" title="Practice Paper">
                        <DownloadCard title="練習卷一" description="Practice Paper 1 (中文)" paperId="pp_P1_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二" description="Practice Paper 2 (中文)" paperId="pp_P2_chi" buttonText="下載" />
                        <DownloadCard title="練習卷答案" description="練習卷參考答案 (中文)" paperId="pp_ans_chi" buttonText="下載" />
                        <DownloadCard title="Practice Paper 1" description="Practice Paper 1 (English)" paperId="pp_P1" />
                        <DownloadCard title="Practice Paper 2" description="Practice Paper 2 (English)" paperId="pp_P2" />
                        <DownloadCard title="Practice Paper Answers" description="Practice Paper Answers (English)" paperId="pp_ans" />
                    </PaperSection>
                    <PaperSection id="sample-papers" title="Sample Paper">
                        <DownloadCard title="模擬試卷一" description="模擬試卷一 (中文)" paperId="sp_P1_chi" buttonText="下載" />
                        <DownloadCard title="模擬試卷二" description="模擬試卷二 (中文)" paperId="sp_P2_chi" buttonText="下載" />
                        <DownloadCard title="模擬試卷答案" description="模擬試卷參考答案 (中文)" paperId="sp_ans_chi" buttonText="下載" />
                        <DownloadCard title="Sample Paper 1" description="Sample Paper 1 (English)" paperId="sp_P1" />
                        <DownloadCard title="Sample Paper 2" description="Sample Paper 2 (English)" paperId="sp_P2" />
                        <DownloadCard title="Sample Paper Answers" description="Sample Paper Answers (English)" paperId="sp_ans" />
                    </PaperSection>
                </div>
            </div>
        </>
    )
}
