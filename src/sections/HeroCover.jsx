import React, { useState } from 'react';
import { Terminal, ArrowDown, Copy, Check, Sparkles, MapPin } from 'lucide-react';
import { profileData } from '../data/profile';

export default function HeroCover({ onOpenTerminal }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(profileData.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        
        {/* Top Editorial Magazine Header Strip */}
        <div className="hero-editorial-strip font-mono">
          <div className="strip-item">
            <span className="strip-label">ISSUE</span>
            <span className="strip-val">VOL. 01 / 2026</span>
          </div>
          <div className="strip-item hide-mobile">
            <MapPin size={12} color="#6FD7E8" />
            <span className="strip-val">{profileData.location}</span>
          </div>
          <div className="strip-item">
            <span className="strip-pulse" />
            <span className="strip-val">STATUS: BUILDING</span>
          </div>
          <div className="strip-item hide-mobile">
            <span className="strip-label">ARCHIVE</span>
            <span className="strip-val">GITHUB: @{profileData.githubUsername}</span>
          </div>
        </div>

        {/* Master Cover Visual Composition */}
        <div className="hero-cover-grid">
          
          {/* Left / Main Typography Block */}
          <div className="hero-main-title-block">
            <div className="hero-badge-pill font-mono">
              <span className="badge-dot" />
              <span>{profileData.tagline}</span>
            </div>

            <h1 className="hero-giant-name font-display">
              <span className="hero-line hero-line-1">RICHARDSEN</span>
              <span className="hero-line hero-line-2">THOMAS</span>
            </h1>

            {/* Triad Roles */}
            <div className="hero-triad font-sans">
              <span className="triad-word">DESIGNER</span>
              <span className="triad-sep">·</span>
              <span className="triad-word">DEVELOPER</span>
              <span className="triad-sep">·</span>
              <span className="triad-word">DREAMER</span>
            </div>

            {/* Lead Statement */}
            <p className="hero-manifesto-text font-body">
              Crafting autonomous AI agents, lightweight terminal platforms, and tactile digital interfaces. 
              Living between deep systems and experimental web typography.
            </p>

            {/* Action Bar: Terminal command pill & Interactive launcher */}
            <div className="hero-action-row">
              <div 
                className="hero-cmd-pill font-mono"
                onClick={handleCopyCommand}
                data-cursor="action"
                data-cursor-label="COPY"
                title="Click to copy terminal command"
              >
                <Terminal size={15} color="#6FD7E8" />
                <span className="cmd-text">{profileData.cliCommand}</span>
                <button className="cmd-copy-btn" aria-label="Copy command">
                  {copied ? <Check size={14} color="#3ECF8E" /> : <Copy size={14} />}
                </button>
              </div>

              <button 
                className="btn-primary hero-btn-run"
                onClick={onOpenTerminal}
                data-cursor="action"
                data-cursor-label="LAUNCH"
              >
                <span>TEST IN BROWSER</span>
                <Sparkles size={16} />
              </button>
            </div>
          </div>

          {/* Right / Editorial Board Mascot Card (Reference 01) */}
          <div className="hero-board-column">
            <div className="editorial-board hero-mascot-board" data-cursor="hover">
              {/* Board Header Tape */}
              <div className="board-top-tape font-mono">
                <span>PLATE NO. 01 — MASCOT SPEC</span>
                <span>VER. 2026.09</span>
              </div>

              {/* Character Illustration with deep ocean cyan background */}
              <div className="mascot-image-wrapper">
                <img 
                  src="/assets/avatar.png" 
                  alt="Richardsen Thomas Avatar Mascot" 
                  className="mascot-img"
                  loading="eager"
                />
                <div className="mascot-lighting-glow" />
              </div>

              {/* Board Footer Spec */}
              <div className="board-bottom-spec font-mono">
                <div className="spec-row">
                  <span className="spec-key">SUBJECT</span>
                  <span className="spec-val">RTOMS 3D MASCOT</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">DISCIPLINE</span>
                  <span className="spec-val">CODE × DESIGN × AI</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">RUNTIME</span>
                  <span className="spec-val">DARWIN / LINUX / WEB</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Scroll Indicator & Technical Stamp */}
        <div className="hero-footer-bar font-mono">
          <div className="scroll-indicator" onClick={handleScrollDown} data-cursor="hover">
            <span className="scroll-text">SCROLL TO DISCOVER</span>
            <ArrowDown size={14} className="bounce-arrow" />
          </div>

          <div className="hero-footer-meta hide-mobile">
            <span>[ 01 / 10 ]</span>
            <span>PORTFOLIO COVER</span>
            <span>INDEX 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
}
