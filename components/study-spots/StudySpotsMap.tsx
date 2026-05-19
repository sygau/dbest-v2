import { useEffect, useRef, useState } from 'react'
import { TYPE_META, type StudySpot } from '../../lib/studySpots'

const LEAFLET_VERSION = '1.9.4'
const LEAFLET_CSS = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`
const LEAFLET_JS = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`
const CLUSTER_VERSION = '1.5.3'
const CLUSTER_CSS = [
  `https://unpkg.com/leaflet.markercluster@${CLUSTER_VERSION}/dist/MarkerCluster.css`,
  `https://unpkg.com/leaflet.markercluster@${CLUSTER_VERSION}/dist/MarkerCluster.Default.css`,
]
const CLUSTER_JS = `https://unpkg.com/leaflet.markercluster@${CLUSTER_VERSION}/dist/leaflet.markercluster.js`

// Minimal, label-light basemap — no ferry routes / borders / POI clutter.
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTR = '&copy; OpenStreetMap &copy; CARTO'

function addCss(href: string, tag: string) {
  if (document.querySelector(`link[data-${tag}]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.setAttribute(`data-${tag}`, '1')
  document.head.appendChild(link)
}

function addScript(src: string, tag: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-${tag}]`) as HTMLScriptElement | null
    if (existing) {
      if (existing.dataset.loaded) resolve()
      else {
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', reject)
      }
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.setAttribute(`data-${tag}`, '1')
    script.addEventListener('load', () => {
      script.dataset.loaded = '1'
      resolve()
    })
    script.addEventListener('error', reject)
    document.body.appendChild(script)
  })
}

// Loads Leaflet + the markercluster plugin, in order.
async function loadLeaflet(): Promise<any> {
  const w = window as any
  addCss(LEAFLET_CSS, 'leaflet-css')
  if (!w.L) await addScript(LEAFLET_JS, 'leaflet')
  CLUSTER_CSS.forEach((href, i) => addCss(href, `cluster-css-${i}`))
  if (!w.L?.markerClusterGroup) await addScript(CLUSTER_JS, 'cluster')
  return w.L
}

export default function StudySpotsMap({
  spots,
  onSelect,
}: {
  spots: StudySpot[]
  onSelect: (spot: StudySpot) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const layerRef = useRef<any>(null)
  const meMarkerRef = useRef<any>(null)
  const selectRef = useRef(onSelect)
  selectRef.current = onSelect
  const [ready, setReady] = useState(false)
  const [locating, setLocating] = useState(false)

  // Init map once
  useEffect(() => {
    let cancelled = false
    loadLeaflet().then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return
      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([22.35, 114.15], 11)
      L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 19, subdomains: 'abcd' }).addTo(map)
      mapRef.current = map
      layerRef.current = L.markerClusterGroup({ maxClusterRadius: 45, showCoverageOnHover: false }).addTo(map)
      setReady(true)
    })
    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        layerRef.current = null
        meMarkerRef.current = null
      }
    }
  }, [])

  // Render markers — runs once map is ready and whenever spots change
  useEffect(() => {
    const L = (window as any).L
    if (!ready || !L || !mapRef.current || !layerRef.current) return
    layerRef.current.clearLayers()
    if (spots.length === 0) return

    spots.forEach((spot) => {
      const color = TYPE_META[spot.type].color
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:20px;height:20px;border-radius:50% 50% 50% 0;background:${color};border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,0.45);transform:rotate(-45deg)"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
      })
      const marker = L.marker(spot.coords, { icon })
      marker.bindTooltip(spot.name, { direction: 'top', offset: [0, -18] })
      marker.on('click', () => selectRef.current(spot))
      layerRef.current.addLayer(marker)
    })

    const bounds = L.latLngBounds(spots.map((s) => s.coords))
    mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
  }, [spots, ready])

  function showMyLocation() {
    if (!navigator.geolocation || !mapRef.current) return
    const L = (window as any).L
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false)
        const ll: [number, number] = [pos.coords.latitude, pos.coords.longitude]
        if (meMarkerRef.current) meMarkerRef.current.remove()
        const icon = L.divIcon({
          className: '',
          html: '<div style="width:16px;height:16px;border-radius:50%;background:#1d72ff;border:3px solid #fff;box-shadow:0 0 0 4px rgba(29,114,255,0.3)"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })
        meMarkerRef.current = L.marker(ll, { icon }).addTo(mapRef.current)
        mapRef.current.setView(ll, 15)
      },
      () => {
        setLocating(false)
        alert('無法取得你的位置。請允許瀏覽器使用定位。')
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '70vh',
          minHeight: '380px',
          borderRadius: '3px',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          zIndex: 0,
        }}
      />
      <button
        type="button"
        onClick={showMyLocation}
        disabled={locating}
        style={{
          position: 'absolute',
          right: '12px',
          bottom: '12px',
          zIndex: 400,
          padding: '9px 14px',
          borderRadius: '3px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-card-bg)',
          color: 'var(--color-body)',
          fontSize: '0.82rem',
          fontWeight: 600,
          cursor: locating ? 'wait' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        {locating ? '定位中…' : '顯示我的位置 My location'}
      </button>
    </div>
  )
}
