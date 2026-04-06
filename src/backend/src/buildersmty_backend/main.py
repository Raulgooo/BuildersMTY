import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from buildersmty_backend.routers import auth
from buildersmty_backend.db.supabase import get_user_profile, get_user_by_github

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Build allowed origins list from FRONTEND_URL
_allowed_origins = ["http://localhost:3000"]
if FRONTEND_URL and FRONTEND_URL not in _allowed_origins:
    _allowed_origins.append(FRONTEND_URL)
    # Also allow www variant
    if "://" in FRONTEND_URL:
        scheme, rest = FRONTEND_URL.split("://", 1)
        if rest.startswith("www."):
            _allowed_origins.append(f"{scheme}://{rest[4:]}")
        else:
            _allowed_origins.append(f"{scheme}://www.{rest}")

app = FastAPI(title="Builders MTY Backend")
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "OPTIONS"],
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
