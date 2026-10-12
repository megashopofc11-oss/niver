import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';

interface GrandFinaleProps {
  honoreeName?: string;
  onRestart: () => void;
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({
  honoreeName,
  onRestart,
}) => {
  // Discreet, tasteful confetti burst
  useEffect(() => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#F6A4C8', '#E1458E', '#8E1B52', '#FFF7FB'],
    });
  }, []);

  return (
    <section className="relative z-30 w-full min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center animate-in fade-in duration-1000 select-none">
      {/* 3D Heart Glow Motif */}
      <div className="relative mb-5 group cursor-default">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#E1458E]/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative transform hover:scale-105 transition-transform duration-500 animate-float-clean">
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-[#F6A4C8] drop-shadow-[0_0_30px_rgba(225,69,142,0.8)] fill-[#8E1B52]/30 stroke-[1.2]" />
          <Sparkles className="absolute -top-1.5 -right-1.5 w-6 h-6 text-[#FFF7FB] animate-spin opacity-85" />
        </div>
      </div>

      {/* Discreet 3D Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left metallic rose balloon */}
        <div className="absolute top-[22%] left-[8%] sm:left-[20%] animate-float-clean opacity-80">
          <div className="relative w-12 h-16 sm:w-16 sm:h-22 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr from-[#8E1B52] via-[#E1458E] to-[#FFF7FB] shadow-[0_10px_20px_rgba(225,69,142,0.35)]">
            <div className="absolute top-2 left-2 w-2.5 h-5 bg-white/50 rounded-full blur-[1px] transform -rotate-15" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#8E1B52]" />
            <div className="absolute -bottom-7 left-1/2 w-[1px] h-7 bg-[#F6A4C8]/35" />
          </div>
        </div>

        {/* Right satin black balloon */}
        <div className="absolute top-[26%] right-[8%] sm:right-[20%] animate-float-clean opacity-80" style={{ animationDelay: '2s' }}>
          <div className="relative w-14 h-18 sm:w-18 sm:h-24 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr from-[#0B0A0F] via-[#2A1523] to-[#F6A4C8] shadow-[0_10px_20px_rgba(142,27,82,0.3)] border border-[#F6A4C8]/30">
            <div className="absolute top-2 left-2 w-3 h-6 bg-white/40 rounded-full blur-[1px] transform -rotate-15" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#0B0A0F]" />
            <div className="absolute -bottom-8 left-1/2 w-[1px] h-8 bg-[#F6A4C8]/35" />
          </div>
        </div>
      </div>

      {/* 3D Birthday Cake in Dark Rose & Satin Black */}
      <div className="relative my-3 flex flex-col items-center">
        <div className="relative w-36 h-28 sm:w-44 sm:h-34 flex flex-col items-center justify-end">
          {/* Flame & Candles */}
          <div className="flex items-center gap-3 mb-1">
            {[0, 1, 2].map((c) => (
              <div key={c} className="flex flex-col items-center">
                <div className="w-2.5 h-4 bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-100 rounded-full shadow-[0_0_12px_#F59E0B] animate-pulse" />
                <div className="w-1.5 h-5 bg-gradient-to-b from-[#FFF7FB] to-[#F6A4C8] rounded-t-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Tier (Dark Rose) */}
          <div className="w-24 sm:w-28 h-8 rounded-t-xl bg-gradient-to-r from-[#8E1B52] via-[#E1458E] to-[#8E1B52] border-b border-[#F6A4C8]/40 shadow-md relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#0B0A0F]/30" />
            <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/80" />
          </div>

          {/* Bottom Tier (Satin Black with Rose pearls) */}
          <div className="w-32 sm:w-40 h-11 rounded-t-2xl bg-gradient-to-r from-[#0B0A0F] via-[#22121E] to-[#0B0A0F] shadow-xl relative overflow-hidden border-t border-[#F6A4C8]/30">
            <div className="flex justify-around items-center pt-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#F6A4C8] to-[#E1458E] shadow-sm" />
              ))}
            </div>
          </div>

          {/* Cake Stand */}
          <div className="w-40 sm:w-48 h-2.5 rounded-full bg-gradient-to-r from-[#8E1B52] via-[#F6A4C8] to-[#8E1B52] shadow-[0_4px_15px_rgba(246,164,200,0.4)]" />
        </div>
      </div>

      {/* Headings */}
      <div className="max-w-xl mx-auto space-y-3 mt-4">
        <h2 className="text-4xl sm:text-6xl font-luxury font-bold tracking-tight text-shimmer-rose drop-shadow-xl">
          HAPPY BIRTHDAY
        </h2>

        {honoreeName && (
          <p className="text-xl sm:text-2xl font-serif text-[#F6A4C8] tracking-wide">
            Para alguém verdadeiramente inesquecível 💜
          </p>
        )}

        <p className="font-poetic italic text-lg sm:text-2xl text-[#FFF7FB] leading-relaxed max-w-lg mx-auto pt-1">
          “Que a felicidade acompanhe cada passo do seu novo ciclo.”
        </p>
      </div>

      {/* Restart Experience Button */}
      <div className="mt-8">
        <button
          onClick={onRestart}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#8E1B52] via-[#E1458E] to-[#8E1B52] text-[#FFF7FB] font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(225,69,142,0.45)] hover:shadow-[0_0_40px_rgba(246,164,200,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#F6A4C8]/30"
        >
          <RotateCcw className="w-4 h-4 text-[#FFF7FB] group-hover:-rotate-90 transition-transform duration-500" />
          <span>Reviver surpresa</span>
        </button>
      </div>
    </section>
  );
};
