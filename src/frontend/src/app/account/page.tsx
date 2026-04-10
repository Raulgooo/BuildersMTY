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
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen">
      <Header />
      <main className="ghost-grid pt-28 pb-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <div className="font-label text-[#ff5540] text-[10px] tracking-[0.4em] mb-3 uppercase flex items-center justify-center gap-2">
              <span className="w-4 h-[1px] bg-[#ff5540]" />
              MI_CUENTA
              <span className="w-4 h-[1px] bg-[#ff5540]" />
            </div>
            <h1 className="font-headline font-black text-2xl uppercase tracking-tight mb-2">
              Configuracion
            </h1>
          </div>

          {/* User info */}
          <div className="bg-[#1c1b1b] border border-[#603e39]/30 p-5 mb-6">
            <div className="text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-2">
              Cuenta
            </div>
            <div className="text-sm text-[#E5E2E1]">{user.email}</div>
            {user.name && <div className="text-xs text-[#E5E2E1]/50 mt-1">{user.name}</div>}
            {user.mfaEnabled && (
              <div className="mt-2 inline-block px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 text-[9px] font-label uppercase tracking-wider">
                MFA Activo
              </div>
            )}
          </div>

          {/* Settings links */}
          <div className="space-y-3">
            {settingsItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`bg-[#1c1b1b] border p-4 flex items-center gap-4 transition-all hover:bg-[#201f1f] ${
                    item.danger
                      ? "border-red-500/20 hover:border-red-500/40"
                      : "border-[#603e39]/30 hover:border-[#ff5540]/40"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
                      item.danger ? "text-red-500/60" : "text-[#ff5540]/60"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        item.danger ? "text-red-400" : "text-[#E5E2E1]"
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-[10px] text-[#E5E2E1]/30 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#E5E2E1]/20 ml-auto text-sm">
                    chevron_right
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
