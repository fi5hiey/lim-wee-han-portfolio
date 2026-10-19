import { motion, useReducedMotion } from 'framer-motion';

/** Each line slides up from behind a mask as it scrolls into view. */
export default function RevealLines({
  lines,
  className = '',
  lineClass = '',
  delay = 0,
  as: Tag = 'p',
  accentLast = false,
}: {
  lines: string[];
  className?: string;
  lineClass?: string;
  delay?: number;
  as?: 'p' | 'h2' | 'h3';
  accentLast?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClass} ${accentLast && i === lines.length - 1 ? 'text-vermil' : ''}`}
            initial={reduce ? false : { y: '105%', filter: 'blur(6px)' }}
            whileInView={{ y: '0%', filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 1, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
