import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  // Only attempt server-side fetch if BACKEND_URL is configured
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/profile/github/${username}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const profile = await res.json();
        const title = `${profile.github_username} — ${(profile.rank || "BUILDER").replace(/_/g, " ")} | BuildersMTY`;
        const description = profile.llm_summary || `Score: ${profile.score}/100`;

        return {
          title,
          description,
          openGraph: { title, description, images: profile.avatar_url ? [profile.avatar_url] : [], siteName: "BuildersMTY" },
          twitter: { card: "summary", title, description, images: profile.avatar_url ? [profile.avatar_url] : [] },
        };
      }
    } catch {
      // Server-side fetch failed — fall through to default metadata
    }
  }

  return {
    title: `${username} | BuildersMTY`,
    description: "Perfil de builder en BuildersMTY",
  };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  return <ProfileClient username={username} />;
}
