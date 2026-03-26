"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NotifyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, joinDiscord: boolean = false) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setLoading(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{ name, email }]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      if (joinDiscord) {
        window.open("https://discord.gg/RPqWgsN5H6", "_blank");
      }
    } catch (err: any) {
      console.error("Error submitting lead:", err);
      setError("Error al registrar: " + (err.message || "Inténtalo de nuevo."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen terminal-grid flex flex-col items-center justify-center relative overflow-hidden">
      {/* Back Link */}
      <Link 
        href="/" 
        className="fixed top-8 left-8 z-50 font-label text-[10px] text-[#ffb4a8]/40 hover:text-[#ff5540] transition-colors tracking-[0.4em] uppercase flex items-center gap-4 group"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          VOLVER_INICIO
        </div>
        
      </Link>

      {/* Structural Background Decoration */}
      <div className="fixed top-0 right-0 w-1/3 h-full pointer-events-none -z-0 opacity-10 overflow-hidden hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-l from-[#ffb4a8]/20 to-transparent"></div>
        <div className="w-full h-full flex items-center justify-center p-12">
          <div className="w-full h-full border-l border-b border-[#ffb4a8]/20 relative">
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#ffb4a8]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#ffb4a8]"></div>
          </div>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center px-6 py-20 w-full max-w-7xl mx-auto z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-0 relative">
          {/* Technical Sidebar/Indicator */}
          <div className="hidden md:flex col-span-1 border-r border-[#603e39]/20 pt-4 flex-col gap-32">
            <div className="flex flex-col gap-24">
              <span className="font-label text-[10px] text-[#ffb4a8] rotate-90 origin-left whitespace-nowrap tracking-[0.4em] uppercase">
                {submitted ? "ESTADO_CARGA_EXITO" : "STATUS_SISTEMA_PENDIENTE"}
              </span>
              <span className="font-label text-[10px] text-[#E5E2E1]/30 rotate-90 origin-left whitespace-nowrap tracking-[0.4em] uppercase mt-32">
                REF_ID: BMTY_2024_01
              </span>
            </div>
          </div>

          {/* Content Zone */}
          <div className="col-span-11 md:pl-16 lg:pl-24">
            <header className="mb-16">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className={`w-2 h-2 ${submitted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-[#ff5540] animate-pulse shadow-[0_0_8px_rgba(255,85,64,0.6)]'}`}></span>
                <span className="font-label text-[10px] tracking-[0.3em] text-[#ffb4a8] uppercase">
                  {submitted ? "Protocolo de registro completado" : "Protocolo de inicialización de cola"}
                </span>
              </div>
              <h1 className="font-headline text-6xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] text-[#E5E2E1] mb-10">
                {submitted ? (
                  <>¡ESTÁS <br /><span className="text-green-500">DENTRO.</span></>
                ) : (
                  <>La arena se está <br /><span className="text-[#ff5540]">configurando.</span></>
                )}
              </h1>
              <p className="font-body text-xl md:text-2xl text-[#E5E2E1]/70 max-w-2xl leading-relaxed tracking-tight font-light">
                {submitted 
                  ? "Tu nodo ha sido registrado exitosamente. Prepárate para los próximos commits. Si elegiste Discord, deberías estar redirigiéndote o puedes unirte manualmente."
                  : "Estamos reuniendo suficiente competencia para ti, también estamos trabajando en traer jueces de primer nivel; te avisaremos cuando todo esté listo."
                }
                <span className="block-cursor ml-3"></span>
              </p>
            </header>

            {/* Form Section */}
            {!submitted && (
              <section className="max-w-xl">
                <form className="space-y-16" onSubmit={(e) => handleSubmit(e, true)}>
                  <div className="space-y-10">
                    <div className="relative group">
                      <label className="font-label text-[10px] tracking-[0.3em] text-[#E5E2E1]/40 uppercase mb-3 block group-focus-within:text-[#ffb4a8] transition-colors">
                        01_IDENTIFICADOR
                      </label>
                      <input
                        required
                        className="w-full bg-transparent border-0 border-b border-[#603e39]/40 py-5 font-headline text-2xl text-[#E5E2E1] placeholder:text-[#E5E2E1]/10 transition-all focus:ring-0 focus:border-[#ff5540] outline-none"
                        placeholder="NOMBRE / ALIAS"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="relative group">
                      <label className="font-label text-[10px] tracking-[0.3em] text-[#E5E2E1]/40 uppercase mb-3 block group-focus-within:text-[#ffb4a8] transition-colors">
                        02_NODO_DE_ENLACE
                      </label>
                      <input
                        required
                        className="w-full bg-transparent border-0 border-b border-[#603e39]/40 py-5 font-headline text-2xl text-[#E5E2E1] placeholder:text-[#E5E2E1]/10 transition-all focus:ring-0 focus:border-[#ff5540] outline-none"
                        placeholder="DIRECCIÓN_EMAIL"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 font-label text-[10px] text-red-500 tracking-widest uppercase">
                      [ERROR]: {error}
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <button
                      disabled={loading}
                      className="bg-[#ff5540] text-white font-headline font-bold py-6 px-10 tracking-[0.1em] text-sm hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(255,85,64,0.15)] group disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                    >
                      {loading ? "PROCESANDO..." : "ENVIAR Y UNIRSE A DISCORD"}
                      {!loading && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">terminal</span>}
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={(e) => handleSubmit(e, false)}
                      className="border border-[#603e39] text-[#E5E2E1]/60 font-headline font-bold py-6 px-10 tracking-[0.1em] text-sm hover:bg-[#E5E2E1]/5 hover:text-[#E5E2E1] transition-all active:scale-[0.98] uppercase disabled:opacity-50"
                    >
                      {loading ? "CARGANDO..." : "ENVIAR, ME UNIRÉ CUANDO SEA DIGNO"}
                    </button>
                  </div>
                </form>
              </section>
            )}

            {submitted && (
              <div className="pt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-4 font-headline text-sm font-bold uppercase tracking-[0.2em] text-[#ff5540] hover:translate-x-2 transition-transform"
                >
                  <span className="material-symbols-outlined">west</span>
                  VOLVER A LA BASE
                </Link>
              </div>
            )}

            {/* Data Visualizer Aesthetic Piece */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 border-t border-[#603e39]/10 pt-10">
              {[
                { label: "Nodos_Activos", value: "w-2/3", color: "bg-[#ffb4a8]" },
                { label: "Check_Latencia", value: "w-full", color: "bg-[#603e39]" },
                { label: "Estado_Sync", value: "w-1/2", color: "bg-[#ff5540]" },
                { label: "Carga_Encriptación", value: "w-3/4", color: "bg-[#603e39]" }
              ].map((stat, i) => (
                <div key={i} className="space-y-3">
                  <div className="font-label text-[9px] uppercase tracking-[0.3em] text-[#E5E2E1]/60">
                    {stat.label}
                  </div>
                  <div className="h-[2px] bg-[#603e39]/20 w-full relative">
                    <div className={`h-full ${stat.color} ${stat.value} absolute top-0 left-0`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer id="contacto" className="w-full bg-[#0E0E0E] flex flex-col md:flex-row justify-between items-center px-8 py-20 border-t border-[#201F1F] z-20">
        <div className="flex flex-col gap-6 text-left w-full lg:w-auto">
          <div className="text-3xl font-black text-[#E5E2E1] font-headline uppercase tracking-tighter">
            Builders MTY
          </div>
          <div className="space-y-4">
            <p className="font-label text-sm uppercase tracking-widest text-[#ebbbb4]">
              Conecta conmigo directamente: <a href="mailto:raul@mail.buildersmty.com.mx" className="text-[#ff5540] hover:underline">raul@mail.buildersmty.com.mx</a>
            </p>
            <div className="flex gap-8">
              <a href="#" className="font-label text-[10px] uppercase tracking-[0.4em] text-[#E5E2E1] hover:text-[#ff5540] transition-colors">Linkedin</a>
              <a href="https://github.com/Raulgooo" className="font-label text-[10px] uppercase tracking-[0.4em] text-[#E5E2E1] hover:text-[#ff5540] transition-colors">Github</a>
            </div>
          </div>
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-[#ff5540]/60">
            ©2026 Builders MTY.
          </p>
        </div>
      </footer>
    </div>
  );
}
