"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCourseBySlug } from "@/data/courses";

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <div className="bg-[#131313] text-[#E5E2E1] font-sans min-h-screen">
        <Header />
        <main className="ghost-grid pt-28 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-headline font-black text-2xl uppercase tracking-tight mb-4">Curso no encontrado</h1>
            <Link href="/courses" className="text-[#ff5540] text-sm hover:text-[#ff5540]/80 transition-colors">
              Volver al catalogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      <Header />
      <main className="ghost-grid pt-28 pb-20">
        <div className="max-w-[1000px] mx-auto px-6">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/courses"
              className="text-[10px] font-label text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors uppercase tracking-wider"
            >
              &larr; Catalogo de Cursos
            </Link>
          </div>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#201f1f] flex items-center justify-center border border-[#603e39]/30">
                  <span className="material-symbols-outlined text-[#ff5540] text-2xl">{course.icon}</span>
                </div>
                <span
                  className={`text-[9px] font-black px-2.5 py-1 font-label tracking-widest border ${
                    course.difficulty === "AVANZADO"
                      ? "bg-[#ff5540]/10 text-[#ff5540] border-[#ff5540]/20"
                      : "bg-[#ffb4a8]/10 text-[#ffb4a8] border-[#ffb4a8]/20"
                  }`}
                >
                  {course.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-headline font-black uppercase tracking-tighter mb-5 leading-[0.9]">
                {course.title}
              </h1>

              <p className="text-base text-[#ebbbb4]/70 font-light leading-relaxed mb-8">
                {course.longDesc}
              </p>

              {/* What you'll learn */}
              <div className="bg-[#1c1b1b]/50 border border-[#603e39]/20 p-6 mb-6">
                <h3 className="text-[9px] font-label font-bold text-[#ff5540] tracking-[0.2em] uppercase mb-4">
                  Lo que aprenderas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.learns.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[#ff5540]/50 text-sm mt-0.5">check</span>
                      <span className="text-sm text-[#E5E2E1]/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar card */}
            <div className="lg:col-span-1">
              <div className="bg-[#1c1b1b] border border-[#603e39]/30 p-6 sticky top-28">
                <div className="flex items-center gap-2 mb-4 text-[10px] text-[#E5E2E1]/30">
                  <span className="material-symbols-outlined text-sm text-[#ff5540]/40">auto_stories</span>
                  <span className="font-label uppercase tracking-wider">{course.modules.length} modulos</span>
                </div>

                <div className="flex items-center gap-2 mb-6 text-[10px] text-[#E5E2E1]/30">
                  <span className="material-symbols-outlined text-sm text-[#ff5540]/40">code</span>
                  <span className="font-label uppercase tracking-wider">Proyecto completo</span>
                </div>

                {course.available ? (
                  <Link href={`/courses/${course.id}/workspace`}>
                    <button className="w-full bg-[#ff5540] text-white px-5 py-4 font-headline text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">play_arrow</span>
                      Comenzar Curso
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full border border-[#603e39]/20 text-[#E5E2E1]/20 px-5 py-4 font-headline text-[11px] font-bold uppercase tracking-[0.2em] cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ff5540]/30 animate-pulse"></span>
                    Proximamente
                  </button>
                )}

                <div className="mt-4 pt-4 border-t border-[#603e39]/15">
                  <div className="text-[9px] font-label text-[#E5E2E1]/20 uppercase tracking-wider">
                    Gratis y open source
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="mb-16">
            <h2 className="font-headline font-bold text-xl uppercase tracking-tight mb-6">
              Contenido del Curso
            </h2>
            <div className="space-y-2">
              {course.modules.map((mod, i) => (
                <div
                  key={i}
                  className="bg-[#1c1b1b]/50 border border-[#603e39]/15 p-4 flex items-start gap-4 hover:border-[#603e39]/30 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#201f1f] flex items-center justify-center border border-[#603e39]/20 flex-shrink-0">
                    <span className="text-[10px] font-label font-bold text-[#ff5540]/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm uppercase tracking-tight text-[#E5E2E1] mb-0.5">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-[#E5E2E1]/35">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            {course.available ? (
              <Link href={`/courses/${course.id}/workspace`}>
                <button className="bg-[#ff5540] text-white px-10 py-4 font-headline text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                  Comenzar Curso
                </button>
              </Link>
            ) : (
              <div className="text-xs text-[#E5E2E1]/30">
                Este curso estara disponible pronto. Unete al{" "}
                <Link href="https://discord.gg/RPqWgsN5H6" className="text-[#ff5540] hover:text-[#ff5540]/80 transition-colors">
                  Discord
                </Link>{" "}
                para enterarte cuando se lance.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
