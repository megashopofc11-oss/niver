import React, { useState, useEffect } from 'react';
import { STATIC_PHOTOS, getResolvedPhotoUrl, saveCustomPhoto } from '../utils/photoStorage';
import { Camera, Sparkles } from 'lucide-react';

interface PhotoFrameProps {
  photoId: number;
  className?: string;
  enableZoom?: boolean;
  onPhotoChanged?: (photoId: number, dataUrl: string) => void;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  photoId,
  className = '',
  enableZoom = true,
  onPhotoChanged,
}) => {
  const photoMeta = STATIC_PHOTOS.find((p) => p.id === photoId) || STATIC_PHOTOS[0];
  const [src, setSrc] = useState<string>(() => getResolvedPhotoUrl(photoId));
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setSrc(getResolvedPhotoUrl(photoId));
    setHasError(false);
  }, [photoId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      saveCustomPhoto(photoId, dataUrl);
      setSrc(dataUrl);
      setHasError(false);
      onPhotoChanged?.(photoId, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const finalSrc = hasError ? photoMeta.fallbackSvg : src;

  return (
    <div
      className={`relative aspect-square w-full rounded-3xl overflow-hidden glass-card-luxury border border-[#F5A1C4]/25 shadow-2xl select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1080x1080 Proportional Photo Rendering */}
      <img
        src={finalSrc}
        alt={photoMeta.title}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
          enableZoom ? 'group-hover:scale-105' : ''
        }`}
        style={{ objectPosition: 'center 20%' }}
      />

      {/* Luminous metallic rose border glow */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-[#F5A1C4]/60 pointer-events-none shadow-[inset_0_0_30px_rgba(245,161,196,0.2)]" />

      {/* Bottom vignette for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09070B]/85 via-[#09070B]/30 to-transparent pointer-events-none" />

      {/* Subtle indicator tag */}
      <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
        <span className="glass-rose-subtle text-[11px] font-luxury text-[#F5A1C4] uppercase px-3 py-1 rounded-full border border-[#F5A1C4]/20 tracking-wider">
          {photoMeta.subtitle}
        </span>
      </div>

      {/* Discreet photo replacement button on hover/tap */}
      <label className="absolute top-3.5 right-3.5 z-20 glass-rose-subtle p-2 rounded-full text-[#F5A1C4] hover:text-white hover:bg-[#9D174D]/50 border border-[#F5A1C4]/30 cursor-pointer transition-all opacity-80 group-hover:opacity-100 active:scale-95">
        <Camera className="w-3.5 h-3.5" />
        <span className="sr-only">Carregar foto {photoId}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>

      {/* Subtle corner sparkle */}
      <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none">
        <Sparkles className="w-4 h-4 text-[#F5A1C4]/70 animate-pulse" />
      </div>
    </div>
  );
};
