"use client";

import dynamic from "next/dynamic";
import Typewriter from "./Typewriter";

const Hologram = dynamic(() => import("./Hologram"), { ssr: false });

export default function HeroSection() {
  return (
    <section
      className="relative flex h-[calc(100vh-64px)] items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #041020 0%, #0e0a26 55%, #041020 100%)" }}
    >
      {/* Hologram background */}
      <Hologram />

      {/* Ambient glow spots */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #5B2FB8 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #01FDFE 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, #041020 0%, rgba(4,16,32,0.8) 40%, rgba(4,16,32,0.3) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-32"
        style={{
          background: "linear-gradient(to top, #041020 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-2xl">
          {/* Badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(1, 253, 254, 0.06)",
              border: "1px solid rgba(1, 253, 254, 0.15)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "#01FDFE" }}
            />
            <span
              className="text-[11px] font-semibold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Agencia Digital en Arequipa
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[family-name:var(--font-montserrat)]">
            Estrategias Digitales
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #01FDFE 0%, #5B2FB8 50%, #FD67EB 100%)",
              }}
            >
              <Typewriter
                words={[
                  "DE CLASE MUNDIAL",
                  "QUE GENERAN RESULTADOS",
                  "PARA TU CRECIMIENTO",
                  "CON VISIÓN DE FUTURO",
                ]}
                typingSpeed={70}
                deletingSpeed={35}
                pauseTime={2500}
              />
            </span>
            <br />
            <span className="text-white/70">en Arequipa.</span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base font-[family-name:var(--font-open-sans)]">
            Hacemos que tu negocio destaque en el ecosistema digital con diseño
            estratégico y resultados reales. Con la gestión de{" "}
            <span className="font-semibold" style={{ color: "#01FDFE" }}>
              Vintia Digital
            </span>{" "}
            lo conseguimos.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Primary CTA */}
            <a
              href="#contactanos"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #013795, #5B2FB8)",
              }}
            >
              <span className="relative z-10">Auditoría Gratuita</span>
              <svg
                className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, #5B2FB8, #FD67EB)",
                }}
              />
              <div
                className="absolute -inset-2 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background: "linear-gradient(135deg, #01FDFE, #5B2FB8)",
                }}
              />
            </a>

            {/* Secondary CTA */}
            <a
              href="#proyectos"
              className="group inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-[13px] font-bold tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] text-white/75 border-[rgba(1,253,254,0.15)] bg-[rgba(1,253,254,0.04)] hover:text-[#01FDFE] hover:border-[rgba(1,253,254,0.4)] hover:bg-[rgba(1,253,254,0.08)]"
            >
              <span>Ver Portafolio</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 z-[2] -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-medium tracking-[0.25em] text-white/25 uppercase font-[family-name:var(--font-montserrat)]">
          Scroll
        </span>
        <div
          className="h-6 w-[1px] animate-pulse"
          style={{
            background: "linear-gradient(to bottom, #01FDFE, transparent)",
          }}
        />
      </div>
    </section>
  );
}
