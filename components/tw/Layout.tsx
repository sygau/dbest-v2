import { useState, useCallback, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import ThemeSwitcher from './ThemeSwitcher'
import BackToTop from './BackToTop'
import { cn } from '../../lib/cn'

interface LayoutProps {
  children: ReactNode
}

const MINIMAL_PAGES = ['/maintenance', '/lock', '/404', '/_error']

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false)

  // Skip layout for minimal pages
  if (MINIMAL_PAGES.includes(router.pathname)) {
    return <>{children}</>
  }

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
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={closeSidebar}
      />

      <TopNavbar
        onToggleSidebar={toggleSidebar}
        onOpenThemeSwitcher={() => setThemeSwitcherOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
        sidebarOpen={sidebarOpen}
      />

      {/* Main content */}
      <main
        className={cn(
          'pb-5 transition-all duration-300 ease-out min-h-screen mt-[56px] xl:mt-[70px]',
          sidebarCollapsed ? 'xl:ml-[70px]' : 'xl:ml-[260px]',
          'ml-0',
        )}
      >
        <div className="p-4 xl:p-6">
          {children}
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-center px-4 py-2 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)]">
          <p className="m-0 leading-tight">© 2026 dse.best | Brandon LO, Tsz Chung</p>
        </footer>
      </main>

      <ThemeSwitcher
        isOpen={themeSwitcherOpen}
        onClose={() => setThemeSwitcherOpen(false)}
      />

      <BackToTop />
    </>
  )
}
