import React from 'react';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="p-4 justify-end items-center w-full flex ">
          <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="p-4 bg-white dark:bg-gray-800 shadow mt-4">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} SnackTok. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;