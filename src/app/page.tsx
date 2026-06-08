'use client';

import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Proof } from '@/components/sections/Proof';
import { About } from '@/components/sections/About';
import { Expertise } from '@/components/sections/Expertise';
import { Services } from '@/components/sections/Services';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Projects } from '@/components/sections/Projects';
import { Achievements } from '@/components/sections/Achievements';
import { Process } from '@/components/sections/Process';
import { Stack } from '@/components/sections/Stack';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <About />
        <Expertise />
        <Services />
        <CaseStudies />
        <Projects />
        <Achievements />
        <Process />
        <Stack />
        <Pricing />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
