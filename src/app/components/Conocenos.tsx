"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

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
        className="relative overflow-hidden px-3 py-16 sm:px-5 sm:py-24"
        style={{ background: "radial-gradient(ellipse at 0% 0%, #1b2a8f 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, #4a1a8f 0%, transparent 50%), #070b2b" }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {/* ── Quiénes somos (violeta) ── */}
          <Reveal className="col-span-2 lg:col-span-5">
            <div
              className="flex h-full flex-col justify-center rounded-3xl p-8 sm:p-10"
              style={{ background: "linear-gradient(140deg, #0a1560 0%, #2b1387 55%, #5B2FB8 100%)" }}
            >
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Quiénes somos
              </span>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
                Conóce
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #01FDFE, #9CB8FF, #FD67EB)" }}>
                  nos
                </span>
              </h2>
              <p className="mt-6 text-base leading-7 text-white/80 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
                Descubre quiénes somos, nuestra pasión por la innovación digital y
                cómo ayudamos a negocios en Arequipa a alcanzar su máximo potencial.
              </p>
            </div>
          </Reveal>

          {/* ── Video (bloque grande) ── */}
          <Reveal delay={100} className="col-span-2 lg:col-span-7 lg:row-span-2">
            <button
              onClick={() => setModalOpen(true)}
              className="group relative block h-full min-h-[240px] w-full overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#01FDFE]"
              aria-label="Reproducir video de presentación"
            >
              <Image
                src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                alt="Video de presentación Vintia Digital"
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
                style={{ background: "linear-gradient(to top, rgba(7,11,43,0.85), rgba(7,11,43,0.15))" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-[#01FDFE] text-[#041020] transition-transform duration-300 group-hover:scale-110"
                  style={{ boxShadow: "0 10px 50px rgba(1,253,254,0.45)" }}
                >
                  <svg className="h-8 w-8 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <span className="absolute bottom-5 left-6 text-xs font-bold tracking-[0.2em] text-white uppercase font-[family-name:var(--font-montserrat)]">
                Ver presentación
              </span>
            </button>
          </Reveal>

          {/* ── Desde Arequipa (cian) ── */}
          <Reveal delay={150} className="col-span-2 sm:col-span-1 lg:col-span-2">
            <div
              className="flex h-full min-h-[170px] flex-col justify-between rounded-3xl p-6"
              style={{ background: "#01FDFE", color: "#041020" }}
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                Desde
              </span>
              <p className="text-2xl font-extrabold leading-tight font-[family-name:var(--font-montserrat)]">
                Arequipa, Perú
              </p>
            </div>
          </Reveal>

          {/* ── Qué hacemos (rosa) ── */}
          <Reveal delay={200} className="col-span-2 sm:col-span-1 lg:col-span-3">
            <a
              href="#servicios"
              className="group flex h-full min-h-[170px] flex-col justify-between rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #FD67EB 0%, #B56BFF 100%)", color: "#1a0638" }}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                  Hacemos
                </span>
                <span className="transition-transform duration-300 group-hover:rotate-45">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
                </span>
              </div>
              <p className="text-2xl font-extrabold leading-tight font-[family-name:var(--font-montserrat)]">
                Web, ERP, marca y publicidad
              </p>
            </a>
          </Reveal>
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
