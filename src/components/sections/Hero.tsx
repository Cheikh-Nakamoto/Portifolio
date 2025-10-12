'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { HiDownload, HiArrowRight } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';

export function Hero() {
  const [imageError, setImageError] = React.useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ padding: '3px' }}
              >
                <div className="w-full h-full rounded-full bg-light-bg dark:bg-dark-bg" />
              </motion.div>

              {/* Profile Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full overflow-hidden bg-light-surface dark:bg-dark-surface">
                  {!imageError && (
                    <Image
                      src="/avatar.jpeg"
                      alt={siteConfig.name}
                      fill
                      className="object-cover z-10"
                      priority
                      onError={() => {
                        setImageError(true);
                      }}
                    />
                  )}
                  {/* Fallback icon si pas d'image */}
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <FaUser className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-primary font-medium text-lg mb-4">
              Bonjour, je suis
            </p>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Tagline with gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            {siteConfig.tagline}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {siteConfig.bio}
          </motion.p>

          {/* Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 pt-4"
          >
            {['Go', 'TypeScript', 'Rust', 'Java', 'React', 'Angular'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium text-sm hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button
              onClick={() => scrollToSection('#projects')}
              className="group"
            >
              Voir mes projets
              <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('#contact')}
            >
              Me contacter
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="pt-16"
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                Scroll
              </p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1"
              >
                <motion.div className="w-1 h-3 bg-primary rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
