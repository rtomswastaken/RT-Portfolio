import { ArrowUpRight, ExternalLink, Terminal } from 'lucide-react';
import { GitHubIcon } from '../components/Icons';

export default function SelectedWork() {
  const projects = [
    {
      num: "01",
      title: "ZOE ALPHA",
      tag: "LOCAL AI ASSISTANT",
      summary: "100% Local AI Computer Assistant for macOS that sees your screen, listens, and physically controls your Mac using native Quartz events. Zero cloud APIs.",
      tech: ["Python", "PyObjC", "Quartz", "Qwen3:14b", "MiniCPM-V", "faster-whisper"],
      githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1",
      demoUrl: null,
      layout: "card-layout-left",
      visualTheme: "project-pane-teal",
      visualType: "notch"
    },
    {
      num: "02",
      title: "CHATTUI",
      tag: "TERMINAL PLATFORM",
      summary: "A modern, lightweight terminal chat platform built from scratch in Go with Charm's Bubble Tea, Lip Gloss styling, and private mesh networking over Tailscale.",
      tech: ["Go", "Bubble Tea", "Lip Gloss", "SQLite", "Tailscale", "Docker"],
      githubUrl: "https://github.com/rtomswastaken/chattui",
      demoUrl: null,
      layout: "card-layout-right",
      visualTheme: "project-pane-navy",
      visualType: "terminal"
    },
    {
      num: "03",
      title: "ORIAH IDE",
      tag: "DEVELOPER WORKSPACE",
      summary: "Cursor-inspired AI Agent Terminal IDE built with Python Textual 8.2 & Pygments, featuring a strict 4-quadrant layout for autonomous code generation and checklists.",
      tech: ["Python", "Textual 8.2", "Pygments", "Rich", "AI Agents"],
      githubUrl: "https://github.com/rtomswastaken/Oriah-IDE",
      demoUrl: null,
      layout: "card-layout-left",
      visualTheme: "project-pane-violet",
      visualType: "ide"
    },
    {
      num: "04",
      title: "ECOCLASSROOM",
      tag: "LIVE WEB APPLICATION",
      summary: "Gamified environmental classroom platform empowering students and teachers with real-world sustainability tracking: 'Small Actions. Big Impact.' Deployed live on Vercel.",
      tech: ["React 19", "Vite", "JavaScript", "Lucide", "Canvas Confetti"],
      githubUrl: "https://github.com/rtomswastaken/eco-classroom",
      demoUrl: "https://eco-classroom.vercel.app",
      layout: "card-layout-right",
      visualTheme: "project-pane-emerald",
      visualType: "eco"
    }
  ];

  return (
    <section id="work" className="selected-work-section">
      <div className="container">
        
        {/* Simple Playful Section Header */}
        <div className="section-title-wrap">
          <span className="section-label">SELECTED WORK</span>
          <h2 className="section-headline font-poster">FEATURED PROJECTS</h2>
          <p className="section-sublead font-body">
            Four focused things I built from scratch. Code you can inspect right now.
          </p>
        </div>

        {/* Poster Artwork Cards Stack */}
        <div className="projects-poster-stack">
          {projects.map((proj) => (
            <article key={proj.num} className={`project-artwork-card ${proj.layout}`}>
              
              {/* Visual Artwork Showcase Pane */}
              <div className={`project-visual-pane ${proj.visualTheme}`}>
                {proj.visualType === 'notch' && (
                  <div className="notch-graphic-showcase">
                    <div className="notch-screen-bezel">
                      <div className="bezel-notch" />
                      <div className="bezel-content-pulse">
                        <span>Z-O-E // SCREEN VISION</span>
                        <span className="bezel-sub">100% On-Device Metal Acceleration</span>
                      </div>
                    </div>
                  </div>
                )}

                {proj.visualType === 'terminal' && (
                  <div className="terminal-graphic-showcase">
                    <div className="term-head">
                      <span className="dot dot-r" />
                      <span className="dot dot-y" />
                      <span className="dot dot-g" />
                      <span style={{ fontSize: '0.72rem', color: '#8FD4EE', marginLeft: 'auto' }}>chattui : tailscale-mesh</span>
                    </div>
                    <div className="term-body">
                      <div>● Connected to #global</div>
                      <div className="term-line-active">&gt; rtoms: bubble tea + tailscale running!</div>
                      <div style={{ color: '#537A99' }}>&gt; Type message or /help... █</div>
                    </div>
                  </div>
                )}

                {proj.visualType === 'ide' && (
                  <div className="ide-graphic-showcase">
                    <div className="ide-box">
                      <span className="ide-title">📁 DIRECTORY</span>
                      <span className="ide-desc">File tree tabs</span>
                    </div>
                    <div className="ide-box box-active">
                      <span className="ide-title">📝 EDITOR</span>
                      <span className="ide-desc">Pygments syntax</span>
                    </div>
                    <div className="ide-box">
                      <span className="ide-title">📋 CHECKLIST</span>
                      <span className="ide-desc">[x] Agent reports</span>
                    </div>
                    <div className="ide-box">
                      <span className="ide-title">🤖 AGENT MODE</span>
                      <span className="ide-desc">Autonomous loop</span>
                    </div>
                  </div>
                )}

                {proj.visualType === 'eco' && (
                  <div className="eco-graphic-showcase">
                    <span className="eco-globe-badge">🌍</span>
                    <span className="eco-badge-tag">LIVE ON VERCEL ↗</span>
                  </div>
                )}
              </div>

              {/* Story & Links Pane */}
              <div className="project-text-pane">
                <div className="project-meta-row">
                  <span className="project-num-big">{proj.num}</span>
                  <span className="project-badge-pill">{proj.tag}</span>
                </div>

                <h3 className="project-heading font-poster">{proj.title}</h3>

                <p className="project-summary font-body">{proj.summary}</p>

                <div className="project-tech-chips font-sans">
                  {proj.tech.map((t) => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </div>

                <div className="project-action-links">
                  {proj.demoUrl && (
                    <a 
                      href={proj.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-action-main"
                    >
                      <span>LAUNCH APP</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-action-main"
                  >
                    <GitHubIcon size={16} />
                    <span>VIEW REPO</span>
                  </a>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
