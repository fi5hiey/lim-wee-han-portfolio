import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Splash {
  id: number;
  blobs: { x: number; y: number; r: number }[];
}

/**
 * Decorative Japanese characters. Clicking one leaves a small ink splash (an easter egg).
 * Hidden from screen readers because the meaning is never essential.
 */
export default function InkChar({ text, className = '', vertical = true }: { text: string; className?: string; vertical?: boolean }) {
  const [splashes, setSplashes] = useState<Splash[]>([]);

  const splash = () => {
    const id = Date.now();
    const blobs = Array.from({ length: 7 }, (_, i) => {
      const a = (i / 7) * Math.PI * 2 + Math.random();
      const d = 14 + Math.random() * 30;
      return { x: Math.cos(a) * d, y: Math.sin(a) * d, r: 3 + Math.random() * 7 };
    });
    setSplashes((s) => [...s, { id, blobs }]);
    setTimeout(() => setSplashes((s) => s.filter((x) => x.id !== id)), 1400);
  };

  return (
    <span
      aria-hidden="true"
      lang="ja"
      onClick={splash}
      className={`relative inline-block select-none font-brush ${vertical ? 'vertical' : ''} ${className}`}
    >
      {text}
      <AnimatePresence>
        {splashes.map((s) => (
          <motion.svg
            key={s.id}
            viewBox="-60 -60 120 120"
            className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 overflow-visible"
            initial={{ opacity: 1, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <circle r="12" fill="rgb(var(--crimson))" />
            {s.blobs.map((b, i) => (
              <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={i % 3 ? 'rgb(var(--crimson))' : 'rgb(var(--paper))'} />
            ))}
          </motion.svg>
        ))}
      </AnimatePresence>
    </span>
  );
}
