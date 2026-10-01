import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground:
 * Renders an abstract organic shape pattern inspired by playful graphic design systems:
 * - Completely non-overlapping, spaced shapes (irregular blobs, capsules, soft circles,
 *   curved ribbons, organic squiggles, abstract arches, small dots, thin curved lines).
 * - Enforces strict collision / spacing logic so every shape has clear breathing room.
 * - Absolutely NO text, letters, words, or typography.
 * - Tonal variations of pure blue (baby blue base, soft navy / medium sky blue shapes).
 * - Continuous, ultra-slow organic fluid motion (suspended in thick liquid).
 * - Soft concave / liquid lens cursor interaction with smooth spring return.
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
      radius: 180,
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

    // =========================================================================
    // ABSTRACT ORGANIC SHAPE DRAWERS (No typography, pure graphic forms)
    // =========================================================================

    // 1. Irregular Organic Blob (Smooth harmonic radial boundary)
    const drawBlob = (ctx, s, wave) => {
      const r = s.size * 0.45;
      const numPoints = 6;
      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        // Subtle harmonic variation for a natural pebble / liquid droplet shape
        const radius = r * (1 + 0.16 * Math.sin(theta * 3 + wave + s.phaseW) + 0.1 * Math.cos(theta * 2 + s.phaseR));
        const px = Math.cos(theta) * radius;
        const py = Math.sin(theta) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    // 2. Rounded Capsule / Stadium Pill
    const drawCapsule = (ctx, s, wave) => {
      const w = s.size * 0.65;
      const h = s.size * 0.32;
      const r = h / 2;
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.lineTo(w / 2 - r, -h / 2);
      ctx.arc(w / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(-w / 2 + r, h / 2);
      ctx.arc(-w / 2 + r, 0, r, Math.PI / 2, -Math.PI / 2);
      ctx.closePath();
      ctx.fill();
    };

    // 3. Curved Ribbon / Noodle
    const drawCurvedRibbon = (ctx, s, wave) => {
      const len = s.size * 0.45;
      const bend = (s.size * 0.22) + wave * 8;
      ctx.beginPath();
      ctx.moveTo(-len, -bend * 0.5);
      ctx.bezierCurveTo(-len * 0.3, bend, len * 0.3, -bend, len, bend * 0.5);
      ctx.stroke();
    };

    // 4. Organic Squiggle (Wavy tubular stroke)
    const drawSquiggle = (ctx, s, wave) => {
      const len = s.size * 0.48;
      const amp = s.size * 0.18 + wave * 6;
      ctx.beginPath();
      ctx.moveTo(-len, 0);
      ctx.bezierCurveTo(-len * 0.5, -amp, -len * 0.2, amp, 0, 0);
      ctx.bezierCurveTo(len * 0.2, -amp, len * 0.5, amp, len, 0);
      ctx.stroke();
    };

    // 5. Soft Circle / Oval Pebble
    const drawSoftCircle = (ctx, s, wave) => {
      const rx = s.size * 0.36;
      const ry = s.size * (0.36 + wave * 0.05);
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(10, rx), Math.max(10, ry), 0, 0, Math.PI * 2);
      ctx.fill();
    };

    // 6. Abstract Rounded Arch (Inverted U / Tunnel)
    const drawArch = (ctx, s, wave) => {
      const w = s.size * 0.35;
      const h = s.size * 0.42;
      const bend = wave * 6;
      ctx.beginPath();
      ctx.moveTo(-w, h * 0.5);
      ctx.lineTo(-w, -h * 0.2);
      ctx.bezierCurveTo(-w, -h - bend, w, -h - bend, w, -h * 0.2);
      ctx.lineTo(w, h * 0.5);
      ctx.stroke();
    };

    // 7. Small Floating Dot (Accents)
    const drawDot = (ctx, s) => {
      const r = s.size * 0.22;
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(7, r), 0, Math.PI * 2);
      ctx.fill();
    };

    // 8. Thin Curved Line (Fine graphic arc)
    const drawThinArc = (ctx, s, wave) => {
      const r = s.size * 0.42;
      const startAngle = s.phaseW;
      const endAngle = startAngle + Math.PI * 0.85 + wave * 0.2;
      ctx.beginPath();
      ctx.arc(0, 0, r, startAngle, endAngle);
      ctx.stroke();
    };

    // =========================================================================
    // NON-OVERLAPPING POSITIONING ENGINE (Collision / Spacing Logic)
    // =========================================================================
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
      const rand = createRandom(8888);

      // Tonal variations of pure blue over baby blue (#B5DCF8)
      const a = subtle ? 0.35 : 1.0;
      const colorSchemes = [
        // Slightly darker blue (primary)
        { stroke: `rgba(75, 142, 218, ${0.46 * a})`, fill: `rgba(75, 142, 218, ${0.46 * a})`, isStroke: false },
        // Mid sky blue
        { stroke: `rgba(95, 160, 230, ${0.42 * a})`, fill: `rgba(95, 160, 230, ${0.42 * a})`, isStroke: false },
        // Deep accent blue
        { stroke: `rgba(58, 126, 206, ${0.44 * a})`, fill: `rgba(58, 126, 206, ${0.44 * a})`, isStroke: false },
        // Subtle lighter blue
        { stroke: `rgba(175, 218, 252, ${0.55 * a})`, fill: `rgba(175, 218, 252, ${0.55 * a})`, isStroke: false },
        // Outlined curved ribbons & arches
        { stroke: `rgba(70, 138, 215, ${0.48 * a})`, fill: `rgba(70, 138, 215, ${0.48 * a})`, isStroke: true },
        // Thin graphic line
        { stroke: `rgba(50, 118, 198, ${0.36 * a})`, fill: `rgba(50, 118, 198, ${0.36 * a})`, isStroke: true, thin: true }
      ];

      const shapeTypes = ['blob', 'capsule', 'ribbon', 'squiggle', 'circle', 'arch', 'dot', 'thinArc'];

      // Target shape count balanced across screen area
      // Roughly 1 shape per 42,000 px^2 (e.g., 28-34 shapes on desktop)
      const targetCount = Math.max(20, Math.min(38, Math.floor((width * height) / 42000)));

      // Placed shapes list for collision testing
      const placedCircles = [];

      // Minimum guaranteed breathing room between shape bounds
      const minBreathingGap = 38;

      let attempts = 0;
      const maxTotalAttempts = 1500;

      while (placedCircles.length < targetCount && attempts < maxTotalAttempts) {
        attempts++;

        // Random shape type
        const typeIndex = Math.floor(rand() * shapeTypes.length);
        const type = shapeTypes[typeIndex];

        // Diverse size categories: small dots (30-45px), medium (75-120px), prominent blobs (130-190px)
        let size;
        if (type === 'dot') {
          size = 32 + rand() * 22; // 32 - 54px
        } else if (type === 'thinArc') {
          size = 90 + rand() * 60; // 90 - 150px
        } else if (rand() > 0.72) {
          size = 135 + rand() * 55; // 135 - 190px (prominent organic blob / capsule)
        } else {
          size = 70 + rand() * 55;  // 70 - 125px (medium organic forms)
        }

        // Bounding radius for collision
        const boundRadius = size * 0.52;

        // Position across canvas with slight margin bleeding
        const x = (rand() * 1.08 - 0.04) * width;
        const y = (rand() * 1.08 - 0.04) * height;

        // Check collision against all already placed shapes
        let collides = false;
        for (let j = 0; j < placedCircles.length; j++) {
          const other = placedCircles[j];
          const dist = Math.hypot(x - other.x, y - other.y);
          const requiredDist = boundRadius + other.radius + minBreathingGap;

          if (dist < requiredDist) {
            collides = true;
            break;
          }
        }

        if (!collides) {
          // Accepted! Register placement
          placedCircles.push({ x, y, radius: boundRadius });

          const colorScheme = colorSchemes[Math.floor(rand() * colorSchemes.length)];
          const strokeWidth = colorScheme.thin ? Math.max(2.5, size * 0.035) : Math.max(14, size * 0.22);

          shapes.push({
            id: shapes.length,
            type,
            size,
            strokeWidth,
            color: colorScheme,
            baseX: x,
            baseY: y,
            baseRot: (rand() - 0.5) * Math.PI * 2,
            baseScale: 1,
            // Fluid drifting physics: very small amplitudes (10-18px) to preserve breathing room!
            driftAmpX: 10 + rand() * 10,
            driftAmpY: 8 + rand() * 10,
            speedX: 0.00025 + rand() * 0.0003,
            speedY: 0.0002 + rand() * 0.00025,
            phaseX: rand() * Math.PI * 2,
            phaseY: rand() * Math.PI * 2,
            phaseS: rand() * Math.PI * 2,
            phaseR: rand() * Math.PI * 2,
            phaseW: rand() * Math.PI * 2,
            stretchFreq: 0.00035 + rand() * 0.0003,
            stretchAmp: 0.05 + rand() * 0.04,
            rotFreq: 0.0002 + rand() * 0.0002
          });
        }
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

    // =========================================================================
    // MAIN FLUID RENDER LOOP (Underwater suspended physics + Concave lens)
    // =========================================================================
    const render = (timestamp) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time = prefersReducedMotion ? 0 : timestamp;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;
      mouse.speed *= 0.94;

      const lensRadius = mouse.radius;

      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];

        // 1. Slow, organic fluid drift
        let curX = s.baseX + Math.sin(time * s.speedX + s.phaseX) * s.driftAmpX +
                   Math.cos(time * s.speedY * 0.75 + s.phaseY) * (s.driftAmpX * 0.35);
        let curY = s.baseY + Math.cos(time * s.speedY + s.phaseY) * s.driftAmpY +
                   Math.sin(time * s.speedX * 0.8 + s.phaseX) * (s.driftAmpY * 0.35);

        // 2. Liquid stretching, bending, and breathing
        let scaleX = s.baseScale * (1 + Math.sin(time * s.stretchFreq + s.phaseS) * s.stretchAmp);
        let scaleY = s.baseScale * (1 + Math.cos(time * s.stretchFreq * 0.9 + s.phaseS + 1.2) * s.stretchAmp);
        let rot = s.baseRot + Math.sin(time * s.rotFreq + s.phaseR) * 0.06;
        let wave = Math.sin(time * 0.0006 + s.phaseW);

        // 3. Soft Concave Lens / Fluid Cursor Push
        const dx = curX - mouse.x;
        const dy = curY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < lensRadius && dist > 1) {
          const normDist = dist / lensRadius; // 0 at cursor, 1 at rim

          // Smooth concave depression: gently sinks inward and eases outward
          const depression = Math.sin(normDist * Math.PI) * (1 - normDist);
          const pushForce = depression * (24 + mouse.speed * 12);

          curX += (dx / dist) * pushForce;
          curY += (dy / dist) * pushForce;

          // Local compression under the lens
          const compression = 1 - (1 - normDist) * 0.14;
          scaleX *= compression;
          scaleY *= compression;

          // Gentle fluid rotational swirl
          rot += (1 - normDist) * 0.12 * Math.sin(time * 0.002 + s.phaseR);
          wave += (1 - normDist) * 0.25;
        }

        // 4. Render the graphic shape
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
          case 'blob':
            drawBlob(ctx, s, wave);
            break;
          case 'capsule':
            drawCapsule(ctx, s, wave);
            break;
          case 'ribbon':
            drawCurvedRibbon(ctx, s, wave);
            break;
          case 'squiggle':
            drawSquiggle(ctx, s, wave);
            break;
          case 'circle':
            drawSoftCircle(ctx, s, wave);
            break;
          case 'arch':
            drawArch(ctx, s, wave);
            break;
          case 'dot':
            drawDot(ctx, s);
            break;
          case 'thinArc':
            drawThinArc(ctx, s, wave);
            break;
          default:
            drawBlob(ctx, s, wave);
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
  }, [subtle]);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-background-canvas"
      aria-hidden="true"
    />
  );
}
