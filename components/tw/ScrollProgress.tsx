import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { cn } from '../../lib/cn'

interface ScrollProgressProps {
  sidebarCollapsed?: boolean
}

export default function ScrollProgress({ sidebarCollapsed = false }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  // Only show on blog post pages (not on /blog index)
  const isBlogPost = router.pathname.startsWith('/blog/') && router.pathname !== '/blog/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isBlogPost) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed h-[1.8px] bg-[#549ee8] z-50 transition-all duration-200 ease-out top-[65px] xl:top-[70px]',
        'left-0',
        sidebarCollapsed ? 'xl:left-0' : 'xl:left-[260px]'
      )}
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
