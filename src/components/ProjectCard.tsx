'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card hover className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.language && (
              <div className="flex items-center space-x-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(project.language) }}
                />
                <span className="text-gray-600 dark:text-gray-400">
                  {project.language}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Technologies/Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 5).map((topic) => (
              <Badge key={topic} className="text-xs">
                {topic}
              </Badge>
            ))}
            {project.topics.length > 5 && (
              <Badge className="text-xs">+{project.topics.length - 5}</Badge>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-500" />
            <span>{project.stars}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCodeBranch className="text-primary" />
            <span>{project.forks}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            <FaGithub className="mr-2" />
            GitHub
          </Button>
          {project.demoUrl && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.demoUrl, '_blank')}
            >
              <FaExternalLinkAlt className="mr-2" />
              Demo
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
