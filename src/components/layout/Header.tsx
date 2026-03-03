'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { siteConfig } from '@/config/site';
import { HiMenu, HiX, HiCode } from 'react-icons/hi';

const navItems = [
  { label: 'Accueil', href: '#home' },
  { label: 'À propos', href: '#about' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = navItems.map(item => item.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass-strong border-b-2 border-primary/30 shadow-2xl'
          : 'glass-light border-b-2 border-primary/10'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="hover:scale-105 transition-transform">
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-50 group-hover:opacity-100 smooth-transition rounded-xl" />

                {/* Icon container */}
                <div className="relative w-12 h-12 glass-strong border-2 border-primary/50 rounded-xl flex items-center justify-center group-hover:border-primary smooth-transition group-hover:glow-primary">
                  <HiCode className="w-7 h-7 text-primary group-hover:rotate-180 smooth-transition" />
                </div>
              </div>

              <span className="text-2xl font-black gradient-text group-hover:scale-110 smooth-transition">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${isActive
                      ? 'glass-strong border-2 border-primary text-primary glow-primary'
                      : 'glass border border-primary/20 text-gray-200 hover:border-primary/50 hover:text-primary'
                    }`}
                >
                  {item.label}

                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full glow-primary"
                    />
                  )}
                </button>
              );
            })}

            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 glass-strong border-2 border-primary/30 hover:border-primary rounded-xl transition-all hover:scale-110 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <div className="transition-transform duration-200">
                  <HiX className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="transition-transform duration-200">
                  <HiMenu className="w-6 h-6 text-primary" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden overflow-hidden transition-all">
            <div className="mt-4 py-4 space-y-2 border-t-2 border-primary/30">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-bold transition-all hover:translate-x-2 active:scale-95 ${isActive
                        ? 'glass-strong border-2 border-primary text-primary glow-primary'
                        : 'glass border border-primary/20 text-gray-200 hover:border-primary/50'
                      }`}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      {isActive && (
                        <span className="w-2 h-2 bg-primary rounded-full glow-primary animate-pulse" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
