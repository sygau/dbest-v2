import { LuLayoutGrid, LuTableProperties } from 'react-icons/lu'

export type ViewMode = 'cards' | 'table'

interface Props {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export default function ViewToggle({ value, onChange }: Props) {
  return (
    <div className="vocab-view-toggle" role="tablist" aria-label="View mode">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'cards'}
        className={value === 'cards' ? 'is-active' : ''}
        onClick={() => onChange('cards')}
      >
        <LuLayoutGrid size={15} />
        <span>卡片</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'table'}
        className={value === 'table' ? 'is-active' : ''}
        onClick={() => onChange('table')}
      >
        <LuTableProperties size={15} />
        <span>列表</span>
      </button>
    </div>
  )
}
