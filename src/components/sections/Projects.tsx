'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useGithubProjects } from '@/hooks/useGithubProjects';
import { useInView } from '@/hooks/useInView';
import { HiRefresh } from 'react-icons/hi';
import { ProjectCarousel3D } from '@/components/3d/projects/ProjectCarousel3D';

// Dynamically import 3D components
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })), { ssr: false });
const CodeParticles = dynamic(() => import('@/components/3d/projects/CodeParticles').then(mod => ({ default: mod.CodeParticles })), { ssr: false });

export function Projects() {
  const { projects, loading, error } = useGithubProjects();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" ref={ref} className="relative py-12 px-6 bg-neutral-dark overflow-hidden">
      {/* 3D Background with Code Particles */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Suspense fallback={<div className="w-full h-full bg-neutral-dark" />}>
          <Scene camera={{ position: [0, 0, 8], fov: 75 }} enablePostProcessing={false}>
            <CodeParticles />
          </Scene>
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black gradient-text">Mes Projets</h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full glow-primary" />
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Découvrez mes projets open source et mes contributions sur GitHub
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="glass-strong p-8 rounded-3xl border-2 border-primary/30">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <div className="absolute inset-2 border-4 border-secondary/30 border-b-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
            </div>
            <p className="text-gray-200 font-medium text-lg">
              Chargement des projets depuis GitHub...
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="glass-strong p-8 rounded-3xl border-2 border-accent/50">
              <div className="w-20 h-20 rounded-full glass border-2 border-accent flex items-center justify-center glow-accent">
                <HiRefresh className="w-10 h-10 text-accent" />
              </div>
            </div>
            <p className="text-accent font-bold text-lg">{error}</p>
            <p className="text-sm text-gray-300 max-w-md text-center">
              Vérifiez votre connexion internet et le username GitHub dans la configuration
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Aucun projet trouvé
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Vérifiez le username GitHub dans src/config/site.ts
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <ProjectCarousel3D projects={projects} />
          </motion.div>
        )}

        {!loading && !error && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/cheikh-nakamoto"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-2xl border-2 border-primary/50 hover:border-primary text-white font-bold text-lg hover:glow-primary smooth-transition"
            >
              Voir tous mes projets sur GitHub
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <HiRefresh className="w-6 h-6" />
              </motion.div>
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
