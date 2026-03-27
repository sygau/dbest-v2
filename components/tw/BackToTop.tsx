import { useEffect, useState, useCallback } from 'react'
import { BiUpArrowAlt } from 'react-icons/bi'
import { cn } from '../../lib/cn'

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
      className={cn(
        'fixed bottom-[22px] right-[22px] w-[45px] h-[45px] rounded-xl border border-[var(--color-border)]',
        'bg-[var(--color-overlay-bg)] backdrop-blur-[10px] text-[var(--color-body)]',
        'flex items-center justify-center cursor-pointer z-[999]',
        'transition-opacity duration-300',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5 pointer-events-none invisible'
      )}
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
    >
      <BiUpArrowAlt style={{ fontSize: 20 }} />
    </button>
  )
}
