import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WorkspacePreview } from "@/components/WorkspacePreview";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}>
      <Header />

      <main className="pt-20">
        <section className="px-6 lg:px-10 py-24 lg:py-48 max-w-[1200px] mx-auto min-h-[90vh] flex flex-col justify-center relative">
          {/* Dramatic red vertical accent */}
          <div className="absolute left-0 top-[15%] bottom-[15%] w-1 hidden lg:block" style={{ background: "var(--red)" }} />
          <div className="max-w-4xl lg:pl-10 animate-fade-up">
            <p className="text-[13px] font-bold tracking-[0.3em] uppercase mb-8" style={{ color: "var(--red)" }}>
              Monterrey, México
            </p>
            <h1
              className="font-[family-name:var(--font-archivo-black)] uppercase leading-[0.85] tracking-tighter mb-10"
              style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
            >
              BUILD{" "}
              <span style={{ color: "var(--red)" }}>OR</span>
              <br />
              DIE
            </h1>
            <p
              className="text-lg lg:text-xl max-w-xl mb-14"
              style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
            >
              Comunidad de builders en Monterrey.
              Red de talento, herramientas y proyectos reales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://discord.gg/RPqWgsN5H6">
                <button
                  className="text-white px-10 py-5 text-[13px] font-bold uppercase tracking-[0.25em] hover:scale-[1.02] transition-transform"
                  style={{ background: "var(--red)" }}
                >
                  Unirse a Discord
                </button>
              </Link>
              <Link href="https://github.com/Raulgooo/BuildersMTY">
                <button
                  className="px-10 py-5 text-[13px] font-bold uppercase tracking-[0.25em] hover:border-[var(--red)] transition-colors"
                  style={{ border: "2px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  Repositorio
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ Onboarding ═══ */}
        <section id="onboarding" className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 lg:py-40">
          <div className="max-w-3xl mb-16">
            <p className="text-[12px] font-medium tracking-wide mb-6" style={{ color: "var(--red)" }}>
              El Sistema de Ingreso
            </p>
            <h2
              className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.9] mb-8"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              ¿Cómo<br /><span style={{ color: "var(--red)" }}>Funciona?</span>
            </h2>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Al registrarte en Discord, nuestro sistema analiza tu trayectoria técnica para determinar
              tu nivel y desbloquear los canales adecuados a tu experiencia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
            {[
              { step: "01", title: "Sincronización de Identidad", desc: "Vinculas tu GitHub. El escaneo extensivo de tu impacto técnico comienza.", icon: "hub" },
              { step: "02", title: "Escaneo Técnico", desc: "Análisis de repositorios, complejidad de código y consistencia.", icon: "troubleshoot" },
              { step: "03", title: "Nivelación Algorítmica", desc: "Determinamos tu nivel de acceso basado en el impacto de tu trabajo.", icon: "psychology" },
              { step: "04", title: "Acceso Segmentado", desc: "Canales y herramientas exclusivas según tu nivel técnico.", icon: "lock_open" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 lg:p-8 group hover:bg-[var(--surface-1)] transition-all relative overflow-hidden"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                {/* Oversized step number */}
                <span
                  className="absolute -bottom-3 -right-1 font-[family-name:var(--font-archivo-black)] leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                  style={{ fontSize: "6rem" }}
                >
                  {item.step}
                </span>
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}>
                    <span className="material-symbols-outlined text-lg" style={{ color: "var(--red)" }}>{item.icon}</span>
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: "var(--red)" }}>{item.step}</span>
                </div>
                <h4 className="text-base font-bold uppercase tracking-wide mb-2 relative z-10">{item.title}</h4>
                <p className="text-base leading-relaxed relative z-10" style={{ color: "var(--text-tertiary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ── BuilderCard Preview ── */}
          <div className="mt-20">
            <p className="text-[11px] font-medium tracking-wider uppercase mb-6 text-center" style={{ color: "var(--text-ghost)" }}>
              Así se ve tu perfil después del escaneo
            </p>
            <div className="max-w-xl mx-auto">
              <div className="overflow-hidden" style={{ background: "var(--surface-0)", border: "2px solid var(--red-dim)", boxShadow: "0 0 24px oklch(50% 0.24 25 / 0.08)" }}>
                {/* Top Bar */}
                <div className="flex items-center justify-between px-5 py-2.5" style={{ background: "var(--surface-1)", borderBottom: "1px solid var(--red-dim)" }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--red)" }}>Elite Builder</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm" style={{ color: "var(--red)" }}>verified</span>
                    <span className="text-[9px] tracking-wider uppercase" style={{ color: "var(--text-ghost)" }}>BuildersMTY</span>
                  </div>
                </div>
                <div className="p-5 lg:p-6">
                  {/* Identity */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 shrink-0 overflow-hidden flex items-center justify-center" style={{ border: "2px solid var(--red-dim)", background: "var(--surface-1)" }}>
                      <Image src="/builderslogo2.svg" alt="Builder" width={32} height={32} className="opacity-60" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h5 className="font-[family-name:var(--font-archivo-black)] text-lg uppercase tracking-tight leading-none">TuNombre</h5>
                      <p className="text-[11px] mt-1" style={{ color: "var(--text-ghost)" }}>@tu-github</p>
                    </div>
                    {/* Score Ring */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
                        <circle cx="48" cy="48" r="38" fill="none" strokeWidth="3" stroke="var(--border-subtle)" />
                        <circle cx="48" cy="48" r="38" fill="none" strokeWidth="3" stroke="var(--red)" strokeDasharray="238.76" strokeDashoffset="62.08" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-[family-name:var(--font-archivo-black)] text-lg leading-none">74</span>
                        <span className="text-[7px]" style={{ color: "var(--text-ghost)" }}>/100</span>
                      </div>
                    </div>
                  </div>
                  {/* Archetype */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-ghost)" }}>Arquetipo</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 text-white" style={{ background: "var(--red)" }}>Full-Stack Operator</span>
                  </div>
                  {/* Summary */}
                  <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)", lineHeight: "1.6" }}>
                    Builder con enfoque en infraestructura y desarrollo full-stack. Alta consistencia de contribuciones...
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["TypeScript", "Go", "Python", "React"].map((t) => (
                      <span key={t} className="text-[9px] px-2 py-0.5 uppercase tracking-wider" style={{ border: "1px solid var(--border)", color: "var(--text-ghost)" }}>{t}</span>
                    ))}
                  </div>
                  {/* Stats */}
                  <div className="flex flex-wrap gap-2">
                    {[{i:"commit",v:"847",l:"Commits"},{i:"merge",v:"42",l:"PRs"},{i:"star",v:"126",l:"Stars"}].map((s) => (
                      <div key={s.l} className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}>
                        <span className="material-symbols-outlined text-xs" style={{ color: "var(--red)" }}>{s.i}</span>
                        <span className="font-[family-name:var(--font-archivo-black)] text-xs">{s.v}</span>
                        <span className="text-[8px] uppercase tracking-wider" style={{ color: "var(--text-ghost)" }}>{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Footer */}
                <div className="px-5 py-2.5 flex items-center justify-between" style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border-subtle)" }}>
                  <span className="text-[8px] tracking-wider uppercase" style={{ color: "var(--text-ghost)" }}>Analysis Engine v1.0</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1" style={{ color: "var(--red)" }}>
                    GitHub <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </span>
                </div>
              </div>
              <p className="text-center mt-4 text-[11px]" style={{ color: "var(--text-ghost)" }}>
                Descargable como PNG. Compártelo en redes.
              </p>
            </div>
          </div>
        </section>



        {/* ═══ Hackathon ═══ */}
        <section id="hackathon" className="py-24 lg:py-48 relative overflow-hidden" style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
          {/* Brutalist grid background noise */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(var(--text-ghost) 1px, transparent 1px), linear-gradient(90deg, var(--text-ghost) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
              
              <div className="lg:col-span-7">
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-[1px] w-12" style={{ background: "var(--red)" }} />
                  <p className="text-[12px] font-bold tracking-[0.3em] uppercase" style={{ color: "var(--red)" }}>
                    Eventos Virtuales
                  </p>
                </div>
                
                <h2 className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.85] mb-10 group">
                  <span className="block text-white" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>12 HORAS</span>
                  <span className="block text-transparent" style={{ WebkitTextStroke: "2px var(--red)", fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
                    1 GANADOR
                  </span>
                </h2>
                
                <p className="text-lg lg:text-xl leading-relaxed max-w-lg mb-12" style={{ color: "var(--text-secondary)" }}>
                  Hackathons, Game Jams, y Hacks de Pentesting en Monterrey. Eventos cortos, intensos y presenciales. Aquí la ejecución cruda es tu única ventaja.
                </p>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mb-12">
                  <div className="p-4" style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-0)" }}>
                    <span className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-ghost)" }}>Entrada</span>
                    <span className="font-[family-name:var(--font-archivo-black)] text-xl">$110 MXN</span>
                  </div>
                  <div className="p-4" style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-0)" }}>
                    <span className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-ghost)" }}>Formatos</span>
                    <span className="font-[family-name:var(--font-archivo-black)] text-xl">Solo / Squad</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <Link href="/notify">
                    <button className="text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-[12px] hover:scale-[1.02] transition-transform" style={{ background: "var(--red)" }}>
                      Notifícame
                    </button>
                  </Link>
                  <div className="flex gap-2">
                    {["Game Jams", "Cyber"].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ border: "1px solid var(--border)", color: "var(--text-tertiary)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terminal-inspired event log */}
              <div className="lg:col-span-5 relative">
                {/* Visual anchor point */}
                <div className="absolute -top-4 -left-4 w-8 h-8 pointer-events-none" style={{ borderTop: "2px solid var(--red)", borderLeft: "2px solid var(--red)" }} />
                
                <div className="p-8 lg:p-10" style={{ background: "var(--surface-0)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex justify-between items-end mb-10 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>Radar de Eventos</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--red)" }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--red)" }}></span>
                    </span>
                  </div>
                  
                  <div className="space-y-0 relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-[3.5px] top-4 bottom-4 w-[1px]" style={{ background: "var(--border)" }} />
                    
                    {[
                      { id: "MTYGPT", detail: "Agentes IA y observabilidad", date: "SOON", type: "HACKATHON" },
                      { id: "WADSWASM", detail: "Rust & WASM Game Jam", date: "SOON", type: "GAME JAM" },
                      { id: "PWN2DAY", detail: "Competencia Pentesting CTF", date: "SOON", type: "CYBER" },
                    ].map((item, i) => (
                      <div key={i} className="relative pl-6 py-5 group hover:bg-[var(--surface-1)] transition-colors cursor-crosshair">
                        {/* Node timeline dot */}
                        <div className="absolute left-[0px] top-[26px] w-2 h-2 rounded-full group-hover:bg-[var(--red)] transition-colors" style={{ background: "var(--border)" }} />
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-[family-name:var(--font-archivo-black)] text-xl tracking-tight group-hover:text-[var(--red)] transition-colors">{item.id}</span>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest" style={{ color: "var(--text-ghost)", border: "1px solid var(--border-subtle)" }}>{item.type}</span>
                            </div>
                            <div className="text-[12px] tracking-wide" style={{ color: "var(--text-tertiary)" }}>
                              {item.detail}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-ghost)" }}>{item.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══ Courses / BuildMancer Preview ═══ */}
        <section id="cursos" className="py-24 lg:py-40 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-16 text-center">
            <p className="text-[12px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: "var(--red)" }}>
              Próximamente
            </p>
            <h2
              className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.9] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Build<span style={{ color: "var(--red)" }}>Mancer</span>
            </h2>
            <p className="text-lg mx-auto max-w-2xl" style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}>
              Nuestra plataforma propietaria de cursos. Programa proyectos complejos directo en el navegador — sin dependencias, sin setup. Guías paso a paso para construir desde cero.
            </p>
          </div>

          {/* BuildMancer Workspace Preview */}
          <div className="mx-auto mb-20 animate-fade-up w-full px-4 flex justify-center">
            <div className="w-full max-w-[340px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[1000px]">
              <div 
                className="relative overflow-hidden w-full group bg-[var(--surface-0)] mx-auto"
                style={{ border: "1px solid var(--border-subtle)", boxShadow: "0 0 60px rgba(212,26,26,0.08)", aspectRatio: "16/10" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--red)]/5 to-transparent pointer-events-none mix-blend-overlay z-10 transition-opacity opacity-50 group-hover:opacity-100" />
                <div className="absolute top-0 left-0 w-[1000px] h-[625px] origin-top-left scale-[0.34] sm:scale-[0.6] md:scale-[0.75] lg:scale-100 overflow-hidden">
                  <WorkspacePreview />
                </div>
              </div>
            </div>
          </div>

          {/* Courses Sneak Peek */}
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-20 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-[family-name:var(--font-archivo-black)] text-lg lg:text-xl uppercase tracking-tighter mb-8" style={{ color: "var(--text-primary)" }}>
              SNEAK PEEK / <span style={{ color: "var(--text-ghost)" }}>THE CURRICULUM</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "psychology", title: "Construye tu propio ChatGPT desde 0", difficulty: "PRÓXIMAMENTE", desc: "Basado en el legendario video \"Let's build GPT\" de Andrej Karpathy. Entrena tu propio modelo GPT desde cero." },
                { icon: "memory", title: "Alocador de Memoria en C", difficulty: "AVANZADO", desc: "Construye malloc/free. Administra memoria granularmente desde cero entendiendo el mapeo directo a syscalls de OS UNIX." },
                { icon: "dns", title: "Servidor HTTP con Go", difficulty: "INTERMEDIO", desc: "Implementa peticiones HTTP/1.1 desde un socket TCP crudo manejando concurrencia masiva utilizando solo la standard library." },
                { icon: "smart_toy", title: "Crea tu Claude Code", difficulty: "AVANZADO", desc: "Desarrolla un agente CLI interconectado que escanea repositorios, edita código local y se enlaza con LLMs en tiempo real." },
                { icon: "terminal", title: "Shell desde Cero en Rust", difficulty: "AVANZADO", desc: "Forja tu propia UNIX shell operando system calls nativas, manejo de PIDs, file descriptors y ejecución inter-proceso." },
                { icon: "database", title: "Bases de Datos Key-Value", difficulty: "INTERMEDIO", desc: "Diseña un motor persistente de almacenamiento de baja latencia con estructuras B-Tree, Write-Ahead Logs y binarios." },
              ].map((course, i) => (
                <div key={i} className="flex flex-col justify-between p-6 transition-colors hover:bg-[var(--surface-1)] group h-full" style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-0)" }}>
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-10 h-10 flex items-center justify-center transition-colors group-hover:border-[var(--red)] group-hover:bg-[var(--red-wash)]" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                        <span className="material-symbols-outlined text-[var(--red)] opacity-70 group-hover:opacity-100 transition-opacity text-[20px]">
                          {course.icon}
                        </span>
                      </div>
                      <span 
                        className="text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 mt-1" 
                        style={{ 
                          border: "1px solid var(--border)", 
                          color: (course.difficulty === "AVANZADO" || course.difficulty === "PRÓXIMAMENTE") ? "var(--red)" : "var(--text-secondary)",
                        }}
                      >
                        {course.difficulty}
                      </span>
                    </div>
                    <h4 className="font-[family-name:var(--font-archivo-black)] text-[14px] leading-[1.2] uppercase tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
                      {course.title}
                    </h4>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                      {course.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="px-6 flex items-center justify-center">
            <Link href="https://discord.gg/RPqWgsN5H6">
              <button
                className="text-white px-10 py-5 text-[12px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,26,26,0.15)]"
                style={{ background: "var(--red)", border: "1px solid var(--red-light)" }}
              >
                Inscribirse al Beta Privado
              </button>
            </Link>
          </div>
        </section>

        <section id="opensource" className="py-24 lg:py-40" style={{ background: "var(--surface-0)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
              <div className="max-w-2xl animate-fade-up">
                <p className="text-[12px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: "var(--red)" }}>
                  Construye en Público
                </p>
                <h2
                  className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.9] mb-6"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                >
                  El Código<br /><span style={{ color: "var(--red)" }}>Es Ley</span>
                </h2>
                <p className="text-base lg:text-lg leading-relaxed mt-8" style={{ color: "var(--text-secondary)" }}>
                  El software cerrado muere en la oscuridad. Construimos nuestra infraestructura, 
                  lenguajes y plataformas a la vista de todos. Aporta o muere intentándolo.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Backend", "Sistemas", "Compiladores", "Auth", "AI"].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold tracking-wide px-3 py-1.5 uppercase" style={{ background: "var(--surface-1)", border: "1px solid var(--border)", color: "var(--text-tertiary)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Asymmetrical Impeccable Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 1. Flagship: Runes Compiler (Spans 8 columns, visually dominant) */}
              <a
                href="https://github.com/raulgooo/runes-programming-language"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-between group hover:border-[var(--red)] transition-all relative overflow-hidden"
                style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
              >
                {/* Visual noise / accent */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 10px, var(--red) 10px, var(--red) 20px)" }} />
                
                <div>
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--red)" }}>Herramienta Experimental</span>
                    <span
                      className="text-[10px] font-bold px-3 py-1 uppercase tracking-widest"
                      style={{ background: "var(--red)", color: "var(--surface-0)" }}
                    >
                      PRE-ALPHA
                    </span>
                  </div>
                  <Image src="/runes_true.svg" alt="Runes Programming Language" width={160} height={60} className="mb-6 relative z-10 group-hover:scale-[1.02] transform origin-left transition-transform duration-500" />
                  <h3 className="font-[family-name:var(--font-archivo-black)] text-3xl lg:text-5xl uppercase tracking-tighter mb-4 relative z-10 group-hover:scale-[1.02] transform origin-left transition-transform duration-500 hidden">
                    Compilador<br/>Runes
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 font-bold relative z-10" style={{ color: "var(--text-primary)" }}>
                    La estrategia de memoria pertenece a la función, no a los datos.
                  </p>
                  <p className="text-base leading-relaxed mb-6 max-w-2xl relative z-10" style={{ color: "var(--text-secondary)" }}>
                    Un lenguaje a nivel de sistemas diseñado para escribir SOs, compiladores y tooling sin sacrificar expresividad. Tú eliges stack, arena, heap o GC en el callsite.
                  </p>

                  <div className="relative z-10 mb-10 w-full min-w-0 rounded-md overflow-hidden p-5 sm:p-6" style={{ background: "oklch(10% 0.005 25)", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}>
                    {/* Code body */}
                    <div className="overflow-x-hidden text-[11px] sm:text-xs">
                      <pre className="font-mono leading-[1.8] whitespace-pre-wrap w-full" style={{ color: "var(--text-secondary)", wordBreak: "break-word" }}>
<span className="opacity-40">-- The memory strategy lives on the function</span>{"\n"}
<span className="opacity-40">-- This one uses a bump-allocator arena</span>{"\n"}
<span className="font-bold tracking-wide" style={{ color: "var(--red)" }}>regional</span> <span className="text-white">f</span> <span className="opacity-90 text-white">setup_paging</span>() {"{\n"}
{"  "}<span className="text-white">PageTable</span> pml4 = <span className="text-white">PageTable</span>.new(){"\n"}
{"  "}<span className="font-bold tracking-wide" style={{ color: "var(--red)" }}>try</span> pml4.map(0xFFFF800000000000, 0x0, 0x3){"\n"}
{"}\n\n"}
<span className="opacity-40">-- This one is GC-tracked</span>{"\n"}
<span className="font-bold tracking-wide" style={{ color: "var(--red)" }}>gc</span> <span className="text-white">f</span> <span className="opacity-90 text-white">run_userspace</span>() {"{\n"}
{"  "}<span className="text-white">Task</span> t = <span className="text-white">Task</span>.spawn(shell_main){"\n"}
{"  "}scheduler.add(t){"\n"}
{"}"}
                      </pre>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-10 max-w-2xl relative z-10" style={{ color: "var(--text-tertiary)" }}>
                    <strong style={{ color: "var(--text-ghost)" }}>Status:</strong> El compilador bootstrap (C) está completado hasta type checking. La generación de código es el próximo hito. Aún no listo para producción.
                  </p>
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {["C", "LLVM", "Runes"].map((s) => (
                      <span key={s} className="text-[11px] font-medium tracking-wider px-3 py-1 uppercase" style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm" style={{ color: "var(--red)" }}>warning</span>
                      <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--red)" }}>Diff: EXTREMO</span>
                    </div>
                    <span className="text-[11px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2" style={{ color: "var(--red)" }}>
                      Ver Source <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </a>

              {/* 2. Shark Auth (Spans 4 columns, tall) */}
              <a
                href="https://github.com/shark-auth/shark"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-4 p-8 lg:p-10 flex flex-col justify-between group hover:bg-[var(--surface-2)] transition-colors"
                style={{ background: "oklch(13% 0.008 25)", border: "1px solid var(--border-subtle)" }}
              >
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-ghost)" }}>Auth Server</span>
                  </div>
                  <Image src="/shark_blackbg_whitelogo_text_logo.svg" alt="Shark Auth" width={140} height={50} className="mb-6 opacity-90 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm leading-relaxed mb-4 font-bold" style={{ color: "var(--text-primary)" }}>
                    Auth ya no es solo para humanos.
                  </p>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                    La capa de identidad común para la era Agentic. Gestiona humanos (MFA, SSO, AUTHn) y Agentes de IA como ciudadanos de primera clase bajo el mismo binario.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {["Go", "Agent Auth", "SSO"].map((s) => (
                      <span key={s} className="text-[10px] tracking-wider px-2.5 py-1.5 uppercase" style={{ background: "var(--surface-0)", color: "var(--text-secondary)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>Status: ACTIVE</span>
                  </div>
                </div>
              </a>

              {/* 3. Infra (Spans 12 columns, horizontal banner) */}
              <a
                href="https://github.com/raulgooo/BuildersMTY"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-12 p-8 lg:p-10 flex flex-col md:flex-row items-stretch md:items-center justify-between group hover:border-[var(--text-ghost)] transition-colors gap-8"
                style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Image src="/builderslogo2.svg" alt="BuildersMTY" width={32} height={32} className="opacity-70 group-hover:opacity-100 transition-opacity object-contain" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-primary)" }}>Builders Infra</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 font-bold" style={{ color: "var(--text-primary)" }}>
                    El motor de la red.
                  </p>
                  <p className="text-sm lg:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Plataforma full-stack conectada al algoritmo de ranking, Discord, y el scanner de GitHub.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-end lg:items-center gap-6 shrink-0">
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-end mb-2">
                      {["Next.js", "Python", "GraphQL", "Supabase"].map((s) => (
                        <span key={s} className="text-[10px] tracking-wider px-3 py-1.5 uppercase" style={{ border: "1px solid var(--border)", color: "var(--text-tertiary)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>Status: ACTIVE</span>
                  </div>
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full group-hover:bg-[var(--red)] group-hover:text-white transition-all transform group-hover:translate-x-2" style={{ border: "1px solid var(--border)" }}>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ═══ Pillars ═══ */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-32 lg:pb-48">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stagger" style={{ border: "1px solid var(--border-subtle)" }}>
            {[
              {
                num: "01",
                title: "Ejecutar",
                desc: "Si no funciona, no existe. Herramientas crudas que resuelvan problemas reales antes de hablar de ellas.",
              },
              {
                num: "02",
                title: "Mostrar",
                desc: "Si tu software funciona pero nadie lo usa, no existe. Somos el spotlight para los repos de la comunidad.",
              },
              {
                num: "03",
                title: "Alianza",
                desc: "Conecta con otros builders, encuentra cofundadores y lleva tus ideas al siguiente nivel.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`p-8 lg:p-12 group hover:bg-[var(--surface-1)] transition-all relative overflow-hidden ${
                  i !== 2 ? "md:border-r border-b md:border-b-0" : ""
                }`}
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {/* Dramatic oversized number */}
                <span
                  className="absolute -top-4 -right-2 font-[family-name:var(--font-archivo-black)] leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                  style={{ fontSize: "8rem" }}
                >
                  {f.num}
                </span>
                <span
                  className="block text-[11px] font-bold tracking-[0.3em] uppercase mb-8 relative z-10"
                  style={{ color: "var(--red)" }}
                >
                  {f.num}
                </span>
                <h3
                  className="font-[family-name:var(--font-archivo-black)] text-2xl uppercase tracking-tight mb-4 relative z-10 group-hover:text-[var(--red)] transition-colors"
                >
                  {f.title}
                </h3>
                <p className="text-base leading-relaxed max-w-[300px] relative z-10" style={{ color: "var(--text-tertiary)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Mission ═══ */}
        <section id="mission" className="overflow-hidden" style={{ background: "var(--surface-0)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 lg:py-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Massive Typographic Anchor */}
              <div className="lg:col-span-12 mb-4 lg:mb-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12" style={{ background: "var(--red)" }} />
                  <p className="text-[12px] font-bold tracking-[0.3em] uppercase" style={{ color: "var(--red)" }}>
                    La Filosofía
                  </p>
                </div>
                
                <h2 className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.85] text-transparent select-none" style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)", WebkitTextStroke: "1px var(--text-ghost)" }}>
                  OPEN SOURCE <br />
                  <span style={{ color: "var(--text-primary)", WebkitTextStroke: "0px" }}>VA PRIMERO</span>
                </h2>
              </div>

              {/* Aggressive Grid Columns */}
              <div className="lg:col-span-6 p-8 lg:p-12 hover:bg-[var(--surface-1)] transition-colors group" style={{ borderTop: "2px solid var(--red)" }}>
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-ghost)" }}>Punto Uno</span>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--red)" }}>public</span>
                </div>
                <h3 className="font-[family-name:var(--font-archivo-black)] text-3xl lg:text-4xl uppercase tracking-tight mb-8 group-hover:text-[var(--red)] transition-colors">
                  Build In<br/>Public
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  El software hermético es irrelevante. Muestra tu código crudo, haz demos públicas y enfrenta el escrutinio de la red. Mostrar software compilando es la única moneda de cambio válida hoy en día para atraer talento y capital.
                </p>
              </div>

              <div className="lg:col-span-6 p-8 lg:p-12 hover:bg-[var(--surface-1)] transition-colors group" style={{ borderTop: "2px solid var(--border)" }}>
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-ghost)" }}>Punto Dos</span>
                  <span className="material-symbols-outlined text-xl group-hover:text-[var(--text-primary)] transition-colors" style={{ color: "var(--border)" }}>terminal</span>
                </div>
                <h3 className="font-[family-name:var(--font-archivo-black)] text-3xl lg:text-4xl uppercase tracking-tight mb-8 group-hover:text-[var(--text-primary)] transition-colors" style={{ color: "var(--text-ghost)" }}>
                  Go Low,<br/>Go Hard
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Cualquiera sabe hacer un `npm install`. Exigimos que los builders desciendan a la infraestructura: crea tus sistemas, diseña arquitecturas, entiende de memoria y empuja el metal al límite.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ═══ Final CTA — Full-bleed red ═══ */}
        <section className="relative overflow-hidden" style={{ background: "var(--red)" }}>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 lg:py-40 text-center relative z-10">
            <h2
              className="font-[family-name:var(--font-archivo-black)] text-white uppercase tracking-tighter leading-[0.85] mb-8"
              style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}
            >
              La Red Es<br />Todo
            </h2>
            <p className="text-lg lg:text-xl max-w-xl mx-auto mb-14 text-white/80" style={{ lineHeight: "1.7" }}>
              Accede a canales privados con builders serios y de nivel.
              Asegura tu lugar en la próxima competencia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="https://discord.gg/RPqWgsN5H6">
                <button
                  className="px-12 py-5 font-bold text-base uppercase tracking-[0.25em] hover:scale-[1.02] transition-transform"
                  style={{ background: "var(--surface-0)", color: "white" }}
                >
                  Unirse a Discord
                </button>
              </Link>
              <Link href="https://github.com/Raulgooo/BuildersMTY">
                <button
                  className="px-12 py-5 font-bold text-base uppercase tracking-[0.25em] hover:bg-white/10 transition-colors text-white"
                  style={{ border: "2px solid white" }}
                >
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
