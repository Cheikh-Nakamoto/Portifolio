'use client';

import React, { useRef, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const QUESTIONS = [
  {
    q: 'What does “multi-tenant” mean for my SaaS?',
    a: 'One application and one codebase serve many customers (tenants), and each customer only ever sees its own data. I choose the isolation model with you — shared schema with a tenant_id, schema per tenant, or database per tenant — based on your customers, compliance needs and budget.',
  },
  {
    q: 'Java (Spring Boot) or Go — which should I pick?',
    a: 'Spring Boot is a great fit if your team already knows Java or you need its large ecosystem (security, integrations). Go gives small, fast services that are cheap to run. If you don’t have a preference, I’ll recommend one in our first call and explain why.',
  },
  {
    q: 'Can you work on an existing backend?',
    a: 'Yes. I start with a short review of the code and data model, point out tenant-isolation and security risks, then fix or extend from there.',
  },
  {
    q: 'What time zone do you work in?',
    a: 'I’m in Dakar, on GMT all year. That gives full overlap with UK and European working hours, and US East Coast mornings.',
  },
  {
    q: 'How do you make sure the code is good?',
    a: 'Automated tests in CI, small pull requests, and documentation of key decisions. TradeFlowSN, for example, runs 233 automated tests on every change. You have full repository access at all times.',
  },
  {
    q: 'Do you sign NDAs? Who owns the code?',
    a: 'Yes, I sign NDAs. You own all the code and data I produce for you.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b" style={{ borderColor: 'var(--line)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-transparent border-0 text-left flex items-center justify-between gap-5 py-5 font-display font-semibold text-[1.12rem]"
        style={{ color: 'var(--text)' }}
      >
        {q}
        <span
          className="flex-none w-6 h-6 rounded-full border grid place-items-center text-[1rem] leading-none transition-transform duration-300"
          style={{
            borderColor: open ? 'var(--accent-line)' : 'var(--line-2)',
            color: open ? 'var(--accent)' : 'var(--text-2)',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>
      <div
        ref={ref}
        className="overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
        style={{ maxHeight: open ? (ref.current?.scrollHeight ?? 400) : 0 }}
      >
        <p className="pb-5 max-w-[680px]" style={{ color: 'var(--text-2)' }}>{a}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[680px] mx-auto text-center mb-16">
          <span className="eyebrow center">FAQ</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Questions clients usually ask</h2>
        </Reveal>
        <Reveal className="max-w-[820px] mx-auto">
          {QUESTIONS.map((item) => <FaqItem key={item.q} {...item} />)}
        </Reveal>
      </div>
    </section>
  );
}
