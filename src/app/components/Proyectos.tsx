"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import ParticleNetwork from "./ParticleNetwork";

type Filter = "web" | "software" | "marca";

const FILTERS: { key: Filter | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "web", label: "Sitios web" },
  { key: "software", label: "ERP y software" },
  { key: "marca", label: "Marca y publicidad" },
];

interface Project {
  title: string;
  category: string;
  filters: Filter[];
  /** URL del sitio en vivo. Sin `images`, se muestra en un iframe. */
  url?: string;
  /** Capturas. Si el proyecto no tiene `url`, se etiquetan como demostración privada. */
  images?: string[];
  /** Sistemas privados sin capturas públicas: se muestra un tablero con sus módulos. */
  modules?: string[];
  /** Logo del cliente (versión para fondo oscuro). */
  logo?: string;
  /** Todo lo que Vintia entregó a este cliente. */
  deliverables?: string[];
  description: string;
  stats?: { label: string; value: string }[];
  techs?: string[];
}

const AQUAMATER_WEB: Project = {
  title: "AquaMater AQP",
  category: "Sitio Corporativo",
  filters: ["web", "marca"],
  url: "https://www.aquamateraqp.com/",
  logo: "/logos/logo (1).webp",
  deliverables: ["Sitio web corporativo", "Publicidad digital"],
  description:
    "Sitio web para Aquamater, centro especializado en maternidad y bienestar familiar en Arequipa: psicoprofilaxis acuática, matronatación, hidroterapia pediátrica y programas de bienestar para mamá. Presenta sus servicios e instalaciones con un diseño cálido y canales de contacto directo para captar nuevas familias. También gestionamos su publicidad digital.",
  stats: [
    { label: "Leads generados", value: "+280%" },
    { label: "Consultas online", value: "1.8K+" },
    { label: "Posicionamiento", value: "Top 5" },
  ],
  techs: ["Next.js", "React", "Tailwind CSS", "SEO"],
};

const AQUAMATER_ERP: Project = {
  title: "ERP Aquamater",
  category: "ERP a Medida",
  filters: ["software"],
  logo: "/logos/logo (1).webp",
  modules: [
    "Clientes",
    "Historia clínica",
    "Servicios",
    "Horarios y cupos",
    "Inscripciones",
    "Sesiones",
    "Caja y comprobantes",
    "Inventario",
    "Campañas",
    "Personal",
    "Asistencia con huellero",
    "Usuarios y permisos",
  ],
  deliverables: [
    "ERP a medida",
    "Módulo de asistencia del personal",
    "Instalación del huellero",
  ],
  description:
    "Sistema de gestión a medida para Aquamater, centro materno-infantil y acuático: clientes e historias clínicas, catálogo de servicios, horarios con control de cupos, inscripciones, sesiones, caja con comprobantes e inventario. Incluye el módulo de asistencia del personal: instalamos un huellero en su local y el sistema calcula tardanzas, faltas y salidas anticipadas según el turno de cada empleado. Por confidencialidad no mostramos capturas del sistema.",
  techs: ["Next.js", "React", "Prisma", "PostgreSQL"],
};

/** Caso destacado: el cliente al que más servicios le hemos entregado. */
const FEATURED = {
  logo: "/logos/logo (1).webp",
  image: "/proyectos/aquamater/web-1.webp",
  client: "Aquamater",
  headline: "De la web al ERP: toda su operación, digitalizada.",
  text: "Empezamos por su sitio web y su publicidad digital. Después construimos el sistema con el que hoy gestionan clientes, horarios, caja e inventario, e instalamos el huellero con el que controlan la asistencia de su personal.",
  deliverables: [
    "Sitio web corporativo",
    "Publicidad digital",
    "ERP a medida",
    "Asistencia con huellero",
  ],
};

