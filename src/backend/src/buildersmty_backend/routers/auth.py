import os
import secrets
import base64
import json
import httpx
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from buildersmty_backend.services import discord, github

load_dotenv()

router = APIRouter()

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
GITHUB_REDIRECT_URI = os.getenv("GITHUB_REDIRECT_URI")

print(f"DEBUG: GITHUB_REDIRECT_URI is loaded as: '{GITHUB_REDIRECT_URI}'")

@router.get("/github")
async def github_login(discord_id: str = Query(..., description="The Discord ID to link with GitHub")):
    """
    Step 1: Initiate GitHub OAuth flow.
    Encodes discord_id into the state parameter.
    """
    if not discord_id:
        raise HTTPException(status_code=400, detail="discord_id is required")

    # Generate a random state and append discord_id
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
    
    print(f"DEBUG: Starting GitHub OAuth for discord_id: {discord_id}")
    print(f"DEBUG: Redirecting to GitHub with URI: {GITHUB_REDIRECT_URI}")
    
    return RedirectResponse(url=github_url)

@router.get("/github/callback")
async def github_callback(code: str = None, state: str = None):
    """
    Step 2: Receive callback from GitHub.
    Exchanges code for access token and runs the pipeline.
    """
    if not code or not state:
        raise HTTPException(status_code=400, detail="Missing code or state")

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
        FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
        return RedirectResponse(url=f"{FRONTEND_URL}/auth/github/callback?status=error")

    # 3. Fetch full user data using the new service
    try:
        user_data = await github.fetch_user_data(access_token)
    except Exception as e:
        print(f"Error fetching user data: {e}")
        FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
        return RedirectResponse(url=f"{FRONTEND_URL}/auth/github/callback?status=error")

    # 4. Notify Discord
    await discord.notify_linked_account(user_data.username, discord_id)

    # 5. Pipeline Logic (Potential for scoring here)
    # The user_data object now contains all the info needed for scoring!
    
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
    final_redirect_url = (
        f"{FRONTEND_URL}/auth/github/callback?"
        f"discord_id={discord_id}&"
        f"github_user={user_data.username}&"
        f"status=analyzing"
    )
    
    return RedirectResponse(url=final_redirect_url)