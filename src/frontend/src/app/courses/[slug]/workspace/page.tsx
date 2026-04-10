"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { getCourseBySlug } from "@/data/courses";

export default function WorkspacePage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, loading } = useAuth();
  const router = useRouter();
  const course = getCourseBySlug(slug);
  const [activeModule, setActiveModule] = useState(0);

  if (loading) {
    return (
      <div className="bg-[#131313] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#ff5540] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.replace("/auth/login");
    return null;
  }

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

  if (!course.available) {
    router.replace(`/courses/${slug}`);
    return null;
  }

  const currentModule = course.modules[activeModule];

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="flex">
          {/* Sidebar — module navigation */}
          <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-[#603e39]/15 min-h-[calc(100vh-80px)] bg-[#0e0e0e]">
            <div className="p-4 border-b border-[#603e39]/15">
              <Link
                href={`/courses/${slug}`}
                className="text-[9px] font-label text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors uppercase tracking-wider"
              >
                &larr; Info del curso
              </Link>
              <h2 className="font-headline font-bold text-xs uppercase tracking-tight text-white mt-2 leading-tight">
                {course.title}
              </h2>
            </div>

            <nav className="py-2">
              {course.modules.map((mod, i) => (
                <button
                  key={i}
                  onClick={() => setActiveModule(i)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-all border-l-2 ${
                    activeModule === i
                      ? "bg-[#1c1b1b] border-l-[#ff5540] text-[#E5E2E1]"
                      : "border-l-transparent text-[#E5E2E1]/35 hover:text-[#E5E2E1]/60 hover:bg-[#1c1b1b]/30"
                  }`}
                >
                  <span className={`text-[9px] font-label font-bold mt-0.5 ${activeModule === i ? "text-[#ff5540]" : "text-[#E5E2E1]/20"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-medium leading-tight">{mod.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content area */}
          <div className="flex-1 min-h-[calc(100vh-80px)]">
            {/* Mobile module selector */}
            <div className="lg:hidden border-b border-[#603e39]/15 p-4 flex items-center gap-3 overflow-x-auto">
              <Link
                href={`/courses/${slug}`}
                className="text-[9px] font-label text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors uppercase tracking-wider flex-shrink-0"
              >
                &larr;
              </Link>
              {course.modules.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveModule(i)}
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center text-[10px] font-label font-bold border transition-all ${
                    activeModule === i
                      ? "bg-[#ff5540] text-white border-[#ff5540]"
                      : "bg-transparent text-[#E5E2E1]/30 border-[#603e39]/20 hover:border-[#ff5540]/40"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 lg:p-12 max-w-3xl">
              <div className="mb-8">
                <div className="text-[9px] font-label text-[#ff5540]/60 tracking-[0.2em] uppercase mb-2">
                  Modulo {String(activeModule + 1).padStart(2, "0")} de {String(course.modules.length).padStart(2, "0")}
                </div>
                <h1 className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-tight mb-3">
                  {currentModule.title}
                </h1>
                <p className="text-sm text-[#E5E2E1]/50 leading-relaxed">
                  {currentModule.desc}
                </p>
              </div>

              {/* Placeholder content */}
              <div className="border border-dashed border-[#603e39]/30 p-8 lg:p-12 text-center mb-8">
                <span className="material-symbols-outlined text-[#ff5540]/20 text-5xl mb-4 block">construction</span>
                <h3 className="font-headline font-bold text-sm uppercase tracking-tight text-[#E5E2E1]/30 mb-2">
                  Contenido en desarrollo
                </h3>
                <p className="text-xs text-[#E5E2E1]/20 max-w-sm mx-auto">
                  El contenido de este modulo esta siendo preparado por la comunidad. Unete al Discord para contribuir o seguir el progreso.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-[#603e39]/15">
                <button
                  onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                  disabled={activeModule === 0}
                  className="text-[10px] font-label font-bold uppercase tracking-[0.15em] text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  &larr; Anterior
                </button>
                <button
                  onClick={() => setActiveModule(Math.min(course.modules.length - 1, activeModule + 1))}
                  disabled={activeModule === course.modules.length - 1}
                  className="text-[10px] font-label font-bold uppercase tracking-[0.15em] text-[#ff5540] hover:text-[#ff5540]/80 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  Siguiente &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
