'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const ITEMS = [
  {
    no: '01',
    title: 'Backend & architecture',
    desc: "Conception d'API et de systèmes distribués pensés pour durer : modélisation de données, découpage en services, performance et observabilité.",
    tags: ['Go', 'Java 17 / Spring Boot', 'Rust', 'PostgreSQL', 'Redis'],
  },
  {
    no: '02',
    title: 'Full stack produit',
    desc: 'Des interfaces réactives connectées à un backend solide. Je livre des produits complets, accessibles et testés, du design system au déploiement.',
    tags: ['React 19 / Next.js', 'TypeScript', 'Angular 17', 'Flutter', 'Tests E2E'],
  },
  {
    no: '03',
    title: 'DevOps & cloud',
    desc: "Infrastructure as code, pipelines CI/CD et conteneurisation. J'automatise les déploiements et je mets en place le monitoring pour des releases sereines.",
    tags: ['Docker', 'GitHub Actions / Jenkins', 'Linux', 'Prometheus', 'Grafana'],
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Expertise technique</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">
            Trois domaines, une seule exigence : la fiabilité.
          </h2>
        </Reveal>
        <Reveal>
          {ITEMS.map((item, i) => (
            <div
              key={item.no}
              className={`grid grid-cols-1 md:grid-cols-[40px_1fr] lg:grid-cols-[64px_1fr_1.1fr] gap-5 lg:gap-8 items-start py-8 border-t ${i === ITEMS.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="font-mono text-[.9rem] pt-1" style={{ color: 'var(--text-3)' }}>{item.no}</div>
              <div className="md:col-start-2 lg:col-start-2">
                <h3 className="font-display font-semibold text-[1.32rem] tracking-tight">{item.title}</h3>
              </div>
              <div className="md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-3">
                <p className="mb-4" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
