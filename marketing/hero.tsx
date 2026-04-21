import Link from "next/link";
import { EnvironmentFrame } from "./environment-frame";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Single ambient red — stays far-right so it never competes with the CTA red */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 85% 35%, rgba(255,0,0,0.045) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-12 gap-x-6 gap-y-16 px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Dateline — editorial signal */}
        <div
          className="hero-animate col-span-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-text-dim"
          style={{ animationDelay: "0s" }}
        >
          <span className="font-mono">MX · 2026</span>
          <span className="h-px w-8 bg-border" />
          <span>Una plataforma de ingeniería, no un curso</span>
        </div>

        {/* Headline — serif display, asymmetric, hangs into the grid */}
        <h1
          className="hero-animate col-span-12 font-semibold tracking-tight lg:col-span-11"
          style={{
            animationDelay: "0.1s",
            fontSize: "clamp(2.75rem, 1.1rem + 5.6vw, 6.25rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block">Escribe el código.</span>
          <span className="block pl-[0.6em] text-text-muted">
            Pasa las pruebas.
          </span>
          <span className="mt-1 block font-serif italic text-primary">
            Llévatelo a GitHub.
          </span>
        </h1>

        {/* Copy + CTA — narrow column, offset right */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-1">
          <p
            className="hero-animate max-w-md text-[15px] text-text-muted"
            style={{ animationDelay: "0.35s", lineHeight: 1.7 }}
          >
            Proyectos con especificación de ingeniería real — HTTP servers,
            resolvers DNS, clientes Git — resueltos desde el navegador. Sin
            setup, sin videos, sin hand-holding. Entregas código que corre.
          </p>

          <div
            className="hero-animate mt-10 flex items-center gap-7"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              href="/courses"
              className="group inline-flex items-center gap-3 rounded-full border border-text/90 bg-text px-7 py-3 text-[13px] font-medium tracking-wide text-bg transition-colors duration-200 hover:border-text hover:bg-transparent hover:text-text"
            >
              <span>Abrir el editor</span>
              <span
                aria-hidden
                className="inline-block h-px w-4 bg-bg transition-all duration-200 group-hover:w-6 group-hover:bg-text"
              />
            </Link>
            <a
              href="#como-funciona"
              className="group inline-flex items-center gap-2 text-[13px] text-text-muted transition-colors duration-200 hover:text-text"
            >
              <span>Cómo funciona</span>
              <span
                aria-hidden
                className="h-px w-8 bg-border transition-all duration-200 group-hover:w-12 group-hover:bg-text"
              />
            </a>
          </div>
        </div>

        {/* Environment — right-column, captioned like a figure */}
        <figure
          className="hero-animate col-span-12 lg:col-span-8 lg:col-start-5 lg:row-start-3 lg:-mt-4 lg:-mr-[6%]"
          style={{ animationDelay: "0.45s" }}
        >
          <EnvironmentFrame />
          <figcaption className="mt-5 flex items-baseline justify-between font-mono text-[11px] text-text-dim">
            <span>
              <span className="text-text-muted">Fig. 01</span>{" "}
              <span className="text-border">/</span> El entorno de trabajo —
              editor, módulos y pruebas en una sola superficie.
            </span>
            <span className="hidden sm:inline">go · http-server · 05</span>
          </figcaption>
        </figure>
      </div>

      {/* Column rule — architectural, sits at the bottom of the hero */}
      <div className="mx-auto h-px max-w-[1200px] bg-border" />
    </section>
  );
}
