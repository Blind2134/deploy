import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/Logo.png";

const InputField = ({
  label,
  icon,
  type = "text",
  placeholder,
  name,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 * index }}
    className="mb-4"
  >
    <label className="block text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wider italic">
      {label}
    </label>
    <div className="relative flex items-center">
      <i className={`bi bi-${icon} absolute left-3 text-orange-500`}></i>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-lg focus:border-orange-500 outline-none transition-all"
      />
    </div>
  </motion.div>
);

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 overflow-hidden">
      {/* SECCIÓN IZQUIERDA: Entrada desde la izquierda (-100) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center p-10"
      >
        <motion.img
          src={logo}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-[300px] md:w-[400px] drop-shadow-2xl"
        />
        <h2 className="text-5xl font-black text-yellow-400 mt-4 italic drop-shadow-lg uppercase text-center">
          {isLogin ? "¡Bienvenido de vuelta!" : "¡Hola Guerrero!"}
        </h2>
        <p className="text-xl font-bold drop-shadow-md bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent uppercase tracking-widest mt-2 text-center">
          {isLogin
            ? "Ingresa tus credenciales para continuar tu aventura."
            : "Crea una cuenta para comenzar tu viaje."}
        </p>
      </motion.div>

      {/* SECCIÓN DERECHA: Entrada desde la derecha (100) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md"
      >
        {/* Usamos layout para que el form se estire suavemente al cambiar de modo */}
        <motion.div
          layout
          className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-t-4 border-orange-500 relative"
        >
          <div className="absolute -z-10 inset-0 bg-orange-400/10 blur-2xl rounded-2xl"></div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase italic">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <InputField
                index={1}
                label="Usuario"
                icon="person"
                name="user"
                placeholder="Tu nombre"
              />

              {!isLogin && (
                <InputField
                  index={2}
                  label="Email"
                  icon="envelope"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                />
              )}

              <InputField
                index={3}
                label="Contraseña"
                icon="lock"
                name="pass"
                type="password"
                placeholder="••••••••"
              />
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(249, 115, 22, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-600 text-white font-black py-3 rounded-lg mt-4 uppercase tracking-widest shadow-lg transition-colors"
          >
            {isLogin ? "Entrar al Juego" : "¡Registrarse!"}
          </motion.button>

          <p className="text-center mt-6 text-gray-600 text-sm font-medium">
            {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600 font-bold hover:underline cursor-pointer transition-all"
            >
              {isLogin ? "Regístrate aquí" : "Inicia Sesión"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
