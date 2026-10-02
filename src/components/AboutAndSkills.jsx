import React from 'react';
import {
  MapPin,
  Mail,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Rocket
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS_LIST, TIMELINE_CARDS } from '../data/portfolioData';
import { SkillIcon } from './SkillIcon';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const AboutAndSkills = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Grid matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* ================= COLUMN 1: About Me ================= */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-indigo-600 rounded-full inline-block" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide uppercase">
                About Me
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              I'm a passionate{' '}
              <span className="text-indigo-600">Web Developer</span>{' '}
              based in Karachi, Pakistan.
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {PERSONAL_INFO.bioSummary}
            </p>

            {/* Contact Details List with icons */}
            <div className="space-y-3 pt-2">
              {/* Location */}
              <div className="flex items-center gap-3 text-slate-700 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-50 text-indigo-600 flex items-center justify-center shrink-0 border border-slate-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-800">{PERSONAL_INFO.location}</span>
              </div>

              {/* Email */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 text-sm transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 text-indigo-600 flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-800 group-hover:text-indigo-600 truncate">
                  {PERSONAL_INFO.email}
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 text-sm transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 text-indigo-600 flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-800 group-hover:text-indigo-600 truncate">
                  {PERSONAL_INFO.linkedinHandle}
                </span>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 text-sm transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 text-indigo-600 flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-800 group-hover:text-indigo-600 truncate">
                  {PERSONAL_INFO.githubHandle}
                </span>
              </a>
            </div>
          </div>

          {/* ================= COLUMN 2: Skills Grid ================= */}
          <div id="skills" className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-indigo-600 rounded-full inline-block" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide uppercase">
                Skills
              </span>
            </div>

            {/* 2-Column Skill Badges matching reference */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {SKILLS_LIST.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm cursor-default"
                >
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                    <SkillIcon type={skill.iconType} className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= COLUMN 3: Education, Experience & Opportunity ================= */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Education Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                    Education
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {TIMELINE_CARDS.education.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {TIMELINE_CARDS.education.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 pt-0.5">
                    {TIMELINE_CARDS.education.period} &nbsp;|&nbsp; {TIMELINE_CARDS.education.grade}
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                    Experience
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {TIMELINE_CARDS.experience.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {TIMELINE_CARDS.experience.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 pt-0.5">
                    {TIMELINE_CARDS.experience.period}
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                    Projects
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {TIMELINE_CARDS.projects.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {TIMELINE_CARDS.projects.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Highlight Callout: Open to new opportunities */}
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-indigo-950">
                    {TIMELINE_CARDS.opportunity.title}
                  </h4>
                  <p className="text-xs text-purple-700/80 pt-0.5">
                    {TIMELINE_CARDS.opportunity.subtitle}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
