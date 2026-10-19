import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { site } from '../data/projects';
import { useCinematic, useMedia } from '../hooks/useMedia';
import InkChar from './InkChar';
import Particles from './Particles';
import HeroModel from './hero3d/HeroModel';

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const cinematic = useCinematic();
  const large = useMedia('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Each letter tips up out of a mask, one after another
  const letter = (word: number, i: number) => ({
    initial: reduce ? false : { y: '115%', rotateX: -75, opacity: 0 },
    animate: ready ? { y: '0%', rotateX: 0, opacity: 1 } : undefined,
    transition: { duration: 1.2, delay: 0.15 + word * 0.14 + i * 0.05, ease: [0.16, 1, 0.3, 1] },
  });
  const appear = (d: number) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: ready ? { opacity: 1 } : undefined,
    transition: { duration: 1, delay: d },
  });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden lg:h-[100svh] lg:min-h-[600px]" aria-label="Introduction">
      {/* Scene: real-time 3D model, soft light pool, dust */}
      {/* Phones: the model gets its own band above the name. Desktop: it fills the frame beside it. */}
      <motion.div
        className="relative mt-[calc(env(safe-area-inset-top,0px)+64px)] h-[40svh] min-h-[240px] shrink-0 lg:absolute lg:inset-0 lg:mt-0 lg:h-auto"
        style={{ y: sceneY, scale: sceneScale, opacity: fade }}
        aria-hidden="true"
      >
        <div className="absolute inset-[5%] rounded-full bg-[radial-gradient(closest-side,rgba(237,231,220,.08),transparent)] lg:inset-auto lg:right-[-4%] lg:top-[10%] lg:h-[80%] lg:w-[75%]" />
        <HeroModel scroll={scrollYProgress} layout={large ? 'side' : 'stacked'} />
        {cinematic && <Particles count={30} />}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-night via-night/30 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-night to-transparent lg:h-1/3 lg:via-night/70" />
      </motion.div>

      {/* Typography */}
      <motion.div className="shell relative z-10 flex flex-1 flex-col justify-end pb-14 pt-4 lg:h-full lg:pb-16 lg:pt-0" style={{ y: textY, opacity: fade }}>
        <motion.div {...appear(0.1)} className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-crimson" aria-hidden="true" />
          <span className="label text-paper/80">Immersive Media</span>
        </motion.div>

        <div className="flex items-end gap-6">
          <h1 className="display text-[min(24vw,14svh)] leading-[0.86] lg:text-[min(26vw,19vh)]">
            {site.name.split(' ').map((word, i) => (
              <span key={word} className="block overflow-hidden" style={{ perspective: 600 }}>
                {word
                  .toUpperCase()
                  .split('')
                  .map((ch, j) => (
                    <motion.span key={j} className="inline-block origin-bottom" {...letter(i, j)}>
                      {ch}
                    </motion.span>
                  ))}
              </span>
            ))}
          </h1>
          <motion.div {...appear(0.9)} className="mb-3 hidden text-sm text-ash/70 sm:block">
            <InkChar text="物語をつくる" className="text-base text-paper/40 hover:text-paper/70" />
          </motion.div>
        </div>

        <motion.div {...appear(0.7)} className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="label">3D • Interaction • Storytelling</p>
          <p className="max-w-sm font-serif text-xl leading-snug text-paper sm:text-right sm:text-2xl">{site.statement}</p>
        </motion.div>
      </motion.div>

    </section>
  );
}
