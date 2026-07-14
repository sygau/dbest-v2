// Smart SearchPanel for /jupas/calculator. Owns form state, validation,
// localStorage persistence, and emits BuiltProfile + form hash on submit.

import { useEffect, useState, useCallback, useRef } from 'react';
import { LuX, LuSearch, LuPlus, LuChevronDown } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { FilterChip } from './parts';
import {
  ALL_UNIS, ALL_PROB_LEVELS, DEFAULT_PROB_LEVELS, PROB_CONFIG,
  type ProbLevel, type UniDisplay,
} from './constants';
import { ELECTIVE_SUBJECTS } from '../../lib/jupas/client/subjectMap';
import {
  buildPayload, validateForm, hashForm,
  type FormState, type ElectiveSlot, type BuiltProfile,
} from '../../lib/jupas/client/payload';
import type { GradeStr } from '../../lib/jupas/client/subjectMap';

const STORAGE_KEY = 'jupas:form:v1';
const FILTERS_KEY = 'jupas:filters:v1';

const GRADE_OPTS = ['U', '1', '2', '3', '4', '5', '5*', '5**'];

// Default form: prefill that matches the baked SAMPLE_PROFILE (chi/eng/math=4, Bio=4, Chem=3, Phys=2).
export const DEFAULT_FORM: FormState = {
  chi: '4', eng: '4', math: '4', csd: 'attained',
  electives: [
    { id: 's1', subject: '生物', grade: '4' },
    { id: 's2', subject: '化學', grade: '3' },
    { id: 's3', subject: '物理', grade: '2' },
  ],
  year: 2025,
};

export const DEFAULT_FORM_HASH = hashForm(DEFAULT_FORM);

export interface FilterState {
  unis: Set<UniDisplay>;
  probs: Set<ProbLevel>;
  fields: Set<string>;
}

export const DEFAULT_FILTERS: FilterState = {
  unis: new Set(ALL_UNIS),
  probs: new Set(DEFAULT_PROB_LEVELS),
  fields: new Set<string>(),
};

interface SearchPanelProps {
  fieldOptions: string[];          // dynamic categoryCh values from current results
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  onSearch: (profile: BuiltProfile, formHash: string) => void;
  isSubmitting: boolean;
  cooldownLeft: number;            // seconds left on 5s lock
  errorBanner?: string;
  showFilters?: boolean;           // whether to show filters section (default: true)
}

function GradeSelectRow({ value, onChange }: { value: GradeStr; onChange: (v: GradeStr) => void }) {
  return (
    <select className="jpd-select jpd-grade-sel" value={value} onChange={e => onChange(e.target.value as GradeStr)}>
      <option value="">Lv.</option>
      {GRADE_OPTS.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  );
}

function loadForm(): FormState {
  if (typeof window === 'undefined') return DEFAULT_FORM;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FORM;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_FORM;
    return {
      chi: parsed.chi ?? '',
      eng: parsed.eng ?? '',
      math: parsed.math ?? '',
      csd: parsed.csd === 'notAttained' ? 'notAttained' : 'attained',
      electives: Array.isArray(parsed.electives) && parsed.electives.length >= 2
        ? parsed.electives.map((e: ElectiveSlot, i: number) => ({
            id: e?.id ?? String(i + 1),
            subject: typeof e?.subject === 'string' ? e.subject : '',
            grade: typeof e?.grade === 'string' ? (e.grade as GradeStr) : '',
          }))
        : DEFAULT_FORM.electives,
      year: [2023, 2024, 2025].includes(parsed.year) ? parsed.year : 2025,
    };
  } catch {
    return DEFAULT_FORM;
  }
}

function loadFilters(): FilterState {
  if (typeof window === 'undefined') return DEFAULT_FILTERS;
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    if (!raw) return DEFAULT_FILTERS;
    const p = JSON.parse(raw);
    if (!p || typeof p !== 'object') return DEFAULT_FILTERS;
    
    const unis = Array.isArray(p.unis) && p.unis.length ? new Set(p.unis as UniDisplay[]) : new Set(ALL_UNIS);
    const probs = Array.isArray(p.probs) && p.probs.length ? new Set(p.probs as ProbLevel[]) : new Set(DEFAULT_PROB_LEVELS);
    const fields = Array.isArray(p.fields) ? new Set(p.fields as string[]) : new Set<string>();
    
    // Validate unis exist in ALL_UNIS
    if (unis.size > 0 && Array.from(unis).every((u: UniDisplay) => ALL_UNIS.includes(u))) {
      return { unis, probs, fields };
    }
    return DEFAULT_FILTERS;
  } catch {
    return DEFAULT_FILTERS;
  }
}

