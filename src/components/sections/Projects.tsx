'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGithubProjects } from '@/hooks/useGithubProjects';
import { HiRefresh, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ProjectCard } from '@/components/ProjectCard';

export function Projects() {
  const { projects, loading, error } = useGithubProjects();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -Math.min(carouselRef.current.offsetWidth, 400), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: Math.min(carouselRef.current.offsetWidth, 400), behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="relative py-20 px-6 bg-neutral-darkest overflow-hidden min-h-screen">
      {/* Content Overlay */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black gradient-text">Mes Projets</h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full glow-primary" />
          <p className="text-xl text-gray-200 max-w-2xl mx-auto pt-4 font-medium">
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
          <div className="relative w-full max-w-7xl mx-auto group/carousel">
            {/* Prev Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 md:-ml-6 lg:-ml-8 w-12 h-12 md:w-14 md:h-14 rounded-full glass-strong border-2 border-primary/30 hover:border-primary text-white flex items-center justify-center hover:glow-primary hover:scale-110 active:scale-95 transition-all shadow-lg opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 focus:opacity-100 hidden md:flex"
              aria-label="Previous Project"
            >
              <HiChevronLeft className="w-8 h-8" />
            </button>

            {/* Carousel Container */}
            <motion.div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  variants={itemVariants}
                  className="w-[85vw] sm:w-[350px] md:w-[400px] flex-none snap-center h-full"
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>

            {/* Next Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 md:-mr-6 lg:-mr-8 w-12 h-12 md:w-14 md:h-14 rounded-full glass-strong border-2 border-primary/30 hover:border-primary text-white flex items-center justify-center hover:glow-primary hover:scale-110 active:scale-95 transition-all shadow-lg opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 focus:opacity-100 hidden md:flex"
              aria-label="Next Project"
            >
              <HiChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-20"
          >
            <a
              href="https://github.com/cheikh-nakamoto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 glass-strong px-10 py-5 rounded-2xl border-2 border-primary/50 text-white font-bold text-xl transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary group-hover:glow-primary rounded-xl transition-all duration-300" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Voir tous mes projets sur GitHub</span>
              <div className="relative z-10">
                <HiRefresh className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180 group-hover:text-primary" />
              </div>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
