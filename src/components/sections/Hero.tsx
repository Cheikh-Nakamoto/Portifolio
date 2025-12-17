'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { HiDownload, HiArrowRight } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';

// Dynamically import 3D components (client-side only)
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-neutral-dark" />,
});
const AvatarSphere = dynamic(() => import('@/components/3d/hero/AvatarSphere').then(mod => ({ default: mod.AvatarSphere })), { ssr: false });
const TechIcons = dynamic(() => import('@/components/3d/hero/TechIcons').then(mod => ({ default: mod.TechIcons })), { ssr: false });
const HeroParticles = dynamic(() => import('@/components/3d/hero/HeroParticles').then(mod => ({ default: mod.HeroParticles })), { ssr: false });

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
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-neutral-dark" />}>
          <Scene camera={{ position: [0, 0, 8], fov: 75 }} enablePostProcessing>
            <HeroParticles />
            <AvatarSphere />
            <TechIcons />
          </Scene>
        </Suspense>
      </div>

      {/* Content Overlay - Minimal & Clean */}
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-12">
          {/* Profile Image - Clean & Modern */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <div className="absolute inset-0 rounded-full border-4 border-primary glow-primary animate-pulse" />
              <Image
                src="/images/avatar-original.jpeg"
                alt={siteConfig.name}
                width={192}
                height={192}
                className="rounded-full object-cover w-full h-full"
                priority
                onError={() => setImageError(true)}
              />
            </div>
          </motion.div>

          {/* Name - Large & Bold */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-7xl md:text-9xl font-black tracking-tight text-white"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Tagline - Clean without excessive effects */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold text-primary"
          >
            {siteConfig.tagline}
          </motion.h2>

          {/* CTA Buttons - Primary Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <motion.button
              onClick={() => scrollToSection('#projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl font-bold text-xl bg-primary text-black
                hover:glow-primary smooth-transition"
            >
              Voir mes projets
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl font-bold text-xl
                border-2 border-primary text-white
                hover:glow-primary smooth-transition"
            >
              Me contacter
            </motion.button>
          </motion.div>

          {/* Scroll Indicator - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-32"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center p-1 mx-auto"
            >
              <motion.div
                className="w-1 h-3 bg-primary rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
