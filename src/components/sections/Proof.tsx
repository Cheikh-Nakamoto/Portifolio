'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const PROOF = ['01 Talent Senegal', 'RBS-CREW (Bénévolat)', '380 Solutions', 'TradeFlowSN', 'Hedera Hashgraph', 'GitHub'];

export function Proof() {
  return (
    <section className="border-y py-12" style={{ borderColor: 'var(--line)' }}>
      <Reveal className="container-px">
        <p className="font-mono text-[.74rem] tracking-[.16em] uppercase text-center mb-8" style={{ color: 'var(--text-3)' }}>
          Environnements et communautés avec lesquels j&apos;ai travaillé
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {PROOF.map((name) => (
            <span key={name} className="font-display font-semibold text-[1.1rem] md:text-[1.25rem] tracking-tight opacity-80 flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
              <span className="w-[18px] h-[18px] rounded border-2 inline-block" style={{ borderColor: 'var(--text-3)' }} />
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
