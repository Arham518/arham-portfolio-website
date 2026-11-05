import { motion } from 'motion/react';

export function GradientText({ text, className = '', neon = false }) {
  return (
    <motion.span
      className={`inline-block bg-[linear-gradient(110deg,#ede9e3_0%,#ff5b1f_45%,#ff8a4c_70%,#ede9e3_100%)] bg-[length:200%_100%] bg-clip-text text-transparent ${neon ? 'drop-shadow-[0_0_18px_rgba(255,91,31,0.35)]' : ''} ${className}`}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
    >
      {text}
    </motion.span>
  );
}
