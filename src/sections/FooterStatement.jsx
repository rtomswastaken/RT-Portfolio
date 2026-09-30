import React from 'react';
import { ArrowUpRight, Terminal, ArrowUp } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon } from '../components/Icons';
import { profileData } from '../data/profile';

export default function FooterStatement({ onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const verifiedChannels = [
    {
      label: "GITHUB",
      handle: "@rtomswastaken",
      url: profileData.social.github,
      icon: GitHubIcon
    },
    {
      label: "LINKEDIN",
      handle: "richardsenthomas",
      url: profileData.social.linkedin,
      icon: LinkedInIcon
    },
    {
      label: "INSTAGRAM",
      handle: "@rtoooms",
      url: profileData.social.instagram,
      icon: InstagramIcon
    },
    {
      label: "EMAIL",
      handle: profileData.social.email,
      url: `mailto:${profileData.social.email}`,
      icon: MailIcon
    }
  ];

  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        
        {/* Editorial Section Number Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">10</span>
            <span className="track-slash">/</span>
            <span className="track-title">FINAL STATEMENT &amp; CHANNELS</span>
          </div>
          <div className="track-right hide-mobile">
            <span>LAST PAGE OF PORTFOLIO BOOK</span>
            <span>INDEX END</span>
          </div>
        </div>

        {/* Grand Final Typography Statement */}
        <div className="footer-statement-card editorial-board">
          
          <div className="footer-editorial-tape font-mono">
            <span>END OF VOLUME 01 // AUTONOMOUS RECURSION</span>
            <span>{profileData.location}</span>
          </div>

          <div className="footer-hero-text-block">
            <h2 className="footer-giant-statement font-display">
              STILL<br />
              <span className="text-highlight-cyan">BUILDING.</span><br />
              STILL<br />
              <span className="text-highlight-violet">CURIOUS.</span>
            </h2>

            <p className="footer-body-text font-body">
              Whether you want to talk about autonomous AI loops, terminal user interfaces, 
              game mechanics, or high-performance web systems — my terminal is always open.
            </p>

            <div className="footer-npx-action font-mono">
              <span className="npx-pill-label">RUN ANYWHERE IN TERMINAL:</span>
              <div 
                className="npx-pill-box"
                onClick={onOpenTerminal}
                data-cursor="action"
                data-cursor-label="RUN"
              >
                <Terminal size={15} color="#6FD7E8" />
                <span className="code-text">npx rtoms</span>
                <span className="launch-text">[LAUNCH]</span>
              </div>
            </div>
          </div>

          {/* Verified Social Connect Channels Grid */}
          <div className="footer-channels-grid font-mono">
            {verifiedChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.label}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-channel-cell"
                  data-cursor="hover"
                >
                  <div className="channel-top">
                    <Icon size={18} color="#6FD7E8" />
                    <ArrowUpRight size={16} className="channel-arrow" />
                  </div>
                  <div className="channel-name font-display">{ch.label}</div>
                  <div className="channel-handle font-mono">{ch.handle}</div>
                </a>
              );
            })}
          </div>

          {/* Colophon & Copyright Bar */}
          <div className="footer-bottom-colophon font-mono">
            <div className="colophon-left">
              <span className="brand-badge font-display">RTOMS</span>
              <span>© 2026 RICHARDSEN THOMAS. ALL RIGHTS RESERVED.</span>
            </div>

            <div className="colophon-center hide-mobile">
              <span>DESIGNED WITH EDITORIAL RESTRAINT × BUILT WITH MODERN CODE</span>
            </div>

            <button 
              className="scroll-top-btn font-mono"
              onClick={scrollToTop}
              data-cursor="hover"
              title="Return to top"
            >
              <span>TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
