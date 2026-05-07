import { useEffect, useState } from 'react';

import {
  applyThemeToDocument,
  getInitialTheme,
  normalizeTheme,
  persistTheme,
} from '@/utils/theme';

export const useThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const initialTheme = getInitialTheme();
      applyThemeToDocument(initialTheme);
      setTheme(initialTheme);
    } catch {
      setTheme('light');
    }
  }, []);

  const switchTheme = (newTheme: string) => {
    try {
      const normalizedTheme = normalizeTheme(newTheme);
      applyThemeToDocument(normalizedTheme);
      persistTheme(normalizedTheme);
      setTheme(normalizedTheme);
    } catch {}
  };

  const handleBlueTheme = () => switchTheme('blue');
  const handleLightTheme = () => switchTheme('light');
  const handleDarkTheme = () => switchTheme('dark');

  const toggleDarkMode = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    switchTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    currentTheme: theme,
    handleBlueTheme,
    handleLightTheme,
    handleDarkTheme,
    toggleDarkMode,
    switchTheme
  };
};

export default useThemeSwitcher;
