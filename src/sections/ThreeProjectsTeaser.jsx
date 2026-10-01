import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { WashiTape } from '../components/Doodles';

export default function ThreeProjectsTeaser() {
  const teasers = [
    {
      id: "zoe",
      name: "ZOE ALPHA",
      desc: "Local AI assistant for macOS that perceives screen and controls native input with zero cloud APIs.",
      githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1"
    },
    {
      id: "chattui",
      name: "CHATTUI",
      desc: "Terminal chat platform built for hackers in Go with Charm Bubble Tea and private Tailscale mesh.",
      githubUrl: "https://github.com/rtomswastaken/chattui"
    },
    {
      id: "oriah",
      name: "ORIAH IDE",
      desc: "4-quadrant agentic AI terminal code editor with interactive progress reports and syntax editing.",
      githubUrl: "https://github.com/rtomswastaken/Oriah-IDE"
    }
  ];

  return (
    <section id="work" className="work-teaser-section">
      <div className="container">
        
        {/* Section Header with Generous Negative Space */}
        <div className="work-teaser-header">
          <span className="teaser-eyebrow font-hand">curated preview /</span>
          <h2 className="teaser-main-title font-quirky">SELECTED WORK</h2>
          <p className="teaser-subtitle font-body">
            A small taste of software experiments. The complete ledger lives on the dedicated archive.
          </p>
        </div>

        {/* 3 Equal-Width Compact Cards in ONE Horizontal Row */}
        <div className="teasers-compact-row">
          {teasers.map((proj, idx) => (
            <article key={proj.id} className={`compact-project-card card-tilt-${idx}`}>
              <WashiTape 
                width={50} 
                height={16} 
                rotation={idx === 1 ? 2 : -2} 
                className="compact-card-tape" 
              />
              
              <div className="compact-card-inner">
                <span className="compact-card-num font-serif">0{idx + 1}</span>
                <h3 className="compact-card-title font-quirky">{proj.name}</h3>
                <p className="compact-card-desc font-body">{proj.desc}</p>
                
                <div className="compact-card-footer">
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="compact-card-link font-quirky"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Clean Link to /projects */}
        <div className="see-all-projects-wrapper">
          <Link to="/projects" className="see-all-projects-btn font-quirky">
            <span>SEE ALL PROJECTS</span>
            <ArrowRight size={16} />
          </Link>
          <span className="see-all-note font-hand">
            the complete, organized archive &rarr;
          </span>
        </div>

      </div>
    </section>
  );
}
