import { useEffect, useState, useCallback } from 'react'
import {
  LuX, LuMapPin, LuTrainFront, LuExternalLink, LuWifi, LuPlug,
  LuBookOpen, LuShoppingBag, LuShare2, LuTrees,
} from 'react-icons/lu'
import {
  TYPE_META, REGION_META, SETTING_META, DAYS, isOpenNow, todayKey, type StudySpot,
} from '../../lib/studySpots'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: '18px', borderTop: '1px solid var(--color-border)' }}>
      <h3 style={{ margin: '0 0 10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-heading)' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Pill({ bg, fg, children }: { bg: string; fg: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        background: bg,
        color: fg,
        padding: '4px 10px',
        borderRadius: '3px',
        fontSize: '0.74rem',
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

function AmenityRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '0.86rem' }}>
      <span style={{ color: value ? 'var(--color-primary)' : 'var(--color-muted)', display: 'flex' }}>{icon}</span>
      <span style={{ color: 'var(--color-body)' }}>{label}</span>
      <span
        style={{
          marginLeft: 'auto',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: value ? '#16a34a' : 'var(--color-muted)',
        }}
      >
        {value ? '有 Yes' : '沒有 No'}
      </span>
    </div>
  )
}

export default function SpotOverlay({ spot, onClose }: { spot: StudySpot; onClose: () => void }) {
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 200)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [handleClose])

  const type = TYPE_META[spot.type]
  const region = REGION_META[spot.region]
  const setting = SETTING_META[spot.setting]
  const open = isOpenNow(spot)
  const today = todayKey()

  async function shareLocation() {
    const url = `${window.location.origin}${window.location.pathname}?spot=${spot.id}`
    if (navigator.share) {
      try {
        await navigator.share({ title: spot.name, url })
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('已複製連結 Link copied')
      } catch {
        /* clipboard unavailable */
      }
    }
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
      className={`ss-ov-backdrop${closing ? ' ss-ov-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={spot.name}
    >
      <div className={`ss-ov-panel${closing ? ' ss-ov-closing' : ''}`}>
        <div style={{ overflowY: 'auto' }}>
          {/* Photo */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', flexShrink: 0 }}>
            {spot.photo ? (
              <img
                src={spot.photo}
                alt={spot.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${type.color}33, ${type.color}11)`,
                  color: type.color,
                }}
              >
                <LuMapPin size={48} strokeWidth={1.5} />
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '70px',
                background: 'linear-gradient(to top, var(--color-card-bg), transparent)',
                pointerEvents: 'none',
              }}
            />

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '34px',
                height: '34px',
                borderRadius: '3px',
                border: 'none',
                background: 'rgba(0,0,0,0.55)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <LuX size={18} />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '4px 22px 26px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Header */}
            <div>
              <h2 style={{ margin: '0 0 9px', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)' }}>
                {spot.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <Pill bg={type.color} fg="#fff">
                  {type.label} {type.en}
                </Pill>
                <Pill bg={open ? '#16a34a' : '#dc2626'} fg="#fff">
                  {open ? '營業中 Open now' : '休息中 Closed'}
                </Pill>
                <Pill bg={region.color} fg="#fff">
                  {region.label} {region.en}
                </Pill>
                <Pill bg="var(--color-border)" fg="var(--color-body)">
                  {spot.district}
                </Pill>
              </div>
            </div>

            {/* Location */}
            <Section title="位置 · Location">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '9px', fontSize: '0.86rem', color: 'var(--color-body)' }}>
                  <LuMapPin size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-primary)' }} />
                  <span>{spot.address}</span>
                </div>
                {spot.nearby_mtr && (
                  <div style={{ display: 'flex', gap: '9px', fontSize: '0.86rem', color: 'var(--color-body)' }}>
                    <LuTrainFront size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-primary)' }} />
                    <span>港鐵 MTR：{spot.nearby_mtr}</span>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '3px' }}>
                  <a
                    href={spot.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 14px',
                      borderRadius: '3px',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <LuExternalLink size={15} />
                    在 Google Maps 開啟
                  </a>
                  <button
                    type="button"
                    onClick={shareLocation}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 14px',
                      borderRadius: '3px',
                      background: 'transparent',
                      color: 'var(--color-body)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <LuShare2 size={15} />
                    分享地點 Share Location
                  </button>
                </div>
              </div>
            </Section>

            {/* Hours */}
            <Section title="開放時間 · Opening Hours">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {DAYS.map((d) => {
                  const isToday = d.key === today
                  const val = spot.hours[d.key]
                  const closed = !val || val.toLowerCase() === 'closed'
                  return (
                    <div
                      key={d.key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        background: isToday ? 'var(--color-border)' : 'transparent',
                        fontSize: '0.84rem',
                        fontWeight: isToday ? 700 : 500,
                        color: 'var(--color-body)',
                      }}
                    >
                      <span>星期{d.label}</span>
                      <span style={{ color: closed ? 'var(--color-muted)' : 'var(--color-body)' }}>
                        {closed ? '休息 Closed' : val}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Section>

            {/* Amenities */}
            <Section title="設施 · Amenities">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '0.86rem' }}>
                  <span style={{ color: 'var(--color-primary)', display: 'flex' }}>
                    <LuTrees size={16} />
                  </span>
                  <span style={{ color: 'var(--color-body)' }}>環境 Setting</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-body)' }}>
                    {setting.label} {setting.en}
                  </span>
                </div>
                <AmenityRow icon={<LuWifi size={16} />} label="免費 Wi-Fi" value={spot.wifi} />
                <AmenityRow icon={<LuPlug size={16} />} label="電源插座 Power outlets" value={spot.power_outlets} />
                <AmenityRow icon={<LuBookOpen size={16} />} label="自修室 Study room" value={spot.study_rooms} />
                <AmenityRow icon={<LuShoppingBag size={16} />} label="需要消費 Purchase required" value={spot.purchase_required} />
              </div>
            </Section>

            {/* Tags */}
            {spot.tags.length > 0 && (
              <Section title="特色 · Features">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {spot.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--color-secondary)',
                        background: 'var(--color-border)',
                        borderRadius: '3px',
                        padding: '4px 10px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Notes */}
            {spot.notes && (
              <Section title="備註 · Notes">
                <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--color-body)' }}>
                  {spot.notes}
                </p>
              </Section>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ss-ov-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          animation: ssBackIn 0.2s ease forwards;
        }
        .ss-ov-backdrop.ss-ov-closing {
          animation: ssBackOut 0.2s ease forwards;
        }
        .ss-ov-panel {
          background: var(--color-card-bg);
          width: 100%;
          max-width: 760px;
          max-height: 92vh;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.4);
          animation: ssPanelIn 0.24s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .ss-ov-panel.ss-ov-closing {
          animation: ssPanelOut 0.2s ease forwards;
        }
        @media (min-width: 640px) {
          .ss-ov-backdrop {
            align-items: center;
          }
          .ss-ov-panel {
            border-radius: 16px;
          }
        }
        @keyframes ssBackIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ssBackOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes ssPanelIn {
          from { opacity: 0; transform: translateY(28px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ssPanelOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(28px) scale(0.985); }
        }
      `}</style>
    </div>
  )
}
