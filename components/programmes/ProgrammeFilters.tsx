import { useState } from 'react'
import { LuChevronDown, LuSettings2 } from 'react-icons/lu'
import { CALC_MODES, SUBJECT_META, DIFFICULTY_META, type CalcModel, type Difficulty, type Subject } from '../../lib/programmes'

export interface ProgFilterState {
  subject: Subject | 'all'
  model: CalcModel | 'all'
  difficulty: Difficulty | 'all'
  maxBytes: number
}

export const EMPTY_PROG_FILTERS: ProgFilterState = {
  subject: 'all',
  model: 'all',
  difficulty: 'all',
  maxBytes: 680,
}

const SUBJECTS: (Subject | 'all')[] = ['all', 'core', 'm1', 'm2', 'physics', 'chemistry', 'biology']
const DIFFS: (Difficulty | 'all')[] = ['all', 'essential', 'common', 'advanced']

export default function ProgrammeFilters({
  filters,
  onChange,
}: {
  filters: ProgFilterState
  onChange: (f: ProgFilterState) => void
}) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  function patch(p: Partial<ProgFilterState>) {
    onChange({ ...filters, ...p })
  }

  const advancedActive = filters.difficulty !== 'all' || filters.maxBytes < 680

  return (
    <div
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        margin: '0 0 18px',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '14px 16px', display: 'grid', gap: '14px' }}>
      <div>
        <div style={labelStyle}>科目 Subject</div>
        <div style={chipRow}>
          {SUBJECTS.map((s) => {
            const active = filters.subject === s
            const label = s === 'all' ? '全部 All' : `${SUBJECT_META[s].label} ${SUBJECT_META[s].en}`
            const color = s === 'all' ? '#549ee8' : SUBJECT_META[s].color
            return (
              <button key={s} type="button" onClick={() => patch({ subject: s })} style={chipStyle(active, color)}>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <div style={labelStyle}>計算機 Calculator</div>
        <div style={chipRow}>
          <button type="button" onClick={() => patch({ model: 'all' })} style={chipStyle(filters.model === 'all', '#549ee8')}>
            全部 All
          </button>
          {CALC_MODES.map((m) => (
            <button key={m} type="button" onClick={() => patch({ model: m })} style={chipStyle(filters.model === m, '#7c5ce7')}>
              {m}
            </button>
          ))}
        </div>
      </div>

      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px 16px',
          background: 'var(--color-card-inner-bg)',
          border: 0,
          borderTop: '1px solid var(--color-border)',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--color-body)',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <LuSettings2 size={15} />
        <span>進階篩選 Advanced filters</span>
        {advancedActive && (
          <span
            style={{
              background: '#549ee8',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '1px 6px',
              borderRadius: '3px',
            }}
          >
            active
          </span>
        )}
        <LuChevronDown
          size={16}
          style={{ marginLeft: 'auto', transform: showAdvanced ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </button>

      {showAdvanced && (
        <div style={{ padding: '14px 16px', display: 'grid', gap: '14px', borderTop: '1px solid var(--color-border)' }}>
          <div>
            <div style={labelStyle}>難度 Difficulty</div>
            <div style={chipRow}>
              {DIFFS.map((d) => {
                const active = filters.difficulty === d
                const label = d === 'all' ? '全部 All' : DIFFICULTY_META[d].label
                const color = d === 'all' ? '#549ee8' : DIFFICULTY_META[d].color
                return (
                  <button key={d} type="button" onClick={() => patch({ difficulty: d })} style={chipStyle(active, color)}>
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div style={labelStyle}>
              最大容量 Max bytes: <strong style={{ color: 'var(--color-heading)' }}>{filters.maxBytes}</strong>
            </div>
            <input
              type="range"
              min={50}
              max={680}
              step={10}
              value={filters.maxBytes}
              onChange={(e) => patch({ maxBytes: parseInt(e.target.value, 10) })}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-muted)' }}>
              <span>50</span>
              <span>360 (fx-3650P limit)</span>
              <span>680 (fx-50FH limit)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: 700,
  color: 'var(--color-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '8px',
}

const chipRow: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
}

function chipStyle(active: boolean, color: string): React.CSSProperties {
  return {
    padding: '5px 11px',
    fontSize: '0.82rem',
    fontWeight: 600,
    border: `1px solid ${active ? color : 'var(--color-border)'}`,
    background: active ? color : 'var(--color-card-bg)',
    color: active ? '#fff' : 'var(--color-body)',
    borderRadius: '4px',
    cursor: 'pointer',
  }
}
