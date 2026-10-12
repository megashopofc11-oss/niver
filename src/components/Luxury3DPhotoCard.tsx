import React, { useRef, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Icon3DCrown, Icon3DHeart } from './ThreeDIcons';

interface Luxury3DPhotoCardProps {
  photoUrl: string;
  title: string;
  caption: string;
  badge?: string;
  variant?: 'hero' | 'gallery' | 'portrait';
}

export const Luxury3DPhotoCard: React.FC<Luxury3DPhotoCardProps> = ({
  photoUrl,
  title,
  caption,
  badge = 'Aniversariante',
  variant = 'hero',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlintPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlintPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const isHero = variant === 'hero';

  return (
    <div
      className="perspective-1000 w-full flex justify-center py-4 select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.18s ease-out',
        }}
        className={`relative w-full ${
          isHero
            ? 'max-w-[340px] xs:max-w-[380px] sm:max-w-[440px]'
            : 'max-w-[300px] xs:max-w-[340px] sm:max-w-[380px]'
        } rounded-[32px] p-3 sm:p-4 glass-obsidian-card border-2 border-red-500/40 shadow-[0_25px_65px_-10px_rgba(0,0,0,0.9),0_0_50px_rgba(255,23,68,0.35)] group transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(255,23,68,0.5)]`}
      >
        {/* Crown on Hero */}
        {isHero && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 group-hover:scale-110">
            <Icon3DCrown size={54} />
          </div>
        )}

        {/* 3D Filigree Corner Brackets (Gold & Ruby) */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#F59E0B] rounded-tl-lg pointer-events-none z-20" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#F59E0B] rounded-tr-lg pointer-events-none z-20" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#F59E0B] rounded-bl-lg pointer-events-none z-20" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#F59E0B] rounded-br-lg pointer-events-none z-20" />

        {/* Outer Bevel Frame & Photo Container */}
        <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-[#050307] border border-red-500/30">
          {/* Main High-Resolution Honoree Photo */}
          <img
            src={photoUrl}
            alt="Foto Principal da Aniversariante"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: 'center 20%' }}
          />

          {/* Dynamic Light Glint on Cursor Movement */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 260px at ${glintPos.x}% ${glintPos.y}%, rgba(255,255,255,0.85), transparent 70%)`,
              opacity: glintPos.opacity,
            }}
          />

          {/* Inner Vignette / Ruby Glow Edge */}
          <div className="absolute inset-0 rounded-[24px] pointer-events-none ring-1 ring-inset ring-red-500/50 shadow-[inset_0_0_40px_rgba(220,38,38,0.35)]" />

          {/* Top Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="glass-obsidian-pill px-3 py-1 rounded-full text-[11px] font-luxury font-bold tracking-widest text-[#F59E0B] border border-[#F59E0B]/40 uppercase shadow-lg inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              <span>{badge}</span>
            </span>
          </div>

          {/* Bottom Overlay Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050307] via-[#050307]/70 to-transparent pointer-events-none" />

          {/* Bottom Title on Image */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-center z-10">
            <h3 className="font-royal text-xl sm:text-2xl font-bold tracking-wider text-shimmer-ruby drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {title}
            </h3>
          </div>
        </div>

        {/* Card Caption Below Photo */}
        <div className="mt-4 px-2 pb-1 text-center space-y-2">
          <p className="font-poetic italic text-lg sm:text-xl text-[#FFF5F5] leading-snug drop-shadow-sm">
            “{caption}”
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-red-500/60" />
            <Icon3DHeart size={18} />
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
        </div>
      </div>
    </div>
  );
};
