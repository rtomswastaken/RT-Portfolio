import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { DoodleStar, HandUnderline } from '../components/Doodles';

export default function HeroPoster() {
  const [mascotOffset, setMascotOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 18;
    const y = (clientY / window.innerHeight - 0.5) * 18;
    setMascotOffset({ x, y });
  };

  const scrollToWork = () => {
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section" onMouseMove={handleMouseMove}>
      <div className="container hero-poster-canvas">
        
        {/* Playful Handwritten Sticky Notes (NO emojis) */}
        <div className="hero-hand-note note-left">
          <span>yes, I actually make things!</span>
        </div>

        <div className="hero-hand-note note-right">
          <span>works on my machine*</span>
        </div>

        {/* Giant Expressive Poster Headline */}
        <h1 className="hero-giant-title">
          <span className="name-top">RICHARDSEN</span>
          <span className="name-bottom">THOMAS</span>
        </h1>

        {/* 3D Character Mascot (Interacting & Overlapping Type) */}
        <div 
          className="hero-mascot-wrapper"
          style={{
            transform: `translate(calc(-50% + ${mascotOffset.x}px), calc(-44% + ${mascotOffset.y}px))`
          }}
        >
          <img 
            src="/assets/avatar.png" 
            alt="Richardsen Thomas Mascot" 
            className="hero-mascot-image"
            loading="eager"
          />
        </div>

        {/* Supporting Editorial Ribbon */}
        <div className="hero-footer-ribbon">
          <p className="hero-tagline-text">
            Designer, developer &amp; dreamer.
          </p>

          <span className="hero-sub-note">
            RTOMS · CODE × AI × DESIGN
          </span>

          <button 
            type="button"
            className="hero-scroll-btn" 
            onClick={scrollToWork}
            aria-label="Scroll to selected work"
          >
            <span>SELECTED WORK</span>
            <ArrowDown size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
