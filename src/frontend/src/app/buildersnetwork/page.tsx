"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BuildersNetworkPage() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const profiles = [
    {
      name: "Diego 'Null' Garza",
      role: "Arquitecto de Sistemas // Dev Low-Level",
      desc: "Obsesionado con la performance y la seguridad de memoria. Construyó un secuenciador L2 personalizado para trading de alta velocidad.",
      level: "GANADOR_CAMPEÓN",
      tier: 1,
      tags: ["Rust", "Solana", "L2"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdaJdCczcQkklxxzgLFVRWkA5oJyPYu3rtP6WmBj1chjRPmPOgEVBhrIwXsfvn-Q0UAhKxrOYlveL8VgWCW0oljYYIGu0Eur0us8RuqRp-uYdSbit80VKcKhJkBMAQvZGWgYO5YxVcitfg80TroJWZZhCDD5mHDL2UybpB-1vcrF6tlXhNtBb3iQgz4Ad5KkHK-p0SV_WaxeDMdkfpITuIVRTqt-sghFqniEOVEAviVgiVVWPLbx85Rw6-zmdWwgZUiaQLx-imaQXK",
      heatmap: [100, 100, 80, 100]
    },
    {
      name: 'Alex "Rax" Rivera',
      role: "Arquitecto Full-stack // Entusiasta de Rust",
      desc: "Especializado en sistemas distribuidos y protocolos zero-knowledge de alto rendimiento. Ganador de EthMexico '23.",
      level: "GANADOR_CAMPEÓN",
      tier: 1,
      tags: ["Rust", "ZKP", "Go"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=1280",
      heatmap: [100, 80, 90, 100]
    },
    {
      name: "Mariana Sanchez",
      role: "UX Engineer // Experta en React",
      desc: "Cerrando la brecha entre la lógica compleja del backend y UI/UX intuitivo. Ha trabajado en más de 4 dApps en producción.",
      level: "ÉLITE",
      tier: 2,
      tags: ["React", "Three.js", "Lead"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdaJdCczcQkklxxzgLFVRWkA5oJyPYu3rtP6WmBj1chjRPmPOgEVBhrIwXsfvn-Q0UAhKxrOYlveL8VgWCW0oljYYIGu0Eur0us8RuqRp-uYdSbit80VKcKhJkBMAQvZGWgYO5YxVcitfg80TroJWZZhCDD5mHDL2UybpB-1vcrF6tlXhNtBb3iQgz4Ad5KkHK-p0SV_WaxeDMdkfpITuIVRTqt-sghFqniEOVEAviVgiVVWPLbx85Rw6-zmdWwgZUiaQLx-imaQXK", // Reuse or placeholder
      heatmap: [40, 80, 60, 90]
    },
    {
      name: "Roberto Beto Valdes",
      role: "AI Researcher // PyTorch Dev",
      desc: "Desarrollando técnicas eficientes de fine-tuning de LLM para dispositivos edge. Colaborador en varios repositorios de ML open-source.",
      level: "ÉLITE",
      tier: 2,
      tags: ["PyTorch", "Python", "ML"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=1280", // Reuse or placeholder
      heatmap: [30, 70, 50, 80]
    },
    {
      name: "Luis Herrera",
      role: "Estudiante de CS // Aprendiendo Go",
      desc: "Curioso sobre la escalabilidad del backend y las bases de datos distribuidas. Explorando el ecosistema de Go.",
      level: "BUILDER",
      tier: 3,
      tags: ["Go", "Docker"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=512",
      heatmap: [20, 10, 30, 20]
    },
    {
      name: "Sofia Paredes",
      role: "Científica de Datos // Pythonista",
      desc: "Trabajando en modelos predictivos para consumo de energía. Interesada en construir herramientas de visualización de datos.",
      level: "PARTICIPANTE_VERIFICADO",
      tier: 3,
      tags: ["Python", "Pandas"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=512",
      heatmap: [40, 30, 50, 40]
    }
  ];

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen flex flex-col pt-32">
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
          UNIRSE A LA RED
        </button>
      </nav>

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
          
          <h1 className="text-6xl md:text-[100px] font-headline font-black tracking-tighter uppercase leading-[0.85] mb-12">
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
                className="bg-[#ff5540] text-white px-8 py-5 font-headline font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-4 text-sm"
              >
                AVÍSAME CUANDO ESTÉ LISTO
                <span className="material-symbols-outlined text-sm">notifications</span>
              </Link>
            </div>
          </div>
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
