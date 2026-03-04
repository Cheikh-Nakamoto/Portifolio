'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      className="h-full"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="glass-strong p-6 rounded-3xl h-full flex flex-col border-2 border-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] smooth-transition group relative overflow-hidden transition-all duration-300">
        {/* Holographic overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            {project.language && (
              <div className="flex items-center space-x-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: getLanguageColor(project.language), boxShadow: `0 0 8px ${getLanguageColor(project.language)}` }}
                />
                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                  {project.language}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 flex-grow line-clamp-3 relative z-10 leading-relaxed group-hover:text-gray-100 transition-colors">
          {project.description}
        </p>

        {/* Technologies/Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            {project.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="glass px-3 py-1 rounded-lg text-xs font-semibold text-primary border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 transition-colors inline-block"
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
        <div className="flex items-center space-x-6 mb-6 text-sm relative z-10">
          <div className="flex items-center space-x-2 glass px-3 py-1.5 rounded-lg border border-transparent group-hover:border-yellow-400/30 transition-colors">
            <FaStar className="text-yellow-400" />
            <span className="font-bold text-white">{project.stars}</span>
          </div>
          <div className="flex items-center space-x-2 glass px-3 py-1.5 rounded-lg border border-transparent group-hover:border-primary/30 transition-colors">
            <FaCodeBranch className="text-primary" />
            <span className="font-bold text-white">{project.forks}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="flex-1 glass-strong px-4 py-3 rounded-xl font-bold border-2 border-secondary/50 hover:border-secondary text-white transition-colors flex items-center justify-center gap-2"
          >
            <FaGithub />
            GitHub
          </motion.button>
          {project.demoUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(project.demoUrl, '_blank')}
              className="flex-1 glass-strong px-4 py-3 rounded-xl font-bold border-2 border-primary/50 hover:border-primary bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-white transition-all flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt />
              Demo
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
