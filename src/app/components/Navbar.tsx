"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Conócenos", href: "#conocenos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contáctanos", href: "#contactanos" },
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        isSticky ? "nav-sticky" : ""
      }`}
      style={{
        background: isSticky
          ? "rgba(4, 16, 32, 0.85)"
          : "rgba(4, 16, 32, 0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Glow line on top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#01FDFE]/50 to-transparent" />

      {/* Animated glow effect behind navbar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-[60%] h-[2px] animate-glow-pulse"
          style={{
            background:
              "linear-gradient(90deg, transparent, #01FDFE, #5B2FB8, #FD67EB, transparent)",
          }}
        />
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-[40%] h-8 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, #01FDFE 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5B2FB8]/30 to-transparent" />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative">
            <Image
              src="/logo-vintia.png"
              alt="Vintia Digital"
              width={36}
              height={36}
              className="relative z-10 transition-transform duration-300 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 z-0 rounded-full opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-80"
              style={{
                background:
                  "radial-gradient(circle, #01FDFE 0%, #5B2FB8 60%, transparent 100%)",
              }}
            />
          </div>
          <span className="text-sm font-bold tracking-wider uppercase hidden sm:inline font-[family-name:var(--font-montserrat)]">
            <span className="text-white">Vintia</span>
            <span className="text-[#01FDFE]"> Digital</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-3.5 py-2 text-[13px] font-medium tracking-wide text-white/70 uppercase transition-all duration-300 hover:text-[#01FDFE] group font-[family-name:var(--font-montserrat)]"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-3/4"
                  style={{
                    background:
                      "linear-gradient(90deg, #01FDFE, #5B2FB8)",
                  }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#contactanos"
          className="hidden relative rounded-full px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 lg:inline-block font-[family-name:var(--font-montserrat)] overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #013795, #5B2FB8)",
          }}
        >
          <span className="relative z-10">Hablemos</span>
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, #5B2FB8, #FD67EB)",
            }}
          />
          <div
            className="absolute -inset-1 opacity-0 rounded-full blur-md transition-opacity duration-300 group-hover:opacity-50"
            style={{
              background: "linear-gradient(135deg, #01FDFE, #5B2FB8)",
            }}
          />
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:text-[#01FDFE] lg:hidden"
          aria-label="Abrir menú"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-400 lg:hidden ${
          mobileOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div
          className="px-6 py-4 space-y-1"
          style={{ background: "rgba(4, 16, 32, 0.95)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-[#01FDFE] font-[family-name:var(--font-montserrat)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contactanos"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block rounded-full py-3 text-center text-sm font-bold text-white font-[family-name:var(--font-montserrat)]"
            style={{
              background: "linear-gradient(135deg, #013795, #5B2FB8)",
            }}
          >
            Hablemos
          </a>
        </div>
      </div>
    </nav>
  );
}
