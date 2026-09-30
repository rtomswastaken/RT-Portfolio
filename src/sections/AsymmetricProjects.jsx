import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { ExternalLink, Terminal, ArrowUpRight, CheckCircle2, Sparkles, Layers, ShieldCheck, Play } from 'lucide-react';
import { GitHubIcon } from '../components/Icons';

export default function AsymmetricProjects({ onOpenTerminal }) {
  const [activeTabChat, setActiveTabChat] = useState('global');

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">05</span>
            <span className="track-slash">/</span>
            <span className="track-title">PROJECT ARCHIVE</span>
          </div>
          <div className="track-right hide-mobile">
            <span>EDITORIAL BOARD PRESENTATION</span>
            <span>REFERENCE 01 INSPIRATION</span>
          </div>
        </div>

        {/* Section Intro */}
        <div className="projects-intro-row">
          <div>
            <h2 className="projects-giant-title font-display">
              SELECTED <span className="text-highlight-cyan">WORKS</span> & <span className="text-highlight-violet">SYSTEMS.</span>
            </h2>
            <p className="projects-intro-desc font-body">
              An editorial archive of systems software, local AI assistants, developer tooling, and web applications.
              Built from scratch, verified through code commits.
            </p>
          </div>

          <div className="projects-stats-pill font-mono hide-mobile">
            <div className="stat-item">
              <span className="stat-label">TOTAL CATALOG</span>
              <span className="stat-val">{projectsData.length} PROJECTS</span>
            </div>
            <div className="stat-sep" />
            <div className="stat-item">
              <span className="stat-label">VERIFIED STACK</span>
              <span className="stat-val">GO · PYTHON · TS · REACT</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Editorial Grid (Reference 01) */}
        <div className="asymmetric-portfolio-grid">
          
          {/* ==============================================================
              PROJECT 01: ZOE ALPHA v0.1 (Featured Hero Board)
              ============================================================== */}
          <div className="portfolio-board-cell col-span-12 editorial-board zoe-board" data-cursor="action" data-cursor-label="ZOE">
            <div className="board-top-tape font-mono">
              <span className="badge-featured">★ FEATURED AI SYSTEM</span>
              <span>NO. 01 // ZOE-ALPHA-v0.1</span>
              <span className="hide-mobile">DARWIN-ARM64 ONLY</span>
            </div>

            <div className="zoe-grid-layout">
              <div className="zoe-content-pane">
                <div className="project-category-row font-mono">
                  <span className="project-cat-pill">AI & LOCAL OPERATING SYSTEMS</span>
                  <span className="project-status-badge status-building">BUILDING</span>
                  <span className="project-year">2026</span>
                </div>

                <h3 className="project-title-large font-display">
                  ZOE ALPHA v0.1
                </h3>
                <p className="project-lead-subtitle font-sans">
                  100% Local AI Computer Assistant for macOS (Voice + Vision + MacBook Notch UI)
                </p>

                <p className="project-paragraph font-body">
                  An autonomous local AI assistant engineered exclusively for Apple Silicon that sees through MiniCPM-V, 
                  listens with faster-whisper, reasons through Qwen3:14b, and physically navigates macOS with smooth cubic-Bezier cursor movement. 
                  Zero cloud telemetry, zero remote API calls.
                </p>

                <div className="zoe-spec-bullets font-body">
                  <div className="spec-bullet-item">
                    <span className="bullet-dot" />
                    <span><strong>MacBook Notch UI:</strong> Native PyObjC Cocoa borderless overlay anchored to physical display notch with audio-reactive gradient pulses.</span>
                  </div>
                  <div className="spec-bullet-item">
                    <span className="bullet-dot" />
                    <span><strong>Computer-Use Loop:</strong> Plan → Act → Observe autonomous cycle mapping Retina coordinates to Quartz mouse/keyboard events.</span>
                  </div>
                  <div className="spec-bullet-item">
                    <span className="bullet-dot" />
                    <span><strong>Hardware Accelerated:</strong> Metal/MPS acceleration on M-series chips for sub-second multimodal responses.</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="project-tech-tags font-mono">
                  {["Python", "PyObjC", "Quartz", "Ollama", "Qwen3", "MiniCPM-V", "faster-whisper", "SQLite"].map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>

                {/* Action Row */}
                <div className="project-action-row font-mono">
                  <a 
                    href="https://github.com/rtomswastaken/zoe-alpha-v0.1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                    data-cursor="hover"
                  >
                    <GitHubIcon size={15} />
                    <span>INSPECT REPO</span>
                  </a>
                  <button 
                    className="btn-ghost" 
                    onClick={onOpenTerminal}
                    data-cursor="hover"
                  >
                    <Terminal size={14} />
                    <span>Run `zoe` in Terminal</span>
                  </button>
                </div>
              </div>

              {/* Zoe Architecture Graphic Panel */}
              <div className="zoe-visual-pane">
                <div className="notch-preview-frame">
                  <div className="mock-macbook-top">
                    <div className="mock-notch">
                      <div className="notch-camera-dot" />
                      <div className="notch-glow-indicator" />
                    </div>
                  </div>
                  
                  <div className="architecture-schema font-mono">
                    <div className="schema-title">AUTONOMOUS COMPUTER-USE PIPELINE</div>
                    
                    <div className="schema-step">
                      <span className="step-num">01</span>
                      <span className="step-text">Physical Wake Word &amp; VAD (faster-whisper)</span>
                    </div>
                    <div className="schema-arrow">↓</div>
                    <div className="schema-step highlight-step">
                      <span className="step-num">02</span>
                      <span className="step-text">Local Reasoning Engine (Qwen3:14b via Ollama)</span>
                    </div>
                    <div className="schema-arrow">↓</div>
                    <div className="schema-step">
                      <span className="step-num">03</span>
                      <span className="step-text">Multimodal Screen Perception (MiniCPM-V)</span>
                    </div>
                    <div className="schema-arrow">↓</div>
                    <div className="schema-step highlight-step">
                      <span className="step-num">04</span>
                      <span className="step-text">Quartz Mouse (Cubic-Bezier) &amp; Keyboard Control</span>
                    </div>
                    <div className="schema-arrow">↓</div>
                    <div className="schema-step">
                      <span className="step-num">05</span>
                      <span className="step-text">Local Verification Loop &amp; SQLite Memory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              PROJECT 02: chatTUI (Featured Board - Go & Charm)
              ============================================================== */}
          <div className="portfolio-board-cell col-span-7 editorial-board chattui-board" data-cursor="action" data-cursor-label="CHATTUI">
            <div className="board-top-tape font-mono">
              <span className="badge-featured">SYSTEMS ARCHITECTURE</span>
              <span>NO. 02 // CHATTUI</span>
            </div>

            <div className="card-padding">
              <div className="project-category-row font-mono">
                <span className="project-cat-pill">GO · NETWORKING · TUI</span>
                <span className="project-status-badge status-building">BUILDING</span>
                <span className="project-year">2026</span>
              </div>

              <h3 className="project-title font-display">chatTUI</h3>
              <p className="project-lead-subtitle font-sans">
                Modern, Lightweight Discord/Slack-Inspired Terminal Chat in Go
              </p>

              <p className="project-paragraph font-body">
                Built from scratch in Go with Charm's Bubble Tea (Elm architecture) and Lip Gloss styling. 
                Features encrypted mesh networking over Tailscale, SQLite message persistence, channel permissions, and full keyboard ergonomics.
              </p>

              {/* Interactive ASCII Terminal Preview */}
              <div className="terminal-window chat-terminal-preview font-mono">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#6FD7E8' }}>chatTUI ● Tailscale Mesh: Connected</span>
                  <div className="chat-tabs-toggle">
                    <button 
                      className={`chat-tab-btn ${activeTabChat === 'global' ? 'active' : ''}`}
                      onClick={() => setActiveTabChat('global')}
                    >
                      #global
                    </button>
                    <button 
                      className={`chat-tab-btn ${activeTabChat === 'dev' ? 'active' : ''}`}
                      onClick={() => setActiveTabChat('dev')}
                    >
                      #dev
                    </button>
                  </div>
                </div>

                <div className="chat-body-preview">
                  {activeTabChat === 'global' ? (
                    <>
                      <div className="chat-line"><span className="time">10:32</span> <span className="user">alex:</span> welcome to chatTUI on Tailscale</div>
                      <div className="chat-line"><span className="time">10:33</span> <span className="user-rtoms">rtoms:</span> low latency SQLite store active!</div>
                      <div className="chat-line system-line"><span className="system-dot">●</span> maya joined #global via encrypted mesh</div>
                      <div className="chat-input-line">&gt; Type a message or /help... <span className="blinking-cursor">█</span></div>
                    </>
                  ) : (
                    <>
                      <div className="chat-line"><span className="time">11:04</span> <span className="user-rtoms">rtoms:</span> bubble tea model update loops running smooth</div>
                      <div className="chat-line"><span className="time">11:05</span> <span className="user">dev_node:</span> tailscale daemon verified on Ubuntu</div>
                      <div className="chat-input-line">&gt; Type a message or /help... <span className="blinking-cursor">█</span></div>
                    </>
                  )}
                </div>
              </div>

              <div className="project-tech-tags font-mono">
                {["Go", "Bubble Tea", "Lip Gloss", "SQLite", "Tailscale", "Docker", "TCP"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-action-row font-mono">
                <a 
                  href="https://github.com/rtomswastaken/chattui" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <GitHubIcon size={15} />
                  <span>VIEW REPO</span>
                </a>
                <button 
                  className="btn-ghost" 
                  onClick={onOpenTerminal}
                >
                  <Terminal size={14} />
                  <span>Run `chattui` in Terminal</span>
                </button>
              </div>
            </div>
          </div>

          {/* ==============================================================
              PROJECT 03: Oriah IDE (Agentic Terminal IDE)
              ============================================================== */}
          <div className="portfolio-board-cell col-span-5 editorial-board oriah-board" data-cursor="action" data-cursor-label="ORIAH">
            <div className="board-top-tape font-mono">
              <span>DEVELOPER TOOLS</span>
              <span>NO. 03 // ORIAH-IDE</span>
            </div>

            <div className="card-padding">
              <div className="project-category-row font-mono">
                <span className="project-cat-pill">PYTHON · TEXTUAL 8.2</span>
                <span className="project-status-badge status-building">BUILDING</span>
                <span className="project-year">2026</span>
              </div>

              <h3 className="project-title font-display">Oriah IDE</h3>
              <p className="project-lead-subtitle font-sans">
                Cursor-Inspired AI Agent Terminal IDE
              </p>

              <p className="project-paragraph font-body">
                Polished terminal workspace featuring a strict 4-quadrant architecture: live directory tree, Pygments-highlighted editor, interactive task checklist with progress bars, and autonomous agent console.
              </p>

              {/* 4-Quadrant Visual Diagram */}
              <div className="oriah-quadrant-diagram font-mono">
                <div className="quadrant-box q-tree">
                  <span className="q-label">📁 DIRECTORY TREE</span>
                  <span className="q-sub">File explorer &amp; tabs</span>
                </div>
                <div className="quadrant-box q-editor">
                  <span className="q-label">📝 CODE EDITOR</span>
                  <span className="q-sub">Pygments syntax highlighter</span>
                </div>
                <div className="quadrant-box q-checklist">
                  <span className="q-label">📋 AGENT CHECKLIST</span>
                  <span className="q-sub">[x] Task progress bar</span>
                </div>
                <div className="quadrant-box q-terminal">
                  <span className="q-label">🤖 AGENT MODE</span>
                  <span className="q-sub">Interactive prompt &amp; run</span>
                </div>
              </div>

              <div className="project-tech-tags font-mono">
                {["Python", "Textual 8.2", "Pygments", "Rich", "AI Agents"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-action-row font-mono">
                <a 
                  href="https://github.com/rtomswastaken/Oriah-IDE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <GitHubIcon size={15} />
                  <span>VIEW REPO</span>
                </a>
              </div>
            </div>
          </div>

          {/* ==============================================================
              PROJECT 04: EcoClassroom (Live Web App)
              ============================================================== */}
          <div className="portfolio-board-cell col-span-6 editorial-board eco-board" data-cursor="action" data-cursor-label="ECO">
            <div className="board-top-tape font-mono">
              <span className="badge-deployed">● PRODUCTION DEPLOYMENT</span>
              <span>NO. 04 // ECOCLASSROOM</span>
            </div>

            <div className="card-padding">
              <div className="project-category-row font-mono">
                <span className="project-cat-pill">WEB APPLICATION</span>
                <span className="project-status-badge status-deployed">DEPLOYED</span>
                <span className="project-year">2026</span>
              </div>

              <h3 className="project-title font-display">EcoClassroom</h3>
              <p className="project-lead-subtitle font-sans">
                Gamified Environmental Sustainability Web App
              </p>

              <p className="project-paragraph font-body">
                "Small Actions. Big Impact." Gamified sustainability platform empowering students and educators with habit milestone tracking, achievement confetti, and real-time classroom analytics. Deployed on Vercel.
              </p>

              <div className="eco-stats-banner font-mono">
                <div className="eco-pill">
                  <span className="eco-icon">🌍</span>
                  <span>STUDENT &amp; TEACHER PORTALS</span>
                </div>
                <div className="eco-pill">
                  <span className="eco-icon">🏆</span>
                  <span>CONFUSED MILESTONES &amp; BADGES</span>
                </div>
              </div>

              <div className="project-tech-tags font-mono">
                {["React 19", "Vite", "JavaScript", "Lucide", "Canvas Confetti", "Vercel"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-action-row font-mono">
                <a 
                  href="https://eco-classroom.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={15} />
                  <span>LAUNCH APP ↗</span>
                </a>
                <a 
                  href="https://github.com/rtomswastaken/eco-classroom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <GitHubIcon size={14} />
                  <span>REPO</span>
                </a>
              </div>
            </div>
          </div>

          {/* ==============================================================
              PROJECT 05: npx rtoms (Terminal CLI Portfolio)
              ============================================================== */}
          <div className="portfolio-board-cell col-span-6 editorial-board npx-board" data-cursor="action" data-cursor-label="CLI">
            <div className="board-top-tape font-mono">
              <span>NPM REGISTRY</span>
              <span>NO. 05 // NPX RTOMS</span>
            </div>

            <div className="card-padding">
              <div className="project-category-row font-mono">
                <span className="project-cat-pill">TYPESCRIPT · INK · REACT</span>
                <span className="project-status-badge status-deployed">PUBLISHED</span>
                <span className="project-year">2026</span>
              </div>

              <h3 className="project-title font-display">npx rtoms</h3>
              <p className="project-lead-subtitle font-sans">
                Interactive Command-Line Terminal Portfolio
              </p>

              <p className="project-paragraph font-body">
                A custom command-line portfolio runnable in any terminal with `npx rtoms`. 
                Built with TypeScript, React, and Ink to deliver an interactive keyboard-navigable CLI resume.
              </p>

              <div className="npx-cli-box font-mono">
                <span className="cli-prompt">$</span>
                <span className="cli-code">npx rtoms</span>
                <button 
                  className="cli-run-btn"
                  onClick={onOpenTerminal}
                  title="Run now in interactive modal"
                >
                  <Play size={12} />
                  <span>SIMULATE NOW</span>
                </button>
              </div>

              <div className="project-tech-tags font-mono">
                {["TypeScript", "React", "Ink", "Chalk", "Node.js", "npm"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-action-row font-mono">
                <a 
                  href="https://github.com/rtomswastaken/richardsen-thomas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <GitHubIcon size={15} />
                  <span>VIEW REPO</span>
                </a>
                <button 
                  className="btn-ghost"
                  onClick={onOpenTerminal}
                >
                  <Terminal size={14} />
                  <span>Interactive Terminal</span>
                </button>
              </div>
            </div>
          </div>

          {/* ==============================================================
              PROJECT 06, 07, 08: Supporting Projects Row
              ============================================================== */}
          <div className="portfolio-board-cell col-span-4 editorial-board" data-cursor="hover">
            <div className="board-top-tape font-mono">
              <span>ALGORITHMS</span>
              <span>NO. 06</span>
            </div>
            <div className="card-padding">
              <div className="project-category-row font-mono">
                <span className="project-status-badge status-ideation">IDEATION</span>
                <span className="project-year">2026</span>
              </div>
              <h4 className="project-title-medium font-sans">Time Table Thingy</h4>
              <p className="project-paragraph-small font-body">
                Intelligent academic scheduling engine optimizing faculty and room allocations using constraint satisfaction algorithms.
              </p>
              <div className="project-tech-tags font-mono">
                {["Algorithms", "Scheduling", "CSP", "Python"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <a 
                href="https://github.com/rtomswastaken/Time-Table-Thingy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="card-simple-link font-mono"
              >
                <span>GitHub Archive</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="portfolio-board-cell col-span-4 editorial-board" data-cursor="hover">
            <div className="board-top-tape font-mono">
              <span>CONTAINERIZATION</span>
              <span>NO. 07</span>
            </div>
            <div className="card-padding">
              <div className="project-category-row font-mono">
                <span className="project-status-badge status-deployed">COMPLETE</span>
                <span className="project-year">2026</span>
              </div>
              <h4 className="project-title-medium font-sans">Random Quote (Docker)</h4>
              <p className="project-paragraph-small font-body">
                Interactive Python terminal app and hands-on containerization workshop teaching Docker fundamentals and image layers.
              </p>
              <div className="project-tech-tags font-mono">
                {["Python", "Docker", "Rich", "Pyfiglet"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <a 
                href="https://github.com/rtomswastaken/random-quote" 
                target="_blank" 
                rel="noopener noreferrer"
                className="card-simple-link font-mono"
              >
                <span>GitHub Tutorial</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="portfolio-board-cell col-span-4 editorial-board" data-cursor="hover">
            <div className="board-top-tape font-mono">
              <span>FOUNDATIONS</span>
              <span>NO. 08 &amp; 09</span>
            </div>
            <div className="card-padding">
              <div className="project-category-row font-mono">
                <span className="project-status-badge status-deployed">ARCHIVE</span>
                <span className="project-year">2025–2026</span>
              </div>
              <h4 className="project-title-medium font-sans">Python GUI &amp; Utilities</h4>
              <p className="project-paragraph-small font-body">
                Tkinter desktop explorations, CLI tools, password generators, and foundational algorithmic exercises.
              </p>
              <div className="project-tech-tags font-mono">
                {["Python", "Tkinter", "GUI", "CLI"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <a 
                href="https://github.com/rtomswastaken/Python-GUI-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="card-simple-link font-mono"
              >
                <span>GUI Repo</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
