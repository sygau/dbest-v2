import { LuBookmark, LuBookmarkCheck } from 'react-icons/lu'

interface Props {
  active: boolean
  onToggle: () => void
  size?: number
  ariaLabel?: string
}

export default function BookmarkButton({ active, onToggle, size = 18, ariaLabel = 'Bookmark' }: Props) {
  const handle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onToggle()
  }
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`vocab-bookmark-btn${active ? ' is-active' : ''}`}
      onClick={handle}
    >
      {active ? <LuBookmarkCheck size={size} /> : <LuBookmark size={size} />}
    </button>
  )
}
