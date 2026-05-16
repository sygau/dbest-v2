import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { ALL_PROB_LEVELS, ALL_UNIS, PROB_CONFIG, type ProbLevel, type UniDisplay } from './constants';
import { FilterChip } from './parts';
import type { FilterState } from './SearchPanel';

interface ResultsFilterProps {
  filters: FilterState;
  fieldOptions: string[];
  onFiltersChange: (filters: FilterState) => void;
}

export function ResultsFilter({ filters, fieldOptions, onFiltersChange }: ResultsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleUni = (uni: UniDisplay) => {
    const newUnis = new Set(filters.unis);
    if (newUnis.has(uni)) {
      newUnis.delete(uni);
    } else {
      newUnis.add(uni);
    }
    onFiltersChange({ ...filters, unis: newUnis });
  };

  const toggleProb = (prob: ProbLevel) => {
    const newProbs = new Set(filters.probs);
    if (newProbs.has(prob)) {
      newProbs.delete(prob);
    } else {
      newProbs.add(prob);
    }
    onFiltersChange({ ...filters, probs: newProbs });
  };

  const toggleField = (field: string) => {
    const newFields = new Set(filters.fields);
    if (newFields.has(field)) {
      newFields.delete(field);
    } else {
      newFields.add(field);
    }
    onFiltersChange({ ...filters, fields: newFields });
  };

  return (
    <div className="jpd-card jpd-results-filters">
      <button className="jpd-filters-hd" type="button" onClick={() => setIsOpen(v => !v)}>
        <span>篩選條件 <span className="jpd-filters-hd-en">Filters</span></span>
        <LuChevronDown size={16} strokeWidth={2.5} className={`jpd-filters-chevron${isOpen ? ' jpd-filters-chevron-open' : ''}`} />
      </button>
      {isOpen && (
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
        </div>
      )}
    </div>
  );
}
