import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';

export default function TerminalModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: `RTOMS Terminal Environment [v1.0.1 - Darwin x86_64]` },
    { type: 'system', text: `Connected to Richardsen's interactive workspace.` },
    { type: 'system', text: `Type 'help' or click suggestions below. You can also run 'npx rtoms' in your real terminal!` }
  ]);
  const [inputVal, setInputVal] = useState('npx rtoms');
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npx rtoms');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    const newHistory = [...history, { type: 'user', text: `$ ${raw}` }];

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'npx rtoms' || lower === 'rtoms') {
      newHistory.push({
        type: 'output',
        text: `
  ██████╗ ████████╗ ██████╗ ███╗   ███╗███████╗
  ██╔══██╗╚══██╔══╝██╔═══██╗████╗ ████║██╔════╝
  ██████╔╝   ██║   ██║   ██║██╔████╔██║███████╗
  ██╔══██╗   ██║   ██║   ██║██║╚██╔╝██║╚════██║
  ██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║███████║
  ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚══════╝
  
  [RTOMS] RICHARDSEN THOMAS — DESIGNER · DEVELOPER · DREAMER
  Location: Pathanamthitta, India
  Verified Stack: Go · Python · TypeScript · React · Bubble Tea · SQLite
  
  Interactive Features:
  1. Zoe Alpha v0.1   -> 100% Local macOS AI Assistant (Voice + Vision)
  2. chatTUI          -> Terminal Chat Platform in Go (Bubble Tea + Tailscale)
  3. Oriah IDE        -> Cursor-inspired 4-Quadrant Terminal IDE
  4. EcoClassroom     -> Gamified Sustainability Web App (Live on Vercel)
  
  Run 'projects' or 'contact' for more details.`
      });
    } else if (lower === 'help') {
      newHistory.push({
        type: 'output',
        text: `Available Commands:
  • npx rtoms    : Run the interactive Ink terminal portfolio
  • projects     : List verified featured projects & architectures
  • zoe          : Inspect Zoe Alpha local assistant status & architecture
  • chattui      : Connect to simulated chatTUI terminal preview
  • contact      : Output direct verified contact channels
  • clear        : Clear console output`
      });
    } else if (lower === 'projects') {
      const summary = projectsData.map(p => `• [${p.number}] ${p.title} (${p.tech.slice(0, 3).join(', ')}) -> ${p.status}`).join('\n');
      newHistory.push({ type: 'output', text: `Verified Project Registry:\n${summary}` });
    } else if (lower === 'zoe' || lower.includes('zoe status')) {
      newHistory.push({
        type: 'output',
        text: `[ZOE ALPHA v0.1 STATUS]
  Mode: 100% Local (Metal/MPS Hardware Accelerated)
  LLM Engine: Qwen3:14b via Ollama
  Vision: MiniCPM-V via Ollama
  Speech-to-Text: faster-whisper (int8)
  Notch Overlay: Active (PyObjC Cocoa Non-Activating Borderless)
  Zero Cloud APIs. Zero telemetry leaks.`
      });
    } else if (lower === 'chattui') {
      newHistory.push({
        type: 'output',
        text: `[chatTUI Daemon]
  Architecture: Charm Bubble Tea + Lip Gloss + SQLite
  Network Mesh: Tailscale Private VPN
  Rooms Available: #global, #dev, #announcements
  Ready to launch client binary.`
      });
    } else if (lower === 'contact') {
      newHistory.push({
        type: 'output',
        text: `Contact & Channels:
  • GitHub    : ${profileData.social.github}
  • LinkedIn  : ${profileData.social.linkedin}
  • Instagram : ${profileData.social.instagram}
  • Email     : ${profileData.social.email}`
      });
    } else {
      newHistory.push({
        type: 'error',
        text: `zsh: command not found: ${raw}. Type 'help' for available commands.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

  return (
    <div className="terminal-modal-backdrop" onClick={onClose}>
      <div 
        className="terminal-modal-card" 
        onClick={e => e.stopPropagation()}
        data-cursor="terminal"
      >
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="terminal-dot dot-red" onClick={onClose} style={{ cursor: 'pointer' }} />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
          </div>

          <div className="terminal-title">
            <Terminal size={14} color="#6FD7E8" />
            <span>rtoms@apple-silicon: ~ (zsh)</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button 
              className="terminal-copy-btn" 
              onClick={handleCopyCmd}
              title="Copy 'npx rtoms' to clipboard"
            >
              {copied ? <Check size={14} color="#3ECF8E" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy npx rtoms'}</span>
            </button>
            <button className="terminal-close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body font-mono">
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line line-${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="terminal-chips font-mono">
          <span className="chips-label">Quick run:</span>
          {['npx rtoms', 'projects', 'zoe', 'chattui', 'contact', 'clear'].map(cmd => (
            <button 
              key={cmd} 
              className="chip-btn"
              onClick={() => executeCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="terminal-input-bar font-mono">
          <span className="prompt-symbol">rtoms ❯</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. npx rtoms, projects, help)..."
            spellCheck="false"
            autoFocus
          />
          <button 
            className="terminal-send-btn"
            onClick={() => executeCommand(inputVal)}
          >
            <CornerDownLeft size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
