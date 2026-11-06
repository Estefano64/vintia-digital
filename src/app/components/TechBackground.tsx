"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo fijo de toda la página: negro tecnológico con cuadrícula, dos luces
 * (violeta y cian) que se desplazan lento, grano sutil y un "spotlight" que
 * ilumina la cuadrícula alrededor del cursor. Todo con gradientes CSS (sin
 * filtros blur) para que sea liviano.
 */
export default function TechBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--spot", "1");
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => el.style.setProperty("--spot", "0");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="tech-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="tech-bg-glow tech-bg-glow-violet" />
      <div className="tech-bg-glow tech-bg-glow-cyan" />
      <div className="tech-bg-grid" />
      <div className="tech-bg-spot" />
      <div className="tech-bg-grain" />
    </div>
  );
}
