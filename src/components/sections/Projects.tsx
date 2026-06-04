'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { HiExternalLink, HiCode, HiStar } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

export function Projects() {
  const projects = siteConfig.featuredProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section id="projects" className="section-container">
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
            [ Portfolio ]
          </motion.p>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            className="section-title gradient-text"
          >
            Featured Work
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="section-subtitle mx-auto"
          >
            Production-grade applications across Go, Java, Rust, and TypeScript
          </motion.p>
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              className={`
                group relative overflow-hidden rounded-2xl border border-white/[0.06]
                bg-gradient-to-b from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface-hover))]
                hover:border-white/[0.12] transition-all duration-500
                ${project.highlight ? 'md:col-span-2' : ''}
              `}
            >
              {/* Hover gradient overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10" />
              </div>

              {/* Corner accents on hover */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-1.5 -top-1.5 h-2.5 w-2.5 bg-indigo-400/60 rounded-sm" />
                <div className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 bg-purple-400/60 rounded-sm" />
                <div className="absolute -left-1.5 -bottom-1.5 h-2.5 w-2.5 bg-cyan-400/60 rounded-sm" />
                <div className="absolute -right-1.5 -bottom-1.5 h-2.5 w-2.5 bg-indigo-400/60 rounded-sm" />
              </div>

              <div className="relative z-10 p-6 md:p-7 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-indigo-500/10 transition-shadow duration-500">
                      <HiCode className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[rgb(var(--color-text))] group-hover:text-white transition-colors duration-300">
                        {project.name}
                      </h3>
                      {project.highlight && (
                        <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                          <HiStar className="w-3 h-3" />
                          Flagship
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[rgb(var(--color-text-muted))] leading-relaxed mb-5 flex-1 group-hover:text-[rgb(var(--color-text-muted))]/90 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.03] border border-white/[0.06] text-[rgb(var(--color-text-muted))] group-hover:border-white/[0.10] transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-300">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--color-text-muted))] hover:text-white transition-colors duration-200"
                  >
                    <FaGithub className="w-4 h-4" />
                    Source
                  </a>
                  {'live' in project && (
                    <a
                      href={(project as any).live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                    >
                      <HiExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FaGithub className="w-5 h-5" />
            View all repositories
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
