import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from './data/projects';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import ProjectGallery from './components/ProjectGallery';
import ProjectCaseStudy from './components/ProjectCaseStudy';
import PaperWipe from './components/PaperWipe';
import ProcessSection from './components/ProcessSection';
import ThreeDShowcase from './components/ThreeDShowcase';
import Garden from './components/Garden';
import About from './components/About';
import Skills from './components/Skills';
import Lab from './components/Lab';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VelocityMarquee from './components/VelocityMarquee';
import { startSmoothScroll } from './lib/smooth';

// ?project=<id> opens a case study directly, so every project has a shareable link
function setProjectParam(id: string | null) {
  try {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set('project', id);
    else url.searchParams.delete('project');
    window.history.replaceState(null, '', url);
  } catch {
    /* sandboxed previews can block this */
  }
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState<Project | null>(null);
  const [wipe, setWipe] = useState<{ on: boolean; kanji?: string }>({ on: false });

  useEffect(() => (ready ? startSmoothScroll() : undefined), [ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      const id = new URLSearchParams(window.location.search).get('project');
      const p = projects.find((x) => x.id === id);
      if (p) setOpen(p);
    } catch {
      /* ignore */
    }
  }, [ready]);

  const go = useCallback((p: Project | null) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setOpen(p);
      setProjectParam(p?.id ?? null);
      return;
    }
    setWipe({ on: true, kanji: p?.kanji ?? '世界' });
    window.setTimeout(() => {
      setOpen(p);
      setProjectParam(p?.id ?? null);
      setWipe({ on: false });
    }, 620);
  }, []);
  const close = useCallback(() => go(null), [go]);

  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-crimson focus:px-5 focus:py-2 focus:text-paper">
        Skip to work
      </a>
      <Loader onDone={() => setReady(true)} />
      <CustomCursor />
      <Navbar ready={ready} />

      <motion.main initial={false} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.6 }}>
        <div id="home">
          <Hero ready={ready} />
          <Intro />
        </div>
        <VelocityMarquee items={['Create worlds', '世界をつくる', 'Interactive stories', '物語', 'Immersive media', '体験']} speed={2} />
        <ProjectGallery onOpen={go} />
        <ProcessSection />
        <ThreeDShowcase />
        <Garden />
        <VelocityMarquee items={['3D', '創造', 'Interaction', '実験', 'Storytelling', '世界']} speed={2} className="bg-coal" />
        <About />
        <Skills />
        <Lab />
        <Contact />
      </motion.main>
      <Footer />

      <AnimatePresence>{open && <ProjectCaseStudy key={open.id} project={open} onClose={close} onNavigate={go} />}</AnimatePresence>
      <PaperWipe active={wipe.on} kanji={wipe.kanji} />
    </>
  );
}
