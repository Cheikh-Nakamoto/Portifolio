'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';

const STATS = [
  { num: '3+ yrs', lbl: 'building backends & APIs' },
  { num: '30+', lbl: 'projects shipped, mostly backend' },
  { num: 'GMT', lbl: 'full Europe overlap, US mornings' },
];

const k = { color: 'var(--accent)' };
const s = { color: '#7ec699' };
const c = { color: 'var(--text-3)' };

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
              <span className="pulse-dot" /> Available for new projects · GMT
            </span>
            <h1 className="display text-[clamp(2.2rem,5.2vw,4rem)] mb-6">
              Java &amp; Go Backend Developer{' '}
              <span style={{ color: 'var(--text-3)' }}>|</span>{' '}
              <em className="not-italic whitespace-nowrap" style={{ color: 'var(--accent)' }}>Multi-Tenant</em>{' '}<em className="not-italic" style={{ color: 'var(--accent)' }}>SaaS APIs</em>{' '}
              <span style={{ color: 'var(--text-3)' }}>|</span> Spring Boot
            </h1>
            <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] leading-relaxed max-w-[560px] mb-12" style={{ color: 'var(--text-2)' }}>
              Building a SaaS? Your backend must keep each customer&apos;s data isolated, secure and fast as you grow.
              I build multi-tenant backends and APIs in Java (Spring Boot) and Go that do exactly that.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#contact" className="btn btn-primary">Hire me <span className="arrow">→</span></a>
              <a href="#cases" className="btn btn-ghost">See case studies</a>
              <a href={siteConfig.links.upwork} target="_blank" rel="noopener noreferrer" className="text-[.95rem] underline underline-offset-4" style={{ color: 'var(--text-2)' }}>View my Upwork profile ↗</a>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-6 mt-12">
              {STATS.map((st) => (
                <div key={st.lbl}>
                  <div className="font-display font-semibold text-[2.1rem] tracking-tight leading-none">{st.num}</div>
                  <div className="text-[.88rem] mt-1.5" style={{ color: 'var(--text-2)' }}>{st.lbl}</div>
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
                <span className="ml-2 font-mono text-[.78rem]" style={{ color: 'var(--text-3)' }}>middleware/tenant.go</span>
              </div>
              <div className="p-5 font-mono text-[.8rem] leading-[1.85] overflow-x-auto" style={{ color: 'var(--text-2)' }}>
                <div><span style={c}>{'// Every request is scoped to one tenant.'}</span></div>
                <div><span style={k}>func</span> TenantScope() gin.HandlerFunc {'{'}</div>
                <div>&nbsp;&nbsp;<span style={k}>return func</span>(c *gin.Context) {'{'}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;claims := auth.FromJWT(c)</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={k}>if</span> claims.TenantID == <span style={s}>&quot;&quot;</span> {'{'}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.AbortWithStatus(<span style={s}>403</span>)</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={k}>return</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;c.Set(<span style={s}>&quot;tenant&quot;</span>, claims.TenantID)</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;c.Next()</div>
                <div>&nbsp;&nbsp;{'}'}</div>
                <div>{'}'}</div>
                <div>&nbsp;</div>
                <div><span style={c}>{'// → no query runs without a tenant_id'}</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
