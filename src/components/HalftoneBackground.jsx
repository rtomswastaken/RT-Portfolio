import React, { useEffect, useState } from 'react';

export default function HalftoneBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Background Halftone & Grain Overlays */}
      <div className="halftone-overlay" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Atmospheric Organic Blue Glow Orbs (Reference 02) */}
      <div className="ambient-glow-system" aria-hidden="true">
        <div 
          className="glow-orb glow-orb-1"
          style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
        />
        <div 
          className="glow-orb glow-orb-2"
          style={{ transform: `translate3d(0, ${-scrollY * 0.05}px, 0)` }}
        />
        <div 
          className="glow-orb glow-orb-violet"
          style={{ transform: `translate3d(0, ${scrollY * 0.04}px, 0)` }}
        />
      </div>

      {/* Floating Oversized Background Graphic Words */}
      <div 
        className="oversized-bg-word" 
        style={{ 
          top: '8vh', 
          right: '-5vw', 
          transform: `translate3d(${scrollY * -0.12}px, ${scrollY * 0.06}px, 0)` 
        }}
        aria-hidden="true"
      >
        CREATE
      </div>

      <div 
        className="oversized-bg-word" 
        style={{ 
          top: '140vh', 
          left: '-8vw', 
          transform: `translate3d(${scrollY * 0.1}px, ${-scrollY * 0.03}px, 0)` 
        }}
        aria-hidden="true"
      >
        SYSTEMS
      </div>

      <div 
        className="oversized-bg-word" 
        style={{ 
          top: '280vh', 
          right: '-6vw', 
          transform: `translate3d(${scrollY * -0.09}px, ${scrollY * 0.04}px, 0)` 
        }}
        aria-hidden="true"
      >
        EXPLORE
      </div>

      <div 
        className="oversized-bg-word" 
        style={{ 
          top: '420vh', 
          left: '-4vw', 
          transform: `translate3d(${scrollY * 0.08}px, ${-scrollY * 0.02}px, 0)` 
        }}
        aria-hidden="true"
      >
        EXPERIMENT
      </div>
    </>
  );
}
