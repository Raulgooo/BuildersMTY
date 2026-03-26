"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen flex flex-col pt-32 relative overflow-hidden">
      <Header />

      <main className="flex-grow flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 lg:py-20 max-w-7xl mx-auto w-full gap-16 relative z-10">
        {/* Left Section: Context & Form */}
        <div className="w-full lg:max-w-xl space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className={`w-1.5 h-1.5 ${submitted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-[#ff5540] shadow-[0_0_8px_rgba(255,85,64,0.4)] animate-pulse'}`}></span>
              <span className="font-label text-[10px] tracking-[0.4em] text-[#ffb4a8] uppercase">
                {submitted ? "Protocolo de registro completado" : "Protocolo de Suscripción v.1.0"}
              </span>
            </div>
            <h1 className="font-headline text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#E5E2E1] flex flex-wrap items-end gap-4">
              {submitted ? (
                <>¡ESTÁS <br /><span className="text-green-500">DENTRO.</span></>
              ) : (
                <>ÚNETE A LA <br /><span className="text-[#ff5540]">RED.</span></>
              )}
              <Image
                src="/builderslogo.svg"
                alt="Builders MTY Logo"
                width={80}
                height={80}
                className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain grayscale opacity-50 mb-1 lg:mb-2"
              />
            </h1>
            <p className="font-body text-lg sm:text-xl text-[#E5E2E1]/60 leading-relaxed font-light">
              {submitted 
                ? "Tu nodo ha sido registrado exitosamente. Prepárate para los próximos commits."
                : "Te avisaremos cuando estemos listos. Estamos consiguiendo competencia y jueces increibles para ti."
              }
            </p>
          </header>

          {!submitted ? (
            <form className="space-y-8 group" onSubmit={(e) => handleSubmit(e, true)}>
              <div className="space-y-10">
                <div className="relative group">
                  <label htmlFor="name" className="font-label text-[10px] tracking-[0.3em] text-[#E5E2E1]/40 uppercase mb-3 block group-focus-within:text-[#ffb4a8] transition-colors">
                    01_IDENTIFICADOR
                  </label>
                  <input
                    required
                    id="name"
                    className="w-full bg-transparent border-0 border-b border-[#603e39]/40 py-5 font-headline text-xl sm:text-2xl text-[#E5E2E1] placeholder:text-[#E5E2E1]/10 transition-all focus:ring-0 focus:border-[#ff5540] outline-none"
                    placeholder="NOMBRE / ALIAS"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative group">
                  <label htmlFor="email" className="font-label text-[10px] tracking-[0.3em] text-[#E5E2E1]/40 uppercase mb-3 block group-focus-within:text-[#ffb4a8] transition-colors">
                    02_NODO_DE_ENLACE
                  </label>
                  <input
                    required
                    id="email"
                    className="w-full bg-transparent border-0 border-b border-[#603e39]/40 py-5 font-headline text-xl sm:text-2xl text-[#E5E2E1] placeholder:text-[#E5E2E1]/10 transition-all focus:ring-0 focus:border-[#ff5540] outline-none"
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

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#ff5540] text-white px-10 py-5 font-headline font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  {loading ? "PROCESANDO..." : "UNIRSE A DISCORD."}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">sensors</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, false)}
                  className="w-full sm:w-auto border border-[#603e39] text-[#E5E2E1]/60 font-headline font-bold py-5 px-10 tracking-[0.1em] text-sm hover:bg-[#E5E2E1]/5 hover:text-[#E5E2E1] transition-all active:scale-[0.98] uppercase disabled:opacity-50"
                >
                  {loading ? "CARGANDO..." : "NOTIFICAME POR CORREO. NO ESTOY LISTO PARA DISCORD."}
                </button>
              </div>

              <p className="font-mono text-[9px] text-[#E5E2E1]/30 uppercase tracking-[0.2em] leading-relaxed">
                Al suscribirte, aceptas recibir notificaciones de sistema. <br />
                
              </p>
            </form>
          ) : (
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
        </div>

        {/* Right Section: Technical Sidebar - Hidden on mobile, adjusted for small tablets */}
        <div className="hidden md:flex w-full lg:w-80 flex-col gap-6 font-mono text-[10px] tracking-widest text-[#E5E2E1]/20">
          <div className="border border-[#603e39]/20 p-6 space-y-4 relative bg-[#131313]">
            <div className="absolute -top-px left-8 w-12 h-0.5 bg-[#ff5540]"></div>
            <div className="flex justify-between items-center text-[#ff5540]/60">
              <span>SYS_STATUS</span>
              <span className="animate-pulse">ONLINE</span>
            </div>
            <div className="space-y-2">
              <p>NETWORK_NODE: MTY_CENTRAL_01</p>
              <p>LATENCY: 14MS</p>
              <p>UPTIME: 99.9%</p>
            </div>
          </div>

          <div className="border border-[#603e39]/20 p-6 space-y-2 bg-[#131313]">
            <div className="text-[#E5E2E1]/40 border-b border-[#603e39]/20 pb-2 mb-4">LOG_STREAM</div>
            <p className="animate-pulse flex items-center gap-2">
              <span className="w-1 h-1 bg-[#ff5540]"></span>
              INCOMING_REQUEST... OK
            </p>
            <p className="opacity-50 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#603e39]"></span>
              VALIDATING_CERTIFICATE...
            </p>
            <p className="opacity-30">ENCRYPTING_DATA_STREAM...</p>
            <p className="opacity-10">HANDSHAKE_INITIATED</p>
          </div>

          <div className="mt-8 text-center text-[8px] opacity-10">
            BUILDERS_MTY // 25.6866° N, 100.3161° W
          </div>
        </div>
      </main>

      {/* Decorative Grid Background */}
      <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full ghost-grid opacity-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ff5540]/5 rounded-full blur-[120px]"></div>
      </div>

      <Footer />
    </div>
  );
}
