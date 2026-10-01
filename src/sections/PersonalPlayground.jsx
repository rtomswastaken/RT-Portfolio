import React from 'react';
import { 
  CameraDoodle, 
  CodeDoodle, 
  CubeDoodle, 
  CarDoodle, 
  AppleDoodle, 
  DoodleStar,
  WashiTape 
} from '../components/Doodles';

export default function PersonalPlayground() {
  const rowOneInterests = [
    {
      id: "design",
      name: "DESIGN",
      tagline: "Tactile layouts & visual systems",
      bgClass: "card-blue-light",
      tilt: "tilt-1",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="16" r="8" />
          <circle cx="20" cy="16" r="8" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      id: "coding",
      name: "CODING",
      tagline: "CLI tools, compilers & systems",
      bgClass: "card-blue-medium",
      tilt: "tilt-2",
      icon: <CodeDoodle size={28} color="#0B2545" />
    },
    {
      id: "photography",
      name: "PHOTOGRAPHY",
      tagline: "Natural morning light & 35mm grain",
      bgClass: "card-blue-soft",
      tilt: "tilt-3",
      icon: <CameraDoodle size={28} color="#0B2545" />
    },
    {
      id: "videography",
      name: "VIDEOGRAPHY",
      tagline: "Kinetic timing & sound texture",
      bgClass: "card-blue-pale",
      tilt: "tilt-4",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="7" width="26" height="18" rx="3" />
          <path d="M13 12L21 16L13 20V12Z" fill="currentColor" opacity="0.8" />
        </svg>
      )
    },
    {
      id: "3d",
      name: "3D & MOTION",
      tagline: "Procedural geometry & shaders",
      bgClass: "card-blue-navy",
      tilt: "tilt-5",
      icon: <CubeDoodle size={28} color="#00B4D8" />
    },
    {
      id: "ai",
      name: "AI & REASONING",
      tagline: "Local autonomous Apple Silicon models",
      bgClass: "card-blue-medium",
      tilt: "tilt-6",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="16" cy="16" r="5" />
          <circle cx="6" cy="8" r="3" />
          <circle cx="26" cy="8" r="3" />
          <circle cx="6" cy="24" r="3" />
          <circle cx="26" cy="24" r="3" />
          <path d="M8.5 9.5L13 13.5M23.5 9.5L19 13.5M8.5 22.5L13 18.5M23.5 22.5L19 18.5" />
        </svg>
      )
    }
  ];

  const rowTwoInterests = [
    {
      id: "doodling",
      name: "DOODLING",
      tagline: "Notebook margins & vector sketches",
      bgClass: "card-blue-soft",
      tilt: "tilt-7",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 28C8 26 14 26 18 20L28 10C29 9 29 7 28 6C27 5 25 5 24 6L14 16C8 20 8 26 4 28Z" />
          <path d="M21 9L25 13" />
        </svg>
      )
    },
    {
      id: "cars",
      name: "CARS & ENGINES",
      tagline: "Aerodynamic silhouettes & mechanical craft",
      bgClass: "card-blue-light",
      tilt: "tilt-8",
      icon: <CarDoodle size={32} color="#0B2545" />
    },
    {
      id: "apple",
      name: "APPLE DESIGN",
      tagline: "Jonathan Ive, chamfers & macOS terminal",
      bgClass: "card-blue-pale",
      tilt: "tilt-9",
      icon: <AppleDoodle size={28} color="#0B2545" />
    },
    {
      id: "creative-tech",
      name: "CREATIVE TECH",
      tagline: "Turning bizarre ideas into working tools",
      bgClass: "card-blue-medium",
      tilt: "tilt-10",
      icon: <DoodleStar size={24} color="#00B4D8" />
    },
    {
      id: "typography",
      name: "TYPOGRAPHY",
      tagline: "Serifs, variable weights & giant display",
      bgClass: "card-blue-navy",
      tilt: "tilt-11",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 24L13 6H19L27 24" />
          <path d="M8 18H24" />
        </svg>
      )
    },
    {
      id: "terminal-craft",
      name: "TERMINAL CRAFT",
      tagline: "Keyboard ergonomics & dotfiles tinkering",
      bgClass: "card-blue-light",
      tilt: "tilt-12",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="6" width="24" height="20" rx="3" />
          <path d="M9 13L14 16L9 19" />
          <path d="M16 20H22" />
        </svg>
      )
    }
  ];

  return (
    <section id="interests" className="interests-wall-section">
      
      {/* Section Header with Generous Negative Space */}
      <div className="container">
        <div className="interests-header-block">
          <span className="interests-hand-tag font-hand">things that occupy my brain /</span>
          <h2 className="interests-giant-title font-quirky">THINGS I LIKE</h2>
          <p className="interests-subtitle font-body">
            An infinite card strip of creative obsessions, off-screen hobbies, and technical curiosities.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Card Marquee — Two Counter-Moving Rows */}
      <div className="marquee-installation-wrap">
        
        {/* Row 1: Flowing Left */}
        <div className="marquee-strip-row strip-flow-left" aria-label="Interests Row 1">
          <div className="marquee-track">
            {[...rowOneInterests, ...rowOneInterests].map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className={`interest-card-item ${item.bgClass} ${item.tilt}`}
              >
                <WashiTape width={46} height={14} rotation={-2} className="interest-tape" />
                <div className="interest-card-icon">{item.icon}</div>
                <div className="interest-card-content">
                  <h3 className="interest-card-name font-quirky">{item.name}</h3>
                  <p className="interest-card-tagline font-body">{item.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Flowing Right */}
        <div className="marquee-strip-row strip-flow-right" aria-label="Interests Row 2">
          <div className="marquee-track">
            {[...rowTwoInterests, ...rowTwoInterests].map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className={`interest-card-item ${item.bgClass} ${item.tilt}`}
              >
                <WashiTape width={46} height={14} rotation={2} className="interest-tape" />
                <div className="interest-card-icon">{item.icon}</div>
                <div className="interest-card-content">
                  <h3 className="interest-card-name font-quirky">{item.name}</h3>
                  <p className="interest-card-tagline font-body">{item.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="container">
        <div className="marquee-footer-hint font-hand">
          &larr; drag or scroll horizontally to explore &rarr;
        </div>
      </div>

    </section>
  );
}
