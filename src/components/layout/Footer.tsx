'use client';

import React from 'react';
import { siteConfig } from '@/config/site';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const socialLinks = [
  {
    name: 'GitHub',
    url: siteConfig.links.github,
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    url: siteConfig.links.linkedin,
    icon: FaLinkedin,
  },
  {
    name: 'Twitter',
    url: siteConfig.links.twitter,
    icon: FaTwitter,
  },
  {
    name: 'Email',
    url: `mailto:${siteConfig.links.email}`,
    icon: HiMail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-primary" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} {siteConfig.name}. Tous droits réservés.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              Conçu et développé avec passion 💚
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
