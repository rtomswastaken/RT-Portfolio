import React from 'react';

// Hand-drawn wobbly underline
export const HandUnderline = ({ color = "#00B4D8", className = "" }) => (
  <svg 
    viewBox="0 0 240 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`doodle-underline ${className}`}
  >
    <path 
      d="M3 14C52 4 134 3 237 11C188 15 110 16 34 16" 
      stroke={color} 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// Imperfect hand-drawn circle around a word
export const HandCircle = ({ color = "#6C5CE7", className = "" }) => (
  <svg 
    viewBox="0 0 160 65" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`doodle-circle ${className}`}
  >
    <path 
      d="M148 30C148 48 114 60 76 61C38 62 8 50 7 32C6 14 42 4 82 4C122 4 153 15 151 34C150 43 133 55 106 58" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
  </svg>
);

// Hand-drawn arrow
export const HandArrow = ({ color = "#0B2545", className = "" }) => (
  <svg 
    viewBox="0 0 65 50" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`doodle-arrow ${className}`}
  >
    <path 
      d="M6 38C18 36 34 26 48 10M48 10L35 8M48 10L50 24" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// Hand-drawn 4-point star sparkle
export const DoodleStar = ({ size = 20, color = "#00B4D8", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    className={`doodle-star ${className}`}
  >
    <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" />
  </svg>
);

// Hand-drawn Turtle Doodle (SVG Vector - zero emoji)
export const TurtleDoodle = ({ size = 32, color = "#0B2545", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`doodle-turtle ${className}`}
  >
    {/* Shell */}
    <ellipse cx="24" cy="24" rx="14" ry="11" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M24 13V35M14 24H34M17 17L31 31M17 31L31 17" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
    {/* Head */}
    <circle cx="41" cy="24" r="4.5" stroke={color} strokeWidth="2.2" />
    <circle cx="42" cy="22.5" r="1" fill={color} />
    {/* Legs */}
    <path d="M14 15C11 11 8 13 10 17M14 33C11 37 8 35 10 31M31 14C34 10 38 12 36 16M31 34C34 38 38 36 36 32" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    {/* Tiny Tail */}
    <path d="M10 24H6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Minimal Apple-inspired hardware silhouette doodle (zero copyright logo, pure aesthetic homage)
export const AppleDoodle = ({ size = 28, color = "#0B2545", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`doodle-apple ${className}`}
  >
    <path d="M16 6C17 3.5 19 2 21 2C21 4.5 19 6 16 6Z" fill={color} opacity="0.8" />
    <path d="M22.5 11C20.5 11 19 12 16 12C13 12 11.5 11 9.5 11C6 11 3 14 3 19C3 24.5 7 29.5 10 29.5C11.5 29.5 13 28.5 16 28.5C19 28.5 20.5 29.5 22 29.5C25 29.5 29 24.5 29 19C29 14.5 26.5 11 22.5 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn camera doodle
export const CameraDoodle = ({ size = 28, color = "#0B2545", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 36 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`doodle-camera ${className}`}
  >
    <rect x="4" y="10" width="28" height="20" rx="4" stroke={color} strokeWidth="2.2" />
    <path d="M12 10L14 6H22L24 10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="18" cy="20" r="5.5" stroke={color} strokeWidth="2.2" />
    <circle cx="27" cy="14" r="1.5" fill={color} />
  </svg>
);

// Tape strip effect
export const WashiTape = ({ width = 80, height = 24, rotation = -3, color = "rgba(255, 230, 109, 0.65)", className = "" }) => (
  <div 
    className={`washi-tape ${className}`}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      transform: `rotate(${rotation}deg)`,
      backgroundColor: color
    }}
  />
);
