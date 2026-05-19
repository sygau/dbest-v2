import { useState } from 'react'
import { LuWifi, LuPlug, LuBookOpen, LuShoppingBag, LuTrainFront, LuMapPin } from 'react-icons/lu'
import { TYPE_META, REGION_META, type StudySpot } from '../../lib/studySpots'

function Amenity({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span
      title={label}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-secondary)' }}
    >
      {icon}
    </span>
  )
}

export default function SpotCard({
  spot,
  open,
  onSelect,
  priority = false,
  distanceKm = null,
}: {
  spot: StudySpot
  open: boolean | null
  onSelect: () => void
  priority?: boolean
  distanceKm?: number | null
}) {
  const type = TYPE_META[spot.type]
  const region = REGION_META[spot.region]
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        textAlign: 'left',
        padding: 0,
        background: 'var(--color-card-bg)',
        borderRadius: '14px',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* 16:9 photo */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          flexShrink: 0,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${type.color}22, ${type.color}0d)`,
        }}
      >
        {spot.photo ? (
          <img
            src={spot.photo}
            alt={spot.name}
            width={400}
            height={225}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: type.color,
            }}
          >
            <LuMapPin size={34} strokeWidth={1.6} />
          </div>
        )}

        <span
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: type.color,
            color: '#fff',
            padding: '5px 13px',
            borderRadius: '3px',
            fontSize: '0.8rem',
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
          }}
        >
          {type.label} {type.en}
        </span>

        {open !== null && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: open ? '#16a34a' : '#dc2626',
              color: '#fff',
              padding: '5px 13px',
              borderRadius: '3px',
              fontSize: '0.8rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
            }}
          >
            {open ? '營業中' : '休息中'}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '13px 15px 15px', flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <h3 style={{ margin: 0, fontSize: '1.12rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--color-heading)' }}>
          {spot.name}
          {distanceKm !== null && (
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-muted)', marginLeft: '5px' }}>
              (~{distanceKm.toFixed(2)}km)
            </span>
          )}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.84rem', color: 'var(--color-muted)' }}>
          <LuMapPin size={13} style={{ flexShrink: 0 }} />
          <span>
            {spot.district} · {region.label}
          </span>
        </div>

        {spot.nearby_mtr && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.84rem', color: 'var(--color-muted)' }}>
            <LuTrainFront size={13} style={{ flexShrink: 0 }} />
            <span>{spot.nearby_mtr}</span>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '11px',
            marginTop: '2px',
            paddingTop: '9px',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {spot.wifi && <Amenity icon={<LuWifi size={15} />} label="免費 Wi-Fi" />}
          {spot.power_outlets && <Amenity icon={<LuPlug size={15} />} label="有插座 Power outlets" />}
          {spot.study_rooms && <Amenity icon={<LuBookOpen size={15} />} label="有自修室 Study room" />}
          {spot.purchase_required && <Amenity icon={<LuShoppingBag size={15} />} label="需要消費 Purchase required" />}
        </div>

        {spot.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '1px' }}>
            {spot.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--color-secondary)',
                  background: 'var(--color-border)',
                  borderRadius: '3px',
                  padding: '2px 7px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}
