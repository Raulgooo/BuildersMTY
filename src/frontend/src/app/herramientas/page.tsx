"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HerramientasPage() {
  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen terminal-grid flex flex-col items-center justify-center relative overflow-hidden">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-32 w-full max-w-7xl mx-auto z-10">
        <div className="max-w-4xl w-full">
          <header className="mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-[#ffb4a8] animate-pulse shadow-[0_0_8px_rgba(255,180,168,0.6)]"></span>
              <span className="font-label text-[10px] tracking-[0.3em] text-[#ffb4a8] uppercase">
                Protocolo: Showcase de la Comunidad
              </span>
            </div>
            <h1 className="font-headline text-5xl sm:text-6xl md:text-[90px] font-black tracking-tighter uppercase leading-[0.85] text-[#E5E2E1] mb-12 overflow-hidden">
              HERRAMIENTAS <br />
              <span className="text-[#ff5540]">EN DESARROLLO.</span>
            </h1>
            <p className="font-body text-xl sm:text-2xl md:text-3xl text-[#E5E2E1]/70 leading-relaxed tracking-tight font-light max-w-2xl">
              Aquí es donde tu código cobra vida. Este espacio será el <span className="text-white font-normal underline decoration-[#ff5540] underline-offset-8 transition-all hover:text-[#ff5540]">Community Showcase Weekly</span>.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
            <div className="border border-[#603e39]/20 p-8 lg:p-10 bg-[#131313] hover:border-[#ff5540]/50 transition-colors group">
              <div className="font-label text-[10px] text-[#ffb4a8] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                01_VISIBILIDAD_MÁXIMA
              </div>
              <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-[#E5E2E1] mb-4 group-hover:text-[#ff5540] transition-colors">Promoción Directa</h3>
              <p className="text-[#E5E2E1]/60 font-light leading-relaxed text-sm lg:text-base">
                Los proyectos destacados semanalmente recibirán promoción directa a través de nuestra red de anuncios y canales oficiales.
              </p>
            </div>

            <div className="border border-[#603e39]/20 p-8 lg:p-10 bg-[#131313] hover:border-[#ff5540]/50 transition-colors group">
              <div className="font-label text-[10px] text-[#ffb4a8] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">terminal</span>
                02_FEEDBACK_ÉLITE
              </div>
              <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-[#E5E2E1] mb-4 group-hover:text-[#ff5540] transition-colors">Protocolo de Revisión</h3>
              <p className="text-[#E5E2E1]/60 font-light leading-relaxed text-sm lg:text-base">
                Recibe retroalimentación de la red de Builders y escala tu herramienta al siguiente nivel de producción.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            <Link href="/notify" className="w-full sm:w-auto">
              <button className="w-full bg-[#ff5540] text-white font-headline font-bold py-6 px-12 tracking-[0.1em] text-sm hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(255,85,64,0.15)] group">
                NOTIFICARME AL LANZAMIENTO
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <button className="w-full border border-[#603e39] text-[#E5E2E1]/60 font-headline font-bold py-6 px-12 tracking-[0.1em] text-sm hover:bg-[#E5E2E1]/5 hover:text-[#E5E2E1] transition-all active:scale-[0.98] uppercase">
                VOLVER A LA BASE
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Structural Background Decoration */}
      <div className="fixed top-0 right-0 w-1/2 h-full pointer-events-none -z-0 opacity-5 border-l border-[#ffb4a8]/10 hidden lg:block">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-[#ff5540] to-transparent"></div>
        <div className="h-full flex flex-col justify-around p-24">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="font-label text-[8px] tracking-[1em] text-[#ffb4a8] uppercase opacity-20 transform -rotate-90">
              BUILD_OR_DIE_STAY_CONNECTED
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
