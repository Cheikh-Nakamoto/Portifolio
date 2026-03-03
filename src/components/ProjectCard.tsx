'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Project } from '@/types';
import { getLanguageColor } from '@/lib/utils';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="h-full">
      <div className="glass-strong p-6 rounded-3xl h-full flex flex-col border-2 border-primary/20 hover:border-primary/50 hover:-translate-y-2 smooth-transition group relative overflow-hidden transition-transform duration-300">
        {/* Holographic overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:gradient-text smooth-transition">
              {project.title}
            </h3>
            {project.language && (
              <div className="flex items-center space-x-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: getLanguageColor(project.language), boxShadow: `0 0 8px ${getLanguageColor(project.language)}` }}
                />
                <span className="text-gray-300 font-medium">
                  {project.language}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-200 mb-4 flex-grow line-clamp-3 relative z-10 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies/Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {project.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="glass px-3 py-1 rounded-lg text-xs font-semibold text-primary border border-primary/30 hover:border-primary hover:scale-105 smooth-transition inline-block"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 5 && (
              <span className="glass px-3 py-1 rounded-lg text-xs font-semibold text-secondary border border-secondary/30">
                +{project.topics.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center space-x-6 mb-4 text-sm relative z-10">
          <div className="flex items-center space-x-2 glass px-3 py-1.5 rounded-lg">
            <FaStar className="text-yellow-400" />
            <span className="font-bold text-white">{project.stars}</span>
          </div>
          <div className="flex items-center space-x-2 glass px-3 py-1.5 rounded-lg">
            <FaCodeBranch className="text-primary" />
            <span className="font-bold text-white">{project.forks}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto relative z-10">
          <button
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="flex-1 glass-strong px-4 py-3 rounded-xl font-bold border-2 border-secondary/50 hover:border-secondary text-white hover:glow-secondary hover:scale-105 active:scale-95 smooth-transition flex items-center justify-center gap-2"
          >
            <FaGithub />
            GitHub
          </button>
          {project.demoUrl && (
            <button
              onClick={() => window.open(project.demoUrl, '_blank')}
              className="flex-1 glass-strong px-4 py-3 rounded-xl font-bold border-2 border-primary/50 hover:border-primary bg-gradient-to-r from-primary/10 to-secondary/10 text-white hover:glow-primary hover:scale-105 active:scale-95 smooth-transition flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt />
              Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
