"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const SOCIALS = [
  {
    href: "https://www.instagram.com/vintiadigital",
    label: "Instagram",
    icon: (
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z" />
    ),
  },
  {
    href: "https://www.facebook.com/vintiadigital",
    label: "Facebook",
    icon: (
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    ),
  },
  {
    href: "https://www.linkedin.com/company/vintiadigital",
    label: "LinkedIn",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
];

const servicios = [
  "Desarrollo de Software",
  "Diseño Web",
  "Desarrollo Móvil",
  "Diseño UX/UI",
  "Optimización SEO",
  "Marketing Digital",
  "Branding e Identidad",
  "Consultoría TI",
  "E-Commerce",
  "Community Management",
  "Producción Audiovisual",
];

export default function Contactanos() {
  const [form, setForm] = useState({
    nombres: "",
    empresa: "",
    correo: "",
    codPais: "+51",
    numero: "",
    servicio: "",
    idea: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const telefono = form.numero.trim()
      ? `${form.codPais} ${form.numero.trim()}`
      : "";
    const msg = [
      `¡Hola Vintia Digital! Soy ${form.nombres}.`,
      form.empresa.trim() && `Empresa: ${form.empresa.trim()}`,
      `Correo: ${form.correo}`,
      telefono && `Teléfono: ${telefono}`,
      `Servicio de interés: ${form.servicio}`,
      form.idea.trim() && `Mi idea: ${form.idea.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/51915961315?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const inputBase =
    "w-full bg-transparent border-b border-white/20 pb-1.5 pt-2.5 text-[15px] text-white placeholder-white/55 outline-none transition-all duration-300 focus:border-[#01FDFE] font-[family-name:var(--font-open-sans)]";

  return (
    <section
      id="contactanos"
      className="relative overflow-hidden px-3 py-16 sm:px-5 sm:py-24"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
        {/* ── Hablemos (violeta) ── */}
        <Reveal className="sm:col-span-2 lg:col-span-5">
          <div
            className="flex h-full flex-col justify-center rounded-3xl p-8 sm:p-10"
            style={{ background: "linear-gradient(140deg, #3524c8 0%, #5a33dc 55%, #8152ff 100%)" }}
          >
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Hablemos
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
              Contácta
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #01FDFE, #9CB8FF, #FD67EB)" }}>
                nos
              </span>
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80 font-[family-name:var(--font-open-sans)]">
              ¿Buscas llevar tu presencia en línea al siguiente nivel? Desde
              páginas web y sistemas a medida hasta marketing y branding,
              cuéntanos tu idea y te respondemos.
            </p>
          </div>
        </Reveal>

        {/* ── Formulario (bloque oscuro grande) ── */}
        <Reveal delay={100} className="sm:col-span-2 lg:col-span-7 lg:row-span-2">
          <div
            className="h-full rounded-3xl p-7 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#01FDFE] uppercase font-[family-name:var(--font-montserrat)]">
              Escríbenos
            </span>
            <p className="mt-2 mb-6 text-2xl font-extrabold text-white font-[family-name:var(--font-montserrat)]">
              Cuéntanos tu proyecto
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Nombres + Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombres" className="sr-only">
                    Nombres
                  </label>
                  <input
                    id="nombres"
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={form.nombres}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className="sr-only">
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    name="empresa"
                    placeholder="Empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    autoComplete="organization"
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Row 2: Correo */}
              <div>
                <label htmlFor="correo" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={inputBase}
                />
              </div>

              {/* Row 3: Cod. país + Número */}
              <div className="grid grid-cols-[130px_1fr] gap-4">
                <div>
                  <label htmlFor="codPais" className="sr-only">
                    Código de país
                  </label>
                  <select
                    id="codPais"
                    name="codPais"
                    value={form.codPais}
                    onChange={handleChange}
                    className={`${inputBase} cursor-pointer`}
                    style={{ appearance: "none" }}
                  >
                  <option value="+51">+51 Perú</option>
                  <option value="+1">+1 USA</option>
                  <option value="+52">+52 México</option>
                  <option value="+54">+54 Argentina</option>
                  <option value="+56">+56 Chile</option>
                  <option value="+57">+57 Colombia</option>
                  <option value="+593">+593 Ecuador</option>
                  <option value="+591">+591 Bolivia</option>
                    <option value="+34">+34 España</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="numero" className="sr-only">
                    Número de teléfono
                  </label>
                  <input
                    id="numero"
                    type="tel"
                    name="numero"
                    placeholder="Número"
                    value={form.numero}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Row 4: Servicio */}
              <label htmlFor="servicio" className="sr-only">
                Servicio de interés
              </label>
              <select
                id="servicio"
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
                required
                className={`${inputBase} cursor-pointer`}
                style={{ appearance: "none" }}
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {servicios.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* Row 5: Textarea */}
              <label htmlFor="idea" className="sr-only">
                Cuéntanos tu idea
              </label>
              <textarea
                id="idea"
                name="idea"
                placeholder="Cuéntanos tu idea"
                value={form.idea}
                onChange={handleChange}
                rows={2}
                className={`${inputBase} resize-none`}
              />

              {/* Submit */}
              <button
                type="submit"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] overflow-hidden cursor-pointer"
                style={{
                  background: "#01FDFE",
                }}
              >
                <span className="relative z-10 text-[#041020] group-hover:text-white">Enviar Mensaje</span>
                <svg
                  className="relative z-10 h-4 w-4 text-[#041020] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1"
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
              </button>
            </form>
          </div>
        </Reveal>

        {/* ── Cifras (cian y rosa) ── */}
        <Reveal delay={150} className="lg:col-span-2">
          <div
            className="flex h-full min-h-[150px] flex-col justify-between rounded-3xl p-5"
            style={{ background: "#01FDFE", color: "#041020" }}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
              Clientes
            </span>
            <span className="text-4xl font-extrabold leading-none font-[family-name:var(--font-montserrat)]">
              <CountUp end={100} prefix="+" />
            </span>
          </div>
        </Reveal>
        <Reveal delay={200} className="lg:col-span-3">
          <div
            className="flex h-full min-h-[150px] flex-col justify-between rounded-3xl p-5"
            style={{ background: "linear-gradient(135deg, #FD67EB 0%, #B56BFF 100%)", color: "#1a0638" }}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
              Síguenos
            </span>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a0638] text-white transition-transform duration-300 hover:scale-110"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
