import { LuExternalLink } from 'react-icons/lu'
import type { Entry } from '../../lib/vocab'
import { buildDictionaryUrl } from '../../lib/vocab'

interface Props {
  entry: Entry
  label?: string
}

const PROVIDER_LABEL: Record<string, string> = {
  cambridge: 'Cambridge',
  oxford: 'Oxford',
  'merriam-webster': 'Merriam-Webster',
  collins: 'Collins',
  custom: 'Dictionary',
}

export default function DictionaryLink({ entry, label }: Props) {
  const url = buildDictionaryUrl(entry)
  const provider = entry.dictionary?.provider ?? 'cambridge'
  const text = label ?? `${PROVIDER_LABEL[provider] ?? 'Dictionary'} 字典`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="vocab-dict-link"
      onClick={(e) => e.stopPropagation()}
    >
      <span>{text}</span>
      <LuExternalLink size={13} />
    </a>
  )
}
