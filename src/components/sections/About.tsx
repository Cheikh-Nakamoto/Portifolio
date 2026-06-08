'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const FACTS = [
  { k: 'Basé à', v: 'Dakar · 100% remote' },
  { k: 'Langues', v: 'FR · EN · Wolof' },
  { k: 'Format', v: 'Régie / Forfait' },
];

export function About() {
  return (
    <section id="apropos" className="py-24 md:py-32">
      <div className="container-px">
        <div className="grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="ph aspect-[4/5] rounded-[18px]">
              <span className="ph__label">portrait — photo pro</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">À propos</span>
            <h2 className="display text-[clamp(2rem,4vw,3.1rem)] my-4 mb-6">
              Un partenaire d&apos;ingénierie, pas seulement une paire de mains.
            </h2>
            <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
              Je m&apos;appelle Cheikh Mounirou. Depuis plus de 3 ans, j&apos;accompagne des équipes produit pour
              transformer des idées en logiciels solides — du premier commit jusqu&apos;au déploiement à grande échelle.
            </p>
            <p style={{ color: 'var(--text-2)' }}>
              J&apos;ai notamment architecturé Kay-Point, un SaaS souverain multi-tenant pour le Ministère de
              l&apos;Éducation du Sénégal (23k+ lignes de Go déployées dans 16 régions), construit TradeFlowSN — une
              plateforme logistique en production à tradeflowsn.com — et encadré 12 développeurs chez 01 Talent
              Senegal. Mon approche est pragmatique : comprendre l&apos;enjeu métier, choisir l&apos;architecture la
              plus simple qui tient la promesse, et instrumenter pour que vous dormiez tranquille.
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
