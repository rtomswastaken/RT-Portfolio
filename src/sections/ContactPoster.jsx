import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon } from '../components/Icons';

export default function ContactPoster() {
  const links = [
    { label: "GITHUB", url: "https://github.com/rtomswastaken", icon: GitHubIcon },
    { label: "LINKEDIN", url: "https://linkedin.com/in/richardsenthomas", icon: LinkedInIcon },
    { label: "INSTAGRAM", url: "https://instagram.com/rtoooms", icon: InstagramIcon },
    { label: "EMAIL", url: "mailto:richardsenthomas888@gmail.com", icon: MailIcon }
  ];

  return (
    <footer id="contact" className="contact-section">
      <div className="container">
        
        {/* Giant Final Poster Typography */}
        <h2 className="contact-huge-headline">
          LET&apos;S <span className="headline-cyan">MAKE</span><br />
          SOMETHING.
        </h2>

        <p className="contact-sub-statement">
          Got an idea, a local AI concept, or want to collaborate on something weird and wonderful? Let&apos;s talk.
        </p>

        {/* Clean Oversized Channel Buttons */}
        <div className="contact-links-deck">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-stamp-btn"
              >
                <Icon size={18} />
                <span>{item.label}</span>
                <ArrowUpRight size={15} />
              </a>
            );
          })}
        </div>

        {/* Minimal Colophon */}
        <div className="clean-footer">
          <span>RTOMS · RICHARDSEN THOMAS</span>
          <span>© 2026 · PATHANAMTHITTA, KERALA, INDIA</span>
        </div>

      </div>
    </footer>
  );
}
