export type Theme = 'light' | 'dark' | 'blue'
export type ThemePreference = 'light' | 'dark' | 'blue-theme' | 'bodered-theme'

export const THEME_STORAGE_KEY = 'selectedTheme'

export const THEME_BG: Record<Theme, string> = {
  light: '#eff1f3',
  dark: '#212529',
  blue: '#0f1535',
}

export function normalizeTheme(value: string | null | undefined): Theme {
  return themeFromPreference(normalizeThemePreference(value))
}

export function normalizeThemePreference(value: string | null | undefined): ThemePreference {
  const normalized = (value ?? '').trim().toLowerCase()

  if (normalized === 'dark') {
    return 'dark'
  }

  if (normalized === 'blue' || normalized === 'blue-theme') {
    return 'blue-theme'
  }

  if (normalized === 'bodered' || normalized === 'bodered-theme') {
    return 'bodered-theme'
  }

  return 'light'
}

export function themeFromPreference(themePreference: ThemePreference): Theme {
  if (themePreference === 'dark') {
    return 'dark'
  }

  if (themePreference === 'blue-theme') {
    return 'blue'
  }

  return 'light'
}

export function getBootstrapTheme(theme: Theme | ThemePreference): ThemePreference {
  return normalizeThemePreference(theme)
}

export function readThemePreferenceFromDocument(): ThemePreference | null {
  if (typeof document === 'undefined') {
    return null
  }

  const bootstrapTheme = document.documentElement.getAttribute('data-bs-theme')
  if (bootstrapTheme) {
    return normalizeThemePreference(bootstrapTheme)
  }

  const documentTheme = document.documentElement.getAttribute('data-theme')
  return documentTheme ? normalizeThemePreference(documentTheme) : null
}

export function readThemeFromDocument(): Theme | null {
  const themePreference = readThemePreferenceFromDocument()
  return themePreference ? themeFromPreference(themePreference) : null
}

export function getStoredThemePreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'light'
  }

  try {
    return normalizeThemePreference(window.localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return 'light'
  }
}

export function getStoredTheme(): Theme {
  return themeFromPreference(getStoredThemePreference())
}

export function persistTheme(theme: Theme | ThemePreference) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, normalizeThemePreference(theme))
  } catch {}
}

export function applyThemeToDocument(themeValue: Theme | ThemePreference) {
  if (typeof document === 'undefined') {
    return
  }

  const bootstrapTheme = getBootstrapTheme(themeValue)
  const theme = themeFromPreference(bootstrapTheme)
  const html = document.documentElement
  const background = THEME_BG[theme]

  html.setAttribute('data-theme', theme)
  html.setAttribute('data-bs-theme', bootstrapTheme)
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
  return themeFromPreference(getInitialThemePreference())
}

export function getInitialThemePreference(): ThemePreference {
  return readThemePreferenceFromDocument() ?? getStoredThemePreference()
}
