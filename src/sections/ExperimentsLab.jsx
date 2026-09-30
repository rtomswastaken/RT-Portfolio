import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Cpu, Sparkles, Activity, Layers } from 'lucide-react';

export default function ExperimentsLab({ onOpenTerminal }) {
  const [activeExp, setActiveExp] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [expLogs, setExpLogs] = useState([]);

  const experiments = [
    {
      id: "notch-ui",
      number: "EXP-01",
      title: "MacBook Notch UI Audio-Reactive Pulse",
      status: "BUILDING",
      domain: "macOS Cocoa / PyObjC",
      summary: "Anchoring non-activating borderless NSWindow to the Apple Silicon camera notch with audio-reactive gradient pulses.",
      codeSnippet: `// PyObjC Notch Anchor
window = NSWindow.alloc().initWithContentRect_styleMask_backing_defer_(
    notchRect, NSWindowStyleMaskBorderless, NSBackingStoreBuffered, False
)
window.setLevel_(NSStatusWindowLevel + 1)
window.setCollectionBehavior_(NSWindowCollectionBehaviorCanJoinAllSpaces)`,
      defaultLogs: [
        "[02:14:01] Initializing PyObjC Cocoa Bridge on Darwin arm64...",
        "[02:14:02] Pinned NSWindow to main screen notch: Rect(x=620, y=1176, w=200, h=34)",
        "[02:14:03] Audio amplitude listener attached to CoreAudio default input stream.",
        "[02:14:04] Gradient pulse rendering active: #6FD7E8 -> #7B6CFF"
      ]
    },
    {
      id: "computer-loop",
      number: "EXP-02",
      title: "Autonomous Screen Perception & Motor Loop",
      status: "BUILDING",
      domain: "Computer Vision & Quartz",
      summary: "Simulating human-like cubic-Bezier mouse curves mapped to Retina display coordinates without triggering anti-bot flags.",
      codeSnippet: `def cubic_bezier_curve(p0, p1, p2, p3, steps=30):
    # Generates organic mouse acceleration curves
    for t in [i / steps for i in range(steps)]:
        x = (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0]
        y = (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1]
        post_quartz_mouse_event(x, y)`,
      defaultLogs: [
        "[02:14:10] Capturing viewport buffer via CoreGraphics Display Stream...",
        "[02:14:11] MiniCPM-V local visual bounding box detected: Button('Submit', conf=0.98)",
        "[02:14:12] Interpolating cubic-Bezier control points: (120,400) -> (780,210)",
        "[02:14:13] Quartz dispatch completed. Screen state verified unchanged."
      ]
    },
    {
      id: "mesh-chat",
      number: "EXP-03",
      title: "Zero-Cloud Tailscale P2P Message Mesh",
      status: "EXPLORING",
      domain: "Go / WireGuard / Bubble Tea",
      summary: "Direct peer-to-peer terminal chat streaming over private WireGuard tunnels without central server logging.",
      codeSnippet: `// chatTUI Tailscale Mesh Listener
srv := &tsnet.Server{
    Hostname: "chattui-node-01",
    Ephemeral: true,
}
defer srv.Close()
ln, err := srv.Listen("tcp", ":8443")`,
      defaultLogs: [
        "[02:14:20] Initializing tsnet daemon instance...",
        "[02:14:21] Tailscale AuthKey accepted. Registered ephemeral peer node: 100.101.42.18",
        "[02:14:22] TCP socket bound on :8443. Listening for Bubble Tea client handshakes.",
        "[02:14:23] SQLite WAL mode confirmed: WAL journal file synced."
      ]
    }
  ];

  const current = experiments[activeExp];

  const runExperiment = () => {
    setIsRunning(true);
    setExpLogs(["[START] Initiating execution cycle..."]);

    current.defaultLogs.forEach((log, index) => {
      setTimeout(() => {
        setExpLogs(prev => [...prev, log]);
        if (index === current.defaultLogs.length - 1) {
          setIsRunning(false);
          setExpLogs(prev => [...prev, "[COMPLETE] Cycle ended successfully. Zero errors reported."]);
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <section id="experiments" className="experiments-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">08</span>
            <span className="track-slash">/</span>
            <span className="track-title">CURRENTLY BUILDING &amp; EXPERIMENTS</span>
          </div>
          <div className="track-right hide-mobile">
            <span>LAB BENCH // LIVE PROTOCOL</span>
            <span>VERIFIED ON GITHUB</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="experiments-intro">
          <h2 className="experiments-title font-display">
            THE DIGITAL <span className="text-highlight-cyan">LAB</span> &amp; <span className="text-highlight-violet">TESTBED.</span>
          </h2>
          <p className="experiments-desc font-body">
            Code in active motion. Real prototypes exploring physical UI cues, native Darwin API hooks, and local machine intelligence.
          </p>
        </div>

        {/* Interactive Lab Bench Layout */}
        <div className="experiments-bench-grid editorial-board">
          
          {/* Left Column: Experiments Navigation & Synopsis */}
          <div className="bench-sidebar-col font-mono">
            <div className="bench-sidebar-header">
              <span>ACTIVE EXPERIMENTS</span>
              <span className="live-blink-dot" />
            </div>

            <div className="bench-exp-list">
              {experiments.map((exp, idx) => (
                <div 
                  key={exp.id}
                  className={`exp-select-card ${activeExp === idx ? 'card-selected' : ''}`}
                  onClick={() => {
                    setActiveExp(idx);
                    setExpLogs([]);
                    setIsRunning(false);
                  }}
                  data-cursor="hover"
                >
                  <div className="exp-top-line">
                    <span className="exp-num">{exp.number}</span>
                    <span className={`status-pill status-${exp.status.toLowerCase()}`}>{exp.status}</span>
                  </div>
                  <div className="exp-title font-sans">{exp.title}</div>
                  <div className="exp-domain">{exp.domain}</div>
                </div>
              ))}
            </div>

            <div className="bench-launch-terminal-box">
              <span>WANT FULL SHELL ACCESS?</span>
              <button 
                className="btn-ghost launch-full-btn"
                onClick={onOpenTerminal}
                data-cursor="action"
                data-cursor-label="CLI"
              >
                <Terminal size={14} />
                <span>Launch Interactive Shell</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Code & Execution Console */}
          <div className="bench-main-col">
            
            {/* Experiment Details Header */}
            <div className="bench-header-panel font-mono">
              <div>
                <span className="bench-ref-tag" style={{ color: '#6FD7E8' }}>{current.number} // {current.domain}</span>
                <h3 className="bench-active-title font-sans">{current.title}</h3>
                <p className="bench-summary font-body">{current.summary}</p>
              </div>

              <button 
                className={`btn-primary run-simulation-btn ${isRunning ? 'running' : ''}`}
                onClick={runExperiment}
                disabled={isRunning}
                data-cursor="action"
                data-cursor-label={isRunning ? "RUNNING" : "EXECUTE"}
              >
                {isRunning ? <Activity size={15} className="spin-icon" /> : <Play size={15} />}
                <span>{isRunning ? 'EXECUTING...' : 'RUN PROTOTYPE'}</span>
              </button>
            </div>

            {/* Code Snippet Box */}
            <div className="bench-code-box font-mono">
              <div className="code-box-header">
                <span className="code-file-label">SOURCE FRAGMENT: {current.id}.py</span>
                <span>STATUS: VERIFIED LOCAL CODE</span>
              </div>
              <pre className="code-content">
                <code>{current.codeSnippet}</code>
              </pre>
            </div>

            {/* Interactive Live Execution Console */}
            <div className="bench-console-box terminal-window font-mono">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span style={{ fontSize: '0.72rem', color: '#6FD7E8' }}>SIMULATED RUNTIME CONSOLE // RTOMS-LAB</span>
                <span className="console-status-text">
                  {isRunning ? '● ACTIVE STREAM' : expLogs.length > 0 ? '✓ READY' : 'IDLE'}
                </span>
              </div>

              <div className="bench-console-body">
                {expLogs.length === 0 ? (
                  <div className="empty-console-hint">
                    <span>Click [RUN PROTOTYPE] above to trace live execution telemetry.</span>
                  </div>
                ) : (
                  expLogs.map((lg, i) => (
                    <div key={i} className="console-log-line">
                      <span className="log-arrow">❯</span>
                      <span>{lg}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
