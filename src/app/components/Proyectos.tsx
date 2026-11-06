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
  images: ["/proyectos/aquamater/web-1.webp"],
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
  images: [
    "/proyectos/erp-aquamater/horarios.webp",
    "/proyectos/erp-aquamater/programas.webp",
    "/proyectos/erp-aquamater/inventario.webp",
  ],
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
  deliverables: ["ERP a medida", "Asistencia del personal con huellero"],
  description:
    "Sistema de gestión a medida para Aquamater, centro materno-infantil y acuático: clientes e historias clínicas, catálogo de servicios, horarios con control de cupos, inscripciones, sesiones, caja con comprobantes e inventario. También controla la asistencia del personal con un huellero. Las capturas son del entorno de pruebas.",
  techs: ["Next.js", "React", "Prisma", "PostgreSQL"],
};

const projects: Project[] = [
  {
    title: "FIMCER Ingeniería Hidráulica",
    category: "Sitio Web + Catálogo",
    filters: ["web"],
    url: "https://www.fimcer.com/",
    images: [
      "/proyectos/fimcer/web-1.webp",
      "/proyectos/fimcer/web-2.webp",
      "/proyectos/fimcer/web-3.webp",
    ],
    logo: "/logos/logo-fimcer.webp",
    deliverables: ["Sitio web con catálogo de productos"],
    description:
      "Sitio web para FIMCER, empresa de ingeniería hidráulica de Arequipa: catálogo navegable por categorías con buscador, fichas de producto con cotización directa por WhatsApp, blog con guías de compra y sección de proyectos.",
    techs: ["Astro", "Tailwind CSS", "SEO"],
  },
  {
    title: "Correos corporativos FIMCER",
    category: "Correos Corporativos",
    filters: ["marca"],
    logo: "/logos/logo-fimcer.webp",
    modules: ["Cuentas de correo corporativo", "Configuración de cuentas"],
    deliverables: ["Correos corporativos"],
    description:
      "Habilitamos los correos corporativos de FIMCER Ingeniería Hidráulica y configuramos sus cuentas para el equipo.",
  },
  {
    title: "Publicidad digital FIMCER",
    category: "Publicidad Digital",
    filters: ["marca"],
    logo: "/logos/logo-fimcer.webp",
    modules: ["Campañas de publicidad digital", "Productos y servicios hidráulicos"],
    deliverables: ["Publicidad digital"],
    description:
      "Gestionamos la publicidad digital de FIMCER para dar a conocer sus productos y servicios de ingeniería hidráulica en Arequipa.",
  },
  {
    title: "AJV Multiservicios e Ingeniería",
    category: "Sitio Corporativo",
    filters: ["web"],
    url: "https://www.ajvmultiservicios.com/",
    images: ["/proyectos/ajv/web-1.webp", "/proyectos/ajv/web-2.webp"],
    logo: "/logos/logo-ajv.webp",
    deliverables: ["Sitio web corporativo"],
    description:
      "Sitio web para AJV, empresa metalmecánica del sector industrial y minero: sus servicios de ingeniería, fabricación, montaje, reparación y mecanizado, galería de trabajos y cotización por WhatsApp.",
    techs: ["Astro", "Tailwind CSS", "SEO"],
  },
  {
    title: "Brochure AJV 2026",
    category: "Brochure Corporativo",
    filters: ["marca"],
    images: [
      "/proyectos/ajv/brochure-1.webp",
      "/proyectos/ajv/brochure-2.webp",
      "/proyectos/ajv/brochure-3.webp",
    ],
    logo: "/logos/logo-ajv.webp",
    deliverables: ["Brochure corporativo 2026"],
    description:
      "Brochure corporativo 2026 para AJV Multiservicios e Ingeniería: presentación de la empresa, misión, visión y valores, clientes, servicios y cifras clave, con la misma identidad visual de su sitio web.",
    techs: ["Diseño editorial"],
  },
  AQUAMATER_WEB,
  AQUAMATER_ERP,
  {
    title: "ERP Regena Perú",
    category: "ERP a Medida",
    filters: ["software"],
    logo: "/logos/logo-regena.webp",
    images: [
      "/proyectos/erp-regena/stock.webp",
      "/proyectos/erp-regena/cotizaciones.webp",
      "/proyectos/erp-regena/ordenes-trabajo.webp",
    ],
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
      "Sistema ERP a medida para Regena Perú que cubre su proceso completo: gestión comercial y cotizaciones, logística e importaciones, kardex de materiales, operaciones de suministro e instalación, y facturación. Las capturas son del entorno de pruebas, con clientes y montos ocultos por confidencialidad.",
  },
  {
    title: "ERP HPK Inversiones",
    category: "ERP a Medida",
    filters: ["software"],
    logo: "/logos/logo (3).webp",
    deliverables: ["ERP a medida"],
    images: [
      "/proyectos/erp/captura-1.png",
      "/proyectos/erp/captura-2.png",
      "/proyectos/erp/captura-3.png",
      "/proyectos/erp/captura-4.png",
      "/proyectos/erp/captura-5.png",
    ],
    description:
      "Sistema ERP a medida para HPK Inversiones: gestión integral de stock de materiales, aprobaciones, operaciones, mantenimiento, logística, programación semanal de personal y reportes en tiempo real. Por confidencialidad mostramos capturas de demostración del entorno, no el sistema en producción.",
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
          "radial-gradient(ellipse at 100% 0%, rgba(1,253,254,0.25), transparent 55%), linear-gradient(140deg, #3524c8 0%, #5a33dc 55%, #8152ff 100%)",
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
        {!compact && project.filters.includes("software") && (
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
      className="group relative h-full rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${(index % 3) * 100}ms`,
      }}
    >
      {/* Glow border on hover */}
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
          filter: "blur(1px)",
        }}
      />

      {/* Card content */}
      <div
        className="relative z-[1] h-full rounded-3xl overflow-hidden"
        style={{ background: "#3a37a8" }}
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
                  : project.filters.includes("software")
                    ? "Sistema privado"
                    : project.category}
              </span>
            </div>
            {project.logo && (project.images || project.url) && (
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
              isPrivate={!project.url && project.filters.includes("software")}
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

              {project.modules && (
                <div className="mt-4">
                  <h4
                    className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2 font-[family-name:var(--font-montserrat)]"
                    style={{ color: "#01FDFE" }}
                  >
                    {project.filters.includes("software") ? "Módulos" : "Incluye"}
                  </h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.modules.map((m) => (
                      <li
                        key={m}
                        className="rounded-full px-2.5 py-1 text-[11px] text-white/75 font-[family-name:var(--font-open-sans)]"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
        className="relative overflow-hidden px-3 py-16 sm:px-5 sm:py-24"
        style={{ background: "radial-gradient(ellipse at 0% 0%, #4b63f2 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, #a44ff2 0%, transparent 55%), #2c2a96" }}
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

        <div className="relative z-[1] mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-3 grid grid-cols-1 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div
                className="flex h-full flex-col justify-center rounded-3xl p-8 sm:p-10"
                style={{ background: "linear-gradient(140deg, #3524c8 0%, #5a33dc 55%, #8152ff 100%)" }}
              >
                <span
                  className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                  style={{ color: "#01FDFE" }}
                >
                  Portafolio
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
                  Nuestros{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #01FDFE, #9CB8FF, #FD67EB)" }}>
                    proyectos
                  </span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg font-[family-name:var(--font-open-sans)]">
                  Sitios web, sistemas ERP, marcas y campañas que hoy trabajan para
                  nuestros clientes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <div
                className="flex h-full flex-col justify-between gap-6 rounded-3xl p-6 sm:p-8"
                style={{ background: "#01FDFE", color: "#041020" }}
              >
                <div className="flex items-end justify-between gap-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                    Filtrar por tipo
                  </span>
                  <span className="text-6xl font-extrabold leading-none font-[family-name:var(--font-montserrat)]">
                    {shownProjects.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos">
                  {FILTERS.map((f) => {
                    const active = filter === f.key;
                    return (
                      <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        aria-pressed={active}
                        className="rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-300 cursor-pointer font-[family-name:var(--font-montserrat)]"
                        style={{
                          color: active ? "#ffffff" : "#041020",
                          background: active ? "#041020" : "rgba(4,16,32,0.1)",
                        }}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
