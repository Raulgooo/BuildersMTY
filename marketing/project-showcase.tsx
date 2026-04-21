import Link from "next/link";
import type { CourseSummary } from "@/lib/types";

interface ProjectShowcaseProps {
  courses: CourseSummary[];
}

function hoursLine(h: CourseSummary["estimated_hours"]): string {
  return `${h.junior}h · ${h.mid}h · ${h.senior}h`;
}

export function ProjectShowcase({ courses }: ProjectShowcaseProps) {
  if (courses.length === 0) return null;

  return (
    <section id="proyectos" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        {/* Section head — wide, asymmetric */}
        <div className="grid grid-cols-12 items-end gap-x-6 pb-20">
          <p className="col-span-12 font-mono text-[11px] uppercase tracking-[0.22em] text-text-dim md:col-span-8">
            § Índice de proyectos
          </p>
          <h2
            className="col-span-12 mt-4 font-semibold tracking-tight md:col-span-9 md:mt-6"
            style={{
              fontSize: "clamp(2rem, 1rem + 3vw, 3.75rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            Problemas que se{" "}
            <span className="font-serif italic">resuelven en producción.</span>
          </h2>
        </div>

        {/* Ruled index — each row is a project. No cards, no gradients. */}
        <ol className="divide-y divide-border border-y border-border">
          {courses.map((course, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <li key={course.slug}>
                <Link
                  href={`/courses/${course.slug}`}
                  className="group grid grid-cols-12 items-start gap-x-6 gap-y-3 px-1 py-8 transition-colors duration-200 hover:bg-surface-alt/40 md:py-10"
                >
                  {/* Numeral */}
                  <span className="col-span-2 font-mono text-[11px] tracking-wide text-text-dim md:col-span-1">
                    {idx}
                  </span>

                  {/* Title + description */}
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="font-semibold tracking-tight transition-colors duration-200 group-hover:text-text md:text-[22px]">
                      {course.title}
                    </h3>
                    <p
                      className="mt-2 max-w-xl text-[14px] text-text-muted"
                      style={{ lineHeight: 1.65 }}
                    >
                      {course.description}
                    </p>
                  </div>

                  {/* Metadata column — monospace, right-aligned on desktop */}
                  <div className="col-span-12 flex flex-col gap-1 font-mono text-[11px] tracking-wide text-text-dim md:col-span-4 md:col-start-9 md:items-end md:text-right">
                    <span className="uppercase">
                      {course.language} · {course.difficulty}
                    </span>
                    <span>{hoursLine(course.estimated_hours)}</span>
                  </div>

                  {/* Affordance — a single rule that extends on hover */}
                  <span
                    aria-hidden
                    className="col-span-12 mt-2 flex items-center gap-3 text-[11px] text-text-dim transition-colors duration-200 group-hover:text-text md:col-span-11 md:col-start-2"
                  >
                    <span className="h-px w-8 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-text-muted" />
                    <span className="uppercase tracking-[0.22em]">
                      Comenzar
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 font-mono text-[11px] tracking-wide text-text-dim">
          Más proyectos se agregan mensualmente. Sugerencias de especificación
          abiertas en el repo.
        </p>
      </div>
    </section>
  );
}
