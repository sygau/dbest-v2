import { useEffect, useRef } from 'react'

// TODO: Replace with Display ads slot ID.
// AdSense → Ads → By ad unit → Display ads → "Subject Between Sections" → Responsive → copy slot ID.
const AD_SLOT = '7674013447'
const AD_CLIENT = 'ca-pub-9807119599898921'

export default function SubjectSectionAd() {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    if ((window as any).__noAds) return
    pushed.current = true
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <div className="my-4 print:hidden" aria-hidden="true">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
      />
    </div>
  )
}
