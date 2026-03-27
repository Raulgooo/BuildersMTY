import os
import httpx
from dotenv import load_dotenv

load_dotenv()

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

async def notify_linked_account(github_username: str, discord_id: str):
    """
    Sends a notification to a Discord webhook when a user links their GitHub account.
    """
    if not DISCORD_WEBHOOK_URL:
        print("DISCORD_WEBHOOK_URL not configured, skipping notification.")
        return

    content = f"🚀 **Nuevo Builder vinculado!**\nGitHub: `@{github_username}`\nDiscord ID: <@{discord_id}>"
    
    async with httpx.AsyncClient() as client:
        try:
            await client.post(DISCORD_WEBHOOK_URL, json={"content": content})
        except Exception as e:
            print(f"Failed to send discord notification: {e}")

def get_oauth_url(discord_id: str) -> str:
    """
    Generates the backend OAuth URL for a specific discord user.
    """
    return f"{BACKEND_URL}/auth/github?discord_id={discord_id}"