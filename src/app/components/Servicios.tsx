"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

interface Service {
  id: string;
  title: string;
  short: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  imageExpanded: string;
}

const SERVICES: Service[] = [
  {
    id: "branding-identidad-visual",
    title: "Branding e Identidad Visual",
    short: "Branding",
    category: "Identidad y Estrategia",
    tagline: "Todo empieza por definir quién eres y cómo te ven.",
    description:
      "No solo diseñamos logotipos; construimos la personalidad de tu marca. Desarrollamos un ecosistema visual y comunicativo único que define tus valores, tono de voz y estética. Nuestro objetivo es crear una identidad sólida que te diferencie en el mercado, genere confianza y permanezca en la mente de tus consumidores.",
    image: "/servicesimg/expandidos/Branding-e-Identidad-Visual-285-x-252.webp",
    imageExpanded: "/servicesimg/expandidos/Branding-e-Identidad-Visual-480-x-670.webp",
  },
  {
    id: "marketing-digital-360",
    title: "Marketing Digital 360°",
    short: "Marketing 360°",
    category: "Identidad y Estrategia",
    tagline: "Todo empieza por definir quién eres y cómo te ven.",
    description:
      "Diseñamos estrategias integrales orientadas a resultados reales. Fusionamos creatividad con análisis de datos para gestionar campañas que realmente convierten. Desde la planificación de medios pagados hasta el posicionamiento orgánico, nos aseguramos de que cada acción tenga un propósito claro: hacer crecer tu negocio y maximizar tu retorno de inversión.",
    image: "/servicesimg/expandidos/Marketing-Digital-360-285-x-252.webp",
    imageExpanded: "/servicesimg/expandidos/Marketing-Digital-360--480-x-670.webp",
  },
  {
    id: "gestion-redes-sociales",
    title: "Gestión de Redes Sociales",
    short: "Social Media",
    category: "Contenido y Social Media",
    tagline: "Cómo conectas y hablas con tu audiencia.",
    description:
      "Más que publicar, construimos comunidades. Nos encargamos de la gestión estratégica de tus perfiles sociales, creando contenido de valor que fomenta la interacción y la lealtad. Desde la planificación del calendario hasta la respuesta a usuarios, nuestro equipo se asegura de que tu marca tenga una voz activa, cercana y relevante en el día a día digital.",
    image: "/servicesimg/expandidos/Gestión-de-Redes-Sociales-285-x-252.webp",
    imageExpanded: "/servicesimg/expandidos/Gestión-de-Redes-Sociales-480-x-670.webp",
  },
  {
    id: "produccion-audiovisual",
    title: "Producción Audiovisual",
    short: "Foto & Video",
    category: "Contenido y Social Media",
    tagline: "Cómo conectas y hablas con tu audiencia.",
    description:
      "El contenido visual es el rey. Producimos fotografías y videos de alta calidad comercial que capturan la esencia de tu marca y detienen el scroll. Realizamos desde fotografía de producto y corporativa hasta spots publicitarios y contenido para redes (Reels/TikToks), asegurando que cada pieza visual comunique profesionalismo y calidad.",
    image: "/servicesimg/expandidos/Producción-Audiovisual-285-x-252.webp",
    imageExpanded: "/servicesimg/expandidos/Producción-Audiovisual-480-x-670.webp",
  },
  {
    id: "diseno-desarrollo-web",
    title: "Diseño y Desarrollo Web",
    short: "Web",
    category: "Tecnología y Desarrollo",
    tagline: "La base digital donde vive tu negocio.",
    description:
      "Creamos sitios web que combinan alto rendimiento, seguridad y estética moderna. Ya sea una web corporativa, una landing page o un eCommerce complejo, desarrollamos plataformas rápidas y adaptables a cualquier dispositivo (responsive). No solo te entregamos una web bonita, sino una herramienta de ventas optimizada para la experiencia del usuario.",
    image: "/servicesimg/expandidos/Diseño-y-Desarrollo-Web-285-x-252.webp",
    imageExpanded: "/servicesimg/expandidos/Diseño-y-Desarrollo-Web-480-x-670.webp",
  },
  {
    id: "diseno-ux-ui",
    title: "Diseño UX/UI",
    short: "UX/UI",
    category: "Tecnología y Desarrollo",
    tagline: "La base digital donde vive tu negocio.",
    description:
      "Transformamos la navegación en una experiencia intuitiva y memorable. Nos enfocamos en entender el comportamiento de tus usuarios para diseñar interfaces que no solo sean visualmente impactantes, sino también fáciles de usar. Un buen diseño UX/UI reduce la fricción, mejora la retención y guía a tus visitantes hacia la conversión de forma natural.",
    image: "/servicesimg/expandidos/Diseño-UX-UI-285-x-252.webp",
    imageExpanded: "/servicesimg/expandidos/Diseño-UX-UI-480-x-670.webp",
  },
  {
    id: "desarrollo-software-medida",
    title: "Desarrollo de Software a Medida",
    short: "Software",
    category: "Tecnología y Desarrollo",
    tagline: "La base digital donde vive tu negocio.",
    description:
      "Lleva la operatividad de tu empresa al siguiente nivel. Desarrollamos soluciones tecnológicas personalizadas para automatizar procesos, integrar sistemas y mejorar la eficiencia interna. Creamos herramientas escalables y seguras que se adaptan exactamente a las necesidades de tu flujo de trabajo, dándote control total sobre tu infraestructura digital. Desarrollamos sistemas ERP personalizados y módulos como el control de asistencia del personal con huellero.",
    image: "/servicesimg/expandidos/Desarrollo-de-Software-a-Medida-285-x-252.webp",
    imageExpanded: "/servicesimg/expandidos/Desarrollo-de-Software-a-Medida-480-x-670.webp",
  },
];

