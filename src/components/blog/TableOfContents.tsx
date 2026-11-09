'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/blog-shared';

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Sommaire" className="toc">
      <div className="font-mono text-[.72rem] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--text-3)' }}>Sur cette page</div>
      <ul className="space-y-1.5 border-l" style={{ borderColor: 'var(--line)' }} lang="en">
        {headings.map((h) => {
          const on = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="block -ml-px border-l pl-3 py-0.5 text-[.88rem] leading-snug transition-colors hover:text-[var(--text)]"
                style={{
                  paddingLeft: h.level === 3 ? 26 : 12,
                  borderColor: on ? 'var(--accent)' : 'transparent',
                  color: on ? 'var(--text)' : 'var(--text-2)',
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
