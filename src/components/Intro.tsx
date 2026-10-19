import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/projects';
import InkChar from './InkChar';
import RevealLines from './RevealLines';

export default function Intro() {
  const reduce = useReducedMotion();
  return (
    <section id="intro" className="relative overflow-hidden py-36 lg:py-56">
      <div className="bg-inkwash pointer-events-none absolute inset-[-10%]" aria-hidden="true" />
      <div className="bg-genko pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-auto absolute left-6 top-24 hidden text-paper/25 sm:left-10 sm:block lg:left-12">
        <InkChar text="物語" className="text-2xl hover:text-paper/60" />
      </div>
      <div className="absolute right-8 top-1/3 hidden text-paper/20 sm:block lg:right-24">
        <InkChar text="世界" className="text-3xl hover:text-paper/60" />
      </div>
      <div className="absolute bottom-20 left-1/2 hidden text-paper/15 sm:block">
        <InkChar text="体験" className="text-xl hover:text-paper/60" />
      </div>

      <div className="shell relative">
        <RevealLines as="h2" lines={['Designing worlds,', 'not just interfaces.']} className="display max-w-5xl text-[clamp(2.7rem,7.2vw,7rem)]" />
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <motion.p
            className="text-lg leading-relaxed text-paper/80 sm:text-xl lg:col-span-5 lg:col-start-6"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            I&rsquo;m {site.name}, an Immersive Media designer. I build interactive experiences through 3D, design, technology and storytelling.
          </motion.p>
          <RevealLines
            lines={['Some projects are designed to be seen.', 'Others are designed to be experienced.']}
            className="font-serif text-lg text-ash lg:col-span-5 lg:col-start-6"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