export default function SearchPanel({
  fieldOptions, filters, onFiltersChange, onSearch, isSubmitting, cooldownLeft, errorBanner, showFilters = true,
}: SearchPanelProps) {
  const [hydrated, setHydrated] = useState(false);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const lastSubmittedHash = useRef<string | null>(null);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    setForm(loadForm());
    const loadedFilters = loadFilters();
    // Only update filters if they differ from current (avoid unnecessary re-render on fresh load)
    if (
      loadedFilters.unis.size !== filters.unis.size ||
      loadedFilters.probs.size !== filters.probs.size ||
      loadedFilters.fields.size !== filters.fields.size ||
      Array.from(loadedFilters.unis).some(u => !filters.unis.has(u)) ||
      Array.from(loadedFilters.probs).some(p => !filters.probs.has(p))
    ) {
      onFiltersChange(loadedFilters);
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist form on every change.
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); } catch { /* quota/full */ }
  }, [form, hydrated]);

  // Persist filters.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(FILTERS_KEY, JSON.stringify({
        unis: Array.from(filters.unis),
        probs: Array.from(filters.probs),
        fields: Array.from(filters.fields),
      }));
    } catch { /* */ }
  }, [filters, hydrated]);

  const setChi = (v: GradeStr) => setForm(f => ({ ...f, chi: v }));
  const setEng = (v: GradeStr) => setForm(f => ({ ...f, eng: v }));
  const setMath = (v: GradeStr) => setForm(f => ({ ...f, math: v }));

  const addElective = () => setForm(f => ({
    ...f, electives: [...f.electives, { id: 'e' + Date.now(), subject: '', grade: '' }],
  }));
  const removeElective = (id: string) => setForm(f => ({
    ...f, electives: f.electives.filter(e => e.id !== id),
  }));
  const updateElective = (id: string, field: 'subject' | 'grade', value: string) => setForm(f => ({
    ...f, electives: f.electives.map(e => e.id === id ? { ...e, [field]: value } : e),
  }));

  const toggleSet = <T extends string>(s: Set<T>, k: T) => {
    const n = new Set(s);
    n.has(k) ? n.delete(k) : n.add(k);
    return n;
  };
  const toggleUni = (u: UniDisplay) => onFiltersChange({ ...filters, unis: toggleSet(filters.unis, u) });
  const toggleProb = (p: ProbLevel) => onFiltersChange({ ...filters, probs: toggleSet(filters.probs, p) });
  const toggleField = (f: string) => onFiltersChange({ ...filters, fields: toggleSet(filters.fields, f) });

  const handleSubmit = useCallback(() => {
    if (isSubmitting || cooldownLeft > 0) return;
    const v = validateForm(form);
    setErrors(v.errors);
    if (!v.ok) return;
    const profile = buildPayload(form);
    const hash = hashForm(form);
    /* temp disable
      if (hash === lastSubmittedHash.current) {
      setErrors(['搜尋條件未變更，已使用上次結果']);
      return;
    } */
    lastSubmittedHash.current = hash;
    onSearch(profile, hash);
  }, [form, isSubmitting, cooldownLeft, onSearch]);

  const coreRows: { key: 'chi' | 'eng' | 'math'; ch: string; en: string; value: GradeStr; set: (v: GradeStr) => void }[] = [
    { key: 'chi', ch: '中國語文', en: 'Chinese Language', value: form.chi, set: setChi },
    { key: 'eng', ch: '英國語文', en: 'English Language', value: form.eng, set: setEng },
    { key: 'math', ch: '數學', en: 'Mathematics', value: form.math, set: setMath },
  ];

  const submitDisabled = isSubmitting || cooldownLeft > 0;
  const submitLabel = isSubmitting
    ? '搜尋中…'
    : cooldownLeft > 0
      ? `請稍候 ${cooldownLeft}s`
      : '搜尋課程';

  return (
    <div className="jpd-card jpd-search-card">
      <div className="jpd-tbl-hd">
        <span>核心科目</span>
        <span className="jpd-tbl-hd-en">Core Subjects</span>
      </div>
      <div>
        {coreRows.map(({ key, ch, en, value, set }) => (
          <div key={key} className="jpd-subj-row">
            <div className="jpd-subj-name">
              <span className="jpd-subj-name-ch">{ch}</span>
              <span className="jpd-subj-name-en">{en}</span>
            </div>
            <GradeSelectRow value={value} onChange={set} />
          </div>
        ))}
        <div className="jpd-subj-row">
          <div className="jpd-subj-name">
            <span className="jpd-subj-name-ch">公民與社會發展</span>
            <span className="jpd-subj-name-en">Citizenship &amp; Social Development</span>
          </div>
          <select
            className="jpd-select jpd-grade-sel"
            style={{ width: 110 }}
            value={form.csd}
            onChange={e => setForm(f => ({ ...f, csd: e.target.value as 'attained' | 'notAttained' }))}
          >
            <option value="attained">達標</option>
            <option value="notAttained">未達標</option>
          </select>
        </div>
      </div>

      <div className="jpd-tbl-hd">
        <span>選修科目</span>
        <span className="jpd-tbl-hd-en">Elective Subjects</span>
      </div>
      <div>
        {form.electives.map(e => {
          const takenElsewhere = new Set(form.electives.filter(x => x.id !== e.id).map(x => x.subject).filter(Boolean));
          return (
          <div key={e.id} className="jpd-subj-row">
            <select
              className="jpd-select jpd-subject-sel"
              value={e.subject}
              onChange={ev => updateElective(e.id, 'subject', ev.target.value)}
            >
              <option value="">選擇科目</option>
              {ELECTIVE_SUBJECTS.filter(s => !takenElsewhere.has(s)).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <GradeSelectRow value={e.grade} onChange={v => updateElective(e.id, 'grade', v)} />
            <Button variant="secondary" size="sm" style={{ paddingLeft: '0.3rem', paddingRight: '0.3rem' }} onClick={() => removeElective(e.id)} aria-label="移除科目">
              <LuX size={14} strokeWidth={4} />
            </Button>
          </div>
          );
        })}
        <div className="jpd-add-wrap">
          <Button variant="secondary" size="sm" onClick={addElective} style={{ width: '100%', justifyContent: 'center' }}>
            <LuPlus size={15} strokeWidth={4} style={{ transform: 'translateY(0.5px)' }} /> 加入選修科目
          </Button>
        </div>
      </div>

      <div className="jpd-filters-sec">
        {showFilters && (
          <>
            <button className="jpd-filters-hd" type="button" onClick={() => setFiltersOpen(v => !v)}>
              <span>篩選條件 <span className="jpd-filters-hd-en">Filters</span></span>
              <LuChevronDown size={16} strokeWidth={2.5} className={`jpd-filters-chevron${filtersOpen ? ' jpd-filters-chevron-open' : ''}`} />
            </button>
            {filtersOpen && (
              <div className="jpd-filters-body">
            <div>
              <div className="jpd-filter-grp-lbl">大學 · University</div>
              <div className="jpd-chips">
                {ALL_UNIS.map(u => (
                  <FilterChip key={u} label={u} selected={filters.unis.has(u)} onToggle={() => toggleUni(u)} />
                ))}
              </div>
            </div>
            <div>
              <div className="jpd-filter-grp-lbl">入讀機會 · Probability</div>
              <div className="jpd-chips">
                {ALL_PROB_LEVELS.map(p => (
                  <FilterChip key={p} label={`${PROB_CONFIG[p].label} ${PROB_CONFIG[p].en}`} selected={filters.probs.has(p)} onToggle={() => toggleProb(p)} />
                ))}
              </div>
            </div>
            <div>
              <div className="jpd-filter-grp-lbl">學科範疇 · Field of Study</div>
              <div className="jpd-chips">
                {fieldOptions.length === 0 && <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>搜尋後可篩選</span>}
                {fieldOptions.map(f => (
                  <FilterChip key={f} label={f} selected={filters.fields.has(f)} onToggle={() => toggleField(f)} />
                ))}
              </div>
            </div>
            <div>
              <div className="jpd-filter-grp-lbl">參考年度 · Cutoff Year</div>
              <div className="jpd-chips">
                {[2023, 2024, 2025].map(y => (
                  <FilterChip
                    key={y}
                    label={String(y)}
                    selected={form.year === y}
                    onToggle={() => setForm(f => ({ ...f, year: y as 2023 | 2024 | 2025 }))}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>

      <div className="jpd-search-foot">
        <Button
          variant="default"
          size="md"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          <LuSearch size={14} strokeWidth={3} style={{ marginLeft: '0.2rem', marginTop: '0.1rem' }} /> {submitLabel}
        </Button>
      </div>

      {errors.length > 0 && (
        <div className="jpd-search-errs">
          <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}
      {errorBanner && (
        <div className="jpd-search-errs">{errorBanner}</div>
      )}
    </div>
  );
}
