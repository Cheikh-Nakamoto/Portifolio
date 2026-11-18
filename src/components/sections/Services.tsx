'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { HiOutlineServer, HiOutlineShieldCheck, HiOutlineCube, HiOutlineCloud } from 'react-icons/hi';

const SERVICES = [
  {
    icon: HiOutlineServer,
    title: 'Multi-tenant SaaS backend',
    desc: 'A backend where every customer’s data stays separate, from the first tenant to the thousandth.',
    items: ['Tenant isolation strategy (shared schema, schema or DB per tenant)', 'PostgreSQL data model with tenant_id everywhere', 'Tenant hierarchies & onboarding'],
  },
  {
    icon: HiOutlineCube,
    title: 'REST APIs in Spring Boot or Go',
    desc: 'Clean, versioned, documented APIs your front-end and integrations can rely on.',
    items: ['Java 17 / Spring Boot 3 or Go (Gin, chi)', 'Documented, versioned endpoints', 'Automated tests in CI'],
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Auth, roles & security',
    desc: 'Make sure users only ever see what their tenant and role allow.',
    items: ['JWT auth & 2FA', 'Role-based access control (RBAC)', 'Audit trail of sensitive actions'],
  },
  {
    icon: HiOutlineCloud,
    title: 'Deploy, monitor & scale',
    desc: 'Ship the backend with confidence and know when something breaks.',
    items: ['Docker & CI/CD (Jenkins, GitHub Actions)', 'Redis caching for hot paths', 'Prometheus & Grafana monitoring'],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">What I build</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Backend work for SaaS teams</h2>
          <p className="text-[clamp(1.05rem,1.7vw,1.32rem)] mt-4" style={{ color: 'var(--text-2)' }}>
            Pick one piece, or hand me the whole backend. I don&apos;t do a bit of everything. I do the server side of SaaS products, and I do it properly.
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, items }) => (
            <div key={title} className="card card-hover flex flex-col gap-4 h-full">
              <div className="w-[46px] h-[46px] rounded-xl grid place-items-center" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent)' }}>
                <Icon className="w-[22px] h-[22px]" />
              </div>
              <h3 className="font-display font-semibold text-[1.32rem] tracking-tight">{title}</h3>
              <p className="text-[.95rem]" style={{ color: 'var(--text-2)' }}>{desc}</p>
              <ul className="mt-auto flex flex-col gap-2 pt-4">
                {items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[.93rem]" style={{ color: 'var(--text-2)' }}>
                    <span className="flex-none mt-2 w-[5px] h-[5px] rounded-full" style={{ background: 'var(--accent)' }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
