'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';

const STATS = [
  { num: '3+ yrs', lbl: 'building backends & APIs' },
  { num: '30+', lbl: 'projects shipped, mostly backend' },
  { num: 'GMT', lbl: 'full Europe overlap, US mornings' },
];

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

// Must match the media query in globals.css (.intro-pin / .intro-sticky / .intro-mask).
const INTRO_QUERY = '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

const k = { color: 'var(--accent)' };
const s = { color: '#7ec699' };
const c = { color: 'var(--text-3)' };

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(INTRO_QUERY, () => {
      const nav = document.getElementById('siteNav');
      const ctx = gsap.context(() => {
        if (nav) gsap.set(nav, { autoAlpha: 0 });

        // Soft glows drifting on the paper mask.
        gsap.to('#introBlob1', { x: 9, y: -7, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('#introBlob2', { x: -11, y: 7, duration: 4.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

        // Scroll-scrubbed timeline over the pinned 100vh.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        })
          .to('#introSub', { autoAlpha: 0, duration: 0.18 }, 0)
          .to('#introHint', { autoAlpha: 0, duration: 0.12 }, 0)
          .to('#introWord', { scale: 30, transformOrigin: '50% 50%', duration: 0.86 }, 0)
          .fromTo('#heroContent', { scale: 1.08 }, { scale: 1, duration: 0.86 }, 0)
          .to('#introMask', { autoAlpha: 0, duration: 0.25 }, 0.3);
        if (nav) tl.to(nav, { autoAlpha: 1, duration: 0.2 }, 0.8);

        if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      }, root);
      return () => {
        ctx.revert();
        if (nav) gsap.set(nav, { clearProps: 'opacity,visibility' });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="top" ref={root} className="intro-pin relative">
      {/* No-JS fallback: no mask, no pin. */}
      <noscript>
        <style>{`.intro-mask,.intro-hint{display:none!important}.intro-pin{height:auto!important}.intro-sticky{position:static!important;height:auto!important;padding:148px 0 96px!important}`}</style>
      </noscript>
      <div className="intro-sticky">
      <div id="heroContent" className="container-px w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <span
              className="inline-flex items-center gap-2.5 font-mono text-[.8rem] rounded-full border px-3.5 py-[7px] mb-6"
              style={{ color: 'var(--text-2)', borderColor: 'var(--line-2)' }}
            >
              <span className="pulse-dot" /> Available for new projects, GMT
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

      {/* Paper mask with the word cut out; it zooms toward the viewer and dissolves. */}
      <div id="introMask" className="intro-mask pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="introTextMask" maskUnits="userSpaceOnUse" x="-100" y="-100" width="300" height="300" style={{ maskType: 'luminance' }}>
              <rect x="-100" y="-100" width="300" height="300" fill="#fff" />
              <text id="introWord" x="50" y="47" textAnchor="middle" dominantBaseline="middle" fill="#000"
                style={{ fontFamily: 'var(--font-display), sans-serif' }} fontWeight="700" fontSize="24" textLength="44" lengthAdjust="spacingAndGlyphs">API</text>
              <text id="introSub" x="50" y="63" textAnchor="middle" dominantBaseline="middle" fill="#000"
                style={{ fontFamily: 'var(--font-mono), monospace' }} fontWeight="500" fontSize="3" textLength="44" lengthAdjust="spacingAndGlyphs">JAVA &amp; GO BACKEND</text>
            </mask>
            <radialGradient id="introGlow">
              <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.35 }} />
              <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          <g mask="url(#introTextMask)">
            <rect x="-100" y="-100" width="300" height="300" style={{ fill: 'var(--bg-inv)' }} />
            <circle id="introBlob1" cx="18" cy="28" r="34" fill="url(#introGlow)" />
            <circle id="introBlob2" cx="82" cy="74" r="38" fill="url(#introGlow)" />
          </g>
        </svg>
      </div>

      <div id="introHint" className="intro-hint absolute bottom-10 left-1/2 -translate-x-1/2 z-[6] font-mono text-[.78rem] tracking-[.18em] uppercase" style={{ color: 'var(--bg)' }}>
        Scroll ↓
      </div>
      </div>
    </section>
  );
}
