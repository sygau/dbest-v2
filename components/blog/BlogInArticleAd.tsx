import { useEffect, useRef } from 'react'

const AD_SLOT = '4714323556'
const AD_CLIENT = 'ca-pub-9807119599898921'

export default function BlogInArticleAd() {
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
    <div className="my-7 print:hidden" aria-hidden="true">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
      />
    </div>
  )
}
