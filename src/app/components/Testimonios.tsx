"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  name: string;
  role: string;
  videoId: string;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Kuni 2005",
    role: "CEO de TechFlow",
    videoId: "7604546222401146130",
    accent: "#01FDFE",
  },
  {
    name: "Ana López",
    role: "Fundadora Studio X",
    videoId: "7604546222401146130",
    accent: "#FD67EB",
  },
  {
    name: "Carlos Ruiz",
    role: "CTO Innova",
    videoId: "7604546222401146130",
    accent: "#5B2FB8",
  },
  {
    name: "Global Corp",
    role: "Marketing Director",
    videoId: "7604546222401146130",
    accent: "#013795",
  },
  {
    name: "Next Level",
    role: "Startup Founder",
    videoId: "7604546222401146130",
    accent: "#01FDFE",
  },
];

/* ───── Modal ───── */
function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: "rgba(2, 8, 16, 0.9)",
        backdropFilter: "blur(12px)",
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0a1628 0%, #061020 50%, #0a0e1a 100%)",
          border: `1px solid ${testimonial.accent}25`,
          animation: "scaleIn 0.35s ease-out",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${testimonial.accent}, transparent)`,
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg
            className="h-3.5 w-3.5 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* TikTok embed (full size) */}
        <div className="w-full" style={{ height: "580px" }}>
          <iframe
            src={`https://www.tiktok.com/embed/v2/${testimonial.videoId}`}
            allowFullScreen
            allow="encrypted-media"
            className="w-full h-full border-0"
            title={`Testimonio de ${testimonial.name}`}
          />
        </div>

        {/* Info bar */}
        <div
          className="p-4 flex items-center gap-3"
          style={{
            borderTop: `1px solid ${testimonial.accent}15`,
          }}
        >
          {/* Accent dot */}
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: `${testimonial.accent}15`,
              border: `1px solid ${testimonial.accent}30`,
            }}
          >
            <span
              className="text-xs font-bold font-[family-name:var(--font-montserrat)]"
              style={{ color: testimonial.accent }}
            >
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="text-sm font-bold text-white font-[family-name:var(--font-montserrat)]">
              {testimonial.name}
            </div>
            <div
              className="text-[11px] font-semibold uppercase tracking-wider font-[family-name:var(--font-montserrat)]"
              style={{ color: testimonial.accent, opacity: 0.8 }}
            >
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Main Section ───── */
export default function Testimonios() {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <>
      <section
        id="testimonios"
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: "#041020" }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] opacity-8 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #5B2FB8 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] opacity-6 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #01FDFE 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-6xl px-6 lg:px-8">
          {/* Header — same pattern as Conócenos / Servicios / Proyectos */}
          <div className="flex justify-center mb-3">
            <span
              className="text-[10px] font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Testimonios
            </span>
          </div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl font-[family-name:var(--font-montserrat)]">
            <span className="text-white">RESULTADOS </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
              }}
            >
              REALES
            </span>
          </h2>
          <div
            className="mx-auto mt-4 mb-6 h-[2px] w-12"
            style={{
              background: "linear-gradient(90deg, #01FDFE, #5B2FB8)",
            }}
          />
          <p className="mx-auto max-w-xl text-center text-sm leading-6 text-white/65 sm:text-base font-[family-name:var(--font-open-sans)]">
            Nuestros partners estratégicos comparten su experiencia.
          </p>

          {/* Stack wrapper */}
          <div className="testimonial-stack-wrapper mt-1">
            <div className="testimonial-stack-ul">
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  className="testimonial-card testimonial-card-prez"
                  onClick={() => setSelected(t)}
                  style={
                    {
                      "--card-accent": t.accent,
                    } as React.CSSProperties
                  }
                >
                  {/* Color line */}
                  <div
                    className="testimonial-line"
                    style={{ background: t.accent }}
                  />

                  {/* TikTok video embed (preview) */}
                  <div className="testimonial-video">
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${t.videoId}`}
                      allowFullScreen
                      allow="encrypted-media"
                      className="w-full h-full border-0 rounded-lg pointer-events-none"
                      title={`Testimonio de ${t.name}`}
                      loading="lazy"
                    />
                    {/* Click overlay */}
                    <div className="absolute inset-0 z-10 cursor-pointer" />
                  </div>

                  {/* Caption */}
                  <figcaption className="testimonial-caption">
                    <div
                      className="testimonial-meta"
                      style={{ color: t.accent }}
                    >
                      {t.role}
                    </div>
                    <div className="testimonial-name">{t.name}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <TestimonialModal testimonial={selected} onClose={closeModal} />
      )}
    </>
  );
}
