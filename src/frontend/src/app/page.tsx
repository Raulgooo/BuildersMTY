import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      <Header />

      <main className="ghost-grid pt-20">
        {/* Hero Section */}
        <section className="px-6 py-20 lg:py-32 max-w-[1440px] mx-auto min-h-[90vh] flex flex-col justify-center border-x border-[#ffb4a8]/10 relative overflow-hidden">
          {/* Gopher Mascot */}
          <div className="absolute -right-20 lg:right-[5%] top-10 lg:top-0 pointer-events-none z-0 opacity-10 lg:opacity-20 transition-all duration-[4000ms]">
            <img
              src="/gopher.svg"
              alt="Gopher Mascot"
              className="w-[300px] sm:w-[500px] lg:w-[650px] h-auto grayscale filter contrast-125 transition-all"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-end justify-between mb-24 relative z-10">
            <div className="max-w-5xl">
              <div className="font-label text-[#ffb4a8] text-[9px] sm:text-[10px] tracking-[0.4em] mb-8 uppercase flex items-center gap-3">
                <span className="w-2 h-2 bg-[#ff5540] animate-pulse"></span>
                La mejor manera de aprender es ejecutando.
              </div>
              <h1 className="text-[16vw] sm:text-[14vw] lg:text-[128px] font-headline font-black leading-[0.85] tracking-tighter uppercase mb-10 overflow-hidden">
                BUILD <span className="text-[#ff5540]">OR</span> DIE
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#ebbbb4] max-w-2xl font-light leading-relaxed">
                Builders MTY es una comunidad iniciada por alumnos de UANL FCFM, con el objetivo de crear una red de talento, conocimiento y herramientas que impulsen el desarrollo de proyectos de estudiantes y profesionales.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 font-label text-[10px] text-[#ffb4a8]/40 uppercase text-left lg:text-right tracking-widest border-l-2 lg:border-l-0 lg:border-r-2 border-[#ff5540]/20 pl-6 lg:pl-0 lg:pr-6 mt-8 lg:mt-0">
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
                className={`p-8 lg:p-10 ${i !== 2 ? "md:border-r border-[#603e39]/30 border-b md:border-b-0" : ""
                  } hover:bg-[#ff5540]/5 transition-colors group`}
              >
                <span className="font-label text-[10px] text-[#ffb4a8] block mb-6 tracking-widest">
                  {f.num} // {f.title}
                </span>
                <h3 className="font-label font-bold text-sm mb-4 uppercase tracking-[0.2em] text-[#ffb4a8] group-hover:text-[#ff5540] transition-colors">
                  {f.subtitle}
                </h3>
                <p className="text-sm text-[#E5E2E1]/60 leading-relaxed max-w-full lg:max-w-[280px]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Mission Section */}
        <section id="mission" className="bg-[#1c1b1b] border-y border-[#603e39]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-[#ff5540]/5 to-transparent"></div>
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
            <div className="w-full lg:w-[450px] p-10 lg:p-20 border-b lg:border-b-0 lg:border-r border-[#603e39]/20 flex flex-col justify-between min-h-auto lg:min-h-[550px]">
              <h2 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter uppercase leading-[0.85] mb-12">
                01
                <br />
                NUESTRA
                <br />
                MISIÓN
              </h2>
              <div className="space-y-4 lg:space-y-6 font-label text-[11px] text-[#ffb4a8] tracking-[0.2em]">
                {["EL OPEN SOURCE VA PRIMERO"].map((tag) => (
                  <div key={tag} className="flex items-center gap-4 group">
                    <span className="w-3 h-[1px] bg-[#ff5540] group-hover:w-6 transition-all"></span>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-grow flex flex-col">
              <div className="p-6 lg:p-12 border-b border-[#603e39]/10">
                <div className="aspect-video lg:aspect-[21/9] w-full bg-[#201f1f] relative mb-8 lg:mb-12 overflow-hidden border border-[#603e39]/30">
                  <Image
                    className="w-full h-full object-cover grayscale brightness-75 contrast-125 hover:scale-105 transition-transform duration-700"
                    alt="Builders MTY Demo"
                    src="/pr1.png"
                    width={1920}
                    height={1080}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24">
                  <div>
                    <h4 className="font-label font-bold text-lg uppercase mb-4 lg:mb-6 tracking-[0.2em] text-[#ff5540]">
                      Building in Public
                    </h4>
                    <p className="text-[#ebbbb4] leading-relaxed text-base font-light">
                      Creemos en el "Building in Public". Muestra tu codigo, muestra tus demos. Pide feedback y sigue iterando.
                      Mostrar tu software al publico es la mejor manera de conseguir feedback, colaboradores y oportunidades.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-label font-bold text-lg uppercase mb-4 lg:mb-6 tracking-[0.2em] text-[#ff5540]">
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

        {/* Courses Section */}
        <section id="cursos" className="max-w-[1440px] mx-auto px-6 py-20 lg:py-32 border-x border-[#ffb4a8]/10">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <div className="font-label text-[#ff5540] text-[10px] sm:text-[11px] tracking-[0.4em] mb-6 uppercase flex items-center gap-3 font-bold">
              <span className="w-6 h-[1px] bg-[#ff5540]"></span>
              CURSOS_COMUNITARIOS
            </div>
            <h2 className="text-[12vw] sm:text-[10vw] lg:text-[80px] font-headline font-black tracking-tighter uppercase mb-8 leading-[0.8]">
              APRENDE<br /><span className="text-[#ff5540]">CONSTRUYENDO</span>
            </h2>
            <p className="text-xl lg:text-2xl text-[#ebbbb4] font-light leading-relaxed max-w-2xl">
              Cursos gratuitos creados por la comunidad. Aprende las herramientas que los builders usan en producción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "memory",
                title: "Crea tu Propio Alocador de Memoria en C",
                difficulty: "AVANZADO",
                desc: "Construye un memory allocator desde cero. Entiende cómo funciona malloc, free y la gestión de memoria a nivel de sistema operativo.",
                learns: [
                  "Gestión de memoria virtual y páginas",
                  "Implementación de malloc/free con listas libres",
                  "Fragmentación, coalescing y alineamiento",
                  "Debugging con Valgrind y AddressSanitizer",
                ],
                href: "/auth/courses",
                cta: "Ir al curso",
              },
              {
                icon: "dns",
                title: "Crea tu Servidor HTTP con Go",
                difficulty: "INTERMEDIO",
                desc: "Implementa un servidor HTTP desde el socket TCP hasta el routing. Sin frameworks, sin magia — solo Go y la standard library.",
                learns: [
                  "Sockets TCP y el protocolo HTTP/1.1",
                  "Goroutines y concurrencia para conexiones simultáneas",
                  "Parsing de requests y construcción de responses",
                  "Middleware, routing y manejo de archivos estáticos",
                ],
                href: "/auth/courses",
                cta: "Ir al curso",
              },
              {
                icon: "smart_toy",
                title: "Crea tu Propio Claude Code",
                difficulty: "AVANZADO",
                desc: "Construye un agente de código con IA que lee, edita y ejecuta en tu terminal. Aprende cómo funcionan los coding agents por dentro.",
                learns: [
                  "Arquitectura de agentes con tool-use y loops",
                  "Integración con APIs de LLMs (Claude, OpenAI)",
                  "Sandboxing y ejecución segura de comandos",
                  "Context management y streaming de respuestas",
                ],
                href: null,
                cta: "Próximamente",
              },
            ].map((course, i) => (
              <div
                key={i}
                className="bg-[#1c1b1b]/50 border border-[#603e39]/20 p-6 lg:p-8 hover:border-[#ff5540]/30 transition-all group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-[#201f1f] flex items-center justify-center border border-[#603e39]/30 group-hover:border-[#ff5540] transition-colors">
                      <span className="material-symbols-outlined text-[#ff5540] text-xl">
                        {course.icon}
                      </span>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 bg-[#ff5540]/10 text-[#ff5540] border border-[#ff5540]/20 font-label tracking-widest">
                      {course.difficulty}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-lg uppercase tracking-tight text-white mb-3 group-hover:text-[#ff5540] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#E5E2E1]/50 leading-relaxed mb-4">
                    {course.desc}
                  </p>
                  <div className="mb-6">
                    <span className="text-[9px] font-label font-bold text-[#ff5540] tracking-[0.2em] uppercase mb-2 block">
                      APRENDERÁS
                    </span>
                    <ul className="space-y-1.5">
                      {course.learns.map((item, j) => (
                        <li key={j} className="text-xs text-[#E5E2E1]/40 flex items-start gap-2">
                          <span className="text-[#ff5540]/60 mt-0.5 text-[8px]">&#9654;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#603e39]/10">
                  {course.href ? (
                    <Link href={course.href}>
                      <button className="w-full border border-[#ff5540]/30 text-[#ff5540] px-6 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540] hover:text-white transition-all">
                        {course.cta}
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="w-full border border-[#603e39]/20 text-[#E5E2E1]/20 px-6 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] cursor-not-allowed flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#ff5540]/30 animate-pulse"></span>
                      {course.cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="https://discord.gg/RPqWgsN5H6">
              <button className="border border-[#603e39]/30 text-[#E5E2E1]/60 px-8 py-4 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#ff5540]/40 hover:text-[#ff5540] transition-all">
                Quiero contribuir un curso
              </button>
            </Link>
          </div>
        </section>

        {/* FindMyPal Section */}
        <section id="findmypal" className="max-w-[1440px] mx-auto px-6 py-20 lg:py-32 border-x border-[#ffb4a8]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="font-label text-[#ffb4a8] text-[10px] tracking-[0.4em] mb-4 uppercase flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#ff5540]"></span>
                Directorio de Élite
              </div>
              <h2 className="text-[12vw] sm:text-[10vw] lg:text-[90px] font-headline font-black tracking-tighter uppercase mb-6 leading-[0.8] transition-all hover:tracking-[-0.05em]">
                BUILDERS<br /><span className="text-[#ff5540]">NETWORK</span>
              </h2>
              <div className="font-label text-[12px] text-[#ff5540] tracking-[0.2em] uppercase mb-10 block font-bold">
                Vuelvete un Top Builder en MTY. Se indexado.
              </div>
              <p className="text-xl lg:text-2xl text-[#ebbbb4] font-light leading-relaxed max-w-xl">
                Nuestra red indexa tu actividad real: repositorios, contribuciones y consistencia técnica.
                Encuentra co-founders y colaboradores basados en ejecución. Si construyes valor, tu perfil hablará por ti.
              </p>
              <div className="space-y-10 lg:space-y-12 mt-12 lg:mt-16">
                {[
                  { icon: "sync_alt", title: "Sincroniza tu perfil de GitHub ", desc: "Análisis profundo de repositorios, stack tecnológico y consistencia de commits. Tu código es tu única referencia." },
                  { icon: "military_tech", title: "Hackathons", desc: "Insignias de Veteran y Elite en hackathons de BuildersMTY." },
                  { icon: "leaderboard", title: "Ranking ", desc: "Algoritmo que clasifica a los mejores builders" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 lg:gap-8 group">
                    <div className="shrink-0 w-12 lg:w-14 h-12 lg:h-14 bg-[#201f1f] flex items-center justify-center border border-[#603e39]/30 group-hover:border-[#ff5540] transition-colors">
                      <span className="material-symbols-outlined text-[#ff5540] text-2xl lg:text-3xl transition-transform group-hover:scale-110">
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

            <div className="lg:col-span-7 space-y-8 lg:space-y-10">
              <div className="font-label text-[10px] uppercase text-right opacity-30 tracking-[0.5em] mb-6">
                Sample_Builder_Nodes
              </div>

              {/* Tier 1: Builder */}
              <div className="bg-[#1c1b1b] border border-[#603e39]/20 p-6 lg:p-8 flex items-center gap-6 lg:gap-8 relative hover:border-[#603e39] transition-all group">
                <div className="w-20 lg:w-24 h-20 lg:h-24 bg-[#201f1f] shrink-0 border border-[#603e39]/30 overflow-hidden">
                  <Image
                    alt="Builder Avatar"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    src="/image.png"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="truncate">
                      <h5 className="font-headline font-bold text-lg lg:text-xl uppercase tracking-widest truncate">
                        PEDRO RAMSES
                      </h5>
                      <p className="font-label text-[9px] text-[#ffb4a8] tracking-widest mt-1">
                        BUILDER
                      </p>
                    </div>
                    <div className="hidden sm:flex gap-1.5 pt-1">
                      {[20, 40, 10, 60].map((op, i) => (
                        <div key={i} className="heatmap-cell bg-[#ff5540]" style={{ opacity: op / 100 }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 lg:gap-3 overflow-x-auto no-scrollbar">
                    {["React", "Node.js"].map(tag => (
                      <span key={tag} className="text-[9px] lg:text-[10px] font-label px-2 lg:px-3 py-1 border border-[#603e39]/30 uppercase text-[#E5E2E1]/50 tracking-widest whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tier 2: Verified */}
              <div className="bg-[#1c1b1b] border border-[#ff5540]/30 p-6 lg:p-8 flex items-center gap-6 lg:gap-8 relative hover:bg-[#ff5540]/5 transition-all group">
                <div className="w-20 lg:w-24 h-20 lg:h-24 bg-[#201f1f] shrink-0 border border-[#ff5540]/20 overflow-hidden">
                  <Image
                    alt="Verified Avatar"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all"
                    src="/dog2.png"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="truncate">
                      <h5 className="font-headline font-bold text-lg lg:text-xl uppercase tracking-widest truncate">
                        VILETHIAGO
                      </h5>
                      <p className="font-label text-[9px] text-[#ffb4a8] tracking-widest mt-1">
                        ELITE BUILDER
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 pt-1">
                      <span className="material-symbols-outlined text-[#ff5540] text-lg">
                        verified
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    <span className="text-[9px] lg:text-[10px] font-label px-2 lg:px-3 py-1 border border-[#ff5540]/40 text-[#ffb4a8] uppercase tracking-widest">
                      HACKATHON 2X
                    </span>
                    {["Rust", "Solana"].map(tag => (
                      <span key={tag} className="text-[9px] lg:text-[10px] font-label px-2 lg:px-3 py-1 border border-[#603e39]/30 uppercase text-[#E5E2E1]/50 tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tier 3: Winner/Champion */}
              <div className="bg-[#201f1f] border-2 glow-gold p-6 lg:p-10 flex flex-col sm:flex-row items-center gap-6 lg:gap-10 relative group lg:scale-[1.03] shadow-2xl">
                <div className="absolute -top-4 right-4 sm:-right-4 bg-[#FFD700] text-black font-label text-[10px] lg:text-[11px] px-4 py-1.5 lg:px-5 lg:py-2 font-black uppercase tracking-[0.2em] shadow-xl">
                  TOP 1%
                </div>
                <div className="w-24 lg:w-32 h-24 lg:h-32 bg-[#353534] shrink-0 border border-[#FFD700]/50 overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.15)] group-hover:shadow-[0_0_50px_rgba(255,215,0,0.3)] transition-all">
                  <Image
                    alt="Champion Avatar"
                    className="w-full h-full object-cover contrast-150 brightness-110 group-hover:scale-110 transition-transform duration-500"
                    src="/dog3.png"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="truncate">
                      <h5 className="font-headline font-black text-2xl lg:text-3xl uppercase tracking-tighter text-[#E5E2E1] truncate">
                        ROLANDO OBREGÓN
                      </h5>
                      <p className="font-label text-[10px] lg:text-[12px] text-[#FFD700] font-bold tracking-[0.2em] mt-1">
                        BUILDER LEGEND
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3 pt-1">
                      <span className="material-symbols-outlined text-[#FFD700] text-2xl lg:text-3xl fill-1 animate-pulse">
                        workspace_premium
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:gap-4">
                    <span className="text-[9px] lg:text-[11px] font-label px-3 py-1 lg:px-4 lg:py-1.5 bg-[#FFD700] text-black font-black uppercase tracking-[0.1em]">
                      CONTRIBUIDOR YC
                    </span>
                    <span className="text-[9px] lg:text-[11px] font-label px-3 py-1 lg:px-4 lg:py-1.5 border border-[#FFD700]/40 text-[#FFD700] uppercase tracking-[0.1em]">
                      GANADOR HACKATHON
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/buildersnetwork">
                <button className="w-full py-5 lg:py-6 mt-4 lg:mt-6 border border-[#ffb4a8]/20 hover:bg-[#ff5540]/5 font-headline font-bold uppercase tracking-[0.2em] lg:tracking-[0.4em] text-xs lg:text-sm transition-all flex items-center justify-center gap-4 group">
                  UNETE Y MIRA EL DIRECTORIO
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Hackathon Section */}
        <section id="hackathon" className="bg-[#ff5540] text-white py-20 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 lg:grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-black h-full"></div>
              ))}
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
              <div className="lg:w-1/2">
                <h2 className="text-[14vw] lg:text-[100px] font-headline font-black leading-none uppercase tracking-tighter mb-10 overflow-hidden">
                  12 HORAS.<br />1 GANADOR.
                </h2>
                <div className="space-y-8 lg:space-y-10 mb-12 lg:mb-16">
                  <p className="text-xl lg:text-3xl font-light max-w-xl leading-snug">
                    Hackathons, Game Jams, y Hacks de Pentesting.
                    Eventos cortos e intensos donde la ejecución es lo único que importa.
                  </p>
                  <div className="flex flex-col gap-4 lg:gap-6 font-label text-sm lg:text-base uppercase tracking-widest border-l-4 border-white/30 pl-6 lg:pl-10 py-2 lg:py-4">
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className="material-symbols-outlined text-2xl lg:text-3xl">pagos</span>
                      <span className="font-black">Costo de entrada: $110 MXN</span>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className="material-symbols-outlined text-2xl lg:text-3xl">grupos</span>
                      <span className="font-black">Modos: Solo / Duo / Squad</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-8 items-start">
                  <div className="flex flex-wrap gap-2 lg:gap-4">
                    {["HACKATHONS", "GAME JAMS", "PENTESTING", "Por lanzamiento, el premio en efectivo inicia en $2,000 MXN", "1 Registro = $100 MXN mas en la bolsa", "Impuesto de $10 MXN por registro"].map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-[#131313] text-[#ffb4a8] text-[10px] font-label font-bold uppercase tracking-[0.2em]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href="/notify" className="w-full sm:w-auto">
                    <button className="bg-[#131313] text-white px-8 lg:px-10 py-5 lg:py-6 font-headline font-bold text-xs lg:text-sm uppercase tracking-[0.2em] lg:tracking-[0.3em] border border-transparent hover:border-[#ffb4a8] transition-all duration-300 active:scale-95 shadow-2xl w-full">
                      Notificame para el primer evento!
                    </button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 bg-[#131313] p-8 lg:p-20 self-stretch border-l-[12px] lg:border-l-[16px] border-[#ff5540] shadow-2xl">
                <div className="font-label text-xs lg:text-sm mb-10 lg:mb-12 text-[#ffb4a8] flex items-center gap-4 uppercase tracking-[0.3em] lg:tracking-[0.5em]">
                  <span className="block-cursor h-4"></span>
                  Próximos Eventos
                </div>
                <ul className="space-y-8 lg:space-y-10">
                  {[
                    { id: "mtygpt", detail: "Agentes y observabilidad.", date: "Soon", loc: "MTY / REMOTO" },
                    { id: "wadswasm", detail: "WASM Game Jam", date: "Soon", loc: "MTY / REMOTO" },
                    { id: "pwn2day", detail: "Competencia de Pentesting.", date: "Soon", loc: "MTY / REMOTO" }
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-[#603e39]/20 pb-6 lg:pb-8 opacity-40">
                      <div>
                        <div className="font-headline font-bold text-xl lg:text-2xl uppercase tracking-tighter mb-1">
                          {item.id}
                        </div>
                        <div className="text-[9px] lg:text-[11px] text-[#ffb4a8] font-label tracking-widest uppercase">
                          {item.detail}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl lg:text-2xl text-[#ff5540]">{item.date}</div>
                        <div className="text-[9px] opacity-40 uppercase tracking-widest mt-1 font-label">
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

        {/* Onboarding Section */}
        <section id="onboarding" className="max-w-[1440px] mx-auto px-6 py-20 lg:py-48 border-x border-[#ffb4a8]/10 bg-[#131313] relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff5540]/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-16 lg:gap-24">
            <div className="max-w-4xl">
              <div className="font-label text-[#ff5540] text-[10px] sm:text-[11px] tracking-[0.4em] mb-6 uppercase flex items-center gap-3 font-bold">
                <span className="w-6 h-[1px] bg-[#ff5540]"></span>
                EL_SISTEMA_DE_INGRESO
              </div>
              <h2 className="text-[12vw] sm:text-[10vw] lg:text-[86px] font-headline font-black tracking-tighter uppercase mb-8 leading-[0.8] mb-10 text-white">
                ONBOARDING:<br /><span className="text-[#ff5540]">¿CÓMO FUNCIONA?</span>
              </h2>
              <p className="text-xl lg:text-3xl text-[#ebbbb4] font-light leading-relaxed max-w-3xl">
                Al registrarte en Discord, nuestro sistema analiza tu trayectoria técnica para determinar tu nivel y desbloquear los canales adecuados a tu experiencia.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left Side: Steps (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-4">
                {[
                  {
                    step: "01",
                    title: "Sincronización de Identidad",
                    desc: "Al entrar, vinculas tu GitHub. No es solo un login; es el inicio del escaneo extensivo de tu impacto técnico.",
                    icon: "hub"
                  },
                  {
                    step: "02",
                    title: "Escaneo Técnico",
                    desc: "Análisis de repositorios, complejidad de código y consistencia. Reconocemos tu stack y perfil real.",
                    icon: "troubleshoot"
                  },
                  {
                    step: "03",
                    title: "Nivelación Algorítmica",
                    desc: "Determinamos tu nivel de acceso basado en el impacto y la consistencia de tu trabajo previo.",
                    icon: "psychology"
                  },
                  {
                    step: "04",
                    title: "Acceso Segmentado",
                    desc: "Seccionamos canales VIP y herramientas exclusivas según tu nivel técnico. Calidad garantizada.",
                    icon: "lock_open"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 border border-[#603e39]/20 hover:border-[#ff5540]/40 hover:bg-[#ff5540]/5 transition-all group">
                    <div className="shrink-0 w-12 h-12 bg-[#201f1f] flex items-center justify-center border border-[#603e39]/30 group-hover:bg-[#ff5540] group-hover:border-[#ff5540] transition-all">
                      <span className="font-headline font-black text-lg text-[#ff5540] group-hover:text-white transition-colors">{item.step}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="material-symbols-outlined text-[#ff5540] text-lg">{item.icon}</span>
                        <h4 className="font-label font-bold text-xs lg:text-sm uppercase tracking-[0.2em] text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs lg:text-sm text-[#E5E2E1]/50 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side: Discord Premium Mockup (lg:col-span-7) */}
              <div className="lg:col-span-7 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff5540]/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                {/* Discord UI Mockup Shell */}
                <div className="relative bg-[#1e1f22] rounded-xl overflow-hidden shadow-2xl border border-white/5 aspect-[16/10] flex flex-col scale-[1.02] hover:scale-[1.03] transition-transform duration-500">
                  {/* Top Bar */}
                  <div className="h-12 border-b border-black/20 bg-[#1e1f22] flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#949ba4] text-lg">tag</span>
                      <span className="font-bold text-[#f2f3f5] text-sm uppercase tracking-wider font-label">hall-of-builders</span>
                    </div>
                    <div className="flex items-center gap-4 text-[#b5bac1]">
                      <span className="material-symbols-outlined text-xl">notifications</span>
                      <span className="material-symbols-outlined text-xl">push_pin</span>
                      <span className="material-symbols-outlined text-xl">group</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-grow flex overflow-hidden">
                    {/* Sidebar Channels */}
                    <div className="w-56 bg-[#2b2d31] hidden sm:flex flex-col p-3 gap-2 overflow-hidden shrink-0">
                      <div className="h-6 w-3/4 bg-[#ff5540]/20 rounded mb-4 animate-pulse"></div>
                      {[
                        { icon: "tag", label: "GENERAL" },
                        { icon: "tag", label: "RESOURCES" },
                        { icon: "lock", label: "BUILDERS-ONLY", premium: true },
                        { icon: "lock", label: "CORE-TEAM", premium: true },
                        { icon: "rocket_launch", label: "HACKATHONS" }
                      ].map((ch, i) => (
                        <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${ch.premium ? "text-[#ff5540]/60" : "text-[#949ba4]"} group/ch cursor-default`}>
                          <span className="material-symbols-outlined text-lg">{ch.icon}</span>
                          <span className="text-[11px] font-bold uppercase tracking-widest">{ch.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chat Area */}
                    <div className="flex-grow bg-[#313338] p-6 flex flex-col justify-end gap-6 relative">
                      {/* Decorative Mock Messages */}
                      <div className="space-y-6">
                        <div className="flex gap-4 items-start opacity-40">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shrink-0"></div>
                          <div className="space-y-2 w-full">
                            <div className="h-3 w-1/4 bg-gray-700 rounded"></div>
                            <div className="h-3 w-3/4 bg-gray-700 rounded"></div>
                          </div>
                        </div>

                        {/* Analysis Trigger Message */}
                        <div className="p-6 bg-[#ff5540]/10 border border-[#ff5540]/30 rounded-lg relative overflow-hidden backdrop-blur-md">
                          <div className="flex gap-4 items-center mb-4">
                            <div className="w-12 h-12 bg-[#ff5540] flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(255,85,64,0.4)]">
                              <span className="material-symbols-outlined text-white text-2xl">terminal</span>
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm font-label uppercase tracking-widest">System Analysis</div>
                              <div className="text-[10px] text-[#ff5540] font-black uppercase tracking-[0.2em]">Authenticating Github...</div>
                            </div>
                          </div>
                          <div className="space-y-2 font-mono text-[10px] text-[#ffb4a8]/80 leading-tight">
                            <div>{">"} SCANNING_REPOS: 42_FOUND</div>
                            <div>{">"} ANALYZING_COMPLEXITY: SUCCESS</div>
                            <div>{">"} LEVEL_DETERMINED: [ ELITE_BUILDER ]</div>
                          </div>
                          <div className="absolute -right-8 -bottom-8 opacity-10">
                            <img src="/gopher.svg" alt="" className="w-32 rotate-12 grayscale invert" />
                          </div>
                        </div>

                        <div className="flex gap-4 items-start pb-4">
                          <div className="w-10 h-10 rounded-full bg-[#ff5540] flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white text-xl">robot_2</span>
                          </div>
                          <div className="space-y-2">
                            <div className="font-bold text-white text-sm">Builders Assistant <span className="bg-[#5865f2] text-[10px] px-1.5 py-0.5 rounded ml-1">BOT</span></div>
                            <p className="text-[#dbdee1] text-sm leading-relaxed">
                              ¡Bienvenido! He analizado tu perfil. Tienes acceso a <span className="text-[#ff5540] font-bold">#builders-only</span> y <span className="text-[#ff5540] font-bold">#elite-devs</span>.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Input Bar Placeholder */}
                      <div className="bg-[#383a40] h-10 rounded-lg flex items-center px-4 gap-4">
                        <span className="material-symbols-outlined text-[#b5bac1]">add_circle</span>
                        <div className="text-[11px] text-[#949ba4] font-label uppercase tracking-widest">Escribir en #hall-of-builders</div>
                        <div className="flex-grow"></div>
                        <span className="material-symbols-outlined text-[#b5bac1]">redeem</span>
                        <span className="material-symbols-outlined text-[#b5bac1]">gif</span>
                        <span className="material-symbols-outlined text-[#b5bac1]">sentiment_satisfied</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge (Extra Premium Detail) */}

              </div>
            </div>
          </div>
        </section>

        {/* Proyectos Open Source Section */}
        <section id="opensource" className="max-w-[1440px] mx-auto px-6 py-20 lg:py-48 border-x border-[#ffb4a8]/10 bg-[#0E0E0E] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
            <div className="grid grid-cols-20 h-full w-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="border-r border-white h-full"></div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 lg:mb-24">
              <div className="max-w-3xl">
                <div className="font-label text-[#ff5540] text-[10px] sm:text-[11px] tracking-[0.4em] mb-6 uppercase flex items-center gap-3 font-bold">
                  <span className="w-8 h-[2px] bg-[#ff5540]"></span>
                  CÓDIGO_ABIERTO_REAL
                </div>
                <h2 className="text-[12vw] sm:text-[10vw] lg:text-[80px] font-headline font-black tracking-tighter uppercase mb-8 leading-[0.8] text-white">
                  PROYECTOS<br /><span className="text-[#ff5540]">OPEN SOURCE</span>
                </h2>
                <p className="text-xl lg:text-2xl text-[#ebbbb4] font-light leading-relaxed max-w-2xl">
                  ¿Quieres ganar experiencia real? Únete al equipo de BuildersMTY y colabora en herramientas que la comunidad usa a diario. Sin burocracia, solo código con impacto.
                </p>
              </div>
              <div className="flex flex-col gap-4 border-l-2 border-[#ff5540]/20 pl-8 py-2">
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">Áreas de Contribución:</div>
                <div className="flex flex-wrap gap-3">
                  {["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "AI_AGENTS"].map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest text-white/40 border border-white/10 px-3 py-1 bg-white/5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: "Herramientas Internas",
                  title: "BuildersMTY Infra",
                  status: "ACTIVE",
                  desc: "El motor de infraestructura para la red BuildersMTY: landing, Builders Network, integraciones de Discord/Github, Pasarela de pagos.",
                  stack: ["Nextjs", "PostgreSQL/Supabase", "Python/FastAPI", "GraphQL"],
                  level: "MEDIO",
                  githubUrl: "https://github.com/raulgooo/BuildersMTY"
                },
                {
                  id: "Herramienta Experimental",
                  title: "Compilador Runes",
                  status: "PRE-ALPHA",
                  desc: "Compilador para el lenguaje de programación Runes. Runes es un lenguaje de programación de sistemas que utiliza un sistema de memory realms para el manejo de la memoria.",
                  stack: ["C", "LLVM", "Runes"],
                  level: "EXTREMO",
                  githubUrl: "https://github.com/raulgooo/runes-programming-language"
                },
                {
                  id: "Auth Server",
                  title: "Shark",
                  logo: "/shark_blackbg_whitelogo_text_logo.svg",
                  status: "PLANEACION: Unete para formar parte del Core-Team.",
                  desc: "Servidor de autenticación open-source en un solo binario: passkeys, MFA, SSO, RBAC. Self-host en 3 minutos.",
                  stack: ["Golang", "Typescript", "SQLite"],
                  level: "DIFICIL",
                  githubUrl: "https://github.com/raulgooo/shark"
                }
              ].map((project, i) => (
                <div key={i} className="bg-[#1c1b1b]/50 border border-[#603e39]/20 p-8 hover:border-[#ff5540]/50 transition-all duration-500 group relative flex flex-col justify-between group h-full">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[#ff5540] text-sm">open_in_new</span>
                  </a>
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-[10px] text-[#ffb4a8] tracking-[0.3em] uppercase">{project.id}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-sm ${project.status === "ACTIVE" ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                        project.status === "BETA" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                          "bg-[#ff5540]/10 text-[#ff5540] border border-[#ff5540]/20"
                        }`}>{project.status}</span>
                    </div>
                    {project.logo && (
                      <Image src={project.logo} alt={project.title} width={100} height={40} className="mb-4" />
                    )}
                    <h3 className="font-headline font-bold text-2xl uppercase tracking-tight text-white mb-4 group-hover:text-[#ff5540] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#E5E2E1]/60 leading-relaxed mb-8">
                      {project.desc}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map(s => (
                        <span key={s} className="text-[9px] font-label border border-[#603e39]/30 px-2 py-1 text-[#E5E2E1]/40 uppercase tracking-widest">{s}</span>
                      ))}
                    </div>
                    <div className="pt-6 border-t border-[#603e39]/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5540] animate-pulse"></span>
                        <span className="font-label text-[10px] text-[#ffb4a8] tracking-widest uppercase font-bold">Diff: {project.level}</span>
                      </div>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-label text-[10px] text-white/50 uppercase tracking-[0.2em] hover:text-[#ff5540] transition-all flex items-center gap-2">
                        README <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recruitment Card */}
              <div className="bg-[#ff5540] border border-[#ff5540] p-8 flex flex-col justify-center items-center text-center gap-6 group hover:brightness-110 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-[#131313] flex items-center justify-center rounded-full mb-2">
                  <span className="material-symbols-outlined text-[#ff5540] text-3xl animate-bounce">add_box</span>
                </div>
                <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-white">
                  ¿TIENES UNA IDEA?<br />PITCH IT HERE.
                </h3>
                <p className="text-white/80 text-sm font-light leading-snug">
                  Buscamos fundadores y mantenedores para nuevos proyectos. El equipo te apoya con recursos y red.
                </p>
                <div className="w-full h-[1px] bg-white/30 my-2"></div>
                <div className="font-label text-[10px] font-black uppercase tracking-[0.3em] text-white">ÚNETE AL EQUIPO CORE</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 lg:py-48 text-center border-x border-[#ffb4a8]/10">
          <div className="bg-[#1c1b1b] p-8 lg:p-32 border border-[#ff5540]/10 relative group overflow-hidden">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 lg:w-20 lg:h-20 border-t-4 border-l-4 border-[#ff5540] transition-all group-hover:w-full group-hover:h-full group-hover:opacity-10"></div>
            <div className="absolute top-0 right-0 w-12 h-12 lg:w-20 lg:h-20 border-t-4 border-r-4 border-[#ff5540] transition-all"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 lg:w-20 lg:h-20 border-b-4 border-l-4 border-[#ff5540] transition-all"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 lg:w-20 lg:h-20 border-b-4 border-r-4 border-[#ff5540] transition-all"></div>

            <h2 className="text-[12vw] lg:text-[90px] font-headline font-black tracking-tighter uppercase mb-8 lg:mb-10 leading-none relative z-10 overflow-hidden">
              LA RED ES<br /><span className="text-[#ff5540]">TODO</span>
            </h2>
            <p className="text-[#ebbbb4] text-lg lg:text-2xl max-w-2xl mx-auto mb-12 lg:mb-16 font-light leading-relaxed relative z-10">
              Accede a canales privados, con builders serios y de nivel.
              Asegura tu lugar en la próxima competencia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-10 relative z-10">
              <Link href="https://discord.gg/RPqWgsN5H6" className="w-full sm:w-auto">
                <button className="w-full bg-[#ff5540] text-white px-10 lg:px-16 py-5 lg:py-6 font-headline font-bold text-base lg:text-lg uppercase tracking-[0.2em] lg:tracking-[0.3em] hover:brightness-110 active:scale-95 transition-all shadow-2xl">
                  Unirse a Discord
                </button>
              </Link>
              <Link href="https://github.com/Raulgooo/BuildersMTY" className="w-full sm:w-auto">
                <button className="w-full border border-[#603e39] text-[#E5E2E1] px-10 lg:px-16 py-5 lg:py-6 font-headline font-bold text-base lg:text-lg uppercase tracking-[0.2em] lg:tracking-[0.3em] hover:bg-white/5 active:scale-95 transition-all">
                  Repositorio
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
