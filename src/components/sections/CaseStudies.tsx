'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

// Each case is told as Situation → Complication → Action → Result.
const CASES = [
  {
    sector: 'MULTI-TENANT SAAS',
    label: 'Personal project · not in production yet',
    title: 'Kay-Point — one platform, many isolated organisations',
    star: [
      { k: 'Situation', v: 'Teacher attendance in Senegalese schools is still tracked on paper, across a national hierarchy: ministry → regional inspectorates → schools.' },
      { k: 'Complication', v: 'Each inspectorate must see only its own schools and teachers, while the ministry needs a national view — classic multi-tenant isolation with a hierarchy on top.' },
      { k: 'Action', v: 'Designed a Go (Gin) API where a middleware builds a tenant scope from JWT claims on every request; 8 RBAC roles, 2FA, audit trail, geolocation check-in, PostgreSQL + Redis.' },
      { k: 'Result', v: 'A working multi-tenant backend with web (React) and mobile (Flutter) clients — the architecture I now reuse for SaaS backends.' },
    ],
    metrics: [
      { n: '3', l: 'tenant hierarchy levels' },
      { n: '8', l: 'RBAC roles' },
      { n: '23k+', l: 'lines of Go' },
    ],
    tags: ['Go', 'Gin', 'PostgreSQL', 'Redis', 'JWT', 'RBAC'],
    media: '/Kay-pointé.png',
  },
  {
    sector: 'LOGISTICS',
    label: 'Live product · tradeflowsn.com',
    title: 'TradeFlowSN — a tested backend for container tracking',
    star: [
      { k: 'Situation', v: 'Importers need to follow each container and its costs from purchase to delivery, in one place.' },
      { k: 'Complication', v: 'Prices come in EUR, USD and XOF, and a wrong conversion means a wrong invoice.' },
      { k: 'Action', v: 'Built a Go API on PostgreSQL and Redis with multi-currency pricing, covered it with automated tests and deployed it through a Jenkins pipeline.' },
      { k: 'Result', v: 'In production, with 233 automated tests running on every change.' },
    ],
    metrics: [
      { n: '233', l: 'automated tests' },
      { n: '3', l: 'currencies handled' },
      { n: 'Live', l: 'in production' },
    ],
    tags: ['Go', 'PostgreSQL', 'Redis', 'Jenkins', 'React'],
    media: '/tradeflowsn.png',
  },
  {
    sector: 'JAVA MICROSERVICES',
    label: 'Personal project',
    title: 'Neo4Flix — Spring Boot microservices behind one gateway',
    star: [
      { k: 'Situation', v: 'A movie platform that recommends films from what users and similar users have rated.' },
      { k: 'Complication', v: 'Users, catalogue, ratings and recommendations scale differently and need to deploy independently.' },
      { k: 'Action', v: 'Split the system into 7 Spring Boot services with Eureka discovery and a Spring Cloud API gateway, using Neo4j for graph-based recommendations.' },
      { k: 'Result', v: 'Each service can be deployed and scaled on its own, behind a single entry point for the Angular front-end.' },
    ],
    metrics: [
      { n: '7', l: 'Spring Boot services' },
      { n: '1', l: 'API gateway' },
      { n: 'Graph', l: 'recommendations (Neo4j)' },
    ],
    tags: ['Java 17', 'Spring Boot', 'Spring Cloud', 'Eureka', 'Neo4j'],
    media: '/neo4flix.png',
  },
];

export function CaseStudies() {
  return (
    <section id="cases" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Case studies</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Have I done this before? Yes — here’s how.</h2>
          <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] mt-4" style={{ color: 'var(--text-2)' }}>
            Every project is labelled honestly: client work, live product or personal project.
          </p>
        </Reveal>

        {CASES.map((c, i) => (
          <Reveal key={c.title}>
            <article
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-16 border-t"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="ph aspect-[4/3]"><span className="ph__label"><img className="w-full h-full aspect-video object-contain" src={c.media} alt={c.title} /></span></div>
              </div>
              <div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 items-center mb-4 font-mono text-[.78rem]" style={{ color: 'var(--text-3)' }}>
                  <span style={{ color: 'var(--accent)' }}>{c.sector}</span> · {c.label}
                </div>
                <h3 className="font-display font-semibold text-[1.6rem] tracking-tight mb-5">{c.title}</h3>
                <dl className="flex flex-col gap-3">
                  {c.star.map((row) => (
                    <div key={row.k} className="grid grid-cols-[110px_1fr] gap-3">
                      <dt className="font-mono text-[.74rem] uppercase tracking-[.08em] pt-1" style={{ color: 'var(--text-3)' }}>{row.k}</dt>
                      <dd className="text-[.96rem]" style={{ color: row.k === 'Result' ? 'var(--text)' : 'var(--text-2)' }}>{row.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-7 my-6">
                  {c.metrics.map((m) => (
                    <div key={m.l}>
                      <div className="font-display font-semibold text-[1.7rem] tracking-tight">{m.n}</div>
                      <div className="text-[.82rem] mt-0.5" style={{ color: 'var(--text-2)' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
