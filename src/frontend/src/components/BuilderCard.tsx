"use client";

import Image from "next/image";

interface BuilderProfile {
  github_username: string;
  avatar_url?: string;
  discord_display_name?: string;
  discord_avatar_url?: string;
  score?: number;
  rank?: string;
  developer_archetype?: string;
  llm_summary?: string;
  llm_strengths?: string[] | null;
  llm_recommendations?: string[] | null;
  language_tags?: string[] | null;
  top_languages?: Record<string, number> | null;
  total_stars?: number;
  total_forks?: number;
  public_repos_count?: number;
  private_repos_count?: number;
  score_breakdown?: Record<string, number> | null;
}

const RANK_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; glow: string }> = {
  BUILDER_LEGEND: {
    label: "BUILDER LEGEND",
    color: "text-[#FFD700]",
    bg: "bg-[#FFD700]/10",
    border: "border-[#FFD700]/50",
    glow: "shadow-[0_0_30px_rgba(255,215,0,0.15)]",
  },
  ELITE_BUILDER: {
    label: "ELITE BUILDER",
    color: "text-[#ff5540]",
    bg: "bg-[#ff5540]/10",
    border: "border-[#ff5540]/30",
    glow: "shadow-[0_0_20px_rgba(255,85,64,0.1)]",
  },
  BUILDER: {
    label: "BUILDER",
    color: "text-[#E5E2E1]/60",
    bg: "bg-[#1c1b1b]",
    border: "border-[#603e39]/30",
    glow: "",
  },
};

function ScoreBar({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, score));
  return (
    <div className="w-full h-2 bg-[#201f1f] overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#ff5540] to-[#FFD700] transition-all duration-1000"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function BuilderCard({ profile }: { profile: BuilderProfile }) {
  const rank = RANK_CONFIG[profile.rank || "BUILDER"] || RANK_CONFIG.BUILDER;
  const score = profile.score ?? 0;
  const strengths = profile.llm_strengths ?? [];
  const recommendations = profile.llm_recommendations ?? [];
  const languageTags = profile.language_tags ?? [];
  const topLanguages = profile.top_languages ?? {};
  const avatarUrl = profile.discord_avatar_url || profile.avatar_url || "/builderslogo.svg";

  return (
    <div className={`${rank.bg} border ${rank.border} ${rank.glow} p-6 lg:p-8 w-full max-w-2xl mx-auto`}>
      {/* Header: Avatar + Name + Rank */}
      <div className="flex items-start gap-5 mb-6">
        <div className={`w-20 h-20 shrink-0 border ${rank.border} overflow-hidden`}>
          <Image
            src={avatarUrl}
            alt={profile.github_username}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-headline font-black text-xl lg:text-2xl uppercase tracking-tighter text-[#E5E2E1] truncate">
              {profile.discord_display_name || profile.github_username}
            </h2>
            {profile.rank === "BUILDER_LEGEND" && (
              <span className="material-symbols-outlined text-[#FFD700] text-xl animate-pulse">
                workspace_premium
              </span>
            )}
            {profile.rank === "ELITE_BUILDER" && (
              <span className="material-symbols-outlined text-[#ff5540] text-lg">
                verified
              </span>
            )}
          </div>
          <p className="font-label text-[10px] text-[#ffb4a8]/60 tracking-widest uppercase mb-2">
            @{profile.github_username}
          </p>
          <span className={`font-label text-[11px] font-black ${rank.color} tracking-[0.2em] uppercase`}>
            {rank.label}
          </span>
        </div>
        <div className="text-right shrink-0">
          <div className="font-headline font-black text-3xl text-[#E5E2E1]">
            {score}
          </div>
          <div className="font-label text-[9px] text-[#ffb4a8]/40 tracking-widest uppercase">
            /100
          </div>
        </div>
      </div>

      {/* Score Bar */}
      <ScoreBar score={score} />

      {/* Archetype */}
      <div className="mt-5 mb-4">
        <span className="font-label text-[10px] text-[#ffb4a8]/40 tracking-[0.3em] uppercase">
          Arquetipo
        </span>
        <p className={`font-headline font-bold text-base ${rank.color} uppercase tracking-wide mt-1`}>
          {profile.developer_archetype || "Builder"}
        </p>
      </div>

      {/* LLM Summary */}
      <p className="text-sm text-[#ebbbb4] leading-relaxed mb-5 font-light">
        {profile.llm_summary || "Perfil en análisis..."}
      </p>

      {/* Language Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {languageTags.slice(0, 8).map((lang) => (
          <span
            key={lang}
            className="text-[9px] font-label px-2 py-1 border border-[#603e39]/30 text-[#ffb4a8] uppercase tracking-widest"
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Stats Row */}
      <div className="flex gap-6 mb-5 py-3 border-t border-b border-[#603e39]/15">
        {[
          { label: "Repos", value: (profile.public_repos_count ?? 0) + (profile.private_repos_count ?? 0) },
          { label: "Stars", value: profile.total_stars ?? 0 },
          { label: "Forks", value: profile.total_forks ?? 0 },
          { label: "Públicos", value: profile.public_repos_count ?? 0 },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-headline font-bold text-lg text-[#E5E2E1]">
              {stat.value}
            </div>
            <div className="font-label text-[8px] text-[#ffb4a8]/40 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Strengths */}
      <div className="mb-4">
        <span className="font-label text-[10px] text-[#ffb4a8]/40 tracking-[0.3em] uppercase block mb-2">
          Fortalezas
        </span>
        <div className="space-y-1.5">
          {strengths.slice(0, 3).map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-[#E5E2E1]/70">
              <span className="text-[#ff5540] shrink-0 mt-0.5">+</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <span className="font-label text-[10px] text-[#ffb4a8]/40 tracking-[0.3em] uppercase block mb-2">
          Recomendaciones
        </span>
        <div className="space-y-1.5">
          {recommendations.slice(0, 3).map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-[#E5E2E1]/50">
              <span className="text-[#ffb4a8] shrink-0 mt-0.5">→</span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#603e39]/15 flex items-center justify-between">
        <span className="font-label text-[9px] text-[#ffb4a8]/20 tracking-[0.3em] uppercase">
          BuildersMTY Analysis Engine v1.0
        </span>
        <a
          href={`https://github.com/${profile.github_username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label text-[10px] text-[#ff5540] uppercase tracking-widest hover:brightness-125 transition-all flex items-center gap-1"
        >
          GitHub
          <span className="material-symbols-outlined text-xs">open_in_new</span>
        </a>
      </div>
    </div>
  );
}
