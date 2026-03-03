'use client';

import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export function Hero() {
  const [imageError, setImageError] = React.useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden bg-neutral-dark"
    >
      {/* Content Overlay - Minimal & Clean */}
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-12">
          {/* Profile Image - Clean & Modern */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <div className="absolute inset-0 rounded-full border-4 border-primary glow-primary" />
              <Image
                src="/avatar-original.jpeg"
                alt={siteConfig.name}
                width={192}
                height={192}
                className="rounded-full object-cover w-full h-full"
                priority
                onError={() => setImageError(true)}
              />
            </div>
          </div>

          {/* Name - Large & Bold */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tight text-white">
            {siteConfig.name}
          </h1>

          {/* Tagline - Clean without excessive effects */}
          <h2 className="text-2xl md:text-4xl font-bold text-primary">
            {siteConfig.tagline}
          </h2>

          {/* CTA Buttons - Primary Focus */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <button
              onClick={() => scrollToSection('#projects')}
              className="px-10 py-5 rounded-2xl font-bold text-xl bg-primary text-black
                hover:glow-primary hover:scale-105 active:scale-95 smooth-transition"
            >
              Voir mes projets
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="px-10 py-5 rounded-2xl font-bold text-xl
                border-2 border-primary text-white
                hover:glow-primary hover:scale-105 active:scale-95 smooth-transition"
            >
              Me contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
