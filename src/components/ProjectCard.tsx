import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Project } from '../data/projects';
import { asset } from '../data/art';
import { useScrollSkew } from '../hooks/useScrollSkew';
import { useCinematic } from '../hooks/useMedia';

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectCard({ project, index, total, onOpen, onActive }: { project: Project; index: number; total: number; onOpen: (p: Project) => void; onActive: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const kanjiY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const n = String(index + 1).padStart(2, '0');
  const cinematic = useCinematic();
  const skew = useScrollSkew(2.5);

  const inView = (delay = 0, y = 0) => ({
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8% 0px' },
    transition: { duration: 1, delay, ease },
  });

  return (
    <motion.article
      ref={ref}
      onViewportEnter={() => onActive(index)}
      viewport={{ margin: '-45% 0px -45% 0px' }}
      className="group relative grid items-center gap-8 py-16 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:py-24"
      aria-labelledby={`title-${project.id}`}
    >
      {/* Decorative kanji drifting at its own speed */}
      <motion.div style={{ y: kanjiY }} aria-hidden="true" lang="ja" className={`vertical pointer-events-none absolute top-1/4 hidden font-serif text-7xl text-paper/[0.05] lg:block ${flip ? '-left-20' : '-right-20'}`}>
        {project.kanji}
      </motion.div>

      {/* Visual */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor="VIEW"
        aria-label={`Open ${project.title} case study`}
        className={`relative block overflow-hidden lg:col-span-8 ${flip ? 'lg:order-2 lg:col-start-5' : ''}`}
      >
        <motion.div
          className="relative aspect-[16/10] overflow-hidden bg-coal"
          style={cinematic ? { skewY: skew } : undefined}
          initial={!cinematic && !reduce ? { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0.4 } : false}
          whileInView={!cinematic && !reduce ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : undefined}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.img
            src={asset(project.cover)}
            alt={`${project.title} cover`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
            initial={reduce ? false : { scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.6, ease }}
          />
          {/* Shoji slats slide away to reveal the image */}
          {cinematic && !reduce && (
            <div className="pointer-events-none absolute inset-0 flex" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, k) => (
                <motion.span
                  key={k}
                  className={`h-full flex-1 bg-night ${k % 2 ? 'origin-bottom' : 'origin-top'}`}
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 1.1, delay: 0.08 * k, ease: [0.76, 0, 0.24, 1] }}
                />
              ))}
            </div>
          )}
        </motion.div>
        <span className="pointer-events-none absolute inset-0 bg-night/0 transition-colors duration-500 group-hover:bg-night/25" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-4 left-4 font-serif text-sm text-paper/0 transition-colors duration-500 group-hover:text-paper/80" lang="ja" aria-hidden="true">
          {project.kanji}
        </span>
      </button>

      {/* Text */}
      <div className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-1' : ''}`}>
        <motion.div {...inView(0)} className="flex items-center gap-4">
          <span className="font-serif text-sm text-vermil">{n}</span>
          <span className="h-px w-8 bg-paper/20" aria-hidden="true" />
          <span className="label">{project.categories.join(' / ')}</span>
        </motion.div>
        <div className="mt-5 overflow-hidden pb-1">
          <motion.h3
            id={`title-${project.id}`}
            className="display text-[clamp(2.4rem,4.4vw,4.2rem)] transition-transform duration-500 group-hover:translate-x-1"
            initial={reduce ? false : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            {project.title}
          </motion.h3>
        </div>
        <motion.p {...inView(0.25, 12)} className="mt-5 max-w-sm leading-relaxed text-paper/75">
          {project.summary}
        </motion.p>
        <motion.div {...inView(0.35, 12)} className="mt-8 flex items-center justify-between gap-6 border-t border-paper/10 pt-5 lg:max-w-sm">
          <span className="font-serif text-sm text-ash">{project.year}</span>
          <button type="button" onClick={() => onOpen(project)} data-magnetic className="label link-line -my-3 py-3 text-paper">
            View project →
          </button>
        </motion.div>
        <p className="sr-only">
          Project {index + 1} of {total}
        </p>
      </div>
    </motion.article>
  );
}
