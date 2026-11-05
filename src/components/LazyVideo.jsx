import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Muted looping screen recording. Nothing downloads until the video scrolls near the
 * viewport (preload="none" + play on intersect), and it pauses again off-screen.
 * With reduced motion it stays on the poster frame.
 */
export function LazyVideo({ name, label, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: '150px 0px', threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={`/videos/${name}-poster.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
