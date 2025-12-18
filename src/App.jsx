import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "./data/supabaseClient"; // Asegúrate de que la ruta sea correcta

import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import CardList from "./components/Cards/CardList";
import AuthForm from "./components/Login/AuthForm";

import Fondo from "./assets/Fondo.png";
import gidGoku from "./assets/gidGoku.gif";

function App() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null); // Estado para la sesión

  useEffect(() => {
    // 1. Simulación de carga inicial (tu Loader)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // 2. Revisar si hay sesión activa al cargar la App
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 3. Escuchar cambios en la sesión (Login/Logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
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
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={gidGoku}
              alt="Cargando Ki..."
              className="w-64"
            />
            <motion.h2
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-orange-500 font-black text-3xl mt-4 uppercase italic tracking-widest"
            >
              Cargando Ki...
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Pasamos la sesión al Navbar por si quieres mostrar el nombre o Logout */}
          <Navbar session={session} />

          <Routes>
            {/* Pasamos la sesión al Hero para que el botón cambie */}
            <Route path="/" element={<Hero session={session} />} />
            <Route path="/nosotros" element={<CardList />} />
            <Route path="/contacto" element={<AuthForm />} />
          </Routes>
        </motion.div>
      )}
    </div>
  );
}

export default App;
