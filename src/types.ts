export interface PhotoStory {
  id: number;
  title: string;
  subtitle: string;
  quote: string;
  imageUrl: string;
  patternType: 'vortex' | 'diagonal' | 'radial' | 'crystal' | 'honeycomb' | 'spiral' | 'cascade' | 'shatter' | 'prism' | 'mosaic';
  fallbackTheme: {
    bgGradient: string;
    accentColor: string;
    icon: string;
  };
}

export interface WishItem {
  id: string;
  word: string;
  message: string;
  icon: string;
}

export interface ExperienceConfig {
  honoreeName: string;
  audioSourceType: 'youtube' | 'custom_mp3';
  youtubeVideoId: string;
  customMp3Url: string;
  autoAdvanceSeconds: number;
  stories: PhotoStory[];
  wishes: WishItem[];
  finalTitle: string;
  finalMessage: string;
}

export type ExperienceStage = 
  | 'gift_closed'     // Stage 1: 3D metallic rose gift box with satin black ribbon
  | 'gift_opening'    // Stage 2: 3D box opens, confetti bursts, audio starts immediately
  | 'intro_reveal'    // Stage 3: "Happy Birthday" cinematic intro title & quote
  | 'gallery'         // Stage 4: 10 photo fragments carousel
  | 'grand_finale';   // Stage 5: Full celebration view & 3D cake

