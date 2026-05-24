import { LuCalculator, LuBookmark, LuExternalLink } from 'react-icons/lu';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import FAQSection from '../../components/FAQSection';

const jupasFAQs = [
  {
    id: 'faq1',
    question: 'JUPAS 計算機點計我嘅入學機會？',
    answer: '我哋會將你嘅 DSE 成績，按每間大學嘅官方計分公式換算成分數，再同該課程過去三年（2023–2025）嘅收生分數比較，分成「大機會 / 博得過 / 邊緣 / 機率低 / 唔達標」五個等級。',
  },
  {
    id: 'faq2',
    question: '點解唔同大學算出嚟嘅分數唔一樣？',
    answer: 'JUPAS 並冇單一計分制。HKU、CUHK、HKUST、CityU、PolyU 用「增強尺」（5** = 8.5 分），HKBU、EdUHK、嶺大、都大用「標準尺」（5** = 7 分）；加上每間大學嘅 Best N、科目權重、第六科加分機制都唔同，所以同一份成績喺唔同課程會得出唔同分數。',
  },
  {
    id: 'faq3',
    question: '計算機嘅結果準唔準？可唔可以直接照用？',
    answer: '計算機已盡量還原各院校嘅官方計分機制，但歷年收生分數會受報考人數、課程改動等因素影響。結果只供參考，落實揀科前請務必到 JUPAS 同各院校官方網頁查證最新課程要求同計分公式。',
  },
  {
    id: 'faq4',
    question: '咩係彈性收生（Flexible Admissions）？',
    answer: '若你只差一科、一個等級未達課程最低要求，部分大學容許「彈性收生」破格考慮。計算機會自動套用各校嘅彈性收生規則，並喺合資格嘅課程標示「彈性收生」。',
  },
];

const officialCalculators = [
  ['HKU', 'https://admissions.hku.hk/apply/jupas/score-calculator'],
  ['CUHK', 'https://admission.cuhk.edu.hk/application/jupas/programme-specific-requirements-and-score-calculator/'],
  ['HKUST', 'https://join.hkust.edu.hk/admissions/jupas'],
  ['PolyU', 'https://www.polyu.edu.hk/study/ug/admissions/jupas/jupas-score-calculator'],
  ['CityU', 'https://www.cityu.edu.hk/admo/admissions/jupas-admission'],
  ['HKBU', 'https://iss.hkbu.edu.hk/ams_jpscal/'],
  ['EdUHK', 'https://pappl.eduhk.hk/score-calculator/'],
  ['LingU', 'https://www.ln.edu.hk/admissions/ug/page/detail/114'],
  ['HKMU', 'https://admissions.hkmu.edu.hk/ug/jupas/'],
] as const;

