import React, { useState, useEffect } from 'react';
import { Terminal, ExternalLink, Menu, X } from 'lucide-react';
import { profileData } from '../data/profile';

export default function Navbar({ onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#projects' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'EXPERIMENTS', href: '#experiments' },
    { label: 'ARCHIVE', href: '#archive' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          className="nav-brand"
          onClick={(e) => handleLinkClick(e, '#hero')}
          data-cursor="hover"
        >
          <span className="brand-title font-display">RTOMS</span>
          <span className="brand-slash">/</span>
          <span className="brand-year font-mono">2026</span>
        </a>

        {/* Desktop Links */}
        <nav className="nav-desktop-links font-mono" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={(e) => handleLinkClick(e, item.href)}
              data-cursor="hover"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button 
            className="nav-terminal-btn font-mono"
            onClick={onOpenTerminal}
            data-cursor="action"
            data-cursor-label="RUN"
            title="Launch interactive terminal"
          >
            <Terminal size={14} className="terminal-icon" />
            <span className="terminal-text">npx rtoms</span>
          </button>

          <a 
            href={profileData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github-link font-mono"
            data-cursor="hover"
            title="View GitHub Profile"
          >
            <span>GH</span>
            <ExternalLink size={12} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer font-mono">
          <nav className="mobile-nav-list">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-item"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <button 
              className="mobile-terminal-trigger"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
            >
              <Terminal size={15} />
              <span>Launch Terminal [npx rtoms]</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
