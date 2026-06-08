'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { HiOutlineServer, HiOutlineDesktopComputer, HiOutlineCloud, HiOutlineChartBar } from 'react-icons/hi';

const SERVICES = [
  {
    icon: HiOutlineServer,
    title: 'Architecture & API backend',
    desc: 'Conception et développement de services backend robustes, documentés et performants.',
    items: ['Modélisation & schéma de données', 'API REST / GraphQL versionnées', 'Authentification & sécurité'],
  },
  {
    icon: HiOutlineDesktopComputer,
    title: 'Applications full-stack',
    desc: 'Du MVP au produit mature : interfaces soignées connectées à un backend fiable.',
    items: ['Web apps React / Next.js', 'Design system & composants', 'Tests & qualité de code'],
  },
  {
    icon: HiOutlineCloud,
    title: 'Infrastructure & DevOps',
    desc: 'Cloud, conteneurs et automatisation pour déployer vite, souvent et sans stress.',
    items: ['CI/CD & Infrastructure as Code', 'Conteneurisation Docker', 'Monitoring & alerting'],
  },
  {
    icon: HiOutlineChartBar,
    title: 'Audit & performance',
    desc: "Diagnostic technique, optimisation et plan d'action concret pour reprendre le contrôle.",
    items: ["Audit d'architecture & code", 'Optimisation latence / coûts', 'Dette technique & refonte'],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Services</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Ce que je peux prendre en charge</h2>
          <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] mt-4" style={{ color: 'var(--text-2)' }}>
            Des prestations cadrées, orientées résultat. Choisissez un chantier précis ou un accompagnement de bout en bout.
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, items }) => (
            <div key={title} className="card card-hover flex flex-col gap-4 h-full">
              <div className="w-[46px] h-[46px] rounded-xl grid place-items-center" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent)' }}>
                <Icon className="w-[22px] h-[22px]" />
              </div>
              <h3 className="font-display font-semibold text-[1.32rem] tracking-tight">{title}</h3>
              <p className="text-[.95rem]" style={{ color: 'var(--text-2)' }}>{desc}</p>
              <ul className="mt-auto flex flex-col gap-2 pt-4">
                {items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[.93rem]" style={{ color: 'var(--text-2)' }}>
                    <span className="flex-none mt-2 w-[5px] h-[5px] rounded-full" style={{ background: 'var(--accent)' }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
