import React from 'react';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon } from '../components/Icons';

export default function ContactPoster({ onOpenTerminal }) {
  const channels = [
    { label: "GITHUB", url: "https://github.com/rtomswastaken", icon: GitHubIcon },
    { label: "LINKEDIN", url: "https://linkedin.com/in/richardsenthomas", icon: LinkedInIcon },
    { label: "INSTAGRAM", url: "https://instagram.com/rtoooms", icon: InstagramIcon },
    { label: "EMAIL", url: "mailto:richardsenthomas888@gmail.com", icon: MailIcon }
  ];

  return (
    <footer id="contact" className="contact-final-section">
      <div className="container">
        
        <h2 className="final-giant-statement font-poster">
          STILL <span className="statement-blue">BUILDING.</span><br />
          SEE YOU AROUND.
        </h2>

        <p className="final-sub-paragraph font-body">
          Got an interesting idea, an AI experiment, or just want to chat about design and code? Let&apos;s build something cool.
        </p>

        {/* Clean Oversized Link Pills */}
        <div className="final-channels-row">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.label}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-pill-link"
              >
                <Icon size={18} />
                <span>{ch.label}</span>
                <ArrowUpRight size={16} />
              </a>
            );
          })}
        </div>

        {/* Tiny Easter Egg for the CLI Terminal Portfolio */}
        <div className="footer-easter-egg">
          <button 
            className="easter-egg-btn"
            onClick={onOpenTerminal}
            title="Easter egg: Launch interactive terminal"
          >
            <Terminal size={14} style={{ display: 'inline', marginRight: '6px' }} />
            <span>&gt;_ npx rtoms</span>
          </button>
        </div>

        {/* Minimal Colophon */}
        <div className="simple-colophon font-sans">
          <span>RTOMS © 2026 // RICHARDSEN THOMAS</span>
          <span>PATHANAMTHITTA, KERALA, INDIA</span>
        </div>

      </div>
    </footer>
  );
}
