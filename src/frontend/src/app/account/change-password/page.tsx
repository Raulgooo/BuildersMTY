"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { changePassword } from "@/lib/shark";

export default function ChangePasswordPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="bg-[var(--surface-0)] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[var(--red)] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.replace("/auth/login");
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }

    if (newPassword.length < 8) {
      setError("La nueva contrasena debe tener al menos 8 caracteres");
      return;
    }

    setSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cambiar contrasena");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[var(--surface-0)] font-sans selection:bg-[var(--red)] selection:text-white min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-sm mx-auto">
          <div className="mb-8">
            <Link
              href="/account"
              className="text-[10px] font-mono text-[var(--text-ghost)] hover:text-[var(--red)] transition-colors uppercase tracking-widest inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Volver a Mi Cuenta
            </Link>
          </div>

          <div className="mb-10 text-center">
            <h1 className="font-[family-name:var(--font-archivo-black)] text-3xl uppercase tracking-tighter mb-2" style={{ color: "var(--text-primary)" }}>
              Cambiar Contraseña
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Actualiza tus crdenciales de acceso de forma segura.</p>
          </div>

          {success ? (
            <div className="text-center space-y-6">
              <div className="px-5 py-4 border border-green-500/20 bg-green-500/5 text-green-400 text-sm font-bold tracking-wide">
                Contraseña actualizada exitosamente.
              </div>
              <Link
                href="/account"
                className="inline-block px-6 py-3 border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-colors text-xs font-mono uppercase tracking-widest"
              >
                Continuar
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 px-4 py-3 border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-bold tracking-wide">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-ghost)] tracking-[0.2em] uppercase mb-2">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="********"
                    className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--red)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-ghost)] tracking-[0.2em] uppercase mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="********"
                    className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--red)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-ghost)] tracking-[0.2em] uppercase mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="********"
                    className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--red)] focus:outline-none transition-colors mb-4"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[var(--red)] text-white px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,26,26,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {submitting ? "ACTUALIZANDO..." : "ACTUALIZAR CONTRASEÑA"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
