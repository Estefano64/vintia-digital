"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Typewriter from "./Typewriter";
import CountUp from "./CountUp";

const Hologram = dynamic(() => import("./Hologram"), { ssr: false });

const TILE_BASE =
  "group relative overflow-hidden rounded-3xl animate-[fade-in-up_0.7s_ease-out_backwards]";
const TILE = `${TILE_BASE} transition-transform duration-500 hover:-translate-y-1`;

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden p-3 sm:p-5 lg:min-h-[calc(100vh-64px)]"
      style={{
        background:
          "radial-gradient(ellipse at 15% 0%, #1b2a8f 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, #4a1a8f 0%, transparent 50%), #070b2b",
      }}
    >
      <div className="mx-auto grid max-w-[1560px] grid-cols-2 gap-3 sm:gap-4 lg:min-h-[calc(100vh-64px-40px)] lg:grid-cols-12 lg:grid-rows-[minmax(280px,1.25fr)_minmax(210px,0.75fr)]">
        {/* ── A · Mensaje principal ── */}
        <div
          className={`${TILE_BASE} col-span-2 flex items-center lg:col-span-7 lg:row-span-2`}
          style={{
            background: "linear-gradient(140deg, #0a1560 0%, #2b1387 55%, #5B2FB8 100%)",
          }}
        >
          <Hologram />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, rgba(10,21,96,0.92) 0%, rgba(20,18,110,0.7) 50%, rgba(43,19,135,0.15) 100%)",
            }}
          />
          <div className="relative z-[2] flex flex-col items-start p-7 sm:p-10 lg:p-12">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: "rgba(1, 253, 254, 0.1)",
                border: "1px solid rgba(1, 253, 254, 0.3)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#01FDFE" }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Agencia Digital en Arequipa
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-6xl font-[family-name:var(--font-montserrat)]">
              Estrategias Digitales
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #01FDFE 0%, #9CB8FF 45%, #FD67EB 100%)",
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
              <span className="text-white/80">en Arequipa.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
              Páginas web, sistemas ERP a medida, marca y publicidad digital.
              Hacemos que tu negocio destaque y venda más con la gestión de{" "}
              <span className="font-semibold" style={{ color: "#01FDFE" }}>
                Vintia Digital
              </span>
              .
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#contactanos"
                className="group/cta inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)]"
                style={{
                  background: "#01FDFE",
                  color: "#041020",
                  boxShadow: "0 10px 40px rgba(1,253,254,0.35)",
                }}
              >
                Auditoría Gratuita
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-bold tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] text-white border-white/30 bg-white/10 hover:bg-white/20"
              >
                Ver Portafolio
              </a>
            </div>
          </div>
        </div>

        {/* ── B · ERP a medida (captura real) ── */}
        <a
          href="#erp"
          className={`${TILE} col-span-2 min-h-[220px] lg:col-span-5`}
          style={{ animationDelay: "100ms" }}
        >
          <Image
            src="/proyectos/erp-regena/stock.webp"
            alt="Captura de un sistema ERP desarrollado por Vintia Digital"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,11,43,0.95) 0%, rgba(7,11,43,0.55) 45%, rgba(7,11,43,0.05) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
            <div>
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                ERP a medida
              </span>
              <p className="mt-1 text-xl font-extrabold leading-tight text-white sm:text-2xl font-[family-name:var(--font-montserrat)]">
                Tu empresa en un solo sistema
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#01FDFE] text-[#041020] transition-transform duration-300 group-hover:rotate-45">
              <Arrow className="h-4 w-4" />
            </span>
          </div>
        </a>

        {/* ── C · Proyectos ── */}
        <div
          className={`${TILE} flex min-h-[150px] flex-col justify-between p-5 sm:p-6 lg:col-span-2`}
          style={{ background: "#01FDFE", color: "#041020", animationDelay: "200ms" }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
            Proyectos
          </span>
          <span className="text-5xl font-extrabold leading-none sm:text-6xl font-[family-name:var(--font-montserrat)]">
            <CountUp end={250} prefix="+" />
          </span>
        </div>

        {/* ── D · Clientes ── */}
        <a
          href="#clientes"
          className={`${TILE} flex min-h-[150px] flex-col justify-between p-5 sm:p-6 lg:col-span-3`}
          style={{
            background: "linear-gradient(135deg, #FD67EB 0%, #B56BFF 100%)",
            color: "#1a0638",
            animationDelay: "300ms",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
              Clientes
            </span>
            <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
          </div>
          <div>
            <span className="text-5xl font-extrabold leading-none sm:text-6xl font-[family-name:var(--font-montserrat)]">
              <CountUp end={100} prefix="+" />
            </span>
            <p className="mt-2 hidden text-sm font-semibold sm:block font-[family-name:var(--font-open-sans)]">
              confían en nosotros
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
