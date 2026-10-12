import React, { useState, useEffect, useRef } from 'react';
import { CAROUSEL_SLIDES, CarouselSlide } from '../data/defaultExperience';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CleanAutoCarouselProps {
  photoUrl?: string;
}

export const CleanAutoCarousel: React.FC<CleanAutoCarouselProps> = ({ photoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto transition every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const currentSlide = CAROUSEL_SLIDES[currentIndex];
  const activeImage = photoUrl || currentSlide.photoUrl;

  return (
    <div
      className="relative w-full max-w-md mx-auto flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1080x1080 Square Frame - Clean, Crisp, Luxury */}
      <div className="relative w-full aspect-square max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] rounded-3xl overflow-hidden glass-clean-card border border-[#F6A4C8]/30 shadow-[0_20px_50px_rgba(142,27,82,0.35)] group">
        {/* Border Glow Ring */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-[#F6A4C8]/60 pointer-events-none shadow-[inset_0_0_30px_rgba(246,164,200,0.15)] z-20" />

        {/* The Photo Image with smooth Ken Burns & filter styling */}
        <div className="w-full h-full relative overflow-hidden bg-[#0B0A0F]">
          <img
            key={currentSlide.id}
            src={activeImage}
            alt="Aniversariante"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-1000 ease-out animate-in fade-in zoom-in-95 ${currentSlide.styling?.zoomClass || 'scale-100'} ${currentSlide.styling?.filterClass || ''}`}
            style={{ objectPosition: currentSlide.styling?.objectPosition || 'center 20%' }}
          />
        </div>

        {/* Subtle Vignette at Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B0A0F]/85 via-[#0B0A0F]/20 to-transparent pointer-events-none z-10" />

        {/* Lateral Minimalist Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-clean-pill text-[#F6A4C8] hover:text-white hover:bg-[#8E1B52]/60 transition-all border border-[#F6A4C8]/25 active:scale-90 cursor-pointer shadow-lg"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-clean-pill text-[#F6A4C8] hover:text-white hover:bg-[#8E1B52]/60 transition-all border border-[#F6A4C8]/25 active:scale-90 cursor-pointer shadow-lg"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Counter Badge */}
        <div className="absolute top-3.5 right-3.5 z-20 glass-clean-pill px-3 py-0.5 rounded-full text-[11px] font-mono tracking-widest text-[#F6A4C8] border border-[#F6A4C8]/20">
          0{currentIndex + 1} / 0{CAROUSEL_SLIDES.length}
        </div>
      </div>

      {/* Discrete Progress Indicator Dots */}
      <div className="mt-4 flex items-center gap-1.5 py-1">
        {CAROUSEL_SLIDES.map((slide: CarouselSlide, idx: number) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentIndex
                ? 'w-6 bg-gradient-to-r from-[#F6A4C8] to-[#FFF7FB] shadow-[0_0_8px_rgba(246,164,200,0.8)]'
                : 'w-1.5 bg-[#8E1B52]/50 hover:bg-[#F6A4C8]/60'
            }`}
            title={`Slide ${idx + 1}`}
            aria-label={`Ver slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Dedicated Phrase for Current Slide */}
      <div className="mt-4 text-center max-w-sm px-4 animate-in fade-in duration-500">
        <p className="font-poetic italic text-xl sm:text-2xl text-[#FFF7FB] leading-relaxed tracking-wide drop-shadow-sm">
          “{currentSlide.quote}”
        </p>
        <div className="mt-2.5 flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F6A4C8]/50" />
          <span className="text-[11px] text-[#F6A4C8] font-luxury tracking-widest uppercase">
            {currentSlide.title}
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F6A4C8]/50" />
        </div>
      </div>
    </div>
  );
};
