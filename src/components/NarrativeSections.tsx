import React, { useState } from 'react';
import { WishItem, PhotoStory } from '../types';
import { Heart, Sparkles, Star, ChevronDown, CheckCircle2 } from 'lucide-react';

interface NarrativeSectionsProps {
  honoreeName: string;
  wishes: WishItem[];
  stories: PhotoStory[];
  onExploreMore?: () => void;
}

export const NarrativeSections: React.FC<NarrativeSectionsProps> = ({
  honoreeName,
  wishes,
  stories,
}) => {
  // Active selected wish
  const [selectedWish, setSelectedWish] = useState<string | null>(null);

  // Selected memory for modal inspection
  const [activeMemoryIdx, setActiveMemoryIdx] = useState<number | null>(null);

  // Subset of 4 representative memories of the SAME woman for the cinematic gallery
  const memoryStories = [stories[0], stories[2], stories[4], stories[7]];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-24 sm:space-y-32 py-16 px-4">
      {/* ============================================================== */}
      {/* SEÇÃO 1 — VOCÊ É ESPECIAL                                      */}
      {/* ============================================================== */}
      <section className="relative text-center py-12 px-6 rounded-3xl glass-card-luxury overflow-hidden border border-[#F5A1C4]/20 shadow-2xl">
        {/* Ambient radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E83E86]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-rose-subtle text-xs text-[#F5A1C4] uppercase tracking-widest border border-[#F5A1C4]/20">
            <Heart className="w-3.5 h-3.5 fill-[#E83E86] text-[#E83E86]" />
            <span>Para alguém inesquecível</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-shimmer leading-tight">
            “Existem pessoas que tornam o mundo mais bonito…”
          </h2>

          <p className="font-poetic italic text-lg sm:text-2xl text-[#FFF5FA] leading-relaxed">
            “E você é uma delas. Seu sorriso ilumina momentos, sua presença transforma dias comuns e seu jeito especial deixa lembranças que o tempo jamais apaga.”
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#F5A1C4]/60" />
            <Sparkles className="w-4 h-4 text-[#F5A1C4]" />
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#F5A1C4]/60" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 2 — UM NOVO CAPÍTULO                                     */}
      {/* ============================================================== */}
      <section className="relative text-center py-14 px-6 rounded-3xl bg-[#09070B] border border-[#9D174D]/35 overflow-hidden shadow-2xl">
        {/* Subtle Rosy Light Beams */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(232,62,134,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(157,23,77,0.25),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9D174D]/20 text-xs text-[#F5A1C4] tracking-widest uppercase border border-[#F5A1C4]/20">
            <Star className="w-3.5 h-3.5 fill-[#F5A1C4] text-[#F5A1C4]" />
            <span>Novo Ciclo</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-[#FFF5FA] tracking-tight">
            Que comece um novo capítulo maravilhoso
          </h2>

          <p className="font-poetic italic text-base sm:text-xl text-[#F5A1C4]/90 leading-relaxed">
            “Que este novo ciclo venha acompanhado de conquistas, sonhos realizados, amor verdadeiro e motivos infinitos para sorrir. Que cada dia seja uma nova oportunidade de ser feliz.”
          </p>

          <div className="flex justify-center gap-2 text-xs text-[#F5A1C4]/60 font-mono tracking-wider pt-2">
            <span>Amor</span> · <span>Saúde</span> · <span>Prosperidade</span> · <span>Luz</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 3 — UMA CHUVA DE DESEJOS (INTERATIVA)                    */}
      {/* ============================================================== */}
      <section className="relative text-center py-12 px-4 space-y-8">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-rose-subtle text-xs text-[#F5A1C4] uppercase tracking-widest border border-[#F5A1C4]/20">
            <span>Interativo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-shimmer">
            Uma Chuva de Desejos
          </h2>
          <p className="text-xs sm:text-sm text-[#F5A1C4]/80 font-luxury">
            Toque nos desejos abaixo para revelar mensagens especiais preparadas para você:
          </p>
        </div>

        {/* Floating Wishes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-2xl mx-auto">
          {wishes.map((w) => {
            const isOpened = selectedWish === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWish(isOpened ? null : w.id)}
                className={`relative group p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpened
                    ? 'bg-gradient-to-br from-[#9D174D]/60 via-[#E83E86]/30 to-[#09070B] border border-[#F5A1C4] shadow-[0_0_30px_rgba(232,62,134,0.4)] scale-105'
                    : 'glass-rose hover:bg-[#9D174D]/30 border border-[#F5A1C4]/25 hover:border-[#F5A1C4]/60 hover:scale-[1.02]'
                }`}
              >
                {/* Glow reflection */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(245,161,196,0.6)]">
                    {w.icon}
                  </span>
                  <Sparkles className={`w-3.5 h-3.5 transition-transform ${isOpened ? 'text-[#FFF5FA] rotate-45' : 'text-[#F5A1C4]/50'}`} />
                </div>

                <div className="font-luxury font-semibold text-sm sm:text-base text-[#FFF5FA]">
                  {w.word}
                </div>

                {/* Secret message revealed on tap */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isOpened ? 'max-h-28 mt-2.5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-poetic italic text-xs sm:text-sm text-[#FFF5FA] leading-snug border-t border-[#F5A1C4]/30 pt-2">
                    "{w.message}"
                  </p>
                </div>

                {!isOpened && (
                  <p className="text-[10px] text-[#F5A1C4]/60 uppercase tracking-widest mt-1">
                    Toque para abrir ✦
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 4 — MOMENTOS INESQUECÍVEIS (GALERIA DE LEMBRANÇAS)       */}
      {/* ============================================================== */}
      <section className="relative text-center py-10 space-y-8">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-rose-subtle text-xs text-[#F5A1C4] uppercase tracking-widest border border-[#F5A1C4]/20">
            <span>Mural de Memórias</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-[#FFF5FA]">
            Momentos Inesquecíveis
          </h2>
          <p className="text-xs sm:text-sm text-[#F5A1C4]/80 font-luxury">
            Lembranças cinematográficas da mesma história e do mesmo sorriso
          </p>
        </div>

        {/* 4 Cinematic Polaroids of the SAME model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {memoryStories.map((story, idx) => (
            <div
              key={story.id}
              className="group relative p-3 sm:p-4 rounded-3xl glass-card-luxury border border-[#F5A1C4]/25 hover:border-[#F5A1C4]/60 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(157,23,77,0.4)] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 shadow-lg mb-3">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09070B]/80 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 text-[11px] font-luxury text-[#F5A1C4] uppercase tracking-wider glass-rose-subtle px-2.5 py-1 rounded-full border border-[#F5A1C4]/20">
                  {story.subtitle}
                </span>
              </div>

              {/* Title & quote */}
              <h3 className="text-base font-luxury font-semibold text-[#FFF5FA]">
                {story.title}
              </h3>
              <p className="font-poetic italic text-xs sm:text-sm text-[#F5A1C4] mt-1 max-w-xs">
                "{story.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 5 — UMA MENSAGEM DO CORAÇÃO                              */}
      {/* ============================================================== */}
      <section className="relative text-center py-16 px-6 sm:px-12 rounded-3xl bg-gradient-to-b from-[#9D174D]/25 via-[#09070B] to-[#9D174D]/20 border border-[#F5A1C4]/30 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E83E86]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-luxury uppercase tracking-[0.25em] text-[#F5A1C4]">
            <Heart className="w-4 h-4 fill-[#E83E86] text-[#E83E86]" />
            <span>Uma Mensagem do Coração</span>
            <Heart className="w-4 h-4 fill-[#E83E86] text-[#E83E86]" />
          </div>

          <h2 className="text-xl sm:text-3xl font-luxury font-bold text-shimmer leading-relaxed">
            “Se eu pudesse te desejar apenas uma coisa, seria que a vida sempre encontrasse maneiras de fazer você sorrir. Porque pessoas especiais merecem viver histórias extraordinárias.”
          </h2>

          {honoreeName && (
            <p className="font-poetic italic text-lg sm:text-2xl text-[#FFF5FA] pt-2">
              Com todo carinho e admiração, sempre. 💜
            </p>
          )}

          <div className="pt-4 flex items-center justify-center gap-2">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F5A1C4]" />
            <Star className="w-4 h-4 fill-[#F5A1C4] text-[#F5A1C4]" />
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F5A1C4]" />
          </div>
        </div>
      </section>
    </div>
  );
};
