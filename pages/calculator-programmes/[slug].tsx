import { useState } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LuArrowLeft, LuExternalLink, LuTriangleAlert, LuChevronDown } from 'react-icons/lu'
import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import TokenGrid from '../../components/programmes/TokenGrid'
import InlineCode from '../../components/programmes/InlineCode'
import SetupBlock from '../../components/programmes/SetupBlock'
import DisplayOrder from '../../components/programmes/DisplayOrder'
import ExampleWalkthrough from '../../components/programmes/ExampleWalkthrough'
import ProgrammeCard from '../../components/programmes/ProgrammeCard'
import { Button } from '../../components/ui/Button'
import { SUBJECT_META, DIFFICULTY_META, maxBytesForModels, type Programme } from '../../lib/programmes'
import rawProgrammes from '../../data/programmes.json'

interface Props {
  programme: Programme
  related: Programme[]
}

export default function ProgrammeDetailPage({ programme: p, related }: Props) {
  const router = useRouter()
  const [view, setView] = useState<'grid' | 'inline'>('grid')
  const [showVariants, setShowVariants] = useState(false)
  const diff = DIFFICULTY_META[p.difficulty]
  const cap = maxBytesForModels(p.models)
  const pct = Math.min(100, Math.round((p.bytes / cap) * 100))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: p.title,
    description: p.description,
    step: [
      ...p.setup.enterPrgm.map((k, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: `Press ${k}`,
        text: `Press ${k} to enter PRGM mode.`,
      })),
      ...p.displays.map((d) => ({
        '@type': 'HowToStep',
        position: d.order + p.setup.enterPrgm.length,
        name: d.label,
        text: d.meaning,
      })),
    ],
  }

  return (
    <>
      <PageSEO
        title={`${p.titleZh}（${p.title}）Casio 程式 | DSE 數學 | dse.best`}
        description={`${p.descriptionZh} ${p.description.slice(0, 120)}`}
        ogTitle={`${p.titleZh} — HKDSE Casio Calculator Programme`}
        ogDescription={`${p.descriptionZh} ${p.description.slice(0, 160)}`}
        ogUrl={`https://dse.best/calculator-programmes/${p.slug}`}
        canonical={`https://dse.best/calculator-programmes/${p.slug}`}
        jsonLd={[jsonLd]}
      />

      <PageBreadcrumb section="資源" text={p.title} />

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 12px 60px' }}>
        <Link
          href="/calculator-programmes"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-muted)',
            fontSize: '0.88rem',
            textDecoration: 'none',
            marginBottom: '14px',
          }}
        >
          <LuArrowLeft size={14} /> 返回程式庫 (all programmes)
        </Link>

        <header
          style={{
            padding: '24px 22px',
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {p.subjects.map((s) => {
              const meta = SUBJECT_META[s]
              return (
                <span
                  key={s}
                  style={{
                    background: meta.color,
                    color: '#fff',
                    padding: '3px 9px',
                    borderRadius: '3px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  {meta.en} {meta.label}
                </span>
              )
            })}
            <span
              style={{
                background: diff.color,
                color: '#fff',
                padding: '3px 9px',
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontWeight: 700,
              }}
            >
              {diff.label}
            </span>
          </div>

          <h1 style={{ margin: '0 0 4px', fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-heading)', lineHeight: 1.2 }}>
            {p.titleZh ?? p.title}
          </h1>
          {p.titleZh && (
            <div style={{ fontSize: '1.05rem', color: 'var(--color-muted)', marginBottom: '12px', fontWeight: 600 }}>
              {p.title}
            </div>
          )}

          {p.descriptionZh && (
            <p style={{ fontSize: '1rem', color: 'var(--color-body)', lineHeight: 1.6, margin: '12px 0 4px' }}>
              {p.descriptionZh}
            </p>
          )}
          <p style={{ fontSize: '0.94rem', color: 'var(--color-muted)', lineHeight: 1.6, margin: p.descriptionZh ? '0' : '12px 0 0' }}>
            {p.description}
          </p>
          {p.formula && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 12px',
                background: 'var(--color-card-inner-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '5px',
                fontFamily: 'monospace',
                fontSize: '0.92rem',
                color: 'var(--color-body)',
              }}
            >
              {p.formula}
            </div>
          )}

          <div
            style={{
              marginTop: '18px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
            }}
          >
            <Stat label="容量 (bytes)" value={`${p.bytes} / ${cap}`} sub={`${pct}% 已用`} />
            <Stat label="Token 數量" value={`${p.tokens.length}`} />
            <Stat label="輸入項數 (inputs)" value={`${p.inputs.length}`} />
            <Stat label="顯示步驟 ◢" value={`${p.displays.length} ×`} />
          </div>

          <div style={{ marginTop: '14px' }}>
            <div style={miniLabel}>適用型號 (Supported models)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {p.models.map((m) => (
                <span
                  key={m}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    background: 'var(--color-card-inner-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    color: 'var(--color-body)',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </header>

        <Section title="1. 入機設定 Setup">
          <SetupBlock setup={p.setup} />
        </Section>

        <Section title="2. 程式碼 Programme code">
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            <ViewToggle active={view === 'grid'} onClick={() => setView('grid')} label="逐格 (token grid)" />
            <ViewToggle active={view === 'inline'} onClick={() => setView('inline')} label="連續 (inline)" />
          </div>
          {view === 'grid' ? <TokenGrid tokens={p.tokens} /> : <InlineCode tokens={p.tokens} bytes={p.bytes} />}
        </Section>

        <Section title="3. 輸入次序 Inputs">
          <ol style={{ padding: '0 0 0 20px', margin: 0 }}>
            {p.inputs.map((i, idx) => (
              <li key={idx} style={{ marginBottom: '8px', fontSize: '0.94rem', color: 'var(--color-body)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--color-heading)', fontFamily: 'monospace' }}>{i.label}</strong>
                {i.labelZh && <span style={{ color: 'var(--color-muted)' }}> ({i.labelZh})</span>}
                {' — '}
                {i.description}
                <span style={{ marginLeft: '8px', color: 'var(--color-muted)', fontSize: '0.88rem' }}>
                  例 e.g.{' '}
                  <code
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.88rem',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: 'var(--color-card-inner-bg)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-heading)',
                    }}
                  >
                    {i.example}
                  </code>
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="4. 顯示順序 Display order">
          <DisplayOrder displays={p.displays} />
        </Section>

        <Section title="5. 例題 Worked examples">
          <ExampleWalkthrough examples={p.examples} />
        </Section>

        {p.dseRelevance && (
          <Section title="6. DSE 出題關聯 Relevance to HKDSE">
            <div
              style={{
                padding: '14px 16px',
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid #549ee8',
                borderRadius: '6px',
                display: 'grid',
                gap: '12px',
              }}
            >
              <div>
                <div style={miniLabel}>常考題型 (Common patterns)</div>
                <ul style={{ margin: '4px 0 0 18px', padding: 0, color: 'var(--color-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {p.dseRelevance.paperHints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={miniLabel}>相關課題 (Related topics)</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '4px' }}>
                  {p.dseRelevance.topics.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '3px 9px',
                        background: 'var(--color-card-inner-bg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        color: 'var(--color-body)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {p.dseRelevance.notes && (
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-body)', lineHeight: 1.6 }}>
                  {p.dseRelevance.notes}
                </p>
              )}
            </div>
          </Section>
        )}

        {p.variants && p.variants.length > 0 && (
          <Section title="型號特定版本 Model-specific variants">
            <button
              type="button"
              onClick={() => setShowVariants((v) => !v)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-card-bg)',
                borderRadius: '5px',
                cursor: 'pointer',
                color: 'var(--color-body)',
                fontWeight: 600,
              }}
            >
              <LuChevronDown size={14} style={{ transform: showVariants ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              {showVariants ? '隱藏版本 (hide)' : `顯示 ${p.variants.length} 個版本 (show variants)`}
            </button>
            {showVariants && (
              <div style={{ marginTop: '14px', display: 'grid', gap: '14px' }}>
                {p.variants.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      background: 'var(--color-card-bg)',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: '4px' }}>
                      {v.models.join(', ')} — {v.bytes} bytes
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--color-body)', marginBottom: '10px' }}>{v.note}</div>
                    <InlineCode tokens={v.tokens} bytes={v.bytes} />
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {p.errors && p.errors.length > 0 && (
          <Section title="常見錯誤 Common errors">
            <div style={{ display: 'grid', gap: '10px' }}>
              {p.errors.map((e, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px 14px',
                    background: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border)',
                    borderLeft: '4px solid #dc2626',
                    borderRadius: '5px',
                  }}
                >
                  <LuTriangleAlert size={18} style={{ color: '#dc2626', flexShrink: 0, marginTop: '1px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-heading)', fontFamily: 'monospace', fontSize: '0.92rem' }}>
                      {e.trigger}
                    </div>
                    <div style={{ marginTop: '2px', fontSize: '0.88rem', color: 'var(--color-body)' }}>{e.meaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="出處 Sources">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '6px' }}>
            {p.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#549ee8',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                  }}
                >
                  {s.label} <LuExternalLink size={12} />
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {related.length > 0 && (
          <Section title="相關程式 Related programmes">
            <div className="related-grid">
              {related.map((r) => (
                <ProgrammeCard key={r.slug} p={r} />
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>
              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push('/calculator-programmes')}
              >
                返回程式庫 Back to programme library
              </Button>
            </div>
          </Section>
        )}
      </div>

      <style jsx>{`
        .related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 600px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 992px) {
          .related-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', margin: '0 0 14px' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div
      style={{
        padding: '10px 12px',
        background: 'var(--color-card-inner-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: '5px',
      }}
    >
      <div style={miniLabel}>{label}</div>
      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-heading)' }}>{value}</div>
      {sub && <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: '1px' }}>{sub}</div>}
    </div>
  )
}

function ViewToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 14px',
        fontSize: '0.85rem',
        fontWeight: 600,
        border: '1px solid var(--color-border)',
        background: active ? '#549ee8' : 'var(--color-card-bg)',
        color: active ? '#fff' : 'var(--color-body)',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

const miniLabel: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  color: 'var(--color-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '4px',
}

export const getStaticPaths: GetStaticPaths = async () => {
  const list = rawProgrammes as unknown as Programme[]
  return {
    paths: list.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const list = rawProgrammes as unknown as Programme[]
  const programme = list.find((p) => p.slug === params?.slug)
  if (!programme) return { notFound: true }

  const related = list
    .filter((p) => p.slug !== programme.slug && p.subjects.some((s) => programme.subjects.includes(s)))
    .slice(0, 3)

  return { props: { programme, related } }
}
