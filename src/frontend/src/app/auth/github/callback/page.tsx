"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import BuilderCard from "@/components/BuilderCard";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

function CallbackContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const githubUser = params.get("github_user");
  const score = params.get("score");
  const rank = params.get("rank");
  const [dots, setDots] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (status === "analyzing") {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "complete" && githubUser) {
      const url = `${BACKEND_URL}/api/profile/github/${githubUser}`;
      console.log("[BuildersMTY] Fetching profile from:", url);
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            console.error("[BuildersMTY] Profile fetch failed:", res.status, res.statusText);
            setFetchError(`API error: ${res.status}`);
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            console.log("[BuildersMTY] Profile loaded:", data.github_username);
            setProfile(data);
          }
        })
        .catch((err) => {
          console.error("[BuildersMTY] Profile fetch error:", err);
          console.error("[BuildersMTY] BACKEND_URL:", BACKEND_URL);
          setFetchError("No se pudo cargar el perfil. Intenta de nuevo.");
        });
    }
  }, [status, githubUser]);

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 ghost-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#ff5540]/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#ff5540]/5 blur-[100px] rounded-full" />

      <div className="z-10 w-full max-w-2xl">
        {status === "complete" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-block px-3 py-1 bg-[#ff5540]/10 border border-[#ff5540]/20 text-[#ff5540] text-[10px] font-headline tracking-[0.3em] uppercase">
                Análisis Completo
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-headline tracking-tighter uppercase leading-none text-[#E5E2E1]">
                Bienvenido, <span className="text-[#ff5540]">@{githubUser}</span>
              </h1>
              {score && rank && !profile && (
                <p className="font-label text-sm text-[#ebbbb4] tracking-widest uppercase">
                  Score: {score}/100 — {rank.replace("_", " ")}
                </p>
              )}
            </div>

            {/* Profile Card */}
            {profile && <BuilderCard profile={profile} />}

            {/* Debug: show fetch error if profile didn't load */}
            {fetchError && !profile && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 font-mono text-xs text-red-400">
                <p className="font-bold mb-1">Error cargando perfil:</p>
                <p>{fetchError}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/profile/${githubUser}`}>
                <button className="bg-[#ff5540] text-white px-8 py-4 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all">
                  Ver Perfil Público
                </button>
              </Link>
              <Link href="https://discord.gg/RPqWgsN5H6">
                <button className="border border-[#603e39] text-[#E5E2E1] px-8 py-4 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                  Volver a Discord
                </button>
              </Link>
            </div>

            <p className="text-center text-[#E5E2E1]/40 text-xs font-light">
              Tus resultados también fueron enviados a Discord.
            </p>
          </div>
        )}

        {status === "analyzing" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-[#ff5540]/10 border border-[#ff5540]/20 text-[#ff5540] text-[10px] font-headline tracking-[0.3em] uppercase mb-4">
                Protocolo de Análisis V1.0
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase leading-none text-[#E5E2E1]">
                Analizando <span className="text-[#ff5540]">GitHub</span>
                <span className="block-cursor ml-2" />
              </h1>
            </div>

            <div className="ghost-border p-8 bg-[#1a1a1a]/50 backdrop-blur-sm space-y-4">
              <p className="font-mono text-sm text-[#ebbbb4] opacity-80 leading-relaxed">
                <span className="text-[#ff5540] mr-2">→</span>
                Iniciando escaneo de <span className="text-[#E5E2E1] font-bold">@{githubUser}</span>
              </p>
              <p className="font-mono text-sm text-[#ebbbb4] opacity-80 leading-relaxed">
                <span className="text-[#ff5540] mr-2">→</span>
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
                <div className="h-full bg-[#ff5540] animate-progress-ind" />
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
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
            <Link href="https://discord.gg/RPqWgsN5H6">
              <button className="bg-[#ff5540] text-white px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all">
                Intentar por Discord
              </button>
            </Link>
          </div>
        )}

        {!status && (
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
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#131313] flex items-center justify-center">
            <div className="text-[#ff5540] animate-pulse font-headline tracking-widest text-xs">
              BUILDERS_SYSTEM_LOADING_AUTH...
            </div>
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </>
  );
}
