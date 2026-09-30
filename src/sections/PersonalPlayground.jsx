import React from 'react';
import { Camera, Gamepad2, Car, Sparkles, Heart } from 'lucide-react';

export default function PersonalPlayground() {
  const pursuits = [
    {
      icon: "🎮",
      title: "3D & Game Development",
      desc: "Toying with procedural mechanics, physics, and interactive rendering."
    },
    {
      icon: "🏎️",
      title: "Cars & Machine Craft",
      desc: "Deep appreciation for automotive silhouettes, engineering precision, and curves."
    },
    {
      icon: "📸",
      title: "Photography & Video",
      desc: "Capturing candid street frames, color grading, and ambient visual storytelling."
    },
    {
      icon: "✏️",
      title: "Doodling & UI Iteration",
      desc: "Turning wild napkin sketches into tactile digital vector components."
    }
  ];

  return (
    <section id="personal" className="personal-scrapbook-section">
      <div className="container">
        <div className="scrapbook-board">
          
          <div className="scrapbook-headline-wrap">
            <span className="scrapbook-subhead">SCRAPBOOK</span>
            <h2 className="scrapbook-title font-poster">WHEN I&apos;M NOT CODING...</h2>
          </div>

          <div className="scrapbook-grid">
            
            {/* Mascot Polaroid Card */}
            <div className="turtle-mascot-card">
              <div className="turtle-speech-bubble font-hand">
                “Slow &amp; steady builds good things.”
              </div>

              <div className="turtle-img-wrap">
                <img 
                  src="/assets/mascot.png" 
                  alt="Tortoise Mascot"
                  className="turtle-mascot-image"
                  loading="lazy"
                />
              </div>

              <h3 className="turtle-card-title">TORTOISE ENTHUSIAST</h3>
              <p className="turtle-card-caption font-body">
                Official studio mascot. Reminding me to build with patience, quality, and no hasty shortcuts.
              </p>
            </div>

            {/* Creative Pursuits Mosaic */}
            <div className="creative-mosaic">
              {pursuits.map((item, idx) => (
                <div key={idx} className="mosaic-cell">
                  <span className="mosaic-icon">{item.icon}</span>
                  <h4 className="mosaic-title font-sans">{item.title}</h4>
                  <p className="mosaic-desc font-body">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
