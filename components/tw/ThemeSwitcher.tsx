import { BiPalette, BiCircleHalf, BiMoon, BiX } from 'react-icons/bi'
import { useTheme, Theme } from './ThemeProvider'
import { cn } from '../../lib/cn'

interface ThemeSwitcherProps {
  isOpen: boolean
  onClose: () => void
}

const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: 'blue', label: 'Blue', icon: <BiPalette style={{ fontSize: 22 }} /> },
  { id: 'light', label: 'Light', icon: <BiCircleHalf style={{ fontSize: 22 }} /> },
  { id: 'dark', label: 'Gray', icon: <BiMoon style={{ fontSize: 22 }} /> },
]

export default function ThemeSwitcher({ isOpen, onClose }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30" style={{ zIndex: 998 }} onClick={onClose} />
      )}

      {/* Panel - matches old offcanvas offcanvas-end */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-[var(--color-card-bg)] shadow-2xl transition-transform duration-300 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ zIndex: 999 }}
      >
        {/* Header - matches offcanvas-header border-bottom h-70 */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)]" style={{ height: 70, padding: '0 1.25rem' }}>
          <div>
            <h5 className="m-0 text-base font-semibold text-[var(--color-heading)]">Theme Customizer</h5>
            <p className="m-0 text-sm text-[var(--color-muted)]">Choose your preferred theme</p>
          </div>
          <a
            href="#"
            className="text-[var(--color-body)]"
            onClick={(e) => { e.preventDefault(); onClose() }}
          >
            <BiX style={{ fontSize: 24 }} />
          </a>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto" style={{ padding: '1rem !important'}}>
          <div className="flex flex-col gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-3 rounded-xl border cursor-pointer transition-colors duration-150 text-left',
                  'text-[var(--color-body)]',
                  theme === t.id
                    ? 'bg-[var(--color-sidebar-hover)] border-[var(--color-sidebar-active)] border-2'
                    : 'bg-[var(--color-overlay-bg)] border-[var(--color-border)]'
                )}
                onClick={() => setTheme(t.id)}
              >
                <span>{t.icon}</span>
                <span className="text-sm font-medium flex-1">{t.label}</span>
                {theme === t.id && (
                  <span className="w-2 h-2 rounded-full bg-[var(--color-sidebar-active)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
