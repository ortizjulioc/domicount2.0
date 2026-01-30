"use client";
import React, { useState } from "react";
import {
  Mail,
  Chrome,
  ArrowRight,
  Trophy,
  UserPlus,
  LogIn,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

// Simulación de la función signIn de NextAuth
const signIn = async (provider, options) => {
  console.log(`Iniciando sesión con: ${provider}`);
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleAuth = async (e, provider) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(provider, { email, callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Error de autenticación", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Configuración dinámica según el estado
  const theme = isLogin
    ? {
        primary: "emerald",
        icon: <Trophy className="text-slate-950 w-8 h-8" />,
        title: "Domi",
        span: "count",
        subtitle: "¡Qué bueno verte de nuevo!",
        buttonText: "Entrar a la mesa",
        accentColor: "bg-emerald-500",
        buttonColor:
          "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20",
        glow: "bg-emerald-900/20",
      }
    : {
        primary: "blue",
        icon: <UserPlus className="text-slate-950 w-8 h-8" />,
        title: "Nueva",
        span: "Cuenta",
        subtitle: "Únete a la liga y guarda tus récords",
        buttonText: "Crear mi perfil",
        accentColor: "bg-blue-500",
        buttonColor: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20",
        glow: "bg-blue-900/20",
      };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100 transition-colors duration-700">
      {/* Elementos Decorativos de Fondo Dinámicos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-[10%] -left-[10%] w-[45%] h-[45%] ${theme.glow} blur-[120px] rounded-full transition-colors duration-700`}
        ></div>
        <div
          className={`absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] ${isLogin ? "bg-slate-900/40" : "bg-indigo-900/20"} blur-[120px] rounded-full transition-colors duration-700`}
        ></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Card Principal */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header con Logo Dinámico */}
          <div className="pt-12 pb-6 px-8 text-center">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 ${theme.accentColor} rounded-2xl mb-6 shadow-lg rotate-3 transition-all duration-500 transform ${!isLogin ? "rotate-[-3deg]" : ""}`}
            >
              {theme.icon}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {theme.title}
              <span
                className={`transition-colors duration-500 ${isLogin ? "text-emerald-500" : "text-blue-500"}`}
              >
                {theme.span}
              </span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium italic">
              {theme.subtitle}
            </p>
          </div>

          <div className="px-8 pb-10">
            {/* Botón de Google */}
            <button
              onClick={() => handleAuth(null, "google")}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 h-12 rounded-xl font-bold hover:bg-slate-100 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Chrome className="w-5 h-5 text-blue-600" />
              )}
              {isLogin ? "Entrar con Google" : "Registrarse con Google"}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f172a] px-4 text-slate-500 font-semibold tracking-widest">
                  O con tu correo
                </span>
              </div>
            </div>

            {/* Formulario de Email */}
            <form
              onSubmit={(e) => handleAuth(e, "email")}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isLogin ? "text-emerald-500/50" : "text-blue-500/50"}`}
                  />
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/30 border border-slate-700 rounded-xl h-12 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${theme.buttonColor} text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg disabled:opacity-70`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {theme.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Ventajas del Registro (Solo visible en Registro) */}
            {!isLogin && (
              <div className="mt-6 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-blue-500" /> Datos
                  Seguros
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Sparkles className="w-3 h-3 text-blue-500" /> Estadísticas
                  Pro
                </div>
              </div>
            )}

            {/* Selector Login / Registro Dinámico */}
            <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="group text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                {isLogin ? (
                  <>
                    <UserPlus className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                    ¿Nuevo aquí?{" "}
                    <span className="text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4">
                      Crea una cuenta
                    </span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                    ¿Ya eres miembro?{" "}
                    <span className="text-emerald-400 font-bold underline decoration-emerald-500/30 underline-offset-4">
                      Inicia sesión
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-slate-600 text-[10px] mt-8 px-4 leading-relaxed uppercase tracking-tighter">
          Domicount v2.0 • Sistema de Gestión de Partidas Profesional
        </p>
      </div>
    </div>
  );
}
