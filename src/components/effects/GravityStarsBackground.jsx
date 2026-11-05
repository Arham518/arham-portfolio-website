import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/** Soft drifting starfield — canvas, dark-theme friendly, no Next.js deps. */
export function GravityStarsBackground({ className = '', count = 70 }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const stars = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8,
      r: 0.4 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: 0.00005 + Math.random() * 0.00025,
      tw: Math.random() * Math.PI * 2,
    }));

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

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduce) {
          s.x += s.vx * s.z;
          s.y += s.vy * s.z;
          if (s.x < 0) s.x = 1;
          if (s.x > 1) s.x = 0;
          if (s.y > 1) s.y = 0;
        }
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.001 + s.tw));
        const alpha = 0.15 + s.z * 0.55 * twinkle;
        ctx.beginPath();
        ctx.fillStyle = `rgba(237, 233, 227, ${alpha})`;
        ctx.arc(s.x * w, s.y * h, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [count, reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
