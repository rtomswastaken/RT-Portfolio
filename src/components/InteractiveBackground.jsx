import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground:
 * Renders a dense, interlocking liquid typographic pattern inspired by the reference:
 * - Inflated, tubular, melted 'rtoms' letterforms (r, t, o, m, s, loops, arches, droplets)
 * - Constant-width rounded noodles with circular terminals and seamless joints
 * - Continuous slow fluid motion (floating underwater with varying speeds)
 * - Real liquid distortion (breathing, stretching, bending, flexing)
 * - Small concave lens cursor effect (localized depression like pressing into soft fluid)
 * - All blue tones (baby blue background with rich sky/marine blue liquid shapes)
 * - Evenly distributed coverage across the entire viewport and bled beyond edges
 */
export default function InteractiveBackground({ subtle = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 200,
      speed: 0
    };

    let prevMouseX = -2000;
    let prevMouseY = -2000;
    let time = 0;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Deterministic PRNG
    const createRandom = (seed) => {
      let s = seed;
      return () => {
        s = Math.sin(s) * 10000;
        return s - Math.floor(s);
      };
    };

    let shapes = [];

    // Liquid Typographic Shape Drawers (Tubular rounded strokes & smooth loops)
    // 1. Liquid 'r': vertical stem + smooth rightward hook
    const drawR = (ctx, s, bend) => {
      const stemX = -s.size * 0.22;
      const topY = -s.size * 0.44;
      const botY = s.size * 0.44;
      
      // Stem
      ctx.beginPath();
      ctx.moveTo(stemX, botY);
      ctx.lineTo(stemX, topY);
      ctx.stroke();

      // Hook curving out from stem
      ctx.beginPath();
      ctx.moveTo(stemX, topY + s.size * 0.28);
      ctx.bezierCurveTo(
        stemX + s.size * 0.1, topY - s.size * 0.05 + bend,
        s.size * 0.42, topY - s.size * 0.02 + bend,
        s.size * 0.42, topY + s.size * 0.28
      );
      ctx.stroke();
    };

    // 2. Liquid 't': tall stem curving into bottom hook + horizontal crossbar
    const drawT = (ctx, s, bend) => {
      const topY = -s.size * 0.46;
      const hookEndY = s.size * 0.42;

      ctx.beginPath();
      ctx.moveTo(0, topY);
      ctx.lineTo(0, s.size * 0.18);
      ctx.quadraticCurveTo(0, hookEndY + bend, s.size * 0.38, hookEndY);
      ctx.stroke();

      // Crossbar
      const barY = -s.size * 0.16;
      ctx.beginPath();
      ctx.moveTo(-s.size * 0.32, barY);
      ctx.lineTo(s.size * 0.32, barY);
      ctx.stroke();
    };

    // 3. Liquid 'o': elongated stadium / pill ring
    const drawO = (ctx, s, bend) => {
      const rx = s.size * 0.28;
      const ry = s.size * 0.42 + bend * 0.3;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(16, rx), Math.max(16, ry), 0, 0, Math.PI * 2);
      ctx.stroke();
    };

    // 4. Liquid 'm': double arched wave with 3 descending legs
    const drawM = (ctx, s, bend) => {
      const w = s.size * 0.48;
      const h = s.size * 0.38;

      ctx.beginPath();
      // Left leg
      ctx.moveTo(-w, h);
      ctx.lineTo(-w, -h * 0.2);
      // First arch
      ctx.bezierCurveTo(-w, -h - bend, 0, -h - bend, 0, -h * 0.2);
      // Second arch
      ctx.bezierCurveTo(0, -h - bend, w, -h - bend, w, -h * 0.2);
      // Right leg
      ctx.lineTo(w, h);
      ctx.stroke();
    };

    // 5. Liquid 's': continuous serpentine wave with bulbous rounded caps
    const drawS = (ctx, s, bend) => {
      const w = s.size * 0.32;
      const h = s.size * 0.44;

      ctx.beginPath();
      ctx.moveTo(w, -h * 0.65);
      ctx.bezierCurveTo(w, -h - bend, -w, -h * 0.8 - bend, -w * 0.5, -h * 0.05);
      ctx.bezierCurveTo(0, h * 0.45, w * 1.1, h * 0.3, w * 0.45, h * 0.85 + bend);
      ctx.bezierCurveTo(-w * 0.2, h + bend, -w, h * 0.85, -w, h * 0.6);
      ctx.stroke();
    };

    // 6. Connected melted 'rtoms' ligature: fluid flowing wordform
    const drawConnectedRTOMS = (ctx, s, bend) => {
      const u = s.size * 0.22;
      // Fluid cursive connected tubular ligature
      ctx.beginPath();
      // 'r'
      ctx.moveTo(-u * 2.2, u * 0.8);
      ctx.lineTo(-u * 2.2, -u * 0.8);
      ctx.bezierCurveTo(-u * 2.2, -u * 1.2 + bend, -u * 1.3, -u * 1.2 + bend, -u * 1.3, -u * 0.5);
      // 't'
      ctx.lineTo(-u * 0.7, -u * 0.5);
      ctx.lineTo(-u * 0.7, -u * 1.3);
      ctx.lineTo(-u * 0.7, u * 0.4);
      ctx.quadraticCurveTo(-u * 0.7, u * 0.9 + bend, -u * 0.1, u * 0.8);
      // 'o' loop
      ctx.bezierCurveTo(u * 0.3, u * 0.8, u * 0.8, u * 0.5, u * 0.8, 0);
      ctx.bezierCurveTo(u * 0.8, -u * 0.8, u * 0.2, -u * 0.8, u * 0.2, 0);
      ctx.bezierCurveTo(u * 0.2, u * 0.8, u * 0.8, u * 0.8, u * 1.3, u * 0.5);
      // 'm' arches
      ctx.bezierCurveTo(u * 1.4, -u * 0.8 + bend, u * 1.8, -u * 0.8 + bend, u * 1.8, 0);
      ctx.bezierCurveTo(u * 1.9, -u * 0.8 + bend, u * 2.3, -u * 0.8 + bend, u * 2.3, u * 0.8);
      ctx.stroke();
    };

    // 7. Liquid Arch (Inverted U / Tunnel - seen top center in reference)
    const drawArch = (ctx, s, bend) => {
      const w = s.size * 0.36;
      const h = s.size * 0.48;

      ctx.beginPath();
      ctx.moveTo(-w, h);
      ctx.lineTo(-w, -h * 0.15);
      ctx.bezierCurveTo(-w, -h - bend, w, -h - bend, w, -h * 0.15);
      ctx.lineTo(w, h);
      ctx.stroke();
    };

    // 8. Liquid Droplet / Pebble Dot (circular or pebble nestled in negative space)
    const drawDot = (ctx, s) => {
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(12, s.size * 0.24), 0, Math.PI * 2);
      ctx.fill();
    };

    // 9. Liquid Capsule / Pill Bar (rounded diagonal or horizontal bar)
    const drawCapsule = (ctx, s, bend) => {
      const len = s.size * 0.46;
      ctx.beginPath();
      ctx.moveTo(-len, bend);
      ctx.quadraticCurveTo(0, bend * 1.6, len, -bend);
      ctx.stroke();
    };

    const initCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      shapes = [];
      const rand = createRandom(2026);

      // Harmonious blue color palette for soft tone-on-tone depth
      const a = subtle ? 0.38 : 1.0;
      const palette = [
        { stroke: `rgba(88, 156, 226, ${0.58 * a})`, fill: `rgba(88, 156, 226, ${0.58 * a})` },
        { stroke: `rgba(108, 172, 236, ${0.48 * a})`, fill: `rgba(108, 172, 236, ${0.48 * a})` },
        { stroke: `rgba(72, 142, 218, ${0.52 * a})`, fill: `rgba(72, 142, 218, ${0.52 * a})` },
        { stroke: `rgba(128, 188, 244, ${0.44 * a})`, fill: `rgba(128, 188, 244, ${0.44 * a})` }
      ];

      // A) 6 HUGE BACKGROUND LIQUID FORMS (Interlocking & bleeding off edges)
      const hugeConfigs = [
        { type: 'arch', x: 0.12, y: 0.05, size: 520, rot: 0.2 },
        { type: 'connected', x: 0.82, y: 0.15, size: 480, rot: -0.35 },
        { type: 's', x: 0.08, y: 0.55, size: 540, rot: 0.4 },
        { type: 'm', x: 0.90, y: 0.65, size: 510, rot: -0.25 },
        { type: 'o', x: 0.28, y: 0.92, size: 460, rot: 0.5 },
        { type: 'connected', x: 0.72, y: 0.88, size: 530, rot: -0.15 },
        { type: 'r', x: 0.48, y: 0.08, size: 490, rot: -0.1 }
      ];

      hugeConfigs.forEach((cfg, idx) => {
        const color = palette[idx % palette.length];
        shapes.push({
          id: idx,
          type: cfg.type,
          size: cfg.size,
          strokeWidth: Math.round(cfg.size * 0.18),
          color,
          baseX: cfg.x * width,
          baseY: cfg.y * height,
          baseScale: 1,
          baseRot: cfg.rot,
          speedX: 0.00025 + rand() * 0.0003,
          speedY: 0.0002 + rand() * 0.00025,
          phaseX: rand() * Math.PI * 2,
          phaseY: rand() * Math.PI * 2,
          phaseS: rand() * Math.PI * 2,
          phaseR: rand() * Math.PI * 2,
          phaseB: rand() * Math.PI * 2,
          ampX: 24 + rand() * 20,
          ampY: 20 + rand() * 18,
          stretchFreq: 0.00035 + rand() * 0.0003,
          stretchAmp: 0.06 + rand() * 0.04,
          bendFreq: 0.00045 + rand() * 0.0003,
          rotFreq: 0.0002 + rand() * 0.0002
        });
      });

      // B) JITTERED GRID OF MEDIUM LIQUID LETTERFORMS (r, t, o, m, s, connected)
      // This ensures 100% dense, organic coverage across the whole screen like the reference!
      const cols = 5;
      const rows = 4;
      const cellW = width / cols;
      const cellH = height / rows;
      const types = ['r', 't', 'o', 'm', 's', 'connected', 'arch', 'capsule'];

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const type = types[(c * rows + r) % types.length];
          const size = 180 + rand() * 90; // 180px - 270px
          const color = palette[(c + r) % palette.length];
          // Jitter position within cell
          const baseX = (c + 0.5 + (rand() - 0.5) * 0.6) * cellW;
          const baseY = (r + 0.5 + (rand() - 0.5) * 0.6) * cellH;

          shapes.push({
            id: 100 + c * rows + r,
            type,
            size,
            strokeWidth: Math.round(size * 0.22),
            color,
            baseX,
            baseY,
            baseScale: 1,
            baseRot: (rand() - 0.5) * 1.6,
            speedX: 0.00035 + rand() * 0.0004,
            speedY: 0.0003 + rand() * 0.0004,
            phaseX: rand() * Math.PI * 2,
            phaseY: rand() * Math.PI * 2,
            phaseS: rand() * Math.PI * 2,
            phaseR: rand() * Math.PI * 2,
            phaseB: rand() * Math.PI * 2,
            ampX: 18 + rand() * 18,
            ampY: 15 + rand() * 18,
            stretchFreq: 0.00045 + rand() * 0.0004,
            stretchAmp: 0.08 + rand() * 0.05,
            bendFreq: 0.0006 + rand() * 0.0005,
            rotFreq: 0.0003 + rand() * 0.0003
          });
        }
      }

      // C) INTERSTITIAL FILLER DROPLETS & CAPSULES (Nestled in the gaps)
      const dotCount = Math.max(22, Math.floor((width * height) / 50000));
      for (let i = 0; i < dotCount; i++) {
        const type = rand() > 0.45 ? 'dot' : 'capsule';
        const size = 50 + rand() * 60; // 50px - 110px
        const color = palette[(i + 2) % palette.length];
        const baseX = (rand() * 1.1 - 0.05) * width;
        const baseY = (rand() * 1.1 - 0.05) * height;

        shapes.push({
          id: 200 + i,
          type,
          size,
          strokeWidth: Math.round(size * 0.26),
          color,
          baseX,
          baseY,
          baseScale: 1,
          baseRot: (rand() - 0.5) * 2.5,
          speedX: 0.0004 + rand() * 0.0005,
          speedY: 0.00035 + rand() * 0.00045,
          phaseX: rand() * Math.PI * 2,
          phaseY: rand() * Math.PI * 2,
          phaseS: rand() * Math.PI * 2,
          phaseR: rand() * Math.PI * 2,
          phaseB: rand() * Math.PI * 2,
          ampX: 14 + rand() * 16,
          ampY: 12 + rand() * 14,
          stretchFreq: 0.0006 + rand() * 0.0005,
          stretchAmp: 0.1 + rand() * 0.06,
          bendFreq: 0.0008 + rand() * 0.0006,
          rotFreq: 0.0004 + rand() * 0.0004
        });
      }
    };

    initCanvas();

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      const speed = Math.hypot(e.clientX - prevMouseX, e.clientY - prevMouseY);
      mouse.speed = Math.min(2.0, mouse.speed * 0.85 + speed * 0.03);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.speed = 0;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Main Liquid Render Loop
    const render = (timestamp) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time = prefersReducedMotion ? 0 : timestamp;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow & speed decay
      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;
      mouse.speed *= 0.94;

      const lensRadius = mouse.radius;

      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];

        // 1. Fluid slow drift (gentle floating through thick fluid)
        let curX = s.baseX + Math.sin(time * s.speedX + s.phaseX) * s.ampX +
                   Math.cos(time * s.speedY * 0.75 + s.phaseY) * (s.ampX * 0.45);
        let curY = s.baseY + Math.cos(time * s.speedY + s.phaseY) * s.ampY +
                   Math.sin(time * s.speedX * 0.8 + s.phaseX) * (s.ampY * 0.45);

        // 2. Liquid breathing / stretching / bending
        let scaleX = s.baseScale * (1 + Math.sin(time * s.stretchFreq + s.phaseS) * s.stretchAmp);
        let scaleY = s.baseScale * (1 + Math.cos(time * s.stretchFreq * 0.9 + s.phaseS + 1.2) * s.stretchAmp);
        let rot = s.baseRot + Math.sin(time * s.rotFreq + s.phaseR) * 0.08;
        let bend = Math.sin(time * s.bendFreq + s.phaseB) * (s.size * 0.12);

        // 3. Small Concave Lens Effect around cursor (finger pressing into soft fluid surface)
        const dx = curX - mouse.x;
        const dy = curY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < lensRadius && dist > 1) {
          const normDist = dist / lensRadius; // 0 at cursor center, 1 at rim
          
          // Concave depression lens formula:
          // Points around cursor gently sink inward toward center and deform
          const depression = Math.sin(normDist * Math.PI) * (1 - normDist);
          const pushForce = depression * (28 + mouse.speed * 14);

          curX -= (dx / dist) * pushForce;
          curY -= (dy / dist) * pushForce;

          // Local compression under the lens
          const compression = 1 - (1 - normDist) * 0.16;
          scaleX *= compression;
          scaleY *= compression;

          // Fluid swirl & bend around depression
          rot += (1 - normDist) * 0.14 * Math.sin(time * 0.002 + s.phaseR);
          bend += (1 - normDist) * (s.size * 0.16) * Math.cos(time * 0.002 + normDist * Math.PI);
        }

        // 4. Render the liquid form
        ctx.save();
        ctx.translate(curX, curY);
        ctx.rotate(rot);
        ctx.scale(scaleX, scaleY);

        ctx.strokeStyle = s.color.stroke;
        ctx.fillStyle = s.color.fill;
        ctx.lineWidth = s.strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        switch (s.type) {
          case 'r':
            drawR(ctx, s, bend);
            break;
          case 't':
            drawT(ctx, s, bend);
            break;
          case 'o':
            drawO(ctx, s, bend);
            break;
          case 'm':
            drawM(ctx, s, bend);
            break;
          case 's':
            drawS(ctx, s, bend);
            break;
          case 'connected':
            drawConnectedRTOMS(ctx, s, bend);
            break;
          case 'arch':
            drawArch(ctx, s, bend);
            break;
          case 'dot':
            drawDot(ctx, s);
            break;
          case 'capsule':
            drawCapsule(ctx, s, bend);
            break;
          default:
            drawO(ctx, s, bend);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-background-canvas"
      aria-hidden="true"
    />
  );
}
