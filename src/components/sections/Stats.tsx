'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  decimals?: number;
}

const stats: Stat[] = [
  { value: 60, suffix: '+', label: 'Repositories GitHub', prefix: '' },
  { value: 10, suffix: '+', label: 'Applications livrées', prefix: '' },
  { value: 3, suffix: '', label: "Années d'expérience", prefix: '', decimals: 1 },
  { value: 2023, suffix: '', label: 'Freelance depuis', prefix: '' },
];

function AnimatedCounter({ value, suffix, prefix = '', decimals = 0, label }: Stat) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text tabular-nums tracking-tight">
        {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-[rgb(var(--color-text-muted))] mt-2 font-medium">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Divider gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Divider gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
    </section>
  );
}
