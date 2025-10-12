'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border p-6 transition-all duration-300',
        hover && 'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
