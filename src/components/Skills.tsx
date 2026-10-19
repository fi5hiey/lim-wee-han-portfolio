import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/projects';
import DecodeText from './DecodeText';

/** Skills as floating tags. Hovering or focusing a tag lights up its category. */
export default function Skills() {
  const [hot, setHot] = useState<string | null>(null);
  return (
    <section className="pb-32 lg:pb-44" aria-labelledby="skills-title">
      <div className="shell">
        <DecodeText as="h2" id="skills-title" className="label mb-12" text="Skills" />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4" onMouseLeave={() => setHot(null)}>
          {skills.map((g) => {
            const on = hot === g.group;
            const dim = hot !== null && !on;
            return (
              <div key={g.group} className={`transition-opacity duration-500 ${dim ? 'opacity-35' : 'opacity-100'}`}>
                <h3 className="relative mb-6 inline-block font-serif text-2xl" onMouseEnter={() => setHot(g.group)}>
                  <span className={`transition-colors duration-500 ${on ? 'text-vermil' : ''}`}>{g.group}</span>
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left bg-vermil"
                    initial={false}
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </h3>
                <ul className="flex flex-wrap gap-2.5">
                  {g.items.map((s) => (
                    <li key={s}>
                      <span
                        tabIndex={0}
                        onMouseEnter={() => setHot(g.group)}
                        onFocus={() => setHot(g.group)}
                        onBlur={() => setHot(null)}
                        className={`inline-block rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${on ? 'border-crimson/70 bg-crimson/10 text-paper' : 'border-paper/15 text-paper/75 hover:border-paper/40'}`}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
