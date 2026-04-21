import Link from "next/link";

export function PricingTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      {/* Bottom-right ambient glow — one red presence, off-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 85% 100%, rgba(255,0,0,0.055) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-12 gap-x-6 px-6 py-28 md:py-36">
        {/* Left column — the pitch */}
        <div className="col-span-12 md:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-dim">
            § Empieza
          </p>
          <h2
            className="mt-6 font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2.25rem, 1.1rem + 3.6vw, 4.5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
            }}
          >
            Deja de practicar{" "}
            <span className="font-serif italic">en el vacío.</span>
          </h2>
          <p
            className="mt-8 max-w-lg text-[15px] text-text-muted"
            style={{ lineHeight: 1.7 }}
          >
            Un proyecto completo gratis. Si te convence — y convence — desbloquea
            el catálogo completo por el costo de dos cafés al mes.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/courses"
              className="inline-flex items-center rounded-full bg-primary px-7 py-3 text-[13px] font-medium tracking-wide text-white transition-colors duration-200 hover:bg-primary-hover"
            >
              Abrir el editor
            </Link>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 text-[13px] text-text-muted transition-colors duration-200 hover:text-text"
            >
              <span>Ver planes</span>
              <span
                aria-hidden
                className="h-px w-8 bg-border transition-all duration-200 group-hover:w-12 group-hover:bg-text"
              />
            </Link>
          </div>
        </div>

        {/* Right column — price as a line item, not a card */}
        <aside className="col-span-12 mt-16 border-t border-border pt-10 md:col-span-4 md:col-start-9 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-10">
          <dl className="space-y-7 font-mono text-[11px] uppercase tracking-[0.22em] text-text-dim">
            <div>
              <dt>Gratuito</dt>
              <dd className="mt-2 font-sans text-[15px] normal-case tracking-normal text-text">
                Un proyecto completo, sin restricciones artificiales.
              </dd>
            </div>
            <div>
              <dt>Builder</dt>
              <dd className="mt-2 flex items-baseline gap-2 font-sans normal-case tracking-normal text-text">
                <span className="text-[28px] font-semibold tracking-tight">
                  $149
                </span>
                <span className="text-[13px] text-text-muted">MXN / mes</span>
              </dd>
              <p className="mt-2 font-sans text-[12px] normal-case tracking-normal text-text-dim">
                Acceso completo. Sin contratos. Cancelas cuando quieras.
              </p>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
