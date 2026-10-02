import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Code2 } from 'lucide-react';
import { PERSONAL_INFO, NAV_LINKS } from '../data/portfolioData';

export const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Arham Bhatti Homepage"
          >
            <div className="text-indigo-600 font-mono text-xl sm:text-2xl font-bold transition-transform group-hover:scale-110">
              &lt;/&gt;
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              {PERSONAL_INFO.name}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.label.toLowerCase();
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 text-sm lg:text-base font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Button: Download CV */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Arham_Bhatti_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-indigo-600 border border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50/70 hover:shadow-sm active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl transition-all px-4 pt-3 pb-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Arham_Bhatti_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-indigo-600 border border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
