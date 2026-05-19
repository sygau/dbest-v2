import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { LuMapPinOff } from 'react-icons/lu'
import PageSEO from '../components/PageSEO'
import PageBreadcrumb from '../components/PageBreadcrumb'
import FAQSection from '../components/FAQSection'
import { Button } from '../components/ui/Button'
import SpotCard from '../components/study-spots/SpotCard'
import SpotOverlay from '../components/study-spots/SpotOverlay'
import SpotFilters, { EMPTY_FILTERS, type SpotFilterState } from '../components/study-spots/SpotFilters'
import { buildStudySpotsJsonLd } from '../data/jsonld/pages'
import { buildFAQSchema } from '../utils/faqSchema'
import { isOpenNow, haversineKm, type StudySpot } from '../lib/studySpots'
import rawSpots from '../data/study-spots.json'

const StudySpotsMap = dynamic(() => import('../components/study-spots/StudySpotsMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '70vh',
        minHeight: '380px',
        borderRadius: '3px',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-muted)',
        fontSize: '0.9rem',
      }}
    >
      載入地圖中… Loading map…
    </div>
  ),
})

const SPOTS = (rawSpots as unknown as StudySpot[]).filter((s) => s.status)
const PAGE_SIZE = 9

const FAQS = [
  {
    id: 'f1',
    question: '香港邊度可以免費溫書？',
    answer:
      '香港 70 多間公共圖書館均免費開放，設有閱覽座位，部分分館另設獨立自修室。除咗圖書館，部分商場、社區中心同公園亦提供免費座位，適合學生溫習。',
  },
  {
    id: 'f2',
    question: '公共圖書館有冇自修室？需唔需要預約？',
    answer:
      '部分較大型嘅公共圖書館（例如香港中央圖書館、九龍公共圖書館）設有獨立自修室，名額有限，通常以即場排隊或當日領籌方式分配，考試季節座位較緊張。',
  },
  {
    id: 'f3',
    question: '香港公共圖書館嘅開放時間係幾點？',
    answer:
      '大部分公共圖書館逢星期一至日開放，一般由上午 9 至 10 時至晚上 8 至 9 時，星期四多數較遲開放或休息。公眾假期開放時間或有調整，出發前宜先查閱。',
  },
  {
    id: 'f4',
    question: 'DSE 考生應該點揀溫書地方？',
    answer:
      '揀溫書地方可考慮幾個因素：環境是否安靜、有冇電源插座同 Wi-Fi、交通是否方便、以及開放時間是否配合。圖書館適合需要安靜嘅同學，咖啡店則適合可接受少量背景聲音嘅人。',
  },
  {
    id: 'f5',
    question: '喺咖啡店溫書要注意啲咩？',
    answer:
      '喺咖啡店溫書一般需要最低消費，並建議避開午餐及晚餐繁忙時段。座位數目同插座供應因店而異，逗留太耐亦應顧及其他顧客，購買飲品或小食以示禮貌。',
  },
  {
    id: 'f6',
    question: '香港有冇 24 小時或通宵自修室？',
    answer:
      '公共圖書館並非 24 小時開放。部分私營共享工作空間及收費自修室提供較長甚至通宵時段，大學圖書館喺考試期間亦會延長開放時間，但通常只限該校學生使用。',
  },
]

