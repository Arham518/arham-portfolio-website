import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Laptop } from './DeviceFrame';
import { PROJECTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const reel = PROJECTS.filter((p) => p.device !== 'phone');

/**
 * A laptop that starts tilted back and small, then settles flat and fills the screen as you
 * scroll, playing each live project one after another.
 */
export function Showreel() {
  const section = useRef(null);
  const device = useRef(null);
  const caption = useRef(null);
  const video = useRef(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const current = reel[index];

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: '+=120%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(
        device.current,
        { rotateX: 32, scale: 0.62, y: 60, transformPerspective: 1400 },
        { rotateX: 0, scale: 1, y: 0, ease: 'power2.out' },
      ).fromTo(caption.current, { opacity: 1, y: 0 }, { opacity: 0, y: -60, ease: 'none' }, 0);
    });
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        device.current,
        { rotateX: 28, scale: 0.88, transformPerspective: 900 },
        {
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'center center', scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, [reduce]);

  // play only while on screen
  useEffect(() => {
    const v = video.current;
    if (!v || reduce) return undefined;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.15,
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  // when the source changes, load and continue playing
  useEffect(() => {
    const v = video.current;
    if (!v || index === 0) return;
    v.load();
    v.play().catch(() => {});
  }, [index]);

  return (
    <section ref={section} className="relative flex items-center justify-center overflow-hidden px-4 pb-6 pt-20 sm:px-8 md:min-h-[100svh] md:py-20">
      <div
        ref={caption}
        className="pointer-events-none absolute inset-x-0 top-6 z-0 text-center md:top-[12%] font-display text-[11vw] font-extrabold uppercase leading-none tracking-[-0.05em] text-white/[0.04]"
        aria-hidden="true"
      >
        Live work
      </div>
      <div ref={device} className="relative z-10 w-full max-w-6xl will-change-transform [transform-style:preserve-3d]">
        <Laptop glow={current.accent}>
          <video
            ref={video}
            className="h-full w-full object-cover"
            poster={`/videos/${current.video}-poster.jpg`}
            muted
            playsInline
            preload="none"
            onEnded={() => setIndex((i) => (i + 1) % reel.length)}
            aria-label={`Screen recording of ${current.title}`}
          >
            <source src={`/videos/${current.video}.webm`} type="video/webm" />
            <source src={`/videos/${current.video}.mp4`} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-5">
            <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur sm:text-[11px]">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ember align-middle" />
              Now playing · {current.title}
            </span>
            <span className="hidden font-mono text-[11px] text-bone/60 sm:block">
              {String(index + 1).padStart(2, '0')} / {String(reel.length).padStart(2, '0')}
            </span>
          </div>
        </Laptop>
      </div>
    </section>
  );
}
