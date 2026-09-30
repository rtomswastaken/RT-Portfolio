import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { TurtleDoodle, WashiTape } from '../components/Doodles';
import { GitHubIcon } from '../components/Icons';

export default function ProjectsPage() {
  const archive = [
    {
      num: "01",
      title: "ZOE ALPHA v0.1",
      desc: "100% Local AI computer assistant for macOS with screen perception, voice reasoning, and native Quartz navigation.",
      tech: ["Python", "PyObjC", "Quartz", "Ollama", "Apple Silicon"],
      githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1",
      demoUrl: null
    },
    {
      num: "02",
      title: "CHATTUI",
      desc: "Modern decentralized terminal chat platform built with Bubble Tea, SQLite, and private mesh networking over Tailscale.",
      tech: ["Go", "Bubble Tea", "Tailscale", "SQLite"],
      githubUrl: "https://github.com/rtomswastaken/chattui",
      demoUrl: null
    },
    {
      num: "03",
      title: "ORIAH IDE",
      desc: "Agentic AI terminal code editor featuring an exact 4-quadrant architecture and interactive progress reports.",
      tech: ["Python", "Textual", "Pygments", "Rich"],
      githubUrl: "https://github.com/rtomswastaken/Oriah-IDE",
      demoUrl: null
    },
    {
      num: "04",
      title: "ECOCLASSROOM",
      desc: "Gamified environmental sustainability web app for students and teachers: 'Small Actions. Big Impact.'",
      tech: ["React 19", "Vite", "Lucide", "Vercel"],
      githubUrl: "https://github.com/rtomswastaken/eco-classroom",
      demoUrl: "https://eco-classroom.vercel.app"
    },
    {
      num: "05",
      title: "NPX RTOMS",
      desc: "Interactive command-line portfolio and developer card runnable on any machine with `npx rtoms`.",
      tech: ["TypeScript", "React", "Ink", "Node.js"],
      githubUrl: "https://github.com/rtomswastaken/richardsen-thomas",
      demoUrl: null
    },
    {
      num: "06",
      title: "TIME TABLE THINGY",
      desc: "Algorithmic academic scheduling and constraint satisfaction engine for conflict-free slot allocation.",
      tech: ["Python", "Algorithms", "Constraint Solving"],
      githubUrl: "https://github.com/rtomswastaken/Time-Table-Thingy",
      demoUrl: null
    },
    {
      num: "07",
      title: "DOCKER WORKSHOP: RANDOM QUOTE",
      desc: "Interactive Python terminal tool and hands-on containerization tutorial for Docker image layering.",
      tech: ["Python", "Docker", "Rich", "DevOps"],
      githubUrl: "https://github.com/rtomswastaken/random-quote",
      demoUrl: null
    },
    {
      num: "08",
      title: "TKINTER GUI SHOWCASE",
      desc: "Native desktop interface design, widget ergonomics, and event-dispatching explorations with Python.",
      tech: ["Python", "Tkinter", "Desktop UI"],
      githubUrl: "https://github.com/rtomswastaken/Python-GUI-app",
      demoUrl: null
    },
    {
      num: "09",
      title: "BASIC PYTHON FOUNDATIONS",
      desc: "Curated collection of foundational software implementations, cryptographic utilities, and CLI tools.",
      tech: ["Python", "CLI", "Data Structures"],
      githubUrl: "https://github.com/rtomswastaken/Basic-Python-Projects",
      demoUrl: null
    }
  ];

  return (
    <div className="archive-page-root">
      
      {/* Top Navigation Bar */}
      <header className="archive-top-bar">
        <div className="container archive-bar-inner">
          <Link to="/" className="back-corner-btn font-quirky">
            <ArrowLeft size={16} />
            <span>BACK TO MY CORNER</span>
          </Link>
          <span className="archive-meta-tag font-hand">
            curated index /
          </span>
        </div>
      </header>

      {/* Main Archive Content */}
      <main className="container archive-main-content">
        
        {/* Header Block with Mascot Companion */}
        <div className="archive-header-spread">
          <div className="archive-title-area">
            <span className="archive-kicker font-hand">what does he build? /</span>
            <h1 className="archive-headline font-quirky">PROJECTS ARCHIVE</h1>
            <p className="archive-intro font-body">
              A curated ledger of software, terminal experiments, and tools I&apos;ve built. 
              Organized, clean, and linked directly to the repositories.
            </p>
          </div>

          <div className="archive-mascot-nest">
            <img src="/assets/avatar.png" alt="Mascot resting" className="archive-avatar-img" />
            <div className="archive-bubble font-hand">
              the organized shelf &rarr;
            </div>
          </div>
        </div>

        {/* Clean Editorial Archive Rows */}
        <div className="archive-ledger-list">
          {archive.map((item) => (
            <article key={item.num} className="archive-ledger-item">
              
              <div className="ledger-num-col">
                <span className="ledger-num font-serif">{item.num}</span>
              </div>

              <div className="ledger-content-col">
                <div className="ledger-header-row">
                  <h2 className="ledger-item-title font-quirky">{item.title}</h2>
                  <div className="ledger-links-group">
                    {item.demoUrl && (
                      <a 
                        href={item.demoUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="ledger-ext-link demo-pill font-quirky"
                        title="Live Demonstration"
                      >
                        <span>LIVE APP</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <a 
                      href={item.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="ledger-ext-link github-pill font-quirky"
                      title="View GitHub Repository"
                    >
                      <GitHubIcon size={14} />
                      <span>GITHUB</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                <p className="ledger-item-desc font-body">
                  {item.desc}
                </p>

                <div className="ledger-tech-tags">
                  {item.tech.map((t) => (
                    <span key={t} className="ledger-tech-tag font-body">{t}</span>
                  ))}
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Footer / Return note */}
        <div className="archive-footer-note">
          <div className="archive-return-box">
            <TurtleDoodle size={28} color="#0B2545" />
            <div className="return-text">
              <span className="font-quirky">Seen enough technical code?</span>
              <p className="font-body">Head back to the playful homepage anytime.</p>
            </div>
            <Link to="/" className="archive-return-link font-quirky">
              <span>RETURN HOME</span>
              <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
            </Link>
          </div>

          <div className="archive-colophon font-body">
            <span>RTOMS · RICHARDSEN THOMAS</span>
            <span>© 2026 · ALL WORK GENUINE &amp; VERIFIED</span>
          </div>
        </div>

      </main>

    </div>
  );
}
