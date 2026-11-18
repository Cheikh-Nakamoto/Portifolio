'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const CASES = [
  {
    sector: 'ÉNERGIE SOLAIRE',
    meta: 'projet client · Clean Architecture',
    title: 'Une plateforme solaire intelligente avec IA et pré-dimensionnement',
    desc: "Développement de 380 Solutions, une plateforme web pour une société solaire sénégalaise — FAQ bilingue (FR/Wolof), pré-dimensionnement automatique (panneaux, batteries, onduleur), génération de devis PDF et chatbot IA BYOK (DeepSeek/Qwen/OpenRouter).",
    metrics: [
      { n: 'BYOK', l: 'IA multi-provider' },
      { n: '2', l: 'langues (FR · Wolof)' },
      { n: 'CI/CD', l: 'GitHub Actions + Jenkins' },
    ],
    tags: ['Go', 'Gin', 'Next.js 14', 'PostgreSQL', 'Docker', 'Jenkins'],
    media: '/380.png',
  },
  {
    sector: 'LOGISTIQUE',
    meta: 'projet personnel · en production',
    title: 'Une plateforme logistique multi-devises avec 233 tests',
    desc: 'Conception et développement de TradeFlowSN, une plateforme de suivi de conteneurs — gestion multi-devises (EUR / USD / XOF), couverture de tests complète et déploiements automatisés via Jenkins.',
    metrics: [
      { n: '233', l: 'tests automatisés' },
      { n: '3', l: 'devises gérées' },
      { n: 'CI/CD', l: 'pipeline Jenkins' },
    ],
    tags: ['Go', 'React', 'PostgreSQL', 'Redis', 'Jenkins'],
    media: '/tradeflowsn.png',
  },
  {
    sector: 'E-COMMERCE',
    meta: 'bénévolat · monorepo fullstack',
    title: 'Une plateforme e-commerce pour artistes graphistes',
    desc: "Développement bénévole de RBS Crew SN — monorepo avec API Go (chi, pgx, sqlc), Next.js 16 (App Router, React 19), paiements multi-provider (Stripe, Wave, Orange Money), stockage média Cloudflare R2 et migration depuis WordPress.",
    metrics: [
      { n: '4', l: 'providers de paiement' },
      { n: 'R2', l: 'stockage média cloud' },
      { n: 'RBAC', l: 'admin multi-rôles' },
    ],
    tags: ['Go', 'chi', 'Next.js 16', 'PostgreSQL', 'Redis', 'Stripe'],
    media: '/rbs-crew.png',
  },
];

export function CaseStudies() {
  return (
    <section id="cas" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Études de cas</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Des problèmes concrets, des résultats mesurables</h2>
        </Reveal>

        {CASES.map((c, i) => (
          <Reveal key={c.title}>
            <article
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-16 border-t"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="ph aspect-[4/3]"><span className="ph__label"><img className="w-full h-full aspect-video object-contain" src={c.media} alt="" /></span></div>
              </div>
              <div>
                <div className="flex gap-4 items-center mb-4 font-mono text-[.78rem]" style={{ color: 'var(--text-3)' }}>
                  <span style={{ color: 'var(--accent)' }}>{c.sector}</span> · {c.meta}
                </div>
                <h3 className="font-display font-semibold text-[1.7rem] tracking-tight mb-4">{c.title}</h3>
                <p style={{ color: 'var(--text-2)' }}>{c.desc}</p>
                <div className="flex flex-wrap gap-7 my-6">
                  {c.metrics.map((m) => (
                    <div key={m.l}>
                      <div className="font-display font-semibold text-[1.7rem] tracking-tight">{m.n}</div>
                      <div className="text-[.82rem] mt-0.5" style={{ color: 'var(--text-2)' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
