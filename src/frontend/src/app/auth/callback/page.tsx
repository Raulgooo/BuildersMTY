"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { refresh } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      await refresh();
      router.replace("/");
    }
    handleCallback();
  }, [refresh, router]);

  return (
    <div className="bg-[#131313] text-[#E5E2E1] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="font-label text-[#ff5540] text-[10px] tracking-[0.4em] uppercase animate-pulse mb-4">
          AUTENTICANDO...
        </div>
        <p className="text-xs text-[#E5E2E1]/40">Estableciendo sesión</p>
      </div>
    </div>
  );
}
