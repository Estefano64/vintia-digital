import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Conocenos from "./components/Conocenos";
import Servicios from "./components/Servicios";
import Proyectos from "./components/Proyectos";
import Clientes from "./components/Clientes";
import Contactanos from "./components/Contactanos";
import Footer from "./components/Footer";

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

      {/* Servicios */}
      <Servicios />

      {/* Proyectos */}
      <Proyectos />

      {/* Testimonios: oculto hasta tener los videos reales de clientes.
          Para reactivarlo: importar Testimonios y devolver el link
          "#testimonios" a Navbar.tsx y Footer.tsx */}

      {/* Clientes */}
      <Clientes />

      {/* Contáctanos */}
      <Contactanos />

      {/* Footer */}
      <Footer />
    </div>
  );
}
