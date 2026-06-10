"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Solo en la primera visita de la sesión; en recargas no bloquea la página.
    if (sessionStorage.getItem("vintia-loaded")) {
      setIsLoading(false);
      return;
    }
    sessionStorage.setItem("vintia-loaded", "1");
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const removeTimer = setTimeout(() => setIsLoading(false), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "#041020" }}
    >
      {/* Glow effect behind logo */}
      <div
        className="absolute h-64 w-64 rounded-full animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(1,253,254,0.15) 0%, rgba(91,47,184,0.1) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Logo */}
      <div className="relative animate-logo-entrance">
        <Image
          src="/logo-vintia.png"
          alt="Vintia Logo"
          width={180}
          height={180}
          priority
          style={{
            filter: "drop-shadow(0 0 30px rgba(1,253,254,0.3))",
          }}
        />
      </div>

      {/* Loading bar */}
      <div
        className="mt-10 h-[2px] w-48 overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full animate-loading-bar rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #013795, #01FDFE, #5B2FB8)",
          }}
        />
      </div>

      {/* Tagline */}
      <p className="mt-6 animate-fade-in-up text-sm tracking-[0.3em] text-white/50 uppercase font-[family-name:var(--font-montserrat)]">
        Soluciones Digitales
      </p>
    </div>
  );
}
