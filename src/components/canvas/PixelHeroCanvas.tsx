'use client';

import { useEffect, useRef } from 'react';

export default function PixelHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    const pixelSize = 4;
    const centerX = size / 2;
    const centerY = size / 2;

    let rotation = 0;
    let time = 0;

    // Color palette
    const colors = {
      primary: '#da7756',
      bright: '#E88968',
      dark: '#B84545',
      muted: '#8F2C2C',
      dim: '#5C1E1E',
      bg: '#0E0B0C',
    };

    // Draw pixel at grid position
    const drawPixel = (x: number, y: number, color: string, size: number = pixelSize) => {
      ctx.fillStyle = color;
      const px = Math.floor(x / size) * size;
      const py = Math.floor(y / size) * size;
      ctx.fillRect(px, py, size, size);
    };

    // Draw pixelated circle
    const drawPixelCircle = (cx: number, cy: number, radius: number, color: string) => {
      for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        drawPixel(x, y, color);
      }
    };

    // Draw pixelated line
    const drawPixelLine = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const steps = Math.max(Math.abs(dx), Math.abs(dy)) / pixelSize;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x1 + dx * t;
        const y = y1 + dy * t;
        drawPixel(x, y, color);
      }
    };

    // Generate stars
    const stars: { x: number; y: number; brightness: number; speed: number }[] = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * size,
        y: Math.random() * size,
        brightness: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, size, size);

      time += 0.016;
      rotation += 0.005;

      // Draw animated stars
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > size) {
          star.y = 0;
          star.x = Math.random() * size;
        }

        const twinkle = Math.sin(time * 2 + star.x) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;
        ctx.fillStyle = `rgba(218, 119, 86, ${alpha})`;
        ctx.fillRect(
          Math.floor(star.x / pixelSize) * pixelSize,
          Math.floor(star.y / pixelSize) * pixelSize,
          pixelSize,
          pixelSize
        );
      });

      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer rotating ring
      ctx.save();
      ctx.rotate(rotation);
      drawPixelCircle(0, 0, 140, colors.dim);
      ctx.restore();

      // Middle counter-rotating ring
      ctx.save();
      ctx.rotate(-rotation * 1.5);
      drawPixelCircle(0, 0, 100, colors.muted);

      // Draw geometric points on ring
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 100;
        // Draw larger pixel blocks at points
        for (let px = -2; px <= 2; px++) {
          for (let py = -2; py <= 2; py++) {
            drawPixel(x + px * pixelSize, y + py * pixelSize, colors.dark);
          }
        }
      }
      ctx.restore();

      // Inner rotating square
      ctx.save();
      ctx.rotate(rotation * 2);
      const squareSize = 60;
      // Top
      drawPixelLine(-squareSize, -squareSize, squareSize, -squareSize, colors.primary);
      // Right
      drawPixelLine(squareSize, -squareSize, squareSize, squareSize, colors.primary);
      // Bottom
      drawPixelLine(squareSize, squareSize, -squareSize, squareSize, colors.primary);
      // Left
      drawPixelLine(-squareSize, squareSize, -squareSize, -squareSize, colors.primary);
      ctx.restore();

      // Inner diamond (counter-rotate)
      ctx.save();
      ctx.rotate(-rotation * 2.5);
      const diamondSize = 35;
      drawPixelLine(0, -diamondSize, diamondSize, 0, colors.bright);
      drawPixelLine(diamondSize, 0, 0, diamondSize, colors.bright);
      drawPixelLine(0, diamondSize, -diamondSize, 0, colors.bright);
      drawPixelLine(-diamondSize, 0, 0, -diamondSize, colors.bright);
      ctx.restore();

      // Center pulsing core
      const pulse = Math.sin(time * 3) * 0.3 + 0.7;
      const coreSize = 12 + pulse * 4;
      ctx.fillStyle = colors.primary;
      ctx.fillRect(-coreSize / 2, -coreSize / 2, coreSize, coreSize);

      // Small orbiting particles
      for (let i = 0; i < 6; i++) {
        const orbitAngle = rotation * 3 + (Math.PI * 2 / 6) * i;
        const orbitRadius = 70 + Math.sin(time * 2 + i) * 10;
        const px = Math.cos(orbitAngle) * orbitRadius;
        const py = Math.sin(orbitAngle) * orbitRadius;
        drawPixel(px, py, colors.bright, pixelSize * 2);
      }

      ctx.restore();

      // Corner decorations
      const cornerDots = '◆ ◆ ◆';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillStyle = colors.dim;
      ctx.fillText(cornerDots, 12, 24);
      ctx.fillText(cornerDots, size - 60, size - 12);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pixelated"
      style={{ imageRendering: 'pixelated' }}
      aria-label="Animated pixel art geometric symbol"
    />
  );
}
