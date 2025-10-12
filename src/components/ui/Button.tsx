'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary dark:bg-primary text-dark-bg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30',
    secondary:
      'bg-secondary dark:bg-secondary text-dark-bg hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/30',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-dark-bg dark:hover:text-dark-bg',
    ghost: 'text-primary hover:bg-primary/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
