"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManifestoPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const laws = [
    {
      id: "01",
      title: "LEY_DE_SOBERANÍA",
      headline: "CÓDIGO ES CASTILLO",
      desc: "Tu código es tu castillo. Construimos sistemas que empoderan al individuo, no a la corporación.",
      icon: "fort"
    },
    {
      id: "02",
      title: "LEY_DE_LA_VERDAD",
      headline: "PROD O NADA",
      desc: "La única verdad es el entorno de producción. Si no corre, no existe.",
      icon: "terminal"
    },
    {
      id: "03",
      title: "LEY_DE_VELOCIDAD",
      headline: "EJECUCIÓN > IDEAS",
      desc: "Las ideas son baratas. El shipping es caro. Priorizamos al builder que falla rápido sobre el soñador que nunca empieza.",
      icon: "bolt"
    },
    {
      id: "04",
      title: "LEY_DEL_SINDICATO",
      headline: "LA RED ES ALPHA",
      desc: "Los builders aislados son obsoletos. Operamos como un colectivo de alta densidad de la élite técnica.",
      icon: "hub"
    }
  ];

  const systemManifest = [
    {
      title: "VELOCIDAD PRIMERO",
      desc: "Nuestro estado por defecto es el movimiento. Atravesamos obstáculos con extrema determinación.",
      icon: "speed"
    },
    {
      title: "ARQUITECTURA ABIERTA",
      desc: "Los silos son para sistemas legados. Construimos protocolos modulares, interoperables y resilientes.",
      icon: "settings_input_component"
    },
    {
      title: "SINCERIDAD RADICAL",
      desc: "El feedback directo es el camino más rápido a la optimización. El ego es un bug.",
      icon: "forum"
    }
  ];

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen">
      {/* Top Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full px-6 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "bg-[#131313]/90 backdrop-blur-md border-b border-[#ffb4a8]/10" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-4 text-xl font-bold tracking-tighter text-[#ff5540] font-headline uppercase">
          BUILDERS MTY
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
            ["Manifiesto", "/manifesto"],
            ["Eventos", "/#hackathon"],
            ["Herramientas", "/herramientas"],
            ["Contacto", "/#contacto"],
          ].map(([label, href]) => (
            <Link
              key={label}
              className="font-headline uppercase tracking-widest text-[11px] text-[#E5E2E1] opacity-70 hover:opacity-100 hover:text-[#ffb4a8] transition-all"
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <button className="bg-[#ff5540] text-white px-5 py-2 font-headline text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-transform">
          JOIN_NETWORK
        </button>
      </nav>

      <main className="ghost-grid pt-40 pb-24 border-x border-[#ffb4a8]/10 max-w-[1440px] mx-auto min-h-screen">
        <div className="px-6 lg:px-12">
          {/* Hero Section */}
          <header className="max-w-4xl border-l-[4px] border-[#ff5540] pl-8 py-4 mb-32">
            <h1 className="text-6xl lg:text-[100px] font-headline font-black tracking-tighter uppercase leading-[0.9] mb-8">
              EL<br />
              MANIFIESTO<span className="text-[#ff5540]">.</span>
            </h1>
            <p className="text-xl lg:text-2xl font-body font-light text-[#ebbbb4] leading-relaxed max-w-2xl">
              No somos solo una comunidad. Somos un motor descentralizado para la excelencia técnica. Este es nuestro protocolo.
            </p>
          </header>

          {/* Laws Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#ffb4a8]/10 mb-32 border border-[#ffb4a8]/10">
            {laws.map((law, i) => (
              <div key={law.id} className="bg-[#131313] p-12 lg:p-16 flex flex-col group hover:bg-[#1a1a1a] transition-colors relative overflow-hidden">
                <span className="font-label text-9xl absolute -right-4 -bottom-8 opacity-[0.03] font-black group-hover:text-[#ff5540] group-hover:opacity-[0.05] transition-all">
                  {law.id}
                </span>
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <span className="font-label text-[10px] text-[#ff5540] tracking-[0.4em] uppercase">
                    {law.id} // {law.title}
                  </span>
                  <span className="material-symbols-outlined text-[#ffb4a8]/20 group-hover:text-[#ff5540] transition-colors">
                    {law.icon}
                  </span>
                </div>
                <h2 className="text-4xl font-headline font-bold tracking-tight uppercase mb-6 group-hover:text-white transition-colors relative z-10">
                  {law.headline}
                </h2>
                <p className="text-lg font-body font-light text-[#E5E2E1]/60 leading-relaxed relative z-10 max-w-sm group-hover:text-[#ebbbb4] transition-colors">
                  {law.desc}
                </p>
              </div>
            ))}
          </div>

          {/* System Manifest Section */}
          <section className="py-24 border-t border-[#ffb4a8]/10">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
              <div className="lg:w-1/3">
                <h3 className="font-label text-[11px] text-[#ff5540] tracking-[0.5em] uppercase mb-8">
                  SYSTEM_MANIFEST
                </h3>
                <div className="aspect-square w-full bg-[#201f1f] border border-[#ff5540]/20 relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=512"
                    alt="Radical Tech"
                    fill
                    className="object-cover grayscale contrast-125 hover:scale-110 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="lg:w-2/3 grid gap-12">
                {systemManifest.map((item, i) => (
                  <div key={item.title} className="flex gap-8 group">
                    <div className="w-16 h-16 shrink-0 bg-[#201f1f] border border-[#603e39]/30 flex items-center justify-center group-hover:border-[#ff5540] transition-colors">
                      <span className="material-symbols-outlined text-[#ff5540] text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                <h4 className="font-label font-bold text-xl uppercase tracking-[0.2em] mb-3 group-hover:text-[#ffb4a8] transition-colors">
                  {item.title}
                </h4>
                      <p className="text-lg font-body font-light text-[#E5E2E1]/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer id="contacto" className="w-full px-6 py-20 lg:py-32 flex flex-col lg:flex-row justify-between items-end gap-12 bg-[#0E0E0E] border-t border-[#201F1F]">
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
