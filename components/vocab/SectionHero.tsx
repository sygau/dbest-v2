import Link from 'next/link'
import { LuChevronLeft } from 'react-icons/lu'
import * as LuIcons from 'react-icons/lu'
import type { SectionMeta } from '../../lib/vocab'

interface Props {
  section: SectionMeta
  setCount: number
  entryCount: number
}

export default function SectionHero({ section, setCount, entryCount }: Props) {
  const Icon =
    (LuIcons as Record<string, React.ComponentType<{ size?: number }>>)[section.icon] ?? LuIcons.LuBookOpen
  const bgStyle: React.CSSProperties = section.hero
    ? { backgroundImage: `url(${section.hero})` }
    : { background: `linear-gradient(135deg, ${section.accent}55 0%, ${section.accent}10 80%)` }
  return (
    <div className="vocab-hero">
      <div className="vocab-hero__bg" style={bgStyle} />
      <div className="vocab-hero__veil" />
      <div className="vocab-hero__content">
        <Link href="/vocab" className="vocab-hero__back">
          <LuChevronLeft size={16} /> 詞彙庫
        </Link>
        <div className="vocab-hero__title-row">
          <div style={{ color: section.accent, display: 'flex', alignItems: 'center' }}>
            <Icon size={36} />
          </div>
          <div>
            <h1>{section.nameZh}</h1>
            <div className="vocab-hero__sub">{section.nameEn}</div>
          </div>
        </div>
        {section.description && <p className="vocab-hero__desc">{section.description}</p>}
        <div className="vocab-hero__stats">
          {setCount} 個 set · {entryCount} 個詞條
        </div>
      </div>
    </div>
  )
}
