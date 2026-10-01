import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground:
 * Renders a high-resolution, vector-smooth organic topographic pattern:
 * - 100% DPR-aware vector Bézier curves (zero pixelation on Retina/1440p displays)
 * - Soft, airy, light blue palette matching the Contact page aesthetic
 * - Fewer bands, larger shapes, wider curves, and generous negative space (uncluttered)
 * - Smooth continuous liquid deformation (waves gently undulate and breathe)
 * - Soft concave gel/liquid cursor deflection (curves bend and ripple under touch)
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

    // Deterministic random
    const createRandom = (seed) => {
      let s = seed;
      return () => {
        s = Math.sin(s) * 10000;
        return s - Math.floor(s);
      };
    };

    let topographicLayers = [];

    // Smooth cubic bezier spline through control points
    const drawSmoothPath = (ctx, points, closed = false) => {
      if (points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      if (closed) {
        const len = points.length;
        for (let i = 0; i < len; i++) {
          const p0 = points[(i - 1 + len) % len];
          const p1 = points[i];
          const p2 = points[(i + 1) % len];
          const p3 = points[(i + 2) % len];

          const cp1x = p1.x + (p2.x - p0.x) / 5.5;
          const cp1y = p1.y + (p2.y - p0.y) / 5.5;
          const cp2x = p2.x - (p3.x - p1.x) / 5.5;
          const cp2y = p2.y - (p3.y - p1.y) / 5.5;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
        ctx.closePath();
      } else {
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = i > 0 ? points[i - 1] : points[i];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = i < points.length - 2 ? points[i + 2] : p2;

          const cp1x = p1.x + (p2.x - p0.x) / 5.5;
          const cp1y = p1.y + (p2.y - p0.y) / 5.5;
          const cp2x = p2.x - (p3.x - p1.x) / 5.5;
          const cp2y = p2.y - (p3.y - p1.y) / 5.5;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
      }
    };

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);

      // High-resolution Retina/1440p vector canvas
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      const rand = createRandom(5555);
      topographicLayers = [];

      // Wide, lush stroke width with ample negative space
      const strokeW = Math.max(40, Math.min(62, width * 0.038));

      // Soft, airy blue palette matching the Contact page
      // Soft tone-on-tone: gentle, clean, airy, not psychedelic
      const alphaBase = subtle ? 0.22 : 0.32;
      const primaryColor = `rgba(70, 142, 226, ${alphaBase})`;
      const secondaryColor = `rgba(105, 175, 245, ${alphaBase * 0.88})`;
      const accentPebbleColor = `rgba(80, 152, 232, ${alphaBase * 0.95})`;

      const makePoint = (x, y, amp = 16) => ({
        baseX: x,
        baseY: y,
        ampX: amp + rand() * 8,
        ampY: amp + rand() * 8,
        speedX: 0.0002 + rand() * 0.0002,
        speedY: 0.00018 + rand() * 0.0002,
        phaseX: rand() * Math.PI * 2,
        phaseY: rand() * Math.PI * 2
      });

      // 1. FEWER, WIDER SWEEPING HORIZONTAL RIVERS (Calm, broad curves)
      // Only 4 sweeping waves across the entire canvas height
      const riverYPositions = [
        0.06 * height,
        0.26 * height,
        0.72 * height,
        0.94 * height
      ];

      riverYPositions.forEach((baseY, idx) => {
        const points = [];
        const numSegments = 7; // fewer segments = wider, smoother, calmer curves
        const stepX = (width * 1.35) / numSegments;
        const startX = -0.18 * width;

        for (let i = 0; i <= numSegments; i++) {
          const x = startX + i * stepX;
          const wave = Math.sin(i * 0.95 + idx * 1.8) * (height * 0.065) +
                       Math.cos(i * 0.7 + idx) * (height * 0.035);
          points.push(makePoint(x, baseY + wave, 18));
        }

        topographicLayers.push({
          type: 'ribbon',
          points,
          closed: false,
          strokeColor: idx % 2 === 0 ? primaryColor : secondaryColor,
          strokeWidth: strokeW
        });
      });

      // 2. LARGE, CALM AMOEBA CONTOUR LOOPS (Placed in generous negative spaces)
      // Only 4 large, spacious organic loops
      const loopConfigs = [
        // Upper-left spacious loop + pebble
        { cx: 0.13 * width, cy: 0.28 * height, rx: 0.12 * width, ry: 0.13 * height, nested: true, hasDot: true },
        // Upper-right calm kidney loop
        { cx: 0.88 * width, cy: 0.25 * height, rx: 0.11 * width, ry: 0.15 * height, nested: true, hasDot: false },
        // Lower-left soft rounded oval
        { cx: 0.15 * width, cy: 0.74 * height, rx: 0.13 * width, ry: 0.11 * height, nested: true, hasDot: true },
        // Lower-right elongated contour ring
        { cx: 0.86 * width, cy: 0.76 * height, rx: 0.12 * width, ry: 0.14 * height, nested: true, hasDot: true }
      ];

      loopConfigs.forEach((cfg, lIdx) => {
        const numPts = 6;
        const outerPoints = [];

        for (let i = 0; i < numPts; i++) {
          const theta = (i / numPts) * Math.PI * 2;
          const jitter = 1 + (rand() - 0.5) * 0.28;
          const px = cfg.cx + Math.cos(theta) * (cfg.rx * jitter);
          const py = cfg.cy + Math.sin(theta) * (cfg.ry * jitter);
          outerPoints.push(makePoint(px, py, 14));
        }

        topographicLayers.push({
          type: 'amoeba',
          points: outerPoints,
          closed: true,
          strokeColor: lIdx % 2 === 0 ? primaryColor : secondaryColor,
          strokeWidth: strokeW
        });

        // Nested inner contour ring
        if (cfg.nested) {
          const innerPoints = [];
          const innerScale = 0.52;
          for (let i = 0; i < numPts; i++) {
            const theta = (i / numPts) * Math.PI * 2;
            const jitter = 1 + (rand() - 0.5) * 0.22;
            const px = cfg.cx + Math.cos(theta) * (cfg.rx * innerScale * jitter);
            const py = cfg.cy + Math.sin(theta) * (cfg.ry * innerScale * jitter);
            innerPoints.push(makePoint(px, py, 10));
          }

          topographicLayers.push({
            type: 'amoeba',
            points: innerPoints,
            closed: true,
            strokeColor: secondaryColor,
            strokeWidth: strokeW
          });
        }

        // Center pebble dot
        if (cfg.hasDot) {
          topographicLayers.push({
            type: 'dot',
            center: makePoint(cfg.cx, cfg.cy, 10),
            radius: strokeW * 0.45,
            fillColor: accentPebbleColor
          });
        }
      });
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
    // SMOOTH VECTOR FLUID RENDER LOOP
    // =========================================================================
    const render = (timestamp) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time = prefersReducedMotion ? 0 : timestamp;
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor follow
      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;
      mouse.speed *= 0.94;

      const lensRadius = mouse.radius;

      // Render vector paths
      for (let l = 0; l < topographicLayers.length; l++) {
        const layer = topographicLayers[l];

        if (layer.type === 'dot') {
          const pt = layer.center;
          let px = pt.baseX + Math.sin(time * pt.speedX + pt.phaseX) * pt.ampX;
          let py = pt.baseY + Math.cos(time * pt.speedY + pt.phaseY) * pt.ampY;

          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < lensRadius && dist > 1) {
            const norm = dist / lensRadius;
            const push = Math.sin(norm * Math.PI) * (1 - norm) * (24 + mouse.speed * 10);
            px += (dx / dist) * push;
            py += (dy / dist) * push;
          }

          ctx.fillStyle = layer.fillColor;
          ctx.beginPath();
          ctx.arc(px, py, layer.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const deformedPoints = layer.points.map((pt) => {
            let px = pt.baseX + Math.sin(time * pt.speedX + pt.phaseX) * pt.ampX +
                     Math.cos(time * pt.speedY * 0.8 + pt.phaseY) * (pt.ampX * 0.4);
            let py = pt.baseY + Math.cos(time * pt.speedY + pt.phaseY) * pt.ampY +
                     Math.sin(time * pt.speedX * 0.8 + pt.phaseX) * (pt.ampY * 0.4);

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

          ctx.strokeStyle = layer.strokeColor;
          ctx.lineWidth = layer.strokeWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          drawSmoothPath(ctx, deformedPoints, layer.closed);
          ctx.stroke();
        }
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
