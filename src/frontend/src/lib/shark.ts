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

async function sharkFetch<T>(path: string, post?: RequestInit): Promise<T> {
  const res = await fetch(`${SHARK_URL}${path}`, {
    ...post,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...post?.headers,
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

// Password reset (unauthenticated)
export async function sendPasswordResetLink(email: string): Promise<void> {
  await sharkFetch("/auth/password/send-reset-link", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await sharkFetch("/auth/password/reset", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
}

// Password change (authenticated)
export async function changePassword(current_password: string, new_password: string): Promise<void> {
  await sharkFetch("/auth/password/change", {
    method: "POST",
    body: JSON.stringify({ current_password, new_password }),
  });
}

// MFA
export interface MfaEnrollment {
  secret: string;
  qr_code: string; // base64 or data URI
}

export async function mfaEnroll(): Promise<MfaEnrollment> {
  return sharkFetch<MfaEnrollment>("/auth/mfa/enroll", { method: "POST" });
}

export async function mfaVerify(code: string): Promise<{ recovery_codes: string[] }> {
  return sharkFetch<{ recovery_codes: string[] }>("/auth/mfa/verify", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export async function mfaDisable(): Promise<void> {
  await sharkFetch("/auth/mfa", { method: "DELETE" });
}

export async function getRecoveryCodes(): Promise<{ recovery_codes: string[] }> {
  return sharkFetch<{ recovery_codes: string[] }>("/auth/mfa/recovery-codes");
}

// Account deletion (via backend proxy)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function deleteAccount(): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/account`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
    throw new Error(err.detail || err.message || "Error eliminando cuenta");
  }
}
