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
    <div className="min-h-screen" style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}>
      <Header />
      <main className="pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="mb-12 animate-fade-up">
            <p className="text-[12px] font-medium tracking-wide mb-6" style={{ color: "var(--red)" }}>
              BuildMancer — Próximamente
            </p>
            <h1
              className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.9] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Build<span style={{ color: "var(--red)" }}>Mancer</span>
            </h1>
            <p className="text-base max-w-lg" style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}>
              La plataforma de cursos de BuildersMTY. Programa proyectos complejos directo en tu navegador — cero dependencias, cero setup. Guías paso a paso para construir tu propio servidor HTTP, allocator de memoria, shell y más. Al completar, el repo completo con historial de commits se sube a tu GitHub.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-10">
            {(["TODOS", "INTERMEDIO", "AVANZADO"] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all"
                style={{
                  background: filter === level ? "var(--red)" : "transparent",
                  color: filter === level ? "white" : "var(--text-tertiary)",
                  border: `1px solid ${filter === level ? "var(--red)" : "var(--border)"}`,
                }}
              >
                {level}
              </button>
            ))}
            <span className="ml-auto text-[11px]" style={{ color: "var(--text-ghost)" }}>
              {filtered.length} curso{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {filtered.map((course) => (
              <div
                key={course.id}
                className={`p-6 flex flex-col justify-between cursor-default group transition-colors ${
                  course.available ? "hover:bg-[var(--surface-1)]" : "opacity-50"
                }`}
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 flex items-center justify-center transition-colors"
                      style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ color: "var(--red)" }}>
                        {course.icon}
                      </span>
                    </div>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest"
                      style={{
                        background: course.difficulty === "AVANZADO" ? "var(--red-wash)" : "var(--surface-2)",
                        color: course.difficulty === "AVANZADO" ? "var(--red)" : "var(--text-secondary)",
                        border: `1px solid ${course.difficulty === "AVANZADO" ? "var(--red-dim)" : "var(--border)"}`,
                      }}
                    >
                      {course.difficulty}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-archivo-black)] text-sm uppercase tracking-tight mb-2 group-hover:text-[var(--red)] transition-colors leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed mb-5" style={{ color: "var(--text-tertiary)" }}>
                    {course.desc}
                  </p>

                  <div className="mb-5">
                    <span className="text-[9px] font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--red-dim)" }}>
                      Aprenderás
                    </span>
                    <ul className="space-y-1.5">
                      {course.learns.map((item, j) => (
                        <li key={j} className="text-[11px] flex items-start gap-2" style={{ color: "var(--text-ghost)" }}>
                          <span className="mt-1 text-[8px]" style={{ color: "var(--red-dim)" }}>▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] mb-5" style={{ color: "var(--text-ghost)" }}>
                    <span className="material-symbols-outlined text-sm" style={{ color: "var(--red-dim)" }}>auto_stories</span>
                    {course.modules.length} módulos
                  </div>
                </div>

                <div className="pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="w-full py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2" style={{ color: "var(--text-ghost)" }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--red-dim)" }} />
                      Próximamente
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contribute CTA */}
          <div className="mt-16 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6" style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-1)" }}>
            <div>
              <h3 className="font-[family-name:var(--font-archivo-black)] text-lg uppercase tracking-tight mb-2">
                ¿Quieres contribuir un curso a BuildMancer?
              </h3>
              <p className="text-sm max-w-md" style={{ color: "var(--text-tertiary)" }}>
                Los cursos son creados por la comunidad. Si tienes experiencia en un tema, únete al Discord y propón tu curso.
              </p>
            </div>
            <Link href="https://discord.gg/RPqWgsN5H6">
              <button className="flex-shrink-0 text-white px-8 py-4 text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity" style={{ background: "var(--red)" }}>
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
