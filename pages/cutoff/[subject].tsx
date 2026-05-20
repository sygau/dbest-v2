import React from 'react';
import Head from 'next/head';
import PageSEO from '../../components/PageSEO';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { GetStaticPaths, GetStaticProps } from 'next';
import cutoffConfigData from '../../public/config/cutoff-config.json';
import {
  BiBarChartAlt2,
  BiBook,
  BiCalculator,
  BiBot,
  BiTestTube,
  BiLeaf,
  BiLaptop,
  BiGlobe,
  BiMoney,
  BiBriefcase,
  BiPlanet
} from 'react-icons/bi';
import { LuInfo, LuTriangleAlert, LuChevronRight } from 'react-icons/lu';
import NavigationLink from '../../components/NavigationLink';
import {
  getCutoffSEOConfig,
  generateCutoffMetadata,
  AVAILABLE_CUTOFF_SUBJECTS,
  CUTOFF_SUBJECT_NAMES
} from '../../utils/cutoffSlugSEO';
import CutoffTable from '../../components/CutoffTable';
import { CutoffTableData, SubjectConfig, CutoffConfig } from '../../utils/clientCutoffData';
import { getSubjectCutoffLastUpdated } from '../../utils/lastUpdated';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert';

const SUBJECT_ICONS: Record<string, { icon: any, color: string }> = {
  'chinese': { icon: BiBook, color: '#ff69b4' },
  'english': { icon: BiBook, color: '#40c4ff' },
  'math': { icon: BiCalculator, color: '#eab308' },
  'citizen': { icon: BiGlobe, color: '#28a745' },
  'physics': { icon: BiBot, color: '#6366f1' },
  'chemistry': { icon: BiTestTube, color: '#06b6d4' },
  'biology': { icon: BiLeaf, color: '#22c55e' },
  'ict': { icon: BiLaptop, color: '#ff3d00' },
  'm1': { icon: BiCalculator, color: '#b388ff' },
  'm2': { icon: BiCalculator, color: '#22d3ee' },
  'geography': { icon: BiGlobe, color: '#16a34a' },
  'economics': { icon: BiMoney, color: '#f97316' },
  'bafs': { icon: BiBriefcase, color: '#10b981' },
  'history': { icon: BiBook, color: '#ffab91' },
  'chinese-history': { icon: BiBook, color: '#ff1744' },
  'ths': { icon: BiPlanet, color: '#2196f3' }
};

interface CutoffSubjectPageProps {
  subjectStr: string;
  cutoffData: CutoffTableData;
  cutoffConfig: SubjectConfig | null;
  lastUpdated: string | null;
}

