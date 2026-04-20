"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuilderCard from "@/components/BuilderCard";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

interface ProfileClientProps {
  username: string;
}

export default function ProfileClient({ username }: ProfileClientProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `${BACKEND_URL}/api/profile/github/${username}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[BuildersMTY] Profile fetch error:", err, "URL:", url);
        setError(true);
        setLoading(false);
      });
  }, [username]);

  return (
    <div className="bg-[var(--surface-0)] font-sans selection:bg-[var(--red)] selection:text-white min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
              <div className="w-12 h-12 border-2 border-[var(--red)] border-t-transparent animate-spin" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--text-ghost)" }}>
                Analizando Builder...
              </span>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
              <div className="w-20 h-20 bg-[var(--surface-1)] border flex items-center justify-center" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="material-symbols-outlined text-[var(--red)] text-4xl">
                  person_off
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-archivo-black)] text-3xl uppercase tracking-tighter" style={{ color: "var(--text-primary)" }}>
                Builder <span className="text-[var(--red)]">No Encontrado</span>
              </h1>
              <p className="text-base max-w-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                El usuario <span className="font-bold text-[var(--text-primary)]">@{username}</span> no ha sido analizado en la red.
                Usa <span className="text-[var(--red)] font-mono">/analyzegit</span> en Discord para registrarlo.
              </p>
              <Link href="https://discord.gg/RPqWgsN5H6">
                <button className="bg-[var(--red)] text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,26,26,0.2)]">
                  Unirse a Discord
                </button>
              </Link>
            </div>
          )}

          {profile && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <div className="font-mono text-[var(--red)] text-[10px] tracking-[0.4em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(212,26,26,0.3)]">
                  PERFIL_DE_BUILDER
                </div>
              </div>

              <BuilderCard profile={profile} />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-12 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <Link href="https://discord.gg/RPqWgsN5H6">
                  <button className="bg-[var(--red)] text-white px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,26,26,0.2)] w-full sm:w-auto">
                    Unirse a BuildersMTY
                  </button>
                </Link>
                <Link href="/">
                  <button className="bg-[var(--surface-1)] text-[var(--text-primary)] px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--surface-2)] transition-all border w-full sm:w-auto" style={{ borderColor: "var(--border)" }}>
                    Volver al Frontend
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
