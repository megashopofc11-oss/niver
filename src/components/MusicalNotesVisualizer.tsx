import React, { useEffect, useRef } from 'react';

interface MusicalNotesVisualizerProps {
  isPlaying: boolean;
}

interface NoteParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  fadeSpeed: number;
  symbol: string;
  color: string;
}

const NOTE_SYMBOLS = ['♪', '♫', '♩', '✦'];
const RUBY_GOLD_PALETTE = ['#FF1744', '#EF4444', '#F59E0B', '#FEF08A'];

export const MusicalNotesVisualizer: React.FC<MusicalNotesVisualizerProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: NoteParticle[] = [];
    const maxParticles = 12; // Discrete and small
    let lastSpawnTime = 0;

    const spawnNote = () => {
      if (particles.length >= maxParticles) return;
      particles.push({
        x: Math.random() * width,
        y: height + 15,
        size: 13 + Math.random() * 8, // Small, delicate
        speedY: 0.7 + Math.random() * 0.9,
        swayAmplitude: 12 + Math.random() * 15,
        swaySpeed: 0.02 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 0,
        fadeSpeed: 0.008,
        symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
        color: RUBY_GOLD_PALETTE[Math.floor(Math.random() * RUBY_GOLD_PALETTE.length)],
      });
    };

    let animationId: number;

    const render = (time: number) => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      if (isPlayingRef.current) {
        if (time - lastSpawnTime > 800) {
          spawnNote();
          lastSpawnTime = time;
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (isPlayingRef.current) {
          p.y -= p.speedY;
          p.swayOffset += p.swaySpeed;

          if (p.y > height * 0.75) {
            p.opacity = Math.min(0.65, p.opacity + 0.02);
          } else if (p.y < height * 0.3) {
            p.opacity -= p.fadeSpeed * 1.5;
          }
        }

        const currentX = p.x + Math.sin(p.swayOffset) * p.swayAmplitude;

        ctx.save();
        ctx.translate(currentX, p.y);
        ctx.globalAlpha = Math.max(0, p.opacity);

        ctx.shadowColor = 'rgba(239, 68, 68, 0.75)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px "Cinzel", "Playfair Display", Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);

        ctx.restore();

        if (p.y < -20 || p.opacity <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
