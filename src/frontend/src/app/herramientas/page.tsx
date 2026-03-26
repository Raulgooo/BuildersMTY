"use client";

import Image from "next/image";
import Link from "next/link";

export default function HerramientasPage() {
  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen terminal-grid flex flex-col items-center justify-center relative overflow-hidden">
      {/* Header Navigation (Standardized) */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-50 bg-[#131313]/80 backdrop-blur-md border-b border-[#201F1F]">
        <div className="flex items-center gap-4 text-xl font-bold tracking-tighter text-[#ff5540] font-headline uppercase">
          <Link href="/">BUILDERS MTY</Link>
          <Image
            src="/builderslogo.svg"
            alt="Builders MTY Logo"
            width={100}
            height={100}
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {[
            ["Inicio", "/"],
            ["Builders Network (Próximamente)", "/buildersnetwork"],
            ["Eventos", "/#hackathon"],
            ["Herramientas", "/herramientas"],
            ["Contacto", "/#contacto"],
          ].map(([label, href]) => (
            <Link
              key={label}
              className="font-headline uppercase tracking-widest text-[11px] text-[#E5E2E1] opacity-70 hover:opacity-100 hover:text-[#ff5540] transition-all"
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <button className="bg-[#ff5540] text-white px-5 py-2 font-headline text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-transform">
          <Link href="/notify">UNIRSE A LA RED</Link>
        </button>
      </nav>

      <main className="flex-grow flex items-center justify-center px-6 py-32 w-full max-w-7xl mx-auto z-10">
        <div className="max-w-4xl w-full">
          <header className="mb-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-[#ffb4a8] animate-pulse shadow-[0_0_8px_rgba(255,180,168,0.6)]"></span>
              <span className="font-label text-[10px] tracking-[0.3em] text-[#ffb4a8] uppercase">
                Protocolo: Showcase de la Comunidad
              </span>
            </div>
            <h1 className="font-headline text-6xl md:text-[90px] font-black tracking-tighter uppercase leading-[0.85] text-[#E5E2E1] mb-12">
              HERRAMIENTAS <br />
              <span className="text-[#ff5540]">EN DESARROLLO.</span>
            </h1>
            <p className="font-body text-2xl md:text-3xl text-[#E5E2E1]/70 leading-relaxed tracking-tight font-light max-w-2xl">
              Aquí es donde tu código cobra vida. Este espacio será el <span className="text-white font-normal underline decoration-[#ff5540] underline-offset-8">Community Showcase Weekly</span>.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="border border-[#603e39]/20 p-10 bg-[#131313] hover:border-[#ff5540]/50 transition-colors group">
              <div className="font-label text-[10px] text-[#ffb4a8] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                01_VISIBILIDAD_MÁXIMA
              </div>
              <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-[#E5E2E1] mb-4">Promoción Directa</h3>
              <p className="text-[#E5E2E1]/60 font-light leading-relaxed">
                Los proyectos destacados semanalmente recibirán promoción directa a través de nuestra red de anuncios y canales oficiales.
              </p>
            </div>

            <div className="border border-[#603e39]/20 p-10 bg-[#131313] hover:border-[#ff5540]/50 transition-colors group">
              <div className="font-label text-[10px] text-[#ffb4a8] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">terminal</span>
                02_FEEDBACK_ÉLITE
              </div>
              <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-[#E5E2E1] mb-4">Protocolo de Revisión</h3>
              <p className="text-[#E5E2E1]/60 font-light leading-relaxed">
                Recibe retroalimentación de la red de Builders y escala tu herramienta al siguiente nivel de producción.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <button className="bg-[#ff5540] text-white font-headline font-bold py-6 px-12 tracking-[0.1em] text-sm hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(255,85,64,0.15)] group">
              <Link href="/notify">NOTIFICARME AL LANZAMIENTO</Link>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button className="border border-[#603e39] text-[#E5E2E1]/60 font-headline font-bold py-6 px-12 tracking-[0.1em] text-sm hover:bg-[#E5E2E1]/5 hover:text-[#E5E2E1] transition-all active:scale-[0.98] uppercase">
              <Link href="/">VOLVER A LA BASE</Link>
            </button>
          </div>
        </div>
      </main>

      {/* Structural Background Decoration */}
      <div className="fixed top-0 right-0 w-1/2 h-full pointer-events-none -z-0 opacity-5 border-l border-[#ffb4a8]/10">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-[#ff5540] to-transparent"></div>
        <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-[#ff5540] to-transparent opacity-50"></div>
        <div className="h-full flex flex-col justify-around p-24">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="font-label text-[8px] tracking-[1em] text-[#ffb4a8] uppercase opacity-20 transform -rotate-90">
              BUILD_OR_DIE_STAY_CONNECTED
            </div>
          ))}
        </div>
      </div>

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
