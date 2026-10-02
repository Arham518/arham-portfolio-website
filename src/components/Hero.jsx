import React, { useState } from 'react';
import { ArrowRight, Mail, Code2, Zap, Users } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import heroGraphic from '../assets/hero-graphic-full.jpg';

export const Hero = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-32 right-10 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs sm:text-sm font-medium shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Hi, I'm Arham
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-800 bg-clip-text text-transparent leading-[1.12]">
                Web Developer.
              </h2>
            </div>

            {/* Subtitle / Intro */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {PERSONAL_INFO.heroTagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm sm:text-base hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-sm sm:text-base hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/40 active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* 3 Key Differentiators / Feature Badges */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100">
              {/* Clean Code */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Clean Code</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500">Readable &amp; maintainable</p>
                </div>
              </div>

              {/* Fast Delivery */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Fast Delivery</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500">On time, every time</p>
                </div>
              </div>

              {/* Client Focused */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Client Focused</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500">Your success matters</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Exact Reference Visual Photo & Floating Elements */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative max-w-[560px] w-full rounded-2xl overflow-hidden group select-none"
            >
              {/* Soft backdrop glow matching reference styling */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200/50 via-purple-200/40 to-blue-200/50 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* The Hero Image with the exact portrait, code card, and badge */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl shadow-indigo-100/60 border border-slate-100/80">
                <img
                  src={heroGraphic}
                  alt="Muhammad Arham Bhatti — Web Developer"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
