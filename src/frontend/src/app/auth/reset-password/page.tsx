"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { resetPassword } from "@/lib/shark";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }

    if (password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres");
      return;
    }

    if (!token) {
      setError("Token invalido o faltante");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Token invalido o expirado");
    } finally {
      setSubmitting(false);
    }
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
            Nueva Contrasena
          </h1>
          <p className="text-xs text-[#E5E2E1]/40">Ingresa tu nueva contrasena</p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="px-3 py-3 border border-green-500/30 bg-green-500/10 text-green-400 text-xs">
              Tu contrasena ha sido actualizada exitosamente.
            </div>
            <Link
              href="/auth/courses"
              className="inline-block bg-[#ff5540] text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all"
            >
              Iniciar Sesion
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 px-3 py-2 border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 mb-5">
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                  Nueva Contrasena
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                  Confirmar Contrasena
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#ff5540] text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "..." : "Restablecer Contrasena"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#131313] min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-[#ff5540] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
