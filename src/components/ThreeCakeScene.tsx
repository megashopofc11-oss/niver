import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, RotateCcw } from 'lucide-react';

export const ThreeCakeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const previousMousePos = useRef({ x: 0, y: 0 });
  const rotationTarget = useRef({ x: 0.15, y: 0 });

  const [isBlownOut, setIsBlownOut] = useState(false);
  const [wishGranted, setWishGranted] = useState(false);
  const blownOutRef = useRef(false);

  useEffect(() => {
    blownOutRef.current = isBlownOut;
  }, [isBlownOut]);

  const handleBlowCandles = () => {
    setIsBlownOut(true);
    setWishGranted(true);
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#FF1744', '#DC2626', '#F59E0B', '#FFFFFF'],
    });
  };

  const handleRelightCandles = () => {
    setIsBlownOut(false);
    setWishGranted(false);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.7, 5.4);
    camera.lookAt(0, 0.4, 0);

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

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x7f1d1d, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5f5, 3.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff1e46, 2.6);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Dynamic Candle Flame PointLights
    const flameLights: THREE.PointLight[] = [];
    const candlePositions = [-0.35, 0, 0.35];

    candlePositions.forEach((xPos) => {
      const pLight = new THREE.PointLight(0xff9922, 2.0, 4.5);
      pLight.position.set(xPos, 1.55, 0);
      scene.add(pLight);
      flameLights.push(pLight);
    });

    // 3. Materials
    // Brilliant Metallic Ruby Red
    const rubyMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.88,
      roughness: 0.18,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.28,
    });

    // Obsidian Dark Cake Tier
    const darkTierMat = new THREE.MeshStandardMaterial({
      color: 0x09060b,
      metalness: 0.65,
      roughness: 0.24,
      emissive: 0x1f0a0e,
      emissiveIntensity: 0.2,
    });

    // Ruby Pearl Beads
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x991b1b,
      emissiveIntensity: 0.3,
    });

    // Candles
    const candleMat = new THREE.MeshStandardMaterial({
      color: 0xfff5f5,
      roughness: 0.25,
    });

    // Flame
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffbb22,
    });

    // Balloons
    const balloonMatRuby = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.88,
      roughness: 0.16,
    });

    const balloonMatDark = new THREE.MeshStandardMaterial({
      color: 0x140d17,
      metalness: 0.75,
      roughness: 0.2,
    });

    // 4. Cake Construction
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // Cake Stand in Polished Ruby Red
    const standGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.12, 48);
    const standMesh = new THREE.Mesh(standGeo, rubyMat);
    standMesh.position.y = -0.3;
    cakeGroup.add(standMesh);

    // Lower Tier (Dark Obsidian with Ruby Pearls)
    const lowerTierGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.65, 48);
    const lowerTier = new THREE.Mesh(lowerTierGeo, darkTierMat);
    lowerTier.position.y = 0.1;
    cakeGroup.add(lowerTier);

    // Pearl beads around lower tier rim
    const beadCount = 28;
    const beadRadius = 1.32;
    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2;
      const beadGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const beadMesh = new THREE.Mesh(beadGeo, pearlMat);
      beadMesh.position.set(Math.cos(angle) * beadRadius, 0.42, Math.sin(angle) * beadRadius);
      cakeGroup.add(beadMesh);
    }

    // Upper Tier (Metallic Ruby Red)
    const upperTierGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.55, 48);
    const upperTier = new THREE.Mesh(upperTierGeo, rubyMat);
    upperTier.position.y = 0.65;
    cakeGroup.add(upperTier);

    // Candles and Flames
    const flames: THREE.Mesh[] = [];

    candlePositions.forEach((xPos) => {
      const candleGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.4, 16);
      const candle = new THREE.Mesh(candleGeo, candleMat);
      candle.position.set(xPos, 1.15, 0);
      cakeGroup.add(candle);

      const flameGeo = new THREE.ConeGeometry(0.045, 0.14, 12);
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.set(xPos, 1.42, 0);
      cakeGroup.add(flame);
      flames.push(flame);
    });

    // 5. 3D Floating Balloons
    const balloonGroup = new THREE.Group();
    scene.add(balloonGroup);

    // Left Balloon (Metallic Ruby)
    const b1Geo = new THREE.SphereGeometry(0.45, 32, 32);
    b1Geo.scale(1, 1.25, 1);
    const b1 = new THREE.Mesh(b1Geo, balloonMatRuby);
    b1.position.set(-1.8, 1.3, -0.4);
    balloonGroup.add(b1);

    // Right Balloon (Obsidian Pearl)
    const b2Geo = new THREE.SphereGeometry(0.48, 32, 32);
    b2Geo.scale(1, 1.25, 1);
    const b2 = new THREE.Mesh(b2Geo, balloonMatDark);
    b2.position.set(1.8, 1.5, -0.3);
    balloonGroup.add(b2);

    // 6. Interactive Drag & Touch Orbit
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePos.current.x;
      const deltaY = e.clientY - previousMousePos.current.y;
      rotationTarget.current.y += deltaX * 0.01;
      rotationTarget.current.x = Math.max(-0.2, Math.min(0.4, rotationTarget.current.x + deltaY * 0.005));
      previousMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePos.current.x;
      const deltaY = e.touches[0].clientY - previousMousePos.current.y;
      rotationTarget.current.y += deltaX * 0.01;
      rotationTarget.current.x = Math.max(-0.2, Math.min(0.4, rotationTarget.current.x + deltaY * 0.005));
      previousMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!isDraggingRef.current) {
        rotationTarget.current.y += 0.008;
      }

      cakeGroup.rotation.y += (rotationTarget.current.y - cakeGroup.rotation.y) * 0.08;
      cakeGroup.rotation.x += (rotationTarget.current.x - cakeGroup.rotation.x) * 0.08;

      const isOut = blownOutRef.current;

      flames.forEach((flame, idx) => {
        if (isOut) {
          flame.scale.set(0, 0, 0);
          flameLights[idx].intensity = 0;
        } else {
          const flicker = Math.sin(time * 12 + idx * 2.5) * 0.08;
          flame.scale.set(1 + flicker, 1 + flicker * 1.5, 1 + flicker);
          flameLights[idx].intensity = 1.8 + Math.sin(time * 15 + idx) * 0.4;
        }
      });

      b1.position.y = 1.3 + Math.sin(time * 1.8) * 0.08;
      b1.rotation.z = Math.sin(time * 1.4) * 0.06;

      b2.position.y = 1.5 + Math.cos(time * 1.6) * 0.08;
      b2.rotation.z = -Math.cos(time * 1.3) * 0.06;

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
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 3D WebGL Canvas */}
      <div className="relative w-full max-w-[380px] sm:max-w-[450px] h-[320px] sm:h-[370px] mx-auto cursor-grab active:cursor-grabbing flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full relative z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#ef4444]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Interactive Candle Blow Out Action */}
      <div className="mt-4 flex flex-col items-center gap-3">
        {!isBlownOut ? (
          <button
            onClick={handleBlowCandles}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#DC2626] via-[#FF1744] to-[#DC2626] text-white font-sans-clean font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(255,23,68,0.6)] hover:shadow-[0_0_45px_rgba(255,23,68,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#FEF08A]/50"
          >
            <Flame className="w-4 h-4 text-[#FEF08A] animate-bounce" />
            <span>Fazer um pedido e apagar as velas 🎂</span>
            <Sparkles className="w-4 h-4 text-[#FEF08A]" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2.5 animate-in fade-in zoom-in-95 duration-500">
            <div className="glass-obsidian-card px-6 py-3 rounded-2xl border border-[#F59E0B]/50 shadow-[0_0_30px_rgba(245,158,11,0.4)] text-center">
              <p className="font-royal font-bold text-base sm:text-lg text-shimmer-gold">
                ✨ Seu pedido foi lançado ao universo! ✨
              </p>
              <p className="text-xs sm:text-sm text-red-100 font-sans-clean font-medium pt-1">
                Que todos os seus sonhos se tornem uma linda realidade.
              </p>
            </div>
            <button
              onClick={handleRelightCandles}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-obsidian-pill text-xs text-red-200 hover:text-white transition-all cursor-pointer border border-red-500/40"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Reacender as velas</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
