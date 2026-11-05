import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const ease = [0.76, 0, 0.24, 1];

export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 0 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && !reduce && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink"
          exit={{ y: '-100%', transition: { duration: 0.9, ease } }}
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-5xl"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Muhammad Arham<span className="text-ember">.</span>
            </motion.p>
          </div>
          <motion.span
            className="absolute bottom-[38%] left-1/2 h-px w-48 -translate-x-1/2 origin-left bg-ember sm:bottom-[36%]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
