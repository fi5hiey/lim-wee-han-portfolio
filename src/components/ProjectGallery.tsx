import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import ProjectCard from './ProjectCard';
import RevealLines from './RevealLines';
import DecodeText from './DecodeText';

// The section background shifts subtly as each project takes the stage
const TONES = ['#111110', '#121513', '#141312', '#131411', '#111312', '#141414'];

export default function ProjectGallery({ onOpen }: { onOpen: (p: Project) => void }) {
  const [active, setActive] = useState(0);
  return (
    <motion.section
      id="work"
      className="relative"
      animate={{ backgroundColor: TONES[active % TONES.length] }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-clip" aria-hidden="true">
        <div className="sticky top-0 h-screen bg-[radial-gradient(ellipse_50%_40%_at_70%_45%,rgb(var(--moss)/.22),transparent_70%),radial-gradient(ellipse_40%_30%_at_10%_90%,rgb(var(--crimson)/.07),transparent_70%)]" />
      </div>
      <div className="shell relative pb-10 pt-32 lg:pt-40">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <DecodeText className="label mb-6" text="02 — Work" />
            <RevealLines as="h2" lines={['Selected', 'worlds']} className="display text-[clamp(3rem,8vw,8rem)]" />
          </div>
          <p className="max-w-xs text-paper/70">
            {projects.length} projects across 3D, games, interfaces and immersive media. Each one opens into the full story.
          </p>
        </div>
        <div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} total={projects.length} onOpen={onOpen} onActive={setActive} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
