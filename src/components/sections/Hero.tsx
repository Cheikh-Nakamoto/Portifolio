'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { HiArrowDown, HiBriefcase, HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Hero() {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[rgb(var(--color-bg))]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={isLoaded ? { opacity: 0.3, scale: 1, x: 0 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-indigo-500/15 blur-[128px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={isLoaded ? { opacity: 0.2, scale: 1, x: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/12 blur-[128px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={isLoaded ? { opacity: 0.15, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-cyan-500/10 blur-[128px]"
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(rgb(255,255,255) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Available for freelance — remote worldwide
            </span>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 blur-xl animate-pulse-slow" />
              {/* Double border effect */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-cyan-400 opacity-60 blur-sm" />
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-2 ring-white/10">
                <Image
                  src={imageError ? '/images/avatar-fallback.png' : '/avatar-original.jpeg'}
                  alt={siteConfig.name}
                  width={176}
                  height={176}
                  className="object-cover w-full h-full"
                  priority
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {siteConfig.name.split(' ').map((word, i) => (
                <span key={i} className={i === 0 || i === 2 ? 'gradient-text' : 'text-[rgb(var(--color-text))]'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="text-lg md:text-xl text-[rgb(var(--color-text-muted))] font-light max-w-2xl mx-auto leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-2"
          >
            {['Go', 'Java', 'Rust', 'TypeScript', 'React', 'Docker', 'PostgreSQL'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                className="tag"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button onClick={() => scrollToSection('#projects')} className="btn-primary group">
              <HiBriefcase className="w-5 h-5" />
              View Projects
              <motion.span
                className="inline-block ml-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </button>
            <button onClick={() => scrollToSection('#contact')} className="btn-outline">
              <HiMail className="w-5 h-5" />
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center justify-center gap-3 pt-4"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 1 }}
            className="pt-8"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="text-[rgb(var(--color-text-muted))] hover:text-white transition-colors duration-300"
              aria-label="Scroll down"
            >
              <HiArrowDown className="w-6 h-6 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
