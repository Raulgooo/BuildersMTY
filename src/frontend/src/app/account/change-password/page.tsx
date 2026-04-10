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
      <div className="bg-[#131313] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#ff5540] border-t-transparent animate-spin" />
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
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      <Header />
      <main className="ghost-grid pt-28 pb-20 px-6">
        <div className="max-w-sm mx-auto">
          <div className="mb-6">
            <Link
              href="/account"
              className="text-[10px] font-label text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors uppercase tracking-wider"
            >
              &larr; Mi Cuenta
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">
              Cambiar Contrasena
            </h1>
            <p className="text-xs text-[#E5E2E1]/40">Actualiza tu contrasena de acceso</p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="px-3 py-3 border border-green-500/30 bg-green-500/10 text-green-400 text-xs">
                Contrasena actualizada exitosamente.
              </div>
              <Link
                href="/account"
                className="inline-block text-[11px] text-[#ff5540] hover:text-[#ff5540]/80 transition-colors"
              >
                Volver a Mi Cuenta
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
                    Contrasena Actual
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="********"
                    className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                    Nueva Contrasena
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="********"
                    className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                    Confirmar Nueva Contrasena
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
                  {submitting ? "..." : "Actualizar Contrasena"}
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
