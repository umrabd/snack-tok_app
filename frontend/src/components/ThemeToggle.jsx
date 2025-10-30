import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
      document.documentElement.classList.add('theme-transition');
      return;
    }
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
      document.documentElement.classList.add('theme-transition');
      return;
    }
    // no stored preference -> respect system
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
    document.documentElement.classList.add('theme-transition');
  }, []);

  const toggle = () => {
    const nowDark = !isDark;
    setIsDark(nowDark);
    if (nowDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    // briefly keep transition class for smoothness
    document.documentElement.classList.add('theme-transition');
    window.setTimeout(() => document.documentElement.classList.remove('theme-transition'), 250);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex cursor-pointer items-center justify-center w-10 h-10 rounded-lg bg-card text-text shadow-sm hover:shadow-md border border-transparent hover:border-[rgba(0,0,0,0.04)] transition"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 3v1M12 20v1M4.2 4.2l.7.7M18.1 18.1l.7.7M1 12h1M22 12h1M4.2 19.8l.7-.7M18.1 5.9l.7-.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;