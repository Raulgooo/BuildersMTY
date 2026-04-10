"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signup, login, mfaChallenge, mfaRecovery, sendMagicLink, getOAuthUrl } from "@/lib/shark";
import { useAuth } from "@/context/AuthContext";

type AuthState =
  | { step: "login" }
  | { step: "register" }
  | { step: "magic-link" }
  | { step: "magic-link-sent" }
  | { step: "mfa-totp" }
  | { step: "mfa-recovery" };

export default function AuthLoginPage() {
  const [state, setState] = useState<AuthState>({ step: "login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { user, refresh } = useAuth();

  if (user) {
    router.replace("/");
    return null;
  }

  function go(step: AuthState["step"]) {
    setState({ step } as AuthState);
    setError("");
    setMfaCode("");
    setRecoveryCode("");
  }

  async function handleCredentials(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (state.step === "register") {
        await signup(email, password);
      } else {
        const res = await login(email, password);
        if ("mfaRequired" in res && res.mfaRequired) {
          setState({ step: "mfa-totp" });
          setSubmitting(false);
          return;
        }
      }
      await refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMfaTotp(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await mfaChallenge(mfaCode);
      await refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Codigo invalido");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMfaRecovery(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await mfaRecovery(recoveryCode);
      await refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Codigo de recuperacion invalido");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMagicLink(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await sendMagicLink(email);
    } catch {
      // anti-enumeration
    }
    setState({ step: "magic-link-sent" });
    setSubmitting(false);
  }

  // --- Shared UI pieces ---

  const header = (
    <div className="flex items-center justify-center gap-3 mb-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/builderslogo.svg" alt="BuildersMTY" width={28} height={28} />
        <span className="font-headline font-black text-xs uppercase tracking-tight text-white">Builders</span>
      </Link>
      <div className="w-px h-5 bg-[#603e39]/30"></div>
      <div className="flex items-center gap-1.5">
        <span className="text-[7px] font-label text-[#E5E2E1] tracking-[0.15em] uppercase">Auth by</span>
        <Image src="/shark_blackbg_whitelogo_text_logo.svg" alt="Shark Auth" width={60} height={24} />
      </div>
    </div>
  );

  const errorBanner = error && (
    <div className="mb-4 px-3 py-2 border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
      {error}
    </div>
  );

  const inputClass = "w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors";
  const btnPrimary = "w-full bg-[#ff5540] text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const linkClass = "text-[11px] text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors";

  // --- Render by state ---

  function renderContent() {
    switch (state.step) {

      case "mfa-totp":
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">Verificacion MFA</h1>
              <p className="text-xs text-[#E5E2E1]/40">Ingresa el codigo de tu app de autenticacion</p>
            </div>
            {errorBanner}
            <form onSubmit={handleMfaTotp} className="space-y-3 mb-5">
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">Codigo TOTP</label>
                <input
                  type="text" inputMode="numeric" maxLength={6} required autoFocus
                  value={mfaCode} onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className={`${inputClass} text-center tracking-[0.5em] font-mono`}
                />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? "..." : "Verificar"}
              </button>
            </form>
            <div className="text-center space-y-2">
              <div><button onClick={() => go("mfa-recovery")} className={linkClass}>Usar codigo de recuperacion</button></div>
              <div><button onClick={() => go("login")} className={linkClass}>Volver al inicio de sesion</button></div>
            </div>
          </>
        );

      case "mfa-recovery":
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">Codigo de Recuperacion</h1>
              <p className="text-xs text-[#E5E2E1]/40">Ingresa uno de tus codigos de recuperacion</p>
            </div>
            {errorBanner}
            <form onSubmit={handleMfaRecovery} className="space-y-3 mb-5">
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">Codigo de Recuperacion</label>
                <input
                  type="text" required autoFocus
                  value={recoveryCode} onChange={(e) => setRecoveryCode(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                  placeholder="ab3k9x7m"
                  className={`${inputClass} text-center tracking-[0.3em] font-mono`}
                />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? "..." : "Verificar"}
              </button>
            </form>
            <div className="text-center space-y-2">
              <div><button onClick={() => go("mfa-totp")} className={linkClass}>Usar codigo TOTP</button></div>
              <div><button onClick={() => go("login")} className={linkClass}>Volver al inicio de sesion</button></div>
            </div>
          </>
        );

      case "magic-link":
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">Magic Link</h1>
              <p className="text-xs text-[#E5E2E1]/40">Te enviaremos un enlace para iniciar sesion</p>
            </div>
            {errorBanner}
            <form onSubmit={handleMagicLink} className="space-y-3 mb-5">
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className={inputClass} />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? "..." : "Enviar Magic Link"}
              </button>
            </form>
            <div className="text-center">
              <button onClick={() => go("login")} className={linkClass}>Iniciar sesion con contrasena</button>
            </div>
          </>
        );

      case "magic-link-sent":
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">Revisa tu Email</h1>
            </div>
            <div className="text-center space-y-4">
              <div className="px-3 py-3 border border-green-500/30 bg-green-500/10 text-green-400 text-xs">
                Si existe una cuenta con ese email, recibiras un enlace para iniciar sesion. Revisa tu bandeja de entrada.
              </div>
              <button onClick={() => go("login")} className={linkClass}>Volver al inicio de sesion</button>
            </div>
          </>
        );

      case "login":
      case "register":
      default:
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">
                {state.step === "login" ? "Inicia Sesión" : "Crea tu Cuenta"}
              </h1>
              <p className="text-xs text-[#E5E2E1]/40">Accede a los cursos de la comunidad</p>
            </div>

            {/* OAuth */}
            <div className="space-y-2.5 mb-6">
              <a href={getOAuthUrl("github")} className="w-full flex items-center justify-center gap-2.5 bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs font-medium hover:border-[#ff5540]/40 hover:bg-[#201f1f] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Continuar con GitHub
              </a>
              <a href={getOAuthUrl("discord")} className="w-full flex items-center justify-center gap-2.5 bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs font-medium hover:border-[#5865F2]/40 hover:bg-[#201f1f] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
                Continuar con Discord
              </a>
              <a href={getOAuthUrl("google")} className="w-full flex items-center justify-center gap-2.5 bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs font-medium hover:border-[#ff5540]/40 hover:bg-[#201f1f] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continuar con Google
              </a>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#603e39]/20"></div>
              <span className="text-[9px] font-label text-[#E5E2E1]/20 tracking-[0.2em] uppercase">o</span>
              <div className="flex-1 h-px bg-[#603e39]/20"></div>
            </div>

            {errorBanner}

            <form onSubmit={handleCredentials} className="space-y-3 mb-5">
              <div>
                <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className={inputClass} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase">Password</label>
                  {state.step === "login" && (
                    <Link href="/auth/forgot-password" className="text-[9px] text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors">
                      Olvidaste tu contrasena?
                    </Link>
                  )}
                </div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? "..." : state.step === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
              </button>
            </form>

            <div className="text-center space-y-2">
              <div>
                <button onClick={() => go(state.step === "login" ? "register" : "login")} className={linkClass}>
                  {state.step === "login" ? "No tienes cuenta? Crea una" : "Ya tienes cuenta? Inicia sesión"}
                </button>
              </div>
              <div>
                <button onClick={() => go("magic-link")} className={linkClass}>
                  Iniciar sesion con Magic Link
                </button>
              </div>
            </div>
          </>
        );
    }
  }

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {header}
        {renderContent()}
      </div>
    </div>
  );
}
