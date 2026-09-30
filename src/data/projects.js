export const projectsData = [
  {
    id: "zoe",
    number: "01",
    title: "Zoe Alpha v0.1",
    subtitle: "100% Local AI Computer Assistant for macOS",
    category: "AI & OPERATING SYSTEMS",
    status: "BUILDING",
    year: "2026",
    featured: true,
    gridSpan: "span-2",
    description: "An autonomous, 100% local computer assistant for Apple Silicon that sees, listens, and takes physical control of macOS through native Quartz events and cubic-Bezier mouse curves. Runs zero cloud APIs.",
    details: [
      "Metal/MPS accelerated local reasoning with Qwen3:14b & MiniCPM-V via Ollama",
      "Native PyObjC borderless overlay anchored to the physical MacBook Pro display notch",
      "Audio-reactive gradient pulsing with local STT (faster-whisper) and NSSpeech TTS",
      "Autonomous 'Plan → Act → Observe' computer use loop with episodic SQLite memory"
    ],
    tech: ["Python", "PyObjC", "Quartz", "Ollama", "Qwen3", "MiniCPM-V", "faster-whisper", "SQLite", "Apple Silicon"],
    githubUrl: "https://github.com/rtomswastaken/zoe-alpha-v0.1",
    demoUrl: null,
    highlightBadge: "LOCAL AI · NO CLOUD",
    architecture: `MacBook Notch Glow ──> Voice VAD (faster-whisper) ──> Qwen3:14b ──> Quartz Mouse/Keyboard (Cubic-Bezier) ──> Verification Loop`,
    colorAccent: "#6FD7E8"
  },
  {
    id: "chattui",
    number: "02",
    title: "chatTUI",
    subtitle: "Modern Decentralized Terminal Chat Platform",
    category: "SYSTEMS & NETWORKING",
    status: "BUILDING",
    year: "2026",
    featured: true,
    gridSpan: "span-2",
    description: "A lightweight, Discord/Slack-inspired terminal chat platform built from scratch in Go. Features rich keyboard-driven TUI navigation, channel rooms, SQLite persistence, and private mesh networking over Tailscale.",
    details: [
      "Built with Charm's Bubble Tea (Elm architecture) & Lip Gloss styling",
      "Private encrypted multi-node communication running over Tailscale VPN",
      "Zero-latency SQLite message store with channel permissions & moderation",
      "Full keyboard ergonomics: Ctrl+K search, Ctrl+N DMs, slash commands, and Docker support"
    ],
    tech: ["Go", "Bubble Tea", "Lip Gloss", "SQLite", "Tailscale", "Docker", "TCP", "Concurrency"],
    githubUrl: "https://github.com/rtomswastaken/chattui",
    demoUrl: null,
    highlightBadge: "GO · BUBBLE TEA · TAILSCALE",
    asciiPreview: `┌───────────────────────────────────────────────┐
│ chatTUI                          ● Connected  │
├──────────────┬────────────────────────────────┤
│ CHATS        │ # global                       │
│ ● global     │ 10:32 alex: welcome to chatTUI │
│ ● dev        │ 10:33 rtoms: testing tailscale │
│ ROOMS        │                                │
│   # coding   │ > Type a message or /help...   │
└──────────────┴────────────────────────────────┘`,
    colorAccent: "#00ADD8"
  },
  {
    id: "oriah-ide",
    number: "03",
    title: "Oriah IDE",
    subtitle: "Agentic AI Terminal IDE (4-Quadrant Architecture)",
    category: "DEVELOPER TOOLS",
    status: "BUILDING",
    year: "2026",
    featured: true,
    gridSpan: "span-1",
    description: "A fast, clean, and polished Cursor-inspired AI Agent Terminal IDE built with Python Textual 8.2 and Pygments. Unifies multi-tab syntax editing, interactive agent checklists, and terminal execution in a single workspace.",
    details: [
      "Exact 4-Quadrant UI Architecture: Workspace tree, Code editor, Checklist, and Agent terminal",
      "Interactive agent report tab with real-time checkbox progress tracking",
      "Multi-language syntax highlighting with Pygments and Rich formatting",
      "Dual-mode execution switching between autonomous AI Agent Mode and standard shell console"
    ],
    tech: ["Python", "Textual 8.2", "Pygments", "Rich", "AI Agents", "TUI"],
    githubUrl: "https://github.com/rtomswastaken/Oriah-IDE",
    demoUrl: null,
    highlightBadge: "TEXTUAL 8.2 · 4-QUADRANT",
    colorAccent: "#7B6CFF"
  },
  {
    id: "eco-classroom",
    number: "04",
    title: "EcoClassroom",
    subtitle: "Gamified Environmental Sustainability Web App",
    category: "WEB & SUSTAINABILITY",
    status: "DEPLOYED",
    year: "2026",
    featured: false,
    gridSpan: "span-1",
    description: "A gamified environmental classroom platform designed to empower students and educators with real-world sustainability tracking: 'Small Actions. Big Impact.' Deployed live on Vercel.",
    details: [
      "Dual role portals for Students (action logging, streaks, badges) and Teachers (class analytics)",
      "Interactive environmental habit milestones, confetti celebrations, and activity feed",
      "Engineered with React 19, modern Vite pipeline, and Lucide icons",
      "Production deployment optimized for mobile and classroom tablet interactions"
    ],
    tech: ["React 19", "Vite", "JavaScript", "Lucide React", "Canvas Confetti", "Vercel"],
    githubUrl: "https://github.com/rtomswastaken/eco-classroom",
    demoUrl: "https://eco-classroom.vercel.app",
    highlightBadge: "LIVE ON VERCEL ↗",
    colorAccent: "#3ECF8E"
  },
  {
    id: "npx-rtoms",
    number: "05",
    title: "npx rtoms",
    subtitle: "Interactive Terminal Portfolio CLI",
    category: "CREATIVE CLI",
    status: "PUBLISHED",
    year: "2026",
    featured: false,
    gridSpan: "span-1",
    description: "A bespoke interactive command-line portfolio runnable on any machine with `npx rtoms`. Built using TypeScript, Ink, and React to bring full terminal UI aesthetics to developer resumes.",
    details: [
      "Interactive keyboard menus powered by Ink and Chalk gradients",
      "Real-time project filtering, direct link browser launching, and ASCII art headers",
      "Zero-config cross-platform execution directly from the npm registry",
      "Clean separation of terminal UI rendering and dynamic state management"
    ],
    tech: ["TypeScript", "React", "Ink", "Chalk", "Node.js", "npm"],
    githubUrl: "https://github.com/rtomswastaken/richardsen-thomas",
    demoUrl: null,
    highlightBadge: "RUN: npx rtoms",
    colorAccent: "#3178C6"
  },
  {
    id: "time-table-thingy",
    number: "06",
    title: "Time Table Thingy",
    subtitle: "Algorithmic Academic Scheduling Engine",
    category: "SYSTEM DESIGN & ALGORITHMS",
    status: "IDEATION",
    year: "2026",
    featured: false,
    gridSpan: "span-1",
    description: "An intelligent timetable generation system designed to optimize academic scheduling through automated constraint-solving, smart conflict-free allocation, and dynamic rule engines.",
    details: [
      "Constraint satisfaction problem (CSP) modeling for multi-batch academic constraints",
      "Conflict-free faculty, lab room, and classroom slot distribution algorithm",
      "Modular rule engine accommodating recurring breaks, prerequisites, and capacity limits"
    ],
    tech: ["Algorithms", "Scheduling", "Constraint Satisfaction", "System Design", "Python"],
    githubUrl: "https://github.com/rtomswastaken/Time-Table-Thingy",
    demoUrl: null,
    highlightBadge: "CONSTRAINT SOLVER",
    colorAccent: "#1B7F9E"
  },
  {
    id: "random-quote",
    number: "07",
    title: "Docker Workshop: Random Quote",
    subtitle: "Hands-on Containerization Tutorial & Terminal App",
    category: "DEVOPS & EDUCATION",
    status: "COMPLETE",
    year: "2026",
    featured: false,
    gridSpan: "span-1",
    description: "Interactive Python terminal application and hands-on containerization workshop teaching Docker fundamentals, image layering, volume isolation, and container lifecycles from scratch.",
    details: [
      "Interactive quote generator styled with Rich formatting and Pyfiglet ASCII typography",
      "Step-by-step guided exercises teaching Dockerfile construction and best practices",
      "Portable containerized packaging with zero host dependency collisions"
    ],
    tech: ["Python", "Docker", "Rich", "Pyfiglet", "DevOps"],
    githubUrl: "https://github.com/rtomswastaken/random-quote",
    demoUrl: null,
    highlightBadge: "DOCKER WORKSHOP",
    colorAccent: "#2496ED"
  },
  {
    id: "python-gui",
    number: "08",
    title: "Tkinter GUI Application Showcase",
    subtitle: "Desktop UI Explorations with Python",
    category: "DESKTOP SOFTWARE",
    status: "ARCHIVE",
    year: "2025",
    featured: false,
    gridSpan: "span-1",
    description: "Showcase exploring native desktop interface design and event handling using Python's Tkinter library, demonstrating custom widget layouts and reactive state.",
    details: [
      "Native desktop window management and responsive widget grid alignment",
      "Event dispatching, asynchronous file I/O handling, and custom color themes"
    ],
    tech: ["Python", "Tkinter", "GUI Design", "Desktop"],
    githubUrl: "https://github.com/rtomswastaken/Python-GUI-app",
    demoUrl: null,
    highlightBadge: "TKINTER DESKTOP",
    colorAccent: "#F7931E"
  },
  {
    id: "basic-python",
    number: "09",
    title: "Basic Python Projects Archive",
    subtitle: "Algorithmic & Utility Implementation Collection",
    category: "FOUNDATIONS & UTILITIES",
    status: "ARCHIVE",
    year: "2026",
    featured: false,
    gridSpan: "span-1",
    description: "A curated collection of foundational software projects including cryptographic password generators, CLI task managers, interactive simulations, and delivery system logic.",
    details: [
      "Clean algorithmic implementations of core programming paradigms",
      "CLI text manipulation, stateful loops, and secure random token generation"
    ],
    tech: ["Python", "CLI", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/rtomswastaken/Basic-Python-Projects",
    demoUrl: null,
    highlightBadge: "CORE FOUNDATIONS",
    colorAccent: "#3776AB"
  }
];
