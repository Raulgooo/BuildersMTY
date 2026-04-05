import os
import httpx
from dotenv import load_dotenv
from buildersmty_backend.schemas.user import UserData, ScoringResult, BuilderAnalysis

load_dotenv()

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

RANK_COLORS = {
    "BUILDER_LEGEND": 0xFFD700,   # Gold
    "ELITE_BUILDER": 0xFF5540,    # Coral
    "BUILDER": 0x603E39,          # Dark brown
}

RANK_LABELS = {
    "BUILDER_LEGEND": "🏆 BUILDER LEGEND",
    "ELITE_BUILDER": "⚡ ELITE BUILDER",
    "BUILDER": "🔧 BUILDER",
}


async def notify_linked_account(github_username: str, discord_id: str):
    """Sends a notification to a Discord webhook when a user links their GitHub account."""
    if not DISCORD_WEBHOOK_URL:
        print("DISCORD_WEBHOOK_URL not configured, skipping notification.")
        return

    content = f"🚀 **Nuevo Builder vinculado!**\nGitHub: `@{github_username}`\nDiscord ID: <@{discord_id}>"

    async with httpx.AsyncClient() as client:
        try:
            await client.post(DISCORD_WEBHOOK_URL, json={"content": content})
        except Exception as e:
            print(f"Failed to send discord notification: {e}")


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

    # Language tags as inline text
    lang_tags = " • ".join(f"`{lang}`" for lang in list(user_data.top_languages.keys())[:6])

    # Strengths as bullet list
    strengths_text = "\n".join(f"✅ {s}" for s in analysis.strengths[:3])

    # Recommendations as bullet list
    recs_text = "\n".join(f"💡 {r}" for r in analysis.recommendations[:3])

    # Notable projects
    projects_text = "\n".join(f"📦 [{p}](https://github.com/{user_data.username}/{p})" for p in analysis.notable_projects[:3])

    # Profile URL
    profile_url = f"{FRONTEND_URL}/profile/{user_data.username}"

    embed = {
        "author": {
            "name": f"@{user_data.username}",
            "icon_url": user_data.avatar_url,
            "url": f"https://github.com/{user_data.username}",
        },
        "title": f"{rank_label}  —  {scoring.score}/100",
        "description": analysis.summary,
        "color": color,
        "fields": [
            {
                "name": "🎭 Arquetipo",
                "value": f"**{analysis.developer_archetype}**",
                "inline": True,
            },
            {
                "name": "📊 Score",
                "value": f"**{scoring.score}**/100",
                "inline": True,
            },
            {
                "name": "🏷️ Lenguajes",
                "value": lang_tags or "N/A",
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
            {
                "name": "Proyectos Destacados",
                "value": projects_text or "N/A",
                "inline": False,
            },
        ],
        "thumbnail": {"url": user_data.avatar_url},
        "footer": {
            "text": "BuildersMTY Analysis Engine v1.0",
        },
    }

    payload = {
        "content": f"<@{discord_id}> — Tu análisis de Builder está listo.\n🔗 [Ver perfil completo]({profile_url})",
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
