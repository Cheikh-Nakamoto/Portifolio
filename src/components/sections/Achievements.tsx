'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { HiBadgeCheck, HiStar, HiUserGroup } from 'react-icons/hi';

const ITEMS = [
  {
    icon: HiBadgeCheck,
    stat: 'Hedera Certified Developer',
    text: 'Certification délivrée par Hedera Hashgraph en 2025, validant mes compétences sur le développement d\u2019applications décentralisées sur le réseau Hedera.',
    by: 'Hedera Hashgraph',
    role: 'Certification · 2025',
  },
  {
    icon: HiStar,
    stat: '7 étoiles GitHub',
    text: 'Generateur-d\u2019architecture, mon outil desktop en Rust qui scaffold des architectures de projet via l\u2019IA, a été remarqué et adopté par la communauté open source.',
    by: 'github.com/Cheikh-Nakamoto',
    role: 'Projet open source · Rust',
  },
  {
    icon: HiUserGroup,
    stat: '30+ projets développés',
    text: 'Plus de 30 projets réalisés en 3 ans : projets d\u2019apprentissage, hackathons et projets personnels couvrant le fullstack, le mobile et le DevOps.',
    by: '01 Talent Senegal',
    role: 'Apprenant · Zone 01 Dakar',
  },
];

export function Achievements() {
  return (
    <section id="reconnaissance" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Reconnaissance</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Ce qui valide le travail accompli</h2>
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map(({ icon: Icon, stat, text, by, role }) => (
            <div key={stat} className="card flex flex-col h-full">
              <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent)' }}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-display font-semibold text-[1.15rem] mb-3">{stat}</div>
              <p className="mb-5 text-[1.02rem] leading-relaxed" style={{ color: 'var(--text)' }}>{text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="w-[42px] h-[42px] rounded-full grid place-items-center font-display font-semibold" style={{ background: 'var(--bg-3)', border: '1px solid var(--line-2)', color: 'var(--text-2)' }}>
                  {by.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold text-[.95rem]">{by}</div>
                  <div className="text-[.82rem]" style={{ color: 'var(--text-3)' }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
