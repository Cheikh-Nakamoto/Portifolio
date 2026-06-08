'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  { n: '01', title: 'Découverte', text: 'Appel de cadrage pour comprendre vos objectifs, contraintes et le contexte technique existant.' },
  { n: '02', title: 'Cadrage', text: 'Proposition détaillée : périmètre, architecture, jalons et estimation. Pas de zone d’ombre.' },
  { n: '03', title: 'Build', text: 'Développement itératif avec points réguliers, démos et accès continu au code et à l’avancement.' },
  { n: '04', title: 'Livraison & suivi', text: 'Mise en production, documentation, transfert de compétences et période de support incluse.' },
];

export function Process() {
  return (
    <section id="processus" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Processus de collaboration</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Une méthode claire, du premier échange à la prod</h2>
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
