import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, BookOpen, GraduationCap, School } from 'lucide-react';
import { FadeUp, SectionLabel } from './Reveal';
import { FireworksBackground } from './effects/FireworksBackground';
import { GradientText } from './texts/GradientText';
import { JOURNEY, PERSONAL_INFO, SERVICES } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  'I care about the person on the other side of the screen: the shop owner updating stock at midnight, the labourer whose fingerprint keeps failing at the bank counter.';

const journeyIcons = [School, BookOpen, GraduationCap, Briefcase, Award];

export function About() {
  const statement = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: statement.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );
    }, statement);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <FireworksBackground className="pointer-events-none absolute inset-0 opacity-35" population={0.6} color="white" />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="02">About</SectionLabel>

        <p
          ref={statement}
          className="mt-10 max-w-5xl font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[4.1rem]"
        >
          {STATEMENT.split(' ').map((w, i) => (
            <span key={i} data-word className="inline">
              {w}{' '}
            </span>
          ))}
        </p>

        <FadeUp className="mt-8">
          <GradientText text="Built with care, shipped with polish." className="font-serif text-2xl italic sm:text-3xl" neon />
        </FadeUp>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="space-y-5 text-[15px] leading-relaxed text-bone/70 lg:col-span-5">
            {PERSONAL_INFO.about.map((para, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <p>{para}</p>
              </FadeUp>
            ))}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="border-t hairline">
              {JOURNEY.map((item, i) => {
                const Icon = journeyIcons[i] ?? Award;
                return (
                  <FadeUp as="li" key={`${item.title}-${item.period}`} delay={i * 0.06} className="group grid grid-cols-[auto_1fr] gap-5 border-b hairline py-6">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-ember transition-colors group-hover:bg-ember group-hover:text-ink">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">{item.period}</p>
                      <h3 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">{item.title}</h3>
                      <p className="text-sm text-bone/80">{item.place}</p>
                      <p className="mt-2 text-sm text-bone/55">{item.note}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">Where I can help</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.06} className="group relative bg-ink p-7 transition-colors hover:bg-ink-2">
                <span className="font-mono text-xs text-ember">0{i + 1}</span>
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/60">{s.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 group-hover:scale-x-100" />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
