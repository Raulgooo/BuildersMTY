"use client";

import { useRef, useCallback, useState } from "react";
import { toPng } from "html-to-image";

interface RepoData {
  name: string;
  full_name: string;
  description?: string | null;
  html_url: string;
  language?: string | null;
  stargazers_count: number;
  forks_count: number;
}

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
  total_commits?: number;
  total_prs?: number;
  public_repos_count?: number;
  private_repos_count?: number;
  repositories?: RepoData[] | null;
  contributed_repos?: RepoData[] | null;
  score_breakdown?: Record<string, number> | null;
}

/* ═══════════════════════════════════════════
   Rank Tiers — visual escalation per rank
   ═══════════════════════════════════════════ */
const RANK_CONFIG: Record<string, {
  label: string;
  accent: string;        // OKLCH accent for this tier
  borderColor: string;
  glowColor: string;
  badgeBg: string;
}> = {
  BUILDER_LEGEND: {
    label: "BUILDER LEGEND",
    accent: "oklch(80% 0.16 85)",      // gold
    borderColor: "oklch(80% 0.16 85 / 0.6)",
    glowColor: "0 0 40px oklch(80% 0.16 85 / 0.12)",
    badgeBg: "oklch(80% 0.16 85)",
  },
  ELITE_BUILDER: {
    label: "ELITE BUILDER",
    accent: "var(--red)",
    borderColor: "var(--red-dim)",
    glowColor: "0 0 24px oklch(50% 0.24 25 / 0.1)",
    badgeBg: "var(--red)",
  },
  BUILDER: {
    label: "BUILDER",
    accent: "var(--text-ghost)",
    borderColor: "var(--border)",
    glowColor: "none",
    badgeBg: "var(--surface-2)",
  },
};

/* ═══ Score Ring — SVG circular progress ═══ */
function ScoreRing({ score, accent }: { score: number; accent: string }) {
  const pct = Math.min(100, Math.max(0, score));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
        <circle cx="48" cy="48" r={radius} fill="none" strokeWidth="3" stroke="var(--border-subtle)" />
        <circle
          cx="48" cy="48" r={radius} fill="none" strokeWidth="3"
          stroke={accent}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-[family-name:var(--font-archivo-black)] text-2xl leading-none">{score}</span>
        <span className="text-[9px] tracking-wider mt-0.5" style={{ color: "var(--text-ghost)" }}>/100</span>
      </div>
    </div>
  );
}

/* ═══ Stat Pill ═══ */
function StatPill({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2" style={{ background: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}>
      <span className="material-symbols-outlined text-sm" style={{ color: "var(--red)" }}>{icon}</span>
      <span className="font-[family-name:var(--font-archivo-black)] text-sm">{value.toLocaleString()}</span>
      <span className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-ghost)" }}>{label}</span>
    </div>
  );
}

