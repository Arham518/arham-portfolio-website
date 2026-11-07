import { motion, useReducedMotion } from 'motion/react';

export function ShimmeringText({ text, className = '', wave = true, duration = 2.4 }) {
  const reduce = useReducedMotion();
  if (reduce || !wave) {
    return <span className={className}>{text}</span>;
  }
  return (
    <motion.span
      className={`inline-block bg-[linear-gradient(90deg,rgba(237,233,227,0.35)_0%,rgba(237,233,227,1)_45%,rgba(255,91,31,0.95)_55%,rgba(237,233,227,0.35)_100%)] bg-[length:220%_100%] bg-clip-text text-transparent ${className}`}
      animate={{ backgroundPosition: ['120% 0%', '-120% 0%'] }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      {text}
    </motion.span>
  );
}
