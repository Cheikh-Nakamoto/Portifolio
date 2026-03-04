'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';

export function Hero() {
  const [imageError, setImageError] = React.useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden bg-gray-50 dark:bg-neutral-darkest"
    >
      {/* Background Particles Layer */}
      <BackgroundParticles />

      {/* Content Overlay */}
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image - Animated Scale */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <div className="relative w-40 h-40 md:w-48 md:h-48 group">
              <div className="absolute inset-0 rounded-full border-4 border-primary glow-primary transition-all duration-500 group-hover:scale-110 group-hover:border-secondary" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-transparent">
                <Image
                  src="/avatar-original.jpeg"
                  alt={siteConfig.name}
                  width={192}
                  height={192}
                  className="rounded-full object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  priority
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          </motion.div>

          {/* Name - Large & Bold */}
          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-gray-900 dark:text-white mb-4"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Tagline - Glowing gradient text */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl font-bold gradient-text pb-2"
          >
            {siteConfig.tagline}
          </motion.h2>

          {/* CTA Buttons - Animated Hovers */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <motion.button
              onClick={() => scrollToSection('#projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl font-bold text-xl bg-primary text-white
                hover:shadow-[0_0_30px_rgba(0,153,255,0.6)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Voir mes projets</span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl font-bold text-xl
                border-2 border-primary text-gray-900 dark:text-white
                hover:shadow-[0_0_20px_rgba(0,153,255,0.4)] hover:bg-primary/10 transition-all duration-300"
            >
              Me contacter
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Dark overlay to balance the particle brightness if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/80 dark:to-neutral-darkest/80 -z-0 pointer-events-none" />
    </section>
  );
}
