import React from 'react';
import { Sparkles, Terminal, Heart } from 'lucide-react';

export default function AboutIntro() {
  return (
    <section id="about" className="about-intro-section">
      <div className="container">
        <div className="about-card-wrapper">
          <div className="about-taped-corner" />

          <div className="about-intro-grid">
            <div className="about-main-text">
              <span className="about-heading-small">ABOUT ME</span>
              
              <h2 className="about-lead-statement font-display">
                I LIKE BUILDING WEIRD &amp; TACTILE THINGS WITH CODE, AI, AND DESIGN.
              </h2>

              <p className="about-short-bio font-body">
                Hey, I&apos;m Richardsen. I build software where intelligence and visual craft meet — from local AI assistants that physically control your screen to lightning-fast terminal tools and playful web experiences.
              </p>

              {/* Playful Topic Pills */}
              <div className="about-pill-cloud">
                <span className="topic-pill pill-code">
                  💻 CODE
                </span>
                <span className="topic-pill pill-ai">
                  🤖 LOCAL AI
                </span>
                <span className="topic-pill pill-design">
                  🎨 UI / UX
                </span>
                <span className="topic-pill pill-weird">
                  ⚡ EXPERIMENTS
                </span>
              </div>
            </div>

            {/* Aside Note Card */}
            <div className="about-aside-card">
              <h3 className="aside-title">CURRENT STATUS</h3>
              <p className="aside-text font-body">
                Usually found tinkering at 2 AM with a suspicious amount of caffeine, 37 browser tabs, and 100 Git commits.
              </p>
              <div className="aside-stamp">
                <Sparkles size={14} />
                <span>PATHANAMTHITTA, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
