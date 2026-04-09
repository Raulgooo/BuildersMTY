import os
import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
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
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
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


SHARK_AUTH_URL = os.getenv("SHARK_AUTH_URL", "https://auth.buildersmty.com.mx/api/v1")
SHARK_ADMIN_KEY = os.getenv("SHARKAUTH_ADMIN_KEY", "")


class DeleteAccountRequest(BaseModel):
    user_id: str


@app.post("/api/account/delete")
async def delete_account(body: DeleteAccountRequest):
    """Delete a user account via Shark Auth admin API."""
    if not SHARK_ADMIN_KEY:
        raise HTTPException(status_code=500, detail="Servicio no configurado")

    if not body.user_id:
        raise HTTPException(status_code=400, detail="user_id requerido")

    async with httpx.AsyncClient() as client:
        # Delete via admin API
        del_res = await client.delete(
            f"{SHARK_AUTH_URL}/users/{body.user_id}",
            headers={"X-Admin-Key": SHARK_ADMIN_KEY},
        )
        if del_res.status_code not in (200, 204):
            raise HTTPException(status_code=500, detail="Error al eliminar cuenta")

    return {"ok": True}


app.include_router(auth.router, prefix="/auth", tags=["auth"])

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
