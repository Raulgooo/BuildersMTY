"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const onScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    };
    handleScroll();
  }, []);

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      {/* Top Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? "bg-[#131313]/90 backdrop-blur-md border-b border-[#ffb4a8]/10" : "bg-transparent"
          }`}
      >
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-tighter text-[#ff5540] font-headline uppercase">
            BUILDERS MTY
          </div>
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
            ["Eventos", "#hackathon"],
            ["Herramientas", "/herramientas"],
            ["Contacto", "#contacto"],
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
          <Link href="/notify">UNIRSE A LA RED</Link>
        </button>
      </nav>

      <main className="ghost-grid pt-20">
        {/* Hero Section */}
        <section className="px-6 py-20 lg:py-32 max-w-[1440px] mx-auto min-h-[90vh] flex flex-col justify-center border-x border-[#ffb4a8]/10 relative overflow-hidden">
          {/* Gopher Mascot Mascot - New Approach */}
          <div className="absolute right-[5%] top-0 pointer-events-none z-0 opacity-20">
            <img
              src="/gopher.svg"
              alt="Gopher Mascot"
              className="w-[650px] h-auto grayscale filter contrast-125"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-end justify-between mb-24 relative z-10">
            <div className="max-w-5xl">
              <div className="font-label text-[#ffb4a8] text-[10px] tracking-[0.4em] mb-8 uppercase flex items-center gap-3">
                <span className="w-2 h-2 bg-[#ff5540] animate-pulse"></span>
                La mejor manera de aprender es ejecutando.
              </div>
              <h1 className="text-[14vw] lg:text-[128px] font-headline font-black leading-[0.85] tracking-tighter uppercase mb-10 overflow-hidden">
                BUILD <span className="text-[#ff5540]">OR</span> DIE
              </h1>
              <p className="text-lg lg:text-2xl text-[#ebbbb4] max-w-2xl font-light leading-relaxed">
                Builders MTY es una comunidad iniciada por alumnos de UANL FCFM, con el objetivo de crear una red de talento, conocimiento y herramientas que impulsen el desarrollo de proyectos de estudiantes y profesionales.
              </p>
            </div>
            <div className="flex flex-col gap-3 font-label text-[10px] text-[#ffb4a8]/40 uppercase text-right tracking-widest border-r-2 border-[#ff5540]/20 pr-6">
              <span>Lat: 25.675° N</span>
              <span>Lon: -100.318° W</span>
              <span>Elev: 540m</span>
              <span>Temp: 32°C // OPTIMAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#603e39]/30 bg-[#1c1b1b]/50 backdrop-blur-sm">
            {[
              {
                num: "01",
                title: "EJECUTAR",
                subtitle: "PROTOTIPADO RAPIDO",
                desc: "Nuestra filosofía: Si no funciona, no existe. Fomentamos la creación de herramientas crudas que resuelvan problemas reales de la comunidad antes de siquiera hablar de ellas.",
              },
              {
                num: "02",
                title: "MOSTRAR",
                subtitle: "LANZA TU SOFTWARE",
                desc: "Si tu software funciona pero nadie lo usa, no existe. Queremos ser el spotlight para todos los repositorios de la comunidad.",
              },
              {
                num: "03",
                title: "ALIANZA",
                subtitle: "COLABORA Y COFUNDA",
                desc: "2 cabezas piensan mejor que una. Conecta con otros builders, encuentra cofundadores y lleva tus ideas al siguiente nivel.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`p-10 ${i !== 2 ? "md:border-r border-[#603e39]/30" : ""
                  } hover:bg-[#ff5540]/5 transition-colors group`}
              >
                <span className="font-label text-[10px] text-[#ffb4a8] block mb-6 tracking-widest">
                  {f.num} // {f.title}
                </span>
                <h3 className="font-label font-bold text-sm mb-4 uppercase tracking-[0.2em] text-[#ffb4a8] group-hover:text-[#ff5540] transition-colors">
                  {f.subtitle}
                </h3>
                <p className="text-sm text-[#E5E2E1]/60 leading-relaxed max-w-[280px]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Mission Section */}
        <section id="mission" className="bg-[#1c1b1b] border-y border-[#603e39]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff5540]/5 to-transparent"></div>
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
            <div className="w-full lg:w-[450px] p-12 lg:p-20 border-r border-[#603e39]/20 flex flex-col justify-between min-h-[550px]">
              <h2 className="text-5xl lg:text-6xl font-headline font-black tracking-tighter uppercase leading-[0.85] mb-12">
                01
                <br />
                NUESTRA
                <br />
                MISIÓN
              </h2>
              <div className="space-y-6 font-label text-[11px] text-[#ffb4a8] tracking-[0.2em]">
                {["EL OPEN SOURCE VA PRIMERO"].map((tag) => (
                  <div key={tag} className="flex items-center gap-4 group">
                    <span className="w-3 h-[1px] bg-[#ff5540] group-hover:w-6 transition-all"></span>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-grow flex flex-col">
              <div className="p-8 lg:p-12 border-b border-[#603e39]/10">
                <div className="aspect-[21/9] w-full bg-[#201f1f] relative mb-12 overflow-hidden border border-[#603e39]/30">
                  <Image
                    className="w-full h-full object-cover grayscale brightness-75 contrast-125 hover:scale-105 transition-transform duration-700"
                    alt="Builders MTY Logo"
                    src="/pr1.png"
                    width={1920}
                    height={1080}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
                  <div className="absolute bottom-6 left-6 font-label text-[10px] uppercase tracking-[0.5em] text-[#ffb4a8] flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                    
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                  <div>
                    <h4 className="font-label font-bold text-lg uppercase mb-6 tracking-[0.2em] text-[#ff5540]">
                      Building in Public
                    </h4>
                    <p className="text-[#ebbbb4] leading-relaxed text-base font-light">
                      Creemos en el "Building in Public". Muestra tu codigo, muestra tus demos. Pide feedback y sigue iterando.
                      Mostrar tu software al publico es la mejor manera de conseguir feedback, colaboradores y oportunidades.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-label font-bold text-lg uppercase mb-6 tracking-[0.2em] text-[#ff5540]">
                      Go low-level
                    </h4>
                    <p className="text-[#ebbbb4] leading-relaxed text-base font-light">
                      Todos saben importar librerias, invitamos a los builders a construir soluciones personalizadas, a traer cosas que no existen al mundo y a entender el software por debajo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FindMyPal Section */}
        <section id="findmypal" className="max-w-[1440px] mx-auto px-6 py-24 lg:py-32 border-x border-[#ffb4a8]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-5 sticky top-32">
              <div className="font-label text-[#ffb4a8] text-[10px] tracking-[0.4em] mb-4 uppercase flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#ff5540]"></span>
                Directorio de Élite
              </div>
              <h2 className="text-[70px] lg:text-[90px] font-headline font-black tracking-tighter uppercase mb-6 leading-[0.8] transition-all hover:tracking-[-0.05em]">
                BUILDERS<br /><span className="text-[#ff5540]">NETWORK</span>
              </h2>
              <div className="font-label text-[12px] text-[#ff5540] tracking-[0.2em] uppercase mb-10 block font-bold">
                Vuelvete un Top Builder en MTY. Se indexado.
              </div>
              <p className="text-xl lg:text-2xl text-[#ebbbb4] font-light leading-relaxed max-w-xl">
                Nuestra red indexa tu actividad real: repositorios, contribuciones y consistencia técnica.
                Encuentra co-founders y colaboradores basados en ejecución. Si construyes valor, tu perfil hablará por ti.
              </p>              <div className="space-y-12 mt-16">
                {[
                  { icon: "sync_alt", title: "Sincroniza tu perfil de GitHub ", desc: "Análisis profundo de repositorios, stack tecnológico y consistencia de commits. Tu código es tu única referencia." },
                  { icon: "military_tech", title: "Hackathons", desc: "Insignias de Veteran y Elite en hackathons de BuildersMTY (Solicita verificación para tus hackatones externos!)" },
                  { icon: "leaderboard", title: "Ranking ", desc: "Algoritmo que clasifica a los mejores builders" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="shrink-0 w-14 h-14 bg-[#201f1f] flex items-center justify-center border border-[#603e39]/30 group-hover:border-[#ff5540] transition-colors">
                      <span className="material-symbols-outlined text-[#ff5540] text-3xl transition-transform group-hover:scale-110">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-label font-bold text-sm uppercase tracking-[0.3em] mb-2 text-[#E5E2E1]">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#E5E2E1]/50 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              <div className="font-label text-[10px] uppercase text-right opacity-30 tracking-[0.5em] mb-6">
                Sample_Builder_Nodes
              </div>

              {/* Tier 1: Builder */}
              <div className="bg-[#1c1b1b] border border-[#603e39]/20 p-8 flex items-center gap-8 relative hover:border-[#603e39] transition-all group">
                <div className="w-24 h-24 bg-[#201f1f] shrink-0 border border-[#603e39]/30 overflow-hidden">
                  <Image
                    alt="Builder Avatar"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    src="/image.png"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-headline font-bold text-xl uppercase tracking-widest">
                        PEDRO RAMSES
                      </h5>
                      <p className="font-label text-[10px] text-[#ffb4a8] tracking-widest mt-1">
                        BUILDER
                      </p>
                    </div>
                    <div className="flex gap-1.5 pt-1">
                      {[20, 40, 10, 60].map((op, i) => (
                        <div key={i} className="heatmap-cell bg-[#ff5540]" style={{ opacity: op / 100 }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {["React", "Node.js", "Experto en QRs"].map(tag => (
                      <span key={tag} className="text-[10px] font-label px-3 py-1 border border-[#603e39]/30 uppercase text-[#E5E2E1]/50 tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tier 2: Verified */}
              <div className="bg-[#1c1b1b] border border-[#ff5540]/30 p-8 flex items-center gap-8 relative hover:bg-[#ff5540]/5 transition-all group">
                <div className="w-24 h-24 bg-[#201f1f] shrink-0 border border-[#ff5540]/20 overflow-hidden">
                  <Image
                    alt="Verified Avatar"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all"
                    src="/dog2.png"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-headline font-bold text-xl uppercase tracking-widest">
                        VILETHIAGO
                      </h5>
                      <p className="font-label text-[10px] text-[#ffb4a8] tracking-widest mt-1">
                        ELITE BUILDER
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3 pt-1">
                      <span className="material-symbols-outlined text-[#ff5540] text-xl">
                        verified
                      </span>
                      <div className="flex gap-1.5">
                        {[40, 80, 60, 90].map((op, i) => (
                          <div key={i} className="heatmap-cell bg-[#ff5540]" style={{ opacity: op / 100 }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-[10px] font-label px-3 py-1 border border-[#ff5540]/40 text-[#ffb4a8] uppercase tracking-widest">
                      BuildersMTY HACKATHON 2X
                    </span>
                    {["Rust", "Solana"].map(tag => (
                      <span key={tag} className="text-[10px] font-label px-3 py-1 border border-[#603e39]/30 uppercase text-[#E5E2E1]/50 tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tier 3: Winner/Champion */}
              <div className="bg-[#201f1f] border-2 glow-gold p-10 flex items-center gap-10 relative group transform lg:scale-[1.03] shadow-2xl">
                <div className="absolute -top-4 -right-4 bg-[#FFD700] text-black font-label text-[11px] px-5 py-2 font-black uppercase tracking-[0.2em] shadow-xl">
                  TOP 1%
                </div>
                <div className="w-32 h-32 bg-[#353534] shrink-0 border border-[#FFD700]/50 overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.15)] group-hover:shadow-[0_0_50px_rgba(255,215,0,0.3)] transition-all">
                  <Image
                    alt="Champion Avatar"
                    className="w-full h-full object-cover contrast-150 brightness-110 group-hover:scale-110 transition-transform duration-500"
                    src="/dog3.png"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h5 className="font-headline font-black text-3xl uppercase tracking-tighter text-[#E5E2E1]">
                        ROLANDO OBREGÓN
                      </h5>
                      <p className="font-label text-[12px] text-[#FFD700] font-bold tracking-[0.2em] mt-1">
                        BUILDER LEGEND
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3 pt-1">
                      <span className="material-symbols-outlined text-[#FFD700] text-3xl fill-1 animate-pulse">
                        workspace_premium
                      </span>
                      <div className="flex gap-1.5">
                        {[100, 100, 80, 100].map((op, i) => (
                          <div key={i} className="heatmap-cell bg-[#FFD700]" style={{ opacity: op / 100 }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <span className="text-[11px] font-label px-4 py-1.5 bg-[#FFD700] text-black font-black uppercase tracking-[0.1em]">
                      CONTRIBUIDOR YC
                    </span>
                    <span className="text-[11px] font-label px-4 py-1.5 border border-[#FFD700]/40 text-[#FFD700] uppercase tracking-[0.1em]">
                      GANADOR HACKATHON 12H AGENTIC OBS.
                    </span>
                    <span className="text-[11px] font-label px-4 py-1.5 border border-[#603e39]/30 uppercase text-[#E5E2E1]/40 tracking-widest">
                      Go
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full py-6 mt-6 border border-[#ffb4a8]/20 hover:bg-[#ff5540]/5 font-headline font-bold uppercase tracking-[0.4em] text-sm transition-all flex items-center justify-center gap-4 group">
                UNETE Y MIRA EL DIRECTORIO COMPLETO
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Hackathon Section */}
        <section id="hackathon" className="bg-[#ff5540] text-white py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-black h-full"></div>
              ))}
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
              <div className="lg:w-1/2">
                <h2 className="text-[10vw] lg:text-[100px] font-headline font-black leading-none uppercase tracking-tighter mb-12">
                  12 HORAS.<br />1 GANADOR.
                </h2>
                <div className="space-y-10 mb-16">
                  <p className="text-2xl lg:text-3xl font-light max-w-xl leading-snug">
                    Hackathons, Game Jams, y Hacks de Pentesting.
                    No hay piedad. Eventos online cortos, intensos, jueces increibles y premios que crecen con la cantidad de participantes/equipos. <span className="font-bold underline decoration-4 underline-offset-8">                           La inscripción se usa para el premio en efectivo.</span>
                  </p>
                  <div className="flex flex-col gap-6 font-label text-base uppercase tracking-widest border-l-4 border-white/30 pl-10 py-4">
                    <div className="flex items-center gap-6">
                      <span className="material-symbols-outlined text-3xl">pagos</span>
                      <span className="font-black">Costo de entrada: $100 MXN / Persona</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="material-symbols-outlined text-3xl">grupos</span>
                      <span className="font-black">Modos: Solo / Duo / Squad(2-4)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8 items-start">
                  <div className="flex flex-wrap gap-4">
                    {["HACKATHONS", "GAME JAMS", "PENTESTING"].map(tag => (
                      <span key={tag} className="px-5 py-2 bg-[#131313] text-[#ffb4a8] text-[11px] font-label font-bold uppercase tracking-[0.2em]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href="/notify">
                    <button className="bg-[#131313] text-white px-10 py-6 font-headline font-bold text-sm uppercase tracking-[0.3em] border border-transparent hover:border-[#ffb4a8] transition-all duration-300 active:scale-95 shadow-2xl w-full sm:w-auto">
                      Notificame para el primer evento!
                    </button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 bg-[#131313] p-12 lg:p-20 self-stretch border-l-[16px] border-[#ff5540] shadow-2xl">
                <div className="font-label text-sm mb-12 text-[#ffb4a8] flex items-center gap-4 uppercase tracking-[0.5em]">
                  <span className="block-cursor h-4"></span>
                  Próximos Eventos
                </div>
                <ul className="space-y-10">
                  {[
                    { id: "mtygpt", detail: "Agentes y observabilidad.", date: "Coming soon", loc: "Remoto /Monterrey, MX" },
                    { id: "WASMario Bros", detail: "WASM Game Jam", date: "Coming soon", loc: "Remoto /Monterrey, MX" },
                    { id: "pwn2day", detail: "Competencia de Pentesting.", date: "Coming soon", loc: "Remoto /Monterrey, MX" }
                  ].map((item, i) => (
                    <li key={i} className={`flex justify-between items-center border-b border-[#603e39]/20 pb-8 ${item.date ? "opacity-30" : ""}`}>
                      <div>
                        <div className="font-headline font-bold text-2xl uppercase tracking-tighter mb-2 group-hover:text-[#ff5540]">
                          {item.id}
                        </div>
                        <div className="text-[11px] text-[#ffb4a8] font-label tracking-widest uppercase">
                          {item.detail}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl text-[#ff5540]">{item.date}</div>
                        <div className="text-[11px] opacity-40 uppercase tracking-widest mt-1 font-label">
                          {item.loc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-32 lg:py-48 text-center border-x border-[#ffb4a8]/10">
          <div className="bg-[#1c1b1b] p-12 lg:p-32 border border-[#ff5540]/10 relative group">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#ff5540] transition-all group-hover:w-32 group-hover:h-32"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#ff5540] transition-all group-hover:w-32 group-hover:h-32"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#ff5540] transition-all group-hover:w-32 group-hover:h-32"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#ff5540] transition-all group-hover:w-32 group-hover:h-32"></div>

            <h2 className="text-[8vw] lg:text-[90px] font-headline font-black tracking-tighter uppercase mb-10 leading-none">
              LA RED ES<br /><span className="text-[#ff5540]">TODO</span>
            </h2>
            <p className="text-[#ebbbb4] text-xl lg:text-2xl max-w-2xl mx-auto mb-16 font-light leading-relaxed">
              Accede a canales encriptados. Conecta con builders verificados.
              Asegura tu lugar en la próxima competencia.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <Link href="https://discord.gg/RPqWgsN5H6">
                <button className="w-full md:w-auto bg-[#ff5540] text-white px-16 py-6 font-headline font-bold text-lg uppercase tracking-[0.3em] hover:brightness-110 active:scale-95 transition-all shadow-2xl">
                  Unete a Discord
                </button>
              </Link>
              <Link href="https://github.com/Raulgooo/BuildersMTY">
                <button className="w-full md:w-auto border border-[#603e39] text-[#E5E2E1] px-16 py-6 font-headline font-bold text-lg uppercase tracking-[0.3em] hover:bg-white/5 active:scale-95 transition-all">
                  Repositorio
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="w-full px-6 py-20 lg:py-32 flex flex-col lg:flex-row justify-between items-end gap-12 bg-[#0E0E0E] border-t border-[#201F1F]">
        <div className="flex flex-col gap-6">
          <div className="text-3xl font-black text-[#E5E2E1] font-headline uppercase tracking-tighter">
            Builders MTY
          </div>
          <div className="space-y-4">
            <p className="font-label text-sm uppercase tracking-widest text-[#ebbbb4]">
              Conecta conmigo directamente: <a href="mailto:raul@mail.buildersmty.com.mx" className="text-[#ff5540] hover:underline">raul@mail.buildersmty.com.mx</a>
            </p>
            <div className="flex gap-8">
              <a href="https://www.linkedin.com/in/ra%C3%BAl-r-gonz%C3%A1lez-a39a03347/" className="font-label text-[10px] uppercase tracking-[0.4em] text-[#E5E2E1] hover:text-[#ff5540] transition-colors">Linkedin</a>
              <a href="https://github.com/Raulgooo" className="font-label text-[10px] uppercase tracking-[0.4em] text-[#E5E2E1] hover:text-[#ff5540] transition-colors">Github</a>
            </div>
          </div>
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-[#ff5540]/60">
            ©2026 Builders MTY
          </p>
        </div>
      </footer>
    </div>
  );
}
