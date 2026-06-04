'use client';

import React from 'react';
import { siteConfig } from '@/config/site';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold gradient-text">
              {siteConfig.name.split(' ')[0]} {siteConfig.name.split(' ')[1]}
            </p>
            <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1">
              Fullstack Engineer & Freelancer
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.10] transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.10] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.10] transition-all duration-300"
              aria-label="Email"
            >
              <HiMail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[rgb(var(--color-text-muted))]">
            &copy; {currentYear} &mdash; All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
