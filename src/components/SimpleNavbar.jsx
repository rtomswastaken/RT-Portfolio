import React from 'react';

export default function SimpleNavbar() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="minimal-nav">
      <a 
        href="#hero" 
        onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} 
        className="nav-brand-sig"
      >
        <span>RTOMS</span>
        <span className="sig-dot" />
      </a>

      <nav className="nav-links-cluster" aria-label="Main Navigation">
        <a 
          href="#work" 
          onClick={(e) => { e.preventDefault(); scrollTo('#work'); }} 
          className="nav-link-item"
        >
          WORK
        </a>
        <a 
          href="#about" 
          onClick={(e) => { e.preventDefault(); scrollTo('#about'); }} 
          className="nav-link-item"
        >
          ABOUT
        </a>
        <a 
          href="#personal" 
          onClick={(e) => { e.preventDefault(); scrollTo('#personal'); }} 
          className="nav-link-item"
        >
          PERSONAL
        </a>
        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
          className="nav-link-item"
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}
