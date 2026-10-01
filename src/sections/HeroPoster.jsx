import React, { useState } from 'react';

export default function HeroPoster() {
  const [mascotOffset, setMascotOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 18;
    const y = (clientY / window.innerHeight - 0.5) * 14;
    setMascotOffset({ x, y });
  };

  return (
    <section id="hero" className="hero-section" onMouseMove={handleMouseMove}>
      <div className="hero-poster-canvas">
        
        {/* Layer 2: Giant Richardsen Thomas Display Typography */}
        <div className="hero-typography-layer">
          <h1 className="hero-colossal-name">
            <span className="name-line-first">RICHARDSEN</span>
            <span className="name-line-second">THOMAS</span>
          </h1>
        </div>

        {/* Layer 3: Massive 3D Mascot positioned DIRECTLY OVER the middle of the text */}
        <div 
          className="hero-mascot-dominant-layer"
          style={{
            transform: `translate3d(calc(-50% + ${mascotOffset.x}px), calc(-50% + ${mascotOffset.y}px), 0)`
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
