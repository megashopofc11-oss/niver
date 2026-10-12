import React, { useState, useEffect, useRef } from 'react';
import { STATIC_PHOTOS, getResolvedPhotoUrl } from '../utils/photoStorage';
import { ChevronLeft, ChevronRight, Sparkles, Camera } from 'lucide-react';

interface AutoPhotoCarouselProps {
  onPhotoChanged?: (photoId: number, dataUrl: string) => void;
}

export const AutoPhotoCarousel: React.FC<AutoPhotoCarouselProps> = ({ onPhotoChanged }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assembled, setAssembled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhoto = STATIC_PHOTOS[currentIndex];

  // 4x4 mosaic fragments
  const rows = 4;
  const cols = 4;
  const totalPieces = rows * cols;

  // Auto advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  // Assembly animation trigger on photo switch
  useEffect(() => {
    setAssembled(false);
    const timeout = setTimeout(() => {
      setAssembled(true);
    }, 80);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % STATIC_PHOTOS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + STATIC_PHOTOS.length) % STATIC_PHOTOS.length);
  };

  const currentSrc = imageErrors[currentPhoto.id]
    ? currentPhoto.fallbackSvg
    : getResolvedPhotoUrl(currentPhoto.id);

  return (
    <div
      className="relative w-full max-w-md mx-auto flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1080x1080 Square Photo Frame */}
      <div className="relative w-full aspect-square max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] rounded-3xl overflow-hidden glass-card-luxury border border-[#F5A1C4]/30 shadow-2xl perspective-1000 select-none group">
        {/* Shimmer Border Ring when Assembled */}
        <div
          className={`absolute inset-0 z-30 rounded-3xl pointer-events-none transition-all duration-1000 ${
            assembled
              ? 'ring-1 ring-[#F5A1C4]/80 shadow-[inset_0_0_35px_rgba(245,161,196,0.3)]'
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

        {/* Fallback SVG / Full Image Background */}
        <div className="absolute inset-0 z-0 bg-[#09070B]">
          <img
            src={currentSrc}
            alt={currentPhoto.title}
            referrerPolicy="no-referrer"
            onError={() => setImageErrors((prev) => ({ ...prev, [currentPhoto.id]: true }))}
            className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
              assembled ? 'scale-[1.035]' : 'scale-100'
            }`}
            style={{ objectPosition: 'center 20%' }}
          />
        </div>

        {/* The 16 Mosaic Fragments (Entering from 3D space during transition) */}
        {!assembled && (
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            {Array.from({ length: totalPieces }).map((_, idx) => {
              const r = Math.floor(idx / cols);
              const c = idx % cols;
              const normX = (c / (cols - 1)) * 2 - 1;
              const normY = (r / (rows - 1)) * 2 - 1;

              const pieceWidth = 100 / cols;
              const pieceHeight = 100 / rows;
              const leftPercent = c * pieceWidth;
              const topPercent = r * pieceHeight;

              const fx = normX * 260 + (Math.random() - 0.5) * 80;
              const fy = normY * 260 + (Math.random() - 0.5) * 80;
              const fz = 300;
              const rotZ = (Math.random() - 0.5) * 90;
              const delay = (r + c) * 0.04;

              return (
                <div
                  key={idx}
                  className="absolute overflow-hidden transition-all duration-700 ease-out"
                  style={{
                    width: `${pieceWidth}%`,
                    height: `${pieceHeight}%`,
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: `translate3d(${fx}px, ${fy}px, ${fz}px) rotateZ(${rotZ}deg) scale(0.3)`,
                    opacity: 0,
                    filter: 'blur(6px) brightness(1.6)',
                    transitionDelay: `${delay}s`,
                  }}
                >
                  <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${currentSrc})`,
                      backgroundSize: `${cols * 100}% ${rows * 100}%`,
                      backgroundPosition: `${(c / (cols - 1)) * 100}% ${(r / (rows - 1)) * 100}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Soft bottom vignette for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09070B]/90 via-[#09070B]/30 to-transparent z-20 pointer-events-none" />

        {/* Scene Indicator Badge */}
        <div className="absolute top-4 left-4 z-30">
          <span className="glass-rose-subtle text-[11px] font-luxury tracking-wider text-[#F5A1C4] uppercase px-3 py-1 rounded-full border border-[#F5A1C4]/25">
            {currentPhoto.subtitle}
          </span>
        </div>

        {/* Lateral Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-rose-subtle text-[#F5A1C4] hover:text-white hover:bg-[#9D174D]/60 transition-all border border-[#F5A1C4]/20 active:scale-90 cursor-pointer shadow-lg"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-rose-subtle text-[#F5A1C4] hover:text-white hover:bg-[#9D174D]/60 transition-all border border-[#F5A1C4]/20 active:scale-90 cursor-pointer shadow-lg"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Discrete Counter & Progress Dots */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="glass-rose-subtle px-3 py-0.5 rounded-full text-[11px] font-mono tracking-widest text-[#F5A1C4] border border-[#F5A1C4]/20">
          {currentIndex + 1} / {STATIC_PHOTOS.length}
        </div>

        <div className="flex items-center gap-1.5 py-1">
          {STATIC_PHOTOS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-gradient-to-r from-[#F5A1C4] to-white shadow-[0_0_8px_rgba(245,161,196,0.9)]'
                  : 'w-1.5 bg-[#9D174D]/50 hover:bg-[#F5A1C4]/60'
              }`}
              title={`Foto ${idx + 1}`}
              aria-label={`Ver foto ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Emotional Quote for this specific photo */}
      <div className="mt-4 text-center max-w-sm px-4 animate-in fade-in duration-500">
        <p className="font-poetic italic text-lg sm:text-xl text-[#FFF5FA] leading-relaxed tracking-wide drop-shadow-sm">
          "{currentPhoto.quote}"
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F5A1C4]/50" />
          <span className="text-xs text-[#F5A1C4] font-luxury tracking-widest uppercase">
            {currentPhoto.title}
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F5A1C4]/50" />
        </div>
      </div>
    </div>
  );
};