export default function StudySpotsPage() {
  const router = useRouter()
  const [filters, setFilters] = useState<SpotFilterState>(EMPTY_FILTERS)
  const [view, setView] = useState<'list' | 'map'>('list')
  const [selected, setSelected] = useState<StudySpot | null>(null)
  const [openMap, setOpenMap] = useState<Record<string, boolean> | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null)
  const [nearMeStatus, setNearMeStatus] = useState<'idle' | 'locating' | 'error'>('idle')

  // Open-now computed client-side only (depends on HK time → avoid hydration mismatch)
  useEffect(() => {
    const m: Record<string, boolean> = {}
    SPOTS.forEach((s) => {
      m[s.id] = isOpenNow(s)
    })
    setOpenMap(m)
  }, [])

  // Deep link — overlay state derives from ?spot=<id>
  useEffect(() => {
    const id = router.query.spot
    setSelected(typeof id === 'string' ? SPOTS.find((s) => s.id === id) ?? null : null)
  }, [router.query.spot])

  function openSpot(spot: StudySpot) {
    router.push({ pathname: '/study-spots', query: { ...router.query, spot: spot.id } }, undefined, {
      shallow: true,
    })
  }

  function closeSpot() {
    const q = { ...router.query }
    delete q.spot
    router.push({ pathname: '/study-spots', query: q }, undefined, { shallow: true })
  }

  // Geolocation for "near me" sort
  useEffect(() => {
    if (!filters.nearMe || userLoc) return
    if (!navigator.geolocation) {
      setNearMeStatus('error')
      setFilters((f) => ({ ...f, nearMe: false }))
      return
    }
    setNearMeStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc([pos.coords.latitude, pos.coords.longitude])
        setNearMeStatus('idle')
      },
      () => {
        setNearMeStatus('error')
        setFilters((f) => ({ ...f, nearMe: false }))
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }, [filters.nearMe, userLoc])

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase()
    return SPOTS.filter((s) => {
      if (filters.types.size > 0 && !filters.types.has(s.type)) return false
      if (filters.regions.size > 0 && !filters.regions.has(s.region)) return false
      if (filters.amenities.has('wifi') && !s.wifi) return false
      if (filters.amenities.has('power') && !s.power_outlets) return false
      if (filters.amenities.has('study') && !s.study_rooms) return false
      if (filters.amenities.has('nopurchase') && s.purchase_required) return false
      if (q) {
        const hay = `${s.name} ${s.district} ${s.nearby_mtr} ${s.tags.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [filters])

  // Attach distance + sort nearest-first when "near me" is on
  const decorated = useMemo(() => {
    const list = filtered.map((spot) => ({
      spot,
      distanceKm: userLoc ? haversineKm(userLoc, spot.coords) : null,
    }))
    if (filters.nearMe && userLoc) {
      list.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity))
    }
    return list
  }, [filtered, userLoc, filters.nearMe])

  // Reset pagination whenever the result set changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [filters])

  const visibleSpots = decorated.slice(0, visibleCount)
  const hasMore = visibleCount < decorated.length

  return (
    <>
      <PageSEO
        title="香港自修室、公共圖書館地圖｜DSE 溫習好去處 Study Spots"
        description="香港溫習地點一覽：公共圖書館、自修室、咖啡店及共享空間。按地區（港島、九龍、新界）、Wi-Fi、插座、自修室篩選，附開放時間、港鐵站及地圖，幫 DSE 考生搵到合適嘅溫書地方。"
        ogTitle="香港自修室、公共圖書館地圖｜DSE 溫習好去處"
        ogDescription="香港溫習地點一覽：公共圖書館、自修室、咖啡店。按地區及設施篩選，附開放時間同地圖。"
        ogUrl="https://dse.best/study-spots"
        canonical="https://dse.best/study-spots"
        robots={['index', 'follow']}
        jsonLd={[
          buildStudySpotsJsonLd(SPOTS),
          buildFAQSchema(FAQS.map((f) => ({ q: f.question, a: f.answer }))),
        ]}
      />

      <PageBreadcrumb section="資源" text="自修室地圖 Study Spots" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 12px 48px' }}>
        <div style={{ textAlign: 'center', padding: '24px 16px 18px', maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#549ee8', marginBottom: '6px' }}>
            自修室 &amp; 圖書館地圖
          </h1>
          <p style={{ color: 'var(--color-body)', margin: 0, fontSize: '1.05rem', lineHeight: 1.6 }}>
            香港公共圖書館、自修室、咖啡店及公共空間一覽。按地區同設施篩選，搵到啱你嘅溫書地方。
          </p>
        </div>

        <SpotFilters
          filters={filters}
          onChange={setFilters}
          resultCount={decorated.length}
          view={view}
          onViewChange={setView}
          nearMeStatus={nearMeStatus}
        />

        {decorated.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-body)' }}>
            <LuMapPinOff size={48} style={{ opacity: 0.4, marginBottom: '12px' }} />
            <h3 style={{ margin: '0 0 6px', fontSize: '1.2rem' }}>找不到地點</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>請調整篩選條件再試一次。</p>
          </div>
        ) : view === 'map' ? (
          <StudySpotsMap spots={filtered} onSelect={openSpot} />
        ) : (
          <>
            <div className="spot-grid">
              {visibleSpots.map(({ spot, distanceKm }, i) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  open={openMap ? openMap[spot.id] : null}
                  onSelect={() => openSpot(spot)}
                  priority={i < 3}
                  distanceKm={filters.nearMe ? distanceKm : null}
                />
              ))}
            </div>
            {hasMore && (
              <Button
                variant="default"
                size="lg"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="w-full mt-6 mb-10"
              >
                顯示更多 Show more ({decorated.length - visibleCount})
              </Button>
            )}
          </>
        )}

        <FAQSection faqs={FAQS} className="mt-2" />
      </div>

      {selected && <SpotOverlay spot={selected} onClose={closeSpot} />}

      <style jsx>{`
        .spot-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 600px) {
          .spot-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (min-width: 992px) {
          .spot-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
          }
        }
      `}</style>
    </>
  )
}
