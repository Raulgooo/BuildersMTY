import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

interface Props {
  params: Promise<{ username: string }>;
}

async function fetchProfile(username: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/profile/github/${username}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile = await fetchProfile(username);

  if (!profile) {
    return {
      title: `${username} | BuildersMTY`,
      description: "Perfil de builder",
    };
  }

  const title = `${profile.github_username} — ${(profile.rank || "BUILDER").replace(/_/g, " ")} | BuildersMTY`;
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
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = await fetchProfile(username);
  return <ProfileClient username={username} initialProfile={profile} />;
}
