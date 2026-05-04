import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';

export default function M2Page() {
    const lastUpdated = getSubjectIndexLastUpdated('m2');

    return (
        <>
            <PageSEO
                title="DSE 數學延伸部分 M2 Mathematics Past Paper | By Year + By Topic"
                description="DSE 數學延伸部分單元二 Mathematics Extended Part Module 2 歷屆試題下載 (2012-2025)，包含Paper 1卷一、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握M2代數與微積分進階理論。"
                ogTitle="DSE 數學延伸部分 M2 Mathematics 歷屆試題 Past Papers | 代數與微積分"
                ogDescription="DSE 數學延伸部分單元二 Mathematics Extended Part Module 2 歷屆試題下載 (2012-2025)，包含Paper 1卷一、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握M2代數與微積分進階理論。"
                ogUrl="https://dse.best/m2"
                robots={['index', 'follow']}
              subjectKey="m2"
            {/*breadcrumb*/}
            <PageBreadcrumb section="M2" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">
                        DSE M2 數學延伸單元二 歷屆試題 Past Papers (By year + By topic +
                        Practice Papers + AMaths + PMaths)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE M2
                        數學延伸單元二歷屆試題。在此，您可以找到按年份排列的M2試題、答案及評分準則，以及分類練習和歷史
                        Additional Mathematics及 Pure Mathematics試題，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE M2 Mathematics Extended Part Module 2 past papers.
                        Here you can find M2 papers, answers and marking schemes arranged by
                        year, as well as topic-based exercises and historical Additional
                        Mathematics and Pure Mathematics papers to help you prepare for exams.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    {/* Syllabus Section */}
                    <h2 className="text-center">評核內容 / Syllabus</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="Syllabus" description="Mathematics Module 2 Syllabus" paperId="syll" />
                    </div>
                    <hr className="my-4" />
                    {/* DSE by Year Section */}
                    <h2 className="text-center">DSE By Year</h2>
                    <br />
                    <h2 className="text-center">2025</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2025 Paper" description="2025 DSE Paper" paperId="2025_pp" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2024</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2024 Paper" description="2024 DSE Paper" paperId="2024_pp" />
                        <DownloadCard title="2024 Marking Scheme" description="2024 Marking Scheme" paperId="2024_ans" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2023</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2023 Paper" description="2023 DSE Paper" paperId="2023_pp" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2022</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2022 Paper" description="2022 DSE Paper" paperId="2022_pp" />
                        <DownloadCard title="2022 Marking Scheme" description="2022 Marking Scheme" paperId="2022_ans" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2021</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2021 Paper" description="2021 DSE Paper" paperId="2021_pp" />
                        <DownloadCard title="2021 Marking Scheme" description="2021 Marking Scheme" paperId="2021_ans" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2020</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2020 Paper" description="2020 DSE Paper" paperId="2020_pp" />
                        <DownloadCard title="2020 Marking Scheme" description="2020 Marking Scheme" paperId="2020_ans" />
                        <DownloadCard title="2020 Performance" description="2020 Performance Report" paperId="2020_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2019</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2019 Paper" description="2019 DSE Paper" paperId="2019_pp" />
                        <DownloadCard title="2019 Marking Scheme" description="2019 Marking Scheme" paperId="2019_ans" />
                        <DownloadCard title="2019 Performance" description="2019 Performance Report" paperId="2019_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2018</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2018 Paper" description="2018 DSE Paper" paperId="2018_pp" />
                        <DownloadCard title="2018 Marking Scheme" description="2018 Marking Scheme" paperId="2018_ans" />
                        <DownloadCard title="2018 Performance" description="2018 Performance Report" paperId="2018_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2017</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2017 Paper" description="2017 DSE Paper" paperId="2017_pp" />
                        <DownloadCard title="2017 Marking Scheme" description="2017 Marking Scheme" paperId="2017_ans" />
                        <DownloadCard title="2017 Performance" description="2017 Performance Report" paperId="2017_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2016</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2016 Paper" description="2016 DSE Paper" paperId="2016_pp" />
                        <DownloadCard title="2016 Marking Scheme" description="2016 Marking Scheme" paperId="2016_ans" />
                        <DownloadCard title="2016 Performance" description="2016 Performance Report" paperId="2016_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2015</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2015 Paper" description="2015 DSE Paper" paperId="2015_pp" />
                        <DownloadCard title="2015 Marking Scheme" description="2015 Marking Scheme" paperId="2015_ans" />
                        <DownloadCard title="2015 Performance" description="2015 Performance Report" paperId="2015_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2014</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2014 Paper" description="2014 DSE Paper" paperId="2014_pp" />
                        <DownloadCard title="2014 Marking Scheme" description="2014 Marking Scheme" paperId="2014_ans" />
                        <DownloadCard title="2014 Performance" description="2014 Performance Report" paperId="2014_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2013</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2013 Paper" description="2013 DSE Paper" paperId="2013_pp" />
                        <DownloadCard title="2013 Marking Scheme" description="2013 Marking Scheme" paperId="2013_ans" />
                        <DownloadCard title="2013 Performance" description="2013 Performance Report" paperId="2013_per" />
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-center">2012</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2012 Paper" description="2012 DSE Paper" paperId="2012_pp" />
                        <DownloadCard title="2012 Marking Scheme" description="2012 Marking Scheme" paperId="2012_ans" />
                        <DownloadCard title="2012 Performance" description="2012 Performance Report" paperId="2012_per" />
                    </div>
                    <hr className="my-4" />
                    {/* By Topic Section */}
                    <h2 className="text-center">DSE By Topic</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="Topic 1-13" description="By Topic Book 1" paperId="bytopic_bk1" />
                        <DownloadCard title="Topic 1 Mathematical Induction" description="By Topic 1" paperId="bytopic_1" />
                        <DownloadCard title="Topic 2 Binomial Theorem" description="By Topic 2" paperId="bytopic_2" />
                        <DownloadCard title="Topic 3 More about Trigonometric Functions" description="By Topic 3" paperId="bytopic_3" />
                        <DownloadCard title="Topic 4 Limits and Derivatives" description="By Topic 4" paperId="bytopic_4" />
                        <DownloadCard title="Topic 5 Differentiation" description="By Topic 5" paperId="bytopic_5" />
                        <DownloadCard title="Topic 6 Applications of Differentiation" description="By Topic 6" paperId="bytopic_6" />
                        <DownloadCard title="Topic 7 Indefinite Integrals" description="By Topic 7" paperId="bytopic_7" />
                        <DownloadCard title="Topic 8 Definite Integrals" description="By Topic 8" paperId="bytopic_8" />
                        <DownloadCard title="Topic 9 Applications of Definite Integrals" description="By Topic 9" paperId="bytopic_9" />
                        <DownloadCard title="Topic 10 Matrices and Determinants" description="By Topic 10" paperId="bytopic_10" />
                        <DownloadCard title="Topic 11 System of Linear Equations" description="By Topic 11" paperId="bytopic_11" />
                        <DownloadCard title="Topic 12 Vectors" description="By Topic 12" paperId="bytopic_12" />
                        <DownloadCard title="Topic 13 Product of Vectors" description="By Topic 13" paperId="bytopic_13" />
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers Section */}
                    <h2 className="text-center">Sample Papers 樣本試卷</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="Sample Paper" description="Sample Paper" paperId="sp_pp" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice Papers Section */}
                    <h2 className="text-center">Practice Papers 練習試卷</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="Practice Paper" description="Practice Paper" paperId="pp_pp" />
                        <DownloadCard title="Practice Marking Scheme" description="Practice Marking Scheme" paperId="pp_ans" />
                    </div>
                    <hr className="my-4" />
                    {/* AMaths Section */}
                    <h2 className="text-center">Additional Mathematics</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="2011 Paper" description="2011 Additional Mathematics Paper" paperId="amaths_2011_pp" />
                        <DownloadCard title="2011 Marking Scheme" description="2011 Additional Mathematics Marking Scheme" paperId="amaths_2011_ans" />
                        <DownloadCard title="2009 Paper" description="2009 Additional Mathematics Paper" paperId="amaths_2009_pp" />
                        <DownloadCard title="2009 Marking Scheme" description="2009 Additional Mathematics Marking Scheme" paperId="amaths_2009_ans" />
                        <DownloadCard title="2008 Paper" description="2008 Additional Mathematics Paper" paperId="amaths_2008_pp" />
                        <DownloadCard title="2008 Marking Scheme" description="2008 Additional Mathematics Marking Scheme" paperId="amaths_2008_ans" />
                        <DownloadCard title="2007 Paper" description="2007 Additional Mathematics Paper" paperId="amaths_2007_pp" />
                        <DownloadCard title="2007 Marking Scheme" description="2007 Additional Mathematics Marking Scheme" paperId="amaths_2007_ans" />
                        <DownloadCard title="2006 Paper" description="2006 Additional Mathematics Paper" paperId="amaths_2006_pp" />
                        <DownloadCard title="2006 Marking Scheme" description="2006 Additional Mathematics Marking Scheme" paperId="amaths_2006_ans" />
                        <DownloadCard title="2005 Paper" description="2005 Additional Mathematics Paper" paperId="amaths_2005_pp" />
                        <DownloadCard title="2004 Paper" description="2004 Additional Mathematics Paper" paperId="amaths_2004_pp" />
                        <DownloadCard title="2004 Marking Scheme" description="2004 Additional Mathematics Marking Scheme" paperId="amaths_2004_ans" />
                        <DownloadCard title="2003 Paper" description="2003 Additional Mathematics Paper" paperId="amaths_2003_pp" />
                        <DownloadCard title="2003 Marking Scheme" description="2003 Additional Mathematics Marking Scheme" paperId="amaths_2003_ans" />
                        <DownloadCard title="2002 Paper" description="2002 Additional Mathematics Paper" paperId="amaths_2002_pp" />
                        <DownloadCard title="2002 Marking Scheme" description="2002 Additional Mathematics Marking Scheme" paperId="amaths_2002_ans" />
                        <DownloadCard title="2001 Paper" description="2001 Additional Mathematics Paper" paperId="amaths_2001_pp" />
                        <DownloadCard title="2001 Marking Scheme" description="2001 Additional Mathematics Marking Scheme" paperId="amaths_2001_ans" />
                        <DownloadCard title="2000 Paper 1" description="2000 Additional Mathematics Paper 1" paperId="amaths_2000_p1" />
                        <DownloadCard title="2000 Paper 1 Marking Scheme" description="2000 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_2000_p1ans" />
                        <DownloadCard title="2000 Paper 2" description="2000 Additional Mathematics Paper 2" paperId="amaths_2000_p2" />
                        <DownloadCard title="2000 Paper 2 Marking Scheme" description="2000 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_2000_p2ans" />
                        <DownloadCard title="1999 Paper 1" description="1999 Additional Mathematics Paper 1" paperId="amaths_1999_p1" />
                        <DownloadCard title="1999 Paper 1 Marking Scheme" description="1999 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1999_p1ans" />
                        <DownloadCard title="1999 Paper 2" description="1999 Additional Mathematics Paper 2" paperId="amaths_1999_p2" />
                        <DownloadCard title="1999 Paper 2 Marking Scheme" description="1999 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1999_p2ans" />
                        <DownloadCard title="1998 Paper 1" description="1998 Additional Mathematics Paper 1" paperId="amaths_1998_p1" />
                        <DownloadCard title="1998 Paper 1 Marking Scheme" description="1998 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1998_p1ans" />
                        <DownloadCard title="1998 Paper 2" description="1998 Additional Mathematics Paper 2" paperId="amaths_1998_p2" />
                        <DownloadCard title="1998 Paper 2 Marking Scheme" description="1998 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1998_p2ans" />
                        <DownloadCard title="1997 Paper 1" description="1997 Additional Mathematics Paper 1" paperId="amaths_1997_p1" />
                        <DownloadCard title="1997 Paper 1 Marking Scheme" description="1997 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1997_p1ans" />
                        <DownloadCard title="1997 Paper 2" description="1997 Additional Mathematics Paper 2" paperId="amaths_1997_p2" />
                        <DownloadCard title="1997 Paper 2 Marking Scheme" description="1997 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1997_p2ans" />
                        <DownloadCard title="1996 Paper 1" description="1996 Additional Mathematics Paper 1" paperId="amaths_1996_p1" />
                        <DownloadCard title="1996 Paper 1 Marking Scheme" description="1996 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1996_p1ans" />
                        <DownloadCard title="1996 Paper 2" description="1996 Additional Mathematics Paper 2" paperId="amaths_1996_p2" />
                        <DownloadCard title="1996 Paper 2 Marking Scheme" description="1996 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1996_p2ans" />
                        <DownloadCard title="1995 Paper 1" description="1995 Additional Mathematics Paper 1" paperId="amaths_1995_p1" />
                        <DownloadCard title="1995 Paper 1 Marking Scheme" description="1995 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1995_p1ans" />
                        <DownloadCard title="1995 Paper 2" description="1995 Additional Mathematics Paper 2" paperId="amaths_1995_p2" />
                        <DownloadCard title="1995 Paper 2 Marking Scheme" description="1995 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1995_p2ans" />
                        <DownloadCard title="1994 Paper 1" description="1994 Additional Mathematics Paper 1" paperId="amaths_1994_p1" />
                        <DownloadCard title="1994 Paper 1 Marking Scheme" description="1994 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1994_p1ans" />
                        <DownloadCard title="1994 Paper 2" description="1994 Additional Mathematics Paper 2" paperId="amaths_1994_p2" />
                        <DownloadCard title="1994 Paper 2 Marking Scheme" description="1994 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1994_p2ans" />
                        <DownloadCard title="1993 Paper 1" description="1993 Additional Mathematics Paper 1" paperId="amaths_1993_p1" />
                        <DownloadCard title="1993 Paper 1 Marking Scheme" description="1993 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1993_p1ans" />
                        <DownloadCard title="1993 Paper 2" description="1993 Additional Mathematics Paper 2" paperId="amaths_1993_p2" />
                        <DownloadCard title="1993 Paper 2 Marking Scheme" description="1993 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1993_p2ans" />
                        <DownloadCard title="1992 Paper 1" description="1992 Additional Mathematics Paper 1" paperId="amaths_1992_p1" />
                        <DownloadCard title="1992 Paper 1 Marking Scheme" description="1992 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1992_p1ans" />
                        <DownloadCard title="1992 Paper 2" description="1992 Additional Mathematics Paper 2" paperId="amaths_1992_p2" />
                        <DownloadCard title="1992 Paper 2 Marking Scheme" description="1992 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1992_p2ans" />
                        <DownloadCard title="1991 Paper 1" description="1991 Additional Mathematics Paper 1" paperId="amaths_1991_p1" />
                        <DownloadCard title="1991 Paper 1 Marking Scheme" description="1991 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1991_p1ans" />
                        <DownloadCard title="1991 Paper 2" description="1991 Additional Mathematics Paper 2" paperId="amaths_1991_p2" />
                        <DownloadCard title="1991 Paper 2 Marking Scheme" description="1991 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1991_p2ans" />
                        <DownloadCard title="1990 Paper 1" description="1990 Additional Mathematics Paper 1" paperId="amaths_1990_p1" />
                        <DownloadCard title="1990 Paper 1 Marking Scheme" description="1990 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1990_p1ans" />
                        <DownloadCard title="1990 Paper 2" description="1990 Additional Mathematics Paper 2" paperId="amaths_1990_p2" />
                        <DownloadCard title="1990 Paper 2 Marking Scheme" description="1990 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1990_p2ans" />
                        {/* 1989 */}
                        <DownloadCard title="1989 Paper 1" description="1989 Additional Mathematics Paper 1" paperId="amaths_1989_p1" />
                        <DownloadCard title="1989 Paper 1 Marking Scheme" description="1989 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1989_p1ans" />
                        <DownloadCard title="1989 Paper 2" description="1989 Additional Mathematics Paper 2" paperId="amaths_1989_p2" />
                        <DownloadCard title="1989 Paper 2 Marking Scheme" description="1989 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1989_p2ans" />
                        {/* 1988 */}
                        <DownloadCard title="1988 Paper 1" description="1988 Additional Mathematics Paper 1" paperId="amaths_1988_p1" />
                        <DownloadCard title="1988 Paper 1 Marking Scheme" description="1988 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1988_p1ans" />
                        <DownloadCard title="1988 Paper 2" description="1988 Additional Mathematics Paper 2" paperId="amaths_1988_p2" />
                        <DownloadCard title="1988 Paper 2 Marking Scheme" description="1988 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1988_p2ans" />
                        {/* 1987 */}
                        <DownloadCard title="1987 Paper 1" description="1987 Additional Mathematics Paper 1" paperId="amaths_1987_p1" />
                        <DownloadCard title="1987 Paper 1 Marking Scheme" description="1987 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1987_p1ans" />
                        <DownloadCard title="1987 Paper 2" description="1987 Additional Mathematics Paper 2" paperId="amaths_1987_p2" />
                        <DownloadCard title="1987 Paper 2 Marking Scheme" description="1987 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1987_p2ans" />
                        {/* 1986 */}
                        <DownloadCard title="1986 Paper 1" description="1986 Additional Mathematics Paper 1" paperId="amaths_1986_p1" />
                        <DownloadCard title="1986 Paper 1 Marking Scheme" description="1986 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1986_p1ans" />
                        <DownloadCard title="1986 Paper 2" description="1986 Additional Mathematics Paper 2" paperId="amaths_1986_p2" />
                        <DownloadCard title="1986 Paper 2 Marking Scheme" description="1986 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1986_p2ans" />
                        {/* 1985 */}
                        <DownloadCard title="1985 Paper 1" description="1985 Additional Mathematics Paper 1" paperId="amaths_1985_p1" />
                        <DownloadCard title="1985 Paper 1 Marking Scheme" description="1985 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1985_p1ans" />
                        <DownloadCard title="1985 Paper 2" description="1985 Additional Mathematics Paper 2" paperId="amaths_1985_p2" />
                        <DownloadCard title="1985 Paper 2 Marking Scheme" description="1985 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1985_p2ans" />
                        {/* 1984 */}
                        <DownloadCard title="1984 Paper 1" description="1984 Additional Mathematics Paper 1" paperId="amaths_1984_p1" />
                        <DownloadCard title="1984 Paper 1 Marking Scheme" description="1984 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1984_p1ans" />
                        <DownloadCard title="1984 Paper 2" description="1984 Additional Mathematics Paper 2" paperId="amaths_1984_p2" />
                        <DownloadCard title="1984 Paper 2 Marking Scheme" description="1984 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1984_p2ans" />
                        {/* 1983 */}
                        <DownloadCard title="1983 Paper 1" description="1983 Additional Mathematics Paper 1" paperId="amaths_1983_p1" />
                        <DownloadCard title="1983 Paper 1 Marking Scheme" description="1983 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1983_p1ans" />
                        <DownloadCard title="1983 Paper 2" description="1983 Additional Mathematics Paper 2" paperId="amaths_1983_p2" />
                        <DownloadCard title="1983 Paper 2 Marking Scheme" description="1983 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1983_p2ans" />
                        {/* 1982 */}
                        <DownloadCard title="1982 Paper 1" description="1982 Additional Mathematics Paper 1" paperId="amaths_1982_p1" />
                        <DownloadCard title="1982 Paper 1 Marking Scheme" description="1982 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1982_p1ans" />
                        <DownloadCard title="1982 Paper 2" description="1982 Additional Mathematics Paper 2" paperId="amaths_1982_p2" />
                        <DownloadCard title="1982 Paper 2 Marking Scheme" description="1982 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1982_p2ans" />
                        <DownloadCard title="1981 Paper 1" description="1981 Additional Mathematics Paper 1" paperId="amaths_1981_p1" />
                        <DownloadCard title="1981 Paper 1 Marking Scheme" description="1981 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1981_p1ans" />
                        <DownloadCard title="1981 Paper 2" description="1981 Additional Mathematics Paper 2" paperId="amaths_1981_p2" />
                        <DownloadCard title="1981 Paper 2 Marking Scheme" description="1981 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1981_p2ans" />
                        <DownloadCard title="1980 Paper 1" description="1980 Additional Mathematics Paper 1" paperId="amaths_1980_p1" />
                        <DownloadCard title="1980 Paper 1 Marking Scheme" description="1980 Additional Mathematics Paper 1 Marking Scheme" paperId="amaths_1980_p1ans" />
                        <DownloadCard title="1980 Paper 2" description="1980 Additional Mathematics Paper 2" paperId="amaths_1980_p2" />
                        <DownloadCard title="1980 Paper 2 Marking Scheme" description="1980 Additional Mathematics Paper 2 Marking Scheme" paperId="amaths_1980_p2ans" />
                    </div>
                    <hr className="my-4" />
                    {/* PMaths Section */}
                    <h2 className="text-center">Pure Mathematics</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DownloadCard title="1995 Paper" description="1995 Pure Mathematics Paper" paperId="pmaths_1995" />
                        <DownloadCard title="1995 Marking Scheme" description="1995 Pure Mathematics Marking Scheme" paperId="pmaths_1995_ms" />
                        <DownloadCard title="1994 Paper" description="1994 Pure Mathematics Paper" paperId="pmaths_1994" />
                        <DownloadCard title="1994 Marking Scheme" description="1994 Pure Mathematics Marking Scheme" paperId="pmaths_1994_ms" />
                        <DownloadCard title="1993 Paper" description="1993 Pure Mathematics Paper" paperId="pmaths_1993" />
                        <DownloadCard title="1993 Marking Scheme" description="1993 Pure Mathematics Marking Scheme" paperId="pmaths_1993_ms" />
                        <DownloadCard title="1992 Paper" description="1992 Pure Mathematics Paper" paperId="pmaths_1992" />
                        <DownloadCard title="1992 Marking Scheme" description="1992 Pure Mathematics Marking Scheme" paperId="pmaths_1992_ms" />
                        <DownloadCard title="1991 Paper" description="1991 Pure Mathematics Paper" paperId="pmaths_1991" />
                        <DownloadCard title="1991 Marking Scheme" description="1991 Pure Mathematics Marking Scheme" paperId="pmaths_1991_ms" />
                        <DownloadCard title="1990 Paper" description="1990 Pure Mathematics Paper" paperId="pmaths_1990" />
                        <DownloadCard title="1990 Marking Scheme" description="1990 Pure Mathematics Marking Scheme" paperId="pmaths_1990_ms" />
                        <DownloadCard title="1989 Paper" description="1989 Pure Mathematics Paper" paperId="pmaths_1989" />
                        <DownloadCard title="1989 Marking Scheme" description="1989 Pure Mathematics Marking Scheme" paperId="pmaths_1989_ms" />
                        <DownloadCard title="1988 Paper" description="1988 Pure Mathematics Paper" paperId="pmaths_1988" />
                        <DownloadCard title="1988 Marking Scheme" description="1988 Pure Mathematics Marking Scheme" paperId="pmaths_1988_ms" />
                        <DownloadCard title="1987 Paper" description="1987 Pure Mathematics Paper" paperId="pmaths_1987" />
                        <DownloadCard title="1987 Marking Scheme" description="1987 Pure Mathematics Marking Scheme" paperId="pmaths_1987_ms" />
                        <DownloadCard title="1986 Paper" description="1986 Pure Mathematics Paper" paperId="pmaths_1986" />
                        <DownloadCard title="1986 Marking Scheme" description="1986 Pure Mathematics Marking Scheme" paperId="pmaths_1986_ms" />
                        <DownloadCard title="1985 Paper" description="1985 Pure Mathematics Paper" paperId="pmaths_1985" />
                        <DownloadCard title="1985 Marking Scheme" description="1985 Pure Mathematics Marking Scheme" paperId="pmaths_1985_ms" />
                        <DownloadCard title="1984 Paper" description="1984 Pure Mathematics Paper" paperId="pmaths_1984" />
                        <DownloadCard title="1984 Marking Scheme" description="1984 Pure Mathematics Marking Scheme" paperId="pmaths_1984_ms" />
                        <DownloadCard title="1983 Paper" description="1983 Pure Mathematics Paper" paperId="pmaths_1983" />
                        <DownloadCard title="1983 Marking Scheme" description="1983 Pure Mathematics Marking Scheme" paperId="pmaths_1983_ms" />
                        <DownloadCard title="1982 Paper" description="1982 Pure Mathematics Paper" paperId="pmaths_1982" />
                        <DownloadCard title="1982 Marking Scheme" description="1982 Pure Mathematics Marking Scheme" paperId="pmaths_1982_ms" />
                        <DownloadCard title="1981 Paper" description="1981 Pure Mathematics Paper" paperId="pmaths_1981" />
                        <DownloadCard title="1981 Marking Scheme" description="1981 Pure Mathematics Marking Scheme" paperId="pmaths_1981_ms" />
                        <DownloadCard title="1980 Paper" description="1980 Pure Mathematics Paper" paperId="pmaths_1980" />
                        <DownloadCard title="1980 Marking Scheme" description="1980 Pure Mathematics Marking Scheme" paperId="pmaths_1980_ms" />
                    </div>
                </div>
            </div>
        </>
    )
}
