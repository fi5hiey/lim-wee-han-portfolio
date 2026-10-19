import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../data/projects';

function seen() {
  try {
    return sessionStorage.getItem('wh-intro') === '1';
  } catch {
    return false;
  }
}

/** Black intro with a thin progress line, then a mask reveal into the site. Plays once per session. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(() => !seen());
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!show) {
      onDone();
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduce ? 400 : 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      setPct(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem('wh-intro', '1');
        } catch {
          /* ignore */
        }
        setTimeout(() => {
          setShow(false);
          onDone();
        }, 150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="font-serif text-2xl tracking-[0.5em] text-paper sm:text-4xl"
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {site.name.toUpperCase()}
          </motion.p>
          <div className="mt-10 h-px w-56 bg-paper/10 sm:w-72">
            <div className="h-full origin-left bg-crimson" style={{ transform: `scaleX(${pct})` }} />
          </div>
          <div className="mt-5 flex items-center gap-4 text-xs text-ash">
            <span className="font-serif text-paper/80" lang="ja">「世界をつくる。」</span>
            <span className="label">Creating worlds</span>
            <span className="tabular-nums text-paper/50">{String(Math.round(pct * 100)).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
