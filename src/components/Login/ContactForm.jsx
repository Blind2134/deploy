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
  // Estado para alternar entre Login y Registro
  const [isLogin, setIsLogin] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 overflow-hidden">
      {/* Sección Izquierda: Logo (fijo) */}
      <motion.div className="flex flex-col items-center justify-center p-10">
        <motion.img
          src={logo}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-[300px] md:w-[400px] drop-shadow-2xl"
        />
        <h2 className="text-5xl font-black text-yellow-400 mt-4 italic drop-shadow-lg uppercase">
          {isLogin ? "¡Bienvenido de vuelta!" : "¡Hola Guerrero!"}
        </h2>
        <p className="text-xl font-bold drop-shadow-md bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent uppercase tracking-widest mt-2">
          {isLogin
            ? "Ingresa tus credenciales para continuar tu aventura."
            : "Crea una cuenta para comenzar tu viaje."}
        </p>
      </motion.div>

      {/* Sección Derecha: El Formulario */}
      <motion.div layout className="z-10 w-full max-w-md">
        <form className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-t-4 border-orange-500">
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
              {/* Campo de Usuario: Se usa en ambos */}
              <InputField
                index={1}
                label="Usuario"
                icon="person"
                name="user"
                placeholder="Tu nombre"
              />

              {/* Campo de Email: SOLO se muestra si NO es login (Registro) */}
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

              {/* Campo de Contraseña: Se usa en ambos */}
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-600 text-white font-black py-3 rounded-lg mt-4 uppercase tracking-widest shadow-lg"
          >
            {isLogin ? "Entrar al Juego" : "¡Registrarse!"}
          </motion.button>

          {/* EL BOTÓN MÁGICO: Cambia el estado */}
          <p className="text-center mt-6 text-gray-600 text-sm font-medium">
            {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <button
              type="button" // Importante: para que no envíe el form
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600 font-bold hover:underline cursor-pointer"
            >
              {isLogin ? "Regístrate aquí" : "Inicia Sesión"}
            </button>
          </p>
        </form>
      </motion.div>
    </main>
  );
}
