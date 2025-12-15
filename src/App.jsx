import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Fondo from "./assets/Fondo.png";
import CardList from "./components/Cards/CardList";
import { Routes, Route } from "react-router-dom";

function App() {
  const bgImagen = {
    backgroundImage: `url(${Fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    position: "relative",
    backgroundAttachment: "fixed",
  };

  return (
    <div style={bgImagen} className="overflow-x-hidden min-h-screen">
      <Navbar />
      <Routes>
        {/* Ruta INICIO: Muestra solo el Hero */}
        <Route path="/" element={<Hero />} />

        {/* Ruta NOSOTROS: Muestra solo las Cards (El Hero desaparece) */}
        <Route path="/nosotros" element={<CardList />} />
      </Routes>
    </div>
  );
}

export default App;
