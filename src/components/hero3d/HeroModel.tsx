import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import modelUrl from '../../assets/models/littlest-tokyo.glb?url';
import { useMedia } from '../../hooks/useMedia';

/**
 * Real-time 3D centrepiece for the hero. The scene code loads after the text has painted.
 * If WebGL is unavailable the hero simply shows the typography on its own.
 */
export default function HeroModel({ scroll, layout }: { scroll: MotionValue<number>; layout: 'side' | 'stacked' }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useMedia('(prefers-reduced-motion: reduce)');
  const [state, setState] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    if (nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory < 3)) {
      setState('failed');
      return;
    }
    try {
      const probe = document.createElement('canvas');
      if (!probe.getContext('webgl2') && !probe.getContext('webgl')) {
        setState('failed');
        return;
      }
    } catch {
      setState('failed');
      return;
    }
    import('./createHeroScene')
      .then(({ createHeroScene }) => {
        if (cancelled || !canvas.current) return;
        cleanup = createHeroScene({
          canvas: canvas.current,
          modelUrl,
          reducedMotion: reduce,
          layout,
          getScroll: () => scroll.get(),
          onLoaded: () => setState('ready'),
          onError: () => setState('failed'),
        });
      })
      .catch(() => setState('failed'));
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduce, scroll, layout]);

  if (state === 'failed') return null;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <canvas
        ref={canvas}
        className="h-full w-full transition-opacity duration-[1800ms] ease-out"
        style={{ opacity: state === 'ready' ? 1 : 0, filter: 'saturate(.62) contrast(1.06) brightness(.96)' }}
      />
    </div>
  );
}
