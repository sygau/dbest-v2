import { useState } from 'react'
import { LuChevronDown, LuSearch, LuList, LuMap } from 'react-icons/lu'
import { TYPE_META, REGION_META, type SpotType, type SpotRegion } from '../../lib/studySpots'

export type AmenityKey = 'wifi' | 'power' | 'study' | 'nopurchase'

export interface SpotFilterState {
  search: string
  types: Set<SpotType>
  regions: Set<SpotRegion>
  amenities: Set<AmenityKey>
  nearMe: boolean
}

export const EMPTY_FILTERS: SpotFilterState = {
  search: '',
  types: new Set(),
  regions: new Set(),
  amenities: new Set(),
  nearMe: false,
}

const AMENITY_LABELS: Record<AmenityKey, string> = {
  wifi: '免費 Wi-Fi',
  power: '有插座 Power outlets',
  study: '有自修室 Study room',
  nopurchase: '免消費 No purchase needed',
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '5px 12px',
        borderRadius: '13px',
        border: active ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
        background: active ? 'var(--color-primary)' : 'transparent',
        color: active ? '#fff' : 'var(--color-body)',
        fontSize: '0.78rem',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

export default function SpotFilters({
  filters,
  onChange,
  resultCount,
  view,
  onViewChange,
  nearMeStatus = 'idle',
}: {
  filters: SpotFilterState
  onChange: (f: SpotFilterState) => void
  resultCount: number
  view: 'list' | 'map'
  onViewChange: (v: 'list' | 'map') => void
  nearMeStatus?: 'idle' | 'locating' | 'error'
}) {
  const [open, setOpen] = useState(false)

  function toggle<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set)
    next.has(val) ? next.delete(val) : next.add(val)
    return next
  }

  const activeCount = filters.types.size + filters.regions.size + filters.amenities.size
  const grpLabel: React.CSSProperties = {
    fontSize: '0.73rem',
    fontWeight: 700,
    color: 'var(--color-body)',
    marginBottom: '7px',
  }

  return (
    <div
      style={{
        background: 'var(--color-card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '14px',
        marginBottom: '22px',
      }}
    >
      {/* Search + view toggle */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 220px' }}>
          <LuSearch
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="搜尋地點、地區、港鐵站… Search"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card-bg)',
              color: 'var(--color-body)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          {(['list', 'map'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onViewChange(v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                border: 'none',
                background: view === v ? 'var(--color-primary)' : 'transparent',
                color: view === v ? '#fff' : 'var(--color-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {v === 'list' ? <LuList size={15} /> : <LuMap size={15} />}
              {v === 'list' ? '列表' : '地圖'}
            </button>
          ))}
        </div>
      </div>

      {/* Filter toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '12px',
          padding: '8px 2px 0',
          border: 'none',
          background: 'transparent',
          color: 'var(--color-body)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span>
          篩選 Filters{activeCount > 0 ? ` (${activeCount})` : ''} ·{' '}
          <span style={{ color: 'var(--color-muted)', fontWeight: 500 }}>{resultCount} 個地點</span>
        </span>
        <LuChevronDown
          size={16}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        />
      </button>

      {open && (
        <div
          style={{
            marginTop: '12px',
            paddingTop: '14px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <div style={grpLabel}>附近 · Near Me</div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
                color: 'var(--color-body)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={filters.nearMe}
                onChange={() => onChange({ ...filters, nearMe: !filters.nearMe })}
                style={{ width: '15px', height: '15px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
              />
              按距離排序（最近優先）Sort by distance
            </label>
            {nearMeStatus === 'locating' && (
              <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)', marginTop: '5px' }}>
                定位中… Locating…
              </div>
            )}
            {nearMeStatus === 'error' && (
              <div style={{ fontSize: '0.76rem', color: '#dc2626', marginTop: '5px' }}>
                無法取得位置。請允許瀏覽器定位權限。
              </div>
            )}
          </div>

          <div>
            <div style={grpLabel}>類型 · Type</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(Object.keys(TYPE_META) as SpotType[]).map((t) => (
                <Chip
                  key={t}
                  label={`${TYPE_META[t].label} ${TYPE_META[t].en}`}
                  active={filters.types.has(t)}
                  onClick={() => onChange({ ...filters, types: toggle(filters.types, t) })}
                />
              ))}
            </div>
          </div>

          <div>
            <div style={grpLabel}>地區 · Region</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(Object.keys(REGION_META) as SpotRegion[]).map((r) => (
                <Chip
                  key={r}
                  label={`${REGION_META[r].label} ${REGION_META[r].en}`}
                  active={filters.regions.has(r)}
                  onClick={() => onChange({ ...filters, regions: toggle(filters.regions, r) })}
                />
              ))}
            </div>
          </div>

          <div>
            <div style={grpLabel}>設施 · Amenities</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {(Object.keys(AMENITY_LABELS) as AmenityKey[]).map((a) => (
                <label
                  key={a}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.84rem',
                    color: 'var(--color-body)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.has(a)}
                    onChange={() => onChange({ ...filters, amenities: toggle(filters.amenities, a) })}
                    style={{ width: '15px', height: '15px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                  />
                  {AMENITY_LABELS[a]}
                </label>
              ))}
            </div>
          </div>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, types: new Set(), regions: new Set(), amenities: new Set() })}
              style={{
                alignSelf: 'flex-start',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              清除篩選 Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
