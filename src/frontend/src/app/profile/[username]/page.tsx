import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

// Server-side: use BACKEND_URL (not NEXT_PUBLIC_ which is client-only)
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/profile/github/${username}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Not found");
    const profile = await res.json();

    const title = `${profile.github_username} — ${(profile.rank || "BUILDER").replace("_", " ")} | BuildersMTY`;
    const description = profile.llm_summary || `Perfil de builder de ${profile.github_username}. Score: ${profile.score}/100`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: profile.avatar_url ? [profile.avatar_url] : [],
        siteName: "BuildersMTY",
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: profile.avatar_url ? [profile.avatar_url] : [],
      },
    };
  } catch {
    return {
      title: `${username} | BuildersMTY`,
      description: "Perfil de builder",
    };
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  return <ProfileClient username={username} />;
}
