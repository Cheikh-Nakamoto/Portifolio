'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ContactForm } from '@/types';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker, HiCheckCircle, HiExclamation, HiPaperAirplane } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-16"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            className="text-xs tracking-widest uppercase text-[rgb(var(--color-text-muted))] font-medium"
          >
            [ Contact ]
          </motion.p>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            className="section-title gradient-text"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="section-subtitle mx-auto"
          >
            Available for freelance missions &mdash; remote or on-site in Dakar
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Info Column */}
          <motion.div
            custom={0}
            variants={itemVariants}
            className="lg:col-span-1 space-y-4"
          >
            {/* Email Card */}
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface-hover))] p-6 space-y-5">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[rgb(var(--color-text-muted))]">
                Contact Info
              </h3>

              <a
                href={`mailto:${siteConfig.links.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <HiMail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--color-text-muted))]">Email</p>
                  <p className="font-medium text-sm group-hover:text-indigo-400 transition-colors">
                    {siteConfig.links.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <HiLocationMarker className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--color-text-muted))]">Location</p>
                  <p className="font-medium text-sm">Dakar, Senegal &mdash; GMT</p>
                </div>
              </div>

              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-400">Available for hire</span>
              </div>
            </div>

            {/* Social Card */}
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface-hover))] p-6">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[rgb(var(--color-text-muted))] mb-4">
                Social
              </h3>
              <div className="flex gap-2">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.10] transition-all duration-300 text-sm"
                >
                  <FaGithub className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.10] transition-all duration-300 text-sm"
                >
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            custom={1}
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface-hover))] p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-[rgb(var(--color-text-muted))] mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 text-[rgb(var(--color-text))] placeholder:text-[rgb(var(--color-text-muted))]/50 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[rgb(var(--color-text-muted))] mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 text-[rgb(var(--color-text))] placeholder:text-[rgb(var(--color-text-muted))]/50 text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-[rgb(var(--color-text-muted))] mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 resize-none text-[rgb(var(--color-text))] placeholder:text-[rgb(var(--color-text-muted))]/50 text-sm"
                    placeholder="Tell me about your project, timeline, and budget..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50 text-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
                    <HiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <p className="text-sm text-emerald-400">Message sent! I&apos;ll get back to you within 24h.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
                    <HiExclamation className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">Error sending message. Please email me directly.</p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
