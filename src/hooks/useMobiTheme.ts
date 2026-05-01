import { useState, useEffect } from 'react';

/** Available theme modes. `system` follows the OS preference. */
export type MobiTheme = 'light' | 'dark' | 'system';

/**
 * Manages theme state with localStorage persistence and system preference detection.
 * Applies the `.dark` class to `<html>` automatically. Listens for OS preference changes
 * when mode is `system`.
 *
 * @returns `{ theme, setTheme }` — current theme and setter function.
 *
 * @example
 * ```tsx
 * const { theme, setTheme } = useMobiTheme();
 * setTheme('dark');
 * ```
 */
export const useMobiTheme = () => {
  const [theme, setTheme] = useState<MobiTheme>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = localStorage.getItem('mobi-theme') as MobiTheme;
    return stored || 'system';
  });

  const updateTheme = (newTheme: MobiTheme) => {
    setTheme(newTheme);
    window.dispatchEvent(new CustomEvent('mobi-theme-change', { detail: newTheme }));
  };


  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (t: MobiTheme) => {
      if (t === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (systemTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      } else if (t === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('mobi-theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Sync state across all hook instances
  useEffect(() => {
    const handleGlobalChange = (e: any) => {
      if (e.detail !== theme) setTheme(e.detail);
    };
    window.addEventListener('mobi-theme-change', handleGlobalChange);
    return () => window.removeEventListener('mobi-theme-change', handleGlobalChange);
  }, [theme]);

  return { theme, setTheme: updateTheme };
};
