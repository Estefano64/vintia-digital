"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "cyan" | "purple";
}

/**
 * Animated "constellation" background: drifting dots connected by lines
 * when close, plus lines toward the cursor. Lightweight 2D canvas
 * (no Three.js). Pauses offscreen; respects prefers-reduced-motion.
 *
 * Drop inside any `relative overflow-hidden` section:
 *   <ParticleNetwork />
 */
export default function ParticleNetwork({
  density = 16000, // px² per particle (higher = fewer particles)
  maxParticles = 70,
  linkDistance = 130,
  opacity = 0.55,
}: {
  density?: number;
  maxParticles?: number;
  linkDistance?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round((w * h) / density), maxParticles);
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        hue: i % 4 === 0 ? "purple" : "cyan",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "cyan"
            ? `rgba(1, 253, 254, ${0.5 * opacity})`
            : `rgba(180, 120, 255, ${0.5 * opacity})`;
        ctx.fill();
      }

      // links between close particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.22 * opacity;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(1, 253, 254, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
        // link toward cursor
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < linkDistance * 1.2) {
          const alpha = (1 - mdist / (linkDistance * 1.2)) * 0.3 * opacity;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(253, 103, 235, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      if (reduced) return; // static render once
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      loop();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    setup();

    // animate only while visible
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onResize = () => {
      setup();
      if (reduced) draw();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [density, maxParticles, linkDistance, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
