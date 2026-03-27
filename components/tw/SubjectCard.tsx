import { ReactNode } from 'react'
import NavigationLink from '../NavigationLink'

export interface SubjectCardProps {
  title: string
  href: string
  icon: ReactNode
  accent: string
  details: { label: string; value: string }[]
}

export default function SubjectCard({ title, href, icon, accent, details }: SubjectCardProps) {
  return (
    <NavigationLink href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: '100%' }}>
        {/* Mesh background overlay */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(600px circle at 0% 0%, ${accent}22, transparent 40%), radial-gradient(600px circle at 100% 100%, #00d4ff22, transparent 40%)` }} />
        {/* Card body */}
        <div style={{ position: 'relative', padding: 18, border: `1px solid ${accent}44`, boxShadow: '0 0 0 1px rgba(255,255,255,0.12) inset, 0 12px 30px rgba(0,0,0,0.20)', borderRadius: 16, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', placeItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, display: 'grid', placeItems: 'center', background: '#ffffff14', border: '1px solid #ffffff24' }}>{icon}</div>
            <h2 style={{ fontSize: '1.05rem', margin: 0, textAlign: 'center', fontWeight: 500 }}>{title}</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', alignItems: 'center', fontSize: 13, opacity: 0.85 }}>
            {details.map((d, i) => (
              <span key={`${d.label}-${i}`}>
                <strong style={{ opacity: 0.85 }}>{d.label}:</strong> {d.value}
                {i < details.length - 1 && <span style={{ opacity: 0.6 }}> • </span>}
              </span>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 12, marginTop: 12, display: 'flex', justifyContent: 'center', fontSize: 13 }}>
            <span style={{ opacity: 0.85 }}>查看</span>
          </div>
        </div>
      </div>
    </NavigationLink>
  )
}
