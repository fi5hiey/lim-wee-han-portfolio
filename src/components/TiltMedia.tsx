import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../hooks/useMedia';

/** Wraps media in a subtle 3D tilt that follows the pointer. */
export default function TiltMedia({ children, strength = 6, className = '' }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, (v) => v * strength);
  const rotateX = useTransform(sy, (v) => -v * strength);
  const active = fine && !reduce;

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div style={active ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
