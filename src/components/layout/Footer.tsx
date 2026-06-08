'use client';

import React from 'react';
import { siteConfig } from '@/config/site';

const NAV_COLS = [
  {
    title: 'Naviguer',
    links: [
      { href: '#services', label: 'Services' },
      { href: '#cas', label: 'Études de cas' },
      { href: '#projets', label: 'Projets' },
      { href: '#stack', label: 'Stack' },
    ],
  },
  {
    title: 'Infos',
    links: [
      { href: '#tarifs', label: 'Tarifs' },
      { href: '#faq', label: 'FAQ' },
      { href: '#processus', label: 'Processus' },
      { href: '#contact', label: 'Contact' },
    ],
  },
  {
    title: 'Réseaux',
    links: [
      { href: siteConfig.links.github, label: 'GitHub', external: true },
      { href: siteConfig.links.linkedin, label: 'LinkedIn', external: true },
      { href: `mailto:${siteConfig.links.email}`, label: 'Email' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t pt-16 pb-12" style={{ borderColor: 'var(--line)' }}>
      <div className="container-px">
        <div className="flex flex-wrap justify-between gap-12 mb-16">
          <div className="max-w-[300px]">
            <a href="#top" className="flex items-center gap-2.5 font-display font-semibold text-[1.05rem] tracking-tight">
              <span className="w-[30px] h-[30px] rounded-lg grid place-items-center font-mono font-bold text-[.9rem]" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                {siteConfig.name.charAt(0)}
              </span>
              <span>mounirou<span style={{ color: 'var(--accent)' }}>.</span>dev</span>
            </a>
            <p className="text-[.93rem] mt-4" style={{ color: 'var(--text-2)' }}>
              Ingénieur Full Stack · Backend · DevOps freelance. Des produits fiables, du code propre, des déploiements sereins.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            {NAV_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[.74rem] tracking-[.12em] uppercase mb-4" style={{ color: 'var(--text-3)' }}>{col.title}</h4>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className="block text-[.94rem] py-[5px] transition-colors hover:text-[var(--text)]"
                    style={{ color: 'var(--text-2)' }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-5 pt-8 border-t" style={{ borderColor: 'var(--line)' }}>
          <p className="font-mono text-[.86rem]" style={{ color: 'var(--text-3)' }}>© {new Date().getFullYear()} {siteConfig.name} — Tous droits réservés</p>
          <p className="font-mono text-[.86rem]" style={{ color: 'var(--text-3)' }}>Disponible Q3 2026 · Dakar &amp; remote</p>
        </div>
      </div>
    </footer>
  );
}
