import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRIBUTE_MOMENTS, SPECIAL_WISHES, MAIN_HONOREE_PHOTO } from '../data/defaultExperience';
import { Icon3DHeart, Icon3DCrown, Icon3DStar, Icon3DChampagne } from './ThreeDIcons';
import { Luxury3DPhotoCard } from './Luxury3DPhotoCard';

export const InteractiveTributeExperience: React.FC = () => {
  const [activeMomentIdx, setActiveMomentIdx] = useState(0);
  const [touchedWishId, setTouchedWishId] = useState<string | null>(null);

  const activeMoment = TRIBUTE_MOMENTS[activeMomentIdx];

  const handleNextMoment = () => {
    setActiveMomentIdx((prev) => (prev + 1) % TRIBUTE_MOMENTS.length);
  };

  const handlePrevMoment = () => {
    setActiveMomentIdx((prev) => (prev - 1 + TRIBUTE_MOMENTS.length) % TRIBUTE_MOMENTS.length);
  };

  const handleTouchWish = (wishId: string) => {
    setTouchedWishId(wishId);
    confetti({
      particleCount: 28,
      spread: 55,
      origin: { y: 0.75 },
      colors: ['#FF1744', '#EF4444', '#DC2626', '#F59E0B'],
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-24 py-6">
      {/* ================================================================ */}
      {/* 1. SEÇÃO DE MOMENTOS & HOMENAGENS COM A FOTO EM DESTAQUE        */}
      {/* ================================================================ */}
      <section className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Section Badge */}
        <div className="mb-4">
          <span className="glass-obsidian-pill px-4 py-1.5 rounded-full text-xs font-luxury tracking-widest text-[#F59E0B] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/40 shadow-lg">
            <Icon3DStar size={16} />
            <span>Facetas de Uma Vida Extraordinária</span>
            <Icon3DStar size={16} />
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-royal font-bold text-shimmer-ruby drop-shadow-[0_0_35px_rgba(255,23,68,0.4)]">
          {activeMoment.title}
        </h2>

        <p className="font-poetic italic text-xl sm:text-2xl text-[#FFF5F5] max-w-xl mx-auto pt-2 drop-shadow">
          “{activeMoment.quote}”
        </p>

        {/* 3D Photo Card in High-End Showcase */}
        <div className="mt-8 w-full flex flex-col items-center">
          <Luxury3DPhotoCard
            photoUrl={MAIN_HONOREE_PHOTO}
            title={activeMoment.badge}
            caption={activeMoment.detail}
            badge={`Momento ${activeMoment.id} de ${TRIBUTE_MOMENTS.length}`}
            variant="portrait"
          />

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevMoment}
              className="p-3 rounded-full glass-obsidian-card text-red-300 hover:text-white hover:border-red-500/80 transition-all active:scale-95 cursor-pointer shadow-lg border border-red-500/40"
              aria-label="Momento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2 px-2">
              {TRIBUTE_MOMENTS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMomentIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeMomentIdx === idx
                      ? 'w-8 bg-gradient-to-r from-[#FF1744] to-[#F59E0B] shadow-[0_0_12px_rgba(255,23,68,0.8)]'
                      : 'w-2.5 bg-red-950/80 hover:bg-red-800'
                  }`}
                  aria-label={`Ver momento ${m.id}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextMoment}
              className="p-3 rounded-full glass-obsidian-card text-red-300 hover:text-white hover:border-red-500/80 transition-all active:scale-95 cursor-pointer shadow-lg border border-red-500/40"
              aria-label="Próximo momento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. CARTA ABERTA DO CORAÇÃO (HOMENAGEM PROFUNDA E VERDADEIRA)    */}
      {/* ================================================================ */}
      <section className="w-full max-w-3xl mx-auto px-4">
        <div className="relative rounded-[36px] p-8 sm:p-12 glass-obsidian-card border-2 border-red-500/35 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(220,38,38,0.25)] text-center overflow-hidden">
          {/* Subtle Ambient Red Blooms */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#FF1744]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#DC2626]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Gold Corner Filigrees */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#F59E0B] rounded-tl-xl pointer-events-none opacity-80" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#F59E0B] rounded-tr-xl pointer-events-none opacity-80" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#F59E0B] rounded-bl-xl pointer-events-none opacity-80" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#F59E0B] rounded-br-xl pointer-events-none opacity-80" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Icon3DCrown size={32} />
              <span className="font-royal text-xs sm:text-sm font-bold tracking-widest text-[#F59E0B] uppercase">
                Uma Carta Aberta Para Você
              </span>
              <Icon3DCrown size={32} />
            </div>

            <h3 className="text-2xl sm:text-4xl font-royal font-bold text-shimmer-ruby">
              Que a Sua Jornada Seja Sempre Grandiosa
            </h3>

            <div className="space-y-4 max-w-xl mx-auto text-[#FFF5F5]/95">
              <p className="font-poetic italic text-xl sm:text-2xl leading-relaxed">
                “Hoje o mundo celebra a sua existência. Que este novo ano traga consigo a certeza de que você é capaz de alcançar tudo o que o seu coração almeja.”
              </p>
              <p className="text-sm sm:text-base font-light text-red-200/90 leading-relaxed font-sans">
                Que cada amanhecer seja um lembrete do quanto você é especial, forte e amada. Que a sua luz nunca deixe de brilhar e que os seus passos sejam sempre guiados por saúde, paz e realizações.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F59E0B]/70" />
              <Icon3DHeart size={26} />
              <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F59E0B]/70" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. OS 4 DESEJOS PRECIOSOS (3D INTERACTIVE CARDS)                 */}
      {/* ================================================================ */}
      <section className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-3">
          <span className="glass-obsidian-pill px-4 py-1.5 rounded-full text-xs font-luxury tracking-widest text-[#F59E0B] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Toque para Ativar um Desejo</span>
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-royal font-bold text-[#FFF5F5]">
          Desejos Especiais Para o Seu Novo Ciclo
        </h3>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
          {SPECIAL_WISHES.map((wish) => {
            const isTouched = touchedWishId === wish.id;
            return (
              <div
                key={wish.id}
                onClick={() => handleTouchWish(wish.id)}
                className={`relative rounded-3xl p-6 glass-obsidian-card border cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 text-left group ${
                  isTouched
                    ? 'border-[#F59E0B] shadow-[0_0_35px_rgba(245,158,11,0.5)] ring-1 ring-[#F59E0B]'
                    : 'border-red-500/35 hover:border-red-500/70 hover:shadow-[0_0_30px_rgba(255,23,68,0.35)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-2xl bg-red-950/60 border border-red-500/40 group-hover:scale-110 transition-transform flex-shrink-0">
                    {wish.iconName === 'heart' && <Icon3DHeart size={36} />}
                    {wish.iconName === 'sparkle' && <Icon3DStar size={36} />}
                    {wish.iconName === 'champagne' && <Icon3DChampagne size={36} />}
                    {wish.iconName === 'crown' && <Icon3DCrown size={36} />}
                  </div>

                  <div>
                    <h4 className="font-royal text-lg font-bold text-shimmer-ruby">
                      {wish.title}
                    </h4>
                    <p className="text-xs text-red-200/80 leading-relaxed font-sans pt-1">
                      {wish.desc}
                    </p>
                  </div>
                </div>

                {/* Celebratory Active Badge */}
                {isTouched && (
                  <div className="mt-3 pt-3 border-t border-red-500/30 flex items-center justify-between text-[11px] text-[#F59E0B] font-luxury">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                      Desejo enviado com carinho!
                    </span>
                    <span>✨</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
