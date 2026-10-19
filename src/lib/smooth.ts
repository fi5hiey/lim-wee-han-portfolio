import Lenis from 'lenis';

let instance: Lenis | null = null;

/** Starts inertial smooth scrolling (mouse/trackpad only; touch keeps native scrolling). */
export function startSmoothScroll(): () => void {
  if (instance) return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  // Touch devices already have native momentum scrolling; don't add a second layer
  if (!window.matchMedia('(pointer: fine)').matches) return () => {};
  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    anchors: { offset: 0 },
    // Let elements marked data-lenis-prevent (case studies, menus, sideways strips) scroll natively
    prevent: (node) => node.hasAttribute('data-lenis-prevent'),
  });
  instance = lenis;
  let raf = 0;
  const loop = (t: number) => {
    lenis.raf(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis.destroy();
    instance = null;
  };
}

export function pauseSmoothScroll() {
  instance?.stop();
}
export function resumeSmoothScroll() {
  instance?.start();
}
