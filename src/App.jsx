import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import SimpleNavbar from './components/SimpleNavbar';
import TerminalModal from './components/TerminalModal';

import HeroPoster from './sections/HeroPoster';
import AboutIntro from './sections/AboutIntro';
import SelectedWork from './sections/SelectedWork';
import PersonalPlayground from './sections/PersonalPlayground';
import ContactPoster from './sections/ContactPoster';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll with Lenis
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Minimal Fixed Navigation */}
      <SimpleNavbar />

      {/* Easter Egg Terminal Modal (Triggerable from footer >_ or console) */}
      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      <main id="main-content">
        {/* 01: Hero Giant Poster with 3D Mascot */}
        <HeroPoster />

        {/* 02: About / Little Human Intro */}
        <AboutIntro />

        {/* 03: Selected Work (4 Curated Artwork Posters) */}
        <SelectedWork />

        {/* 04: Personal / Fun Scrapbook (Tortoise Mascot & Creative Pursuits) */}
        <PersonalPlayground />

        {/* 05: Contact / Giant Final Statement */}
        <ContactPoster onOpenTerminal={() => setIsTerminalOpen(true)} />
      </main>
    </div>
  );
}
