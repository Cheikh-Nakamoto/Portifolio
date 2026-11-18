'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { HiBadgeCheck, HiAcademicCap, HiCode } from 'react-icons/hi';

const ITEMS = [
  {
    icon: HiBadgeCheck,
    stat: 'Java Development Certificate',
    text: 'Backend development with the Java ecosystem: Java 17, Spring Boot, REST APIs and microservices.',
    by: '01 Talent Senegal',
    role: 'Certification, 2025',
  },
  {
    icon: HiBadgeCheck,
    stat: 'Hedera Certified Developer',
    text: 'Building applications on the Hedera network, useful when a SaaS needs a verifiable, tamper-proof audit log.',
    by: 'Hedera Hashgraph',
    role: 'Certification, 2025',
  },
  {
    icon: HiAcademicCap,
    stat: '3+ years, 30+ projects',
    text: 'Project-based software engineering program with peer code review. Most projects were backend: Go and Java APIs, PostgreSQL, Docker, CI/CD.',
    by: '01 Talent Senegal (Zone 01 Dakar)',
    role: 'Jan 2023 to Apr 2026',
  },
  {
    icon: HiCode,
    stat: 'Open source',
    text: 'My code is public. Read the multi-tenant middleware, the tests and the commit history before you hire me.',
    by: 'github.com/Cheikh-Nakamoto',
    role: 'Public repositories',
  },
];

export function Achievements() {
  return (
    <section id="credentials" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Credentials</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Why you can trust the work</h2>
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {ITEMS.map(({ icon: Icon, stat, text, by, role }) => (
            <div key={stat} className="card flex flex-col h-full">
              <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent)' }}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-display font-semibold text-[1.15rem] mb-3">{stat}</div>
              <p className="mb-5 text-[1.02rem] leading-relaxed" style={{ color: 'var(--text)' }}>{text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="w-[42px] h-[42px] rounded-full grid place-items-center font-display font-semibold" style={{ background: 'var(--bg-3)', border: '1px solid var(--line-2)', color: 'var(--text-2)' }}>
                  {by.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold text-[.95rem]">{by}</div>
                  <div className="text-[.82rem]" style={{ color: 'var(--text-3)' }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
