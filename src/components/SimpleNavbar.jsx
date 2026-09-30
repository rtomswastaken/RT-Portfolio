import React, { useState, useEffect } from 'react';

export default function SimpleNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`simple-navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="nav-brand-logo">
          <span>RTOMS</span>
          <span className="nav-brand-dot" />
        </a>

        <nav className="nav-menu-links">
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('#work'); }} className="nav-simple-link">
            WORK
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('#about'); }} className="nav-simple-link">
            ABOUT
          </a>
          <a href="#personal" onClick={(e) => { e.preventDefault(); scrollTo('#personal'); }} className="nav-simple-link">
            PERSONAL
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} className="nav-contact-pill">
            SAY HELLO
          </a>
        </nav>
      </div>
    </header>
  );
}
