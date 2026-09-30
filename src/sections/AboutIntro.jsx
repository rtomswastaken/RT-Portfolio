import React from 'react';
import { HandCircle, WashiTape, TurtleDoodle } from '../components/Doodles';

export default function AboutIntro() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-zine-spread">
          
          <div className="about-zine-main">
            <span className="about-eyebrow font-hand">who is this weird person? /</span>
            
            <h2 className="about-manifesto-quote font-quirky">
              I’m Richardsen. A student from Kerala who likes coding, designing, and making unnecessarily complicated things for fun.
            </h2>

            <p className="about-short-story font-body">
              I like building at the weird intersection where software architecture, tactile visual identity, and playful aesthetics meet. 
              Most of my best ideas come from wondering &quot;wait... can I actually make a computer do that?&quot; and then refusing to stop until it works.
            </p>

            {/* Scattered Visual Keywords with Hand-drawn circles */}
            <div className="scattered-keywords-cloud">
              <div className="keyword-item tilt-k1">
                <HandCircle color="#00B4D8" />
                <span>CODE</span>
              </div>
              <div className="keyword-item tilt-k2">
                <HandCircle color="#6C5CE7" />
                <span>DESIGN</span>
              </div>
              <div className="keyword-item tilt-k3">
                <HandCircle color="#2EC4B6" />
                <span>AI</span>
              </div>
              <div className="keyword-item tilt-k4">
                <HandCircle color="#FF6B6B" />
                <span>DOODLE</span>
              </div>
              <div className="keyword-item tilt-k5">
                <HandCircle color="#0B2545" />
                <span>PHOTO</span>
              </div>
              <div className="keyword-item tilt-k6">
                <HandCircle color="#E67E22" />
                <span>VIDEO</span>
              </div>
              <div className="keyword-item tilt-k7">
                <HandCircle color="#27AE60" />
                <span className="turtle-highlight">
                  <TurtleDoodle size={18} color="#27AE60" className="inline-turtle" />
                  TURTLES
                </span>
              </div>
            </div>
          </div>

          {/* Hand-taped Creator Card */}
          <div className="about-sticky-note">
            <WashiTape width={70} height={20} rotation={-2} style={{ position: 'absolute', top: '-10px', left: '20px' }} />
            <h3 className="sticky-heading font-quirky">LITTLE FACTS</h3>
            <ul className="sticky-fact-list font-body">
              <li>Based in Pathanamthitta, Kerala, India</li>
              <li>Terminal nerd, macOS tinkerer</li>
              <li>Firm believer that software should have personality</li>
              <li>Runs entirely on curiosity and hot tea</li>
            </ul>
            <div className="sticky-footnote font-hand">
              *no corporate vibes beyond this point
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
