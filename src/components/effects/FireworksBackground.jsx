import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/** Subtle ember particle bursts — lightweight canvas, sits behind content. */
export function FireworksBackground({ className = '', population = 0.55 }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bursts = [];
    let next = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent?.clientWidth || window.innerWidth;
      h = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      const cx = w * (0.15 + Math.random() * 0.7);
      const cy = h * (0.2 + Math.random() * 0.55);
      const n = Math.floor(14 + Math.random() * 18 * population);
      const parts = [];
      for (let i = 0; i < n; i += 1) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.2;
        const sp = 0.4 + Math.random() * 1.8;
        parts.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          size: 1 + Math.random() * 1.8,
        });
      }
      bursts.push(parts);
      if (bursts.length > 4) bursts.shift();
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      if (t > next) {
        spawn();
        next = t + 1800 + Math.random() * 2200 / Math.max(population, 0.2);
      }
      for (const parts of bursts) {
        for (const p of parts) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.012;
          p.life -= p.decay;
          if (p.life <= 0) continue;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 91, 31, ${p.life * 0.55})`;
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    next = performance.now() + 600;
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [population, reduce]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
