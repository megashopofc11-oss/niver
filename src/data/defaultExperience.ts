export const MAIN_HONOREE_PHOTO = 'https://i.postimg.cc/rmFmWXq3/5F476A24-CBFC-4940-8BD0-05AB70A0E6D7.png';

export interface CarouselSlide {
  id: number;
  title: string;
  quote: string;
  photoUrl: string;
  styling: {
    zoomClass: string;
    objectPosition: string;
    filterClass: string;
  };
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    title: 'Sorriso & Luz',
    quote: 'Que nunca faltem motivos para sorrir.',
    photoUrl: MAIN_HONOREE_PHOTO,
    styling: {
      zoomClass: 'scale-100',
      objectPosition: 'center 20%',
      filterClass: 'brightness-100 contrast-102',
    },
  },
  {
    id: 2,
    title: 'Caminhos Lindos',
    quote: 'Que seus sonhos encontrem caminhos lindos.',
    photoUrl: MAIN_HONOREE_PHOTO,
    styling: {
      zoomClass: 'scale-110',
      objectPosition: 'center 25%',
      filterClass: 'brightness-105 contrast-105',
    },
  },
  {
    id: 3,
    title: 'Amor & Felicidade',
    quote: 'Que a vida te abrace com amor e felicidade.',
    photoUrl: MAIN_HONOREE_PHOTO,
    styling: {
      zoomClass: 'scale-105',
      objectPosition: 'center 18%',
      filterClass: 'brightness-102 contrast-102',
    },
  },
  {
    id: 4,
    title: 'Ciclo Iluminado',
    quote: 'Que este novo ciclo seja repleto de luz.',
    photoUrl: MAIN_HONOREE_PHOTO,
    styling: {
      zoomClass: 'scale-115',
      objectPosition: 'center 28%',
      filterClass: 'brightness-108 contrast-104',
    },
  },
  {
    id: 5,
    title: 'Mundo de Coisas Boas',
    quote: 'Você merece um mundo de coisas boas.',
    photoUrl: MAIN_HONOREE_PHOTO,
    styling: {
      zoomClass: 'scale-100',
      objectPosition: 'center 22%',
      filterClass: 'brightness-104 contrast-103',
    },
  },
];

export const DEFAULT_CONFIG = {
  honoreeName: 'Isabella',
  audioSourceType: 'youtube' as const,
  youtubeVideoId: 'ysoEwjtOAtw',
  customMp3Url: '',
  autoAdvanceSeconds: 5,
  finalTitle: 'HAPPY BIRTHDAY',
  finalMessage: 'Que a felicidade acompanhe cada passo do seu novo ciclo.',
  stories: [],
  wishes: [],
};
