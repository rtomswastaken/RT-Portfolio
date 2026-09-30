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
