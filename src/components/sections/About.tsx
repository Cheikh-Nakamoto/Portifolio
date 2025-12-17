'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import { useInView } from '@/hooks/useInView';
import {
  HiCode,
  HiLightningBolt,
  HiAcademicCap,
  HiUsers,
  HiBadgeCheck,
  HiCube,
} from 'react-icons/hi';

// Dynamically import 3D components
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })), { ssr: false });
const Timeline3D = dynamic(() => import('@/components/3d/about/Timeline3D').then(mod => ({ default: mod.Timeline3D })), { ssr: false });
const SkillCubes = dynamic(() => import('@/components/3d/about/SkillCubes').then(mod => ({ default: mod.SkillCubes })), { ssr: false });
const CertBadges = dynamic(() => import('@/components/3d/about/CertBadges').then(mod => ({ default: mod.CertBadges })), { ssr: false });

const values = [
  {
    icon: HiCode,
    title: 'Code propre',
    description: 'Code maintenable et bien structuré',
  },
  {
    icon: HiLightningBolt,
    title: 'Performance',
    description: 'Solutions rapides et scalables',
  },
  {
    icon: HiAcademicCap,
    title: 'Apprentissage',
    description: 'Curiosité et amélioration continue',
  },
  {
    icon: HiUsers,
    title: 'Collaboration',
    description: 'Travail d\'équipe et partage',
  },
];

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const skillsByCategory = {
    languages: siteConfig.skills.filter((s) => s.category === 'language'),
    frameworks: siteConfig.skills.filter((s) => s.category === 'framework'),
    tools: siteConfig.skills.filter((s) => s.category === 'tool'),
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 px-6 bg-neutral-darkest overflow-hidden min-h-screen"
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Suspense fallback={<div className="w-full h-full bg-neutral-dark" />}>
          <Scene camera={{ position: [0, 0, 10], fov: 75 }} enablePostProcessing={false}>
            <Timeline3D />
            <group position={[0, -4, 0]}>
              <SkillCubes />
            </group>
            <group position={[0, 4, 0]}>
              <CertBadges />
            </group>
          </Scene>
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section Header with glass effect */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-black gradient-text">
              À propos de moi
            </h2>
            <div className="w-32 h-1.5 bg-primary mx-auto rounded-full glow-primary" />
          </motion.div>

          {/* About Content with glassmorphism */}
          <motion.div variants={itemVariants}>
            <div className="glass-strong p-8 rounded-3xl max-w-4xl mx-auto neon-border">
              <div className="space-y-6">
                <p className="text-lg text-gray-200 leading-relaxed">
                  {siteConfig.about.introduction}
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  {siteConfig.about.journey}
                </p>

                {/* Experience with enhanced styling */}
                <div className="pt-6 border-t border-primary/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-2xl glass border-2 border-primary/50 flex items-center justify-center flex-shrink-0 glow-primary">
                      <HiCode className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {siteConfig.experience.role}
                      </h3>
                      <p className="text-primary font-bold text-lg">
                        {siteConfig.experience.company}
                      </p>
                      <p className="text-sm text-primary/70 font-medium">
                        {siteConfig.experience.period}
                      </p>
                      <p className="text-gray-200 mt-3 leading-relaxed">
                        {siteConfig.experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values with glassmorphism cards */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">
              Mes valeurs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-6 rounded-2xl text-center border-2 border-transparent hover:border-primary/50 smooth-transition group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl glass-strong border-2 border-primary/30 flex items-center justify-center group-hover:glow-primary smooth-transition">
                    <value.icon className="w-9 h-9 text-primary" />
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-white">{value.title}</h4>
                  <p className="text-sm text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications with enhanced glassmorphism */}
          {siteConfig.certifications && siteConfig.certifications.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {siteConfig.certifications.map((cert) => (
                  <motion.div
                    key={cert.name}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="glass-strong p-6 rounded-2xl border-2 border-secondary/30 hover:border-secondary smooth-transition group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-2xl glass border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:glow-secondary smooth-transition">
                        <HiBadgeCheck className="w-7 h-7 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-1 text-white">{cert.name}</h4>
                        <p className="text-secondary font-bold text-sm">{cert.issuer}</p>
                        <p className="text-primary/70 text-sm font-medium">{cert.date}</p>
                        {cert.url && cert.url !== '#' && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent/80 font-semibold text-sm mt-2 inline-block smooth-transition"
                          >
                            Voir la certification →
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Blockchain Activities */}
          {siteConfig.blockchainActivities && (
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Activités Blockchain & Hackathons
              </h3>

              {/* Featured Hackathon Project */}
              {siteConfig.blockchainActivities.featuredHackathon && (
                <Card hover className="max-w-4xl mx-auto mb-6 border-2 border-secondary/30">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                          <HiCube className="w-8 h-8 text-secondary" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-secondary">
                            {siteConfig.blockchainActivities.featuredHackathon.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Track: {siteConfig.blockchainActivities.featuredHackathon.track} • {siteConfig.blockchainActivities.featuredHackathon.year}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pl-[72px]">
                      <h5 className="font-bold text-lg mb-2">
                        {siteConfig.blockchainActivities.featuredHackathon.project.name}
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {siteConfig.blockchainActivities.featuredHackathon.project.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        <p className="font-semibold text-sm text-accent">Fonctionnalités clés :</p>
                        <ul className="space-y-1">
                          {siteConfig.blockchainActivities.featuredHackathon.project.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                              <span className="text-secondary mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <p className="font-semibold text-sm text-primary mb-2">Technologies :</p>
                        <div className="flex flex-wrap gap-2">
                          {siteConfig.blockchainActivities.featuredHackathon.project.technologies.map((tech) => (
                            <Badge key={tech} className="bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary border-secondary/30">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* General Blockchain Activities */}
              <Card className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {siteConfig.blockchainActivities.description}
                  </p>

                  {siteConfig.additionalTraining && siteConfig.additionalTraining.length > 0 && (
                    <div className="pt-4 border-t border-light-border dark:border-dark-border">
                      <p className="font-semibold text-sm text-primary mb-3">
                        Formations complémentaires :
                      </p>
                      {siteConfig.additionalTraining.map((training) => (
                        <div key={training.name} className="mb-2">
                          <p className="font-medium">{training.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {training.description} • {training.period}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {siteConfig.blockchainActivities.interests && (
                    <div className="pt-4 border-t border-light-border dark:border-dark-border">
                      <p className="font-semibold text-sm text-secondary mb-3">
                        Centre d&apos;intérêt blockchain :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {siteConfig.blockchainActivities.interests.map((interest) => (
                          <Badge key={interest} className="bg-secondary/10 text-secondary border-secondary/30">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Skills with modern glassmorphism */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">
              Compétences techniques
            </h3>
            <div className="glass-strong p-8 rounded-3xl max-w-4xl mx-auto neon-border">
              <div className="space-y-8">
                {/* Languages */}
                <div>
                  <h4 className="font-bold text-2xl mb-4 text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Langages
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillsByCategory.languages.map((skill) => (
                      <motion.span
                        key={skill.name}
                        whileHover={{ scale: 1.1 }}
                        className="glass px-4 py-2 rounded-xl border-2 border-primary/30 hover:border-primary
                          text-white font-semibold smooth-transition hover:glow-primary cursor-pointer"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <h4 className="font-bold text-2xl mb-4 text-secondary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Frameworks & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillsByCategory.frameworks.map((skill) => (
                      <motion.span
                        key={skill.name}
                        whileHover={{ scale: 1.1 }}
                        className="glass px-4 py-2 rounded-xl border-2 border-secondary/30 hover:border-secondary
                          text-white font-semibold smooth-transition hover:glow-secondary cursor-pointer"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="font-bold text-2xl mb-4 text-accent flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Outils & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillsByCategory.tools.map((skill) => (
                      <motion.span
                        key={skill.name}
                        whileHover={{ scale: 1.1 }}
                        className="glass px-4 py-2 rounded-xl border-2 border-accent/30 hover:border-accent
                          text-white font-semibold smooth-transition hover:glow-accent cursor-pointer"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
