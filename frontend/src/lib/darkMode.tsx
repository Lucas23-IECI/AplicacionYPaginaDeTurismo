import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface DarkModeState {
  theme: Theme;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeState>({ theme: 'light', toggle: () => {} });

export const useDarkMode = () => useContext(DarkModeContext);

const STORAGE_KEY = 'explora_theme';

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved ?? 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <DarkModeContext.Provider value={{ theme, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}
