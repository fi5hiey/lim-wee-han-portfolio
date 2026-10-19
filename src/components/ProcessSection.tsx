import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '../data/projects';
import { useCinematic } from '../hooks/useMedia';
import DecodeText from './DecodeText';

const ICONS: string[][] = [
  ['M24 6a12 12 0 1 1 0 24a12 12 0 1 1 0-24', 'M18 36h12', 'M20 42h8'],
  ['M8 10h14a4 4 0 0 1 4 4v26a4 4 0 0 0-4-4H8z', 'M40 10H28a4 4 0 0 0-4 4v26a4 4 0 0 1 4-4h12z'],
  ['M24 6L42 40H6z', 'M24 18v14', 'M16 32h16'],
  ['M24 6l16 9v18l-16 9-16-9V15z', 'M8 15l16 9 16-9', 'M24 24v18'],
  ['M24 24m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 'M24 24m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'M24 24m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0'],
  ['M24 6l14 12-14 24L10 18z', 'M10 18h28', 'M24 6v36'],
];

function Icon({ i, on }: { i: number; on: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {ICONS[i].map((d, k) => (
        <motion.path
          key={k}
          d={d}
          initial={false}
          animate={{ pathLength: on ? 1 : 0.15, opacity: on ? 1 : 0.35 }}
          transition={{ duration: 1, delay: k * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}

function Heading() {
  return (
    <div>
      <DecodeText className="label mb-6" text="Process" />
      <h2 className="display text-[clamp(2.6rem,6vw,5.5rem)]">
        From idea <span className="text-vermil" aria-hidden="true">→</span>
        <span className="sr-only">to</span> world
      </h2>
    </div>
  );
}

function Horizontal() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(processSteps.length - 1, Math.floor(v * processSteps.length * 0.999 + 0.35))));

  return (
    <section ref={ref} id="process" className="on-paper relative h-[300vh]" aria-label="Process">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="shell mb-14">
          <Heading />
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-0 pl-6 sm:pl-10 lg:pl-24">
          {processSteps.map((s, i) => (
            <div key={s.n} className="w-[32vw] max-w-[440px] shrink-0 pr-16">
              <div className={`transition-colors duration-700 ${i <= active ? 'text-paper' : 'text-paper/30'}`}>
                <Icon i={i} on={i <= active} />
                <p className={`mt-8 font-serif text-sm ${i <= active ? 'text-vermil' : ''}`}>{s.n}</p>
                <h3 className="display mt-2 text-4xl">{s.title}</h3>
                <p className={`mt-4 max-w-xs leading-relaxed transition-opacity duration-700 ${i <= active ? 'opacity-80' : 'opacity-40'}`}>{s.body}</p>
              </div>
            </div>
          ))}
          <div className="w-[30vw] shrink-0" aria-hidden="true" />
        </motion.div>
        <div className="shell mt-16">
          <div className="h-px w-full bg-paper/10">
            <motion.div className="h-full origin-left bg-crimson" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Vertical() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  return (
    <section id="process" className="on-paper py-28" aria-label="Process">
      <div className="shell">
        <Heading />
        <ol ref={ref} className="relative mt-14 space-y-14 pl-10">
          <span className="absolute bottom-0 left-0 top-0 w-px bg-paper/10" aria-hidden="true">
            <motion.span className="absolute inset-0 origin-top bg-crimson" style={{ scaleY: scrollYProgress }} />
          </span>
          {processSteps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: '-40% 0px -40% 0px' }}
              transition={{ duration: 0.6 }}
            >
              <Icon i={i} on />
              <p className="mt-5 font-serif text-sm text-vermil">{s.n}</p>
              <h3 className="display mt-1 text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-paper/75">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ProcessSection() {
  return useCinematic() ? <Horizontal /> : <Vertical />;
}
