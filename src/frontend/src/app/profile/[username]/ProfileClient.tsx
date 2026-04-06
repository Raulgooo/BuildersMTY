"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuilderCard from "@/components/BuilderCard";
import Link from "next/link";

interface ProfileClientProps {
  username: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialProfile: any | null;
}

export default function ProfileClient({ username, initialProfile }: ProfileClientProps) {
  const [profile] = useState(initialProfile);
  const hasProfile = !!profile;

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      <Header />
      <main className="ghost-grid pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {!hasProfile && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
              <div className="w-16 h-16 bg-[#ff5540]/10 border border-[#ff5540]/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ff5540] text-3xl">
                  person_off
                </span>
              </div>
              <h1 className="font-headline font-black text-3xl uppercase tracking-tighter">
                Builder <span className="text-[#ff5540]">no encontrado</span>
              </h1>
              <p className="text-[#ebbbb4] font-light max-w-sm">
                El usuario <span className="text-[#E5E2E1] font-bold">@{username}</span> no ha sido analizado aún.
                Únete a Discord y usa <span className="text-[#ff5540] font-mono">/analyzegit</span> para comenzar.
              </p>
              <Link href="https://discord.gg/RPqWgsN5H6">
                <button className="bg-[#ff5540] text-white px-8 py-4 font-headline text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all">
                  Unirse a Discord
                </button>
              </Link>
            </div>
          )}

          {hasProfile && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="font-label text-[#ff5540] text-[10px] tracking-[0.4em] mb-3 uppercase flex items-center justify-center gap-2">
                  <span className="w-4 h-[1px] bg-[#ff5540]" />
                  PERFIL_DE_BUILDER
                  <span className="w-4 h-[1px] bg-[#ff5540]" />
                </div>
              </div>

              <BuilderCard profile={profile} />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="https://discord.gg/RPqWgsN5H6">
                  <button className="bg-[#ff5540] text-white px-8 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all">
                    Unirse a BuildersMTY
                  </button>
                </Link>
                <Link href="/">
                  <button className="border border-[#603e39] text-[#E5E2E1] px-8 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                    Volver al Inicio
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
