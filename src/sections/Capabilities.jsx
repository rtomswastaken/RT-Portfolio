import React, { useState } from 'react';
import { Cpu, Terminal, Layout, Sparkles, Layers, ArrowRight } from 'lucide-react';

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      num: "01",
      id: "ai",
      title: "AI & INTELLIGENT AGENTS",
      subtitle: "Local Inference · Autonomous Loops · Multimodal Vision",
      icon: Cpu,
      accentColor: "#6FD7E8",
      description: "Architecting local AI computer-use loops and multimodal vision agents that operate directly on Apple Silicon with zero external cloud dependencies.",
      verifiedPoints: [
        "Local LLM reasoning via Ollama (Qwen3:14b) and on-device vision (MiniCPM-V)",
        "Physical screen interaction loops (Plan → Act → Observe) using PyObjC & Quartz mouse curves",
        "Low-latency voice pipelines with faster-whisper (STT) and native NSSpeech audio",
        "Persistent context, user preference stores, and task execution memory in SQLite"
      ],
      technologies: ["Ollama", "Qwen3", "MiniCPM-V", "faster-whisper", "PyTorch", "PyObjC", "Quartz", "SQLite"]
    },
    {
      num: "02",
      id: "systems",
      title: "TERMINAL & SYSTEMS DEV",
      subtitle: "High-Performance TUIs · Mesh Networking · Concurrency",
      icon: Terminal,
      accentColor: "#00ADD8",
      description: "Building fast, keyboard-first terminal software and decentralized communication platforms with Go and Python.",
      verifiedPoints: [
        "Rich terminal interfaces utilizing Charm's Bubble Tea (Elm architecture) & Lip Gloss",
        "Multi-agent terminal IDE development using Python Textual 8.2 and Pygments",
        "Encrypted mesh networking over Tailscale VPN for peer-to-peer and daemon connectivity",
        "Interactive CLI tools packaged and runnable instantly via npm / npx"
      ],
      technologies: ["Go", "Bubble Tea", "Lip Gloss", "Textual 8.2", "Tailscale", "Docker", "Ink", "Node.js"]
    },
    {
      num: "03",
      id: "web",
      title: "MODERN WEB & INTERACTION",
      subtitle: "React 19 · Creative Motion · Micro-Interactions",
      icon: Layout,
      accentColor: "#3ECF8E",
      description: "Crafting reactive web applications, fluid motion systems, and accessible user experiences that feel alive.",
      verifiedPoints: [
        "Production single-page web applications with React 19, modern Vite, and custom CSS design systems",
        "Gamified education & sustainability tracking portals with real-time UI state",
        "Kinetic typography, scroll-linked choreography with GSAP & Lenis",
        "Clean component architectures built for performance, responsiveness, and zero clutter"
      ],
      technologies: ["React 19", "Vite", "JavaScript", "TypeScript", "GSAP", "Lenis", "Figma", "Vercel"]
    },
    {
      num: "04",
      id: "creative",
      title: "CREATIVE TECH & LINUX",
      subtitle: "Physical UI Metaphors · Window Managers · Audio-Visuals",
      icon: Sparkles,
      accentColor: "#7B6CFF",
      description: "Exploring the boundary between hardware aesthetics and software environments.",
      verifiedPoints: [
        "MacBook Notch hardware-anchored audio-reactive glow interfaces in native Cocoa",
        "Custom Linux desktop workflows on Fedora & Arch Linux using Hyprland and Wayland",
        "Rapid prototyping of creative ideas, 3D explorations, and playful interactive physics",
        "Automotive design appreciation and mechanical aesthetic influences in software layout"
      ],
      technologies: ["Hyprland", "Wayland", "Apple Silicon", "Fedora", "Arch Linux", "Neovim", "Kitty", "3D / Motion"]
    }
  ];

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">03</span>
            <span className="track-slash">/</span>
            <span className="track-title">CAPABILITIES</span>
          </div>
          <div className="track-right hide-mobile">
            <span>VERIFIED ARCHITECTURAL DOMAINS</span>
            <span>NO FAKE PERCENTAGE BARS</span>
          </div>
        </div>

        {/* Section Intro Typography */}
        <div className="capabilities-intro">
          <h2 className="capabilities-title font-display">
            ENGINEERED AT THE EDGES<br />
            OF <span className="text-highlight-cyan">INTELLIGENCE</span> & <span className="text-highlight-violet">SYSTEMS.</span>
          </h2>
          <p className="capabilities-subtitle font-body">
            Four focused areas of depth, backed directly by production code, open-source repositories, and autonomous experiments.
          </p>
        </div>

        {/* Interactive Capability Deck */}
        <div className="capabilities-grid">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            const isActive = activeTab === index;
            return (
              <div 
                key={cap.id}
                className={`capability-card editorial-board ${isActive ? 'card-focused' : ''}`}
                onClick={() => setActiveTab(index)}
                data-cursor="hover"
                style={{
                  borderTop: isActive ? `2px solid ${cap.accentColor}` : undefined
                }}
              >
                {/* Header Tag */}
                <div className="card-top-row font-mono">
                  <span className="cap-num" style={{ color: cap.accentColor }}>{cap.num}</span>
                  <span className="cap-pill" style={{ borderColor: `${cap.accentColor}40`, color: cap.accentColor }}>
                    {cap.id.toUpperCase()}
                  </span>
                </div>

                <div className="card-icon-title">
                  <div className="cap-icon-box" style={{ background: `${cap.accentColor}18`, color: cap.accentColor }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="cap-title font-sans">{cap.title}</h3>
                    <span className="cap-subtitle font-mono">{cap.subtitle}</span>
                  </div>
                </div>

                <p className="cap-description font-body">
                  {cap.description}
                </p>

                {/* Verified Bullet Points */}
                <ul className="cap-points-list font-body">
                  {cap.verifiedPoints.map((pt, i) => (
                    <li key={i} className="cap-point-item">
                      <span className="point-bullet" style={{ backgroundColor: cap.accentColor }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="cap-tech-row font-mono">
                  {cap.technologies.map(t => (
                    <span key={t} className="cap-tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
