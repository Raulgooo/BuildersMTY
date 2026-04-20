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
    if (password !== confirmPassword) { setError("Las contraseñas no coinciden"); return; }
    if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres"); return; }
    if (!token) { setError("Token inválido o faltante"); return; }
    setSubmitting(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Token inválido o expirado");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full bg-[var(--surface-1)] border border-[var(--border)] px-4 py-3 text-sm placeholder:text-[var(--text-ghost)] focus:border-[var(--red)] focus:outline-none transition-colors";

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
          <h1 className="font-[family-name:var(--font-archivo-black)] text-xl uppercase tracking-tight mb-2">Nueva Contraseña</h1>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Ingresa tu nueva contraseña</p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="p-3 text-sm" style={{ background: "oklch(35% 0.1 150 / 0.15)", border: "1px solid oklch(45% 0.1 150 / 0.3)", color: "oklch(65% 0.15 150)" }}>
              Tu contraseña ha sido actualizada exitosamente.
            </div>
            <Link href="/auth/login" className="inline-block text-white px-5 py-3.5 text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-all" style={{ background: "var(--red)" }}>
              Iniciar Sesión
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 text-sm" style={{ background: "var(--red-wash)", border: "1px solid var(--red-dim)", color: "var(--red-light)" }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 mb-5">
              <div>
                <label className="block text-[11px] font-medium tracking-wide mb-2" style={{ color: "var(--text-ghost)" }}>Nueva Contraseña</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <div>
                <label className="block text-[11px] font-medium tracking-wide mb-2" style={{ color: "var(--text-ghost)" }}>Confirmar Contraseña</label>
                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <button type="submit" disabled={submitting} className="w-full text-white px-5 py-3.5 text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50" style={{ background: "var(--red)" }}>
                {submitting ? "..." : "Restablecer Contraseña"}
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--surface-0)" }}>
        <div className="w-12 h-12 animate-spin" style={{ border: "2px solid var(--red)", borderTopColor: "transparent" }} />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
