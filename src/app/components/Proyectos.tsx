"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import ParticleNetwork from "./ParticleNetwork";

interface Project {
  title: string;
  category: string;
  /** URL del sitio en vivo (se muestra en un iframe). Omitir en proyectos privados. */
  url?: string;
  /** Capturas de pantalla para proyectos privados (ej. ERP). Se muestran en una galería en lugar del iframe. */
  images?: string[];
  description: string;
  stats: { label: string; value: string }[];
  techs: string[];
}

const projects: Project[] = [
  {
    title: "HSEC Perú",
    category: "Software a Medida",
    url: "https://hsec-peru.com/",
    description:
      "Desarrollo de plugin personalizado de WordPress para automatizar procesos de certificación empresarial en seguridad, salud ocupacional y medio ambiente. Incluye gestión de requisitos, validación UAT y reducción significativa del tiempo operativo del cliente.",
    stats: [
      { label: "Tiempo ahorrado", value: "65%" },
      { label: "Certificaciones gestionadas", value: "500+" },
      { label: "Satisfacción cliente", value: "5/5" },
    ],
    techs: ["WordPress", "PHP", "JavaScript", "MySQL"],
  },
  {
    title: "AquaMater AQP",
    category: "Sitio Corporativo",
    url: "https://www.aquamateraqp.com/",
    description:
      "Sitio web para Aquamater, centro especializado en maternidad y bienestar familiar en Arequipa: psicoprofilaxis acuática, matronatación, hidroterapia pediátrica y programas de bienestar para mamá. Presenta sus servicios e instalaciones con un diseño cálido y canales de contacto directo para captar nuevas familias.",
    stats: [
      { label: "Leads generados", value: "+280%" },
      { label: "Consultas online", value: "1.8K+" },
      { label: "Posicionamiento", value: "Top 5" },
    ],
    techs: ["Next.js", "React", "Tailwind CSS", "SEO"],
  },
  {
    title: "TecnoNómadas",
    category: "Blog Tecnológico",
    url: "https://www.tecnonomadas.net/",
    description:
      "Plataforma de contenido tecnológico con diseño moderno, sistema de categorización avanzado, optimización SEO y newsletter automatizado. Enfoque en experiencia de lectura y velocidad de carga.",
    stats: [
      { label: "Visitas/mes", value: "45K+" },
      { label: "Tiempo en sitio", value: "4.2min" },
      { label: "Suscriptores", value: "8K+" },
    ],
    techs: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
  },
  {
    title: "HPK Inversiones",
    category: "Sitio Corporativo",
    url: "https://hpkinv.com/",
    description:
      "Plataforma web corporativa para empresa de inversiones. Interfaz moderna y profesional con presentación de servicios, animaciones fluidas y una experiencia de usuario optimizada que transmite confianza y solidez de marca.",
    stats: [
      { label: "Tasa conversión", value: "6.2%" },
      { label: "UX Score", value: "98/100" },
      { label: "Velocidad", value: "0.8s" },
    ],
    techs: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    title: "ERP Empresarial",
    category: "Software a Medida",
    images: [
      "/proyectos/erp/captura-1.png",
      "/proyectos/erp/captura-2.png",
      "/proyectos/erp/captura-3.png",
      "/proyectos/erp/captura-4.png",
      "/proyectos/erp/captura-5.png",
    ],
    description:
      "Sistema ERP a medida para la gestión integral de la empresa: stock de materiales, aprobaciones, operaciones, mantenimiento, logística, programación semanal de personal y reportes en tiempo real. Por confidencialidad mostramos capturas de demostración del entorno, no el sistema en producción.",
    stats: [
      { label: "Módulos integrados", value: "8" },
      { label: "Procesos auto.", value: "90%" },
      { label: "Tiempo de gestión", value: "-50%" },
    ],
    techs: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
];

/* ───────────── Live Preview (iframe escalado al ancho real de la tarjeta) ───────────── */
function LivePreview({ url, title }: { url: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1280);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {scale > 0 && (
        <div
          className="w-[1280px] h-[960px] origin-top-left pointer-events-none"
          style={{ transform: `scale(${scale})` }}
        >
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
}

/* ───────────── Project Card ───────────── */
function ProjectCard({
  project,
  index,
  visible,
  onClick,
}: {
  project: Project;
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group relative rounded-xl overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${(index % 3) * 100}ms`,
      }}
    >
      {/* Glow border on hover */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
          filter: "blur(1px)",
        }}
      />

      {/* Card content */}
      <div
        className="relative z-[1] rounded-xl overflow-hidden"
        style={{ background: "rgba(4, 16, 32, 0.95)" }}
      >
        {/* Preview: imagen (proyecto privado) o iframe en vivo */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {project.images?.length ? (
            <Image
              src={project.images[0]}
              alt={`Vista previa de ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover object-top"
            />
          ) : (
            /* El iframe solo se monta cuando la tarjeta entra al viewport:
               evita cargar todos los sitios externos al abrir la página. */
            inView && <LivePreview url={project.url!} title={project.title} />
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(1,55,149,0.85), rgba(91,47,184,0.85))",
            }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-wider uppercase font-[family-name:var(--font-montserrat)]"
              style={{
                background: "rgba(1, 253, 254, 0.15)",
                border: "1px solid rgba(1, 253, 254, 0.5)",
                color: "#01FDFE",
              }}
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Ver Detalle
            </span>
          </div>

          {/* Category tag */}
          <div
            className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 group-hover:opacity-0 font-[family-name:var(--font-montserrat)]"
            style={{
              background: "rgba(4, 16, 32, 0.8)",
              border: "1px solid rgba(1, 253, 254, 0.2)",
              color: "#01FDFE",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.category}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-white group-hover:text-[#01FDFE] transition-colors duration-300 font-[family-name:var(--font-montserrat)]">
            {project.title}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <div
              className="h-[2px] w-0 group-hover:w-8 transition-all duration-500 rounded-full"
              style={{
                background: "linear-gradient(90deg, #01FDFE, #5B2FB8)",
              }}
            />
            <span className="text-[11px] text-white/45 group-hover:text-white/65 transition-colors duration-300 font-[family-name:var(--font-open-sans)]">
              {project.url
                ? project.url.replace("https://", "").replace(/\/$/, "")
                : "Demo privado"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Project Gallery (proyectos privados) ───────────── */
function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [idx, setIdx] = useState(0);
  const go = (dir: number) =>
    setIdx((i) => (i + dir + images.length) % images.length);

  return (
    <div
      className="relative rounded-xl overflow-hidden mb-5"
      style={{ border: "1px solid rgba(1, 253, 254, 0.1)" }}
    >
      {/* Etiqueta "Demostración privada" */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: "rgba(4, 16, 32, 0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#01FDFE"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span className="text-[11px] tracking-wider uppercase text-white/55 font-[family-name:var(--font-montserrat)]">
          Capturas de demostración — entorno privado
        </span>
      </div>

      {/* Imagen principal */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ background: "rgba(2, 8, 16, 0.6)", minHeight: "300px" }}
      >
        <img
          src={images[idx]}
          alt={`${title} — captura ${idx + 1}`}
          className="max-h-[420px] w-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              style={{
                background: "rgba(4, 16, 32, 0.7)",
                border: "1px solid rgba(1, 253, 254, 0.3)",
              }}
            >
              <svg
                className="h-4 w-4 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              style={{
                background: "rgba(4, 16, 32, 0.7)",
                border: "1px solid rgba(1, 253, 254, 0.3)",
              }}
            >
              <svg
                className="h-4 w-4 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Miniaturas / indicadores */}
      {images.length > 1 && (
        <div
          className="flex items-center justify-center gap-2 px-4 py-3"
          style={{
            background: "rgba(4, 16, 32, 0.9)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ver captura ${i + 1}`}
              className="h-12 w-16 rounded-md overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                border:
                  i === idx
                    ? "1.5px solid #01FDFE"
                    : "1px solid rgba(255,255,255,0.1)",
                opacity: i === idx ? 1 : 0.5,
              }}
            >
              <img
                src={src}
                alt={`Miniatura ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────── Project Modal ───────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(2, 8, 16, 0.88)",
        backdropFilter: "blur(12px)",
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background: "linear-gradient(160deg, #0a1628 0%, #061020 50%, #0a0e1a 100%)",
          border: "1px solid rgba(1, 253, 254, 0.1)",
          animation: "scaleIn 0.35s ease-out",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, #01FDFE, #5B2FB8, #FD67EB, transparent)",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 cursor-pointer bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] hover:bg-[rgba(253,103,235,0.2)] hover:border-[rgba(253,103,235,0.5)]"
        >
          <svg
            className="h-4 w-4 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="mb-4">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-2"
              style={{
                background: "rgba(1, 253, 254, 0.06)",
                border: "1px solid rgba(1, 253, 254, 0.15)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: "#01FDFE" }}
              />
              <span
                className="text-[10px] font-semibold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                {project.category}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-[family-name:var(--font-montserrat)]">
              {project.title}
            </h3>
          </div>

          {/* Preview: galería de capturas (privado) o iframe en vivo */}
          {project.images?.length ? (
            <ProjectGallery images={project.images} title={project.title} />
          ) : (
          <div
            className="relative rounded-xl overflow-hidden mb-5"
            style={{
              border: "1px solid rgba(1, 253, 254, 0.1)",
            }}
          >
            {/* Browser chrome bar */}
            <div
              className="flex items-center gap-3 px-4 py-2.5"
              style={{
                background: "rgba(4, 16, 32, 0.9)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div
                className="flex-1 flex items-center gap-2 rounded-md px-3 py-1 text-[11px] text-white/60 font-[family-name:var(--font-open-sans)]"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <svg
                  className="h-3 w-3 text-white/20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                {project.url}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200 hover:text-[#01FDFE]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Abrir
              </a>
            </div>

            {/* Iframe */}
            <div className="relative w-full" style={{ height: "300px" }}>
              <iframe
                src={project.url}
                title={`Preview de ${project.title}`}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
          )}

          {/* Description + Stats row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Description */}
            <div className="lg:col-span-3">
              <h4
                className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2 font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Descripción del Proyecto
              </h4>
              <p className="text-[13px] leading-6 text-white/70 font-[family-name:var(--font-open-sans)]">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase font-[family-name:var(--font-montserrat)]"
                    style={{
                      background: "rgba(91, 47, 184, 0.12)",
                      border: "1px solid rgba(91, 47, 184, 0.25)",
                      color: "rgba(253, 103, 235, 0.7)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="lg:col-span-2">
              <h4
                className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2 font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Resultados Clave
              </h4>
              <div className="grid gap-2">
                {project.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-3 flex items-center justify-between"
                    style={{
                      background: "rgba(1, 253, 254, 0.03)",
                      border: "1px solid rgba(1, 253, 254, 0.08)",
                    }}
                  >
                    <span className="text-[11px] text-white/60 font-[family-name:var(--font-open-sans)]">
                      {stat.label}
                    </span>
                    <span
                      className="text-base font-extrabold font-[family-name:var(--font-montserrat)]"
                      style={{
                        background:
                          "linear-gradient(135deg, #01FDFE, #5B2FB8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center justify-center">
            {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #013795, #5B2FB8)",
              }}
            >
              <span className="relative z-10 text-white">Visitar Sitio Web</span>
              <svg
                className="relative z-10 h-3.5 w-3.5 text-white transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, #5B2FB8, #FD67EB)",
                }}
              />
            </a>
            )}

            <a
              href="#contactanos"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)] text-white/70 border-[rgba(1,253,254,0.15)] bg-[rgba(1,253,254,0.04)] hover:text-[#01FDFE] hover:border-[rgba(1,253,254,0.4)]"
            >
              Quiero algo similar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Main Section ───────────── */
export default function Proyectos() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section
        id="proyectos"
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #041020 0%, #120a2e 50%, #041020 100%)" }}
      >
        {/* Constellation background */}
        <ParticleNetwork />

        {/* Background ambient glows */}
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #5B2FB8 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[300px] h-[300px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #FD67EB 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <Reveal className="text-center mb-14">
            <div className="flex justify-center mb-3">
              <span
                className="text-[10px] font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Portafolio
              </span>
            </div>

            <h2 className="text-center text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl font-[family-name:var(--font-montserrat)]">
              <span className="text-white">NUESTROS </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
                }}
              >
                PROYECTOS
              </span>
            </h2>

            <div
              className="mx-auto mt-4 mb-6 h-[2px] w-12"
              style={{ background: "linear-gradient(90deg, #5B2FB8, #FD67EB)" }}
            />

            <p className="mx-auto max-w-xl text-center text-sm leading-6 text-white/65 sm:text-base font-[family-name:var(--font-open-sans)]">
              Cada proyecto refleja nuestra pasión por el diseño estratégico y los
              resultados medibles.
            </p>
          </Reveal>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                visible
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </>
  );
}
