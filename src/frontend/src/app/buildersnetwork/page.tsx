"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BuildersNetworkPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}>
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 lg:px-10 py-32">
        <div className="max-w-2xl w-full text-center space-y-10 animate-fade-up">
          <p className="text-[12px] font-medium tracking-wide" style={{ color: "var(--red)" }}>
            Próximamente
          </p>
          <h1
            className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            Builders<br /><span style={{ color: "var(--red)" }}>Network.</span>
          </h1>
          <p className="text-lg max-w-md mx-auto" style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}>
            Estamos conectando a todos aún. Te informaremos cuando la red esté lista.
          </p>
          <Link href="/notify">
            <button
              className="text-white px-8 py-5 text-[13px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity inline-flex items-center gap-3 mt-4"
              style={{ background: "var(--red)" }}
            >
              Avísame cuando esté listo
              <span className="material-symbols-outlined text-sm">notifications</span>
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
