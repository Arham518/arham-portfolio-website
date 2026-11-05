import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Device } from './DeviceFrame';
import { LazyVideo } from './LazyVideo';
import { FadeUp, SectionLabel, SplitReveal } from './Reveal';
import { MORE_WORK, PROJECTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

function ProjectRow({ project, flip }) {
  const row = useRef(null);
  const stage = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage.current,
        { rotateX: 22, rotateY: flip ? 18 : -18, y: 110, scale: 0.86, z: -80, transformPerspective: 1800 },
        {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          scale: 1,
          z: 0,
          ease: 'none',
          scrollTrigger: { trigger: row.current, start: 'top bottom', end: 'center 55%', scrub: 0.75 },
        },
      );
      gsap.to(row.current.querySelector('[data-index]'), {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: row.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, row);
    return () => ctx.revert();
  }, [flip, reduce]);

  return (
    <article
      ref={row}
      id={`project-${project.id}`}
      className="relative grid items-center gap-10 border-t hairline py-16 sm:py-24 lg:grid-cols-12 lg:gap-14"
    >
      <span
        data-index
        className="pointer-events-none absolute -top-2 font-display text-[28vw] font-extrabold leading-none tracking-[-0.06em] text-outline opacity-40 sm:text-[18vw] lg:text-[12vw]"
        style={{ [flip ? 'left' : 'right']: 0 }}
        aria-hidden="true"
      >
        {project.index}
      </span>

      <div className={`relative lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open live"
          className="block [transform-style:preserve-3d]"
          aria-label={`Open ${project.title} live site`}
        >
          <div ref={stage} className="will-change-transform">
            <Device type={project.device} url={project.live} glow={project.accent}>
              <LazyVideo name={project.video} label={`Screen recording of ${project.title}`} />
            </Device>
          </div>
        </a>
      </div>

      <div className={`relative lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <FadeUp>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            <span style={{ color: project.accent }}>{project.index}</span>
            <span className="h-px w-8 bg-white/20" />
            {project.kind}
          </div>
        </FadeUp>
        <SplitReveal
          as="h3"
          text={project.title}
          className="mt-4 block font-display text-4xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]"
        />
        <FadeUp delay={0.1} className="mt-7 space-y-5 text-[15px] leading-relaxed">
          <div>
            <p className="mb-1 font-serif text-lg italic text-bone">The problem</p>
            <p className="text-bone/65">{project.problem}</p>
          </div>
          <div>
            <p className="mb-1 font-serif text-lg italic text-bone">What I built</p>
            <p className="text-bone/65">{project.solution}</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tech used">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-bone/75">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ember"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live site
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-bone transition-colors hover:border-bone"
              >
                <FaGithub size={16} /> Code
              </a>
            )}
          </div>
        </FadeUp>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="relative px-5 pb-10 pt-24 sm:px-8 sm:pt-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:mb-20 md:flex-row md:items-end">
          <div>
            <SectionLabel index="01">Selected work</SectionLabel>
            <h2 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.045em] sm:text-7xl">
              <SplitReveal text="Things I've built," />{' '}
              <span className="font-serif font-normal italic text-ember">
                <SplitReveal text="running live." delay={0.2} />
              </span>
            </h2>
          </div>
          <FadeUp className="max-w-sm text-[15px] leading-relaxed text-bone/60">
            No mockups here. Each screen below is a recording of the real site, so what you see is what you get
            when you click through.
          </FadeUp>
        </div>

        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.id} project={project} flip={i % 2 === 1} />
        ))}

        {MORE_WORK.length > 0 && (
          <div className="border-t hairline py-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">Also on GitHub</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {MORE_WORK.map((w) => (
                <li key={w.title}>
                  <a
                    href={w.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
                  >
                    <span>
                      <span className="font-display text-xl font-semibold tracking-tight">{w.title}</span>
                      <span className="mt-1 block text-sm text-bone/60">{w.note}</span>
                    </span>
                    <FaGithub size={20} className="mt-1 shrink-0 text-bone/60 transition-colors group-hover:text-ember" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
