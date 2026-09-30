import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (e, targetHash) => {
    e.preventDefault();
    if (isHome) {
      if (!targetHash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate('/' + (targetHash || ''));
      setTimeout(() => {
        if (targetHash) {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="minimal-nav">
      <Link 
        to="/" 
        onClick={(e) => handleNavClick(e, '')} 
        className="nav-brand-sig"
        aria-label="RTOMS Corner Home"
      >
        <span>RTOMS</span>
        <span className="sig-dot" />
      </Link>

      <nav className="nav-links-cluster" aria-label="Main Navigation">
        <a 
          href="#about" 
          onClick={(e) => handleNavClick(e, '#about')} 
          className="nav-link-item"
        >
          ABOUT
        </a>
        <Link 
          to="/projects" 
          className={`nav-link-item ${location.pathname === '/projects' ? 'active-nav-link' : ''}`}
        >
          PROJECTS
        </Link>
        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, '#contact')} 
          className="nav-link-item"
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}
