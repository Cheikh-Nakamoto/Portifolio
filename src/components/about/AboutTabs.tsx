'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AboutTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function AboutTabs({ tabs }: { tabs: AboutTab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  // Permet un lien direct : /a-propos#experience
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (tabs.some((t) => t.id === fromHash)) setActive(fromHash);
  }, [tabs]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  };

  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div role="tablist" aria-label="Sections du profil" className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-10 border-b" style={{ borderColor: 'var(--line)' }}>
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              onClick={() => select(t.id)}
              className="relative shrink-0 px-4 py-2.5 text-[.95rem] font-medium transition-colors"
              style={{ color: selected ? 'var(--text)' : 'var(--text-2)' }}
            >
              {t.label}
              {selected && (
                <motion.span layoutId="about-tab-underline" className="absolute left-2 right-2 -bottom-[9px] h-[2px] rounded-full" style={{ background: 'var(--accent)' }} />
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
