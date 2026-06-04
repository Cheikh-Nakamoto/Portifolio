'use client';

import React, { useEffect, useState } from 'react';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutInner({ children }: LayoutProps) {
  const { collapsed } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const marginLeft = !mounted
    ? '0px'
    : window.innerWidth >= 1024
      ? collapsed ? '72px' : '240px'
      : '0px';

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]">
      <Sidebar />
      <main
        className="transition-all duration-500"
        style={{ marginLeft }}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutInner>{children}</LayoutInner>
    </SidebarProvider>
  );
}
