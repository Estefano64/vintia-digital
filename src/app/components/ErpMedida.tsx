"use client";

import { useEffect, useState } from "react";
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

type Estado = "PUNTUAL" | "TARDANZA" | "FALTA";

/* Marcaciones ficticias: solo ilustran cómo se ve el módulo */
const MARKS: { name: string; role: string; time: string; estado: Estado; note: string }[] = [
  { name: "Lucía Paredes", role: "Recepción", time: "07:56", estado: "PUNTUAL", note: "Puntual" },
  { name: "Diego Salas", role: "Instructor", time: "08:04", estado: "PUNTUAL", note: "Puntual" },
  { name: "Carla Mendoza", role: "Administración", time: "08:17", estado: "TARDANZA", note: "Tardanza · 17 min" },
  { name: "Renzo Quispe", role: "Mantenimiento", time: "08:02", estado: "PUNTUAL", note: "Puntual" },
  { name: "Milagros Rojas", role: "Instructora", time: "—", estado: "FALTA", note: "Sin marcación" },
];

const ESTADO_COLOR: Record<Estado, string> = {
  PUNTUAL: "#3DDC97",
  TARDANZA: "#FFB547",
  FALTA: "#FF6B81",
};

function FingerprintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </svg>
  );
}

/* ───────────── Demo animada del módulo de asistencia ───────────── */
function AsistenciaDemo() {
  // shown = cuántas marcaciones ya "llegaron" del huellero
  const [shown, setShown] = useState(MARKS.length);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let scanTimer: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setScanning(true);
      scanTimer = setTimeout(() => {
        setScanning(false);
        setShown((s) => (s >= MARKS.length ? 1 : s + 1));
      }, 900);
    }, 2400);
    return () => {
      clearInterval(interval);
      clearTimeout(scanTimer);
    };
  }, []);

  const visible = MARKS.slice(0, shown);
  const count = (e: Estado) => visible.filter((m) => m.estado === e).length;

  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute -inset-6 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(1,253,254,0.18), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(253,103,235,0.14), transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(160deg, #0b1a33 0%, #081226 100%)",
          border: "1px solid rgba(1, 253, 254, 0.14)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* Window bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B81]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFB547]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3DDC97]/70" />
          </div>
          <span className="text-xs font-semibold text-white/70 font-[family-name:var(--font-montserrat)]">
            Asistencia del personal · Hoy
          </span>
          <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white/45 uppercase font-[family-name:var(--font-montserrat)]">
            Datos de demostración
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr]">
          {/* Huellero */}
          <div
            className="flex flex-row items-center justify-center gap-4 p-5 sm:flex-col sm:gap-3"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="relative flex h-24 w-20 items-center justify-center overflow-hidden rounded-2xl transition-colors duration-300"
              style={{
                background: "rgba(1, 253, 254, 0.05)",
                border: `1px solid ${scanning ? "#01FDFE" : "rgba(1, 253, 254, 0.25)"}`,
                boxShadow: scanning ? "0 0 30px rgba(1,253,254,0.35)" : "none",
              }}
            >
              <FingerprintIcon
                className={`h-12 w-12 transition-colors duration-300 ${scanning ? "text-[#01FDFE]" : "text-[#01FDFE]/45"}`}
              />
              {/* Scan line */}
              <span
                className="absolute left-2 right-2 h-[2px] rounded-full"
                style={{
                  background: "#01FDFE",
                  boxShadow: "0 0 12px #01FDFE",
                  top: scanning ? "82%" : "14%",
                  opacity: scanning ? 1 : 0,
                  transition: "top 0.85s ease-in-out, opacity 0.2s",
                }}
              />
            </div>
            <div className="text-left sm:text-center">
              <div className="text-xs font-bold text-white font-[family-name:var(--font-montserrat)]">
                Huellero
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/55 sm:justify-center font-[family-name:var(--font-open-sans)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3DDC97] animate-pulse" />
                {scanning ? "Leyendo huella…" : "Conectado"}
              </div>
            </div>
          </div>

          {/* Panel */}
          <div className="p-4 sm:p-5">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-2.5">
              {(
                [
                  ["Puntuales", "PUNTUAL"],
                  ["Tardanzas", "TARDANZA"],
                  ["Faltas", "FALTA"],
                ] as [string, Estado][]
              ).map(([label, e]) => (
                <div
                  key={e}
                  className="rounded-xl px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="text-2xl font-extrabold font-[family-name:var(--font-montserrat)]"
                    style={{ color: ESTADO_COLOR[e] }}
                  >
                    {count(e)}
                  </div>
                  <div className="text-[11px] text-white/55 font-[family-name:var(--font-open-sans)]">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Marcaciones (altura fija para que la animación no mueva la página) */}
            <ul className="mt-3 flex h-[330px] flex-col gap-2">
              {visible.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 animate-[fadeIn_0.4s_ease-out]"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white font-[family-name:var(--font-montserrat)]"
                    style={{ background: "linear-gradient(135deg, #013795, #5B2FB8)" }}
                  >
                    {m.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-white font-[family-name:var(--font-montserrat)]">
                      {m.name}
                    </div>
                    <div className="truncate text-[11px] text-white/50 font-[family-name:var(--font-open-sans)]">
                      {m.role}
                    </div>
                  </div>
                  <span className="hidden text-[13px] font-semibold tabular-nums text-white/80 min-[400px]:block font-[family-name:var(--font-montserrat)]">
                    {m.time}
                  </span>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide font-[family-name:var(--font-montserrat)]"
                    style={{
                      color: ESTADO_COLOR[m.estado],
                      background: `${ESTADO_COLOR[m.estado]}18`,
                      border: `1px solid ${ESTADO_COLOR[m.estado]}40`,
                    }}
                  >
                    {m.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const ASISTENCIA_FEATURES = [
  {
    title: "Instalamos el huellero",
    text: "Llevamos el lector biométrico a tu local, lo configuramos y registramos a tu personal.",
  },
  {
    title: "Marcaciones directo al sistema",
    text: "Cada entrada y salida llega sola al ERP. Sin cuadernos ni hojas de Excel.",
  },
  {
    title: "Horarios y turnos por empleado",
    text: "Define el horario fijo o el turno semanal de cada persona y el sistema compara contra él.",
  },
  {
    title: "Tardanzas y faltas calculadas",
    text: "Tardanzas, salidas anticipadas y faltas se calculan solas, y el reporte se exporta a Excel.",
  },
];

export default function ErpMedida() {
  return (
    <section
      id="erp"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0d28 0%, #0d0b2b 50%, #071630 100%)" }}
    >
      <div
        className="absolute -top-20 right-0 w-[520px] h-[520px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #5B2FB8 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Bloque 1: ERP a medida ── */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
                  backgroundImage: "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
                }}
              >
                en un solo sistema.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
              Desarrollamos sistemas ERP personalizados. No adaptamos tu negocio
              a una plantilla: partimos de cómo trabaja tu equipo y construimos
              solo los módulos que necesitas.
            </p>

            <div className="mt-8">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase font-[family-name:var(--font-montserrat)]">
                Módulos que ya hemos construido
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MODULES.map((m) => (
                  <li
                    key={m}
                    className="rounded-full px-3.5 py-1.5 text-[13px] text-white/80 font-[family-name:var(--font-open-sans)]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
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
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)]"
                style={{ background: "linear-gradient(135deg, #013795, #5B2FB8)" }}
              >
                Cotizar mi ERP
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] text-white/75 border-[rgba(1,253,254,0.15)] bg-[rgba(1,253,254,0.04)] hover:text-[#01FDFE] hover:border-[rgba(1,253,254,0.4)]"
              >
                Ver ERPs entregados
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <AsistenciaDemo />
          </Reveal>
        </div>

        {/* ── Bloque 2: módulo de asistencia ── */}
        <div
          className="mt-20 rounded-3xl p-6 sm:p-10 lg:p-12"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(1, 253, 254, 0.08)",
                      border: "1px solid rgba(1, 253, 254, 0.25)",
                    }}
                  >
                    <FingerprintIcon className="h-6 w-6 text-[#01FDFE]" />
                  </span>
                  <span
                    className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                    style={{ color: "#01FDFE" }}
                  >
                    Módulo de asistencia
                  </span>
                </div>
                <h3 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl font-[family-name:var(--font-montserrat)]">
                  Controla horarios y tardanzas con un huellero.
                </h3>
                <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg font-[family-name:var(--font-open-sans)]">
                  Instalamos el equipo, lo conectamos a tu sistema y tu personal
                  marca con su huella. Tú ves quién llegó, a qué hora y quién
                  llegó tarde.
                </p>
              </div>
              <span
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-semibold text-white/80 lg:self-auto font-[family-name:var(--font-montserrat)]"
                style={{
                  background: "rgba(61, 220, 151, 0.08)",
                  border: "1px solid rgba(61, 220, 151, 0.3)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#3DDC97]" />
                Ya funciona en Aquamater
              </span>
            </div>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ASISTENCIA_FEATURES.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={i * 100}>
                  <div
                    className="text-sm font-extrabold font-[family-name:var(--font-montserrat)]"
                    style={{ color: "#01FDFE" }}
                  >
                    0{i + 1}
                  </div>
                  <h4 className="mt-2 text-lg font-bold text-white font-[family-name:var(--font-montserrat)]">
                    {f.title}
                  </h4>
                  <p className="mt-2 text-[15px] leading-7 text-white/65 font-[family-name:var(--font-open-sans)]">
                    {f.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
