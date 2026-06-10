"use client";

const logos = [
  "/logos/logo (1).webp",
  "/logos/logo (2).webp",
  "/logos/logo (3).webp",
  "/logos/logo (4).webp",
  "/logos/logo (5).webp",
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
        {/* Header */}
        <div className="flex justify-center mb-3">
          <span
            className="text-[10px] font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
            style={{ color: "#01FDFE" }}
          >
            Confían en nosotros
          </span>
        </div>
        <h2 className="text-center text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl font-[family-name:var(--font-montserrat)]">
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
                <div className="client-card relative flex items-center justify-center rounded-xl px-8 py-6 group-hover:scale-105">
                  <img
                    src={logo}
                    alt={`Logo de cliente ${(i % logos.length) + 1} de Vintia Digital`}
                    className="client-logo h-10 sm:h-12 w-auto object-contain"
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
