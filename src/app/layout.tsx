import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://vintiadigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vintia Digital — Agencia Digital y Software a Medida en Arequipa",
    template: "%s | Vintia Digital",
  },
  description:
    "Agencia digital en Arequipa: páginas web, sistemas ERP a medida, control de asistencia con huellero, marketing digital y branding. Mira nuestros proyectos y cotiza el tuyo.",
  keywords: [
    "agencia digital Arequipa",
    "desarrollo web Arequipa",
    "marketing digital Arequipa",
    "branding Arequipa",
    "diseño web",
    "diseño UX/UI",
    "software a medida",
    "ERP a medida Arequipa",
    "sistema ERP personalizado",
    "control de asistencia con huellero",
    "sistema de asistencia biométrico",
    "páginas web Arequipa",
    "publicidad digital Arequipa",
    "correos corporativos",
    "brochure corporativo",
    "SEO",
    "Vintia Digital",
  ],
  authors: [{ name: "Vintia Digital" }],
  creator: "Vintia Digital",
  publisher: "Vintia Digital",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: "Vintia Digital",
    title: "Vintia Digital — Agencia Digital en Arequipa",
    description:
      "Páginas web, sistemas ERP a medida, control de asistencia con huellero, marketing digital y branding para tu negocio en Arequipa.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vintia Digital — Agencia Digital en Arequipa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vintia Digital — Agencia Digital en Arequipa",
    description:
      "Páginas web, ERP a medida, control de asistencia con huellero, marketing digital y branding en Arequipa.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Vintia Digital",
  description:
    "Agencia digital en Arequipa especializada en desarrollo web, sistemas ERP a medida, control de asistencia con huellero, marketing digital, branding y diseño UX/UI.",
  url: SITE_URL,
  knowsAbout: [
    "Desarrollo web",
    "Sistemas ERP a medida",
    "Software a medida",
    "Control de asistencia biométrico",
    "Marketing digital",
    "Publicidad digital",
    "Branding",
    "Diseño UX/UI",
  ],
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/logo-vintia.png`,
  telephone: "+51932525682",
  email: "admin@vintiadigital.com",
  priceRange: "$$",
  areaServed: {
    "@type": "City",
    name: "Arequipa",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arequipa",
    addressRegion: "Arequipa",
    addressCountry: "PE",
  },
  sameAs: [
    "https://www.instagram.com/vintiadigital",
    "https://www.facebook.com/vintiadigital",
    "https://www.linkedin.com/company/vintiadigital",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        {children}
        {/* Vercel Web Analytics (visitas/páginas en el dashboard de Vercel) */}
        <Analytics />
        {/* Google Analytics 4 — se activa al definir NEXT_PUBLIC_GA_ID en Vercel */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
