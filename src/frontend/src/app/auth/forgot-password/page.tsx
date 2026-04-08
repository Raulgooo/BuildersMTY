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
    try {
      await sendPasswordResetLink(email);
    } catch {
      // Always show success (anti-enumeration)
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/builderslogo.svg" alt="BuildersMTY" width={28} height={28} />
            <span className="font-headline font-black text-xs uppercase tracking-tight text-white">Builders</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">
            Recuperar Contrasena
          </h1>
          <p className="text-xs text-[#E5E2E1]/40">Te enviaremos un enlace para restablecer tu contrasena</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="px-3 py-3 border border-green-500/30 bg-green-500/10 text-green-400 text-xs">
              Si existe una cuenta con ese email, recibiras un enlace para restablecer tu contrasena.
            </div>
            <Link
              href="/auth/courses"
              className="inline-block text-[11px] text-[#ff5540] hover:text-[#ff5540]/80 transition-colors"
            >
              Volver al inicio de sesion
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3 mb-5">
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#ff5540] text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "..." : "Enviar Enlace"}
              </button>
            </form>

            <div className="text-center">
              <Link
                href="/auth/courses"
                className="text-[11px] text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors"
              >
                Volver al inicio de sesion
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
