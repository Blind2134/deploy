// src/components/Cards/Card.jsx
import React from "react";
import { motion } from "framer-motion";

// 1. Agregamos 'isSelected' a las propiedades que recibe el componente
const Card = ({ item, onClick, isSelected }) => {
  return (
    <motion.div
      layoutId={item.id}
      onClick={() => onClick(item.id)}
      className={`bg-yellow-900/50  border border-white rounded-xl p-4 flex flex-col items-center hover:bg-yellow-800/70 transition-colors cursor-pointer relative z-10 
  ${isSelected ? "opacity-0 scale-95 pointer-events-none" : ""}`}
    >
      <motion.img
        layoutId={`img-${item.id}`}
        src={item.imagen}
        alt={item.nombre}
        className="w-32 h-40 object-contain drop-shadow-lg mb-4"
      />
      <motion.h3
        layoutId={`title-${item.id}`}
        className="text-white text-xl font-bold mb-1"
      >
        {item.nombre}
      </motion.h3>
      <p className="text-white text-sm text-center">{item.descripcion}</p>

      <button className="mt-4 px-4 py-1 bg-red-500 rounded-full text-white text-sm font-semibold cursor-pointer hover:bg-red-600">
        Ver Poder
      </button>
    </motion.div>
  );
};

export default Card;
