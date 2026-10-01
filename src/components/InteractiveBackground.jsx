import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground:
 * Renders the authentic, smooth organic wavy / amoeba / topographic pattern
 * matching the reference image using 100% vector-smooth filled Bézier shapes:
 * - Alternating thick flowing filled ribbons across the canvas
 * - Nested amoeba rings (using evenodd hole cutouts) with center island pebbles
 * - 100% Retina/DPR-aware anti-aliased vector rendering (ZERO PIXELS)
 * - Soft, airy baby blue palette matching the Contact page
 * - Continuous slow fluid deformation & concave cursor deflection
 */
export default function InteractiveBackground({ subtle = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    let mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 220,
      speed: 0
    };

    let prevMouseX = -2000;
    let prevMouseY = -2000;
    let time = 0;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper: draw cubic bezier spline through an array of points
    const traceSpline = (ctx, pts, startWithMoveTo = true) => {
      if (pts.length < 2) return;
      if (startWithMoveTo) {
        ctx.moveTo(pts[0].x, pts[0].y);
      } else {
        ctx.lineTo(pts[0].x, pts[0].y);
      }

      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = i > 0 ? pts[i - 1] : pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) / 5.5;
        const cp1y = p1.y + (p2.y - p0.y) / 5.5;
        const cp2x = p2.x - (p3.x - p1.x) / 5.5;
        const cp2y = p2.y - (p3.y - p1.y) / 5.5;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    // Helper: trace closed loop spline
    const traceClosedLoop = (ctx, pts) => {
      if (pts.length < 3) return;
      const len = pts.length;
      ctx.moveTo(pts[0].x, pts[0].y);

      for (let i = 0; i < len; i++) {
        const p0 = pts[(i - 1 + len) % len];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % len];
        const p3 = pts[(i + 2) % len];

        const cp1x = p1.x + (p2.x - p0.x) / 5.5;
        const cp1y = p1.y + (p2.y - p0.y) / 5.5;
        const cp2x = p2.x - (p3.x - p1.x) / 5.5;
        const cp2y = p2.y - (p3.y - p1.y) / 5.5;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      ctx.closePath();
    };

    let ribbons = [];
    let amoebas = [];

    const initShapes = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      ribbons = [];
      amoebas = [];

      const makePt = (x, y, amp = 16, freq = 0.00022) => ({
        baseX: x,
        baseY: y,
        ampX: amp,
        ampY: amp,
        speedX: freq,
        speedY: freq * 0.9,
        phaseX: (x * 0.004 + y * 0.003) % (Math.PI * 2),
        phaseY: (x * 0.003 - y * 0.004) % (Math.PI * 2)
      });

      // 1. FILLED FLOWING WAVY RIBBONS (Top & Bottom bands like reference)
      const ribbonBands = [
        { centerY: 0.08 * height, thickness: 0.09 * height, waveAmp: 0.05 * height },
        { centerY: 0.26 * height, thickness: 0.08 * height, waveAmp: 0.045 * height },
        { centerY: 0.72 * height, thickness: 0.085 * height, waveAmp: 0.05 * height },
        { centerY: 0.93 * height, thickness: 0.10 * height, waveAmp: 0.055 * height }
      ];

      ribbonBands.forEach((b, rIdx) => {
        const numSegments = 7;
        const stepX = (width * 1.35) / numSegments;
        const startX = -0.18 * width;

        const topPts = [];
        const botPts = [];

        for (let i = 0; i <= numSegments; i++) {
          const x = startX + i * stepX;
          const wave = Math.sin(i * 0.95 + rIdx * 1.7) * b.waveAmp;
          const halfThick = b.thickness * 0.5;

          topPts.push(makePt(x, b.centerY + wave - halfThick, 18, 0.0002 + rIdx * 0.00005));
          botPts.push(makePt(x, b.centerY + wave + halfThick, 18, 0.0002 + rIdx * 0.00005));
        }

        ribbons.push({ topPts, botPts, isSecondary: rIdx % 2 !== 0 });
      });

      // 2. CONCENTRIC AMOEBA RINGS WITH INNER HOLES & PEBBLE ISLANDS (Middle / Side field)
      const amoebaDefs = [
        // Upper-left nested amoeba + island
        { cx: 0.13 * width, cy: 0.28 * height, rx: 0.12 * width, ry: 0.13 * height, hasHole: true, hasIsland: true },
        // Upper-right calm kidney amoeba
        { cx: 0.88 * width, cy: 0.25 * height, rx: 0.11 * width, ry: 0.15 * height, hasHole: true, hasIsland: false },
        // Lower-left soft rounded amoeba + island
        { cx: 0.14 * width, cy: 0.74 * height, rx: 0.13 * width, ry: 0.12 * height, hasHole: true, hasIsland: true },
        // Lower-right elongated amoeba ring + island
        { cx: 0.87 * width, cy: 0.76 * height, rx: 0.12 * width, ry: 0.14 * height, hasHole: true, hasIsland: true }
      ];

      amoebaDefs.forEach((def, aIdx) => {
        const numPts = 7;
        const outerPts = [];
        const innerPts = [];
        const islandPts = [];

        const holeScale = 0.52;
        const islandScale = 0.22;

        for (let i = 0; i < numPts; i++) {
          const theta = (i / numPts) * Math.PI * 2;
          const jitter = 1 + Math.sin(theta * 2 + aIdx) * 0.16 + Math.cos(theta * 3) * 0.1;

          const px = def.cx + Math.cos(theta) * (def.rx * jitter);
          const py = def.cy + Math.sin(theta) * (def.ry * jitter);
          outerPts.push(makePt(px, py, 15, 0.00022));

          if (def.hasHole) {
            const hx = def.cx + Math.cos(theta) * (def.rx * holeScale * jitter);
            const hy = def.cy + Math.sin(theta) * (def.ry * holeScale * jitter);
            innerPts.push(makePt(hx, hy, 12, 0.00022));
          }

          if (def.hasIsland) {
            const ix = def.cx + Math.cos(theta) * (def.rx * islandScale * jitter);
            const iy = def.cy + Math.sin(theta) * (def.ry * islandScale * jitter);
            islandPts.push(makePt(ix, iy, 9, 0.00022));
          }
        }

        amoebas.push({
          outerPts,
          innerPts,
          islandPts,
          hasHole: def.hasHole,
          hasIsland: def.hasIsland,
          isSecondary: aIdx % 2 !== 0
        });
      });
    };

    initShapes();

    const handleResize = () => {
      initShapes();
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
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Deform points with fluid drift + concave cursor deflection
    const getDeformedPts = (pts) => {
      const lensRadius = mouse.radius;
      return pts.map((pt) => {
        let px = pt.baseX + Math.sin(time * pt.speedX + pt.phaseX) * pt.ampX;
        let py = pt.baseY + Math.cos(time * pt.speedY + pt.phaseY) * pt.ampY;

        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < lensRadius && dist > 1) {
          const norm = dist / lensRadius;
          const push = Math.sin(norm * Math.PI) * (1 - norm) * (26 + mouse.speed * 12);
          px += (dx / dist) * push;
          py += (dy / dist) * push;
        }

        return { x: px, y: py };
      });
    };

    // Main 60fps render loop
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

      // Fresh aqua/cyan liquid topographic colors matching reference
      const alphaMult = subtle ? 0.25 : 0.42;
      const primaryColor = `rgba(88, 216, 222, ${alphaMult})`;
      const secondaryColor = `rgba(125, 232, 238, ${alphaMult * 0.9})`;

      // 1. Draw Filled Wavy Ribbons
      ribbons.forEach((ribbon) => {
        const top = getDeformedPts(ribbon.topPts);
        const bot = getDeformedPts(ribbon.botPts);

        ctx.beginPath();
        traceSpline(ctx, top, true);
        ctx.lineTo(bot[bot.length - 1].x, bot[bot.length - 1].y);
        traceSpline(ctx, [...bot].reverse(), false);
        ctx.closePath();

        ctx.fillStyle = ribbon.isSecondary ? secondaryColor : primaryColor;
        ctx.fill();
      });

      // 2. Draw Filled Amoeba Rings with Holes & Islands
      amoebas.forEach((amoeba) => {
        const outer = getDeformedPts(amoeba.outerPts);

        ctx.beginPath();
        traceClosedLoop(ctx, outer);

        if (amoeba.hasHole && amoeba.innerPts.length > 0) {
          const inner = getDeformedPts(amoeba.innerPts);
          traceClosedLoop(ctx, [...inner].reverse());
        }

        ctx.fillStyle = amoeba.isSecondary ? secondaryColor : primaryColor;
        ctx.fill('evenodd'); // cuts out the hole cleanly!

        // Draw central island pebble
        if (amoeba.hasIsland && amoeba.islandPts.length > 0) {
          const island = getDeformedPts(amoeba.islandPts);
          ctx.beginPath();
          traceClosedLoop(ctx, island);
          ctx.fillStyle = amoeba.isSecondary ? secondaryColor : primaryColor;
          ctx.fill();
        }
      });

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
