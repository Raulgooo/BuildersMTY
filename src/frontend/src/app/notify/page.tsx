"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotifyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, joinDiscord: boolean = false) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setLoading(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from("leads")
        .insert([{ name, email }]);

      if (supabaseError) {
        if (supabaseError.code === "23505") {
          setSubmitted(true);
          if (joinDiscord) window.open("https://discord.gg/RPqWgsN5H6", "_blank");
          return;
        }
        throw supabaseError;
      }

      setSubmitted(true);
      if (joinDiscord) window.open("https://discord.gg/RPqWgsN5H6", "_blank");
    } catch (err: unknown) {
      console.error("Error submitting lead:", err);
      const message = err instanceof Error ? err.message : "Inténtalo de nuevo.";
      if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
        setError("Error de conexión. Verifica tu internet e inténtalo de nuevo.");
      } else {
        setError("Error al registrar: " + message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}>
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 lg:px-10 py-32">
        <div className="max-w-lg w-full animate-fade-up">
          <header className="space-y-5 mb-10">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5"
                style={{ background: submitted ? "oklch(65% 0.2 150)" : "var(--red)" }}
              />
              <span className="text-[12px] font-medium tracking-wide" style={{ color: "var(--text-tertiary)" }}>
                {submitted ? "Registro completado" : "Suscripción"}
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.88] flex flex-wrap items-end gap-3"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              {submitted ? (
                <>¡Estás <br /><span style={{ color: "oklch(65% 0.2 150)" }}>Dentro.</span></>
              ) : (
                <>Únete a la <br /><span style={{ color: "var(--red)" }}>Red.</span></>
              )}
              <Image
                src="/builderslogo2.svg"
                alt="BuildersMTY"
                width={56}
                height={56}
                className="w-12 h-12 lg:w-14 lg:h-14 object-contain opacity-40 mb-1"
              />
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {submitted
                ? "Tu registro ha sido exitoso. Prepárate para los próximos commits."
                : "Te avisaremos cuando estemos listos. Estamos consiguiendo competencia y jueces increíbles para ti."
              }
            </p>
          </header>

          {!submitted ? (
            <form className="space-y-8" onSubmit={(e) => handleSubmit(e, true)}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-[11px] font-medium tracking-wide block mb-2" style={{ color: "var(--text-ghost)" }}>
                    Nombre o alias
                  </label>
                  <input
                    required
                    id="name"
                    className="w-full bg-transparent py-4 text-lg font-medium placeholder:text-[var(--text-ghost)] transition-colors outline-none"
                    style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}
                    placeholder="Tu nombre"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-[11px] font-medium tracking-wide block mb-2" style={{ color: "var(--text-ghost)" }}>
                    Email
                  </label>
                  <input
                    required
                    id="email"
                    className="w-full bg-transparent py-4 text-lg font-medium placeholder:text-[var(--text-ghost)] transition-colors outline-none"
                    style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}
                    placeholder="tu@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 text-sm" style={{ background: "var(--red-wash)", border: "1px solid var(--red-dim)", color: "var(--red-light)" }}>
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3"
                  style={{ background: "var(--red)" }}
                >
                  {loading ? "Procesando..." : "Unirse a Discord"}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, false)}
                  className="px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:text-[var(--red)] transition-colors disabled:opacity-50"
                  style={{ border: "1px solid var(--border)", color: "var(--text-tertiary)" }}
                >
                  {loading ? "Cargando..." : "Solo notifícame"}
                </button>
              </div>

              <p className="text-[11px]" style={{ color: "var(--text-ghost)" }}>
                Al suscribirte, aceptas recibir notificaciones de sistema.
              </p>
            </form>
          ) : (
            <div className="pt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:translate-x-1 transition-transform"
                style={{ color: "var(--red)" }}
              >
                <span className="material-symbols-outlined">west</span>
                Volver a la base
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
