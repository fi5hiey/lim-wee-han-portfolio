import { useEffect, useRef } from 'react';

/** A few slow, drifting dust motes. Desktop only; skipped with reduced motion. */
export default function Particles({ count = 40, color = '237,231,220' }: { count?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, visible = true;
    const pts = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.6, s: 0.00008 + Math.random() * 0.00025, a: 0.15 + Math.random() * 0.45, p: Math.random() * 6 }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.y -= p.s * 16;
        if (p.y < -0.02) p.y = 1.02;
        const x = (p.x + Math.sin(t * 0.0003 + p.p) * 0.01) * w;
        ctx.beginPath();
        ctx.arc(x, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [count, color]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
