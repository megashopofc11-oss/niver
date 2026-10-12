import React, { useState } from 'react';
import { Heart, Star, Sparkles, Check } from 'lucide-react';

interface Wish {
  id: string;
  word: string;
  message: string;
  icon: 'heart' | 'star';
  color: string;
}

const WISHES: Wish[] = [
  {
    id: 'amor',
    word: 'Amor',
    message: 'Que o amor seja a sua morada, o seu porto seguro e a luz de cada passo.',
    icon: 'heart',
    color: '#E83E86',
  },
  {
    id: 'saude',
    word: 'Saúde',
    message: 'Que a vitalidade e o equilíbrio renovem suas forças e tragam leveza aos seus dias.',
    icon: 'star',
    color: '#F5A1C4',
  },
  {
    id: 'paz',
    word: 'Paz',
    message: 'Que a serenidade habite seu coração e acolha os seus pensamentos com doçura.',
    icon: 'heart',
    color: '#FFF5FA',
  },
  {
    id: 'alegria',
    word: 'Alegria',
    message: 'Que o riso frouxo e os momentos espontâneos iluminem cada instante da sua vida.',
    icon: 'star',
    color: '#F5A1C4',
  },
  {
    id: 'prosperidade',
    word: 'Prosperidade',
    message: 'Que seus caminhos transbordem conquistas, abundância e novos horizontes brilhantes.',
    icon: 'heart',
    color: '#E83E86',
  },
  {
    id: 'realizacoes',
    word: 'Realizações',
    message: 'Que a coragem transforme seus maiores sonhos em histórias extraordinárias vividas.',
    icon: 'star',
    color: '#FFF5FA',
  },
];

export const InteractiveWishes: React.FC = () => {
  const [activeWishId, setActiveWishId] = useState<string | null>(null);

  return (
    <section className="relative w-full max-w-3xl mx-auto py-12 px-4 text-center">
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-rose-subtle text-xs text-[#F5A1C4] uppercase tracking-widest border border-[#F5A1C4]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A1C4]" />
          <span>Interativo</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-luxury font-bold text-shimmer">
          Desejos Para Você
        </h2>
        <p className="text-xs sm:text-sm text-[#F5A1C4]/80 font-luxury">
          Toque em cada desejo para revelar a mensagem que ele guarda para o seu coração:
        </p>
      </div>

      {/* 6 Elements Grid (Hearts & Stars in 3D style) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4.5">
        {WISHES.map((wish) => {
          const isSelected = activeWishId === wish.id;
          return (
            <button
              key={wish.id}
              onClick={() => setActiveWishId(isSelected ? null : wish.id)}
              className={`relative group p-4 sm:p-5 rounded-3xl text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-[#9D174D]/70 via-[#E83E86]/35 to-[#09070B] border border-[#F5A1C4] shadow-[0_0_35px_rgba(232,62,134,0.4)] scale-105'
                  : 'glass-card-luxury hover:bg-[#9D174D]/30 border border-[#F5A1C4]/25 hover:border-[#F5A1C4]/60 hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #E83E86, #9D174D)'
                      : 'rgba(157, 23, 77, 0.25)',
                    border: '1px solid rgba(245, 161, 196, 0.3)',
                  }}
                >
                  {wish.icon === 'heart' ? (
                    <Heart className="w-5 h-5 text-[#FFF5FA] fill-[#F5A1C4]/40" />
                  ) : (
                    <Star className="w-5 h-5 text-[#FFF5FA] fill-[#F5A1C4]/40" />
                  )}
                </div>

                <Sparkles
                  className={`w-3.5 h-3.5 transition-transform ${
                    isSelected ? 'text-[#FFF5FA] rotate-45' : 'text-[#F5A1C4]/40'
                  }`}
                />
              </div>

              <div className="font-luxury font-semibold text-base sm:text-lg text-[#FFF5FA]">
                {wish.word}
              </div>

              {/* Message Revealed on Tap */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isSelected ? 'max-h-28 mt-2.5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="font-poetic italic text-xs sm:text-sm text-[#FFF5FA] leading-snug border-t border-[#F5A1C4]/25 pt-2">
                  "{wish.message}"
                </p>
              </div>

              {!isSelected && (
                <p className="text-[10px] text-[#F5A1C4]/60 uppercase tracking-widest mt-1">
                  Toque para abrir ✦
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
