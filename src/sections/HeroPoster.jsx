import React, { useState } from 'react';
import { HandArrow } from '../components/Doodles';

export default function HeroPoster() {
  const [mascotOffset, setMascotOffset] = useState({ x: 0, y: 0 });
  const [bubbleText, setBubbleText] = useState("yeah, that's me.");

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMascotOffset({ x, y });
  };

  const handleMascotClick = () => {
    const sayings = [
      "welcome to my corner!",
      "probably tinkering right now.",
      "making software with personality.",
      "built with curiosity & caffeine.",
      "pixels, code & weird ideas."
    ];
    setBubbleText(prev => {
      const filtered = sayings.filter(s => s !== prev);
      return filtered[Math.floor(Math.random() * filtered.length)];
    });
  };

  return (
    <section id="hero" className="hero-section" onMouseMove={handleMouseMove}>
      <div className="container hero-poster-canvas">
        
        {/* Handwritten Scrap Notes */}
        <div className="hero-hand-note note-left">
          <span>student from Kerala, India</span>
        </div>

        <div className="hero-hand-note note-right">
          <span>designer / developer / professional tinkerer</span>
        </div>

        {/* Mascot Speech Bubble & Interactive Reaction */}
        <div 
          className="mascot-speech-bubble font-hand"
          style={{
            transform: `translate(calc(-50% + ${mascotOffset.x * 0.4}px), calc(-50% + ${mascotOffset.y * 0.4}px))`
          }}
          onClick={handleMascotClick}
          title="Click to poke!"
        >
          <span>{bubbleText}</span>
          <div className="bubble-pointer" />
        </div>

        {/* Giant Expressive Poster Headline — Dramatically Increased Display Size */}
        <div className="hero-typography-stage">
          <h1 className="hero-giant-title">
            <span className="name-top">RICHARDSEN</span>
            <span className="name-bottom">THOMAS</span>
          </h1>

          {/* HUGE 3D Character Mascot — Primary Visual Centerpiece (50-70% visual area, overlapping typography) */}
          <div 
            className="hero-mascot-wrapper"
            style={{
              transform: `translate(calc(-50% + ${mascotOffset.x}px), calc(-36% + ${mascotOffset.y}px))`
            }}
            onClick={handleMascotClick}
            role="button"
            tabIndex={0}
            aria-label="Richardsen Thomas Mascot"
          >
            <img 
              src="/assets/avatar.png" 
              alt="Richardsen Thomas Mascot" 
              className="hero-mascot-image"
              loading="eager"
            />
          </div>
        </div>

        {/* Hand-drawn Pointer Arrow to Mascot */}
        <div className="hero-arrow-annotation">
          <HandArrow color="#0B2545" className="hero-arrow-svg" />
          <span className="hero-arrow-text font-hand">click to poke</span>
        </div>

        {/* Supporting Editorial Ribbon with Ample Spacing */}
        <div className="hero-footer-ribbon">
          <p className="hero-tagline-text">
            Making weird, playful things for the internet and beyond.
          </p>

          <span className="hero-sub-note font-hand">
            scroll to explore my corner &darr;
          </span>
        </div>

      </div>
    </section>
  );
}
