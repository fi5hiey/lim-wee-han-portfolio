import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';

/**
 * Small labels that resolve from katakana into their real text the first time they're seen,
 * like a departure board settling. Screen readers always get the real text.
 */
export default function DecodeText({ text, className = '', as: Tag = 'p', id }: { text: string; className?: string; as?: 'p' | 'span' | 'h2' | 'h3'; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const scramble = () => {
      let frame = 0;
      const total = 18;
      const step = () => {
        const done = Math.floor((frame / total) * text.length);
        setOut(
          text
            .split('')
            .map((c, i) => (c === ' ' || /[—/•.]/.test(c) || i < done ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join('')
        );
        frame += 1;
        if (frame <= total) timer = window.setTimeout(step, 40);
        else setOut(text);
      };
      step();
    };
    setOut(text.replace(/[^\s—/•.]/g, '・'));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          scramble();
          io.disconnect();
        }
      },
      { rootMargin: '-10% 0px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <Tag ref={ref as never} id={id} className={className}>
      <span aria-hidden="true">{out}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
