import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // Importamos Motion

import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import CardList from "./components/Cards/CardList";
import ContactForm from "./components/Login/ContactForm";

import Fondo from "./assets/Fondo.png";
import gidGoku from "./assets/gidGoku.gif"; // Tu GIF de Goku

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const bgImagen = {
    backgroundImage: `url(${Fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  };

  return (
    <div style={bgImagen} className="overflow-x-hidden min-h-screen">
      {/* AnimatePresence permite animar componentes cuando desaparecen (exit) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }} // Desvanecimiento suave
            className="fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={gidGoku} // Usamos tu gif importado
              alt="Cargando Ki..."
              className="w-64" // Ajusta el tamaño según tu GIF
            />
            <motion.h2
              animate={{ opacity: [0, 1, 0] }} // Parpadeo de Ki
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-orange-500 font-black text-3xl mt-4 uppercase italic tracking-widest"
            >
              Cargando Ki...
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* El contenido principal solo se renderiza bien cuando el loader termina o está oculto */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/nosotros" element={<CardList />} />
            <Route path="/contacto" element={<ContactForm />} />
          </Routes>
        </motion.div>
      )}
    </div>
  );
}

export default App;
