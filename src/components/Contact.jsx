import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Copy, FileText, Phone } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SectionLabel, SplitReveal } from './Reveal';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  const links = [
    { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, icon: FaLinkedinIn },
    { label: 'GitHub', href: PERSONAL_INFO.github, icon: FaGithub },
    { label: 'Résumé (PDF)', href: PERSONAL_INFO.resumeUrl, icon: FileText },
    { label: PERSONAL_INFO.phone, href: PERSONAL_INFO.phoneHref, icon: Phone },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pt-32 lg:px-12">
      <motion.div
        className="ember-glow pointer-events-none absolute -bottom-[40%] left-1/2 h-[90vh] w-[110vw] -translate-x-1/2 rounded-full opacity-70"
        animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="04">Contact</SectionLabel>
        <h2 className="mt-8 font-display text-[16vw] font-extrabold uppercase leading-[0.85] tracking-[-0.06em] sm:text-[12vw] lg:text-[10.5vw]">
          <SplitReveal text="Let's build" />
          <br />
          <span className="font-serif font-normal normal-case italic tracking-[-0.03em] text-ember">
            <SplitReveal text="something." delay={0.2} />
          </span>
        </h2>

        <div className="mt-14 grid gap-10 border-t hairline pt-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-md text-[15px] leading-relaxed text-bone/70">
              Hiring for a frontend or React role, remote or in Karachi? Or have a small project that needs a
              careful pair of hands? Email is the quickest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-4 font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:bg-ember sm:text-2xl"
              >
                {PERSONAL_INFO.email}
                <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-bone transition-colors hover:border-bone"
                aria-live="polite"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <ul className="grid gap-px self-end overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-5">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 bg-ink/90 px-5 py-4 text-sm text-bone/85 backdrop-blur transition-colors hover:bg-ink-2 hover:text-bone"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} className="text-ember" aria-hidden="true" />
                    {label}
                  </span>
                  <ArrowUpRight size={15} className="text-bone/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
