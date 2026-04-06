import os
import httpx
from dotenv import load_dotenv
from buildersmty_backend.schemas.user import UserData, ScoringResult, BuilderAnalysis

load_dotenv()

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")
DISCORD_GUILD_ID = os.getenv("DISCORD_GUILD_ID")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Role IDs — set these in env vars after creating the roles in Discord
ROLE_IDS = {
    "BUILDER": os.getenv("DISCORD_ROLE_BUILDER"),
    "ELITE_BUILDER": os.getenv("DISCORD_ROLE_ELITE_BUILDER"),
    "BUILDER_LEGEND": os.getenv("DISCORD_ROLE_BUILDER_LEGEND"),
}

# All rank role IDs for cleanup (remove old ranks before assigning new)
ALL_RANK_ROLE_IDS = [rid for rid in ROLE_IDS.values() if rid]

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

DISCORD_API = "https://discord.com/api/v10"


async def assign_rank_role(discord_id: str, rank: str):
    """
    Assigns the appropriate Discord role based on builder rank.
    Removes any previous rank roles first, then assigns the new one.
    Uses the Discord REST API with bot token (works from any process).
    """
    if not DISCORD_BOT_TOKEN or not DISCORD_GUILD_ID:
        print("DISCORD_BOT_TOKEN or DISCORD_GUILD_ID not set, skipping role assignment.")
        return

    role_id = ROLE_IDS.get(rank)
    if not role_id:
        print(f"No role ID configured for rank: {rank}")
        return

    headers = {
        "Authorization": f"Bot {DISCORD_BOT_TOKEN}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        # Remove all previous rank roles
        for old_role_id in ALL_RANK_ROLE_IDS:
            if old_role_id and old_role_id != role_id:
                try:
                    await client.delete(
                        f"{DISCORD_API}/guilds/{DISCORD_GUILD_ID}/members/{discord_id}/roles/{old_role_id}",
                        headers=headers,
                    )
                except Exception:
                    pass  # Role might not be assigned, that's fine

        # Assign new rank role
        try:
            res = await client.put(
                f"{DISCORD_API}/guilds/{DISCORD_GUILD_ID}/members/{discord_id}/roles/{role_id}",
                headers=headers,
            )
            if res.status_code in (204, 200):
                print(f"Assigned role {rank} to Discord user {discord_id}")
            else:
                print(f"Failed to assign role: {res.status_code} {res.text}")
        except Exception as e:
            print(f"Error assigning Discord role: {e}")


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

    # Top owned repos by stars (personal, non-fork only)
    personal_repos = [r for r in user_data.repositories if not r.is_fork and not r.is_org_repo]
    top_repos = sorted(personal_repos, key=lambda r: r.stargazers_count, reverse=True)[:5]
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

    stats = f"⭐ {user_data.total_stars} stars · 📝 {user_data.total_commits} commits (año) · 🔀 {user_data.total_prs} PRs"

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
