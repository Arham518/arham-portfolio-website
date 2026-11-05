import { Children } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/** Staggered blur-in reveal for children (skill chips, cards, etc.). */
export function BlurStagger({
  children,
  className = '',
  delay = 0,
  initialBlur = 12,
  stagger = 0.06,
}) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          className="contents"
          initial={{ opacity: 0, filter: reduce ? 'blur(0px)' : `blur(${initialBlur}px)`, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
