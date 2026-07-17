'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const STATS = [
  { num: '3+ ans', lbl: "d'ingénierie logicielle" },
  { num: '30+', lbl: 'projets développés' },
  { num: '7 ⭐', lbl: 'GitHub stars (Generateur)' },
];

export function Hero() {
  return (
    <section id="top" className="pt-[148px] pb-[var(--s9,96px)]">
      <div className="container-px">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <span
              className="inline-flex items-center gap-2.5 font-mono text-[.8rem] rounded-full border px-3.5 py-[7px] mb-6"
              style={{ color: 'var(--text-2)', borderColor: 'var(--line-2)' }}
            >
              <span className="pulse-dot" /> Disponible pour de nouvelles missions · Q3 2026
            </span>
            <h1 className="display text-[clamp(2.6rem,6.2vw,4.7rem)] mb-6">
              Je transforme les idées en logiciels{' '}
              <em className="not-italic" style={{ color: 'var(--accent)' }}>concrets, fiables et scalables.</em>
            </h1>
            <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] leading-relaxed max-w-[540px] mb-12" style={{ color: 'var(--text-2)' }}>
              Ingénieur Full Stack &amp; Backend basé à Dakar. Crypto-enthousiaste et futur contributeur open source.
              J&apos;accompagne les porteurs d&apos;idées à transformer leurs visions en logiciels concrets
              — en Go, Java, Rust et TypeScript.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#contact" className="btn btn-primary">Démarrer un projet <span className="arrow">→</span></a>
              <a href="#cas" className="btn btn-ghost">Voir les études de cas</a>
            </div>
            <div className="flex flex-wrap gap-12 mt-12">
              {STATS.map((s) => (
                <div key={s.lbl}>
                  <div className="font-display font-semibold text-[2.1rem] tracking-tight leading-none">{s.num}</div>
                  <div className="text-[.88rem] mt-1.5" style={{ color: 'var(--text-2)' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[18px] border overflow-hidden" style={{ background: 'var(--bg-2)', borderColor: 'var(--line)', boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center gap-2 px-4 py-3.5 border-b" style={{ borderColor: 'var(--line)', background: 'var(--bg-3)' }}>
                <span className="w-[11px] h-[11px] rounded-full" style={{ background: 'var(--line-2)' }} />
                <span className="w-[11px] h-[11px] rounded-full" style={{ background: 'var(--line-2)' }} />
                <span className="w-[11px] h-[11px] rounded-full" style={{ background: 'var(--line-2)' }} />
                <span className="ml-2 font-mono text-[.78rem]" style={{ color: 'var(--text-3)' }}>~/cheikh/profile.ts</span>
              </div>
              <div className="p-5 font-mono text-[.83rem] leading-[1.85]" style={{ color: 'var(--text-2)' }}>
                <div><span style={{ color: 'var(--text-3)' }}>{"// engineer.ts"}</span></div>
                <div><span style={{ color: 'var(--accent)' }}>const</span> cheikh = {'{'}</div>
                <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent)' }}>role</span>: <span style={{ color: '#7ec699' }}>&quot;Full Stack · Backend · Crypto Enthusiast&quot;</span>,</div>
                <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent)' }}>focus</span>: [<span style={{ color: '#7ec699' }}>&quot;API&quot;</span>, <span style={{ color: '#7ec699' }}>&quot;Cloud&quot;</span>, <span style={{ color: '#7ec699' }}>&quot;DX&quot;</span>],</div>
                <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent)' }}>stack</span>: [<span style={{ color: '#7ec699' }}>&quot;Go&quot;</span>, <span style={{ color: '#7ec699' }}>&quot;Java&quot;</span>, <span style={{ color: '#7ec699' }}>&quot;Rust&quot;</span>, <span style={{ color: '#7ec699' }}>&quot;TypeScript&quot;</span>],</div>
                <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent)' }}>aspire</span>: [<span style={{ color: '#7ec699' }}>&quot;OSS contributor&quot;</span>, <span style={{ color: '#7ec699' }}>&quot;Crypto builder&quot;</span>],</div>
                <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent)' }}>ship</span>: <span style={{ color: '#e0b25a' }}>async</span> () =&gt; <span style={{ color: '#7ec699' }}>&quot;ideas → reality&quot;</span>,</div>
                <div>{'};'}</div>
                <div>&nbsp;</div>
                <div><span style={{ color: 'var(--text-3)' }}>{"// → j'accompagne les idea guys 🚀"}</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
