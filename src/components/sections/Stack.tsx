'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';

const CATEGORIES = [
  { title: 'Langages', sub: 'typés & performants', names: ['Go', 'Java 17', 'Rust', 'TypeScript', 'JavaScript', 'Python', 'C'] },
  { title: 'Frameworks', sub: 'front & back', names: ['React 19', 'Next.js', 'Angular 17', 'Spring Boot 3', 'Flutter'] },
  { title: 'Données', sub: 'stockage & flux', names: ['PostgreSQL', 'Redis'] },
  { title: 'Cloud & DevOps', sub: 'déploiement & ops', names: ['Docker', 'GitHub Actions', 'Jenkins', 'Linux', 'Prometheus', 'Grafana', 'Git'] },
];

export function Stack() {
  const allNames = new Set(siteConfig.skills.map((s) => s.name));

  return (
    <section id="stack" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Stack technique</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Les outils que je maîtrise au quotidien</h2>
        </Reveal>
        <Reveal>
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-8 py-8 border-t" style={{ borderColor: 'var(--line)' }}>
              <div>
                <h3 className="font-display font-semibold text-[1.05rem]">{cat.title}</h3>
                <div className="font-mono text-[.78rem] mt-1" style={{ color: 'var(--text-3)' }}>{cat.sub}</div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.names.filter((n) => allNames.has(n)).map((n) => (
                  <span key={n} className="chip"><span className="badge-dot" />{n}</span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
