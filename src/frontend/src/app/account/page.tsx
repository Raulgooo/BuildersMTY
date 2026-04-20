"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

const settingsItems = [
  {
    title: "Cambiar Contrasena",
    description: "Actualiza tu contrasena de acceso",
    href: "/account/change-password",
    icon: "lock",
  },
  {
    title: "Autenticacion MFA",
    description: "Configura autenticacion de dos factores (TOTP)",
    href: "/account/mfa",
    icon: "security",
  },
  {
    title: "Eliminar Cuenta",
    description: "Elimina permanentemente tu cuenta y datos",
    href: "/account/delete",
    icon: "delete_forever",
    danger: true,
  },
];

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

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

  return (
    <div className="bg-[var(--surface-0)] font-sans selection:bg-[var(--red)] selection:text-white min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-12">
            <div className="text-[var(--red)] font-mono text-[10px] tracking-[0.4em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(212,26,26,0.3)]">
              MI_CUENTA
            </div>
            <h1 className="font-[family-name:var(--font-archivo-black)] text-3xl uppercase tracking-tighter mb-2" style={{ color: "var(--text-primary)" }}>
              Configuración
            </h1>
          </div>

          {/* User info */}
          <div className="p-6 mb-8 group transition-colors" style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-ghost)" }}>
              Sesión Activa
            </div>
            <div className="text-base mb-1" style={{ color: "var(--text-primary)" }}>{user.email}</div>
            {user.name && <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{user.name}</div>}
            {user.mfaEnabled && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                MFA Activo
              </div>
            )}
          </div>

          {/* Settings links */}
          <div className="space-y-4">
            {settingsItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`p-6 flex items-center gap-5 transition-all group ${
                    item.danger
                      ? "hover:bg-red-500/5 hover:border-red-500/40"
                      : "hover:bg-[var(--surface-2)] hover:border-[var(--red)]"
                  }`}
                  style={{ background: "var(--surface-1)", border: item.danger ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid var(--border-subtle)" }}
                >
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      item.danger ? "text-red-500/60 group-hover:text-red-500" : "text-[var(--red)] opacity-60 group-hover:opacity-100"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div
                      className={`text-sm font-bold tracking-wide uppercase mb-1 ${
                        item.danger ? "text-red-400" : "text-[var(--text-primary)]"
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                      {item.description}
                    </div>
                  </div>
                  <span className={`material-symbols-outlined ml-auto text-lg transition-transform transform group-hover:translate-x-1 ${item.danger ? "text-red-500/40" : "text-[var(--text-tertiary)]"}`}>
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
