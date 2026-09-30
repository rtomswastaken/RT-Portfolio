import React from 'react';
import { HandCircle, WashiTape } from '../components/Doodles';

export default function AboutIntro() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-zine-spread">
          
          <div className="about-zine-main">
            <span className="about-eyebrow">A little introduction /</span>
            
            <h2 className="about-manifesto-quote">
              I’m Richardsen — I like turning random ideas into things that probably shouldn’t work, but somehow do.
            </h2>

            <p className="about-short-story font-body">
              I build at the boundary where software intelligence and tactile visual design collide. 
              Whether it&apos;s crafting autonomous local AI systems for macOS or lightweight terminal platforms, 
              I make things to explore what&apos;s possible.
            </p>

            {/* Circled Keywords */}
            <div className="about-keywords-row">
              <div className="keyword-tag">
                <HandCircle color="#00B4D8" />
                <span>AI</span>
              </div>
              <div className="keyword-tag">
                <HandCircle color="#6C5CE7" />
                <span>CODE</span>
              </div>
              <div className="keyword-tag">
                <HandCircle color="#2EC4B6" />
                <span>DESIGN</span>
              </div>
              <div className="keyword-tag">
                <HandCircle color="#FF6B6B" />
                <span>CREATIVE TECH</span>
              </div>
            </div>
          </div>

          {/* Aside Sticky Note */}
          <div className="about-sticky-note">
            <div className="sticky-tape" />
            <h3 className="sticky-heading">CREATOR NOTES</h3>
            <p className="sticky-body">
              Most of my projects start with &quot;wait... what if I tried this?&quot; and end with a suspicious amount of caffeine and 37 browser tabs.
            </p>
            <div className="sticky-footnote">
              PATHANAMTHITTA, KERALA, INDIA
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
