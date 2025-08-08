import Link from 'next/link'
import { ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'

export type SubjectCardProps = {
  title: string
  href: string
  icon: ReactNode
  accent: string
  details: { label: string; value: string }[]
}

const asChip = (label: string, value: string, accent?: string) => (
  <span
    key={`${label}-${value}`}
    style={{
      fontSize: 12,
      padding: '4px 8px',
      borderRadius: 999,
      background: accent ? `${accent}22` : 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.18)',
      marginRight: 8,
      marginBottom: 6,
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center'
    }}
  >
    <span style={{ opacity: 0.75 }}>{label}:</span>
    <span>{value}</span>
  </span>
)

const renderDetailsInline = (
  details: { label: string; value: string }[],
  options?: { align?: 'left' | 'center'; separator?: string; opacity?: number }
) => {
  const align = options?.align || 'left'
  const separator = options?.separator || ' · '
  const opacity = options?.opacity ?? 0.85
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      alignItems: 'center',
      fontSize: 13,
      opacity
    }}>
      {details.map((d, i) => (
        <span key={`${d.label}-${i}`}>
          <strong style={{ opacity: 0.85 }}>{d.label}:</strong> {d.value}
          {i < details.length - 1 && <span style={{ opacity: 0.6 }}>{separator}</span>}
        </span>
      ))}
    </div>
  )
}

// Unified card: English centered layout + Chemistry mesh background
export function UnifiedSubjectCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.15 }} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
        {/* Mesh background overlay (Chemistry style) */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(600px circle at 0% 0%, ${accent}22, transparent 40%), radial-gradient(600px circle at 100% 100%, #00d4ff22, transparent 40%)` }} />
        {/* Card body with subtle accent border (English style) */}
        <div style={{ position: 'relative', padding: 18, border: `1px solid ${accent}44`, boxShadow: '0 0 0 1px rgba(255,255,255,0.12) inset, 0 12px 30px rgba(0,0,0,0.20)', borderRadius: 16, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))' }}>
          <div style={{ display: 'grid', placeItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, display: 'grid', placeItems: 'center', background: '#ffffff14', border: '1px solid #ffffff24' }}>{icon}</div>
            <h2 style={{ fontSize: '1.15rem', margin: 0, textAlign: 'center' }}>{title}</h2>
          </div>
          {renderDetailsInline(details, { align: 'center', separator: ' • ' })}
          <div style={{ marginTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 10, display: 'flex', justifyContent: 'center', fontSize: 13 }}>
            <span style={{ opacity: 0.85 }}>查看</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Variant 1: GlassTilt (stacked, default) — UPDATED: inline details left
export function GlassTiltCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        style={{
          borderRadius: 16,
          padding: 20,
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, display: 'grid', placeItems: 'center', borderRadius: 12, background: `linear-gradient(135deg, ${accent}33, ${accent}70)`, border: '1px solid rgba(255,255,255,0.18)' }}>{icon}</div>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{title}</h2>
        </div>
        {renderDetailsInline(details, { align: 'left', separator: ' · ' })}
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13, opacity: 0.85 }}>查看</div>
      </motion.div>
    </Link>
  )
}

// Variant 2: GradientBorder (English) — centered layout + inline separators + slight accent border
export function GradientBorderCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.15 }} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `conic-gradient(from 180deg at 50% 50%, ${accent}, transparent 60%)`, filter: 'blur(14px)', opacity: 0.45 }} />
        <div style={{ position: 'relative', padding: 18, border: `1px solid ${accent}44`, boxShadow: '0 0 0 1px rgba(255,255,255,0.12) inset, 0 12px 30px rgba(0,0,0,0.20)', borderRadius: 16, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))' }}>
          <div style={{ display: 'grid', placeItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, display: 'grid', placeItems: 'center', background: '#ffffff12', border: '1px solid #ffffff22' }}>{icon}</div>
            <h2 style={{ fontSize: '1.15rem', margin: 0, textAlign: 'center' }}>{title}</h2>
          </div>
          {renderDetailsInline(details, { align: 'center', separator: ' • ' })}
          <div style={{ marginTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 10, display: 'flex', justifyContent: 'center', fontSize: 13 }}>
            <span style={{ opacity: 0.85 }}>查看</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Variant 3: HoloSheen — inline details left
