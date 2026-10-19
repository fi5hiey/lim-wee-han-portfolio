import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { credits, site } from '../data/projects';
import Seal from './Seal';

export default function Footer() {
  const [thanks, setThanks] = useState(false);

  return (
    <footer className="relative border-t border-paper/10 bg-night">
      <div className="shell grid gap-10 py-14 sm:grid-cols-3 sm:items-end">
        <div>
          <p className="label text-paper">{site.name}</p>
          <p className="label mt-2">{site.role}</p>
        </div>
        <div className="font-serif text-sm text-ash sm:text-center">
          <p lang="ja" className="font-brush text-lg text-paper/80">
            世界をつくる。
          </p>
          <p className="mt-1">Create worlds.</p>
        </div>
        <div className="flex items-end justify-between gap-6 sm:justify-end">
          <div className="sm:text-right">
            <p className="font-brush text-base text-paper/80" lang="ja">
              「また会いましょう。」
            </p>
            <p className="mt-1 text-xs text-ash">See you again.</p>
            <p className="label mt-4 text-[0.6rem]">
              © {site.year} {site.name}
            </p>
          </div>
          <button type="button" onClick={() => setThanks(true)} aria-label="Press the seal" className="-m-3 p-3 opacity-50 transition-opacity hover:opacity-100">
            <Seal size={22} />
          </button>
        </div>
      </div>
      <div className="shell border-t border-paper/5 pb-8 pt-5">
        {credits.map((c) => (
          <p key={c.work} className="text-[0.7rem] text-ash/70">
            {c.note}:{' '}
            <a href={c.workHref} target="_blank" rel="noreferrer" className="link-line inline-block py-2 hover:text-paper">
              {c.work}
            </a>{' '}
            by{' '}
            <a href={c.authorHref} target="_blank" rel="noreferrer" className="link-line inline-block py-2 hover:text-paper">
              {c.author}
            </a>
            ,{' '}
            <a href={c.licenseHref} target="_blank" rel="noreferrer" className="link-line inline-block py-2 hover:text-paper">
              {c.license}
            </a>
          </p>
        ))}
      </div>

      <AnimatePresence>
        {thanks && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-night/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setThanks(false)}
            role="dialog"
            aria-label="Thanks for exploring"
          >
            <motion.div
              className="flex flex-col items-center gap-8 text-center"
              initial={{ scale: 1.4, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <Seal size={110} />
              <p className="label text-base text-paper">Thanks for exploring.</p>
              <button type="button" autoFocus onClick={() => setThanks(false)} className="label link-line text-ash">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
