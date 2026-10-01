import React, { useState } from 'react';

export default function HeroPoster() {
  const [mascotOffset, setMascotOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 16;
    const y = (clientY / window.innerHeight - 0.5) * 14;
    setMascotOffset({ x, y });
  };

  return (
    <section id="hero" className="hero-section" onMouseMove={handleMouseMove}>
      <div className="container hero-layout-container">
        
        {/* Top Typography Zone: Clean, Powerful, Massive Poster Name */}
        <div className="hero-title-cluster">
          <h1 className="hero-giant-title">
            <span className="hero-name-row name-first">RICHARDSEN</span>
            <span className="hero-name-row name-second">THOMAS</span>
          </h1>

          {/* Clean Introduction Statement Directly Underneath the Name */}
          <div className="hero-intro-block">
            <p className="hero-intro-text font-body">
              Student from Kerala, India. I love coding, designing, and making weird things for the internet.
            </p>
          </div>
        </div>

        {/* MASSIVE MASCOT STAGE: Occupies the vast majority of the hero, seamlessly integrated */}
        <div 
          className="hero-massive-mascot-stage"
          style={{
            transform: `translate3d(${mascotOffset.x}px, ${mascotOffset.y}px, 0)`
          }}
        >
          <img 
            src="/assets/avatar.png" 
            alt="Richardsen Thomas 3D Mascot" 
            className="hero-massive-mascot-img"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
}
