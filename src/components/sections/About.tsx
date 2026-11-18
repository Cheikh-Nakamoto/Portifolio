'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const FACTS = [
  { k: 'Based in', v: 'Dakar, Senegal, remote' },
  { k: 'Time zone', v: 'GMT, EU overlap, US mornings' },
  { k: 'Languages', v: 'English, French, Wolof' },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-px">
        <div className="grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="ph aspect-[4/5] rounded-[18px]">
              <img className="w-full h-full object-cover" src="/portrait.jpg" alt="Cheikh Mounirou Coly Diouf" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">About me</span>
            <h2 className="display text-[clamp(2rem,4vw,3.1rem)] my-4 mb-6">
              Hi, I&apos;m Cheikh. I build the part of your SaaS your users never see, but always feel.
            </h2>
            <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
              I&apos;m a backend developer working in Java (Spring Boot) and Go. For the last 3+ years I&apos;ve built APIs,
              data models and deployment pipelines, and most recently multi-tenant backends where each organisation&apos;s
              data has to stay strictly separate.
            </p>
            <p style={{ color: 'var(--text-2)' }}>
              I work async-first, write down my decisions, and scope projects tightly so there are no surprises at the end.
              You get access to the repository from day one, short written updates, and code that the next developer can read.
            </p>
            <div className="flex flex-wrap gap-12 mt-12">
              {FACTS.map((f) => (
                <div key={f.k}>
                  <div className="font-mono text-[.74rem] tracking-[.1em] uppercase" style={{ color: 'var(--text-3)' }}>{f.k}</div>
                  <div className="font-display font-semibold mt-1">{f.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
