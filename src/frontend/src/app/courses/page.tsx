"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";

type Difficulty = "TODOS" | "INTERMEDIO" | "AVANZADO";

export default function CoursesPage() {
  const [filter, setFilter] = useState<Difficulty>("TODOS");

  const filtered = filter === "TODOS" ? courses : courses.filter((c) => c.difficulty === filter);

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      <Header />
      <main className="ghost-grid pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="font-label text-[#ff5540] text-[10px] tracking-[0.4em] mb-4 uppercase flex items-center gap-3 font-bold">
              <span className="w-6 h-[1px] bg-[#ff5540]"></span>
              CATALOGO_DE_CURSOS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black tracking-tighter uppercase mb-4 leading-[0.85]">
              APRENDE<br /><span className="text-[#ff5540]">CONSTRUYENDO</span>
            </h1>
            <p className="text-base lg:text-lg text-[#ebbbb4]/70 font-light max-w-xl">
              Cursos gratuitos creados por la comunidad. Sin teoria vacia — construyes el proyecto completo desde cero.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-10">
            {(["TODOS", "INTERMEDIO", "AVANZADO"] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-2 font-label text-[9px] font-bold uppercase tracking-[0.2em] border transition-all ${
                  filter === level
                    ? "bg-[#ff5540] text-white border-[#ff5540]"
                    : "bg-transparent text-[#E5E2E1]/40 border-[#603e39]/30 hover:border-[#ff5540]/40 hover:text-[#E5E2E1]/60"
                }`}
              >
                {level}
              </button>
            ))}
            <span className="ml-auto text-[10px] font-label text-[#E5E2E1]/20 uppercase tracking-wider">
              {filtered.length} curso{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className={`bg-[#1c1b1b]/50 border p-6 transition-all group relative flex flex-col justify-between ${
                  course.available
                    ? "border-[#603e39]/20 hover:border-[#ff5540]/40 hover:bg-[#1c1b1b]"
                    : "border-[#603e39]/10 opacity-60"
                }`}
              >
                <div>
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 bg-[#201f1f] flex items-center justify-center border border-[#603e39]/30 group-hover:border-[#ff5540]/50 transition-colors">
                      <span className="material-symbols-outlined text-[#ff5540] text-xl">
                        {course.icon}
                      </span>
                    </div>
                    <span
                      className={`text-[8px] font-black px-2 py-0.5 font-label tracking-widest border ${
                        course.difficulty === "AVANZADO"
                          ? "bg-[#ff5540]/10 text-[#ff5540] border-[#ff5540]/20"
                          : "bg-[#ffb4a8]/10 text-[#ffb4a8] border-[#ffb4a8]/20"
                      }`}
                    >
                      {course.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline font-bold text-base uppercase tracking-tight text-white mb-2.5 group-hover:text-[#ff5540] transition-colors leading-tight">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#E5E2E1]/40 leading-relaxed mb-5">
                    {course.desc}
                  </p>

                  {/* What you'll learn */}
                  <div className="mb-5">
                    <span className="text-[8px] font-label font-bold text-[#ff5540]/70 tracking-[0.2em] uppercase mb-2 block">
                      APRENDERAS
                    </span>
                    <ul className="space-y-1.5">
                      {course.learns.map((item, j) => (
                        <li key={j} className="text-[11px] text-[#E5E2E1]/35 flex items-start gap-2">
                          <span className="text-[#ff5540]/40 mt-0.5 text-[7px]">&#9654;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#E5E2E1]/25">
                      <span className="material-symbols-outlined text-sm text-[#ff5540]/30">auto_stories</span>
                      {course.modules.length} modulos
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-[#603e39]/10">
                  {course.available ? (
                    <div className="w-full border border-[#ff5540]/30 text-[#ff5540] px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-[#ff5540] group-hover:text-white transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">play_arrow</span>
                      Ver curso
                    </div>
                  ) : (
                    <div className="w-full border border-[#603e39]/15 text-[#E5E2E1]/20 px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#ff5540]/30 animate-pulse"></span>
                      Proximamente
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Contribute CTA */}
          <div className="mt-16 border border-[#603e39]/20 bg-[#1c1b1b]/30 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline font-bold text-lg uppercase tracking-tight text-white mb-2">
                Quieres contribuir un curso?
              </h3>
              <p className="text-xs text-[#E5E2E1]/40 max-w-md">
                Los cursos son creados por la comunidad. Si tienes experiencia en un tema y quieres ensenarlo construyendo, unete al Discord y propon tu curso.
              </p>
            </div>
            <Link href="https://discord.gg/RPqWgsN5H6">
              <button className="flex-shrink-0 bg-[#ff5540] text-white px-8 py-4 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/></svg>
                Proponer curso
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
