import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Global System Components
import CustomCursor from './components/CustomCursor';
import HalftoneBackground from './components/HalftoneBackground';
import Navbar from './components/Navbar';
import TerminalModal from './components/TerminalModal';

// Editorial Portfolio Sections
import HeroCover from './sections/HeroCover';
import AboutEditorial from './sections/AboutEditorial';
import Capabilities from './sections/Capabilities';
import TypographicSkills from './sections/TypographicSkills';
import AsymmetricProjects from './sections/AsymmetricProjects';
import PinnedShowcase from './sections/PinnedShowcase';
import CodeArchive from './sections/CodeArchive';
import ExperimentsLab from './sections/ExperimentsLab';
import PersonalHuman from './sections/PersonalHuman';
import FooterStatement from './sections/FooterStatement';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Keyboard shortcut: Press `~` or `Ctrl+\`` to toggle terminal
    const handleKeyDown = (e) => {
      if ((e.key === '`' || e.key === '~') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Custom Desktop Magnetic Cursor */}
      <CustomCursor />

      {/* Halftone, Noise Grain & Ambient Blue Glow Lighting System */}
      <HalftoneBackground />

      {/* Fixed Editorial Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive CLI Portfolio Modal (npx rtoms) */}
      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* Living Digital Portfolio Book - Editorial Flow */}
      <main id="main-content">
        {/* 01: Hero Cover Plate */}
        <HeroCover onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 02: About Editorial Statement */}
        <AboutEditorial onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 03: Capabilities & Focus */}
        <Capabilities />

        {/* 04: Kinetic Typographic Skills */}
        <TypographicSkills />

        {/* 05: Asymmetric Project Archive (Reference 01) */}
        <AsymmetricProjects onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 06: Pinned Architectural Showcase */}
        <PinnedShowcase onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 07: Live GitHub Code Archive */}
        <CodeArchive />

        {/* 08: Currently Building & Experiments Lab */}
        <ExperimentsLab onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 09: Personal & Human Pursuits (Mascot & Creative Tech) */}
        <PersonalHuman />

        {/* 10: Final Statement & Verified Channels */}
        <FooterStatement onOpenTerminal={() => setIsTerminalOpen(true)} />
      </main>
    </div>
  );
}
