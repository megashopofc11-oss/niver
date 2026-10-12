import React, { useState, useEffect, useMemo } from 'react';
import { PhotoStory } from '../types';

interface FragmentedPhotoCardProps {
  story: PhotoStory;
  isActive: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

interface FragmentStyle {
  initialX: number;
  initialY: number;
  initialZ: number;
  initialRotateX: number;
  initialRotateY: number;
  initialRotateZ: number;
  initialScale: number;
  delay: number;
}

export const FragmentedPhotoCard: React.FC<FragmentedPhotoCardProps> = ({
  story,
  isActive,
}) => {
  const [assembled, setAssembled] = useState(false);
  const [imageError, setImageError] = useState(false);

  const rows = 4;
  const cols = 4;
  const totalPieces = rows * cols;

  // Pre-calculate trajectories based on patternType
  const fragmentsData = useMemo(() => {
    const list: FragmentStyle[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        const normX = (c / (cols - 1)) * 2 - 1;
        const normY = (r / (rows - 1)) * 2 - 1;
        const distFromCenter = Math.sqrt(normX * normX + normY * normY);
        const angle = Math.atan2(normY, normX);

        let fx = 0;
        let fy = 0;
        let fz = 0;
        let rotX = 0;
        let rotY = 0;
        let rotZ = 0;
        let scale = 0.5;
        let delay = index * 0.035;

        switch (story.patternType) {
          case 'vortex':
            fx = Math.cos(angle + 2.4) * (280 + distFromCenter * 140);
            fy = Math.sin(angle + 2.4) * (280 + distFromCenter * 140);
            fz = (distFromCenter - 1) * 380;
            rotZ = (angle * 180) / Math.PI + 90;
            rotY = normX * 100;
            delay = distFromCenter * 0.32;
            break;

          case 'diagonal':
            const isLeft = (r + c) % 2 === 0;
            fx = isLeft ? -420 : 420;
            fy = isLeft ? -320 : 320;
            fz = 180;
            rotZ = isLeft ? -40 : 40;
            rotX = 50;
            delay = (r + c) * 0.065;
            break;

          case 'radial':
            fx = Math.cos(angle) * (380 + Math.random() * 80);
            fy = Math.sin(angle) * (380 + Math.random() * 80);
            fz = 280;
            rotX = normY * 80;
            rotY = normX * 80;
            delay = (1.5 - distFromCenter) * 0.3;
            break;

          case 'crystal':
            fx = normX * 320 + (Math.random() - 0.5) * 80;
            fy = normY * 320 + (Math.random() - 0.5) * 80;
            fz = 450;
            rotX = (Math.random() - 0.5) * 320;
            rotY = (Math.random() - 0.5) * 320;
            rotZ = (Math.random() - 0.5) * 160;
            scale = 0.25;
            delay = Math.random() * 0.45;
            break;

          case 'shatter':
            fx = (normX + (Math.random() - 0.5) * 0.7) * 380;
            fy = (normY + (Math.random() - 0.5) * 0.7) * 380;
            fz = (Math.random() - 0.5) * 500;
            rotX = normX * 160;
            rotY = normY * 160;
            rotZ = (Math.random() - 0.5) * 80;
            delay = Math.random() * 0.38;
            break;

          case 'spiral':
            const spiralAngle = index * 0.42;
            fx = Math.cos(spiralAngle) * (230 + index * 12);
            fy = Math.sin(spiralAngle) * (230 + index * 12);
            fz = index * 18;
            rotZ = (spiralAngle * 180) / Math.PI;
            delay = index * 0.045;
            break;

          case 'cascade':
            fx = (normX + (Math.random() - 0.5) * 0.2) * 70;
            fy = -480 - r * 70;
            fz = 140;
            rotX = -70;
            rotZ = normX * 20;
            delay = r * 0.11 + c * 0.035;
            break;

          case 'honeycomb':
            fx = r % 2 === 0 ? -380 : 380;
            fy = normY * 50;
            fz = 90;
            rotY = r % 2 === 0 ? -80 : 80;
            delay = (cols - c) * 0.07 + r * 0.035;
            break;

          case 'prism':
            fx = normX * 100;
            fy = normY * 100;
            fz = -500;
            rotX = 40;
            rotY = 40;
            scale = 2.2;
            delay = (rows - r) * 0.09 + c * 0.05;
            break;

          case 'mosaic':
          default:
            fx = normX * 180;
            fy = normY * 180;
            fz = 400;
            rotX = (Math.random() - 0.5) * 50;
            rotY = (Math.random() - 0.5) * 50;
            rotZ = (Math.random() - 0.5) * 40;
            delay = (r * cols + c) * 0.03;
            break;
        }

        list.push({
          initialX: fx,
          initialY: fy,
          initialZ: fz,
          initialRotateX: rotX,
          initialRotateY: rotY,
          initialRotateZ: rotZ,
          initialScale: scale,
          delay,
        });
      }
    }
    return list;
  }, [story.patternType]);

