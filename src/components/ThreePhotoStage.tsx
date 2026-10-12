import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CAROUSEL_SLIDES, CarouselSlide } from '../data/defaultExperience';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ThreePhotoStageProps {
  photoUrl: string;
}

export const ThreePhotoStage: React.FC<ThreePhotoStageProps> = ({ photoUrl }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const textureCache = useRef<Record<string, THREE.Texture>>({});
  const frameGroupRef = useRef<THREE.Group | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [slideIdx, isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x7f1d1d, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5f5, 3.0);
    keyLight.position.set(3.5, 4.5, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff1e46, 2.5);
    rimLight.position.set(-3, -2, 2.5);
    scene.add(rimLight);

    // Frame Group
    const frameGroup = new THREE.Group();
    scene.add(frameGroup);
    frameGroupRef.current = frameGroup;

    // Outer Luxury 3D Beveled Ruby-Red & Gold Frame
    const frameGeo = new THREE.BoxGeometry(2.35, 2.35, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.88,
      roughness: 0.18,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.28,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.04;
    frameGroup.add(frameMesh);

    // Inner Obsidian Black Matting
    const mattingGeo = new THREE.PlaneGeometry(2.25, 2.25);
    const mattingMat = new THREE.MeshStandardMaterial({
      color: 0x08060a,
      roughness: 0.25,
    });
    const mattingMesh = new THREE.Mesh(mattingGeo, mattingMat);
    mattingMesh.position.z = 0.005;
    frameGroup.add(mattingMesh);

    // Photo Plane
    const photoGeo = new THREE.PlaneGeometry(2.15, 2.15);
    const loader = new THREE.TextureLoader();

    const loadTexture = (url: string, cb: (tex: THREE.Texture) => void) => {
      if (textureCache.current[url]) {
        cb(textureCache.current[url]);
        return;
      }
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          textureCache.current[url] = tex;
          cb(tex);
        },
        undefined,
        () => console.warn('Texture load fallback')
      );
    };

    const photoMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
    });

    const photoMesh = new THREE.Mesh(photoGeo, photoMat);
    photoMesh.position.z = 0.01;
    frameGroup.add(photoMesh);

    loadTexture(photoUrl, (tex) => {
      photoMat.map = tex;
      photoMat.needsUpdate = true;
    });

    // Glass Specular Coat Plane (Realistic 3D gloss)
    const glassGeo = new THREE.PlaneGeometry(2.2, 2.2);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.16,
      roughness: 0.04,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.z = 0.03;
    frameGroup.add(glassMesh);

    // Pointer Move Handler
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.x = normX;
      mousePos.current.y = normY;
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      const targetRotY = mousePos.current.x * 0.24;
      const targetRotX = -mousePos.current.y * 0.18;

      if (!isTransitioning.current) {
        frameGroup.rotation.y += (targetRotY - frameGroup.rotation.y) * 0.06;
        frameGroup.rotation.x += (targetRotX - frameGroup.rotation.x) * 0.06;
        frameGroup.position.y = Math.sin(time * 1.5) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [photoUrl]);

  const trigger3DTransition = (newIdx: number) => {
    if (isTransitioning.current || !frameGroupRef.current) return;
    isTransitioning.current = true;
    setSlideIdx(newIdx);

    const group = frameGroupRef.current;
    let progress = 0;

    const flipAnim = () => {
      progress += 0.06;
      if (progress < 0.5) {
        group.rotation.y = (progress * 2) * (Math.PI / 2);
        group.scale.set(1 - progress * 0.4, 1 - progress * 0.4, 1 - progress * 0.4);
        requestAnimationFrame(flipAnim);
      } else if (progress < 1) {
        group.rotation.y = -(1 - (progress - 0.5) * 2) * (Math.PI / 2);
        group.scale.set(0.8 + (progress - 0.5) * 0.4, 0.8 + (progress - 0.5) * 0.4, 0.8 + (progress - 0.5) * 0.4);
        requestAnimationFrame(flipAnim);
      } else {
        group.rotation.y = 0;
        group.scale.set(1, 1, 1);
        isTransitioning.current = false;
      }
    };

    requestAnimationFrame(flipAnim);
  };

  const handleNext = () => {
    trigger3DTransition((slideIdx + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    trigger3DTransition((slideIdx - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const currentSlide = CAROUSEL_SLIDES[slideIdx];

  return (
    <div
      className="relative w-full max-w-md mx-auto flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D WebGL Canvas Stage */}
      <div className="relative w-full aspect-square max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-[0_25px_60px_rgba(220,38,38,0.35)] flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full relative z-10" />

        {/* Ambient Ruby Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#ef4444]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-obsidian-pill text-[#ef4444] hover:text-white hover:bg-[#dc2626]/60 transition-all border border-[#ef4444]/40 active:scale-90 cursor-pointer shadow-2xl"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-obsidian-pill text-[#ef4444] hover:text-white hover:bg-[#dc2626]/60 transition-all border border-[#ef4444]/40 active:scale-90 cursor-pointer shadow-2xl"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* 3D Stage Indicator */}
        <div className="absolute top-3.5 right-3.5 z-20 glass-obsidian-pill px-3 py-0.5 rounded-full text-[10px] font-mono tracking-widest text-[#ef4444] border border-[#ef4444]/30 flex items-center gap-1 shadow-lg">
          <Sparkles className="w-2.5 h-2.5 text-[#ef4444]" />
          <span>GALERIA 3D · 0{slideIdx + 1} / 0{CAROUSEL_SLIDES.length}</span>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="mt-4 flex items-center gap-2 py-1">
        {CAROUSEL_SLIDES.map((slide: CarouselSlide, idx: number) => (
          <button
            key={slide.id}
            onClick={() => trigger3DTransition(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === slideIdx
                ? 'w-7 bg-gradient-to-r from-[#ef4444] to-[#ffffff] shadow-[0_0_12px_rgba(239,68,68,0.9)]'
                : 'w-2 bg-[#7f1d1d]/60 hover:bg-[#ef4444]/70'
            }`}
            title={`Slide ${idx + 1}`}
            aria-label={`Ver slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Emotional Quote for this slide */}
      <div className="mt-4 text-center max-w-sm px-4 animate-in fade-in duration-500">
        <p className="font-poetic italic text-xl sm:text-2xl text-[#FFF5F5] leading-relaxed tracking-wide drop-shadow">
          “{currentSlide.quote}”
        </p>
        <div className="mt-2.5 flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#ef4444]/60" />
          <span className="text-[11px] text-[#ef4444] font-luxury tracking-widest uppercase">
            {currentSlide.title}
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#ef4444]/60" />
        </div>
      </div>
    </div>
  );
};
