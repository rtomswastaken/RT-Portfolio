import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (e, targetHash) => {
    if (isHome) {
      if (targetHash) {
        e.preventDefault();
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (targetHash) {
        e.preventDefault();
        navigate('/' + targetHash);
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  return (
    <header className="frosted-glass-nav" aria-label="Main Navigation">
      <Link 
        to="/" 
        onClick={(e) => {
          if (isHome) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }} 
        className="glass-nav-brand"
        aria-label="RTOMS Home"
      >
        <span>RTOMS</span>
        <span className="glass-brand-dot" />
      </Link>

      <nav className="glass-nav-links">
        <a 
          href="/#about" 
          onClick={(e) => handleNavClick(e, '#about')} 
          className="glass-nav-item"
        >
          ABOUT
        </a>
        <Link 
          to="/projects" 
          className={`glass-nav-item ${location.pathname === '/projects' ? 'active-glass-nav' : ''}`}
        >
          PROJECTS
        </Link>
        <Link 
          to="/contact" 
          className={`glass-nav-item ${location.pathname === '/contact' ? 'active-glass-nav' : ''}`}
        >
          CONTACT
        </Link>
      </nav>
    </header>
  );
}
