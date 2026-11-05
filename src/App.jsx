import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Showreel } from './components/Showreel';
import { Work } from './components/Work';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export function App() {
  useSmoothScroll();

  return (
    <div className="grain relative min-h-screen bg-ink text-bone">
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Showreel />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
