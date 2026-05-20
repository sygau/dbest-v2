import { ReactNode, useRef, useState, useEffect } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

interface ShelfProps {
  title?: string
  subtitle?: string
  description?: string
  action?: ReactNode
  bare?: boolean
  children: ReactNode
}

export default function Shelf({ title, subtitle, description, action, bare, children }: ShelfProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const update = () => {
      setCanLeft(el.scrollLeft > 4)
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
      setOverflows(el.scrollWidth > el.clientWidth + 2)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const obs = new ResizeObserver(update)
    obs.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      obs.disconnect()
    }
  }, [children])

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section className={`vocab-shelf${bare ? ' vocab-shelf--bare' : ''}`}>
      {(title || action) && (
        <div className="vocab-shelf__head">
          <div>
            {title && <h2 className="vocab-shelf__title">{title}</h2>}
            {subtitle && <div className="vocab-shelf__subtitle">{subtitle}</div>}
            {description && <p className="vocab-shelf__desc">{description}</p>}
          </div>
          {action && <div className="vocab-shelf__action">{action}</div>}
        </div>
      )}

      <div className="vocab-shelf__wrap">
        {overflows && canLeft && (
          <button
            type="button"
            aria-label="Scroll left"
            className="vocab-shelf__chev vocab-shelf__chev--left"
            onClick={() => scrollBy(-1)}
          >
            <LuChevronLeft size={22} />
          </button>
        )}
        <div className="vocab-shelf__scroller" ref={scrollerRef}>
          <div className="vocab-shelf__inner">{children}</div>
        </div>
        {overflows && canRight && (
          <button
            type="button"
            aria-label="Scroll right"
            className="vocab-shelf__chev vocab-shelf__chev--right"
            onClick={() => scrollBy(1)}
          >
            <LuChevronRight size={22} />
          </button>
        )}
      </div>
    </section>
  )
}
