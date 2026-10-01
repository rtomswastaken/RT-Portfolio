import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
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

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 220 };
    let time = 0;

    let stamps = [];

    // Deterministic pseudo-random generator for consistent, organic placement
    const createSeededRandom = (seed) => {
      let s = seed;
      return () => {
        s = Math.sin(s) * 10000;
        return s - Math.floor(s);
      };
    };

    const initStamps = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      stamps = [];
      const count = Math.max(55, Math.floor((width * height) / 22000));
      const rand = createSeededRandom(42);

      for (let i = 0; i < count; i++) {
        // Organic, messy scattered positions across and slightly off the viewport
        const originX = (rand() * 1.15 - 0.08) * width;
        const originY = (rand() * 1.15 - 0.08) * height;
        
        // Variations in size (18px to 54px)
        const sizeCategory = rand();
        let fontSize = 22;
        if (sizeCategory < 0.25) fontSize = 16 + Math.floor(rand() * 6);
        else if (sizeCategory < 0.7) fontSize = 26 + Math.floor(rand() * 12);
        else fontSize = 42 + Math.floor(rand() * 16);

        // Different rotations (-28deg to +32deg)
        const baseAngle = (rand() - 0.5) * 1.1;

        // Distinct blue ink opacities: visible, messy, sketchbook stamp look
        const baseAlpha = 0.22 + rand() * 0.22; // 0.22 to 0.44

        // Font style variation (italic, normal, uppercase vs lowercase)
        const fontStyle = rand() > 0.4 ? 'italic' : 'normal';
        const fontWeight = rand() > 0.5 ? '800' : '900';
        const text = rand() > 0.12 ? 'rtoms' : 'RTOMS';

        stamps.push({
          originX,
          originY,
          x: originX,
          y: originY,
          baseAngle,
          angle: baseAngle,
          fontSize,
          scale: 1,
          baseAlpha,
          alpha: baseAlpha,
          fontStyle,
          fontWeight,
          text
        });
      }
    };

    initStamps();

    const handleResize = () => {
      initStamps();
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      for (let i = 0; i < stamps.length; i++) {
        const s = stamps[i];
        const dx = mouse.x - s.originX;
        const dy = mouse.y - s.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = s.originX;
        let targetY = s.originY;
        let targetAngle = s.baseAngle;
        let targetScale = 1;
        let targetAlpha = s.baseAlpha;

        if (dist < mouse.radius) {
          const force = 1 - dist / mouse.radius;
          const angleToMouse = Math.atan2(dy, dx);
          
          // Physical disturbance: gently push away and rotate
          const push = force * 20;
          targetX = s.originX - Math.cos(angleToMouse) * push;
          targetY = s.originY - Math.sin(angleToMouse) * push;
          
          targetAngle = s.baseAngle + (Math.sin(dist * 0.05 + time) * 0.25 * force);
          targetScale = 1 + force * 0.18;
          targetAlpha = Math.min(0.85, s.baseAlpha + force * 0.45); // Intensifies to vibrant cobalt blue
        } else {
          // Gentle ambient float
          targetX = s.originX + Math.sin(time + s.originY * 0.01) * 1.5;
          targetY = s.originY + Math.cos(time + s.originX * 0.01) * 1.5;
        }

        // Spring ease
        s.x += (targetX - s.x) * 0.14;
        s.y += (targetY - s.y) * 0.14;
        s.angle += (targetAngle - s.angle) * 0.14;
        s.scale += (targetScale - s.scale) * 0.14;
        s.alpha += (targetAlpha - s.alpha) * 0.14;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.scale(s.scale, s.scale);

        ctx.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize}px 'Bricolage Grotesque', sans-serif`;
        ctx.fillStyle = `rgba(14, 68, 160, ${s.alpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.text, 0, 0);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
