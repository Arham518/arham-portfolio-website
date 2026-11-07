import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import portrait from '../assets/arham-dark.webp';

const ease = [0.22, 1, 0.36, 1];
const INTRO_DELAY = 1.35;

function karachiTime() {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Karachi',
  }).format(new Date());
}

function useKarachiClock() {
  const [time, setTime] = useState(karachiTime);
  useEffect(() => {
    const id = setInterval(() => setTime(karachiTime()), 20_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Letters({ word, delay, className }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-flex overflow-hidden ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: reduce ? 0 : '105%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease, delay: reduce ? 0 : delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const time = useKarachiClock();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const titleY = useTransform(smooth, [0, 1], [0, reduce ? 0 : -140]);
  const photoY = useTransform(smooth, [0, 1], [0, reduce ? 0 : 120]);
  const photoScale = useTransform(smooth, [0, 1], [1, reduce ? 1 : 1.08]);
  const fade = useTransform(smooth, [0, 0.7], [1, 0]);

  // pointer parallax for the glow
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const glowX = useSpring(useTransform(px, (v) => v * 70), { stiffness: 40, damping: 20 });
  const glowY = useSpring(useTransform(py, (v) => v * 50), { stiffness: 40, damping: 20 });
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 sm:px-8 lg:px-12"
    >
      {/* light + grid */}
      <motion.div
        className="ember-glow pointer-events-none absolute -right-[15%] -top-[20%] h-[80vh] w-[80vh] rounded-full"
        style={{ x: glowX, y: glowY }}
      />
      <div className="pointer-events-none absolute -bottom-[30%] -left-[20%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,91,31,0.14),transparent)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 grid grid-cols-4 px-5 sm:px-8 lg:grid-cols-6 lg:px-12" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={`border-l hairline ${i > 3 ? 'hidden lg:block' : ''}`} />
        ))}
      </div>

      {/* top meta */}
      <motion.div
        className="relative z-10 flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO_DELAY + 0.6, duration: 1 }}
      >
        <span>
          Portfolio <span className="text-ember">/</span> 2026
        </span>
        <span className="text-right">
          {PERSONAL_INFO.location}
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          {time} PKT
        </span>
      </motion.div>

      {/* portrait: in normal flow on mobile (above the name), anchored right on desktop */}
      <motion.div
        className="pointer-events-none relative z-0 mx-auto mt-6 h-[42svh] max-h-[420px] w-full max-w-[340px] sm:absolute sm:bottom-0 sm:right-[4%] sm:mt-0 sm:h-[62svh] sm:max-h-none sm:w-auto sm:max-w-none lg:right-[8%] lg:h-[80svh]"
        style={{ y: photoY, scale: photoScale }}
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: INTRO_DELAY + 0.2, duration: 1.4, ease }}
      >
        <div className="absolute left-1/2 top-[28%] h-48 w-48 -translate-x-1/2 rounded-full bg-ember/25 blur-3xl" />
        <img
          src={portrait}
          alt="Muhammad Arham"
          fetchPriority="high"
          className="relative h-full w-full object-cover object-top contrast-[1.05] saturate-[0.9] sm:w-auto sm:object-contain [mask-composite:intersect] [-webkit-mask-composite:source-in] [mask-image:linear-gradient(to_bottom,black_68%,transparent_100%),linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] sm:[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%),linear-gradient(to_right,transparent_0%,black_15%)]"
        />
      </motion.div>

      {/* name */}
      <motion.div className="relative z-20 -mt-10 sm:mt-auto sm:max-w-[58%] lg:max-w-[62%]" style={{ y: titleY, opacity: fade }}>
        <motion.p
          className="mb-4 flex items-center gap-2 text-sm text-bone/80 sm:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_DELAY + 0.5, duration: 0.8 }}
        >
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
          {PERSONAL_INFO.status}
        </motion.p>

        <h1 className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.055em]" aria-label="Muhammad Arham">
          <Letters word="Muhammad" delay={INTRO_DELAY} className="block text-[14.6vw] sm:text-[9.5vw] lg:text-[8.8vw]" />
          <span className="flex items-end gap-4 sm:gap-8">
            <Letters word="Arham" delay={INTRO_DELAY + 0.25} className="text-[14.6vw] text-outline sm:text-[9.5vw] lg:text-[8.8vw]" />
            <motion.span
              className="mb-[1.2vw] hidden font-serif text-[1.9vw] normal-case italic leading-tight tracking-normal text-bone/80 md:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: INTRO_DELAY + 0.8, duration: 1, ease }}
            >
              frontend &amp; React
              <br />
              developer<span className="text-ember">.</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* bottom row */}
      <motion.div
        className="relative z-20 mt-8 grid gap-6 border-t bg-ink/60 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-0 hairline pt-6 md:grid-cols-[1fr_auto] md:items-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: INTRO_DELAY + 0.7, duration: 0.9, ease }}
      >
        <p className="max-w-md text-[15px] leading-relaxed text-bone/70">
          <span className="font-serif text-lg italic text-bone md:hidden">Frontend &amp; React developer. </span>
          {PERSONAL_INFO.intro}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            See the work
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:border-bone"
          >
            Say hello
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
