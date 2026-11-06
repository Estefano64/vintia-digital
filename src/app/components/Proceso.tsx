import { Fragment } from "react";
import Reveal from "./Reveal";

interface Step {
  n: string;
  title: string;
  duration: string;
  /** Días hábiles aproximados: solo para dimensionar la barra del cronograma. */
  days: number;
  text: string;
}

interface Phase {
  roman: string;
  name: string;
  tagline: string;
  /** Bloque de color sólido que encabeza la fase. */
  tileBg: string;
  tileText: string;
  /** Color de acento en los bloques oscuros de sus etapas. */
  accent: string;
  /** Color del tramo en la barra del cronograma (sobre fondo cian). */
  bar: string;
  steps: Step[];
}

const PHASES: Phase[] = [
  {
    roman: "I",
    name: "Set up",
    tagline: "Entendemos tu negocio y lo aterrizamos en un plan.",
    tileBg: "#01FDFE",
    tileText: "#041020",
    accent: "#01FDFE",
    bar: "#041020",
    steps: [
      {
        n: "01",
        title: "Descubrimiento",
        duration: "4 días",
        days: 4,
        text: "Nos reunimos con los usuarios del negocio para conocer su metodología de trabajo y sus KPIs.",
      },
      {
        n: "02",
        title: "Planificación",
        duration: "5 días",
        days: 5,
        text: "Definimos los módulos, la arquitectura de información, las tecnologías a usar y un cronograma con hitos.",
      },
      {
        n: "03",
        title: "Diseño UI/UX",
        duration: "2 semanas",
        days: 10,
        text: "Preparamos una interfaz visual interactiva para que hagas la primera revisión antes de programar.",
      },
    ],
  },
  {
    roman: "II",
    name: "Launch",
    tagline: "Construimos, probamos y ponemos en marcha.",
    tileBg: "linear-gradient(135deg, #5B2FB8 0%, #7C4DFF 100%)",
    tileText: "#ffffff",
    accent: "#CDBDFF",
    bar: "#5B2FB8",
    steps: [
      {
        n: "04",
        title: "Desarrollo",
        duration: "4 semanas",
        days: 20,
        text: "Trabajamos con metodología ágil: reuniones semanales y entregas parciales que puedes revisar.",
      },
      {
        n: "05",
        title: "Testing y QA",
        duration: "2 semanas",
        days: 10,
        text: "Pruebas de funcionalidad, rendimiento y seguridad en múltiples dispositivos.",
      },
      {
        n: "06",
        title: "Lanzamiento",
        duration: "3 días",
        days: 3,
        text: "Hosting, dominio, SSL, despliegue y monitoreo de la puesta en marcha.",
      },
    ],
  },
  {
    roman: "III",
    name: "Scale",
    tagline: "Seguimos contigo después del lanzamiento.",
    tileBg: "linear-gradient(135deg, #FD67EB 0%, #B56BFF 100%)",
    tileText: "#1a0638",
    accent: "#FF8DF2",
    bar: "#C22FAE",
    steps: [
      {
        n: "07",
        title: "Soporte",
        duration: "Opcional",
        days: 6,
        text: "Mantenimiento, actualizaciones y optimizaciones posteriores.",
      },
    ],
  },
];

const TILE = "h-full rounded-3xl";

