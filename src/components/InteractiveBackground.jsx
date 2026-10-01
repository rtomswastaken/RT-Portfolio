import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground:
 * Renders a continuous, organic wavy / amoeba / topographic contour pattern
 * directly matching the reference image:
 * - Thick, uniform-weight flowing bands, rounded curves, nested amoeba loops, and islands
 * - Continuous graphic composition covering the entire viewport and continuing beyond edges
 * - Tone-on-tone blue palette: soft baby blue base (#B5DCF8) with rich medium blue contours (#3273C4)
 *   and subtle lighter blue secondary bands (#5E9EE4)
 * - Zero typography, zero text, zero letters
 * - Continuous ultra-slow liquid deformation (smooth warping/stretching of the entire field)
 * - Soft concave gel/rubber cursor interaction (bends and ripples contour curves naturally)
 * - High-efficiency smooth scalar field evaluated at 60 FPS
 */
export default function InteractiveBackground({ subtle = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;

    // Buffer dimensions for buttery smooth 60fps scalar field rendering
    // Upscaled smoothly via canvas CSS interpolation
    const bufferWidth = 480;
    let bufferHeight = Math.round(bufferWidth * (window.innerHeight / window.innerWidth));
    if (bufferHeight < 240) bufferHeight = 240;

    canvas.width = bufferWidth;
    canvas.height = bufferHeight;

    let imageData = ctx.createImageData(bufferWidth, bufferHeight);
    let data32 = new Uint32Array(imageData.data.buffer);

    let mouse = {
      x: -1,
      y: -1,
      targetX: -1,
      targetY: -1,
      intensity: 0,
      targetIntensity: 0
    };

    let prevMouseX = -1;
    let prevMouseY = -1;
    let time = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Topographic amoeba centers (hills and depressions creating nested loops & islands)
    const centers = [
      { baseX: 0.18, baseY: 0.35, strength: 2.3, spread: 45, phaseX: 0.4, phaseY: 1.2 },
      { baseX: 0.82, baseY: 0.32, strength: -2.1, spread: 38, phaseX: 2.1, phaseY: 0.8 },
      { baseX: 0.30, baseY: 0.62, strength: 2.4, spread: 42, phaseX: 3.5, phaseY: 2.7 },
      { baseX: 0.72, baseY: 0.60, strength: 2.2, spread: 40, phaseX: 1.8, phaseY: 3.9 },
      { baseX: 0.22, baseY: 0.84, strength: -1.9, spread: 50, phaseX: 4.2, phaseY: 1.5 },
      { baseX: 0.84, baseY: 0.82, strength: 2.2, spread: 44, phaseX: 5.1, phaseY: 4.4 },
      { baseX: 0.50, baseY: 0.16, strength: -1.8, spread: 48, phaseX: 0.9, phaseY: 2.3 }
    ];

    // Color definitions (Packed 32-bit ABGR for maximum performance)
    // Little-endian order: (A << 24) | (B << 16) | (G << 8) | R
    const aMult = subtle ? 0.35 : 1.0;

    // Base: Soft baby blue (#B5DCF8) -> R: 181, G: 220, B: 248
    const baseR = 181, baseG = 220, baseB = 248;

    // Pattern 1: Noticeably darker medium blue (#3273C4) -> R: 50, G: 115, B: 196
    const pat1R = Math.round(baseR * (1 - aMult) + 50 * aMult);
    const pat1G = Math.round(baseG * (1 - aMult) + 115 * aMult);
    const pat1B = Math.round(baseB * (1 - aMult) + 196 * aMult);

    // Pattern 2: Secondary slightly lighter blue (#5E9EE4) -> R: 94, G: 158, B: 228
    const pat2R = Math.round(baseR * (1 - aMult) + 94 * aMult);
    const pat2G = Math.round(baseG * (1 - aMult) + 158 * aMult);
    const pat2B = Math.round(baseB * (1 - aMult) + 228 * aMult);

    const handleResize = () => {
      bufferHeight = Math.round(bufferWidth * (window.innerHeight / window.innerWidth));
      if (bufferHeight < 240) bufferHeight = 240;
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
      imageData = ctx.createImageData(bufferWidth, bufferHeight);
      data32 = new Uint32Array(imageData.data.buffer);
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX / window.innerWidth;
      mouse.targetY = e.clientY / window.innerHeight;
      mouse.targetIntensity = 1.0;

      const speed = Math.hypot(e.clientX - prevMouseX, e.clientY - prevMouseY);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetIntensity = 0.0;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Main 60fps render loop
    const render = (timestamp) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time = prefersReducedMotion ? 0 : timestamp;

      // Smooth mouse spring
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      mouse.intensity += (mouse.targetIntensity - mouse.intensity) * 0.08;

      const t1 = time * 0.00018;
      const t2 = time * 0.00022;

      // Calculate current drifting positions of amoeba centers
      const liveCenters = centers.map((c) => ({
        x: c.baseX + Math.sin(t1 + c.phaseX) * 0.025,
        y: c.baseY + Math.cos(t2 + c.phaseY) * 0.025,
        strength: c.strength * (1 + Math.sin(time * 0.0003 + c.phaseX) * 0.08),
        spread: c.spread
      }));

      const aspect = bufferWidth / bufferHeight;
      const mouseActive = mouse.intensity > 0.01 && mouse.x >= 0;
      const mx = mouse.x;
      const my = mouse.y;
      const mDepth = 2.4 * mouse.intensity;
      const mSpreadSq = 0.022; // localized concave indentation radius (~180px)

      let ptr = 0;

      for (let y = 0; y < bufferHeight; y++) {
        const ny = y / bufferHeight;

        for (let x = 0; x < bufferWidth; x++) {
          const nx = x / bufferWidth;

          // 1. Continuous flowing horizontal topographic wave field
          let val = ny * 7.2 +
                    Math.sin(nx * 5.2 + t1) * 0.95 +
                    Math.cos(nx * 3.6 - ny * 2.4 + t2) * 0.72 +
                    Math.sin((nx + ny) * 3.8 + t1 * 0.7) * 0.45;

          // 2. Nested amoebas & closed contour loops (hills/valleys)
          for (let i = 0; i < liveCenters.length; i++) {
            const lc = liveCenters[i];
            const dx = (nx - lc.x) * aspect;
            const dy = ny - lc.y;
            const distSq = dx * dx + dy * dy;
            val += lc.strength / (1.0 + distSq * lc.spread);
          }

          // 3. Soft concave rubber/gel cursor indentation
          if (mouseActive) {
            const mdx = (nx - mx) * aspect;
            const mdy = ny - my;
            const mDistSq = mdx * mdx + mdy * mdy;
            if (mDistSq < 0.08) {
              val += mDepth * Math.exp(-mDistSq / (2 * mSpreadSq));
            }
          }

          // 4. Alternating contour bands (sinusoidal isocontour mapping)
          const s = Math.sin(val * Math.PI);

          // Smooth antialiased band edge transition
          // When s > 0, pattern band; when s <= 0, base baby blue
          const factor = Math.max(0, Math.min(1, 0.5 + s * 3.8));

          let r = baseR;
          let g = baseG;
          let b = baseB;

          if (factor > 0) {
            // Secondary variation: alternate between Pattern 1 and Pattern 2 based on contour level
            const isSecondary = Math.floor(val) % 2 !== 0;
            const targetR = isSecondary ? pat2R : pat1R;
            const targetG = isSecondary ? pat2G : pat1G;
            const targetB = isSecondary ? pat2B : pat1B;

            r = Math.round(baseR * (1 - factor) + targetR * factor);
            g = Math.round(baseG * (1 - factor) + targetG * factor);
            b = Math.round(baseB * (1 - factor) + targetB * factor);
          }

          // Packed 32-bit pixel: (255 << 24) | (b << 16) | (g << 8) | r
          data32[ptr++] = (255 << 24) | (b << 16) | (g << 8) | r;
        }
      }

      ctx.putImageData(imageData, 0, 0);
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
