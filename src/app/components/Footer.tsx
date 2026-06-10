import Image from "next/image";

const NAV_LINKS = [
  { label: "Conócenos", href: "#conocenos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contáctanos", href: "#contactanos" },
];

const SOCIALS = [
  {
    href: "https://www.instagram.com/vintiadigital",
    label: "Instagram",
    icon: (
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z" />
    ),
  },
  {
    href: "https://www.facebook.com/vintiadigital",
    label: "Facebook",
    icon: (
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    ),
  },
  {
    href: "https://www.linkedin.com/company/vintiadigital",
    label: "LinkedIn",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#030c18" }}
    >
      {/* Glow line on top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#01FDFE]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <Image
              src="/logo-vintia.png"
              alt="Vintia Digital"
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm font-bold tracking-wider uppercase font-[family-name:var(--font-montserrat)]">
              <span className="text-white">Vintia</span>
              <span className="text-[#01FDFE]"> Digital</span>
            </span>
          </a>

          {/* Links */}
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[11px] font-medium tracking-wider text-white/50 uppercase transition-colors duration-300 hover:text-[#01FDFE] font-[family-name:var(--font-montserrat)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:scale-110 hover:border-[#01FDFE]/40 hover:text-[#01FDFE]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-8 border-t border-white/5 pt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-white/35 font-[family-name:var(--font-open-sans)]">
            © {new Date().getFullYear()} Vintia Digital. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:vintiadigital@gmail.com"
              className="text-[11px] text-white/35 transition-colors duration-300 hover:text-[#01FDFE] font-[family-name:var(--font-open-sans)]"
            >
              vintiadigital@gmail.com
            </a>
            <p className="text-[11px] text-white/35 font-[family-name:var(--font-open-sans)]">
              Arequipa, Perú
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
