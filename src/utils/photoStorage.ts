/**
 * Static photo registry for the 10 consistent photos of the honoree
 * Ensures:
 * 1. Static local paths (/photos/foto_01.jpg .. foto_10.jpg)
 * 2. Elegant SVG graphic fallbacks so there are never broken images or unverified third-party hosts
 * 3. Instant local file replacement/upload support stored in localStorage
 */

export interface StaticPhoto {
  id: number;
  filename: string;
  localPath: string;
  title: string;
  subtitle: string;
  quote: string;
  fallbackSvg: string;
}

// Generate luxury stylized geometric portrait SVGs for each of the 10 scenes
function createLuxurySvgFallback(id: number, title: string, quote: string): string {
  const gradients = [
    { start: '#9D174D', mid: '#E83E86', end: '#09070B', icon: '✦' },
    { start: '#831843', mid: '#F5A1C4', end: '#09070B', icon: '🌸' },
    { start: '#9D174D', mid: '#DB2777', end: '#09070B', icon: '✨' },
    { start: '#701A75', mid: '#F5A1C4', end: '#09070B', icon: '💐' },
    { start: '#9D174D', mid: '#BE185D', end: '#09070B', icon: '🌹' },
    { start: '#831843', mid: '#E83E86', end: '#09070B', icon: '🕊️' },
    { start: '#9D174D', mid: '#F5A1C4', end: '#09070B', icon: '🌙' },
    { start: '#701A75', mid: '#E83E86', end: '#09070B', icon: '👑' },
    { start: '#9D174D', mid: '#BE185D', end: '#09070B', icon: '🎂' },
    { start: '#831843', mid: '#F5A1C4', end: '#09070B', icon: '💎' },
  ];
  const g = gradients[(id - 1) % gradients.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="${g.mid}" stop-opacity="0.35"/>
        <stop offset="50%" stop-color="${g.start}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${g.end}" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF5FA" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#F5A1C4" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#E83E86" stop-opacity="0.4"/>
      </linearGradient>
    </defs>
    <rect width="1080" height="1080" fill="#09070B"/>
    <rect width="1080" height="1080" fill="url(#bgGrad)"/>
    
    <!-- Outer delicate frame -->
    <rect x="60" y="60" width="960" height="960" rx="36" fill="none" stroke="url(#borderGrad)" stroke-width="2" stroke-opacity="0.5"/>
    <rect x="80" y="80" width="920" height="920" rx="28" fill="none" stroke="#F5A1C4" stroke-width="1" stroke-opacity="0.25"/>

    <!-- Elegant Silhouette Motif -->
    <circle cx="540" cy="420" r="160" fill="${g.start}" fill-opacity="0.3"/>
    <path d="M540 280 C500 280 440 330 440 430 C440 520 480 570 540 570 C600 570 640 520 640 430 C640 330 580 280 540 280 Z" fill="#F5A1C4" fill-opacity="0.2"/>
    <circle cx="540" cy="410" r="100" fill="#FFF5FA" fill-opacity="0.85"/>
    
    <!-- Hair and Face Silhouette curves -->
    <path d="M450 370 C440 300 490 270 540 270 C590 270 640 300 630 370 C620 330 590 310 540 310 C490 310 460 330 450 370 Z" fill="#2A1520"/>
    <path d="M450 370 C440 430 440 490 470 530 C460 490 465 420 475 390 Z" fill="#2A1520"/>
    <path d="M630 370 C640 430 640 490 610 530 C620 490 615 420 605 390 Z" fill="#2A1520"/>
    
    <!-- Delicate star accent -->
    <text x="540" y="630" font-family="Georgia, serif" font-size="36" fill="#F5A1C4" text-anchor="middle" letter-spacing="4">${g.icon}</text>
    
    <!-- Portrait metadata -->
    <text x="540" y="700" font-family="Georgia, serif" font-size="44" font-weight="600" fill="#FFF5FA" text-anchor="middle" letter-spacing="3">${title.toUpperCase()}</text>
    <text x="540" y="760" font-family="sans-serif" font-size="24" fill="#F5A1C4" text-anchor="middle" letter-spacing="6">FOTOGRAFIA 0${id} · 1080 × 1080</text>
    
    <!-- Quote snippet -->
    <text x="540" y="840" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#FFF5FA" fill-opacity="0.85" text-anchor="middle">"${quote.length > 50 ? quote.slice(0, 50) + '...' : quote}"</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const STATIC_PHOTOS: StaticPhoto[] = [
  {
    id: 1,
    filename: 'foto_01.jpg',
    localPath: '/photos/foto_01.jpg',
    title: 'Sorriso Iluminado',
    subtitle: 'Memória I · Presença & Luz',
    quote: 'Hoje o mundo celebra o privilégio de ter você nele.',
    fallbackSvg: createLuxurySvgFallback(1, 'Sorriso Iluminado', 'Hoje o mundo celebra o privilégio de ter você nele.'),
  },
  {
    id: 2,
    filename: 'foto_02.jpg',
    localPath: '/photos/foto_02.jpg',
    title: 'Serenidade & Graça',
    subtitle: 'Memória II · Pureza & Elegância',
    quote: 'Que a vida te abrace com amor, luz e infinitas bênçãos.',
    fallbackSvg: createLuxurySvgFallback(2, 'Serenidade & Graça', 'Que a vida te abrace com amor, luz e infinitas bênçãos.'),
  },
  {
    id: 3,
    filename: 'foto_03.jpg',
    localPath: '/photos/foto_03.jpg',
    title: 'Brilho Único',
    subtitle: 'Memória III · Encanto & Harmonia',
    quote: 'Seu sorriso transforma momentos simples em lembranças inesquecíveis.',
    fallbackSvg: createLuxurySvgFallback(3, 'Brilho Único', 'Seu sorriso transforma momentos simples em lembranças inesquecíveis.'),
  },
  {
    id: 4,
    filename: 'foto_04.jpg',
    localPath: '/photos/foto_04.jpg',
    title: 'Luz Natural',
    subtitle: 'Memória IV · Ternura de Alma',
    quote: 'Que nunca faltem motivos para sorrir e sonhos para realizar.',
    fallbackSvg: createLuxurySvgFallback(4, 'Luz Natural', 'Que nunca faltem motivos para sorrir e sonhos para realizar.'),
  },
  {
    id: 5,
    filename: 'foto_05.jpg',
    localPath: '/photos/foto_05.jpg',
    title: 'Olhar Marcante',
    subtitle: 'Memória V · Essência Rara',
    quote: 'Algumas pessoas tornam o mundo mais bonito simplesmente por existirem.',
    fallbackSvg: createLuxurySvgFallback(5, 'Olhar Marcante', 'Algumas pessoas tornam o mundo mais bonito simplesmente por existirem.'),
  },
  {
    id: 6,
    filename: 'foto_06.jpg',
    localPath: '/photos/foto_06.jpg',
    title: 'Alegria Radiante',
    subtitle: 'Memória VI · Espontaneidade',
    quote: 'A sua essência é rara, delicada e cheia de encanto e luz.',
    fallbackSvg: createLuxurySvgFallback(6, 'Alegria Radiante', 'A sua essência é rara, delicada e cheia de encanto e luz.'),
  },
  {
    id: 7,
    filename: 'foto_07.jpg',
    localPath: '/photos/foto_07.jpg',
    title: 'Ternura de Alma',
    subtitle: 'Memória VII · Calma & Calor',
    quote: 'Que a sua luz continue iluminando cada coração ao seu redor.',
    fallbackSvg: createLuxurySvgFallback(7, 'Ternura de Alma', 'Que a sua luz continue iluminando cada coração ao seu redor.'),
  },
  {
    id: 8,
    filename: 'foto_08.jpg',
    localPath: '/photos/foto_08.jpg',
    title: 'Elegância Gentil',
    subtitle: 'Memória VIII · Força Suave',
    quote: 'Cada passo da sua história é motivo de orgulho e admiração.',
    fallbackSvg: createLuxurySvgFallback(8, 'Elegância Gentil', 'Cada passo da sua história é motivo de orgulho e admiração.'),
  },
  {
    id: 9,
    filename: 'foto_09.jpg',
    localPath: '/photos/foto_09.jpg',
    title: 'Doçura do Momento',
    subtitle: 'Memória IX · Beleza de Viver',
    quote: 'Que este novo ano seja repleto de realizações extraordinárias.',
    fallbackSvg: createLuxurySvgFallback(9, 'Doçura do Momento', 'Que este novo ano seja repleto de realizações extraordinárias.'),
  },
  {
    id: 10,
    filename: 'foto_10.jpg',
    localPath: '/photos/foto_10.jpg',
    title: 'Celebração da Vida',
    subtitle: 'Memória X · Homenagem Especial',
    quote: 'Que este novo ciclo seja tão especial quanto você. Parabéns pelo seu dia!',
    fallbackSvg: createLuxurySvgFallback(10, 'Celebração da Vida', 'Que este novo ciclo seja tão especial quanto você.'),
  },
];

/**
 * Returns the resolved photo URL for a photo index (1-10)
 * Checks localStorage first, then static local path, with SVG fallback.
 */
export function getResolvedPhotoUrl(photoId: number): string {
  try {
    const custom = localStorage.getItem(`custom_photo_${photoId}`);
    if (custom) return custom;
  } catch (e) {}

  const photo = STATIC_PHOTOS.find((p) => p.id === photoId);
  return photo ? photo.localPath : '';
}

/**
 * Saves a user-uploaded photo for a given index
 */
export function saveCustomPhoto(photoId: number, dataUrl: string): void {
  try {
    localStorage.setItem(`custom_photo_${photoId}`, dataUrl);
  } catch (e) {
    console.warn('Could not save photo to localStorage', e);
  }
}
