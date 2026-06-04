'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-3xl px-4 pt-4">
        <nav
          className={`
            relative rounded-2xl border transition-all duration-500
            ${isScrolled
              ? 'bg-[rgb(var(--color-bg))]/80 backdrop-blur-xl border-white/[0.08] shadow-2xl shadow-black/20'
              : 'bg-[rgb(var(--color-bg))]/40 backdrop-blur-md border-white/[0.04]'
            }
          `}
        >
          <div className="flex items-center justify-between px-4 py-2.5">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-sm font-semibold tracking-tight text-[rgb(var(--color-text))] hidden sm:block">
                {siteConfig.name.split(' ')[0]} {siteConfig.name.split(' ')[1]}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive
                        ? 'text-white'
                        : 'text-[rgb(var(--color-text-muted))] hover:text-white'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/[0.08] rounded-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <HiX className="w-4 h-4" /> : <HiMenu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden mx-4 mt-2"
          >
            <div className="rounded-2xl bg-[rgb(var(--color-bg))]/95 backdrop-blur-xl border border-white/[0.08] p-3 space-y-1 shadow-2xl">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive
                        ? 'text-white bg-white/[0.08]'
                        : 'text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
