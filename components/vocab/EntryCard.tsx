import { useMemo } from 'react'
import type { Entry, Pos } from '../../lib/vocab'
import { entryDisplayTerm, entryExample, entryKindLabel, entrySynonyms, POS_META } from '../../lib/vocab'
import AudioButton from './AudioButton'
import BookmarkButton from './BookmarkButton'
import DictionaryLink from './DictionaryLink'

interface Props {
  entry: Entry
  bookmarked: boolean
  onToggleBookmark: () => void
}

function highlightExample(text: string, headword: string) {
  if (!text || !headword) return text
  const core = headword.replace(/^to\s+/i, '').trim()
  if (!core) return text
  const escaped = core.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`\\b(${escaped}(?:s|es|ed|ing|d)?)\\b`, 'i')
  const m = text.match(re)
  if (!m || m.index === undefined) return text
  return (
    <>
      {text.slice(0, m.index)}
      <mark>{m[0]}</mark>
      {text.slice(m.index + m[0].length)}
    </>
  )
}

export default function EntryCard({ entry, bookmarked, onToggleBookmark }: Props) {
  const headword = entryDisplayTerm(entry)
  const example = entryExample(entry)
  const audioWord = entry.audio?.word ?? headword
  const audioLang = entry.audio?.lang ?? 'en-US'
  const syns = entrySynonyms(entry)
  const highlighted = useMemo(() => (example ? highlightExample(example, headword) : null), [example, headword])

  const posMeta = entry.kind === 'vocab' ? POS_META[(entry as { pos: Pos }).pos] : null
  const kindLabel = entry.kind === 'vocab' ? null : entryKindLabel(entry.kind)

  return (
    <article className="vocab-card">
      <header className="vocab-card__head">
        <div className="vocab-card__term-row">
          <h3 className="vocab-card__term">{headword}</h3>
          <AudioButton text={audioWord} lang={audioLang} size={16} />
        </div>
        <div className="vocab-card__bm">
          <BookmarkButton
            active={bookmarked}
            onToggle={onToggleBookmark}
            ariaLabel={`Bookmark ${headword}`}
            size={17}
          />
        </div>
      </header>

      <div className="vocab-card__meaning">{entry.meaningZh}</div>

      {example && (
        <div className="vocab-card__field">
          <div className="vocab-card__label">Example sentence</div>
          <div className="vocab-card__example">&ldquo;{highlighted}&rdquo;</div>
        </div>
      )}

      {syns && syns.length > 0 && (
        <div className="vocab-card__field">
          <div className="vocab-card__label">Synonyms</div>
          <div className="vocab-card__syns">
            {syns.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {entry.notes && <div className="vocab-card__notes">{entry.notes}</div>}

      <footer className="vocab-card__foot">
        {posMeta ? (
          <span
            className="vocab-card__pos"
            style={{ background: `${posMeta.color}1f`, color: posMeta.color, borderColor: `${posMeta.color}55` }}
          >
            {posMeta.label}
          </span>
        ) : kindLabel ? (
          <span className="vocab-card__pos vocab-card__pos--neutral">{kindLabel}</span>
        ) : (
          <span />
        )}
        <DictionaryLink entry={entry} />
      </footer>
    </article>
  )
}
