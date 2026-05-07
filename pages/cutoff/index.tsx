import React from 'react';
import { BiTrendingUp, BiBook, BiCalculator, BiBot, BiTestTube, BiLeaf, BiLaptop, BiGlobe, BiMoney, BiBriefcase, BiPlanet } from 'react-icons/bi';
import { LuInfo, LuTriangleAlert, LuLightbulb, LuChevronRight } from 'react-icons/lu';
import NavigationLink from '../../components/NavigationLink';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { AVAILABLE_CUTOFF_SUBJECTS, CUTOFF_SUBJECT_NAMES } from '../../utils/cutoffSlugSEO';
import { getCutoffIndexLastUpdated } from '../../utils/lastUpdated';
import PageSEO from '../../components/PageSEO';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert';
import { Callout } from '../../components/ui/Callout';
import { Badge } from '../../components/ui/Badge';

const SUBJECT_STYLES: Record<string, { icon: any; color: string }> = {
  chinese: { icon: BiBook, color: '#ff69b4' },
  english: { icon: BiBook, color: '#40c4ff' },
  math: { icon: BiCalculator, color: '#eab308' },
  citizen: { icon: BiGlobe, color: '#28a745' },
  physics: { icon: BiBot, color: '#6366f1' },
  chemistry: { icon: BiTestTube, color: '#06b6d4' },
  biology: { icon: BiLeaf, color: '#22c55e' },
  ict: { icon: BiLaptop, color: '#ff3d00' },
  m1: { icon: BiCalculator, color: '#b388ff' },
  m2: { icon: BiCalculator, color: '#22d3ee' },
  geography: { icon: BiGlobe, color: '#16a34a' },
  economics: { icon: BiMoney, color: '#f97316' },
  bafs: { icon: BiBriefcase, color: '#10b981' },
  history: { icon: BiBook, color: '#ffab91' },
  'chinese-history': { icon: BiBook, color: '#ff1744' },
  ths: { icon: BiPlanet, color: '#2196f3' },
};

const iconGlow = (color: string) => ({
  filter: `drop-shadow(0 0 5px ${color}55)`,
  flexShrink: 0 as const,
});

export default function CutoffIndexPage() {
  const lastUpdated = getCutoffIndexLastUpdated();

  return (
    <>
      <PageSEO
        title="【DSE Cut Off 分數】全港最齊 2012–2025 全部科目等級分界線｜英文、中文、數學等"
        description="【DSE Cut Off 分數一覽】全港最齊2012–2025年全部科目等級分界線！涵蓋英文、中文、數學、物理、化學、生物、ICT、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術等。做完past paper？立即對cut off分數，精準預測你嘅DSE Level！"
        ogTitle="【DSE Cut Off 分數】全港最齊 2012–2025 全部科目等級分界線｜英文、中文、數學等"
        ogDescription="【DSE Cut Off 分數一覽】全港最齊2012–2025年全部科目等級分界線！涵蓋英文、中文、數學、物理、化學、生物、ICT、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術等。"
        ogUrl="https://dse.best/cutoff"
        robots={['index', 'follow']}
        pageKey="cutoff"
      />

      <PageBreadcrumb section="DSE Cut-off 分數" text="Cut-off 分數" showHome />

      <div className="card rounded-4" style={{ height: 'auto' }}>
        <div className="card-body" style={{ fontFamily: "var(--font-noto-sans-hk), 'PingFang HK', 'Microsoft JhengHei', -apple-system, BlinkMacSystemFont, sans-serif" }}>

          <div className="mb-6">
            <h1 className="mb-2">DSE Cut-off Scores 分數線 (2012-2025)</h1>
            <p className="mb-0" style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>
              歡迎瀏覽DSE各科目的Cut Off資料，包括英文、中文、數學、物理、化學、生物、ICT、M1、M2、地理、經濟、BAFS、歷史、中國歷史、旅遊與款待等科目。在此，您可以找到按年份排列的等級Cut Off，助您了解各等級的達標分數。
              <br /><br />
              Welcome to browse DSE cut-off scores for all subjects including English, Chinese, Mathematics, Physics, Chemistry, Biology, ICT, M1, M2, Geography, Economics, BAFS, History, Chinese History, Tourism & Hospitality and more. Here you can find grade boundaries arranged by year to help you understand the score requirements for each grade level.
            </p>
          </div>

          {/* ================================================================ */}
          {/* DESIGN 1 — Clean Grid Cards */}
          {/* ================================================================ */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVAILABLE_CUTOFF_SUBJECTS.map((subject) => {
                const s = SUBJECT_STYLES[subject];
                const Icon = s?.icon || BiTrendingUp;
                const c = s?.color || '#6c757d';
                return (
                  <NavigationLink key={subject} href={`/cutoff/${subject}`} className="no-underline">
                    <div
                      className="rounded-xl p-4 h-full"
                      style={{ backgroundColor: 'var(--color-card-inner-bg)', border: '1px solid var(--color-border)' }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={22} style={{ color: c, ...iconGlow(c) }} />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm truncate" style={{ color: 'var(--color-heading)' }}>
                            {CUTOFF_SUBJECT_NAMES[subject]}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                            2012–2025
                          </div>
                        </div>
                        <LuChevronRight size={16} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
                      </div>
                    </div>
                  </NavigationLink>
                );
              })}
            </div>
          </div>
          
          

          {/* ================================================================ */}
          {/* INFO + NOTICE SECTIONS */}
          {/* ================================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <Callout variant="info" title="關於 Cut-off 分數 About Cut-off Scores" icon={<LuInfo size={16} />}>
              Cut-off分數是指在DSE考試中達到特定等級所需的最低分數。這些分數每年會根據考生表現和試題難度進行調整，為考生提供重要的參考指標。
              <br /><br />
              Cut-off scores represent the minimum marks required to achieve specific grade levels in DSE examinations. These scores are adjusted annually based on candidate performance and paper difficulty, providing important reference benchmarks for students.
            </Callout>
            <Callout variant="tip" title="如何使用 How to Use" icon={<LuLightbulb size={16} />}>
              點擊上方任何科目卡片即可查看該科目的詳細Cut-off分數資料。每個科目頁面都包含歷年的等級界線，助您制定學習策略和目標設定。
              <br /><br />
              Click on any subject card above to view detailed cut-off score data for that subject. Each subject page contains historical grade boundaries to help you develop study strategies and set realistic targets.
            </Callout>
          </div>

          <Alert variant="default" className="mb-3">
            <AlertTitle icon={<LuInfo size={15} style={{ color: '#8b5cf6' }} />}>
              資料來源 Data Sources
            </AlertTitle>
            <AlertDescription>
              Cut-off分數資料來源於學生提交，並定期更新以確保準確性。Cut-off score data is sourced from student submissions, and is regularly updated to ensure accuracy.
              {lastUpdated && (
                <><br /><strong>最後更新 Last Updated:</strong> {lastUpdated}</>
              )}
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTitle icon={<LuTriangleAlert size={15} style={{ color: '#d97706' }} />}>
              注意事項 Important Notice
            </AlertTitle>
            <AlertDescription>
              Cut Off 資料僅供參考，可能存有錯誤，並會按年更新。實際分數要求請以香港考試及評核局公布為準。
              <br />
              This cut-off score data is for reference only. It may contain errors and is subject to annual updates. Please refer to official announcements from the Hong Kong Examinations and Assessment Authority for actual score requirements.
            </AlertDescription>
          </Alert>

        </div>
      </div>
    </>
  );
}
