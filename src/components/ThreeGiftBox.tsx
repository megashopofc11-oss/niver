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

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 5.2);

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

    // 2. Studio Lighting (Rich, Deep Rose & Crisp Metallic Specular)
    const ambientLight = new THREE.AmbientLight(0x8e1b52, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7fb, 2.8);
    keyLight.position.set(3.5, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe1458e, 2.2);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf6a4c8, 2.6);
    rimLight.position.set(0, 4.5, -4);
    scene.add(rimLight);

    // Warm, delicate rose interior light (NO harsh white blob)
    const innerLight = new THREE.PointLight(0xe1458e, 0, 8);
    innerLight.position.set(0, 0.3, 0);
    scene.add(innerLight);

    // 3. Materials
    // Metallic Rose Gold Body
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4387d,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x6b103c,
      emissiveIntensity: 0.25,
    });

    // Satin Black Silk Ribbon
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e0b12,
      metalness: 0.5,
      roughness: 0.22,
      emissive: 0x1d1424,
      emissiveIntensity: 0.2,
    });

    // 4. Gift Box Geometry
    const rootGiftGroup = new THREE.Group();
    scene.add(rootGiftGroup);

    const boxSize = 1.95;
    const boxHeight = 1.7;

    // Base Box Body
    const baseGeo = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);
    const baseMesh = new THREE.Mesh(baseGeo, boxMaterial);
    baseMesh.position.y = -boxHeight / 2 + 0.35;
    rootGiftGroup.add(baseMesh);

    // Vertical Ribbons
    const ribbonWidth = 0.32;
    const ribbonThickness = 0.025;

    const vRibbon1Geo = new THREE.BoxGeometry(boxSize + ribbonThickness, boxHeight + ribbonThickness, ribbonWidth);
    const vRibbon1 = new THREE.Mesh(vRibbon1Geo, ribbonMaterial);
    vRibbon1.position.copy(baseMesh.position);
    rootGiftGroup.add(vRibbon1);

    const vRibbon2Geo = new THREE.BoxGeometry(ribbonWidth, boxHeight + ribbonThickness, boxSize + ribbonThickness);
    const vRibbon2 = new THREE.Mesh(vRibbon2Geo, ribbonMaterial);
    vRibbon2.position.copy(baseMesh.position);
    rootGiftGroup.add(vRibbon2);

    // Lid Group (Animates realistically on open)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.35 + 0.05, 0);
    rootGiftGroup.add(lidGroup);

    const lidSize = boxSize + 0.08;
    const lidHeight = 0.34;
    const lidGeo = new THREE.BoxGeometry(lidSize, lidHeight, lidSize);
    const lidMesh = new THREE.Mesh(lidGeo, boxMaterial);
    lidMesh.position.y = lidHeight / 2;
    lidGroup.add(lidMesh);

    // Lid Ribbons
    const lidRibbon1Geo = new THREE.BoxGeometry(lidSize + 0.02, lidHeight + 0.02, ribbonWidth);
    const lidRibbon1 = new THREE.Mesh(lidRibbon1Geo, ribbonMaterial);
    lidRibbon1.position.y = lidHeight / 2;
    lidGroup.add(lidRibbon1);

    const lidRibbon2Geo = new THREE.BoxGeometry(ribbonWidth, lidHeight + 0.02, lidSize + 0.02);
    const lidRibbon2 = new THREE.Mesh(lidRibbon2Geo, ribbonMaterial);
    lidRibbon2.position.y = lidHeight / 2;
    lidGroup.add(lidRibbon2);

    // 3D Satin Bow
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lidHeight + 0.02, 0);
    lidGroup.add(bowGroup);

    const knotGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const knotMesh = new THREE.Mesh(knotGeo, ribbonMaterial);
    bowGroup.add(knotMesh);

    const loopGeo = new THREE.TorusGeometry(0.35, 0.085, 16, 32);

    const loop1 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop1.rotation.set(Math.PI / 4, 0, Math.PI / 3);
    loop1.position.set(-0.28, 0.14, 0);
    bowGroup.add(loop1);

    const loop2 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop2.rotation.set(-Math.PI / 4, 0, -Math.PI / 3);
    loop2.position.set(0.28, 0.14, 0);
    bowGroup.add(loop2);

    const loop3 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop3.rotation.set(Math.PI / 3, Math.PI / 4, 0);
    loop3.position.set(0, 0.14, 0.28);
    bowGroup.add(loop3);

    const loop4 = new THREE.Mesh(loopGeo, ribbonMaterial);
    loop4.rotation.set(-Math.PI / 3, -Math.PI / 4, 0);
    loop4.position.set(0, 0.14, -0.28);
    bowGroup.add(loop4);

    // Floating Sparkles Emitter inside the box (Emits gracefully when open)
    const sparkleCount = 60;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleVelocities = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 1.2;
      sparklePositions[i * 3 + 1] = 0.35;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;

      sparkleVelocities[i * 3] = (Math.random() - 0.5) * 0.03;
      sparkleVelocities[i * 3 + 1] = 0.02 + Math.random() * 0.04;
      sparkleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
    }

    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xf6a4c8,
      size: 0.06,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    rootGiftGroup.add(sparkles);

    // Subtle orbiting ambient dust
    const dustCount = 30;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.4;
      dustPositions[i * 3] = Math.cos(theta) * radius;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      dustPositions[i * 3 + 2] = Math.sin(theta) * radius;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xf6a4c8,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Pointer Interaction
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

      // Delicate floating bobbing
      const floatY = Math.sin(elapsedTime * 1.6) * 0.08;
      rootGiftGroup.position.y = floatY;

      // Realistic responsive rotation toward cursor
      const targetRotY = stateRef.current.mousePos.x * 0.28 + elapsedTime * 0.08;
      const targetRotX = -stateRef.current.mousePos.y * 0.16 + 0.08;
      rootGiftGroup.rotation.y += (targetRotY - rootGiftGroup.rotation.y) * 0.04;
      rootGiftGroup.rotation.x += (targetRotX - rootGiftGroup.rotation.x) * 0.04;

      // Opening Animation: Clean physics arc (NO white blob)
      if (stateRef.current.isOpening) {
        stateRef.current.openProgress = Math.min(1, stateRef.current.openProgress + 0.02);
        const p = stateRef.current.openProgress;
        const easeP = 1 - Math.pow(1 - p, 3); // Smooth ease out cubic

        // Lid lifts and rotates back gracefully
        lidGroup.position.y = 0.4 + easeP * 2.1;
        lidGroup.position.z = -easeP * 0.85;
        lidGroup.rotation.x = -easeP * 1.15;
        lidGroup.rotation.z = easeP * 0.18;

        // Bow uncurls gently
        bowGroup.scale.set(
          Math.max(0.1, 1 - easeP * 0.7),
          Math.max(0.1, 1 - easeP * 0.7),
          Math.max(0.1, 1 - easeP * 0.7)
        );

        // Soft rosy interior light (capped intensity, completely eliminating the white blob)
        innerLight.intensity = easeP * 4.5;

        // Sparkle release
        sparkleMat.opacity = Math.sin(easeP * Math.PI) * 0.9;
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
      className="relative w-full max-w-[340px] h-[340px] xs:max-w-[380px] xs:h-[380px] sm:max-w-[420px] sm:h-[420px] mx-auto cursor-pointer group select-none flex items-center justify-center"
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

      {/* Clean, high-definition soft rose glow (NO washed out white blob) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#8E1B52]/25 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
