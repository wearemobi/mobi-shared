import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface MobiThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const MobiThemeContext = createContext<MobiThemeContextValue | null>(null);

const STORAGE_KEY = 'mobi-theme';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
}

export interface MobiThemeProviderProps {
  children: React.ReactNode;
  /** Default theme if no stored preference found. Defaults to 'system'. */
  defaultTheme?: Theme;
  /** Storage key to persist the theme. Defaults to 'mobi-theme'. */
  storageKey?: string;
}

export const MobiThemeProvider: React.FC<MobiThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) ?? defaultTheme;
  });

  const resolvedTheme: 'light' | 'dark' = theme === 'system' ? getSystemTheme() : theme;

  // Apply the class to <html> whenever resolved theme changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system theme changes when theme === 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(getSystemTheme());
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = (next: Theme) => {
    localStorage.setItem(storageKey, next);
    setThemeState(next);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <MobiThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </MobiThemeContext.Provider>
  );
};

export function useMobiTheme(): MobiThemeContextValue {
  const ctx = useContext(MobiThemeContext);
  if (!ctx) {
    throw new Error('useMobiTheme must be used inside <MobiThemeProvider>');
  }
  return ctx;
}
