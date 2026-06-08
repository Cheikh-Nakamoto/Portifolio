'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ContactForm } from '@/types';
import { siteConfig } from '@/config/site';
import { Reveal } from '@/components/ui/Reveal';
import { HiMail, HiArrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const PROJECT_TYPES = [
  'Architecture & API backend',
  'Application full-stack',
  'Infrastructure & DevOps',
  'Audit & optimisation',
  'Autre / je ne sais pas encore',
];

const LINKS = [
  { icon: HiMail, k: 'Email', v: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
  { icon: FaGithub, k: 'GitHub', v: 'github.com/Cheikh-Nakamoto', href: siteConfig.links.github },
  { icon: FaLinkedin, k: 'LinkedIn', v: 'Réseau professionnel', href: siteConfig.links.linkedin },
];

export function Contact() {
  const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey ||
      serviceId.includes('ton_') || templateId.includes('ton_') || publicKey.includes('ta_')) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        project_type: projectType,
        time: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
        from_name: formData.name,
        from_email: formData.email,
        to_name: siteConfig.name,
      }, publicKey);

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = 'font-sans text-[.98rem] rounded-xl px-[15px] py-[13px] border outline-none transition-colors';
  const inputStyle = { background: 'var(--bg-2)', borderColor: 'var(--line-2)', color: 'var(--text)' } as const;

  return (
    <section id="contact" className="py-20 md:py-24">
      <div className="container-px">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h2 className="display text-[clamp(2rem,4vw,3.1rem)] my-4">Parlons de votre projet</h2>
            <p className="mb-8" style={{ color: 'var(--text-2)' }}>
              Remplissez le formulaire ou contactez-moi directement via l&apos;un des canaux ci-dessous. Réponse garantie sous 24h ouvrées.
            </p>
            <div className="flex flex-col gap-3">
              {LINKS.map(({ icon: Icon, k, v, href }) => (
                <a
                  key={k}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 rounded-xl border p-5 transition-all duration-200 hover:translate-x-1"
                  style={{ borderColor: 'var(--line)', background: 'var(--bg-2)' }}
                >
                  <span className="flex-none w-[42px] h-[42px] rounded-lg border grid place-items-center" style={{ borderColor: 'var(--line-2)', color: 'var(--text)' }}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[.74rem] uppercase tracking-[.06em]" style={{ color: 'var(--text-3)' }}>{k}</span>
                    <span className="font-semibold text-[.98rem]">{v}</span>
                  </span>
                  <HiArrowRight className="ml-auto w-4 h-4" style={{ color: 'var(--text-3)' }} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="card p-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="f-name" className="font-mono text-[.76rem] tracking-[.08em] uppercase" style={{ color: 'var(--text-3)' }}>Nom</label>
                  <input id="f-name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Votre nom" className={inputClass} style={inputStyle} />
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="f-email" className="font-mono text-[.76rem] tracking-[.08em] uppercase" style={{ color: 'var(--text-3)' }}>Email</label>
                  <input id="f-email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="vous@entreprise.com" className={inputClass} style={inputStyle} />
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="f-type" className="font-mono text-[.76rem] tracking-[.08em] uppercase" style={{ color: 'var(--text-3)' }}>Type de projet</label>
                <select id="f-type" value={projectType} onChange={(e) => setProjectType(e.target.value)} className={inputClass} style={inputStyle}>
                  {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <label htmlFor="f-msg" className="font-mono text-[.76rem] tracking-[.08em] uppercase" style={{ color: 'var(--text-3)' }}>Votre projet</label>
                <textarea id="f-msg" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Décrivez votre besoin, votre échéance et votre contexte…" className={`${inputClass} resize-y min-h-[120px]`} style={inputStyle} />
              </div>
              <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-block disabled:opacity-50">
                {status === 'loading' ? 'Envoi en cours…' : <>Envoyer le message <span className="arrow">→</span></>}
              </button>
              <p className="font-mono text-center text-[.78rem] mt-3.5" style={{ color: status === 'error' ? 'var(--accent)' : status === 'success' ? 'var(--accent)' : 'var(--text-3)' }}>
                {status === 'success'
                  ? 'Merci ! Je vous réponds sous 24h ouvrées.'
                  : status === 'error'
                    ? 'Configuration email manquante — contactez-moi directement par email.'
                    : 'Réponse sous 24h ouvrées · vos données restent confidentielles'}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
