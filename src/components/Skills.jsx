import { motion, useReducedMotion } from 'motion/react';
import {
  SiAxios, SiBootstrap, SiCplusplus, SiCss, SiExpress, SiFirebase, SiFramer, SiGit, SiHtml5, SiJavascript,
  SiMongodb, SiMui, SiNetlify, SiNodedotjs, SiNpm, SiOpencv, SiPython, SiReact, SiReactrouter, SiRedux,
  SiTailwindcss, SiTensorflow, SiVercel, SiVite, SiFlask,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { Database, Layers, MonitorSmartphone } from 'lucide-react';
import { FadeUp, SectionLabel, SplitReveal } from './Reveal';
import { SKILL_GROUPS } from '../data/portfolioData';

const ICONS = {
  'React.js': SiReact,
  'JavaScript (ES6+)': SiJavascript,
  'React Router': SiReactrouter,
  Redux: SiRedux,
  'Context API': Layers,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Responsive Design': MonitorSmartphone,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  'Material UI': SiMui,
  'Framer Motion': SiFramer,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Flask: SiFlask,
  'REST APIs (Axios)': SiAxios,
  SQL: Database,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Python: SiPython,
  OpenCV: SiOpencv,
  TensorFlow: SiTensorflow,
  'Git & GitHub': SiGit,
  npm: SiNpm,
  Vite: SiVite,
  'VS Code': VscVscode,
  Netlify: SiNetlify,
  Vercel: SiVercel,
  'C++': SiCplusplus,
};

const ease = [0.22, 1, 0.36, 1];

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="03">Toolkit</SectionLabel>
            <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              <SplitReveal text="What I" />{' '}
              <span className="font-serif font-normal italic text-ember">
                <SplitReveal text="work with" delay={0.15} />
              </span>
            </h2>
            <FadeUp className="mt-6 max-w-xs text-[15px] leading-relaxed text-bone/60">
              React and JavaScript every day. The backend and ML pieces come from university projects and my final
              year work.
            </FadeUp>
          </div>

          <div className="lg:col-span-8">
            {SKILL_GROUPS.map((group, gi) => (
              <div key={group.label} className="grid gap-4 border-t hairline py-6 sm:grid-cols-[160px_1fr]">
                <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">{group.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item, ii) => {
                    const Icon = ICONS[item];
                    return (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, filter: reduce ? 'blur(0px)' : 'blur(10px)', y: reduce ? 0 : 12 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease, delay: gi * 0.04 + ii * 0.03 }}
                        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-bone/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/60 hover:bg-ember/10"
                      >
                        {Icon && <Icon size={15} className="text-bone/60 transition-colors group-hover:text-ember" aria-hidden="true" />}
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
