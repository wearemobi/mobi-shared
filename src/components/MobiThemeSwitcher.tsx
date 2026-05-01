import React, { useState, useEffect } from 'react';

export const MobiThemeSwitcher: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkStored = localStorage.getItem('mobi-theme') !== 'light';
    setIsDark(isDarkStored);
    if (isDarkStored) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mobi-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mobi-theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-mobi-border bg-mobi-surface transition-all hover:bg-mobi-surface-hover active:scale-90"
      aria-label="Toggle theme"
      style={{
        display: 'flex',
        height: '2.5rem',
        width: '2.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.75rem',
        border: '1px solid var(--mobi-border)',
        backgroundColor: 'var(--mobi-surface)',
        cursor: 'pointer'
      }}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )}
    </button>
  );
};
