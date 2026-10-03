import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground:
 * Renders an expansive, multi-layered organic liquid marble & topographical wave pattern:
 * - 11 richly layered flowing contour waves covering the background
 * - Left wave folds, center diagonal silk ribbons, right drapery cascades, and horizontal swells
 * - Smooth anti-aliased cubic Bézier curves (ZERO pixels, ZERO chunky puddles)
 * - Noticeable 60fps dual-harmonic wave animation
 * - Interactive cursor wake deflection
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
      radius: 340,
      speed: 0
    };

    let prevMouseX = -2000;
    let prevMouseY = -2000;
    let time = 0;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper: draw smooth cubic bezier spline through points
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

        const cp1x = p1.x + (p2.x - p0.x) / 4.6;
        const cp1y = p1.y + (p2.y - p0.y) / 4.6;
        const cp2x = p2.x - (p3.x - p1.x) / 4.6;
        const cp2y = p2.y - (p3.y - p1.y) / 4.6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    let waveLayers = [];

    // Helper to generate a wave control point with lively dual-harmonic speed & amplitude
    const makePt = (x, y, ampX = 55, ampY = 48, freq = 0.0018, phaseOffset = 0) => ({
      baseX: x,
      baseY: y,
      ampX,
      ampY,
      speedX: freq,
      speedY: freq * 0.92,
      phaseX: ((x * 0.004 + y * 0.003) + phaseOffset) % (Math.PI * 2),
      phaseY: ((x * 0.003 - y * 0.004) + phaseOffset) % (Math.PI * 2)
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

      // 1. LEFT WAVE SYSTEM — 3 concentric flowing liquid contours
      const leftBroad = [
        makePt(-90, -90, 0, 0),
        makePt(0.18 * width, 0.08 * height, 55, 50, 0.0016, 0.2),
        makePt(0.08 * width, 0.32 * height, 65, 54, 0.0019, 1.0),
        makePt(0.24 * width, 0.58 * height, 72, 60, 0.0015, 1.9),
        makePt(0.11 * width, 0.82 * height, 58, 50, 0.0018, 2.8),
        makePt(0.28 * width, height + 90, 52, 45, 0.0016, 3.6),
        makePt(-90, height + 90, 0, 0)
      ];

      const leftMid = [
        makePt(-90, -90, 0, 0),
        makePt(0.12 * width, 0.12 * height, 48, 44, 0.0017, 0.6),
        makePt(0.04 * width, 0.34 * height, 56, 48, 0.0020, 1.4),
        makePt(0.16 * width, 0.60 * height, 62, 52, 0.0016, 2.3),
        makePt(0.06 * width, 0.80 * height, 48, 42, 0.0019, 3.1),
        makePt(0.18 * width, height + 90, 44, 38, 0.0017, 4.0),
        makePt(-90, height + 90, 0, 0)
      ];

      const leftDeep = [
        makePt(-90, -90, 0, 0),
        makePt(0.06 * width, 0.16 * height, 38, 36, 0.0018, 1.0),
        makePt(0.01 * width, 0.36 * height, 44, 40, 0.0021, 1.8),
        makePt(0.09 * width, 0.62 * height, 48, 44, 0.0017, 2.7),
        makePt(0.02 * width, 0.78 * height, 38, 34, 0.0020, 3.5),
        makePt(0.10 * width, height + 90, 36, 32, 0.0018, 4.4),
        makePt(-90, height + 90, 0, 0)
      ];

      // 2. CENTER DIAGONAL SILK RIBBONS — 3 flowing diagonal rivers
      const centerBack = [
        makePt(0.28 * width, -90, 58, 48, 0.0015, 0.8),
        makePt(0.42 * width, 0.22 * height, 72, 60, 0.0018, 1.7),
        makePt(0.30 * width, 0.50 * height, 78, 64, 0.0016, 2.6),
        makePt(0.48 * width, 0.74 * height, 68, 56, 0.0019, 3.4),
        makePt(0.60 * width, height + 90, 60, 50, 0.0015, 4.3),
        makePt(width + 90, height + 90, 0, 0),
        makePt(width + 90, -90, 0, 0)
      ];

      const centerMid = [
        makePt(0.38 * width, -90, 52, 45, 0.0016, 1.3),
        makePt(0.50 * width, 0.26 * height, 66, 55, 0.0019, 2.1),
        makePt(0.38 * width, 0.54 * height, 72, 60, 0.0017, 3.0),
        makePt(0.56 * width, 0.78 * height, 64, 52, 0.0020, 3.8),
        makePt(0.70 * width, height + 90, 55, 46, 0.0016, 4.7),
        makePt(width + 90, height + 90, 0, 0),
        makePt(width + 90, -90, 0, 0)
      ];

      const centerFront = [
        makePt(0.48 * width, -90, 48, 40, 0.0017, 1.8),
        makePt(0.58 * width, 0.28 * height, 58, 50, 0.0020, 2.6),
        makePt(0.46 * width, 0.56 * height, 64, 54, 0.0018, 3.5),
        makePt(0.64 * width, 0.80 * height, 58, 48, 0.0021, 4.3),
        makePt(0.78 * width, height + 90, 50, 42, 0.0017, 5.2),
        makePt(width + 90, height + 90, 0, 0),
        makePt(width + 90, -90, 0, 0)
      ];

      // 3. RIGHT WAVE SYSTEM — 3 cascading fluid folds
      const rightBroad = [
        makePt(0.62 * width, -90, 54, 48, 0.0016, 2.0),
        makePt(0.80 * width, 0.20 * height, 68, 58, 0.0018, 2.9),
        makePt(0.68 * width, 0.46 * height, 74, 62, 0.0015, 3.8),
        makePt(0.88 * width, 0.72 * height, 62, 54, 0.0019, 4.7),
        makePt(0.74 * width, height + 90, 58, 48, 0.0016, 5.5),
        makePt(width + 90, height + 90, 0, 0),
        makePt(width + 90, -90, 0, 0)
      ];

      const rightMid = [
        makePt(0.74 * width, -90, 48, 42, 0.0017, 2.5),
        makePt(0.88 * width, 0.24 * height, 58, 52, 0.0020, 3.4),
        makePt(0.78 * width, 0.50 * height, 64, 56, 0.0016, 4.3),
        makePt(0.94 * width, 0.76 * height, 54, 48, 0.0019, 5.2),
        makePt(0.84 * width, height + 90, 50, 44, 0.0017, 6.0),
        makePt(width + 90, height + 90, 0, 0),
        makePt(width + 90, -90, 0, 0)
      ];

      const rightDeep = [
        makePt(0.86 * width, -90, 40, 36, 0.0018, 3.0),
        makePt(0.96 * width, 0.28 * height, 48, 44, 0.0021, 3.9),
        makePt(0.88 * width, 0.54 * height, 52, 46, 0.0017, 4.8),
        makePt(0.98 * width, 0.78 * height, 44, 40, 0.0020, 5.7),
        makePt(0.92 * width, height + 90, 42, 36, 0.0018, 6.5),
        makePt(width + 90, height + 90, 0, 0),
        makePt(width + 90, -90, 0, 0)
      ];

      // 4. TOP & BOTTOM SWELL WAVES — horizontal flowing waves
      const topSwell = [
        makePt(-90, 0.14 * height, 50, 35, 0.0019, 0.5),
        makePt(0.25 * width, 0.06 * height, 55, 40, 0.0016, 1.8),
        makePt(0.50 * width, 0.16 * height, 60, 45, 0.0020, 3.1),
        makePt(0.75 * width, 0.08 * height, 55, 38, 0.0017, 4.4),
        makePt(width + 90, 0.15 * height, 50, 35, 0.0019, 5.7),
        makePt(width + 90, -90, 0, 0),
        makePt(-90, -90, 0, 0)
      ];

      const bottomSwell = [
        makePt(-90, 0.88 * height, 52, 42, 0.0018, 1.2),
        makePt(0.30 * width, 0.94 * height, 60, 48, 0.0016, 2.5),
        makePt(0.60 * width, 0.84 * height, 65, 52, 0.0020, 3.8),
        makePt(0.85 * width, 0.92 * height, 58, 45, 0.0017, 5.1),
        makePt(width + 90, 0.86 * height, 52, 42, 0.0019, 6.4),
        makePt(width + 90, height + 90, 0, 0),
        makePt(-90, height + 90, 0, 0)
      ];

      // Rich multi-wave palette with strong, noticeable contrast
      const alphaMult = subtle ? 0.55 : 1.0;
      waveLayers = [
        { pts: topSwell, color: `rgba(135, 235, 240, ${0.50 * alphaMult})` },
        { pts: bottomSwell, color: `rgba(110, 225, 232, ${0.60 * alphaMult})` },
        { pts: centerBack, color: `rgba(125, 230, 236, ${0.55 * alphaMult})` },
        { pts: leftBroad, color: `rgba(105, 222, 228, ${0.68 * alphaMult})` },
        { pts: rightBroad, color: `rgba(98, 218, 225, ${0.70 * alphaMult})` },
        { pts: centerMid, color: `rgba(88, 212, 220, ${0.75 * alphaMult})` },
        { pts: leftMid, color: `rgba(74, 204, 212, ${0.80 * alphaMult})` },
        { pts: rightMid, color: `rgba(66, 198, 206, ${0.82 * alphaMult})` },
        { pts: centerFront, color: `rgba(118, 226, 232, ${0.65 * alphaMult})` },
        { pts: leftDeep, color: `rgba(48, 186, 196, ${0.88 * alphaMult})` },
        { pts: rightDeep, color: `rgba(42, 178, 188, ${0.90 * alphaMult})` }
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
        mouse.speed = Math.min(dist / 10, 6.0);
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

    // Calculate deformed points based on dual harmonics & mouse repulsion
    const getDeformedPts = (pts) => {
      const lensRadius = mouse.radius;

      return pts.map((pt) => {
        let px = pt.baseX;
        let py = pt.baseY;

        if (pt.ampX > 0 && !prefersReducedMotion) {
          // Noticeable, lively dual-harmonic fluid undulation
          px += Math.sin(time * pt.speedX + pt.phaseX) * pt.ampX + Math.cos(time * pt.speedX * 1.6 + pt.phaseY) * (pt.ampX * 0.4);
          py += Math.cos(time * pt.speedY + pt.phaseY) * pt.ampY + Math.sin(time * pt.speedY * 1.4 + pt.phaseX) * (pt.ampY * 0.4);
        }

        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < lensRadius && dist > 1) {
          const norm = dist / lensRadius;
          const push = Math.sin(norm * Math.PI) * (1 - norm) * (48 + mouse.speed * 28);
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

      // Base canvas background
      ctx.fillStyle = '#9EF6F9';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;
      mouse.speed *= 0.94;

      // Draw all 11 rich, flowing wave layers
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
