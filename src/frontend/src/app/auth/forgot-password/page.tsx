"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { sendPasswordResetLink } from "@/lib/shark";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try { await sendPasswordResetLink(email); } catch { /* anti-enumeration */ }
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/builderslogo2.svg" alt="BuildersMTY" width={32} height={32} />
            <span className="font-[family-name:var(--font-archivo-black)] text-sm uppercase tracking-tight">BuildersMTY</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-archivo-black)] text-xl uppercase tracking-tight mb-2">
            Recuperar Contraseña
          </h1>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Te enviaremos un enlace para restablecer tu contraseña</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="p-3 text-sm" style={{ background: "oklch(35% 0.1 150 / 0.15)", border: "1px solid oklch(45% 0.1 150 / 0.3)", color: "oklch(65% 0.15 150)" }}>
              Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.
            </div>
            <Link href="/auth/login" className="inline-block text-[12px] hover:text-[var(--red)] transition-colors" style={{ color: "var(--text-ghost)" }}>
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4 mb-5">
              <div>
                <label className="block text-[11px] font-medium tracking-wide mb-2" style={{ color: "var(--text-ghost)" }}>Email</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com"
                  className="w-full bg-[var(--surface-1)] border border-[var(--border)] px-4 py-3 text-sm placeholder:text-[var(--text-ghost)] focus:border-[var(--red)] focus:outline-none transition-colors"
                />
              </div>
              <button type="submit" disabled={submitting} className="w-full text-white px-5 py-3.5 text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50" style={{ background: "var(--red)" }}>
                {submitting ? "..." : "Enviar Enlace"}
              </button>
            </form>
            <div className="text-center">
              <Link href="/auth/login" className="text-[12px] hover:text-[var(--red)] transition-colors" style={{ color: "var(--text-ghost)" }}>
                Volver al inicio de sesión
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
