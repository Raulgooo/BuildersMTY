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

  if (user) { router.replace("/"); return null; }

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
    try { await sendMagicLink(email); } catch { /* anti-enumeration */ }
    setState({ step: "magic-link-sent" });
    setSubmitting(false);
  }
  const inputClass = "w-full bg-[var(--surface-1)] border border-[var(--border)] px-4 py-3 text-sm placeholder:text-[var(--text-ghost)] focus:border-[var(--red)] focus:bg-[var(--surface-2)] focus:outline-none transition-colors text-[var(--text-primary)]";
  const btnPrimary = "w-full bg-[var(--red)] text-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2";
  const linkClass = "text-xs text-[var(--text-secondary)] hover:text-[var(--red)] transition-colors inline-block mt-4";

  const errorBanner = error && (
    <div className="mb-6 p-4 text-sm font-medium text-[var(--red)] bg-[var(--red-wash)] border border-[var(--red-dim)] rounded-none">
      {error}
    </div>
  );

  function renderContent() {
    switch (state.step) {
      case "mfa-totp":
        return (
          <>
            <div className="mb-8">
              <h1 className="font-[family-name:var(--font-archivo-black)] text-2xl uppercase tracking-tight mb-2">Autenticación de Dos Factores</h1>
              <p className="text-sm text-[var(--text-tertiary)]">Por favor ingresa el código de seguridad de tu app autenticadora.</p>
            </div>
            {errorBanner}
            <form onSubmit={handleMfaTotp} className="mb-6">
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-secondary)]">Código TOTP</label>
                <input type="text" inputMode="numeric" maxLength={6} required autoFocus value={mfaCode} onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" className={`${inputClass} text-center tracking-[0.3em] font-mono`} />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>{submitting ? "Verificando..." : "Verificar Identidad"}</button>
            </form>
            <div className="flex justify-between items-center">
              <button onClick={() => go("mfa-recovery")} className={linkClass}>Usar código de recuperación</button>
              <button onClick={() => go("login")} className={linkClass}>Cancelar</button>
            </div>
          </>
        );

      case "mfa-recovery":
        return (
          <>
            <div className="mb-8">
              <h1 className="font-[family-name:var(--font-archivo-black)] text-2xl uppercase tracking-tight mb-2">Recuperación de Cuenta</h1>
              <p className="text-sm text-[var(--text-tertiary)]">Ingresa uno de tus códigos de emergencia para acceder.</p>
            </div>
            {errorBanner}
            <form onSubmit={handleMfaRecovery} className="mb-6">
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-secondary)]">Código de Recuperación</label>
                <input type="text" required autoFocus value={recoveryCode} onChange={(e) => setRecoveryCode(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))} placeholder="xxxxxxxx" className={`${inputClass} text-center font-mono`} />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>{submitting ? "Verificando..." : "Recuperar Cuenta"}</button>
            </form>
            <div className="flex justify-between items-center">
              <button onClick={() => go("mfa-totp")} className={linkClass}>Usar código TOTP</button>
              <button onClick={() => go("login")} className={linkClass}>Cancelar</button>
            </div>
          </>
        );

      case "magic-link":
        return (
          <>
            <div className="mb-8">
              <h1 className="font-[family-name:var(--font-archivo-black)] text-2xl uppercase tracking-tight mb-2">Inicio sin Contraseña</h1>
              <p className="text-sm text-[var(--text-tertiary)]">Ingresa tu correo y te enviaremos un enlace mágico seguro.</p>
            </div>
            {errorBanner}
            <form onSubmit={handleMagicLink} className="mb-6">
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-secondary)]">Correo de Trabajo</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@empresa.com" className={inputClass} />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>{submitting ? "Enviando..." : "Enviar Enlace Seguro"}</button>
            </form>
            <button onClick={() => go("login")} className={linkClass}>Volver a credenciales</button>
          </>
        );

      case "magic-link-sent":
        return (
          <div className="text-center py-8">
            <h1 className="font-[family-name:var(--font-archivo-black)] text-3xl uppercase tracking-tight mb-4">Revisa tu Buzón</h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
              Si existe una cuenta con ese correo, hemos despachado un enlace de autenticación de forma segura a tu bandeja.
            </p>
            <button onClick={() => go("login")} className={btnPrimary}>Volver a Inicio de Sesión</button>
          </div>
        );

      case "login":
      case "register":
      default:
        return (
          <>
            <div className="mb-8">
              <h1 className="font-[family-name:var(--font-archivo-black)] text-2xl uppercase tracking-tight mb-2">
                {state.step === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
              </h1>
              <p className="text-sm text-[var(--text-tertiary)]">Accede al portal y ecosistema de BuildersMTY.</p>
            </div>

            {/* OAuth Providers */}
            <div className="space-y-3 mb-8">
              <a href={getOAuthUrl("github")} className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-medium hover:bg-[var(--surface-2)] transition-all bg-[var(--surface-1)] border border-[var(--border)] group">
                <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Continuar con GitHub
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={getOAuthUrl("google")} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium hover:bg-[var(--surface-2)] transition-all bg-[var(--surface-1)] border border-[var(--border)] group">
                  <svg className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </a>
                <a href={getOAuthUrl("discord")} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium hover:bg-[var(--surface-2)] transition-all bg-[var(--surface-1)] border border-[var(--border)] group">
                  <svg className="w-4 h-4 text-[#5865F2] opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
                  Discord
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 opacity-60">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-ghost)]">o correo electrónico</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {errorBanner}

            <form onSubmit={handleCredentials} className="mb-6">
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-secondary)]">Correo de Trabajo</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@empresa.com" className={inputClass} />
              </div>
              <div className="mb-5 relative">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-[var(--text-secondary)]">Contraseña</label>
                  {state.step === "login" && (
                    <Link href="/auth/forgot-password" className="text-[10px] uppercase font-bold tracking-wider hover:text-[var(--red)] transition-colors text-[var(--text-ghost)]">
                      ¿Recuperar?
                    </Link>
                  )}
                </div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? "Procesando..." : state.step === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
              </button>
            </form>

            <div className="flex flex-col gap-2 items-center">
              <button onClick={() => go(state.step === "login" ? "register" : "login")} className={linkClass}>
                {state.step === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia Sesión"}
              </button>
              <button onClick={() => go("magic-link")} className="text-[11px] text-[var(--text-ghost)] hover:text-white transition-colors mt-2">
                Iniciar sesión mediante Magic Link
              </button>
            </div>
          </>
        );
    }
  }

  return (
    <div className="min-h-screen bg-[var(--surface-0)] flex items-center justify-center p-4 lg:p-10 font-[family-name:var(--font-manrope)] relative overflow-hidden">
      
      {/* Background ambient texture (Quieter overdrive) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: "linear-gradient(var(--text-ghost) 1px, transparent 1px), linear-gradient(90deg, var(--text-ghost) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* Centered Modal / SaaS Dashboard Layout */}
      <div className="w-full max-w-[1050px] bg-[var(--surface-0)] flex flex-col lg:flex-row border border-[var(--border-subtle)] shadow-2xl relative z-10">
        
        {/* ═══ Left Side: Shark Auth Promo (5/12) ═══ */}
        <div className="lg:w-5/12 p-8 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] relative overflow-hidden group" style={{ background: "oklch(12% 0 0)" }}>
          
          <div className="relative z-10 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Image src="/builderslogo2.svg" alt="BuildersMTY" width={32} height={32} className="opacity-90 hover:opacity-100 transition-opacity object-contain" />
              <span className="font-[family-name:var(--font-archivo-black)] text-sm tracking-[0.2em] uppercase text-white/50">BuildersMTY</span>
            </Link>
          </div>

          <div className="relative z-10 my-16 lg:my-0">
            <div className="mb-10 flex items-center gap-2 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="flex relative h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--red)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--red)]" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Infraestructura Segura</span>
            </div>
            
            <Image src="/shark_blackbg_whitelogo_text_logo.svg" alt="Shark Auth" width={160} height={50} className="mb-10 opacity-100 animate-fade-up" style={{ animationDelay: "300ms" }} />
            
            {/* Bolder typography */}
            <h2 className="text-4xl font-[family-name:var(--font-archivo-black)] uppercase tracking-tighter leading-[0.95] mb-6 text-white animate-fade-up" style={{ animationDelay: "400ms" }}>
              Identidad<br/>Para La Era De<br/>Agentes.
            </h2>
            <p className="text-sm font-medium leading-relaxed text-white/60 mb-12 animate-fade-up" style={{ animationDelay: "500ms" }}>
              Despliega agentes de IA seguros con delegaciones granulares junto a autenticación humana nativa.
            </p>

            <ul className="space-y-4 mb-4">
              {[
                "Hardware-backed Passkeys",
                "OAuth 2.1 & OIDC Integrado",
                "RBAC aislado por Tenant",
                "Delegation Chains, DPoP, Scoped Agents"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/50 animate-fade-up" style={{ animationDelay: `${600 + i * 100}ms` }}>
                  <span className="w-1.5 h-1.5 bg-[var(--red)] rotate-45 transform" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative z-10 text-[9px] font-bold tracking-[0.3em] uppercase text-white/20 animate-fade-up" style={{ animationDelay: "1000ms" }}>
            Impulsado por Shark Auth Infrastructure
          </div>
          
          {/* Subtle Overdrive: Moving scanline across the solid dark background instead of a gradient */}
          <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-20 bg-[linear-gradient(transparent_0%,rgba(255,255,255,1)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline" />
        </div>

        {/* ═══ Right Side: Form (7/12) ═══ */}
        <div className="w-full lg:w-7/12 p-8 lg:p-16 xl:p-24 flex items-center justify-center bg-[var(--surface-0)] relative z-20">
          <div className="w-full max-w-[400px]">
            {renderContent()}
          </div>
        </div>

      </div>

    </div>
  );
}
