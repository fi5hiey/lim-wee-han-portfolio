import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  useVelocity,
  useInView,
} from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

// Scroll down: the band runs right at 4x. Scroll up: it runs left at 0.5x.
// When you stop scrolling it keeps going the way it was last pushed.
const DOWN = { dir: 1, mult: 4 };
const UP = { dir: -1, mult: 0.5 };
const THRESHOLD = 20; // px/s of scroll before it counts as a direction change

/**
 * A band of large type that drifts sideways and follows your scroll direction:
 * four times as fast to the right while scrolling down, half speed to the left while scrolling up.
 * Two identical copies sit side by side and the offset wraps by exactly one copy, so it loops seamlessly.
 * Purely decorative.
 */
/** `speed` is the base drift in % of the screen width per second (before the 4x / 0.5x multipliers). */
export default function VelocityMarquee({ items, speed = 2, className = '' }: { items: string[]; speed?: number; className?: string }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const track = useRef<HTMLDivElement>(null);
  const copyWidth = useRef(0);
  // Offset wraps by exactly one copy's width, so the seam is never visible
  const x = useTransform(base, (v) => (copyWidth.current ? wrap(-copyWidth.current, 0, v) : 0));
  const mode = useRef(DOWN);
  const current = useRef(0); // signed speed in px/s, eased toward the target
  const box = useRef<HTMLDivElement>(null);
  const visible = useInView(box);

  useEffect(() => {
    const el = track.current?.firstElementChild as HTMLElement | null;
    if (!el) return;
    const measure = () => {
      copyWidth.current = el.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !visible) return;
    const v = velocity.get();
    if (v > THRESHOLD) mode.current = DOWN;
    else if (v < -THRESHOLD) mode.current = UP;
    const target = mode.current.dir * (Math.abs(speed) / 100) * window.innerWidth * mode.current.mult;
    // Ease into the new speed/direction so it turns around smoothly instead of snapping
    current.current += (target - current.current) * Math.min(1, delta / 250);
    base.set(base.get() + current.current * (delta / 1000));
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`${i % 2 ? 'text-transparent [-webkit-text-stroke:1px_rgb(var(--paper)/.45)]' : 'text-paper/85'} ${/[\u3040-\u30ff\u4e00-\u9faf]/.test(t) ? 'font-brush' : ''}`}
            lang={/[\u3040-\u30ff\u4e00-\u9faf]/.test(t) ? 'ja' : undefined}
          >
            {t}
          </span>
          <span className="mx-8 inline-block h-2.5 w-2.5 rotate-45 bg-crimson sm:mx-12" />
        </span>
      ))}
    </span>
  );

  return (
    <div ref={box} className={`overflow-hidden whitespace-nowrap border-y border-paper/10 py-6 sm:py-8 ${className}`} aria-hidden="true">
      <motion.div ref={track} className="flex w-max font-serif text-[clamp(2.4rem,7vw,6rem)] leading-none will-change-transform" style={{ x }}>
        {row}
        {row}
      </motion.div>
    </div>
  );
}
