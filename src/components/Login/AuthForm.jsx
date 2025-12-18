import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Importamos para navegar al home
import logo from "../../assets/Logo.png";
import { supabase } from "../../data/supabaseClient";

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
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-lg focus:border-orange-500 outline-none transition-all"
      />
    </div>
  </motion.div>
);

export default function AuthForm() {
  // Dentro de tu función AuthForm
  const [notificacion, setNotificacion] = useState({ texto: "", tipo: "" });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate(); // Hook para movernos de página

  const handleAuth = async (e) => {
    e.preventDefault();
    setNotificacion({ texto: "Cargando Ki...", tipo: "loading" });
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") || formData.get("user");
    const password = formData.get("pass");
    const username = formData.get("user");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        setNotificacion({ texto: "¡Bienvenido, Guerrero!", tipo: "success" });
        setTimeout(() => navigate("/"), 1500);
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.get("email"),
          password,
          options: { data: { display_name: username } },
        });
        if (error) throw error;

        setNotificacion({
          texto:
            "¡GUERRERO! Se ha enviado un pergamino (email) de confirmación. Revisa tu bandeja de entrada.",
          tipo: "success",
        });
        // Cambiamos a login automáticamente después de 2 segundos
        setTimeout(() => {
          setIsLogin(true);
          setNotificacion({ texto: "", tipo: "" });
        }, 3000);
      }
    } catch (error) {
      // 2. Manejo de errores visual
      setNotificacion({ texto: error.message, tipo: "error" });
      // Limpiar el error después de 4 segundos
      setTimeout(() => setNotificacion({ texto: "", tipo: "" }), 4000);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 overflow-hidden">
      {/* SECCIÓN IZQUIERDA: Visual */}
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

      {/* SECCIÓN DERECHA: Formulario */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md"
      >
        <motion.div
          layout
          className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-t-4 border-orange-500 relative"
        >
          <div className="absolute -z-10 inset-0 bg-orange-400/10 blur-2xl rounded-2xl"></div>
          <AnimatePresence mode="wait">
            {notificacion.texto && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`mb-4 p-3 rounded-lg text-center font-bold text-xs uppercase italic shadow-sm border-l-4 ${
                  notificacion.tipo === "success"
                    ? "bg-green-100 text-green-700 border-green-500"
                    : notificacion.tipo === "error"
                    ? "bg-red-100 text-red-700 border-red-500"
                    : "bg-blue-100 text-blue-700 border-blue-500"
                }`}
              >
                {notificacion.tipo === "loading" && (
                  <i className="bi bi-arrow-repeat animate-spin mr-2"></i>
                )}
                {notificacion.texto}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth}>
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
                  label="Correo"
                  icon="person"
                  name="user"
                  placeholder="Tu Correo"
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
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(249, 115, 22, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-orange-600 text-white font-black py-3 rounded-lg mt-4 uppercase tracking-widest shadow-lg"
            >
              {isLogin ? "Entrar al Juego" : "¡Registrarse!"}
            </motion.button>
          </form>

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
