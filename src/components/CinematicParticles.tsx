import React, { useMemo } from 'react';

interface CinematicParticlesProps {
  intensity?: 'calm' | 'celebration';
}

export const CinematicParticles: React.FC<CinematicParticlesProps> = ({ intensity = 'calm' }) => {
  // Tasteful particle count
  const stars = useMemo(() => {
    return Array.from({ length: intensity === 'celebration' ? 24 : 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 1.2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.55 + 0.25,
      isGold: Math.random() > 0.6,
    }));
  }, [intensity]);

  const embers = useMemo(() => {
    return Array.from({ length: intensity === 'celebration' ? 10 : 5 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 9 + 7,
      delay: Math.random() * 7,
      size: Math.random() * 4 + 3,
    }));
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Luxury Radial Lighting: Pure Black #030204 + Intense Radiant Ruby Red */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_10%,rgba(220,38,38,0.22),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_90%,rgba(185,28,28,0.18),transparent_65%)]" />

      {/* Discrete ruby and golden stardust */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full transition-opacity"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.isGold ? '#FDE047' : '#FF1744',
            boxShadow: star.isGold 
              ? `0 0 ${star.size * 3}px rgba(245, 158, 11, 0.9)` 
              : `0 0 ${star.size * 3}px rgba(255, 23, 68, 0.9)`,
            opacity: star.opacity,
            animation: `pulse-ruby-glow ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Subtle floating ruby embers */}
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${ember.left}%`,
            bottom: '-5%',
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            background: 'radial-gradient(circle, #FF1744 20%, #B91C1C 70%, transparent 100%)',
            boxShadow: '0 0 12px rgba(255, 23, 68, 0.8)',
            animation: `float-subtle ${ember.duration}s ease-in-out infinite`,
            animationDelay: `${ember.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};
