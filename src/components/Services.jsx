import React from 'react';
import { Code2, Palette, Smartphone, Rocket, Plug, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'code':
      return <Code2 className="w-5 h-5 text-indigo-600" />;
    case 'palette':
      return <Palette className="w-5 h-5 text-purple-600" />;
    case 'smartphone':
      return <Smartphone className="w-5 h-5 text-blue-600" />;
    case 'rocket':
      return <Rocket className="w-5 h-5 text-rose-600" />;
    case 'plug':
      return <Plug className="w-5 h-5 text-emerald-600" />;
    case 'sparkles':
      return <Sparkles className="w-5 h-5 text-amber-600" />;
    default:
      return <Code2 className="w-5 h-5 text-indigo-600" />;
  }
};

export const Services = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wider uppercase">
            <span>Services &amp; Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How I Can Help Your Team
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From single-page web applications to pixel-perfect UI implementations, here is what I bring to the table.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>Learn more &rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
