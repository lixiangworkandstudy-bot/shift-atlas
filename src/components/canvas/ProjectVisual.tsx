'use client';

import { useEffect, useRef } from 'react';

interface ProjectVisualProps {
  seed: number;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function ProjectVisual({
  seed,
  colors = {
    primary: '#da7756',
    secondary: '#8F2C2C',
    accent: '#E88968',
  }
}: ProjectVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 225; // 16:9 ratio

    const pixelSize = 4;
    let time = 0;

    // Seeded random for consistent patterns
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    // Different visual patterns based on seed
    const patterns = [
      // Pattern 0: Grid circuit
      (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.fillStyle = '#0A0808';
        ctx.fillRect(0, 0, w, h);

        // Draw circuit-like grid
        ctx.strokeStyle = colors.secondary;
        ctx.lineWidth = 2;

        for (let x = 0; x < w; x += 40) {
          for (let y = 0; y < h; y += 40) {
            const rand = seededRandom(seed + x + y);
            if (rand > 0.6) {
              // Horizontal line
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + 40, y);
              ctx.stroke();
            }
            if (rand > 0.3 && rand <= 0.6) {
              // Vertical line
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + 40);
              ctx.stroke();
            }
            // Node points
            if (rand > 0.7) {
              ctx.fillStyle = colors.primary;
              ctx.fillRect(x - 4, y - 4, 8, 8);
            }
          }
        }

        // Animated pulse
        const pulseX = (Math.sin(time) * 0.5 + 0.5) * w;
        const pulseY = (Math.cos(time * 0.7) * 0.5 + 0.5) * h;
        ctx.fillStyle = colors.accent;
        ctx.fillRect(
          Math.floor(pulseX / pixelSize) * pixelSize - 6,
          Math.floor(pulseY / pixelSize) * pixelSize - 6,
          12, 12
        );
      },

      // Pattern 1: Waveform
      (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.fillStyle = '#0A0808';
        ctx.fillRect(0, 0, w, h);

        // Draw multiple wave layers
        for (let layer = 0; layer < 3; layer++) {
          const layerColors = [colors.secondary, colors.primary, colors.accent];
          ctx.fillStyle = layerColors[layer];

          for (let x = 0; x < w; x += pixelSize) {
            const wave1 = Math.sin((x / 50) + time + layer) * 30;
            const wave2 = Math.sin((x / 30) - time * 0.5 + layer) * 20;
            const y = h / 2 + wave1 + wave2 + (layer - 1) * 25;

            ctx.fillRect(
              x,
              Math.floor(y / pixelSize) * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        }

        // Grid lines
        ctx.strokeStyle = 'rgba(218, 119, 86, 0.1)';
        ctx.lineWidth = 1;
        for (let y = 0; y < h; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      },

      // Pattern 2: Data blocks
      (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.fillStyle = '#0A0808';
        ctx.fillRect(0, 0, w, h);

        const blockSize = 24;
        const cols = Math.ceil(w / blockSize);
        const rows = Math.ceil(h / blockSize);

        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            const rand = seededRandom(seed + col * 100 + row);
            const x = col * blockSize;
            const y = row * blockSize;

            // Animated fill based on position and time
            const wave = Math.sin(time + col * 0.3 + row * 0.2);
            const shouldFill = rand + wave * 0.3 > 0.6;

            if (shouldFill) {
              const intensity = rand;
              if (intensity > 0.8) {
                ctx.fillStyle = colors.accent;
              } else if (intensity > 0.5) {
                ctx.fillStyle = colors.primary;
              } else {
                ctx.fillStyle = colors.secondary;
              }
              ctx.fillRect(x + 2, y + 2, blockSize - 4, blockSize - 4);
            }
          }
        }
      },

      // Pattern 3: Concentric shapes
      (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.fillStyle = '#0A0808';
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        // Draw concentric circles/squares
        for (let r = 20; r < Math.min(w, h) / 2; r += 20) {
          const phase = r / 100 + time;
          const isCircle = seed % 2 === 0;

          ctx.strokeStyle = r % 40 === 0 ? colors.primary : colors.secondary;
          ctx.lineWidth = 2;

          if (isCircle) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + Math.sin(phase) * 5, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            const size = r + Math.sin(phase) * 5;
            ctx.strokeRect(cx - size, cy - size, size * 2, size * 2);
          }
        }

        // Center element
        ctx.fillStyle = colors.accent;
        const pulseSize = 8 + Math.sin(time * 2) * 4;
        ctx.fillRect(cx - pulseSize, cy - pulseSize, pulseSize * 2, pulseSize * 2);
      },
    ];

    const patternIndex = seed % patterns.length;
    const drawPattern = patterns[patternIndex];

    const animate = () => {
      time += 0.02;
      drawPattern(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [seed, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pixelated"
      style={{ imageRendering: 'pixelated' }}
      aria-label="Project visual"
    />
  );
}
