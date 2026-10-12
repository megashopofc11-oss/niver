import React from 'react';

// 3D Metallic Ruby Heart with Deep Facets & Pulsing Radiance
export const Icon3DHeart: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(255,23,68,0.7)] animate-pulse-ruby"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main 3D Ruby Gradient */}
          <radialGradient id="rubyShine" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="20%" stopColor="#FF1744" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="85%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </radialGradient>
          {/* Bevel Highlight */}
          <linearGradient id="bevelLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#FF8596" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#DC2626" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#450A0A" stopOpacity="0.9" />
          </linearGradient>
          {/* Gold Rim Accent */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="rubyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Drop Shadow Base */}
        <path
          d="M50 86 C25 65 10 48 10 32 C10 18 20 10 34 10 C42 10 48 15 50 20 C52 15 58 10 66 10 C80 10 90 18 90 32 C90 48 75 65 50 86 Z"
          fill="#1C0407"
          transform="translate(0, 4)"
        />

        {/* Outer 3D Gold Accent Rim */}
        <path
          d="M50 86 C25 65 10 48 10 32 C10 18 20 10 34 10 C42 10 48 15 50 20 C52 15 58 10 66 10 C80 10 90 18 90 32 C90 48 75 65 50 86 Z"
          stroke="url(#goldRim)"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Main 3D Curvature Body */}
        <path
          d="M50 84 C26 64 12 47 12 32 C12 19 21 12 34 12 C41.5 12 47.5 16.5 50 22 C52.5 16.5 58.5 12 66 12 C79 12 88 19 88 32 C88 47 74 64 50 84 Z"
          fill="url(#rubyShine)"
          filter="url(#rubyGlow)"
        />

        {/* 3D Glass Specular Reflection on Upper Left Lobe */}
        <ellipse
          cx="32"
          cy="26"
          rx="12"
          ry="7"
          transform="rotate(-25 32 26)"
          fill="#FFFFFF"
          opacity="0.65"
        />
        <circle cx="28" cy="22" r="3" fill="#FFFFFF" opacity="0.9" />

        {/* Secondary Lower Facet Glint */}
        <path
          d="M49 76 C36 62 25 50 22 38 C28 42 40 48 49 60 Z"
          fill="#FFFFFF"
          opacity="0.2"
        />
      </svg>
    </div>
  );
};

// 3D Imperial Gold & Ruby Crown / Tiara
export const Icon3DCrown: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(245,158,11,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FFFBEB" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <radialGradient id="rubyGem" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FF1744" />
            <stop offset="80%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </radialGradient>
        </defs>

        {/* Crown Base Shadow */}
        <path
          d="M15 75 L20 40 L38 56 L50 24 L62 56 L80 40 L85 75 Z"
          fill="#1A0D00"
          transform="translate(0, 3)"
        />

        {/* Main 3D Crown Body */}
        <path
          d="M15 72 L20 38 L38 54 L50 22 L62 54 L80 38 L85 72 Z"
          fill="url(#crownGold)"
          stroke="#B45309"
          strokeWidth="1.5"
        />

        {/* Crown Circlet Band */}
        <path
          d="M13 72 Q50 80 87 72 L85 82 Q50 90 15 82 Z"
          fill="url(#crownGold)"
          stroke="#78350F"
          strokeWidth="1.5"
        />

        {/* Embedded Ruby Jewels */}
        <circle cx="50" cy="22" r="5" fill="url(#rubyGem)" stroke="#F59E0B" strokeWidth="1.2" />
        <circle cx="20" cy="38" r="4.2" fill="url(#rubyGem)" stroke="#F59E0B" strokeWidth="1.2" />
        <circle cx="80" cy="38" r="4.2" fill="url(#rubyGem)" stroke="#F59E0B" strokeWidth="1.2" />

        {/* Circlet Center Gems */}
        <circle cx="50" cy="79" r="4" fill="url(#rubyGem)" />
        <circle cx="32" cy="77" r="3" fill="url(#rubyGem)" />
        <circle cx="68" cy="77" r="3" fill="url(#rubyGem)" />

        {/* Top Glint */}
        <polygon points="50,14 52,19 57,20 53,24 54,29 50,26 46,29 47,24 43,20 48,19" fill="#FFFBEB" opacity="0.9" />
      </svg>
    </div>
  );
};

// 3D Sparkling Ruby Star / Flare
export const Icon3DStar: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,23,68,0.85)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="starShine" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FF1744" />
            <stop offset="70%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <polygon points="50,5 61,38 95,50 61,62 50,95 39,62 5,50 39,38" fill="url(#starShine)" />
        <circle cx="50" cy="50" r="10" fill="#FFFFFF" opacity="0.95" />
      </svg>
    </div>
  );
};

// 3D Champagne Toast Emblem
export const Icon3DChampagne: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(245,158,11,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="champagneGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="crystalGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FECACA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Left Flute */}
        <path
          d="M32 20 L44 26 L38 52 C36 58 30 60 26 58 L24 56 C20 54 22 46 24 40 Z"
          fill="url(#crystalGlass)"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <path
          d="M28 30 L40 34 L36 50 C34 54 30 55 28 54 Z"
          fill="url(#champagneGold)"
          opacity="0.85"
        />
        <line x1="31" y1="58" x2="22" y2="82" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="20" cy="83" rx="10" ry="3" fill="url(#champagneGold)" />

        {/* Right Flute */}
        <path
          d="M68 20 L56 26 L62 52 C64 58 70 60 74 58 L76 56 C80 54 78 46 76 40 Z"
          fill="url(#crystalGlass)"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <path
          d="M72 30 L60 34 L64 50 C66 54 70 55 72 54 Z"
          fill="url(#champagneGold)"
          opacity="0.85"
        />
        <line x1="69" y1="58" x2="78" y2="82" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="80" cy="83" rx="10" ry="3" fill="url(#champagneGold)" />

        {/* Clinking Spark */}
        <polygon points="50,22 53,28 59,30 54,34 55,40 50,37 45,40 46,34 41,30 47,28" fill="#FFFBEB" />
        <circle cx="50" cy="30" r="12" fill="#FF1744" opacity="0.3" />
      </svg>
    </div>
  );
};
