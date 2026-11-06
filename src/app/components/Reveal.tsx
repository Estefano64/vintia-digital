"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper: el bloque "se arma" la primera vez que entra al
 * viewport. Llega desde el lado de la pantalla donde está (izquierda,
 * derecha o abajo si está centrado), con un leve zoom, así una cuadrícula de
 * bloques se ensambla mientras haces scroll. `delay` (ms) escalona hermanos.
 * Respeta prefers-reduced-motion vía CSS (ver globals.css).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Dirección de entrada según la posición horizontal del bloque.
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth || 1;
    const center = (r.left + r.width / 2) / vw;
    const wide = r.width / vw > 0.6;
    const dx = wide ? 0 : center < 0.4 ? -60 : center > 0.6 ? 60 : 0;
    el.style.setProperty("--rv-x", `${dx}px`);
    el.style.setProperty("--rv-y", dx === 0 ? "60px" : "24px");
    el.style.setProperty("--rv-r", `${dx === 0 ? 0 : dx > 0 ? 2 : -2}deg`);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
