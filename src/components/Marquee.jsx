import { MARQUEE_SKILLS } from '../data/portfolioData';

export function Marquee() {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="relative overflow-hidden border-y hairline py-5" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((skill, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tight text-bone/80 sm:text-3xl">
            {skill}
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
