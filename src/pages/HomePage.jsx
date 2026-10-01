import React from 'react';
import InteractiveBackground from '../components/InteractiveBackground';
import HeroPoster from '../sections/HeroPoster';
import AboutIntro from '../sections/AboutIntro';
import PersonalPlayground from '../sections/PersonalPlayground';
import ThreeProjectsTeaser from '../sections/ThreeProjectsTeaser';
import ContactPoster from '../sections/ContactPoster';

export default function HomePage() {
  return (
    <div className="homepage-wrapper">
      {/* Interactive Cursor-Reactive Background Pattern */}
      <InteractiveBackground />

      {/* 01 — INTRO / HERO: Giant Typography + Huge 3D Mascot */}
      <HeroPoster />

      {/* 02 — LITTLE ABOUT ME: Short Human Tone + Scattered Keywords */}
      <AboutIntro />

      {/* 03 — THREE COMPACT PROJECT TEASERS: Zoe, chatTUI, Oriah in ONE Horizontal Row */}
      <ThreeProjectsTeaser />

      {/* 04 — INTERESTS SECTION: Infinite Horizontal 2-Row Card Wall */}
      <PersonalPlayground />

      {/* 05 — END / CONTACT & FOOTER */}
      <ContactPoster />
    </div>
  );
}
