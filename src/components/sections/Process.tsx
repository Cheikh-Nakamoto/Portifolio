'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  { n: '01', title: 'You tell me what you’re building', text: 'A short message or a 30-minute call. Within 24 hours I tell you honestly whether I’m the right fit.' },
  { n: '02', title: 'Tight scope', text: 'A written plan: tenant model, endpoints, milestones and a fixed or hourly estimate. No surprises later.' },
  { n: '03', title: 'Build in the open', text: 'Repository access from day one, short async updates, and a demo at every milestone.' },
  { n: '04', title: 'Handover', text: 'Deployed, documented and tested — so your team (or the next developer) can take it from there.' },
];

export function Process() {
  return (
    <section id="process" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Working with me</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Async-first, documented, no surprises</h2>
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="relative pt-6 border-t-2" style={{ borderColor: 'var(--line)' }}>
              <span
                className="absolute -top-[2px] left-0 -translate-y-1/2 font-mono text-[.8rem] pr-3 pt-0.5 border-t-2"
                style={{ color: 'var(--accent)', background: 'var(--bg)', borderColor: 'var(--accent)' }}
              >
                {s.n}
              </span>
              <h3 className="font-display font-semibold text-[1.12rem] mb-2">{s.title}</h3>
              <p className="text-[.92rem]" style={{ color: 'var(--text-2)' }}>{s.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
