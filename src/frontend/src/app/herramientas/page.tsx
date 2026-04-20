"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HerramientasPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}>
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 lg:px-10 py-32">
        <div className="max-w-3xl w-full animate-fade-up">
          <p className="text-[12px] font-medium tracking-wide mb-6" style={{ color: "var(--red)" }}>
            Showcase de la Comunidad
          </p>
          <h1
            className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.88] mb-10"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          >
            Herramientas<br /><span style={{ color: "var(--red)" }}>En Desarrollo.</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mb-12" style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}>
            Aquí es donde tu código cobra vida. Este espacio será el{" "}
            <span className="font-bold" style={{ color: "var(--text-primary)" }}>Community Showcase Weekly</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <div className="p-7 group hover:bg-[var(--surface-1)] transition-colors" style={{ border: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-base" style={{ color: "var(--red)" }}>rocket_launch</span>
                <span className="text-[11px] tracking-wide" style={{ color: "var(--text-ghost)" }}>01</span>
              </div>
              <h3 className="font-[family-name:var(--font-archivo-black)] text-lg uppercase tracking-tight mb-3 group-hover:text-[var(--red)] transition-colors">
                Promoción Directa
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                Los proyectos destacados semanalmente recibirán promoción a través de nuestra red de anuncios y canales oficiales.
              </p>
            </div>
            <div className="p-7 group hover:bg-[var(--surface-1)] transition-colors" style={{ border: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-base" style={{ color: "var(--red)" }}>terminal</span>
                <span className="text-[11px] tracking-wide" style={{ color: "var(--text-ghost)" }}>02</span>
              </div>
              <h3 className="font-[family-name:var(--font-archivo-black)] text-lg uppercase tracking-tight mb-3 group-hover:text-[var(--red)] transition-colors">
                Protocolo de Revisión
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                Recibe retroalimentación de la red de Builders y escala tu herramienta al siguiente nivel.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/notify">
              <button className="text-white px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-3" style={{ background: "var(--red)" }}>
                Notifícarme al lanzamiento
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </Link>
            <Link href="/">
              <button className="px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:text-[var(--red)] transition-colors" style={{ border: "1px solid var(--border)", color: "var(--text-tertiary)" }}>
                Volver
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
