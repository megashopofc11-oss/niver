import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeGiftBoxProps {
  isOpening: boolean;
  onOpen: () => void;
}

export const ThreeGiftBox: React.FC<ThreeGiftBoxProps> = ({ isOpening, onOpen }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    isOpening,
    openProgress: 0,
    mousePos: { x: 0, y: 0 },
  });

  useEffect(() => {
    stateRef.current.isOpening = isOpening;
  }, [isOpening]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Safe distance and FOV to prevent any clipping on mobile
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Dramatic Black & Radiant Ruby Red)
    const ambientLight = new THREE.AmbientLight(0x450a0a, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff1f2, 3.2);
    keyLight.position.set(3.5, 5, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff1744, 2.8);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xdc2626, 2.5);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Deep Ruby Point Light inside (no white glare)
    const innerLight = new THREE.PointLight(0xff1744, 0, 8);
    innerLight.position.set(0, 0.2, 0);
    scene.add(innerLight);

    // 3. Materials
    // Metallic Ruby Red
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.86,
      roughness: 0.2,
      emissive: 0x5a0c14,
      emissiveIntensity: 0.32,
    });

    // Satin Obsidian Silk Ribbon
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x08060a,
      metalness: 0.45,
      roughness: 0.25,
      emissive: 0x140407,
      emissiveIntensity: 0.2,
    });

    // Gold Trim on Ribbon
    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.15,
      emissive: 0x78350f,
      emissiveIntensity: 0.25,
    });

    // 4. Gift Box Geometry
    const rootGiftGroup = new THREE.Group();
    rootGiftGroup.position.y = -0.35; // Positioned lower for generous headroom
    scene.add(rootGiftGroup);

    const boxSize = 1.75;
    const boxHeight = 1.5;

    // Base Box Body
    const baseGeo = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);
    const baseMesh = new THREE.Mesh(baseGeo, boxMaterial);
    baseMesh.position.y = -boxHeight / 2 + 0.35;
    rootGiftGroup.add(baseMesh);

    // Vertical Ribbons
    const ribbonWidth = 0.3;
    const ribbonThickness = 0.025;

    const vRibbon1Geo = new THREE.BoxGeometry(boxSize + ribbonThickness, boxHeight + ribbonThickness, ribbonWidth);
    const vRibbon1 = new THREE.Mesh(vRibbon1Geo, ribbonMaterial);
    vRibbon1.position.copy(baseMesh.position);
    rootGiftGroup.add(vRibbon1);

    const vRibbon2Geo = new THREE.BoxGeometry(ribbonWidth, boxHeight + ribbonThickness, boxSize + ribbonThickness);
    const vRibbon2 = new THREE.Mesh(vRibbon2Geo, ribbonMaterial);
    vRibbon2.position.copy(baseMesh.position);
    rootGiftGroup.add(vRibbon2);

    // Gold stitch line on vertical ribbons
    const goldStitch1 = new THREE.Mesh(
      new THREE.BoxGeometry(boxSize + ribbonThickness + 0.005, boxHeight + ribbonThickness, 0.04),
      goldTrimMaterial
    );
    goldStitch1.position.copy(baseMesh.position);
    rootGiftGroup.add(goldStitch1);

    const goldStitch2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, boxHeight + ribbonThickness, boxSize + ribbonThickness + 0.005),
      goldTrimMaterial
    );
    goldStitch2.position.copy(baseMesh.position);
    rootGiftGroup.add(goldStitch2);

    // Lid Group
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.35 + 0.04, 0);
    rootGiftGroup.add(lidGroup);

    const lidSize = boxSize + 0.08;
    const lidHeight = 0.3;
    const lidGeo = new THREE.BoxGeometry(lidSize, lidHeight, lidSize);
    const lidMesh = new THREE.Mesh(lidGeo, boxMaterial);
    lidMesh.position.y = lidHeight / 2;
    lidGroup.add(lidMesh);

    // Lid Ribbons
    const lidRibbon1 = new THREE.Mesh(
      new THREE.BoxGeometry(lidSize + 0.02, lidHeight + 0.02, ribbonWidth),
      ribbonMaterial
    );
    lidRibbon1.position.y = lidHeight / 2;
    lidGroup.add(lidRibbon1);

    const lidRibbon2 = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonWidth, lidHeight + 0.02, lidSize + 0.02),
      ribbonMaterial
    );
    lidRibbon2.position.y = lidHeight / 2;
    lidGroup.add(lidRibbon2);

    // Lid Gold Stitching
    const lidStitch1 = new THREE.Mesh(
      new THREE.BoxGeometry(lidSize + 0.025, lidHeight + 0.025, 0.04),
      goldTrimMaterial
    );
    lidStitch1.position.y = lidHeight / 2;
    lidGroup.add(lidStitch1);

    const lidStitch2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, lidHeight + 0.025, lidSize + 0.025),
      goldTrimMaterial
    );
    lidStitch2.position.y = lidHeight / 2;
    lidGroup.add(lidStitch2);

    // 3D Satin Bow
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lidHeight + 0.02, 0);
    lidGroup.add(bowGroup);

    const knotMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.19, 16, 16),
      goldTrimMaterial
    );
    bowGroup.add(knotMesh);

    const loopGeo = new THREE.TorusGeometry(0.32, 0.075, 16, 32);

    const loop1 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop1.rotation.set(Math.PI / 4, 0, Math.PI / 3);
    loop1.position.set(-0.24, 0.13, 0);
    bowGroup.add(loop1);

    const loop2 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop2.rotation.set(-Math.PI / 4, 0, -Math.PI / 3);
    loop2.position.set(0.24, 0.13, 0);
    bowGroup.add(loop2);

    const loop3 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop3.rotation.set(Math.PI / 3, Math.PI / 4, 0);
    loop3.position.set(0, 0.13, 0.24);
    bowGroup.add(loop3);

    const loop4 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop4.rotation.set(-Math.PI / 3, -Math.PI / 4, 0);
    loop4.position.set(0, 0.13, -0.24);
    bowGroup.add(loop4);

    // Subtle Ruby Sparks (NormalBlending to never produce a white blotch)
    const sparkleCount = 40;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleVelocities = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 0.9;
      sparklePositions[i * 3 + 1] = 0.3;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.9;

      sparkleVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      sparkleVelocities[i * 3 + 1] = 0.02 + Math.random() * 0.03;
      sparkleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xff1744, // pure ruby crimson
      size: 0.05,
      transparent: true,
      opacity: 0,
      blending: THREE.NormalBlending, // avoids washing out into white
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    rootGiftGroup.add(sparkles);

    // Pointer Move
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mousePos.x = normX;
      stateRef.current.mousePos.y = normY;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating (clamped so it stays safely within bounds)
      const floatY = -0.35 + Math.sin(elapsedTime * 1.5) * 0.05;
      rootGiftGroup.position.y = floatY;

      const targetRotY = stateRef.current.mousePos.x * 0.25 + elapsedTime * 0.08;
      const targetRotX = -stateRef.current.mousePos.y * 0.12 + 0.05;
      rootGiftGroup.rotation.y += (targetRotY - rootGiftGroup.rotation.y) * 0.04;
      rootGiftGroup.rotation.x += (targetRotX - rootGiftGroup.rotation.x) * 0.04;

      // Opening Animation
      if (stateRef.current.isOpening) {
        stateRef.current.openProgress = Math.min(1, stateRef.current.openProgress + 0.024);
        const p = stateRef.current.openProgress;
        const easeP = 1 - Math.pow(1 - p, 3);

        // Lid lifts gracefully with full headroom
        lidGroup.position.y = 0.38 + easeP * 1.4;
        lidGroup.position.z = -easeP * 0.6;
        lidGroup.rotation.x = -easeP * 0.9;
        lidGroup.rotation.z = easeP * 0.12;

        bowGroup.scale.set(
          Math.max(0.1, 1 - easeP * 0.65),
          Math.max(0.1, 1 - easeP * 0.65),
          Math.max(0.1, 1 - easeP * 0.65)
        );

        innerLight.intensity = easeP * 3.5;
        sparkleMat.opacity = Math.sin(easeP * Math.PI) * 0.85;

        const posArray = sparkleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < sparkleCount; i++) {
          posArray[i * 3] += sparkleVelocities[i * 3];
          posArray[i * 3 + 1] += sparkleVelocities[i * 3 + 1];
          posArray[i * 3 + 2] += sparkleVelocities[i * 3 + 2];
        }
        sparkleGeo.attributes.position.needsUpdate = true;
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] h-[290px] xs:h-[330px] sm:h-[380px] mx-auto cursor-pointer group select-none flex items-center justify-center overflow-visible"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label="Toque no presente para abrir"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onOpen();
        }
      }}
    >
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105 active:scale-95" 
      />

      {/* Ruby Ambient Aura (No white glare) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#dc2626]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 bg-[#ff1744]/15 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};
