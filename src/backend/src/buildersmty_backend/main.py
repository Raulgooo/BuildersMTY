import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from buildersmty_backend.routers import auth
from buildersmty_backend.db.supabase import get_user_profile, get_user_by_github

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app = FastAPI(title="Builders MTY Backend")
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "builders-mty-backend"}


@app.get("/api/profile/discord/{discord_id}")
async def get_profile_by_discord(discord_id: str):
    """Fetch a builder profile by Discord ID."""
    profile = get_user_profile(discord_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@app.get("/api/profile/github/{username}")
async def get_profile_by_github(username: str):
    """Fetch a builder profile by GitHub username."""
    profile = get_user_by_github(username)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


app.include_router(auth.router, prefix="/auth", tags=["auth"])

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
