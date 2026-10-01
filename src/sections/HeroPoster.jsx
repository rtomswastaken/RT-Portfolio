import React, { useState } from 'react';

export default function HeroPoster() {
  const [mascotOffset, setMascotOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 16;
    const y = (clientY / window.innerHeight - 0.5) * 8;
    setMascotOffset({ x, y });
  };

  return (
    <section id="hero" className="hero-section" onMouseMove={handleMouseMove}>
      <div className="hero-poster-canvas">
        
        {/* Layer 3: Giant Richardsen Thomas Display Typography */}
        <div className="hero-typography-layer">
          <h1 className="hero-colossal-name">
            <span className="name-line-first">RICHARDSEN</span>
            <span className="name-line-second">THOMAS</span>
          </h1>
        </div>

        {/* Layer 4: Massive 3D Mascot anchored at the bottom */}
        <div 
          className="hero-mascot-dominant-layer"
          style={{
            transform: `translate3d(calc(-50% + ${mascotOffset.x}px), ${mascotOffset.y}px, 0)`
          }}
        >
          <img 
            src="/assets/avatar.png" 
            alt="Richardsen Thomas Mascot" 
            className="hero-colossal-mascot-img"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
}
