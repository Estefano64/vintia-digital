"use client";

import Reveal from "./Reveal";

const logos = [
  { src: "/logos/logo (1).webp", name: "Aquamater" },
  { src: "/logos/logo-fimcer.webp", name: "FIMCER Ingeniería Hidráulica" },
  { src: "/logos/logo (3).webp", name: "HP&K" },
  { src: "/logos/logo-ajv.webp", name: "AJV Multiservicios e Ingeniería" },
  { src: "/logos/logo (2).webp", name: "Body Love Centro Estético" },
  { src: "/logos/logo-regena.webp", name: "Regena Perú" },
  { src: "/logos/logo (4).webp", name: "Magnia Engineering & Construction Group" },
  { src: "/logos/logo (5).webp", name: "Vintia Digital" },
];

export default function Clientes() {
  /* Duplicate logos for seamless infinite scroll */
  const doubled = [...logos, ...logos];

  return (
    <section
      id="clientes"
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: "#041020" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-8 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #5B2FB8 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
        {/* Header */}
        <div className="flex justify-center mb-3">
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
            style={{ color: "#01FDFE" }}
          >
            Confían en nosotros
          </span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight uppercase sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
          <span className="text-white">NUESTROS </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
            }}
          >
            CLIENTES
          </span>
        </h2>
        <div
          className="mx-auto mt-4 mb-10 h-[2px] w-12"
          style={{ background: "linear-gradient(90deg, #01FDFE, #5B2FB8)" }}
        />
        </Reveal>
      </div>

      {/* Marquee ribbon */}
      <div className="relative z-[1]">
        {/* Fade edges */}
        <div
          className="absolute top-0 left-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #041020, transparent)",
          }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #041020, transparent)",
          }}
        />

        {/* Scrolling track */}
        <div className="marquee-track">
          <div className="marquee-content">
            {doubled.map((logo, i) => (
              <div
                key={i}
                className="marquee-item group"
              >
                <div className="client-card relative flex items-center justify-center rounded-xl px-7 py-4 group-hover:scale-105">
                  <img
                    src={logo.src}
                    alt={`Logo de ${logo.name}`}
                    className="client-logo h-14 sm:h-16 w-auto object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
