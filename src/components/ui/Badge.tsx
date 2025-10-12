'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function Badge({ children, className, color }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors',
        'bg-light-surfaceLight dark:bg-dark-surfaceLight',
        'text-gray-700 dark:text-gray-300',
        'border border-light-border dark:border-dark-border',
        className
      )}
      style={color ? { borderColor: color, color } : {}}
    >
      {children}
    </span>
  );
}
