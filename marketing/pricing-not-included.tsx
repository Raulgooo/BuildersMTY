/**
 * Anti-list: what the price does NOT include.
 *
 * Editorial inversion of the usual green-checkmark feature list. Each item is
 * crossed out with a strikethrough rule and paired with a short defense —
 * why we deliberately skip it. Reads like a manifesto footer.
 */

const notIncluded = [
  {
    item: "Videos pregrabados",
    defense: "Miras a alguien codear o codeas tu. Elegimos lo segundo.",
  },
  {
    item: "Instructor en vivo",
    defense: "Las pruebas son tu feedback. Honesto, instantaneo, sin ego.",
  },
  {
    item: "Certificado decorativo",
    defense: "El repositorio en tu GitHub vale mas que un PDF en Canva.",
  },
  {
    item: "Foros de comunidad",
    defense: "Aqui vienes a construir. Discord esta a un click si lo quieres.",
  },
];

export function PricingNotIncluded() {
  return (
    <section className="px-6 py-24 border-y border-border">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">
              Lo que no pagas
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-text md:text-5xl">
              No cobramos
              <br />
              por lo que
              <br />
              <span className="italic">no sirve.</span>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-muted">
              Cada peso de tu suscripcion va a proyectos, infraestructura de
              ejecucion y pruebas. Nada mas.
            </p>
          </div>

          <ul className="md:col-span-8 md:pl-8">
            {notIncluded.map((n, i) => (
              <li
                key={n.item}
                className="grid grid-cols-12 gap-4 border-t border-border py-6 last:border-b"
              >
                <span className="col-span-1 font-mono text-[11px] text-text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-11 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                  <span className="font-serif text-xl italic text-text-muted line-through decoration-text-dim/60 decoration-1 md:w-56 md:flex-none">
                    {n.item}
                  </span>
                  <span className="text-sm leading-relaxed text-text-muted md:flex-1">
                    {n.defense}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
