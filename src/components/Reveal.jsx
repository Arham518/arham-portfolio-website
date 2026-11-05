import { motion, useReducedMotion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1];

/** Words slide up from behind a mask, one after another. */
export function SplitReveal({ text, as = 'span', className = '', delay = 0, stagger = 0.06 }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.span;
  const words = text.split(' ');
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 },
              show: { y: 0, opacity: 1, transition: { duration: 0.9, ease, delay: delay + i * stagger } },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Simple fade + rise for blocks of content. */
export function FadeUp({ children, className = '', delay = 0, y = 28, as = 'div' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  );
}

export function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
      <span className="text-ember">{index}</span>
      <span className="h-px w-10 bg-ash/40" />
      <span>{children}</span>
    </div>
  );
}
