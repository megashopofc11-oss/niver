/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ChevronDown, Sparkles } from 'lucide-react';
import { MAIN_HONOREE_PHOTO } from './data/defaultExperience';
import { ThreeGiftBox } from './components/ThreeGiftBox';
import { ThreeCakeScene } from './components/ThreeCakeScene';
import { CinematicParticles } from './components/CinematicParticles';
import { MusicalNotesVisualizer } from './components/MusicalNotesVisualizer';
import { AudioPlayerController } from './components/AudioPlayerController';
import { Luxury3DPhotoCard } from './components/Luxury3DPhotoCard';
import { InteractiveTributeExperience } from './components/InteractiveTributeExperience';
import { Icon3DHeart, Icon3DCrown, Icon3DStar } from './components/ThreeDIcons';

export default function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Discreet ruby & gold celebratory sparks on open (NO pure white glare)
  const triggerOpeningConfetti = useCallback(() => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FF1744', '#DC2626', '#EF4444', '#F59E0B'],
    });
  }, []);

  // OPEN GIFT HANDLER: Triggers audio playback & unlocks vertical scroll
  const handleOpenGift = () => {
    if (isGiftOpened || isBoxOpening) return;

    setIsBoxOpening(true);
    setShouldPlayAudio(true);

    setTimeout(() => {
      triggerOpeningConfetti();
    }, 450);

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
    <div className="relative min-h-screen w-full bg-[#030204] text-[#FFF5F5] select-none ruby-radial-bg overflow-x-hidden">
      {/* Background Ambience & Discrete Particle System (Pure Black + Ruby Glow) */}
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
        <section className="relative z-30 min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 text-center">
          {/* Texto acima do presente */}
          <div className="mb-2 sm:mb-4 max-w-md">
            <p className="font-royal text-xl sm:text-2xl text-[#FFF5F5] font-bold tracking-wide drop-shadow-[0_0_25px_rgba(255,23,68,0.7)]">
              Uma surpresa especial espera por você…
            </p>
          </div>

          {/* Presente 3D Preto & Vermelho Rubi (Sem cortes, sem mancha branca) */}
          <div className="my-1 w-full flex justify-center">
            <ThreeGiftBox
              isOpening={isBoxOpening}
              onOpen={handleOpenGift}
            />
          </div>

          {/* Botão abaixo do presente */}
          <div className="mt-2 sm:mt-4">
            <button
              onClick={handleOpenGift}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass-obsidian-card text-sm sm:text-base font-bold text-[#FFF5F5] hover:text-white hover:border-red-500/80 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(220,38,38,0.4)] cursor-pointer border border-red-500/50"
            >
              <Icon3DHeart size={20} />
              <span className="font-luxury tracking-wide">Toque para abrir seu presente</span>
              <Sparkles className="w-4 h-4 text-[#F59E0B] group-hover:rotate-45 transition-transform" />
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
          className="relative z-30 w-full pt-10 pb-20 flex flex-col items-center"
        >
          {/* ============================================================ */}
          {/* 2. TÍTULO “HAPPY BIRTHDAY” + FRASE DE ABERTURA              */}
          {/* ============================================================ */}
          <section className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 py-12 text-center">
            <div className="relative mb-4 flex items-center justify-center">
              <Icon3DCrown size={58} />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-royal font-black tracking-wider text-shimmer-ruby drop-shadow-[0_0_50px_rgba(255,23,68,0.8)]">
              HAPPY BIRTHDAY
            </h1>

            <p className="font-poetic italic text-2xl sm:text-4xl text-[#FFF5F5] leading-relaxed max-w-2xl mx-auto pt-4 drop-shadow">
              “Hoje é um dia sagrado para celebrar alguém verdadeiramente extraordinária.”
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F59E0B]" />
              <Icon3DStar size={20} />
              <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F59E0B]" />
            </div>

            {/* Seta indicando conteúdo abaixo */}
            <div className="mt-12 flex flex-col items-center gap-1.5 text-xs text-red-300/80 animate-bounce">
              <span className="font-luxury uppercase tracking-widest text-[11px]">Deslize para ver sua homenagem</span>
              <ChevronDown className="w-4 h-4 text-[#FF1744]" />
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3. SEÇÃO 1 — FOTO PRINCIPAL DA ANIVERSARIANTE EM DESTAQUE    */}
          {/* ============================================================ */}
          <section className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col items-center text-center">
            <div className="mb-4">
              <span className="glass-obsidian-pill px-4 py-1.5 rounded-full text-xs font-luxury tracking-widest text-[#F59E0B] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>A Estrela do Dia</span>
              </span>
            </div>

            {/* 3D Luxury Hero Photo Card (High Resolution, No Cuts) */}
            <Luxury3DPhotoCard
              photoUrl={MAIN_HONOREE_PHOTO}
              title="Isabella"
              caption="Existem pessoas que tornam o mundo mais bonito apenas por existirem."
              badge="Rainha do Dia"
              variant="hero"
            />
          </section>

          {/* ============================================================ */}
          {/* 4. SEÇÃO 2 & 3 — MOMENTOS, CARTA ABERTA & DESEJOS 3D         */}
          {/* ============================================================ */}
          <InteractiveTributeExperience />

          {/* ============================================================ */}
          {/* 5. SEÇÃO FINAL — BOLO 3D INTERATIVO & MENSAGEM FINAL         */}
          {/* ============================================================ */}
          <section className="w-full max-w-3xl mx-auto py-20 px-4 flex flex-col items-center text-center">
            <div className="mb-4">
              <span className="glass-obsidian-pill px-4 py-1.5 rounded-full text-xs font-luxury tracking-widest text-[#F59E0B] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Cenário 3D · Arraste para Girar o Bolo</span>
              </span>
            </div>

            {/* Real Interactive 3D WebGL Birthday Cake */}
            <ThreeCakeScene />

            <div className="mt-8 space-y-4">
              <h2 className="text-4xl sm:text-6xl font-royal font-bold tracking-tight text-shimmer-ruby drop-shadow-xl">
                FELIZ ANIVERSÁRIO!
              </h2>

              <p className="font-poetic italic text-xl sm:text-3xl text-[#FFF5F5] leading-relaxed max-w-lg mx-auto pt-1">
                “Que a felicidade acompanhe cada passo do seu novo ciclo e que todos os seus sonhos se tornem realidade.”
              </p>

              <div className="pt-8">
                <button
                  onClick={handleRestart}
                  className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] text-[#FFF5F5] font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(255,23,68,0.5)] hover:shadow-[0_0_50px_rgba(255,23,68,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#F59E0B]/40"
                >
                  <Icon3DHeart size={20} />
                  <span className="font-luxury tracking-wide">Reviver esta Surpresa</span>
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer de Luxo */}
      <footer className="relative z-30 w-full px-4 py-6 text-center border-t border-red-500/20 bg-[#030204]">
        <div className="flex items-center justify-center gap-2 text-xs text-red-300/60 font-luxury tracking-widest uppercase">
          <span>Homenagem Cinematográfica</span>
          <span>·</span>
          <span>Feita com Amor & Encanto</span>
        </div>
      </footer>
    </div>
  );
}
