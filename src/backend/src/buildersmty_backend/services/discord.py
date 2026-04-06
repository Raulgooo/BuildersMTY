import os
import httpx
from dotenv import load_dotenv
from buildersmty_backend.schemas.user import UserData, ScoringResult, BuilderAnalysis

load_dotenv()

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

RANK_COLORS = {
    "BUILDER_LEGEND": 0xFFD700,
    "ELITE_BUILDER": 0xFF5540,
    "BUILDER": 0x603E39,
}

RANK_LABELS = {
    "BUILDER_LEGEND": "BUILDER LEGEND",
    "ELITE_BUILDER": "ELITE BUILDER",
    "BUILDER": "BUILDER",
}


async def send_analysis_webhook(
    discord_id: str,
    user_data: UserData,
    scoring: ScoringResult,
    analysis: BuilderAnalysis,
):
    """Sends a rich embed with the full analysis results to the Discord webhook."""
    if not DISCORD_WEBHOOK_URL:
        print("DISCORD_WEBHOOK_URL not configured, skipping analysis webhook.")
        return

    color = RANK_COLORS.get(scoring.rank, 0x603E39)
    rank_label = RANK_LABELS.get(scoring.rank, scoring.rank)

    lang_tags = " ".join(f"`{lang}`" for lang in list(user_data.top_languages.keys())[:6])

    # Top owned repos by stars
    top_repos = sorted(user_data.repositories, key=lambda r: r.stargazers_count, reverse=True)[:5]
    top_repos_text = "\n".join(
        f"[`{r.name}`]({r.html_url}) — {r.language or '?'} · {r.stargazers_count}★"
        for r in top_repos
    ) if top_repos else "N/A"

    # Contributed repos (not owned)
    contrib_text = "\n".join(
        f"[`{r.full_name}`]({r.html_url}) — {r.language or '?'} · {r.stargazers_count}★"
        for r in user_data.contributed_repos[:5]
    ) if user_data.contributed_repos else "Ninguna contribución externa detectada"

    strengths_text = "\n".join(f"✅ {s}" for s in analysis.strengths[:3])
    recs_text = "\n".join(f"💡 {r}" for r in analysis.recommendations[:3])

    profile_url = f"{FRONTEND_URL}/profile/{user_data.username}"

    # Stats line
    stats = f"⭐ {user_data.total_stars} stars · 📝 {user_data.total_commits} commits · 🔀 {user_data.total_prs} PRs"

    embed = {
        "author": {
            "name": f"@{user_data.username}",
            "icon_url": user_data.avatar_url,
            "url": f"https://github.com/{user_data.username}",
        },
        "title": f"{rank_label}  —  {scoring.score}/100",
        "description": f"{analysis.summary}\n\n{stats}",
        "color": color,
        "fields": [
            {
                "name": "Arquetipo",
                "value": f"**{analysis.developer_archetype}**",
                "inline": True,
            },
            {
                "name": "Score",
                "value": f"**{scoring.score}**/100",
                "inline": True,
            },
            {
                "name": "Lenguajes",
                "value": lang_tags or "N/A",
                "inline": False,
            },
            {
                "name": "Top Repos (propios)",
                "value": top_repos_text,
                "inline": False,
            },
            {
                "name": "Contribuciones (externos)",
                "value": contrib_text,
                "inline": False,
            },
            {
                "name": "Fortalezas",
                "value": strengths_text,
                "inline": False,
            },
            {
                "name": "Recomendaciones",
                "value": recs_text,
                "inline": False,
            },
        ],
        "thumbnail": {"url": user_data.avatar_url},
        "footer": {
            "text": "BuildersMTY Analysis Engine v1.0",
        },
    }

    payload = {
        "content": f"<@{discord_id}> — Tu análisis de Builder está listo.\n[Ver perfil completo]({profile_url})",
        "embeds": [embed],
    }

    async with httpx.AsyncClient() as client:
        try:
            await client.post(DISCORD_WEBHOOK_URL, json=payload)
        except Exception as e:
            print(f"Failed to send analysis webhook: {e}")


def get_oauth_url(discord_id: str) -> str:
    """Generates the backend OAuth URL for a specific discord user."""
    return f"{BACKEND_URL}/auth/github?discord_id={discord_id}"