export default function CutoffSubjectPage({ subjectStr, cutoffData, cutoffConfig, lastUpdated }: CutoffSubjectPageProps) {
  const seoConfig = getCutoffSEOConfig(subjectStr);
  const metadata = generateCutoffMetadata(subjectStr);
  const otherSubjects = AVAILABLE_CUTOFF_SUBJECTS.filter(s => s !== subjectStr);

  return (
    <>
      <PageSEO
        title={metadata?.title || `DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} Cut-off Scores`}
        description={metadata?.description || `DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} cut-off scores and grade boundaries`}
        ogTitle={metadata?.ogTitle || metadata?.title}
        ogDescription={metadata?.ogDescription || metadata?.description}
        ogImage={metadata?.ogImage || "https://dse.best/assets/images/logo-icon.png"}
        ogUrl={metadata?.ogUrl || `https://dse.best/cutoff/${subjectStr}`}
        ogType={metadata?.ogType || "website"}
        robots={['index', 'follow']}
        canonical={`https://dse.best/cutoff/${subjectStr}`}
        pageKey="cutoff"
      />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata?.title} />
        <meta name="twitter:description" content={metadata?.description} />
        <meta name="twitter:image" content={metadata?.ogImage || "https://dse.best/assets/images/logo-icon.png"} />
      </Head>

      <PageBreadcrumb section="DSE Cut-off 分數" text={CUTOFF_SUBJECT_NAMES[subjectStr]} showHome />

      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">

          {/* Page title */}
          <h1 className="mb-3">{seoConfig?.pageTitle || `DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} Cut-off Scores`}</h1>

          <div className="mb-4">
            <p className="mb-2" style={{ color: 'var(--color-body)' }}>
              {seoConfig?.pageDescriptionChi || `瀏覽DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]}的Cut-off分數及等級界線資料，助您了解各等級的達標分數要求。`}
            </p>
            <p className="mb-0" style={{ color: 'var(--color-body)' }}>
              {seoConfig?.pageDescriptionEng || `Browse DSE ${CUTOFF_SUBJECT_NAMES[subjectStr]} cut-off scores and grade boundaries to understand the score requirements for each grade level.`}
            </p>
          </div>

          {/* Data Updated Alert — using Alert component */}
          {lastUpdated && (
            <Alert variant="default" className="mb-4">
              <AlertTitle icon={<LuInfo size={15} style={{ color: '#8b5cf6' }} />}>
                資料更新 Data Updated
              </AlertTitle>
              <AlertDescription>
                {lastUpdated}
              </AlertDescription>
            </Alert>
          )}

          {/* Important Notice — moved to top, using Alert component */}
          <Alert variant="warning" className="mb-4">
            <AlertTitle icon={<LuTriangleAlert size={15} style={{ color: '#d97706' }} />}>
              注意事項 Important Notice
            </AlertTitle>
            <AlertDescription>
              Cut Off 資料僅供參考，可能存有錯誤，並會按年更新。實際分數要求請以香港考試及評核局公布為準。
              <br />
              This cut-off score data is for reference only. It may contain errors and is subject to annual updates. Please refer to official announcements from the Hong Kong Examinations and Assessment Authority for actual score requirements.
            </AlertDescription>
          </Alert>

          {/* Cut-off Table */}
          <CutoffTable
            data={cutoffData}
            config={cutoffConfig || undefined}
            subject={subjectStr}
          />

          {/* Other Subjects Section */}
          {otherSubjects.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-4 text-center" style={{ color: 'var(--color-heading)' }}>
                DSE 科目分數線 | Cut-off scores for DSE Subjects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {otherSubjects.map((otherSubject) => {
                  const subjectIcon = SUBJECT_ICONS[otherSubject];
                  const IconComponent = subjectIcon?.icon || BiBarChartAlt2;
                  const iconColor = subjectIcon?.color || '#6c757d';

                  return (
                    <NavigationLink key={otherSubject} href={`/cutoff/${otherSubject}`} className="no-underline">
                      <div
                        className="rounded-xl p-3 flex items-center h-full"
                        style={{
                          backgroundColor: 'var(--color-card-inner-bg)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <IconComponent size={20} style={{ color: iconColor, marginRight: '0.75rem', flexShrink: 0, filter: `drop-shadow(0 0 5px ${iconColor}55)` }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate" style={{ color: 'var(--color-heading)' }}>
                            {CUTOFF_SUBJECT_NAMES[otherSubject]}
                          </div>
                        </div>
                        <LuChevronRight size={16} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
                      </div>
                    </NavigationLink>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = AVAILABLE_CUTOFF_SUBJECTS.map((subject) => ({
    params: { subject },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CutoffSubjectPageProps> = async ({ params }) => {
  const subjectStr = params?.subject as string;

  const configJson = cutoffConfigData as unknown as CutoffConfig;
  const subjectConfig = configJson[subjectStr] || null;

  let cutoffData: CutoffTableData = {};
  if (subjectConfig) {
    try {
      const mod = await import(`../../data/cutoff/${subjectStr}.json`);
      cutoffData = (mod.default || mod) as CutoffTableData;
    } catch (e) {
      console.warn(`No prebuilt cutoff JSON for ${subjectStr}:`, e);
    }
  }

  const lastUpdated = getSubjectCutoffLastUpdated(subjectStr);

  return {
    props: {
      subjectStr,
      cutoffData,
      cutoffConfig: subjectConfig,
      lastUpdated: lastUpdated || null,
    },
  };
};
