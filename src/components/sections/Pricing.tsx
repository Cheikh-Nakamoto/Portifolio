'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { HiCheck } from 'react-icons/hi';

const PLANS = [
  {
    name: 'Mission ponctuelle',
    desc: 'Pour un chantier précis ou un renfort court.',
    amt: '30 000 FCFA',
    per: '/ jour (TJM)',
    feats: ['Facturation à la journée', 'Idéal pour audits & POC', 'Démarrage sous 1 semaine', "Sans engagement de durée"],
    cta: 'ghost',
  },
  {
    name: 'Projet au forfait',
    desc: 'Périmètre cadré, budget maîtrisé, livraison garantie.',
    amt: 'Sur devis',
    per: '',
    feats: ['Cahier des charges & jalons', 'Prix fixe, zéro surprise', 'Démos & points hebdo', 'Support 15 jours inclus'],
    cta: 'primary',
    featured: true,
  },
  {
    name: 'Accompagnement mensuel',
    desc: 'Un partenaire intégré à votre équipe sur la durée.',
    amt: '350 000 FCFA',
    per: '/ mois',
    feats: ['Engagement mensuel', 'Disponibilité prioritaire', 'Intégré à vos rituels agiles', 'Tarif dégressif au volume'],
    cta: 'ghost',
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[680px] mx-auto text-center mb-16">
          <span className="eyebrow center">Modalités</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Des formats adaptés à votre besoin</h2>
          <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] mt-4" style={{ color: 'var(--text-2)' }}>
            Transparence totale. Choisissez l&apos;engagement qui correspond à votre projet — chaque mission démarre par un appel de cadrage gratuit.
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className="card relative flex flex-col h-full"
              style={p.featured ? { borderColor: 'var(--accent-line)' } : undefined}
            >
              {p.featured && (
                <span
                  className="absolute -top-[11px] left-8 font-mono text-[.7rem] tracking-[.08em] uppercase px-3 py-1 rounded-full"
                  style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                >
                  Recommandé
                </span>
              )}
              <div className="font-display font-semibold text-[1.2rem]">{p.name}</div>
              <div className="text-[.9rem] mt-1.5 min-h-[42px]" style={{ color: 'var(--text-2)' }}>{p.desc}</div>
              <div className="flex items-baseline gap-1.5 my-6">
                <span className="font-display font-semibold text-[2.6rem] tracking-tight">{p.amt}</span>
                {p.per && <span className="text-[.9rem]" style={{ color: 'var(--text-3)' }}>{p.per}</span>}
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {p.feats.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[.93rem]" style={{ color: 'var(--text-2)' }}>
                    <HiCheck className="flex-none w-[18px] h-[18px] mt-0.5" style={{ color: 'var(--accent)' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn btn-block mt-auto ${p.cta === 'primary' ? 'btn-primary' : 'btn-ghost'}`}>
                {p.cta === 'primary' ? <>Demander un devis <span className="arrow">→</span></> : 'Discutons-en'}
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
