import React, { useState } from 'react';
import { Terminal, Cpu, ShieldCheck, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { GitHubIcon } from '../components/Icons';

export default function PinnedShowcase({ onOpenTerminal }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const showcaseItems = [
    {
      index: "01",
      id: "zoe",
      tag: "FLAGSHIP AI AGENT",
      title: "ZOE ALPHA v0.1",
      subtitle: "100% Local AI Computer Assistant for macOS",
      badge: "NO CLOUD APIS · APPLE SILICON",
      accent: "#6FD7E8",
      lead: "A fully private multimodal agent for macOS that perceives your screen through MiniCPM-V and physically commands the OS via native Quartz events.",
      stack: ["Python", "PyObjC", "Quartz", "Qwen3:14b", "MiniCPM-V", "faster-whisper", "SQLite"],
      features: [
        { label: "Screen Perception", val: "Continuous on-device vision through MiniCPM-V via Ollama" },
        { label: "Hardware Anchor", val: "Audio-reactive gradient glow pinned to physical MacBook notch" },
        { label: "Motor Control", val: "Smooth cubic-Bezier mouse trajectory mapping to Quartz events" },
        { label: "Privacy Protocol", val: "100% Offline execution with episodic SQLite memory retention" }
      ],
      githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1",
      terminalCmd: "zoe status"
    },
    {
      index: "02",
      id: "chattui",
      tag: "SYSTEMS & CONCURRENCY",
      title: "CHATTUI",
      subtitle: "Decentralized Terminal Communication Platform",
      badge: "GO · BUBBLE TEA · TAILSCALE",
      accent: "#00ADD8",
      lead: "A modern, lightweight terminal chat experience bringing Discord-grade channel navigation into the shell with zero cloud infrastructure.",
      stack: ["Go", "Bubble Tea", "Lip Gloss", "SQLite", "Tailscale", "Docker", "TCP"],
      features: [
        { label: "UI Architecture", val: "Elm-inspired state architecture powered by Charm's Bubble Tea" },
        { label: "Private Mesh", val: "End-to-end encrypted node communication over Tailscale VPN" },
        { label: "Persistence", val: "Zero-latency SQLite database storing channel rooms & direct messages" },
        { label: "Ergonomics", val: "Full keyboard shortcuts (Ctrl+K search, Ctrl+N DM, slash commands)" }
      ],
      githubUrl: "https://github.com/rtomswastaken/chattui",
      terminalCmd: "chattui"
    },
    {
      index: "03",
      id: "oriah",
      tag: "DEVELOPER WORKSPACE",
      title: "ORIAH IDE",
      subtitle: "Agentic AI Terminal IDE (4-Quadrant Architecture)",
      badge: "TEXTUAL 8.2 · PYGMENTS",
      accent: "#7B6CFF",
      lead: "A fast, clean terminal development environment orchestrating autonomous agent task checklists and multi-tab code editing side-by-side.",
      stack: ["Python", "Textual 8.2", "Pygments", "Rich", "AI Agents", "TUI"],
      features: [
        { label: "Layout Spec", val: "Strict 4-Quadrant system: Directory, Editor, Checklist, and Console" },
        { label: "Syntax Engine", val: "Real-time syntax highlighting powered by Pygments & Rich" },
        { label: "Agent Reporting", val: "Dynamic task checklist with real-time completion progress tracking" },
        { label: "Dual Execution", val: "Seamless toggle between autonomous agent loops and shell terminal" }
      ],
      githubUrl: "https://github.com/rtomswastaken/Oriah-IDE",
      terminalCmd: "oriah"
    }
  ];

  const current = showcaseItems[activeSlide];

  return (
    <section id="showcase" className="pinned-showcase-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">06</span>
            <span className="track-slash">/</span>
            <span className="track-title">PINNED SHOWCASE</span>
          </div>
          <div className="track-right hide-mobile">
            <span>DEEP ARCHITECTURAL SPOTLIGHT</span>
            <span>[{activeSlide + 1} OF 3]</span>
          </div>
        </div>

        {/* Pinned Showcase Container */}
        <div className="showcase-motion-stage editorial-board">
          
          {/* Top Slide Navigation Bar */}
          <div className="showcase-nav-bar font-mono">
            <div className="showcase-tab-group">
              {showcaseItems.map((item, idx) => (
                <button
                  key={item.id}
                  className={`showcase-tab-btn ${activeSlide === idx ? 'active-tab' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  data-cursor="hover"
                  style={{
                    borderColor: activeSlide === idx ? item.accent : 'transparent'
                  }}
                >
                  <span className="tab-idx">[{item.index}]</span>
                  <span className="tab-title">{item.title}</span>
                </button>
              ))}
            </div>

            <div className="showcase-tag-badge hide-mobile font-mono" style={{ color: current.accent, borderColor: `${current.accent}40` }}>
              {current.tag}
            </div>
          </div>

          {/* Slide Content Display */}
          <div className="showcase-slide-grid">
            
            {/* Left Column: Story & Specs */}
            <div className="showcase-story-col">
              <div className="slide-badge-row font-mono">
                <span className="system-pill" style={{ background: `${current.accent}15`, color: current.accent, border: `1px solid ${current.accent}40` }}>
                  {current.badge}
                </span>
                <span className="system-year">2026 // RTOMS SPEC</span>
              </div>

              <h2 className="showcase-slide-title font-display" style={{ textShadow: `0 0 40px ${current.accent}20` }}>
                {current.title}
              </h2>
              <p className="showcase-slide-subtitle font-sans">
                {current.subtitle}
              </p>

              <p className="showcase-slide-lead font-body">
                {current.lead}
              </p>

              {/* Technical Specifications Grid */}
              <div className="showcase-spec-deck font-mono">
                {current.features.map((feat, i) => (
                  <div key={i} className="spec-deck-cell">
                    <span className="spec-label" style={{ color: current.accent }}>[ {feat.label} ]</span>
                    <span className="spec-val font-body">{feat.val}</span>
                  </div>
                ))}
              </div>

              {/* Stack Row */}
              <div className="showcase-stack-tags font-mono">
                {current.stack.map(st => (
                  <span key={st} className="stack-tag">{st}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="showcase-actions font-mono">
                <a 
                  href={current.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cursor="hover"
                  style={{ background: current.accent, borderColor: current.accent }}
                >
                  <GitHubIcon size={15} />
                  <span>VIEW REPOSITORY</span>
                </a>

                <button 
                  className="btn-ghost"
                  onClick={onOpenTerminal}
                  data-cursor="action"
                  data-cursor-label="SIMULATE"
                >
                  <Terminal size={14} />
                  <span>Run `{current.terminalCmd}`</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Architecture Blueprint */}
            <div className="showcase-blueprint-col">
              <div className="blueprint-box font-mono" style={{ borderColor: `${current.accent}30` }}>
                <div className="blueprint-header">
                  <span>BLUEPRINT REF: {current.id.toUpperCase()}-v0.1</span>
                  <span style={{ color: current.accent }}>● COMPILED</span>
                </div>

                <div className="blueprint-schematic">
                  {current.id === 'zoe' && (
                    <div className="schematic-container">
                      <div className="schematic-block glow-block">
                        <span className="block-title">🍎 APPLE SILICON HARDWARE</span>
                        <span className="block-sub">MacBook Pro Notch + Metal Acceleration</span>
                      </div>
                      <div className="schematic-line">│</div>
                      <div className="schematic-block">
                        <span className="block-title">🎙️ FASTER-WHISPER + VAD</span>
                        <span className="block-sub">100% Local Speech-To-Text</span>
                      </div>
                      <div className="schematic-line">│</div>
                      <div className="schematic-block active-block" style={{ borderColor: current.accent }}>
                        <span className="block-title">🧠 QWEN3:14B + MINICPM-V</span>
                        <span className="block-sub">Local Multimodal Reasoning (Ollama)</span>
                      </div>
                      <div className="schematic-line">│</div>
                      <div className="schematic-block">
                        <span className="block-title">🖱️ QUARTZ MOTOR SYSTEM</span>
                        <span className="block-sub">Cubic-Bezier Mouse + Keyboard Dispatch</span>
                      </div>
                    </div>
                  )}

                  {current.id === 'chattui' && (
                    <div className="schematic-container">
                      <div className="schematic-block glow-block">
                        <span className="block-title">💻 CLIENT INSTANCE</span>
                        <span className="block-sub">Charm Bubble Tea + Lip Gloss TUI</span>
                      </div>
                      <div className="schematic-line">│</div>
                      <div className="schematic-block active-block" style={{ borderColor: current.accent }}>
                        <span className="block-title">🔒 TAILSCALE VPN MESH</span>
                        <span className="block-sub">Encrypted Private Network Routing</span>
                      </div>
                      <div className="schematic-line">│</div>
                      <div className="schematic-block">
                        <span className="block-title">🗄️ SQLITE PERSISTENCE</span>
                        <span className="block-sub">Channel Messages, Permissions &amp; State</span>
                      </div>
                    </div>
                  )}

                  {current.id === 'oriah' && (
                    <div className="schematic-container">
                      <div className="schematic-block glow-block">
                        <span className="block-title">⚡ TEXTUAL 8.2 TUI DESKTOP</span>
                        <span className="block-sub">Event-Driven Python Terminal UI</span>
                      </div>
                      <div className="schematic-line">│</div>
                      <div className="schematic-block active-block" style={{ borderColor: current.accent }}>
                        <span className="block-title">🤖 4-QUADRANT AGENT ENGINE</span>
                        <span className="block-sub">Tree · Editor · Checklist · Console</span>
                      </div>
                      <div className="schematic-line">│</div>
                      <div className="schematic-block">
                        <span className="block-title">📝 PYGMENTS SYNTAX HIGHLIGHT</span>
                        <span className="block-sub">Multi-Tab Code Editing &amp; Rich Formatting</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="blueprint-footer">
                  <span>SCALE: 1:1</span>
                  <span>STATUS: PRODUCTION ARCHITECTURE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Step Indicator */}
          <div className="showcase-step-controls font-mono">
            {showcaseItems.map((_, i) => (
              <span 
                key={i} 
                className={`step-bar ${activeSlide === i ? 'active' : ''}`}
                onClick={() => setActiveSlide(i)}
                style={{
                  backgroundColor: activeSlide === i ? current.accent : 'rgba(111, 215, 232, 0.2)'
                }}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
