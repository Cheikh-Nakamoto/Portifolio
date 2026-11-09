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
import { LatestPosts } from '@/components/sections/LatestPosts';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
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
        <LatestPosts posts={latestPosts} />
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
