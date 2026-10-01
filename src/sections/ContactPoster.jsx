import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon } from '../components/Icons';
import { DoodleStar } from '../components/Doodles';

export default function ContactPoster() {
  const links = [
    { label: "GITHUB", url: "https://github.com/rtomswastaken", icon: GitHubIcon },
    { label: "EMAIL", url: "mailto:richardsenthomas888@gmail.com", icon: MailIcon },
    { label: "INSTAGRAM", url: "https://instagram.com/rtoooms", icon: InstagramIcon },
    { label: "LINKEDIN", url: "https://linkedin.com/in/richardsenthomas", icon: LinkedInIcon }
  ];

  return (
    <footer id="contact" className="contact-section">
      <div className="container">
        
        {/* Giant Final Poster Typography */}
        <div className="contact-headline-wrap">
          <span className="contact-hand-tag font-hand">thanks for stopping by /</span>
          <h2 className="contact-huge-headline font-quirky">
            LET&apos;S <span className="headline-cyan">MAKE</span><br />
            SOMETHING.
          </h2>
        </div>

        <p className="contact-sub-statement font-body">
          Got an idea, a weird project, or want to collaborate on something fun? My inbox is always open.
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
                className="channel-stamp-btn font-quirky"
              >
                <Icon size={18} />
                <span>{item.label}</span>
                <ArrowUpRight size={15} />
              </a>
            );
          })}
        </div>

        {/* Minimal Colophon with Character Nearby */}
        <div className="clean-footer">
          <div className="footer-mascot-peek">
            <img src="/assets/avatar.png" alt="Mascot waving" className="footer-avatar-mini" />
            <div className="footer-meta font-body">
              <span className="footer-sig font-quirky">RTOMS · RICHARDSEN THOMAS</span>
              <span className="footer-geo">designed in kerala, india · © 2026</span>
            </div>
          </div>

          <div className="footer-closing-nod">
            <DoodleStar size={18} color="#00B4D8" />
            <span className="font-hand">no corporate cookies used here</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
