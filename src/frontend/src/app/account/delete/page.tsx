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
      <div className="bg-[#131313] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#ff5540] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.replace("/auth/courses");
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
      await deleteAccount();
      await logout();
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar cuenta");
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
            <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5 text-red-400">
              Eliminar Cuenta
            </h1>
            <p className="text-xs text-[#E5E2E1]/40">Esta accion es permanente e irreversible</p>
          </div>

          <div className="bg-[#1c1b1b] border border-red-500/20 p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 text-xl mt-0.5">warning</span>
              <div>
                <p className="text-xs text-[#E5E2E1]/70 mb-2">Al eliminar tu cuenta:</p>
                <ul className="text-[10px] text-[#E5E2E1]/40 space-y-1">
                  <li>- Se eliminaran todos tus datos de autenticacion</li>
                  <li>- Perderas acceso a los cursos y recursos</li>
                  <li>- Esta accion no se puede deshacer</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                Escribe ELIMINAR para confirmar
              </label>
              <input
                type="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="ELIMINAR"
                className="w-full bg-[#1c1b1b] border border-red-500/20 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-red-500/50 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={handleDelete}
              disabled={submitting || confirmation !== "ELIMINAR"}
              className="w-full bg-red-600 text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? "..." : "Eliminar Mi Cuenta Permanentemente"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
