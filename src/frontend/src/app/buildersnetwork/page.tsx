"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BuildersNetworkPage() {
  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen flex flex-col pt-32">
      <Header />

      {/* Main Content: Coming Soon Placeholder */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 ghost-grid opacity-20 pointer-events-none"></div>
        
        <div className="max-w-4xl w-full relative z-10 text-center space-y-12 py-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-[#ff5540] animate-pulse shadow-[0_0_8px_rgba(255,85,64,0.6)]"></span>
            <span className="font-label text-[10px] tracking-[0.3em] text-[#ffb4a8] uppercase">
              Inicializando protocolo de conexión...
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-[100px] font-headline font-black tracking-tighter uppercase leading-[0.85] mb-12">
            BUILDERS<br />
            <span className="text-[#ff5540]">NETWORK.</span>
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl font-body font-light text-[#ebbbb4] leading-relaxed">
              Próximamente, estamos conectando a todos aún, te informaremos cuando la red esté lista.
            </p>
            
            <div className="flex flex-col items-center gap-8 pt-10">
              <div className="w-full max-w-md bg-[#201f1f] border border-[#603e39]/30 p-4 font-mono text-[10px] tracking-widest text-[#ff5540]/60 flex flex-col gap-2 relative overflow-hidden">
                <div className="flex justify-between border-b border-[#603e39]/10 pb-2 mb-2">
                  <span>ESTADO_SYNC: PENDIENTE</span>
                  <span>REF: BMTY_NETWORK_INIT</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-2 h-2 bg-[#ff5540]/20 animate-pulse"></span>
                  Buscando nodos en el área de Monterrey... [ERROR: TIMEOUT]
                </div>
                <div className="flex gap-2 items-center text-[#ff5540]">
                  <span className="w-2 h-2 bg-[#ff5540]"></span>
                  ESPERANDO ACTUALIZACIÓN DEL PROTOCOLO...
                </div>
              </div>
              
              <Link
                href="/notify"
                className="bg-[#ff5540] text-white px-8 py-5 font-headline font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-4 text-sm w-full sm:w-auto justify-center"
              >
                AVÍSAME CUANDO ESTÉ LISTO
                <span className="material-symbols-outlined text-sm">notifications</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
