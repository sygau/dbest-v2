import Link from 'next/link'
import * as LuIcons from 'react-icons/lu'
import type { SectionMeta, SetFile } from '../../lib/vocab'
import { DIFFICULTY_META } from '../../lib/vocab'

interface Props {
  section: SectionMeta
  set: SetFile
  width?: number
  hideDifficulty?: boolean
  hideDescription?: boolean
  hideCount?: boolean
}

export default function SetCapsule({ section, set, width, hideDifficulty = true, hideDescription, hideCount = true }: Props) {
  const diff = DIFFICULTY_META[set.difficulty]
  const bgStyle: React.CSSProperties = set.thumbnail
    ? { backgroundImage: `url(${set.thumbnail})` }
    : { background: `linear-gradient(135deg, ${section.accent}66 0%, ${section.accent}22 100%)` }
  const linkStyle: React.CSSProperties = width ? { width } : {}
  const FallbackIcon = !set.thumbnail
    ? (LuIcons as Record<string, React.ComponentType<{ size?: number }>>)[section.icon] ?? LuIcons.LuBookOpen
    : null
  return (
    <Link
      href={`/vocab/${section.slug}/${set.slug}`}
      className="vocab-set-capsule"
      style={linkStyle}
    >
      <div className="vocab-set-capsule__bg" style={bgStyle} />
      {FallbackIcon && (
        <div className="vocab-set-capsule__fallback-icon" style={{ color: '#ffffffcc' }}>
          <FallbackIcon size={56} />
        </div>
      )}
      <div className="vocab-set-capsule__veil" />
      <div className="vocab-set-capsule__body">
        <div className="vocab-set-capsule__title">
          {set.nameZh} <span className="vocab-set-capsule__title-en">{set.nameEn}</span>
        </div>
        {!hideDescription && set.description && (
          <div className="vocab-set-capsule__desc">{set.description}</div>
        )}
      </div>
      {!hideCount && (
        <div className="vocab-set-capsule__count">{set.entries.length} 個詞條</div>
      )}
      {!hideDifficulty && (
        <div className="vocab-set-capsule__diff" style={{ background: diff.color }}>
          {diff.short}
        </div>
      )}
    </Link>
  )
}
