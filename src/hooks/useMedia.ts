import { useEffect, useState } from 'react';

export function useMedia(query: string, initial = false): boolean {
  const [match, setMatch] = useState(() => (typeof window === 'undefined' ? initial : window.matchMedia(query).matches));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/** Full cinematic mode: large screen and the visitor hasn't asked for reduced motion. */
export function useCinematic(): boolean {
  const large = useMedia('(min-width: 1024px)');
  const reduce = useMedia('(prefers-reduced-motion: reduce)');
  return large && !reduce;
}

export function useFinePointer(): boolean {
  return useMedia('(pointer: fine)');
}
