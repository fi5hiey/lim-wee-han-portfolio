import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../data/projects';
import { useActiveSection } from '../hooks/useActiveSection';
import Seal from './Seal';
import { pauseSmoothScroll, resumeSmoothScroll } from '../lib/smooth';

export const NAV = [
  { id: 'home', n: '01', label: 'Home' },
  { id: 'work', n: '02', label: 'Work' },
  { id: 'about', n: '03', label: 'About' },
  { id: 'contact', n: '04', label: 'Contact' },
];
const IDS = NAV.map((s) => s.id);

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar({ ready = true }: { ready?: boolean }) {
  const { active, progress } = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Over the rice-paper sections the floating logo and position marks switch to ink
  const [paperTop, setPaperTop] = useState(false);
  const [paperSide, setPaperSide] = useState(false);
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40);
      setPaperTop(Boolean(document.elementFromPoint(6, 40)?.closest('.on-paper')));
      setPaperSide(Boolean(document.elementFromPoint(window.innerWidth - 6, window.innerHeight / 2)?.closest('.on-paper')));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!open) return;
    pauseSmoothScroll();
    return () => resumeSmoothScroll();
  }, [open]);

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-500 lg:border-transparent lg:bg-transparent lg:backdrop-blur-none ${
          scrolled ? 'border-b border-paper/10 bg-night/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className={`flex items-center justify-between px-5 transition-[padding] duration-500 sm:px-10 lg:items-start lg:py-6 ${scrolled ? 'py-3' : 'py-5'}`}>
          <motion.a
            href="#home"
            className="group pointer-events-auto flex items-center gap-3"
            data-cursor="HOME"
            aria-label={`${site.name}, back to top`}
            initial={{ opacity: 0, x: -16 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <Seal size={30} className="transition-transform duration-700 ease-out group-hover:rotate-[90deg]" />
            <span className={`label transition-[letter-spacing,color] duration-500 group-hover:tracking-[0.34em] ${paperTop ? 'text-paper lg:text-[#1c1a17]' : 'text-paper'}`}>{site.name}</span>
          </motion.a>

          <nav aria-label="Main" className="pointer-events-auto hidden rounded-full border border-paper/10 bg-night/60 px-2 py-1.5 backdrop-blur-md lg:block">
            <ul className="flex">
              {NAV.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, y: -10 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease }}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === i ? 'true' : undefined}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                      active === i ? 'text-paper' : 'text-ash hover:text-paper'
                    }`}
                  >
                    <span className={active === i ? 'text-vermil' : ''}>{s.n}</span>
                    <span aria-hidden="true" className={`h-px transition-all duration-500 ${active === i ? 'w-5 bg-vermil' : 'w-2.5 bg-ash/60'}`} />
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="pointer-events-auto min-h-[44px] rounded-full border border-paper/15 bg-night/60 px-5 text-[0.72rem] font-medium uppercase tracking-[0.2em] lg:hidden"
            aria-expanded={open}
            aria-controls="menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Vertical position indicator */}
      <nav aria-label="Page position" className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center lg:flex">
        {NAV.map((s, i) => (
          <motion.div key={s.id} className="flex flex-col items-center" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 0.6, delay: 0.9 + i * 0.12 }}>
            <a
              href={`#${s.id}`}
              aria-label={s.label}
              className={`py-1.5 font-serif text-xs tabular-nums transition-colors duration-500 ${active === i ? 'text-vermil' : paperSide ? 'text-[#1c1a17]/50 hover:text-[#1c1a17]' : 'text-ash/60 hover:text-paper'}`}
            >
              {s.n}
            </a>
            {i < NAV.length - 1 && (
              <span className={`relative h-10 w-px transition-colors duration-500 ${paperSide ? 'bg-[#1c1a17]/15' : 'bg-paper/15'}`} aria-hidden="true">
                <span
                  className={`absolute inset-x-0 top-0 transition-[height,background-color] duration-300 ${paperSide ? 'bg-[#1c1a17]/70' : 'bg-paper/70'}`}
                  style={{ height: `${Math.max(0, Math.min(1, progress * (NAV.length - 1) - i)) * 100}%` }}
                />
              </span>
            )}
          </motion.div>
        ))}
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-night px-6 pb-10 sm:px-10"
            style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <Seal size={30} />
              <button type="button" onClick={() => setOpen(false)} className="min-h-[44px] rounded-full border border-paper/15 px-5 text-[0.72rem] uppercase tracking-[0.2em]" autoFocus>
                Close
              </button>
            </div>
            <ul className="mt-auto space-y-2">
              {NAV.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-1">
                    <span className={`font-serif text-sm ${active === i ? 'text-vermil' : 'text-ash'}`}>{s.n}</span>
                    <span className="display text-6xl">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-serif text-sm text-ash" lang="ja">
              世界をつくる。<span className="ml-2 font-sans" lang="en">Create worlds.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
