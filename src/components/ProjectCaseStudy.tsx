import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { asset } from '../data/art';
import TiltMedia from './TiltMedia';
import MediaFrame from './MediaFrame';
import InkChar from './InkChar';
import { pauseSmoothScroll, resumeSmoothScroll } from '../lib/smooth';

const ease = [0.16, 1, 0.3, 1] as const;

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      className="grid gap-4 border-t border-paper/10 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease }}
    >
      <h3 className="label lg:col-span-3">{label}</h3>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </motion.section>
  );
}

export default function ProjectCaseStudy({ project, onClose, onNavigate }: { project: Project; onClose: () => void; onNavigate: (p: Project) => void }) {
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pauseSmoothScroll();
    scroller.current?.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      resumeSmoothScroll();
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [project, onClose]);

  return (
    <div
      ref={scroller}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      data-lenis-prevent
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-night"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-paper/10 bg-night/85 backdrop-blur-md" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="flex items-center justify-between px-6 py-4 sm:px-10">
          <button type="button" onClick={onClose} data-magnetic className="label link-line -my-3 py-3 text-paper">
            ← Back to work
          </button>
          <span className="font-serif text-sm text-ash tabular-nums">
            {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <article className="shell pb-24">
        {/* Title */}
        <header className="relative pb-14 pt-16 lg:pb-20 lg:pt-24">
          <div className="absolute right-0 top-16 hidden text-paper/15 lg:block">
            <InkChar text={project.kanji} className="text-4xl hover:text-paper/50" />
          </div>
          <p className="label mb-6">{project.categories.join(' / ')}</p>
          <div className="overflow-hidden pb-2">
            <motion.h2
              id="case-title"
              ref={heading}
              tabIndex={-1}
              className="display text-[clamp(3rem,10vw,9rem)] outline-none"
              initial={reduce ? false : { y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.25, ease }}
            >
              {project.title}
            </motion.h2>
          </div>
          <motion.p
            className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-paper/85 sm:text-2xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
          >
            {project.summary}
          </motion.p>
        </header>

        {/* Hero media: expands open from a narrow mask */}
        <motion.div
          initial={reduce ? false : { clipPath: 'inset(12% 18% 12% 18%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.3, delay: 0.3, ease }}
        >
          <TiltMedia strength={project.galleryMode === 'tilt' ? 4 : 0} className="aspect-[16/9] overflow-hidden bg-coal">
            <motion.img
              src={asset(project.cover)}
              alt={`${project.title} key visual`}
              className="h-full w-full object-cover"
              initial={reduce ? false : { scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, delay: 0.3, ease }}
            />
          </TiltMedia>
        </motion.div>

        {/* Meta */}
        <dl className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            ['Role', project.role],
            ['Tools', project.tools.join(', ')],
            ['Year', String(project.year)],
            ['Category', project.categories.join(', ')],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label mb-2">{k}</dt>
              <dd className="text-paper/85">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <Row label="Overview">
            <p className="font-serif text-2xl leading-snug sm:text-3xl">{project.overview}</p>
          </Row>
          <Row label="Challenge">
            <p className="text-lg leading-relaxed text-paper/80">{project.challenge}</p>
          </Row>
          <Row label="Process">
            <ol className="space-y-5">
              {project.process.map((step, i) => (
                <li key={step} className="flex gap-5">
                  <span className="font-serif text-sm text-vermil">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg text-paper/80">{step}</span>
                </li>
              ))}
            </ol>
          </Row>
          <Row label="Design">
            <p className="text-lg leading-relaxed text-paper/80">{project.design}</p>
          </Row>
          <Row label="Final result">
            <p className="text-lg leading-relaxed text-paper/80">{project.result}</p>
          </Row>
          <Row label="Reflection">
            <p className="font-serif text-xl leading-relaxed text-paper sm:text-2xl">{project.reflection}</p>
          </Row>
        </div>

        {/* Gallery */}
        <section className="border-t border-paper/10 pt-12 lg:pt-16" aria-label="Gallery">
          <h3 className="label mb-8">Gallery</h3>
          {project.galleryMode === 'scroll' ? (
            <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10" tabIndex={0} aria-label="Interface mockups, scroll sideways">
              {project.gallery.map((m, i) => (
                <figure key={i} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[46%]">
                  <div className="aspect-[16/10] overflow-hidden bg-coal">
                    <MediaFrame item={m} />
                  </div>
                  {m.caption && <figcaption className="mt-3 text-sm text-ash">{m.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {project.gallery.map((m, i) => (
                <figure key={i} className={project.galleryMode === 'video' && i === 0 ? 'sm:col-span-2' : ''}>
                  <TiltMedia strength={project.galleryMode === 'tilt' ? 6 : 0} className="aspect-[16/10] overflow-hidden bg-coal">
                    <MediaFrame item={m} />
                  </TiltMedia>
                  {m.caption && <figcaption className="mt-3 text-sm text-ash">{m.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </section>

        {/* Next */}
        <button
          type="button"
          onClick={() => onNavigate(next)}
          data-cursor="NEXT"
          className="group mt-24 block w-full border-t border-paper/10 pt-10 text-left"
        >
          <span className="label">Next project</span>
          <span className="display mt-4 block text-[clamp(2.4rem,7vw,6rem)] transition-transform duration-500 group-hover:translate-x-3">
            {next.title} <span className="text-vermil">→</span>
          </span>
        </button>
      </article>
    </div>
  );
}
