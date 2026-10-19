import { useEffect, useRef, useState } from 'react';
import { useFinePointer } from '../hooks/useMedia';

/**
 * Small circle that follows the pointer. Over anything with data-cursor="VIEW" (etc.)
 * it expands and shows that word. Elements with data-magnetic lean toward the pointer.
 * Disabled on touch devices.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    let magnet: HTMLElement | null = null;

    const resetMagnet = () => {
      if (magnet) magnet.style.transform = '';
      magnet = null;
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (magnet && !reduce) {
        const r = magnet.getBoundingClientRect();
        const dx = (x - (r.left + r.width / 2)) * 0.25;
        const dy = (y - (r.top + r.height / 2)) * 0.35;
        magnet.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>('[data-cursor]');
      const interactive = t?.closest<HTMLElement>('a, button, [role="button"], input, textarea, select, label, [data-cursor]');
      setLabel(labelled?.dataset.cursor ?? '');
      setHover(Boolean(interactive));
      const m = t?.closest<HTMLElement>('[data-magnetic]') ?? null;
      if (m !== magnet) {
        resetMagnet();
        magnet = m;
        if (magnet) magnet.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
      }
    };
    const click = (e: PointerEvent) => {
      if (reduce || e.button !== 0) return;
      const r = document.createElement('span');
      r.className = 'ink-ripple';
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      document.body.appendChild(r);
      const a = r.animate(
        [
          { transform: 'scale(1)', opacity: 0.9 },
          { transform: 'scale(5.5)', opacity: 0 },
        ],
        { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' }
      );
      a.onfinish = () => r.remove();
    };
    const leave = () => {
      x = -100;
      y = -100;
      resetMagnet();
    };

    const loop = () => {
      const k = reduce ? 1 : 0.22;
      cx += (x - cx) * k;
      cy += (y - cy) * k;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', click);
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', click);
      document.removeEventListener('pointerleave', leave);
      root.classList.remove('has-cursor');
      resetMagnet();
    };
  }, [fine]);

  if (!fine) return null;
  const size = label ? 84 : hover ? 44 : 12;
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[120]">
      <div
        className={`flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out ${
          label ? 'bg-paper text-night' : hover ? 'border border-paper/70 bg-transparent' : 'bg-paper'
        }`}
        style={{ width: size, height: size, mixBlendMode: label ? 'normal' : 'difference' }}
      >
        {label && <span className="text-[0.62rem] font-bold tracking-[0.2em]">{label}</span>}
      </div>
    </div>
  );
}
