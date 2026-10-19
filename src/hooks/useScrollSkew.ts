import { useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

/** A skew value (degrees) that follows scroll speed, so images lean slightly as you scroll fast. */
export function useScrollSkew(max = 3) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  return useTransform(smooth, [-2500, 0, 2500], reduce ? [0, 0, 0] : [max, 0, -max], { clamp: true });
}