export function HoloSheenCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ rotate: -0.25, y: -3 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        style={{ position: 'relative', borderRadius: 16, padding: 20, minHeight: 220, border: '1px solid rgba(255,255,255,0.14)', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))' }}>
        <div style={{ position: 'absolute', right: -16, top: -16, fontSize: 96, opacity: 0.07 }}>{icon}</div>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(120deg, transparent 30%, ${accent}24 45%, transparent 65%)` }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{title}</h2>
          {renderDetailsInline(details, { align: 'left', separator: ' • ' })}
          <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, padding: '6px 10px', borderRadius: 999, background: `${accent}25`, border: '1px solid rgba(255,255,255,0.18)' }}>查看 <span>↗</span></div>
        </div>
      </motion.div>
    </Link>
  )
}

// Variant 4: Neumorph — inline details left
export function NeumorphCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}
        style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 14, alignItems: 'center', borderRadius: 16, padding: 20, minHeight: 180, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.04))', boxShadow: '10px 10px 24px rgba(0,0,0,0.35), -10px -10px 24px rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, display: 'grid', placeItems: 'center', background: `${accent}22`, border: '1px solid #ffffff26' }}>{icon}</div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <h2 style={{ fontSize: '1.15rem', margin: 0 }}>{title}</h2>
            <span style={{ fontSize: 12, opacity: 0.8, padding: '4px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>查看</span>
          </div>
          {renderDetailsInline(details, { align: 'left', separator: ' | ' })}
        </div>
      </motion.div>
    </Link>
  )
}

// Variant 5: MeshGradient — inline details centered
export function MeshGradientCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.15 }} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(600px circle at 0% 0%, ${accent}25, transparent 40%), radial-gradient(600px circle at 100% 100%, #00d4ff25, transparent 40%)` }} />
        <div style={{ position: 'relative', padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#ffffff10', border: '1px solid #ffffff22' }}>{icon}</div>
            <h2 style={{ fontSize: '1.15rem', margin: 0 }}>{title}</h2>
          </div>
          <div style={{ marginTop: 8 }}>
            {renderDetailsInline(details, { align: 'center', separator: ' • ' })}
          </div>
          <div style={{ position: 'absolute', right: 14, bottom: 14, width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `${accent}30`, border: '1px solid rgba(255,255,255,0.18)' }}>→</div>
        </div>
      </motion.div>
    </Link>
  )
}

// Variant 6: AuroraGlow — inline details centered
export function AuroraGlowCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: -1, background: `linear-gradient(90deg, ${accent}33, transparent 40%, #00ffa833)` }} />
        <div style={{ position: 'relative', padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, display: 'grid', placeItems: 'center', background: `${accent}1f`, border: '1px solid #ffffff22' }}>{icon}</div>
            <h2 style={{ fontSize: '1.1rem', margin: 0, textAlign: 'right' }}>{title}</h2>
          </div>
          <div style={{ marginTop: 10 }}>
            {renderDetailsInline(details, { align: 'center', separator: ' · ' })}
          </div>
          <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85, textDecoration: 'underline', textUnderlineOffset: 4 }}>查看詳情</div>
        </div>
      </motion.div>
    </Link>
  )
}

// Variant 7: DiagonalGlass (ICT) — left-aligned inline separators
export function DiagonalGlassCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ rotate: 0.2, y: -2 }} transition={{ duration: 0.15 }} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accent}26 0%, transparent 55%)` }} />
        <div style={{ position: 'relative', padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', background: '#ffffff10', border: '1px solid #ffffff22' }}>{icon}</div>
            <h2 style={{ fontSize: '1.15rem', margin: 0 }}>{title}</h2>
          </div>
          <div style={{ marginTop: 10 }}>
            {renderDetailsInline(details, { align: 'left', separator: ' | ' })}
          </div>
          <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 10, border: '1px dashed rgba(255,255,255,0.2)', textAlign: 'center', fontSize: 13, opacity: 0.9 }}>立即查看</div>
        </div>
      </motion.div>
    </Link>
  )
}

// Variant 8: OutlineGlow — inline details left
export function OutlineGlowCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.16 }} style={{ position: 'relative', borderRadius: 16, padding: 18, border: `1px solid ${accent}66`, boxShadow: `0 0 0 1px ${accent}33 inset, 0 10px 26px ${accent}22`, background: 'rgba(255,255,255,0.05)', minHeight: 200 }}>
        <div style={{ position: 'absolute', top: 12, left: -6, width: 6, height: 40, borderRadius: 3, background: accent, opacity: 0.6 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `${accent}22`, border: `1px solid ${accent}55` }}>{icon}</div>
          <h2 style={{ fontSize: '1.15rem', margin: 0 }}>{title}</h2>
        </div>
        <div style={{ marginTop: 8 }}>
          {renderDetailsInline(details, { align: 'left', separator: ' | ' })}
        </div>
        <div style={{ position: 'absolute', right: 14, bottom: 12, fontSize: 13, opacity: 0.9 }}>→</div>
      </motion.div>
    </Link>
  )
}

// Variant 9: SpotlightHover (M2) — centered icon, bottom bar inline details, arrow CTA
export function SpotlightHoverCard({ title, href, icon, accent, details }: SubjectCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div
        ref={ref as any}
        onMouseMove={e => {
          const el = ref.current
          if (!el) return
          const r = el.getBoundingClientRect()
          el.style.setProperty('--mx', `${e.clientX - r.left}px`)
          el.style.setProperty('--my', `${e.clientY - r.top}px`)
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.15 }}
        style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(380px circle at var(--mx,50%) var(--my,50%), ${accent}33, transparent 60%)` }} />
        <div style={{ position: 'relative', padding: 18, display: 'grid', placeItems: 'center', gap: 8 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', background: '#ffffff10', border: '1px solid #ffffff22' }}>{icon}</div>
          <h2 style={{ fontSize: '1.1rem', margin: 0, textAlign: 'center' }}>{title}</h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {renderDetailsInline(details, { align: 'left', separator: ' • ' })}
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 14, opacity: 0.9 }}>→</div>
        </div>
      </motion.div>
    </Link>
  )} 