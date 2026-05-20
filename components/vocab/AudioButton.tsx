import { useCallback, useEffect, useState } from 'react'
import { LuVolume2 } from 'react-icons/lu'

interface Props {
  text: string
  lang?: 'en-US' | 'en-GB'
  size?: number
}

export default function AudioButton({ text, lang = 'en-US', size = 18 }: Props) {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported(
      typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    )
  }, [])

  const speak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!supported) return
      try {
        window.speechSynthesis.cancel()
        const utt = new SpeechSynthesisUtterance(text)
        utt.lang = lang
        utt.rate = 0.9
        window.speechSynthesis.speak(utt)
      } catch {
        // ignore
      }
    },
    [text, lang, supported],
  )

  if (!supported) return null

  return (
    <button type="button" aria-label={`Pronounce ${text}`} className="vocab-audio-btn" onClick={speak}>
      <LuVolume2 size={size} />
    </button>
  )
}
