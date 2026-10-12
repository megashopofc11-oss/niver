import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Music2, Radio } from 'lucide-react';

interface AudioPlayerControllerProps {
  shouldPlay: boolean;
  sourceType: 'youtube' | 'custom_mp3';
  youtubeVideoId: string;
  customMp3Url?: string;
  onAudioStart?: () => void;
  onAudioError?: (err: string) => void;
  onPlaybackStateChange?: (isPlaying: boolean) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const AudioPlayerController: React.FC<AudioPlayerControllerProps> = ({
  shouldPlay,
  sourceType,
  youtubeVideoId,
  customMp3Url,
  onAudioStart,
  onPlaybackStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [ytReady, setYtReady] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const ytPlayerRef = useRef<any>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthAudioRef = useRef<{ ctx: AudioContext | null; interval: any }>({ ctx: null, interval: null });

  useEffect(() => {
    onPlaybackStateChange?.(isPlaying);
  }, [isPlaying, onPlaybackStateChange]);

  // 1. YouTube IFrame API Initialization
  useEffect(() => {
    if (sourceType !== 'youtube') return;

    const loadYtScript = () => {
      if (window.YT && window.YT.Player) {
        initYtPlayer();
        return;
      }

      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initYtPlayer();
      };
    };

    const initYtPlayer = () => {
      try {
        if (ytPlayerRef.current) return;

        ytPlayerRef.current = new window.YT.Player('youtube-hidden-player', {
          height: '10',
          width: '10',
          videoId: youtubeVideoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              setYtReady(true);
              event.target.setVolume(volume);
              if (shouldPlay) {
                event.target.playVideo();
                setIsPlaying(true);
                onAudioStart?.();
              }
            },
            onStateChange: (event: any) => {
              if (event.data === 1) {
                setIsPlaying(true);
                onAudioStart?.();
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.warn('YouTube Player initialization fallback:', err);
      }
    };

    loadYtScript();

    return () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {}
        ytPlayerRef.current = null;
      }
    };
  }, [sourceType, youtubeVideoId]);

  // Fallback Web Audio Ambient Synthesizer
  const playSynthesizedMelody = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      synthAudioRef.current.ctx = ctx;

      const frequencies = [
        [261.63, 329.63, 392.00], // C maj
        [293.66, 369.99, 440.00], // D / F# / A
        [220.00, 261.63, 329.63], // A min
        [174.61, 220.00, 261.63], // F maj
      ];

      let chordIndex = 0;
      const playChord = () => {
        if (!synthAudioRef.current.ctx || synthAudioRef.current.ctx.state === 'suspended') return;
        const chord = frequencies[chordIndex % frequencies.length];
        chordIndex++;

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 4.0);
        });
      };

      playChord();
      synthAudioRef.current.interval = setInterval(playChord, 3800);
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio synthesis not allowed yet:', e);
    }
  }, []);

  // 2. Play trigger effect when shouldPlay turns true
  useEffect(() => {
    if (!shouldPlay) return;

    if (sourceType === 'youtube' && ytPlayerRef.current && ytReady) {
      try {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
        onAudioStart?.();
      } catch (e) {
        console.warn('Could not auto-play YouTube:', e);
      }
    } else if (sourceType === 'custom_mp3' && customMp3Url) {
      if (!htmlAudioRef.current) {
        htmlAudioRef.current = new Audio(customMp3Url);
        htmlAudioRef.current.loop = true;
      }
      htmlAudioRef.current.volume = volume / 100;
      htmlAudioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          onAudioStart?.();
        })
        .catch(() => {
          playSynthesizedMelody();
        });
    }
  }, [shouldPlay, sourceType, ytReady, customMp3Url, volume, onAudioStart, playSynthesizedMelody]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (sourceType === 'youtube' && ytPlayerRef.current) {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    } else if (sourceType === 'custom_mp3' && htmlAudioRef.current) {
      if (isPlaying) {
        htmlAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        htmlAudioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (isPlaying) {
        if (synthAudioRef.current.ctx) {
          synthAudioRef.current.ctx.suspend();
        }
        setIsPlaying(false);
      } else {
        if (synthAudioRef.current.ctx) {
          synthAudioRef.current.ctx.resume();
        } else {
          playSynthesizedMelody();
        }
        setIsPlaying(true);
      }
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (sourceType === 'youtube' && ytPlayerRef.current) {
      if (isMuted) {
        ytPlayerRef.current.unMute();
        setIsMuted(false);
      } else {
        ytPlayerRef.current.mute();
        setIsMuted(true);
      }
    } else if (htmlAudioRef.current) {
      htmlAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    if (sourceType === 'youtube' && ytPlayerRef.current) {
      ytPlayerRef.current.setVolume(newVal);
    } else if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = newVal / 100;
    }
  };

  return (
    <>
      <div 
        id="youtube-hidden-player" 
        className="fixed -bottom-96 -right-96 opacity-0 pointer-events-none w-1 h-1 overflow-hidden" 
      />

      {shouldPlay && (
        <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
          {/* Audio Badge & Toggle */}
          <div className="glass-clean-pill rounded-full px-3 py-1.5 flex items-center gap-2.5 shadow-xl border border-[#F6A4C8]/25">
            {/* Animated equalizer bars */}
            <div className="flex items-center gap-0.5 h-3.5">
              <span className={`w-0.5 bg-[#F6A4C8] rounded-full transition-all ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#E1458E] rounded-full transition-all ${isPlaying ? 'h-2 animate-bounce' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#FFF7FB] rounded-full transition-all ${isPlaying ? 'h-4 animate-pulse' : 'h-1'}`} />
            </div>

            {/* Play/Pause */}
            <button
              onClick={handleTogglePlay}
              className="p-1 rounded-full text-[#F6A4C8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isPlaying ? 'Pausar áudio' : 'Reproduzir áudio'}
              aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Mute */}
            <button
              onClick={handleToggleMute}
              className="p-1 rounded-full text-[#F6A4C8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isMuted ? 'Ativar som' : 'Silenciar'}
              aria-label={isMuted ? 'Ativar som' : 'Silenciar áudio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Controls Drawer Toggle */}
            <button
              onClick={() => setShowControls(!showControls)}
              className="text-[11px] font-medium text-[#F6A4C8]/90 hover:text-white flex items-center gap-1 transition-colors pl-1 cursor-pointer"
            >
              <Music2 className="w-3 h-3 text-[#E1458E]" />
              <span className="hidden sm:inline">Telemensagem</span>
            </button>
          </div>

          {/* Volume Dropdown */}
          {showControls && (
            <div className="glass-clean-card rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2 min-w-[170px] animate-in fade-in zoom-in-95 duration-200 border border-[#F6A4C8]/30">
              <div className="flex items-center justify-between text-xs text-[#F6A4C8]">
                <span>Volume</span>
                <span>{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-full accent-[#E1458E] h-1.5 bg-[#0B0A0F] rounded-lg cursor-pointer"
              />
              <div className="flex items-center gap-1.5 text-[10px] text-[#F6A4C8]/70 mt-1">
                <Radio className="w-3 h-3 text-[#E1458E]" />
                <span>Trilha Principal Ativa</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
