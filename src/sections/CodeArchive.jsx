import React from 'react';
import { ExternalLink, GitBranch, Terminal, Star, ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from '../components/Icons';
import { profileData } from '../data/profile';

export default function CodeArchive() {
  const verifiedRepositories = [
    {
      year: "2026",
      name: "zoe-alpha-v0.1",
      lang: "Python",
      langColor: "#3572A5",
      desc: "Zoe Alpha v0.1 — 100% Local AI Computer Assistant for macOS (Voice + Vision + MacBook Notch UI)",
      githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1",
      status: "BUILDING"
    },
    {
      year: "2026",
      name: "chattui",
      lang: "Go",
      langColor: "#00ADD8",
      desc: "Modern Discord/Slack-inspired terminal chat platform built with Charm's Bubble Tea, Lip Gloss, SQLite, and Tailscale mesh.",
      githubUrl: "https://github.com/rtomswastaken/chattui",
      status: "BUILDING"
    },
    {
      year: "2026",
      name: "Oriah-IDE",
      lang: "Python",
      langColor: "#3572A5",
      desc: "A fast, clean Cursor-inspired AI Agent Terminal IDE built with Python Textual 8.2, Pygments, and 4-quadrant layout.",
      githubUrl: "https://github.com/rtomswastaken/Oriah-IDE",
      status: "BUILDING"
    },
    {
      year: "2026",
      name: "eco-classroom",
      lang: "JavaScript",
      langColor: "#F7DF1E",
      desc: "Gamified environmental classroom web app for students and teachers: 'Small Actions. Big Impact.' Deployed on Vercel.",
      githubUrl: "https://github.com/rtomswastaken/eco-classroom",
      status: "DEPLOYED"
    },
    {
      year: "2026",
      name: "richardsen-thomas",
      lang: "TypeScript",
      langColor: "#3178C6",
      desc: "Interactive command-line portfolio application runnable directly via 'npx rtoms', built with Ink, React, and Node.js.",
      githubUrl: "https://github.com/rtomswastaken/richardsen-thomas",
      status: "PUBLISHED"
    },
    {
      year: "2026",
      name: "random-quote",
      lang: "Python",
      langColor: "#3572A5",
      desc: "Hands-on Docker workshop: Python Random Quote generator teaching Dockerfile recipes, image building, and container isolation.",
      githubUrl: "https://github.com/rtomswastaken/random-quote",
      status: "COMPLETE"
    },
    {
      year: "2026",
      name: "Time-Table-Thingy",
      lang: "System Design",
      langColor: "#7B6CFF",
      desc: "Intelligent timetable generation system optimizing academic scheduling through automated constraint-solving and rule engines.",
      githubUrl: "https://github.com/rtomswastaken/Time-Table-Thingy",
      status: "IDEATION"
    },
    {
      year: "2026",
      name: "Basic-Python-Projects",
      lang: "Python",
      langColor: "#3572A5",
      desc: "Collection of practical beginner-to-intermediate utility scripts including password generators, game logic, and delivery simulation.",
      githubUrl: "https://github.com/rtomswastaken/Basic-Python-Projects",
      status: "ARCHIVE"
    },
    {
      year: "2025",
      name: "Python-GUI-app",
      lang: "Python",
      langColor: "#3572A5",
      desc: "Showcase of what is possible with Python's Tkinter library through interactive desktop application development.",
      githubUrl: "https://github.com/rtomswastaken/Python-GUI-app",
      status: "ARCHIVE"
    },
    {
      year: "2021",
      name: "rtomswastaken",
      lang: "Markdown / Config",
      langColor: "#94A9BE",
      desc: "Master profile repository, configuration files, and visual identity assets for Richardsen Thomas on GitHub.",
      githubUrl: "https://github.com/rtomswastaken/rtomswastaken",
      status: "PROFILE"
    }
  ];

  return (
    <section id="archive" className="code-archive-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">07</span>
            <span className="track-slash">/</span>
            <span className="track-title">CODE ARCHIVE</span>
          </div>
          <div className="track-right hide-mobile">
            <span>PUBLIC REPOSITORIES CHRONOLOGY</span>
            <span>GITHUB: @{profileData.githubUsername}</span>
          </div>
        </div>

        {/* Section Intro */}
        <div className="archive-intro-row">
          <div>
            <h2 className="archive-heading font-display">
              OPEN SOURCE <span className="text-highlight-cyan">LOG</span> &amp; <span className="text-highlight-violet">COMMITS.</span>
            </h2>
            <p className="archive-subtext font-body">
              A chronological index of open-source repositories maintained by Richardsen Thomas.
              No fabricated contributions or exaggerated claims.
            </p>
          </div>

          <a 
            href={profileData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            data-cursor="hover"
          >
            <GitHubIcon size={15} />
            <span>VISIT GITHUB PROFILE ↗</span>
          </a>
        </div>

        {/* Editorial Table / Archive List */}
        <div className="editorial-archive-board editorial-board">
          <div className="archive-table-header font-mono hide-mobile">
            <span className="col-year">YEAR</span>
            <span className="col-repo">REPOSITORY</span>
            <span className="col-lang">PRIMARY STACK</span>
            <span className="col-desc">SUMMARY &amp; OBJECTIVE</span>
            <span className="col-action">LINK</span>
          </div>

          <div className="archive-list-body">
            {verifiedRepositories.map((repo, idx) => (
              <a
                key={repo.name}
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="archive-row-item font-body"
                data-cursor="hover"
              >
                <div className="row-year font-mono">{repo.year}</div>

                <div className="row-name font-display">
                  <div className="name-wrapper">
                    <span>{repo.name}</span>
                    <span className={`status-pill status-${repo.status.toLowerCase()} hide-desktop font-mono`}>
                      {repo.status}
                    </span>
                  </div>
                </div>

                <div className="row-lang font-mono">
                  <span className="lang-circle" style={{ backgroundColor: repo.langColor }} />
                  <span>{repo.lang}</span>
                </div>

                <div className="row-desc">
                  {repo.desc}
                </div>

                <div className="row-action font-mono">
                  <span className="action-text">OPEN</span>
                  <ArrowUpRight size={14} className="action-icon" />
                </div>
              </a>
            ))}
          </div>

          {/* Table Footer */}
          <div className="archive-table-footer font-mono">
            <span>INDEX COMPLETE // 10 VERIFIED ENTRIES</span>
            <span className="hide-mobile">SOURCE OF TRUTH: API.GITHUB.COM/USERS/RTOMSWASTAKEN</span>
          </div>
        </div>

      </div>
    </section>
  );
}
