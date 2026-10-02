import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground:
 * Renders the authentic, smooth organic liquid marble / wavy contour pattern
 * matching the user's reference image:
 * - Smooth vertical & diagonal flowing liquid wave contour ribbons
 * - Anti-aliased Bézier splines (ZERO PIXELS, ZERO circular amoeba puddles)
 * - Exact fresh aqua / cyan palette matching reference (#9EF6F9 & #93E7EB tones)
 * - 60fps calm fluid motion & reactive cursor water-deflection
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
      radius: 260,
      speed: 0
    };

    let prevMouseX = -2000;
    let prevMouseY = -2000;
    let time = 0;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper: draw cubic bezier spline through points
    const drawSpline = (ctx, pts, startWithMoveTo = true) => {
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

        const cp1x = p1.x + (p2.x - p0.x) / 4.8;
        const cp1y = p1.y + (p2.y - p0.y) / 4.8;
        const cp2x = p2.x - (p3.x - p1.x) / 4.8;
        const cp2y = p2.y - (p3.y - p1.y) / 4.8;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    let waveLayers = [];

    const makePt = (x, y, ampX = 18, ampY = 18, freq = 0.00035, phaseOffset = 0) => ({
      baseX: x,
      baseY: y,
      ampX,
      ampY,
      speedX: freq,
      speedY: freq * 0.92,
      phaseX: ((x * 0.003 + y * 0.002) + phaseOffset) % (Math.PI * 2),
      phaseY: ((x * 0.002 - y * 0.003) + phaseOffset) % (Math.PI * 2)
    });

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

      waveLayers = [];

      // Layer 1: Left broad fluid wave with smooth S-curves
      const leftOuter = [
        makePt(-60, -60, 0, 0),
        makePt(0.12 * width, 0.12 * height, 16, 20, 0.0003, 0.5),
        makePt(0.05 * width, 0.38 * height, 22, 18, 0.00035, 1.2),
        makePt(0.16 * width, 0.62 * height, 25, 22, 0.00028, 2.1),
        makePt(0.08 * width, 0.84 * height, 18, 16, 0.00032, 3.0),
        makePt(0.22 * width, height + 60, 20, 15, 0.0003, 3.8),
        makePt(-60, height + 60, 0, 0)
      ];

      // Layer 2: Left inner concentric contour tongue
      const leftInner = [
        makePt(-60, -60, 0, 0),
        makePt(0.06 * width, 0.16 * height, 12, 16, 0.0003, 0.8),
        makePt(0.01 * width, 0.36 * height, 16, 14, 0.00035, 1.5),
        makePt(0.10 * width, 0.64 * height, 18, 18, 0.00028, 2.4),
        makePt(0.02 * width, 0.82 * height, 14, 14, 0.00032, 3.3),
        makePt(0.13 * width, height + 60, 15, 12, 0.0003, 4.1),
        makePt(-60, height + 60, 0, 0)
      ];

      // Layer 3: Smooth diagonal crest running through upper center
      const centerDiagonal = [
        makePt(0.38 * width, -60, 22, 16, 0.00025, 1.0),
        makePt(0.44 * width, 0.25 * height, 28, 24, 0.00032, 1.8),
        makePt(0.34 * width, 0.54 * height, 32, 26, 0.00027, 2.7),
        makePt(0.48 * width, 0.78 * height, 28, 22, 0.00031, 3.5),
        makePt(0.62 * width, height + 60, 24, 18, 0.00028, 4.2),
        makePt(width + 60, height + 60, 0, 0),
        makePt(width + 60, -60, 0, 0)
      ];

      // Layer 4: Right-side fluid folds (as seen in reference right margin)
      const rightOuter = [
        makePt(0.72 * width, -60, 20, 18, 0.0003, 2.2),
        makePt(0.85 * width, 0.24 * height, 26, 22, 0.00034, 3.1),
        makePt(0.77 * width, 0.50 * height, 28, 24, 0.00029, 4.0),
        makePt(0.90 * width, 0.76 * height, 22, 20, 0.00033, 4.8),
        makePt(0.82 * width, height + 60, 24, 18, 0.0003, 5.5),
        makePt(width + 60, height + 60, 0, 0),
        makePt(width + 60, -60, 0, 0)
      ];

      // Layer 5: Far-right edge contour band
      const rightInner = [
        makePt(0.86 * width, -60, 15, 14, 0.0003, 2.8),
        makePt(0.94 * width, 0.28 * height, 18, 16, 0.00034, 3.7),
        makePt(0.89 * width, 0.53 * height, 20, 18, 0.00029, 4.5),
        makePt(0.96 * width, 0.78 * height, 16, 14, 0.00033, 5.3),
        makePt(0.91 * width, height + 60, 18, 15, 0.0003, 6.1),
        makePt(width + 60, height + 60, 0, 0),
        makePt(width + 60, -60, 0, 0)
      ];

      waveLayers = [
        { pts: leftOuter, color: 'rgba(147, 231, 235, 0.65)' },
        { pts: leftInner, color: 'rgba(140, 224, 229, 0.75)' },
        { pts: centerDiagonal, color: 'rgba(149, 232, 237, 0.55)' },
        { pts: rightOuter, color: 'rgba(143, 226, 231, 0.70)' },
        { pts: rightInner, color: 'rgba(133, 220, 226, 0.80)' }
      ];
    };

    initShapes();

    const handleResize = () => {
      initShapes();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (prevMouseX > -1000) {
        const dx = currentX - prevMouseX;
        const dy = currentY - prevMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        mouse.speed = Math.min(dist / 14, 4.5);
      }

      prevMouseX = currentX;
      prevMouseY = currentY;

      mouse.targetX = currentX;
      mouse.targetY = currentY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.speed = 0;
      prevMouseX = -2000;
      prevMouseY = -2000;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // Calculate deformed points based on time & mouse repulsion
    const getDeformedPts = (pts) => {
      const lensRadius = mouse.radius;

      return pts.map((pt) => {
        let px = pt.baseX;
        let py = pt.baseY;

        if (pt.ampX > 0 && !prefersReducedMotion) {
          px += Math.sin(time * pt.speedX + pt.phaseX) * pt.ampX;
          py += Math.cos(time * pt.speedY + pt.phaseY) * pt.ampY;
        }

        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < lensRadius && dist > 1) {
          const norm = dist / lensRadius;
          const push = Math.sin(norm * Math.PI) * (1 - norm) * (30 + mouse.speed * 16);
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

      // Base canvas background matching reference #9EF6F9
      ctx.fillStyle = '#9EF6F9';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      mouse.speed *= 0.94;

      // Draw each smooth flowing wave layer
      waveLayers.forEach((layer) => {
        const deformed = getDeformedPts(layer.pts);

        ctx.beginPath();
        drawSpline(ctx, deformed, true);
        ctx.closePath();

        ctx.fillStyle = layer.color;
        ctx.fill();
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
