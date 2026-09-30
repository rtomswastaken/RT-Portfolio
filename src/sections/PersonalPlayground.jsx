import React, { useState } from 'react';
import { WashiTape, TurtleDoodle, AppleDoodle, CameraDoodle } from '../components/Doodles';

export default function PersonalPlayground() {
  const [turtleClicks, setTurtleClicks] = useState(1);
  const [turtleMessage, setTurtleMessage] = useState("slow & steady wins the race");

  const handleTurtleClick = () => {
    setTurtleClicks(c => c + 1);
    const notes = [
      "turtle power +1!",
      "another one spotted!",
      "they carry their house everywhere.",
      "the ultimate shell script.",
      "patience is an engineering virtue."
    ];
    setTurtleMessage(notes[(turtleClicks) % notes.length]);
  };

  return (
    <section id="personal" className="personal-section">
      <div className="container">
        
        {/* Playful Scrapbook Header */}
        <div className="personal-header-block">
          <span className="personal-hand-title font-hand">things that occupy my brain /</span>
          <h2 className="personal-giant-title font-quirky">RANDOM OBSESSIONS</h2>
        </div>

        {/* Asymmetric Digital Scrapbook Canvas */}
        <div className="scrapbook-canvas-stage">
          
          {/* 01: Turtle Obsession Polaroid (The Mascot) */}
          <div className="scrapbook-polaroid turtle-polaroid" onClick={handleTurtleClick} role="button" tabIndex={0} title="Click the turtle!">
            <WashiTape width={75} height={20} rotation={-4} style={{ position: 'absolute', top: '-10px', left: '24px' }} />
            
            <div className="polaroid-image-frame">
              <img 
                src="/assets/mascot.png" 
                alt="Tortoise Mascot" 
                className="polaroid-mascot-img"
                loading="lazy"
              />
              <div className="polaroid-turtle-bubble font-hand">
                {turtleMessage}
              </div>
            </div>

            <div className="polaroid-caption">
              <div className="polaroid-title-row">
                <span className="polaroid-title font-quirky">TURTLE OBSESSION</span>
                <span className="turtle-click-pill font-hand">
                  spotted: {turtleClicks}
                </span>
              </div>
              <p className="polaroid-note font-body">
                I have a weird fascination with turtles. Calm, unbothered, carrying their home everywhere. The unofficial mascot of my projects.
              </p>
            </div>
          </div>

          {/* 02: Apple Obsession Scrap (Subtle tech aesthetic homage, no copyright infringements) */}
          <div className="scrapbook-card apple-card">
            <WashiTape width={65} height={18} rotation={3} color="rgba(108, 92, 231, 0.25)" style={{ position: 'absolute', top: '-8px', right: '18px' }} />
            
            <div className="apple-scrap-header">
              <AppleDoodle size={24} color="#0B2545" />
              <span className="apple-scrap-tag font-quirky">APPLE ENTHUSIAST</span>
            </div>
            
            <p className="apple-scrap-text font-body">
              Deep appreciation for Jonathan Ive, chamfered aluminum, San Francisco typography, and UNIX under the hood. (The tech company, not the fruit.)
            </p>

            <div className="apple-scrap-stamp font-hand">
              &quot;Designed in Kerala&quot;
            </div>
          </div>

          {/* 03: Camera & Street Photography */}
          <div className="scrapbook-card photo-card">
            <div className="photo-scrap-header">
              <CameraDoodle size={24} color="#0B2545" />
              <span className="photo-scrap-title font-quirky">PHOTOGRAPHY &amp; VIDEO</span>
            </div>
            <p className="photo-scrap-body font-body">
              Hunting for natural morning light, geometric street shadows, and analog film grain when I step away from terminal buffers.
            </p>
          </div>

          {/* 04: Wild Floating Words & Sketch Collage */}
          <div className="scrapbook-floating-words">
            <span className="floating-word word-doodle font-hand">doodling in margins</span>
            <span className="floating-word word-cars font-quirky">CARS &amp; 3D</span>
            <span className="floating-word word-tinker font-hand">tinkering with hardware</span>
            <span className="floating-word word-code font-quirky">CODE EXPERIMENTS</span>
          </div>

          {/* Deliberate "Weird" Space: A tiny turtle walking across a dashed track */}
          <div className="strange-empty-space" aria-hidden="true">
            <div className="walking-turtle-trail">
              <span className="dashed-track" />
              <TurtleDoodle size={24} color="#0B2545" className="trail-turtle" />
              <span className="track-note font-hand">turtle crossing &rarr;</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
