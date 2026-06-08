'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';

export function CTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-px">
        <Reveal
          className="rounded-[26px] py-20 px-8 md:px-16 text-center"
          style={{ background: 'var(--bg-inv)', color: 'var(--bg)' }}
        >
          <span className="eyebrow center" style={{ color: 'var(--accent)' }}>Disponible Q3 2026</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4 mb-5" style={{ color: 'var(--bg)' }}>
            Un projet en tête ?<br />Construisons-le ensemble.
          </h2>
          <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] mx-auto mb-10 max-w-[560px]" style={{ color: 'color-mix(in srgb, var(--bg) 60%, var(--bg-inv))' }}>
            Décrivez-moi votre besoin en quelques lignes. Je vous réponds sous 24h avec une première lecture honnête de la faisabilité.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a href="#contact" className="btn btn-primary">Démarrer la conversation <span className="arrow">→</span></a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ borderColor: 'color-mix(in srgb, var(--bg) 30%, transparent)', color: 'var(--bg)', background: 'transparent' }}
            >
              Me contacter sur LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
