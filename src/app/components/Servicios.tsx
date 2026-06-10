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
      "Lleva la operatividad de tu empresa al siguiente nivel. Desarrollamos soluciones tecnológicas personalizadas para automatizar procesos, integrar sistemas y mejorar la eficiencia interna. Creamos herramientas escalables y seguras que se adaptan exactamente a las necesidades de tu flujo de trabajo, dándote control total sobre tu infraestructura digital.",
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

/* ─── Floating particle for decoration ─── */
function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none animate-[float_6s_ease-in-out_infinite]"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-10px",
        background: "radial-gradient(circle, rgba(1,253,254,0.4), transparent)",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function Servicios() {
  const [selected, setSelected] = useState<number | null>(null);
  const [visible, setVisible] = useState(4);

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

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 768) setVisible(2);
      else if (window.innerWidth < 1024) setVisible(3);
      else setVisible(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

  /* ─── Drag-scroll carousel ─── */
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragMoved = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    dragMoved.current = false;
    // Touch/pen use native scrolling; custom drag is mouse-only.
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const el = scrollRef.current;
    const dx = e.clientX - startX.current;
    // Capture the pointer only once a real drag starts, so plain
    // clicks still reach the cards.
    if (!dragMoved.current && Math.abs(dx) > 4) {
      dragMoved.current = true;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
      el.style.scrollSnapType = "none";
    }
    if (dragMoved.current) {
      el.scrollLeft = scrollLeft.current - dx;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!isDragging.current || !el) return;
    isDragging.current = false;
    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  };

  const scrollByCard = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.firstElementChild?.firstElementChild
      ? (el.firstElementChild.firstElementChild as HTMLElement).offsetWidth
      : 260;
    el.scrollBy({ left: dir * cardW, behavior: "smooth" });
  };

  return (
    <>
      <section
        id="servicios"
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0a0d28 0%, #041020 60%, #041020 100%)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        {/* Ambient glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #5B2FB8 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.07,
          }}
        />
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, #FD67EB 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.07,
          }}
        />

        {/* Floating particles */}
        <Particle delay={0} x={15} size={4} />
        <Particle delay={1.5} x={35} size={3} />
        <Particle delay={3} x={55} size={5} />
        <Particle delay={0.8} x={75} size={3} />
        <Particle delay={2.2} x={90} size={4} />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
          {/* Header */}
          <div className="flex justify-center mb-3">
            <span
              className="text-[10px] font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Lo que hacemos
            </span>
          </div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl font-[family-name:var(--font-montserrat)]">
            <span className="text-white">CONOCE NUESTROS </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
              }}
            >
              SERVICIOS
            </span>
          </h2>
          <div
            className="mx-auto mt-4 mb-6 h-[2px] w-12"
            style={{ background: "linear-gradient(90deg, #01FDFE, #5B2FB8)" }}
          />
          <p className="mx-auto max-w-xl text-center text-sm leading-6 text-white/65 sm:text-base font-[family-name:var(--font-open-sans)]">
            Te ofrecemos los servicios esenciales para hacer crecer tu negocio y
            alcanzar tus objetivos.
          </p>
          </Reveal>

          {/* Master Container */}
          <Reveal delay={150} className="relative mt-10">
            {/* Animated glowing border (behind) */}
            <div
              className="absolute -inset-[1px] rounded-2xl animate-[borderGlow_4s_ease-in-out_infinite] pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB, #013795, #01FDFE)",
                backgroundSize: "300% 300%",
                opacity: 0.5,
              }}
            />
            {/* Blurred glow shadow copy */}
            <div
              className="absolute -inset-[1px] rounded-2xl animate-[borderGlow_4s_ease-in-out_infinite] pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB, #013795, #01FDFE)",
                backgroundSize: "300% 300%",
                opacity: 0.25,
                filter: "blur(12px)",
              }}
            />

            {/* Inner container */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ background: "rgba(10, 22, 40, 0.9)" }}
            >

            {/* Carousel */}
            <div className="relative py-6">
              {/* Prev */}
              <button
                onClick={() => scrollByCard(-1)}
                className="absolute left-1.5 sm:left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:border-[#01FDFE]/40 hover:shadow-[0_0_15px_rgba(1,253,254,0.15)]"
                style={{
                  background: "rgba(4, 16, 32, 0.8)",
                  border: "1px solid rgba(1, 253, 254, 0.15)",
                }}
                aria-label="Anterior"
              >
                <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={() => scrollByCard(1)}
                className="absolute right-1.5 sm:right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:border-[#01FDFE]/40 hover:shadow-[0_0_15px_rgba(1,253,254,0.15)]"
                style={{
                  background: "rgba(4, 16, 32, 0.8)",
                  border: "1px solid rgba(1, 253, 254, 0.15)",
                }}
                aria-label="Siguiente"
              >
                <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Drag-scrollable cards */}
              <div
                ref={scrollRef}
                className="carousel-scroll flex gap-3 sm:gap-4 overflow-x-auto px-10 sm:px-14 pb-2 select-none"
                style={{
                  cursor: "grab",
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
              >
                {SERVICES.map((service, i) => (
                  <div
                    key={service.id}
                    className="flex-shrink-0"
                    style={{
                      width: `calc((100% - ${(visible - 1) * (visible > 2 ? 16 : 12)}px) / ${visible})`,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <button
                      onClick={() => {
                        if (!dragMoved.current) setSelected(i);
                      }}
                      onMouseEnter={() => preloadExpanded(service.imageExpanded)}
                      onTouchStart={() => preloadExpanded(service.imageExpanded)}
                      className="service-card group relative w-full overflow-hidden rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#01FDFE]/60 transition-transform duration-300 hover:-translate-y-1"
                      style={{
                        border: "1px solid rgba(1, 253, 254, 0.18)",
                        boxShadow:
                          "0 8px 28px rgba(0, 0, 0, 0.5), 0 0 18px rgba(1, 253, 254, 0.06)",
                      }}
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                          draggable={false}
                        />

                        {/* Animated border glow on hover */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                          style={{
                            boxShadow:
                              "inset 0 0 30px rgba(1,253,254,0.1), 0 0 40px rgba(91,47,184,0.15), 0 0 80px rgba(1,253,254,0.05)",
                          }}
                        />

                        {/* Hover color sweep */}
                        <div
                          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(1,253,254,0.08) 0%, rgba(91,47,184,0.15) 50%, rgba(253,103,235,0.08) 100%)",
                          }}
                        />

                        {/* Bottom gradient */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(4,16,32,0.95) 0%, rgba(4,16,32,0.4) 35%, transparent 100%)",
                          }}
                        />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                          <h3 className="text-xs sm:text-sm font-bold text-white leading-tight font-[family-name:var(--font-montserrat)] transition-transform duration-300 group-hover:-translate-y-1">
                            {service.title}
                          </h3>
                          <p className="sr-only">{service.description}</p>
                          {/* Always visible on touch (no hover); animated reveal on sm+ */}
                          <div className="flex items-center gap-1.5 mt-2 opacity-90 sm:opacity-0 sm:translate-y-3 transition-all duration-400 sm:group-hover:opacity-100 sm:group-hover:translate-y-0">
                            <span
                              className="h-[1px] w-5 transition-all duration-500 group-hover:w-8"
                              style={{ background: "#01FDFE" }}
                            />
                            <span
                              className="text-[10px] font-semibold tracking-wider uppercase font-[family-name:var(--font-montserrat)]"
                              style={{ color: "#01FDFE" }}
                            >
                              Explorar
                            </span>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="#01FDFE" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Top accent corner */}
                        <div
                          className="absolute top-0 right-0 w-12 h-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(225deg, rgba(1,253,254,0.2) 0%, transparent 70%)",
                          }}
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            </div>{/* close inner container */}
          </Reveal>{/* close master container */}
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
                className="text-[10px] font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
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
                  className="mb-2 text-[10px] font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] animate-[slideRight_0.35s_ease-out]"
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
