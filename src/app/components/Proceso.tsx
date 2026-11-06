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
  color: string;
  steps: Step[];
}

const PHASES: Phase[] = [
  {
    roman: "I",
    name: "Set up",
    tagline: "Entendemos tu negocio y lo aterrizamos en un plan.",
    color: "#01FDFE",
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
    color: "#CDBDFF",
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
    color: "#FF8DF2",
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

const ALL_STEPS = PHASES.flatMap((p) => p.steps.map((s) => ({ ...s, color: p.color })));

export default function Proceso() {
  return (
    <section
      id="proceso"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(140deg, #0a1560 0%, #2b1387 55%, #5B2FB8 100%)" }}
    >
      {/* Subtle grid pattern — sets this section apart from its neighbours */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left — sticky intro */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Nuestro proceso
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
              De la idea
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #01FDFE, #9CB8FF, #FD67EB)",
                }}
              >
                al lanzamiento.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/75 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
              Siete etapas en tres fases, con plazos definidos desde el primer
              día. Sabes en todo momento qué estamos haciendo y qué viene
              después.
            </p>

            {/* Cronograma: barra proporcional a la duración de cada etapa */}
            <div
              className="mt-8 max-w-md rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase font-[family-name:var(--font-montserrat)]">
                  Cronograma referencial
                </span>
                <span className="text-sm font-bold text-white font-[family-name:var(--font-montserrat)]">
                  ≈ 10 semanas
                </span>
              </div>
              <div className="mt-4 flex h-3 w-full gap-[3px]" aria-hidden>
                {ALL_STEPS.map((s) => (
                  <div
                    key={s.n}
                    className="h-full rounded-full"
                    style={{
                      flexGrow: s.days,
                      flexBasis: 0,
                      background: s.color,
                      opacity: s.duration === "Opcional" ? 0.35 : 0.9,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {PHASES.map((p) => (
                  <span
                    key={p.name}
                    className="flex items-center gap-2 text-xs text-white/70 font-[family-name:var(--font-open-sans)]"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                    {p.roman}. {p.name}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-white/50 font-[family-name:var(--font-open-sans)]">
                Plazos de un proyecto de software a medida. Se ajustan al
                alcance de cada proyecto.
              </p>
            </div>

            <a
              href="#contactanos"
              className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold tracking-wider text-[#041020] uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)]"
              style={{ background: "#01FDFE", boxShadow: "0 10px 40px rgba(1,253,254,0.3)" }}
            >
              Agenda tu descubrimiento
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Reveal>

          {/* Right — fases y etapas */}
          <div className="flex flex-col gap-12">
            {PHASES.map((phase) => (
              <div key={phase.name}>
                {/* Phase header */}
                <Reveal>
                  <div className="mb-6 flex items-center gap-4">
                    <span
                      className="shrink-0 rounded-full px-4 py-1.5 text-xs font-extrabold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]"
                      style={{
                        color: phase.color,
                        background: `${phase.color}14`,
                        border: `1px solid ${phase.color}55`,
                      }}
                    >
                      {phase.roman}. {phase.name}
                    </span>
                    <span className="hidden text-sm text-white/55 sm:block font-[family-name:var(--font-open-sans)]">
                      {phase.tagline}
                    </span>
                    <span
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(90deg, ${phase.color}55, transparent)`,
                      }}
                    />
                  </div>
                </Reveal>

                <ol className="relative flex flex-col gap-5">
                  {/* Rail */}
                  <li
                    aria-hidden
                    className="absolute left-[27px] top-4 bottom-4 w-px sm:left-[31px]"
                    style={{ background: phase.color, opacity: 0.25 }}
                  />
                  {phase.steps.map((step, i) => (
                    <li key={step.n}>
                      <Reveal delay={i * 100} className="group relative flex gap-5 sm:gap-6">
                        {/* Number badge */}
                        <div
                          className="relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 sm:text-xl font-[family-name:var(--font-montserrat)]"
                          style={{
                            background: "#1d1479",
                            border: `1px solid ${phase.color}88`,
                            color: phase.color,
                            boxShadow: `0 0 28px ${phase.color}30`,
                          }}
                        >
                          {step.n}
                        </div>
                        {/* Card */}
                        <div
                          className="flex-1 rounded-2xl p-5 sm:p-6"
                          style={{
                            background: "rgba(255,255,255,0.09)",
                            border: "1px solid rgba(255,255,255,0.16)",
                          }}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                            <h3 className="text-lg font-bold text-white sm:text-xl font-[family-name:var(--font-montserrat)]">
                              {step.title}
                            </h3>
                            <span
                              className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase font-[family-name:var(--font-montserrat)]"
                              style={{
                                color: phase.color,
                                background: `${phase.color}12`,
                                border: `1px solid ${phase.color}33`,
                              }}
                            >
                              {step.duration}
                            </span>
                          </div>
                          <p className="mt-2.5 text-[15px] leading-7 text-white/70 font-[family-name:var(--font-open-sans)]">
                            {step.text}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
