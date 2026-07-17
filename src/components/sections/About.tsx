'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const FACTS = [
  { k: 'Basé à', v: 'Dakar · 100% remote' },
  { k: 'Langues', v: 'FR · EN · Wolof' },
  { k: 'Passion', v: 'Crypto · Open Source' },
];

export function About() {
  return (
    <section id="apropos" className="py-24 md:py-32">
      <div className="container-px">
        <div className="grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="ph aspect-[4/5] rounded-[18px]">
              <img className="w-full h-full object-cover" src="/portrait.jpg" alt="" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">À propos</span>
            <h2 className="display text-[clamp(2rem,4vw,3.1rem)] my-4 mb-6">
              Un ingénieur passionné, toujours en apprentissage.
            </h2>
            <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
              Je m&apos;appelle Cheikh Mounirou. Depuis plus de 3 ans, je développe des projets logiciels —
              en apprentissage, en hackathon ou en solo — pour transformer des idées en code concret.
            </p>
            <p style={{ color: 'var(--text-2)' }}>
              Parmi mes projets notables : Kay-Point, un concept de SaaS multi-tenant de gestion de présence
              (23k+ lignes de Go, pas encore en prod), TradeFlowSN — une plateforme logistique avec 233 tests —
              et Generateur-d&apos;architecture (7 ⭐ GitHub). Bénévole sur le site d&apos;artiste graphiste RBS.
              Crypto-enthousiaste et futur contributeur open source, j&apos;accompagne les porteurs d&apos;idées
              à matérialiser leurs projets.
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
