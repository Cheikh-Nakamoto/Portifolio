'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { HiCheck } from 'react-icons/hi';

const PLANS = [
  {
    name: 'Hourly',
    desc: 'For a focused task: an endpoint, a bug, a review of your tenant model.',
    amt: 'Hourly',
    per: 'via Upwork or direct',
    feats: ['Start within a week', 'Good for audits & small fixes', 'Weekly time report', 'No minimum commitment'],
    cta: 'ghost',
  },
  {
    name: 'Fixed-price project',
    desc: 'A defined backend: MVP API, multi-tenant setup, auth & roles.',
    amt: 'Fixed',
    per: 'quote in 24h',
    feats: ['Written scope & milestones', 'Pay per milestone', 'Demo at each milestone', '30 days of fixes after delivery'],
    cta: 'primary',
    featured: true,
  },
  {
    name: 'Ongoing backend partner',
    desc: 'Long-term work on your SaaS backend as part of your team.',
    amt: 'Monthly',
    per: 'retainer',
    feats: ['Reserved weekly hours', 'Joins your standups (GMT)', 'Priority on incidents', 'Long-term contracts welcome'],
    cta: 'ghost',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[680px] mx-auto text-center mb-16">
          <span className="eyebrow center">How we can work</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Three ways to work together</h2>
          <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] mt-4" style={{ color: 'var(--text-2)' }}>
            Every project starts with a free 30-minute call. Tell me what you’re building and I’ll suggest the format that fits.
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
                  Most common
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
                {p.cta === 'primary' ? <>Get a quote <span className="arrow">→</span></> : 'Let’s talk'}
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
