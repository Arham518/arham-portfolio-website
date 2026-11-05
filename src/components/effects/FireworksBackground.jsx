import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Vite/React port of animate-ui's FireworksBackground (no Next.js / shadcn deps).
 * Rockets rise from the bottom and burst into sparks with gravity + fade.
 * - population: launch density (1 = animate-ui default)
 * - color: string or array of strings; defaults to white sparks (dark theme)
 * - Pauses off screen / hidden tab; renders nothing under reduced motion.
 */
export function FireworksBackground({
  className = '',
  population = 1,
  color = 'white',
  fireworkSpeed = { min: 4, max: 8 },
  fireworkSize = { min: 2, max: 5 },
  particleSpeed = { min: 2, max: 7 },
  particleSize = { min: 1, max: 3 },
  style,
  ...props
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const colorKey = Array.isArray(color) ? color.join('|') : color;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (reduce || !wrap || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const rand = (a, b) => a + Math.random() * (b - a);
    const palette = colorKey.split('|');
    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    let raf = 0;
    let w = 0;
    let h = 0;
    let visible = true;
    let onScreen = true;
    let last = 0;
    let nextLaunch = 0;
    const rockets = [];
    const sparks = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth || window.innerWidth;
      h = wrap.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launch = () => {
      const x = rand(w * 0.1, w * 0.9);
      rockets.push({
        x,
        y: h,
        tx: x + rand(-w * 0.1, w * 0.1),
        ty: rand(h * 0.1, h * 0.45),
        speed: rand(fireworkSpeed.min, fireworkSpeed.max),
        size: rand(fireworkSize.min, fireworkSize.max),
        color: pick(),
        trail: [],
      });
    };

    const explode = (r) => {
      const n = Math.floor(rand(30, 60));
      for (let i = 0; i < n; i += 1) {
        const a = (Math.PI * 2 * i) / n;
        const sp = rand(particleSpeed.min, particleSpeed.max);
        sparks.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          size: rand(particleSize.min, particleSize.max),
          life: 1,
          decay: rand(0.012, 0.025),
          color: r.color,
        });
      }
    };

    const frame = (t) => {
      raf = 0;
      if (!visible || !onScreen) return;
      const dt = last ? Math.min(3, (t - last) / 16.67) : 1;
      last = t;
      if (t > nextLaunch) {
        launch();
        nextLaunch = t + rand(500, 1500) / Math.max(population, 0.05);
      }
      ctx.clearRect(0, 0, w, h);

      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        const dx = r.tx - r.x;
        const dy = r.ty - r.y;
        const d = Math.hypot(dx, dy);
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();
        if (d < r.speed * dt) {
          explode(r);
          rockets.splice(i, 1);
          continue;
        }
        r.x += (dx / d) * r.speed * dt;
        r.y += (dy / d) * r.speed * dt;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.size * 0.6;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        r.trail.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.lineTo(r.x, r.y);
        ctx.stroke();
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const p = sparks[i];
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + 0.06 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && visible && onScreen) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const onVis = () => {
      visible = document.visibilityState !== 'hidden';
      start();
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      start();
    });
    const ro = new ResizeObserver(resize);

    resize();
    io.observe(wrap);
    ro.observe(wrap);
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, population, colorKey]);

  if (reduce) return null;
  return (
    <div ref={wrapRef} className={className} style={style} aria-hidden="true" {...props}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