export default function JupasIndex() {
  return (
    <>
      <PageSEO
        title="JUPAS 入學計算機 — DSE 成績即時配對 381 課程 | dse.best"
        description="輸入 DSE 成績，即時計算 381 個 JUPAS 課程嘅入學機會。自動套用各院校計分公式、增強／標準換算尺、第六科加分同彈性收生規則，附 2023–2025 歷年收生分數。"
        ogTitle="JUPAS 入學計算機 | dse.best"
        ogDescription="輸入 DSE 成績，即時計算 381 個 JUPAS 課程嘅入學機會，附歷年收生分數。"
        ogUrl="https://dse.best/jupas"
        canonical="https://dse.best/jupas"
        robots={['index', 'follow']}
        pageKey="jupas"
      />

      <PageBreadcrumb section="升學" text="JUPAS" />

      {/* Hero */}
      <div className="bg-[var(--color-card-bg)] rounded-2xl px-6 sm:px-9 py-8 mb-6 shadow-sm border border-[var(--color-border)]">
        <h1 className="font-bold mb-3 text-[var(--color-heading)]" style={{ fontSize: 'clamp(1.9rem, 6vw, 2.6rem)' }}>
          JUPAS 入學計算機
        </h1>
        <p className="text-[var(--color-body)] mb-6 max-w-2xl" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
          輸入你嘅 DSE 成績，即時計算 381 個 JUPAS 課程嘅 2026/27 學年入學機會。
          工具自動套用各院校計分公式、科目權重、第六科加分同彈性收生機制，並對照 2023–2025 歷年收生分數。
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/jupas/calculator"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-white no-underline"
            style={{ background: '#9E1B32', fontSize: '1.05rem' }}
          >
            <LuCalculator size={20} aria-hidden />
            開始計算入學機會
          </a>
          <a
            href="/jupas/bookmarks"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold no-underline border border-[var(--color-border)] text-[var(--color-emphasis)]"
          >
            <LuBookmark size={18} aria-hidden />
            我的收藏
          </a>
        </div>
      </div>

      {/* How scoring works — SEO content */}
      <div className="bg-[var(--color-card-bg)] rounded-2xl px-6 sm:px-9 py-7 mb-6 shadow-sm border border-[var(--color-border)]">
        <h2 className="font-bold mb-4 text-[var(--color-heading)]" style={{ fontSize: '1.5rem' }}>
          JUPAS 計分機制點運作？
        </h2>
        <div className="text-[var(--color-body)]" style={{ lineHeight: 1.75 }}>
          <p className="mb-4">
            JUPAS 並冇一套統一嘅計分制度。每間大學、甚至每個課程，都有自己嘅一套計分邏輯。
            想準確評估入學機會，就要理解以下幾個關鍵機制。
          </p>

          <h3 className="font-bold mt-5 mb-2 text-[var(--color-heading)]" style={{ fontSize: '1.12rem' }}>
            1. 兩套成績換算尺
          </h3>
          <p className="mb-4">
            DSE 等級換算成分數有兩套標準。「增強尺」將 5** 算 8.5 分，用於 HKU、CUHK、HKUST、CityU、PolyU；
            「標準尺」將 5** 算 7 分，用於 HKBU、EdUHK、嶺南大學同都會大學。同一份 5** 成績，喺增強尺會明顯高分，
            令尖子之間嘅差距拉得更開。
          </p>

          <h3 className="font-bold mt-5 mb-2 text-[var(--color-heading)]" style={{ fontSize: '1.12rem' }}>
            2. Best N 同科目權重
          </h3>
          <p className="mb-4">
            大部分課程只計你最好嘅 5 科（Best 5），部分計 Best 6。每科仲會有唔同權重 ——
            例如工程系英文、數學權重較高，文學院則睇重相關選修科。理大等院校仲設有「第六科加分」，
            令選修多一科有額外優勢。
          </p>

          <h3 className="font-bold mt-5 mb-2 text-[var(--color-heading)]" style={{ fontSize: '1.12rem' }}>
            3. 五級入學機會
          </h3>
          <p className="mb-4">
            計算機會將你嘅分數對照課程歷年收生分佈，分成五個等級：分數高過上四分位數（UQ）為「大機會」、
            高過中位數為「博得過」、高過下四分位數（LQ）為「邊緣」、略低於 LQ 為「機率低」、再低就「唔達標」。
          </p>

          <h3 className="font-bold mt-5 mb-2 text-[var(--color-heading)]" style={{ fontSize: '1.12rem' }}>
            4. 彈性收生
          </h3>
          <p>
            若你只差一科一個等級未達標，部分大學設有「彈性收生」破格考慮機制。計算機會自動判斷你是否合資格，
            並喺相關課程標示出嚟。
          </p>
        </div>
      </div>

      {/* Official calculators */}
      <div className="bg-[var(--color-card-bg)] rounded-2xl px-6 sm:px-9 py-7 mb-6 shadow-sm border border-[var(--color-border)]">
        <h2 className="font-bold mb-2 text-[var(--color-heading)]" style={{ fontSize: '1.5rem' }}>
          各院校官方計算機
        </h2>
        <p className="text-[var(--color-body)] mb-4" style={{ lineHeight: 1.7 }}>
          本工具結果僅供參考。落實揀科前，請務必到各院校官方計算機查證最新課程要求同計分公式。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {officialCalculators.map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 no-underline border border-[var(--color-border)] text-[var(--color-emphasis)] font-medium"
            >
              <LuExternalLink size={14} aria-hidden />
              {name} 官方計算機
            </a>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <FAQSection faqs={jupasFAQs} />
    </>
  );
}
