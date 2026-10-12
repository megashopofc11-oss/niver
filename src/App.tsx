/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import { MAIN_HONOREE_PHOTO } from './data/defaultExperience';
import { ThreeGiftBox } from './components/ThreeGiftBox';
import { ThreePhotoStage } from './components/ThreePhotoStage';
import { ThreeCakeScene } from './components/ThreeCakeScene';
import { CinematicParticles } from './components/CinematicParticles';
import { MusicalNotesVisualizer } from './components/MusicalNotesVisualizer';
import { AudioPlayerController } from './components/AudioPlayerController';

export default function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Discreet opening sparkle burst
  const triggerOpeningConfetti = useCallback(() => {
    confetti({
      particleCount: 40,
      spread: 65,
      origin: { y: 0.65 },
      colors: ['#F6A4C8', '#E1458E', '#8E1B52', '#FFF7FB'],
    });
  }, []);

  // OPEN GIFT HANDLER: Triggers audio playback & unlocks vertical scroll
  const handleOpenGift = () => {
    if (isGiftOpened || isBoxOpening) return;

    setIsBoxOpening(true);
    setShouldPlayAudio(true);

    setTimeout(() => {
      triggerOpeningConfetti();
    }, 400);

    setTimeout(() => {
      setIsGiftOpened(true);
      setIsBoxOpening(false);
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1250);
  };

  // Restart experience
  const handleRestart = () => {
    setIsGiftOpened(false);
    setIsBoxOpening(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0A0F] text-[#FFF7FB] select-none rose-radial-bg overflow-x-hidden">
      {/* Background Ambience & Discrete Particle System */}
      <CinematicParticles intensity={isGiftOpened ? 'celebration' : 'calm'} />

      {/* Discrete Musical Notes Visualizer (Only during audio playback) */}
      <MusicalNotesVisualizer isPlaying={isAudioPlaying} />

      {/* Main Telemessage Audio Controller */}
      <AudioPlayerController
        shouldPlay={shouldPlayAudio}
        sourceType="youtube"
        youtubeVideoId="ysoEwjtOAtw"
        onPlaybackStateChange={setIsAudioPlaying}
      />

      {/* ================================================================ */}
      {/* 1. TELA INICIAL — PRESENTE 100% VISÍVEL E CENTRALIZADO           */}
      {/* ================================================================ */}
      {!isGiftOpened && (
        <section className="relative z-30 min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 text-center animate-in fade-in duration-700">
          {/* Texto acima do presente */}
          <div className="mb-3 sm:mb-5 max-w-md">
            <p className="font-luxury text-xl sm:text-2xl text-[#FFF7FB] font-medium tracking-wide drop-shadow-[0_0_20px_rgba(246,164,200,0.6)]">
              Uma surpresa especial espera por você…
            </p>
          </div>

          {/* Presente 3D Rosa Metálico com Laço Preto (Completamente Desobstruído, Sem Manchas) */}
          <div className="my-1">
            <ThreeGiftBox
              isOpening={isBoxOpening}
              onOpen={handleOpenGift}
            />
          </div>

          {/* Texto abaixo do presente */}
          <div className="mt-3 sm:mt-5">
            <button
              onClick={handleOpenGift}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-clean-card text-sm sm:text-base font-medium text-[#FFF7FB] hover:text-white hover:border-[#F6A4C8]/70 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#8E1B52]/40 cursor-pointer"
            >
              <span>Toque no presente para abrir 💜</span>
              <Sparkles className="w-4 h-4 text-[#F6A4C8] group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* EXPERIÊNCIA COMPLETA EM ROLAGEM VERTICAL CONTÍNUA               */}
      {/* ================================================================ */}
      {isGiftOpened && (
        <main
          ref={contentRef}
          className="relative z-30 w-full pt-10 pb-16 flex flex-col items-center animate-in fade-in duration-1000"
        >
          {/* ============================================================ */}
          {/* 3. TÍTULO “HAPPY BIRTHDAY” + FRASE DE ABERTURA              */}
          {/* ============================================================ */}
          <section className="min-h-[75vh] w-full flex flex-col items-center justify-center px-4 py-12 text-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-[#E1458E]/20 blur-xl absolute -z-10 animate-ping" />
              <Heart className="w-10 h-10 text-[#F6A4C8] fill-[#8E1B52]/30 drop-shadow-[0_0_25px_rgba(225,69,142,0.8)] animate-pulse" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-luxury font-bold tracking-tight text-shimmer-rose drop-shadow-[0_0_40px_rgba(246,164,200,0.9)]">
              HAPPY BIRTHDAY
            </h1>

            <p className="font-poetic italic text-xl sm:text-3xl text-[#FFF7FB] leading-relaxed max-w-xl mx-auto pt-4 drop-shadow">
              “Hoje é um dia especial para celebrar alguém muito especial.”
            </p>

            {/* Seta discreta indicando conteúdo abaixo */}
            <div className="mt-12 flex flex-col items-center gap-1.5 text-xs text-[#F6A4C8]/80 animate-bounce">
              <span className="font-luxury uppercase tracking-widest text-[11px]">Deslize para ver mais</span>
              <ChevronDown className="w-4 h-4 text-[#F6A4C8]" />
            </div>
          </section>

          {/* ============================================================ */}
          {/* 4. SEÇÃO 1 — FOTO PRINCIPAL EM DESTAQUE                      */}
          {/* ============================================================ */}
          <section className="w-full max-w-3xl mx-auto py-16 px-4 flex flex-col items-center text-center">
            <div className="mb-6">
              <span className="glass-clean-pill px-4 py-1 rounded-full text-xs font-luxury tracking-widest text-[#F6A4C8] uppercase">
                A Aniversariante
              </span>
            </div>

            {/* Foto Oficial Grande (1080x1080 / Nítida, Sem Cortes) */}
            <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] aspect-square rounded-3xl overflow-hidden glass-clean-card border border-[#F6A4C8]/35 shadow-[0_25px_60px_-15px_rgba(142,27,82,0.45)] group">
              <div className="w-full h-full relative overflow-hidden bg-[#0B0A0F]">
                <img
                  src={MAIN_HONOREE_PHOTO}
                  alt="Foto Principal da Aniversariante"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-7000 ease-out group-hover:scale-105"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-[#F6A4C8]/60 pointer-events-none shadow-[inset_0_0_35px_rgba(246,164,200,0.2)]" />
              </div>
            </div>

            {/* Texto delicado abaixo */}
            <div className="mt-8 max-w-lg mx-auto">
              <p className="font-poetic italic text-2xl sm:text-3xl text-[#FFF7FB] leading-relaxed drop-shadow-sm">
                “Existem pessoas que tornam o mundo mais bonito apenas por existirem.”
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#F6A4C8]/60" />
                <Sparkles className="w-3.5 h-3.5 text-[#F6A4C8]" />
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#F6A4C8]/60" />
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 5. SEÇÃO 2 — CARROSSEL 3D REAL INTERATIVO                    */}
          {/* (Three.js WebGL Floating 3D Frame com Parallax & Flip 3D)    */}
          {/* ============================================================ */}
          <section className="w-full max-w-4xl mx-auto py-16 px-4 flex flex-col items-center text-center">
            <div className="space-y-2 mb-8">
              <span className="glass-clean-pill px-4 py-1 rounded-full text-xs font-luxury tracking-widest text-[#F6A4C8] uppercase">
                Galeria 3D Real
              </span>
              <h2 className="text-3xl sm:text-5xl font-luxury font-bold text-[#FFF7FB]">
                Desejos Para Cada Instante
              </h2>
              <p className="text-xs sm:text-sm text-[#F6A4C8]/80 font-luxury">
                Quadro 3D flutuante interativo: arraste ou toque para inclinar e navegar
              </p>
            </div>

            {/* Stage 3D Real em WebGL */}
            <ThreePhotoStage photoUrl={MAIN_HONOREE_PHOTO} />
          </section>

          {/* ============================================================ */}
          {/* 6. SEÇÃO 3 — MENSAGEM ESPECIAL                               */}
          {/* ============================================================ */}
          <section className="w-full max-w-3xl mx-auto py-16 px-6">
            <div className="relative rounded-3xl p-8 sm:p-12 glass-clean-card border border-[#F6A4C8]/30 shadow-2xl text-center overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E1458E]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#8E1B52]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-luxury tracking-widest text-[#F6A4C8] uppercase">
                  <Heart className="w-3.5 h-3.5 fill-[#E1458E] text-[#E1458E]" />
                  <span>Uma Mensagem Especial</span>
                  <Heart className="w-3.5 h-3.5 fill-[#E1458E] text-[#E1458E]" />
                </div>

                <p className="font-poetic italic text-xl sm:text-3xl text-[#FFF7FB] leading-relaxed drop-shadow-sm">
                  “Que este novo ciclo chegue com amor, paz, saúde, felicidade e muitas conquistas. Que sua caminhada seja iluminada e seu coração esteja sempre cercado de coisas boas.”
                </p>

                <div className="pt-2 flex items-center justify-center gap-2">
                  <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F6A4C8]/60" />
                  <Sparkles className="w-4 h-4 text-[#F6A4C8]" />
                  <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F6A4C8]/60" />
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 7. SEÇÃO 4 — MAIS HOMENAGEM COM FOTO                         */}
          {/* ============================================================ */}
          <section className="w-full max-w-4xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="w-full max-w-[300px] xs:max-w-[340px] aspect-square rounded-3xl overflow-hidden glass-clean-card border border-[#F6A4C8]/30 shadow-2xl flex-shrink-0 group">
              <div className="w-full h-full relative overflow-hidden bg-[#0B0A0F]">
                <img
                  src={MAIN_HONOREE_PHOTO}
                  alt="Homenagem Aniversariante"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-5000 ease-out group-hover:scale-105"
                  style={{ objectPosition: 'center 22%' }}
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-[#F6A4C8]/50 pointer-events-none" />
              </div>
            </div>

            <div className="max-w-md text-center md:text-left space-y-4">
              <span className="glass-clean-pill px-3.5 py-1 rounded-full text-xs font-luxury tracking-widest text-[#F6A4C8] uppercase inline-block">
                Celebração
              </span>

              <h3 className="text-3xl sm:text-4xl font-luxury font-bold text-shimmer-rose leading-tight">
                Celebrando a Sua Vida
              </h3>

              <p className="font-poetic italic text-xl sm:text-2xl text-[#FFF7FB] leading-relaxed">
                “Hoje celebramos sua vida, seu sorriso e tudo de especial que existe em você.”
              </p>

              <p className="text-xs sm:text-sm text-[#F6A4C8]/80 font-luxury pt-1">
                Que cada novo dia continue revelando a força da sua essência e o brilho incomparável da sua alma.
              </p>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 8. SEÇÃO 5 — FINAL COM BOLO 3D INTERATIVO & MENSAGEM FINAL   */}
          {/* (Three.js WebGL Interactive Cake, Flickering Candles & Orb) */}
          {/* ============================================================ */}
          <section className="w-full max-w-3xl mx-auto py-16 px-4 flex flex-col items-center text-center">
            <div className="mb-4">
              <span className="glass-clean-pill px-4 py-1 rounded-full text-xs font-luxury tracking-widest text-[#F6A4C8] uppercase">
                Cenário 3D · Arraste para Girar
              </span>
            </div>

            {/* Real Interactive 3D WebGL Birthday Cake */}
            <ThreeCakeScene />

            <div className="mt-8 space-y-3">
              <h2 className="text-4xl sm:text-6xl font-luxury font-bold tracking-tight text-shimmer-rose drop-shadow-xl">
                HAPPY BIRTHDAY
              </h2>

              <p className="font-poetic italic text-xl sm:text-2xl text-[#FFF7FB] leading-relaxed max-w-lg mx-auto pt-1">
                “Que a felicidade acompanhe cada passo do seu novo ciclo.”
              </p>

              <div className="pt-6">
                <button
                  onClick={handleRestart}
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8E1B52] via-[#E1458E] to-[#8E1B52] text-[#FFF7FB] font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(225,69,142,0.45)] hover:shadow-[0_0_40px_rgba(246,164,200,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#F6A4C8]/30"
                >
                  <Sparkles className="w-4 h-4 text-[#FFF7FB]" />
                  <span>Reviver surpresa</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer Discreto */}
      <footer className="relative z-30 w-full px-4 py-4 text-center border-t border-[#F6A4C8]/10 bg-[#0B0A0F]">
        <p className="text-[11px] text-[#F6A4C8]/50 font-luxury tracking-wider">
          Experiência 3D Cinematográfica · Feita com Amor
        </p>
      </footer>
    </div>
  );
}
