export function Manifesto() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-48">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-x-6">
        {/* Attribution strip — mono, runs vertically on desktop like a margin note */}
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-dim">
            § Manifiesto
          </p>
        </div>

        {/* Pull quote — full serif, offset, oversized */}
        <blockquote
          className="col-span-12 mt-6 md:col-span-10 md:mt-0"
          style={{ letterSpacing: "-0.015em" }}
        >
          <p
            className="font-serif italic text-text"
            style={{
              fontSize: "clamp(1.75rem, 0.9rem + 2.8vw, 3.5rem)",
              lineHeight: 1.18,
            }}
          >
            Los mejores ingenieros no nacieron viendo tutoriales. Leyeron
            especificaciones, rompieron cosas, escribieron pruebas y volvieron
            a empezar. Aquí haces{" "}
            <span className="not-italic font-sans font-semibold text-text">
              lo mismo
            </span>
            , sin perder un fin de semana configurando el entorno.
          </p>

          <footer className="mt-10 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-dim">
            <span className="h-px w-10 bg-border" />
            <span>Builders · MX</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
