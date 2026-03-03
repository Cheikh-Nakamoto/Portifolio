'use client';

import React from 'react';
import { useGithubProjects } from '@/hooks/useGithubProjects';
import { HiRefresh } from 'react-icons/hi';
import { ProjectCard } from '@/components/ProjectCard';

export function Projects() {
  const { projects, loading, error } = useGithubProjects();

  return (
    <section id="projects" className="relative py-12 px-6 bg-neutral-dark overflow-hidden">
      {/* Content Overlay */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-5xl md:text-6xl font-black gradient-text">Mes Projets</h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full glow-primary" />
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Découvrez mes projets open source et mes contributions sur GitHub
          </p>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="text-center mt-16">
            <a
              href="https://github.com/cheikh-nakamoto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-2xl border-2 border-primary/50 hover:border-primary text-white font-bold text-lg hover:glow-primary hover:scale-105 active:scale-95 smooth-transition"
            >
              Voir tous mes projets sur GitHub
              <div>
                <HiRefresh className="w-6 h-6" />
              </div>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
