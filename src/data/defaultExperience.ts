export const MAIN_HONOREE_PHOTO = 'https://i.postimg.cc/rmFmWXq3/5F476A24-CBFC-4940-8BD0-05AB70A0E6D7.png';

export interface TributeMoment {
  id: number;
  badge: string;
  title: string;
  quote: string;
  photoUrl: string;
  detail: string;
}

export const TRIBUTE_MOMENTS: TributeMoment[] = [
  {
    id: 1,
    badge: 'Luz & Sorriso',
    title: 'O Brilho do Seu Sorriso',
    quote: 'O seu sorriso tem a magia de iluminar os dias e transformar qualquer instante em celebração.',
    photoUrl: MAIN_HONOREE_PHOTO,
    detail: 'Que nunca lhe faltem motivos sinceros para sorrir e celebrar a vida.',
  },
  {
    id: 2,
    badge: 'Graça & Força',
    title: 'Elegância e Determinação',
    quote: 'Uma mulher admirável, doce em cada gesto e incrivelmente forte em tudo o que realiza.',
    photoUrl: MAIN_HONOREE_PHOTO,
    detail: 'Sua essência é única e inspira todos ao seu redor.',
  },
  {
    id: 3,
    badge: 'Novo Ciclo',
    title: 'Caminhos Iluminados',
    quote: 'Que as portas do sucesso, do amor e da paz se abram amplamente diante dos seus passos.',
    photoUrl: MAIN_HONOREE_PHOTO,
    detail: 'Este novo ano trará realizações maiores do que você pode imaginar.',
  },
  {
    id: 4,
    badge: 'Amor & Gratidão',
    title: 'A Dádiva de Ter Você',
    quote: 'Celebrar a sua existência é agradecer por tudo de bom e generoso que você espalha pelo mundo.',
    photoUrl: MAIN_HONOREE_PHOTO,
    detail: 'Você merece ser homenageada hoje e em todos os dias que virão.',
  },
];

export interface CarouselSlide {
  id: number;
  title: string;
  quote: string;
  photoUrl: string;
  styling?: {
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
  },
  {
    id: 2,
    title: 'Caminhos Lindos',
    quote: 'Que seus sonhos encontrem caminhos iluminados.',
    photoUrl: MAIN_HONOREE_PHOTO,
  },
  {
    id: 3,
    title: 'Amor & Felicidade',
    quote: 'Que a vida te abrace com amor verdadeiro.',
    photoUrl: MAIN_HONOREE_PHOTO,
  },
  {
    id: 4,
    title: 'Ciclo Iluminado',
    quote: 'Que este novo ciclo seja repleto de realizações.',
    photoUrl: MAIN_HONOREE_PHOTO,
  },
];

export const SPECIAL_WISHES = [
  {
    id: 'love',
    title: 'Amor Infinito',
    desc: 'Cercada de afeto genuíno e pessoas que reconhecem o seu valor inestimável.',
    iconName: 'heart',
  },
  {
    id: 'health',
    title: 'Saúde & Vitalidade',
    desc: 'Energia renovada para viver cada sonho com intensidade e disposição.',
    iconName: 'sparkle',
  },
  {
    id: 'joy',
    title: 'Alegria Constante',
    desc: 'Risadas leves, encontros inesquecíveis e momentos que aquecem o coração.',
    iconName: 'champagne',
  },
  {
    id: 'success',
    title: 'Grandes Conquistas',
    desc: 'Vitórias em cada projeto e a certeza de um futuro brilhante e próspero.',
    iconName: 'crown',
  },
];

export const DEFAULT_CONFIG = {
  honoreeName: 'Isabella',
  audioSourceType: 'youtube' as const,
  youtubeVideoId: 'ysoEwjtOAtw',
  customMp3Url: '',
  autoAdvanceSeconds: 5,
  finalTitle: 'FELIZ ANIVERSÁRIO',
  finalMessage: 'Que a felicidade acompanhe cada passo do seu novo ciclo e que todos os seus sonhos se tornem realidade.',
  stories: [],
  wishes: [],
};
