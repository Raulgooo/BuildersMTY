"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

function CallbackContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const githubUser = params.get("github_user");
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (status === "analyzing") {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 ghost-grid opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#ff5540]/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#ff5540]/5 blur-[100px] rounded-full"></div>

      <div className="z-10 w-full max-w-2xl">
        {status === "analyzing" ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-[#ff5540]/10 border border-[#ff5540]/20 text-[#ff5540] text-[10px] font-headline tracking-[0.3em] uppercase mb-4">
                Protocolo de Análisis V1.0
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase leading-none text-[#E5E2E1]">
                Analizando <span className="text-[#ff5540]">GitHub</span>
                <span className="block-cursor ml-2"></span>
              </h1>
            </div>

            <div className="ghost-border p-8 bg-[#1a1a1a]/50 backdrop-blur-sm space-y-4">
              <p className="font-mono text-sm text-[#ebbbb4] opacity-80 leading-relaxed">
                <span className="text-[#ff5540] mr-2">➜</span>
                Iniciando escaneo de <span className="text-[#E5E2E1] font-bold">@{githubUser}</span>
              </p>
              <p className="font-mono text-sm text-[#ebbbb4] opacity-80 leading-relaxed">
                <span className="text-[#ff5540] mr-2">➜</span>
                Extrayendo repositorios, commits y contribuciones{dots}
              </p>
              <div className="pt-4 border-t border-[#603e39]/20">
                <p className="text-[#E5E2E1]/60 text-xs italic">
                  El agente BuildersMTY está explorando tu código. Recibirás tu Builder Score en Discord en unos minutos.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-xs h-1 bg-[#1a1a1a] overflow-hidden">
                <div className="h-full bg-[#ff5540] animate-progress-ind"></div>
              </div>
            </div>
          </div>
        ) : status === "error" ? (
          <div className="space-y-8 text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="w-20 h-20 bg-[#ff5540]/10 border border-[#ff5540]/30 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#ff5540] text-4xl">error</span>
            </div>
            
            <h1 className="text-4xl font-black font-headline tracking-tighter uppercase text-[#E5E2E1]">
              Acceso <span className="text-[#ff5540]">Denegado</span>
            </h1>
            
            <p className="text-[#ebbbb4] opacity-80 max-w-sm mx-auto">
              Hubo un problema al procesar tu vinculación de GitHub. El token expiró o la sesión es inválida.
            </p>

            <Link href="/#contacto" className="inline-block">
              <button className="bg-[#ff5540] text-white px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all">
                Intentar por Discord
              </button>
            </Link>
          </div>
        ) : (
             <div className="text-center italic opacity-40">Procesando señal...</div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress-ind {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-ind {
          animation: progress-ind 2s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default function GithubCallbackPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen bg-[#131313] flex items-center justify-center">
          <div className="text-[#ff5540] animate-pulse font-headline tracking-widest text-xs">BUILDERS_SYSTEM_LOADING_AUTH...</div>
        </div>
      }>
        <CallbackContent />
      </Suspense>
    </>
  );
}
