import os
import secrets
import base64
import json
import httpx
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from buildersmty_backend.services import discord, github
from buildersmty_backend.services.scoring import calculate_builder_score
from buildersmty_backend.services.llm import analyze_builder_profile
from buildersmty_backend.db.supabase import upsert_user_profile

load_dotenv()

router = APIRouter()

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
GITHUB_REDIRECT_URI = os.getenv("GITHUB_REDIRECT_URI")


@router.get("/github")
async def github_login(discord_id: str = Query(..., description="The Discord ID to link with GitHub")):
    """Step 1: Initiate GitHub OAuth flow."""
    if not discord_id:
        raise HTTPException(status_code=400, detail="discord_id is required")

    state_data = {
        "discord_id": discord_id,
        "nonce": secrets.token_urlsafe(16)
    }
    state = base64.urlsafe_b64encode(json.dumps(state_data).encode()).decode()

    github_url = (
        f"https://github.com/login/oauth/authorize?"
        f"client_id={GITHUB_CLIENT_ID}&"
        f"redirect_uri={GITHUB_REDIRECT_URI}&"
        f"state={state}&"
        f"scope=user:email,repo"
    )

    return RedirectResponse(url=github_url)


@router.get("/github/callback")
async def github_callback(code: str = None, state: str = None):
    """
    Step 2: Receive callback from GitHub.
    Exchanges code for access token, runs scoring + LLM analysis,
    persists to Supabase, and notifies Discord.
    """
    if not code or not state:
        raise HTTPException(status_code=400, detail="Missing code or state")

    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

    # 1. Decode state to get discord_id
    try:
        state_data = json.loads(base64.urlsafe_b64decode(state.encode()).decode())
        discord_id = state_data.get("discord_id")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid state parameter")

    # 2. Exchange code for access token
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": GITHUB_REDIRECT_URI,
            },
            headers={"Accept": "application/json"}
        )
        token_data = token_response.json()

    access_token = token_data.get("access_token")
    if not access_token:
        return RedirectResponse(url=f"{FRONTEND_URL}/auth/github/callback?status=error")

    # 3. Fetch user data from GitHub
    try:
        user_data = await github.fetch_user_data(access_token)
    except Exception as e:
        print(f"Error fetching user data: {e}")
        return RedirectResponse(url=f"{FRONTEND_URL}/auth/github/callback?status=error")

    # 4. Run scoring algorithm
    scoring = calculate_builder_score(user_data)

    # 5. Run LLM analysis
    analysis = await analyze_builder_profile(user_data, scoring)

    # 6. Persist to Supabase
    try:
        profile_data = {
            "discord_id": discord_id,
            "github_username": user_data.username,
            "github_id": user_data.github_id,
            "avatar_url": user_data.avatar_url,
            "email": user_data.email,
            "bio": user_data.bio,
            "public_repos_count": user_data.public_repos_count,
            "private_repos_count": user_data.private_repos_count,
            "total_stars": user_data.total_stars,
            "total_forks": user_data.total_forks,
            "total_commits": user_data.total_commits,
            "total_prs": user_data.total_prs,
            "top_languages": user_data.top_languages,
            "language_tags": user_data.language_tags,
            "repositories": [r.model_dump() for r in user_data.repositories[:50]],
            "score": scoring.score,
            "rank": scoring.rank,
            "score_breakdown": scoring.breakdown,
            "llm_summary": analysis.summary,
            "llm_strengths": analysis.strengths,
            "llm_recommendations": analysis.recommendations,
            "developer_archetype": analysis.developer_archetype,
        }
        upsert_user_profile(profile_data)
    except Exception as e:
        print(f"Error persisting to Supabase: {e}")

    # 7. Send rich analysis to Discord webhook
    await discord.send_analysis_webhook(discord_id, user_data, scoring, analysis)

    # 8. Redirect to frontend with results
    final_redirect_url = (
        f"{FRONTEND_URL}/auth/github/callback?"
        f"discord_id={discord_id}&"
        f"github_user={user_data.username}&"
        f"status=complete&"
        f"score={scoring.score}&"
        f"rank={scoring.rank}"
    )

    return RedirectResponse(url=final_redirect_url)
