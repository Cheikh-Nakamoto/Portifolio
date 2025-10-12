'use client';

import React from 'react';
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
      className="py-20 px-6 bg-light-surface/50 dark:bg-dark-surface/50"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">À propos de moi</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </motion.div>

          {/* About Content */}
          <motion.div variants={itemVariants}>
            <Card className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {siteConfig.about.introduction}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {siteConfig.about.journey}
                </p>

                {/* Experience */}
                <div className="pt-6 border-t border-light-border dark:border-dark-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <HiCode className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {siteConfig.experience.role}
                      </h3>
                      <p className="text-primary font-medium">
                        {siteConfig.experience.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {siteConfig.experience.period}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {siteConfig.experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Values */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Mes valeurs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} hover className="text-center">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-bold text-lg mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          {siteConfig.certifications && siteConfig.certifications.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {siteConfig.certifications.map((cert) => (
                  <Card key={cert.name} hover className="group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <HiBadgeCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{cert.name}</h4>
                        <p className="text-primary font-medium text-sm">{cert.issuer}</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">{cert.date}</p>
                        {cert.url && cert.url !== '#' && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline text-sm mt-2 inline-block"
                          >
                            Voir la certification →
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
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
                        Centre d'intérêt blockchain :
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

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Compétences techniques
            </h3>
            <Card className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Languages */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary">
                    Langages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.languages.map((skill) => (
                      <Badge key={skill.name}>{skill.name}</Badge>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-secondary">
                    Frameworks & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.frameworks.map((skill) => (
                      <Badge key={skill.name}>{skill.name}</Badge>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-accent">
                    Outils & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.tools.map((skill) => (
                      <Badge key={skill.name}>{skill.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
