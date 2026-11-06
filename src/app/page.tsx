import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Conocenos from "./components/Conocenos";
import Servicios from "./components/Servicios";
import Proyectos from "./components/Proyectos";
import ErpMedida from "./components/ErpMedida";
import Proceso from "./components/Proceso";
import Faq from "./components/Faq";
import Clientes from "./components/Clientes";
import Contactanos from "./components/Contactanos";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function Home() {
  return (
    <div style={{ background: "#041020" }}>
      {/* Hero takes up viewport minus navbar height */}
      <HeroSection />

      {/*
        Bottom-docked Hero Navigation:
        The navbar sits right after the hero (at the bottom of the first viewport).
        sticky top-0 makes it stick to the top once it reaches it on scroll.
      */}
      <Navbar />

      {/* Conócenos */}
      <Conocenos />

      {/* Testimonios: oculto hasta tener los videos reales de clientes.
          Para reactivarlo: importar Testimonios y devolver el link
          "#testimonios" a Navbar.tsx y Footer.tsx */}

      {/* Servicios */}
      <Servicios />

      {/* Clientes */}
      <Clientes />

      {/* Proyectos */}
      <Proyectos />

      {/* Cómo trabajamos */}
      <Proceso />

      {/* ERP a medida + módulo de asistencia */}
      <ErpMedida />

      {/* Preguntas frecuentes */}
      <Faq />

      {/* Contáctanos */}
      <Contactanos />

      {/* Footer */}
      <Footer />

      {/* Botón flotante de WhatsApp (aparece tras pasar el hero) */}
      <FloatingWhatsApp />
    </div>
  );
}
