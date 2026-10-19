import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { showcase } from '../data/projects';
import { useCinematic } from '../hooks/useMedia';
import { Creature, Island, Lantern, Light, Materials } from './ShowcaseObjects';
import DecodeText from './DecodeText';

const OBJECTS = [Island, Lantern, Creature, Materials, Light];

// Position (% of stage), size (vw) and depth (higher = closer to camera) for each object
const LAYOUT = [
  { left: 8, top: 26, w: 30, depth: 0.5, label: 'right' },
  { left: 50, top: 48, w: 8, depth: 1.4, label: 'left' },
  { left: 62, top: 34, w: 14, depth: 0.9, label: 'left' },
  { left: 30, top: 66, w: 19, depth: 1.1, label: 'right' },
  { left: 40, top: -6, w: 22, depth: 0.25, label: 'right' },
] as const;

function SceneObject({ i, progress, active }: { i: number; progress: MotionValue<number>; active: boolean }) {
  const l = LAYOUT[i];
  const Obj = OBJECTS[i];
  const y = useTransform(progress, [0, 1], [120 * l.depth, -160 * l.depth]);
  const x = useTransform(progress, [0, 1], [40 * l.depth, -60 * l.depth]);
  const scale = useTransform(progress, [0, 1], [0.9 + l.depth * 0.05, 1 + l.depth * 0.18]);
  const item = showcase[i];

  return (
    <motion.div className="absolute" style={{ left: `${l.left}%`, top: `${l.top}%`, width: `${l.w}vw`, x, y, scale, zIndex: Math.round(l.depth * 10) }}>
      <motion.div animate={{ opacity: active ? 1 : 0.35, filter: active ? 'blur(0px)' : `blur(${l.depth < 0.6 ? 2 : 1}px)` }} transition={{ duration: 0.8 }}>
        <Obj />
      </motion.div>
      <motion.div
        className={`absolute top-1/3 flex items-center gap-3 whitespace-nowrap ${l.label === 'right' ? 'left-full ml-2' : 'right-full mr-2 flex-row-reverse text-right'}`}
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : l.label === 'right' ? -10 : 10 }}
        transition={{ duration: 0.6 }}
      >
        <span className="h-px w-12 bg-paper/50" aria-hidden="true" />
        <span>
          <span className="label block text-paper">{item.key}</span>
          <span className="mt-1 block text-xs text-ash">{item.note}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const camScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.12]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(showcase.length - 1, Math.floor(v * showcase.length))));

  return (
    <section ref={ref} className="relative h-[320vh]" aria-labelledby="showcase-title">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#1d211e_0%,#111110_70%)]">
        <div className="shell relative z-20 flex items-start justify-between pt-28">
          <div>
            <DecodeText className="label mb-5" text="3D showcase" />
            <h2 id="showcase-title" className="display max-w-md text-[clamp(2.4rem,4.6vw,4.4rem)]">
              Building worlds in 3D
            </h2>
          </div>
          <ul className="mt-2 space-y-2 text-right" aria-label="Categories">
            {showcase.map((s, i) => (
              <li key={s.key} className={`label transition-colors duration-500 ${i === active ? 'text-paper' : 'text-ash/50'}`}>
                {i === active && <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-vermil align-middle" aria-hidden="true" />}
                {s.key}
              </li>
            ))}
          </ul>
        </div>
        <motion.div className="absolute inset-0 origin-center" style={{ scale: camScale }}>
          {OBJECTS.map((_, i) => (
            <SceneObject key={i} i={i} progress={scrollYProgress} active={i === active} />
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
      </div>
    </section>
  );
}

function Simple() {
  return (
    <section className="py-28" aria-labelledby="showcase-title">
      <div className="shell">
        <DecodeText className="label mb-5" text="3D showcase" />
        <h2 id="showcase-title" className="display text-[clamp(2.4rem,9vw,4.4rem)]">
          Building worlds in 3D
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
          {showcase.map((s, i) => {
            const Obj = OBJECTS[i];
            return (
              <motion.li
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              >
                <div className="flex aspect-square items-center justify-center bg-coal p-6">
                  <div className={i === 1 ? 'h-full w-1/2' : 'w-full'}>
                    <Obj />
                  </div>
                </div>
                <p className="label mt-4 text-paper">{s.key}</p>
                <p className="mt-1 text-sm text-ash">{s.note}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default function ThreeDShowcase() {
  return useCinematic() ? <Cinematic /> : <Simple />;
}
