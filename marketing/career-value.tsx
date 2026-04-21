import { ScrollReveal } from "./scroll-reveal";

function ValueBand({
  index,
  kicker,
  heading,
  accent,
  description,
  align,
}: {
  index: string;
  kicker: string;
  heading: string;
  accent: string;
  description: string;
  align: "left" | "right";
}) {
  return (
    <div className="border-t border-border px-6 py-20 md:py-28">
      <div
        className={`mx-auto grid max-w-[1200px] grid-cols-12 gap-x-6 ${
          align === "right" ? "text-right" : ""
        }`}
      >
        <p
          className={`col-span-12 font-mono text-[11px] uppercase tracking-[0.22em] text-text-dim md:col-span-10 ${
            align === "right" ? "md:col-start-3 md:justify-self-end" : ""
          }`}
        >
          <span className="text-border">{index}</span>{" "}
          <span className="ml-2">{kicker}</span>
        </p>

        <h3
          className={`col-span-12 mt-6 font-semibold tracking-tight md:col-span-10 ${
            align === "right" ? "md:col-start-3" : ""
          }`}
          style={{
            fontSize: "clamp(2rem, 1rem + 3.2vw, 4.25rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}
        >
          {heading}{" "}
          <span className="font-serif italic">{accent}</span>
        </h3>

        <p
          className={`col-span-12 mt-7 max-w-md text-[15px] text-text-muted md:col-span-6 ${
            align === "right" ? "md:col-start-7 md:justify-self-end" : ""
          }`}
          style={{ lineHeight: 1.7 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function CareerValue() {
  return (
    <section>
      <ScrollReveal>
        <ValueBand
          index="→ 01"
          kicker="Portafolio"
          heading="Tu código."
          accent="Tu GitHub."
          description="Cada proyecto terminado vive en tu perfil con tu historial de commits real. Ni fork, ni template. Un reclutador puede abrir tu repo y leer, línea por línea, cómo resolviste el problema."
          align="left"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ValueBand
          index="→ 02"
          kicker="Fricción"
          heading="Zero"
          accent="configuración."
          description="Sin instalar Go. Sin configurar Docker. Sin perder la tarde en una dependencia rota. Abres el navegador y escribes la primera línea en menos de un minuto."
          align="right"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ValueBand
          index="→ 03"
          kicker="No es un curso"
          heading="Especificación."
          accent="No hand-holding."
          description="No hay videos. No hay lectures. Recibes un editor, una especificación técnica y pruebas automatizadas. Tú decides la arquitectura — como en un equipo de ingeniería que respeta tu tiempo."
          align="left"
        />
      </ScrollReveal>
    </section>
  );
}
