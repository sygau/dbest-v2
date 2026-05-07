import { useState, useCallback, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import Preferences from './Preferences'
import BackToTop from './BackToTop'
import ScrollProgress from './ScrollProgress'
import { cn } from '../../lib/cn'

interface LayoutProps {
  children: ReactNode
}

const MINIMAL_PAGES = ['/404', '/_error']

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  // Skip layout for minimal pages
  if (MINIMAL_PAGES.includes(router.pathname)) {
    return <>{children}</>
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Initialize from data-sidebar attr set by blocking script — no post-paint shift
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.getAttribute('data-sidebar') === 'collapsed'
  })
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [sidebarReady, setSidebarReady] = useState(false)

  useEffect(() => {
    setSidebarReady(true)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed))
      if (sidebarCollapsed) {
        document.documentElement.setAttribute('data-sidebar', 'collapsed')
      } else {
        document.documentElement.removeAttribute('data-sidebar')
      }
    } catch {
      // localStorage not available
    }
  }, [sidebarCollapsed])

  const toggleSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1200) {
      setSidebarOpen(prev => !prev)
    } else {
      setSidebarCollapsed(prev => !prev)
    }
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const handleRouteChange = () => setSidebarOpen(false)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router])

  return (
    <>
      <ScrollProgress sidebarCollapsed={sidebarCollapsed} />

      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={closeSidebar}
      />

      <TopNavbar
        onToggleSidebar={toggleSidebar}
        onOpenPreferences={() => setPreferencesOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
        sidebarOpen={sidebarOpen}
      />

      {/* Main content */}
     <main
  className={cn(
    /* 1. Changed min-h-screen to min-h-0 so it doesn't force extra height */
    /* 2. Added flex flex-col to allow the content to grow properly */
    'min-h-0 flex flex-col mt-[56px] xl:mt-[70px]',
    sidebarReady && 'transition-all duration-300 ease-out',
    sidebarCollapsed ? 'xl:ml-[70px]' : 'xl:ml-[260px]',
    'ml-0',
  )}
  suppressHydrationWarning
>
  {/* 3. Added flex-grow so this div takes up available space without forcing a gap at the bottom */}
  <div className="p-4 xl:p-6 flex-grow">
    {children}
  </div>

  {/* Footer */}
  <footer className="flex items-center justify-center px-4 pt-2 pb-2 border-t-2 border-[var(--color-border)] text-sm text-[var(--color-muted)]">
    <p className="leading-tight">
      © 2026 dse.best | not affiliated with hkeaa / hkdse exam thing
    </p>
  </footer>
</main>
      <Preferences
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
      />

      <BackToTop />
    </>
  )
}
