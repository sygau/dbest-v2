import { useCallback, useState } from 'react'
import { LuShare2, LuCheck } from 'react-icons/lu'

interface Props {
  title?: string
  text?: string
  size?: number
}

export default function ShareButton({ title, text, size = 18 }: Props) {
  const [copied, setCopied] = useState(false)

  const handle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const url = typeof window !== 'undefined' ? window.location.href : ''
      try {
        const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { share?: (d: ShareData) => Promise<void> }) : undefined
        if (nav?.share) {
          await nav.share({ title, text, url })
          return
        }
        if (nav?.clipboard?.writeText) {
          await nav.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 1400)
        }
      } catch {
        // user cancelled or unsupported
      }
    },
    [title, text],
  )

  return (
    <button
      type="button"
      aria-label="Share"
      className="vocab-bookmark-btn"
      onClick={handle}
    >
      {copied ? <LuCheck size={size} /> : <LuShare2 size={size} />}
    </button>
  )
}
