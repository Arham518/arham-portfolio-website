import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutAndSkills } from './components/AboutAndSkills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Area */}
      <main>
        {/* Hero Section matching reference image */}
        <Hero />

        {/* 3-Column About, Skills, and Experience section matching reference image */}
        <AboutAndSkills />

        {/* Featured Projects with Live Demos & Case Studies */}
        <Projects />

        {/* Services & Capabilities */}
        <Services />

        {/* Contact & Hire Me Section */}
        <Contact />
      </main>

      {/* Branded Footer */}
      <Footer />
    </div>
  );
}

export default App;
