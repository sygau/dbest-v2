// Weight application + bestOf brute-force optimizer + exclude rules.
// Per JSON_SCHEMA §Weights + JUPAS_MECHANISM §3 + §6.

import type { BestOfGroup, Programme, SubjectScore } from './types';

export interface WeightedSubject {
  subject: string;
  numeric: number;       // raw category score
  weight: number;        // applied multiplier
  weighted: number;      // numeric * weight
  cat: 'A' | 'B' | 'C';
  source: 'regular' | 'bestOf' | 'default';
}

interface PoolItem {
  subject: string;
  numeric: number;
  cat: 'A' | 'B' | 'C';
}

// Apply M1/M2 single-elective + Cat C single-subject + math_or_m1m2_only_one rules.
// Returns subject pool with collapsed entries — preserves the higher-scoring choice.
export function applySubjectConstraints(
  scores: SubjectScore[],
  programme: Programme,
): SubjectScore[] {
  const out: SubjectScore[] = [];

  // Bucket
  const m1m2: SubjectScore[] = [];
  const catC: SubjectScore[] = [];
  let math: SubjectScore | null = null;
  const others: SubjectScore[] = [];

  for (const s of scores) {
    if (s.subject === 'ext:M1' || s.subject === 'ext:M2') m1m2.push(s);
    else if (s.cat === 'C') catC.push(s);
    else if (s.subject === 'core:math') { math = s; others.push(s); }
    else others.push(s);
  }

  // Cat C: keep highest only.
  if (catC.length) {
    catC.sort((a, b) => b.numeric - a.numeric);
    out.push(catC[0]);
  }

  // M1/M2: keep higher only.
  let bestM: SubjectScore | null = null;
  if (m1m2.length) {
    m1m2.sort((a, b) => b.numeric - a.numeric);
    bestM = m1m2[0];
  }

  // math_or_m1m2_only_one: keep higher of math vs bestM.
  if (programme.excludeRules.includes('math_or_m1m2_only_one') && math && bestM) {
    if (bestM.numeric > math.numeric) {
      // drop math
      const idx = others.indexOf(math);
      if (idx >= 0) others.splice(idx, 1);
      out.push(bestM);
    } else {
      // drop bestM (already not in others)
      // math stays in others
    }
    out.push(...others);
    return out;
  }

  if (bestM) out.push(bestM);
  out.push(...others);
  return out;
}

function poolMatches(pool: string[], subject: string): boolean {
  for (let i = 0; i < pool.length; i++) {
    if (pool[i] === subject) return true;
  }
  return false;
}