export default function Proceso() {
  return (
    <section
      id="proceso"
      className="relative overflow-hidden px-3 py-16 sm:px-5 sm:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 0% 0%, #4b63f2 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, #a44ff2 0%, transparent 55%), #2c2a96",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
        {/* ── Intro (violeta) ── */}
        <Reveal className="sm:col-span-2 lg:col-span-8">
          <div
            className={`${TILE} flex flex-col justify-center p-8 sm:p-12`}
            style={{
              background: "linear-gradient(140deg, #3524c8 0%, #5a33dc 55%, #8152ff 100%)",
            }}
          >
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Nuestro proceso
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
              De la idea{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #01FDFE, #9CB8FF, #FD67EB)",
                }}
              >
                al lanzamiento.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
              Siete etapas en tres fases, con plazos definidos desde el primer
              día. Sabes en todo momento qué estamos haciendo y qué viene
              después.
            </p>
          </div>
        </Reveal>

        {/* ── Cronograma (cian) ── */}
        <Reveal delay={100} className="sm:col-span-2 lg:col-span-4">
          <div
            className={`${TILE} flex flex-col justify-between gap-8 p-8`}
            style={{ background: "#01FDFE", color: "#041020" }}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
              Cronograma referencial
            </span>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-extrabold leading-none sm:text-7xl font-[family-name:var(--font-montserrat)]">
                  ≈10
                </span>
                <span className="text-xl font-extrabold font-[family-name:var(--font-montserrat)]">
                  semanas
                </span>
              </div>
              {/* Barra proporcional a la duración de cada etapa */}
              <div className="mt-6 flex h-3 w-full gap-[3px]" aria-hidden>
                {PHASES.flatMap((p) =>
                  p.steps.map((s) => (
                    <div
                      key={s.n}
                      className="h-full rounded-full"
                      style={{
                        flexGrow: s.days,
                        flexBasis: 0,
                        background: p.bar,
                        opacity: s.duration === "Opcional" ? 0.45 : 1,
                      }}
                    />
                  ))
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {PHASES.map((p) => (
                  <span
                    key={p.name}
                    className="flex items-center gap-1.5 text-xs font-semibold font-[family-name:var(--font-open-sans)]"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: p.bar }} />
                    {p.roman}. {p.name}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 opacity-75 font-[family-name:var(--font-open-sans)]">
                Plazos de un proyecto de software a medida. Se ajustan al
                alcance de cada proyecto.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Fases: un bloque de color por fase + un bloque oscuro por etapa ── */}
        {PHASES.map((phase) => (
          <Fragment key={phase.name}>
            <Reveal className="lg:col-span-3">
              <div
                className={`${TILE} flex min-h-[190px] flex-col justify-between p-6 sm:p-7`}
                style={{ background: phase.tileBg, color: phase.tileText }}
              >
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                  Fase {phase.roman}
                </span>
                <div>
                  <h3 className="text-4xl font-extrabold leading-none sm:text-5xl font-[family-name:var(--font-montserrat)]">
                    {phase.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-5 opacity-85 font-[family-name:var(--font-open-sans)]">
                    {phase.tagline}
                  </p>
                </div>
              </div>
            </Reveal>

            {phase.steps.map((step, i) => (
              <Reveal key={step.n} delay={(i + 1) * 90} className="lg:col-span-3">
                <div
                  className={`${TILE} flex flex-col p-6 sm:p-7`}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="text-3xl font-extrabold leading-none font-[family-name:var(--font-montserrat)]"
                      style={{ color: phase.accent }}
                    >
                      {step.n}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase font-[family-name:var(--font-montserrat)]"
                      style={{
                        color: phase.accent,
                        background: `${phase.accent}14`,
                        border: `1px solid ${phase.accent}44`,
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <h4 className="mt-5 text-xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-[15px] leading-7 text-white/75 font-[family-name:var(--font-open-sans)]">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Tras la última fase, el bloque de cierre completa la fila */}
            {phase.roman === "III" && (
              <Reveal delay={180} className="sm:col-span-2 lg:col-span-6">
                <a
                  href="#contactanos"
                  className={`${TILE} group flex min-h-[190px] flex-col justify-between p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7`}
                  style={{
                    background: "linear-gradient(120deg, #01FDFE 0%, #7CA8FF 55%, #8B5CF6 100%)",
                    color: "#041020",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">
                      ¿Empezamos?
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#041020] text-white transition-transform duration-300 group-hover:rotate-45">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </div>
                  <p className="max-w-md text-3xl font-extrabold leading-tight sm:text-4xl font-[family-name:var(--font-montserrat)]">
                    Agenda tu descubrimiento
                  </p>
                </a>
              </Reveal>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
