// Frontend-only mirror of the API response types. We deliberately do NOT
// import from lib/jupas/scoring/* — the engine stays server-side. Keep these
// in sync with the response shape documented in docs/jupasTool/endpoint-guide.md.

export type TierKey = 'highchance' | 'comp' | 'bord' | 'low' | 'unmet';

export interface CutoffYear {
  uq: number | null;
  median: number | null;
  lq: number | null;
  vacancy?: number | null;
}

export interface PublicProgramme {
  id: string;
  uni: string;                       // engine enum (HKU, CUHK, HKUST, POLYU, CITYU, HKBU, EDUHK, LINGU, HKMU)
  nameEn: string;
  nameCh: string;
  faculty: string;
  isDoubleDegree: boolean;
  category: string;
  categoryCh: string;
  type: string;
  typeCh: string;
  type2: string;
  type2Ch: string;
  isPopular: boolean;
  isGod: boolean;
  isInterview: boolean;
  interviewType: string | null;
  firstYearIntake: number | null;
  numOfYear: number | null;
  cutoffs: { '2023': CutoffYear; '2024': CutoffYear; '2025': CutoffYear };
  formulaLabel: string;
}

export interface FlexResult {
  eligible: boolean;
  adjustedScore: number | null;
  rule: 'hku-10pct' | 'cuhk-uq' | 'polyu-threshold' | 'cityu-threshold' | 'hkbu-l2' | null;
  failedSubject?: string;
  reason?: string;
}

export interface ProgrammeResult {
  programme: PublicProgramme;
  eligible: boolean;
  ineligibilityReason?: string;
  score: number | null;
  maxScore: number;
  scoreDelta: number | null;
  tier: string;
  tierKey: TierKey;
  yearUsed: 2023 | 2024 | 2025;
  scaleNote?: string;
  flex?: FlexResult;
}

export interface CalculateResponse {
  count: number;
  eligibleCount: number;
  yearUsed: 2023 | 2024 | 2025;
  results: ProgrammeResult[];
  meta: {
    runtimeMs: number;
    version: string;
    sampled?: number;
    total?: number;
    sampleNote?: string;
  };
}

export interface CalculateError { error: string }
