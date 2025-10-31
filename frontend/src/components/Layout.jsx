import React from 'react';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <header className="p-4">
        <div className="container mx-auto flex items-center justify-end">
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto p-4">{children}</main>

      <footer className="p-4 bg-[var(--card)] shadow mt-4">
        <div className="container mx-auto text-center text-[var(--muted)]">
          &copy; {new Date().getFullYear()} SnackTok. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;