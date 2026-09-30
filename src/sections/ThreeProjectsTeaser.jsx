import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { WashiTape, TurtleDoodle } from '../components/Doodles';

export default function ThreeProjectsTeaser() {
  const teasers = [
    {
      id: "zoe",
      num: "01",
      name: "ZOE",
      humanLabel: "my local AI experiment",
      desc: "An autonomous local AI assistant for macOS that lives in the MacBook notch and runs zero cloud APIs.",
      githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1",
      visualType: "notch",
      bgClass: "teaser-bg-blue",
      tiltClass: "teaser-tilt-left"
    },
    {
      id: "chattui",
      num: "02",
      name: "CHATTUI",
      humanLabel: "terminal chat thing",
      desc: "A Discord-like chat platform built for hackers in the terminal using Go, Bubble Tea, and Tailscale.",
      githubUrl: "https://github.com/rtomswastaken/chattui",
      visualType: "terminal",
      bgClass: "teaser-bg-cream",
      tiltClass: "teaser-tilt-right"
    },
    {
      id: "oriah",
      num: "03",
      name: "ORIAH",
      humanLabel: "an IDE I decided to build",
      desc: "A 4-quadrant agentic AI terminal code editor with interactive progress reports and syntax highlighting.",
      githubUrl: "https://github.com/rtomswastaken/Oriah-IDE",
      visualType: "quadrant",
      bgClass: "teaser-bg-lavender",
      tiltClass: "teaser-tilt-straight"
    }
  ];

  return (
    <section id="work" className="work-teaser-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="work-teaser-header">
          <span className="teaser-eyebrow font-hand">a tiny preview /</span>
          <h2 className="teaser-main-title font-quirky">THINGS I&apos;VE BUILT</h2>
          <p className="teaser-subtitle font-body">
            Just three little samples. I build lots of things—mostly terminal tools, local AI, and experiments.
          </p>
        </div>

        {/* 3 Scrapbook Project Pieces */}
        <div className="teasers-scrapbook-stream">
          {teasers.map((proj) => (
            <article key={proj.id} className={`teaser-piece ${proj.tiltClass}`}>
              <WashiTape width={70} height={20} rotation={-3} style={{ position: 'absolute', top: '-10px', left: '20px', zIndex: 3 }} />
              
              <div className={`teaser-visual-box ${proj.bgClass}`}>
                {proj.visualType === 'notch' && (
                  <div className="mini-notch-graphic">
                    <div className="notch-pill" />
                    <span className="notch-text font-quirky">LOCAL AI // NOTCH</span>
                  </div>
                )}

                {proj.visualType === 'terminal' && (
                  <div className="mini-term-graphic font-body">
                    <div className="mini-term-bar">
                      <span className="mini-dot" /><span className="mini-dot" /><span className="mini-dot" />
                    </div>
                    <div className="mini-term-code">&gt; chattui connected</div>
                  </div>
                )}

                {proj.visualType === 'quadrant' && (
                  <div className="mini-quadrant-graphic">
                    <div className="quad-cell quad-1" />
                    <div className="quad-cell quad-2" />
                    <div className="quad-cell quad-3" />
                    <div className="quad-cell quad-4" />
                  </div>
                )}
              </div>

              <div className="teaser-text-box">
                <div className="teaser-top-meta">
                  <span className="teaser-num font-serif">{proj.num}</span>
                  <span className="teaser-human-tag font-hand">{proj.humanLabel}</span>
                </div>

                <h3 className="teaser-proj-name font-quirky">{proj.name}</h3>
                <p className="teaser-proj-desc font-body">{proj.desc}</p>

                <div className="teaser-link-row">
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="teaser-github-link font-quirky"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Prominent "SEE ALL PROJECTS →" Button to /projects */}
        <div className="see-all-projects-wrapper">
          <Link to="/projects" className="see-all-projects-btn font-quirky">
            <span>SEE ALL PROJECTS</span>
            <ArrowRight size={18} />
          </Link>
          <span className="see-all-note font-hand">
            the complete, organized archive &rarr;
          </span>
        </div>

      </div>
    </section>
  );
}
