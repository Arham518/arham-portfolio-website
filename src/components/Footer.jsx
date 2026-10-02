import React from 'react';
import { ArrowUp, Mail, Download } from 'lucide-react';
import { PERSONAL_INFO, NAV_LINKS, PROJECTS_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="inline-flex items-center gap-2 group">
              <span className="text-indigo-400 font-mono text-2xl font-bold">&lt;/&gt;</span>
              <span className="text-2xl font-bold text-white tracking-tight">{PERSONAL_INFO.name}</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Computer Science Graduate &amp; React.js Frontend Developer. Focused on building clean, high-performance web applications with modern architectures.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-indigo-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Projects */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Projects</h4>
            <ul className="space-y-2 text-sm">
              {PROJECTS_DATA.map((proj) => (
                <li key={proj.id}>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center justify-between"
                  >
                    <span>{proj.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Live &rarr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Resume */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Get in Touch</h4>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Send Email"
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
              </a>
            </div>

            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Arham_Bhatti_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} {PERSONAL_INFO.fullName}. Crafted with precision &amp; care.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
