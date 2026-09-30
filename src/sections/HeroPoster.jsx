import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function HeroPoster() {
  const [characterTilt, setCharacterTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 16;
    const y = (clientY / window.innerHeight - 0.5) * 16;
    setCharacterTilt({ x, y });
  };

  const scrollToWork = () => {
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-poster-section" onMouseMove={handleMouseMove}>
      <div className="container hero-poster-stage">
        
        {/* Playful Stickers on Poster */}
        <div className="sticker-note sticker-note-1 font-hand">
          ✨ yes, I actually make things!
        </div>

        <div className="sticker-note sticker-note-2 font-hand">
          🚀 works on my machine™
        </div>

        {/* Giant Poster Display Typography */}
        <h1 className="hero-giant-headline font-poster">
          <span className="hero-name-line-1">RICHARDSEN</span>
          <span className="hero-name-line-2">THOMAS</span>
        </h1>

        {/* 3D Character Mascot Centerpiece (Overlapping Type) */}
        <div 
          className="hero-character-anchor"
          style={{
            transform: `translate(calc(-50% + ${characterTilt.x}px), calc(-42% + ${characterTilt.y}px))`
          }}
        >
          <img 
            src="/assets/avatar.png" 
            alt="Richardsen Thomas Mascot" 
            className="hero-character-img"
            loading="eager"
          />
        </div>

        {/* Bottom Supporting Ribbon */}
        <div className="hero-bottom-ribbon">
          <div className="hero-roles-banner font-sans">
            <span>DESIGNER</span>
            <span className="dot">×</span>
            <span>DEVELOPER</span>
            <span className="dot">×</span>
            <span>EXPERIMENTER</span>
          </div>

          <p className="hero-quick-tagline font-body">
            Turning random ideas into software that probably shouldn&apos;t work, but somehow does.
          </p>

          <div className="hero-scroll-pill font-sans" onClick={scrollToWork}>
            <span>EXPLORE WORK</span>
            <ArrowDown size={14} />
          </div>
        </div>

      </div>
    </section>
  );
}
