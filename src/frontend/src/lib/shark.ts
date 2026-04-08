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