// Apply regular weights first (locked); then brute-force bestOf groups for max sum.
// Each subject can be used by AT MOST one weight slot.
export function applyWeights(
  scores: SubjectScore[],
  programme: Programme,
): WeightedSubject[] {
  const constrained = applySubjectConstraints(scores, programme);
  const result: WeightedSubject[] = [];
  const used = new Set<string>();

  // 1. Regular weights — exact match wins, locks the subject.
  const reg = programme.weights.regular;
  for (const s of constrained) {
    if (s.subject in reg) {
      const w = reg[s.subject];
      result.push({
        subject: s.subject, numeric: s.numeric, weight: w,
        weighted: s.numeric * w, cat: s.cat, source: 'regular',
      });
      used.add(s.subject);
    }
  }

  // 2. bestOf groups: brute force assignments.
  const groups = programme.weights.bestOf;
  const remaining: PoolItem[] = [];
  for (const s of constrained) {
    if (!used.has(s.subject)) remaining.push({ subject: s.subject, numeric: s.numeric, cat: s.cat });
  }

  // For each group, eligible candidates = remaining ∩ pool.
  // Search: pick `pick` subjects per group, no overlap across groups, maximise sum of weighted.
  const groupCandidates: PoolItem[][] = groups.map((g) =>
    remaining.filter((r) => poolMatches(g.pool, r.subject)),
  );

  // Enumerate combos. For each group we choose up to `pick` subjects.
  // Total search space: product over groups of C(|cand|, ≤pick). Tiny in practice (~hundreds).
  type BestAssign = { sum: number; assigns: { groupIdx: number; subjects: PoolItem[] }[] };
  const bestRef: { value: BestAssign | null } = { value: null };

  function combos(items: PoolItem[], pick: number): PoolItem[][] {
    const r: PoolItem[][] = [];
    const n = items.length;
    const take = Math.min(pick, n);
    if (take === 0) return [[]];
    function rec(start: number, chosen: PoolItem[]) {
      if (chosen.length === take) { r.push(chosen.slice()); return; }
      for (let i = start; i < n; i++) {
        chosen.push(items[i]);
        rec(i + 1, chosen);
        chosen.pop();
      }
    }
    rec(0, []);
    // Also allow under-fill (pick fewer than max) — JUPAS_MECHANISM §3.
    if (take > 0) {
      for (let k = 0; k < take; k++) {
        function rec2(start: number, chosen: PoolItem[]) {
          if (chosen.length === k) { r.push(chosen.slice()); return; }
          for (let i = start; i < n; i++) {
            chosen.push(items[i]);
            rec2(i + 1, chosen);
            chosen.pop();
          }
        }
        rec2(0, []);
      }
    }
    return r;
  }

  const perGroupCombos: PoolItem[][][] = groupCandidates.map((cands, i) =>
    combos(cands, groups[i].pick),
  );

  function search(gi: number, picked: { groupIdx: number; subjects: PoolItem[] }[], usedHere: Set<string>, sum: number) {
    if (gi === groups.length) {
      if (!bestRef.value || sum > bestRef.value.sum) bestRef.value = { sum, assigns: picked.map((p) => ({ groupIdx: p.groupIdx, subjects: p.subjects.slice() })) };
      return;
    }
    const cands = perGroupCombos[gi];
    const w = groups[gi].weight;
    for (const c of cands) {
      let conflict = false;
      for (const it of c) { if (usedHere.has(it.subject)) { conflict = true; break; } }
      if (conflict) continue;
      let add = 0;
      for (const it of c) add += it.numeric * w;
      for (const it of c) usedHere.add(it.subject);
      picked.push({ groupIdx: gi, subjects: c });
      search(gi + 1, picked, usedHere, sum + add);
      picked.pop();
      for (const it of c) usedHere.delete(it.subject);
    }
  }

  if (groups.length > 0) {
    search(0, [], new Set(), 0);
  }

  // 3. Apply best assignment — possibly capped by maxWeightedElectives.
  const bestPicked = bestRef.value;
  if (bestPicked) {
    const cap = programme.maxWeightedElectives;
    // Flatten all (subject, weight) from groups, sorted by weighted score desc.
    const flat: { subject: string; numeric: number; cat: 'A'|'B'|'C'; weight: number }[] = [];
    for (const a of bestPicked.assigns) {
      const w = groups[a.groupIdx].weight;
      for (const it of a.subjects) flat.push({ subject: it.subject, numeric: it.numeric, cat: it.cat, weight: w });
    }
    flat.sort((a, b) => b.numeric * b.weight - a.numeric * a.weight);

    let weightedCount = 0;
    for (const it of flat) {
      const useWeight = cap == null || weightedCount < cap;
      const w = useWeight ? it.weight : 1;
      result.push({
        subject: it.subject, numeric: it.numeric, weight: w,
        weighted: it.numeric * w, cat: it.cat, source: 'bestOf',
      });
      used.add(it.subject);
      if (useWeight) weightedCount++;
    }
  }

  // 4. Default ×1.0 for everything else.
  for (const s of constrained) {
    if (used.has(s.subject)) continue;
    result.push({
      subject: s.subject, numeric: s.numeric, weight: 1,
      weighted: s.numeric, cat: s.cat, source: 'default',
    });
  }

  return result;
}
