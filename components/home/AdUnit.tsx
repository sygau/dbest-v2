import { useEffect } from 'react'

interface AdUnitProps {
  slotId: string
  format?: 'auto' | 'horizontal' | 'vertical'
  responsive?: boolean
}

export default function AdUnit({ slotId, format = 'auto', responsive = true }: AdUnitProps) {
  useEffect(() => {
    // Wait for adsbygoogle to be available, then push
    const checkAndPush = () => {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (e) {
          // Ad already pushed or not ready
        }
      } else {
        // Script not loaded yet, retry after a short delay
        setTimeout(checkAndPush, 100)
      }
    }
    checkAndPush()
  }, [slotId])

  return (
    <div style={{ margin: '2rem auto', textAlign: 'center', maxWidth: '100%' }}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          maxWidth: '100%',
          width: responsive ? '100%' : 'auto',
        }}
        data-ad-client="ca-pub-9807119599898921"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
    </div>
  )
}
