import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'

import {
  applyThemeToDocument,
  getInitialTheme,
  persistTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from '@/utils/theme'

export type { Theme }

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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const initialTheme = getInitialTheme()
    setThemeState(initialTheme)
    applyThemeToDocument(initialTheme)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    applyThemeToDocument(newTheme)
    persistTheme(newTheme)
  }, [])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== THEME_STORAGE_KEY) {
        return
      }

      const nextTheme = getInitialTheme()
      setThemeState(nextTheme)
      applyThemeToDocument(nextTheme)
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