  // Assembly sequence
  useEffect(() => {
    setAssembled(false);
    const timer = setTimeout(() => {
      setAssembled(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [story.id, isActive]);

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
      {/* 3D Glass Photo Container */}
      <div 
        className="relative w-[280px] h-[380px] xs:w-[310px] xs:h-[420px] sm:w-[340px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl perspective-1000 select-none group border border-[#F5A1C4]/20"
        style={{
          boxShadow: assembled 
            ? '0 24px 60px -15px rgba(157, 23, 77, 0.45), 0 0 45px rgba(245, 161, 196, 0.35)' 
            : 'none',
        }}
      >
        {/* Shimmer Border Ring when Assembled */}
        <div 
          className={`absolute inset-0 z-30 rounded-3xl pointer-events-none transition-all duration-1000 ${
            assembled 
              ? 'ring-1 ring-[#F5A1C4]/80 shadow-[inset_0_0_30px_rgba(255,245,250,0.25)]' 
              : 'opacity-0'
          }`} 
        />

        {/* Ambient Corner Sparkles */}
        {assembled && (
          <>
            <div className="absolute top-3.5 right-3.5 z-30 w-3 h-3 text-[#FFF5FA] animate-ping">✦</div>
            <div className="absolute bottom-3.5 left-3.5 z-30 w-3 h-3 text-[#F5A1C4] animate-pulse">✧</div>
          </>
        )}

        {/* Fallback frame in deep black & dark rose */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#09070B] via-[#9D174D]/40 to-[#09070B] flex flex-col items-center justify-center p-6 text-center z-0`}>
          <div className="text-4xl mb-3 opacity-80">{story.fallbackTheme.icon}</div>
          <p className="text-sm font-luxury text-[#F5A1C4]">{story.title}</p>
        </div>

        {/* The 16 Mosaic Fragments (Assembling from 3D space) */}
        {!imageError && (
          <div 
            className={`absolute inset-0 z-10 w-full h-full transition-transform duration-7000 ease-out ${
              assembled ? 'scale-[1.035]' : 'scale-100'
            }`}
          >
            {Array.from({ length: totalPieces }).map((_, idx) => {
              const r = Math.floor(idx / cols);
              const c = idx % cols;
              const frag = fragmentsData[idx];

              const pieceWidth = 100 / cols;
              const pieceHeight = 100 / rows;
              const leftPercent = c * pieceWidth;
              const topPercent = r * pieceHeight;

              const transform = assembled
                ? 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)'
                : `translate3d(${frag.initialX}px, ${frag.initialY}px, ${frag.initialZ}px) rotateX(${frag.initialRotateX}deg) rotateY(${frag.initialRotateY}deg) rotateZ(${frag.initialRotateZ}deg) scale(${frag.initialScale})`;

              const opacity = assembled ? 1 : 0;
              const filter = assembled ? 'blur(0px) brightness(1)' : 'blur(8px) brightness(1.5)';

              return (
                <div
                  key={idx}
                  className="absolute overflow-hidden transition-all duration-1000 ease-out"
                  style={{
                    width: `${pieceWidth}%`,
                    height: `${pieceHeight}%`,
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform,
                    opacity,
                    filter,
                    transitionDelay: `${frag.delay}s`,
                    boxShadow: assembled 
                      ? 'none' 
                      : '0 8px 25px rgba(232, 62, 134, 0.4), inset 0 0 10px rgba(255, 245, 250, 0.5)',
                  }}
                >
                  <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${story.imageUrl})`,
                      backgroundSize: `${cols * 100}% ${rows * 100}%`,
                      // Focus on facial features (top 20%)
                      backgroundPosition: `${(c / (cols - 1)) * 100}% ${(r / (rows - 1)) * 100}%`,
                    }}
                  />
                  {/* Glass shard edge reflection */}
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-700 border border-[#F5A1C4]/20 ${
                      assembled ? 'opacity-0' : 'opacity-70 bg-[#E83E86]/10'
                    }`} 
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Soft bottom vignette gradient for depth */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09070B]/90 via-[#09070B]/30 to-transparent z-20 pointer-events-none" />

        {/* Scene Indicator Badge */}
        <div className="absolute top-4 left-4 z-30">
          <span className="glass-rose-subtle text-[11px] font-medium tracking-wider text-[#F5A1C4] uppercase px-3 py-1 rounded-full border border-[#F5A1C4]/20">
            {story.subtitle}
          </span>
        </div>
      </div>

      {/* Floating Emotional Quote Below the Photograph */}
      <div 
        className={`mt-6 text-center max-w-sm px-4 transition-all duration-1000 delay-500 transform ${
          assembled 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="font-poetic italic text-lg sm:text-xl text-[#FFF5FA] leading-relaxed tracking-wide drop-shadow-sm">
          "{story.quote}"
        </p>
        <div className="mt-2.5 flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F5A1C4]/50" />
          <span className="text-xs text-[#F5A1C4] font-luxury tracking-widest uppercase">
            {story.title}
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F5A1C4]/50" />
        </div>
      </div>
    </div>
  );
};
