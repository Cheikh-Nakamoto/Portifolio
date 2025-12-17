'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { CustomCursor } from '@/components/ui/CustomCursor';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
      <CustomCursor />
      <AnimatedBackground />
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
