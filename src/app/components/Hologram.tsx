"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hologram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 12 : 35;

    const mouse = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();
    const orbitingNodes: {
      radius: number;
      angle: number;
      speed: number;
      yOffset: number;
    }[] = [];

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Central node — Cian Digital #01FDFE
    const centralGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const centralMaterial = new THREE.MeshBasicMaterial({
      color: 0x01fdfe,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const centralNode = new THREE.Mesh(centralGeometry, centralMaterial);
    const pointLight = new THREE.PointLight(0x01fdfe, 2, 20);
    centralNode.add(pointLight);
    scene.add(centralNode);

    // Instanced orbiting nodes — Purpura Intenso #5B2FB8
    const nodeGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x5b2fb8,
      transparent: true,
      opacity: 0.8,
    });
    const nodesInstanced = new THREE.InstancedMesh(
      nodeGeometry,
      nodeMaterial,
      nodeCount
    );
    scene.add(nodesInstanced);

    for (let i = 0; i < nodeCount; i++) {
      orbitingNodes.push({
        radius: 3.5 + Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.4,
        yOffset: (Math.random() - 0.5) * 5,
      });
    }

    // Lines
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodeCount * 2 * 3);
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x01fdfe,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Animation loop — solo corre mientras el hero está en pantalla
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animationId = requestAnimationFrame(animate);

      let delta = clock.getDelta();
      if (delta > 0.1) delta = 0.01;
      const elapsedTime = clock.getElapsedTime();

      const targetRotX = mouse.y * 0.5;
      const targetRotY = mouse.x * 0.5;

      centralNode.rotation.x +=
        (targetRotX - centralNode.rotation.x) * 2 * delta;
      centralNode.rotation.y +=
        (targetRotY - centralNode.rotation.y) * 2 * delta;
      centralNode.rotation.y += delta * 0.15;
      centralNode.updateMatrixWorld();

      nodesInstanced.rotation.x +=
        (targetRotX * 0.2 - nodesInstanced.rotation.x) * delta;
      nodesInstanced.rotation.y +=
        (targetRotY * 0.2 - nodesInstanced.rotation.y) * delta;

      const positions = linesMesh.geometry.attributes.position
        .array as Float32Array;

      orbitingNodes.forEach((nodeData, i) => {
        nodeData.angle += nodeData.speed * delta;
        const x = Math.cos(nodeData.angle) * nodeData.radius;
        const z = Math.sin(nodeData.angle) * nodeData.radius;
        const y =
          nodeData.yOffset +
          Math.sin(elapsedTime * 0.5 + nodeData.angle) * 0.5;

        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        nodesInstanced.setMatrixAt(i, dummy.matrix);

        const index = i * 6;
        positions[index] = 0;
        positions[index + 1] = 0;
        positions[index + 2] = 0;
        positions[index + 3] = x;
        positions[index + 4] = y;
        positions[index + 5] = z;
      });

      linesMesh.rotation.copy(nodesInstanced.rotation);
      linesMesh.position.copy(nodesInstanced.position);
      nodesInstanced.instanceMatrix.needsUpdate = true;
      linesMesh.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Events
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    // Pausa el render cuando el hero sale del viewport (scroll hacia abajo)
    const visObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        clock.getDelta();
        animate();
      }
    });
    visObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      visObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      renderer.dispose();
      const gl = renderer.getContext();
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry)
          (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
}
