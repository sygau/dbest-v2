import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'blue'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = localStorage.getItem('selectedTheme')
    // Map old bootstrap theme names to new ones
    if (stored === 'blue-theme') return 'blue'
    if (stored === 'dark') return 'dark'
    if (stored === 'semi-dark') return 'light'
    if (stored === 'light') return 'light'
    return 'light'
  } catch {
    return 'light'
  }
}

const THEME_BG: Record<Theme, string> = {
  light: '#eff1f3',
  dark: '#212529',
  blue: '#0f1535',
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
  // Also keep data-bs-theme for any residual bootstrap references
  const bsTheme = theme === 'blue' ? 'blue-theme' : theme
  document.documentElement.setAttribute('data-bs-theme', bsTheme)
  // Immediately paint the body background so there's no flash on theme switch
  const bg = THEME_BG[theme] ?? '#eff1f3'
  document.documentElement.style.setProperty('--color-body-bg', bg)
  document.body.style.backgroundColor = bg
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const stored = getStoredTheme()
    setThemeState(stored)
    applyTheme(stored)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    try {
      // Store in both old and new format for compatibility
      const bsTheme = newTheme === 'blue' ? 'blue-theme' : newTheme
      localStorage.setItem('selectedTheme', bsTheme)
    } catch {}
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
