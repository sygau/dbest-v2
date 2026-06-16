import { getSubjectIndexLastUpdated } from '../../utils/lastUpdated';
import LastUpdatedAlert from '../../components/LastUpdatedAlert';
import DownloadCard, { PaperSection } from '../../components/DownloadCard';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import SubjectSectionAd from '../../components/SubjectSectionAd';

export default function GeographyPage() {
    const lastUpdated = getSubjectIndexLastUpdated('geography');

    return (
        <>
            <PageSEO
                title="DSE 地理 Geography Past Paper | By Topic + By Year"
                description="DSE 地理科 Geography 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握Geography地圖技能及實地考察技巧。"
                ogTitle="DSE 地理 Geography 歷屆試題 Past Papers | By Topic + By Year"
                ogDescription="DSE 地理科 Geography 歷屆試題下載 (2012-2025)，包含Paper 1 Paper 2卷一卷二、Answers/Marking Scheme 答案。提供完整試卷下載，全面掌握Geography地圖技能及實地考察技巧。"
                ogUrl="https://dse.best/geography"
                robots={['index', 'follow']}
                subjectKey="geography"
            />
            {/*breadcrumb*/}
            <PageBreadcrumb section="地理" text="DSE Past Paper" />
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto" }}>
                <div className="card-body">
                    <h1 className="mb-4">
                        DSE 地理 歷屆試題 Past Papers (By year + Practice Papers)
                    </h1>
                    <p className="mb-4">
                        歡迎瀏覽DSE Geography 地理歷屆試題。
                        在此，您可以找到按年份排列的試題、地圖冊及答案，助您備考。
                        <br />
                        <br />
                        Welcome to browse DSE Geography past papers. Here you can find comprehensive Geography examination materials including physical geography, human geography, regional geography, and geographical skills topics arranged by year, along with atlas materials, fieldwork exercises, data analysis questions, and detailed marking schemes to help you understand DSE Geography concepts and prepare effectively for your examination.
                    </p>
                    <LastUpdatedAlert date={lastUpdated} />
                    <br />
                    <hr className="my-4" />
                    <br />
                    {/* Syllabus */}
                    <h2 className="text-center">評核內容 / Syllabus</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DownloadCard title="中文 評核內容" description="DSE地理 評核內容 (中文)" paperId="syllabus_chi" buttonText="下載" />
                        <DownloadCard title="English Syllabus" description="DSE Geography Syllabus (English)" paperId="syllabus_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2025 */}
                    <h2 className="text-center">2025</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2025 Paper 1 (中文)" paperId="2025_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2025 Paper 2 (中文)" paperId="2025_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2025 Map Book (中文)" paperId="2025_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2025 Marking Scheme (中文)" paperId="2025_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2025 Performance (中文)" paperId="2025_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2025 Paper 1 (English)" paperId="2025_p1_eng" />
                        <DownloadCard title="Paper 2" description="2025 Paper 2 (English)" paperId="2025_p2_eng" />
                        <DownloadCard title="Map Book" description="2025 Map Book (English)" paperId="2025_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2025 Marking Scheme (English)" paperId="2025_ans_eng" />
                        <DownloadCard title="Performance" description="2025 Performance (English)" paperId="2025_per_eng" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    {/* 2024 */}
                    <h2 className="text-center">2024</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2024 Paper 1 (中文)" paperId="2024_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2024 Paper 2 (中文)" paperId="2024_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2024 Map Book (中文)" paperId="2024_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2024 Marking Scheme (中文)" paperId="2024_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2024 Performance (中文)" paperId="2024_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2024 Paper 1 (English)" paperId="2024_p1_eng" />
                        <DownloadCard title="Paper 2" description="2024 Paper 2 (English)" paperId="2024_p2_eng" />
                        <DownloadCard title="Map Book" description="2024 Map Book (English)" paperId="2024_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2024 Marking Scheme (English)" paperId="2024_ans_eng" />
                        <DownloadCard title="Performance" description="2024 Performance (English)" paperId="2024_per_eng" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    {/* 2023 */}
                    <h2 className="text-center">2023</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2023 Paper 1 (中文)" paperId="2023_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2023 Paper 2 (中文)" paperId="2023_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2023 Map Book (中文)" paperId="2023_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2023 Marking Scheme (中文)" paperId="2023_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2023 Performance (中文)" paperId="2023_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2023 Paper 1 (English)" paperId="2023_p1_eng" />
                        <DownloadCard title="Paper 2" description="2023 Paper 2 (English)" paperId="2023_p2_eng" />
                        <DownloadCard title="Map Book" description="2023 Map Book (English)" paperId="2023_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2023 Marking Scheme (English)" paperId="2023_ans_eng" />
                        <DownloadCard title="Performance" description="2023 Performance (English)" paperId="2023_per_eng" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    {/* 2022 */}
                    <h2 className="text-center">2022</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2022 Paper 1 (中文)" paperId="2022_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2022 Paper 2 (中文)" paperId="2022_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2022 Map Book (中文)" paperId="2022_map_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2022 Paper 1 (English)" paperId="2022_p1_eng" />
                        <DownloadCard title="Paper 2" description="2022 Paper 2 (English)" paperId="2022_p2_eng" />
                        <DownloadCard title="Map Book" description="2022 Map Book (English)" paperId="2022_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2022 Marking Scheme (English)" paperId="2022_ans_eng" />
                    </div>
                    <SubjectSectionAd />
                    <hr className="my-4" />
                    {/* 2021 */}
                    <h2 className="text-center">2021</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2021 Paper 1 (中文)" paperId="2021_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2021 Paper 2 (中文)" paperId="2021_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2021 Map Book (中文)" paperId="2021_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2021 Marking Scheme (中文)" paperId="2021_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2021 Performance (中文)" paperId="2021_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2021 Paper 1 (English)" paperId="2021_p1_eng" />
                        <DownloadCard title="Paper 2" description="2021 Paper 2 (English)" paperId="2021_p2_eng" />
                        <DownloadCard title="Map Book" description="2021 Map Book (English)" paperId="2021_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2021 Marking Scheme (English)" paperId="2021_ans_eng" />
                        <DownloadCard title="Performance" description="2021 Performance (English)" paperId="2021_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2020 */}
                    <h2 className="text-center">2020</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2020 Paper 1 (中文)" paperId="2020_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2020 Paper 2 (中文)" paperId="2020_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2020 Map Book (中文)" paperId="2020_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2020 Marking Scheme (中文)" paperId="2020_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2020 Performance (中文)" paperId="2020_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2020 Paper 1 (English)" paperId="2020_p1_eng" />
                        <DownloadCard title="Paper 2" description="2020 Paper 2 (English)" paperId="2020_p2_eng" />
                        <DownloadCard title="Map Book" description="2020 Map Book (English)" paperId="2020_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2020 Marking Scheme (English)" paperId="2020_ans_eng" />
                        <DownloadCard title="Performance" description="2020 Performance (English)" paperId="2020_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2019 */}
                    <h2 className="text-center">2019</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2019 Paper 1 (中文)" paperId="2019_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2019 Paper 2 (中文)" paperId="2019_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2019 Map Book (中文)" paperId="2019_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2019 Marking Scheme (中文)" paperId="2019_ans_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2019 Paper 1 (English)" paperId="2019_p1_eng" />
                        <DownloadCard title="Paper 2" description="2019 Paper 2 (English)" paperId="2019_p2_eng" />
                        <DownloadCard title="Map Book" description="2019 Map Book (English)" paperId="2019_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2019 Marking Scheme (English)" paperId="2019_ans_eng" />
                        <DownloadCard title="Performance" description="2019 Performance (English)" paperId="2019_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2018 */}
                    <h2 className="text-center">2018</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2018 Paper 1 (中文)" paperId="2018_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2018 Paper 2 (中文)" paperId="2018_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2018 Map Book (中文)" paperId="2018_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2018 Marking Scheme (中文)" paperId="2018_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2018 Performance (中文)" paperId="2018_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2018 Paper 1 (English)" paperId="2018_p1_eng" />
                        <DownloadCard title="Paper 2" description="2018 Paper 2 (English)" paperId="2018_p2_eng" />
                        <DownloadCard title="Map Book" description="2018 Map Book (English)" paperId="2018_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2018 Marking Scheme (English)" paperId="2018_ans_eng" />
                        <DownloadCard title="Performance" description="2018 Performance (English)" paperId="2018_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2017 */}
                    <h2 className="text-center">2017</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2017 Paper 1 (中文)" paperId="2017_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2017 Paper 2 (中文)" paperId="2017_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2017 Map Book (中文)" paperId="2017_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2017 Marking Scheme (中文)" paperId="2017_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2017 Performance (中文)" paperId="2017_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2017 Paper 1 (English)" paperId="2017_p1_eng" />
                        <DownloadCard title="Paper 2" description="2017 Paper 2 (English)" paperId="2017_p2_eng" />
                        <DownloadCard title="Map Book" description="2017 Map Book (English)" paperId="2017_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2017 Marking Scheme (English)" paperId="2017_ans_eng" />
                        <DownloadCard title="Performance" description="2017 Performance (English)" paperId="2017_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Practice & Sample Papers */}
                    <h2 className="text-center">練習卷 / Practice Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Practice Papers */}
                        <DownloadCard title="練習卷一" description="Practice Paper 1 (中文)" paperId="pp_p1_chi" buttonText="下載" />
                        <DownloadCard title="練習卷二" description="Practice Paper 2 (中文)" paperId="pp_p2_chi" buttonText="下載" />
                        <DownloadCard title="練習卷答案" description="Practice Paper Marking Scheme (中文)" paperId="pp_ans_chi" buttonText="下載" />
                        <DownloadCard title="練習卷表現評述" description="Practice Paper Performance (中文)" paperId="pp_per_chi" buttonText="下載" />
                        {/* English Practice Papers */}
                        <DownloadCard title="Practice Paper 1" description="Practice Paper 1 (English)" paperId="pp_p1_eng" />
                        <DownloadCard title="Practice Paper 2" description="Practice Paper 2 (English)" paperId="pp_p2_eng" />
                        <DownloadCard title="Practice Paper Marking Scheme" description="Practice Paper Marking Scheme (English)" paperId="pp_ans_eng" />
                        <DownloadCard title="Practice Paper Performance" description="Practice Paper Performance (English)" paperId="pp_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* Sample Papers */}
                    <h2 className="text-center">樣本試卷 / Sample Papers</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Sample Papers */}
                        <DownloadCard title="樣本試卷一" description="Sample Paper 1 (中文)" paperId="sp_p1_chi" buttonText="下載" />
                        <DownloadCard title="樣本試卷二" description="Sample Paper 2 (中文)" paperId="sp_p2_chi" buttonText="下載" />
                        {/* English Sample Papers */}
                        <DownloadCard title="Sample Paper 1" description="Sample Paper 1 (English)" paperId="sp_p1_eng" />
                        <DownloadCard title="Sample Paper 2" description="Sample Paper 2 (English)" paperId="sp_p2_eng" />
                        <DownloadCard title="Sample Paper Marking Scheme" description="Sample Paper Marking Scheme (English)" paperId="sp_ans_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2016 */}
                    <h2 className="text-center">2016</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2016 Paper 1 (中文)" paperId="2016_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2016 Paper 2 (中文)" paperId="2016_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2016 Map Book (中文)" paperId="2016_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2016 Marking Scheme (中文)" paperId="2016_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2016 Performance (中文)" paperId="2016_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2016 Paper 1 (English)" paperId="2016_p1_eng" />
                        <DownloadCard title="Paper 2" description="2016 Paper 2 (English)" paperId="2016_p2_eng" />
                        <DownloadCard title="Map Book" description="2016 Map Book (English)" paperId="2016_map_eng" />
                        <DownloadCard title="Performance" description="2016 Performance (English)" paperId="2016_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2015 */}
                    <h2 className="text-center">2015</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2015 Paper 1 (中文)" paperId="2015_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2015 Paper 2 (中文)" paperId="2015_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2015 Map Book (中文)" paperId="2015_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2015 Marking Scheme (中文)" paperId="2015_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2015 Performance (中文)" paperId="2015_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2015 Paper 1 (English)" paperId="2015_p1_eng" />
                        <DownloadCard title="Paper 2" description="2015 Paper 2 (English)" paperId="2015_p2_eng" />
                        <DownloadCard title="Map Book" description="2015 Map Book (English)" paperId="2015_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2015 Marking Scheme (English)" paperId="2015_ans_eng" />
                        <DownloadCard title="Performance" description="2015 Performance (English)" paperId="2015_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2014 */}
                    <h2 className="text-center">2014</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2014 Paper 1 (中文)" paperId="2014_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2014 Paper 2 (中文)" paperId="2014_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2014 Map Book (中文)" paperId="2014_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2014 Marking Scheme (中文)" paperId="2014_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2014 Performance (中文)" paperId="2014_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2014 Paper 1 (English)" paperId="2014_p1_eng" />
                        <DownloadCard title="Paper 2" description="2014 Paper 2 (English)" paperId="2014_p2_eng" />
                        <DownloadCard title="Map Book" description="2014 Map Book (English)" paperId="2014_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2014 Marking Scheme (English)" paperId="2014_ans_eng" />
                        <DownloadCard title="Performance" description="2014 Performance (English)" paperId="2014_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2013 */}
                    <h2 className="text-center">2013</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2013 Paper 1 (中文)" paperId="2013_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2013 Paper 2 (中文)" paperId="2013_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2013 Map Book (中文)" paperId="2013_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2013 Marking Scheme (中文)" paperId="2013_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2013 Performance (中文)" paperId="2013_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2013 Paper 1 (English)" paperId="2013_p1_eng" />
                        <DownloadCard title="Paper 2" description="2013 Paper 2 (English)" paperId="2013_p2_eng" />
                        <DownloadCard title="Map Book" description="2013 Map Book (English)" paperId="2013_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2013 Marking Scheme (English)" paperId="2013_ans_eng" />
                        <DownloadCard title="Performance" description="2013 Performance (English)" paperId="2013_per_eng" />
                    </div>
                    <hr className="my-4" />
                    {/* 2012 */}
                    <h2 className="text-center">2012</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Chinese Papers */}
                        <DownloadCard title="卷一" description="2012 Paper 1 (中文)" paperId="2012_p1_chi" buttonText="下載" />
                        <DownloadCard title="卷二" description="2012 Paper 2 (中文)" paperId="2012_p2_chi" buttonText="下載" />
                        <DownloadCard title="地圖冊" description="2012 Map Book (中文)" paperId="2012_map_chi" buttonText="下載" />
                        <DownloadCard title="答案" description="2012 Marking Scheme (中文)" paperId="2012_ans_chi" buttonText="下載" />
                        <DownloadCard title="表現評述" description="2012 Performance (中文)" paperId="2012_per_chi" buttonText="下載" />
                        {/* English Papers */}
                        <DownloadCard title="Paper 1" description="2012 Paper 1 (English)" paperId="2012_p1_eng" />
                        <DownloadCard title="Paper 2" description="2012 Paper 2 (English)" paperId="2012_p2_eng" />
                        <DownloadCard title="Map Book" description="2012 Map Book (English)" paperId="2012_map_eng" />
                        <DownloadCard title="Marking Scheme" description="2012 Marking Scheme (English)" paperId="2012_ans_eng" />
                        <DownloadCard title="Performance" description="2012 Performance (English)" paperId="2012_per_eng" />
                    </div>
                    <hr className="my-4" />
                </div>
            </div>
        </>
    )
}
