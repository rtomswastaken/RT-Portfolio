import React from 'react';
import { Gamepad2, Camera, Car, Compass, Sparkles, Heart } from 'lucide-react';
import { profileData } from '../data/profile';

export default function PersonalHuman() {
  const creativePillars = [
    {
      icon: Gamepad2,
      title: "Game Development & 3D",
      category: "INTERACTIVE WORLDS",
      desc: "Exploring gameplay mechanics, tactile physics, spatial rendering, and procedural environments."
    },
    {
      icon: Car,
      title: "Automotive & Mechanical Precision",
      category: "MACHINERY",
      desc: "Fascinated by aerodynamic silhouettes, engine tuning, mechanical engineering, and physical craft."
    },
    {
      icon: Camera,
      title: "Visual Media & Videography",
      category: "FRAMING & LIGHT",
      desc: "Capturing candid street atmosphere, cinematic grading, photography, and motion storytelling."
    },
    {
      icon: Sparkles,
      title: "Sketching, Doodling & Design",
      category: "CREATIVE ITERATION",
      desc: "Turning rough scribbles into SVG vectors, UI layouts in Figma, and tactile digital artwork."
    }
  ];

  return (
    <section id="personal" className="personal-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">09</span>
            <span className="track-slash">/</span>
            <span className="track-title">PERSONAL &amp; CREATIVE PURSUITS</span>
          </div>
          <div className="track-right hide-mobile">
            <span>WHEN I&apos;M NOT IN THE TERMINAL</span>
            <span>HUMAN PERSPECTIVE</span>
          </div>
        </div>

        {/* Editorial Board Layout */}
        <div className="personal-board-grid editorial-board">
          
          {/* Left Column: Mascot & Philosophy */}
          <div className="personal-mascot-col">
            <div className="turtle-mascot-card" data-cursor="hover">
              <div className="mascot-tag font-mono">
                <span>OFFICIAL MASCOT // TORTOISE ENTHUSIAST</span>
                <span>VOL. 01</span>
              </div>

              <div className="mascot-image-holder">
                <img 
                  src="/assets/mascot.png" 
                  alt="Tortoise Enthusiast Mascot"
                  className="turtle-mascot-img"
                  loading="lazy"
                />
                <div className="turtle-glow" />
              </div>

              <div className="mascot-philosophy-quote font-mono">
                <span className="quote-mark">“</span>
                <p>
                  Patient, deliberate, unshakeable momentum. 
                  Just like a tortoise, the best code is built with steady endurance, 
                  not hasty shortcuts.
                </p>
                <span className="quote-author">— RTOMS PHILOSOPHY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Life Pillars */}
          <div className="personal-content-col">
            <div className="personal-heading-block">
              <h2 className="personal-giant-title font-display">
                WHEN I&apos;M NOT<br />
                <span className="text-highlight-cyan">CODING</span> AT 2AM...
              </h2>

              <p className="personal-intro-paragraph font-body">
                When I’m not coding, I’m usually doing something creative — photography, videography, 
                drawing, designing, doodling, or messing around with cars. I believe great software engineering 
                requires the same aesthetic discipline as industrial design and visual arts.
              </p>
            </div>

            {/* Creative Pillars Grid */}
            <div className="creative-pillars-grid">
              {creativePillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="pillar-card font-body" data-cursor="hover">
                    <div className="pillar-header font-mono">
                      <div className="pillar-icon-box">
                        <Icon size={18} color="#6FD7E8" />
                      </div>
                      <span className="pillar-cat">{pillar.category}</span>
                    </div>

                    <h3 className="pillar-title font-sans">{pillar.title}</h3>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Cultural Footnote */}
            <div className="personal-bottom-banner font-mono">
              <div className="banner-item">
                <span className="banner-dot" />
                <span>ROOTED IN: PATHANAMTHITTA, KERALA, INDIA</span>
              </div>
              <div className="banner-item">
                <span className="banner-dot" />
                <span>ENDLESS CURIOSITY</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
