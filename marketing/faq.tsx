"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "¿En qué se diferencia de un bootcamp?",
    answer: "No hay videos, no hay lectures, no hay instructor. Recibes una especificación técnica, un editor en el navegador y pruebas automatizadas. Tú decides cómo resolver cada problema — como en un equipo de ingeniería real.",
  },
  {
    question: "¿Necesito instalar algo?",
    answer: "No. El editor, el entorno de ejecución y las pruebas viven en tu navegador. Abres la página, eliges un proyecto y empiezas a escribir código.",
  },
  {
    question: "¿Para qué nivel de experiencia es?",
    answer: "Cada proyecto tiene submódulos que escalan en dificultad. Juniors construyen la implementación base. Seniors enfrentan concurrencia, optimización y edge cases. Tú avanzas a tu ritmo.",
  },
  {
    question: "¿Qué incluye el plan gratuito?",
    answer: "Un proyecto completo con editor, pruebas automatizadas y entorno de desarrollo. Sin restricciones artificiales.",
  },
  {
    question: "¿Cómo funciona la exportación a GitHub?",
    answer: "Al completar un proyecto, el repositorio aparece en tu cuenta de GitHub con tu historial de commits y README profesional.",
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer: "Sí. Sin contratos, sin preguntas. Mantienes acceso hasta el final de tu periodo de facturación.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Preguntas <span className="font-serif italic text-primary">frecuentes</span>
        </h2>
        <div className="mt-12 divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between py-5 text-left text-sm font-medium hover:text-text-muted transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.question}
                <ChevronDown
                  size={16}
                  className={`ml-2 flex-shrink-0 text-text-dim transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <p className="pb-4 text-sm leading-relaxed text-text-muted">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
