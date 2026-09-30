import React from 'react';
import { Camera, Gamepad2, Compass, Pencil } from 'lucide-react';
import { WashiTape, DoodleStar } from '../components/Doodles';

export default function PersonalPlayground() {
  const scraps = [
    {
      label: "3D & GAMES",
      desc: "Procedural geometry, mechanics, and spatial physics.",
      tilt: "scrap-1"
    },
    {
      label: "CARS & ENGINES",
      desc: "Aerodynamic silhouettes, mechanical craft, and curvature.",
      tilt: "scrap-2"
    },
    {
      label: "PHOTOGRAPHY",
      desc: "Candid street frames, natural lighting, and color grading.",
      tilt: "scrap-3"
    },
    {
      label: "DOODLING & UI",
      desc: "From wild notebook sketches to vector UI components.",
      tilt: "scrap-4"
    }
  ];

  return (
    <section id="personal" className="personal-section">
      <div className="container">
        
        {/* Header */}
        <div className="personal-header-block">
          <span className="personal-hand-title">When I&apos;m not in code /</span>
          <h2 className="personal-giant-title">OFF-SCREEN INTERESTS</h2>
        </div>

        {/* Freeform Scrapbook Collage */}
        <div className="scrapbook-collage-stage">
          
          {/* Tortoise Mascot Polaroid Card */}
          <div className="tortoise-mascot-card">
            <WashiTape width={70} height={20} rotation={-3} style={{ position: 'absolute', top: '-10px', left: '30px' }} />

            <div className="mascot-bubble font-hand">
              “Slow &amp; steady builds good things.”
            </div>

            <div className="tortoise-img-wrap">
              <img 
                src="/assets/mascot.png" 
                alt="Tortoise Mascot" 
                className="tortoise-img"
                loading="lazy"
              />
            </div>

            <h3 className="tortoise-caption-title font-quirky">TORTOISE ENTHUSIAST</h3>
            <p className="tortoise-caption-text font-body">
              Official studio mascot. A gentle reminder that quality code is built with patience and care.
            </p>
          </div>

          {/* Floating Words & Interest Fragments */}
          <div className="floating-interests-cloud">
            {scraps.map((s) => (
              <div key={s.label} className={`interest-scrap-item ${s.tilt}`}>
                <span className="interest-tag-name">{s.label}</span>
                <span className="interest-tag-desc font-body">{s.desc}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
