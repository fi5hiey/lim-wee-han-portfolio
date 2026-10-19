import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useCinematic, useMedia } from '../hooks/useMedia';
import InkChar from './InkChar';
import Particles from './Particles';
import DecodeText from './DecodeText';

/** A quiet night garden that the camera drifts through. A visual pause between sections. */
export default function Garden() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematic();
  const reduce = useReducedMotion();
  const portrait = useMedia('(max-aspect-ratio: 4/5)');
  const { scrollYProgress } = useScroll({ target: ref, offset: cinematic ? ['start start', 'end end'] : ['start end', 'end start'] });
  const still = reduce ?? false;
  const far = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -40]);
  const mid = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -130]);
  const near = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [60, -280]);
  const cam = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1.04, 1.18]);
  const moonY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [20, -30]);
  const text = useTransform(scrollYProgress, [0.25, 0.45, 0.8, 0.95], [0, 1, 1, cinematic ? 0 : 1]);

  return (
    <section ref={ref} className={cinematic ? 'relative h-[220vh]' : 'relative'} aria-label="Garden interlude">
      <div className={`${cinematic ? 'sticky top-0 h-screen' : 'h-[90svh] min-h-[520px]'} relative overflow-hidden bg-night`}>
        <motion.svg viewBox={portrait ? '560 40 760 900' : '0 0 1600 900'} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" style={{ scale: cam }} aria-hidden="true">
          <defs>
            <linearGradient id="gsky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0c0d0c" />
              <stop offset=".6" stopColor="#151a16" />
              <stop offset="1" stopColor="#0f110f" />
            </linearGradient>
            <radialGradient id="gstone" cx="40%" cy="30%" r="80%">
              <stop offset="0" stopColor="#5a5c58" />
              <stop offset="1" stopColor="#1a1b19" />
            </radialGradient>
            <filter id="gglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30" /></filter>
          </defs>
          <rect width="1600" height="900" fill="url(#gsky)" />

          {/* Moon */}
          <motion.g style={{ x: far, y: moonY }}>
            <circle cx="1120" cy="220" r="150" fill="#ede7dc" opacity=".12" filter="url(#gglow)" />
            <circle cx="1120" cy="220" r="74" fill="#e4ddcf" />
            <circle cx="1095" cy="205" r="12" fill="#d3cbbb" /><circle cx="1140" cy="240" r="8" fill="#d3cbbb" />
          </motion.g>

          {/* Architecture silhouette: a distant pagoda on the ridge */}
          <motion.g style={{ x: far }} fill="#1a1e1b">
            <path d="M0 560 Q400 520 800 545 T1600 540 V900 H0Z" fill="#141714" />
            {[
              { y: 530, w: 230, h: 46 },
              { y: 470, w: 190, h: 40 },
              { y: 418, w: 152, h: 34 },
              { y: 374, w: 118, h: 28 },
            ].map((t, i) => (
              <g key={i}>
                <rect x={330 - t.w * 0.3} y={t.y - t.h + 14} width={t.w * 0.6} height={t.h} />
                <path d={`M${330 - t.w / 2} ${t.y - t.h + 16} Q ${330} ${t.y - t.h - 6} ${330 + t.w / 2} ${t.y - t.h + 16} L ${330 + t.w / 2 - 14} ${t.y - t.h + 22} L ${330 - t.w / 2 + 14} ${t.y - t.h + 22} Z`} />
              </g>
            ))}
            <rect x="327" y="296" width="6" height="56" />
            {[0, 1, 2, 3, 4].map((k) => (
              <rect key={k} x={322} y={304 + k * 9} width="16" height="3" />
            ))}
          </motion.g>

          {/* Mist */}
          <motion.rect style={{ x: far }} x="-100" y="520" width="1900" height="70" fill="#ede7dc" opacity=".04" filter="url(#gglow)" />

          {/* Gravel, pond and stones */}
          <motion.g style={{ x: mid }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M-200 ${620 + i * 30} Q 300 ${605 + i * 30} 700 ${620 + i * 30} T 1900 ${620 + i * 30}`} stroke="#a9aba8" strokeOpacity=".07" fill="none" strokeWidth="2" />
            ))}
            <ellipse cx="1050" cy="700" rx="300" ry="62" fill="#0b0d0b" stroke="#a9aba8" strokeOpacity=".12" />
            <ellipse cx="1120" cy="700" rx="40" ry="8" fill="#e4ddcf" opacity=".35" />
            {[0, 1, 2].map((i) => (
              <ellipse
                key={i}
                cx="1000"
                cy="705"
                rx="70"
                ry="14"
                fill="none"
                stroke="#ede7dc"
                strokeOpacity=".35"
                className="ripple"
                style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: still ? 'none' : `ripple 5s ${i * 1.6}s ease-out infinite` }}
              />
            ))}
            {[
              [520, 690, 70],
              [640, 720, 40],
              [300, 760, 52],
            ].map(([x, y, r], i) => (
              <g key={i}>
                {[1.6, 2.2, 2.8].map((k) => (
                  <ellipse key={k} cx={x} cy={y + 10} rx={r * k} ry={r * k * 0.22} fill="none" stroke="#a9aba8" strokeOpacity=".08" />
                ))}
                <path d={`M${x - r} ${y + 10} Q ${x - r * 0.9} ${y - r * 0.9} ${x} ${y - r * 0.8} Q ${x + r * 1.1} ${y - r * 0.6} ${x + r} ${y + 10} Z`} fill="url(#gstone)" />
              </g>
            ))}
          </motion.g>

          {/* Pine branch, foreground */}
          <motion.g style={{ x: near }}>
            <path d="M1700 60 C 1500 90, 1380 150, 1240 140 C 1150 135, 1100 170, 1020 160" stroke="#1d1f1c" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M1380 150 C 1340 210, 1290 230, 1230 240" stroke="#1d1f1c" strokeWidth="9" fill="none" strokeLinecap="round" />
            {[
              [1240, 130],
              [1110, 150],
              [1030, 150],
              [1300, 230],
              [1440, 110],
            ].map(([x, y], i) => (
              <g key={i} stroke="#24302a" strokeWidth="3" strokeLinecap="round">
                {Array.from({ length: 13 }).map((_, k) => {
                  const a = (k / 12) * Math.PI - Math.PI;
                  return <line key={k} x1={x} y1={y} x2={x + Math.cos(a) * 46} y2={y + Math.sin(a) * 30} />;
                })}
              </g>
            ))}
          </motion.g>
        </motion.svg>

        {cinematic && <Particles count={14} color="237,231,220" />}

        <motion.div className="absolute inset-x-0 bottom-[16%] z-10 text-center" style={{ opacity: text }}>
          <DecodeText className="label mb-4" text="Exploration" />
          <p className="font-serif text-[clamp(1.6rem,3.2vw,2.8rem)] text-paper">Good experiences invite people to explore.</p>
        </motion.div>
        <div className="absolute left-8 top-1/3 z-10 text-paper/25 lg:left-16">
          <InkChar text="探索" className="text-2xl hover:text-paper/60" />
        </div>
      </div>
    </section>
  );
}
