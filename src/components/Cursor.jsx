import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/** Small ember cursor that grows into a label over anything with data-cursor. Desktop only. */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (!enabled || reduce) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target.closest?.('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : '');
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full bg-ember font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-ink"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: label ? 104 : 10, height: label ? 104 : 10, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      aria-hidden="true"
    >
      {label && <span className="whitespace-nowrap">{label} ↗</span>}
    </motion.div>
  );
}
