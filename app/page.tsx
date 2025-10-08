import Hero from '@/components/portfolio/Hero';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import ExperienceSection from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Skills />
      <ExperienceSection />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}
