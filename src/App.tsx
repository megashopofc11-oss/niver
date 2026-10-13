/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ChevronDown, Sparkles, PartyPopper } from 'lucide-react';
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

  // Celebratory sparks burst (Ruby, Gold, White)
  const triggerOpeningConfetti = useCallback(() => {
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF1744', '#FF0055', '#DC2626', '#FEF08A', '#FFFFFF'],
    });
  }, []);

  // Extra fun celebratory confetti trigger
  const handleExtraConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF1744', '#F59E0B', '#FF0055', '#FFFFFF', '#FEF08A'],
    });
  };

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
    <div className="relative min-h-screen w-full bg-[#030204] text-white select-none ruby-radial-bg overflow-x-hidden">
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

      {/* Floating Celebratory Confetti Cannon Button (Active when gift opened) */}
      {isGiftOpened && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleExtraConfetti}
            className="group flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF1744] via-[#DC2626] to-[#F59E0B] text-white font-sans-clean font-bold text-sm shadow-[0_0_25px_rgba(255,23,68,0.7)] hover:shadow-[0_0_40px_rgba(255,23,68,1)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-[#FEF08A]/60"
            title="Soltar Confetes de Celebração"
          >
            <PartyPopper className="w-4 h-4 text-[#FEF08A] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Comemorar 🎉</span>
          </button>
        </div>
      )}

      {/* ================================================================ */}
      {/* 1. TELA INICIAL — PRESENTE 100% VISÍVEL E CENTRALIZADO           */}
      {/* ================================================================ */}
      {!isGiftOpened && (
        <section className="relative z-30 min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 text-center">
          {/* Texto acima do presente - NÍTIDO E VIBRANTE */}
          <div className="mb-3 sm:mb-5 max-w-lg">
            <h2 className="font-royal text-2xl sm:text-3xl text-white font-bold tracking-wide text-glow-white">
              Uma surpresa especial espera por você…
            </h2>
          </div>

          {/* Presente 3D Preto & Vermelho Rubi (Sem cortes, sem mancha branca) */}
          <div className="my-1 w-full flex justify-center">
            <ThreeGiftBox
              isOpening={isBoxOpening}
              onOpen={handleOpenGift}
            />
          </div>

          {/* Botão abaixo do presente */}
          <div className="mt-3 sm:mt-5">
            <button
              onClick={handleOpenGift}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#DC2626] via-[#FF1744] to-[#DC2626] text-white font-sans-clean font-bold text-base sm:text-lg hover:shadow-[0_0_40px_rgba(255,23,68,0.9)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.6)] cursor-pointer border-2 border-[#FEF08A]/60"
            >
              <Icon3DHeart size={24} />
              <span>Toque para abrir seu presente</span>
              <Sparkles className="w-5 h-5 text-[#FEF08A] group-hover:rotate-45 transition-transform" />
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
            <div className="relative mb-5 flex items-center justify-center">
              <Icon3DCrown size={64} />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-royal font-black tracking-wide text-shimmer-ruby">
              HAPPY BIRTHDAY
            </h1>

            <p className="font-royal text-2xl sm:text-4xl font-semibold text-white leading-relaxed max-w-2xl mx-auto pt-4 text-glow-white">
              “Hoje é um dia sagrado para celebrar alguém verdadeiramente extraordinária.”
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#F59E0B]" />
              <Icon3DStar size={24} />
              <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#F59E0B]" />
            </div>

            {/* Seta indicando conteúdo abaixo */}
            <div className="mt-12 flex flex-col items-center gap-2 text-red-200 animate-bounce">
              <span className="font-sans-clean font-bold uppercase tracking-widest text-xs">
                Deslize para ver sua homenagem
              </span>
              <ChevronDown className="w-5 h-5 text-[#FF1744]" />
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3. SEÇÃO 1 — FOTO PRINCIPAL DA ANIVERSARIANTE EM DESTAQUE    */}
          {/* ============================================================ */}
          <section className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col items-center text-center">
            <div className="mb-4">
              <span className="glass-obsidian-pill px-4 py-2 rounded-full text-xs sm:text-sm font-sans-clean font-bold tracking-wider text-[#FEF08A] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#FEF08A]" />
                <span>A Grande Estrela do Dia</span>
                <Sparkles className="w-4 h-4 text-[#FEF08A]" />
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
              <span className="glass-obsidian-pill px-4 py-2 rounded-full text-xs sm:text-sm font-sans-clean font-bold tracking-wider text-[#FEF08A] uppercase inline-flex items-center gap-2 border border-[#F59E0B]/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#FEF08A]" />
                <span>Cenário 3D · Arraste para Girar o Bolo</span>
                <Sparkles className="w-4 h-4 text-[#FEF08A]" />
              </span>
            </div>

            {/* Real Interactive 3D WebGL Birthday Cake with Candle Blow-Out */}
            <ThreeCakeScene />

            <div className="mt-8 space-y-4">
              <h2 className="text-4xl sm:text-6xl font-royal font-bold tracking-tight text-shimmer-ruby">
                FELIZ ANIVERSÁRIO!
              </h2>

              <p className="font-royal text-xl sm:text-3xl font-semibold text-white leading-relaxed max-w-lg mx-auto pt-1 text-glow-white">
                “Que a felicidade acompanhe cada passo do seu novo ciclo e que todos os seus sonhos se tornem realidade.”
              </p>

              <div className="pt-8">
                <button
                  onClick={handleRestart}
                  className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] text-white font-sans-clean font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(255,23,68,0.6)] hover:shadow-[0_0_50px_rgba(255,23,68,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-[#FEF08A]/50"
                >
                  <Icon3DHeart size={22} />
                  <span>Reviver esta Surpresa</span>
                  <Sparkles className="w-4 h-4 text-[#FEF08A]" />
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer de Luxo */}
      <footer className="relative z-30 w-full px-4 py-6 text-center border-t border-red-500/20 bg-[#030204]">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-red-200 font-sans-clean font-bold tracking-wider uppercase">
          <span>Homenagem Cinematográfica</span>
          <span>·</span>
          <span>Feita com Amor & Encanto</span>
        </div>
      </footer>
    </div>
  );
}
