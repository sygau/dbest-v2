import { useState, useEffect } from 'react'
import { BiMenu, BiLogoInstagram, BiCommand } from 'react-icons/bi'
import { cn } from '../../lib/cn'

interface TopNavbarProps {
  onToggleSidebar: () => void
  onOpenPreferences: () => void
  sidebarCollapsed: boolean
  sidebarOpen: boolean
}

export default function TopNavbar({ onToggleSidebar, onOpenPreferences, sidebarCollapsed, sidebarOpen }: TopNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isBlue, setIsBlue] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsBlue(document.documentElement.getAttribute('data-theme') === 'blue')
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const blueTransparent = isBlue && !scrolled

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-[65px] xl:h-[70px] flex items-center gap-4 transition-all duration-300 ease-out',
        sidebarCollapsed ? 'xl:left-[70px]' : 'xl:left-[260px]',
        'left-0',
      )}
      style={{
        zIndex: 10,
        backgroundColor: isBlue
          ? (scrolled ? 'rgba(7, 12, 41, 0.55)' : 'transparent')
          : 'var(--color-navbar-bg)',
        boxShadow: isBlue ? 'none' : '0 2px 6px 0 rgba(0,0,0,0.044), 0 2px 6px 0 rgba(0,0,0,0.049)',
        backdropFilter: isBlue && scrolled ? 'blur(2.625rem)' : undefined,
        WebkitBackdropFilter: isBlue && scrolled ? 'blur(2.625rem)' : undefined,
        borderBottom: scrolled ? '1px solid var(--bs-border-color)' : undefined,
        paddingLeft: '0.75rem',
        paddingRight: '1.5rem',
      }}
    >
      {/* Hamburger - close to sidebar edge */}
      <button
        type="button"
        className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-0 cursor-pointer text-[var(--color-body)]"
        aria-label="Toggle sidebar menu"
        onClick={onToggleSidebar}
      >
        <BiMenu style={{ fontSize: 24 }} />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right nav items */}
      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {/* Instagram */}
        <li>
          <a
            className="flex items-center justify-center w-[40px] h-[40px] text-[var(--color-body)]"
            href="https://www.instagram.com/dse_best"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            title="Follow us on Instagram"
            onClick={(e) => {
              if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                e.preventDefault()
                const appUrl = 'instagram://user?username=dse_best'
                const webUrl = 'https://www.instagram.com/dse_best'
                window.location.href = appUrl
                setTimeout(() => { window.location.href = webUrl }, 2000)
              }
            }}
          >
            <BiLogoInstagram style={{ fontSize: 22 }} />
          </a>
        </li>

        {/* Theme switcher */}
        <li>
          <button
            className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-0 cursor-pointer text-[var(--color-body)]"
            aria-label="偏好設定 Preferences"
            title="偏好設定 Preferences"
            onClick={onOpenPreferences}
          >
            <BiCommand style={{ fontSize: 22 }} />
          </button>
        </li>
      </ul>
    </header>
  )
}
