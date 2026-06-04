'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { HiBadgeCheck, HiBriefcase, HiAcademicCap, HiHeart } from 'react-icons/hi';

export function About() {
  const skillsByCategory = {
    languages: siteConfig.skills.filter(s => s.category === 'language'),
    frameworks: siteConfig.skills.filter(s => s.category === 'framework'),
    tools: siteConfig.skills.filter(s => s.category === 'tool'),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
  };

  return (
    <section id="about" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-20"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            className="text-xs tracking-widest uppercase text-[rgb(var(--color-text-muted))] font-medium"
          >
            [ About ]
          </motion.p>
          <motion.h2 variants={itemVariants} custom={0} className="section-title gradient-text">
            Background & Skills
          </motion.h2>
        </div>

        {/* Bio + Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bio */}
          <motion.div
            variants={itemVariants}
            custom={1}
            className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface-hover))] p-7 space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <HiAcademicCap className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold">Background</h3>
            </div>
            <p className="text-sm text-[rgb(var(--color-text-muted))] leading-relaxed">
              {siteConfig.bio}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {siteConfig.softSkills.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.03] border border-white/[0.06] text-[rgb(var(--color-text-muted))]">
                  {s}
                </span>
              ))}
            </div>

            {/* Availability CTA */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-400">Open to freelance — worldwide</span>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            variants={itemVariants}
            custom={2}
            className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface-hover))] p-7 space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <HiBriefcase className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">Experience</h3>
            </div>

            <div className="relative pl-6 border-l border-white/[0.08] space-y-6">
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 ring-4 ring-[rgb(var(--color-bg))]" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">{siteConfig.experience.role}</h4>
                  <p className="text-sm font-medium gradient-text">{siteConfig.experience.company}</p>
                  <p className="text-xs text-[rgb(var(--color-text-muted))]">{siteConfig.experience.period}</p>
                  <p className="text-sm text-[rgb(var(--color-text-muted))] leading-relaxed mt-3">
                    {siteConfig.experience.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          variants={itemVariants}
          custom={3}
          className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface-hover))] p-7 md:p-8"
        >
          <h3 className="text-lg font-semibold mb-8 text-center">Technical Skills</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.languages.map(s => (
                  <span key={s.name} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-4">Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.frameworks.map(s => (
                  <span key={s.name} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">Tools & Infra</h4>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.tools.map(s => (
                  <span key={s.name} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications + Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} custom={4}>
            <h3 className="text-lg font-semibold mb-5 text-center">Certifications</h3>
            <div className="space-y-3">
              {siteConfig.certifications.map(cert => (
                <a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <HiBadgeCheck className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-indigo-400 transition-colors">{cert.name}</h4>
                    <p className="text-xs text-[rgb(var(--color-text-muted))]">{cert.issuer} &mdash; {cert.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom={5}
            className="flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold mb-5 text-center">Languages</h3>
            <div className="flex items-center justify-center gap-8">
              {siteConfig.languages.map(lang => (
                <div key={lang.name} className="text-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] min-w-[100px]">
                  <span className="block text-lg font-bold gradient-text">{lang.level}</span>
                  <span className="block text-xs text-[rgb(var(--color-text-muted))] mt-1">{lang.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
