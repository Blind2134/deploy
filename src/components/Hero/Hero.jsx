import React from "react";
import LogoGif from "../../assets/gifDB.gif";
import Logo from "../../assets/Logo.png";
import { motion } from "framer-motion";
import { slideUp, slipeInFromSide } from "../../utility/animation";
import { Link } from "react-router-dom";

// 1. Recibimos 'session' como prop desde App.jsx
const Hero = ({ session }) => {
  return (
    <section className="mt-36">
      <article className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 sm:p-10 md:p-15 lg:p-30 xl:p-36">
          <motion.img
            src={Logo}
            alt="Logo"
            variants={slideUp(0.2)}
            initial="initial"
            animate="animate"
          />
          <motion.p
            className="py-12 text-white text-center text-2xl md:text-3xl font-semibold"
            variants={slideUp(0.3)}
            initial="initial"
            animate="animate"
          >
            JUEGA YA A DBZ DESDE DONDE TU QUIERAS, CON 50% DE DESCUENTO
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            variants={slideUp(1)}
            initial="initial"
            animate="animate"
          >
            {/* 2. Lógica Condicional: Si hay sesión, muestra Steam. Si no, Registro */}
            {session ? (
              <a
                href="https://store.steampowered.com/app/1790600/DRAGON_BALL_Sparking_ZERO/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 py-2 px-12 rounded-3xl text-white hover:bg-blue-800 transition-all duration-300 flex items-center cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.5)]"
              >
                JUGAR EN STEAM
                <i className="bi bi-steam text-xl ml-2"></i>
              </a>
            ) : (
              <Link
                to="/contacto"
                className="bg-red-500 py-2 px-12 rounded-3xl text-white hover:bg-red-700 transition-all duration-300 flex items-center cursor-pointer"
              >
                PLAY
                <i className="bi bi-controller text-xl ml-2"></i>
              </Link>
            )}

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/watch?v=_l5rBPYjdw8"
              className="text-white flex items-center cursor-pointer hover:text-red-500 transition-colors"
            >
              VER VIDEO <i className="bi bi-youtube text-xl ml-2"></i>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center items-center p-2 md:p-8"
          variants={slipeInFromSide("right", 0.5)}
          initial="initial"
          animate="animate"
        >
          <img
            src={LogoGif}
            alt="Personaje"
            className="w-full max-w-[600px] h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </article>
    </section>
  );
};

export default Hero;
