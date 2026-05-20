import Link from 'next/link'
import * as LuIcons from 'react-icons/lu'
import type { SectionMeta } from '../../lib/vocab'

interface Props {
  section: SectionMeta
  setCount: number
  entryCount: number
}

export default function SectionCapsule({ section, setCount, entryCount }: Props) {
  const Icon =
    (LuIcons as Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>>)[
      section.icon
    ] ?? LuIcons.LuBookOpen

  const bgStyle: React.CSSProperties = section.capsule
    ? { backgroundImage: `url(${section.capsule})` }
    : { background: `linear-gradient(135deg, ${section.accent}55 0%, ${section.accent}15 100%)` }

  return (
    <Link href={`/vocab/${section.slug}`} className="vocab-section-capsule">
      <div className="vocab-section-capsule__bg" style={bgStyle} />
      <div className="vocab-section-capsule__icon" style={{ color: section.accent }}>
        <Icon size={28} />
      </div>
      <div className="vocab-section-capsule__veil" />
      <div className="vocab-section-capsule__body">
        <div className="vocab-section-capsule__title">{section.nameZh}</div>
        <div className="vocab-section-capsule__sub">{section.nameEn}</div>
        <div className="vocab-section-capsule__count">
          {setCount} 個 set · {entryCount} 個詞條
        </div>
      </div>
    </Link>
  )
}
