import { useState } from 'react'
import type { Entry, Pos } from '../../lib/vocab'
import { entryDisplayTerm, entryExample, entryKindLabel, entrySynonyms, POS_META } from '../../lib/vocab'
import AudioButton from './AudioButton'
import BookmarkButton from './BookmarkButton'
import DictionaryLink from './DictionaryLink'

interface Props {
  entries: Entry[]
  isBookmarked: (id: string) => boolean
  onToggle: (id: string) => void
}

export default function EntryTable({ entries, isBookmarked, onToggle }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <div className="vt">
      <div className="vt__head" role="row">
        <div>詞彙 Term</div>
        <div>中文解釋</div>
        <div>類型 POS</div>
        <div>例句 Example</div>
        <div aria-label="Bookmark" />
      </div>
      <div className="vt__rows">
        {entries.map((e) => {
          const head = entryDisplayTerm(e)
          const ex = entryExample(e)
          const open = openId === e.id
          const posMeta = e.kind === 'vocab' ? POS_META[(e as { pos: Pos }).pos] : null
          const kindLabel = e.kind === 'vocab' ? null : entryKindLabel(e.kind)
          const syns = entrySynonyms(e)
          return (
            <div key={e.id} className={`vt__row${open ? ' is-open' : ''}`}>
              <div
                role="button"
                tabIndex={0}
                className="vt__rowmain"
                onClick={() => setOpenId(open ? null : e.id)}
                onKeyDown={(k) => {
                  if (k.key === 'Enter' || k.key === ' ') {
                    k.preventDefault()
                    setOpenId(open ? null : e.id)
                  }
                }}
              >
                <div className="vt__term">
                  <span>{head}</span>
                  <AudioButton text={e.audio?.word ?? head} lang={e.audio?.lang ?? 'en-US'} size={14} />
                </div>
                <div className="vt__meaning">{e.meaningZh}</div>
                <div className="vt__kind">
                  {posMeta ? (
                    <span
                      className="vt__pos"
                      style={{
                        background: `${posMeta.color}1f`,
                        color: posMeta.color,
                        borderColor: `${posMeta.color}55`,
                      }}
                    >
                      {posMeta.label}
                    </span>
                  ) : (
                    <span className="vt__pos vt__pos--neutral">{kindLabel}</span>
                  )}
                </div>
                <div className="vt__example">{ex ? <em>&ldquo;{ex}&rdquo;</em> : <span className="vt__example--empty">—</span>}</div>
                <div className="vt__bm">
                  <BookmarkButton
                    active={isBookmarked(e.id)}
                    onToggle={() => onToggle(e.id)}
                    ariaLabel={`Bookmark ${head}`}
                    size={15}
                  />
                </div>
              </div>
              {open && (
                <div className="vt__expand">
                  {ex && <div className="vt__ex">&ldquo;{ex}&rdquo;</div>}
                  {syns && syns.length > 0 && (
                    <div className="vt__expand-row">
                      <div className="vt__expand-label">Synonyms</div>
                      <div className="vt__syns">
                        {syns.map((c, i) => (
                          <span key={i}>{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {e.notes && <div className="vt__notes">{e.notes}</div>}
                  <div className="vt__expand-foot">
                    <DictionaryLink entry={e} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
