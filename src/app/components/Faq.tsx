import Reveal from "./Reveal";

const FAQS = [
  {
    q: "¿Desarrollan sistemas ERP a medida?",
    a: "Sí. Diseñamos y programamos sistemas ERP personalizados según la forma de trabajar de cada empresa: inventario, compras, operaciones, caja, personal, reportes y los módulos que necesites. Ya los usan empresas como Aquamater y Regena Perú.",
  },
  {
    q: "¿Cuánto tiempo toma desarrollar un sistema a medida?",
    a: "Un proyecto típico toma alrededor de 10 semanas: descubrimiento (4 días), planificación (5 días), diseño UI/UX (2 semanas), desarrollo (4 semanas), pruebas (2 semanas) y lanzamiento (3 días). El plazo final depende del alcance de cada proyecto.",
  },
  {
    q: "¿Cómo funciona el control de asistencia con huellero?",
    a: "Instalamos un lector biométrico en tu local y lo conectamos a tu sistema. Tu personal marca su entrada y su salida con la huella, y el sistema calcula tardanzas, faltas y salidas anticipadas según el horario o turno de cada empleado. El reporte se puede exportar a Excel.",
  },
  {
    q: "¿Qué incluye el lanzamiento de un proyecto?",
    a: "Nos encargamos del hosting, el dominio, el certificado SSL, el despliegue y el monitoreo de la puesta en marcha.",
  },
  {
    q: "¿Dan soporte después de la entrega?",
    a: "Sí, de forma opcional: mantenimiento, actualizaciones y optimizaciones posteriores al lanzamiento.",
  },
  {
    q: "¿Qué otros servicios ofrecen además de software?",
    a: "Diseño y desarrollo de páginas web, branding e identidad visual, brochures corporativos, correos corporativos, publicidad digital, gestión de redes sociales y producción audiovisual.",
  },
];

/* Datos estructurados: permiten que Google entienda las preguntas y respuestas. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section
      id="preguntas"
      className="relative py-20 sm:py-28"
      style={{ background: "#041020" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
            style={{ color: "#01FDFE" }}
          >
            Preguntas frecuentes
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl font-[family-name:var(--font-montserrat)]">
            Lo que nos
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
              }}
            >
              suelen preguntar.
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/70 font-[family-name:var(--font-open-sans)]">
            ¿Tienes otra duda? Escríbenos y te respondemos.
          </p>
          <a
            href="#contactanos"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-[#01FDFE] transition-opacity hover:opacity-80 font-[family-name:var(--font-montserrat)]"
          >
            Hablar con Vintia
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </Reveal>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details
                className="group rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-bold text-white sm:text-lg font-[family-name:var(--font-montserrat)]">
                    {f.q}
                  </h3>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#01FDFE] transition-transform duration-300 group-open:rotate-45"
                    style={{ border: "1px solid rgba(1, 253, 254, 0.3)" }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-7 text-white/70 sm:px-6 sm:pb-6 font-[family-name:var(--font-open-sans)]">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
