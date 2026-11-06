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
      className="relative px-3 py-16 sm:px-5 sm:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 100% 0%, #1b2a8f 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #4a1a8f 0%, transparent 50%), #070b2b",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
        {/* ── Columna izquierda: título (violeta) + contacto (cian) ── */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <Reveal>
            <div
              className="rounded-3xl p-8 sm:p-10"
              style={{
                background: "linear-gradient(140deg, #2b1387 0%, #5B2FB8 60%, #7C4DFF 100%)",
              }}
            >
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
                style={{ color: "#01FDFE" }}
              >
                Preguntas frecuentes
              </span>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl font-[family-name:var(--font-montserrat)]">
                Lo que nos suelen{" "}
                <span style={{ color: "#01FDFE" }}>preguntar.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <a
              href="#contactanos"
              className="group flex items-center justify-between gap-4 rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-8"
              style={{ background: "#01FDFE", color: "#041020" }}
            >
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                  ¿Tienes otra duda?
                </span>
                <p className="mt-2 text-2xl font-extrabold leading-tight font-[family-name:var(--font-montserrat)]">
                  Hablar con Vintia
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#041020] text-white transition-transform duration-300 group-hover:rotate-45">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>

        {/* ── Preguntas: bloque oscuro que se vuelve cian al abrirse ── */}
        <div className="flex flex-col gap-3 lg:col-span-7">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group rounded-3xl border border-white/15 bg-white/[0.07] transition-colors duration-300 open:border-[#01FDFE] open:bg-[#01FDFE]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-7 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-bold text-white group-open:text-[#041020] sm:text-lg font-[family-name:var(--font-montserrat)]">
                    {f.q}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#01FDFE]/50 text-[#01FDFE] transition-transform duration-300 group-open:rotate-45 group-open:border-[#041020]/40 group-open:text-[#041020]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[15px] leading-7 text-[#041020]/85 sm:px-7 sm:pb-7 font-[family-name:var(--font-open-sans)]">
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
