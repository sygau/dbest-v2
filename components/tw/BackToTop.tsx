import { useEffect, useState, useCallback } from 'react'
import { BiUpArrowAlt } from 'react-icons/bi'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <button
      className={`back-to-top-btn-modern ${visible ? 'show' : ''}`}
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
    >
      <BiUpArrowAlt style={{ fontSize: 20 }} />
    </button>
  )
}