/* ═══ Repo Row ═══ */
function RepoRow({ repo }: { repo: RepoData }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 py-2.5 group transition-colors"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-sm truncate group-hover:text-[var(--red)] transition-colors" style={{ color: "var(--text-secondary)" }}>
          {repo.full_name || repo.name}
        </span>
        {repo.language && (
          <span className="text-[9px] px-1.5 py-0.5 uppercase tracking-wider shrink-0" style={{ border: "1px solid var(--border)", color: "var(--text-ghost)" }}>
            {repo.language}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span className="material-symbols-outlined text-xs" style={{ color: "var(--text-ghost)" }}>star</span>
        <span className="text-[11px]" style={{ color: "var(--text-ghost)" }}>{repo.stargazers_count}</span>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════
   BuilderCard — The Viral Component
   ═══════════════════════════════════════════ */
export default function BuilderCard({ profile }: { profile: BuilderProfile }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const rank = RANK_CONFIG[profile.rank || "BUILDER"] || RANK_CONFIG.BUILDER;
  const score = profile.score ?? 0;
  const strengths = profile.llm_strengths ?? [];
  const recommendations = profile.llm_recommendations ?? [];
  const languageTags = profile.language_tags ?? [];
  const avatarUrl = profile.discord_avatar_url || profile.avatar_url || "/builderslogo2.svg";

  const ownedRepos = (profile.repositories ?? [])
    .filter((r) => !r.full_name || r.full_name.split("/")[0].toLowerCase() === profile.github_username.toLowerCase())
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);

  const contributedRepos = (profile.contributed_repos ?? []).slice(0, 3);

  const handleDownloadPng = useCallback(async () => {
    if (!cardRef.current) return;
    setSaving(true);
    
    // Give React 150ms to unmount the 'Strengths' section so the card resizes smaller
    setTimeout(async () => {
      try {
        await toPng(cardRef.current!, { cacheBust: true, pixelRatio: 2 });
        const dataUrl = await toPng(cardRef.current!, { cacheBust: true, pixelRatio: 2 });
        const link = document.createElement("a");
        link.download = `${profile.github_username}-buildersmty.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to generate PNG:", err);
      } finally {
        setSaving(false);
      }
    }, 150);
  }, [profile.github_username]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        ref={cardRef}
        className="p-0 overflow-hidden"
        style={{
          background: "var(--surface-0)",
          border: `2px solid ${rank.borderColor}`,
          boxShadow: rank.glowColor,
        }}
      >
        {/* ── Top Bar: rank badge ── */}
        <div className="flex items-center justify-between px-6 py-3" style={{ background: "var(--surface-1)", borderBottom: `1px solid ${rank.borderColor}` }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: rank.accent }}>
            {rank.label}
          </span>
          <div className="flex items-center gap-1.5">
            {profile.rank === "BUILDER_LEGEND" && <span className="material-symbols-outlined text-base" style={{ color: rank.accent }}>workspace_premium</span>}
            {profile.rank === "ELITE_BUILDER" && <span className="material-symbols-outlined text-base" style={{ color: "var(--red)" }}>verified</span>}
            <span className="text-[9px] tracking-wider uppercase" style={{ color: "var(--text-ghost)" }}>BuildersMTY</span>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* ── Identity Row ── */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 shrink-0 overflow-hidden" style={{ border: `2px solid ${rank.borderColor}` }}>
              <img
                src={avatarUrl}
                alt={profile.github_username}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h2 className="font-[family-name:var(--font-archivo-black)] text-xl lg:text-2xl uppercase tracking-tight truncate leading-none">
                {profile.discord_display_name || profile.github_username}
              </h2>
              <p className="text-[11px] mt-1.5 tracking-wider" style={{ color: "var(--text-ghost)" }}>
                @{profile.github_username}
              </p>
            </div>
            <ScoreRing score={score} accent={rank.accent} />
          </div>

          {/* ── Archetype ── */}
          <div className="mb-5 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-ghost)" }}>Arquetipo</span>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5" style={{ background: rank.badgeBg, color: rank.accent === "var(--text-ghost)" ? "var(--text-primary)" : "var(--surface-0)" }}>
              {profile.developer_archetype || "Builder"}
            </span>
          </div>

          {/* ── LLM Summary ── */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            {profile.llm_summary || "Perfil en análisis..."}
          </p>

          {/* ── Language Tags ── */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {languageTags.slice(0, 8).map((lang) => (
              <span key={lang} className="text-[9px] font-medium px-2 py-1 uppercase tracking-wider" style={{ border: "1px solid var(--border)", color: "var(--text-tertiary)" }}>
                {lang}
              </span>
            ))}
          </div>

          {/* ── Stats Grid ── */}
          <div className="flex flex-wrap gap-2 mb-6">
            <StatPill icon="commit" value={profile.total_commits ?? 0} label="Commits" />
            <StatPill icon="merge" value={profile.total_prs ?? 0} label="PRs" />
            <StatPill icon="star" value={profile.total_stars ?? 0} label="Stars" />
            <StatPill icon="folder" value={(profile.public_repos_count ?? 0) + (profile.private_repos_count ?? 0)} label="Repos" />
          </div>

          {/* ── Top Repos ── */}
          {!saving && ownedRepos.length > 0 && (
            <div className="mb-5">
              <span className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: "var(--text-ghost)" }}>
                Top Repos
              </span>
              <div>{ownedRepos.map((r) => <RepoRow key={r.full_name || r.name} repo={r} />)}</div>
            </div>
          )}

          {/* ── Contributed Repos ── */}
          {!saving && contributedRepos.length > 0 && (
            <div className="mb-5">
              <span className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: "var(--red)" }}>
                Contribuciones Externas
              </span>
              <div>{contributedRepos.map((r) => <RepoRow key={r.full_name || r.name} repo={r} />)}</div>
            </div>
          )}

          {/* ── Strengths & Recommendations ── */}
          {!saving && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-5" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <div>
                <span className="text-[10px] tracking-wider uppercase block mb-3" style={{ color: "var(--text-ghost)" }}>Fortalezas</span>
                <div className="space-y-2">
                  {strengths.slice(0, 3).map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <span className="shrink-0 mt-0.5" style={{ color: "var(--red)" }}>+</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase block mb-3" style={{ color: "var(--text-ghost)" }}>Recomendaciones</span>
                <div className="space-y-2">
                  {recommendations.slice(0, 3).map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
                      <span className="shrink-0 mt-0.5" style={{ color: "var(--text-ghost)" }}>→</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="flex items-center gap-3">
            <img src="/builderslogo2.svg" alt="BuildersMTY Logo" className="w-5 h-5 opacity-70" />
            <span className="text-[9px] tracking-wider uppercase mt-0.5" style={{ color: "var(--text-ghost)" }}>
              Analysis Engine v1.0
            </span>
          </div>
          
          {saving ? (
            <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: "var(--text-primary)" }}>
              buildersmty.com.mx
            </span>
          ) : (
            <a
              href={`https://github.com/${profile.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-1.5 font-bold"
              style={{ color: "var(--red)" }}
            >
              GitHub
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          )}
        </div>
      </div>

      {/* ── Download Button ── */}
      <button
        onClick={handleDownloadPng}
        disabled={saving}
        className="mt-4 w-full py-3.5 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 text-[12px] font-bold uppercase tracking-widest hover:bg-[var(--surface-1)]"
        style={{ border: "1px solid var(--border)", color: "var(--text-tertiary)" }}
      >
        <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform" style={{ color: "var(--red)" }}>
          {saving ? "hourglass_empty" : "download"}
        </span>
        {saving ? "Generando..." : "Descargar como PNG"}
      </button>
    </div>
  );
}
