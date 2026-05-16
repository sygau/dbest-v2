// Design iteration sandbox. After V1 refactor this file imports the same
// shared parts the production calculator uses, so any visual change shows up
// in both places. Real data flow lives in /jupas/calculator.

import PageSEO from '../../components/PageSEO';
import JupasStyles from '../../components/jupas/styles';
import {
  JupasCard, MechanismInfo, SortToggle, SearchLoading, NoResults,
  ProbLegend, UniPalette,
  type JupasCardProps, type SortMode,
} from '../../components/jupas/parts';
import { useState } from 'react';

const DEMO_CARDS: JupasCardProps[] = [
  {
    code: 'JS4411', uni: 'HKU',
    nameCh: '醫學士（內外全科）',
    nameEn: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
    lq: 27, median: 28, uq: 29,
    prob: 'low', isGod: true, isPopular: true,
  },
  {
    code: 'JS1234', uni: 'CUHK',
    nameCh: '工商管理學士（環球商業）',
    nameEn: 'Bachelor of Business Administration (Global Business)',
    lq: 22, median: 24, uq: 26,
    prob: 'comp', isPopular: true,
    defaultOpen: true,
    years: [
      { year: 2024, lq: 22, median: 24, uq: 26 },
      { year: 2023, lq: 21, median: 23, uq: 25 },
      { year: 2022, lq: 20, median: 22, uq: 24 },
      { year: 2021, lq: 19, median: 21, uq: 23 },
    ],
    info: {
      duration: '4 年', quota: 120,
      faculty: '工商管理學院', facultyEn: 'Faculty of Business Administration',
      category: '商業及金融', categoryEn: 'Business & Finance',
      dualDegree: 'no', interview: 'maybe', interviewType: 'May require',
      formula: '中文×2 + 英文×2 + 數學×2 + 最佳3科×1',
    },
  },
  {
    code: 'JS3322', uni: 'PolyU',
    nameCh: '護理學（普通科）學士',
    nameEn: 'Bachelor of Science (Honours) in Nursing',
    lq: 14, median: 16, uq: 18,
    prob: 'highchance',
  },
];

export default function JupasDesign() {
  const [sort, setSort] = useState<SortMode>('prob');

  return (
    <>
      <PageSEO
        title="JUPAS 計算結果 — 設計稿"
        description="JUPAS calculator result card components — design iteration page"
        robots={['noindex', 'nofollow']}
      />

      <JupasStyles />

      <div className="hidden sm:flex items-center mb-3">
        <div className="text-xl font-medium pr-3 border-r border-[var(--color-border)] text-[var(--color-heading)]">開發</div>
        <div className="pl-3">
          <nav aria-label="breadcrumb">
            <ol className="list-none flex p-0 m-0">
              <li className="text-base text-[var(--color-body)]" aria-current="page">JUPAS 結果卡 — 設計稿</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="jpd-wrap">
        <div className="jpd-page-hd">
          <div className="jpd-page-tag">Design Iteration · Component Sandbox</div>
          <h1 className="jpd-page-title">JUPAS 計算結果卡</h1>
          <p className="jpd-page-sub">Result card components for JUPAS calculator feature</p>
        </div>

        <div className="jpd-results-row">
          <span className="jpd-result-label">搜尋結果 · {DEMO_CARDS.length} 個課程</span>
          <SortToggle mode={sort} onChange={setSort} />
        </div>

        {DEMO_CARDS.map(card => (
          <JupasCard key={card.code} {...card} />
        ))}

        <MechanismInfo />

        <SearchLoading />
        <NoResults />

        <ProbLegend />

        <UniPalette />
      </div>
    </>
  );
}
