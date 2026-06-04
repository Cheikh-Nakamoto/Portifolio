'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { useSidebar } from '@/contexts/SidebarContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  HiHome,
  HiBriefcase,
  HiUser,
  HiMail,
  HiMenu,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';

const navItems = [
  { label: 'Home', href: '#home', icon: HiHome },
  { label: 'Projects', href: '#projects', icon: HiBriefcase },
  { label: 'About', href: '#about', icon: HiUser },
  { label: 'Contact', href: '#contact', icon: HiMail },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const { collapsed, setCollapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
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
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[rgb(var(--color-bg))]/80 backdrop-blur-xl border border-white/[0.08] text-[rgb(var(--color-text))] hover:text-white transition-colors shadow-2xl"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          flex flex-col
          bg-[rgb(var(--color-bg))]/70 backdrop-blur-2xl
          border-r border-white/[0.06]
          transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${collapsed ? 'w-[72px]' : 'w-60'}
          hidden lg:flex
        `}
      >
        {/* Brand */}
        <button
          onClick={() => scrollToSection('#home')}
          className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors overflow-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <motion.span
            animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
            className="text-sm font-semibold tracking-tight text-[rgb(var(--color-text))] whitespace-nowrap overflow-hidden"
          >
            {siteConfig.name.split(' ')[0]} {siteConfig.name.split(' ')[1]}
          </motion.span>
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`
                  relative flex items-center gap-3 w-full rounded-xl transition-all duration-200 overflow-hidden
                  ${collapsed ? 'justify-center px-0 py-3' : 'px-4 py-2.5'}
                  ${isActive
                    ? 'text-white'
                    : 'text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.04]'
                  }
                `}
              >
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && collapsed && (
                  <motion.div
                    layoutId="sidebarActiveCollapsed"
                    className="absolute inset-2 rounded-xl bg-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
                <motion.span
                  animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                  className="text-sm font-medium relative z-10 whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              </button>
            );
          })}

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.04] transition-all duration-200 mt-4 overflow-hidden"
          >
            {collapsed ? (
              <HiChevronRight className="w-5 h-5 flex-shrink-0 mx-auto" />
            ) : (
              <>
                <HiChevronLeft className="w-5 h-5 flex-shrink-0" />
                <motion.span
                  animate={{ opacity: collapsed ? 0 : 1 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  Collapse
                </motion.span>
              </>
            )}
          </button>
        </nav>

        {/* Bottom Section */}
        <div className="px-3 pb-6 space-y-4">
          {/* Availability Badge */}
          <div className={`
            mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3
            transition-all duration-500 overflow-hidden
            ${collapsed ? 'w-11' : 'w-full px-4'}
          `}>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <motion.span
                animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                className="text-xs font-medium text-emerald-400 whitespace-nowrap overflow-hidden"
              >
                Available for hire
              </motion.span>
            </div>
          </div>

          {/* Social Links */}
          <div className={`
            flex items-center rounded-xl bg-white/[0.02] border border-white/[0.04] p-1.5
            transition-all duration-500
            ${collapsed ? 'flex-col gap-2' : 'justify-center gap-3'}
          `}>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Email"
            >
              <HiMail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 h-full w-64 z-50 bg-[rgb(var(--color-bg))]/95 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col shadow-2xl"
            >
              {/* Mobile brand */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-[rgb(var(--color-text))]">
                    {siteConfig.name.split(' ')[0]} {siteConfig.name.split(' ')[1]}
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`
                        flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isActive
                          ? 'text-white bg-white/[0.06] border border-white/[0.08]'
                          : 'text-[rgb(var(--color-text-muted))] hover:text-white hover:bg-white/[0.04]'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Mobile bottom */}
              <div className="px-4 pb-6 space-y-4">
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-xs font-medium text-emerald-400">Available for hire</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
                  <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white">
                    <FaGithub className="w-4 h-4" />
                  </a>
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white">
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a href={`mailto:${siteConfig.links.email}`}
                    className="p-2 rounded-lg text-[rgb(var(--color-text-muted))] hover:text-white">
                    <HiMail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
