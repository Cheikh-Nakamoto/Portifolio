'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { HiMoon, HiSun } from 'react-icons/hi';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-light-surfaceLight dark:bg-dark-surfaceLight border border-light-border dark:border-dark-border hover:border-primary transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <HiSun className="w-5 h-5 text-primary" />
      ) : (
        <HiMoon className="w-5 h-5 text-primary-light" />
      )}
    </button>
  );
}
