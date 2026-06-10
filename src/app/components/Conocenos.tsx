"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const YOUTUBE_ID = "1zvHK6QSU6o";

export default function Conocenos() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [modalOpen, closeModal]);

  return (
    <>
      <section
        id="conocenos"
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #041020 0%, #0a0d28 100%)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #5B2FB8 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          {/* Section label */}
          <div className="flex justify-center mb-3">
            <span
              className="text-[10px] font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Quiénes somos
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-center text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl font-[family-name:var(--font-montserrat)]"
          >
            <span className="text-white">CONÓCE</span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
              }}
            >
              NOS
            </span>
          </h2>

          {/* Divider */}
          <div className="mx-auto mt-4 mb-6 h-[2px] w-12"
            style={{
              background: "linear-gradient(90deg, #01FDFE, #5B2FB8)",
            }}
          />

          {/* Subtitle */}
          <p className="mx-auto max-w-xl text-center text-sm leading-6 text-white/65 sm:text-base font-[family-name:var(--font-open-sans)]">
            Descubre quiénes somos, nuestra pasión por la innovación digital y
            cómo ayudamos a negocios en Arequipa a alcanzar su máximo potencial.
          </p>

          {/* Video thumbnail */}
          <div className="mt-10">
            <button
              onClick={() => setModalOpen(true)}
              className="group relative mx-auto block w-full max-w-2xl overflow-hidden rounded-xl focus:outline-none"
              style={{
                border: "1px solid rgba(1, 253, 254, 0.1)",
              }}
              aria-label="Reproducir video de presentación"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt="Video de presentación Vintia Digital"
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background: "rgba(4, 16, 32, 0.5)",
                  }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(4, 16, 32, 0.6)",
                      border: "2px solid rgba(1, 253, 254, 0.4)",
                      boxShadow: "0 0 30px rgba(1, 253, 254, 0.15), inset 0 0 20px rgba(1, 253, 254, 0.05)",
                    }}
                  >
                    <svg
                      className="h-6 w-6 translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="#01FDFE"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 40px rgba(1, 253, 254, 0.08), 0 0 60px rgba(91, 47, 184, 0.1)",
                  }}
                />

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3"
                  style={{
                    background: "linear-gradient(to top, rgba(4,16,32,0.9), transparent)",
                  }}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="#01FDFE" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                  <span className="text-[11px] font-medium tracking-wider text-white/50 uppercase font-[family-name:var(--font-montserrat)]">
                    Ver presentación
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 animate-[fadeIn_0.2s_ease-out]"
            style={{ background: "rgba(4, 16, 32, 0.92)", backdropFilter: "blur(8px)" }}
          />

          {/* Video container */}
          <div
            className="relative z-10 w-full max-w-5xl animate-[scaleIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              <span className="text-xs font-medium tracking-wider uppercase font-[family-name:var(--font-montserrat)]">
                Cerrar
              </span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video */}
            <div
              className="relative aspect-video w-full overflow-hidden rounded-xl"
              style={{
                border: "1px solid rgba(1, 253, 254, 0.15)",
                boxShadow: "0 0 80px rgba(91, 47, 184, 0.2), 0 0 40px rgba(1, 253, 254, 0.05)",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="Presentación Vintia Digital"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
