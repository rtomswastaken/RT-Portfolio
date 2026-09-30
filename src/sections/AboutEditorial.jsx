import React from 'react';
import { ArrowUpRight, Terminal, Cpu, Sparkles, MapPin } from 'lucide-react';
import { profileData } from '../data/profile';

export default function AboutEditorial({ onOpenTerminal }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">02</span>
            <span className="track-slash">/</span>
            <span className="track-title">ABOUT</span>
          </div>
          <div className="track-right hide-mobile">
            <span>THE CREATOR BEHIND THE TERMINAL</span>
            <span className="track-coord">{profileData.location}</span>
          </div>
        </div>

        {/* Editorial Typography Statement */}
        <div className="about-manifesto-grid">
          
          <div className="about-headline-col">
            <h2 className="about-giant-headline font-display">
              I BUILD THINGS<br />
              THAT LIVE<br />
              <span className="text-highlight-cyan">BETWEEN CODE,</span><br />
              DESIGN, AND<br />
              <span className="text-highlight-violet">IDEAS.</span>
            </h2>

            <div className="about-credo-box font-mono">
              <span className="credo-quote-mark">“</span>
              <p>{profileData.bio.credo}</p>
            </div>
          </div>

          {/* Narrative & Human Story Column */}
          <div className="about-narrative-col font-body">
            <p className="narrative-lead">
              {profileData.bio.body}
            </p>

            <p className="narrative-body">
              {profileData.bio.quote}
            </p>

            <p className="narrative-sub">
              Whether building an entirely local computer-use assistant for macOS with real-time screen vision 
              (<span className="inline-code">Zoe Alpha</span>), a fast terminal-based chat client in Go (<span className="inline-code">chatTUI</span>), 
              or a gamified sustainability app (<span className="inline-code">EcoClassroom</span>), every project is driven by genuine technical curiosity 
              and an obsession with tactile, polished interaction.
            </p>

            {/* Quick Metrics Bar */}
            <div className="about-meta-grid font-mono">
              <div className="meta-card">
                <span className="meta-number">{profileData.metrics.publicRepos}</span>
                <span className="meta-label">Public GitHub Repos</span>
              </div>
              <div className="meta-card">
                <span className="meta-number">{profileData.metrics.githubSince}</span>
                <span className="meta-label">On GitHub Since</span>
              </div>
              <div className="meta-card">
                <span className="meta-number">100%</span>
                <span className="meta-label">Local AI Focus</span>
              </div>
              <div className="meta-card">
                <span className="meta-number">CLI</span>
                <span className="meta-label">Interactive Package</span>
              </div>
            </div>

            {/* Editorial Footer Links */}
            <div className="about-cta-row font-mono">
              <button 
                className="btn-ghost" 
                onClick={onOpenTerminal}
                data-cursor="action" 
                data-cursor-label="TERMINAL"
              >
                <Terminal size={14} />
                <span>Run `npx rtoms` in browser</span>
              </button>
              
              <a 
                href={profileData.social.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="about-gh-link"
                data-cursor="hover"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
