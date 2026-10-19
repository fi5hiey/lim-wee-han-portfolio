import { Fragment, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCinematic } from '../hooks/useMedia';

/**
 * Large headline whose letters lift toward the pointer, like paper catching a breeze.
 * Lines also slide up from a mask the first time they're seen.
 */
export default function ProximityText({ lines, className = '', accentLast = false }: { lines: string[]; className?: string; accentLast?: boolean }) {
  const wrap = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const cinematic = useCinematic();

  useEffect(() => {
    const el = wrap.current;
    if (!el || !cinematic) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>('[data-ch]'));
    let px = -9999, py = -9999, raf = 0, active = false;
    const update = () => {
      raf = 0;
      for (const c of chars) {
        const r = c.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const k = Math.max(0, 1 - d / 220);
        const e = k * k * (3 - 2 * k);
        c.style.transform = e ? `translate3d(0, ${-e * 18}px, 0) rotate(${(dx > 0 ? -1 : 1) * e * 4}deg)` : '';
        c.style.color = e > 0.35 ? 'rgb(var(--crimson-hi))' : '';
      }
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      active = true;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const leave = () => {
      if (!active) return;
      px = py = -9999;
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [cinematic]);

  return (
    <h2 ref={wrap} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={line} className="block overflow-hidden pb-[0.1em]" aria-hidden="true">
          <motion.span
            className={`block ${accentLast && li === lines.length - 1 ? 'text-vermil' : ''}`}
            initial={reduce ? false : { y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 1.1, delay: li * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line.split(' ').map((word, wi, words) => (
              <Fragment key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {word.split('').map((ch, i) => (
                    <span key={i} data-ch className="inline-block transition-[transform,color] duration-300 ease-out">
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 && ' '}
              </Fragment>
            ))}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
