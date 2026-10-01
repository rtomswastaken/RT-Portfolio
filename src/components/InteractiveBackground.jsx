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

    // Mouse coordinates (default off-screen)
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 200 };
    let time = 0;

    const spacing = 48;
    let nodes = [];

    const initNodes = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      nodes = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originX = (c - 0.5) * spacing;
          const originY = (r - 0.5) * spacing;
          // Alternate between cross (+), ring (o), and solid dot for an authentic risograph print look
          const type = (c + r) % 3 === 0 ? 'cross' : (c + r) % 3 === 1 ? 'ring' : 'dot';
          nodes.push({
            originX,
            originY,
            x: originX,
            y: originY,
            type,
            baseSize: type === 'cross' ? 4.5 : type === 'ring' ? 4 : 3,
            size: type === 'cross' ? 4.5 : type === 'ring' ? 4 : 3
          });
        }
      }
    };

    initNodes();

    const handleResize = () => {
      initNodes();
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
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;

      // Draw clearly visible risograph blue grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(20, 85, 175, 0.22)';
      ctx.beginPath();
      for (let x = 0; x <= width; x += spacing * 2) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += spacing * 2) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render physical reactive pattern marks (crosses, rings, dots)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const dx = mouse.x - node.originX;
        const dy = mouse.y - node.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = node.originX;
        let targetY = node.originY;
        let currentSize = node.baseSize;
        let currentAlpha = 0.52; // Crisp, clearly visible base opacity
        let strokeColor = 'rgba(15, 75, 170, 0.52)';

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius);
          const angle = Math.atan2(dy, dx);
          
          // Physical elastic distortion: wave ripple + push away
          const ripple = Math.sin(dist * 0.06 - time * 2.5) * 5;
          const push = force * 14 + ripple;

          targetX = node.originX - Math.cos(angle) * push;
          targetY = node.originY - Math.sin(angle) * push;
          
          currentSize = node.baseSize + force * 3.5;
          currentAlpha = 0.52 + force * 0.45; // Intensifies to ~0.97 saturated cobalt blue
          strokeColor = `rgba(0, 80, 220, ${currentAlpha})`;
        } else {
          // Gentle ambient breathing
          targetX = node.originX + Math.sin(time + node.originY * 0.02) * 1.2;
          targetY = node.originY + Math.cos(time + node.originX * 0.02) * 1.2;
        }

        // Spring ease
        node.x += (targetX - node.x) * 0.18;
        node.y += (targetY - node.y) * 0.18;

        ctx.fillStyle = strokeColor;
        ctx.strokeStyle = strokeColor;

        if (node.type === 'cross') {
          ctx.lineWidth = 1.8;
          const s = currentSize;
          ctx.beginPath();
          ctx.moveTo(node.x - s, node.y);
          ctx.lineTo(node.x + s, node.y);
          ctx.moveTo(node.x, node.y - s);
          ctx.lineTo(node.x, node.y + s);
          ctx.stroke();
        } else if (node.type === 'ring') {
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
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
