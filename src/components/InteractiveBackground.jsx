import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default off-screen)
    let mouse = { x: -1000, y: -1000, radius: 130 };
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const spacing = 34;
    let dots = [];

    const initDots = () => {
      dots = [];
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originX = c * spacing;
          const originY = r * spacing;
          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            size: 1.6,
            baseAlpha: 0.14
          });
        }
      }
    };

    initDots();

    const handleResize = () => {
      initDots();
      if (isTouch) {
        drawStatic();
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(28, 86, 160, 0.12)';
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        ctx.beginPath();
        ctx.arc(d.originX, d.originY, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (isTouch) {
      drawStatic();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.originX;
        let targetY = dot.originY;
        let currentSize = dot.size;
        let currentAlpha = dot.baseAlpha;

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius);
          const angle = Math.atan2(dy, dx);
          // Gently push dot slightly away from cursor
          const push = force * 8;
          targetX = dot.originX - Math.cos(angle) * push;
          targetY = dot.originY - Math.sin(angle) * push;
          currentSize = dot.size + force * 1.6;
          currentAlpha = dot.baseAlpha + force * 0.45;
        }

        // Smooth spring ease
        dot.x += (targetX - dot.x) * 0.15;
        dot.y += (targetY - dot.y) * 0.15;

        ctx.fillStyle = `rgba(18, 76, 160, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
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
