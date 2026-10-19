import { AnimatePresence, motion } from 'framer-motion';
import Seal from './Seal';

/** A sheet of rice paper that slides across the screen to cover page changes. */
export default function PaperWipe({ active, kanji }: { active: boolean; kanji?: string }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-paper text-night"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          exit={{ clipPath: 'inset(0 0 0 100%)' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            <Seal size={44} />
            {kanji && (
              <span lang="ja" className="font-serif text-sm tracking-[0.6em] text-night/60">
                {kanji}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
