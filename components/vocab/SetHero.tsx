import Link from 'next/link'
import { LuChevronLeft } from 'react-icons/lu'
import type { SectionMeta, SetFile } from '../../lib/vocab'
import { DIFFICULTY_META } from '../../lib/vocab'
import BookmarkButton from './BookmarkButton'
import ShareButton from './ShareButton'

interface Props {
  section: SectionMeta
  set: SetFile
  bookmarked: boolean
  onToggleBookmark: () => void
  rightSlot?: React.ReactNode
}

export default function SetHero({ section, set, bookmarked, onToggleBookmark, rightSlot }: Props) {
  const diff = DIFFICULTY_META[set.difficulty]
  const bg = set.backdrop ?? set.thumbnail
  const bgStyle: React.CSSProperties = bg
    ? { backgroundImage: `url(${bg})` }
    : { background: `linear-gradient(135deg, ${section.accent}55 0%, ${section.accent}11 80%)` }
  return (
    <div className="vocab-hero">
      <div className="vocab-hero__bg" style={bgStyle} />
      <div className="vocab-hero__veil" />
      <div className="vocab-hero__content">
        <div className="vocab-hero__top">
          <Link href={`/vocab/${section.slug}`} className="vocab-hero__back" style={{ marginBottom: 0 }}>
            <LuChevronLeft size={16} /> {section.nameZh}
          </Link>
          <div className="vocab-hero__top-right">
            {rightSlot}
            <BookmarkButton
              active={bookmarked}
              onToggle={onToggleBookmark}
              ariaLabel={`Bookmark set ${set.nameEn}`}
              size={18}
            />
            <ShareButton title={`${set.nameZh} ${set.nameEn}`} text={set.description ?? set.nameEn} />
          </div>
        </div>
        <h1>{set.nameZh}</h1>
        <div className="vocab-hero__sub">{set.nameEn}</div>
        {set.description && <p className="vocab-hero__desc">{set.description}</p>}
        <div className="vocab-hero__meta">
          <span className="vocab-hero__chip" style={{ background: diff.color }}>
            {diff.label}
          </span>
          <span className="vocab-hero__chip vocab-hero__chip--ghost">
            {set.entries.length} 個詞條
          </span>
          {set.tags?.map((t) => (
            <span key={t} className="vocab-hero__chip vocab-hero__chip--ghost">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
