'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <div className="glass-strong p-6 rounded-3xl h-full flex flex-col border-2 border-primary/20 hover:border-primary/50 smooth-transition group relative overflow-hidden">
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
              <motion.span
                key={topic}
                whileHover={{ scale: 1.1 }}
                className="glass px-3 py-1 rounded-lg text-xs font-semibold text-primary border border-primary/30 hover:border-primary smooth-transition"
              >
                {topic}
              </motion.span>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="flex-1 glass-strong px-4 py-3 rounded-xl font-bold border-2 border-secondary/50 hover:border-secondary text-white hover:glow-secondary smooth-transition flex items-center justify-center gap-2"
          >
            <FaGithub />
            GitHub
          </motion.button>
          {project.demoUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(project.demoUrl, '_blank')}
              className="flex-1 glass-strong px-4 py-3 rounded-xl font-bold border-2 border-primary/50 hover:border-primary bg-gradient-to-r from-primary/10 to-secondary/10 text-white hover:glow-primary smooth-transition flex items-center justify-center gap-2"
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
