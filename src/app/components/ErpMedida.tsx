"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const WHATSAPP = `https://wa.me/51915961315?text=${encodeURIComponent(
  "¡Hola Vintia Digital! Quiero cotizar un ERP a medida para mi empresa."
)}`;

/* Módulos que ya hemos construido en ERPs de clientes */
const MODULES = [
  "Inventario y almacén",
  "Compras y logística",
  "Importaciones",
  "Cotizaciones",
  "Operaciones y órdenes de trabajo",
  "Mantenimiento",
  "Personal y RR. HH.",
  "Asistencia con huellero",
  "Caja y comprobantes",
  "Clientes e historias",
  "Horarios e inscripciones",
  "Aprobaciones",
  "Reportes en tiempo real",
];

/* Capturas reales de ERPs entregados (entorno de pruebas) */
const SHOTS = [
  {
    src: "/proyectos/erp-regena/stock.webp",
    tab: "Almacén",
    caption: "ERP Regena Perú · Stock de materiales",
  },
  {
    src: "/proyectos/erp-regena/cotizaciones.webp",
    tab: "Cotizaciones",
    caption: "ERP Regena Perú · Cotizaciones",
  },
  {
    src: "/proyectos/erp-aquamater/horarios.webp",
    tab: "Horarios",
    caption: "ERP Aquamater · Horarios y cupos",
  },
  {
    src: "/proyectos/erp-aquamater/inventario.webp",
    tab: "Inventario",
    caption: "ERP Aquamater · Inventario",
  },
];

/* ───────────── Visor de capturas (rota solo, se detiene al elegir una pestaña) ───────────── */
function ErpShowcase() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SHOTS.length), 4000);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <div className="relative">
      <div
        className="absolute -inset-6 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(1,253,254,0.22), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(253,103,235,0.2), transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "#0b1a33",
          border: "1px solid rgba(1, 253, 254, 0.18)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* Window bar + tabs */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="hidden gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B81]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFB547]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3DDC97]/70" />
          </div>
          <div className="flex flex-1 gap-1.5 overflow-x-auto" role="tablist" aria-label="Capturas del ERP">
            {SHOTS.map((s, i) => {
              const active = i === idx;
              return (
                <button
                  key={s.src}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setIdx(i);
                    setAuto(false);
                  }}
                  className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 cursor-pointer font-[family-name:var(--font-montserrat)]"
                  style={{
                    color: active ? "#041020" : "rgba(255,255,255,0.7)",
                    background: active ? "#01FDFE" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {s.tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Capturas apiladas: solo la activa es visible */}
        <div className="relative aspect-[16/10] bg-white">
          {SHOTS.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.caption}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover object-left-top transition-opacity duration-700"
              style={{ opacity: i === idx ? 1 : 0 }}
            />
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="text-xs font-semibold text-white/85 font-[family-name:var(--font-montserrat)]">
            {SHOTS[idx].caption}
          </span>
          <span className="text-[11px] text-white/50 font-[family-name:var(--font-open-sans)]">
            Entorno de pruebas · datos sensibles ocultos
          </span>
        </div>
      </div>
    </div>
  );
}

const BENEFITS = [
  {
    title: "Hecho para tu proceso",
    text: "Nos reunimos con tu equipo y modelamos el sistema según cómo trabajan hoy, no al revés.",
  },
  {
    title: "Todo en un solo lugar",
    text: "Ventas, almacén, operaciones, caja y personal comparten la misma información. Adiós a los Excel sueltos.",
  },
  {
    title: "Reportes al instante",
    text: "Indicadores en pantalla y exportación a Excel desde cada módulo, cuando los necesites.",
  },
  {
    title: "Crece por módulos",
    text: "Empieza con lo esencial y suma módulos después, como el control de asistencia con huellero.",
  },
];

/* Bloques de beneficios: alternan cian y violeta */
const TONES = [
  { bg: "#01FDFE", text: "#041020", num: "#041020" },
  { bg: "linear-gradient(135deg, #5B2FB8 0%, #7C4DFF 100%)", text: "#ffffff", num: "#01FDFE" },
  { bg: "linear-gradient(135deg, #5B2FB8 0%, #7C4DFF 100%)", text: "#ffffff", num: "#01FDFE" },
  { bg: "#01FDFE", text: "#041020", num: "#041020" },
];

export default function ErpMedida() {
  return (
    <section
      id="erp"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0b1140 0%, #1a1156 55%, #0a1a4a 100%)" }}
    >
      <div
        className="absolute -top-20 right-0 w-[560px] h-[560px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #5B2FB8 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 -left-20 w-[420px] h-[420px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #01FDFE 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              ERP a medida
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
              Tu empresa,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #01FDFE, #8B6CF6, #FD67EB)",
                }}
              >
                en un solo sistema.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
              Desarrollamos sistemas ERP personalizados. No adaptamos tu negocio
              a una plantilla: partimos de cómo trabaja tu equipo y construimos
              solo los módulos que necesitas.
            </p>

            <div className="mt-8">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase font-[family-name:var(--font-montserrat)]">
                Módulos que ya hemos construido
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MODULES.map((m) => (
                  <li
                    key={m}
                    className="rounded-full px-3.5 py-1.5 text-[13px] text-white/85 font-[family-name:var(--font-open-sans)]"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)]"
                style={{ background: "#01FDFE", color: "#041020" }}
              >
                Cotizar mi ERP
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] text-white/85 border-white/25 bg-white/5 hover:text-[#01FDFE] hover:border-[rgba(1,253,254,0.5)]"
              >
                Ver ERPs entregados
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ErpShowcase />
          </Reveal>
        </div>

        {/* Beneficios */}
        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <li key={b.title} className="h-full">
              <Reveal delay={i * 100} className="h-full">
                <div
                  className="h-full rounded-3xl p-6 sm:p-7"
                  style={{ background: TONES[i].bg, color: TONES[i].text }}
                >
                  <div
                    className="text-sm font-extrabold font-[family-name:var(--font-montserrat)]"
                    style={{ color: TONES[i].num }}
                  >
                    0{i + 1}
                  </div>
                  <h3 className="mt-2 text-lg font-bold font-[family-name:var(--font-montserrat)]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 opacity-85 font-[family-name:var(--font-open-sans)]">
                    {b.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
