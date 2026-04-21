function Step({
  number,
  title,
  description,
  detail,
}: {
  number: string;
  title: string;
  description: string;
  detail: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[140px_1fr] md:gap-12">
      {/* Leading numeral — editorial, serif, weighs the column */}
      <div className="flex items-baseline gap-3 md:justify-end">
        <span className="font-serif text-[72px] font-light italic leading-none tracking-tight text-text-muted md:text-[96px]">
          {number}
        </span>
      </div>

      <div className="border-t border-border pt-7">
        <h3 className="text-xl font-semibold tracking-tight sm:text-[22px]">
          {title}
        </h3>
        <p
          className="mt-4 max-w-[520px] text-[15px] text-text-muted"
          style={{ lineHeight: 1.7 }}
        >
          {description}
        </p>
        <p className="mt-5 font-mono text-[11px] tracking-wide text-text-dim">
          {detail}
        </p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1000px]">
        {/* Section head — kicker + numeric counterweight */}
        <div className="grid grid-cols-12 items-end gap-x-6 pb-16">
          <p className="col-span-12 font-mono text-[11px] uppercase tracking-[0.22em] text-text-dim md:col-span-8">
            § Método
          </p>
          <h2
            className="col-span-12 mt-4 font-semibold tracking-tight md:col-span-8 md:mt-6"
            style={{
              fontSize: "clamp(2rem, 1rem + 2.6vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            Tres pasos. Sin ceremonia.
          </h2>
          <p className="col-span-12 mt-6 max-w-md text-[15px] text-text-muted md:col-span-4 md:mt-0 md:justify-self-end md:text-right">
            El flujo completo, de la especificación al repositorio en tu
            GitHub.
          </p>
        </div>

        <div className="space-y-20 md:space-y-24">
          <Step
            number="01"
            title="Eliges un proyecto y un nivel."
            description="Un HTTP server, un resolver DNS, un cliente Git — los problemas que equipos de ingeniería resuelven en producción. Cada proyecto escala por submódulos: la base para juniors, concurrencia y edge cases para seniors."
            detail="http-server · dns-resolver · git-clone"
          />
          <Step
            number="02"
            title="Abres el editor y construyes."
            description="El entorno vive en tu navegador: editor, terminal y pruebas automatizadas. Cada submódulo entrega una especificación precisa y valida tu código al guardar. Cómo lo resuelves es cosa tuya."
            detail="func handleConnection(conn net.Conn) { /* ... */ }"
          />
          <Step
            number="03"
            title="Entregas código real."
            description="Tu proyecto terminado aparece en tu GitHub con tu historial de commits — no un fork, no un template. Un reclutador abre el repo y lee cómo piensas. La certificación va a LinkedIn con verificación pública."
            detail="github.com/tu-usuario/http-server"
          />
        </div>
      </div>
    </section>
  );
}
