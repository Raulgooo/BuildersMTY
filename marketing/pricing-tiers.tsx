import Link from "next/link";

/**
 * Pricing tiers — editorial composition.
 *
 * Deliberate anti-pattern against 3-equal-cards:
 *  - Left column: Free tier rendered as a quiet "footnote" (small, text-only)
 *  - Center column: recommended tier — oversized serif price, taller panel, the lone red element
 *  - Right column: student tier as a stamped marginalia note with a handwritten-style tag
 *
 * Features are NOT bullet-lists with checkmarks. They're numbered spec entries
 * (01 / 02 / 03) reading like a datasheet — "serif dash" dividers, no icons.
 */

const freeFeatures = [
  "Un proyecto completo",
  "Editor y runner en navegador",
  "Sin tarjeta de credito",
];

const proFeatures = [
  { k: "Proyectos", v: "Todos, todos los niveles" },
  { k: "Lenguajes", v: "Go, Python, TypeScript y mas" },
  { k: "Evaluacion", v: "Pruebas automatizadas en vivo" },
  { k: "Portafolio", v: "Export a GitHub con historial real" },
  { k: "Acreditacion", v: "Certificado verificable en LinkedIn" },
];

const studentFeatures = [
  "Todo lo anterior",
  "Verificacion con correo .edu",
  "Descuento vitalicio mientras estudies",
];

export function PricingTiers() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        {/* FREE — small footnote on the left */}
        <aside className="md:col-span-3 md:pt-24">
          <div className="border-t border-border pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
              Plan 00 — Prueba
            </p>
            <h3 className="mt-4 font-serif text-3xl italic leading-none text-text">
              Gratis
            </h3>
            <p className="mt-3 font-mono text-xs text-text-dim">
              sin limite de tiempo
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-text-muted">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="font-serif text-text-dim select-none"
                  >
                    —
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-text underline decoration-border decoration-1 underline-offset-[6px] transition-colors hover:decoration-text"
            >
              Empezar sin pagar
              <span aria-hidden className="text-text-dim">&rarr;</span>
            </Link>
          </div>
        </aside>

        {/* BUILDMANCER — the centerpiece */}
        <article className="md:col-span-6 md:col-start-4">
          <div className="relative border border-border bg-surface-alt/60 px-8 py-12 md:px-14 md:py-16">
            {/* Editorial marker — replaces the banned "Most popular" ribbon */}
            <div className="absolute left-0 top-0 flex items-center gap-2 bg-bg px-3 py-1.5 -translate-y-1/2 ml-8">
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Recomendado
              </span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
              Plan 01 — Acceso completo
            </p>
            <h3 className="mt-5 font-serif text-6xl leading-[0.9] tracking-tight text-text md:text-7xl">
              Buildmancer
            </h3>

            {/* Price — editorial, serif, oversized */}
            <div className="mt-10 flex items-end gap-4">
              <span className="font-serif text-[96px] leading-none tracking-tight text-text md:text-[128px]">
                199
              </span>
              <div className="flex flex-col pb-3 leading-tight">
                <span className="font-mono text-sm uppercase tracking-widest text-text-muted">
                  MXN
                </span>
                <span className="mt-1 font-mono text-xs text-text-dim">
                  / mes
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">
              Acceso irrestricto a cada proyecto, en cada lenguaje, de junior
              hasta senior. Construye tu portafolio real mientras aprendes.
            </p>

            {/* Spec-sheet style features */}
            <dl className="mt-12 divide-y divide-border border-y border-border">
              {proFeatures.map((f, i) => (
                <div
                  key={f.k}
                  className="grid grid-cols-12 items-baseline gap-4 py-4"
                >
                  <dt className="col-span-1 font-mono text-[11px] text-text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </dt>
                  <dd className="col-span-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                    {f.k}
                  </dd>
                  <dd className="col-span-7 text-sm text-text">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Suscribirme
              </Link>
              <p className="font-mono text-xs text-text-dim">
                Cancela cuando quieras. Sin contrato.
              </p>
            </div>
          </div>
        </article>

        {/* STUDENT — marginalia */}
        <aside className="md:col-span-3 md:col-start-10 md:pt-24">
          <div className="relative border-t border-border pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
              Plan 02 — .edu
            </p>
            <h3 className="mt-4 font-serif text-3xl italic leading-none text-text">
              Estudiante
            </h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-4xl text-text">149</span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                mxn / mes
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Verifica tu correo institucional. Conservas el descuento mientras
              tu cuenta siga activa.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text-muted">
              {studentFeatures.map((f) => (
                <li key={f} className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="font-serif text-text-dim select-none"
                  >
                    —
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-text underline decoration-border decoration-1 underline-offset-[6px] transition-colors hover:decoration-text"
            >
              Verificar .edu
              <span aria-hidden className="text-text-dim">&rarr;</span>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
