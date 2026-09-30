import React, { useEffect } from 'react';
import Lenis from 'lenis';

import SimpleNavbar from './components/SimpleNavbar';
import HeroPoster from './sections/HeroPoster';
import AboutIntro from './sections/AboutIntro';
import SelectedWork from './sections/SelectedWork';
import PersonalPlayground from './sections/PersonalPlayground';
import ContactPoster from './sections/ContactPoster';

export default function App() {
  useEffect(() => {
    // Lenis smooth scroll
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
    <div className="portfolio-scrapbook-root">
      <SimpleNavbar />

      <main id="main-content">
        {/* 01: Hero Giant Poster */}
        <HeroPoster />

        {/* 02: Little Human Introduction */}
        <AboutIntro />

        {/* 03: Selected Work (4 Curated Artwork Pieces) */}
        <SelectedWork />

        {/* 04: Personal & Creative Interests (Mascot Collage) */}
        <PersonalPlayground />

        {/* 05: Giant Poster Contact */}
        <ContactPoster />
      </main>
    </div>
  );
}
