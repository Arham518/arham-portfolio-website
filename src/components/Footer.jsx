import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="relative border-t hairline px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ash sm:flex-row sm:items-center">
        <span>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}
        </span>
        <a href="#home" className="group inline-flex items-center gap-2 text-bone/80 hover:text-ember">
          Back to top <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
