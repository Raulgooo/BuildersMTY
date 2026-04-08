# Shark Auth Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the existing BuildersMTY auth page (`/auth/courses`) to a live Shark Auth instance at `auth.buildersmty.com.mx`, enabling email/password signup+login and OAuth via GitHub, Discord, and Google.

**Architecture:** Cookie-based auth. The Shark Auth server handles all token/session management via `shark_session` HttpOnly cookies. The frontend calls Shark's REST API for signup/login, redirects to Shark for OAuth, and calls `/auth/me` to check session status. An auth context provides user state across the app. No auth logic lives in our backend — Shark owns it all.

**Tech Stack:** Next.js 15 (app router), React 19, TypeScript, Shark Auth REST API

**Shark Auth base URL (env var):** `NEXT_PUBLIC_SHARK_AUTH_URL` → `https://auth.buildersmty.com.mx/api/v1`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/frontend/src/lib/shark.ts` | Create | Shark Auth API client (signup, login, logout, me) |
| `src/frontend/src/context/AuthContext.tsx` | Create | React context + provider for auth state |
| `src/frontend/src/app/auth/courses/page.tsx` | Modify | Wire forms + OAuth buttons to Shark |
| `src/frontend/src/app/auth/callback/page.tsx` | Create | Landing page after OAuth redirect |
| `src/frontend/src/app/layout.tsx` | Modify | Wrap app in AuthProvider |
| `src/frontend/src/components/Header.tsx` | Modify | Show user state (logged in/out) |

---

### Task 1: Shark Auth API Client

**Files:**
- Create: `src/frontend/src/lib/shark.ts`

- [ ] **Step 1: Create the API client**

```ts
// src/frontend/src/lib/shark.ts

const SHARK_URL = process.env.NEXT_PUBLIC_SHARK_AUTH_URL || "https://auth.buildersmty.com.mx/api/v1";

export interface SharkUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  mfa_enabled?: boolean;
}

interface AuthResponse {
  user: SharkUser;
  mfa_required?: boolean;
}

interface SharkError {
  error: string;
  message: string;
}

async function sharkFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${SHARK_URL}${path}`, {
    ...options,
    credentials: "include", // send shark_session cookie
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const err: SharkError = await res.json().catch(() => ({
      error: "unknown",
      message: `HTTP ${res.status}`,
    }));
    throw new Error(err.message);
  }

  return res.json();
}

export async function signup(email: string, password: string): Promise<AuthResponse> {
  return sharkFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return sharkFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout(): Promise<void> {
  await sharkFetch("/auth/logout", { method: "POST" });
}

export async function getMe(): Promise<SharkUser> {
  return sharkFetch<SharkUser>("/auth/me");
}

export function getOAuthUrl(provider: "github" | "discord" | "google"): string {
  return `${SHARK_URL}/auth/oauth/${provider}`;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/frontend/src/lib/shark.ts
git commit -m "feat: add Shark Auth API client"
```

---

### Task 2: Auth Context Provider

**Files:**
- Create: `src/frontend/src/context/AuthContext.tsx`

- [ ] **Step 1: Create the auth context**

```tsx
// src/frontend/src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { SharkUser, getMe, logout as sharkLogout } from "@/lib/shark";

interface AuthContextValue {
  user: SharkUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SharkUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await sharkLogout();
    } catch {
      // cookie may already be expired
    }
    setUser(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/frontend/src/context/AuthContext.tsx
git commit -m "feat: add AuthProvider context with session check"
```

---

### Task 3: Wrap App in AuthProvider

**Files:**
- Modify: `src/frontend/src/app/layout.tsx`

- [ ] **Step 1: Add AuthProvider to root layout**

Add the import at the top:
```tsx
import { AuthProvider } from "@/context/AuthContext";
```

Wrap `{children}` in the body:
```tsx
<body className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container">
  <AuthProvider>
    {children}
  </AuthProvider>
</body>
```

Since `layout.tsx` is a server component and `AuthProvider` is a client component, this is valid — Next.js allows client components as children of server components.

- [ ] **Step 2: Commit**

```bash
git add src/frontend/src/app/layout.tsx
git commit -m "feat: wrap app in AuthProvider"
```

---

### Task 4: Wire Auth Page to Shark

**Files:**
- Modify: `src/frontend/src/app/auth/courses/page.tsx`

- [ ] **Step 1: Replace placeholder auth page with working implementation**

The page needs:
- Form state with `useState` for email/password/name
- Call `signup()` or `login()` from `@/lib/shark` on form submit
- OAuth buttons navigate to `getOAuthUrl(provider)` (full page redirect)
- Error display for failed attempts
- On success, call `refresh()` from auth context and redirect to `/`
- If already logged in, redirect away

Replace the full file content:

```tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signup, login, getOAuthUrl } from "@/lib/shark";
import { useAuth } from "@/context/AuthContext";

export default function AuthCoursesPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { user, refresh } = useAuth();

  // Already logged in — redirect
  if (user) {
    router.replace("/");
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "register") {
        await signup(email, password);
      } else {
        const res = await login(email, password);
        if (res.mfa_required) {
          // MFA not implemented yet — inform user
          setError("MFA requerido. Contacta al admin.");
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

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-sans selection:bg-[#ff5540] selection:text-white min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Header: BuildersMTY logo + Auth by Shark */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/builderslogo.svg" alt="BuildersMTY" width={28} height={28} />
            <span className="font-headline font-black text-xs uppercase tracking-tight text-white">Builders</span>
          </Link>
          <div className="w-px h-5 bg-[#603e39]/30"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[7px] font-label text-[#E5E2E1]/20 tracking-[0.15em] uppercase">Auth by</span>
            <Image src="/shark_blackbg_whitelogo_text_logo.svg" alt="Shark Auth" width={60} height={24} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-headline font-black text-xl uppercase tracking-tight mb-1.5">
            {mode === "login" ? "Inicia Sesión" : "Crea tu Cuenta"}
          </h1>
          <p className="text-xs text-[#E5E2E1]/40">Accede a los cursos de la comunidad</p>
        </div>

        {/* OAuth Buttons */}
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

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#603e39]/20"></div>
          <span className="text-[9px] font-label text-[#E5E2E1]/20 tracking-[0.2em] uppercase">o</span>
          <div className="flex-1 h-px bg-[#603e39]/20"></div>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-4 px-3 py-2 border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-5">
          <div>
            <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-[9px] font-label font-bold text-[#E5E2E1]/40 tracking-[0.15em] uppercase mb-1.5">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#1c1b1b] border border-[#603e39]/30 px-3 py-2.5 text-xs text-[#E5E2E1] placeholder-[#E5E2E1]/20 focus:border-[#ff5540]/50 focus:outline-none transition-colors" />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-[#ff5540] text-white px-5 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff5540]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {submitting ? "..." : mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="text-center">
          <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="text-[11px] text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors">
            {mode === "login" ? "No tienes cuenta? Crea una" : "Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/frontend/src/app/auth/courses/page.tsx
git commit -m "feat: wire auth page to Shark Auth API"
```

---

### Task 5: OAuth Callback Page

**Files:**
- Create: `src/frontend/src/app/auth/callback/page.tsx`

After a successful OAuth flow, Shark sets the `shark_session` cookie and redirects back. We need a landing page that picks up the session and redirects the user into the app.

Shark's OAuth callback redirect target needs to be configured on the Shark server to point to `https://buildersmty.com.mx/auth/callback` (or wherever the frontend lives). This page just calls `/auth/me` to confirm the session works.

- [ ] **Step 1: Create the callback page**

```tsx
// src/frontend/src/app/auth/callback/page.tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/frontend/src/app/auth/callback/page.tsx
git commit -m "feat: add OAuth callback landing page"
```

---

### Task 6: Update Header with Auth State

**Files:**
- Modify: `src/frontend/src/components/Header.tsx`

- [ ] **Step 1: Read current Header.tsx to understand structure**

Read the file first, then add a login/logout indicator. The change is minimal: import `useAuth`, show the user email or a "Login" link.

In the Header's nav area, replace the existing "Cursos" or similar CTA link with auth-aware content:

```tsx
// Add at top of Header.tsx:
import { useAuth } from "@/context/AuthContext";

// Inside the component, add:
const { user, logout } = useAuth();

// In the nav/CTA area, add this conditional:
{user ? (
  <button onClick={logout} className="text-[10px] font-label text-[#E5E2E1]/40 hover:text-[#ff5540] tracking-[0.15em] uppercase transition-colors">
    Cerrar Sesión
  </button>
) : (
  <Link href="/auth/courses" className="text-[10px] font-label text-[#ff5540] tracking-[0.15em] uppercase font-bold">
    Login
  </Link>
)}
```

The exact insertion point depends on the current Header structure — read the file and find where the nav links are rendered.

- [ ] **Step 2: Commit**

```bash
git add src/frontend/src/components/Header.tsx
git commit -m "feat: show login/logout in header based on auth state"
```

---

### Task 7: Environment Variable & Cleanup

**Files:**
- Modify: `src/frontend/.env.example` or document in README

- [ ] **Step 1: Add the env var**

The only new env var needed is:
```
NEXT_PUBLIC_SHARK_AUTH_URL=https://auth.buildersmty.com.mx/api/v1
```

Add this to `.env.local` (or `.env.example` if it exists). For Vercel, add it in the dashboard.

- [ ] **Step 2: Remove old login/register placeholders**

Delete these files that are now replaced by the Shark-powered auth:
- `src/frontend/src/app/login/page.tsx` (old Discord OAuth redirect placeholder)
- `src/frontend/src/app/register/page.tsx` (old Discord invite redirect)

- [ ] **Step 3: Update Navbar link**

In `src/frontend/src/components/Navbar.tsx`, change the OAUTH link from `/login` to `/auth/courses`:

```tsx
{ label: 'OAUTH', href: '/auth/courses' }
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add SHARK_AUTH env var, remove old auth placeholders, update nav"
```

---

## Shark Server Configuration Notes

For this integration to work, the Shark instance at `auth.buildersmty.com.mx` needs:

1. **CORS**: `cors_origins` must include the frontend domain (`https://buildersmty.com.mx`, `https://www.buildersmty.com.mx`, and `http://localhost:3000` for local dev)
2. **OAuth providers**: `social.github`, `social.discord`, `social.google` configured with client IDs/secrets
3. **OAuth redirect**: After OAuth callback, Shark needs to redirect to `https://buildersmty.com.mx/auth/callback` — this is configured in the Shark server config or via the OAuth app's redirect URI settings
4. **Cookie domain**: The `shark_session` cookie needs to be accessible from `buildersmty.com.mx`. If Shark runs on `auth.buildersmty.com.mx`, the cookie domain should be set to `.buildersmty.com.mx` (parent domain) so the frontend can send it

These are server-side configs, not frontend code changes.
