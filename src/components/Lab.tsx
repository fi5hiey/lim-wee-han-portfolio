import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { labItems } from '../data/projects';
import { asset } from '../data/art';
import { useCinematic } from '../hooks/useMedia';
import InkChar from './InkChar';

const BASE = [-1.5, 1.2, -0.8, 1.8, -1.6, 0.9, -1.1];
const OFFSET = ['lg:mt-0', 'lg:mt-24', 'lg:-mt-6', 'lg:mt-16', 'lg:mt-4', 'lg:mt-28', 'lg:-mt-2'];
const WIDTH = ['lg:w-[24%]', 'lg:w-[20%]', 'lg:w-[26%]', 'lg:w-[19%]', 'lg:w-[22%]', 'lg:w-[25%]', 'lg:w-[20%]'];

function Card({ item, i, mx }: { item: (typeof labItems)[number]; i: number; mx: MotionValue<number> }) {
  const rotate = useTransform(mx, (v) => BASE[i] + v * 2 * (i % 2 ? 1 : -1));
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative w-[46%] sm:w-[31%] ${WIDTH[i]} ${OFFSET[i]} lg:-mx-3`}
      initial={reduce ? false : { y: 160, opacity: 0, rotate: (i % 2 ? 1 : -1) * 14 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ type: 'spring', stiffness: 70, damping: 14, delay: i * 0.07 }}
      whileHover={{ zIndex: 20 }}
    >
    <motion.figure
      style={{ rotate }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative bg-[#f7f2e9] p-2.5 shadow-[0_26px_50px_-20px_rgba(45,32,20,.45),0_2px_6px_rgba(45,32,20,.12)]"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img src={asset(item.art)} alt={`${item.title}, ${item.type}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <figcaption className="px-1 pb-1 pt-3">
        <span className="block font-serif text-lg leading-tight">{item.title}</span>
        <span className="label mt-1 block text-[0.6rem]">{item.type}</span>
      </figcaption>
    </motion.figure>
    </motion.div>
  );
}

export default function Lab() {
  const cinematic = useCinematic();
  const reduce = useReducedMotion();
  const raw = useMotionValue(0);
  const mx = useSpring(raw, { stiffness: 60, damping: 20 });

  return (
    <section
      className="on-paper relative overflow-hidden py-32 lg:py-40"
      aria-labelledby="lab-title"
      onPointerMove={(e) => {
        if (!cinematic || reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        raw.set(((e.clientX - r.left) / r.width) * 2 - 1);
      }}
      onPointerLeave={() => raw.set(0)}
    >
      <div className="shell">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <h2 id="lab-title" className="display text-[clamp(2.8rem,7vw,6.5rem)]">
              Lab <span className="text-paper/30">/</span> <span lang="ja">実験</span>
            </h2>
            <p className="mt-6 max-w-md text-paper/70">Experiments, sketches and prototypes. Some become projects. Most just teach me something.</p>
          </div>
          <div className="hidden text-paper/20 lg:block">
            <InkChar text="創造" className="text-3xl hover:text-paper/60" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-0">
          {labItems.map((item, i) => (
            <Card key={item.title} item={item} i={i} mx={mx} />
          ))}
        </div>
      </div>
    </section>
  );
}
