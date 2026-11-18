'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const ITEMS = [
  {
    no: '01',
    title: 'Isolation by design',
    desc: 'The tenant is resolved once per request, from the JWT and never from a URL parameter the user can change, and every query is scoped to it. One customer can’t read another’s data, even by accident.',
    tags: ['Tenant middleware', 'tenant_id on every table', 'Scoped repositories'],
  },
  {
    no: '02',
    title: 'Roles inside each tenant',
    desc: 'Real SaaS customers have admins, managers and members. I model roles and hierarchies explicitly so permissions stay correct as organisations grow.',
    tags: ['RBAC', 'Hierarchical tenants', 'JWT & 2FA', 'Audit trail'],
  },
  {
    no: '03',
    title: 'Fast as you grow',
    desc: 'Indexes that include the tenant, Redis for hot reads, and automated tests in CI so new features don’t break existing customers.',
    tags: ['PostgreSQL', 'Redis', 'Automated tests', 'Docker & CI/CD'],
  },
];

export function Expertise() {
  return (
    <section id="approach" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">How I keep tenants isolated</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">
            Multi-tenancy is easy to start and hard to get right.
          </h2>
          <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] mt-4" style={{ color: 'var(--text-2)' }}>
            Most data leaks in SaaS come from one forgotten filter. Here is how I make that mistake impossible.
          </p>
        </Reveal>
        <Reveal>
          {ITEMS.map((item, i) => (
            <div
              key={item.no}
              className={`grid grid-cols-1 md:grid-cols-[40px_1fr] lg:grid-cols-[64px_1fr_1.1fr] gap-5 lg:gap-8 items-start py-8 border-t ${i === ITEMS.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="font-mono text-[.9rem] pt-1" style={{ color: 'var(--text-3)' }}>{item.no}</div>
              <div className="md:col-start-2 lg:col-start-2">
                <h3 className="font-display font-semibold text-[1.32rem] tracking-tight">{item.title}</h3>
              </div>
              <div className="md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-3">
                <p className="mb-4" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
