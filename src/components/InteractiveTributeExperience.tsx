import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TRIBUTE_MOMENTS, SPECIAL_WISHES, MAIN_HONOREE_PHOTO } from '../data/defaultExperience';
import { Icon3DHeart, Icon3DCrown, Icon3DStar, Icon3DChampagne } from './ThreeDIcons';
import { Luxury3DPhotoCard } from './Luxury3DPhotoCard';

export const InteractiveTributeExperience: React.FC = () => {
  const [activeMomentIdx, setActiveMomentIdx] = useState(0);
  const [touchedWishes, setTouchedWishes] = useState<Record<string, boolean>>({});

  const activeMoment = TRIBUTE_MOMENTS[activeMomentIdx];

  const handleNextMoment = () => {
    setActiveMomentIdx((prev) => (prev + 1) % TRIBUTE_MOMENTS.length);
  };

  const handlePrevMoment = () => {
    setActiveMomentIdx((prev) => (prev - 1 + TRIBUTE_MOMENTS.length) % TRIBUTE_MOMENTS.length);
  };

  const handleTouchWish = (wishId: string) => {
    setTouchedWishes((prev) => ({ ...prev, [wishId]: true }));
    confetti({
      particleCount: 35,
      spread: 65,
      origin: { y: 0.75 },
      colors: ['#FF1744', '#FF0055', '#DC2626', '#FEF08A', '#FFFFFF'],
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-20 py-4 select-none">
      {/* ================================================================ */}
      {/* 1. SEÇÃO DE MOMENTOS & HOMENAGENS COM A FOTO EM DESTAQUE        */}
      {/* ================================================================ */}
      <section className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Section Badge */}
        <div className="mb-4">
          <span className="glass-obsidian-pill px-4 py-2 rounded-full text-xs sm:text-sm font-sans-clean font-bold tracking-wider text-[#FEF08A] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/50 shadow-lg">
            <Icon3DStar size={16} />
            <span>Momentos Inesquecíveis da Sua Vida</span>
            <Icon3DStar size={16} />
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-royal font-bold text-shimmer-ruby leading-tight">
          {activeMoment.title}
        </h2>

        <p className="font-royal text-xl sm:text-2xl font-semibold text-white max-w-xl mx-auto pt-3 text-glow-white leading-relaxed">
          “{activeMoment.quote}”
        </p>

        {/* 3D Photo Card in High-End Showcase */}
        <div className="mt-8 w-full flex flex-col items-center">
          <Luxury3DPhotoCard
            photoUrl={MAIN_HONOREE_PHOTO}
            title={activeMoment.badge}
            caption={activeMoment.detail}
            badge={`Homenagem ${activeMoment.id} de ${TRIBUTE_MOMENTS.length}`}
            variant="portrait"
          />

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevMoment}
              className="p-3.5 rounded-full glass-obsidian-card text-white hover:border-red-400 transition-all active:scale-95 cursor-pointer shadow-lg border border-red-500/50 hover:shadow-[0_0_20px_rgba(255,23,68,0.6)]"
              aria-label="Momento anterior"
            >
              <ChevronLeft className="w-5 h-5 text-[#FEF08A]" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2 px-2">
              {TRIBUTE_MOMENTS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMomentIdx(idx)}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    activeMomentIdx === idx
                      ? 'w-9 bg-gradient-to-r from-[#FF1744] via-[#FF0055] to-[#FEF08A] shadow-[0_0_15px_rgba(255,23,68,1)]'
                      : 'w-3 bg-red-950/90 border border-red-500/30 hover:bg-red-800'
                  }`}
                  aria-label={`Ver momento ${m.id}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextMoment}
              className="p-3.5 rounded-full glass-obsidian-card text-white hover:border-red-400 transition-all active:scale-95 cursor-pointer shadow-lg border border-red-500/50 hover:shadow-[0_0_20px_rgba(255,23,68,0.6)]"
              aria-label="Próximo momento"
            >
              <ChevronRight className="w-5 h-5 text-[#FEF08A]" />
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. CARTA ABERTA DO CORAÇÃO (HOMENAGEM PROFUNDA E VIBRANTE)      */}
      {/* ================================================================ */}
      <section className="w-full max-w-3xl mx-auto px-4">
        <div className="relative rounded-[36px] p-8 sm:p-12 glass-obsidian-card border-2 border-red-500/50 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(220,38,38,0.35)] text-center overflow-hidden">
          {/* Subtle Ambient Red Blooms */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#FF1744]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#DC2626]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Top Gold Corner Filigrees */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#F59E0B] rounded-tl-xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#F59E0B] rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#F59E0B] rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#F59E0B] rounded-br-xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Icon3DCrown size={36} />
              <span className="font-sans-clean text-xs sm:text-sm font-bold tracking-widest text-[#FEF08A] uppercase">
                Uma Carta Aberta Para Você
              </span>
              <Icon3DCrown size={36} />
            </div>

            <h3 className="text-2xl sm:text-4xl font-royal font-bold text-shimmer-ruby">
              Que a Sua Jornada Seja Sempre Grandiosa
            </h3>

            <div className="space-y-4 max-w-xl mx-auto text-white">
              <p className="font-royal text-xl sm:text-2xl font-semibold leading-relaxed text-glow-white">
                “Hoje o mundo inteiro se curva para celebrar a sua vida, a sua beleza e tudo o que você representa.”
              </p>
              <p className="text-base sm:text-lg font-sans-clean font-medium text-red-100 leading-relaxed">
                Que cada amanhecer seja um lembrete do quanto você é especial, corajosa e amada. Que a sua luz nunca deixe de brilhar e que os seus passos sejam sempre guiados por saúde inabalável, paz profunda e realizações inesquecíveis.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#F59E0B]" />
              <Icon3DHeart size={30} />
              <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#F59E0B]" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. OS 4 DESEJOS PRECIOSOS (3D INTERACTIVE CARDS)                 */}
      {/* ================================================================ */}
      <section className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-3">
          <span className="glass-obsidian-pill px-4 py-2 rounded-full text-xs sm:text-sm font-sans-clean font-bold tracking-wider text-[#FEF08A] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/50 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#FEF08A]" />
            <span>Toque para Ativar Seus Desejos</span>
            <Sparkles className="w-4 h-4 text-[#FEF08A]" />
          </span>
        </div>

        <h3 className="text-3xl sm:text-5xl font-royal font-bold text-white text-glow-white">
          Desejos Especiais Para o Seu Novo Ciclo
        </h3>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
          {SPECIAL_WISHES.map((wish) => {
            const isTouched = !!touchedWishes[wish.id];
            return (
              <div
                key={wish.id}
                onClick={() => handleTouchWish(wish.id)}
                className={`relative rounded-3xl p-6 glass-obsidian-card border-2 cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 text-left group ${
                  isTouched
                    ? 'border-[#FEF08A] shadow-[0_0_35px_rgba(245,158,11,0.65)] ring-2 ring-[#FEF08A]'
                    : 'border-red-500/40 hover:border-red-400 hover:shadow-[0_0_30px_rgba(255,23,68,0.5)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-red-950/80 border border-red-500/50 group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg">
                    {wish.iconName === 'heart' && <Icon3DHeart size={38} />}
                    {wish.iconName === 'sparkle' && <Icon3DStar size={38} />}
                    {wish.iconName === 'champagne' && <Icon3DChampagne size={38} />}
                    {wish.iconName === 'crown' && <Icon3DCrown size={38} />}
                  </div>

                  <div>
                    <h4 className="font-royal text-xl font-bold text-shimmer-ruby">
                      {wish.title}
                    </h4>
                    <p className="text-sm font-sans-clean font-medium text-white/95 leading-relaxed pt-1">
                      {wish.desc}
                    </p>
                  </div>
                </div>

                {/* Celebratory Active Badge */}
                {isTouched && (
                  <div className="mt-3.5 pt-3 border-t border-red-500/40 flex items-center justify-between text-xs font-sans-clean font-bold text-[#FEF08A]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FEF08A]" />
                      Desejo ativado com sucesso!
                    </span>
                    <span>✨🎂</span>
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
