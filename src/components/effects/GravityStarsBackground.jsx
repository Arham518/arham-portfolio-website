import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Vite/React port of animate-ui's GravityStarsBackground (no Next.js / shadcn deps).
 * - Stars drift at movementSpeed, slowly lose speed, wrap around the edges and glow.
 * - Near the pointer (mouseInfluence) they are attracted or repelled (mouseGravity) and glow brighter.
 *   The pointer's last position keeps acting after it leaves (before the first move: top-left corner).
 * - Stars use currentColor, so they follow the text colour / theme.
 * - Canvas is sized to its container at device pixel ratio; a resize scatters the stars again.
 * - Pauses off screen and while the tab is hidden. Under reduced motion the stars hold still.
 */
export function GravityStarsBackground({
  className = '',
  starsCount = 75,
  starsSize = 2,
  starsOpacity = 0.75,
  glowIntensity = 15,
  glowAnimation = 'ease',
  movementSpeed = 0.3,
  mouseInfluence = 100,
  mouseGravity = 'attract',
  gravityStrength = 75,
  starsInteraction = false,
  starsInteractionType = 'bounce',
  style,
  ...props
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let raf = 0;
    let w = 0;
    let h = 0;
    let visible = true;
    let onScreen = true;
    let color = '#ede9e3';
    const mouse = { x: 0, y: 0 };
    let stars = [];

    const makeStar = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = movementSpeed * (0.5 + Math.random() * 0.5);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * starsSize + 1,
        opacity: starsOpacity,
        base: starsOpacity,
        glow: 0,
        mass: Math.random() * 0.5 + 0.5,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth || window.innerWidth;
      h = wrap.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(wrap).color || color;
      stars = Array.from({ length: starsCount }, makeStar);
    };

    const step = () => {
      for (const s of stars) {
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.hypot(dx, dy);
        let targetGlow = 0;
        if (dist < mouseInfluence && dist > 0) {
          const force = (mouseInfluence - dist) / mouseInfluence;
          const dir = mouseGravity === 'attract' ? 1 : -1;
          const g = (gravityStrength / 1000) * force * force * dir;
          s.vx += (dx / dist) * g;
          s.vy += (dy / dist) * g;
          s.opacity = Math.min(1, s.base + force * 0.4);
          targetGlow = force * glowIntensity;
        } else {
          s.opacity = Math.max(s.base * 0.3, s.opacity - 0.02);
        }
        if (glowAnimation === 'instant') s.glow = targetGlow;
        else if (glowAnimation === 'spring') s.glow += (targetGlow - s.glow) * 0.25;
        else s.glow += (targetGlow - s.glow) * 0.1;

        if (starsInteraction) {
          for (const o of stars) {
            if (o === s) continue;
            const ox = o.x - s.x;
            const oy = o.y - s.y;
            const od = Math.hypot(ox, oy);
            const min = s.size + o.size;
            if (od > 0 && od < min) {
              if (starsInteractionType === 'bounce') {
                const nx = ox / od;
                const ny = oy / od;
                const rel = (s.vx - o.vx) * nx + (s.vy - o.vy) * ny;
                if (rel > 0) {
                  s.vx -= rel * nx;
                  s.vy -= rel * ny;
                  o.vx += rel * nx;
                  o.vy += rel * ny;
                }
              } else {
                const m = s.mass + o.mass;
                s.vx = (s.vx * s.mass + o.vx * o.mass) / m;
                s.vy = (s.vy * s.mass + o.vy * o.mass) / m;
              }
            }
          }
        }

        s.x += s.vx;
        s.y += s.vy;
        // slow down little by little, but never fully stop
        s.vx *= 0.99;
        s.vy *= 0.99;
        const sp = Math.hypot(s.vx, s.vy);
        const minSp = movementSpeed * 0.25;
        if (sp < minSp && sp > 0) {
          s.vx = (s.vx / sp) * minSp;
          s.vy = (s.vy / sp) * minSp;
        }
        if (s.x < 0) s.x = w;
        else if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        else if (s.y > h) s.y = 0;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const s of stars) {
        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.shadowColor = color;
        ctx.shadowBlur = s.glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const loop = () => {
      raf = 0;
      if (!visible || !onScreen) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce) {
        draw();
        return;
      }
      if (!raf && visible && onScreen) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onVis = () => {
      visible = document.visibilityState !== 'hidden';
      start();
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      start();
    });
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });

    resize();
    io.observe(wrap);
    ro.observe(wrap);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [
    reduce, starsCount, starsSize, starsOpacity, glowIntensity, glowAnimation, movementSpeed,
    mouseInfluence, mouseGravity, gravityStrength, starsInteraction, starsInteractionType,
  ]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ color: '#ede9e3', ...style }}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
