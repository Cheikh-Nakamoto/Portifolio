'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const CASES = [
  {
    sector: 'ÉDUCATION',
    meta: 'secteur public · SaaS souverain',
    title: 'Un SaaS souverain multi-tenant déployé dans 16 régions',
    desc: "Architecture et développement de Kay-Point, la plateforme de gestion de présence des enseignants pour le Ministère de l'Éducation du Sénégal — pensée pour tourner à l'échelle nationale, en pleine autonomie vis-à-vis des fournisseurs cloud étrangers.",
    metrics: [
      { n: '23k+', l: 'lignes de Go' },
      { n: '16', l: 'régions couvertes' },
      { n: '2', l: 'frontends — React 19 & Flutter' },
    ],
    tags: ['Go', 'Gin', 'React 19', 'Flutter', 'PostgreSQL', 'Redis'],
    media: 'capture produit — Kay-Point',
  },
  {
    sector: 'LOGISTIQUE',
    meta: 'SaaS B2B · en production',
    title: 'Une plateforme logistique multi-devises exploitée en prod',
    desc: 'Conception et développement de TradeFlowSN, une plateforme de suivi de conteneurs en ligne sur tradeflowsn.com — gestion multi-devises (EUR / USD / XOF), couverture de tests complète et déploiements automatisés via Jenkins.',
    metrics: [
      { n: '233', l: 'tests automatisés' },
      { n: '3', l: 'devises gérées' },
      { n: 'CI/CD', l: 'pipeline Jenkins' },
    ],
    tags: ['Go', 'React', 'PostgreSQL', 'Redis', 'Jenkins'],
    media: 'capture produit — TradeFlowSN',
  },
  {
    sector: 'OUTILLAGE',
    meta: 'projet open source · Rust',
    title: "Un générateur de projets piloté par l'IA, salué par la communauté",
    desc: 'Application desktop en Rust qui transforme une description en langage naturel en architecture de projet prête à coder, via l’API Google Gemini — interface Material Design 3 construite avec Slint.',
    metrics: [
      { n: '7', l: 'étoiles GitHub' },
      { n: 'Rust', l: '+ Slint (GUI native)' },
      { n: 'Gemini', l: 'API pour le scaffolding' },
    ],
    tags: ['Rust', 'Slint', 'Gemini API'],
    media: 'schéma — Generateur-d’architecture',
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
                <div className="ph aspect-[4/3]"><span className="ph__label">{c.media}</span></div>
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
