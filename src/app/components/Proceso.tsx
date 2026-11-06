import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Analizamos tu negocio, tu competencia y tu presencia digital actual para detectar dónde están las oportunidades reales.",
    color: "#01FDFE",
  },
  {
    n: "02",
    title: "Estrategia",
    text: "Definimos objetivos medibles, tu público ideal y un plan de acción con los canales que de verdad mueven tu negocio.",
    color: "#7B5CE0",
  },
  {
    n: "03",
    title: "Ejecución",
    text: "Diseñamos, desarrollamos y lanzamos: tu web, tu marca, tu contenido, tus campañas o tu software a medida.",
    color: "#B45FE6",
  },
  {
    n: "04",
    title: "Medición y mejora",
    text: "Medimos los resultados, te los reportamos con claridad y optimizamos de forma continua para que sigas creciendo.",
    color: "#FD67EB",
  },
];

export default function Proceso() {
  return (
    <section
      id="proceso"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "#071630" }}
    >
      {/* Subtle grid pattern — sets this section apart from its neighbours */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(1,253,254,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(1,253,254,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left — sticky intro, left-aligned (breaks the centred rhythm) */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]"
              style={{ color: "#01FDFE" }}
            >
              Cómo trabajamos
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-montserrat)]">
              De la idea
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #01FDFE, #5B2FB8, #FD67EB)",
                }}
              >
                a resultados.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/75 sm:text-lg sm:leading-8 font-[family-name:var(--font-open-sans)]">
              Un proceso claro, sin sorpresas. Sabes en todo momento qué estamos
              haciendo, por qué y qué resultado esperar.
            </p>
            <a
              href="#contactanos"
              className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)]"
              style={{ background: "linear-gradient(135deg, #013795, #5B2FB8)" }}
            >
              Empieza con tu diagnóstico
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

          {/* Right — vertical timeline */}
          <ol className="relative">
            {/* Timeline rail */}
            <li
              aria-hidden
              className="absolute left-[27px] top-4 bottom-4 w-px sm:left-[35px]"
              style={{
                background:
                  "linear-gradient(to bottom, #01FDFE, #5B2FB8 50%, #FD67EB)",
                opacity: 0.35,
              }}
            />
            {STEPS.map((step, i) => (
              <li key={step.n} className="pb-12 last:pb-0">
                <Reveal delay={i * 120} className="group relative flex gap-6 sm:gap-8">
                  {/* Number badge */}
                  <div
                    className="relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold transition-transform duration-300 group-hover:scale-110 sm:h-[72px] sm:w-[72px] sm:text-2xl font-[family-name:var(--font-montserrat)]"
                    style={{
                      background: "#071630",
                      border: `1px solid ${step.color}55`,
                      color: step.color,
                      boxShadow: `0 0 30px ${step.color}22`,
                    }}
                  >
                    {step.n}
                  </div>
                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl p-6 transition-colors duration-300 sm:p-7"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <h3 className="text-xl font-bold text-white sm:text-2xl font-[family-name:var(--font-montserrat)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-white/70 sm:text-base font-[family-name:var(--font-open-sans)]">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