const projects: Project[] = [
  {
    title: "FIMCER Ingeniería Hidráulica",
    category: "Sitio Web + Catálogo",
    filters: ["web", "marca"],
    url: "https://www.fimcer.com/",
    images: [
      "/proyectos/fimcer/web-1.webp",
      "/proyectos/fimcer/web-2.webp",
      "/proyectos/fimcer/web-3.webp",
    ],
    logo: "/logos/logo-fimcer.webp",
    deliverables: [
      "Sitio web con catálogo de productos",
      "Correos corporativos",
      "Publicidad digital",
    ],
    description:
      "Sitio web para FIMCER, empresa de ingeniería hidráulica de Arequipa: catálogo navegable por categorías con buscador, fichas de producto con cotización directa por WhatsApp, blog con guías de compra y sección de proyectos. Además habilitamos sus correos corporativos y gestionamos su publicidad digital.",
    techs: ["Astro", "Tailwind CSS", "SEO"],
  },
  {
    title: "AJV Multiservicios e Ingeniería",
    category: "Sitio Web + Brochure",
    filters: ["web", "marca"],
    url: "https://www.ajvmultiservicios.com/",
    images: [
      "/proyectos/ajv/web-1.webp",
      "/proyectos/ajv/web-2.webp",
      "/proyectos/ajv/brochure-1.webp",
      "/proyectos/ajv/brochure-2.webp",
      "/proyectos/ajv/brochure-3.webp",
    ],
    logo: "/logos/logo-ajv.webp",
    deliverables: ["Sitio web corporativo", "Brochure corporativo 2026"],
    description:
      "Presencia digital para AJV, empresa metalmecánica del sector industrial y minero: sitio web con sus servicios de ingeniería, fabricación, montaje, reparación y mecanizado, galería de trabajos y cotización por WhatsApp. También diseñamos su brochure corporativo 2026 con la misma identidad visual.",
    techs: ["Astro", "Tailwind CSS", "Diseño editorial"],
  },
  AQUAMATER_ERP,
  {
    title: "ERP Regena Perú",
    category: "ERP a Medida",
    filters: ["software"],
    logo: "/logos/logo-regena.webp",
    modules: [
      "Gestión comercial",
      "Cotizaciones",
      "Logística",
      "Importaciones",
      "Kardex de materiales",
      "Operaciones",
      "Órdenes de trabajo",
      "Facturación",
    ],
    deliverables: ["ERP a medida"],
    description:
      "Sistema ERP a medida para Regena Perú que cubre su proceso completo: gestión comercial y cotizaciones, logística e importaciones, kardex de materiales, operaciones de suministro e instalación, y facturación. Por confidencialidad no mostramos capturas del sistema.",
  },
  {
    title: "ERP Empresarial",
    category: "Software a Medida",
    filters: ["software"],
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
  {
    title: "HPK Inversiones",
    category: "Sitio Corporativo",
    filters: ["web"],
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
    title: "HSEC Perú",
    category: "Software a Medida",
    filters: ["software", "web"],
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
    title: "TecnoNómadas",
    category: "Blog Tecnológico",
    filters: ["web"],
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
];

/* ───────────── Tablero de módulos (sistemas privados sin capturas) ───────────── */
function ModuleBoard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const modules = project.modules ?? [];
  const shown = compact ? modules.slice(0, 6) : modules;
  return (
    <div
      className={`absolute inset-0 flex flex-col ${compact ? "p-4" : "p-5 sm:p-7"}`}
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, rgba(91,47,184,0.35), transparent 60%), linear-gradient(160deg, #0b1a33 0%, #071226 100%)",
      }}
    >
      <div className={`flex items-center gap-3 ${compact ? "justify-end" : "justify-between"}`}>
        {project.logo ? (
          <img
            src={project.logo}
            alt={`Logo de ${project.title.replace("ERP ", "")}`}
            className={`${compact ? "h-11" : "h-14"} w-auto object-contain`}
          />
        ) : (
          <span />
        )}
        {!compact && (
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/55 uppercase font-[family-name:var(--font-montserrat)]">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Sistema privado
          </span>
        )}
      </div>
      <ul
        className={`mt-auto grid gap-2 ${
          compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {shown.map((m) => (
          <li
            key={m}
            className={`flex items-center gap-2 rounded-lg ${
              compact ? "px-2.5 py-1.5 text-[11px]" : "px-3 py-2.5 text-[13px]"
            } text-white/80 font-[family-name:var(--font-open-sans)]`}
            style={{
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#01FDFE]" />
            <span className="truncate">{m}</span>
          </li>
        ))}
        {compact && modules.length > shown.length && (
          <li className="col-span-2 text-center text-[11px] text-white/50 font-[family-name:var(--font-open-sans)]">
            + {modules.length - shown.length} módulos más
          </li>
        )}
      </ul>
    </div>
  );
}

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
      className="group relative h-full rounded-xl overflow-hidden transition-all duration-500 cursor-pointer"
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
        className="relative z-[1] h-full rounded-xl overflow-hidden"
        style={{ background: "rgba(4, 16, 32, 0.95)" }}
      >
        {/* Preview: imagen (proyecto privado) o iframe en vivo */}
        <div className="relative overflow-hidden aspect-[16/10]">
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
            project.url ? (
              inView && <LivePreview url={project.url} title={project.title} />
            ) : (
              <ModuleBoard project={project} compact />
            )
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
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white group-hover:text-[#01FDFE] transition-colors duration-300 font-[family-name:var(--font-montserrat)]">
                {project.title}
              </h3>
              <span className="mt-1 block truncate text-xs text-white/50 group-hover:text-white/70 transition-colors duration-300 font-[family-name:var(--font-open-sans)]">
                {project.url
                  ? project.url.replace("https://", "").replace("www.", "").replace(/\/$/, "")
                  : "Sistema privado"}
              </span>
            </div>
            {project.logo && !project.modules && (
              <img
                src={project.logo}
                alt=""
                className="h-10 w-auto max-w-[110px] shrink-0 object-contain opacity-90"
              />
            )}
          </div>
          {project.deliverables && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-full px-2.5 py-1 text-[11px] text-white/75 font-[family-name:var(--font-open-sans)]"
                  style={{
                    background: "rgba(1, 253, 254, 0.05)",
                    border: "1px solid rgba(1, 253, 254, 0.14)",
                  }}
                >
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Project Gallery (proyectos privados) ───────────── */
function ProjectGallery({
  images,
  title,
  isPrivate,
}: {
  images: string[];
  title: string;
  /** Muestra la etiqueta "entorno privado" (proyectos sin sitio público). */
  isPrivate: boolean;
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
      {isPrivate && (
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
      )}

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
            <ProjectGallery
              images={project.images}
              title={project.title}
              isPrivate={!project.url}
            />
          ) : !project.url ? (
            <div
              className="relative mb-5 min-h-[320px] overflow-hidden rounded-xl sm:min-h-[340px]"
              style={{ border: "1px solid rgba(1, 253, 254, 0.1)" }}
            >
              <ModuleBoard project={project} />
            </div>
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
                {project.techs?.map((tech) => (
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

            {/* Entregables + resultados */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {project.deliverables?.length ? (
                <div>
                  <h4
                    className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2 font-[family-name:var(--font-montserrat)]"
                    style={{ color: "#01FDFE" }}
                  >
                    Lo que entregamos
                  </h4>
                  <ul className="grid gap-2">
                    {project.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] text-white/80 font-[family-name:var(--font-open-sans)]"
                        style={{
                          background: "rgba(1, 253, 254, 0.03)",
                          border: "1px solid rgba(1, 253, 254, 0.08)",
                        }}
                      >
                        <svg className="h-4 w-4 shrink-0 text-[#01FDFE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project.stats?.length ? (
                <div>
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
              ) : null}
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
  const [filter, setFilter] = useState<Filter | "todos">("todos");
  const shownProjects =
    filter === "todos" ? projects : projects.filter((p) => p.filters.includes(filter));

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
                className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Portafolio
              </span>
            </div>

            <h2 className="text-center text-4xl font-extrabold tracking-tight uppercase sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
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

            <p className="mx-auto max-w-2xl text-center text-base leading-7 text-white/75 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
              Sitios web, sistemas ERP, marcas y campañas que hoy trabajan para
              nuestros clientes.
            </p>
          </Reveal>

          {/* Caso destacado */}
          <Reveal className="mb-14">
            <div
              className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2"
              style={{
                background: "linear-gradient(135deg, rgba(1,55,149,0.35), rgba(91,47,184,0.25))",
                border: "1px solid rgba(1, 253, 254, 0.14)",
              }}
            >
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <span
                  className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                  style={{ color: "#01FDFE" }}
                >
                  Caso destacado
                </span>
                <img
                  src={FEATURED.logo}
                  alt={`Logo de ${FEATURED.client}`}
                  className="mt-4 -ml-2 h-16 w-auto self-start object-contain"
                />
                <h3 className="mt-5 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl font-[family-name:var(--font-montserrat)]">
                  {FEATURED.headline}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/75 font-[family-name:var(--font-open-sans)]">
                  {FEATURED.text}
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {FEATURED.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2.5 text-[15px] text-white/85 font-[family-name:var(--font-open-sans)]"
                    >
                      <svg className="h-4 w-4 shrink-0 text-[#01FDFE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setSelectedProject(AQUAMATER_WEB)}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[13px] font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 cursor-pointer font-[family-name:var(--font-montserrat)]"
                    style={{ background: "linear-gradient(135deg, #013795, #5B2FB8)" }}
                  >
                    Ver el sitio web
                  </button>
                  <button
                    onClick={() => setSelectedProject(AQUAMATER_ERP)}
                    className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 cursor-pointer font-[family-name:var(--font-montserrat)] text-white/80 border-[rgba(1,253,254,0.2)] bg-[rgba(1,253,254,0.04)] hover:text-[#01FDFE] hover:border-[rgba(1,253,254,0.45)]"
                  >
                    Ver el ERP
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(AQUAMATER_WEB)}
                aria-label="Ver el sitio web de Aquamater"
                className="group relative min-h-[260px] cursor-pointer overflow-hidden lg:min-h-[460px]"
              >
                <Image
                  src={FEATURED.image}
                  alt="Sitio web de Aquamater"
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(10,16,48,0.55) 0%, transparent 35%)",
                  }}
                />
              </button>
            </div>
          </Reveal>

          {/* Filtros */}
          <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar proyectos">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  className="rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 cursor-pointer font-[family-name:var(--font-montserrat)]"
                  style={{
                    color: active ? "#041020" : "rgba(255,255,255,0.75)",
                    background: active ? "#01FDFE" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? "#01FDFE" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shownProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
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
