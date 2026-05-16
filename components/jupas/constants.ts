// JUPAS calculator shared constants. UI-only — no engine imports.

export type ProbLevel = 'highchance' | 'comp' | 'bord' | 'low' | 'unmet';

export const PROB_CONFIG: Record<ProbLevel, { label: string; en: string; className: string; medianColor: string }> = {
  highchance: { label: '大機會', en: 'High Chance',  className: 'jpd-p-highchance', medianColor: '#00703c' },
  comp:       { label: '博得過', en: 'Competitive',  className: 'jpd-p-comp',       medianColor: '#005eb8' },
  bord:       { label: '邊緣',  en: 'Borderline',   className: 'jpd-p-bord',       medianColor: '#8a6200' },
  low:        { label: '機率低', en: 'Low Chance',   className: 'jpd-p-low',        medianColor: '#c24100' },
  unmet:      { label: '唔達標', en: 'Unmet',        className: 'jpd-p-unmet',      medianColor: '#d5281b' },
};

// Display key (mixed case) for design.tsx + cards
export type UniDisplay = 'HKU' | 'CUHK' | 'HKUST' | 'PolyU' | 'CityU' | 'HKBU' | 'EdUHK' | 'LU' | 'HKMU';

// API uni enum (uppercase) → display key
export const UNI_API_TO_DISPLAY: Record<string, UniDisplay> = {
  HKU: 'HKU',
  CUHK: 'CUHK',
  HKUST: 'HKUST',
  POLYU: 'PolyU',
  CITYU: 'CityU',
  HKBU: 'HKBU',
  EDUHK: 'EdUHK',
  LINGU: 'LU',
  HKMU: 'HKMU',
};

export const UNI_JUPAS_SLUG: Record<string, string> = {
  HKU: 'hku',
  CUHK: 'cuhk',
  HKUST: 'hkust',
  PolyU: 'polyu',
  CityU: 'cityuhk',
  HKBU: 'hkbu',
  EdUHK: 'eduhk',
  LU: 'lingnanu',
  HKMU: 'hkmu',
};

export const UNI_COLORS: Record<string, string> = {
  HKU:   '#003B70',
  CUHK:  '#61237A',
  HKUST: '#0056A6',
  PolyU: '#9E1B32',
  CityU: '#C8102E',
  HKBU:  '#4A6FA5',
  EdUHK: '#00694E',
  LU:    '#E4002B',
  HKMU:  '#7AC142',
};

export const ALL_UNIS: UniDisplay[] = ['HKU', 'CUHK', 'HKUST', 'PolyU', 'CityU', 'HKBU', 'EdUHK', 'LU', 'HKMU'];

export const ALL_PROB_LEVELS: ProbLevel[] = ['highchance', 'comp', 'bord', 'low', 'unmet'];
export const DEFAULT_PROB_LEVELS = new Set<ProbLevel>(['highchance', 'comp', 'bord', 'low']);

export const TIER_ORDER: Record<ProbLevel, number> = {
  highchance: 0, comp: 1, bord: 2, low: 3, unmet: 4,
};
