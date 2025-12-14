import React from "react";
import LogoGif from "../../assets/gifDB.gif";
import Logo from "../../assets/Logo.png";
import { motion } from "framer-motion";
import { slideUp, slipeInFromSide } from "../../utility/animation";

const Hero = () => {
  return (
    <section className="mt-36">
      <article className="grid grid-cols-1 md:grid-cols-2 ">
        {/*TEXTO Y DESCRIPCION*/}
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
            JUEGA YA A DBZ DESDE DONDE TU QUIERAS, ES GRATIS
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            variants={slideUp(1)}
            initial="initial"
            animate="animate"
          >
            <a className="bg-red-500 py-2 px-12 rounded-3x1 text-white hover:bg-red-700 transition-all duration-300 items-center cursor-pointer">
              PLAY
              <i className="bi bi-controller text-xl ml-2"></i>
            </a>
            <a className="text-white flex items-center cursor-pointer">
              VER VIDEO <i className="bi bi-youtube text-xl ml-2"></i>
            </a>
          </motion.div>
        </div>
        {/*Imagen*/}
        <motion.div
          className="flex justify-center items-center p-2 md:p-8 "
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
