import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../data/portfolioData';

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setScrolled(y > 40);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
        animate={{ y: hidden && !open ? '-120%' : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-500 sm:px-5 ${
            scrolled ? 'border-white/10 bg-ink/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
          }`}
          aria-label="Main"
        >
          <a href="#home" className="group flex items-center gap-2.5" aria-label="Muhammad Arham, back to top">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-bone font-display text-sm font-extrabold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
              MA
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">Muhammad Arham</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-bone/70 transition-colors hover:bg-white/5 hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ember sm:flex"
            >
              Résumé <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-12 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-ember">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="mt-10 font-mono text-sm text-ash">
              {PERSONAL_INFO.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
