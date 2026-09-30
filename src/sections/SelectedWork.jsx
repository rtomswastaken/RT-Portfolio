import React from 'react';
import { ArrowUpRight, ExternalLink, Globe } from 'lucide-react';
import { GitHubIcon } from '../components/Icons';
import { WashiTape } from '../components/Doodles';

export default function SelectedWork() {
  const projects = [
    {
      num: "01",
      title: "ZOE ALPHA",
      oneLiner: "A 100% local AI computer assistant for macOS that perceives your screen and physically navigates the OS with zero cloud APIs.",
      githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1",
      demoUrl: null,
      layout: "piece-layout-left",
      tilt: "tilt-left",
      bgStyle: "artwork-bg-teal",
      type: "notch"
    },
    {
      num: "02",
      title: "CHATTUI",
      oneLiner: "A lightweight, Discord-inspired terminal chat platform built from scratch in Go with Charm's Bubble Tea and private networking over Tailscale.",
      githubUrl: "https://github.com/rtomswastaken/chattui",
      demoUrl: null,
      layout: "piece-layout-right",
      tilt: "tilt-right",
      bgStyle: "artwork-bg-deep",
      type: "terminal"
    },
    {
      num: "03",
      title: "ORIAH IDE",
      oneLiner: "Cursor-inspired AI Agent Terminal IDE built with Python Textual 8.2 & Pygments, featuring a strict 4-quadrant layout for autonomous code loops.",
      githubUrl: "https://github.com/rtomswastaken/Oriah-IDE",
      demoUrl: null,
      layout: "piece-layout-left",
      tilt: "tilt-left",
      bgStyle: "artwork-bg-violet",
      type: "quadrant"
    },
    {
      num: "04",
      title: "ECOCLASSROOM",
      oneLiner: "Gamified environmental classroom web app for students and teachers: 'Small Actions. Big Impact.' Deployed live on Vercel.",
      githubUrl: "https://github.com/rtomswastaken/eco-classroom",
      demoUrl: "https://eco-classroom.vercel.app",
      layout: "piece-layout-right",
      tilt: "tilt-right",
      bgStyle: "artwork-bg-mint",
      type: "eco"
    }
  ];

  return (
    <section id="work" className="work-section">
      <div className="container">
        
        {/* Gallery Section Header */}
        <div className="work-header-block">
          <span className="work-header-subtitle">Selected experiments &amp; tools /</span>
          <h2 className="work-header-title">FEATURED WORK</h2>
        </div>

        {/* Visual Gallery Stream (Asymmetric, Un-carded) */}
        <div className="work-gallery-flow">
          {projects.map((proj) => (
            <div key={proj.num} className={`project-piece ${proj.layout}`}>
              
              {/* Left / Artwork Side */}
              <div className={`project-artwork-frame ${proj.bgStyle} ${proj.tilt}`}>
                <WashiTape 
                  width={80} 
                  height={22} 
                  rotation={-4} 
                  className="card-tape-top"
                  style={{ position: 'absolute', top: '-10px', left: '20px' }}
                />

                {proj.type === 'notch' && (
                  <div className="visual-notch-graphic">
                    <div className="mock-camera-notch" />
                    <span className="notch-status-text">ZOE // SCREEN VISION</span>
                    <span className="notch-sub-line">Apple Silicon Local Acceleration</span>
                  </div>
                )}

                {proj.type === 'terminal' && (
                  <div className="visual-terminal-graphic">
                    <div className="term-bar">
                      <span className="t-dot td-red" />
                      <span className="t-dot td-yellow" />
                      <span className="t-dot td-green" />
                    </div>
                    <div className="term-text-body">
                      <div>chattui - tailscale encrypted mesh</div>
                      <div className="term-active-line">&gt; connected to #global</div>
                      <div>&gt; ready for messages_</div>
                    </div>
                  </div>
                )}

                {proj.type === 'quadrant' && (
                  <div className="visual-quadrant-graphic">
                    <div className="q-tile">
                      <span className="q-name">DIRECTORY</span>
                      <span className="q-sub">File Tree</span>
                    </div>
                    <div className="q-tile q-active">
                      <span className="q-name">EDITOR</span>
                      <span className="q-sub">Pygments Syntax</span>
                    </div>
                    <div className="q-tile">
                      <span className="q-name">CHECKLIST</span>
                      <span className="q-sub">Agent Task Progress</span>
                    </div>
                    <div className="q-tile">
                      <span className="q-name">AGENT MODE</span>
                      <span className="q-sub">Live Terminal</span>
                    </div>
                  </div>
                )}

                {proj.type === 'eco' && (
                  <div className="visual-sustainability-graphic">
                    <Globe className="globe-vector-icon" strokeWidth={1.5} />
                    <span className="eco-live-badge">LIVE ON VERCEL</span>
                  </div>
                )}
              </div>

              {/* Text & Link Side */}
              <div className="project-story-col">
                <span className="project-number-stamp font-serif">{proj.num}</span>

                <h3 className="project-big-name">{proj.title}</h3>

                <p className="project-one-liner font-body">{proj.oneLiner}</p>

                <div className="project-links-row">
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-github-link"
                  >
                    <GitHubIcon size={16} />
                    <span>VIEW ON GITHUB</span>
                    <ArrowUpRight size={15} />
                  </a>

                  {proj.demoUrl && (
                    <a 
                      href={proj.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-demo-link"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
