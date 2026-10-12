import React, { useMemo } from 'react';

interface CinematicParticlesProps {
  intensity?: 'calm' | 'celebration';
}

export const CinematicParticles: React.FC<CinematicParticlesProps> = ({ intensity = 'calm' }) => {
  // Reduced, clean, tasteful particle count
  const stars = useMemo(() => {
    return Array.from({ length: intensity === 'celebration' ? 22 : 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 1.2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.6 + 0.25,
    }));
  }, [intensity]);

  const petals = useMemo(() => {
    return Array.from({ length: intensity === 'celebration' ? 8 : 4 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 8,
      size: Math.random() * 9 + 8,
    }));
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Crisp, clean ambient radial illumination (Deep Black #0B0A0F + Dark Rose #8E1B52) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_15%,rgba(142,27,82,0.28),transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_85%,rgba(225,69,142,0.15),transparent_70%)]" />

      {/* Discrete, elegant stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-[#FFF7FB] transition-opacity"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2.5}px rgba(246, 164, 200, 0.85)`,
            opacity: star.opacity,
            animation: `pulse-glow-rose ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Very subtle rose petals (Clean, slow, non-intrusive) */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute pointer-events-none opacity-40"
          style={{
            left: `${petal.left}%`,
            top: '-5%',
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            borderRadius: '60% 40% 70% 30% / 40% 60% 40% 60%',
            background: 'linear-gradient(135deg, rgba(255, 247, 251, 0.75) 0%, rgba(246, 164, 200, 0.45) 100%)',
            animation: `float-subtle ${petal.duration}s ease-in-out infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
