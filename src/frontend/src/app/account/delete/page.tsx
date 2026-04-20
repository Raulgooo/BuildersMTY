"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { deleteAccount } from "@/lib/shark";

export default function DeleteAccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
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

  async function handleDelete() {
    setError("");
    if (confirmation !== "ELIMINAR") {
      setError("Escribe ELIMINAR para confirmar");
      return;
    }
    setSubmitting(true);
    try {
      await deleteAccount(user!.id);
      await logout();
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar cuenta");
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
              className="text-[10px] font-mono text-[var(--text-ghost)] hover:text-red-500 transition-colors uppercase tracking-widest inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Volver a Mi Cuenta
            </Link>
          </div>

          <div className="mb-10 text-center">
            <h1 className="font-[family-name:var(--font-archivo-black)] text-3xl uppercase tracking-tighter mb-2 text-red-500">
              Eliminar Cuenta
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Esta acción es permanente e irreversible.</p>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 p-6 mb-8">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-red-500 text-2xl mt-0.5">warning</span>
              <div>
                <p className="text-sm text-red-400 font-bold mb-3 tracking-wide">Al eliminar tu cuenta:</p>
                <ul className="text-xs text-red-400/80 space-y-2">
                  <li>- Se eliminarán todos tus datos de autenticación y perfil</li>
                  <li>- Perderás acceso a los cursos y recursos</li>
                  <li>- Esta acción no se puede deshacer</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-bold tracking-wide">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-red-500/70 tracking-[0.2em] uppercase mb-2">
                Escribe ELIMINAR para confirmar
              </label>
              <input
                type="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="ELIMINAR"
                className="w-full bg-[var(--surface-1)] border border-red-500/30 px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-red-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={handleDelete}
              disabled={submitting || confirmation !== "ELIMINAR"}
              className="w-full bg-red-600 text-white px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.2)] mt-2"
            >
              {submitting ? "ELIMINANDO..." : "ELIMINAR PERMANENTEMENTE"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
