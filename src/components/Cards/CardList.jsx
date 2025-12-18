// src/components/Cards/CardList.jsx
import React, { useState } from "react";
import Card from "./Card";
import { personajes } from "../../data/dbzData";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp } from "../../utility/animation"; //

const CardList = () => {
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);

  // 2. Filtramos la lista para la grilla: mostramos todos MENOS el seleccionado (para que parezca que se movió)
  const gridPersonajes = personajes;

  return (
    <section
      id="nosotros"
      className="pt-25 py-10 px-4 md:px-10 flex justify-center flex-col items-center min-h-screen"
    >
      <motion.h2
        variants={slideUp(0.2)}
        initial="initial"
        whileInView="animate" // Usamos whileInView para que se anime cuando haces scroll hacia él
        viewport={{ once: true }} // Para que solo pase una vez
        className="text-4xl text-white font-bold text-center mb-4 drop-shadow-md shrink-0"
      >
        Elige tu Guerrero
      </motion.h2>

      {/* ZONA SUPERIOR: TARJETA EXPANDIDA */}
      {/* Usamos AnimatePresence para que la entrada y salida sean suaves */}
      <AnimatePresence mode="popLayout">
        {selectedPersonaje && (
          <motion.div
            key={selectedPersonaje.id} // ✅ clave correcta
            layoutId="active-card"
            className={`w-full max-w-4xl ${selectedPersonaje.color} border-2 border-white rounded-3xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 shadow-2xl shadow-orange-500/20 shrink-0`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {/* Imagen Grande */}
            <motion.img
              layoutId={`img-${selectedPersonaje.id}`} // ✅
              src={selectedPersonaje.imagen}
              className="w-32 md:w-56 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,165,0,0.6)]"
            />

            {/* Info Extendida */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                layoutId={`title-${selectedPersonaje.id}`} // ✅
                className="text-3xl md:text-4xl font-black text-white mb-2 uppercase italic"
              >
                {selectedPersonaje.nombre}
              </motion.h2>

              <p className="text-purple-100 text-lg mb-6 leading-relaxed">
                {selectedPersonaje.descripcion}
              </p>

              <button
                onClick={() => setSelectedPersonaje(null)} // ✅
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors shadow-lg flex items-center gap-2 mx-auto md:mx-0"
              >
                <i className="bi bi-arrow-down-circle"></i> Volver a la lista
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ZONA INFERIOR: LA GRILLA CON EL RESTO */}
      <motion.div
        layout
        variants={slideUp(0.5)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full"
      >
        {gridPersonajes.map((personaje) => (
          <Card
            key={personaje.id}
            item={personaje}
            onClick={() => setSelectedPersonaje(personaje)}
            isSelected={selectedPersonaje?.id === personaje.id}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default CardList;
