'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface ProjectCarousel3DProps {
  projects: Project[];
}

export function ProjectCarousel3D({ projects }: ProjectCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Navigation handlers with infinite loop
  const goToNext = React.useCallback(() => {
    if (!projects || projects.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, [projects]);

  const goToPrevious = React.useCallback(() => {
    if (!projects || projects.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  }, [projects]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Early return after hooks
  if (!projects || projects.length === 0) {
    return null;
  }

  // Get indices for prev, current, next (with wrapping)
  const getPrevIndex = () => (currentIndex - 1 + projects.length) % projects.length;
  const getNextIndex = () => (currentIndex + 1) % projects.length;

  return (
    <div className="relative w-full py-12">
      {/* Carousel Container */}
      <div className="relative h-[650px] flex items-center justify-center perspective-[2000px]">
        {/* Previous Card (Left) - Larger and closer */}
        <motion.div
          key={`prev-${getPrevIndex()}`}
          className="absolute left-4 w-[450px] opacity-60 pointer-events-none"
          initial={{ x: -50, scale: 0.85, rotateY: 15, z: -100 }}
          animate={{ x: -50, scale: 0.85, rotateY: 15, z: -100 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <ProjectCard project={projects[getPrevIndex()]} index={0} />
        </motion.div>

        {/* Current Card (Center) - Extra large */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`current-${currentIndex}`}
            custom={direction}
            className="relative w-[600px] z-10"
            initial={(direction) => ({
              x: direction > 0 ? 400 : -400,
              opacity: 0,
              scale: 0.9,
              rotateY: direction > 0 ? -20 : 20,
            })}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              rotateY: 0,
              z: 0,
              transition: {
                type: 'spring',
                stiffness: 150,
                damping: 25,
                duration: 0.8,
              }
            }}
            exit={(direction) => ({
              x: direction > 0 ? -400 : 400,
              opacity: 0,
              scale: 0.9,
              rotateY: direction > 0 ? 20 : -20,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 1.2,
              }
            })}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <ProjectCard project={projects[currentIndex]} index={0} />
          </motion.div>
        </AnimatePresence>

        {/* Next Card (Right) - Larger and closer */}
        <motion.div
          key={`next-${getNextIndex()}`}
          className="absolute right-4 w-[450px] opacity-60 pointer-events-none"
          initial={{ x: 50, scale: 0.85, rotateY: -15, z: -100 }}
          animate={{ x: 50, scale: 0.85, rotateY: -15, z: -100 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <ProjectCard project={projects[getNextIndex()]} index={0} />
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-8 mt-8">
        {/* Previous Button */}
        <motion.button
          onClick={goToPrevious}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group relative w-16 h-16 glass-strong rounded-2xl border-2 border-secondary/50 hover:border-secondary hover:glow-secondary smooth-transition"
        >
          <HiChevronLeft className="w-8 h-8 text-secondary mx-auto" />
          <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 smooth-transition rounded-2xl" />
        </motion.button>

        {/* Counter */}
        <div className="glass-strong px-6 py-3 rounded-2xl border-2 border-primary/30">
          <p className="text-white font-bold text-lg">
            <span className="gradient-text">{currentIndex + 1}</span>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-300">{projects.length}</span>
          </p>
        </div>

        {/* Next Button */}
        <motion.button
          onClick={goToNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group relative w-16 h-16 glass-strong rounded-2xl border-2 border-primary/50 hover:border-primary hover:glow-primary smooth-transition"
        >
          <HiChevronRight className="w-8 h-8 text-primary mx-auto" />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 smooth-transition rounded-2xl" />
        </motion.button>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full smooth-transition ${
              index === currentIndex
                ? 'w-8 bg-primary glow-primary'
                : 'w-2 bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
