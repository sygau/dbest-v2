import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';

export default function ChinesePage() {
    const lastUpdated = getSubjectIndexLastUpdated('chinese');

    return (
        <>
            <PageSEO
              title="DSE 中文 Chinese Past Paper | 閱讀、寫作、聆聽、SBA"
              description="DSE 中國語文科 Chinese Language 歷屆試題下載 (2012-2025)，包含 閱讀、寫作、卷一至卷三、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握中文科考試技巧及語文運用能力。"
              ogTitle="DSE 中文 Chinese 歷屆試題 Past Papers | 中文卷一至五及答案"
              ogDescription="DSE 中國語文科 Chinese Language 歷屆試題下載 (2012-2025)，包含 閱讀、寫作、卷一至卷三、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握中文科考試技巧及語文運用能力。"
              ogUrl="https://dse.best/chinese"
              robots={['index', 'follow']}
              subjectKey="chinese"
            />

            {/*breadcrumb*/}
            <PageBreadcrumb section="中文" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">DSE 中文 歷屆試題 Past Papers</h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE中文歷屆試題。
                        在此，您可以找到按年份排列的試題及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Chinese Language past papers. Here you can find Chinese Language examination papers, answers, and marking schemes arranged by year, including reading comprehension, writing, listening, and speaking components to help you prepare for the DSE Chinese Language examination effectively.
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
                            <a href="#sample-papers" className="no-underline text-info font-bold nav-link-section">模擬試卷</a>
                            <span className="nav-separator">|</span>
                            <a href="#practice-papers" className="no-underline text-info font-bold nav-link-section">練習試卷</a>
                        </div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    {/* Year-wise Past Paper Listing */}
                    <PaperSection id="sample-papers" title="模擬試卷">
                        <DownloadCard title="卷一 閱讀" description="Sample Paper 1" paperId="sp_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="Sample Paper 2" paperId="sp_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="Sample Paper 3" paperId="sp_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="Sample Paper 4" paperId="sp_P4" buttonText="下載" />
                        <DownloadCard title="卷五" description="Sample Paper 5" paperId="sp_P5" buttonText="下載" />
                        <DownloadCard title="答案" description="Sample Paper Answers" paperId="sp_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="practice-papers" title="練習試卷">
                        <DownloadCard title="卷一 閱讀" description="Practice Paper 1" paperId="pp_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="Practice Paper 2" paperId="pp_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="Practice Paper 3" paperId="pp_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="Practice Paper 4" paperId="pp_P4" buttonText="下載" />
                        <DownloadCard title="卷五" description="Practice Paper 5" paperId="pp_P5" buttonText="下載" />
                        <DownloadCard title="答案" description="Practice Paper Answers" paperId="pp_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2025" title="2025">
                        <DownloadCard title="卷一 閱讀" description="2025 試卷一" paperId="2025_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2025 試卷二" paperId="2025_P2" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2024" title="2024">
                        <DownloadCard title="卷一 閱讀" description="2024 Paper 1" paperId="2024_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2024 Paper 2" paperId="2024_P2" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2023" title="2023">
                        <DownloadCard title="卷一 閱讀" description="2023 Paper 1" paperId="2023_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2023 Paper 2" paperId="2023_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2023 Paper 3" paperId="2023_P3" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2023 Marking Scheme" paperId="2023_pe_r" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2022" title="2022">
                        <DownloadCard title="卷一 閱讀" description="2022 Paper 1" paperId="2022_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2022 Paper 2" paperId="2022_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2022 Paper 3" paperId="2022_P3" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2022 Marking Scheme" paperId="2022_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2022 Answer Booklet" paperId="2022_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2021" title="2021">
                        <DownloadCard title="卷一 閱讀" description="2021 Paper 1" paperId="2021_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2021 Paper 2" paperId="2021_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2021 Paper 3" paperId="2021_P3" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2021 Marking Scheme" paperId="2021_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2021 Answer Booklet" paperId="2021_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2020" title="2020">
                        <DownloadCard title="卷一 閱讀" description="2020 Paper 1" paperId="2020_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2020 Paper 2" paperId="2020_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2020 Paper 3" paperId="2020_P3" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2020 Marking Scheme" paperId="2020_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2020 Answer Booklet" paperId="2020_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2019" title="2019">
                        <DownloadCard title="卷一 閱讀" description="2019 Paper 1" paperId="2019_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2019 Paper 2" paperId="2019_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2019 Paper 3" paperId="2019_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2019 Paper 4" paperId="2019_P4" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2019 Marking Scheme" paperId="2019_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2019 Answer Booklet" paperId="2019_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2018" title="2018">
                        <DownloadCard title="卷一 閱讀" description="2018 Paper 1" paperId="2018_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2018 Paper 2" paperId="2018_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2018 Paper 3" paperId="2018_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2018 Paper 4" paperId="2018_P4" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2018 Marking Scheme" paperId="2018_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2018 Answer Booklet" paperId="2018_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2017" title="2017">
                        <DownloadCard title="卷一 閱讀" description="2017 Paper 1" paperId="2017_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2017 Paper 2" paperId="2017_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2017 Paper 3" paperId="2017_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2017 Paper 4" paperId="2017_P4" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2017 Marking Scheme" paperId="2017_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2017 Answer Booklet" paperId="2017_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2016" title="2016">
                        <DownloadCard title="卷一 閱讀" description="2016 Paper 1" paperId="2016_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2016 Paper 2" paperId="2016_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2016 Paper 3" paperId="2016_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2016 Paper 4" paperId="2016_P4" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2016 Marking Scheme" paperId="2016_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2016 Answer Booklet" paperId="2016_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2015" title="2015">
                        <DownloadCard title="卷一 閱讀" description="2015 Paper 1" paperId="2015_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2015 Paper 2" paperId="2015_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2015 Paper 3" paperId="2015_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2015 Paper 4" paperId="2015_P4" buttonText="下載" />
                        <DownloadCard title="卷五" description="2015 Paper 5" paperId="2015_P5" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2015 Marking Scheme" paperId="2015_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2015 Answer Booklet" paperId="2015_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2014" title="2014">
                        <DownloadCard title="卷一 閱讀" description="2014 Paper 1" paperId="2014_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2014 Paper 2" paperId="2014_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2014 Paper 3" paperId="2014_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2014 Paper 4" paperId="2014_P4" buttonText="下載" />
                        <DownloadCard title="卷五" description="2014 Paper 5" paperId="2014_P5" buttonText="下載" />
                        <DownloadCard title="評分參考" description="2014 Marking Scheme" paperId="2014_pe_r" buttonText="下載" />
                        <DownloadCard title="答案" description="2014 Answer Booklet" paperId="2014_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2013" title="2013">
                        <DownloadCard title="卷一 閱讀" description="2013 Paper 1" paperId="2013_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2013 Paper 2" paperId="2013_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2013 Paper 3" paperId="2013_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2013 Paper 4" paperId="2013_P4" buttonText="下載" />
                        <DownloadCard title="卷五" description="2013 Paper 5" paperId="2013_P5" buttonText="下載" />
                        <DownloadCard title="答案" description="2013 Answer Booklet" paperId="2013_ans" buttonText="下載" />
                    </PaperSection>
                    <PaperSection id="year-2012" title="2012">
                        <DownloadCard title="卷一 閱讀" description="2012 Paper 1" paperId="2012_P1" buttonText="下載" />
                        <DownloadCard title="卷二 寫作" description="2012 Paper 2" paperId="2012_P2" buttonText="下載" />
                        <DownloadCard title="卷三 聆聽" description="2012 Paper 3" paperId="2012_P3" buttonText="下載" />
                        <DownloadCard title="卷四 說話" description="2012 Paper 4" paperId="2012_P4" buttonText="下載" />
                        <DownloadCard title="卷五" description="2012 Paper 5" paperId="2012_P5" buttonText="下載" />
                        <DownloadCard title="答案" description="2012 Answer Booklet" paperId="2012_ans" buttonText="下載" />
                    </PaperSection>
                </div>
            </div>
        </>
    )
}
