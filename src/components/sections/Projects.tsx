'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { useGithubProjects } from '@/hooks/useGithubProjects';
import { useInView } from '@/hooks/useInView';
import { HiRefresh } from 'react-icons/hi';

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
    <section id="projects" ref={ref} className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">Mes Projets</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez mes projets open source et mes contributions sur GitHub
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Chargement des projets depuis GitHub...
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <HiRefresh className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
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
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {!loading && !error && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/cheikh-nakamoto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border-2 border-primary text-primary hover:bg-primary hover:text-dark-bg dark:hover:text-dark-bg transition-all duration-300 font-medium"
            >
              Voir tous mes projets sur GitHub
              <HiRefresh className="ml-2" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
