'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { siteConfig } from '@/config/site';
import { HiSun, HiMoon, HiMenu, HiX } from 'react-icons/hi';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#cas', label: 'Études de cas' },
  { href: '#projets', label: 'Projets' },
  { href: '#stack', label: 'Stack' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-300 ${
          scrolled
            ? 'backdrop-blur-xl backdrop-saturate-150 border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)]'
            : 'border-transparent'
        }`}
      >
        <div className="container-px flex items-center justify-between h-[72px]">
          <a href="#top" aria-label="Accueil" className="flex items-center gap-2.5 font-display font-semibold text-[1.05rem] tracking-tight">
            <span className="w-[30px] h-[30px] rounded-lg grid place-items-center font-mono font-bold text-[.9rem]" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
              {siteConfig.name.charAt(0)}
            </span>
            <span>mounirou<span style={{ color: 'var(--accent)' }}>.</span>dev</span>
          </a>

          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6 lg:gap-8">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-[.95rem] transition-colors hover:text-[var(--text)]" style={{ color: 'var(--text-2)' }}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Basculer clair / sombre"
              title="Basculer clair / sombre"
              className="w-[42px] h-[42px] rounded-[11px] border grid place-items-center transition-colors hover:text-[var(--accent)]"
              style={{ borderColor: 'var(--line-2)', color: 'var(--text)' }}
            >
              {theme === 'light' ? <HiMoon className="w-[19px] h-[19px]" /> : <HiSun className="w-[19px] h-[19px]" />}
            </button>
            <a href="#contact" className="btn btn-ghost hidden lg:inline-flex">Me contacter</a>
            <a href="#contact" className="btn btn-primary hidden lg:inline-flex">Réserver un appel <span className="arrow">→</span></a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Ouvrir le menu"
              className="md:hidden w-[42px] h-[42px] rounded-[10px] border grid place-items-center"
              style={{ borderColor: 'var(--line-2)', color: 'var(--text)' }}
            >
              {open ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col justify-center gap-6 px-8 transition-transform duration-400 md:hidden ${open ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ background: 'var(--bg)' }}
      >
        {LINKS.concat([{ href: '#contact', label: 'Contact' }]).map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu} className="font-display text-[1.8rem] font-semibold" style={{ color: 'var(--text)' }}>
            {l.label}
          </a>
        ))}
        <div className="font-mono text-[.8rem] mt-6" style={{ color: 'var(--text-3)' }}>
          {siteConfig.links.email} · Disponible Q3 2026
        </div>
      </div>
    </>
  );
}
