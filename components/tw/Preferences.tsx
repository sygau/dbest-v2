import { BiPalette, BiMoon, BiX, BiBulb } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { useTheme, Theme } from './ThemeProvider'
import { cn } from '../../lib/cn'

interface PreferencesProps {
  isOpen: boolean
  onClose: () => void
}

const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: 'blue', label: 'Blue', icon: <BiPalette style={{ fontSize: 22 }} /> },
  { id: 'light', label: 'Light', icon: <BiBulb style={{ fontSize: 22 }} /> },
  { id: 'dark', label: 'Dark', icon: <BiMoon style={{ fontSize: 22 }} /> },
]

export default function Preferences({ isOpen, onClose }: PreferencesProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleDisableAds = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('na', '1')
    window.location.href = url.toString()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30" style={{ zIndex: 998 }} onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-[var(--color-card-bg)] shadow-2xl transition-transform duration-300 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ zIndex: 999 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)]" style={{ height: 70, padding: '0 1.25rem' }}>
          <div>
            <h5 className="m-0 text-base font-semibold text-[var(--color-heading)]">Preferences</h5>
            <p className="m-0 text-xs text-[var(--color-muted)]">Customize your experience</p>
          </div>
          <button
            aria-label="Close preferences"
            className="text-[var(--color-body)] bg-transparent border-0 p-0 cursor-pointer"
            onClick={onClose}
          >
            <BiX style={{ fontSize: 24 }} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Theme Customizer */}
          <div className="mb-4">

  <div className="mb-4">
  <h6 className="text-sm font-semibold text-[var(--color-heading)] mb-1">Theme Customizer</h6>
  <p className="text-sm text-[var(--color-muted)] mb-3">Choose your preferred theme</p>
  
  <div className="backdrop-blur-md bg-[var(--color-overlay-bg)]/90 border border-[var(--color-border)] rounded-2xl p-2 flex flex-col gap-1.5">
  {themes.map((t) => (
    <button
      key={t.id}
      aria-pressed={theme === t.id}
      className={cn(
        'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-left',
        theme === t.id
          ? 'bg-[var(--color-sidebar-active)]/25 border border-[var(--color-sidebar-active)]/40'
          : 'hover:bg-[var(--color-sidebar-hover)]/60 border border-transparent'
      )}
      onClick={() => setTheme(t.id)}
    >
      <span className="text-lg">{t.icon}</span>
      <span className="text-sm font-medium text-[var(--color-body)]">{t.label}</span>
    </button>
  ))}
</div>
</div>
</div>

          {/* Disable Ads */}
          <div className="border-t border-[var(--color-border)] pt-4">
            <h6 className="text-sm font-semibold text-[var(--color-heading)] mb-1">Disable Ads</h6>
            <p className="text-sm text-[var(--color-muted)] mb-3">
              Real<br></br>
            </p>
            <button
              className={cn(
                'w-full px-3 py-2.5 rounded-xl border cursor-pointer transition-colors duration-150 text-sm font-medium text-left',
                'bg-[var(--color-overlay-bg)] border-[var(--color-border)] text-[var(--color-body)]',
                'hover:bg-[var(--color-sidebar-hover)] hover:border-[var(--color-sidebar-active)]'
              )}
              onClick={handleDisableAds}
            >
              Disable Ads
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
