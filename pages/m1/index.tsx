import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';

export default function M1Page() {
    const lastUpdated = getSubjectIndexLastUpdated('m1');

    return (
        <>
            <PageSEO
                title="DSE 數學延伸部分 M1 Mathematics Past Paper | By Year + By Topic"
                description="DSE 數學延伸部分單元一 Mathematics Extended Part Module 1 歷屆試題下載 (2012-2025)，包含Paper 1卷一、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握M1微積分與統計學進階概念。"
                ogTitle="DSE 數學延伸部分 M1 Mathematics 歷屆試題 Past Papers | 微積分與統計"
                ogDescription="DSE 數學延伸部分單元一 Mathematics Extended Part Module 1 歷屆試題下載 (2012-2025)，包含Paper 1卷一、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握M1微積分與統計學進階概念。"
                ogUrl="https://dse.best/m1"
                robots={['index', 'follow']}
              subjectKey="m1"
            {/*breadcrumb*/}
            <PageBreadcrumb section="M1" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">
                        DSE M1 數學延伸單元一 歷屆試題 Past Papers (By year + By topic +
                        Practice Papers + Mathematics &amp; Statistics)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Module 1
                        數學延伸單元一歷屆試題。在此，您可以找到按年份排列的M1試題、答案及評分準則，以及分類練習和舊制M&amp;S試題，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Mathematics Extended Part Module 1 (M1) past papers. Here you can find comprehensive M1 examination materials including statistics, probability, and calculus topics arranged by year, along with topic-based practice exercises and historical Mathematics & Statistics (M&S) papers to help you excel in DSE M1 examination preparation.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    {/* Syllabus */}
                    <h2 className="text-center">Syllabus</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="M1 Syllabus" description="DSE Mathematics Extended Part Module 1 Syllabus" paperId="syll" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic */}
                    <h2 className="text-center">DSE By Topic</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* BK1 BK2 first */}
                        <DownloadCard title="Book 1 Topic 1-6" description="M1 Book 1 Topic 1-6" paperId="bytopic_bk1" />
                        <DownloadCard title="Book 2 Topic 7-11" description="M1 Book 2 Topic 7-11" paperId="bytopic_bk2" />
                        {/* Numbered topics 1-11 */}
                        <DownloadCard title="Topic 1 Binomial Expansion" description="M1 Topic 1" paperId="bytopic_1" />
                        <DownloadCard title="Topic 2 Exponential and Logarithmic Functions" description="M1 Topic 2" paperId="bytopic_2" />
                        <DownloadCard title="Topic 3 Derivatives and Differentiation of Functions" description="M1 Topic 3" paperId="bytopic_3" />
                        <DownloadCard title="Topic 4 Applications of Differentiation" description="M1 Topic 4" paperId="bytopic_4" />
                        <DownloadCard title="Topic 5 Indefinite Integrals" description="M1 Topic 5" paperId="bytopic_5" />
                        <DownloadCard title="Topic 6 Definite Integrals" description="M1 Topic 6" paperId="bytopic_6" />
                        <DownloadCard title="Topic 7 Further Probability" description="M1 Topic 7" paperId="bytopic_7" />
                        <DownloadCard title="Topic 8 Discrete Random Variables" description="M1 Topic 8" paperId="bytopic_8" />
                        <DownloadCard title="Topic 9 Binomial, Geometric and Poisson Distributions" description="M1 Topic 9" paperId="bytopic_9" />
                        <DownloadCard title="Topic 10 Normal Distribution" description="M1 Topic 10" paperId="bytopic_10" />
                        <DownloadCard title="Topic 11 Point and Interval Estimation" description="M1 Topic 11" paperId="bytopic_11" />
                    </div>
                    <hr className="my-4" />
                    {/* DSE Papers by Year */}
                    <h2 className="text-center">DSE By Year</h2>
                    <br />
                    {/* 2024 */}
                    <h2 className="text-center">2024</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2024 Paper" paperId="2024_pp" />
                    </div>
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 className="text-center">2023</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2023 Paper" paperId="2023_pp" />
                    </div>
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 className="text-center">2022</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2022 Paper" paperId="2022_pp" />
                        <DownloadCard title="Marking Scheme" description="2022 Answer" paperId="2022_ans" />
                    </div>
                    <hr className="my-4" />
                    {/* 2021 */}
                    <h2 className="text-center">2021</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2021 Paper" paperId="2021_pp" />
                        <DownloadCard title="Marking Scheme" description="2021 Answer" paperId="2021_ans" />
                        <DownloadCard title="Performance Report" description="2021 Performance Report" paperId="2021_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <h2 className="text-center">2020</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2020 Paper" paperId="2020_pp" />
                        <DownloadCard title="Marking Scheme" description="2020 Answer" paperId="2020_ans" />
                        <DownloadCard title="Performance Report" description="2020 Performance Report" paperId="2020_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <h2 className="text-center">2019</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2019 Paper" paperId="2019_pp" />
                        <DownloadCard title="Marking Scheme" description="2019 Answer" paperId="2019_ans" />
                        <DownloadCard title="Performance Report" description="2019 Performance Report" paperId="2019_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <h2 className="text-center">2018</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2018 Paper" paperId="2018_pp" />
                        <DownloadCard title="Marking Scheme" description="2018 Answer" paperId="2018_ans" />
                        <DownloadCard title="Performance Report" description="2018 Performance Report" paperId="2018_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <h2 className="text-center">2017</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2017 Paper" paperId="2017_pp" />
                        <DownloadCard title="Marking Scheme" description="2017 Answer" paperId="2017_ans" />
                        <DownloadCard title="Performance Report" description="2017 Performance Report" paperId="2017_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <h2 className="text-center">2016</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2016 Paper" paperId="2016_pp" />
                        <DownloadCard title="Marking Scheme" description="2016 Answer" paperId="2016_ans" />
                        <DownloadCard title="Performance Report" description="2016 Performance Report" paperId="2016_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2015 */}
                    <h2 className="text-center">2015</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2015 Paper" paperId="2015_pp" />
                        <DownloadCard title="Marking Scheme" description="2015 Answer" paperId="2015_ans" />
                        <DownloadCard title="Performance Report" description="2015 Performance Report" paperId="2015_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2014 */}
                    <h2 className="text-center">2014</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2014 Paper" paperId="2014_pp" />
                        <DownloadCard title="Marking Scheme" description="2014 Answer" paperId="2014_ans" />
                        <DownloadCard title="Performance Report" description="2014 Performance Report" paperId="2014_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2013 */}
                    <h2 className="text-center">2013</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2013 Paper" paperId="2013_pp" />
                        <DownloadCard title="Marking Scheme" description="2013 Answer" paperId="2013_ans" />
                        <DownloadCard title="Performance Report" description="2013 Performance Report" paperId="2013_per" />
                    </div>
                    <hr className="my-4" />
                    {/* 2012 */}
                    <h2 className="text-center">2012</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Paper" description="2012 Paper" paperId="2012_pp" />
                        <DownloadCard title="Marking Scheme" description="2012 Answer" paperId="2012_ans" />
                        <DownloadCard title="Performance Report" description="2012 Performance Report" paperId="2012_per" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice Papers */}
                    <h2 className="text-center">練習卷 / Practice Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Practice Paper" description="Practice Paper" paperId="pp_pp" />
                        <DownloadCard title="Practice Paper Marking Scheme" description="Practice Paper Answer" paperId="pp_ans" />
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers */}
                    <h2 className="text-center">樣本試卷 / Sample Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="Sample Paper" description="Sample Paper" paperId="sp_pp" />
                        <DownloadCard title="Sample Paper Marking Scheme" description="Sample Paper Answer" paperId="sp_ans" />
                    </div>
                    <hr className="my-4" />
                    {/* Historical M&S Papers */}
                    <h2 className="text-center">
                        舊制數學及統計學 / Mathematics &amp; Statistics (1996-2013)
                    </h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 2013 */}
                        <DownloadCard title="M&amp;S 2013" description="Mathematics &amp; Statistics 2013" paperId="mands_2013" />
                        <DownloadCard title="M&amp;S 2013 Marking Scheme" description="Mathematics &amp; Statistics 2013 Marking Scheme" paperId="mands_2013_ms" />
                        {/* 2012 */}
                        <DownloadCard title="M&amp;S 2012" description="Mathematics &amp; Statistics 2012" paperId="mands_2012" />
                        <DownloadCard title="M&amp;S 2012 Marking Scheme" description="Mathematics &amp; Statistics 2012 Marking Scheme" paperId="mands_2012_ms" />
                        {/* 2011 */}
                        <DownloadCard title="M&amp;S 2011" description="Mathematics &amp; Statistics 2011" paperId="mands_2011" />
                        <DownloadCard title="M&amp;S 2011 Marking Scheme" description="Mathematics &amp; Statistics 2011 Marking Scheme" paperId="mands_2011_ms" />
                        {/* 2010 */}
                        <DownloadCard title="M&amp;S 2010" description="Mathematics &amp; Statistics 2010" paperId="mands_2010" />
                        <DownloadCard title="M&amp;S 2010 Marking Scheme" description="Mathematics &amp; Statistics 2010 Marking Scheme" paperId="mands_2010_ms" />
                        {/* 2009 */}
                        <DownloadCard title="M&amp;S 2009" description="Mathematics &amp; Statistics 2009" paperId="mands_2009" />
                        <DownloadCard title="M&amp;S 2009 Marking Scheme" description="Mathematics &amp; Statistics 2009 Marking Scheme" paperId="mands_2009_ms" />
                        {/* 2008 */}
                        <DownloadCard title="M&amp;S 2008" description="Mathematics &amp; Statistics 2008" paperId="mands_2008" />
                        <DownloadCard title="M&amp;S 2008 Marking Scheme" description="Mathematics &amp; Statistics 2008 Marking Scheme" paperId="mands_2008_ms" />
                        {/* 2007 */}
                        <DownloadCard title="M&amp;S 2007" description="Mathematics &amp; Statistics 2007" paperId="mands_2007" />
                        <DownloadCard title="M&amp;S 2007 Marking Scheme" description="Mathematics &amp; Statistics 2007 Marking Scheme" paperId="mands_2007_ms" />
                        {/* 2006 */}
                        <DownloadCard title="M&amp;S 2006" description="Mathematics &amp; Statistics 2006" paperId="mands_2006" />
                        <DownloadCard title="M&amp;S 2006 Marking Scheme" description="Mathematics &amp; Statistics 2006 Marking Scheme" paperId="mands_2006_ms" />
                        {/* 2005 */}
                        <DownloadCard title="M&amp;S 2005" description="Mathematics &amp; Statistics 2005" paperId="mands_2005" />
                        <DownloadCard title="M&amp;S 2005 Marking Scheme" description="Mathematics &amp; Statistics 2005 Marking Scheme" paperId="mands_2005_ms" />
                        {/* 2004 */}
                        <DownloadCard title="M&amp;S 2004" description="Mathematics &amp; Statistics 2004" paperId="mands_2004" />
                        <DownloadCard title="M&amp;S 2004 Marking Scheme" description="Mathematics &amp; Statistics 2004 Marking Scheme" paperId="mands_2004_ms" />
                        {/* 2003 */}
                        <DownloadCard title="M&amp;S 2003" description="Mathematics &amp; Statistics 2003" paperId="mands_2003" />
                        <DownloadCard title="M&amp;S 2003 Marking Scheme" description="Mathematics &amp; Statistics 2003 Marking Scheme" paperId="mands_2003_ms" />
                        {/* 2002 */}
                        <DownloadCard title="M&amp;S 2002" description="Mathematics &amp; Statistics 2002" paperId="mands_2002" />
                        <DownloadCard title="M&amp;S 2002 Marking Scheme" description="Mathematics &amp; Statistics 2002 Marking Scheme" paperId="mands_2002_ms" />
                        {/* 2001 */}
                        <DownloadCard title="M&amp;S 2001" description="Mathematics &amp; Statistics 2001" paperId="mands_2001" />
                        <DownloadCard title="M&amp;S 2001 Marking Scheme" description="Mathematics &amp; Statistics 2001 Marking Scheme" paperId="mands_2001_ms" />
                        {/* 2000 */}
                        <DownloadCard title="M&amp;S 2000" description="Mathematics &amp; Statistics 2000" paperId="mands_2000" />
                        <DownloadCard title="M&amp;S 2000 Marking Scheme" description="Mathematics &amp; Statistics 2000 Marking Scheme" paperId="mands_2000_ms" />
                        {/* 1999 */}
                        <DownloadCard title="M&amp;S 1999" description="Mathematics &amp; Statistics 1999" paperId="mands_1999" />
                        <DownloadCard title="M&amp;S 1999 Marking Scheme" description="Mathematics &amp; Statistics 1999 Marking Scheme" paperId="mands_1999_ms" />
                        {/* 1998 */}
                        <DownloadCard title="M&amp;S 1998" description="Mathematics &amp; Statistics 1998" paperId="mands_1998" />
                        <DownloadCard title="M&amp;S 1998 Marking Scheme" description="Mathematics &amp; Statistics 1998 Marking Scheme" paperId="mands_1998_ms" />
                        {/* 1997 */}
                        <DownloadCard title="M&amp;S 1997" description="Mathematics &amp; Statistics 1997" paperId="mands_1997" />
                        <DownloadCard title="M&amp;S 1997 Marking Scheme" description="Mathematics &amp; Statistics 1997 Marking Scheme" paperId="mands_1997_ms" />
                        {/* 1996 */}
                        <DownloadCard title="M&amp;S 1996" description="Mathematics &amp; Statistics 1996" paperId="mands_1996" />
                        <DownloadCard title="M&amp;S 1996 Marking Scheme" description="Mathematics &amp; Statistics 1996 Marking Scheme" paperId="mands_1996_ms" />
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
        </>
    )
}
