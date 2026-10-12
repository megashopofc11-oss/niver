import React, { useState } from 'react';
import { Heart, Sparkles, Mail, MailOpen } from 'lucide-react';

interface DigitalLoveLetterProps {
  honoreeName: string;
}

export const DigitalLoveLetter: React.FC<DigitalLoveLetterProps> = ({ honoreeName }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="relative w-full max-w-2xl mx-auto py-12 px-4">
      {/* Outer Envelope / Letter Frame */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#9D174D]/35 via-[#09070B] to-[#831843]/30 border border-[#F5A1C4]/40 shadow-[0_20px_60px_-15px_rgba(157,23,77,0.5)] overflow-hidden">
        {/* Ambient Rosy Glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#E83E86]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#9D174D]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon & Seal */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#F5A1C4]/20 pb-5 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D174D] to-[#F5A1C4] flex items-center justify-center shadow-md">
              <Heart className="w-4 h-4 fill-white text-white" />
            </div>
            <div>
              <span className="text-xs font-luxury tracking-widest text-[#F5A1C4] uppercase block">
                Uma Carta do Coração
              </span>
              <span className="text-[11px] text-[#FFF5FA]/60 font-mono">
                {honoreeName ? `Dedicada a ${honoreeName}` : 'Dedicada com carinho'}
              </span>
            </div>
          </div>

          <Sparkles className="w-4 h-4 text-[#F5A1C4] animate-pulse" />
        </div>

        {/* Letter Content */}
        <div className="relative z-10 space-y-6 text-center sm:text-left">
          <p className="font-poetic italic text-xl sm:text-2xl text-[#FFF5FA] leading-relaxed drop-shadow-sm">
            “Hoje eu desejo que a vida seja generosa com você. Que seus sonhos encontrem caminhos, que seus dias tenham leveza e que o amor esteja sempre presente. Nunca se esqueça do quanto você é especial.”
          </p>

          <p className="font-poetic italic text-base sm:text-lg text-[#F5A1C4]/90 leading-relaxed pt-2">
            Que cada passo seu seja guiado pela serenidade, e que todos os dias deste novo ciclo tragam motivos reais e sinceros para o seu sorriso brilhar.
          </p>

          {/* Signature Block */}
          <div className="pt-6 border-t border-[#F5A1C4]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F5A1C4]/80">
            <span className="font-luxury tracking-wider uppercase">
              Com todo o amor & carinho 💜
            </span>
            <span className="font-mono text-[11px] opacity-70">
              Celebração Inesquecível
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
