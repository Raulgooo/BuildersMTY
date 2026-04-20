"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { mfaEnroll, mfaVerify, mfaDisable, getRecoveryCodes, MfaEnrollment } from "@/lib/shark";

export default function MfaPage() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<"idle" | "enroll" | "verify" | "codes" | "view-codes" | "disable">("idle");
  const [disableCode, setDisableCode] = useState("");
  const [enrollment, setEnrollment] = useState<MfaEnrollment | null>(null);
  const [code, setCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
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

  async function handleEnroll() {
    setError("");
    setSubmitting(true);
    try {
      const data = await mfaEnroll();
      setEnrollment(data);
      setStep("enroll");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar MFA");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerify() {
    setError("");
    if (code.length !== 6) {
      setError("El codigo debe tener 6 digitos");
      return;
    }
    setSubmitting(true);
    try {
      const data = await mfaVerify(code);
      setRecoveryCodes(data.recovery_codes);
      setStep("codes");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Codigo invalido");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDisable() {
    setError("");
    if (disableCode.length !== 6) {
      setError("El codigo debe tener 6 digitos");
      return;
    }
    setSubmitting(true);
    try {
      await mfaDisable(disableCode);
      await refresh();
      setDisableCode("");
      setStep("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Codigo invalido");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleViewCodes() {
    setError("");
    setSubmitting(true);
    try {
      const data = await getRecoveryCodes();
      setRecoveryCodes(data.recovery_codes);
      setStep("view-codes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al obtener codigos");
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

          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-archivo-black)] text-3xl uppercase tracking-tighter mb-2" style={{ color: "var(--text-primary)" }}>
              Autenticación MFA
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Protege tu cuenta con autenticación de dos factores</p>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Idle state — MFA not enabled */}
          {step === "idle" && !user.mfaEnabled && (
            <div className="text-center space-y-4">
              <div className="p-6 transition-colors" style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}>
                <span className="material-symbols-outlined text-[var(--red)] opacity-40 text-4xl mb-4 block">
                  shield
                </span>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  MFA agrega una capa extra de seguridad. Necesitarás una app como Google Authenticator o Authy.
                </p>
                <button
                  onClick={handleEnroll}
                  disabled={submitting}
                  className="w-full bg-[var(--red)] text-white px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(212,26,26,0.2)]"
                >
                  {submitting ? "ACTIVANDO..." : "ACTIVAR MFA"}
                </button>
              </div>
            </div>
          )}

          {/* Idle state — MFA enabled */}
          {step === "idle" && user.mfaEnabled && (
            <div className="space-y-3">
              <div className="bg-[#1c1b1b] border border-green-500/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-green-400 text-xl">verified_user</span>
                  <span className="text-xs font-bold text-green-400">MFA Activo</span>
                </div>
                <p className="text-[10px] text-[#E5E2E1]/40">
                  Tu cuenta esta protegida con autenticacion de dos factores.
                </p>
              </div>
              <button
                onClick={handleViewCodes}
                disabled={submitting}
                className="w-full bg-[#1c1b1b] border border-[#603e39]/30 text-[#E5E2E1] px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#ff5540]/40 hover:bg-[#201f1f] transition-all disabled:opacity-50"
              >
                {submitting ? "..." : "Ver Codigos de Recuperacion"}
              </button>
              <button
                onClick={() => { setStep("disable"); setError(""); setDisableCode(""); }}
                className="w-full bg-[#1c1b1b] border border-red-500/20 text-red-400 px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:border-red-500/40 hover:bg-red-500/5 transition-all"
              >
                Desactivar MFA
              </button>
            </div>
          )}

          {/* Disable MFA — prompt for TOTP code */}
          {step === "disable" && (
            <div className="space-y-4">
              <div className="bg-[#1c1b1b] border border-red-500/20 p-5">
                <p className="text-xs text-[#E5E2E1]/50">
                  Ingresa el codigo de tu app de autenticacion para confirmar la desactivacion de MFA.
                </p>
              </div>
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                  Codigo de Verificacion
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  autoFocus
                  className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] text-center tracking-[0.5em] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors font-mono"
                />
              </div>
              <button
                onClick={handleDisable}
                disabled={submitting}
                className="w-full bg-red-600 text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {submitting ? "..." : "Confirmar Desactivacion"}
              </button>
              <button
                onClick={() => { setStep("idle"); setDisableCode(""); setError(""); }}
                className="w-full bg-[#1c1b1b] border border-[#603e39]/30 text-[#E5E2E1] px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#ff5540]/40 transition-all"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Enrollment — show QR code */}
          {step === "enroll" && enrollment && (
            <div className="space-y-4">
              <div className="bg-[#1c1b1b] border border-[#603e39]/30 p-5 text-center">
                <p className="text-xs text-[#E5E2E1]/50 mb-4">
                  Escanea este codigo QR con tu app de autenticacion:
                </p>
                <div className="bg-white p-3 inline-block mb-4">
                  <QRCodeSVG value={enrollment.qr_uri} size={192} />
                </div>
                <div className="text-[9px] text-[#E5E2E1]/30 mb-2 font-label uppercase tracking-wider">
                  O ingresa este codigo manualmente:
                </div>
                <code className="text-xs text-[#ff5540] bg-[#131313] px-3 py-1.5 border border-[#603e39]/30 select-all">
                  {enrollment.secret}
                </code>
              </div>

              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">
                  Codigo de Verificacion
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] text-center tracking-[0.5em] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors font-mono"
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={submitting}
                className="w-full bg-[#ff5540] text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all disabled:opacity-50"
              >
                {submitting ? "..." : "Verificar y Activar"}
              </button>
            </div>
          )}

          {/* Recovery codes display */}
          {(step === "codes" || step === "view-codes") && recoveryCodes.length > 0 && (
            <div className="space-y-4">
              {step === "codes" && (
                <div className="px-3 py-3 border border-green-500/30 bg-green-500/10 text-green-400 text-xs">
                  MFA activado exitosamente.
                </div>
              )}
              <div className="bg-[#1c1b1b] border border-[#603e39]/30 p-5">
                <div className="text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-3">
                  Codigos de Recuperacion
                </div>
                <p className="text-[10px] text-[#E5E2E1]/40 mb-3">
                  Guarda estos codigos en un lugar seguro. Cada codigo solo se puede usar una vez.
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {recoveryCodes.map((rc, i) => (
                    <code
                      key={i}
                      className="text-xs text-[#E5E2E1] bg-[#131313] px-2 py-1 border border-[#603e39]/20 font-mono text-center select-all"
                    >
                      {rc}
                    </code>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setStep("idle")}
                className="w-full bg-[#1c1b1b] border border-[#603e39]/30 text-[#E5E2E1] px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#ff5540]/40 transition-all"
              >
                Listo
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
