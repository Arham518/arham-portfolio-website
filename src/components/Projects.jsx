import React, { useState } from 'react';
import { ExternalLink, Sparkles, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState(null);

  const categories = ['All', 'React.js', 'SaaS & Landing', 'Interactive UI'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'React.js') return project.tags.includes('React.js');
    if (selectedCategory === 'SaaS & Landing') return project.tags.includes('SaaS');
    if (selectedCategory === 'Interactive UI') return project.tags.includes('Interactive UI') || project.tags.includes('Canvas API');
    return true;
  });

  const toggleCaseStudy = (id) => {
    setExpandedCaseStudy(expandedCaseStudy === id ? null : id);
  };

  return (
    <section id="projects" className="py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Things I've Built &amp; Deployed
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Real-world frontend web applications focusing on clean code, responsive layouts, and delightful user experiences.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {filteredProjects.map((project) => {
            const isExpanded = expandedCaseStudy === project.id;

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Mock Browser Top Banner */}
                <div className="px-4 py-3 bg-slate-100/80 border-b border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 truncate max-w-[200px] sm:max-w-xs px-2 py-0.5 rounded bg-white border border-slate-200">
                    {project.liveUrl.replace('https://', '')}
                  </div>
                  {project.badge ? (
                    <span className="text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      {project.badge}
                    </span>
                  ) : (
                    <div className="w-4" />
                  )}
                </div>

                {/* Card Visual Hero Area */}
                <div className={`h-40 sm:h-48 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-end text-white relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500`}>
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative z-10 space-y-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-white/80">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-xs">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 line-clamp-1">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-1.5 pt-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions & Case Study Accordion */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 active:scale-95 shadow-xs transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-medium hover:border-slate-300 hover:bg-slate-50 transition-all"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      </div>

                      <button
                        onClick={() => toggleCaseStudy(project.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors py-1 px-2 rounded-md hover:bg-indigo-50"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Case Study'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Expandable Case Study Deep Dive */}
                    {isExpanded && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs sm:text-sm animate-in fade-in-50 duration-200">
                        <div>
                          <strong className="text-slate-900 block font-semibold mb-0.5">Problem Solved:</strong>
                          <p className="text-slate-600">{project.caseStudy.problem}</p>
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-semibold mb-0.5">Technical Approach:</strong>
                          <p className="text-slate-600">{project.caseStudy.solution}</p>
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-semibold mb-0.5">Key Learning:</strong>
                          <p className="text-slate-600">{project.caseStudy.learnings}</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
