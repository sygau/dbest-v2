// JUPAS scoring engine — shared types.
// Mirrors JSON_SCHEMA.md for output/programmes.json.

export type DseLevel = 0 | 1 | 2 | 3 | 4 | 5 | '5*' | '5**';
export type CatBLevel = 'attained' | 'dist1' | 'dist2';
export type CatCLanguage = 'japanese' | 'korean' | 'french' | 'german' | 'spanish' | 'urdu';

export type CoreSubject = 'core:chi' | 'core:eng' | 'core:math' | 'core:csd';
export type ExtSubject = 'ext:M1' | 'ext:M2';

export type SubjectInput =
  | { subject: CoreSubject; level: DseLevel }
  | { subject: ExtSubject; level: DseLevel }
  | { subject: `elec:${string}`; level: DseLevel }
  | { subject: `catB:${string}`; level: CatBLevel }
  | { subject: `catC:${CatCLanguage}`; language: CatCLanguage; level: string };

export type Year = 2023 | 2024 | 2025;

export interface StudentProfile {
  subjects: SubjectInput[];
  options?: {
    year?: Year;
    includeIneligible?: boolean;
    flex?: boolean;
    breakdown?: boolean;
  };
}

export type FormulaType = 'bestN' | 'hkust' | 'polyu' | 'fixed';

export interface Formula {
  type: FormulaType;
  n?: number;
  fixed?: string[];
  electives?: number;
}

export interface RequireAnyGroup {
  pick: number;
  pool: string[];
  minLevel: number;
}

export interface Gates {
  minChi: number | null;
  minEng: number | null;
  minMath: number | null;
  minElec1: number | null;
  minElec2: number | null;
  csdRequired: boolean;
  excludeCatB: boolean;
  excludeCatC: boolean;
  mustInclude: string[];
  requireAny: RequireAnyGroup[];
}

export interface BestOfGroup {
  pick: number;
  pool: string[];
  weight: number;
}

export interface Weights {
  regular: Record<string, number>;
  bestOf: BestOfGroup[];
}

export interface CutoffYear {
  uq: number | null;
  median: number | null;
  lq: number | null;
  vacancy?: number | null;
}

export interface Programme {
  id: string;
  uni: 'HKU' | 'CUHK' | 'HKUST' | 'POLYU' | 'CITYU' | 'HKBU' | 'EDUHK' | 'LINGU' | 'HKMU';
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
  formula: Formula;
  gates: Gates;
  weights: Weights;
  hku: { sixthMultiplier: number | null };
  hkust: { highestAttainableScore: number | null };
  maxWeightedElectives: number | null;
  excludeRules: string[];
  special: string | null;
  cutoffs: { '2023': CutoffYear; '2024': CutoffYear; '2025': CutoffYear };
  flexThreshold?: number | null;
}

// Numeric-level normalised subject after grade conversion.
export interface SubjectScore {
  subject: string;       // e.g. "core:eng", "elec:bio"
  rawLevel: number;      // 0..7 numeric (5*=6, 5**=7) for gate checks
  numeric: number;       // grade table output (depends on uni scale + category)
  cat: 'A' | 'B' | 'C';
}

export type ScaleTier = '大機會' | '博得過' | '邊緣' | '機率低' | '唔達標';
export type TierKey = 'highchance' | 'comp' | 'bord' | 'low' | 'unmet';

export interface BreakdownEntry {
  subject: string;
  numeric: number;
  weight: number;
  weighted: number;
  usedAs: 'best' | 'sixth' | 'locked' | 'unused' | 'forced';
}

export interface FlexResult {
  eligible: boolean;
  adjustedScore: number | null;
  rule: 'hku-10pct' | 'cuhk-uq' | 'polyu-threshold' | 'cityu-threshold' | 'hkbu-l2' | null;
  failedSubject?: string;
  reason?: string;
}

// Subset of Programme that's actually sent to clients — sensitive scoring rules omitted.
// Keep in sync with STRIPPED_PROGRAMME_FIELDS in config.ts.
export type PublicProgramme = Omit<
  Programme,
  'weights' | 'gates' | 'hku' | 'hkust' | 'excludeRules' | 'special' | 'maxWeightedElectives' | 'formula'
> & {
  formulaLabel: string; // human-readable scoring method, computed server-side
};

export interface ProgrammeResult {
  programme: PublicProgramme;
  eligible: boolean;
  ineligibilityReason?: string;
  score: number | null;
  maxScore: number;
  scoreDelta: number | null;       // score − cutoffs.2025.median (positive = above median)
  tier: ScaleTier;
  tierKey: TierKey;
  yearUsed: Year;
  scaleNote?: string;
  flex?: FlexResult;
  breakdown?: {
    weightedScores: BreakdownEntry[];
    formulaSteps: string[];
  };
}

export interface CalculateResponse {
  count: number;
  eligibleCount: number;
  yearUsed: Year;
  results: ProgrammeResult[];
  meta: {
    runtimeMs: number;
    version: string;
  };
}
