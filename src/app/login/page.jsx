"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Chrome,
  ArrowRight,
  Trophy,
  UserPlus,
  LogIn,
  Loader2,
} from "lucide-react";

/* =======================
   Fondo de partículas DOMINÓ
======================= */
const DominoBackground = () => {
  const [dominoes, setDominoes] = useState([]);

  useEffect(() => {
    const pieces = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `-${Math.random() * 25}s`,
      duration: `${18 + Math.random() * 20}s`,
      size: 28 + Math.random() * 32,
      opacity: 0.08 + Math.random() * 0.12,
      rotation: Math.random() * 360,
      blur: Math.random() > 0.7 ? "blur(1px)" : "none",
    }));
    setDominoes(pieces);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% {
            transform: translate(-60px, -120vh) rotate(var(--rot));
            opacity: 0;
          }
        }
        .domino {
          animation: float var(--dur) linear infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }
      `}</style>

      {dominoes.map((d) => (
        <div
          key={d.id}
          className="absolute domino"
          style={{
            left: d.left,
            bottom: "-15%",
            "--dur": d.duration,
            "--delay": d.delay,
            "--op": d.opacity,
            "--rot": `${d.rotation + 360}deg`,
            filter: d.blur,
          }}
        >
          <svg
            width={d.size}
            height={d.size * 1.8}
            viewBox="0 0 40 72"
            className="text-white"
            style={{ transform: `rotate(${d.rotation}deg)` }}
          >
            <rect
              width="40"
              height="72"
              rx="4"
              fill="white"
              fillOpacity="0.08"
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <line
              x1="5"
              y1="36"
              x2="35"
              y2="36"
              stroke="white"
              strokeOpacity="0.3"
            />

            <circle cx="10" cy="12" r="2.5" fill="white" fillOpacity="0.4" />
            <circle cx="30" cy="24" r="2.5" fill="white" fillOpacity="0.4" />
            <circle cx="10" cy="48" r="2.5" fill="white" fillOpacity="0.4" />
            <circle cx="30" cy="60" r="2.5" fill="white" fillOpacity="0.4" />
          </svg>
        </div>
      ))}
    </div>
  );
};

/* =======================
   Simulación de login
======================= */
const signIn = async () => new Promise((res) => setTimeout(res, 1800));

/* =======================
   Login Page
======================= */
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleAuth = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    await signIn();
    setIsLoading(false);
  };

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  const theme = isLogin
    ? {
        icon: <Trophy className="w-8 h-8 text-slate-950" />,
        title: "Domi",
        span: "count",
        subtitle: "¡Qué bueno verte de nuevo!",
        button: "Entrar a la mesa",
        accent: "bg-emerald-500",
        btn: "bg-emerald-600 hover:bg-emerald-500",
      }
    : {
        icon: <UserPlus className="w-8 h-8 text-slate-950" />,
        title: "Nueva",
        span: "Cuenta",
        subtitle: "Únete y guarda tus récords",
        button: "Crear perfil",
        accent: "bg-blue-500",
        btn: "bg-blue-600 hover:bg-blue-500",
      };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-white">
      <DominoBackground />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl">
          <div className="pt-10 px-8 text-center">
            <div
              className={`mx-auto mb-6 w-16 h-16 ${theme.accent} rounded-2xl flex items-center justify-center rotate-3`}
            >
              {theme.icon}
            </div>
            <h1 className="text-3xl font-bold">
              {theme.title}
              <span className={isLogin ? "text-emerald-500" : "text-blue-500"}>
                {theme.span}
              </span>
            </h1>
            <p className="text-slate-400 italic mt-2">{theme.subtitle}</p>
          </div>

          <div className="px-8 pb-10 mt-6 space-y-6">
            <button
              onClick={handleAuth}
              disabled={isLoading}
              className="w-full h-12 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Chrome className="text-blue-600" />
              )}
              Google
            </button>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full h-12 bg-slate-800/40 border border-slate-700 rounded-xl pl-12 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 rounded-xl font-bold text-white ${theme.btn}`}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {theme.button} <ArrowRight size={16} />
                  </span>
                )}
              </button>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-400 hover:text-white flex items-center justify-center gap-2 mx-auto"
            >
              {isLogin ? <UserPlus size={16} /> : <LogIn size={16} />}
              {isLogin ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
