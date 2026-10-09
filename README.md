# RT-Portfolio

Personal portfolio website of Richardsen Thomas (RTOMS), showcasing developer tools, terminal applications, local AI experiments, and web projects.

## Overview

RT-Portfolio is a multi-page web application built with React 19 and Vite. It serves as an interactive showcase and digital archive for personal projects, experiments, and technical background. The site includes client-side routing, smooth scrolling via Lenis, a canvas-driven organic wave background, and dedicated views for browsing project archives and contacting the author.

## Features

- Multi-page navigation with client-side routing between home, projects archive, and contact views.
- Interactive canvas background with multi-layer animated wave contours and cursor wake deflection.
- Smooth scrolling powered by Lenis and responsive layouts styled with custom CSS variables.
- Dedicated projects archive detailing software projects, tech stacks, and repository links.
- Contact form with support for a custom backend endpoint and fallback to direct email links.

## Tech Stack

- **Runtime & Build**: Node.js, Vite 8
- **Frontend Framework**: React 19, React Router 7
- **Motion & Smooth Scroll**: Lenis, GSAP
- **Icons**: Lucide React, bespoke SVG components
- **Linting**: Oxlint

## Project Structure

```
RT-Portfolio/
├── public/              # Static assets, icons, and SVG illustrations
├── src/
│   ├── assets/          # Project images and graphics
│   ├── components/      # Shared UI elements, navigation, and canvas background
│   ├── data/            # Structured data for projects, profile, and skills
│   ├── pages/           # Route views (HomePage, ProjectsPage, ContactPage)
│   ├── sections/        # Homepage section components
│   ├── styles/          # Design tokens and global CSS styles
│   ├── App.jsx          # Root application component and route configuration
│   └── main.jsx         # Application entry point
├── index.html           # HTML template and Google Fonts preconnects
├── package.json         # Project metadata and dependencies
└── vite.config.js       # Vite configuration
```

## Featured Projects

The portfolio showcases the following projects from [@rtomswastaken](https://github.com/rtomswastaken):

- **Zoe Alpha v0.1**: Local AI computer assistant for macOS using Apple Silicon, PyObjC, Quartz, and local Ollama models (Qwen3:14b and MiniCPM-V).
- **chatTUI**: Terminal chat client in Go built with Charm's Bubble Tea, Lip Gloss, SQLite, and Tailscale mesh networking.
- **Oriah IDE**: Terminal code editor and agent workspace in Python using Textual 8.2, Pygments, and Rich.
- **EcoClassroom**: Gamified sustainability tracking web app built with React 19 and Vite.
- **npx rtoms**: Interactive terminal portfolio CLI built with TypeScript, React, Ink, and Chalk.
- **Time Table Thingy**: Algorithmic academic scheduling engine using constraint satisfaction techniques.
- **Docker Workshop: Random Quote**: Containerization tutorial and interactive Python CLI.
- **Tkinter GUI Application Showcase**: Native desktop UI experiments and widget layouts in Python.
- **Basic Python Projects Archive**: Collection of algorithmic utilities and CLI scripts.

## Requirements

- Node.js 18 or higher
- npm 9 or higher (or compatible package manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rtomswastaken/RT-Portfolio.git
cd RT-Portfolio
```

2. Install dependencies:

```bash
npm install
```

## Configuration

The application runs without additional configuration by default. To configure a custom backend endpoint for the contact form, create a `.env` file in the project root:

```env
VITE_CONTACT_ENDPOINT=https://your-api-endpoint.example.com/contact
```

If `VITE_CONTACT_ENDPOINT` is not defined, submitting the contact form automatically falls back to opening the visitor's mail client with a pre-filled message addressed to `richardsenthomas888@gmail.com`.

## Usage

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run code linting:

```bash
npm run lint
```

## Contact and Links

- GitHub: https://github.com/rtomswastaken
- LinkedIn: https://linkedin.com/in/richardsenthomas
- Instagram: https://instagram.com/rtoooms
- Email: richardsenthomas888@gmail.com
- Terminal Card: `npx rtoms`

## License

This repository does not currently include an open-source license file. All rights are reserved by the author unless explicitly stated otherwise.
