import Reveal from "./Reveal";
import CountUp from "./CountUp";

const logos = [
  { src: "/logos/logo (1).webp", name: "Aquamater" },
  { src: "/logos/logo-fimcer.webp", name: "FIMCER Ingeniería Hidráulica" },
  { src: "/logos/logo (3).webp", name: "HP&K" },
  { src: "/logos/logo-ajv.webp", name: "AJV Multiservicios e Ingeniería" },
  { src: "/logos/logo (2).webp", name: "Body Love Centro Estético" },
  { src: "/logos/logo-regena.webp", name: "Regena Perú" },
  { src: "/logos/logo (4).webp", name: "Magnia Engineering & Construction Group" },
];

/* Rubros de los clientes de arriba */
const SECTORS = [
  "Minería",
  "Metalmecánica",
  "Ingeniería hidráulica",
  "Salud y bienestar",
  "Estética",
  "Construcción",
  "Inversiones",
];

export default function Clientes() {
  return (
    <section
      id="clientes"
      className="relative overflow-hidden px-3 py-16 sm:px-5 sm:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 100% 0%, #1b2a8f 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #4a1a8f 0%, transparent 50%), #070b2b",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
        {/* ── Título (violeta) ── */}
        <Reveal className="col-span-2 lg:col-span-5">
          <div
            className="flex h-full flex-col justify-center rounded-3xl p-8 sm:p-10"
            style={{
              background: "linear-gradient(140deg, #0a1560 0%, #2b1387 55%, #5B2FB8 100%)",
            }}
          >
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Confían en nosotros
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
              Nuestros{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #01FDFE, #9CB8FF, #FD67EB)",
                }}
              >
                clientes
              </span>
            </h2>
          </div>
        </Reveal>

        {/* ── Cifra (cian) ── */}
        <Reveal delay={100} className="col-span-2 sm:col-span-1 lg:col-span-3">
          <div
            className="flex h-full min-h-[170px] flex-col justify-between rounded-3xl p-6 sm:p-7"
            style={{ background: "#01FDFE", color: "#041020" }}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
              Clientes atendidos
            </span>
            <span className="text-6xl font-extrabold leading-none sm:text-7xl font-[family-name:var(--font-montserrat)]">
              <CountUp end={100} prefix="+" />
            </span>
          </div>
        </Reveal>

        {/* ── Rubros (magenta) ── */}
        <Reveal delay={200} className="col-span-2 sm:col-span-1 lg:col-span-4">
          <div
            className="flex h-full min-h-[170px] flex-col justify-between gap-5 rounded-3xl p-6 sm:p-7"
            style={{
              background: "linear-gradient(135deg, #FD67EB 0%, #B56BFF 100%)",
              color: "#1a0638",
            }}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
              Rubros
            </span>
            <div>
              <p className="text-2xl font-extrabold leading-tight sm:text-3xl font-[family-name:var(--font-montserrat)]">
                De la minería a la salud
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {SECTORS.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-[#1a0638]/15 px-2.5 py-1 text-xs font-semibold font-[family-name:var(--font-open-sans)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ── Un bloque por cliente ── */}
        {logos.map((logo, i) => (
          <Reveal key={logo.src} delay={(i % 4) * 80} className="lg:col-span-3">
            <div
              className="flex h-full min-h-[130px] items-center justify-center rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1 sm:min-h-[150px]"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={`Logo de ${logo.name}`}
                className="h-16 w-full object-contain sm:h-20"
                loading="lazy"
                draggable={false}
              />
            </div>
          </Reveal>
        ))}

        {/* ── Cierre: completa la cuadrícula ── */}
        <Reveal delay={240} className="lg:col-span-3">
          <a
            href="#contactanos"
            className="group flex h-full min-h-[130px] flex-col justify-between rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1 sm:min-h-[150px] sm:p-6"
            style={{
              background: "linear-gradient(120deg, #01FDFE 0%, #7CA8FF 55%, #8B5CF6 100%)",
              color: "#041020",
            }}
          >
            <span className="flex h-9 w-9 items-center justify-center self-end rounded-full bg-[#041020] text-white transition-transform duration-300 group-hover:rotate-45">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
            <p className="text-lg font-extrabold leading-tight sm:text-xl font-[family-name:var(--font-montserrat)]">
              ¿Tu marca aquí?
            </p>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
