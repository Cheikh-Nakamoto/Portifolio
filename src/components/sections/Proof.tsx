'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const PROOF = [
  'Java Development Certificate',
  'Hedera Certified Developer',
  '233 automated tests (TradeFlowSN)',
  '7 Spring Boot microservices (Neo4Flix)',
  '2 live products (XewXew, TradeFlowSN)',
];

export function Proof() {
  return (
    <section className="border-y py-12" style={{ borderColor: 'var(--line)' }}>
      <Reveal className="container-px">
        <p className="font-mono text-[.74rem] tracking-[.16em] uppercase text-center mb-8" style={{ color: 'var(--text-3)' }}>
          Proof, not adjectives
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PROOF.map((name) => (
            <span key={name} className="font-display font-semibold text-[1rem] md:text-[1.12rem] tracking-tight opacity-80 flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
              <span className="w-[8px] h-[8px] rounded-full inline-block" style={{ background: 'var(--accent)' }} />
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
