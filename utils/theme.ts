export type Theme = 'light' | 'dark' | 'blue'

export const THEME_STORAGE_KEY = 'selectedTheme'

export const THEME_BG: Record<Theme, string> = {
  light: '#eff1f3',
  dark: '#212529',
  blue: '#0f1535',
}

export function normalizeTheme(value: string | null | undefined): Theme {
  const normalized = (value ?? '').trim().toLowerCase()
  if (normalized === 'dark') return 'dark'
  if (normalized === 'blue' || normalized === 'blue-theme') return 'blue'
  return 'light'
}

export function readThemeFromDocument(): Theme | null {
  if (typeof document === 'undefined') return null
  const theme = document.documentElement.getAttribute('data-theme')
  return theme ? normalizeTheme(theme) : null
}

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    return normalizeTheme(window.localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return 'light'
  }
}

export function persistTheme(theme: Theme | string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, normalizeTheme(theme))
  } catch {}
}

export function applyThemeToDocument(themeValue: Theme | string) {
  if (typeof document === 'undefined') return

  const theme = normalizeTheme(themeValue)
  const html = document.documentElement
  const background = THEME_BG[theme]

  html.setAttribute('data-theme', theme)
  html.style.setProperty('--color-body-bg', background)
  html.style.colorScheme = theme === 'light' ? 'light' : 'dark'

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeColor) {
    themeColor.setAttribute('content', background)
  }

  if (document.body) {
    document.body.style.backgroundColor = background
  }
}

export function getInitialTheme(): Theme {
  return readThemeFromDocument() ?? getStoredTheme()
}
