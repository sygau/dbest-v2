// Maps programme data → JupasCardProps. Shared by the calculator (scored
// results) and the bookmarks page (static catalogue, optional score overlay).

import { UNI_API_TO_DISPLAY, type ProbLevel } from '../../../components/jupas/constants';
import type { JupasCardProps } from '../../../components/jupas/parts';
import type { ProgrammeResult, PublicProgramme } from './apiTypes';

// Lite catalogue entries (public/jupas/programmes-lite.json) lack formulaLabel.
export type LiteProgramme = Omit<PublicProgramme, 'formulaLabel'> & { formulaLabel?: string };

type Year = '2023' | '2024' | '2025';

function buildInfo(p: LiteProgramme): JupasCardProps['info'] {
  return {
    duration: p.numOfYear ? `${p.numOfYear} 年` : undefined,
    quota: p.firstYearIntake ?? undefined,
    faculty: p.faculty || undefined,
    facultyEn: p.faculty || undefined,
    category: p.categoryCh || undefined,
    categoryEn: p.category || undefined,
    dualDegree: p.isDoubleDegree ? 'yes' : 'no',
    interview: p.isInterview ? 'yes' : 'no',
    interviewType: p.interviewType || undefined,
    formula: p.formulaLabel || undefined,
  };
}

function buildYears(p: LiteProgramme): JupasCardProps['years'] {
  return ([2023, 2024, 2025] as const).map(y => {
    const c = p.cutoffs[String(y) as Year];
    return { year: y, lq: c?.lq ?? null, median: c?.median ?? null, uq: c?.uq ?? null };
  });
}

// Scored card — from a calculator ProgrammeResult.
export function resultToCardProps(r: ProgrammeResult): JupasCardProps {
  const p = r.programme;
  const co = p.cutoffs[String(r.yearUsed) as Year];
  return {
    code: p.id,
    uni: UNI_API_TO_DISPLAY[p.uni] ?? p.uni,
    nameCh: p.nameCh,
    nameEn: p.nameEn,
    lq: co?.lq ?? null,
    median: co?.median ?? null,
    uq: co?.uq ?? null,
    prob: r.tierKey as ProbLevel,
    isGod: p.isGod,
    isPopular: p.isPopular,
    score: r.score,
    scoreDelta: r.scoreDelta,
    scaleNote: r.scaleNote,
    flexBadge: r.flex?.eligible ? '彈性收生' : undefined,
    ineligibilityReason: !r.eligible && r.tierKey === 'unmet' ? r.ineligibilityReason : undefined,
    years: buildYears(p),
    info: buildInfo(p),
  };
}

// Static card — from the lite catalogue. If a matching ProgrammeResult is
// supplied (hybrid mode), the user's score/tier is overlaid.
export function programmeToCardProps(p: LiteProgramme, r?: ProgrammeResult): JupasCardProps {
  if (r) return resultToCardProps(r);
  const co = p.cutoffs['2025'];
  return {
    code: p.id,
    uni: UNI_API_TO_DISPLAY[p.uni] ?? p.uni,
    nameCh: p.nameCh,
    nameEn: p.nameEn,
    lq: co?.lq ?? null,
    median: co?.median ?? null,
    uq: co?.uq ?? null,
    prob: undefined,
    isGod: p.isGod,
    isPopular: p.isPopular,
    years: buildYears(p),
    info: buildInfo(p),
  };
}
