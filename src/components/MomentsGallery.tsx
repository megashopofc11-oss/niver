import React from 'react';
import { PhotoFrame } from './PhotoFrame';
import { STATIC_PHOTOS } from '../utils/photoStorage';
import { Heart, Sparkles } from 'lucide-react';

export const MomentsGallery: React.FC = () => {
  // 4 select moments of the SAME model with varied framing
  const featured = [
    {
      photo: STATIC_PHOTOS[0], // Photo 1
      passage: '“Há sorrisos que iluminam ambientes inteiros, e o seu é uma verdadeira obra de arte.”',
      align: 'left',
    },
    {
      photo: STATIC_PHOTOS[2], // Photo 3
      passage: '“Cada instante compartilhado com você ganha cores mais vivas e memórias inesquecíveis.”',
      align: 'right',
    },
    {
      photo: STATIC_PHOTOS[4], // Photo 5
      passage: '“A sua beleza mais profunda está na generosidade do seu coração e no brilho do seu olhar.”',
      align: 'left',
    },
    {
      photo: STATIC_PHOTOS[7], // Photo 8
      passage: '“Que a vida retribua em dobro todo o carinho e ternura que você espalha pelo mundo.”',
      align: 'right',
    },
  ];

  return (
    <section className="relative w-full max-w-4xl mx-auto py-16 px-4 space-y-16">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-rose-subtle text-xs text-[#F5A1C4] uppercase tracking-widest border border-[#F5A1C4]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A1C4]" />
          <span>Mural de Lembranças</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-luxury font-bold text-shimmer">
          Galeria de Momentos
        </h2>
        <p className="text-xs sm:text-sm text-[#F5A1C4]/80 font-luxury max-w-md mx-auto">
          Retratos inesquecíveis que contam a história da sua luz e da sua beleza singular
        </p>
      </div>

      {/* Vertical Story Flow */}
      <div className="space-y-20">
        {featured.map((item, idx) => (
          <div
            key={item.photo.id}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              item.align === 'right' ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* 1080x1080 Photo Box */}
            <div className="w-full max-w-sm sm:max-w-md flex-shrink-0">
              <PhotoFrame photoId={item.photo.id} />
            </div>

            {/* Emotional Narrative Passage */}
            <div className="flex-1 text-center md:text-left space-y-4 px-2">
              <div className="inline-flex items-center gap-2 text-xs font-luxury text-[#F5A1C4] uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 fill-[#E83E86] text-[#E83E86]" />
                <span>{item.photo.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-luxury font-bold text-[#FFF5FA]">
                {item.photo.title}
              </h3>

              <p className="font-poetic italic text-lg sm:text-xl text-[#F5A1C4] leading-relaxed">
                {item.passage}
              </p>

              <div className="pt-2 flex items-center justify-center md:justify-start gap-2">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#F5A1C4]/60" />
                <span className="text-[11px] font-mono text-[#F5A1C4]/60 tracking-widest uppercase">
                  Fotografia 0{item.photo.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
