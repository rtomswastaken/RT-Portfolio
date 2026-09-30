import React from 'react';
import HeroPoster from '../sections/HeroPoster';
import AboutIntro from '../sections/AboutIntro';
import PersonalPlayground from '../sections/PersonalPlayground';
import ThreeProjectsTeaser from '../sections/ThreeProjectsTeaser';
import ContactPoster from '../sections/ContactPoster';

export default function HomePage() {
  return (
    <div className="homepage-wrapper">
      {/* 01 — INTRO / HERO: Mascot as Main Character + Expressive Typography */}
      <HeroPoster />

      {/* 02 — LITTLE ABOUT ME: Human tone + Scattered Keywords */}
      <AboutIntro />

      {/* 03 — RANDOM PERSONAL STUFF: Turtle Obsession, Apple Design, Photography, Doodling */}
      <PersonalPlayground />

      {/* 04 — THREE PROJECT TEASERS: Zoe, chatTUI, Oriah + "SEE ALL PROJECTS →" button */}
      <ThreeProjectsTeaser />

      {/* 05 — END / CONTACT & FOOTER */}
      <ContactPoster />
    </div>
  );
}
