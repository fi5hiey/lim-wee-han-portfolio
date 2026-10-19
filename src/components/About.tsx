import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/projects';
import RevealLines from './RevealLines';
import DecodeText from './DecodeText';

const FOCUS = ['3D environments', 'UI/UX', 'Interactive experiences', 'Visual storytelling'];

function Enso() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Abstract ink circle with a red seal, standing in for a portrait">
      <defs>
        <filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </defs>
      <rect width="400" height="500" fill="rgb(var(--paper))" />
      <motion.path
        d="M200 110 A120 120 0 1 1 199.9 110"
        fill="none"
        stroke="#161615"
        strokeWidth="30"
        strokeLinecap="round"
        filter="url(#brush)"
        transform="rotate(-70 200 230)"
        initial={reduce ? { pathLength: 0.88 } : { pathLength: 0 }}
        whileInView={{ pathLength: 0.88 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
      />
      <rect x="300" y="390" width="54" height="54" rx="6" fill="rgb(var(--crimson))" />
      <text x="327" y="420" textAnchor="middle" dominantBaseline="middle" fontFamily="'Yuji Syuku', 'Shippori Mincho B1', serif" fontSize="32" fill="rgb(var(--paper))">
        林
      </text>
      <text x="44" y="460" fontFamily="'Shippori Mincho B1', serif" fontSize="14" fill="#161615" opacity=".6" letterSpacing="4">
        LIM WEE HAN
      </text>
    </svg>
  );
}

export default function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="relative overflow-hidden py-32 lg:py-44">
      <div className="bg-seigaiha pointer-events-none absolute inset-y-0 left-0 w-full lg:w-1/2" aria-hidden="true" />
      <div className="shell relative grid gap-16 lg:grid-cols-12 lg:gap-12">
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="aspect-[4/5] w-full max-w-md">
            <Enso />
          </div>
        </motion.div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <DecodeText className="label mb-8" text="03 — About me" />
          <RevealLines as="h2" lines={[site.name]} className="display text-[clamp(2.8rem,6vw,5.6rem)]" />
          <p className="mt-4 font-serif text-xl text-vermil">{site.role}</p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-paper/80">
            <p>I&rsquo;m an Immersive Media designer interested in the space between storytelling, technology and visual design.</p>
            <p>I build environments, interfaces and interactive experiences that give people something to explore rather than simply something to look at.</p>
          </div>
          <ul className="mt-12 border-t border-paper/10" aria-label="Focus">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-center justify-between border-b border-paper/10 py-4">
                <span className="label text-paper">{f}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