const WHATSAPP_NUMBER = "51915961315";

/* Structured data so crawlers see every service + description,
   which otherwise only render inside the modal. */
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Vintia Digital",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      serviceType: s.category,
      provider: {
        "@type": "Organization",
        name: "Vintia Digital",
        url: "https://vintiadigital.com",
      },
      areaServed: "Arequipa, Perú",
    },
  })),
};

function whatsappLink(title: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, quiero solicitar más información sobre el servicio de ${title}`
  )}`;
}

/* Color de la etiqueta de cada bloque: alterna cian y rosa */
const TAGS = [
  { bg: "#01FDFE", color: "#041020" },
  { bg: "linear-gradient(135deg, #FD67EB 0%, #B56BFF 100%)", color: "#1a0638" },
];

export default function Servicios() {
  const [selected, setSelected] = useState<number | null>(null);

  /* Track whether we pushed a history entry for the open modal, so the
     browser back button closes the modal instead of leaving the page. */
  const pushedHistory = useRef(false);

  const closeModal = useCallback(() => {
    if (pushedHistory.current) {
      // popstate handler clears the state
      window.history.back();
    } else {
      setSelected(null);
    }
  }, []);

  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    window.history.pushState({ vintiaServiceModal: true }, "");
    pushedHistory.current = true;
    const onPop = () => {
      pushedHistory.current = false;
      setSelected(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [isOpen]);

  /* Lock body scroll & ESC key when modal open */
  useEffect(() => {
    if (selected === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, closeModal]);

  /* Preload expanded images on idle so the modal opens instantly */
  useEffect(() => {
    const preload = () => {
      SERVICES.forEach((s) => {
        const img = new window.Image();
        img.src = s.imageExpanded;
      });
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(preload);
    } else {
      const t = setTimeout(preload, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const preloadExpanded = useCallback((src: string) => {
    const img = new window.Image();
    img.src = src;
  }, []);

  return (
    <>
      <section
        id="servicios"
        className="relative overflow-hidden px-3 py-16 sm:px-5 sm:py-24"
        style={{ background: "radial-gradient(ellipse at 0% 0%, #1b2a8f 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, #4a1a8f 0%, transparent 50%), #070b2b" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[250px]">
          {/* ── Título (violeta) ── */}
          <Reveal className="sm:col-span-2 lg:col-span-3 lg:row-span-1">
            <div
              className="flex h-full flex-col justify-center rounded-3xl p-8 sm:p-10"
              style={{ background: "linear-gradient(140deg, #0a1560 0%, #2b1387 55%, #5B2FB8 100%)" }}
            >
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Lo que hacemos
              </span>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
                Nuestros{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #01FDFE, #9CB8FF, #FD67EB)" }}>
                  servicios
                </span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg font-[family-name:var(--font-open-sans)]">
                Los servicios esenciales para hacer crecer tu negocio y alcanzar
                tus objetivos.
              </p>
            </div>
          </Reveal>

          {/* ── Cifra (cian) ── */}
          <Reveal delay={100} className="sm:col-span-2 lg:col-span-1">
            <div
              className="flex h-full min-h-[170px] flex-col justify-between rounded-3xl p-6 sm:p-7"
              style={{ background: "#01FDFE", color: "#041020" }}
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                Servicios
              </span>
              <span className="text-7xl font-extrabold leading-none font-[family-name:var(--font-montserrat)]">
                {SERVICES.length}
              </span>
            </div>
          </Reveal>

          {/* ── Un bloque por servicio (el primero, grande) ── */}
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.id}
              delay={(i % 3) * 90}
              className={i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}
            >
              <button
                onClick={() => setSelected(i)}
                onMouseEnter={() => preloadExpanded(service.imageExpanded)}
                onTouchStart={() => preloadExpanded(service.imageExpanded)}
                className={`group relative block h-full w-full overflow-hidden rounded-3xl text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#01FDFE] ${
                  i === 0 ? "min-h-[320px]" : "min-h-[240px]"
                }`}
              >
                <Image
                  src={service.imageExpanded}
                  alt={service.title}
                  fill
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 640px) 100vw, 320px"}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(7,11,43,0.95) 0%, rgba(7,11,43,0.45) 45%, rgba(7,11,43,0.05) 100%)",
                  }}
                />
                <span
                  className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase font-[family-name:var(--font-montserrat)]"
                  style={{ background: TAGS[i % 2].bg, color: TAGS[i % 2].color }}
                >
                  {service.short}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <h3
                      className={`font-extrabold leading-tight text-white font-[family-name:var(--font-montserrat)] ${
                        i === 0 ? "text-2xl sm:text-3xl" : "text-lg"
                      }`}
                    >
                      {service.title}
                    </h3>
                    {i === 0 && (
                      <p className="mt-1 text-sm text-white/75 font-[family-name:var(--font-open-sans)]">
                        {service.tagline}
                      </p>
                    )}
                    <p className="sr-only">{service.description}</p>
                  </div>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
                    style={{ background: TAGS[i % 2].bg, color: TAGS[i % 2].color }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}

          {/* ── Cierre (degradado) ── */}
          <Reveal delay={180} className="sm:col-span-2">
            <a
              href="#contactanos"
              className="group flex h-full min-h-[200px] flex-col justify-between rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(120deg, #01FDFE 0%, #7CA8FF 55%, #8B5CF6 100%)",
                color: "#041020",
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                  ¿No sabes por dónde empezar?
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#041020] text-white transition-transform duration-300 group-hover:rotate-45">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
                </span>
              </div>
              <p className="max-w-md text-3xl font-extrabold leading-tight font-[family-name:var(--font-montserrat)]">
                Pide tu auditoría gratuita
              </p>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ====== SERVICE MODAL ====== */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 animate-[fadeIn_0.2s_ease-out]"
            style={{ background: "rgba(4, 16, 32, 0.92)", backdropFilter: "blur(12px)" }}
          />

          {/* Modal container */}
          <div
            className="relative z-10 w-full max-w-5xl max-h-[92dvh] overflow-y-auto overscroll-contain animate-[scaleIn_0.3s_ease-out] rounded-2xl"
            style={{
              background: "linear-gradient(160deg, #0c1a30, #081428)",
              border: "1px solid rgba(1, 253, 254, 0.1)",
              boxShadow: "0 0 80px rgba(91,47,184,0.15), 0 0 40px rgba(1,253,254,0.05)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated top glow */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px] animate-glow-pulse"
              style={{
                background: "linear-gradient(90deg, transparent, #01FDFE, #5B2FB8, #FD67EB, transparent)",
              }}
            />

            {/* Top bar — sticky so the close button is always reachable */}
            <div
              className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 sm:px-8"
              style={{
                background: "rgba(10, 24, 44, 0.92)",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(1, 253, 254, 0.06)",
              }}
            >
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Nuestros Servicios
              </span>
              <button
                onClick={closeModal}
                aria-label="Cerrar"
                className="flex items-center gap-1.5 -mr-2 px-2 py-2 text-white/70 transition-colors hover:text-white font-[family-name:var(--font-montserrat)] cursor-pointer"
              >
                <span className="text-[11px] font-semibold tracking-wider uppercase">
                  Cerrar
                </span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image side */}
              <div
                className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(1,55,149,0.12), rgba(91,47,184,0.12))",
                }}
              >
                <Image
                  src={SERVICES[selected].imageExpanded}
                  alt={SERVICES[selected].title}
                  fill
                  className="object-cover animate-[fadeIn_0.4s_ease-out]"
                />
                {/* Glow behind image */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(1,253,254,0.12), transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span
                  className="mb-2 text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] animate-[slideRight_0.35s_ease-out]"
                  style={{ color: "#01FDFE" }}
                >
                  {SERVICES[selected].category}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-3 font-[family-name:var(--font-montserrat)] animate-[slideRight_0.4s_ease-out]">
                  {SERVICES[selected].title}
                </h3>
                <p className="text-sm italic text-white/60 mb-4 font-[family-name:var(--font-open-sans)] animate-[slideRight_0.45s_ease-out]">
                  {SERVICES[selected].tagline}
                </p>
                <div
                  className="h-[2px] w-10 mb-5 animate-[slideRight_0.5s_ease-out]"
                  style={{ background: "linear-gradient(90deg, #01FDFE, #5B2FB8)" }}
                />
                <p className="text-sm leading-7 text-white/65 mb-8 font-[family-name:var(--font-open-sans)] animate-[slideRight_0.5s_ease-out]">
                  {SERVICES[selected].description}
                </p>
                <a
                  href={whatsappLink(SERVICES[selected].title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 self-start rounded-full px-6 py-3 text-[13px] font-bold text-white uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(37,211,102,0.3)] font-[family-name:var(--font-montserrat)] animate-[slideRight_0.6s_ease-out]"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                  }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Solicitar
                </a>
              </div>
            </div>

            {/* Bottom services bar */}
            <div
              className="px-4 py-4 overflow-x-auto"
              style={{ background: "rgba(4, 16, 32, 0.9)", borderTop: "1px solid rgba(1,253,254,0.06)" }}
            >
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(i)}
                    className={`whitespace-nowrap text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 font-[family-name:var(--font-montserrat)] ${
                      i === selected
                        ? "text-[#01FDFE] drop-shadow-[0_0_6px_rgba(1,253,254,0.4)]"
                        : "text-white/45 hover:text-white/75"
                    }`}
                  >
                    &gt; {s.short}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
